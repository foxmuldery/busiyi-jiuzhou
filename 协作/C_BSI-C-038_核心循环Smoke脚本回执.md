# C_BSI-C-038 核心循环 Smoke 脚本回执

## 任务目标

新增一条不依赖浏览器的核心循环 smoke 检查，用来验证第一段玩家旅程的数据链路是否能跑通。

## 本轮改动

- 新增文件：[journey-smoke-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js)
- 更新文件：[README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 当前检查内容

脚本会模拟：

1. 读取 `data.js`。
2. 确认起点地点存在。
3. 确认起点事件存在且至少有一个选择。
4. 执行第一个起点选择，并检查资源未归零。
5. 选择起点第一条可见路线。
6. 应用路线消耗，并检查资源未归零。
7. 如果路线有半途路遇，执行第一个路遇选择，并检查资源未归零。
8. 抵达下一地点。
9. 确认目的地、目的地事件和补给数据可读。

## 当前验证结果

通过。

当前 smoke 路线：

```text
central_to_road -> old_king_road
```

当前 smoke 后资源：

```json
{"axle":82,"grain":91,"sanity":85}
```

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js GitHub资产区/03_WebDemo/prototype/README.md GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/C_BSI-C-037_小横屏核心入口QA回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。`qa-check.js` 负责结构和契约，`journey-smoke-check.js` 负责最短核心循环。后续每次新增地点、路线、事件、补给或半途路遇，都应同时跑这两个脚本。

下一步建议把 smoke 从“第一段路”扩展为“可抵达裂隙的完整路径”，但仍保持数据级脚本，不急着引入重型测试框架。
