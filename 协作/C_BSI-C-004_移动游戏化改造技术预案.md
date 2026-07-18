# C_BSI-C-004 移动游戏化改造技术预案

对应主协调任务：BSI-UX-006  
线程角色：C 线程 / Web Demo 技术原型与工具链工程师  
日期：2026-06-14  
阶段：技术预案，不改代码  

## 一、结论

当前 Web Demo 的核心玩法和数据结构可以保留，问题主要不在规则，而在页面一次性暴露了太多桌面工作台信息。建议第一版继续使用静态 HTML + CSS + 原生 JS，不迁移 React/Vite，不引入重型 UI 库；实现时以“竖屏手机游戏壳 + 四个游戏页/抽屉 + 底部导航”为最小目标。

推荐默认方向：

- 竖屏优先，桌面端只作为居中的手机预览器。
- 地点页保留为主游戏页，九州图、行囊、日志改成独立页或抽屉。
- 不改 `data.js` 的路线、事件、补给、死局防护数据。
- JS 只轻调视图切换和渲染入口，避免触碰 `move()`、`choose()`、`applyDelta()`、危机判定等玩法逻辑。

## 二、当前造成桌面网页感的具体来源

### 1. HTML 结构问题

当前文件：`GitHub资产区/03_WebDemo/prototype/index.html`

- `main.app-shell` 是全页面工作台容器，直接承载顶部、资源、总览、地点、地图、行囊、日志；没有手机游戏画幅边界。见当前第 10 行。
- `.topbar` 同时显示项目标签、地点大标题、日数、区域、重开按钮；`project-label` 文案为“Web Demo Prototype”，第一眼会强化网页原型感。见第 11-20 行。
- `.resource-strip` 下 3 个 `.resource-card` 常驻，信息颗粒偏大，更像仪表盘卡片而不是轻 HUD。见第 23-48 行。
- `.journey-overview` 把 `.view-tabs` 和 `.distance-board` 横向摆在主区域上方，像网页页签 + 数据看板。见第 50-63 行。
- `.town-view` 里 `.journey-stage` 后接 `.control-grid.town-grid`，把 `.event-panel` 和 `.status-panel` 并排展示。地点事件、地点志、补给、行囊、语言、困厄、音乐、动态开关同时出现，信息层级过重。见第 65-157 行。
- `.status-panel` 是右侧常驻面板，包含 `#itemList.inventory-grid`、`#languageList`、`#safetyList`、`#audioToggleButton`、`#motionToggle`、`#videoNote`，应拆到行囊/设置页或抽屉。见第 128-156 行。
- `.log-panel` 在地点页下方常驻，完整日志一直占空间；手机游戏里更适合只露最近一条，完整日志放日志页。见第 159-165 行。
- `.map-view` 使用 `.map-layout`，把 `#kyushuMap` 和 `.map-route-panel` 并排；这是桌面地图工具的结构，不像手机游戏地图页。见第 168-188 行。

### 2. CSS 布局问题

当前文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

- `.app-shell` 使用 `width: min(1440px, calc(100vw - 32px))`，桌面会自然铺开成宽屏应用。见第 41-45 行。
- `.topbar` 是横向 flex，`.resource-strip` 是 `repeat(3, 1fr)`，`.journey-overview` 是双列，`.distance-board` 是三列；这些都在桌面端强化“看板”感。见第 55-62、119-123、195-238 行。
- `.resource-card, .panel` 带较重边框、渐变和 `box-shadow: 0 18px 42px`；大量卡片同时存在时，视觉像后台面板堆叠。见第 125-132 行。
- `.journey-stage` 高度按 `clamp(260px, 33vw, 390px)`，受桌面宽度影响，仍是横向舞台逻辑。见第 276-284 行。
- `.control-grid` 和 `.town-grid` 明确使用宽屏列：`minmax(460px, 1fr) minmax(260px, 0.38fr)`，是地点 + 侧栏的桌面结构。见第 717-725 行。
- `.map-panel` 最小高度 610px，`.map-layout` 为 `minmax(520px, 1fr) minmax(280px, 0.42fr)`，`.kyushu-map` 最小高度 530px；手机宽度下需要改成单页地图 + 底部路线选择。见第 847-859 行。
- `.log-panel` 固定 `max-height: 190px` 并滚动，适合桌面常驻记录区，不适合主游戏页。见第 1188-1203 行。
- 现有 `@media (max-width: 980px)` 只把部分 grid 变成单列，`@media (max-width: 560px)` 只缩 `.app-shell` 和车队位移；它解决窄屏可排版，但没有建立手机游戏壳、底部导航、页面层级。见第 1255-1291 行。

