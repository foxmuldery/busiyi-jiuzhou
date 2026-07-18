# C_BSI-C-044 路线目的地补给数据 QA 回执

## 任务目标

把“路线卡显示目标地点可补资源”落实到数据层，确保每一条路线的目的地都能提供真实、可预览的补给信息。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectRouteDestinationSupplyProblems()`。
- 新增 QA 项：
  - `route destination supplies previewable`

## 当前检查内容

- 每条路线的目的地必须存在。
- 每条路线的目的地必须有 `supplies` 数组。
- 每条路线的目的地至少有一个补给选项。
- 目的地补给必须形成正向资源画像，不能只是空补给或纯负收益。

## 设计意义

这项检查服务大地图决策层：

- 玩家在路线卡看到的“可补：轴/粮/神”必须对应真实地点资源。
- 路线选择不只是点下一站，而是要结合路费、风险、路遇和目的地收益来判断。
- 后续新增地点或路线时，不容易忘记给目的地配置补给。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/不思异九州_任务交接台账.md 协作/C_BSI-C-044_路线目的地补给数据QA回执.md
```

结果：全部通过。

## 主线程验收意见

通过。此项是 C-042 / C-043 的数据层补强，保护“Out There 式路线资源决策”在九州图上持续成立。
