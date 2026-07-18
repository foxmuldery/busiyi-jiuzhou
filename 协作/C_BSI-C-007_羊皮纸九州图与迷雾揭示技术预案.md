# C_BSI-C-007 羊皮纸九州图与迷雾揭示技术预案

项目：不思异：九州  
对应主协调任务：BSI-UX-009  
线程角色：C 线程 / Web Demo 技术原型与工具链工程师  
日期：2026-06-15  
阶段：第一阶段技术预案，不改代码

## 一、当前判断

当前原型不需要推倒重做。`index.html` 已有九州图容器、路线层、节点层和右侧路线卡；`data.js` 已有地点坐标、路线成本、风险、锁定条件和路遇事件；`app.js` 已有 `renderMap()`、`renderRoutes()`、`move()`、`completeRoute()`、`discoverLocation()`；`styles.css` 已有 `.current`、`.reachable`、`.pending`、`.locked`、`.future`、`.unknown` 等地图状态样式。

真正缺口是：现在 `renderMap()` 会遍历全部 `routes` 和全部 `locations`，只是用透明度区分未知区域。玩家实际能提前看见完整地图骨架，这不符合“羊皮纸山海图 + 迷雾揭示 + 到城后显影”的方向。

本轮建议的最小改造是：保留现有路线、补给、事件、危机和音频系统，只在地图可见性状态上加一层“已见 / 可达 / 雾中 / 锁定 / 已走”的判定。

## 二、现有能力如何复用

### 1. `renderMap()`

可复用：

- 继续用 `locations[].map.x/y/step` 作为节点坐标，不需要新增地图布局系统。
- 继续用 `routes[].from/to` 计算线段长度和角度。
- 继续用 `canUseRoute(route)` 判断可达和锁定。
- 继续用 `state.pendingRoute` 给半途路线加 `.pending`。
- 继续用现有 `mapRoutesLayer` 和 `mapNodeLayer` 两层 DOM，不需要改 HTML。

需要调整：

- 路线层不能再无条件渲染全部路线，应先判断 `routeVisibility`。
- 节点层不能再无条件渲染全部地点，应先判断 `locationVisibility`。
- 现有 `isKnown = from/to 任一已发现` 太宽，会让远方路线过早出现；应改成由 `revealedRoutes`、当前出发路线、已走路线和雾中提示共同决定。
- 现有 `isTraveled = from/to 都在 discoveredLocations` 只是推断，不足以区分“已走路线”和“被揭示但未走路线”。

### 2. `renderRoutes()`

可复用：

- 路线卡信息已经完整：目的地、消耗、风险、半途路遇、目的地补给、锁定原因。
- 继续由 `getRoutesFromCurrent()` 取得当前地点出发路线。
- 继续用 `canUseRoute(route)` 决定锁定态。
- 点击路线仍调用 `move(route.id)`，不改路线事件链路。

需要调整：

- `available` 不应等于当前地点全部出边，而应等于“当前地点已显现路线”。
- 如果抽卡池或揭示状态异常导致当前地点没有可用路线，必须有兜底：至少显示一条可推进路线或明确进入困境提示，不能静默无路。
- 锁定路线可以显示在路线卡里，但必须来自当前已显现池；不要提前把全图锁定路线都展示出来。

### 3. `state.discoveredLocations`

可复用：

- 继续代表“已抵达 / 已完整录入地点志”的城市。
- `discoverLocation(locationId)` 继续作为新城市显现和日志写入的入口。
- 地点志、发现数量、当前位置标题仍以它为依据。

需要收窄语义：

- 不建议把“雾中影子”和“可达但未抵达节点”放进 `discoveredLocations`。
- 否则地点志和发现数量会被提前点亮，破坏探索节奏。

### 4. `state.traveledRoutes`

当前代码里没有 `state.traveledRoutes` 字段。现在已走线是由 `from/to 都在 discoveredLocations` 推断出来的。

建议新增：

```js
traveledRoutes: []
```

用途：

