# 主协调 BSI-UX-100 线上可视化验收守门回执

## 目标

把公开试玩站的“真实画面是否可玩”纳入机器验收。原有线上冒烟能证明页面和脚本可访问，但不能证明首屏视觉没有空白、错位、横向溢出或关键控件不可见。本轮新增可重复执行的 Chrome 可视化 smoke。

## 本轮完成

1. 新增可视化验收脚本：
   - `GitHub资产区/03_WebDemo/prototype/visual-smoke-check.js`
   - 默认检查站点：`https://webdeploy-green.vercel.app`
   - 可通过环境变量 `BSI_ONLINE_BASE_URL` 改目标站。
   - 可通过环境变量 `CHROME_PATH` 指定 Chrome。

2. 检查覆盖两张真实截图：
   - 公开入口 `1280x720`
   - 游戏干净新局 `844x390` 小横屏

3. 检查内容：
   - 公开入口包含 `复制试玩邀请`、`复制 5 分钟任务`、`复制听音任务`。
   - 复制试玩邀请在剪贴板被拦截时能展开手动复制兜底。
   - 小横屏游戏首屏有三资源卡、下一步提示、旅途/九州图层级、遭遇/补给信息。
   - 小横屏没有横向溢出。
   - 浏览器运行时无阻断错误。

4. 新增报告和截图：
   - `GitHub资产区/03_WebDemo/prototype/visual-smoke-status.js`
   - `GitHub资产区/03_WebDemo/prototype/visual-smoke-status.md`
   - `GitHub资产区/03_WebDemo/prototype/visual-smoke-screenshots/online-root-invite-1280x720.png`
   - `GitHub资产区/03_WebDemo/prototype/visual-smoke-screenshots/online-game-fresh-844x390.png`

5. 纳入守门：
   - `qa-check.js` 新增 `visual smoke check contract`
   - `p0-readiness-check.js` 新增机器项 `线上可视化验收`
   - `build-webdeploy-package.js` 将视觉 smoke 状态和截图打入公开包
   - `online-smoke-check.js` 同步 P0 状态要求为 `9/9`

## 验收结果

- `node visual-smoke-check.js --write-report`
  - `线上可视化验收通过，待真人试玩；截图 2/2；阻断项 0`
- `node online-smoke-check.js --write-report`
  - `线上公开站冒烟通过，待真人试玩；页面 9/9；阻断项 0`
- `node p0-readiness-check.js --write-report`
  - `P0 机器验收通过，待真人确认；机器验收 9/9；待人工 2；需处理 0`
- `node qa-check.js`
  - 全部通过，包含 `visual smoke check contract`

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_BD3PzAseNMbm5WdJfk3oQ5YgougG`
- Vercel 状态：Ready

## 线上复验

- 线上 `p0-readiness-status.js` 已显示：
  - `machineText: 9/9`
  - `visual-smoke`
  - `线上可视化验收`
  - `截图 2/2，阻断项 0`
- 线上 `visual-smoke-status.js` 已显示：
  - `passed: 2`
  - `total: 2`
  - `problemCount: 0`
  - 两张截图路径已随包发布

## 仍待人工

机器验收已经从 8/8 升级为 9/9，但 P0 仍不能宣称完全完成。还缺：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
3. 主线程把反馈粘贴进 `P0真人试玩验收工作台.html`，确认“下一步、复盘、资源、UI、声音”五类证据。
