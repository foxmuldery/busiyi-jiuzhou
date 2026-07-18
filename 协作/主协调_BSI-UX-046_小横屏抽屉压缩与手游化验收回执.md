# BSI-UX-046 小横屏抽屉压缩与手游化验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已让音乐候选和试听状态可见。本轮继续处理“网页感偏重、文字区域过多”的问题，优先压缩小横屏下最容易显得工程化的 `行囊` 与 `设置` 抽屉，让 960×540 的横屏试玩界面不再依赖抽屉滚动查看关键信息。

## 已完成

1. 横屏紧凑断点从 `max-height: 520px` 扩展到 `max-height: 560px`，覆盖 960×540 这类 16:9 测试窗口。
2. `行囊` 抽屉优化：
   - 语言从长句改为 2 个小徽章：`羽民 / 巫辞`。
   - 困厄从长句改为 6 个小徽章：`厄运 / 求生 / 败局 / 断轴 / 饥荒 / 失神`。
   - 九宫格高度、字号、间距在小横屏下压缩。
3. `设置` 抽屉优化：
   - 音频详情从长说明压缩为两行摘要。
   - 音乐候选卡、音频体检条、播放按钮在小横屏下压缩高度。
   - 动态开关改为更像手游设置项的胶囊行。
   - 小横屏下隐藏底部视频说明，避免把动态开关挤出第一屏。
4. 逻辑断点 `isCompactLandscape()` 与 CSS 断点统一为 `560px`，避免视觉和脚本判断不一致。
5. 页面缓存版本更新至 `styles.css?v=20260621-c127`、`app.js?v=20260621-c127`，试玩入口构建号更新至 `20260621-c127`。
6. QA 增加抽屉徽章化与 560px 横屏断点合同。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

浏览器验收：

- 视口：`960 x 540`。
- `行囊` 入口：`index.html?fresh=1&drawer=inventory&verify=ux046-c127-inventory`。
  - 九宫格、语言、困厄全部一屏可见。
  - 语言徽章数：2。
  - 困厄徽章数：6。
  - 抽屉不需要滚动，页面无横向 / 纵向溢出。
- `设置` 入口：`index.html?fresh=1&drawer=settings&verify=ux046-c127-settings`。
  - 音频体检、候选音乐、音频摘要、动态开关全部一屏可见。
  - 音乐候选数：6。
  - 抽屉不需要滚动，页面无横向 / 纵向溢出。
  - 点击动态开关可正常切换，已恢复为开启。
  - 点击 `musicWater` 后音乐芯片显示 `CORE-003 / 试听`；浏览器未放行音频时显示 `待授权`。
  - 控制台无 error / warn。

## 后续建议

1. 下一步可继续处理 `日志 / 图鉴` 抽屉，把它从长列表改成更手游化的“图鉴页签 + 复盘卡片”。
2. 后续可把 `关闭` 按钮改为更明确的图标按钮，并统一所有抽屉顶部控件尺寸。
