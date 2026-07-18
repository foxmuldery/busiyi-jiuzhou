#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data.js");
const STRICT = process.argv.includes("--strict");
const JSON_OUTPUT = process.argv.includes("--json");
const PRIORITY_ONLY = process.argv.includes("--priority");
const MARKDOWN_OUTPUT = process.argv.includes("--markdown");
const WRITE_MANIFEST = process.argv.includes("--write-manifest");
const IMPORT_WORKBENCH = process.argv.includes("--import-workbench");
const WRITE_IMPORT_WORKBENCH = process.argv.includes("--write-import-workbench");
const WRITE_ENTRY_STATUS = process.argv.includes("--write-entry-status");
const MANIFEST_FILE = path.join(ROOT, "generated-art-manifest.js");
const IMPORT_WORKBENCH_FILE = path.join(ROOT, "generated-art-import-workbench.md");
const ENTRY_STATUS_FILE = path.join(ROOT, "generated-art-status.js");
const RATIO_TOLERANCE = 0.08;
const LANDSCAPE_RATIO = 16 / 9;
const ENCOUNTER_RATIOS = [1, 4 / 3, 16 / 9];
const ENCOUNTER_ASPECT_LABEL = "1:1 / 4:3 / 16:9";
const FIRST_PASS_PRIORITIES = [
  ["A-stage:road", "首屏与古道旅途底层，最能替换当前重复背景"],
  ["A-stage:market", "废关、边市、青丘一带共用中地图底层"],
  ["A-stage:water", "雷泽、赤水、水泽路线共用中地图底层"],
  ["A-stage:rift", "终点归墟与神志异象共用中地图底层"],
  ["B-location:central_post", "玩家第一眼抵达地点"],
  ["B-location:abandoned_pass", "当前稳定主线路径第二站"],
  ["B-location:black_teeth_market", "山海异域感最强的中段地点"],
  ["B-location:broken_stele", "后段叙事转折地点"],
  ["B-location:kyushu_rift", "第一章终点与结局入口"],
  ["B-event:post_gate", "第一场剧情选择，影响开局质感"],
  ["C-route:roadside_shrine", "主线第一段半途路遇"],
  ["C-route:black_teeth_scale_price", "主线中段重复出现的高价值路遇"]
].map(([key, reason], index) => ({ key, reason, priority: index + 1 }));
const FIRST_PASS_PRIORITY_BY_KEY = new Map(
  FIRST_PASS_PRIORITIES.map((item) => [item.key, item])
);
const CANDIDATE_KEYWORDS_BY_KEY = {
  "A-stage:road": ["古道", "荒原", "旧王道"],
  "A-stage:market": ["边市", "废关", "黑齿", "青丘"],
  "A-stage:water": ["雷泽", "赤水", "水泽"],
  "A-stage:rift": ["归墟", "裂隙"],
  "B-location:central_post": ["中原驿", "驿"],
  "B-location:abandoned_pass": ["废关"],
  "B-location:black_teeth_market": ["黑齿"],
  "B-location:broken_stele": ["断碑", "石碑", "巫咸"],
  "B-location:kyushu_rift": ["九州裂隙", "归墟", "裂隙"],
  "B-event:post_gate": ["驿门", "中原驿"],
  "C-route:roadside_shrine": ["无名祠", "祭所"],
  "C-route:black_teeth_scale_price": ["黑齿", "鳞价"]
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadGameData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(DATA_FILE), sandbox, { filename: DATA_FILE });
  if (!sandbox.window.BSI_GAME_DATA) {
    throw new Error("window.BSI_GAME_DATA was not defined by data.js");
  }
  return sandbox.window.BSI_GAME_DATA;
}

function serialFor(keys, id) {
  const index = keys.indexOf(id);
  return index < 0 ? "" : String(index + 1).padStart(3, "0");
}

function cleanTitle(title) {
  return String(title || "")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function pngDimensions(file) {
  const buffer = fs.readFileSync(file);
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function dimensions(file) {
  if (/\.png$/i.test(file)) return pngDimensions(file);
  return null;
}

function walkFiles(dir, matches = []) {
  if (!fs.existsSync(dir)) return matches;
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(absolute, matches);
      return;
    }
    if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      matches.push(absolute);
    }
  });
  return matches;
}

function expectedPath(root, prefix, serial, assetId, title) {
  return `${root}/${prefix}-${serial}_${assetId}_${cleanTitle(title)}.png`;
}

