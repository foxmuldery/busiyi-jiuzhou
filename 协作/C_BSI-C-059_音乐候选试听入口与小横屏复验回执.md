# C_BSI-C-059 音乐候选试听入口与小横屏复验回执

## 目标

把音乐主观试听从“必须走到不同地点才能听到”改成“设置面板里可以直接切换试听候选”，方便快速判断哪些音乐适合保留、降音量或替换。

## 本轮改动

- 更新 [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)。
  - 在设置面板音乐区新增 `audioReviewList`。
  - 试听候选放在详细说明上方，小横屏优先显示可点击按钮。
- 更新 [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)。
  - 新增 `audioPreviewKey`。
  - 新增 `renderAudioReviewList()`，列出“跟随旅途”和 5 首音乐候选。
  - 新增 `setAudioPreview()`，点击候选后自动启用音频并临时覆盖当前音乐。
  - `getActiveMusicKey()` 优先读取试听覆盖；点“跟随旅途”后恢复地点/地形轮换。
  - `getAudioState()` 增加 `previewMusic` 和 `previewMusicKey`，方便调试复核。
- 更新 [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)。
  - 新增 `.audio-review-list` 和 `.audio-review-card`。
  - 候选以两列小按钮展示，避免变成大段文字说明。
- 更新 [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)。
  - 新增 `audio review audition contract` 防漏检查。

## 验证

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed c059-audio-review --strategy novice
```

关键结果：

- `audio review audition contract` 通过。
- 完整 smoke 仍按 `central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift` 抵达 `kyushu_rift`。
- 完整 smoke 结束资源：`{"axle":69,"grain":86,"sanity":48}`。
- `novice` 失误玩家 1000 局：`SUCCESS_RATE 100%`，`early_0_3` 为 `0`。

## 浏览器复验

本地预览地址：

```text
http://127.0.0.1:4187/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?c=c059-audio-review-2
```

验证结果：

- 页面标题为 `不思异：九州 Web Demo 原型`。
- 首屏显示 `中原驿`，页面不是空白页。
- 设置面板出现 6 个试听按钮：
  - 跟随旅途
  - `MUS-CORE-001`
  - `MUS-CORE-003`
  - `MUS-CORE-004`
  - `MUS-CORE-005`
  - `MUS-CORE-006`
- 点击 `MUS-CORE-006` 后：
  - 当前音乐显示 `MUS-CORE-006 春晓清行 WebDemo 低响度预览（待复核）`。
  - 试听覆盖显示 `MUS-CORE-006 · 点“跟随旅途”恢复`。
  - 试听按钮高亮为 `MUS-CORE-006`。
  - 音乐按钮变为 `关闭音乐`。
  - 控制台错误/警告：`0`。
- 点击“跟随旅途”后：
  - 当前音乐恢复为 `MUS-CORE-001 九州古道 WebDemo 低响度预览（待复核）`。
  - 试听覆盖恢复为 `跟随旅途`。
  - 控制台错误/警告：`0`。
- 小横屏 `844x390` 复验：
  - 页面级横向溢出：`false`。
  - 页面级纵向溢出：`false`。
  - 试听候选按钮优先可见，详细说明下移。

## 主线程判断

此项把“音乐待主观试听”的工作变成可操作入口。后续用户不需要走完整地图，也可以在游戏内直接点 5 首候选做听感判断。

仍需注意：试听入口只解决复核效率，不代表音乐定稿。正式完成前仍要判断每首曲子的情绪适配、循环点、响度、授权和是否会压过文字。
