# C_BSI-C-040 补给参与感 Smoke 回执

## 任务目标

在完整路径 smoke 基础上加入“每站一次补给”检查，确保玩家在城镇里不只是读剧情和选路，也能真实参与补给，并且补给数据不会断链或重复结算。

## 本轮改动

- 更新文件：[journey-smoke-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js)
- 更新文件：[README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 当前检查内容

完整路径 smoke 现在会在每个地点：

- 检查补给列表是数组。
- 检查补给 id 不为空且不重复。
- 选择第一个未使用补给。
- 应用补给 `effect`。
- 检查补给后车轴、粮草、神志不会归零。
- 检查该补给只标记使用一次。

## 当前验证结果

通过。

完整 smoke 路径仍为：

```text
central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift
```

每站执行一个补给后，抵达九州裂隙并处理裂隙事件，最终资源为：

```json
{"axle":69,"grain":86,"sanity":48}
```

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js GitHub资产区/03_WebDemo/prototype/README.md 协作/C_BSI-C-039_完整路径Smoke扩展回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。此项直接回应“每个城市不仅有剧情选择，还应该有补给选项”的核心体验要求。现在 smoke 会保护：

- 地点补给存在且可读。
- 补给会真实改变资源。
- 补给不会重复结算。
- 补给加入后完整路径仍可抵达裂隙。

下一步建议补“补给差异性 QA”：每个地点的补给类型不能完全一样，至少要体现车轴、粮草、神志的资源侧重差异。
