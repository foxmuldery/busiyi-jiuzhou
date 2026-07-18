# BSI-UX-025 路线遭遇拦截与雷泽复验回执

时间：2026-06-21

## 目标

修复上一轮真实试玩中暴露的交互歧义：

玩家到达新地点后，如果当前地点遭遇尚未处理，直接点下一条路线，界面会让人误以为“路线已点但又被事件卡住”。本轮改成明确规则：当前地点遭遇未落账时，不能起行，不扣资源，不推进天数，直接提示并打开当前遭遇。

同时复验 `雷泽浅畔 / 泽鼓回雷` 的实际浏览器路径。

## 已完成

### 1. 未处理遭遇时拦截选路

文件：[app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)

新增：

- `getUnresolvedCurrentEventContext()`
- `blockRouteUntilCurrentEventHandled(route)`

效果：

- 当前地点遭遇未处理时，点击路线不会扣 `车轴 / 粮草 / 神志`。
- 不推进天数。
- 不进入半途路遇。
- 自动切回地点页并打开当前遭遇弹窗。
- 状态提示显示：
  - `遭遇未决`
  - `先处理当前遭遇`
  - `故王道 的「车辙分叉」还没有落账。处理后，再从九州图选择去 雷泽浅畔。`

### 2. 地图页提前提示

文件：[app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)

地图页 `下一站` 提示从单纯“选一条路”改为：

- `先处理 故王道 的遭遇，再选下一站`
- 路线卡底部显示：`先处理当前遭遇，再起行。`

顶部下一步提示也优先显示：

- `下一步：处理遭遇`

### 3. QA 契约

文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

新增：

- `route blocked by current encounter contract`

检查：

- 选路拦截函数存在。
- `move()` 在正式扣资源前调用拦截。
- UI 文案包含 `先处理当前遭遇` 与 `还没有落账`。
- 顶部引导把未处理事件视为优先动作。

### 4. 缓存版本

文件：[index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

- `app.js` 版本更新为 `20260621-c102`。

## 自动验证

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

平衡模拟：

- 默认策略 300 局：成功率 100%，硬失败 0。
- 新手策略 300 局：成功率 100%，补救 3 局，硬失败 0。

## 浏览器复验

测试地址：

http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-gate-c102-1782012931673

视口：900x500 横屏。

验证路径：

1. 新局进入中原驿。
2. 页面顶部、地图提示、路线卡均提示先处理当前遭遇。
3. 处理 `驿门未闭` 后，地图恢复可选路线。
4. 走 `中原驿 -> 故王道`，处理半途路遇。
5. 抵达 `故王道` 后，不处理 `车辙分叉`，直接点击 `顺深车辙驶入雷泽`。
6. 验证结果：
   - 仍在 `故王道`。
   - 仍是第 2 日。
   - 资源仍为 `车轴 74 / 粮草 92 / 神志 85`。
   - 页面提示 `遭遇未决 / 先处理当前遭遇`。
   - 弹窗打开 `车辙分叉`，显示两项选择。
7. 处理 `车辙分叉` 后，路线恢复可走。
8. 走 `故王道 -> 雷泽浅畔`，处理半途路遇。
9. 抵达 `雷泽浅畔`，打开 `泽鼓回雷`。
10. 确认弹窗居中显示，三项选择一次性可见：
    - `铺芦过鼓面`
    - `听雷辨浅路`
    - `采雷熟芦根`

控制台错误/警告：无。

截图：成功。截图中可见 `雷泽浅畔 / 泽鼓回雷` 弹窗、三项选择、顶部资源与水泽音乐 `CORE-003`。

## 主线程判断

本轮修复让路线选择逻辑更像可发行的手游流程：玩家可以看到可选路线，但系统会明确告诉玩家“此地遭遇未处理，先落账再起行”，不会暗中扣资源，也不会造成点了像没反应的错觉。

下一步建议继续做：

1. 对 `雷泽浅畔` 的补给结果做一次试玩感复核，确认粮草型地点的参与感足够。
2. 继续打磨弹窗排版，减少图片与诗句在 900x500 下的拥挤感。
3. 对 D 线程追加 `泽鼓回雷` 方图事件图提示语，优先让这张图变成专属视觉。
