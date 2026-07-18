# 主协调 BSI-UX-093 P0 总验收听音任务证据同步回执

日期：2026-06-24

## 1. 本轮目标

上一轮已经把 `复制听音任务` 放到固定公开入口，但 P0 总验收报告里的“测试者交付入口”证据仍只写了 5 分钟试玩任务。为避免报告和入口口径分叉，本轮把公开根页 3 分钟听音任务纳入 P0 总验收守门。

## 2. 已完成

- `p0-readiness-check.js` 的 `测试者交付入口` 检查新增公开根页听音任务校验：
  - `copyAudioTask`
  - `《不思异：九州》P0 3 分钟听音任务`
  - `请只判断听感，不判断授权`
  - `先听完 6 首音乐候选`
  - `复制音频验收摘要`
- `P0试玩版总验收报告.md/html` 已重新生成。
- `p0-readiness-status.js` 已同步新证据口径。
- 报告的人工收口路径新增：需要单独判断声音时，也从线上公开入口点击 `复制听音任务`，发给听音人并回收 `P0 音频听感验收摘要`。

## 3. 验收结果

- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report`：通过并写入报告。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：全部通过。
- `node GitHub资产区/03_WebDemo/prototype/build-webdeploy-package.js`：已重新生成 `output/webdeploy`。
- 已部署到 Vercel 生产环境：
  - 最新部署：`dpl_HJ7UwPQRCrJgi4kEmmNtfY8bTHut`
  - 固定试玩入口：<https://webdeploy-green.vercel.app/>
  - 试玩密码：`tusun2026`
- 线上抽检通过：
  - 根入口返回 200，包含 `复制听音任务` 和 `试玩密码：tusun2026`。
  - P0 总验收报告返回 200，包含 `3 分钟听音任务`、`复制听音任务` 和 `P0 音频听感验收摘要`。
  - `p0-readiness-status.js` 返回 200，包含 `公开根入口、5 分钟试玩任务、3 分钟听音任务`。
  - 三个线上响应均带 `X-Robots-Tag: noindex`。

## 4. 当前判断

P0 报告现在能证明公开入口已覆盖两条人工链：5 分钟真人试玩和 3 分钟听音复核。P0 仍未最终完成，因为还缺真实玩家反馈和主观听音结论。
