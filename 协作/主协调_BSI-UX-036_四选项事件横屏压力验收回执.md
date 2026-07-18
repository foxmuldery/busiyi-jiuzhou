# BSI-UX-036 四选项事件横屏压力验收回执

日期：2026-06-21

责任：主协调 / C 视觉交互

目标：验证当前最拥挤的地点事件 `赤水岸骨` 在小横屏下是否能一次性显示全部选项，并保证结果页不卡住。

## 本轮改动

1. 新增测试捕获参数 `captureLocation`：
   - 示例：`?fresh=1&pressure=low&captureLocation=red_marsh`
   - 用途：直达指定地点，便于反复验收高压界面。
   - 不影响正常游玩路径。
2. `captureLocation` 会清理当前地点事件结果和路遇结果，确保测试时能看到未处理事件。
3. 更新缓存号到 `20260621-c116`。
4. 将四选项横屏布局和直达地点测试入口写入 QA 合约。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

## 自动检查

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check -- app.js qa-check.js index.html`：通过
- `git diff --check`：未作为本轮通过项；被既有文档 [D_BSI-D-002_视频动态资产使用边界.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-002_视频动态资产使用边界.md) 的行尾空格挡住，和本轮修改文件无关。

## 浏览器验收

- 测试尺寸：`900 x 500`
- 测试地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&pressure=low&captureLocation=red_marsh&view=town&verify=four-choice-c116-1782019285283`
- 直达地点：`赤水外滩`
- 事件标题：`赤水岸骨`
- 神志状态：`18`，事件弹窗进入 `mad` 文本态。
- 选项数量：`4`
- 选项列表：`掩骨祭拜 / 沿骨行路 / 凝视赤水辨路 / 夜里下水`
- 四个选项均在同一行完整显示，无拖动条。
- 弹窗尺寸：`820 x 258`，`scrollHeight = clientHeight = 256`。
- 控制台无 error / warning。

结果页复验：

- 点击选项：`凝视赤水辨路`
- 结果反馈：`损 本次变化 代价已付 志-28`
- 结果语气：`loss`
- 继续按钮：`继续前行`
- 结果页无溢出，点击继续后关闭结果弹窗，并进入下一步 `神志崩线` 危机处理状态。

## 结论

本轮通过“四选项最拥挤事件”的小横屏压力验收。当前事件弹窗可以支撑第一章最多四个选择同时出现，结果页也能继续沿用简洁反馈条，不会把玩家卡在弹窗内。

## 下一步建议

1. 继续做危机处理弹窗的一屏验收，尤其是 `神志崩线` 的危机选项是否足够清楚。
2. 针对 `captureLocation` 补充几个常用 QA 地址，后续测试能快速跳到指定城镇、禁地或终点。
3. 开始推进下一批事件图/方图替换，让事件弹窗的图像更像独立遭遇插图，而不是横向背景裁切。
