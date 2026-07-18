# BSI-UX-034 横屏事件弹窗信息层级回执

日期：2026-06-21  
责任：主协调 / C 视觉交互  
目标：继续优化事件弹窗，让诗词、提示、选项、状态更像横屏手游 UI，而不是网页长文块。

## 本轮改动

1. 小横屏事件弹窗改为更清晰的信息层级：
   - 左上：事件来源与标题。
   - 右上：地点 / 路遇 / 神志状态胶囊。
   - 左侧：事件图。
   - 左下：诗词题记。
   - 右侧：玩家可读事件正文。
   - 底部：一次性显示全部选项。
2. 诗词从头部右侧挪到事件图下方，变成“题记/图注”，减少头部拥挤。
3. 正文区域按内容靠上显示，并限制最大高度，避免短文本撑成大空框。
4. 状态信息改成 `inline-flex` 胶囊标签，减少纯文字感。
5. 继续保持全部选项一屏显示，不引入滚动条。
6. 更新缓存号到 `20260621-c114`。
7. 将新的横屏弹窗层级写入 QA 合约。

## 修改文件

- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

## 验收结果

自动检查：

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check`：通过

浏览器横屏验收：

- 测试尺寸：`900 x 500`
- 预览地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=modal-hierarchy-c114-1782018133832`
- 触发事件：`中原驿 -> 故王道` 半途路遇 `当康啼垄`
- 弹窗状态：`nextAction = route-event`
- 弹窗尺寸：约 `820 x 254px`
- 弹窗无内部滚动：`panelScrollHeight = panelClientHeight = 252`
- 状态胶囊：`display = flex`
- 正文：`alignSelf = start`，`maxHeight = 112px`
- 选项数：3
- 选项布局：3 列一行完整显示
- 控制台无 error / warning

## 结论

本轮达成“事件弹窗更像横屏手游信息卡”的最小可验证目标。弹窗现在把来源、题名、状态、图片、诗词、正文和选项分层显示，玩家可以更快理解事件，也更容易判断选择代价。

## 下一步建议

1. 继续处理结果弹窗：选择后的资源变化、文本反馈和“轻点继续”可以进一步做成更明确的浮动反馈。
2. 检查 4 选项事件在 `900 x 500` 下是否仍保持一屏完整显示。
3. 让 D 线程以本版弹窗结构为基准，继续统一事件图、状态图标和选项按钮视觉。
