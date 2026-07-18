# BSI-UX-041 结局复盘与日志分流验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已确认试玩可以通关到“入裂隙”结局。本轮补齐结局后的收束体验：让“复盘本局”和“查看日志”成为两个明确不同的动作，避免玩家完成一局后感觉按钮重复。

## 已完成

1. “复盘本局”改为居中结局复盘弹窗，直接展示本局天数、显影地点、路线数、事件/路遇/补给/补救、当前资源、最低资源压力和完整路线。
2. “查看日志”保留为右侧行旅日志抽屉，用于查看逐条记录、见闻图鉴与遭遇图鉴。
3. 复盘弹窗内提供“完整日志”和“重开一局”两个后续动作。
4. 更新页面缓存版本至 `app.js?v=20260621-c121`。
5. 更新 QA 合约，要求结局复盘必须存在独立的 `showRunRecapModal` 流程。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node --check GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/qa-check.js`

浏览器验收：

- 视口：`960 x 540` 横屏。
- 测试入口：`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&view=town`
- 结局弹窗出现“重开一局 / 复盘本局 / 查看日志”。
- 点击“复盘本局”后仍为居中弹窗，标题为“入裂隙”，眉题为“本局复盘”，无右侧抽屉。
- 点击复盘内“完整日志”后打开右侧“行旅日志”，中央弹窗关闭。
- 控制台无 error / warn。

## 后续建议

1. B 线程后续可把复盘文字改成更有山海经风味的“一局简牍”，但仍保持 5 行以内。
2. C 线程后续可把真实通关路线的复盘数据与直达测试入口的模拟数据区分开，避免测试入口显示“事件 0 / 补给 0”时误解为正式一局。
3. D 线程后续可设计复盘弹窗的结算图标和结局章印，提高完成感。
