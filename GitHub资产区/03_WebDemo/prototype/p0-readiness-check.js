#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const ONLINE_ENTRY_URL = "https://webdeploy-green.vercel.app/";
const ONLINE_PLAY_URL = "https://webdeploy-green.vercel.app/play";
const PLAYTEST_PASSWORD = "tusun2026";
const FILES = {
  html: path.join(ROOT, "index.html"),
  app: path.join(ROOT, "app.js"),
  qaCheck: path.join(ROOT, "qa-check.js"),
  playtestFlowCheck: path.join(ROOT, "playtest-flow-check.js"),
  playtestFlowStatus: path.join(ROOT, "playtest-flow-status.md"),
  audioHealthCheck: path.join(ROOT, "audio-health-check.js"),
  audioHealthStatus: path.join(ROOT, "audio-health-status.js"),
  audioHealthReport: path.join(ROOT, "audio-health-status.md"),
  onlineSmokeCheck: path.join(ROOT, "online-smoke-check.js"),
  onlineSmokeStatus: path.join(ROOT, "online-smoke-status.js"),
  onlineSmokeReport: path.join(ROOT, "online-smoke-status.md"),
  visualSmokeCheck: path.join(ROOT, "visual-smoke-check.js"),
  visualSmokeStatus: path.join(ROOT, "visual-smoke-status.js"),
  visualSmokeReport: path.join(ROOT, "visual-smoke-status.md"),
  balanceStatus: path.join(ROOT, "balance-status.js"),
  generatedArtStatus: path.join(ROOT, "generated-art-status.js"),
  visualReplacementStatus: path.join(ROOT, "visual-replacement-status.js"),
  data: path.join(ROOT, "data.js"),
  launcher: path.join(ROOT, "试玩入口.html"),
  batchDesk: path.join(ROOT, "P0发测批次台.html"),
  feedbackPage: path.join(ROOT, "P0反馈填写页.html"),
  feedbackInbox: path.join(ROOT, "P0人工反馈收件台.html"),
  audioWorkbench: path.join(ROOT, "P0音频听感验收工作台.html"),
  webdeployPackage: path.join(ROOT, "build-webdeploy-package.js"),
  statusJs: path.join(ROOT, "p0-readiness-status.js"),
  reportMd: path.join(ROOT, "P0试玩版总验收报告.md"),
  reportHtml: path.join(ROOT, "P0试玩版总验收报告.html")
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadWindowGlobal(file, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window[globalName];
}

function runNode(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
    env: {
      ...process.env,
      BSI_SKIP_P0_READINESS_CONTRACT: "1"
    }
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || ""
  };
}

