# 主协调 BSI-UX-104 试玩密码确认与最终发布包刷新回执

## 结论

- 固定公开试玩入口：`https://webdeploy-green.vercel.app/`
- 试玩密码：`tusun2026`
- 线上密码门哈希已确认对应 `tusun2026`。
- 最新生产部署：`dpl_2jQSbgwAwMowGwsgeGVW4g71ydN6`
- 当前 P0 状态：机器验收通过，仍待真实 5 分钟试玩和主观听音反馈。

## 本次完成

1. 确认密码统一。
   - 根入口、`/play`、游戏页、反馈页、发测批次台、反馈收件台和总验收报告都使用同一套轻量密码门。
   - 公开文案统一显示试玩密码 `tusun2026`。
   - 密码门只用于小范围内部试玩防扩散，不等于正式账号系统。

2. 刷新发布包。
   - 重新生成 `P0试玩版总验收报告.md/html`。
   - 重新生成 `p0-readiness-status.js`。
   - 重新打包 `output/webdeploy`，共 `157` 个文件。

3. 重新部署线上公开试玩站。
   - Vercel 项目：`foxlaoys-projects/webdeploy`
   - 生产部署：`dpl_2jQSbgwAwMowGwsgeGVW4g71ydN6`
   - 固定别名：`https://webdeploy-green.vercel.app/`

## 验收结果

- 密码哈希复核：`tusun2026` 对应 `019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa`。
- `qa-check.js`：全部通过。
- `p0-readiness-check.js --write-report`：机器验收 `9/9`，待人工 `2`，需处理 `0`。
- `build-webdeploy-package.js`：发布包生成，`157` 个文件。
- `online-smoke-check.js --write-report`：线上 `9/9`，阻断项 `0`。
- `visual-smoke-check.js --write-report`：截图 `2/2`，阻断项 `0`。
- 最终线上抽检：
  - 根入口 HTTP `200`。
  - 响应头包含 `X-Robots-Tag: noindex`。
  - 根入口包含 `BSI_PLAYTEST_AUTH`。
  - 根入口包含密码门脚本 `/playtest-auth.js`。
  - 根入口包含试玩密码文案 `tusun2026`。

## 下一步

1. 把固定入口和密码发给第一批测试者。
2. 用 `P0发测批次台.html` 登记测试者、渠道和追收时间。
3. 回收真实 5 分钟试玩记录和 3 分钟听音反馈。
4. 用 `P0人工反馈收件台.html` 编号、补缺和汇总。
5. 满足人工材料后再进入 P0 最终验收。
