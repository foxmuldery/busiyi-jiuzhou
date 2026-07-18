# C_BSI-C-005 横屏手游改造技术预案

对应主协调任务：BSI-UX-007  
线程角色：C 线程 / Web Demo 技术原型与工具链工程师  
日期：2026-06-14  
阶段：技术预案，不改代码  

## 一、修正结论

用户已修正方向：这里的“更像手机游戏”不是竖屏手机壳，而是横屏游戏界面。`C_BSI-C-004_移动游戏化改造技术预案.md` 仅作为历史参考，不作为后续执行依据。

新的技术判断：

- 当前原型已经有适合横屏的核心资产：`#journeyStage.journey-stage`、横向背景层、前景层、云雾层、污染层、车队从左向右移动。
- 最小改造不需要重做玩法，不需要迁移技术栈，也不需要改 `data.js` 的路线、半途、补给、事件、行囊、音乐数据。
- 优先用 CSS 把页面从“网页工作台”收束成一个固定横屏游戏框；少量 HTML/JS 只用于模式组织、抽屉入口和提示文案。
- 九州图应从“独立网页地图页”改为同一横屏游戏框内的“战略地图模式”，仍使用现有 `#kyushuMap`、`#mapRoutesLayer`、`#mapNodeLayer`、`#routeList` 和 `move(routeId)`。

推荐默认执行方向：

```text
横屏游戏框
顶部轻 HUD：地点 / 日数 / 车轴 / 粮草 / 神志 / 距终点 / 地图入口
中央主视觉：横向旅途舞台，地图模式时切换为九州战略图
底部行动区：地点志摘要 / 补给 / 事件选项 / 路线卡
右侧轻抽屉：行囊九宫格 / 日志 / 设置 / 音乐
```

## 二、当前代码中可直接利用的横屏基础

### 1. 横向旅途舞台已经存在

当前文件：`GitHub资产区/03_WebDemo/prototype/index.html`

- `#journeyStage.journey-stage` 已标注为“横向山海旅途舞台”，包含视频层、背景层、云雾、日月、远山、路面、路线节点、车队、前景、污染层。见当前第 65-102 行。
- `#caravan` 和 `.caravan-art` 已接入车队图，且保留 CSS 车队剪影 fallback。见第 86-96 行。
- `#fromNode`、`#routeNode`、`#toNode` 已能显示从当前地点、路线、下一站的横向行进信息。见第 81-85 行。

当前文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

- `.journey-stage` 是横向画面容器，已有绝对定位层和 `overflow: hidden`。见第 276-284 行。
- `.asset-bg-road`、`.asset-bg-red`、`.asset-atmosphere`、`.asset-foreground`、`.asset-pollution` 已构成舞台分层。见第 317-367 行。
- `.stage-nodes` 是三段式横向路线信息，适合保留为舞台内 UI。见第 528-551 行。
- `.caravan` 使用 `left: 9%`、`bottom: 12%`、`width: clamp(...)`；`.caravan.traveling` 用 `translateX(52vw)`，`.caravan.interrupted` 用 `translateX(30vw)`。见第 553-571 行。
- `.journey-stage.traveling` 下远山、背景、云雾、前景都有位移，已经具备横向旅途感。见第 685-710 行。

当前文件：`GitHub资产区/03_WebDemo/prototype/app.js`

- `renderStage(isTraveling)` 根据当前地点/路线设置 terrain、日夜、污染、traveling/interrupted，并更新三段路线节点。见第 903-933 行。
- `move(routeId)` 会设置 `selectedRoute`、扣路线消耗、增加天数、触发 traveling 动画，并在中途事件或抵达之间分流。该玩法入口应保留。见第 673-711 行。
- `resolveRouteEvent()` 和 `completeRoute()` 已能处理半途路遇、继续抵达、发现地点。应保持不动。见第 713-786 行。

### 2. 九州图已经有战略地图数据和渲染

当前文件：`data.js`

- 各地点都有 `map: { x, y, step }`，天然适合在横屏战略图上定位。见第 7-192 行。
- 路线数据包含 `from`、`to`、`terrain`、`risk`、`cost`、`hint`、`midEvent`、`requireAny`、`lockedHint`，已经足够做路线卡比较。见第 194-317 行。

当前文件：`app.js`

