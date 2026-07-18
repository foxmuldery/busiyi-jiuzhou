#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const JSON_OUTPUT = process.argv.includes("--json");
const MARKDOWN_OUTPUT = process.argv.includes("--markdown");
const WRITE_REPORT = process.argv.includes("--write-report");
const WRITE_STATUS = process.argv.includes("--write-status");
const WRITE_WORKBENCH = process.argv.includes("--write-workbench");
const STRICT = process.argv.includes("--strict");
const STRICT_REPLACED = process.argv.includes("--strict-replaced");
const REPORT_FILE = path.join(ROOT, "visual-replacement-status.md");
const STATUS_FILE = path.join(ROOT, "visual-replacement-status.js");
const WORKBENCH_FILE = path.join(ROOT, "highfreq-visual-replacement-workbench.md");
const COPY_PACK_FILE = path.resolve(ROOT, "../../../协作/D_BSI-D-030_同事复制粘贴包/D_BSI-D-030_24张Prompt_同事复制版.md");
const RATIO_TOLERANCE = 0.08;
const ENCOUNTER_RATIOS = [1, 4 / 3, 16 / 9];
const ENCOUNTER_ASPECT_LABEL = "1:1 / 4:3 / 16:9";
const ENCOUNTER_MIN_WIDTH = 960;
const ENCOUNTER_MIN_HEIGHT = 720;

const TARGETS = [
  {
    id: "EVT-001",
    key: "B-event:post_gate",
    name: "驿门未闭",
    priority: "P0",
    reason: "第一场遭遇和中原驿地点图重复，必须有门缝、铜钉和粮袋痕迹。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-001_post_gate_驿门未闭.png",
    baselineSha256: "69d041d9886c5b9cdd59304dff48f8b9522c51482d96ea9ff8bde903a515dd95"
  },
  {
    id: "EVT-002",
    key: "B-event:split_tracks",
    name: "车辙分叉",
    priority: "P0",
    reason: "故王道首个事件，需要一眼看到多条车辙和路线选择。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-002_split_tracks_车辙分叉.png",
    baselineSha256: "c1f3568db7ed955213b2e77e2725040a2912eacfad442064e19cc86ccc0f2700"
  },
  {
    id: "EVT-003",
    key: "B-event:closed_order",
    name: "废关旧令",
    priority: "P1",
    reason: "和废关地点图重复，应该突出旧令木牌、半闭关门和新手印。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-003_closed_order_废关旧令.png",
    baselineSha256: "848cefa000bc5e1628d7dd7d9f407339f16bedf8fec4a08a4147faa944f372a7"
  },
  {
    id: "EVT-005",
    key: "B-event:black_trade",
    name: "黑齿交易",
    priority: "P0",
    reason: "黑齿市核心交易事件，需要青鳞、旧铁、干粮袋和三指价码。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-005_black_trade_黑齿交易.png",
    baselineSha256: "66f1ea8a6c8b3b408f063dc11010c77b04f2b19614dad5ee1b280ffdd4e62469"
  },
  {
    id: "RTE-009",
    key: "C-route:black_teeth_scale_price",
    name: "黑齿鳞价",
    priority: "P0",
    reason: "主线中段高价值路遇，必须和黑齿市地点图区分。",
    path: "../../02_设计资产/可用素材/C组路遇危机结局图/RTE-009_black_teeth_scale_price_黑齿鳞价.png",
    baselineSha256: "eaa793ab3efb901671e3a2d51bfae1eb2fe7b9c4dba44090304986bc8756a219"
  },
  {
    id: "EVT-013",
    key: "B-event:read_name",
    name: "断碑读名",
    priority: "P0",
    reason: "后段叙事转折事件，需要断碑近景、拓片和不可读的名字痕迹。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-013_read_name_断碑读名.png",
    baselineSha256: "88e96f1ea3e4bd0166fca9dc56ef080a83744fa68e6e3b554371d0aedab97a40"
  },
  {
    id: "EVT-014",
    key: "B-event:rift_dream",
    name: "裂隙前梦",
    priority: "P0",
    reason: "终点前最后事件，需要地图纸背、重影古道和梦境结构。",
    path: "../../02_设计资产/可用素材/B组地点事件图/EVT-014_rift_dream_裂隙前梦.png",
    baselineSha256: "2d6ed223aea074ae14b04e667d32c7ea65f80b0721e7b7f6f5eeb9e61f34f9d8"
  },
  {
    id: "RND-008",
    key: "C-random:rnd_breathing_map",
    name: "烛龙息图",
    priority: "P0",
    reason: "高记忆随机异象，需要旧山海图在荒路上呼吸，而不是普通水岸。",
    path: "../../02_设计资产/可用素材/C组路遇危机结局图/RND-008_breathing_map_烛龙息图.png",
    baselineSha256: "10b2bb1bc8d691e8dad288644ba9dec619e31ecdafe6ba9606476a401726bffb"
  },
  {
    id: "CRS-003",
    key: "C-crisis:sanity",
    name: "神志崩线",
    priority: "P0",
    reason: "神志触底危机，需要断笔、混乱车辙和山影错位。",
    path: "../../02_设计资产/可用素材/C组路遇危机结局图/CRS-003_sanity_神志崩线.png",
    baselineSha256: "25b071fe14c7c7a59ccec818d69bd305139b116f570d4e28faa254fb7c8efc28"
  },
  {
    id: "END-001",
    key: "C-ending:rift",
    name: "入裂隙",
    priority: "P1",
    reason: "第一章主结局，需要不可逆的裂隙入口，而不是普通地点远景。",
    path: "../../02_设计资产/可用素材/C组路遇危机结局图/END-001_rift_入裂隙.png",
    baselineSha256: "bf2fbfe00ceeee2ca4c1c606179a4b1394c7d3a5e74bde13ba26177c1bd0cce8"
  },
  {
    id: "END-003",
    key: "C-ending:stranded",
    name: "迷失九州_旅途断绝",
    priority: "P1",
    reason: "硬失败结局，需要车辙断尽、空粮袋、断木楔和残图。",
    path: "../../02_设计资产/可用素材/C组路遇危机结局图/END-003_lost_stranded_迷失九州_旅途断绝.png",
    baselineSha256: "0e4154c348715f183b8a4855de38a740501b90b4feef3b93e1c5ed3ee42b04af"
  }
];

