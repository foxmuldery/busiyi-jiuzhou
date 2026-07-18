#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DEFAULT_BASE_URL = "https://webdeploy-green.vercel.app";
const BASE_URL = String(process.env.BSI_ONLINE_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
const PLAYTEST_PASSWORD = "tusun2026";
const PASSWORD_HASH = "019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa";
const FILES = {
  statusJs: path.join(ROOT, "online-smoke-status.js"),
  reportMd: path.join(ROOT, "online-smoke-status.md")
};

const pages = [
  {
    id: "root",
    label: "公开根入口",
    path: "/",
    required: [
      "不思异：九州",
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "复制试玩邀请",
      "《不思异：九州》内部试玩邀请",
      "填写反馈",
      "复制 5 分钟任务",
      "复制听音任务",
      `试玩密码：${PLAYTEST_PASSWORD}`
    ]
  },
  {
    id: "play",
    label: "干净新局跳转页",
    path: "/play/",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "开始《不思异：九州》干净新局",
      "index.html?fresh=1"
    ]
  },
  {
    id: "game",
    label: "游戏主页面",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&drawer=log",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "runFeedbackLink",
      "P0反馈填写页.html",
      "行旅日志",
      "本局复盘"
    ]
  },
  {
    id: "app-js",
    label: "游戏逻辑脚本",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/app.js",
    required: [
      "feedback-form",
      "getPlaytestRunCode",
      "getFeedbackFormUrl",
      "填写反馈",
      "P0反馈填写页.html",
      "没通关或要补主观感受时使用"
    ]
  },
  {
    id: "styles",
    label: "游戏样式",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/styles.css",
    required: [
      "ending-feedback",
      "run-recap-actions",
      "run-feedback-link"
    ]
  },
  {
    id: "feedback",
    label: "P0 反馈填写页",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E5%8F%8D%E9%A6%88%E5%A1%AB%E5%86%99%E9%A1%B5.html",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "P0 反馈填写页",
      "试玩编号",
      "applyUrlPrefill",
      "生成并复制反馈包",
      "《不思异：九州》P0 统一反馈包"
    ]
  },
  {
    id: "audio-workbench",
    label: "P0 音频验收台",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E9%9F%B3%E9%A2%91%E5%90%AC%E6%84%9F%E9%AA%8C%E6%94%B6%E5%B7%A5%E4%BD%9C%E5%8F%B0.html",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "P0 音频听感验收工作台",
      "复制听音任务",
      "复制音频验收摘要",
      "试玩编号",
      "已带入试玩编号"
    ]
  },
  {
    id: "human-workbench",
    label: "P0 真人验收台",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E7%9C%9F%E4%BA%BA%E8%AF%95%E7%8E%A9%E9%AA%8C%E6%94%B6%E5%B7%A5%E4%BD%9C%E5%8F%B0.html",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "P0 真人试玩验收工作台",
      "反馈证据雷达",
      "三段材料回收状态",
      "试玩编号一致性",
      "复制补收消息"
    ]
  },
  {
    id: "batch-desk",
    label: "P0 发测批次台",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E5%8F%91%E6%B5%8B%E6%89%B9%E6%AC%A1%E5%8F%B0.html",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "P0 发测批次台",
      "复制本批邀请",
      "任务类型",
      "目标反馈数",
      "已回收反馈",
      "还差反馈",
      `试玩密码：${PLAYTEST_PASSWORD}`
    ]
  },
  {
    id: "feedback-inbox",
    label: "P0 人工反馈收件台",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E4%BA%BA%E5%B7%A5%E5%8F%8D%E9%A6%88%E6%94%B6%E4%BB%B6%E5%8F%B0.html",
    required: [
      "BSI_PLAYTEST_AUTH",
      PASSWORD_HASH,
      "P0 人工反馈收件台",
      "试玩编号",
      "局数",
      "extractRunCodes",
      "按试玩编号分组",
      "缺试玩编号",
      "补同一局的 JZ 试玩编号"
    ]
  },
  {
    id: "p0-status",
    label: "P0 状态文件",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/p0-readiness-status.js",
    required: [
      "window.BSI_P0_READINESS_STATUS",
      `"password": "${PLAYTEST_PASSWORD}"`,
      '"machineText": "9/9"',
      "反馈填写页"
    ]
  },
  {
    id: "audio-health",
    label: "音频技术状态",
    path: "/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/audio-health-status.js",
    required: [
      "window.BSI_AUDIO_HEALTH_STATUS",
      '"problemCount": 0',
      '"totalAssets": 20',
      '"uniqueFiles": 15'
    ]
  }
];

