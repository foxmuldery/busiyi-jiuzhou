# 主协调 BSI-UX-096 P0 反馈填写页公开收口回执

## 目标

降低 P0 人工验收回收成本：测试者未走到结局时，也能通过一个公开可访问的静态页面填写卡点、资源压力、山海经氛围、UI 问题、音频感受和复盘文本，并一键复制 `《不思异：九州》P0 统一反馈包` 发回主线程。

## 本轮完成

1. 新增反馈填写页：
   - `GitHub资产区/03_WebDemo/prototype/P0反馈填写页.html`
   - 支持填写测试者代号、设备浏览器、试玩时长、抵达进度、下一步理解、资源压力、最佳山海经时刻、网页感问题、音频感受、复盘/结局反馈包/音频验收摘要、优先修改项。
   - 支持自动保存本地草稿。
   - 支持 `生成并复制反馈包`；浏览器禁用剪贴板时会展开可手动复制文本。

2. 接入口：
   - `试玩入口.html` 增加 `P0 反馈填写页` 入口。
   - 公开根入口增加 `填写反馈` 链接。
   - 公开根入口说明新增“没走到结局也可以点填写反馈”的兜底路径。

3. 验收与部署：
   - `build-webdeploy-package.js` 纳入 `P0反馈填写页.html`，并对反馈页注入密码门。
   - `p0-readiness-check.js` 把反馈填写页纳入“测试者交付入口”证据。
   - `qa-check.js` 新增 `P0 feedback form contract`，检查反馈页核心字段、复制逻辑、草稿保存、入口接入和公开部署脚本。

## 验收结果

- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report`
  - 结果：`P0 机器验收通过，待真人确认；机器验收 7/7；待人工 2；需处理 0`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
  - 结果：全部通过，包含 `P0 feedback form contract`
- `node GitHub资产区/03_WebDemo/prototype/build-webdeploy-package.js`
  - 结果：`COPIED_FILES 149`

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 干净新局：<https://webdeploy-green.vercel.app/play>
- 反馈填写页：<https://webdeploy-green.vercel.app/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/P0%E5%8F%8D%E9%A6%88%E5%A1%AB%E5%86%99%E9%A1%B5.html>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_CBnrHDcGcXEFtuxkfYwhZe4FKQn4`

## 线上抽检

- 根入口返回 200，包含密码门、`填写反馈`、`试玩密码：tusun2026`。
- 反馈填写页返回 200，包含密码门、`生成并复制反馈包`、`《不思异：九州》P0 统一反馈包`。
- 线上 `p0-readiness-status.js` 返回 200，仍显示 `machineText: 7/7`，并把 `反馈填写页` 纳入测试者交付入口证据。

## 仍待人工

这页不替代真人反馈。P0 仍需回收：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
