# 主协调 BSI-UX-099 公开试玩邀请收口回执

## 目标

把公开试玩入口从“测试者自己读任务”再前置一层，新增可直接转发给测试者的短邀请。这样主线程外发时不需要临时组织话术，测试者先收到一条像正常邀请的消息，再进入 5 分钟任务和反馈流程。

## 本轮完成

1. 公开根入口新增 `复制试玩邀请`：
   - 生成脚本：`GitHub资产区/03_WebDemo/prototype/build-webdeploy-package.js`
   - 输出包：`output/webdeploy/index.html`
   - 邀请内容包含试玩链接、密码 `tusun2026`、5 分钟试玩说明、五项回收问题和结局反馈包优先口径。

2. QA 守门同步：
   - `qa-check.js` 的 `public webdeploy root task contract` 已检查 `copyPlaytestInvite`、`复制试玩邀请` 和邀请正文关键句。
   - `online-smoke-check.js` 已把公开根入口的 `复制试玩邀请` 和 `《不思异：九州》内部试玩邀请` 纳入线上冒烟检查。

3. P0 人工收口路径同步：
   - `p0-readiness-check.js` 已把第一步改为：先点“复制试玩邀请”发给测试者。
   - `P0试玩版总验收报告.md/html` 已重新生成。
   - `README.md` 已说明“试玩邀请”和“5 分钟任务”的区别。

## 验收结果

- `node build-webdeploy-package.js`
  - `COPIED_FILES 151`
- `node p0-readiness-check.js --write-report`
  - `P0 机器验收通过，待真人确认；机器验收 8/8；待人工 2；需处理 0`
- `node qa-check.js`
  - 全部通过，包含 `public webdeploy root task contract`
- `node playtest-flow-check.js --write-report`
  - 试玩入口、第一局、补给、选路、半途、结局和复盘链路通过
- `node journey-smoke-check.js`
  - 稳定主线可抵达九州裂隙，资源未断链
- `git diff --check -- ...`
  - 本轮触达文件无空白错误

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_CfZJMY2tAX9McW5ZyebpiYygM7cc`
- Vercel 状态：Ready

## 线上复验

- `online-smoke-check.js`：线上 9/9 通过，0 阻断项。
- 线上公开根页已出现：
  - `复制试玩邀请`
  - `《不思异：九州》内部试玩邀请`
  - `想请你帮忙试一个 5 分钟的横屏网页版 Demo`
  - `试玩密码：tusun2026`
- 线上 P0 报告已出现：
  - `机器验收 8/8`
  - `优先分享线上公开入口，先点“复制试玩邀请”发给测试者。`

## 下一步

P0 仍需真实人工材料收口：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
3. 主线程把回收材料粘贴进 `P0真人试玩验收工作台.html`，确认“下一步、复盘、资源、UI、声音”五类证据。
