# BSI-UX-039 旅途断绝硬失败闭环验收回执

日期：2026-06-21

责任：主协调 / C 视觉交互

目标：在三资源危机补救已通过后，补齐“补救次数过多 -> 旅途断绝”的硬失败闭环，确认玩家不会卡在结果页或左下角入口，而是能在居中弹窗内看到失败说明并重开。

## 本轮改动

1. 新增内部 QA 参数 `captureFailureStats`：
   - 示例：`captureFailureStats=rescues:3`
   - 用途：配合 `captureLocation` 与 `captureResources` 直接复现多次补救后的硬失败。
   - 不影响普通试玩入口。
2. 将结果页衔接逻辑从“只自动进入危机”扩展为：
   - 结果后进入 `crisis`：自动打开危机补救弹窗。
   - 结果后进入 `stranded`：自动打开 `旅途断绝` 失败弹窗。
   - 结果后进入 `ended`：自动打开结局弹窗。
3. 更新缓存号到 `20260621-c119`。
4. 将 `captureFailureStats` 写入 QA 合同和 README 调试说明。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 自动检查

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check -- app.js qa-check.js README.md index.html`：通过

## 浏览器验收

- 浏览器：Codex in-app browser
- 测试尺寸：`900 x 500`
- 测试服务：`http://127.0.0.1:4182/`
- 测试地址：`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&captureLocation=old_king_road&captureResources=axle:4,grain:22,sanity:18&captureFailureStats=rescues:3&view=town`

测试链路：

1. 直达 `故王道`。
2. 设置资源：车轴 `4`、粮草 `22`、神志 `18`。
3. 设置失败计数：`rescues = 3`。
4. 在 `车辙分叉` 中选择 `沿深辙快行`。
5. 车轴从 `4` 降到 `0`，页面进入 `game-stranded`。
6. 结果页点击 `继续前行`。
7. 自动打开居中 `旅途断绝` 失败弹窗。
8. 点击 `重开一局`，回到 `中原驿`，资源恢复 `80 / 90 / 85`。

验收结果：

- `旅途断绝` 弹窗标题正确。
- 失败说明正确显示：车轴彻底断开，路已经不再向前。
- 弹窗内只有一个主动作：`重开一局`。
- 不需要点击左下角入口。
- 重开后恢复到首站 `中原驿`。
- 控制台无 error / warning。

## 结论

硬失败闭环已通过。现在第一章试玩的资源系统已经覆盖：

- 普通资源消耗。
- 资源触底危机。
- 危机补救。
- 补救过多后的最终失败。
- 失败后的重开。

这条链路已经可以进入后续真人试玩，观察玩家是否能理解“补救不是无限的”。

## 下一步建议

1. 给 `旅途断绝`、三类危机补救补专属方图，避免长期共用地点图。
2. 在 UI 上把 `补救次数 / 厄运` 做成更直观的隐性压力提示，不急着明牌数值。
3. 继续做完整一局路径验收：从中原驿到九州裂隙，覆盖至少一次半途路遇、一次补给、一次危机或结局。
