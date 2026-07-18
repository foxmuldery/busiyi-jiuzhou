#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const DEFAULT_BASE_URL = "https://webdeploy-green.vercel.app";
const BASE_URL = String(process.env.BSI_ONLINE_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
const PASSWORD_HASH = "019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa";
const AUTH_KEY = "BSI_JIUZHOU_AUTH";
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
].filter(Boolean);

const FILES = {
  statusJs: path.join(ROOT, "visual-smoke-status.js"),
  reportMd: path.join(ROOT, "visual-smoke-status.md"),
  screenshotDir: path.join(ROOT, "visual-smoke-screenshots")
};

const desktop = { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false };
const landscape = { width: 844, height: 390, deviceScaleFactor: 1, mobile: true };

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function findChrome() {
  return CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 15000) {
  const startedAt = Date.now();
  let lastError = "";
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error?.message || String(error);
    }
    await sleep(150);
  }
  throw new Error(`Chrome 调试端口未就绪：${lastError}`);
}

function connectCdp(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    let nextId = 1;
    const callbacks = new Map();
    const listeners = new Map();

    function send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((res, rej) => callbacks.set(id, { res, rej, method }));
    }

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const callback = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) callback.rej(new Error(`${callback.method}: ${data.error.message}`));
        else callback.res(data.result || {});
        return;
      }
      if (data.method && listeners.has(data.method)) {
        for (const listener of listeners.get(data.method)) listener(data.params || {});
      }
    });

    socket.addEventListener("open", () => {
      resolve({
        send,
        on(method, listener) {
          if (!listeners.has(method)) listeners.set(method, []);
          listeners.get(method).push(listener);
        },
        close() {
          socket.close();
        }
      });
    });
    socket.addEventListener("error", () => reject(new Error("Chrome CDP WebSocket 连接失败")));
  });
}

async function waitForLoad(cdp, timeoutMs = 20000) {
  let loaded = false;
  const promise = new Promise((resolve) => {
    cdp.on("Page.loadEventFired", () => {
      loaded = true;
      resolve();
    });
  });
  await Promise.race([
    promise,
    sleep(timeoutMs).then(() => {
      if (!loaded) throw new Error("页面加载超时");
    })
  ]);
}

async function navigate(cdp, url) {
  const load = waitForLoad(cdp);
  await cdp.send("Page.navigate", { url });
  await load;
  await sleep(250);
}

async function evaluate(cdp, expression, returnByValue = true) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
  }
  return result.result?.value;
}

async function screenshot(cdp, filepath) {
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true
  });
  fs.writeFileSync(filepath, Buffer.from(result.data, "base64"));
}

