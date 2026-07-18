#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const ROOT = __dirname;
const STATUS_FILE = path.join(ROOT, "visual-replacement-status.js");
const DEFAULT_SOURCE_DIR = path.resolve(ROOT, "../../02_设计资产/待复核素材/高频重生图导入");
const BACKUP_ROOT = path.resolve(ROOT, "../../02_设计资产/待复核素材/高频重生图备份");
const APPLY = process.argv.includes("--apply");
const JSON_OUTPUT = process.argv.includes("--json");
const STRICT = process.argv.includes("--strict");
const SOURCE_INDEX = process.argv.indexOf("--source");
const SOURCE_DIR = SOURCE_INDEX >= 0 && process.argv[SOURCE_INDEX + 1]
  ? path.resolve(process.argv[SOURCE_INDEX + 1])
  : DEFAULT_SOURCE_DIR;
const RATIO_TOLERANCE = 0.08;
const ALLOWED_RATIOS = [1, 4 / 3, 16 / 9];
const MIN_WIDTH = 960;
const MIN_HEIGHT = 720;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function readStatus() {
  if (!fs.existsSync(STATUS_FILE)) {
    throw new Error(`Missing visual status file: ${STATUS_FILE}`);
  }
  const raw = fs.readFileSync(STATUS_FILE, "utf8");
  const match = raw.match(/window\.BSI_VISUAL_REPLACEMENT_STATUS\s*=\s*([\s\S]*?);\s*$/);
  if (!match) {
    throw new Error("visual-replacement-status.js format is not readable");
  }
  return JSON.parse(match[1]);
}

function walkFiles(dir, matches = []) {
  if (!fs.existsSync(dir)) return matches;
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(absolute, matches);
      return;
    }
    if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      matches.push(absolute);
    }
  });
  return matches;
}

function pngDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function sipsDimensions(file) {
  try {
    const output = childProcess.execFileSync(
      "sips",
      ["-g", "pixelWidth", "-g", "pixelHeight", file],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    );
    const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
    const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] || 0);
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

function dimensions(file) {
  return path.extname(file).toLowerCase() === ".png"
    ? (pngDimensions(file) || sipsDimensions(file))
    : sipsDimensions(file);
}

function ratioOk(width, height) {
  const ratio = width / height;
  return ALLOWED_RATIOS.some((expected) => Math.abs(ratio - expected) <= RATIO_TOLERANCE);
}

function exactCandidateName(fileName, ext) {
  return `${path.basename(fileName, ".png")}${ext}`;
}

function indexCandidates(files) {
  const index = new Map();
  files.forEach((file) => {
    const name = path.basename(file);
    const lower = name.toLowerCase();
    if (!index.has(lower)) index.set(lower, []);
    index.get(lower).push(file);
  });
  return index;
}

function findCandidate(target, candidateIndex) {
  const names = [".png", ".jpg", ".jpeg", ".webp"].map((ext) => exactCandidateName(target.fileName, ext).toLowerCase());
  for (const name of names) {
    const found = candidateIndex.get(name);
    if (found?.length) return found[0];
  }
  return "";
}

function hasMagick() {
  try {
    childProcess.execFileSync("magick", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "").replace("T", "-");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyOrConvert(source, target, magickAvailable) {
  ensureDir(path.dirname(target));
  if (path.extname(source).toLowerCase() === ".png") {
    fs.copyFileSync(source, target);
    return "copied";
  }
  if (!magickAvailable) {
    throw new Error("non-PNG candidate requires ImageMagick `magick` for conversion");
  }
  childProcess.execFileSync("magick", [source, target], { stdio: "ignore" });
  return "converted";
}

function buildPlan() {
  const status = readStatus();
  const targets = Array.isArray(status.results) ? status.results : [];
  const sourceFiles = walkFiles(SOURCE_DIR);
  const candidateIndex = indexCandidates(sourceFiles);
  const magickAvailable = hasMagick();

  const rows = targets.map((target) => {
    const candidate = findCandidate(target, candidateIndex);
    const size = candidate ? dimensions(candidate) : null;
    const ok = Boolean(
      candidate
      && size
      && size.width >= MIN_WIDTH
      && size.height >= MIN_HEIGHT
      && ratioOk(size.width, size.height)
    );
    const issue = !candidate
      ? "待导入文件夹中没有同名候选"
      : !size
        ? "无法读取候选图尺寸"
        : size.width < MIN_WIDTH || size.height < MIN_HEIGHT
          ? `尺寸过小：${size.width}x${size.height}`
          : !ratioOk(size.width, size.height)
            ? `比例不合格：${size.width}x${size.height}`
            : "";
    return {
      id: target.id,
      priority: target.priority,
      name: target.name,
      fileName: target.fileName,
      targetPath: target.path,
      absoluteTargetPath: path.resolve(ROOT, target.path),
      candidate,
      candidateRelative: candidate ? path.relative(process.cwd(), candidate) : "",
      width: size?.width || 0,
      height: size?.height || 0,
      ok,
      issue,
      currentStatus: target.statusLabel || target.status
    };
  });

  return {
    sourceDir: SOURCE_DIR,
    apply: APPLY,
    magickAvailable,
    summary: {
      total: rows.length,
      matched: rows.filter((row) => row.candidate).length,
      ready: rows.filter((row) => row.ok).length,
      missing: rows.filter((row) => !row.candidate).length,
      invalid: rows.filter((row) => row.candidate && !row.ok).length
    },
    rows
  };
}

function applyPlan(plan) {
  if (!APPLY) return [];
  const readyRows = plan.rows.filter((row) => row.ok);
  if (!readyRows.length) return [];

  const backupDir = path.join(BACKUP_ROOT, timestamp());
  ensureDir(backupDir);

  return readyRows.map((row) => {
    const target = row.absoluteTargetPath;
    const backup = path.join(backupDir, row.fileName);
    if (fs.existsSync(target)) {
      fs.copyFileSync(target, backup);
    }
    const action = copyOrConvert(row.candidate, target, plan.magickAvailable);
    return { fileName: row.fileName, action, backup };
  });
}

function printHuman(plan, applied) {
  console.log("《不思异：九州》高频重生图导入检查");
  console.log(`source: ${plan.sourceDir}`);
  console.log(`matched ${plan.summary.matched}/${plan.summary.total}, ready ${plan.summary.ready}, missing ${plan.summary.missing}, invalid ${plan.summary.invalid}`);
  console.log(APPLY ? "mode: apply" : "mode: dry-run");
  plan.rows.forEach((row) => {
    const size = row.width && row.height ? `${row.width}x${row.height}` : "-";
    const mark = row.ok ? "可导入" : "待处理";
    console.log(`${mark} ${row.priority} ${row.fileName} ${size} ${row.issue}`);
  });
  if (!APPLY) {
    console.log("未写入文件。确认无误后加 --apply 导入。");
  } else {
    console.log(`已导入 ${applied.length} 张。`);
  }
}

function main() {
  const plan = buildPlan();
  const applied = applyPlan(plan);
  if (JSON_OUTPUT) {
    console.log(JSON.stringify({ ...plan, applied }, null, 2));
  } else {
    printHuman(plan, applied);
  }
  if (STRICT && (plan.summary.missing || plan.summary.invalid)) {
    process.exitCode = 1;
  }
}

main();
