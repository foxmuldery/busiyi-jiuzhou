# C_BSI-C-085 小横屏选择项芯片溢出修复回执

日期：2026-06-19  
执行线程：C / 技术原型  
关联问题：横屏手机界面中，主选择项必须一次性显示完，不能让资源芯片或说明文字掉出屏幕。

## 目标

在 932x430 横屏手机尺寸下复验“旅途页”和“九州图”核心交互，修复选择项内部资源芯片被通用 `span` 样式撑开的底部溢出问题。

## 已完成

1. 修复 `styles.css` 中选择项资源芯片的优先级：
   - `choice-card` 内的 `resource-delta-row` 固定为 flex。
   - `choice-card` 内的 `resource-delta-chip` 固定为 inline-flex。
   - `resource-delta-value` 不再被通用 `span` 样式撑成整行。
2. 小横屏下把选择项压缩为手游式操作条：
   - 保留动作名和资源变化。
   - 隐藏重复的 `choice-hint` 视觉文本，避免按钮高度爆开。
   - 选择项仍保留完整按钮语义和资源芯片。
3. 更新 `index.html` 的 CSS 版本参数到 `20260619-c085`，避免浏览器继续使用旧样式。
4. 更新 `qa-check.js`，把选择项资源芯片和小横屏无滚动策略纳入合约检查。

## 浏览器复验

使用 in-app browser，视口设置为 932x430，入口：

```text
http://127.0.0.1:4180/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1
```

复验结果：

- 初始旅途页：2 个补给按钮 + 2 个事件选择按钮均在屏内。
- 修复前：第二个选择项资源芯片和提示文字底部溢出到 430px 视口外。
- 修复后：溢出列表为空，`choiceList` 的 `scrollHeight` 等于 `clientHeight`。
- 点击“整点车具”后：旧选项消失，资源从 80/90/85 变为 88/87/85，并进入“补给一次”指引。
- 点击补给后进入九州图：2 条路线一屏显示，无滚动、无溢出。
- 点击路线后进入半途路遇“当康啼垄”：3 个路遇选择一屏显示，无溢出。
- 页面控制台无应用级 error/warn。

## 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 后续建议

后续若继续增加选择项文字，应优先把长解释放到弹窗或详情层，主按钮只保留动作名、资源变化和关键风险标签，维持横屏手游界面的干净度。
