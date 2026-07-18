# C_BSI-C-032 显影与路线池引用 QA 回执

## 任务目标

把羊皮纸地图、迷雾显影和路线抽卡相关的数据引用纳入命令行 QA，避免后续扩地点、扩路线时出现“界面可打开，但某条路线/远影引用不存在”的隐性错误。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectRevealReferenceProblems()`：
  - 检查每个地点是否有 `revealPlan`。
  - 检查 `revealPlan.routes` 引用的路线是否存在。
  - 检查 `revealPlan.routes` 是否均为当前地点出发的路线。
  - 检查 `fogLocations` / `fogRoutes` 引用是否真实存在。
- 新增 `collectRoutePoolReferenceProblems()`：
  - 检查 `routePools` 是否引用真实地点。
  - 检查 `requiredRoutes` / `optionalRoutes` 是否存在且从当前地点出发。
  - 检查非终点地点是否至少有一条保底路线。
  - 检查 `optionalCount` 不超过可选路线数量。
  - 检查 `fogPool` 里的地点/路线引用是否真实存在。
- 新增 QA 项：
  - `reveal plan references valid`
  - `route pool references valid`

## 当前验证结果

通过。

当前 `revealPlan`、`routePools` 没有发现悬空地点、悬空路线或非本地点出发的路线引用。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/C_BSI-C-031_资源可通关QA补强回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 已把“迷雾显影”和“路线抽卡”的数据引用纳入常规验收。后续 B 线程扩地点、A 线程改路线池、C 线程改显影规则时，都应先跑该脚本。

下一步建议继续补“资源字段合法性”检查，防止把 `axle/grain/sanity` 写错后静默失效。
