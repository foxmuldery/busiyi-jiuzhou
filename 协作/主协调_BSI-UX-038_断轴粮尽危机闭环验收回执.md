# BSI-UX-038 断轴粮尽危机闭环验收回执

日期：2026-06-21

责任：主协调 / C 视觉交互

目标：在 `神志崩线` 已通过后，补齐 `断轴` 与 `粮尽` 两类资源触底危机的真实浏览器闭环，确认三资源危机都能自动衔接、补救并回到可继续游玩状态。

## 本轮改动

1. 新增内部 QA 参数 `captureResources`：
   - 示例：`captureResources=axle:4,grain:22,sanity:18`
   - 用途：配合 `captureLocation` 直达指定地点并设置三资源，用真实事件选项触发对应危机。
   - 不影响普通试玩入口。
2. 更新缓存号到 `20260621-c118`。
3. 将 `captureResources` 写入 QA 合同和 README 调试说明。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 自动检查

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check -- app.js qa-check.js index.html`：通过

## 浏览器验收 A：断轴

- 测试尺寸：`900 x 500`
- 测试地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&captureLocation=old_king_road&captureResources=axle:4,grain:22,sanity:18&view=town&verify=axle-c118-1782020132592`
- 测试链路：直达 `故王道` -> `车辙分叉` -> 选择 `沿深辙快行` -> 车轴归零 -> 结果页 `继续前行` -> 自动打开 `断轴边缘`。

断轴危机弹窗：

- 弹窗标题：`断轴边缘`
- 选项数量：`2`
- 选项列表：`拆旧车具补轴 / 弃重慢行`
- 弹窗尺寸：`820 x 258`，`scrollHeight = clientHeight = 256`
- 两个补救选项全部可见，无拖动条。
- 控制台无 error / warning。

断轴补救结果：

- 点击选项：`弃重慢行`
- 结果反馈：`变 本次变化 得失已记 轴+12 志-5`
- 车轴从 `0` 回到 `12`
- 点击 `继续前行` 后弹窗关闭，页面回到 `车辙分叉 · 已处理`
- 下一步状态：`supply`

## 浏览器验收 B：粮尽

- 测试尺寸：`900 x 500`
- 测试地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&captureLocation=feather_folk_ford&captureResources=axle:18,grain:6,sanity:18&view=town&verify=grain-c118-1782020200255`
- 测试链路：直达 `羽民渡` -> `羽民记名` -> 选择 `以粮换羽舟` -> 粮草归零 -> 结果页 `继续前行` -> 自动打开 `粮袋见底`。

粮尽危机弹窗：

- 弹窗标题：`粮袋见底`
- 选项数量：`2`
- 选项列表：`宰牲分粮 / 向梦里求粮`
- 弹窗尺寸：`820 x 258`，`scrollHeight = clientHeight = 256`
- 两个补救选项全部可见，无拖动条。
- 控制台无 error / warning。

粮尽补救结果：

- 点击选项：`向梦里求粮`
- 结果反馈：`变 本次变化 得失已记 粮+14 志-9`
- 粮草从 `0` 回到 `14`
- 点击 `继续前行` 后弹窗关闭，页面回到 `羽民记名 · 已处理`
- 下一步状态：`supply`

## 结论

三资源危机闭环已全部通过：

- `车轴`：断轴边缘 -> 补救 -> 回到可继续。
- `粮草`：粮袋见底 -> 补救 -> 回到可继续。
- `神志`：神志崩线 -> 补救 -> 回到可继续。

这意味着第一章试玩版的核心资源死亡线已经不是死局，而是可解释、可选择、可继续的濒死补救机制。

## 下一步建议

1. 继续检查“补救次数过多 -> 旅途断绝”硬失败是否在小横屏下同样清晰。
2. 将三类危机的专属危机图列入下一批 D 线程图像生成需求。
3. 在真人试玩时重点观察玩家是否理解“补救次数有限”和“坏运累积”的含义。
