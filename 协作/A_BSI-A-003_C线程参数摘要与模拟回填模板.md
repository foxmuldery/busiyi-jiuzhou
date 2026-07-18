# A_BSI-A-003 C 线程参数摘要与模拟回填模板

> 子线程：A，核心规则与数值平衡设计师  
> 任务：BSI-A-003，C 线程参数摘要与模拟回填模板  
> 来源：压缩自 A_BSI-A-002，用于 C 线程直接写入 `data/config` 或模拟器配置  
> 边界：不写代码，不改 C 文件，不提交 Git

## 1. 给 C 线程的最小接入结论

C 线程第一版只需要接入 5 组配置：

1. `initialResources`：车轴、粮、神志初始值和阈值。
2. `routeCosts`：低/中/高风险路线固定消耗。
3. `eventWeights`：按路线等级抽取六类事件池。
4. `badLuckConfig`：坏运气保险参数和强制补救阈值。
5. `fairnessRules`：死局、不公平失败、可疑失败的判定条件。

第一版模拟不需要正式文本。事件可以先只有类型、资源变化、是否正向收益、是否关键线索这几个字段。

## 2. balanceConfig 摘要表

### 2.1 initialResources

| key | 车轴 axle | 粮 grain | 神志 sanity |
|---|---:|---:|---:|
| initial | 80 | 90 | 85 |
| max | 100 | 100 | 100 |
| warning | 30 | 35 | 45 |
| critical | 12 | 15 | 20 |
| deathTrigger | 0 | 0 | 0 |

建议配置形状：

```json
{
  "initialResources": {
    "axle": { "initial": 80, "max": 100, "warning": 30, "critical": 12, "deathTrigger": 0 },
    "grain": { "initial": 90, "max": 100, "warning": 35, "critical": 15, "deathTrigger": 0 },
    "sanity": { "initial": 85, "max": 100, "warning": 45, "critical": 20, "deathTrigger": 0 }
  }
}
```

### 2.2 routeCosts

| routeRisk | axle | grain | sanity | mapRatioTarget | designUse |
|---|---:|---:|---:|---|---|
| low | -4 | -4 | 0 | 40% 到 50% | 喘息、回撤、主路安全段 |
| medium | -7 | -6 | -3 | 35% 到 45% | 首局主要压力 |
| high | -12 | -9 | -10 | 10% 到 20% | 奖励、捷径、隐藏风险 |

建议配置形状：

```json
{
  "routeCosts": {
    "low": { "axle": -4, "grain": -4, "sanity": 0 },
    "medium": { "axle": -7, "grain": -6, "sanity": -3 },
    "high": { "axle": -12, "grain": -9, "sanity": -10 }
  }
}
```

### 2.3 routeLossCaps

| condition | maxSingleResourceLoss |
|---|---:|
| lowRoute | 5 |
| mediumRoute | 9 |
| highRouteAxle | 15 |
| highRouteGrain | 11 |
| highRouteSanity | 16 |
| passiveEventExtraLoss | 12 |
| postDeathSaveTwoSteps | 8 |

### 2.4 eventWeights

事件类型固定为：

```text
risk, supply, clue, item, sanity, rest
```

| routeRisk | risk | supply | clue | item | sanity | rest |
|---|---:|---:|---:|---:|---:|---:|
| low | 18 | 27 | 20 | 10 | 5 | 20 |
| medium | 34 | 18 | 18 | 10 | 12 | 8 |
| high | 46 | 10 | 12 | 8 | 20 | 4 |

建议配置形状：

```json
{
  "eventWeights": {
    "low": { "risk": 18, "supply": 27, "clue": 20, "item": 10, "sanity": 5, "rest": 20 },
    "medium": { "risk": 34, "supply": 18, "clue": 18, "item": 10, "sanity": 12, "rest": 8 },
    "high": { "risk": 46, "supply": 10, "clue": 12, "item": 8, "sanity": 20, "rest": 4 }
  }
}
```

### 2.5 eventResultRanges

