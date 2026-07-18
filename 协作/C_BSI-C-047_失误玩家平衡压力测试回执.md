# C_BSI-C-047 失误玩家平衡压力测试回执

日期：2026-06-18

## 任务目标

把批量平衡模拟从“默认玩家能通关”推进到“第一次玩、会误判补给和路线的玩家也能被统计”，用于判断 P0 是否只是过宽，还是已经具备可控压力。

## 本轮改动

- 更新文件：[balance-sim.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js)
- 更新文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 更新文件：[README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- 更新文件：[主协调_P0_5分钟试玩验收报告.md](/Users/yuanzhe/Documents/game/协作/主协调_P0_5分钟试玩验收报告.md)
- 更新文件：[不思异九州_总体推进计划.md](/Users/yuanzhe/Documents/game/协作/不思异九州_总体推进计划.md)
- 更新文件：[不思异九州_任务交接台账.md](/Users/yuanzhe/Documents/game/协作/不思异九州_任务交接台账.md)

## 新增能力

`balance-sim.js` 现在支持第四种策略：

```text
--strategy novice
```

它模拟第一次玩的玩家：

- 不总是选择最优地点事件选项。
- 补给有概率选错资源。
- 路线会偏向进度和高风险，不稳定避险。
- 危机补救仍使用合理补救，避免把测试变成故意自杀。

模拟器新增输出：

- `STRATEGY_NOTE`：说明当前模拟策略含义。
- `WARNING_RUNS`：统计多少局触达资源告警线。
- `RESCUED_RUNS`：统计多少局触发濒死补救。
- `FAILURE_STEP_BUCKETS`：统计失败发生在前 3 步、中段还是后段。

## 1000 局结果

### balanced

```text
SUCCESS_RATE 100%
WARNING_RUNS {"axle":0,"grain":0,"sanity":0,"any":0}
RESCUED_RUNS 0
FAILURE_STEP_BUCKETS {"early_0_3":0,"mid_4_6":0,"late_7_plus":0}
RESOURCE_MINIMUMS {"axle":{"min":44,"p10":65,"median":69},"grain":{"min":37,"p10":43,"median":50},"sanity":{"min":48,"p10":52,"median":55}}
```

### conservative

```text
SUCCESS_RATE 100%
WARNING_RUNS {"axle":0,"grain":0,"sanity":0,"any":0}
RESCUED_RUNS 0
FAILURE_STEP_BUCKETS {"early_0_3":0,"mid_4_6":0,"late_7_plus":0}
RESOURCE_MINIMUMS {"axle":{"min":50,"p10":65,"median":68},"grain":{"min":37,"p10":42,"median":50},"sanity":{"min":48,"p10":52,"median":55}}
```

### risky

```text
SUCCESS_RATE 100%
WARNING_RUNS {"axle":0,"grain":0,"sanity":5,"any":5}
RESCUED_RUNS 0
FAILURE_STEP_BUCKETS {"early_0_3":0,"mid_4_6":0,"late_7_plus":0}
RESOURCE_MINIMUMS {"axle":{"min":43,"p10":51,"median":69},"grain":{"min":38,"p10":48,"median":62},"sanity":{"min":45,"p10":51,"median":58}}
```

### novice

```text
SUCCESS_RATE 100%
WARNING_RUNS {"axle":1,"grain":120,"sanity":573,"any":631}
RESCUED_RUNS 2
FAILURE_STEP_BUCKETS {"early_0_3":0,"mid_4_6":0,"late_7_plus":0}
RESOURCE_MINIMUMS {"axle":{"min":30,"p10":48,"median":63},"grain":{"min":4,"p10":34,"median":52},"sanity":{"min":0,"p10":19,"median":43}}
```

## 主线程判断

当前 P0 的“不直接死局”已经有较强证据：

- 默认、谨慎、冒险、失误玩家四种策略 1000 局均可抵达裂隙。
- 失误玩家没有前 3 步早死，说明保底和补给结构有效。
- 失误玩家 63.1% 的局触达至少一种告警线，压力主要集中在神志，其次是粮草。

这说明下一轮不是继续加保底，而是要调“紧张但不崩”的手感：

- 保持 P0 默认策略 1000 局通关率高于 95%。
- 允许 novice 策略出现告警和少量补救。
- 后续 P1 可以适度提高后段路线压力，但必须继续守住 `early_0_3 = 0`。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/balance-sim.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy balanced
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy conservative
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy risky
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

结果：全部通过。
