# C_BSI-C-011 半途路遇与舞台素材实现回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-15  
> 范围：`GitHub资产区/03_WebDemo/prototype/` 静态 Web Demo

## 1. 本轮改动

- `data.js`
  - 新增 `stageAssets`：按 `terrainProfiles` 和 `locationProfiles` 建立地点/地形到背景、前景、污染层、车队层的映射。
  - 合入 B 线程 `B_BSI-B-010` 的 10 个半途路遇草案，保持现有 `routeEvents` 结构，只使用 `tag: "路遇"`，未新增 `tags` 数组。
  - 扩展路线 `midEvent` 覆盖：当前 29 条路线带半途路遇，主线前半段 `central_to_road`、`road_to_marsh`、`marsh_to_red` 均会遇到。
  - 按主线程补充的 F-009 决策接入三短音效临时素材：`mapOpen`、`mapReveal`、`locationArrive` 全部标记 `demo-temporary`，不标 `cleared`。

- `app.js`
  - 新增舞台 profile 解析和应用逻辑：出发、半途停下、抵达时根据当前/目标地点更新舞台分层素材。
  - 新增 `validateStageAssets()`，把舞台映射纳入 `window.BSI_PROTOTYPE.validate()` 的等价数据校验范围。
  - 新增 `getStageSummary()`，便于下一轮浏览器复核时直接读取当前舞台 profile。
  - 给新增 flag 补了行囊短标签：`wenao_trace`、`xuan_shell`、`false_name_echo`、`fox_tail_mark`、`scale_price`、`bone_rut`、`dream_smoke`。

- `styles.css`
  - 舞台背景、前景、氛围、污染层改为 CSS 变量驱动；旧地形样式保留为兜底。
  - 车队仍是独立前景层，当前安全使用已抠图 `CAR-005`；绿幕车队候选未直接接入，避免出现绿底。

## 2. 关键结论

- 半途路遇密度已超过主线程最低要求：`midEventRouteCount = 29`，不少于 6 条。
- 路遇事件总数为 13 个：保留原 3 个，新增 B 线程 10 个。
- 舞台映射已覆盖 14 个地点和 4 类地形；背景不烘焙车队，车队仍由独立 `caravan-art` 层显示。
- 三短音效已接临时占位素材，且沿用原有缺素材静默/失败跳过逻辑。

## 3. 验证结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- 等价数据检查：通过。
  - `midEventRouteCount`: 29
  - `routeEventCount`: 13
  - `stageProfileCount`: 11
  - `mappedLocations`: 14
  - `mappedTerrains`: 4
  - `mapOpen/mapReveal/locationArrive`: 均为 `demo-temporary`，文件路径存在，音量在主线程指定范围内。
- `git diff --check`：通过；无空白错误。

## 4. 残余风险

- 内置 Browser 拒绝打开 `file://` 本地页面，原因是 Browser URL 安全策略；本轮未做真实画面截图复核。
- `mapReveal` 临时复用神志告警音，语义可用但不是最终纸雾显影声音；发布前仍需 F 线程替换或复核。
- 车队层暂用 `CAR-005` 抠图初版；`CAR-006` 到 `CAR-012` 仍是绿幕源图，本轮未做前端抠绿。
- 舞台 profile 已接入，但不同地点的构图裁切仍需下一轮在 844x390、932x430、1280x720 下肉眼复核。
