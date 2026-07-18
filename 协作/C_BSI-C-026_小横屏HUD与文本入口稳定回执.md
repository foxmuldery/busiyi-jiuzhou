# C_BSI-C-026 小横屏 HUD 与文本入口稳定回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-17  
> 范围：只处理上一轮验收暴露的小横屏信息拥挤问题；不改玩法规则、不新增素材、不改事件数值。

## 本轮最小改动

### 1. HUD 辅助入口压缩

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`

落地内容：

- 顶部 `行囊 / 古辞 / 日志 / 设置` 从文字按钮压成圆形一字按钮：`囊 / 辞 / 志 / 设`。
- 保留 `aria-label` 和 `title`，因此视觉更简洁，但仍能让玩家知道按钮用途。
- 小横屏下按钮固定为 `30px` 宽，减少挤占旅程进度区域。

### 2. 地点志 / 遭遇入口更明确

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`

落地内容：

- 左下角地点志和当前遭遇的按钮文案统一为 `详`，并通过标题说明为“地点志详情 / 遭遇详情”。
- 保持弹窗阅读逻辑，不再试图在左下角原位展开大段文字。
- 对地点志、遭遇卡、行旅反馈条增加固定裁剪，避免小横屏出现内部滚动条或文字撑高。

### 3. 缓存版本

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`

落地内容：

- `styles.css / data.js / app.js` 查询版本更新到 `20260616-c026`，降低浏览器继续读旧样式的概率。

## 已完成自检

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/index.html
```

静态验收确认：

- 四个辅助入口已具备一字显示、`aria-label`、`title`。
- 小横屏样式已覆盖 `.location-lore`、`.event-copy-card`、`.action-process` 的 `overflow: clip` 与 `contain: paint`。
- `844x390` 专用规则下，地点志/遭遇的“详情”提示被进一步压缩，行旅反馈条固定为 `22px`。

## 2026-06-17 补充：交互契约验收

浏览器插件仍被本机 Codex 环境变量问题阻断，因此本轮先完成可重复的静态交互契约检查。

新增调试入口：

- `window.BSI_PROTOTYPE.getUiState()`
- `window.BSI_PROTOTYPE.openTextPanel(panel)`
- `window.BSI_PROTOTYPE.closeTextPanels()`
- `window.BSI_PROTOTYPE.openDrawer(drawer)`
- `window.BSI_PROTOTYPE.closeDrawer()`

这些入口只用于验收，不改变玩家界面。

已通过断言：

```text
PASS inventory button
PASS location detail button
PASS event detail button
PASS modal close buttons
PASS modal visible state
PASS modal css visible
PASS drawer click binding
PASS drawer open state
PASS drawer close state
PASS drawer css visible
PASS compact clip
PASS debug ui state
```

预览服务确认：

```text
127.0.0.1:4178 正在监听
```

## 未完成

- 本轮浏览器插件因本机 Codex 环境变量异常连续退出，未能产出新的截图证据。
- 需要主线程在浏览器工具恢复后补一轮真实点击复测：打开详情弹窗、行囊抽屉、地图路线卡；可直接用新增调试入口读回状态。

## 主线程下一步建议

下一步只做一个最小可验证项：复测 `844x390` 横屏下“地点志详情弹窗”和“行囊抽屉”是否能稳定打开和关闭。通过后再进入下一轮内容或音频优化。
