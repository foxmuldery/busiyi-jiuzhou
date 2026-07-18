# F_BSI-F-008 地图音效接入规格

> 子线程：F，音乐音效、视频和动态资产落地  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-15  
> 边界：本文件只写接入规格，不修改代码，不导入素材。  
> 依据：`主协调_BSI-UX-013_小横屏打磨与半随机显影推进指令.md`、`F_BSI-F-007_第一章音频动态落地任务包.md`、当前 `data.js` / `app.js`。

## 0. 本轮结论

地图音效先按“语义 key”接，不按文件名写死。C 线程只需要调用 `mapOpen`、`mapReveal`、`locationArrive`、`routeSelect`、`supplyComplete`、`sanityLow` 这 6 个 key；素材处于临时、正式、缺失任一状态时，都不能阻断路线、补给、显影和结局。

建议先接顺序：

1. `mapReveal`：雾散、城显、路显共用，是九州图最核心反馈。
2. `mapOpen`：进入九州图时建立“打开舆图”的状态切换。
3. `locationArrive`：抵达地点时给朱砂印落点感。

`routeSelect`、`supplyComplete`、`sanityLow` 当前已有可复用占位素材，可同步低成本接上。

## 1. 音频 key 定义

| 游戏触发 | 建议 `audioAssets` key | 临时素材 / 复用 | 正式素材建议 ID | 类型 | 音量建议 | 备注 |
|---|---|---|---|---|---:|---|
| 地图打开 | `mapOpen` | 可先缺素材；不建议硬复用现代点击音 | `MAP-OPEN-001` | sfx | 0.20-0.26 | 纸卷展开、轻木轴、旧纸摩擦。进入九州图时播放。 |
| 雾散显影 | `mapReveal` | 待生成，缺素材时静音跳过 | `MAP-FOG-001` | sfx | 0.14-0.22 | 覆盖雾散、城显、路显主反馈，不拆太细。 |
| 抵达地点 | `locationArrive` | 待生成；工期紧可暂并入 `mapReveal` | `CITY-ARRIVE-001` | sfx | 0.18-0.26 | 朱砂印 / 木印落点，短促、清楚。 |
| 路线选择 | `routeSelect` | 复用 `UI-001-SYN`，当前 key 为 `select` | `ROUTE-CONFIRM-001` | sfx | 0.22-0.30 | 点击可走路线并真正出发时播放。锁定路线不要响确认音。 |
| 补给完成 | `supplyComplete` | 复用 `UI-004-SYN`，当前 key 为 `resourceUp` | `SUPPLY-GAIN-001` | sfx | 0.22-0.30 | 补给成功后播放，避免和 `select`、`resourceUp` 叠得太吵。 |
| 低神志层 | `sanityLow` | 已有 `SAN-002-SYN` | `SAN-LOW-001` 或保留 `SAN-002-SYN` 复核后转正 | loop | 0.10-0.14 | 神志 <= 25 或 crisis 时低音量循环。`sanityLight` 可继续作为中低层。 |

状态字段建议沿用或扩展：

```js
status: "demo-temporary" | "review-pending" | "cleared" | "missing"
```

C 线程不需要等素材齐全才接逻辑。`setupAudioElements()` 已经会跳过空 `src`，`playElement(key)` 对缺 key / 失败 key 也应保持 no-op。

## 2. 三种素材状态下的 UI 显示

### 2.1 临时素材

玩家主界面：

```text
声场 低 / 静音
```

设置抽屉：

```text
当前声场：石路行车
反馈音：临时
异象声：临时
```

规则：

- 可以显示“临时”，但不要显示文件名、路径、授权细节。
- 不要在路线卡、补给按钮、地图节点旁边标“临时音效”。
- 若某个临时音效加载失败，只在设置里显示“若干素材已跳过”，不弹浏览器错误。

### 2.2 正式素材

玩家主界面：

```text
声场 低
反馈音 开
```

设置抽屉：

```text
当前声场：石路行车
地图反馈音：已启用
异象声：已启用
```

规则：

- 正式素材不再显示“待复核 / 临时”。
- 仍然保留关闭声音的入口，默认遵守浏览器自动播放限制，用户点击后再播放。
- 不做播放器式进度条、波形、时间轴或文件管理入口。

### 2.3 缺素材

玩家主界面：

```text
静音可玩
```

设置抽屉：

```text
地图反馈音：未接入
异象声：未接入
玩法保持可用
```

规则：

- 缺 `mapOpen` / `mapReveal` / `locationArrive` 时，不显示红色报错，不阻止切地图、移动、抵达。
- 缺 `routeSelect` 时，路线仍然可点；可回退 `select`，也可静音。
- 缺 `supplyComplete` 时，补给仍然生效；日志和资源变化照常。
- 缺 `sanityLow` 时，低神志视觉和文本仍然工作；音频层静音即可。

## 3. 给 C 线程的具体接入点

