#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const REPO_ROOT = path.resolve(ROOT, "../../..");
const FILES = {
  data: path.join(ROOT, "data.js"),
  statusJs: path.join(ROOT, "audio-health-status.js"),
  reportMd: path.join(ROOT, "audio-health-status.md")
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadGameData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(FILES.data), sandbox, { filename: FILES.data });
  if (!sandbox.window.BSI_GAME_DATA) {
    throw new Error("data.js 未暴露 window.BSI_GAME_DATA");
  }
  return sandbox.window.BSI_GAME_DATA;
}

function formatSeconds(value) {
  if (!Number.isFinite(value)) return "未知";
  if (value < 10) return `${value.toFixed(2)}s`;
  return `${value.toFixed(1)}s`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "未知";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

function runFfprobe(absPath) {
  const result = spawnSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration,bit_rate",
    "-of",
    "json",
    absPath
  ], {
    encoding: "utf8"
  });
  if (result.status !== 0) {
    return {
      ok: false,
      error: (result.stderr || result.stdout || "ffprobe failed").trim()
    };
  }
  try {
    const data = JSON.parse(result.stdout || "{}");
    return {
      ok: true,
      duration: Number(data.format?.duration),
      bitRate: Number(data.format?.bit_rate)
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function expectedDurationRange(asset) {
  if (asset.type === "music") return [25, 240];
  if (asset.type === "ambience") return [8, 90];
  if (asset.type === "sanity" || asset.type === "sanity-low") return [8, 90];
  if (asset.type === "warning") return [0.2, 5];
  return [0.05, 5];
}

function inspectAudio() {
  const data = loadGameData();
  const audioAssets = data.audioAssets || {};
  const rows = [];
  const problems = [];
  const warnings = [];
  const uniqueFiles = new Map();

  Object.entries(audioAssets).forEach(([key, asset]) => {
    const rowProblems = [];
    const rowWarnings = [];
    if (!asset || typeof asset !== "object") {
      problems.push(`${key}: asset 不是对象`);
      return;
    }
    if (!asset.id || !asset.name || !asset.src || !asset.type) {
      rowProblems.push("缺少 id/name/src/type");
    }
    if (typeof asset.loop !== "boolean") rowProblems.push("loop 不是布尔值");
    if (typeof asset.volume !== "number" || asset.volume < 0 || asset.volume > 1) {
      rowProblems.push("volume 不在 0-1");
    }
    if (!["review-pending", "demo-temporary"].includes(asset.status)) {
      rowProblems.push(`状态 ${asset.status || "空"} 不在待复核/临时边界内`);
    }

    const absPath = path.resolve(ROOT, asset.src || "");
    const exists = Boolean(asset.src) && fs.existsSync(absPath);
    let stat = null;
    let probe = { ok: false, error: "文件不存在" };
    if (!exists) {
      rowProblems.push("文件不存在");
    } else {
      stat = fs.statSync(absPath);
      if (stat.size <= 1024) rowProblems.push("文件过小");
      probe = runFfprobe(absPath);
      if (!probe.ok) {
        rowProblems.push(`ffprobe 失败：${probe.error}`);
      } else if (!Number.isFinite(probe.duration) || probe.duration <= 0) {
        rowProblems.push("时长无效");
      } else {
        const [minDuration, maxDuration] = expectedDurationRange(asset);
        if (probe.duration < minDuration || probe.duration > maxDuration) {
          rowProblems.push(`时长 ${formatSeconds(probe.duration)} 超出 ${minDuration}-${maxDuration}s`);
        }
      }
    }

    if (asset.type === "music" && asset.loop !== true) rowProblems.push("音乐必须 loop");
    if (asset.type !== "music" && ["ui", "warning", "map-sfx"].includes(asset.type) && asset.loop) {
      rowProblems.push("短音效不应 loop");
    }
    if (asset.type === "music" && asset.status !== "review-pending") {
      rowWarnings.push("音乐仍应保持待主观试听状态");
    }
    if (asset.status === "demo-temporary" && !String(asset.name || "").includes("占位") && asset.type !== "map-sfx") {
      rowWarnings.push("临时素材名称未显式标占位");
    }

    if (rowProblems.length) problems.push(`${asset.id || key}: ${rowProblems.join("；")}`);
    if (rowWarnings.length) warnings.push(`${asset.id || key}: ${rowWarnings.join("；")}`);
    if (exists) {
      const rel = path.relative(REPO_ROOT, absPath);
      if (!uniqueFiles.has(rel)) uniqueFiles.set(rel, { rel, size: stat.size, duration: probe.duration });
    }

    rows.push({
      key,
      id: asset.id || key,
      name: asset.name || "",
      type: asset.type || "",
      status: asset.status || "",
      loop: Boolean(asset.loop),
      volume: asset.volume,
      src: asset.src || "",
      exists,
      size: stat?.size || 0,
      duration: probe.duration,
      bitRate: probe.bitRate,
      problems: rowProblems,
      warnings: rowWarnings
    });
  });

  const typeCounts = rows.reduce((acc, row) => {
    acc[row.type] = (acc[row.type] || 0) + 1;
    return acc;
  }, {});
  const statusCounts = rows.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    title: problems.length ? "音频技术体检有阻断项" : "音频技术体检通过，待主观听感",
    summary: {
      totalAssets: rows.length,
      uniqueFiles: uniqueFiles.size,
      problemCount: problems.length,
      warningCount: warnings.length,
      typeCounts,
      statusCounts
    },
    rows,
    problems,
    warnings
  };
}

function renderMarkdown(payload) {
  const lines = [
    "# 《不思异：九州》音频技术体检",
    "",
    `生成时间：${payload.generatedAt}`,
    "",
    `结论：${payload.title}`,
    "",
    `资产：${payload.summary.totalAssets}；唯一文件：${payload.summary.uniqueFiles}；阻断项：${payload.summary.problemCount}；提醒：${payload.summary.warningCount}。`,
    "",
    "## 分层统计",
    "",
    `- 类型：${Object.entries(payload.summary.typeCounts).map(([key, value]) => `${key} ${value}`).join("，")}`,
    `- 状态：${Object.entries(payload.summary.statusCounts).map(([key, value]) => `${key} ${value}`).join("，")}`,
    "",
    "## 文件体检表",
    "",
    "| key | 编号 | 类型 | 状态 | loop | 音量 | 时长 | 大小 | 结果 |",
    "|---|---|---|---|---|---:|---:|---:|---|",
    ...payload.rows.map((row) => [
      row.key,
      row.id,
      row.type,
      row.status,
      row.loop ? "是" : "否",
      typeof row.volume === "number" ? row.volume.toFixed(3) : "未知",
      formatSeconds(row.duration),
      formatBytes(row.size),
      row.problems.length ? `阻断：${row.problems.join("；")}` : (row.warnings.length ? `提醒：${row.warnings.join("；")}` : "通过")
    ].map((value) => String(value).replace(/\|/g, "/")).join(" | ")).map((line) => `| ${line} |`),
    "",
    "## 机器结论",
    "",
    payload.problems.length ? payload.problems.map((item) => `- 需处理：${item}`).join("\n") : "- 所有接入音频文件存在，时长和 loop/短音效规则通过机器体检。",
    "",
    "## 仍需人工判断",
    "",
    "- 本报告只能证明音频文件能作为内部 Web Demo 技术素材运行。",
    "- 音乐审美、循环接缝、压迫感、山海经气质、默认开声是否打扰，仍需 P0 听音人回传主观摘要。",
    "- `review-pending` 和 `demo-temporary` 不代表正式授权完成。",
    ""
  ];
  return lines.join("\n");
}

function renderStatusJs(payload) {
  return `window.BSI_AUDIO_HEALTH_STATUS = ${JSON.stringify(payload, null, 2)};\n`;
}

function main() {
  const shouldWrite = process.argv.includes("--write-report");
  const payload = inspectAudio();
  if (shouldWrite) {
    fs.writeFileSync(FILES.statusJs, renderStatusJs(payload));
    fs.writeFileSync(FILES.reportMd, renderMarkdown(payload));
    console.log(`REPORT ${FILES.statusJs}`);
    console.log(`REPORT ${FILES.reportMd}`);
  }
  console.log(`${payload.title}；资产 ${payload.summary.totalAssets}；唯一文件 ${payload.summary.uniqueFiles}；阻断项 ${payload.summary.problemCount}；提醒 ${payload.summary.warningCount}`);
  if (payload.problems.length) {
    payload.problems.forEach((problem) => console.error(problem));
    process.exit(1);
  }
}

main();
