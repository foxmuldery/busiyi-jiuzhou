# BSI-UX-108 音频听感编号回传链路回执

日期：2026-06-25

## 结论

已把 P0 音频听感回收纳入同一套试玩编号链路。听音人从游戏内听感模板或带参数链接进入 `P0音频听感验收工作台.html` 后，页面会自动带入 `JZ-` 试玩编号，音频验收摘要、听音任务和待改/弃用重做清单都会保留该编号。

- 公开试玩入口：`https://webdeploy-green.vercel.app/`
- 试玩密码：`tusun2026`
- 最新生产部署：`dpl_94HPY771nVZRWoep7f52srJiBVRB`

## 本轮完成

1. 游戏内设置抽屉的“听感模板”新增 `试玩编号`。
2. 游戏内听感模板新增带编号的 `P0音频听感验收工作台.html?run=...&source=game-settings` 入口。
3. `P0音频听感验收工作台.html` 新增“试玩编号”字段，并从 `run` / `runCode` URL 参数自动预填。
4. 音频验收摘要、3 分钟听音任务、待改/弃用重做清单均写入试玩编号。
5. P0 总验收的测试者交付入口证据从“试玩编号回传”扩展为“试玩编号回传、听音编号回传”。
6. QA 与线上冒烟均新增音频编号链路守门。

## 验收证据

- 本地语法检查：`node --check app.js` 通过。
- 本地 QA：`qa-check.js` 全部通过。
- P0 总验收：机器验收 `9/9`，待人工 `2`，需处理 `0`。
- 公开部署：`dpl_94HPY771nVZRWoep7f52srJiBVRB`，已别名到 `https://webdeploy-green.vercel.app/`。
- 线上冒烟：`10/10` 页面通过，阻断项 `0`。
- 线上直连抽检：
  - `app.js` 已包含 `getAudioReviewWorkbenchUrl`、`game-settings` 和 `试玩编号`。
  - `P0音频听感验收工作台.html?run=JZ-TEST-001&source=smoke` 已包含 `runCode`、`已带入试玩编号` 和 `audio-workbench`。
  - `p0-readiness-status.js` 已包含 `听音编号回传`、`9/9` 和 `tusun2026`。
- 内置浏览器验证：
  - 打开线上音频验收台 `?run=JZ-BROWSER-001&source=browser-smoke`。
  - 页面标题正确，控制台无 error/warn。
  - `runCode` 输入框值为 `JZ-BROWSER-001`。
  - `copyState` 显示 `已带入试玩编号 JZ-BROWSER-001；来源 browser-smoke。`
  - 音频验收摘要包含 `试玩编号：JZ-BROWSER-001`。
  - 点击“复制听音任务”后，浏览器未放行剪贴板时会展开兜底文本；兜底文本包含 `试玩编号：JZ-BROWSER-001` 和带编号的听音入口。

## 仍需人工确认

这一步解决的是听感反馈的可追踪性，不替代真实主观听音。P0 仍需至少回收真实玩家 5 分钟试玩反馈，以及音频主观听感摘要。