### 3. JS 渲染问题

当前文件：`GitHub资产区/03_WebDemo/prototype/app.js`

- `activeView` 只有 `"town"` / `"map"` 两个状态。见第 49 行。
- `el` 只查询 `#townViewButton`、`#mapViewButton`、`#townView`、`#mapView`，没有行囊页、日志页、抽屉按钮。见第 66-69 行。
- `setActiveView(view)` 只在地点和地图之间切换，并直接调用 `renderOverview()`、`renderMap()`。见第 278-292 行。
- `renderStatus()` 同时刷新行囊、语言、困厄、音频状态、完整日志；这导致这些信息默认被设计成常驻侧栏/日志面板。见第 1271-1279 行。
- `renderRoutes()` 默认面向 `#routeList` 渲染完整路线卡，`renderMap()` 同时渲染完整地图节点和路线，适合地图页但不应和主地点页并排。见第 935-1073 行。
- `renderEvent()` 在地点事件已处理时提示“请切到九州图”，这个流程是对的，但后续需要让“九州图”成为底部导航/游戏页，而不是网页页签。见第 1159-1167 行。
- `window.BSI_PROTOTYPE.getView/setView()` 也只有两视图；后续 smoke test 要同步支持新增视图名称，或保持兼容映射。见第 1591-1595 行。

### 4. data.js 不是本轮主要问题

当前文件：`GitHub资产区/03_WebDemo/prototype/data.js`

`data.js` 主要是地点、路线、事件、补给、音频槽位和初始状态。它会造成文字信息量偏大，但不是“桌面网页感”的主因。本轮不建议改路线、事件、补给和死局防护数据；如 D 线程认为部分地点志太长，可以后续只做显示折叠，不先删数据。

## 三、最小改造路径

### 路径 A：HTML 需要改的部分

建议做少量结构调整，保留现有 ID，降低 JS 风险。

1. 给主体建立手机壳：
   - 可把 `<main class="app-shell">` 改为 `<main class="app-shell game-phone-shell">`。
   - 如要桌面外框，可在 `main` 外包一层 `.phone-preview-stage` / `.phone-frame`，但不是必须。

2. 顶部改成轻 HUD：
   - 保留 `#locationTitle`、`#dayLabel`、`#regionLabel`、`#newRunButton`。
   - `project-label` 默认隐藏或移到设置/关于，不要首屏显示 “Web Demo Prototype”。
   - `.resource-strip` 保留 3 个资源，但从大卡片变成 HUD chip；`small` 提示可在手机首屏隐藏或折叠。

3. 四个主入口：
   - 保留 `#townView`、`#mapView`。
   - 从 `.status-panel` 拆出一个 `#inventoryView` 或 `#bagView`，保留内部 ID：`#itemList`、`#languageList`、`#safetyList`、`#audioToggleButton`、`#motionToggle`、`#videoNote`。
   - 从 `.log-panel` 拆出一个 `#logView`，保留 `#logList`。
   - 新增底部导航，例如 `.bottom-nav`，包含地点、九州图、行囊、日志四个按钮。现有 `#townViewButton`、`#mapViewButton` 可以直接迁移到底部导航，再新增 `#inventoryViewButton`、`#logViewButton`。

4. 地点页减重：
   - `.town-view` 首屏只保留 `.journey-stage`、地点志摘要、补给、事件文本和选择按钮。
   - `.status-panel` 不再作为 `.town-grid` 右侧常驻栏。
   - `.log-panel` 不再常驻；可在地点页仅留一个 `.latest-log-peek` 显示最近一条。

5. 地图页减重：
   - `#kyushuMap` 保留。
   - `.map-route-panel` 从右侧栏改为地图页底部路线区或底部抽屉，继续使用 `#routeList`，避免重写路线点击逻辑。

