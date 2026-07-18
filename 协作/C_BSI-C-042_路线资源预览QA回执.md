# C_BSI-C-042 路线资源预览 QA 回执

## 任务目标

把“路线选择要像 Out There 一样提前看到代价、风险和可观察资源”的要求纳入自动 QA，避免后续界面简化时误删核心决策信息。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectRoutePreviewContractProblems()`。
- 新增 QA 项：
  - `route preview contract`

## 当前检查内容

路线卡片必须保留以下信息：

- 目标地点插图。
- 出发地点与目标地点。
- 车轴、粮草、神志的路线消耗预测。
- 风险等级。
- 路遇摘要。
- 异象/保底标签。
- 目标地点可观察补给预览。
- 补给预览的样式钩子。

路线面板必须保留以下界面能力：

- 地图路线卡片布局。
- 三到四条路线的一屏压缩样式。
- 风险行样式。
- 异象标签样式。

## 当前验证结果

通过。

说明当前路线选择仍然是“看信息再决策”，不是单纯点击下一站。玩家可以在地图层看到：

- 走这条路会消耗什么。
- 可能遇到什么。
- 目的地大概能补什么。
- 哪些路更危险或更诡异。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js GitHub资产区/03_WebDemo/prototype/README.md 协作/不思异九州_任务交接台账.md 协作/C_BSI-C-042_路线资源预览QA回执.md
```

结果：全部通过。

## 主线程验收意见

通过。此项保护用户此前明确方向：战略选择参考 Out There，但以羊皮纸九州图呈现，并在路线选择时展示可观察资源与风险。
