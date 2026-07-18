#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const outRoot = path.resolve(repoRoot, "output/webdeploy");
const prototypeRoot = path.resolve(repoRoot, "GitHub资产区/03_WebDemo/prototype");
const deployPrototypeRoot = path.join(outRoot, "GitHub资产区/03_WebDemo/prototype");

const prototypeFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "generated-art-manifest.js",
  "generated-art-status.js",
  "visual-replacement-status.js",
  "balance-status.js",
  "audio-health-status.js",
  "audio-health-status.md",
  "online-smoke-status.js",
  "online-smoke-status.md",
  "visual-smoke-status.js",
  "visual-smoke-status.md",
  "p0-readiness-status.js",
  "试玩入口.html",
  "P0发测批次台.html",
  "P0真人试玩验收工作台.html",
  "P0人工反馈收件台.html",
  "P0音频听感验收工作台.html",
  "P0反馈填写页.html",
  "P0试玩版总验收报告.html",
  "balance-status.html",
  "visual-replacement-status.md",
  "generated-art-import-workbench.md",
  "highfreq-visual-replacement-workbench.md"
];

const copyLog = [];
const passwordHash = "019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFilePreservingRoot(absSource) {
  const rel = path.relative(repoRoot, absSource);
  const absDest = path.join(outRoot, rel);
  ensureDir(path.dirname(absDest));
  fs.copyFileSync(absSource, absDest);
  copyLog.push(rel);
}

function copyPrototypeFile(name) {
  const abs = path.join(prototypeRoot, name);
  if (!fs.existsSync(abs)) {
    throw new Error(`缺少原型文件：${name}`);
  }
  copyFilePreservingRoot(abs);
}

