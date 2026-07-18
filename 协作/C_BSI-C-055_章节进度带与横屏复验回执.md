# C_BSI-C-055 章节进度带与横屏复验回执

日期：2026-06-18
子线程：C 技术原型与工具链
任务类型：UI 完成度补强 / 旅程进度可读性

## 1. 目标

让玩家在旅途页也能一眼知道整局还剩多远。原来只有 `西行 1 / 6` 和 `距裂隙 5 段` 的文字，本轮增加点状章节进度带，用更像手游 HUD 的方式展示已走、当前、雾中和终点。

## 2. 已完成改动

- `index.html` 新增 `journeyStepTrack` 章节进度容器。
- `app.js` 新增：
  - `getJourneyStepItems()`：按地图 step 生成 6 段旅程节点。
  - `renderJourneyStepTrack()`：渲染已走、当前、半途将至、雾中、终点状态。
  - 调试接口 `window.BSI_PROTOTYPE.getJourneyStepItems()`。
- `styles.css` 新增点状进度带样式：
  - 桌面显示短地点名。
  - 844x390 小横屏隐藏地点名，只保留进度点，避免 HUD 变高。
- `qa-check.js` 新增 `journey step track contract`，防止后续误删进度带。

## 3. 验证结果

命令检查已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js
```

新增 QA：

- `journey step track contract` 通过。

浏览器复验：

- 内置浏览器默认窗口：页面可打开，进度带存在，控制台错误/警告为 `0`。
- Playwright 844x390：
  - `trackCount=6`
  - `currentCount=1`
  - `stepNameDisplay=none`
  - `overflow.x=false`
  - `overflow.y=false`
  - 截图：[busiyi-c055-progress-844x390.png](/Users/yuanzhe/Documents/game/output/playwright/busiyi-c055-progress-844x390.png)
- Playwright 1365x768：
  - `trackCount=6`
  - 终点状态可显示 `is-end`
  - `stepNameDisplay=block`
  - `overflow.x=false`
  - `overflow.y=false`
  - 截图：[busiyi-c055-progress-1365x768.png](/Users/yuanzhe/Documents/game/output/playwright/busiyi-c055-progress-1365x768.png)

## 4. 边界

- 本轮只增强旅途进度可读性，没有改变路线随机、资源数值或结局逻辑。
- 章节标签仍是内部试玩版短名，后续可由 D/B 线程一起精修命名。
- 内置浏览器的临时 844x390 视口未生效，因此小横屏尺寸用 Playwright 补证据。

## 5. 主线程验收结论

通过。玩家现在能在 HUD 中看到“整局 6 段进度”的可视化提示，小横屏不增加文字负担，桌面保留短地点名。这个改动直接回应“整体进度中怎么看”的体验问题。