function ratioLabel(ratio) {
  if (Math.abs(ratio - 3) <= 0.01) return "3:1";
  if (Math.abs(ratio - 16 / 9) <= 0.01) return "16:9";
  if (Math.abs(ratio - 4 / 3) <= 0.01) return "4:3";
  if (Math.abs(ratio - 1) <= 0.01) return "1:1";
  return ratio.toFixed(2);
}

function addOrderedAssets(list, collection, prefix, root, group, ratio, minWidth, minHeight, options = {}) {
  const allowedRatios = Array.isArray(ratio) ? ratio : [ratio];
  const keys = Object.keys(collection || {});
  keys.forEach((id) => {
    const item = collection[id];
    const assetId = options.stripRandomPrefix ? id.replace(/^rnd_/, "") : id;
    list.push({
      id,
      group,
      ratio: allowedRatios[0],
      allowedRatios,
      aspectLabel: options.aspectLabel || allowedRatios.map(ratioLabel).join(" / "),
      minWidth,
      minHeight,
      path: expectedPath(root, prefix, serialFor(keys, id), assetId, item.name || item.title || id)
    });
  });
}

function buildExpectedAssets(data) {
  const expected = [];
  const stageMap = data.stageAssets?.generatedStageBackgrounds || {};

  Object.entries(stageMap).forEach(([terrain, filePath]) => {
    expected.push({
      id: terrain,
      group: "A-stage",
      ratio: 3,
      allowedRatios: [3],
      aspectLabel: "3:1",
      minWidth: 2400,
      minHeight: 800,
      path: filePath
    });
  });

  addOrderedAssets(
    expected,
    data.locations,
    "LOC",
    "../../02_设计资产/可用素材/B组地点事件图",
    "B-location",
    LANDSCAPE_RATIO,
    1280,
    720
  );
  addOrderedAssets(
    expected,
    data.events,
    "EVT",
    "../../02_设计资产/可用素材/B组地点事件图",
    "B-event",
    ENCOUNTER_RATIOS,
    960,
    720,
    { aspectLabel: ENCOUNTER_ASPECT_LABEL }
  );
  addOrderedAssets(
    expected,
    data.routeEvents,
    "RTE",
    "../../02_设计资产/可用素材/C组路遇危机结局图",
    "C-route",
    ENCOUNTER_RATIOS,
    960,
    720,
    { aspectLabel: ENCOUNTER_ASPECT_LABEL }
  );
  addOrderedAssets(
    expected,
    data.randomRouteEvents,
    "RND",
    "../../02_设计资产/可用素材/C组路遇危机结局图",
    "C-random",
    ENCOUNTER_RATIOS,
    960,
    720,
    { aspectLabel: ENCOUNTER_ASPECT_LABEL, stripRandomPrefix: true }
  );
  addOrderedAssets(
    expected,
    data.crisisEvents,
    "CRS",
    "../../02_设计资产/可用素材/C组路遇危机结局图",
    "C-crisis",
    ENCOUNTER_RATIOS,
    960,
    720,
    { aspectLabel: ENCOUNTER_ASPECT_LABEL }
  );

  [
    ["rift", "END-001_rift_入裂隙.png"],
    ["return", "END-002_return_归中原.png"],
    ["stranded", "END-003_lost_stranded_迷失九州_旅途断绝.png"]
  ].forEach(([id, fileName]) => {
    expected.push({
      id,
      group: "C-ending",
      ratio: ENCOUNTER_RATIOS[0],
      allowedRatios: ENCOUNTER_RATIOS,
      aspectLabel: ENCOUNTER_ASPECT_LABEL,
      minWidth: 960,
      minHeight: 720,
      path: `../../02_设计资产/可用素材/C组路遇危机结局图/${fileName}`
    });
  });

  return expected;
}

function priorityKey(asset) {
  return `${asset.group}:${asset.id}`;
}

function annotatePriority(asset) {
  const priority = FIRST_PASS_PRIORITY_BY_KEY.get(priorityKey(asset));
  if (!priority) return asset;
  return {
    ...asset,
    priority: priority.priority,
    priorityReason: priority.reason
  };
}