function fileHash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function pngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function inspectTarget(target) {
  const absolutePath = path.resolve(ROOT, target.path);
  if (!fs.existsSync(absolutePath)) {
    return {
      ...target,
      absolutePath,
      status: "missing",
      statusLabel: "缺失",
      width: 0,
      height: 0,
      sha256: "",
      issue: "文件不存在"
    };
  }

  const buffer = fs.readFileSync(absolutePath);
  const dimensions = pngDimensions(buffer);
  const sha256 = fileHash(buffer);
  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;
  const ratio = height ? width / height : 0;
  const ratioOk = ENCOUNTER_RATIOS.some((expectedRatio) => (
    Math.abs(ratio - expectedRatio) <= RATIO_TOLERANCE
  ));
  const sizeOk = width >= ENCOUNTER_MIN_WIDTH && height >= ENCOUNTER_MIN_HEIGHT;

  if (!dimensions) {
    return {
      ...target,
      absolutePath,
      status: "invalid",
      statusLabel: "异常",
      width,
      height,
      sha256,
      issue: "不是可读取 PNG"
    };
  }

  if (!ratioOk || !sizeOk) {
    return {
      ...target,
      absolutePath,
      status: "invalid",
      statusLabel: "异常",
      width,
      height,
      sha256,
      aspectLabel: ENCOUNTER_ASPECT_LABEL,
      issue: `尺寸或比例不合格：${width}x${height}；应为 ${ENCOUNTER_ASPECT_LABEL}，至少 ${ENCOUNTER_MIN_WIDTH}x${ENCOUNTER_MIN_HEIGHT}`
    };
  }

  if (sha256 === target.baselineSha256) {
    return {
      ...target,
      absolutePath,
      status: "placeholder",
      statusLabel: "占位",
      width,
      height,
      sha256,
      aspectLabel: ENCOUNTER_ASPECT_LABEL,
      issue: "仍是 C083 派生占位图"
    };
  }

  return {
    ...target,
    absolutePath,
    status: "replaced",
    statusLabel: "已替换",
    width,
    height,
    sha256,
    aspectLabel: ENCOUNTER_ASPECT_LABEL,
    issue: ""
  };
}

function buildResults() {
  return TARGETS.map(inspectTarget);
}

function summary(results) {
  return {
    total: results.length,
    replaced: results.filter((item) => item.status === "replaced").length,
    placeholder: results.filter((item) => item.status === "placeholder").length,
    missing: results.filter((item) => item.status === "missing").length,
    invalid: results.filter((item) => item.status === "invalid").length
  };
}

