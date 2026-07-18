# BSI-UX-013 主线程验收记录

- 验收对象：小横屏 UI、半随机显影、地图音效钩子、补给预览
- 验收时间：2026-06-15
- 验收人：主协调线程
- 结论：通过，可进入下一轮“素材接入与第一章试玩打磨”

## 1. 子线程交付物

- A：[A_BSI-A-008_半随机显影与保底规则.md](/Users/yuanzhe/Documents/game/协作/A_BSI-A-008_半随机显影与保底规则.md)
- B：[B_BSI-B-009_路线签显影与低神志短文案.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-009_路线签显影与低神志短文案.md)
- C：[C_BSI-C-010_小横屏与半随机显影实现回执.md](/Users/yuanzhe/Documents/game/协作/C_BSI-C-010_小横屏与半随机显影实现回执.md)
- D：[D_BSI-D-011_小横屏UI返工单.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-011_小横屏UI返工单.md)
- E：[E_BSI-E-007_随机显影与UI打磨风险复核.md](/Users/yuanzhe/Documents/game/协作/E_BSI-E-007_随机显影与UI打磨风险复核.md)
- F：[F_BSI-F-008_地图音效接入规格.md](/Users/yuanzhe/Documents/game/协作/F_BSI-F-008_地图音效接入规格.md)

## 2. 代码变更范围

- Web Demo 原型：[index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- 核心逻辑：[app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- 数据配置：[data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)
- 样式：[styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)

主要合入内容：

- `routePools` 半随机显影池：每个地点拆分 `requiredRoutes`、`optionalRoutes`、`fogPool`。
- 同一局同一地点显影稳定保存，新开局可有不同支线或雾中远影。
- 必经路线不参与随机隐藏，`red_marsh` 保留 `red_to_stele` 作为干净出口。
- 雾中地点和雾中路线只作为远影提示，不进入可点击路线。
- 小横屏 UI 压缩：路线卡、补给按钮、地图节点状态、距离标签和 HUD 密度。
- 地图音效钩子：`mapOpen`、`mapReveal`、`locationArrive`、`routeSelect`、`supplyComplete`。
- 补给预览区分目的地资源方向、已补状态和当前抵达补给限制。

## 3. 主线程验收结果

### 语法检查

- `node --check app.js`：通过。
- `node --check data.js`：通过。

### 数据与引用检查

独立数据检查结果：

```json
{
  "ok": true,
  "locations": 14,
  "routes": 33,
  "routePools": 14,
  "requiredPathSeen": [
    "central_post",
    "old_king_road",
    "thunder_marsh",
    "red_marsh",
    "broken_stele",
    "kyushu_rift"
  ],
  "errors": [],
  "warnings": []
}
```

检查通过项：

- `routePools` 引用的路线和地点均存在。
- 每个路线池的可见路线均从当前地点出发。
- 雾中提示引用合法，且不会直接混入当前可点击路线。
- 从 `central_post` 到 `kyushu_rift` 的必经保底路径存在。
- `red_marsh` 必含 `red_to_stele`，`red_to_rift` 不会成为唯一出口。

### 音效钩子

当前音频钩子状态：

```json
{
  "mapOpen": "missing",
  "mapReveal": "missing",
  "locationArrive": "missing",
  "routeSelect": "demo-temporary",
  "supplyComplete": "demo-temporary"
}
```

结论：

- 音效钩子已经接入数据结构。
- 地图打开、显影、抵达地点三个音效槽位允许缺素材，并保持静默可玩。
- 路线选择和补给完成当前使用临时交互音。

### 小横屏 UI

主线程复核通过：

- 小横屏 media block 已存在：`max-height: 520px` 且横屏时生效。
- 路线卡改为浅羊皮纸底、深色文字，修复黑底低对比问题。
- 路线卡字段压缩为路签式信息：路线名、路径、消耗、风险、补给预览、提示。
- 距离标签在小横屏显示为 `裂隙X段`。
- 补给按钮使用短状态：`可`、`已`、`本`。
- 地图节点区分当前、可达、雾中、锁定状态。
- 主线程此前在 844x390 复核中发现 `设置` 按钮右缘到 847px，超出 844px 视口 3px。
- 已收窄低高度横屏 HUD：三列宽度、旅程区列宽、按钮 padding、按钮字号和工具按钮间距。
- 按本次 CSS 尺寸预算，右侧按钮区至少回收 23px，`设置` 按钮右缘预估从 847px 收至 824px，可回到 844px 视口内。

环境限制说明：

- 主线程尝试过内置浏览器与本机缓存 Playwright；内置浏览器返回不可用，Chromium 启动受当前权限/额度限制阻断。
- 因此本轮不能补拍修复后的真实截图；下一次权限恢复后优先补 844x390 与 932x430 两张确认图。

## 4. 风险复核

通过项：

- 没有新增星图、星球节点、发光航线、科幻扫描等 Out There 视觉符号。
- 路线卡表达为路引签/驿牒方向，未变成飞船星系卡。
- 音频命名与接入方向保持纸、墨、风、车轴、山海异象，不转向西部或科幻。

待留意：

- 当前存在并行新增的“古辞”抽屉和概念预告文档，暂不进入第一版 P0 验收范围。
- 宣传/预告工作应继续降级为旁支，不干扰“先让机制跑起来”的主线。

## 5. 返工与下一轮建议

本轮无阻断返工。

下一轮建议进入 BSI-UX-014：

1. 接入用户素材：优先让横向旅途舞台更像“路上”，而不是继续加系统说明。
2. 权限恢复后补拍真实浏览器小横屏复核：844x390、932x430、1280x720 三档。
3. 打磨第一章试玩节奏：每 1-2 段路出现一次半途事件，不要全靠到城镇才互动。
4. 音频最小闭环：先补 `mapOpen`、`mapReveal`、`locationArrive` 三个短音效。
5. 保持 P0：路线选择、补给、地点志、行囊九宫格、神志污染文本。