| 文件 / 函数 | 现状 | 建议调用 |
|---|---|---|
| `data.js` / `audioAssets` | 已有 `musicLoop`、`sanityLight`、`sanityLow`、`select`、`resourceUp` 等 | 新增 `mapOpen`、`mapReveal`、`locationArrive`、`routeSelect`、`supplyComplete`；临时阶段可把 `routeSelect.src` 指向 `UI-001-SYN`，`supplyComplete.src` 指向 `UI-004-SYN`。 |
| `app.js` / `setupAudioElements()` | 空 `src` 会跳过，失败进入 `audioState.failed` | 保持这个容错逻辑。新增 key 不需要特殊分支。 |
| `app.js` / `setActiveView(view)` | 切换 town / map，重渲染地图 | 当 `view === "map"` 且上一视图不是 map 时，调用 `playElement("mapOpen")`。建议 300ms 防抖，避免频繁切换连响。 |
| `app.js` / `renderEvent()` 里的 `data-open-map-view` | “打开九州图”按钮会调用 `setActiveView("map")` | 不要另写音效；让 `setActiveView("map")` 统一触发 `mapOpen`。 |
| `app.js` / `move(routeId)` | 有效路线当前播放 `playElement("select")` | 有效路线确认后调用 `playElement("routeSelect")`，缺素材时回退 `select` 或静音。锁定路线不要调用 `routeSelect`。 |
| `app.js` / `renderMap()` 节点点击 | 地图节点 `[data-route]` 最终调用 `move(routeId)` | 不要在节点点击处重复播放；统一交给 `move()`，避免双响。 |
| `app.js` / `useSupply(supplyId)` | 当前先 `playElement("select")`，随后资源变化可能触发 `resourceUp` | 成功补给时调用 `playElement("supplyComplete")`。建议减少或取消此处的 `select`，避免“点击音 + 获得音”叠得过满。 |
| `app.js` / `completeRoute(route)` | 抵达地点、`discoverLocation()`、`applyRevealForLocation(... markLastReveal)` 都在这里 | 抵达后调用 `playElement("locationArrive")`；若 `revealResult.routeIds / fogLocationIds / fogRouteIds` 有新增，再延迟 80-160ms 调用 `playElement("mapReveal")`。 |
| `app.js` / `applyRevealForLocation()` | 会在初始化 / 归一化状态时被 silent 调用，也会在抵达时标记 `lastReveal` | 不建议在这个函数内部直接播放音效。只在 `completeRoute()` 根据返回结果播放，避免读档、刷新、初始化时误响。 |
| `app.js` / `updateAudioLayers()` | 已按神志值控制 `musicLoop`、`sanityLight`、`sanityLow` | 保持 `sanityLow`：神志 <= 25 或 `state.status === "crisis"` 时淡入；素材缺失时不报错。 |
| `app.js` / `renderAudioStatus()`、`renderAudioDetails()` | 已显示临时音乐、失败数量、素材详情 | 增加地图反馈音统计时，只显示“地图反馈音：临时 / 已启用 / 未接入”，不要显示文件路径。 |

如 C 线程愿意加一个小 helper，建议：

```js
function playSfx(primaryKey, fallbackKey, volume) {
  if (audioAssets[primaryKey]?.src && !audioState.failed.has(primaryKey)) {
    playElement(primaryKey, volume);
    return;
  }
  if (fallbackKey) playElement(fallbackKey, volume);
}
```

但这不是硬要求；当前 `playElement()` 的 no-op 已足够保障缺素材不阻断。

## 4. 文件命名和放置目录建议

### 4.1 音频文件名

临时 / 待复核命名：

```text
MAP-OPEN-001_parchment_map_open_demo_pending.mp3
MAP-FOG-001_fog_city_route_reveal_demo_pending.mp3
CITY-ARRIVE-001_cinnabar_stamp_arrival_demo_pending.mp3
ROUTE-CONFIRM-001_wood_slip_route_confirm_demo_pending.mp3
SUPPLY-GAIN-001_supply_bundle_complete_demo_pending.mp3
SAN-LOW-001_low_sanity_layer_loop_demo_pending.mp3
```

正式可用命名：

```text
MAP-OPEN-001_parchment_map_open_cleared.mp3
MAP-FOG-001_fog_city_route_reveal_cleared.mp3
CITY-ARRIVE-001_cinnabar_stamp_arrival_cleared.mp3
ROUTE-CONFIRM-001_wood_slip_route_confirm_cleared.mp3
SUPPLY-GAIN-001_supply_bundle_complete_cleared.mp3
SAN-LOW-001_low_sanity_layer_loop_cleared.mp3
```

命名规则：

- 文件名前缀必须是资产 ID。
- slug 用英文小写和下划线，不用空格。
- 待复核统一带 `demo_pending`。
- 正式通过后统一带 `cleared`。
- 循环层带 `loop`。
- Web 预览音乐可继续带响度信息，如 `-24lufs`。

### 4.2 放置目录

音频生成提示语：

```text
GitHub资产区/06_音乐音效/03_生成提示语/
```

程序生成占位音效：

```text
GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/
```

AI 生成候选 / 临时音效：

```text
GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/
```

正式可用音效：

```text
GitHub资产区/06_音乐音效/05_可用素材/WebDemo/
```

音频台账：

```text
GitHub资产区/06_音乐音效/00_音频台账/
```

