# C_BSI-C-039 完整路径 Smoke 扩展回执

## 任务目标

把上一轮的“第一段核心循环 smoke”扩展为“完整主线路径 smoke”，用于确认当前数据不只第一步能跑，而是能沿稳定主线抵达九州裂隙，并出现结局入口。

## 本轮改动

- 更新文件：[journey-smoke-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js)
- 更新文件：[README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 当前完整 Smoke 路径

```text
central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift
```

对应地点链路：

```text
中原驿 -> 废关 -> 黑齿市 -> 断碑 -> 九州裂隙
```

## 当前检查内容

- 每一步当前地点存在。
- 当前地点事件存在并有可选项。
- 执行第一个地点事件选择后，车轴、粮草、神志不会归零。
- 指定路线存在，并且从当前地点出发。
- 执行路线消耗后，三资源不会归零。
- 如果路线有半途路遇，则路遇存在、有可选项，执行后资源不会归零。
- 最终抵达 `kyushu_rift`。
- 九州裂隙事件存在，有结局选项。

## 当前验证结果

通过。

完整 smoke 抵达九州裂隙后资源：

```json
{"axle":54,"grain":92,"sanity":38}
```

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js GitHub资产区/03_WebDemo/prototype/README.md
```

结果：全部通过。

## 主线程验收意见

通过。现在有两层自动检查：

- `qa-check.js`：结构、素材、音频、UI 入口和数据引用。
- `journey-smoke-check.js`：第一段核心循环 + 完整主线路径。

下一步建议继续补“补给参与感 smoke”：完整路径中每到一个地点尝试执行一个可用补给，确认补给不会重复、资源变化可读、目的地补给表没有断链。
