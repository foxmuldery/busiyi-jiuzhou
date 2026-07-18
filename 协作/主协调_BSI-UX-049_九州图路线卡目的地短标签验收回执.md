# 主协调 BSI-UX-049 九州图路线卡目的地短标签验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 九州图路线卡、横屏路线决策、自动验收

## 1. 本轮目标

继续提升 Out There 式路线选择的清晰度。上一版路线卡已经显示资源消耗、风险、半途路遇、补给预览，但在小横屏压缩后，玩家需要同时看地图节点和路线卡，才能确认每张卡具体“去哪里”。

本轮目标：

1. 每张路线卡直接显示目标地点。
2. 不增加滚动，不破坏所有路线一屏显示。
3. 不改变路线成本、随机路遇、半途事件等机制。

## 2. 已完成改动

### 2.1 路线卡新增目的地短标签

文件：`GitHub资产区/03_WebDemo/prototype/app.js`

每张路线卡新增：

```html
<span class="route-destination"><b>至</b>目标地点</span>
```

例如：

- `至故王道`
- `至废关`

### 2.2 路线卡目的地样式

文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

新增并压缩：

- `.route-destination`
- `.route-destination b`
- `.map-route-panel .route-card .route-destination`
- 三到四条路线状态下的更小尺寸规则

目的地短标签使用圆角小章，不与资源消耗、风险符号、补给符号混在一起。

### 2.3 缓存与 QA

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

已更新：

- 版本号：`20260621-c130`
- QA 新增“路线卡目的地短标签”结构与样式契约

## 3. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

## 4. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=map&verify=c130-route-destination`

测试视口：`960x540`

验收路径：

1. 干净新局进入九州图。
2. 处理起点事件。
3. 关闭结果弹窗，进入可选路线状态。
4. 查看路线卡。
5. 点击第一张路线卡。

验收结果：

- 路线卡显示 `至故王道` / `至废关`。
- 路线卡仍显示资源消耗、风险、半途路遇、补给预览。
- 路线面板没有整体滚动。
- 页面无横向溢出。
- 页面无纵向溢出。
- 点击路线后正常进入旅途/半途路遇。
- 浏览器日志无 error / warn。

## 5. 结论

BSI-UX-049 已通过。路线卡从“风险符号集合”进一步变成“明确目的地 + 资源消耗 + 风险/补给情报”的决策卡，更接近 Out There 式路线选择。

## 6. 下一步建议

下一步可以继续优化路线卡的符号可读性：

1. 给 `遇 / 异 / 救 / 补` 增加更稳定的颜色分层。
2. 在点击路线前提供一个轻量确认或长按详情，避免玩家误点。
3. 后续地图节点可加入“已见闻 / 未见闻 / 可补给类型”的更明确小图标。