function inspectAsset(asset) {
  const absolutePath = path.resolve(ROOT, asset.path);
  if (!fs.existsSync(absolutePath)) {
    return { ...asset, status: "missing", absolutePath };
  }

  const size = dimensions(absolutePath);
  if (!size) {
    return { ...asset, status: "invalid", absolutePath, issue: "无法读取 PNG 尺寸" };
  }

  const ratio = size.width / size.height;
  const allowedRatios = Array.isArray(asset.allowedRatios) && asset.allowedRatios.length
    ? asset.allowedRatios
    : [asset.ratio];
  const ratioOk = allowedRatios.some((expectedRatio) => (
    Math.abs(ratio - expectedRatio) <= RATIO_TOLERANCE
  ));
  const resolutionOk = size.width >= asset.minWidth && size.height >= asset.minHeight;
  const status = ratioOk && resolutionOk ? "ready" : "review";
  return {
    ...asset,
    ...size,
    actualRatio: Number(ratio.toFixed(3)),
    expectedRatio: Number(asset.ratio.toFixed(3)),
    expectedRatios: allowedRatios.map((item) => Number(item.toFixed(3))),
    status,
    absolutePath,
    issue: [
      ratioOk ? "" : `比例应为 ${asset.aspectLabel || allowedRatios.map(ratioLabel).join(" / ")}`,
      resolutionOk ? "" : `建议至少 ${asset.minWidth}x${asset.minHeight}`
    ].filter(Boolean).join("；")
  };
}

function groupCounts(results) {
  return results.reduce((counts, item) => {
    counts[item.group] ||= { total: 0, ready: 0, review: 0, missing: 0, invalid: 0 };
    counts[item.group].total += 1;
    counts[item.group][item.status] += 1;
    return counts;
  }, {});
}

function sortedPriorityResults(results) {
  return results
    .filter((item) => item.priority)
    .sort((a, b) => a.priority - b.priority);
}

