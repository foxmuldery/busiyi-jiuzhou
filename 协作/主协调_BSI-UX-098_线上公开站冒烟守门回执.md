# 主协调 BSI-UX-098 线上公开站冒烟守门回执

## 目标

把“公开试玩站是否真的更新、密码门是否还在、反馈页和 P0 状态是否可访问”做成可重复执行的机器检查。这样每次部署后不只靠人工 `curl` 抽查，而是有一份固定的线上冒烟报告。

## 本轮完成

1. 新增线上冒烟检查脚本：
   - `GitHub资产区/03_WebDemo/prototype/online-smoke-check.js`
   - 默认检查站点：`https://webdeploy-green.vercel.app`
   - 可通过环境变量 `BSI_ONLINE_BASE_URL` 改目标站。

2. 检查覆盖 9 项：
   - 公开根入口
   - `/play/` 干净新局跳转页
   - 游戏主页面
   - 游戏逻辑脚本
   - 游戏样式
   - `P0反馈填写页.html`
   - `P0音频听感验收工作台.html`
   - `p0-readiness-status.js`
   - `audio-health-status.js`

3. 检查内容：
   - HTTP 200
   - 需要 noindex 的页面带 `x-robots-tag: noindex`
   - 密码门脚本与密码哈希存在
   - 试玩密码 `tusun2026` 仍在公开说明里
   - 游戏内反馈入口、结局 `填写反馈`、P0 反馈页、音频验收台和 P0 8/8 状态均可访问

4. 新增报告：
   - `GitHub资产区/03_WebDemo/prototype/online-smoke-status.js`
   - `GitHub资产区/03_WebDemo/prototype/online-smoke-status.md`

5. 纳入守门：
   - `qa-check.js` 新增 `online smoke check contract`
   - `p0-readiness-check.js` 新增机器项 `线上公开站冒烟`
   - `build-webdeploy-package.js` 将线上冒烟状态与报告打入公开包

## 验收结果

- `node online-smoke-check.js --write-report`
  - `线上公开站冒烟通过，待真人试玩；页面 9/9；阻断项 0`
- `node p0-readiness-check.js --write-report`
  - `P0 机器验收通过，待真人确认；机器验收 8/8；待人工 2；需处理 0`
- `node qa-check.js`
  - 全部通过，包含 `online smoke check contract`

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_ErHqRbbxe9jPCUoWqeFdYkfZ3FzL`
- Vercel 状态：Ready

## 线上复验

- `online-smoke-check.js --write-report`：线上 9/9 通过，0 阻断项。
- 线上 `p0-readiness-status.js`：显示 `machineText: 8/8`，包含 `online-smoke`。
- `vercel inspect https://webdeploy-green.vercel.app`：别名指向 `dpl_ErHqRbbxe9jPCUoWqeFdYkfZ3FzL`。

## 仍待人工

线上冒烟守门只证明公开部署可访问和关键入口完整。P0 仍需：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