function percent(pass, total) {
  if (!total) return "0%";
  return `${Math.round((pass / total) * 100)}%`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statusLabel(item) {
  if (item.status === "pass") return "通过";
  if (item.status === "manual") return "待人工";
  return "需处理";
}

function buildChecks() {
  const checks = [];

  const qa = runNode(["qa-check.js"]);
  checks.push({
    id: "qa",
    label: "总 QA 守门",
    status: qa.ok ? "pass" : "fail",
    evidence: qa.ok ? "qa-check.js 全部通过" : "qa-check.js 未通过",
    next: qa.ok ? "继续保持" : "先修复 QA 失败项"
  });

  const flow = runNode(["playtest-flow-check.js", "--write-report"]);
  const flowReport = fs.existsSync(FILES.playtestFlowStatus) ? read(FILES.playtestFlowStatus) : "";
  checks.push({
    id: "playtest-flow",
    label: "自动试玩链",
    status: flow.ok && flowReport.includes("通过") ? "pass" : "fail",
    evidence: flow.ok ? "入口、第一分钟、补给、选路、半途、终点和复盘链路通过" : "自动试玩链未通过",
    next: flow.ok ? "等待真人试玩反馈" : "先修复自动试玩路径"
  });

  const balance = loadWindowGlobal(FILES.balanceStatus, "BSI_BALANCE_STATUS");
  const gates = balance?.summary?.gates || [];
  const passedGates = gates.filter((gate) => gate.pass).length;
  checks.push({
    id: "balance",
    label: "P0/P1 平衡门槛",
    status: passedGates === gates.length && gates.length > 0 ? "pass" : "fail",
    evidence: `${balance?.summary?.title || "未知"}；门槛 ${balance?.summary?.gatePassText || `${passedGates}/${gates.length}`}；${balance?.summary?.nextText || ""}`,
    next: "新增事件、路线或补给后重新跑 1000 局"
  });

  const art = loadWindowGlobal(FILES.generatedArtStatus, "BSI_GENERATED_ART_STATUS");
  const library = art?.librarySummary || art?.summary || {};
  checks.push({
    id: "art",
    label: "全量试玩图",
    status: library.total && library.ready === library.total ? "pass" : "fail",
    evidence: `${library.ready || 0}/${library.total || 0} ready`,
    next: library.ready === library.total ? "继续做统一风格精修" : "补齐缺失图"
  });

  const visual = loadWindowGlobal(FILES.visualReplacementStatus, "BSI_VISUAL_REPLACEMENT_STATUS");
  const visualSummary = visual?.summary || {};
  checks.push({
    id: "highfreq-visual",
    label: "高频事件图替换",
    status: visualSummary.total && visualSummary.replaced === visualSummary.total ? "pass" : "fail",
    evidence: visualSummary.readyText || `${visualSummary.replaced || 0}/${visualSummary.total || 0}`,
    next: visualSummary.replaced === visualSummary.total ? "后续按新事件继续补图" : "替换剩余高频图"
  });

  const data = loadWindowGlobal(FILES.data, "BSI_GAME_DATA");
  const audioAssets = Object.values(data?.audioAssets || {});
  const musicCount = audioAssets.filter((asset) => asset.type === "music").length;
  const temporaryCount = audioAssets.filter((asset) => asset.status === "demo-temporary").length;
  const reviewCount = audioAssets.filter((asset) => asset.status === "review-pending").length;
  const audioHealth = runNode(["audio-health-check.js", "--write-report"]);
  const audioHealthStatus = fs.existsSync(FILES.audioHealthStatus)
    ? loadWindowGlobal(FILES.audioHealthStatus, "BSI_AUDIO_HEALTH_STATUS")
    : null;
  checks.push({
    id: "audio-health",
    label: "音频技术体检",
    status: audioHealth.ok && audioHealthStatus?.summary?.problemCount === 0 ? "pass" : "fail",
    evidence: audioHealthStatus
      ? `资产 ${audioHealthStatus.summary.totalAssets}，唯一文件 ${audioHealthStatus.summary.uniqueFiles}，阻断项 ${audioHealthStatus.summary.problemCount}`
      : "音频技术体检报告缺失",
    next: audioHealth.ok ? "等待主观听音，不把待复核音频标为正式素材" : "先处理音频缺失、时长或 loop/短音效规则问题"
  });
  const onlineSmokeStatus = fs.existsSync(FILES.onlineSmokeStatus)
    ? loadWindowGlobal(FILES.onlineSmokeStatus, "BSI_ONLINE_SMOKE_STATUS")
    : null;
  const onlineSmokeOk = onlineSmokeStatus?.summary?.problemCount === 0
    && onlineSmokeStatus?.summary?.passed === onlineSmokeStatus?.summary?.total
    && onlineSmokeStatus?.baseUrl === ONLINE_ENTRY_URL.replace(/\/$/, "");
  checks.push({
    id: "online-smoke",
    label: "线上公开站冒烟",
    status: onlineSmokeOk ? "pass" : "fail",
    evidence: onlineSmokeStatus
      ? `页面 ${onlineSmokeStatus.summary.passed}/${onlineSmokeStatus.summary.total}，阻断项 ${onlineSmokeStatus.summary.problemCount}`
      : "线上冒烟状态缺失",
    next: onlineSmokeOk ? "每次部署后重新跑 online-smoke-check.js --write-report" : "部署后重新跑线上冒烟并处理缺失入口/密码门/noindex"
  });
  const visualSmokeStatus = fs.existsSync(FILES.visualSmokeStatus)
    ? loadWindowGlobal(FILES.visualSmokeStatus, "BSI_VISUAL_SMOKE_STATUS")
    : null;
  const visualSmokeOk = visualSmokeStatus?.summary?.problemCount === 0
    && visualSmokeStatus?.summary?.passed === visualSmokeStatus?.summary?.total
    && visualSmokeStatus?.baseUrl === ONLINE_ENTRY_URL.replace(/\/$/, "");
  checks.push({
    id: "visual-smoke",
    label: "线上可视化验收",
    status: visualSmokeOk ? "pass" : "fail",
    evidence: visualSmokeStatus
      ? `截图 ${visualSmokeStatus.summary.passed}/${visualSmokeStatus.summary.total}，阻断项 ${visualSmokeStatus.summary.problemCount}`
      : "线上可视化状态缺失",
    next: visualSmokeOk ? "每次部署后重新跑 visual-smoke-check.js --write-report" : "重新跑可视化验收并处理首屏、截图或控制台问题"
  });
  checks.push({
    id: "audio",
    label: "声音可试玩状态",
    status: musicCount >= 6 && temporaryCount > 0 && reviewCount > 0 ? "manual" : "fail",
    evidence: `音乐 ${musicCount}，待复核 ${reviewCount}，临时 ${temporaryCount}`,
    next: "用 P0 音频听感验收工作台复制 3 分钟听音任务，并回收音频验收摘要"
  });

  const launcher = read(FILES.launcher);
  const html = read(FILES.html);
  const app = read(FILES.app);
  const batchDesk = fs.existsSync(FILES.batchDesk) ? read(FILES.batchDesk) : "";
  const feedbackPage = fs.existsSync(FILES.feedbackPage) ? read(FILES.feedbackPage) : "";
  const feedbackInbox = fs.existsSync(FILES.feedbackInbox) ? read(FILES.feedbackInbox) : "";
  const audioWorkbench = fs.existsSync(FILES.audioWorkbench) ? read(FILES.audioWorkbench) : "";
  const webdeployPackage = fs.existsSync(FILES.webdeployPackage) ? read(FILES.webdeployPackage) : "";
  const hasPlaytestPackage = launcher.includes("复制完整试玩包");
  const hasFiveMinuteTask = launcher.includes("复制 5 分钟任务")
    && launcher.includes("《不思异：九州》5 分钟试玩任务")
    && launcher.includes(`试玩密码：${PLAYTEST_PASSWORD}`);
  const hasPublicRootTask = webdeployPackage.includes("copyFiveMinuteTask")
    && webdeployPackage.includes("《不思异：九州》5 分钟试玩任务")
    && webdeployPackage.includes(`试玩密码：${PLAYTEST_PASSWORD}`)
    && webdeployPackage.includes("走到结局后，优先点“复盘本局”里的“复制反馈包”。");
  const hasPublicRootAudioTask = webdeployPackage.includes("copyAudioTask")
    && webdeployPackage.includes("《不思异：九州》P0 3 分钟听音任务")
    && webdeployPackage.includes("请只判断听感，不判断授权")
    && webdeployPackage.includes("先听完 6 首音乐候选")
    && webdeployPackage.includes("复制音频验收摘要");
  const hasRecoveryChecklist = launcher.includes("复制回收清单")
    && launcher.includes("P0 人工回收清单")
    && launcher.includes("优先回收游戏结局里的《P0 试玩反馈包》")
    && launcher.includes("拆入三栏");
  const hasBatchDesk = batchDesk.includes("P0 发测批次台")
    && batchDesk.includes("bsi.p0.playtest.batch.v1")
    && batchDesk.includes("复制本批邀请")
    && batchDesk.includes("复制本批追收")
    && batchDesk.includes("复制发测汇总")
    && batchDesk.includes("任务类型")
    && batchDesk.includes("目标反馈数")
    && batchDesk.includes("已回收反馈")
    && batchDesk.includes("还差反馈")
    && batchDesk.includes("P0-BATCH-")
    && batchDesk.includes(`试玩密码：${PLAYTEST_PASSWORD}`)
    && launcher.includes("P0 发测批次台")
    && launcher.includes("./P0发测批次台.html")
    && webdeployPackage.includes("P0发测批次台.html");
  const hasFeedbackForm = feedbackPage.includes("P0 反馈填写页")
    && feedbackPage.includes("生成并复制反馈包")
    && feedbackPage.includes("《不思异：九州》P0 统一反馈包")
    && feedbackPage.includes("本局复盘 / 结局反馈包 / 音频验收摘要")
    && feedbackPage.includes("只改一件事的话")
    && launcher.includes("P0 反馈填写页")
    && webdeployPackage.includes("P0反馈填写页.html")
    && webdeployPackage.includes("填写反馈")
    && webdeployPackage.includes("没走到结局也可以点“填写反馈”");
  const hasFeedbackInbox = feedbackInbox.includes("P0 人工反馈收件台")
    && feedbackInbox.includes("bsi.p0.feedback.inbox.v1")
    && feedbackInbox.includes("function extractRunCodes")
    && feedbackInbox.includes("runCodes")
    && feedbackInbox.includes("runCodeCount")
    && feedbackInbox.includes("试玩编号")
    && feedbackInbox.includes("局数")
    && feedbackInbox.includes("按试玩编号分组")
    && feedbackInbox.includes("缺试玩编号")
    && feedbackInbox.includes("补同一局的 JZ 试玩编号")
    && feedbackInbox.includes("复制收件汇总")
    && feedbackInbox.includes("复制本条补收消息")
    && feedbackInbox.includes("可验收候选")
    && feedbackInbox.includes("需补材料")
    && launcher.includes("P0 反馈收件台")
    && launcher.includes("./P0人工反馈收件台.html")
    && webdeployPackage.includes("P0人工反馈收件台.html");
  const hasInGamePlaytestReminder = html.includes('id="playtestReminder"')
    && html.includes("已试玩 5 分钟")
    && html.includes('id="playtestReminderFeedback"')
    && app.includes("PLAYTEST_REMINDER_MS")
    && app.includes("playtestStartedAt")
    && app.includes("markPlaytestFeedbackOpened")
    && app.includes("playtestReminderMs")
    && app.includes("&& !textPanelState.event");
  const hasFeedbackCorrelation = app.includes("function getPlaytestRunCode")
    && app.includes("function getFeedbackFormUrl")
    && app.includes("runFeedbackLink")
    && app.includes("试玩编号：${getPlaytestRunCode()}")
    && feedbackPage.includes('id="runCode"')
    && feedbackPage.includes("function applyUrlPrefill")
    && feedbackPage.includes('params.get("run")')
    && feedbackPage.includes("已带入本局试玩编号");
  const hasAudioFeedbackCorrelation = app.includes("function getAudioReviewWorkbenchUrl")
    && app.includes('source: "game-settings"')
    && app.includes("P0音频听感验收工作台.html?")
    && audioWorkbench.includes('id="runCode"')
    && audioWorkbench.includes("试玩编号")
    && audioWorkbench.includes("new URLSearchParams(window.location.search)")
    && audioWorkbench.includes('urlParams.get("run") || urlParams.get("runCode")')
    && audioWorkbench.includes("已带入试玩编号")
    && audioWorkbench.includes('audioUrlObject.searchParams.set("run", runCode.value)')
    && audioWorkbench.includes("《不思异：九州》P0 音频听感验收摘要");
  checks.push({
    id: "handoff",
    label: "测试者交付入口",
    status: hasPublicRootTask && hasPublicRootAudioTask && hasPlaytestPackage && hasFiveMinuteTask && hasRecoveryChecklist && hasBatchDesk && hasFeedbackForm && hasFeedbackInbox && hasInGamePlaytestReminder && hasFeedbackCorrelation && hasAudioFeedbackCorrelation && launcher.includes("P0 试玩验收台") ? "pass" : "fail",
    evidence: hasPublicRootTask && hasPublicRootAudioTask && hasPlaytestPackage && hasFiveMinuteTask && hasRecoveryChecklist && hasBatchDesk && hasFeedbackForm && hasFeedbackInbox && hasInGamePlaytestReminder && hasFeedbackCorrelation && hasAudioFeedbackCorrelation ? "公开根入口、发测批次台、反馈填写页、反馈收件台按试玩编号分组、试玩编号回传、听音编号回传、游戏内 5 分钟提醒、5 分钟试玩任务、3 分钟听音任务、完整试玩包、反馈包优先指引和人工回收清单可复制" : "缺公开根入口任务、发测批次台、反馈填写页、反馈收件台试玩编号分组、试玩编号/听音编号回传、游戏内 5 分钟提醒、5 分钟试玩任务、3 分钟听音任务、完整试玩包或反馈包回收清单",
    next: "先用发测批次台登记测试者并复制邀请；游戏内到 5 分钟会提醒填写反馈并带入试玩编号；声音反馈用听音工作台回传同一编号；未走到结局时让测试者打开反馈填写页复制统一反馈包；收到多份反馈先贴入反馈收件台，按 JZ 试玩编号分组后再判断缺口"
  });

  checks.push({
    id: "human",
    label: "真人 5 分钟试玩",
    status: "manual",
    evidence: "尚需真实玩家反馈；机器检查不能替代手感判断",
    next: "至少回收 1 份结局 P0 试玩反馈包；未走到结局时收试玩记录、复盘文本和听感反馈"
  });

  return checks;
}

function buildPayload() {
  const checks = buildChecks();
  const passed = checks.filter((item) => item.status === "pass").length;
  const manual = checks.filter((item) => item.status === "manual").length;
  const failed = checks.filter((item) => item.status === "fail").length;
  const machineChecks = checks.filter((item) => item.status !== "manual");
  const machinePassed = machineChecks.filter((item) => item.status === "pass").length;
  const title = failed
    ? "P0 有阻断项"
    : manual
      ? "P0 机器验收通过，待真人确认"
      : "P0 可发测";

  return {
    generatedAt: new Date().toISOString(),
    title,
    onlineEntry: ONLINE_ENTRY_URL,
    onlinePlay: ONLINE_PLAY_URL,
    password: PLAYTEST_PASSWORD,
    summary: {
      total: checks.length,
      passed,
      manual,
      failed,
      machineText: `${machinePassed}/${machineChecks.length}`,
      passText: percent(passed, checks.length)
    },
    checks
  };
}

function renderMarkdown(payload) {
  return [
    "# 《不思异：九州》P0 试玩版总验收报告",
    "",
    `生成时间：${payload.generatedAt}`,
    "",
    `结论：${payload.title}`,
    "",
    `机器验收：${payload.summary.machineText}；总项：通过 ${payload.summary.passed} / 待人工 ${payload.summary.manual} / 需处理 ${payload.summary.failed}。`,
    "",
    "| 项目 | 状态 | 证据 | 下一步 |",
    "|---|---|---|---|",
    ...payload.checks.map((item) => `| ${item.label} | ${statusLabel(item)} | ${item.evidence.replace(/\|/g, " / ")} | ${item.next.replace(/\|/g, " / ")} |`),
    "",
    "## 主线程判断",
    "",
    "- 当前可以继续作为内部 P0 试玩候选。",
    "- 机器验收不能替代真人手感；正式扩大测试前，至少回收 1 份 5 分钟真人试玩记录。",
    "- 音频和部分素材仍处于待复核或 Demo 临时状态，不得标为正式可发布素材。",
    "",
    "## 人工收口路径",
    "",
    `1. 优先分享线上公开入口：${ONLINE_ENTRY_URL}，先点“复制试玩邀请”发给测试者；试玩密码：\`${PLAYTEST_PASSWORD}\`。`,
    "2. 发出前先打开 `P0发测批次台.html`，登记批次、测试者、任务类型、目标反馈数、已回收反馈和追收时间；需要群发时复制本批邀请。",
    "3. 测试者愿意参与后，再让他点击“复制 5 分钟任务”或直接开始试玩。",
    "4. 需要单独判断声音时，同样从线上公开入口点击“复制听音任务”，发给听音人并回收 `P0 音频听感验收摘要`。",
    "5. 测试者没走到结局时，让他打开 `P0反馈填写页.html`，填写卡点、资源压力、音频感受和复盘文本后复制 `P0 统一反馈包`。",
    "6. 收到多份反馈时，先打开 `P0人工反馈收件台.html`，逐条粘贴；收件台会抽取 `JZ-` 试玩编号，按同一局分组，并标出缺试玩编号的反馈，再复制收件汇总给主线程判断缺口。",
    "7. 需要完整交接时，再从 `试玩入口.html` 点击“复制完整试玩包”，带上发测批次台、真人验收台、反馈收件台、反馈填写页和音频验收台链接。",
    "8. 优先让测试者走到结局后，在“复盘本局”里点击“复制反馈包”，发回完整的 `P0 试玩反馈包`。",
    "9. 打开 `P0真人试玩验收工作台.html`，把完整反馈包粘贴到任意一栏后点“拆入三栏”，再用“反馈证据雷达”和“试玩编号一致性”检查下一步、复盘、资源、UI、声音五类证据是否来自同一局。",
    "10. 如果材料仍缺，先在发测批次台点击 `复制本批追收`，或在反馈收件台/真人验收台点击 `复制补收消息`、`复制本条补收消息`，直接发给测试者补 5 分钟试玩记录、音频听感或本局复盘。",
    "11. 如果测试者没有走到结局，再按人工回收清单分别收 `5分钟试玩记录`、`音频听感复核`、游戏内“志”的本局复盘或 `P0 统一反馈包`。",
    "12. 如需逐条听音，打开 `P0音频听感验收工作台.html`，生成音频验收摘要。",
    ""
  ].join("\n");
}

function renderHtml(payload) {
  const rows = payload.checks.map((item) => `
          <tr data-status="${item.status}">
            <td>${escapeHtml(item.label)}</td>
            <td>${escapeHtml(statusLabel(item))}</td>
            <td>${escapeHtml(item.evidence)}</td>
            <td>${escapeHtml(item.next)}</td>
          </tr>`).join("");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>不思异：九州 P0 试玩版总验收报告</title>
    <style>
      :root { color-scheme: dark; --ink: #f4ead0; --muted: #d2bd8c; --line: rgba(234,205,140,.24); --panel: rgba(22,16,12,.82); --accent: #d9aa5b; --green: #8fb76c; --red: #a64032; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100svh; color: var(--ink); font-family: "Songti SC", "Noto Serif SC", "STSong", serif; background: linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.62)), url("../../02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png") center / cover no-repeat, #15100c; }
      main { min-height: 100svh; display: grid; gap: 12px; padding: clamp(14px, 3vw, 28px); }
      header, section { border: 1px solid var(--line); border-radius: 8px; background: var(--panel); box-shadow: 0 18px 64px rgba(0,0,0,.46); backdrop-filter: blur(8px); }
      header { padding: 16px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; }
      .brand { margin: 0 0 5px; color: var(--muted); font: 800 12px/1.1 "PingFang SC", sans-serif; }
      h1 { margin: 0; font-size: clamp(24px, 4vw, 40px); line-height: 1.05; }
      .summary { display: flex; flex-wrap: wrap; gap: 8px; }
      .chip { border: 1px solid rgba(234,205,140,.2); border-radius: 999px; padding: 8px 10px; background: rgba(255,238,189,.07); color: var(--muted); font: 800 12px/1 "PingFang SC", sans-serif; }
      .chip strong { color: var(--ink); }
      section { padding: 14px; }
      table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 8px; }
      th, td { border-bottom: 1px solid rgba(234,205,140,.16); padding: 10px; text-align: left; vertical-align: top; font: 13px/1.45 "PingFang SC", sans-serif; }
      th { color: var(--accent); background: rgba(255,238,189,.07); }
      tr[data-status="pass"] td:nth-child(2) { color: var(--green); font-weight: 900; }
      tr[data-status="manual"] td:nth-child(2) { color: var(--accent); font-weight: 900; }
      tr[data-status="fail"] td:nth-child(2) { color: var(--red); font-weight: 900; }
      .note { color: var(--muted); font: 13px/1.55 "PingFang SC", sans-serif; }
      .steps { margin: 0; padding-left: 1.2em; color: var(--muted); font: 13px/1.65 "PingFang SC", sans-serif; }
      .steps li { margin: 4px 0; }
      a { color: var(--ink); }
      @media (max-width: 760px) { header { grid-template-columns: 1fr; } th, td { font-size: 12px; padding: 8px; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <p class="brand">《不思异：九州》内部 P0 验收</p>
          <h1>${escapeHtml(payload.title)}</h1>
        </div>
        <div class="summary">
          <span class="chip">机器验收 <strong>${escapeHtml(payload.summary.machineText)}</strong></span>
          <span class="chip">通过 <strong>${payload.summary.passed}</strong></span>
          <span class="chip">待人工 <strong>${payload.summary.manual}</strong></span>
          <span class="chip">需处理 <strong>${payload.summary.failed}</strong></span>
        </div>
      </header>
      <section>
        <table>
          <thead><tr><th>项目</th><th>状态</th><th>证据</th><th>下一步</th></tr></thead>
          <tbody>${rows}
          </tbody>
        </table>
      </section>
      <section class="note">
        <p>生成时间：${escapeHtml(payload.generatedAt)}</p>
        <p>线上公开入口：<a href="${escapeHtml(payload.onlineEntry)}">${escapeHtml(payload.onlineEntry)}</a>；干净新局：<a href="${escapeHtml(payload.onlinePlay)}">${escapeHtml(payload.onlinePlay)}</a>；试玩密码：${escapeHtml(payload.password)}</p>
        <p>机器验收不能替代真人手感。正式扩大测试前，至少回收 1 份结局 P0 试玩反馈包；未走到结局时，再回收试玩记录、复盘文本和音频听感。</p>
        <ol class="steps" aria-label="人工收口路径">
          <li>优先分享线上公开入口，先点“复制试玩邀请”发给测试者。</li>
          <li>发出前先打开 P0 发测批次台，登记批次、测试者、任务类型、目标反馈数、已回收反馈和追收时间；需要群发时复制本批邀请。</li>
          <li>测试者愿意参与后，再让他点击“复制 5 分钟任务”或直接开始试玩。</li>
          <li>需要单独判断声音时，同样从线上公开入口点击“复制听音任务”，发给听音人并回收 P0 音频听感验收摘要。</li>
          <li>测试者没走到结局时，让他打开 P0 反馈填写页，填写卡点、资源压力、音频感受和复盘文本后复制 P0 统一反馈包。</li>
          <li>收到多份反馈时，先打开 P0 人工反馈收件台，逐条粘贴；收件台会抽取 JZ 试玩编号，按同一局分组，并标出缺试玩编号的反馈，再复制收件汇总给主线程判断缺口。</li>
          <li>需要完整交接时，再从试玩入口复制完整试玩包，带上发测批次台、真人验收台、反馈收件台、反馈填写页和音频验收台链接。</li>
          <li>优先让测试者在结局“复盘本局”里复制 P0 试玩反馈包。</li>
          <li>把完整反馈包贴入 P0 真人试玩验收台任意一栏，点“拆入三栏”，用反馈证据雷达和试玩编号一致性检查下一步、复盘、资源、UI、声音五类证据是否来自同一局。</li>
          <li>如果材料仍缺，先在发测批次台点击“复制本批追收”，或在反馈收件台/真人验收台点击“复制补收消息”“复制本条补收消息”。</li>
          <li>如果测试者没走到结局，再按人工回收清单分别收 5 分钟试玩记录、音频听感复核、游戏内“志”的本局复盘或 P0 统一反馈包。</li>
          <li>需要逐条听音时，打开 P0 音频听感验收工作台并复制音频验收摘要。</li>
        </ol>
        <p><a href="./试玩入口.html">返回试玩入口</a></p>
      </section>
    </main>
  </body>
</html>`;
}

function renderStatusJs(payload) {
  const statusPayload = {
    generatedAt: payload.generatedAt,
    title: payload.title,
    onlineEntry: payload.onlineEntry,
    onlinePlay: payload.onlinePlay,
    password: payload.password,
    summary: payload.summary,
    report: "./P0试玩版总验收报告.html",
    markdownReport: "./P0试玩版总验收报告.md",
    checks: payload.checks.map((item) => ({
      id: item.id,
      label: item.label,
      status: item.status,
      statusLabel: statusLabel(item),
      evidence: item.evidence,
      next: item.next
    }))
  };
  return `window.BSI_P0_READINESS_STATUS = ${JSON.stringify(statusPayload, null, 2)};\n`;
}

function main() {
  const shouldWrite = process.argv.includes("--write-report");
  const payload = buildPayload();
  if (shouldWrite) {
    fs.writeFileSync(FILES.statusJs, renderStatusJs(payload));
    fs.writeFileSync(FILES.reportMd, renderMarkdown(payload));
    fs.writeFileSync(FILES.reportHtml, renderHtml(payload));
    console.log(`REPORT ${FILES.statusJs}`);
    console.log(`REPORT ${FILES.reportMd}`);
    console.log(`REPORT ${FILES.reportHtml}`);
  }
  console.log(`${payload.title}；机器验收 ${payload.summary.machineText}；待人工 ${payload.summary.manual}；需处理 ${payload.summary.failed}`);
  if (payload.summary.failed) process.exit(1);
}

main();