| eventType | axleMin | axleMax | grainMin | grainMax | sanityMin | sanityMax | defaultPositiveTag |
|---|---:|---:|---:|---:|---:|---:|---|
| risk | -12 | 0 | -12 | 0 | -12 | 0 | false |
| supply | -4 | 12 | 10 | 24 | -4 | 4 | true |
| clue | -4 | 0 | -4 | 0 | -6 | 0 | true |
| item | -6 | 8 | -6 | 8 | -6 | 4 | true |
| sanity | -2 | 0 | -4 | 0 | -16 | -6 | conditional |
| rest | 0 | 6 | -6 | 8 | 5 | 15 | true |

`sanity` 事件只有给隐藏路线、真名、关键线索时才算 `positiveTag = true`。

### 2.6 badLuckConfig

| key | value |
|---|---:|
| initial | 0 |
| max | 100 |
| consecutiveBadWarning | 2 |
| noPositiveWarning | 3 |
| forceRescueThreshold | 75 |
| postDeathSaveProtectionSteps | 2 |

变化规则：

| trigger | delta |
|---|---:|
| riskLoss6To11 | +8 |
| riskLoss12Plus | +15 |
| sanityLoss10Plus | +12 |
| secondConsecutiveBadEvent | +10 |
| thirdConsecutiveBadEvent | +25 |
| anyResourceCritical | +15 |
| deathSaveTriggered | +25 |
| supplyOrRestEvent | -20 |
| clueOrItemGain | -12 |
| deathSaveResolved | -25 |

建议配置形状：

```json
{
  "badLuckConfig": {
    "initial": 0,
    "max": 100,
    "forceRescueThreshold": 75,
    "consecutiveBadWarning": 2,
    "noPositiveWarning": 3,
    "postDeathSaveProtectionSteps": 2,
    "deltas": {
      "riskLoss6To11": 8,
      "riskLoss12Plus": 15,
      "sanityLoss10Plus": 12,
      "secondConsecutiveBadEvent": 10,
      "thirdConsecutiveBadEvent": 25,
      "anyResourceCritical": 15,
      "deathSaveTriggered": 25,
      "supplyOrRestEvent": -20,
      "clueOrItemGain": -12,
      "deathSaveResolved": -25
    }
  }
}
```

### 2.7 rescueRules

保底触发顺序必须固定：

| priority | condition | requiredAction |
|---:|---|---|
| 1 | noAvailableRoutes | forceRescue:no_route |
| 2 | anyResource <= 0 | enterDeathSave |
| 3 | allRoutesCauseAnyResourceToZero | insertRescueForLowestResource |
| 4 | badLuckMeter >= 75 | forceEventFrom:supply/rest/clue |
| 5 | consecutiveBadEvents >= 2 | blockHighLossRisk |
| 6 | noPositiveSteps >= 3 | forcePositiveTag |
| 7 | previousRouteRisk == high | ensureNextNodeHasLowOrMediumExit |

### 2.8 deathSaveConfig

| resource | stateName | maxFullRescuePerRun | minimumOptions | protectionStepsAfterRescue |
|---|---|---:|---:|---:|
| axle | broken_axle | 1 | 2 | 2 |
| grain | famine | 1 | 2 | 2 |
| sanity | collapse | 1 | 2 | 2 |

全局限制：

| key | value |
|---|---:|
| maxTotalDeathSavesPerRun | 2 |
| thirdDeathTriggerCanFail | true |
| rescueRestoresToSafe | false |

## 3. mapConfig 静态检查摘要

C 线程生成或手配首局地图后，先跑静态检查，再跑 1000 局。

| checkId | passCondition | failSeverity |
|---|---|---|
| mainPathReachable | 起点到基础结局存在路线 | blocker |
| mainPathCostCap | 主路总车轴 <= 65，粮 <= 75，神志 <= 45 | blocker |
| supplyInterval | 任意连续 4 步主路内至少 1 个补给/休整/修复机会 | blocker |
| earlyPositive | 起点后前 3 步至少 1 个 positiveTag | blocker |
| highRiskIsolation | 不存在连续 3 条强制 high 路线 | blocker |
| exitCheck | 每个非结局节点至少 1 条离开路线 | blocker |
| clueRedundancy | 每个必需线索至少 2 个来源或 1 个保底补发条件 | warning |
| deathSaveOptions | 三种资源归零后各有至少 2 个可显示选项 | blocker |

## 4. fairnessRules 摘要

### 4.1 unfair