- 在 `completeRoute(route)` 成功抵达时记录 `route.id`。
- 地图线条用它判断 `.traveled`，不再误把“两个城市都已显现但玩家没走过的路”画成已走车辙。
- 后续日志、成就、复盘也能直接读取真实路径。

## 三、最小实现方案

### 1. 节点显隐状态

第一版建议只做 5 类：

| 状态 | 判定 | CSS 类 | 行为 |
|---|---|---|---|
| 当前 | `location.id === state.currentLocation` | `.current` | 清晰朱印，可读全名 |
| 已见 | `state.discoveredLocations.includes(id)` | `.visited` | 清晰墨点，可读全名，可看地点志 |
| 可达 | 当前地点已显现路线的目的地且 `canUseRoute(route)` | `.reachable` | 可点，显示目的地与路线摘要 |
| 锁定 | 当前地点已显现路线的目的地但条件不足 | `.locked` | 可见不可走，显示锁定原因 |
| 雾中 | `state.hintedLocations.includes(id)` | `.fogged` / `.hinted` | 只显示影子、方向或残名，不显示完整补给 |

不在以上集合内的节点第一版直接不渲染，或渲染为 `aria-hidden` 的极淡纹理点。建议优先“不渲染”，能更稳定地避免玩家提前读图。

### 2. 路线显隐状态

第一版建议 5 类：

| 状态 | 判定 | CSS 类 | 行为 |
|---|---|---|---|
| 已走路线 | `state.traveledRoutes.includes(route.id)` | `.traveled` | 淡墨车辙，保留来路 |
| 当前可走 | 当前地点出发、已显现、可用 | `.reachable` | 朱砂线，可点路线卡 |
| 当前锁定 | 当前地点出发、已显现、条件不足 | `.locked` | 断线 / 封记，可显示原因 |
| 半途 | `state.pendingRoute?.routeId === route.id` | `.pending` | 蓝灰或停驻态，提示回旅途处理路遇 |
| 雾中路线 | 由 `routePools[].hints` 派生，或 `getHintedRouteIds()` 命中 | `.fogged` / `.unknown` | 虚线、低透明，只给方向感 |

需要注意：`revealedRoutes` 不等于可走路线。它只表示“这条路在地图上显影过”。是否可走仍由 `canUseRoute(route)` 决定。

### 3. 地图背景和雾层

不需要第一版新增 canvas 或复杂遮罩。继续使用 DOM + CSS：

- `.kyushu-map` 改为羊皮纸 / 帛书底色。
- `.map-grid` 从网格改成淡山川纹、旧折痕、墨点纹理。
- 新增 `.map-fog` 可选，但不是必须；更小实现是直接给雾中节点和路线加 `.fogged`。
- 新城市显现时给地图根或节点临时加 `.revealing`，用 CSS 做墨迹晕开、朱印落下、标签淡入。

## 四、建议新增字段

### 1. 必须新增

```js
state.traveledRoutes = []
```

记录真实走过的路线。抵达成功后写入。

```js
state.hintedLocations = []
```

记录雾中节点。只用于地图影子，不点亮地点志。

```js
state.revealedRoutes = []
```

记录已经显影的路线。路线卡和地图线条都从这里取可见性。

### 2. 建议新增，但第一版可很轻

```js
state.lastReveal = {
  locationIds: [],
  routeIds: [],
  at: 0
}
```

用途是给刚显现的城市和路线加一次 `.revealing` 动画。它不是玩法字段，丢失也不影响存档。

### 3. 不建议第一版新增为全局复杂字段

`fogLevel` 不建议第一版做成复杂状态表。原因：目前只有 8 个地点，雾层强弱完全可以由节点状态派生。

如果 D 线程后续需要多档雾，可以第二阶段再加：

```js
state.fogLevels = {
  thunder_marsh: 1,
  red_marsh: 2
}
```

但 C 线程第一版只建议用 `.fogged`、`.hinted`、`.revealing` 三个 CSS 状态解决。

### 4. 抽卡池字段

建议在 `data.js` 新增静态预制池，而不是修改现有 `routes[]` 语义：

