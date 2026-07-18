# 主协调 BSI-UX-050 地图节点补给徽记与横屏验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 九州图节点、路线选择、横屏手游界面

## 1. 本轮目标

让九州图更接近 Out There 式战略选择：玩家不只在路线卡里看到目的地资源，也能在地图节点上直接扫到该地点可能补什么。

本轮只改 UI 情报呈现，不改变路线、补给、随机事件和平衡数值。

## 2. 已完成改动

### 2.1 地图节点新增补给徽记

文件：`GitHub资产区/03_WebDemo/prototype/app.js`

新增：

- `getAvailableSupplyGain(locationId)`
- `getMapNodeSupplyItems(locationId)`
- `renderMapNodeSupplyStrip(locationId)`

可见地点节点现在会显示资源小章，例如：

- `轴+8`
- `粮+8`
- `轴+11`

雾中节点仍然不显示补给，保持探索感。

### 2.2 小横屏压缩显示

文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

新增：

- `.map-node-supply-strip`
- `.map-node-supply-chip`
- 小横屏下节点资源章只显示前两类资源

资源章挪到节点上沿，避免被地图纹理吃掉，也避免和右侧路线面板重叠。

### 2.3 缓存与 QA

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

已更新：

- 版本号：`20260621-c133`
- QA 新增地图节点补给徽记契约

## 3. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

## 4. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=map&verify=c133-map-node-supply-2`

测试视口：`960x540`

验收路径：

1. 干净新局进入九州图。
2. 处理起点事件。
3. 回到地图选路状态。
4. 查看节点补给徽记。
5. 点击 `故王道` 节点。

验收结果：

- 地图节点出现资源徽记：`轴+8`、`粮+8`、`轴+11`、`轴+16`。
- 可见资源徽记数量：4。
- 资源徽记不与右侧路线面板重叠。
- 页面无横向溢出。
- 页面无纵向溢出。
- 点击 `故王道` 节点后正常进入半途路遇 `当康啼垄`。
- 浏览器日志无 error / warning。

备注：浏览器截图接口在本轮最终截图阶段超时，但页面状态、DOM 位置、点击流和控制台日志均已完成验证；前一轮地图截图已确认路线面板与节点布局可见。

## 5. 结论

BSI-UX-050 已通过。九州图节点现在能提供更直接的补给情报，玩家可以在地图层先判断“去那里大概补什么”，再看路线卡比较消耗、风险和路遇。

## 6. 下一步建议

下一步可以继续做“误点保护”：

1. 点击路线卡或节点先短暂高亮路线。
2. 再点同一路线才出发，或在卡片内显示一个小的“启程”确认。
3. 保持触屏操作简洁，不新增大弹窗。