| ruleId | 判定 |
|---|---|
| unfair_01_softlock | `softlockFlag = true` |
| unfair_02_same_resource_burst | 非主动高风险下，连续 3 步内同一资源被扣到归零 |
| unfair_03_fake_rescue | 濒死补救后 2 步内同一资源再次归零失败 |
| unfair_04_badluck_no_rescue | 失败前连续 3 个事件无正向收益，且 badLuckMeter 未触发补救 |
| unfair_05_all_routes_die | 所有可见路线都会导致资源归零，且无补救或回撤 |
| unfair_06_key_clue_random_locked | 关键线索被随机错过后无替代来源，主路不可达 |
| unfair_07_sanity_hint_total_loss | 低神志提示完全失真，无法记录路线风险等级 |

### 4.2 questionable

| ruleId | 判定 |
|---|---|
| questionable_01_unclear_high_risk | 玩家主动选高风险，但路线预览不够明确 |
| questionable_02_skipped_supply | 玩家连续跳过补给后失败 |
| questionable_03_greedy_item_loss | 玩家因贪心选择损失关键器物后失败 |
| questionable_04_special_sanity_route | 玩家进入神志特殊路线后失败 |

### 4.3 fair

| ruleId | 判定 |
|---|---|
| fair_01_repeated_high_risk | 玩家多次主动选择高风险 |
| fair_02_ignored_rescue | 玩家忽略明确补给或休整机会 |
| fair_03_low_resource_push | 玩家资源低时仍继续深入 |
| fair_04_had_rescue | 失败前至少有 1 次明确补救机会 |

## 5. 1000 局模拟运行参数

| key | value |
|---|---|
| runs | 1000 |
| playerModels | conservative, explorer, greedy, returner, random |
| seeds | 固定种子列表或主种子派生 |
| requiredStaticChecksBeforeRun | true |
| outputPerRunLog | true |
| outputSummary | true |

玩家模型行为摘要：

| playerModel | 行为 |
|---|---|
| conservative | 优先 low；任一资源低于 warning 就找补给/休整 |
| explorer | 优先未探索地点；可接受 medium/high；低于 critical 才补救 |
| greedy | 优先 item/clue/隐藏路线；愿意用资源换收益 |
| returner | 资源低于 warning 后优先回撤到安全点 |
| random | 在可见选项中随机选择，用于发现漏洞 |

## 6. 每局输出字段模板

C 线程每局模拟建议输出一行 JSON 或一行表格。字段如下：

| field | type | required | example |
|---|---|---|---|
| runId | number | yes | 1 |
| seed | string | yes | demo-001 |
| playerModel | string | yes | conservative |
| result | string | yes | win/fail/special/return |
| steps | number | yes | 16 |
| failureReason | string | yes | broken_axle/famine/collapse/no_route/greedy/sanity_route/none |
| fairness | string | yes | fair/questionable/unfair |
| fairnessRuleId | string | yes | fair_04_had_rescue |
| softlockFlag | boolean | yes | false |
| resourcesFinal.axle | number | yes | 22 |
| resourcesFinal.grain | number | yes | 18 |
| resourcesFinal.sanity | number | yes | 31 |
| resourcesMin.axle | number | yes | 9 |
| resourcesMin.grain | number | yes | 14 |
| resourcesMin.sanity | number | yes | 28 |
| badLuckPeak | number | yes | 62 |
| deathSaveCount | number | yes | 1 |
| forcedRescueCount | number | yes | 2 |
| consecutiveBadEventsMax | number | yes | 2 |
| noPositiveStepsMax | number | yes | 3 |
| lowRoutes | number | yes | 7 |
| mediumRoutes | number | yes | 6 |
| highRoutes | number | yes | 1 |
| riskEvents | number | yes | 5 |
| supplyEvents | number | yes | 3 |
| clueEvents | number | yes | 3 |
| itemEvents | number | yes | 1 |
| sanityEvents | number | yes | 2 |
| restEvents | number | yes | 2 |
| notes | string | no | 濒死后存活 4 步 |

## 7. 汇总回填模板

C 线程跑完 1000 局后，把结果回填成下面这个表给 A 线程调参。

### 7.1 总览

