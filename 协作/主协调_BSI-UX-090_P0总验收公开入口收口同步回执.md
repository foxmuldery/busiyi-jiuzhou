# 主协调 BSI-UX-090 P0 总验收公开入口收口同步回执

日期：2026-06-24

## 1. 本轮目标

把 P0 总验收报告里的人工收口路径，从“先找内部试玩入口复制完整试玩包”调整为“优先分享线上公开入口”，避免测试者和协作者在外发时走旧路径。

## 2. 已完成

- `p0-readiness-check.js` 新增固定线上入口字段：
  - 线上公开入口：<https://webdeploy-green.vercel.app/>
  - 干净新局：<https://webdeploy-green.vercel.app/play>
  - 试玩密码：`tusun2026`
- `测试者交付入口` 检查项现在同时守住：
  - 公开根入口 5 分钟任务。
  - 内部 `试玩入口.html` 的完整试玩包。
  - 反馈包优先指引。
  - 人工回收清单与 `拆入三栏`。
- `P0试玩版总验收报告.md/html` 已重新生成：
  - 第一步改为优先分享线上公开入口。
  - 第二步才是需要完整交接时复制内部完整试玩包。
  - 仍保留结局 `P0 试玩反馈包` 优先、未通关三段材料兜底。
- `p0-readiness-status.js` 已同步 `onlineEntry / onlinePlay / password`。
- `qa-check.js` 已加入守门项，防止 P0 总报告再次丢失公开入口、密码和公开根入口任务口径。
- `README.md` 已同步说明 P0 总验收报告优先使用线上公开入口。

## 3. 验收结果

- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report`：通过并写入 P0 总验收报告。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：全部通过。
- `node GitHub资产区/03_WebDemo/prototype/build-webdeploy-package.js`：已重新生成 `output/webdeploy`。
- 已部署到 Vercel 生产环境：
  - 最新部署：`dpl_HJ7UwPQRCrJgi4kEmmNtfY8bTHut`
  - 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 线上抽检通过：
  - 根入口返回 200，包含 `复制 5 分钟任务`、`复制听音任务`、`试玩密码：tusun2026` 和 `复制反馈模板`。
  - P0 总验收报告返回 200，包含 `线上公开入口`、`https://webdeploy-green.vercel.app/`、`试玩密码：tusun2026`、`优先分享线上公开入口` 和 `P0 试玩反馈包`。
  - `p0-readiness-status.js` 返回 200，包含 `onlineEntry`、`password` 和 `公开根入口、5 分钟试玩任务`。
  - 三个线上响应均带 `X-Robots-Tag: noindex`。

## 4. 当前判断

外发路径现在更清楚：给测试者优先发固定公开入口和密码；主线程只在需要完整协作材料时使用内部试玩入口的完整试玩包。P0 仍未闭环，因为还缺真实 5 分钟试玩反馈和主观听音结论。
