# 主协调回执：BSI-UX-064 小横屏地图路线卡优化

日期：2026-06-24

## 本轮目标

把 Web Demo 在 960x540 横屏试玩时的路线选择页继续往手机游戏方向压缩：地图保持风景与战略感，路线选择更清楚，事件弹窗打开时底部旧操作区不抢注意力。

## 已完成

1. 地图页右侧路线面板从旧的窄双列改为更宽的浮层。
2. 当只有两条路线时，路线卡改为竖排宽卡，避免 150px 小卡挤字。
3. 弹窗打开时，底部行动区自动压暗并禁止误触，让玩家注意力回到事件弹窗。
4. 结果页“轻点继续”弱化为触屏提示，不再像桌面按钮。
5. 更新 `index.html` 与试玩入口构建号，避免浏览器继续读旧 CSS/状态脚本。
6. 同步 `qa-check.js` 的 UI 契约，守住新的路线卡宽卡设计。

## 浏览器复验

测试视口：960x540 横屏。

已验证：

- 首屏事件弹窗可在一屏内完成选择。
- 点击弹窗空白区域可以继续/关闭。
- 弹窗打开时底部行动区被压暗。
- 补给后可进入九州图。
- 九州图路线面板宽度约 390px。
- 两条路线卡单列竖排，每张约 378px 宽。
- 点一次路线进入预览，再点一次正式启程。
- 启程后回到旅途画面，路线状态进入 traveling。
- 控制台无 error / warn。

## 自动验收

已通过：

```bash
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

## 涉及文件

- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/playtest-flow-status.md`

## 下一步建议

BSI-UX-065：继续做“前 5 分钟真实试玩节奏”复验，重点看路线启程后的半途行进提示、路遇弹窗出现时机、以及玩家是否能自然理解“补给一次再选路”的节奏。