```js
routePools: {
  central_post: {
    guaranteed: ["central_to_road"],
    candidates: ["central_to_pass"],
    hints: ["road_to_marsh", "pass_to_market"]
  },
  old_king_road: {
    guaranteed: ["road_to_marsh"],
    candidates: ["road_to_pass"],
    hints: ["marsh_to_red", "market_to_stele"]
  }
}
```

说明：

- `guaranteed`：至少显现一条能推进的路线。
- `candidates`：从中抽 0-2 条，形成随机感。
- `hints`：只显雾中路线或雾中节点，不进入路线卡。
- 现有 `routes[]` 仍是唯一真实路线定义，`midEvent`、`cost`、`risk`、`requireAny`、`lockedHint` 都不复制。

如果主线程想更小步，也可以先不写 `routePools`，直接用现有 `routes.filter(route.from === currentLocation)` 作为默认池；但为了服务“随机性和抽卡”，建议保留 `routePools` 这个数据口。

### 5. 初始状态和旧存档兼容

第一屏不能等玩家移动后才显路，所以需要一个“当前地点已揭示过”的初始化口径。

建议：

```js
initialStateTemplate: {
  discoveredLocations: ["central_post"],
  traveledRoutes: [],
  revealedRoutes: [],
  hintedLocations: [],
  lastReveal: null
}
```

然后在 `createInitialState()` 或 `normalizeState()` 后执行一次静默揭示：

```js
ensureRevealForCurrentLocation(state.currentLocation, { silent: true });
```

执行结果：

- 中原驿进入 `discoveredLocations`。
- 中原驿的 `guaranteed/candidates` 路线进入 `revealedRoutes`。
- 中原驿的 `hints` 终点进入 `hintedLocations`。
- 不写日志、不触发 `.revealing`，避免开局日志被系统动作刷屏。

旧存档兼容：

- 旧存档没有 `traveledRoutes` 时补空数组。
- 旧存档没有 `hintedLocations` 时补空数组。
- 旧存档没有 `revealedRoutes`，或当前地点没有任何已显现出边时，静默执行一次 `ensureRevealForCurrentLocation(currentLocation)`。
- 旧存档已有 `discoveredLocations` 不回退，不删除玩家已见城市。

## 五、显隐逻辑落地口径

### 1. 当前地点可见路线

`renderRoutes()` 建议从一个新纯函数取数，不直接操作抽卡池：

```js
function getVisibleRoutesFromCurrent() {
  const currentRoutes = getRoutesFromCurrent();
  const visible = currentRoutes.filter((route) => (
    state.revealedRoutes.includes(route.id)
    || state.traveledRoutes.includes(route.id)
    || state.pendingRoute?.routeId === route.id
  ));

  if (visible.length) return visible;
  return getFallbackRoutesForCurrent(currentRoutes);
}
```

说明：

- `renderRoutes()` 只关心“当前能展示哪些路线卡”。
- `getFallbackRoutesForCurrent()` 只在异常或旧存档缺字段时兜底，避免路线卡空白。
- 路线能不能点仍交给 `canUseRoute(route)`。

### 2. 路线可见性

`renderMap()` 的路线层建议先算 `visibility`：

```js
function getRouteVisibility(route) {
  const isPending = state.pendingRoute?.routeId === route.id;
  const isTraveled = state.traveledRoutes.includes(route.id);
  const isCurrent = route.from === state.currentLocation;
  const isRevealed = state.revealedRoutes.includes(route.id);
  const isHinted = getHintedRouteIds().includes(route.id);

  if (isPending) return "pending";
  if (isTraveled) return "traveled";
  if (isCurrent && isRevealed) return canUseRoute(route) ? "reachable" : "locked";
  if (isHinted) return "fogged";
  return "hidden";
}
```

`hidden` 路线不渲染。这样可以从根上解决“全图路线提前露出”的问题。

### 3. 节点可见性

节点层也先算 `visibility`：

```js
function getLocationVisibility(locationId) {
  const route = getVisibleRouteToLocationFromCurrent(locationId);

  if (locationId === state.currentLocation) return "current";
  if (state.discoveredLocations.includes(locationId)) return "visited";
  if (route) return canUseRoute(route) ? "reachable" : "locked";
  if (state.hintedLocations.includes(locationId)) return "fogged";
  return "hidden";
}
```