### 路径 B：只改 CSS 的部分

这些可以优先靠 CSS 收敛，不必先动玩法 JS：

- `.app-shell / .game-phone-shell`：桌面端最大宽度 390-430px，居中；移动端宽度 100%，高度使用 `100svh`/`100dvh` 兜底。
- `body`：桌面端用 `display: grid; place-items: center;`，让浏览器成为手机预览背景，不让界面铺满。
- `.topbar`：从横向大标题改为紧凑 HUD；标题字号不要再用桌面级 `clamp(28px, 4vw, 48px)`。
- `.resource-strip`：三等分小 chip，压低 padding、字号和阴影；隐藏或弱化 `small` 提示。
- `.journey-overview`：不要双列；进度信息并入 HUD 或主画面下方小条。
- `.view-tabs`：若保留，应变成底部导航样式；如果新增 `.bottom-nav`，旧 `.view-tabs` 可不再作为页面顶部控件。
- `.control-grid`、`.town-grid`、`.map-layout`：统一改为单列，不再出现左右面板。
- `.journey-stage`：改为手机主画面比例，建议固定在约 38-48svh 区间；不要按桌面 `vw` 拉伸。
- `.event-panel`：成为地点页底部行动区，减少边框阴影，按钮保持至少 44px 点击高度。
- `.inventory-grid`：行囊页内使用稳定 3x3 九宫格，单格用 `aspect-ratio: 1`，避免文字撑高布局。
- `.log-panel`：作为独立页时高度跟随页面内容；地点页只显示最近一条摘要，不出现 190px 常驻滚动框。
- `.kyushu-map`：手机页内应降低 `min-height`，使用 `aspect-ratio` 或 `height: min(58svh, 520px)`，路线列表作为下方主操作。

### 路径 C：JS 需要轻调的部分

保持玩法函数不动，只扩展视图和渲染位置。

1. 扩展视图枚举：
   - 将 `activeView` 从 `"town" | "map"` 扩为 `"town" | "map" | "inventory" | "log"`，或使用 `"bag"` 作为行囊命名。
   - `setActiveView(view)` 改为按数组统一隐藏/显示多个 `.view-panel`，同步更新底部导航的 `active` 和 `aria-selected`。

2. 扩展 `el`：
   - 新增 `inventoryViewButton`、`logViewButton`、`inventoryView`、`logView`。
   - 继续保留 `itemList`、`languageList`、`safetyList`、`logList` 等 ID，避免改 `renderStatus()` 内部选择器。

3. 调整 `renderStatus()`：
   - 继续刷新 `#itemList`、`#languageList`、`#safetyList`、`#logList`。
   - 如果地点页新增最近日志摘要，可同步写入 `#latestLogPeek`，内容取 `state.log[0]`。
   - 不改 `trimLog()` 的 9 条上限。

4. 调整提示文案：
   - `renderEvent()` 里“请切到‘九州图’”可以改为“点底部‘九州图’选择下一段旅程”。
   - 这只是用户引导，不影响逻辑。

5. 地图路线不重写：
   - `renderRoutes()` 继续绑定 `#routeList`。
   - 如果路线区变成底部抽屉，只移动 DOM 和 CSS，不改 `move(routeId)`。

6. 测试 API 保持兼容：
   - `window.BSI_PROTOTYPE.getView()` 返回新增视图。
   - `setView("town")` / `setView("map")` 必须继续可用。
   - 如测试脚本暂时只识别 town/map，新增视图不能破坏旧 smoke。

## 四、竖屏手机游戏壳方案

### 1. 桌面端

桌面浏览器只做手机预览器：

- `body` 居中承载 `.game-phone-shell`。
- `.game-phone-shell` 建议宽度：`min(100vw, 430px)`。
- 高度建议：`min(100dvh, 932px)`，并提供 `100svh`/`100vh` 兜底。
- 背景可以保留项目氛围，但不要让内容区域铺成 1440px。
- 是否显示明显手机边框交给用户/D 线程定；技术上可以用 `.phone-frame` 加边框和圆角，也可以只做无边框居中画幅。

建议结构示意：

```html
<body>
  <main class="app-shell game-phone-shell">
    <header class="game-hud">...</header>
    <section class="game-screen">...</section>
    <nav class="bottom-nav">...</nav>
  </main>
</body>
```

