# C_BSI-C-053 车队前景透明层与执行态选择收起回执

日期：2026-06-18  
子线程：C 技术原型  
类型：视觉资产替换 / 小横屏交互修正 / QA 固化

## 1. 本轮目标

把当前旅途舞台里的临时车队层从 `CAR-005` 初版抠图，替换为更干净的独立透明前景层，并顺手修掉真实横屏验收中暴露的“点击主选择后旧按钮仍留在原位”的误卡住体验。

## 2. 实际改动

### 2.1 车队前景层

- 新增透明图层：
  - `GitHub资产区/02_设计资产/可用素材/车队层/CAR-013_双马辎重车透明抠图.png`
- 来源：
  - 由 `CAR-009_双马辎重车绿幕.png` 做本地抠绿处理生成。
- 文件检查：
  - `hasAlpha: yes`
  - `pixelWidth: 2330`
  - `pixelHeight: 528`
- 接入位置：
  - `GitHub资产区/03_WebDemo/prototype/data.js`
  - `GitHub资产区/03_WebDemo/prototype/index.html`
  - `GitHub资产区/03_WebDemo/prototype/styles.css`

### 2.2 小横屏尺寸调整

- 默认车队宽度调整为：
  - `clamp(260px, 38vw, 620px)`
- 横屏游戏壳中的车队宽度调整为：
  - `clamp(240px, 34vw, 520px)`
- 小高度横屏中车队宽度调整为：
  - `clamp(210px, 34vw, 320px)`
- 844x390 实测车队盒：
  - `x=82`
  - `y=140`
  - `width=287`
  - `height=76`

### 2.3 执行动作时收起旧选项

真实浏览器验收时发现：点击当前遭遇选择后，系统进入“等落账”，但旧选择按钮在动作执行的半秒内仍占原位，容易让玩家误以为没有点中。

本轮已增加执行态样式：

- `.action-busy .choice-list`
  - `max-height: 0`
  - `opacity: 0`
  - `pointer-events: none`

效果：

- 点击后，主选项区立即视觉收起。
- 动作落账后，旧选择消失，出现“当前地点事件已处理。打开九州图，选择下一段显现的路。”
- 资源浮动和 HUD “等落账”仍保留，不丢反馈。

## 3. QA 固化

`qa-check.js` 新增：

- `caravan foreground upgraded`
- `busy action hides stale choices`

这两项会防止后续误退回：

- 默认车队不再指向 `CAR-005`。
- 执行动作时主选择列表必须收起。

## 4. 验证结果

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
```

关键结果：

- QA 全部通过。
- 完整 smoke 路径仍抵达 `kyushu_rift`。
- 完整 smoke 结束资源：
  - `{"axle":69,"grain":86,"sanity":48}`
- `novice` 1000 局：
  - `SUCCESS_RATE 100%`
  - `early_0_3: 0`
  - `RESCUED_RUNS 2`

## 5. 浏览器验收

内置浏览器读取页面状态正常，但截图和点击通道出现工具层超时；因此本轮补用本机 Playwright 做 844x390 横屏验收。

结果：

- 页面标题：`不思异：九州 Web Demo 原型`
- 视口：`844 x 390`
- 页面级溢出：
  - `x=0`
  - `y=0`
- 车队图：
  - `CAR-013_双马辎重车透明抠图.png`
  - `naturalWidth=2330`
  - `naturalHeight=528`
  - `complete=true`
- 点击首个遭遇选择后：
  - 执行中：`choiceListBox.height=0`，`opacity=0`
  - 落账后：`visibleChoiceCount=0`
  - 资源从 `80 / 90 / 85` 变为 `88 / 87 / 85`
  - 下一步变为 `补给一次`
  - 控制台错误/警告：`0`

## 6. 主线程判断

`P0-VIS-001` 已从“车队初版抠图影响画面质感”降为“已缓解，仍需美术复核”。当前版本已经适合作为内部试玩前景层，不再是 P0 阻断项。

剩余问题：

- `CAR-013` 仍是快速抠绿结果，正式版前应由美术做边缘精修。
- 后续可以补破损车队、夜行车队、神志污染车队等状态变体。
- 内置浏览器截图/点击通道本轮有超时，真实小横屏验收已由 Playwright 补证。