- `renderMap()` 已生成路线线段 `.map-route-line`、地点按钮 `.map-node`，并把可达节点绑定到 `move(routeId)`。见第 998-1073 行。
- `renderRoutes()` 已生成路线卡，包含目的地、消耗、风险、半途路遇、目的地可观察补给和锁定原因。见第 935-971 行。
- `setActiveView("map")` 当前已能切换地图，只是表现为网页页签。见第 278-292 行。

结论：九州图无需重写成新系统，重点是改变容器关系和视觉层级，让它成为同一横屏游戏框中的“战略地图模式”。

## 三、当前造成网页工作台感的来源

### 1. 页面没有横屏游戏画幅

- `.app-shell` 当前宽度为 `min(1440px, calc(100vw - 32px))`，桌面会铺开成网页工作台。见 `styles.css` 第 41-45 行。
- `body` 只是普通页面背景，没有把内容约束在 16:9 或手机横屏比例的游戏框内。见第 28-35 行。

### 2. HUD 和状态过重

- `.topbar` 是网页标题栏，包含 `project-label` 的 “Web Demo Prototype” 字样。见 `index.html` 第 11-20 行。
- `.resource-strip` 是 3 个大资源卡，独立占一行。见第 23-48 行。
- `.journey-overview` 把地点/九州图页签和距离面板再占一行，视觉上像网页信息区。见第 50-63 行。

### 3. 舞台被下方网页面板削弱

- `.town-view` 中舞台后面接 `.control-grid.town-grid`，事件面板和行囊状态面板并排。见 `index.html` 第 104-157 行。
- `.status-panel` 常驻显示行囊、语言、困厄、音乐、动态开关，抢走主舞台权重。见第 128-156 行。
- `.log-panel` 常驻在地点页下方，像网页日志工具。见第 159-165 行。

### 4. 九州图像网页地图页

- `.map-view` 与 `.town-view` 是两个独立页面，地图页里 `.map-layout` 把地图和路线列表做成网页左右分栏。见 `index.html` 第 168-188 行。
- `.map-panel`、`.kyushu-map` 有较大的固定最小高度，适合桌面地图工具，但不一定适合 844x390 横屏手机。见 `styles.css` 第 847-859 行。
- `.map-node` 当前宽 132px、最小高 70px，小横屏下容易挤在一起。见第 920-933 行。

## 四、横屏最小改造路径

### 1. 主要靠 CSS 完成的改造

这些应作为第一批实现，风险最低：

- 建立横屏游戏框：
  - `.app-shell` 改为固定比例容器，例如 `aspect-ratio: 16 / 9`，宽度 `min(100vw - 24px, 1366px)`，高度不超过 `100dvh - 24px`。
  - 桌面端 `body` 使用居中布局，让浏览器成为试玩背景，不让 UI 铺成 1440px 工作台。
  - 移动横屏尺寸使用 `width: 100vw; height: 100dvh; aspect-ratio: auto;`，避免浏览器视口内出现破框。

- 把顶部信息压成横屏 HUD：
  - `.topbar`、`.resource-strip`、`.journey-overview` 可通过 CSS grid/flex 合并视觉层级。
  - `h1` 字号从桌面大标题降为 HUD 标题。
  - `.resource-card` 改为小型 HUD chip，隐藏或弱化 `small` 提示，只保留资源名、数值、短条。
  - `.project-label` 默认隐藏或降到设置/角标，不首屏显示 “Web Demo Prototype”。

- 让舞台成为第一视觉：
  - `.journey-stage` 高度不要再用 `clamp(260px, 33vw, 390px)`，而应占游戏框主体面积，例如总高的 52%-62%。
  - 舞台位于 HUD 下方、行动区上方，宽度贯穿主要画面。
  - 降低 `.panel` 阴影和边框重量，避免下方卡片压过舞台。

- 底部行动区横屏化：
  - `.event-panel` 改成底部行动面板，不再像文章卡片。
  - `.location-lore` 可压为摘要条，长地点志用固定高度/折叠，不撑高行动区。
  - `.supply-list`、`.choice-list` 改为横向或两列触控按钮，按钮高度保持 44px 以上。
  - `.event-text` 降低 `min-height: 132px`，用横屏可控高度和滚动/截断，避免 844x390 下挤掉舞台。

- 右侧轻状态/抽屉：
  - `.status-panel` 不再常驻完整面板；可 CSS 改为右侧窄 rail 或隐藏抽屉。
  - `.inventory-grid` 仍保留 3x3，打开抽屉时显示；不打开时只显示行囊按钮/小图标。
  - `.log-panel` 默认只显示最近一条，完整日志改为折叠或抽屉内容。

