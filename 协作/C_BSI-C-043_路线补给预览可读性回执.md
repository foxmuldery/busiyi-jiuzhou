# C_BSI-C-043 路线补给预览可读性回执

## 任务目标

让地图路线卡里的“目的地可补什么”更容易被玩家一眼识别，避免它混在路线描述和提示文字里。

## 本轮改动

- 文件：[styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
  - 新增 `.route-supply-preview` 独立样式。
  - 在 3 到 4 条路线一屏显示时，补给预览会自动压缩字号和高度。
- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
  - 将 `.route-supply-preview` 样式纳入 `route preview contract`。

## 当前效果

路线卡现在会把目标补给预览呈现为小型侦察标签：

- 比普通路线说明更醒目。
- 比风险和异象更安静。
- 不增加额外滚动条。
- 仍然支持三到四条路线一屏显示。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/styles.css 协作/不思异九州_任务交接台账.md 协作/C_BSI-C-043_路线补给预览可读性回执.md
```

结果：全部通过。

## 主线程验收意见

通过。此项是 C-042 的可读性补强，服务“玩家在大地图里先判断路线代价和目的地收益，再决定下一站”的核心循环。
