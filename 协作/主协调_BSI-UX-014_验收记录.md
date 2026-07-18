# BSI-UX-014 主线程验收记录

- 验收对象：半途路遇节奏、旅途舞台素材映射、地图三短音效
- 验收时间：2026-06-15
- 验收人：主协调线程
- 结论：通过，可进入下一轮“第一章试玩手感与真实浏览器复核”

## 1. 子线程交付物

- A：[A_BSI-A-009_半途路遇触发与资源节奏表.md](/Users/yuanzhe/Documents/game/协作/A_BSI-A-009_半途路遇触发与资源节奏表.md)
- B：[B_BSI-B-010_第一章半途路遇事件包.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-010_第一章半途路遇事件包.md)
- C：[C_BSI-C-011_半途路遇与舞台素材实现回执.md](/Users/yuanzhe/Documents/game/协作/C_BSI-C-011_半途路遇与舞台素材实现回执.md)
- D：[D_BSI-D-012_旅途舞台素材分层应用规则.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-012_旅途舞台素材分层应用规则.md)
- E：[E_BSI-E-008_半途路遇与素材接入风险复核.md](/Users/yuanzhe/Documents/game/协作/E_BSI-E-008_半途路遇与素材接入风险复核.md)
- F：[F_BSI-F-009_地图三短音效最小接入包.md](/Users/yuanzhe/Documents/game/协作/F_BSI-F-009_地图三短音效最小接入包.md)

## 2. 代码变更范围

- 原型目录：[GitHub资产区/03_WebDemo/prototype](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype)
- 核心逻辑：[app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- 数据配置：[data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)
- 样式：[styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)

主要合入内容：

- 路线半途事件扩展到 29 条路线，第一章主线前半段均可遇到半途路遇。
- 路遇事件扩展到 13 个，选择均有资源、旗标或语言等真实效果。
- 舞台素材改为地点 / 地形 profile 映射，覆盖 14 个地点和 road / market / water / rift 四类地形。
- 车队仍是独立层，不烘焙进背景图。
- `mapOpen`、`mapReveal`、`locationArrive` 三个地图音效槽位已接入临时占位素材，状态均为 `demo-temporary`。

## 3. 主线程验收结果

### 语法检查

- `node --check app.js`：通过。
- `node --check data.js`：通过。

### 数据与引用检查

结构化复核结果：

```json
{
  "ok": true,
  "routes": 33,
  "midEventRoutes": 29,
  "routeEvents": 13,
  "stageProfiles": 11,
  "mappedLocations": 14,
  "mappedTerrains": 4,
  "errors": [],
  "warnings": []
}
```

主线前半段半途路遇覆盖：

```text
central_to_road
road_to_marsh
marsh_to_red
```

补给逻辑：

- `state.pendingRoute` 存在时，补给区显示“车队停在半途，无法搜集城镇补给。”
- `useSupply()` 在半途路遇状态直接返回，不允许玩家绕过路遇搜集城镇补给。

### 舞台素材映射

检查通过项：

- 14 个地点均有 `locationProfiles` 映射。
- 4 类地形均有 `terrainProfiles` 映射。
- `background`、`foreground`、`atmosphere`、`pollution`、`caravan` 引用的本地文件均存在。
- 非车队层未引用 `车队` 或 `CAR-` 文件，避免背景自带车队。
- 缺素材时仍保留旧 CSS 地形层兜底。

### 音效槽位

当前音频槽位状态：

| key | 状态 | 文件存在 | 说明 |
|---|---|---:|---|
| `mapOpen` | `demo-temporary` | 是 | 地图打开占位音 |
| `mapReveal` | `demo-temporary` | 是 | 显影占位音，暂用异象/低频污染感 |
| `locationArrive` | `demo-temporary` | 是 | 抵达地点占位音 |
| `routeSelect` | `demo-temporary` | 是 | 旧有路线选择音保留 |
| `supplyComplete` | `demo-temporary` | 是 | 旧有补给完成音保留 |
| `musicLoop` | `review-pending` | 是 | 已导入音乐候选，仍需用户确认授权与听感 |

结论：

- 三个地图短音效已从 `missing` 进入临时可用状态。
- 所有临时音效均未标为 `cleared`，符合 F/E 线程授权边界。
- 缺音频或播放失败仍由现有 `playSfx()` 容错处理，不阻断路线、显影或抵达。

### 小横屏复核

已完成：

- 语法与数据层通过。
- 844x390 下此前发现 `设置` 按钮右缘越界 3px；已在 UX-013 收窄低高度横屏 HUD，按 CSS 预算至少回收 23px。

限制：

- 当前环境内置浏览器不可用。
- Playwright Chromium 启动受权限/额度限制阻断。
- 因此 UX-014 的真实截图仍需在权限恢复后补拍。

## 4. 风险复核

通过项：

- 没有新增星图、星球节点、发光航线、科幻扫描 UI。
- 没有引入西部牛仔、枪、酒馆、马车驿站等具体西部符号。
- 半途路遇没有变成 Darkest Dungeon 式英雄队列、压力条或战斗站位。
- 舞台没有变成 FAR 式载具剖面或驾驶谜题。
- 音频与素材均保持 `demo-temporary` / `review-pending`，没有伪造正式授权。

## 5. 返工与下一轮建议

本轮无阻断返工。

下一轮建议进入 BSI-UX-015：

1. 权限恢复后补拍 844x390、932x430、1280x720 三档真实截图。
2. 主线程组织一次 5 分钟第一章试玩，记录玩家是否理解“地点停靠 / 九州图选路 / 半途路遇 / 抵达”。
3. F 线程继续生成或筛选专用 `MAP-OPEN-001`、`MAP-FOG-001`、`CITY-ARRIVE-001`，替换程序占位音。
4. C 线程只做小修：修复试玩中暴露的点击、遮挡、状态提示问题，不引入新系统。
5. B/D 线程继续把地点志、半途路遇和舞台氛围磨成“山海经亮点”，不要转向宣传页。
