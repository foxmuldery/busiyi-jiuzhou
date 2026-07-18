# BSI-UX-029 路线半途资源倾向标记回执

日期：2026-06-21

## 目标

把上一轮新增的路线行程条继续游戏化：半途点不再只显示“遇”，而是根据路遇选项自动显示资源倾向，让玩家在路线选择与行进时更快理解这段路可能带来什么。

## 已完成

- 新增 `getRouteEventSignal()`：自动扫描路遇全部选项的资源变化。
- 半途标记会自动判断主倾向：
  - `轴`：偏车轴收益。
  - `粮`：偏粮草收益。
  - `神`：偏神志收益。
  - `险`：没有明显收益且偏危险。
  - `异`：偏异象或缺少明确资源倾向。
- 半途标记新增数据：
  - `data-event-tone`
  - `data-event-threat`
  - `data-event-icon`
- 半途标记 title 会显示可读说明，例如：`当康啼垄：偏粮草，风险车轴`。
- CSS 增加不同倾向的颜色徽记，后续 D 线程可直接替换成正式图标。
- 更新缓存号到 `20260621-c107`。

## 涉及文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 验收结果

自动检查通过：

- `node --check app.js`
- `node --check qa-check.js`
- `node qa-check.js`
- `stage route progress contract` 已覆盖新的资源倾向字段和 CSS 合约。

浏览器复验通过：

- 测试尺寸：900 x 500 横屏
- 测试路径：开局选择“立刻上路” -> 轻点继续 -> 打开九州图 -> 选择“沿旧王道向西缓行” -> 触发“当康啼垄”
- 选择路线前：
  - `eventTone = grain`
  - `eventThreat = axle`
  - 半途标记显示 `粮`
  - title 为 `当康啼垄：偏粮草，风险车轴`
- 触发半途路遇后：
  - `progressState = interrupted`
  - `nextAction = route-event`
  - 半途标记显示 `停`
  - 弹窗标题为 `当康啼垄`
  - console 无 error / warn

测试页面：

`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-signal-c107-1782015503115`

## 下一步建议

- D：把 `轴 / 粮 / 神 / 险 / 异` 五类半途标记替换成统一风格的小图标。
- C：后续可把路线卡也同步显示同一套路线倾向小徽记，做到九州图和旅途舞台信息一致。
- B：新增路遇事件时无需填新字段，但要让选项资源变化保持明确倾向，否则会落到“异”。