function printMarkdown(results) {
  console.log("| 优先级 | 分组 | ID | 状态 | 文件路径 | 原因 |");
  console.log("|---:|---|---|---|---|---|");
  results.forEach((item) => {
    console.log([
      item.priority || "",
      item.group,
      item.id,
      item.status,
      `\`${item.path}\``,
      item.priorityReason || ""
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });
}

function printPriority(results) {
  const priorityResults = sortedPriorityResults(results);
  console.log("首轮优先生成包");
  priorityResults.forEach((item) => {
    const detail = item.issue ? ` · ${item.issue}` : "";
    console.log(
      `${String(item.priority).padStart(2, "0")}. [${item.status}] ${item.group}:${item.id} -> ${item.path}`
    );
    console.log(`    ${item.priorityReason}${detail}`);
  });
}

function printHuman(results) {
  const counts = groupCounts(results);
  console.log("《不思异：九州》生成图素材就绪检查");
  Object.entries(counts).forEach(([group, count]) => {
    console.log(
      `${group}: ready ${count.ready}/${count.total}, review ${count.review}, missing ${count.missing}, invalid ${count.invalid}`
    );
  });

  const priorityResults = sortedPriorityResults(results);
  const priorityReady = priorityResults.filter((item) => item.status === "ready").length;
  console.log(`首轮优先生成包: ready ${priorityReady}/${priorityResults.length}`);

  const notReady = results.filter((item) => item.status !== "ready");
  if (!notReady.length) {
    console.log("PASS all generated art assets are ready.");
    return;
  }

  console.log(`WARN not ready: ${notReady.length}/${results.length}`);
  notReady.slice(0, 20).forEach((item) => {
    const detail = item.issue ? ` · ${item.issue}` : "";
    console.log(`- ${item.status}: ${item.path}${detail}`);
  });
  if (notReady.length > 20) {
    console.log(`... and ${notReady.length - 20} more`);
  }
}

function mdEscape(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, "<br>");
}

function statusText(item) {
  if (item.status === "ready") return "ready";
  if (item.status === "review") return `review: ${item.issue || "待复核"}`;
  if (item.status === "invalid") return `invalid: ${item.issue || "无法读取"}`;
  return "missing";
}

function expectedSizeText(item) {
  const ratio = item.aspectLabel || (item.group === "A-stage" ? "3:1" : "16:9");
  return `${ratio} / >= ${item.minWidth}x${item.minHeight}`;
}

function buildCandidateIndex() {
  const assetRoot = path.resolve(ROOT, "../../02_设计资产/可用素材");
  return walkFiles(assetRoot).map((absolutePath) => {
    const relativePath = path.relative(ROOT, absolutePath).split(path.sep).join("/");
    const size = dimensions(absolutePath);
    return {
      absolutePath,
      relativePath,
      fileName: path.basename(absolutePath),
      width: size?.width || "",
      height: size?.height || ""
    };
  });
}

function findCandidateAssets(asset, candidateIndex) {
  const keywords = CANDIDATE_KEYWORDS_BY_KEY[priorityKey(asset)] || [];
  if (!keywords.length) return [];
  return candidateIndex
    .filter((candidate) => keywords.some((keyword) => candidate.relativePath.includes(keyword)))
    .filter((candidate) => path.resolve(ROOT, asset.path) !== candidate.absolutePath)
    .slice(0, 5);
}

function formatCandidateList(candidates) {
  if (!candidates.length) return "无";
  return candidates.map((candidate) => {
    const size = candidate.width && candidate.height ? ` ${candidate.width}x${candidate.height}` : "";
    return `\`${candidate.relativePath}\`${size}`;
  }).join("<br>");
}

function buildImportWorkbench(results) {
  const priorityResults = sortedPriorityResults(results);
  const readyCount = priorityResults.filter((item) => item.status === "ready").length;
  const candidateIndex = buildCandidateIndex();
  const lines = [
    "# 《不思异：九州》首轮 12 张关键图导入核名工作台",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "## 当前状态",
    "",
    `- 首轮关键图 ready：${readyCount}/${priorityResults.length}`,
    "- 正式图目标：只认下表中的目录和文件名。",
    "- 现有候选素材：只作参考或 fallback，不自动当作正式生成图。",
    "- 导入后刷新网页加载清单：",
    "",
    "```text",
    "node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest",
    "```",
    "",
    "- 视觉 Prompt 包：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-023_首轮12张关键图Prompt包.md`",
    "",
    "## 导入步骤",
    "",
    "1. 按 D023 生成首轮 12 张图。",
    "2. 按下表的“目标文件”保存，不要改名、不要多加括号或版本号。",
    "3. A 组放入 `A组风格锁定/`；B 组放入 `B组地点事件图/`；C 组放入 `C组路遇危机结局图/`。",
    "4. 运行 `asset-readiness-check.js --priority` 看 12 张是否 ready。",
    "5. 运行 `asset-readiness-check.js --write-manifest` 让试玩网页启用已 ready 图片。",
    "6. 打开试玩入口验证地图页和旅途页。",
    "",
    "## 首轮 12 张核名表",
    "",
    "| 优先级 | 分组 | ID | 状态 | 规格 | 目标文件 | 用途 | 现有参考候选 |",
    "|---:|---|---|---|---|---|---|---|"
  ];

  priorityResults.forEach((item) => {
    const candidates = findCandidateAssets(item, candidateIndex);
    lines.push([
      item.priority,
      item.group,
      item.id,
      statusText(item),
      expectedSizeText(item),
      `\`${item.path}\``,
      item.priorityReason || "",
      formatCandidateList(candidates)
    ].map(mdEscape).join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });

  lines.push(
    "",
    "## 验收命令",
    "",
    "```text",
    "node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority",
    "node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest",
    "node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js",
    "node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js",
    "```",
    "",
    "## 注意",
    "",
    "- A 组必须是背景长图，不带车队、人物、UI、文字、水印。",
    "- B/C 组必须是地点或事件大图，不要把 UI 节点、地图钉、路线卡画进图里。",
    "- 如果工具输出 `review`，先看比例和分辨率；不要急着接入网页。",
    "- 如果风格明显偏仙侠、西幻、现代电影感，宁可重生，不要强行入库。"
  );

  return `${lines.join("\n")}\n`;
}

function writeImportWorkbench(results) {
  const body = buildImportWorkbench(results);
  fs.writeFileSync(IMPORT_WORKBENCH_FILE, body, "utf8");
  console.error(`Wrote ${path.relative(process.cwd(), IMPORT_WORKBENCH_FILE)}.`);
  return body;
}

function groupLabel(group) {
  return {
    "A-stage": "路段",
    "B-location": "地点",
    "B-event": "事件",
    "C-route": "路遇",
    "C-random": "随机",
    "C-crisis": "危机",
    "C-ending": "结局"
  }[group] || group;
}

function buildStatusSummary(items) {
  return {
    total: items.length,
    ready: items.filter((item) => item.status === "ready").length,
    missing: items.filter((item) => item.status === "missing").length,
    review: items.filter((item) => item.status === "review").length,
    invalid: items.filter((item) => item.status === "invalid").length
  };
}

function buildGroupStatus(items) {
  return items.reduce((groups, item) => {
    const group = item.group;
    groups[group] ||= { group, label: groupLabel(group), total: 0, ready: 0, missing: 0, review: 0, invalid: 0 };
    groups[group].total += 1;
    groups[group][item.status] = (groups[group][item.status] || 0) + 1;
    return groups;
  }, {});
}

function compactNextMissing(item) {
  if (!item) return null;
  return {
    priority: item.priority || null,
    group: item.group,
    id: item.id,
    path: item.path,
    reason: item.priorityReason || ""
  };
}

function buildEntryStatus(results) {
  const priorityResults = sortedPriorityResults(results);
  const nextMissing = priorityResults.find((item) => item.status !== "ready") || null;
  const nextLibraryMissing = results.find((item) => item.status !== "ready") || null;
  return {
    generatedAt: new Date().toISOString(),
    source: "asset-readiness-check.js",
    workbench: "./generated-art-import-workbench.md",
    promptPack: "../../../协作/D_BSI-D-023_首轮12张关键图Prompt包.md",
    manifest: "./generated-art-manifest.js",
    summary: buildStatusSummary(priorityResults),
    groups: Object.values(buildGroupStatus(priorityResults)),
    nextMissing: compactNextMissing(nextMissing),
    librarySummary: buildStatusSummary(results),
    libraryGroups: Object.values(buildGroupStatus(results)),
    nextLibraryMissing: compactNextMissing(nextLibraryMissing)
  };
}

function writeEntryStatus(results) {
  const status = buildEntryStatus(results);
  const body = `window.BSI_GENERATED_ART_STATUS = ${JSON.stringify(status, null, 2)};\n`;
  fs.writeFileSync(ENTRY_STATUS_FILE, body, "utf8");
  console.error(
    `Wrote ${path.relative(process.cwd(), ENTRY_STATUS_FILE)} ` +
    `(${status.librarySummary.ready}/${status.librarySummary.total} ready, first-pass ${status.summary.ready}/${status.summary.total}).`
  );
  return status;
}

function buildManifest(results) {
  const readyAssets = results.filter((item) => item.status === "ready");
  return {
    generatedAt: new Date().toISOString(),
    source: "asset-readiness-check.js --write-manifest",
    ready: readyAssets.map((item) => item.path),
    assets: readyAssets.map((item) => ({
      group: item.group,
      id: item.id,
      path: item.path,
      width: item.width,
      height: item.height
    })),
    counts: groupCounts(results)
  };
}

function writeManifest(results) {
  const manifest = buildManifest(results);
  const body = `window.BSI_GENERATED_ART_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`;
  fs.writeFileSync(MANIFEST_FILE, body, "utf8");
  console.error(`Wrote ${path.relative(process.cwd(), MANIFEST_FILE)} (${manifest.ready.length} ready assets).`);
  return manifest;
}

function main() {
  const data = loadGameData();
  const expected = buildExpectedAssets(data).map(annotatePriority);
  const results = expected.map(inspectAsset);
  const notReady = results.filter((item) => item.status !== "ready");
  const priorityResults = sortedPriorityResults(results);
  const outputResults = PRIORITY_ONLY ? priorityResults : results;
  const manifest = WRITE_MANIFEST ? writeManifest(results) : null;
  const importWorkbench = WRITE_IMPORT_WORKBENCH ? writeImportWorkbench(results) : null;
  const entryStatus = (WRITE_ENTRY_STATUS || WRITE_MANIFEST || WRITE_IMPORT_WORKBENCH)
    ? writeEntryStatus(results)
    : null;

  if (JSON_OUTPUT) {
    console.log(JSON.stringify({
      strict: STRICT,
      priorityOnly: PRIORITY_ONLY,
      manifestFile: WRITE_MANIFEST ? MANIFEST_FILE : null,
      manifest,
      importWorkbenchFile: WRITE_IMPORT_WORKBENCH ? IMPORT_WORKBENCH_FILE : null,
      entryStatusFile: entryStatus ? ENTRY_STATUS_FILE : null,
      entryStatus,
      counts: groupCounts(outputResults),
      priority: priorityResults,
      results: outputResults
    }, null, 2));
  } else if (IMPORT_WORKBENCH) {
    console.log(importWorkbench || buildImportWorkbench(results));
  } else if (MARKDOWN_OUTPUT) {
    printMarkdown(outputResults);
  } else if (PRIORITY_ONLY) {
    printPriority(results);
  } else {
    printHuman(results);
  }

  if (STRICT && notReady.length) {
    process.exitCode = 1;
  }
}

main();