function buildMarkdown(results) {
  const counts = summary(results);
  const lines = [
    "# 高频重生图替换状态",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    `进度：已替换 ${counts.replaced}/${counts.total}；占位 ${counts.placeholder}；缺失 ${counts.missing}；异常 ${counts.invalid}。`,
    "",
    `> 占位表示文件仍与 C083 派生图哈希一致；新图可用 ${ENCOUNTER_ASPECT_LABEL}，最低 ${ENCOUNTER_MIN_WIDTH}x${ENCOUNTER_MIN_HEIGHT}；按同名文件覆盖后，再运行本检查器即可看到已替换。`,
    "",
    "| 优先级 | 资产 | 状态 | 尺寸 | 问题 / 替换原因 | 文件 |",
    "|---|---|---|---:|---|---|"
  ];

  results.forEach((item) => {
    const fileName = path.basename(item.path);
    const size = item.width && item.height ? `${item.width}x${item.height}` : "-";
    const reason = item.issue || item.reason;
    lines.push(`| ${item.priority} | ${item.id} ${item.name} | ${item.statusLabel} | ${size} | ${reason} | \`${fileName}\` |`);
  });

  lines.push(
    "",
    "## 下一步",
    "",
    "1. 先生成并覆盖 P0 项。",
    "2. 覆盖后运行：`node visual-replacement-check.js --write-report`。",
    "3. 再运行：`node asset-readiness-check.js --write-manifest && node qa-check.js && node journey-smoke-check.js`。",
    ""
  );

  return `${lines.join("\n")}\n`;
}

function extractPromptBlocks() {
  if (!fs.existsSync(COPY_PACK_FILE)) return new Map();
  const source = fs.readFileSync(COPY_PACK_FILE, "utf8");
  const blocks = new Map();
  const sectionPattern = /^###\s+.*?([\w-]+_[^\s`]+\.png)`?\s*\n+```text\n([\s\S]*?)\n```/gm;
  let match = sectionPattern.exec(source);
  while (match) {
    blocks.set(match[1].trim(), match[2].trim());
    match = sectionPattern.exec(source);
  }
  return blocks;
}

function statusNote(item) {
  if (item.status === "replaced") return "已替换，可继续人工复核画面语义。";
  if (item.status === "placeholder") return "仍是占位，优先重生。";
  if (item.status === "missing") return "文件缺失，需按目标文件名导入。";
  return item.issue || "待复核。";
}

