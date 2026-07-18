# 主协调 BSI-UX-082 首分钟音频提示与听感回收回执

日期：2026-06-24

## 1. 本轮目标

上一轮线上试玩已具备音乐、环境层和听感模板，但外部测试者可能第一分钟没有注意到声音入口。本轮把音频入口变成更明确但不占界面的轻提示，并把“是否注意到声音入口”纳入听感反馈。

## 2. 已完成

- 顶部 `音` 按钮在“有可播放音乐、未播放、未手动静音”时显示小角标 `听`。
- 同一状态下按钮 `title/aria-label` 改为 `播放音乐：建议试玩时打开声音`。
- 玩家点击播放后，角标自动消失，按钮恢复为 `关闭音乐`。
- `曲` 当前音乐芯片同步记录 `data-audio-nudge`，用于后续样式或验收扩展。
- 游戏内听感模板新增问题：`第一眼是否知道可以打开声音：知道 / 没注意 / 打开后才知道`。
- 缓存号更新到 `20260624-c162`，避免线上继续读取上一轮 `c161`。

## 3. 修改文件

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 4. 验收结果

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- 本地浏览器验证：
  - 页面标题：`不思异：九州 Web Demo 原型`。
  - 页面非空，`.app-shell`、`.game-hud`、`.game-board` 均存在。
  - 初始音频按钮：`aria-label=播放音乐：建议试玩时打开声音`，`audio-nudge=true`，角标数据为 `听`。
  - 点击音频按钮后：`aria-pressed=true`，按钮文案变为 `关闭音乐`，`audio-nudge=false`。
  - 控制台无 error/warn。
- 线上验证：
  - 固定试玩入口仍为 <https://webdeploy-green.vercel.app/>。
  - 直接游戏页已引用 `styles.css?v=20260624-c162`、`app.js?v=20260624-c162`。
  - 线上 `app.js` 包含 `播放音乐：建议试玩时打开声音` 与新的听感反馈字段。
  - 线上 `styles.css` 包含 `.audio-hud-button.audio-nudge::after`。

## 5. 线上部署

- Vercel 项目：`foxlaoys-projects/webdeploy`
- 部署 ID：`dpl_JASZEidKTio8HbyR1pZoxEYqVfsF`
- 部署检查页：<https://vercel.com/foxlaoys-projects/webdeploy/JASZEidKTio8HbyR1pZoxEYqVfsF>
- 生产别名：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`

## 6. 剩余风险

- 浏览器可能因自动播放策略阻止部分音频槽，本轮保留了明确状态提示：`已请求播放；浏览器暂未放行 ... 个音频槽`。
- 音频素材仍处于内部 Demo 或待听感复核阶段，不能作为正式商用音频资产宣称。
- P0 完整目标仍需真人 5 分钟试玩记录、音频听感记录和本局“志”复盘材料回收后才能关闭。