- 九州图战略模式横屏化：
  - `.map-view` 在视觉上不要脱离游戏框。
  - `.map-layout` 保持横屏策略：地图占左/中 65%-72%，路线卡占右侧或底部 28%-35%。
  - 小横屏下路线卡可从右侧改到底部横滑区，但仍在同一游戏框中。
  - `.map-node` 小尺寸下压缩为“点 + 短标签”，完整风险/消耗交给 `#routeList`。

### 2. 需要少量 HTML 调整的部分

HTML 只做结构归组，不改数据、不复制关键 ID。

建议最小结构：

```html
<main class="app-shell game-landscape-shell">
  <header class="game-hud">...</header>
  <section class="game-main">
    <section class="view-panel town-view active" id="townView">...</section>
    <section class="view-panel map-view" id="mapView" hidden>...</section>
  </section>
  <section class="game-action-bar">...</section>
  <aside class="game-side-drawer">...</aside>
</main>
```

具体建议：

- `main.app-shell` 增加 `game-landscape-shell` 类。
- 顶部保留现有 `#locationTitle`、`#dayLabel`、`#regionLabel`、资源 ID、进度 ID，但把 DOM 分区命名成 HUD。
- 保留 `#townView`、`#mapView` 两个主要模式，不新增竖屏四底部导航。
- `#routeList` 仍在地图模式内；如果 D 线程要求路线卡也能从地点页打开，可移动 DOM，但不能复制 ID。
- `#itemList`、`#languageList`、`#safetyList`、`#audioToggleButton`、`#motionToggle`、`#videoNote` 可整体放入右侧抽屉容器。
- `#logList` 可放入日志折叠区；地点页另加一个可选 `#latestLogPeek` 显示最近一条。

### 3. 需要少量 JS 调整的部分

JS 目标是“模式和抽屉”，不是玩法重写。

建议保留不动：

- `move(routeId)`
- `completeRoute(route)`
- `choose(index)`
- `resolveRouteEvent(index)`
- `resolveCrisis(index)`
- `applyDelta(delta, context)`
- `checkResourceFailure()`
- `renderStage(isTraveling)` 的主要逻辑
- `renderRoutes()`
- `renderMap()`
- `renderInventoryGrid()`
- 音频相关 `setupAudioElements()`、`unlockAudio()`、`updateAudioLayers()`

建议轻调：

- `setActiveView(view)`：
  - 继续支持 `"town"` / `"map"`。
  - 把 `"map"` 命名/文案视为“九州图模式”或“战略地图模式”，不扩成竖屏页导航。
  - 切到地图模式时，`document.body.dataset.view = "map"` 已经可用，可配合 CSS 改游戏框状态。

- 事件完成提示：
  - `renderEvent()` 中“请切到‘九州图’选择下一段旅程”改成“打开九州图模式选择下一段路”一类横屏游戏文案。

- 最近日志：
  - `renderStatus()` 可同步写 `#latestLogPeek.textContent = state.log[0] || ""`。
  - 完整 `#logList` 仍按现有 `state.log.map(...)` 渲染。

- 抽屉状态：
  - 如需行囊/日志/设置抽屉，新增很小的 UI 状态，例如 `activeDrawer = "" | "inventory" | "log" | "settings"`。
  - 抽屉只控制显示隐藏，不参与玩法状态，不写入存档也可以。

- 地图节点小型化：
  - 优先 CSS 完成。
  - 若小尺寸需要减少节点文字，可以让 `renderMap()` 在节点里增加更短的 `data-label` 或只保留 `strong`，但路线详情仍由 `renderRoutes()` 负责。

## 五、横向旅途舞台如何成为第一视觉

建议让 `#journeyStage` 成为地点模式的视觉核心，而不是一个上方横幅。

实现原则：

- 舞台面积优先：HUD 和行动区都为舞台让位。
- 舞台内保留三段信息：当前点、路线名、目标点。它们比外部页签更像游戏内提示。
- 车队图和背景层保持左到右叙事：当前 `traveling`/`interrupted` 状态应继续服务主流程。
- 地点事件和半途路遇都贴在舞台下方行动区，像游戏 UI，不像网页文章。
- 低神志污染层、日夜切换、地形切换继续由 `renderStage()` 控制，避免 UI 改造削弱核心气氛。

