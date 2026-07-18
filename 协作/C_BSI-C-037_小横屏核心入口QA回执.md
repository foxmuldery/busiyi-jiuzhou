# C_BSI-C-037 小横屏核心入口 QA 回执

## 任务目标

把横屏手游界面的核心入口纳入命令行 QA，防止后续继续压缩 UI 时误删关键按钮或破坏“一屏选择”原则。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 QA 项：
  - `landscape utility entry contract`

## 当前保护内容

- 顶部功能入口必须保留：
  - 音频：`audioHudButton`
  - 行囊：`data-drawer-target="inventory"`
  - 古辞：`data-drawer-target="poetry"`
  - 日志：`data-drawer-target="log"`
  - 设置：`data-drawer-target="settings"`
- 行囊必须保留九宫格语义：`aria-label="行囊九宫格"`。
- 地点志与当前遭遇必须保留弹窗入口：
  - `locationLoreToggle`
  - `eventTextToggle`
- CSS 必须保留小横屏优化段：
  - `@media (max-height: 520px) and (orientation: landscape)`
- 小横屏选择区必须继续覆盖：
  - 补给列表。
  - 剧情选择列表。
  - 地图路线列表。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/C_BSI-C-036_神志与告急音频触发QA回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 保护的是用户此前反复强调的方向：网页版原型要更像横屏手机游戏，文字区域收进弹窗，核心入口用小图标保留，选择项尽量一屏显示。

下一步建议继续补“真实可点击链路”的轻量脚本，模拟新局进入、打开地图、选择路线、半途事件、抵达地点的最短路径。
