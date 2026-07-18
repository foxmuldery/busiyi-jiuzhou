# 主协调 BSI-UX-102 P0 人工反馈收件台与密码确认回执

## 结论

- 线上试玩密码已统一为：`tusun2026`
- 固定公开试玩入口：`https://webdeploy-green.vercel.app/`
- 固定干净新局入口：`https://webdeploy-green.vercel.app/play`
- 最新生产部署：`dpl_8yb59UaCNhbWAKJEiRDwaT9KnHyx`
- 当前状态：P0 机器验收通过，待真人 5 分钟试玩与主观听音反馈。

## 本次完成

1. 新增 `P0人工反馈收件台.html`。
   - 支持粘贴多份真人反馈。
   - 自动生成 `P0-FB-*` 编号。
   - 自动检查《5分钟试玩记录》《音频听感复核》《本局复盘》缺口。
   - 支持 `可验收候选 / 需补材料 / 阻断反馈` 状态。
   - 支持复制单条补收消息、收件汇总和 JSON。

2. 已接入试玩总入口。
   - `试玩入口.html` 主卡片新增 `P0 反馈收件台`。
   - `P0 总验收` 状态卡新增 `反馈收件台` 链接。

3. 已接入验收与发布包。
   - `qa-check.js` 新增 P0 feedback inbox contract。
   - `p0-readiness-check.js` 的测试者交付入口已纳入反馈收件台。
   - `build-webdeploy-package.js` 已打包 `P0人工反馈收件台.html`。
   - `README.md` 已补充多人反馈先进入收件台的流程。

## 验收结果

- `node --check build-webdeploy-package.js`：通过。
- `node --check p0-readiness-check.js`：通过。
- `node --check qa-check.js`：通过。
- `p0-readiness-check.js --write-report`：机器验收 `9/9`，待人工 `2`，需处理 `0`。
- `qa-check.js`：全部通过。
- `build-webdeploy-package.js`：发布包生成，`156` 个文件。
- Vercel 生产部署：成功，固定域名已别名到 `dpl_8yb59UaCNhbWAKJEiRDwaT9KnHyx`。
- `online-smoke-check.js --write-report`：线上 `9/9`，阻断项 `0`。
- `visual-smoke-check.js --write-report`：截图 `2/2`，阻断项 `0`。
- 线上直连抽检 `P0人工反馈收件台.html`：已包含 `playtest-auth.js`、`bsi.p0.feedback.inbox.v1`、`复制收件汇总`、`P0-FB-*`、`可验收候选`。

## 下一步

1. 把 `https://webdeploy-green.vercel.app/` 和密码 `tusun2026` 发给第一批测试者。
2. 测试者反馈回来后，先逐条贴入 `P0人工反馈收件台.html`。
3. 对 `可验收候选` 反馈，再贴入 `P0真人试玩验收工作台.html` 做最终人工验收摘要。
4. 只有回收到真实 5 分钟试玩和主观听音后，才把 P0 从“机器通过”推进到“人工通过”。
