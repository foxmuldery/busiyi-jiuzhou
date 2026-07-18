# C_BSI-C-091 下一轮小横屏 UI 验收与修复建议

> 子线程：C，UI / 技术实现复核  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-20  
> 范围：只读检查 `prototype/index.html`、`styles.css`、`app.js` 后给出下一轮最小修复建议  
> 边界：本轮不改原型代码，不回退他人改动

## 0. 当前复验基线

主线程刚在本地浏览器 900x500 复验通过：

- 开局 -> 地图 -> 青丘路线 -> 九尾灯影 -> 青丘外邑 -> 狐灯绕名链路可走通。
- 音乐 HUD 显示 CORE-006 / 青丘外邑。
- console 无 error / warn。
- 截图接口超时，但 DOM 与交互链路通过。

本轮只做静态代码复核与下一步建议，不覆盖主线程当前验收状态。

## 1. 当前小横屏 UI 风险

### 1.1 界面繁冗

小横屏下行动区已经做了压缩，但同一屏仍同时承担：

- 地点志入口
- 当前遭遇入口
- 行动过程条
- 补给列表
- 选择入口
- 地图 / 旅途切换
- 音、曲、囊、辞、志、设六个辅助入口

核心问题不是单个模块坏，而是首屏可点目标太多。900x500 下玩家第一眼容易不知道“现在该点遭遇、补给、地图、音频还是抽屉”。

### 1.2 抽屉 / 左下角区域

当前抽屉从右侧滑出，HUD 右侧常驻六个入口。左下角在当前 CSS 中主要是舞台车队 / 前景视觉区域，真正的繁冗压力来自 HUD 右侧与行动面板底部，而不是左下角某个单点按钮。

风险点：

- `musicNowChip` 有 `data-drawer-target="settings"`，但目前只有 `.drawer-button` 集合绑定抽屉点击，音乐芯片可能只显示状态，不能直接打开设置抽屉。
- 设置抽屉内音乐试听区信息较重：候选按钮、状态、详情同时出现，关闭抽屉后试听覆盖仍可能保留。
- Escape / 遮罩关闭抽屉已有，但音频试听状态不会随关闭抽屉自动恢复。

### 1.3 弹窗触屏继续

当前结果弹窗支持点击面板空白关闭，并显示“轻点继续”。这对鼠标可用，但触屏上有两个问题：

- “轻点继续”只是提示，不是明确按钮。
- 选择弹窗与结果弹窗共用同一容器，若触屏习惯点空白，容易误以为选择弹窗也能继续，实际应点选项。

### 1.4 选择项一屏显示

当前选择弹窗 3-4 项会用两列，一般能压进一屏；小横屏行动区则只显示一个“处理遭遇”入口，选择在弹窗里完成。方向是对的。

风险点：

- 结果弹窗文本 `line-height` 偏大，遇到较长结果时可用高度紧。
- 选择卡片里资源 chip + hint 同时出现，4 项时仍可能产生拥挤。
- 当前 `choice budget <= 4` 是 QA 硬约束，应继续保留，不要为某个事件扩到 5 项。

### 1.5 音频抽屉容易残留

`audioPreviewKey` 目前只有点“跟随旅途”才会清空。用户如果打开设置抽屉试听后直接关闭抽屉、切地图、继续玩，仍可能停留在试听覆盖状态。这个残留会让 HUD 显示与地点音乐逻辑不一致，属于小但很容易被感知的瑕疵。

## 2. 下一轮最小修复建议

### P0：音频试听关闭抽屉自动恢复

目标：设置抽屉可以试听，但关闭设置抽屉或切到其他抽屉后，自动回到“跟随旅途”。

建议 JS 口径：

```js
function clearAudioPreviewIfLeavingSettings(nextDrawer) {
  if (activeDrawer === "settings" && nextDrawer !== "settings" && audioPreviewKey) {
    audioPreviewKey = "";
    updateAudioLayers();
  }
}
```

在 `setActiveDrawer(drawer)` 计算出 `nextDrawer` 后、写入 `activeDrawer` 前调用：

```js
clearAudioPreviewIfLeavingSettings(nextDrawer);
```

验收：

- 打开设置 -> 点任意音乐候选 -> HUD 显示试听。
- 关闭抽屉后，`window.BSI_PROTOTYPE.getAudioState().previewMusicKey === ""`。
- 当前地点仍回到 `CORE-006 / 青丘外邑` 或对应地点音乐。

