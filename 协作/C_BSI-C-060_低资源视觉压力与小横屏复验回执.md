# C_BSI-C-060 低资源视觉压力与小横屏复验回执

## 目标

把车轴、粮草、神志的危险状态从“主要靠文字读出来”推进到“玩家一眼能在 HUD、舞台和车队上感到压力”，同时不增加小横屏文字负担。

## 本轮改动

- 更新 [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)。
  - 新增 `stageConditionLights`，在旅途舞台右下角显示三枚小状态灯：轴、粮、神。
  - 更新 CSS/JS 版本号到 `20260618-c060`，避免浏览器继续吃旧缓存。
- 更新 [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)。
  - 新增 `getResourceStatuses()` 和 `getResourcePressure()`，把资源状态统一为 `normal / warn / danger`。
  - 新增 `renderStageConditionLights()`，让舞台状态灯跟随资源牌状态变化。
  - 新增 `applyStageResourcePressure()`，让舞台和车队获得 `low-* / critical-*` 状态 class。
  - 新增 `pressure=low` 视觉验收参数，仅用于截图和浏览器复核；该参数不会写回玩家存档。
- 更新 [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)。
  - 新增 `.stage-condition-lights`。
  - 低车轴时车队增加轻微压重/顿挫；低粮草时舞台轻微失血色；低神志继续强化污染层。
  - 小横屏下状态灯压缩到 20px，避免遮挡路线和车队。
- 更新 [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)。
  - 新增 `resource visual pressure contract`。
  - 扩展 `visual capture view query contract`，纳入 `pressure=low` 验收参数。

## 验证

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed c060-resource-pressure --strategy novice
```

关键结果：

- `resource visual pressure contract` 通过。
- `visual capture view query contract` 通过。
- 完整 smoke 仍按 `central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift` 抵达 `kyushu_rift`。
- 完整 smoke 结束资源：`{"axle":69,"grain":86,"sanity":48}`。
- `novice` 失误玩家 1000 局：`SUCCESS_RATE 100%`，`early_0_3` 为 `0`。
- 本轮 `novice` 告警触达：粮草 138 局，神志 613 局，任一资源 672 局；说明低资源视觉反馈会在失误玩家路径中真实有机会出现。

## 浏览器复验

本地预览地址：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?c060&pressure=low
```

视口：`844x390`。

验证结果：

- 页面标题为 `不思异：九州 Web Demo 原型`。
- 低资源验收状态：
  - 车轴：`14`，资源牌 `danger`，舞台灯 `danger`。
  - 粮草：`22`，资源牌 `warn`，舞台灯 `warn`。
  - 神志：`18`，资源牌 `warn`，舞台灯 `warn`。
- 舞台状态：
  - `stagePressure = danger`
  - 舞台 class 包含 `polluted low-axle critical-axle low-grain low-sanity`
  - 车队 class 包含 `low-axle critical-axle low-grain low-sanity`
- 右下角状态灯尺寸与位置：
  - `width=68`，`height=20`
  - 位于 844x390 舞台视口右下，不遮挡主要按钮。
- 页面级横向溢出：`false`。
- 页面级纵向溢出：`false`。
- 控制台错误/警告：`0`。

交互复验：

- 在低资源状态下点击 `地图`：
  - `bodyView = map`
  - 可见路线卡数量：`2`
  - 页面级横向/纵向溢出：`false / false`
- 再点击 `旅途`：
  - `bodyView = town`
  - `stagePressure = danger`
  - 状态灯仍为 `danger / warn / warn`
  - 页面级横向/纵向溢出：`false / false`
- 控制台错误/警告：`0`。

## 主线程判断

此项完成后，三资源压力不再只靠数字和文字提示。玩家在小横屏下能同时从资源牌、舞台右下角小灯、车队状态和神志污染层判断“哪里出问题”。这属于 P0 UI/状态反馈收口，不改变核心玩法数值。