function pageUrl(page) {
  return `${BASE_URL}${page.path}`;
}

function formatStatus(ok) {
  return ok ? "通过" : "需处理";
}

async function fetchText(page) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(pageUrl(page), {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "busi-jiuzhou-online-smoke/1.0"
      }
    });
    const text = await response.text();
    return {
      ok: true,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      text,
      url: response.url
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      headers: {},
      text: "",
      url: pageUrl(page),
      error: error?.message || String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

async function inspectPage(page) {
  const response = await fetchText(page);
  const missing = page.required.filter((needle) => !response.text.includes(needle));
  const noindex = String(response.headers["x-robots-tag"] || "").toLowerCase().includes("noindex");
  const expectsNoindex = !["app-js", "styles"].includes(page.id);
  const problems = [];
  if (!response.ok) problems.push(response.error || "请求失败");
  if (response.status !== 200) problems.push(`HTTP ${response.status}`);
  if (expectsNoindex && !noindex) problems.push("缺少 x-robots-tag: noindex");
  missing.forEach((needle) => problems.push(`缺少片段：${needle}`));
  return {
    id: page.id,
    label: page.label,
    url: pageUrl(page),
    finalUrl: response.url,
    status: response.status,
    noindex,
    requiredCount: page.required.length,
    missing,
    problems,
    ok: problems.length === 0
  };
}

async function inspectOnline() {
  const rows = [];
  for (const page of pages) {
    rows.push(await inspectPage(page));
  }
  const problems = rows.flatMap((row) => row.problems.map((problem) => `${row.label}: ${problem}`));
  return {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    title: problems.length ? "线上公开站冒烟有阻断项" : "线上公开站冒烟通过，待真人试玩",
    summary: {
      total: rows.length,
      passed: rows.filter((row) => row.ok).length,
      failed: rows.filter((row) => !row.ok).length,
      problemCount: problems.length
    },
    rows,
    problems
  };
}

function renderMarkdown(payload) {
  const lines = [
    "# 《不思异：九州》线上公开站冒烟检查",
    "",
    `生成时间：${payload.generatedAt}`,
    "",
    `目标站点：${payload.baseUrl}`,
    "",
    `结论：${payload.title}`,
    "",
    `页面：${payload.summary.total}；通过：${payload.summary.passed}；失败：${payload.summary.failed}；阻断项：${payload.summary.problemCount}。`,
    "",
    "## 页面检查",
    "",
    "| 页面 | 状态 | HTTP | noindex | 必要片段 | 线上地址 |",
    "|---|---|---:|---|---:|---|",
    ...payload.rows.map((row) => [
      row.label,
      formatStatus(row.ok),
      row.status,
      row.noindex ? "是" : "否",
      `${row.requiredCount - row.missing.length}/${row.requiredCount}`,
      row.url
    ].map((value) => String(value).replace(/\|/g, "/")).join(" | ")).map((line) => `| ${line} |`),
    "",
    "## 阻断项",
    "",
    ...(payload.problems.length ? payload.problems.map((item) => `- ${item}`) : ["- 无"]),
    "",
    "## 说明",
    "",
    "- 这是线上公开站的技术冒烟检查，只证明部署内容、密码门、noindex、反馈页和状态文件可访问。",
    "- 它不替代真人 5 分钟试玩，也不替代主观听音。",
    ""
  ];
  return lines.join("\n");
}

function writeReports(payload) {
  fs.writeFileSync(FILES.statusJs, `window.BSI_ONLINE_SMOKE_STATUS = ${JSON.stringify(payload, null, 2)};\n`);
  fs.writeFileSync(FILES.reportMd, renderMarkdown(payload));
}

async function main() {
  const payload = await inspectOnline();
  if (process.argv.includes("--write-report")) {
    writeReports(payload);
    console.log(`REPORT ${FILES.statusJs}`);
    console.log(`REPORT ${FILES.reportMd}`);
  }
  console.log(`${payload.title}；页面 ${payload.summary.passed}/${payload.summary.total}；阻断项 ${payload.summary.problemCount}`);
  if (payload.problems.length) {
    payload.problems.forEach((problem) => console.error(`- ${problem}`));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