### P0：让音乐芯片真的打开设置抽屉

目标：HUD 的“曲 / CORE-006”既是状态，也能作为音乐设置入口。

建议 JS 口径：

```js
el.musicNowChip?.addEventListener("click", () => toggleDrawer("settings"));
```

或把抽屉绑定从 `.drawer-button` 扩展到所有 `[data-drawer-target]`，但要避免重复绑定已有按钮。

验收：

- 900x500 下点击音乐芯片，设置抽屉打开。
- 再点音乐芯片或关闭按钮，抽屉关闭。
- 不影响音频 HUD 的播放 / 静音按钮。

### P1：结果弹窗增加明确触屏继续按钮

目标：结果弹窗有明确“继续”按钮；选择弹窗仍只能点选项。

建议 HTML / JS 口径：

- 复用现有 `#storyModalContinue`，但在 result-modal 时让它成为按钮更清楚。
- 最小代码可先不改 HTML 结构，只把结果态的提示样式做成按钮，并在 JS 中只允许 result-modal 的提示点击关闭。

建议 JS：

```js
el.storyModalContinue?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (!storyResultOverride) return;
  closeStoryModal();
});
```

建议 CSS：

```css
.story-modal.result-modal .story-modal-continue {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(217, 170, 91, 0.42);
  border-radius: 999px;
  padding: 6px 14px;
  background: rgba(217, 170, 91, 0.12);
}
```

验收：

- 处理九尾灯影后，结果弹窗底部出现可点“轻点继续”。
- 点结果弹窗空白仍可关闭。
- 选择弹窗没有“继续”按钮，必须点选择项。

### P1：HUD 辅助入口降噪

目标：小横屏下减少“六个辅助入口同时抢注意力”的感觉。

建议最小 CSS 口径，不动信息架构：

- 900x500 / `max-height: 520px` 下隐藏 `poetryDrawerButton`，保留日志和设置；古辞入口可先放入日志 / 设置后续再整合。
- 或保留按钮但降低透明度，不与“地图 / 旅途 / 下一步”抢主视觉。

建议先用隐藏方案：

```css
@media (max-height: 520px) and (orientation: landscape) {
  #poetryDrawerButton {
    display: none;
  }
}
```

验收：

- 900x500 下 HUD 辅助入口从 6 个降到 5 个，音乐芯片仍可打开设置。
- 不影响桌面大视口。
- 不影响 URL `drawer=poetry` 深链打开古辞抽屉。

### P2：行动区进一步减重

目标：行动面板只保留“下一步相关信息”，把次要说明后置到弹窗 / 抽屉。

建议：

- 小横屏下隐藏 `actionProcessDetail`，只保留 kicker + title。
- 小横屏下地点志 / 当前遭遇两个小入口只显示标题和“详”按钮，不再显示“详情”伪标签。
- 保持 `choice-list` 只出现一个“处理遭遇 / 处理路遇”主入口，不回退到直接铺满所有选择。

验收：

- 900x500 下行动区不出现三行以上说明文字。
- 当前可操作目标只有一个主按钮最醒目：遭遇 / 补给 / 地图 / 路遇之一。

## 3. 不建议本轮做的事

- 不建议重排整套 HUD 或改成新导航；当前链路刚通过，先做小收敛。
- 不建议把所有选择直接铺回行动区；弹窗承载选择是当前一屏显示的关键。
- 不建议删除抽屉功能；只处理入口密度和试听残留。
- 不建议继续增加按钮文字说明；小横屏要靠状态、图标和下一步提示来降噪。

## 4. 下一轮建议验收口令

```text
1. 900x500 开局，首屏是否只突出一个下一步目标？
2. 点击 CORE-006 / 当前音乐芯片，是否打开设置抽屉？
3. 设置抽屉试听音乐后关闭，是否自动回到跟随旅途？
4. 处理九尾灯影结果弹窗，触屏是否有明确继续按钮？
5. 选择弹窗 2/3/4 项是否一屏显示，且没有误导性的继续按钮？
6. 关闭抽屉、切地图、处理路遇后 console 是否仍无 error / warn？
```

## 5. 建议执行顺序

1. 先做 P0 音频试听残留与音乐芯片入口。
2. 再做 P1 结果弹窗继续按钮。
3. 最后做 P1/P2 小横屏降噪 CSS。
4. 每一步都只跑 900x500 链路复验，不扩大到全 UI 重构。

