# 主协调 BSI-UX-101 P0 人工材料补收消息回执

## 目标

机器验收已经达到 `9/9`，P0 剩余风险集中在人工材料：真实 5 分钟试玩反馈和主观听音摘要。本轮目标是降低主线程追收成本：当测试者只发回部分材料时，验收台能一键生成“还缺什么、请补什么”的短消息。

## 本轮完成

1. `P0真人试玩验收工作台.html` 新增按钮：
   - `复制补收消息`
   - 根据当前门槛缺口、反馈证据雷达、三段材料回收状态自动生成追问文本。

2. 新增逻辑：
   - `buildFollowupRequest()`
   - `copyFollowupRequest()`
   - 追问文本会提示测试者优先补：
     - `5分钟试玩记录`
     - `音频听感复核`
     - 游戏内“志”的本局复盘
     - 结局里的 `P0 试玩反馈包`

3. P0 报告同步：
   - `p0-readiness-check.js` 的人工收口路径加入 `复制补收消息`。
   - `P0试玩版总验收报告.md/html` 已重新生成。
   - `README.md` 已说明该按钮用途。

4. QA 守门同步：
   - `qa-check.js` 的 `P0 human playtest acceptance workbench contract` 已检查新增按钮和函数。
   - `P0 readiness report contract` 已检查报告里的 `复制补收消息`。

## 验收结果

- `node qa-check.js`
  - 全部通过，包含 `P0 human playtest acceptance workbench contract`
- `node p0-readiness-check.js --write-report`
  - `P0 机器验收通过，待真人确认；机器验收 9/9；待人工 2；需处理 0`
- `node online-smoke-check.js --write-report`
  - `线上公开站冒烟通过，待真人试玩；页面 9/9；阻断项 0`
- `node visual-smoke-check.js --write-report`
  - `线上可视化验收通过，待真人试玩；截图 2/2；阻断项 0`

## 线上部署

- 固定试玩入口：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`
- 最新部署：`dpl_2oDBxeGHFXFU8P55WxAxKFQgCZNa`
- Vercel 状态：Ready

## 线上复验

线上 `P0真人试玩验收工作台.html` 已包含：

- `copyFollowupRequest`
- `复制补收消息`
- `补收消息已复制`
- `最省事的补法`

## 下一步

继续等待真实人工材料：

1. 至少 1 份真实 5 分钟试玩反馈。
2. 至少 1 份主观听音摘要。
3. 收到不完整材料时，先贴进 `P0真人试玩验收工作台.html`，再点 `复制补收消息` 向测试者追收缺口。