async function run() {
  const chromePath = findChrome();
  if (!chromePath) throw new Error("未找到 Chrome，可通过 CHROME_PATH 指定浏览器路径");
  ensureDir(FILES.screenshotDir);

  const port = await getFreePort();
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "bsi-visual-smoke-"));
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: "ignore" });

  const logs = [];
  const problems = [];

  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
    const pageTarget = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
    if (!pageTarget) throw new Error("未找到 Chrome 页面调试 target");
    const cdp = await connectCdp(pageTarget.webSocketDebuggerUrl);
    cdp.on("Runtime.exceptionThrown", (event) => {
      logs.push({ level: "error", message: event.exceptionDetails?.text || "Runtime exception" });
    });
    cdp.on("Log.entryAdded", (event) => {
      const level = event.entry?.level || "log";
      if (["warning", "error"].includes(level)) {
        logs.push({ level, message: event.entry?.text || "" });
      }
    });

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Log.enable");

    await cdp.send("Emulation.setDeviceMetricsOverride", desktop);
    await navigate(cdp, `${BASE_URL}/`);
    await evaluate(cdp, `sessionStorage.setItem(${JSON.stringify(AUTH_KEY)}, "ok")`);
    await navigate(cdp, `${BASE_URL}/`);

    const rootState = await evaluate(cdp, `(async () => {
      const text = document.body.innerText || "";
      const inviteButton = document.querySelector("#copyPlaytestInvite");
      inviteButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 350));
      const fallback = document.querySelector("#feedbackFallback");
      const status = document.querySelector("#feedbackCopyStatus");
      return {
        title: document.title,
        url: location.href,
        bodyLength: text.length,
        hasTitle: text.includes("不思异：九州"),
        hasInvite: text.includes("复制试玩邀请"),
        hasTask: text.includes("复制 5 分钟任务"),
        hasAudio: text.includes("复制听音任务"),
        hasAuthHash: document.documentElement.innerHTML.includes(${JSON.stringify(PASSWORD_HASH)}),
        fallbackOpen: fallback ? fallback.hidden === false : false,
        fallbackHasInvite: fallback ? fallback.value.includes("《不思异：九州》内部试玩邀请") : false,
        fallbackHasPassword: fallback ? fallback.value.includes("tusun2026") : false,
        statusText: status ? status.textContent : ""
      };
    })()`);
    const rootShot = path.join(FILES.screenshotDir, "online-root-invite-1280x720.png");
    await screenshot(cdp, rootShot);

    await cdp.send("Emulation.setDeviceMetricsOverride", landscape);
    await navigate(cdp, `${BASE_URL}/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1`);
    const gameState = await evaluate(cdp, `(() => {
      const text = document.body.innerText || "";
      const resourceCards = Array.from(document.querySelectorAll(".resource-card[data-resource]"));
      const resourceValues = resourceCards.map((card) => ({
        id: card.getAttribute("data-resource"),
        value: Number(card.querySelector("strong")?.textContent || NaN),
        visible: card.getBoundingClientRect().width > 0 && card.getBoundingClientRect().height > 0
      }));
      const nextStep = document.querySelector("#nextStepLabel");
      const nextRect = nextStep?.getBoundingClientRect();
      const stagePhase = document.querySelector("#stagePhaseCard");
      const stageRect = stagePhase?.getBoundingClientRect();
      const rects = Array.from(document.querySelectorAll(".story-action, .choice-card, button, a"))
        .slice(0, 20)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return { text: (el.innerText || el.textContent || "").trim().slice(0, 28), width: rect.width, height: rect.height, top: rect.top, left: rect.left };
        });
      return {
        title: document.title,
        url: location.href,
        bodyLength: text.length,
        hasResources: resourceValues.length === 3 && resourceValues.every((item) => item.visible && Number.isFinite(item.value)),
        resourceValues,
        hasNext: Boolean(nextStep && nextRect && nextRect.width > 0 && nextRect.height > 0),
        nextText: nextStep?.textContent || "",
        hasStagePhase: Boolean(stagePhase && stageRect && stageRect.width > 0 && stageRect.height > 0),
        hasJourney: text.includes("旅途") || text.includes("九州图"),
        hasEncounter: text.includes("遭遇") || text.includes("补给") || text.includes("故王道"),
        viewport: { width: innerWidth, height: innerHeight },
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        verticalOverflow: document.documentElement.scrollHeight > innerHeight + 2,
        controls: rects
      };
    })()`);
    const gameShot = path.join(FILES.screenshotDir, "online-game-fresh-844x390.png");
    await screenshot(cdp, gameShot);

    cdp.close();

    if (!rootState.hasTitle) problems.push("公开入口缺少项目标题");
    if (!rootState.hasInvite) problems.push("公开入口缺少复制试玩邀请");
    if (!rootState.hasTask) problems.push("公开入口缺少 5 分钟任务");
    if (!rootState.hasAudio) problems.push("公开入口缺少听音任务");
    if (!rootState.hasAuthHash) problems.push("公开入口缺少密码门哈希");
    if (!rootState.fallbackOpen) problems.push("复制邀请未触发兜底文本");
    if (!rootState.fallbackHasInvite || !rootState.fallbackHasPassword) problems.push("试玩邀请兜底文本不完整");
    if (!gameState.hasResources) problems.push("游戏首屏缺少三资源");
    if (!gameState.hasNext) problems.push("游戏首屏缺少下一步提示");
    if (!gameState.hasJourney) problems.push("游戏首屏缺少旅途/九州图层级提示");
    if (!gameState.hasEncounter) problems.push("游戏首屏缺少遭遇/补给/地点信息");
    if (gameState.horizontalOverflow) problems.push("844x390 小横屏出现横向溢出");
    const blockingLogs = logs.filter((item) => {
      const message = item.message || "";
      return item.level === "error" && !message.includes("Failed to load resource");
    });
    if (blockingLogs.length) problems.push("浏览器运行时出现错误日志");

    const payload = {
      generatedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      title: problems.length ? "线上可视化验收需处理" : "线上可视化验收通过，待真人试玩",
      summary: {
        passed: problems.length ? 0 : 2,
        total: 2,
        problemCount: problems.length
      },
      chromePath,
      viewports: {
        root: "1280x720",
        game: "844x390"
      },
      screenshots: {
        root: path.relative(ROOT, rootShot),
        game: path.relative(ROOT, gameShot)
      },
      rootState,
      gameState,
      logs,
      blockingLogs,
      problems
    };

    if (process.argv.includes("--write-report")) writeReports(payload);
    console.log(`${payload.title}；截图 2/2；阻断项 ${problems.length}`);
    if (problems.length) {
      problems.forEach((problem) => console.log(`- ${problem}`));
      process.exitCode = 1;
    }
  } finally {
    chrome.kill("SIGTERM");
    try {
      fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 120 });
    } catch {
      // Chrome may keep transient profile files open for a moment after SIGTERM.
    }
  }
}

function writeReports(payload) {
  const statusJs = `window.BSI_VISUAL_SMOKE_STATUS = ${JSON.stringify(payload, null, 2)};\n`;
  fs.writeFileSync(FILES.statusJs, statusJs);

  const lines = [
    "# 《不思异：九州》线上可视化验收",
    "",
    `生成时间：${payload.generatedAt}`,
    "",
    `结论：${payload.title}`,
    "",
    `公开入口：${payload.baseUrl}`,
    "",
    `截图：${payload.summary.passed}/${payload.summary.total}；阻断项：${payload.summary.problemCount}`,
    "",
    "## 视口",
    "",
    `- 公开入口：${payload.viewports.root}`,
    `- 游戏首屏：${payload.viewports.game}`,
    "",
    "## 截图",
    "",
    `- 公开入口：${payload.screenshots.root}`,
    `- 小横屏游戏首屏：${payload.screenshots.game}`,
    "",
    "## 公开入口检查",
    "",
    `- 标题：${payload.rootState.title}`,
    `- 复制邀请按钮：${payload.rootState.hasInvite ? "通过" : "缺失"}`,
    `- 复制兜底：${payload.rootState.fallbackOpen && payload.rootState.fallbackHasInvite ? "通过" : "需处理"}`,
    "",
    "## 游戏首屏检查",
    "",
    `- 标题：${payload.gameState.title}`,
    `- 三资源：${payload.gameState.hasResources ? "通过" : "缺失"}`,
    `- 下一步提示：${payload.gameState.hasNext ? "通过" : "缺失"}`,
    `- 横向溢出：${payload.gameState.horizontalOverflow ? "有" : "无"}`,
    "",
    "## 问题",
    "",
    ...(payload.problems.length ? payload.problems.map((item) => `- ${item}`) : ["无阻断项。"]),
    ""
  ];
  fs.writeFileSync(FILES.reportMd, lines.join("\n"));
}

run().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});
