# A 首版可运行最小数值口径

> 目的：给 C 线程先跑起 3-5 分钟 Web Demo 用  
> 原则：不追求完整平衡，先保证能走、能触发事件、不容易首局死局  
> 说明：界面可显示“粮草”，配置字段建议仍用 `grain`

## 1. 最小结论

C 线程先用这一套，不等完整模拟：

| 项 | 临时值 |
|---|---:|
| 车轴初始 | 90 |
| 粮草初始 | 95 |
| 神志初始 | 90 |
| 三资源上限 | 100 |
| 低值预警 | 25 |
| 濒死触发 | 0 |
| 试玩目标 | 3-5 分钟 |
| 建议节点 | 5-7 个 |
| 建议事件 | 6-10 个 |

这版资源给得偏宽，目的是让玩家先看到路线选择、事件和神志变化，不在首局前 3 分钟被随机打死。

## 2. C 可直接抄的临时配置

```json
{
  "initialResources": {
    "axle": 90,
    "grain": 95,
    "sanity": 90,
    "max": 100,
    "warning": 25,
    "deathTrigger": 0
  },
  "routeCosts": {
    "low": { "axle": -3, "grain": -3, "sanity": 0 },
    "medium": { "axle": -5, "grain": -4, "sanity": -2 },
    "high": { "axle": -8, "grain": -6, "sanity": -6 }
  },
  "eventWeights": {
    "low": { "risk": 15, "supply": 30, "clue": 20, "item": 10, "sanity": 5, "rest": 20 },
    "medium": { "risk": 28, "supply": 22, "clue": 18, "item": 10, "sanity": 10, "rest": 12 },
    "high": { "risk": 38, "supply": 16, "clue": 14, "item": 10, "sanity": 14, "rest": 8 }
  },
  "badLuck": {
    "initial": 0,
    "forceRescueAt": 60,
    "afterTwoBadEventsForcePositive": true,
    "protectStepsAfterRescue": 2
  }
}
```

## 3. 路线消耗口径

| 路线 | 车轴 | 粮草 | 神志 | 用途 |
|---|---:|---:|---:|---|
| 低风险 | -3 | -3 | 0 | 普通移动、回撤、安全路线 |
| 中风险 | -5 | -4 | -2 | 主要探索路线 |
| 高风险 | -8 | -6 | -6 | 捷径、禁地、奖励路线 |

首版地图硬规则：

1. 起点至少给 1 条低风险和 1 条中风险路线。
2. 任意节点不要只给高风险路线。
3. 连续高风险路线最多 1 次。
4. 结局前最后一个节点至少有 1 条中风险或低风险路线。

## 4. 事件奖惩范围

| 事件类型 | 车轴 | 粮草 | 神志 | 说明 |
|---|---:|---:|---:|---|
| risk | -6 到 0 | -6 到 0 | -8 到 0 | 首版不要大扣 |
| supply | 0 到 +8 | +8 到 +18 | -2 到 +2 | 主要补粮草 |
| clue | -2 到 0 | -2 到 0 | -3 到 0 | 给路线/地图提示 |
| item | -3 到 +6 | -3 到 +6 | -3 到 +2 | 给一次性帮助 |
| sanity | 0 | -2 到 0 | -8 到 -4 | 神志特色事件 |
| rest | 0 到 +4 | -3 到 +4 | +6 到 +12 | 休整和降压 |

首版禁止：

- 单个非主动事件扣任一资源超过 8。
- 连续两个事件都只扣资源不给收益。
- 玩家没有主动选高风险时，一步内把资源从预警线以上打到 0。

## 5. 保底触发条件

首版只做 5 条，够跑就行：

| 触发 | 动作 |
|---|---|
| 任一资源 <= 0 | 不立刻失败，弹出 2 个补救选项 |
| 任一资源 < 15 | 下一事件强制从 supply/rest/clue 中选 |
| 连续 2 个坏事件 | 下一事件必须是 supply/rest/clue |
| badLuck >= 60 | 下一事件必须是正向事件 |
| 所有路线都会导致资源 <= 0 | 自动插入低成本回撤或补给事件 |

坏事件临时定义：

```text
没有 positiveTag，且总资源净损耗 >= 6
```

badLuck 临时增减：

| 情况 | badLuck |
|---|---:|
| 坏事件 | +20 |
| 资源低于 15 | +20 |
| 触发濒死 | +30 |
| supply/rest/clue | -30 |
| 补救成功 | -40 |

## 6. 濒死补救最小版

| 资源归零 | 选项 A | 选项 B |
|---|---|---|
| 车轴 | 修车：车轴 +18，粮草 -5 | 徒步：到相邻安全点，神志 -8 |
| 粮草 | 采集：粮草 +18，车轴 -4 | 求粮：粮草 +22，神志 -6 |
| 神志 | 休整：神志 +18，粮草 -6 | 接受幻路：进入特殊节点，不立即失败 |

首版全局限制：

1. 每局最多触发 2 次濒死补救。
2. 补救后 2 步内不抽高损耗 risk。
3. 第 3 次资源归零可以失败。

## 7. C 线程先接字段

只接这些字段即可：

```text
initialResources.axle
initialResources.grain
initialResources.sanity
routeCosts.low/medium/high
eventWeights.low/medium/high
eventResultRanges
badLuck.forceRescueAt
badLuck.afterTwoBadEventsForcePositive
deathSaveOptions.axle/grain/sanity
```

## 8. 后续再平衡

等 Demo 能玩 3-5 分钟后，再回到 A_BSI-A-002 和 A_BSI-A-003 的完整指标做 1000 局模拟。当前这份文件只为“先跑起来”服务。