`hidden` 节点不渲染。`fogged` 节点渲染时不能使用完整地点志信息：

- `strong` 可以用 “雾中城影” / “西北残印” / B 线程提供的半显名。
- `span` 只显示方向或模糊提示。
- `small` 不显示 `formatSupplyScan(location.id)`，避免提前泄露补给。

### 4. `renderMap()` 复用方式

`renderMap()` 不需要改 DOM 结构，只替换判断层：

- 路线层：`routes.map()` 前先 `getRouteVisibility(route)`，`hidden` 返回空字符串。
- 节点层：`Object.values(locations).map()` 前先 `getLocationVisibility(location.id)`，`hidden` 返回空字符串。
- 原有坐标、线段角度、点击绑定、`data-route` 都继续用。
- 只有 `reachable` 路线目的地节点绑定 `data-route`；`locked` 节点可保留按钮样式但不绑定点击，或点击后只写锁定日志。

### 5. `renderRoutes()` 复用方式

`renderRoutes()` 的卡片结构继续保留，只替换 `available` 来源：

```js
const available = getVisibleRoutesFromCurrent();
```

其余字段继续复用：

- `formatCost(route.cost)`
- `formatRouteEventScan(route)`
- `getSupplySummary(route.to)`
- `formatSupplyScan(route.to)`
- `route.lockedHint`
- `route.hint`

如果路线目标只是雾中提示，不进入 `available`，所以不会出现在路线卡里。

## 六、抵达新城市时的状态更新

最佳插入点是 `completeRoute(route)`，因为它已经统一处理：

- 半途事件后继续抵达。
- 普通路线动画结束后抵达。
- 设置 `state.currentLocation = route.to`。
- 调用 `discoverLocation()`。
- 检查资源失败、写日志、保存、重渲染。

建议流程：

```js
function completeRoute(route) {
  // 保留现有抵达逻辑
  state.currentLocation = route.to;
  selectedRoute = null;
  state.pendingRoute = null;

  markRouteTraveled(route.id);
  discoverLocation(route.to);
  revealAroundLocation(route.to, route.id);

  // 保留现有危机、日志、saveState、render
}
```

`revealAroundLocation(locationId, arrivedByRouteId)` 做三件事：

1. 城显：确保 `locationId` 进入 `discoveredLocations`。
2. 路显：从 `routePools[locationId]` 或当前出边中抽出本轮可见路线，加入 `revealedRoutes`。
3. 雾散：把抽中路线的目的地加入“可达节点”；把 `hints` 的目的地加入 `hintedLocations`。

建议 CSS 类变化：

- 新抵达城市：`.map-node.current.revealing`
- 新可达城市：`.map-node.reachable.revealing`
- 新锁定城市：`.map-node.locked.revealing`
- 雾中节点：`.map-node.fogged`
- 新显现路线：`.map-route-line.reachable.revealing` 或 `.map-route-line.locked.revealing`
- 雾中路线：`.map-route-line.fogged`

动画不应阻塞玩法。`lastReveal` 只负责一轮视觉高亮，保存后丢失也没关系。

## 七、随机 / 抽卡第一版

第一版不要做程序生成世界。用预制池模拟抽卡即可。

建议规则：

1. 抽卡只决定“哪些既有路线显现”，不临时生成路线对象。
2. 被抽中的路线仍使用现有 `route.id`，所以 `move(routeId)`、`midEvent`、`routeEvents`、成本、风险、锁定条件都不变。
3. 每个地点至少有一条 `guaranteed` 路线。
4. `candidates` 可按简单种子随机抽 0-2 条；种子用 `state.runId + locationId + state.day`，保证一次存档内可复现。
5. `hints` 只用于雾中节点和雾中路线，不进入路线卡，不可点击。
6. 如果抽出的路线全部 `canUseRoute(route) === false`，自动补一条可用路线，或显示“困境 / 回返”路线；不能让玩家因为抽卡直接死局。
7. 不改变路线事件触发：`shouldTriggerMidEvent(route)` 仍按当前逻辑走。

