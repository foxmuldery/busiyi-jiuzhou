# C_BSI-C-046 小横屏截图验收与版面修复回执

日期：2026-06-18  
执行线程：主协调 / C 技术原型  
目标：修复 844x390 横屏手机视口下，旅途页补给/选择区与地图页路线卡可能被裁切的问题。

## 1. 本轮改动

- `index.html`：静态资源版本号更新到 `20260618-c046`，避免浏览器继续读取旧 CSS / JS。
- `app.js`：补给列表增加 `data-count`，让 CSS 能按补给数量做一屏压缩。
- `styles.css`：小横屏下补给区改为固定头部 + 弹性按钮网格，2/3/4 个补给都可压入一屏；地图路线卡把 2 条路线也纳入双列压缩规则。
- `qa-check.js`：新增补给数量压缩、2 条路线压缩的静态合同检查。

## 2. 验收结果

### 2.1 844x390 旅途页

截图：

- [busiyi-p0-town-844x390-c046.png](/Users/yuanzhe/Documents/game/output/playwright/busiyi-p0-town-844x390-c046.png)

真实布局测量：

- 视口：844 x 390。
- 补给列表：`y=287`，`height=90`，`bottom=377`。
- 两个补给按钮均完整可见，底部未超过视口。
- 两个剧情选择均完整可见，底部未超过视口。

结论：通过。

### 2.2 844x390 地图页

截图：

- [busiyi-p0-map-844x390-c046.png](/Users/yuanzhe/Documents/game/output/playwright/busiyi-p0-map-844x390-c046.png)

真实布局测量：

- 视口：844 x 390。
- 路线列表：`y=129`，`height=248`，`bottom=377`。
- 当前截图中 2 条路线卡完整可见。
- 在浏览器状态续玩场景下，3 条路线卡也全部在 `bottom <= 375` 范围内。

结论：通过。

### 2.3 交互验证

流程：

1. 打开旅途页。
2. 点击顶部“地图”。
3. 验证地图页激活，路线列表可见。

结果：

- `activeView = mapView`
- `mapSelected = true`
- `routeListVisible = true`
- `routeCardCount = 3`

结论：通过。

## 3. 自动检查

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

截图文件确认：

```text
busiyi-p0-town-844x390-c046.png: 844 x 390
busiyi-p0-map-844x390-c046.png: 844 x 390
```

## 4. 当前判断

本轮解决了 P0-UI-001 中最关键的“小横屏真实浏览器截图验收”和“关键选择不被藏住”问题。

剩余 UI 风险：

- 旅途页底部仍然很紧凑，后续如果继续加文本，应优先进入弹窗或浮层，不要直接塞回主操作区。
- 地图页 3/4 条路线虽然能压入一屏，但每张卡只能保留关键资源、风险和补给预览，详细文本应继续留给弹窗或日志。