| 指标 | 实测值 | 目标 | 判定 | 备注 |
|---|---:|---:|---|---|
| 总局数 |  | 1000 |  |  |
| 总通关率 |  | 25% 到 40% |  |  |
| 不公平失败率 |  | 0% 到 3% |  |  |
| 死局率 |  | 0% 到 1% |  |  |
| 平均失败步数 |  | >= 8 |  |  |
| 平均通关步数 |  | 12 到 20 |  |  |
| 濒死后 3 步存活率 |  | >= 65% |  |  |
| badLuckMeter P95 |  | <= 85 |  |  |

### 7.2 按玩家模型

| playerModel | 局数 | 通关率 | 平均步数 | 不公平失败率 | 死局率 | 主要失败原因 |
|---|---:|---:|---:|---:|---:|---|
| conservative |  | 45% 到 65% |  |  |  |  |
| explorer |  | 20% 到 40% |  |  |  |  |
| greedy |  | 15% 到 35% |  |  |  |  |
| returner |  | 30% 到 55% |  |  |  |  |
| random |  | 5% 到 18% |  |  |  |  |

### 7.3 失败原因分布

| failureReason | 次数 | 占失败局比例 | 目标范围 | 判定 |
|---|---:|---:|---:|---|
| broken_axle |  |  | 20% 到 40% |  |
| famine |  |  | 20% 到 40% |  |
| collapse |  |  | 15% 到 35% |  |
| no_route |  |  | 0% |  |
| greedy |  |  | 可存在 |  |
| sanity_route |  |  | 可存在但需标 questionable |  |
| other |  |  | 低于 10% |  |

### 7.4 保底触发

| rescueMetric | 实测值 | 目标 | 判定 |
|---|---:|---:|---|
| forcedRescueCountTotal |  | 不设硬上限 |  |
| forcedRescueAvgPerRun |  | 0.3 到 1.5 |  |
| deathSaveCountTotal |  | 观察项 |  |
| deathSaveSurvivalRate3Steps |  | >= 65% |  |
| badLuckPeakAverage |  | 低于 65 |  |
| badLuckPeakP95 |  | <= 85 |  |
| consecutiveBadEventsMaxP95 |  | <= 2 |  |
| noPositiveStepsMaxP95 |  | <= 3 |  |

### 7.5 路线与事件分布

| distribution | low/rest/supply 等低压 | medium/clue/item 等中压 | high/risk/sanity 等高压 | 备注 |
|---|---:|---:|---:|---|
| routeRiskDistribution |  |  |  | low 目标 40% 到 50%，high 目标 10% 到 20% |
| eventPoolDistribution |  |  |  | risk 不应压倒 supply/rest/clue |

## 8. 调参决策表

| 问题 | 优先处理 |
|---|---|
| 死局率 > 1% | 先修地图出口、保底触发、濒死选项，不调初始资源 |
| 不公平失败率 > 3% | 增强 badLuckMeter 或降低连续风险事件 |
| 总通关率 < 25% | 先降低 medium/high 消耗，再增加补给密度 |
| 总通关率 > 45% | 提高 high 代价或降低高风险收益 |
| 保守玩家通关率 < 40% | 增加 low 路线和补给节点 |
| 随机玩家通关率 > 20% | 提高路线选择代价差异 |
| broken_axle > 50% | 降低车轴消耗或增加修车 |
| famine > 50% | 降低粮耗或增加补粮 |
| collapse > 45% | 降低 sanity 事件密度或神志扣减 |
| 濒死后 3 步存活率 < 65% | 提高濒死恢复值或延长保护 |

## 9. C 线程接入字段清单

最低必须接入：

```text
initialResources.axle/grain/sanity
routeCosts.low/medium/high
eventWeights.low/medium/high
eventResultRanges.risk/supply/clue/item/sanity/rest
badLuckConfig.forceRescueThreshold
badLuckConfig.deltas
rescueRules.priority
deathSaveConfig
fairnessRules
simulationOutput.perRun
simulationOutput.summary
```

可以暂缓：

```text
复杂器物修正
多结局权重
语言理解数值
正式文本污染强度
图形化模拟报告
```

## 10. 待 C 线程回填

等 C 线程完成第一版模拟，请把以下内容回填给 A 线程：

1. 1000 局汇总表。
2. 每个玩家模型的通关率和主要失败原因。
3. 所有 `unfair` 局的 `runId`、`seed`、`fairnessRuleId`。
4. `softlockFlag = true` 的完整路径。
5. badLuckMeter 峰值最高的前 10 局。
6. 濒死补救后 2 步内再次失败的局。