动态图片候选：

```text
GitHub资产区/02_设计资产/待复核素材/
```

动态视频候选：

```text
GitHub资产区/07_视频动态/04_待复核素材/
```

通过边缘复核、压缩和授权留痕后，再移动到：

```text
GitHub资产区/02_设计资产/可用素材/分层素材/
GitHub资产区/07_视频动态/05_可用素材/
```

## 5. 后续生成提示语

统一要求加入每次任务：

```text
pure chroma green background, hard clean edges, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no bloom, no depth of field, no soft haze blending into background, no text, no logo, no watermark, clean cutout asset for compositing
```

### A 组：地图显影反馈层

1. `MAP-DYN-FOG-002` 纸雾退开硬边层

```text
Ancient parchment map fog-clearing cutout elements, dry paper fiber feeling, ink-wash mist pieces shaped like torn map clouds, isolated on pure chroma green background, horizontal 4:1 composition. Hard clean edges, high contrast silhouettes, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no soft haze blending into the green screen, no text, no logo, no watermark. Designed for a game map reveal where fog recedes and hidden routes appear.
```

2. `MAP-DYN-ROUTE-002` 朱砂路线描线层

```text
Cinnabar and black ink route reveal strokes for an ancient hand-drawn travel map, long thin path strokes with several small branch marks, isolated on pure chroma green background. Hard graphic edges, clean cutout shapes, no paper shadow, no blur, no motion blur, no glow, no feathered smoke, no modern UI lines, no text, no logo, no watermark. Suitable for CSS mask animation along game routes.
```

3. `MAP-DYN-SEAL-002` 城市朱印落点层

```text
Small cinnabar city stamp marks for an ancient parchment travel map, 10 stamp variations, flat ink-and-seal graphic style, isolated on pure chroma green background. Hard clean edges, no cast shadow, no drop shadow, no blur, no motion blur, no glow, no modern icon style, no text, no logo, no watermark. Designed as composited reveal marks for newly discovered locations.
```

### B 组：路线与补给反馈层

1. `DYN-ROUTE-DUST-002` 旧道尘线过场层

```text
Ancient dry road dust streaks and tiny gravel movement shapes, horizontal 4:1 overlay, pure chroma green background. Separated hard-edge dust pieces for clean keying, no soft smoke cloud, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no depth of field, no modern road, no text, no logo, no watermark. Suitable for a short route travel transition in a parchment-like game scene.
```

2. `DYN-SUPPLY-001` 补给束落点层

```text
Ancient travel supply bundle icons and small repair material pieces, grain pouch, wooden axle wedge, cloth charm, flat ink-and-cinnabar game asset style, isolated on pure chroma green background. Hard clean edges, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no soft edge, no modern objects, no text, no logo, no watermark. Designed as a quick supply-complete visual feedback layer.
```

3. `DYN-WOOD-SLIP-001` 路引签确认层

```text
Ancient wooden route slip and narrow paper talisman elements, several small horizontal slips as if placed onto a travel map, pure chroma green background. Hard clean cutout edges, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no depth of field, no modern card-game style, no text, no logo, no watermark. Designed for route selection confirmation in a mobile landscape game.
```

### C 组：低神志与裂隙异象层

1. `DYN-SAN-INK-002` 低神志错墨层

```text
Low-sanity hallucination overlay for an ancient parchment travel map, wrong-direction ink stains, repeated road traces, faint cinnabar cracks, isolated on pure chroma green background, horizontal 4:1 composition. Hard graphic edges, restrained eerie mood, no face, no monster, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no soft haze, no text, no logo, no watermark. Designed as a keyed overlay at low opacity.
```

2. `DYN-SAN-MOON-002` 第二月亮天象层

```text
Flat graphic celestial omen cutout layer for an ancient mythic travel scene: a second moon shape, dim sun mark, and a few wrong-direction cloud strips, pure chroma green background, horizontal composition. Hard clean edges, no lens flare, no bloom, no blur, no motion blur, no cast shadow, no drop shadow, no sci-fi star map, no text, no logo, no watermark. Suitable for low-sanity sky overlay.
```

3. `DYN-RIFT-002` 裂隙边缘显影层

```text
Ancient map rift-edge reveal elements, torn parchment crack shapes mixed with black ink and cinnabar edges, isolated on pure chroma green background. Hard clean edges, high contrast, no soft haze, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no modern portal effect, no text, no logo, no watermark. Designed for the Kyushu rift reveal in a game map.
```

## 6. 验收口径

- 缺任意地图音效时，路线、补给、显影、抵达、结局都保持可玩。
- `mapReveal` 只在本次确有新增路线 / 雾中地点 / 雾中路线时播放，不因刷新页面或读档重复播放。
- `mapOpen` 只在进入九州图时播放，频繁切换要防抖。
- `locationArrive` 每次完成路线只播放一次，进入危机也不阻断。
- `routeSelect` 只对应有效出发，不对应锁定路线。
- `supplyComplete` 只对应成功补给，不对应已取 / 本次已补的禁用按钮。
- `sanityLow` 是低音量循环层，不做跳吓，不压过地点志和路线卡文字。