function buildWorkbench(results) {
  const counts = summary(results);
  const promptBlocks = extractPromptBlocks();
  const generatedAt = new Date().toISOString();
  const lines = [
    "# 高频重生图生产与导入工作台",
    "",
    `生成时间：${generatedAt}`,
    "",
    `当前进度：已替换 ${counts.replaced}/${counts.total}；占位 ${counts.placeholder}；缺失 ${counts.missing}；异常 ${counts.invalid}。`,
    "",
    `统一规格：高频遭遇、路遇、危机、结局图支持 ${ENCOUNTER_ASPECT_LABEL}，最低 ${ENCOUNTER_MIN_WIDTH}x${ENCOUNTER_MIN_HEIGHT}。地点图仍按 16:9 横图。`,
    "",
    "使用方法：",
    "",
    "1. 优先生成 P0。",
    "2. 每张图按目标文件名保存到：`../../02_设计资产/待复核素材/高频重生图导入/`。",
    "3. 先运行：`node highfreq-visual-import.js`，确认尺寸、比例和命名合格。",
    "4. 确认后运行：`node highfreq-visual-import.js --apply`，脚本会先备份旧图再写入正式目录。",
    "5. 覆盖后运行：`node visual-replacement-check.js --write-report --write-workbench`。",
    "6. 再运行：`node asset-readiness-check.js --write-manifest && node qa-check.js && node journey-smoke-check.js`。",
    "",
    "## 总览",
    "",
    "| 优先级 | 资产 | 状态 | 目标文件 | 规格 | 替换原因 |",
    "|---|---|---|---|---|---|"
  ];

  results.forEach((item) => {
    lines.push([
      item.priority,
      `${item.id} ${item.name}`,
      item.statusLabel,
      `\`${path.basename(item.path)}\``,
      item.aspectLabel || ENCOUNTER_ASPECT_LABEL,
      statusNote(item)
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });

  lines.push("", "## 逐张复制", "");
  results.forEach((item, index) => {
    const fileName = path.basename(item.path);
    const prompt = promptBlocks.get(fileName);
    lines.push(
      `### ${String(index + 1).padStart(2, "0")} ${item.priority} ${fileName}`,
      "",
      `状态：${item.statusLabel}。${statusNote(item)}`,
      "",
      `目标路径：\`${item.path}\``,
      "",
      `替换原因：${item.reason}`,
      "",
      `画幅要求：${item.aspectLabel || ENCOUNTER_ASPECT_LABEL}，最低 ${ENCOUNTER_MIN_WIDTH}x${ENCOUNTER_MIN_HEIGHT}。`,
      ""
    );
    if (prompt) {
      lines.push("```text", prompt, "```", "");
    } else {
      lines.push(
        "> 未在 D030 复制包中找到对应 Prompt，请先补齐提示语。",
        ""
      );
    }
  });

  return `${lines.join("\n")}\n`;
}

function buildEntryStatus(results) {
  const counts = summary(results);
  const openCount = counts.placeholder + counts.missing + counts.invalid;
  return {
    generatedAt: new Date().toISOString(),
    summary: {
      ...counts,
      open: openCount,
      readyText: `${counts.replaced}/${counts.total}`,
      nextText: openCount
        ? `仍有 ${openCount} 张高频图待重生`
        : "11 张高频图已全部替换"
    },
    report: "./visual-replacement-status.md",
    workbench: "./highfreq-visual-replacement-workbench.md",
    promptPack: "../../../协作/D_BSI-D-024_全量试玩图复核与下一轮重生图提示语.md",
    copyPack: "../../../协作/D_BSI-D-030_同事复制粘贴包/D_BSI-D-030_24张Prompt_同事复制版.md",
    results: results.map((item) => ({
      id: item.id,
      key: item.key,
      name: item.name,
      priority: item.priority,
      reason: item.reason,
      status: item.status,
      statusLabel: item.statusLabel,
      width: item.width,
      height: item.height,
      aspectLabel: item.aspectLabel || ENCOUNTER_ASPECT_LABEL,
      issue: item.issue,
      path: item.path,
      fileName: path.basename(item.path)
    }))
  };
}

function buildStatusJs(results) {
  return `window.BSI_VISUAL_REPLACEMENT_STATUS = ${JSON.stringify(buildEntryStatus(results), null, 2)};\n`;
}

function printHuman(results) {
  const counts = summary(results);
  console.log("《不思异：九州》高频重生图替换检查");
  console.log(`replaced ${counts.replaced}/${counts.total}, placeholder ${counts.placeholder}, missing ${counts.missing}, invalid ${counts.invalid}`);
  results.forEach((item) => {
    const size = item.width && item.height ? `${item.width}x${item.height}` : "-";
    console.log(`${item.statusLabel.padEnd(4)} ${item.priority} ${item.id} ${item.name} ${size} ${item.issue || ""}`);
  });
}

function main() {
  const results = buildResults();
  const counts = summary(results);
  const payload = {
    generatedAt: new Date().toISOString(),
    reportFile: REPORT_FILE,
    summary: counts,
    results
  };

  if (WRITE_REPORT) {
    fs.writeFileSync(REPORT_FILE, buildMarkdown(results), "utf8");
    console.error(`Wrote ${path.relative(process.cwd(), REPORT_FILE)}.`);
  }

  if (WRITE_REPORT || WRITE_STATUS) {
    fs.writeFileSync(STATUS_FILE, buildStatusJs(results), "utf8");
    console.error(`Wrote ${path.relative(process.cwd(), STATUS_FILE)}.`);
  }

  if (WRITE_REPORT || WRITE_WORKBENCH) {
    fs.writeFileSync(WORKBENCH_FILE, buildWorkbench(results), "utf8");
    console.error(`Wrote ${path.relative(process.cwd(), WORKBENCH_FILE)}.`);
  }

  if (JSON_OUTPUT) {
    console.log(JSON.stringify(payload, null, 2));
  } else if (MARKDOWN_OUTPUT) {
    process.stdout.write(buildMarkdown(results));
  } else {
    printHuman(results);
  }

  if (STRICT && (counts.missing || counts.invalid)) {
    process.exitCode = 1;
  }
  if (STRICT_REPLACED && counts.replaced < counts.total) {
    process.exitCode = 1;
  }
}

main();