### 2. 真手机端

手机端不要再显示外框：

- `.game-phone-shell` 宽高占满视口。
- 使用 `padding-top: env(safe-area-inset-top)` 和 `padding-bottom: env(safe-area-inset-bottom)`，避免刘海屏和底部手势条遮挡。
- 底部导航固定在壳内，不固定到整个浏览器页面外。
- 主内容区内部滚动，避免整个 `body` 横向或纵向乱滚。

### 3. 建议壳内分区

```text
顶部 HUD：日数 / 当前地点 / 车轴 / 粮草 / 神志 / 距裂隙
主画面区：地点舞台或九州图
行动区：补给、事件选择、路线卡
底部导航：地点 / 九州图 / 行囊 / 日志
```

## 五、地点页、九州图、行囊、日志的手机化处理

### 1. 地点页

职责：当前地点主玩法。

保留：

- `#journeyStage`
- `#locationLoreTitle`
- `#locationLoreText`
- `#supplyList`
- `#eventText`
- `#choiceList`

调整：

- 地点志默认显示摘要或短段，长文可以折叠。
- 补给放在事件选择前或作为同一行动区的小按钮。
- 事件选择按钮放在拇指容易点击的底部区域。
- 当前地点事件处理完后，不展示大段日志，只提示去九州图。

### 2. 九州图页

职责：路线决策。

保留：

- `#kyushuMap`
- `#mapRoutesLayer`
- `#mapNodeLayer`
- `#routeList`

调整：

- 地图上半屏，路线卡下半屏或底部抽屉。
- 地图节点文字要短，完整消耗/风险/目的地补给放路线卡里。
- 路线卡继续显示目的地、消耗、风险、半途路遇、可观察补给，满足主协调验收。
- 点击地图节点或路线卡都可触发 `move(routeId)`，但手机端应以路线卡为主，避免节点过小。

### 3. 行囊页/抽屉

职责：非即时决策信息与设置。

保留：

- `#itemList.inventory-grid`
- `#languageList`
- `#safetyList`
- `#audioToggleButton`
- `#audioStatus`
- `#audioDetails`
- `#motionToggle`
- `#videoNote`

建议：

- 第一版更稳的是独立“行囊”页，不建议先做复杂拖拽背包。
- 九宫格用 3x3 固定格，格子只显示名称、类型、状态。
- 语言、困厄、音乐、动态开关放在九宫格下方的紧凑列表。
- 如果 D 线程坚持抽屉，也尽量用单个 `.sheet` 容器，不改变内部 ID。

### 4. 日志页/抽屉

职责：复盘与最近变化。

保留：

- `#logList`

建议：

- 地点页只露 `state.log[0]` 最近一条。
- 完整 9 条日志放日志页。
- 日志页可以按时间倒序继续使用当前 `state.log.unshift()` 逻辑，不需要改数据结构。
- 不建议把日志和地点事件混在同一个滚动面板里，否则仍会像网页记录区。

## 六、实现风险与注意事项

1. 不要改玩法核心函数
   - 不动 `move()`、`completeRoute()`、`choose()`、`resolveRouteEvent()`、`resolveCrisis()`、`applyDelta()`、`checkResourceFailure()`。
   - 本轮目标是换壳和信息层级，不是重做规则。

2. DOM 移动要保留唯一 ID
   - `#itemList`、`#logList`、`#routeList`、`#choiceList`、`#supplyList` 等 ID 只能保留一个。
   - 不要为了新页面复制节点，否则 JS 会查到第一个旧节点，出现渲染到隐藏区的问题。

3. 隐藏方式要谨慎
   - 当前 `view-panel[hidden] { display: none !important; }` 可继续使用。
   - 若改为抽屉，不要把承载点击绑定的节点长期从 DOM 删除，最好只是隐藏/显示。

4. 地图在 390px 宽度下容易拥挤
   - `.map-node` 当前宽 132px，手机上很可能重叠。
   - 建议地图节点压缩成小点 + 短标签，路线详情交给 `#routeList`。

5. 手机高度与底部导航
   - 避免只用 `100vh`，iOS/移动浏览器地址栏会造成底部导航被遮挡。
   - 使用 `100dvh` / `100svh` 和 safe-area inset。

