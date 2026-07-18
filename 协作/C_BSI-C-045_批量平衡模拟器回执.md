# C_BSI-C-045 批量平衡模拟器回执

## 任务目标

把 P0 试玩版的平衡验证从“固定主线能通”推进到“多局随机模拟可统计”，用于判断随机、补给、路线消耗和保底是否会导致死局。

## 本轮改动

- 新增文件：[balance-sim.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js)
- 更新文件：[README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- 更新文件：[不思异九州_总体推进计划.md](/Users/yuanzhe/Documents/game/协作/不思异九州_总体推进计划.md)
- 更新文件：[不思异九州_任务交接台账.md](/Users/yuanzhe/Documents/game/协作/不思异九州_任务交接台账.md)

## 模拟器能力

当前 `balance-sim.js` 会读取现有 `data.js`，模拟：

- 地点事件选择。
- 每站一次补给。
- 路线池随机抽取。
- 路线选择。
- 路线资源消耗。
- 固定半途路遇。
- 随机路遇触发。
- 坏运变化。
- 濒死补救。
- 抵达九州裂隙并选择入裂隙结局。

支持三种策略：

- `balanced`：默认平衡策略，兼顾推进和资源。
- `conservative`：更看重资源安全。
- `risky`：更看重快速推进和高压路线。

## 命令

```text
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy balanced
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy conservative
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy risky
```

## 本轮模拟结果

### balanced

```text
SUCCESS_RATE 100%
AVERAGE_STEPS 6.45
AVERAGE_ROUTE_EVENTS 5.64
AVERAGE_RANDOM_ROUTE_EVENTS 0.58
OUTCOMES {"rift":1000}
FAILURE_TYPES {}
CRISES {"axle":0,"grain":0,"sanity":0,"rescues":0,"hardFailures":0}
RESOURCE_MINIMUMS {"axle":{"min":44,"p10":65,"median":69},"grain":{"min":37,"p10":43,"median":50},"sanity":{"min":48,"p10":52,"median":55}}
```

### conservative

```text
SUCCESS_RATE 100%
AVERAGE_STEPS 6.47
AVERAGE_ROUTE_EVENTS 5.67
AVERAGE_RANDOM_ROUTE_EVENTS 0.58
OUTCOMES {"rift":1000}
FAILURE_TYPES {}
CRISES {"axle":0,"grain":0,"sanity":0,"rescues":0,"hardFailures":0}
RESOURCE_MINIMUMS {"axle":{"min":50,"p10":65,"median":68},"grain":{"min":37,"p10":42,"median":50},"sanity":{"min":48,"p10":52,"median":55}}
```

### risky

```text
SUCCESS_RATE 100%
AVERAGE_STEPS 6.20
AVERAGE_ROUTE_EVENTS 5.41
AVERAGE_RANDOM_ROUTE_EVENTS 0.58
OUTCOMES {"rift":1000}
FAILURE_TYPES {}
CRISES {"axle":0,"grain":0,"sanity":0,"rescues":0,"hardFailures":0}
RESOURCE_MINIMUMS {"axle":{"min":43,"p10":58,"median":66},"grain":{"min":37,"p10":44,"median":52},"sanity":{"min":48,"p10":51,"median":56}}
```

## 主线程判断

当前结论：

- P0 不死局目标达成度高。
- 三种策略都能稳定抵达裂隙。
- 当前没有触发危机，说明首章资源压力偏安全。
- 下一轮数值工作不应再只做“保底防死”，而应开始增加紧张感和波动。

建议下一步：

- 提高部分后段路线消耗，尤其 `dream_to_rift`、`feather_to_dream`、`mire_to_feather`。
- 提高随机路遇平均触发率或让高压随机事件更常出现。
- 增加“错误选择”策略模拟，专门测试低水平玩家是否会被过早打死。
- 把模拟结果做成固定 P0/P1 验收门槛：默认策略 1000 局通关率不低于 85%，冒险策略允许失败但不能前 3 步大规模死局。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/balance-sim.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy balanced
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy conservative
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy risky
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

结果：全部通过。