最小保底口径：

- 至少 1 条可用前路。
- 最多 1 条锁定高收益路线。
- 至少 1 个雾中提示，让地图有“后面还有东西”的感觉。
- 当前资源任一项低于 20 时，优先抽低消耗或可补给路线。

## 八、需要保留的功能和禁止改动边界

必须保留：

- 路线选择：`routes`、`renderRoutes()`、`renderMap()`、`move(routeId)`。
- 抵达流程：`completeRoute(route)`，只允许加“记录已走 / 揭示周边”的薄钩子。
- 路遇：`midEvent`、`state.pendingRoute`、`resolveRouteEvent()`、`.interrupted`。
- 事件：`events`、`renderEvent()`、`choose(index)`、`getVisibleChoices()`。
- 补给：`locations[].supplies`、`renderSupplies()`、`useSupply(supplyId)`。
- 危机保底：`checkResourceFailure()`、`enterCrisis()`、`resolveCrisis()`、`enterHardFailure()`、`forceCrisis()`。
- 条件判断：`meetsCondition()`、`meetsAll()`、`meetsAny()`、`canUseRoute(route)`。
- 音乐和动态设置：`audioAssets`、`audioToggleButton`、`motionToggle`、`updateAudioLayers()`。
- 调试接口：`window.BSI_PROTOTYPE.validate()`、`getMapSummary()`、`setTestState()`、`moveRoute()`。

禁止改动：

- 不改路线成本、事件效果、危机阈值来配合地图视觉。
- 不把雾中节点写入 `discoveredLocations`。
- 不让 `renderMap()` 再提前展示全图。
- 不复制竞品星图节点、资源图标、线条结构和文本表达。
- 不引入复杂地图引擎、canvas 遮罩或生成式地图系统。
- 不删除现有路线、补给、事件、音频、行囊、日志功能。

## 九、后续实现步骤

1. 等主线程验收 A/D/C 三份方案后再执行代码。
2. 给 `initialStateTemplate` 增加 `traveledRoutes`、`hintedLocations`、`revealedRoutes`，并更新 `normalizeState()` 兼容旧存档。
3. 增加几个纯函数：`getVisibleRoutesFromCurrent()`、`getLocationVisibility(locationId)`、`getRouteVisibility(route)`、`revealAroundLocation(locationId)`。
4. 在 `completeRoute(route)` 中加入最小揭示钩子：记录已走路线、发现当前地点、抽取并显现周边路线、写入 `lastReveal`。
5. 改 `renderRoutes()`：只显示当前地点已显现路线；异常时走保底。
6. 改 `renderMap()`：只渲染可见节点和可见路线；为当前、已见、可达、锁定、雾中、已走、半途加清晰 CSS 类。
7. 改 `styles.css`：把地图底改成羊皮纸舆图，把节点从矩形卡片压成点位 / 朱印 / 残名，把雾中节点和路线做虚化。
8. 如采用 `routePools`，先用当前 8 个地点和 9 条路线配置静态池，不新增玩法内容。
9. 更新 `window.BSI_PROTOTYPE.getMapSummary()`，输出当前可见节点、可见路线、雾中节点、已走路线，方便测试。
10. 桌面和小横屏都验收后，再考虑第二阶段的多档雾、更多路线池和更强动画。

## 十、测试清单

