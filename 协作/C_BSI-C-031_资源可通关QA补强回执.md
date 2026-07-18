# C_BSI-C-031 资源可通关 QA 补强回执

## 任务目标

在现有路线结构 QA 基础上，增加一条更接近玩法平衡的自动检查：不只确认 `central_post` 能到达 `kyushu_rift`，还要确认仅按路线消耗前进时，至少存在一条不会让车轴、粮草、神志归零的通关路径。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `findRouteOnlySurvivablePath()`：
  - 从 `initialStateTemplate.resources` 读取初始三资源。
  - 遍历路线图，枚举不重复地点的路线路径。
  - 按每条路线的 `cost` 逐步扣除资源。
  - 过滤掉任何资源小于等于 0 的路径。
  - 选择资源底线更高、剩余总量更稳的一条路径作为 QA 参考路径。
- 新增 QA 项：
  - `route-only survivable path exists`
  - 输出参考路径、抵达剩余资源、沿途最低资源。

## 当前验证结果

通过。

当前可通关路线：

```text
central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift
```

抵达后剩余：

```json
{"axle":56,"grain":64,"sanity":57}
```

沿途最低：

```json
{"axle":56,"grain":64,"sanity":57}
```

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js
```

结果：全部通过。

## 主线程验收意见

通过。此检查只覆盖“路线成本底线”，不替代完整随机事件模拟；但它已经能防止最基础的数值事故：地图路线上看似可达，实际上按固定路线成本会直接死局。

下一步建议继续补两类轻量 QA：

1. 检查 `routePool` / `revealPlan` 中引用的路线和地点都真实存在。
2. 检查所有资源变化字段只使用合法键名，避免写错 `axle/grain/sanity` 后悄悄失效。
