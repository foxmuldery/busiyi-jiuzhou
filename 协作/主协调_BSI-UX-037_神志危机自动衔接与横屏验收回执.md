# BSI-UX-037 神志危机自动衔接与横屏验收回执

日期：2026-06-21

责任：主协调 / C 视觉交互

目标：修正玩家在事件结果导致资源归零后仍需再点底部按钮的问题，让 `继续前行` 直接进入危机补救，并验收 `神志崩线` 弹窗的小横屏可玩性。

## 本轮改动

1. 新增 `shouldAdvanceResultToCrisisDecision()`：
   - 当当前结果页之后已经进入 `crisis` 状态；
   - 且危机事件有可用补救选项；
   - 点击结果页 `继续前行` 时，直接切到危机补救弹窗。
2. 普通事件结果不受影响，仍然点击继续后关闭弹窗。
3. 更新缓存号到 `20260621-c117`。
4. 将“结果后自动进入危机补救”写入 QA 合同，防止回退。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

## 自动检查

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check -- app.js qa-check.js index.html`：通过

## 浏览器验收

- 测试尺寸：`900 x 500`
- 测试地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&pressure=low&captureLocation=red_marsh&view=town&verify=crisis-c117-1782019762989`
- 测试链路：直达 `赤水外滩` -> `赤水岸骨` -> 选择 `凝视赤水辨路` -> 神志归零 -> 结果页 `继续前行` -> 自动打开 `神志崩线`。

危机弹窗验收：

- 弹窗标题：`神志崩线`
- 弹窗标签：`濒死补救`
- 选项数量：`2`
- 选项列表：`让巫祝代记 / 接受幻路`
- 弹窗尺寸：`820 x 258`，`scrollHeight = clientHeight = 256`
- 两个补救选项全部可见，无拖动条。
- 控制台无 error / warning。

补救结果复验：

- 点击选项：`接受幻路`
- 结果反馈：`益 本次变化 补益入囊 志+10`
- 神志从 `0` 回到 `10`
- 点击 `继续前行` 后弹窗关闭，页面回到 `赤水岸骨 · 已处理`
- 下一步状态：`supply`
- 地点补给卡仍可见，`打开九州图` 可继续推进。

## 结论

本轮解决了“资源归零后节奏断开”的交互问题。现在玩家从危险选择到危机补救是连续的：结果页轻点继续后直接进入补救选择，补救后回到可继续游玩的状态。

## 下一步建议

1. 给危机弹窗增加更强的视觉信号，例如顶部资源牌闪烁与弹窗边框呼吸统一成同一套告急语言。
2. 复验另外两个危机：`断轴` 和 `粮尽`，确认它们也能同样自动衔接。
3. 后续可为三类危机分别替换专属方图，而不是复用失败图或背景裁切图。