### 1. 静态检查

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`
- 浏览器执行 `window.BSI_PROTOTYPE.validate()`，确认 `ok: true`。
- 旧存档存在时，`normalizeState()` 能补齐新字段，不白屏。

### 2. 初始状态

- 开局只完整显示中原驿。
- 只显示中原驿当前可走路线和少量雾中提示。
- 不提前显示九州裂隙、赤水外滩、巫咸断碑等完整信息。
- 地点志数量仍是 `见闻 1 / 8`，雾中节点不计入见闻。

### 3. 抵达揭示

- 选择 `central_to_road` 后，抵达故王道。
- `state.traveledRoutes` 记录 `central_to_road`。
- `state.discoveredLocations` 增加 `old_king_road`。
- 故王道出发路线显现。
- 更远节点只以雾中状态出现。
- 新显现城市和路线出现 `.revealing` 动画类。

### 4. 可达与锁定

- 可用路线节点可点，点击仍进入 `move(routeId)`。
- 锁定路线显示锁定原因，但不消耗资源、不进入半途事件。
- 低神志或获得旗标后，`red_to_rift` 这类 `requireAny` 路线能从锁定变为可达。

### 5. 路遇与危机不回归

- 有 `midEvent` 的路线仍会半途停下。
- 处理路遇后仍会 `completeRoute(route)` 并触发揭示。
- 资源归零仍进入濒死补救。
- 濒死补救后如还在半途，仍能继续抵达。

### 6. 抽卡与保底

- 同一存档同一地点重复刷新不会重新乱抽，避免路线闪烁。
- 新开局可以有轻微不同的显现组合。
- 不出现“当前地点无可用路线”。
- 当前资源低于 20 时，不连续只给高消耗路线。
- 锁定高收益路线最多展示 1 条，避免路线卡被锁死信息刷屏。

### 7. 画幅验收

- 1366 x 768：九州图第一眼是羊皮纸舆图，不是深色星图。
- 1280 x 720：路线卡仍可读，地图节点不遮挡。
- 932 x 430：节点短标签不重叠，路线卡横滑正常。
- 844 x 390：雾中节点只保留影子和短名，不挤爆地图。

## 十一、给其它线程的接收与输出口径

给 A 线程：

- C 线程建议接收 `routePools` 的池结构、保底规则、低资源优先级。
- A 线程不需要设计程序生成路线，第一版只要给每个地点的 `guaranteed/candidates/hints` 口径即可。

给 B 线程：

- C 线程需要雾中节点的短文本，不要直接用完整地名。
- 建议 B 线程给每个地点准备 `fogName`、`halfName`、`revealText` 三类短文本；第一版可选，不阻塞 C 实现。

给 D 线程：

- C 线程会输出 `.current`、`.visited`、`.reachable`、`.locked`、`.fogged`、`.traveled`、`.pending`、`.revealing` 这些 CSS 状态。
- D 线程可以围绕这些类定义羊皮纸视觉，不需要改玩法 DOM。

给 E 线程：

- C 线程只借鉴“大界面路线决策压力”，不会复制星图、星球、太空图标、资源 UI。
- 风险避让重点是地图视觉和路线卡文案，不是代码结构。

给 F 线程：

- 第一版可预留音效触发点：`map_open`、`fog_reveal`、`city_reveal`、`route_reveal`、`route_locked`。
- 这些触发点后续应接在揭示函数和路线点击反馈上，不影响 `move()` 的资源消耗逻辑。

## 十二、主要风险

1. `discoveredLocations` 现在承担“已发现”和“已到达”的混合含义；新增雾中节点后必须收窄它，否则地点志会提前暴露。
2. 当前没有 `traveledRoutes`，如果不新增，已走路线会和已显现路线混在一起。
3. `renderMap()` 目前无条件遍历全量数据；改可见性时必须保证调试、点击和小横屏都不白屏。
4. 抽卡如果直接改 `routes[]` 会破坏路遇和事件引用；必须只抽 route id，不复制路线对象。
5. CSS 雾效如果做太重，小横屏会看不清路线决策；第一版应先清晰可玩，再加质感。

## 十三、是否有必须用户决策的问题

本阶段没有必须立即打断用户的问题，可按以下默认执行：

- 可达节点第一版显示真实地名和路线卡信息，保证资源 / 风险决策清楚。
- 雾中节点只显示影子、方向或残名，不显示完整补给。
- 抽卡第一版用预制 `routePools`，不做程序生成世界。
- `traveledRoutes`、`hintedLocations`、`revealedRoutes` 作为最小新增状态。

后续如果 D 线程希望“可达节点也不显示完整地名，只显示方位”，那属于视觉 / 信息颗粒度选择，可以在代码执行前由主线程统一拍板。
