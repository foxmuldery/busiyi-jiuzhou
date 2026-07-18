# C_BSI-C-033 资源字段合法性 QA 回执

## 任务目标

把资源变化字段纳入命令行 QA，防止后续新增路线、补给、事件选项时把 `axle/grain/sanity` 等字段写错，导致游戏看似正常但数值变化静默失效。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `validateDeltaObject()`：
  - 允许字段：`axle`、`grain`、`sanity`、`badLuck`、`flag`、`ending`、`language`。
  - 三资源与 `badLuck` 必须是数字。
  - `flag` 必须是字符串。
  - `ending` 必须引用已定义结局。
  - `language` 必须是对象，且语言键必须存在于初始语言表。
- 新增 `collectDeltaProblems()`：
  - 检查所有路线 `cost`。
  - 检查所有地点补给 `effect`。
  - 检查所有地点事件、固定路遇、随机路遇、危机事件的选项 `effect`。
- 新增 QA 项：
  - `resource delta fields valid`

## 当前验证结果

通过。

当前所有路线成本、补给效果、事件选项效果均未发现未知字段、未知语言或未知结局引用。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/C_BSI-C-032_显影与路线池引用QA回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。至此，当前 QA 脚本已经覆盖四类关键风险：

- 地图结构可达。
- 路线成本可通关。
- 迷雾显影与路线池引用有效。
- 资源变化字段合法。

下一步可继续补“舞台素材引用与车队图层边界”或回到 UI 试玩检查。