6. 音频/动态开关不能消失
   - 音频需要用户点击解锁；如果把音乐按钮藏太深，用户会误以为没声音。
   - 推荐放在行囊页底部“设置”区域，首屏不常驻但可找到。

7. 不要用 CSS 伪隐藏破坏可访问状态
   - 底部导航要同步 `aria-selected`。
   - 非当前页使用 `hidden` 或明确 `aria-hidden`，避免屏幕阅读器和 tab 顺序混乱。

8. 不要删除现有素材和临时音频提示
   - 当前素材加载失败有降级文案，移动化时仍应保留。
   - 只改展示位置，不删除素材路径和 fallback。

## 七、后续实现测试清单

### 1. 语法与数据检查

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`
- 浏览器控制台执行：`window.BSI_PROTOTYPE.validate()`，确认 `ok: true`。
- 执行 `window.BSI_PROTOTYPE.getView()` / `setView("town")` / `setView("map")`，确认旧视图兼容。

### 2. 核心流程 smoke

- 打开原型，无控制台报错。
- 重开一局，地点页显示中原驿、三资源、距九州裂隙。
- 选择一个地点事件选项，资源变化、日志写入、按钮状态正常。
- 使用一次补给，补给按钮变为已取，资源变化正常。
- 切到九州图，能看到路线卡：目的地、消耗、风险、半途路遇、可观察补给。
- 选择一条路线，车队行进后能抵达下一地点。
- 遇到半途路遇时，能回到地点页处理，并继续抵达。
- 使用 `window.BSI_PROTOTYPE.forceCrisis("axle")` 触发濒死补救，确认危机选项仍可用。
- 行囊页能看到九宫格、语言、困厄、音频/动态设置。
- 日志页能看到最近记录，地点页只露最近反馈或不常驻完整日志。

### 3. 移动尺寸检查

必须检查：

- 390 x 844
- 430 x 932

检查点：

- 无横向滚动。
- 顶部 HUD 不遮挡主画面。
- 底部导航不遮挡行动按钮。
- 车轴、粮草、神志和距裂隙信息始终可见或一眼可回到。
- 选择按钮、路线卡、补给按钮点击高度不低于 44px。
- 地点页不再出现右侧行囊面板。
- 九州图不再出现地图 + 路线右侧并排面板。
- 行囊九宫格不会挤压地点事件区。
- 完整日志不再把主画面变成记录列表。

桌面端也要检查：

- 1280px 或更宽浏览器下，界面仍居中为手机预览，不铺成 1440px 工作台。
- 如果启用手机边框，边框不挤压 390px 内容。

## 八、建议由用户/D 线程决策的问题

1. 桌面端手机壳是否要明显边框：
   - A. 明显手机边框，更像试玩器。
   - B. 无边框居中画幅，更像轻量网页游戏。

2. 底部导航入口数量：
   - A. 四入口：地点 / 九州图 / 行囊 / 日志。信息清楚，最稳。
   - B. 三入口：地点 / 九州图 / 行囊，把日志放行囊内。更轻，但日志不够显性。

3. 行囊形态：
   - A. 独立页。实现稳，测试清楚。
   - B. 底部抽屉。更像手游，但需要更多 JS 状态与遮罩处理。

4. 地点志长度：
   - A. 数据保留，手机端只显示摘要/折叠。
   - B. 直接改短 `data.js` 文案。风险较高，不建议第一版先做。

5. 地图节点表现：
   - A. 小点 + 短标签，路线卡承载详情。
   - B. 保留大节点卡片。信息全，但 390px 下容易拥挤。

## 九、建议执行顺序

1. 等 D 线程确认移动端体验方案和验收清单。
2. C 线程先做 HTML 最小拆分：手机壳、底部导航、行囊页、日志页。
3. 再做 CSS 手机壳与单页布局。
4. 最后轻调 JS 视图枚举和最近日志摘要。
5. 跑语法检查和 smoke。
6. 用 390x844、430x932、桌面宽屏三档做截图/人工验收。

本预案不包含代码修改；后续实现时应在动手前再次确认 D 线程最终方案，避免 C 线程先行定死体验细节。