function collectAssetRefsFromText(text) {
  const refs = new Set();
  const patterns = [
    /["'`](\.\.\/\.\.\/[^"'`]+\.(?:png|jpe?g|webp|gif|mp3|mp4|ttf))["'`]/gi,
    /url\(["']?(\.\.\/\.\.\/[^"')]+\.(?:png|jpe?g|webp|gif|mp3|mp4|ttf))["']?\)/gi
  ];
  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text))) {
      refs.add(match[1]);
    }
  });
  return refs;
}

function writeTextFile(rel, text) {
  const abs = path.join(outRoot, rel);
  ensureDir(path.dirname(abs));
  fs.writeFileSync(abs, text);
}

function getAuthSnippet(redirectPath = "") {
  return [
    '<style>html.bsi-auth-pending body{visibility:hidden;background:#080704}</style>',
    `<script>window.BSI_PLAYTEST_AUTH={hash:"${passwordHash}",redirect:${JSON.stringify(redirectPath)}};try{if(sessionStorage.getItem("BSI_JIUZHOU_AUTH")!=="ok")document.documentElement.classList.add("bsi-auth-pending")}catch(e){document.documentElement.classList.add("bsi-auth-pending")}</script>`,
    '<script src="/playtest-auth.js"></script>'
  ].join("\n");
}

function injectAuthGate(rel, redirectPath = "") {
  const abs = path.join(outRoot, rel);
  let html = fs.readFileSync(abs, "utf8");
  if (html.includes("/playtest-auth.js")) return;
  html = html.replace("</head>", `${getAuthSnippet(redirectPath)}\n  </head>`);
  fs.writeFileSync(abs, html);
}

function emptyDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

emptyDir(outRoot);

prototypeFiles.forEach(copyPrototypeFile);

const visualSmokeDir = path.join(prototypeRoot, "visual-smoke-screenshots");
if (fs.existsSync(visualSmokeDir)) {
  fs.readdirSync(visualSmokeDir)
    .filter((name) => /\.png$/i.test(name))
    .forEach((name) => copyFilePreservingRoot(path.join(visualSmokeDir, name)));
}

[
  "GitHub资产区/03_WebDemo/prototype/index.html",
  "GitHub资产区/03_WebDemo/prototype/试玩入口.html",
  "GitHub资产区/03_WebDemo/prototype/P0发测批次台.html",
  "GitHub资产区/03_WebDemo/prototype/P0真人试玩验收工作台.html",
  "GitHub资产区/03_WebDemo/prototype/P0人工反馈收件台.html",
  "GitHub资产区/03_WebDemo/prototype/P0音频听感验收工作台.html",
  "GitHub资产区/03_WebDemo/prototype/P0反馈填写页.html",
  "GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.html",
  "GitHub资产区/03_WebDemo/prototype/balance-status.html"
].forEach((rel) => injectAuthGate(rel));

const deploySources = prototypeFiles
  .filter((name) => /\.(html|css|js|md)$/i.test(name))
  .map((name) => fs.readFileSync(path.join(prototypeRoot, name), "utf8"))
  .join("\n");

const assetRefs = collectAssetRefsFromText(deploySources);
const missingAssets = [];
assetRefs.forEach((ref) => {
  const abs = path.resolve(prototypeRoot, ref);
  if (fs.existsSync(abs)) {
    copyFilePreservingRoot(abs);
  } else {
    missingAssets.push(ref);
  }
});

writeTextFile("playtest-auth.js", `(() => {
  const config = window.BSI_PLAYTEST_AUTH || {};
  const okKey = "BSI_JIUZHOU_AUTH";
  const gateTitle = "《不思异：九州》试玩";
  const targetUrl = config.redirect || "";

  function isAuthed() {
    try {
      return sessionStorage.getItem(okKey) === "ok";
    } catch {
      return false;
    }
  }

  function setAuthed() {
    try {
      sessionStorage.setItem(okKey, "ok");
    } catch {}
  }

  async function sha256(value) {
    if (!window.crypto || !window.crypto.subtle) return "";
    const bytes = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function renderGate() {
    document.documentElement.classList.remove("bsi-auth-pending");
    document.body.innerHTML = [
      '<main class="bsi-auth-gate">',
      '<section class="bsi-auth-card">',
      '<p class="bsi-auth-brand">Web Demo Playtest</p>',
      '<h1>' + gateTitle + '</h1>',
      '<p>请输入试玩密码。通过后，本浏览器本次会话会保持可玩状态。</p>',
      '<form id="bsiAuthForm">',
      '<input id="bsiAuthInput" type="password" autocomplete="current-password" placeholder="试玩密码" aria-label="试玩密码" />',
      '<button type="submit">进入试玩</button>',
      '</form>',
      '<p id="bsiAuthHint" class="bsi-auth-hint">仅供小范围内部试玩，请勿公开扩散。</p>',
      '</section>',
      '</main>'
    ].join("");

    const style = document.createElement("style");
    style.textContent = [
      "body{margin:0;min-height:100vh;background:#080704;color:#f5ecd2;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Noto Sans SC',sans-serif;}",
      ".bsi-auth-gate{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 20%,rgba(162,123,49,.22),transparent 38%),#080704;}",
      ".bsi-auth-card{width:min(420px,92vw);border:1px solid rgba(199,156,73,.55);background:rgba(18,13,8,.92);padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.45);}",
      ".bsi-auth-brand{margin:0 0 8px;color:#c99a42;font-size:12px;letter-spacing:.12em;text-transform:uppercase;}",
      "h1{margin:0 0 12px;font-size:28px;font-weight:800;}",
      "p{line-height:1.7;color:#d7cab0;}",
      "form{display:grid;grid-template-columns:1fr auto;gap:10px;margin-top:20px;}",
      "input,button{height:44px;border-radius:6px;border:1px solid rgba(199,156,73,.5);font:inherit;}",
      "input{background:#0d0b08;color:#f5ecd2;padding:0 12px;}",
      "button{background:#b9852e;color:#160f07;font-weight:800;padding:0 16px;cursor:pointer;}",
      ".bsi-auth-hint{min-height:24px;font-size:13px;color:#a99a80;}"
    ].join("");
    document.head.appendChild(style);

    const input = document.querySelector("#bsiAuthInput");
    const hint = document.querySelector("#bsiAuthHint");
    document.querySelector("#bsiAuthForm")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = input?.value || "";
      const hash = await sha256(value);
      if (hash && hash === config.hash) {
        setAuthed();
        hint.textContent = "密码正确，正在进入试玩。";
        if (targetUrl) {
          window.location.href = targetUrl;
        } else {
          window.location.reload();
        }
      } else {
        hint.textContent = "密码不对，请再试一次。";
        input?.select();
      }
    });
    input?.focus();
  }

  function boot() {
    if (isAuthed()) {
      document.documentElement.classList.remove("bsi-auth-pending");
      if (targetUrl) window.location.replace(targetUrl);
      return;
    }
    renderGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();`);

writeTextFile("index.html", `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>不思异：九州 试玩</title>
    ${getAuthSnippet("")}
    <style>
      :root {
        color-scheme: dark;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans SC", sans-serif;
        background: #080704;
        color: #f5ecd2;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        background:
          linear-gradient(90deg, rgba(8, 7, 4, 0.92), rgba(8, 7, 4, 0.55), rgba(8, 7, 4, 0.92)),
          url("./GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/02_%E8%AE%BE%E8%AE%A1%E8%B5%84%E4%BA%A7/%E5%8F%AF%E7%94%A8%E7%B4%A0%E6%9D%90/%E8%83%8C%E6%99%AF%E9%95%BF%E5%9B%BE/BG-008_%E6%A8%AA%E5%90%91%E5%B1%B1%E6%B5%B7%E6%97%85%E9%80%94%E8%88%9E%E5%8F%B0%E6%80%BB%E5%9C%BA%E6%99%AF.png") center / cover fixed;
      }

      .share-shell {
        min-height: 100vh;
        display: grid;
        align-items: center;
        padding: clamp(16px, 4vw, 36px);
      }

      .share-panel {
        width: min(680px, 92vw);
        padding: clamp(22px, 3.4vw, 36px);
        border: 1px solid rgba(204, 158, 72, 0.55);
        background: rgba(17, 12, 7, 0.84);
        box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
      }

      .brand {
        margin: 0 0 8px;
        color: #d3a54d;
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: clamp(34px, 7vw, 72px);
        line-height: 1;
        letter-spacing: 0;
      }

      .tagline {
        max-width: 34em;
        margin: 18px 0 0;
        color: #ead9b8;
        font-size: clamp(16px, 2.3vw, 20px);
        line-height: 1.75;
      }

      .goal-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 22px 0;
      }

      .goal-row span {
        border: 1px solid rgba(204, 158, 72, 0.42);
        padding: 6px 10px;
        color: #e9cf91;
        background: rgba(0, 0, 0, 0.18);
        font-size: 13px;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        margin-top: 24px;
      }

      .primary {
        display: inline-flex;
        align-items: center;
        min-height: 48px;
        border: 1px solid #d19d45;
        background: #bd852d;
        color: #150e06;
        padding: 0 18px;
        text-decoration: none;
        font-weight: 900;
      }

      .secondary {
        color: #e8d1a1;
        text-decoration: none;
        border-bottom: 1px solid rgba(232, 209, 161, 0.45);
      }

      .notes {
        display: grid;
        gap: 8px;
        margin: 24px 0 0;
        padding: 0;
        list-style: none;
        color: #cfc1a5;
        line-height: 1.65;
        font-size: 14px;
      }

      .feedback-tool {
        display: grid;
        gap: 8px;
        margin-top: 18px;
      }

      .feedback-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .feedback-button {
        width: fit-content;
        min-height: 40px;
        border: 1px solid rgba(143, 183, 108, 0.62);
        background: rgba(76, 99, 61, 0.24);
        color: #eef0cb;
        padding: 0 13px;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .feedback-button:hover,
      .feedback-button:focus-visible {
        border-color: rgba(181, 217, 125, 0.84);
        background: rgba(93, 120, 72, 0.32);
        outline: none;
      }

      .feedback-status {
        min-height: 18px;
        margin: 0;
        color: #bfc9a2;
        font-size: 13px;
      }

      .feedback-fallback {
        width: 100%;
        min-height: 138px;
        border: 1px solid rgba(204, 158, 72, 0.38);
        background: rgba(8, 7, 4, 0.72);
        color: #f5ecd2;
        padding: 10px;
        resize: vertical;
        font: 13px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      @media (max-width: 720px) {
        .share-shell {
          align-items: end;
        }

        .share-panel {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <main class="share-shell">
      <section class="share-panel" aria-label="不思异九州试玩入口">
        <p class="brand">Web Demo Playtest</p>
        <h1>不思异：九州</h1>
        <p class="tagline">
          这是一款以《山海经》和古典志怪为灵感的横屏旅途生存文字游戏。请试玩约 5 分钟，带着车队走过一个地点，处理遭遇、补给资源、选择下一段路。
        </p>
        <div class="goal-row" aria-label="试玩观察目标">
          <span>看懂下一步</span>
          <span>感到资源压力</span>
          <span>愿意再走一站</span>
        </div>
        <div class="actions">
          <a class="primary" href="./play/">开始试玩</a>
          <a class="secondary" href="./GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E5%8F%8D%E9%A6%88%E5%A1%AB%E5%86%99%E9%A1%B5.html">填写反馈</a>
          <a class="secondary" href="./GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html">打开完整测试入口</a>
        </div>
        <ul class="notes">
          <li>建议横屏打开；手机浏览器请先横过来。</li>
          <li>走到结局后，优先点“复盘本局”里的“复制反馈包”。</li>
          <li>没走到结局也可以点“填写反馈”，把卡住的位置直接复制发回。</li>
          <li>如果哪里像网页、哪里卡住、哪里声音打扰，请直接记下来。</li>
        </ul>
        <div class="feedback-tool">
          <div class="feedback-actions" aria-label="试玩任务复制">
            <button class="feedback-button" id="copyPlaytestInvite" type="button">复制试玩邀请</button>
            <button class="feedback-button" id="copyFiveMinuteTask" type="button">复制 5 分钟任务</button>
            <button class="feedback-button" id="copyAudioTask" type="button">复制听音任务</button>
            <button class="feedback-button" id="copyFeedbackTemplate" type="button">复制反馈模板</button>
          </div>
          <p class="feedback-status" id="feedbackCopyStatus">最好走到结局后点“复盘本局”里的“复制反馈包”。未走完时再用模板兜底。</p>
          <textarea class="feedback-fallback" id="feedbackFallback" hidden readonly></textarea>
        </div>
      </section>
    </main>
      <script>
      (() => {
        const inviteButton = document.querySelector("#copyPlaytestInvite");
        const taskButton = document.querySelector("#copyFiveMinuteTask");
        const audioTaskButton = document.querySelector("#copyAudioTask");
        const button = document.querySelector("#copyFeedbackTemplate");
        const status = document.querySelector("#feedbackCopyStatus");
        const fallback = document.querySelector("#feedbackFallback");
        const playtestUrl = new URL("./play/", window.location.href).href;
        const audioReviewUrl = new URL("./GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E9%9F%B3%E9%A2%91%E5%90%AC%E6%84%9F%E9%AA%8C%E6%94%B6%E5%B7%A5%E4%BD%9C%E5%8F%B0.html", window.location.href).href;
        const invite = [
          "《不思异：九州》内部试玩邀请",
          "",
          "想请你帮忙试一个 5 分钟的横屏网页版 Demo：",
          playtestUrl,
          "试玩密码：tusun2026",
          "",
          "玩法很简单：带着车队穿过山海九州，处理遭遇、补给车轴/粮草/神志，再选下一站。请不要研究攻略，就按第一次打开手机游戏的直觉玩。",
          "",
          "试玩后我最想知道 5 件事：",
          "1. 你是否一眼知道下一步点哪里。",
          "2. 车轴、粮草、神志的压力是否看得懂。",
          "3. 哪一刻最像游戏。",
          "4. 哪一刻还像网页。",
          "5. 音乐、音效、画面是否加分或打扰。",
          "",
          "如果走到结局，请点“复盘本局”里的“复制反馈包”发回；没走完也没关系，告诉我卡在哪里就行。"
        ].join("\\n");
        const task = [
          "《不思异：九州》5 分钟试玩任务",
          "",
          "试玩链接：" + playtestUrl,
          "试玩密码：tusun2026",
          "",
          "请横屏打开，像第一次玩手机游戏一样试玩 5 分钟。不需要研究攻略，也不用追求最优解。",
          "",
          "## 试玩目标",
          "",
          "1. 从干净新局开始。",
          "2. 处理当前遭遇。",
          "3. 补给一次。",
          "4. 打开九州地图，选下一站。",
          "5. 路上遇到事件时按直觉选择。",
          "6. 尽量走到结局；如果走不到，也请记录卡住的位置。",
          "",
          "## 试玩时只看这 5 件事",
          "",
          "1. 是否一眼知道下一步点哪里。",
          "2. 车轴、粮草、神志的变化是否看得懂。",
          "3. 哪一刻最像游戏。",
          "4. 哪一刻还像网页。",
          "5. 音乐、音效、画面是否加分或打扰。",
          "",
          "## 试玩后发回",
          "",
          "如果走到结局：请点“复盘本局”里的“复制反馈包”，把整段文字发回。",
          "如果没走到结局：请打开“志”复制本局复盘，再按反馈模板简单填一下。"
        ].join("\\n");
        const audioTask = [
          "《不思异：九州》P0 3 分钟听音任务",
          "",
          "听音入口：" + audioReviewUrl,
          "试玩密码：tusun2026",
          "",
          "请只判断听感，不判断授权。目标是判断现在的音乐、环境声和短音效是否足够支撑内部试玩。",
          "",
          "## 听音顺序",
          "",
          "1. 打开听音入口。",
          "2. 先听完 6 首音乐候选。",
          "3. 再听环境、神志、告急、短音、地图层。",
          "4. 每条标记：保留 / 待改 / 弃用。",
          "",
          "## 只回答 5 件事",
          "",
          "1. 哪首音乐最适合第一章行旅。",
          "2. 哪个声音最打扰。",
          "3. 哪个声音最有山海九州感。",
          "4. 是否愿意默认开低音量音乐。",
          "5. 哪些声音必须重做。",
          "",
          "## 听完后发回",
          "",
          "请点击“复制音频验收摘要”，把整段《不思异：九州》P0 音频听感验收摘要发回。"
        ].join("\\n");
        const template = [
          "《不思异：九州》P0 试玩反馈",
          "",
          "试玩设备：手机 / 平板 / 电脑；浏览器：",
          "试玩时长：",
          "",
          "1. 我是否看懂下一步要做什么：",
          "2. 我是否感到车轴 / 粮草 / 神志形成资源压力：",
          "3. 我是否愿意再走一站，原因是：",
          "4. 哪个地点、遭遇、诗句或画面最有山海经感觉：",
          "5. 哪里像网页、哪里不好点、哪里信息太多：",
          "6. 音乐 / 环境声 / 神志低落声音是否加分或打扰：",
          "7. 如果走到结局，请粘贴“复盘本局”里的《P0 试玩反馈包》；未走到结局，请粘贴游戏里“志”的本局复盘：",
          "",
          "其他备注："
        ].join("\\n");

        async function copyText(value, successText) {
          if (!status || !fallback) return;
          try {
            await navigator.clipboard.writeText(value);
            status.textContent = successText;
            fallback.hidden = true;
          } catch {
            fallback.hidden = false;
            fallback.value = value;
            fallback.focus();
            fallback.select();
            status.textContent = "浏览器没有放行复制，已展开文本，可手动复制。";
          }
        }

        inviteButton?.addEventListener("click", () => {
          copyText(invite, "试玩邀请已复制。可以直接发给测试者，回收时优先要结局反馈包。");
        });
        taskButton?.addEventListener("click", () => {
          copyText(task, "5 分钟试玩任务已复制。发给测试者后，请优先回收结局反馈包。");
        });
        audioTaskButton?.addEventListener("click", () => {
          copyText(audioTask, "3 分钟听音任务已复制。请回收音频验收摘要。");
        });
        button?.addEventListener("click", () => {
          copyText(template, "反馈模板已复制。若能走到结局，请优先复制游戏里的“P0 试玩反馈包”。");
        });
      })();
    </script>
  </body>
</html>
`);

writeTextFile("play/index.html", `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>不思异：九州 干净新局</title>
    ${getAuthSnippet("../GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1")}
  </head>
  <body>
    <p><a href="../GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1">开始《不思异：九州》干净新局</a></p>
  </body>
</html>
`);

writeTextFile("vercel.json", JSON.stringify({
  cleanUrls: false,
  trailingSlash: false,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Robots-Tag", value: "noindex" }
      ]
    }
  ],
  rewrites: [
    {
      source: "/",
      destination: "/index.html"
    }
  ]
}, null, 2));

writeTextFile("README_DEPLOY.md", [
  "# 《不思异：九州》P0 线上试玩包",
  "",
  "入口：`/`",
  "干净新局：`/play`",
  "",
  "本包由 `build-webdeploy-package.js` 从当前本地原型生成，只包含线上试玩实际需要的页面、图片、字体和音频。",
  "",
  `打包时间：${new Date().toISOString()}`,
  `文件数：${copyLog.length + 3}`,
  `缺失资源：${missingAssets.length}`,
  "",
  missingAssets.length ? missingAssets.map((item) => `- ${item}`).join("\n") : "无缺失资源。"
].join("\n"));

if (missingAssets.length) {
  console.error("部署包存在缺失资源：");
  missingAssets.forEach((item) => console.error(`- ${item}`));
  process.exitCode = 1;
} else {
  console.log(`WEBDEPLOY_PACKAGE ${outRoot}`);
  console.log(`COPIED_FILES ${copyLog.length + 3}`);
}