建议横屏布局比例：

```text
HUD：8%-10% 高度
舞台：52%-62% 高度
行动区：24%-32% 高度
右侧抽屉/状态：宽 56-260px，按尺寸折叠
```

在 1366x768、1280x720 下：

- 舞台高度建议约 390-460px。
- 行动区可以容纳地点志摘要、补给按钮、事件选项。
- 右侧可显示窄状态入口或打开式抽屉。

在 844x390、932x430 下：

- 舞台仍应是最大区域，不能被日志和行囊挤掉。
- HUD 必须非常轻，资源 chip 不显示长提示。
- 行动区文字要限高，选项按钮可横向两列或横向滚动。
- 右侧抽屉默认关闭，只保留入口。

## 六、九州图如何成为同一横屏游戏框内的战略地图模式

当前 `#mapView` 可以保留，但视觉上要从“另一个网页页”变成“游戏模式切换”。

建议模式结构：

```text
地点模式：
HUD + 横向旅途舞台 + 底部行动区 + 状态抽屉入口

九州图模式：
HUD + 横屏战略地图 + 路线卡比较区 + 状态抽屉入口
```

技术路径：

- 保留 `#mapView` 和 `setActiveView("map")`，避免重写模式切换。
- CSS 上让 `body[data-view="map"]` 或 `.map-view.active` 呈现为战略地图模式。
- `.map-panel` 去掉网页大卡片感，融入游戏框。
- `.kyushu-map` 占主要区域，当前点、可达点、锁定点必须清楚。
- `.map-route-panel` 保留 `#routeList`，用于比较路线消耗、风险、半途路遇和可观察补给。
- 点击 `.map-node[data-route]` 或 `.route-card[data-route]` 后仍调用 `move(routeId)`，并回到地点模式/旅途舞台。当前 `move()` 已调用 `setActiveView("town")`，这正适合“选路后回舞台行进”。

小横屏注意：

- `.map-node` 大卡片会拥挤，建议小尺寸下显示点位和短名。
- 路线卡不要堆太多文字；可保留核心行：目的地、消耗、风险、可观察补给，锁定原因可放第二行。
- 不能只显示 `#routeList` 而隐藏地图，否则会退回文字列表。

## 七、需要保留的玩法逻辑

以下能力必须保留，且实现时不应改数据结构：

- 路线选择：`routes`、`renderRoutes()`、`move(routeId)`。
- 半途路遇：`midEvent`、`routeEvents`、`state.pendingRoute`、`resolveRouteEvent()`。
- 补给：`locations[].supplies`、`renderSupplies()`、`useSupply(supplyId)`。
- 地点事件：`events`、`renderEvent()`、`choose(index)`。
- 行囊九宫格：`buildInventorySlots()`、`renderInventoryGrid()`、`#itemList.inventory-grid`。
- 音乐与动态：`audioAssets`、`audioToggleButton`、`motionToggle`、`updateAudioLayers()`。
- 死局/濒死补救：`crisisEvents`、`checkResourceFailure()`、`resolveCrisis()`。
- 测试接口：`window.BSI_PROTOTYPE.validate()`、`getView()`、`setView()`、`moveRoute()`、`chooseOption()`、`useSupply()`、`forceCrisis()`。

## 八、实现风险与规避

1. 横屏小尺寸高度很紧
   - 844x390 只有 390px 高，HUD、舞台、行动区必须极度克制。
   - 风险最大的是 `event-text`、地点志、日志、行囊一起撑高。
   - 规避：地点志摘要化，日志默认最近一条，行囊默认抽屉。

2. 车队位移用 `vw` 可能越过横屏游戏框
   - `.caravan.traveling { transform: translateX(52vw); }` 基于 viewport，不一定等于游戏框宽。
   - 规避：后续实现可改为使用容器相对位移，例如 `translateX(min(52vw, 620px))` 或 CSS 变量；验收时重点看 844x390 和 1366x768。

3. 地图节点在小横屏会重叠
   - 当前 `.map-node` 宽 132px，坐标又集中在路线图区域。
   - 规避：小尺寸下节点变成小点/短标签，路线详情交给 `#routeList`。

4. 只靠 CSS 隐藏可能导致 JS 渲染到不可见区
   - `#itemList`、`#logList`、`#routeList`、`#choiceList`、`#supplyList` 等 ID 只能存在一个。
   - 规避：移动 DOM 时保留唯一 ID，不复制节点。

