# C_BSI-C-027 音乐入口可见化回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-17  
> 范围：只解决“音乐已导入但玩家看不到入口”的最小问题；不更换音频、不调整授权状态、不改数值。

## 本轮最小改动

### 1. 顶部 HUD 增加音乐入口

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`

落地内容：

- 顶部辅助入口新增一字圆钮 `音`。
- 默认状态为 `播放音乐`，启用后通过 `aria-pressed="true"` 与高亮样式显示。
- 原设置抽屉里的“播放音乐 / 关闭音乐”按钮保留，避免失去详细说明入口。

### 2. 复用原音乐开关逻辑

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`

落地内容：

- 新增 `audioHudButton` DOM 引用。
- 抽出 `toggleAudio()`，顶部 `音` 按钮和设置抽屉音乐按钮共用同一套逻辑。
- `renderAudioStatus()` 同步更新顶部按钮的 `active`、`aria-pressed`、`aria-label`、`title`。

## 已完成自检

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/index.html
```

静态契约检查：

```text
PASS hud audio button
PASS shared audio toggle
PASS hud audio state
PASS hud audio css
PASS debug ui state
PASS compact clip
```

音频文件引用检查：

```text
audio mp3 refs: 14
missing: 0
```

## 未完成

- 浏览器插件仍被本机 Codex 环境变量问题阻断，本轮未能实际点击 `音` 按钮试听。
- 音乐素材仍保持 `review-pending / demo-temporary` 状态，不标为正式可商用。

## 主线程下一步建议

下一步最小可验证项：在浏览器恢复后点击顶部 `音`，确认按钮高亮、设置抽屉文字同步变成“关闭音乐”，并检查控制台无音频加载错误。
