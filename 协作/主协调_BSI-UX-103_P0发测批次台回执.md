# 主协调 BSI-UX-103 P0 发测批次台回执

## 结论

- 新增 `P0发测批次台.html`，用于真实发测前登记批次、测试者、渠道、发送时间和追收时间。
- 固定公开试玩入口仍为：`https://webdeploy-green.vercel.app/`
- 试玩密码仍为：`tusun2026`
- 最新生产部署：`dpl_J14UdE2CK56Ny42icWqAug6KKu94`
- 当前 P0 状态：机器验收通过，仍待真实 5 分钟试玩和主观听音反馈。

## 本次完成

1. 新增 P0 发测批次台。
   - 支持 `待发送 / 已发送 / 待追收 / 已完成 / 阻断` 状态。
   - 支持复制本批试玩邀请。
   - 支持复制本批追收消息。
   - 支持复制发测汇总和 JSON。
   - 本地保存 key：`bsi.p0.playtest.batch.v1`。

2. 接入试玩入口。
   - 主入口新增 `P0 发测批次台` 卡片。
   - P0 总验收状态卡新增 `发测批次台` 链接。

3. 接入验收与发布。
   - `build-webdeploy-package.js` 已打包 `P0发测批次台.html`。
   - `p0-readiness-check.js` 已把发测批次台纳入“测试者交付入口”机器项。
   - `qa-check.js` 新增 `P0 playtest batch desk contract`。
   - `README.md` 已更新为：发测批次台 -> 反馈收件台 -> 真人验收台。
   - `P0试玩版总验收报告.md/html` 已同步人工收口路径。

## 验收结果

- `node --check build-webdeploy-package.js`：通过。
- `node --check p0-readiness-check.js`：通过。
- `node --check qa-check.js`：通过。
- `p0-readiness-check.js --write-report`：机器验收 `9/9`，待人工 `2`，需处理 `0`。
- `qa-check.js`：全部通过。
- `build-webdeploy-package.js`：发布包生成，`157` 个文件。
- Vercel 生产部署：成功，固定域名已别名到 `dpl_J14UdE2CK56Ny42icWqAug6KKu94`。
- 线上 P0 发测批次台直连抽检：包含 `playtest-auth.js`、`bsi.p0.playtest.batch.v1`、`复制本批邀请`、`复制本批追收`、`复制发测汇总`、`P0-BATCH-*`、`试玩密码：tusun2026`。
- 线上 P0 总验收报告抽检：包含 P0 发测批次台、P0 人工反馈收件台、复制本批追收、密码门脚本。
- `online-smoke-check.js --write-report`：线上 `9/9`，阻断项 `0`。
- `visual-smoke-check.js --write-report`：截图 `2/2`，阻断项 `0`。

## 下一步

1. 在 `P0发测批次台.html` 里建立第一批真实测试者名单。
2. 点击 `复制本批邀请` 发出链接和密码。
3. 到追收时间后用 `复制本批追收` 催回反馈。
4. 收到反馈后贴入 `P0人工反馈收件台.html` 编号。
5. 可验收候选再进入 `P0真人试玩验收工作台.html` 生成最终人工验收摘要。