5. 抽屉不要污染玩法状态
   - 行囊/日志/设置抽屉是 UI 状态，不应写入玩法存档。
   - 规避：用局部变量和 `body.dataset.drawer` 控制显示。

6. 音乐入口不能被藏死
   - 音频必须由用户点击解锁。
   - 规避：设置/行囊抽屉入口要清楚，`audioToggleButton` 保持可点击。

7. 不要回到竖屏底部四导航
   - 本轮明确作废竖屏方案。
   - 规避：不新增竖屏底部四导航，不按竖屏页面结构拆主流程。

## 九、后续实现验收清单

### 1. 语法与数据检查

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`
- 浏览器控制台执行 `window.BSI_PROTOTYPE.validate()`，确认 `ok: true`。
- 执行 `window.BSI_PROTOTYPE.getView()`、`setView("town")`、`setView("map")`，确认模式切换正常。

### 2. 核心流程 smoke

- 打开原型，第一眼是横屏游戏画幅，不是网页面板。
- 地点模式默认显示横向旅途舞台，车队和背景层正常。
- HUD 显示地点、日数、车轴、粮草、神志、距终点，不沉重。
- 可选择地点事件，资源变化、日志写入、按钮状态正常。
- 可使用补给，补给按钮变为已取，资源变化正常。
- 地点事件处理后，可打开九州图模式选择下一段路。
- 九州图模式显示地图节点、路线线段、可选路线卡。
- 路线卡显示目的地、消耗、风险、半途路遇、可观察补给、锁定原因。
- 点击路线后回到旅途舞台，车队从左向右移动。
- 半途路遇能中断、选择、继续抵达。
- 行囊九宫格可打开查看，但不常驻挤压舞台。
- 日志可复盘，但默认不抢主界面。
- 音乐按钮能启用/关闭，低神志层逻辑不破。
- `window.BSI_PROTOTYPE.forceCrisis("axle")` 可触发濒死补救并正常选择。

### 3. 指定尺寸验收

必须覆盖：

- 1366 x 768：桌面横屏预览，接近 16:9。
- 1280 x 720：桌面横屏预览，标准 16:9。
- 844 x 390：移动横屏小尺寸。
- 932 x 430：移动横屏较宽尺寸。

每个尺寸检查：

- 无横向滚动导致游戏框破裂。
- 游戏框居中或铺满当前横屏视口，比例稳定。
- 舞台是第一视觉，未被卡片、日志、行囊压住。
- HUD 不遮挡舞台和事件按钮。
- 底部行动区按钮触控高度不低于 44px。
- 事件文本、地点志、路线卡文字没有严重重叠。
- 九州图模式仍能看到地图，而不是只剩路线文字列表。
- 地图节点不互相遮挡到无法点击。
- 行囊九宫格打开后能关闭，不破坏主流程。
- 音乐/设置入口可达。

## 十、建议执行顺序

1. 等 D 线程输出并验收 `D_BSI-D-006_横屏手游界面方案.md`。
2. C 线程先做横屏游戏框 CSS：`body`、`.app-shell.game-landscape-shell`、HUD、舞台、行动区。
3. 再做 HTML 轻归组：HUD / 主模式区 / 行动区 / 右侧抽屉，保留所有关键 ID 唯一。
4. 再做九州图战略模式 CSS：地图主区 + 路线卡比较区。
5. 最后做 JS 轻调：文案、最近日志、抽屉状态，必要时微调 `setActiveView()`。
6. 跑语法检查、数据校验、核心流程 smoke。
7. 按 1366x768、1280x720、844x390、932x430 截图/人工验收。

## 十一、是否需要用户立即决策

按 `BSI-UX-007`，本阶段没有必须立刻打断用户的问题，可以先按横屏默认推进。后续 D/C 线程合并方案时，再集中请用户判断：

- 横屏比例优先 16:9，还是更接近 19.5:9 手机横屏。
- 右侧状态抽屉是否常驻一条窄栏。
- 九州图模式是完整切换舞台，还是覆盖在旅途舞台上。
- 行囊九宫格从右侧抽屉打开，还是从底部行动区打开。

技术上推荐先选最稳默认：16:9/接近 16:9 横屏游戏框、九州图完整切换为战略地图模式、行囊/日志/设置放右侧抽屉且默认关闭。
