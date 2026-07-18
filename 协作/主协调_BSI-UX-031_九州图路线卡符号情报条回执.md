# BSI-UX-031 九州图路线卡符号情报条回执

日期：2026-06-21

## 目标

继续压缩九州图路线卡信息密度，把原本分散在多行的“风险 / 定遇 / 随机异象 / 补救 / 目的地补给”整合为一条符号情报条，让路线选择更接近手机游戏和 Out There 式战略界面。

## 已完成

- 新增 `renderRouteIntelStrip()`：路线卡统一渲染符号情报条。
- 新增 `formatRouteSupplyIntelLabel()`：把补给预览压缩为 `轴+11`、`粮+6 神+7` 这类短信息。
- 情报条包含：
  - `险`：路线风险。
  - `遇`：固定半途路遇。
  - `异`：随机异象概率等级。
  - `救`：是否存在低资源补救倾向。
  - `补`：目的地可补资源。
- 小横屏下旧的长行 `route-risk-row / route-omen-row / route-supply-preview` 隐藏，只保留一行情报条。
- 修复一次浏览器复验中发现的 CSS 级联问题：通用 `route-card span` 曾把芯片压成竖排，已提高 `.route-intel-chip` 的显示优先级。
- 更新缓存号到 `20260621-c109`。

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
- `route preview contract` 已覆盖符号情报条。

浏览器复验通过：

- 测试尺寸：900 x 500 横屏
- 测试路径：开局 -> 轻点继续 -> 打开九州图
- 旧王道路卡：
  - 情报条高度：18px
  - `险 / 遇 / 异 / 救` 芯片各 18px
  - `补` 芯片保留 `轴+11`
  - 旧长行隐藏
  - 路卡无内部溢出
- 青丘路卡：
  - `补` 芯片保留 `粮+6 神+7`
  - 旧长行隐藏
  - 路卡无内部溢出
- 继续点击旧王道后：
  - 正常进入 `当康啼垄`
  - `nextAction = route-event`
  - `progressState = interrupted`
  - console 无 error / warn

测试页面：

`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-intel-c109c-1782016366733`

## 下一步建议

- D：把 `险 / 遇 / 异 / 救 / 补` 做成统一图标，替换当前文字圆章。
- C：后续可以把路线卡标题和资源消耗也进一步压缩，形成“标题 + 消耗 + 情报条”的固定三行结构。
- A/B：新路线和新路遇应继续保证风险、补给、半途倾向明确，否则路线卡情报条会变弱。
