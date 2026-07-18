# 主协调 BSI-UX-056 九州图路线预览条验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 九州图、路线二次确认、触屏误操作反馈、自动验收

## 1. 目标

继续提升试玩版的“手机游戏感”和可读性。  
上一轮已在横向风景舞台加入阶段提示；本轮补强九州图选路层，让玩家第一次点路线时能明确看到预览信息，第二次才正式启程，降低误操作。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 新增 `#mapRoutePreview` 路线预览条，位于九州图右侧路线面板标题下方。
- 预览条会随状态显示：
  - `blocked`：遭遇未决，先回旅途页处理。
  - `idle`：当前地点有几条路线显现。
  - `selected`：已选中路线，显示“再点启程”。
  - `pending`：车队已进入半途路遇。
  - `crisis / ended / empty`：困厄、结局、无路等边界状态。
- 选中路线后，预览条显示目的地、资源消耗、半途路遇和目的地补给倾向。
- 小横屏下预览条压缩到 34px 左右高度，路线列表仍无滚动溢出。
- QA 的路线预览契约扩展到 HTML / JS / CSS 三层。
- 缓存版本更新到 `20260621-c140`。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c140-routepreview`

验收路径：

1. 打开新局。
2. 处理开场遭遇。
3. 使用一次补给。
4. 打开九州图。
5. 第一次点击可用路线。
6. 第二次点击同一路线确认启程。

浏览器 DOM 验收结果：

| 步骤 | 预览条状态 | 标题 | 详情 | 结果 |
|---|---|---|---|---|
| 初始未处理遭遇 | `blocked` | 遭遇未决 | 中原驿 · 先处理「驿门未闭」 | 通过 |
| 打开九州图 | `idle` | 从 中原驿 选路 | 2 条路线显现 · 先点预览，再点启程 | 通过 |
| 第一次点路线 | `selected` | 再点启程：故王道 | 轴-4 粮-4 · 路遇：当康啼垄 · 可补：轴+11 | 通过 |
| 第二次确认 | `pending` | 半途路遇 | 中原驿 → 故王道 · 处理后抵达 | 通过 |

附加验收：

- 选中路线卡 `aria-pressed="true"`。
- 选中路线卡出现“再点启程”标记。
- 路线面板纵向溢出：0。
- 路线列表纵向溢出：0。
- 页面横向溢出：0。
- 浏览器日志无 error / warn。
- 确认启程后进入 `当康啼垄` 半途路遇弹窗。

说明：截图接口本轮仍超时并重置浏览器自动化内核；本次以 DOM 状态、布局尺寸、日志和自动测试作为验收证据。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

## 5. 结论

BSI-UX-056 已完成。九州图现在不仅有路线卡二次确认，也有总预览条承接玩家的第一次点击反馈；这会让路线选择更接近手机游戏里的“先看清，再确认”的触屏体验。
