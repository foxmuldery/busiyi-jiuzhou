# C_BSI-C-008 实现回执

项目：不思异：九州  
线程角色：C 线程 / Web Demo 技术实现  
日期：2026-06-15  
状态：已完成首版实现与验证

## 一、本轮改动文件

- `GitHub资产区/03_WebDemo/prototype/data.js`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`

`index.html` 本轮未改动，原有关键 DOM 结构继续复用。

## 二、实现内容

1. 新增地图揭示状态：
   - `traveledRoutes`：真实走过的路线，用于旧车辙。
   - `revealedRoutes`：已经显现的当前可选路线。
   - `hintedLocations`：雾中节点，不进入地点志。
   - `hintedRoutes`：雾中道路影，不进入路线卡。
   - `lastReveal`：记录本轮显影节点和路线，用于 CSS 动画。

2. 新增 `revealPlan` 与 `fogLabels`：
   - 用预制显现计划模拟抽卡。
   - 开局稳定显示中原驿两条教学路线。
   - 抵达新城后显示当前一跳路线，并追加 1-3 个雾中远影。

3. 改造 `renderMap()`：
   - 未入图节点和路线不再渲染。
   - 只显示当前、已见、可达、锁定、雾中、已走、半途状态。
   - 雾中节点使用短标签和雾中提示，不泄露完整补给。

4. 改造 `renderRoutes()`：
   - 路线卡只显示当前地点已显现路线。
   - 保留路线名、去向、资源消耗、风险、半途路遇、目的地补给倾向和锁定原因。

5. 抵达新城市后触发显影：
   - `completeRoute(route)` 记录 `traveledRoutes`。
   - 新地点进入 `discoveredLocations`。
   - 调用揭示计划，刷新可达路线和雾中远影。
   - 新节点 / 新路线获得 `.revealing` 动画类。

6. 视觉改造：
   - 九州图改为羊皮纸山海舆图质感。
   - 路线改为朱砂线、淡墨车辙、断墨锁线、雾中虚线。
   - 节点改为地名签 / 朱印 / 残影，不再像深色星图节点。
   - 路线卡改为路引签风格。

7. 主选项卡住修复：
   - 地点事件处理后新增“打开九州图”按钮。
   - 玩家可以从主选项区直接进入下一段路线选择。

## 三、验证结果

### 静态检查

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`：通过。
- 关键 DOM id 静态检查：通过，`kyushuMap`、`mapRoutesLayer`、`mapNodeLayer`、`routeList`、`townViewButton`、`mapViewButton`、`eventText`、`choiceList`、`supplyList`、`itemList`、`audioToggleButton`、`motionToggle` 均存在。

### 浏览器验证

验证入口：临时本地静态服务 `http://127.0.0.1:8765/index.html`，验证后已关闭服务。

开局进入九州图：

- 地图显示中原驿、故王道、废关、西北泽气、日中市影，共 5 个节点。
- 路线卡只显示 `central_to_road`、`central_to_pass` 两条当前可走路线。
- 路线层显示 2 条可走线和雾中道路影，没有全图暴露。
- 地图背景已是羊皮纸旧图风格，不是深色网格星图。

移动验证：

- 点击 `central_to_road` 后进入半途路遇。
- 处理路遇后抵达故王道。
- 中原驿变为已见节点。
- `central_to_road` 变为已走路线。
- 故王道成为当前显影节点。
- 雷泽浅畔、废关成为可达路线目标。
- 赤水红影作为雾中节点出现。

主事件验证：

- 重开后处理当前地点事件。
- 主选项区出现“打开九州图”按钮。
- 点击后能进入九州图，看到 2 张路线卡和 5 个节点。

浏览器控制台：

- `error / warn` 日志为空。

## 四、保留功能

- 横屏游戏框架未重写。
- 地点页、事件选择、补给、行囊九宫格、日志、音乐入口保留。
- `move()`、`completeRoute()`、`resolveRouteEvent()`、`choose()`、`checkResourceFailure()` 等玩法链路只做最小接入，没有重写数值和事件语义。

## 五、未完成风险

1. 当前使用预制 `revealPlan`，还不是完整权重抽卡；首版足够验证显隐机制，后续可接 A 线程更细的权重和保底。
2. 雾中路线现在仍按真实坐标画断续影线，会给一点方向关系；如果 D/E 线程认为仍显得过于明确，可进一步只画短线影而不是完整两点连线。
3. 浏览器验证时部分外部素材路径因临时服务根目录不同出现 404，但这属于既有相对资源路径问题，不影响本轮地图 JS/CSS 逻辑；原型本身有素材加载失败回退。
4. 地图专用音效未接入新素材；本轮按 F 线程建议先用 CSS 显影和现有选择音，不阻塞核心玩法。
