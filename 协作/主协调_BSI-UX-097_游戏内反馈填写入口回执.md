# 主协调 BSI-UX-097 游戏内反馈填写入口回执

## 目标

补齐从 `/play` 或游戏页直接进入的测试者反馈路径。上一轮已上线独立 `P0反馈填写页.html`，但如果测试者直接开始游戏，未必会回到公开根入口。因此本轮把反馈填写入口接入游戏内“志 / 复盘”和结局复盘弹窗。

## 本轮完成

1. `index.html`
   - 在“志 / 复盘”的本局复盘卡右上角增加 `反馈` 链接。
   - 链接目标：`./P0反馈填写页.html`
   - 位置与 `复制` 按钮并列，不增加顶部 HUD 负担。

2. `app.js`
   - 结局复盘弹窗动作新增 `填写反馈`。
   - 动作 `feedback-form` 会跳转到 `./P0反馈填写页.html`。
   - 文案：`没通关或要补主观感受时使用。`

3. `styles.css`
   - 新增 `run-recap-actions`、`run-feedback-link` 和 `ending-feedback` 样式。
   - 保持小横屏紧凑，不让反馈入口撑开复盘卡。

4. `qa-check.js`
   - `ending recap action contract` 纳入结局弹窗 `feedback-form`。
   - `run recap drawer contract` 纳入 `runFeedbackLink` 与反馈页链接。

## 验收结果

- `node --check app.js`：通过。
- `node --check qa-check.js`：通过。
- `node playtest-flow-check.js --write-report`：通过。
- `node qa-check.js`：全部通过。
- `node p0-readiness-check.js --write-report`：
  - `P0 机器验收通过，待真人确认；机器验收 7/7；待人工 2；需处理 0`
- `build-webdeploy-package.js`：
  - `COPIED_FILES 149`

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 干净新局：<https://webdeploy-green.vercel.app/play>
- 游戏内反馈页入口：游戏页 `志 -> 复盘 -> 反馈`
- 反馈填写页：<https://webdeploy-green.vercel.app/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E5%8F%8D%E9%A6%88%E5%A1%AB%E5%86%99%E9%A1%B5.html>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_9fh4TPs4vPokt4RaQ7arMLRKjNNn`

## 线上抽检

- 线上游戏页包含密码门与 `runFeedbackLink`。
- 线上 `app.js` 包含 `feedback-form` 和 `填写反馈` 结局动作。
- 线上 `styles.css` 包含 `ending-feedback`、`run-recap-actions`、`run-feedback-link`。
- 线上 `p0-readiness-status.js` 保持 `machineText: 7/7`。

## 仍待人工

这次只补齐回收入口，不替代真人验收。P0 仍需：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
