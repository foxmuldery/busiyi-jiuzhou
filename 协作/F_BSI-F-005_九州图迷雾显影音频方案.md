# F_BSI-F-005 九州图迷雾显影音频方案

> 子线程：F，音乐音效与音频体验设计  
> 对应主协调任务：BSI-UX-010 / BSI-UX-009  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-15  
> 边界：本文件只写音频方案，不修改代码，不导入音频素材。

## 0. 本轮结论

九州图的声音不要做成“UI 菜单音”，也不要做成“星图扫描音”。它应像玩家在旧羊皮纸 / 帛书舆图上辨路：

```text
纸卷展开 -> 雾气退开 -> 朱印落城 -> 笔锋描路 -> 路引签抽出 -> 玩家确认前进
```

整体声音口径：

- 空、克制、古意。
- 以纸、墨、朱印、木签、低风、远鼓感为主。
- 所有短音效优先 0.25-1.2 秒，少混响，不压文字阅读。
- 神志低时不是“恐怖惊吓”，而是地图和音乐逐渐被低频、错相、含混人声感污染。
- 严禁西部片马车声、科幻星图声、现代 UI beep/click、跳吓冲击音。

## 1. 触发点总表

| 触发点 | 建议资产 ID | 声音目标 | 时长 | 首版状态 |
|---|---|---|---:|---|
| 打开九州图 | `MAP-OPEN-001` | 纸卷展开、轻木轴、旧纸摩擦 | 0.6-0.9s | 可后补，首版可无声 |
| 收起九州图 | `MAP-CLOSE-001` | 纸面合拢、布带轻收 | 0.4-0.7s | 可后补，首版可无声 |
| 雾散 | `MAP-FOG-001` | 纸雾退开、淡墨散水、低风 | 0.8-1.4s | 可后补，首版优先 CSS |
| 城市显现 | `MAP-CITY-001` | 朱印落下、墨点晕开、短促低响 | 0.45-0.8s | 可后补 |
| 路线显现 | `MAP-ROUTE-001` | 干笔划过纸面、朱砂线被描出 | 0.5-1.0s | 可后补 |
| 锁定路线提示 | `MAP-LOCK-001` | 红封压住、断墨轻裂、短铃钝响 | 0.25-0.5s | 可后补，首版可无声 |
| 路线抽卡 / 路引签出现 | `ROUTE-DRAW-001` | 残卷路引签被抽出，纸片轻叠 | 0.5-0.9s | 可后补，首版优先 CSS |
| 确认前进 | 复用 `UI-001-SYN` 或后补 `ROUTE-CONFIRM-001` | 木签落图、笔点定路 | 0.2-0.45s | 可直接复用现有 |
| 资源危险 | 复用 `WARN-001/002/003-SYN` | 车轴、粮草、神志分别告警 | 0.5-1.0s | 已有占位 |
| 神志污染层 | 复用 `SAN-001-SYN` / `SAN-002-SYN` | 低频、错相、含混、污染地图听感 | loop | 已有占位 |

## 2. 羊皮纸地图打开 / 收起音效

### 2.1 打开九州图 `MAP-OPEN-001`

声音画面：

- 旧纸卷被展开，纸边轻微摩擦。
- 可以有很轻的木轴或竹简轴触桌声。
- 末尾加一层极短的空气感，像地图被铺平。

参数建议：

- 时长：0.6-0.9 秒。
- 音量：0.20-0.28，不能比路线确认声更抢。
- 触发：进入九州图视图时播放；若用户频繁切换，300ms 内防抖。
- 神志低状态：可叠加少量低频纸面抖动，但不要变成恐怖音。

避免：

- 不要马车经过、马蹄、皮鞭、酒馆木门。
- 不要科幻舱门、全息地图展开、雷达扫描。
- 不要现代 app 弹窗音。

### 2.2 收起九州图 `MAP-CLOSE-001`

声音画面：

- 纸面合起、残卷边角轻擦。
- 可以有很轻的布带或木扣收束感。
- 情绪比打开更短、更干净。

参数建议：

- 时长：0.4-0.7 秒。
- 音量：0.16-0.24。
- 触发：离开九州图回到旅途 / 地点 / 事件界面时播放。
- 首版可先无声，只保留视觉过渡。

## 3. 雾散、城显、路显、锁定提示

这组音效要服务 D 线程的三段反馈：

```text
雾散 -> 城显 -> 路显 -> 路线卡刷新
```

第一版不要把四个声音同时叠满。建议用一个主揭示音 `MAP-FOG-001` 加两个轻点缀；事件簇总时长控制在 1.2-1.8 秒内。

### 3.1 雾散 `MAP-FOG-001`

声音画面：

- 低风穿过纸面，但不是自然风景长循环。
- 墨水在纸上退开或晕开。
- 纸雾向外散，带一点空旷感。

触发：

- C 线程的 `revealAroundLocation()` 或等价揭示流程开始时。
- `lastReveal.locationIds / routeIds` 有新增时才播放，旧状态重渲染不重复播放。

参数：

- 时长：0.8-1.4 秒。
- 音量：0.14-0.22。
- 与主音乐同响时自动低一点。

### 3.2 城市显现 `MAP-CITY-001`

声音画面：

- 朱砂印落下，不是大锣。
- 墨点晕开，地名被写出的感觉。
- 可以有极轻的陶鼓或木印钝响作为落点。

触发：

- 新城市进入 `current` 或 `discoveredLocations` 时。
- 从雾中节点转为当前 / 已见节点时。

参数：

- 时长：0.45-0.8 秒。
- 音量：0.18-0.28。
- 若同一轮显多个节点，只播放一次主落点，不逐点重复。

### 3.3 路线显现 `MAP-ROUTE-001`

声音画面：

- 干笔 / 朱砂笔在旧纸上划出一条线。
- 线条短促，不要像激光连线。
- 如果有多条路线，可用 2-3 个很轻的笔锋分层，间隔 80-140ms。

触发：

- 新路线进入 `revealedRoutes`。
- 当前地点的可走路线从无到有刷新时。

参数：

- 时长：0.5-1.0 秒。
- 音量：0.16-0.24。
- 多路线最多播放 3 个笔锋，超过则合并成一个短扫音。

### 3.4 锁定路线提示 `MAP-LOCK-001`

声音画面：

- 红封压住路线、断墨轻裂。
- 可以有一记很短的低铃或木扣声。
- 重点是“条件不足”，不是惩罚玩家。

触发：

- 玩家点击锁定路线 / 锁定路线卡。
- `red_to_rift` 这类主线锁定首次显现时可轻响一次，但不要每次刷新都响。

参数：

- 时长：0.25-0.5 秒。
- 音量：0.18-0.26。
- 300ms 内不重复触发，避免连续点锁定卡变吵。

避免：

- 不要错误警报、失败 buzzer、现代禁用按钮声。
- 不要恐怖尖刺音或跳吓。

## 4. 路线抽卡、确认前进、资源危险

### 4.1 路线抽卡 / 路引签出现 `ROUTE-DRAW-001`

这里的“抽卡”不是手游抽卡，也不是开宝箱。它应该像几张路引签从残卷旁被抽出。

声音画面：

- 纸片轻擦、短木签移动、薄纸叠放。
- 末尾可有很轻的笔点，表示本轮路线池已定。

触发：

- `renderRoutes()` 从新当前地点刷新出新路线卡时。
- 从 `routePools.guaranteed / candidates` 或等价规则显出本轮候选时。

参数：

- 时长：0.5-0.9 秒。
- 音量：0.14-0.22。
- 一轮路线刷新只响一次，不按卡片数量重复。

第一版建议：

- 可以先只做 CSS 卡片淡入 / 上移，不接声音。
- 若要最小新增一条地图专用音效，`ROUTE-DRAW-001` 优先级低于 `MAP-FOG-001`。

### 4.2 确认前进

首版可直接复用当前 `data.js` 里的：

```text
audioAssets.select -> UI-001-SYN
```

后续可替换为 `ROUTE-CONFIRM-001`：

- 木签落在地图上。
- 笔尖点定朱砂路线。
- 轻、短、确定，不能像现代 UI 点击。

触发：

- 玩家点击可走路线并真正进入 `move(routeId)` 时。
- 锁定路线不要播放确认音，应播放 `MAP-LOCK-001` 或无声视觉反馈。

参数：

- 时长：0.2-0.45 秒。
- 音量：现有 `UI-001-SYN` 当前为 0.28，可接受；地图专用版建议 0.22-0.30。

### 4.3 资源危险提示

当前 Web Demo 已有三条占位：

```text
WARN-001-SYN 车轴危急
WARN-002-SYN 粮草危急
WARN-003-SYN 神志危急
```

建议沿用 F-004 的规则：

- 三个资源首次跌到危急线时播放。
- 每局每项最多一次，避免低资源状态持续刷警告。
- 如果一次行为同时触发多个危急，只播放最危险资源，或按 180ms 间隔最多播放两个。

后续替换方向：

| 资源 | 声音意象 | 避免 |
|---|---|---|
| 车轴 | 木轴沉闷一裂、轮楔松动、短促木响 | 连续马车行进、西部片车队、夸张撞车 |
| 粮草 | 空粮袋抖落、干粟少量滚动、布袋塌下 | 现代收银、游戏金币、夸张吃东西 |
| 神志 | 低频偏移、很远的人声残影、墨迹倒流感 | 跳吓尖叫、恐怖片冲击、科幻警报 |

低值预警不一定要有声音。建议只有危急线响，低值线用 UI 颜色 / 文字 / 轻动画处理。

## 5. 神志低状态的音频污染层

当前 `data.js` 已有：

```text
sanityLight -> SAN-001-SYN
sanityLow   -> SAN-002-SYN
```

建议分三档处理：

| 神志状态 | 触发建议 | 音频层 | 地图显影影响 |
|---|---:|---|---|
| 正常 | `sanity > 55` | 只保留主音乐 / 环境 | 地图声音干净 |
| 轻污染 | `26 <= sanity <= 55` | `SAN-001-SYN` 低音量淡入 | 雾散多一点低风，城显朱印略虚 |
| 重污染 | `sanity <= 25` | `SAN-002-SYN` 低音量叠加或替换 | 路线显现带错相、纸面低频抖动 |

混音建议：

- `SAN-001-SYN` 音量 0.06-0.10。
- `SAN-002-SYN` 音量 0.08-0.13。
- 淡入淡出 1200-1800ms。
- 神志恢复后淡出，不要硬切。
- 地图短音效在重污染下可加轻微低频层，但不要改变触发逻辑。

污染层表达：

- 像玩家开始听错地图上的路，而不是怪物突然出现。
- 可有细小倒放纸声、含混气声、低鼓膜压迫。
- 不要人声喊叫，不要突然爆音，不要把 UI 操作变恐怖游戏。

## 6. 第一版 Web Demo 最小接入建议

当前原型 `data.js` 已有这些音频资产键：

```text
musicLoop, sanityLight, sanityLow,
select, resourceDown, resourceUp,
warnAxle, warnGrain, warnSanity
```

第一版建议不阻塞 C 线程。按以下优先级：

### 6.1 可以直接接的短音效

| 场景 | 当前可用资产 | 建议 |
|---|---|---|
| 确认前进 | `select / UI-001-SYN` | 点击可走路线时复用 |
| 资源减少 | `resourceDown / UI-003-SYN` | 路线成本或事件净下降时复用 |
| 资源增加 | `resourceUp / UI-004-SYN` | 补给和正向事件时复用 |
| 车轴危急 | `warnAxle / WARN-001-SYN` | 首次危急时播放 |
| 粮草危急 | `warnGrain / WARN-002-SYN` | 首次危急时播放 |
| 神志危急 | `warnSanity / WARN-003-SYN` | 首次危急时播放 |
| 轻度神志污染 | `sanityLight / SAN-001-SYN` | 神志进入中低区间时淡入 |
| 重度神志污染 | `sanityLow / SAN-002-SYN` | 神志很低时淡入或替换 |

### 6.2 建议新增但不阻塞的短音效

如果只生成 2 条地图专用短音效，优先：

1. `MAP-FOG-001`：覆盖雾散 + 城显 + 路显的主揭示反馈。
2. `MAP-OPEN-001`：打开九州图，建立羊皮纸战略界面质感。

如果生成 4 条，再补：

3. `MAP-LOCK-001`：锁定路线提示。
4. `ROUTE-DRAW-001`：路线卡 / 路引签出现。

### 6.3 可先用 CSS / 无声替代

| 场景 | 首版替代方式 | 原因 |
|---|---|---|
| 地图收起 | CSS 过渡，无声 | 对核心选择压力影响小 |
| 路线抽卡 | 卡片淡入 / 上移，无声 | 避免过早变成手游抽卡感 |
| 城市显现 | 节点朱印动画，先不单独响 | 可由 `MAP-FOG-001` 覆盖 |
| 路线显现 | 线条描入动画，先不单独响 | 多路线同时响容易吵 |
| 锁定路线首次出现 | 红封 / 断墨视觉 | 点击锁定时再给声反馈即可 |
| 低值预警 | 资源颜色、闪一下、文字 | 危急线再响，减少疲劳 |

### 6.4 接入注意

- 默认静音，用户开启音频后再播放。
- 地图揭示声音必须可失败：音频文件缺失时只丢声音，不影响玩法。
- 同一轮揭示最多播放 2-3 个短音效。
- 所有地图音效都跟随全局音频开关。
- 尊重现有动态开关：如果用户关闭动效，声音也应减少连续揭示层，只保留确认 / 危急。

## 7. 生成提示语

下面提示语用于 AI 生成候选，生成后只进待复核，不进正式可用。

统一负面要求，必须写进每条生成任务：

```text
Avoid western wagon sounds, horse hooves, saloon or cowboy atmosphere.
Avoid sci-fi star map, radar, hologram, spaceship UI, laser scan.
Avoid modern UI beep, mobile app click, notification sound.
Avoid jump scare, horror sting, scream, sudden loud impact.
No copyrighted melody. No recognizable franchise style.
```

### 7.1 `MAP-OPEN-001`

```text
Short sound effect, 0.7 seconds. An ancient parchment map unrolling on a wooden table, dry paper edges rubbing softly, a very light bamboo or wooden scroll axle touch, subtle air release at the end. Sparse, restrained, old East Asian travel map mood, low volume, no music, no modern UI click.
Negative: avoid western wagon sounds, horse hooves, sci-fi hologram map, radar scan, modern app UI, jump scare.
```

### 7.2 `MAP-CLOSE-001`

```text
Short sound effect, 0.5 seconds. Old parchment folding closed, soft cloth tie or wooden clasp, dry paper friction, intimate and muted. Ancient map interface, practical and quiet.
Negative: avoid western wagon sounds, horse tack, sci-fi UI, digital click, jump scare, loud slam.
```

### 7.3 `MAP-FOG-001`

```text
Short reveal sound effect, 1.1 seconds. Paper mist receding across an ancient parchment map, ink wash thinning and spreading, faint low wind through paper fibers, mysterious but calm. No melody, no big impact, designed for a fog-of-war reveal.
Negative: avoid sci-fi star chart, radar sweep, hologram scan, western desert wagon, horror jump scare, modern UI whoosh.
```

### 7.4 `MAP-CITY-001`

```text
Short reveal accent, 0.6 seconds. A cinnabar seal stamp lands softly on old parchment, ink blooms outward, tiny low wooden thump, ancient city name appearing on a hand-drawn map. Restrained, ceremonial, not loud.
Negative: avoid gongs, battle drums, sci-fi unlock sound, mobile game reward sound, western wagon, jump scare.
```

### 7.5 `MAP-ROUTE-001`

```text
Short route drawing sound, 0.8 seconds. A dry brush draws a cinnabar route line over rough parchment, slight bristle texture, ink settling into paper, 2 subtle strokes maximum. Ancient hand-drawn map, quiet strategic decision.
Negative: avoid laser line, spaceship route, radar, modern UI swipe, western wagon wheel travel loop, jump scare.
```

### 7.6 `MAP-LOCK-001`

```text
Very short locked route cue, 0.35 seconds. Red seal pressure on parchment, dry ink cracking, muted wooden token stop, soft low bell tail. It means "condition not met" without sounding like an error buzzer.
Negative: avoid modern error beep, alarm, sci-fi denied sound, horror sting, jump scare, western soundscape.
```

### 7.7 `ROUTE-DRAW-001`

```text
Short route card draw sound, 0.75 seconds. Several thin parchment travel slips are drawn from a stack and placed beside an old map, soft paper shuffle, one light wooden tally touch. Subtle, non-gacha, no casino or reward feeling.
Negative: avoid card game flourish, mobile gacha, coins, modern UI, sci-fi, western wagon, jump scare.
```

### 7.8 资源危险替换候选

车轴：

```text
Short axle danger cue, 0.65 seconds. Ancient wooden wheel axle gives one dry stressed crack and a low wooden knock, close and restrained. No continuous travel loop.
Negative: avoid western wagon chase, horse hooves, crash, modern warning beep, jump scare.
```

粮草：

```text
Short food supply danger cue, 0.6 seconds. An almost empty cloth grain sack collapses, a few dry millet grains roll on wood, muted and tense.
Negative: avoid coins, cash register, eating sounds, modern UI, jump scare.
```

神志：

```text
Short sanity danger cue, 0.8 seconds. Low phase-shifted breath through paper, ink blur reversing slightly, distant almost-human murmur buried low, unsettling but not scary.
Negative: avoid scream, jump scare, horror sting, sci-fi alarm, modern notification.
```

## 8. 授权和临时素材记录字段

所有新音效无论来自 AI 生成、第三方素材、人工 Foley，都必须先进入待复核，不得直接标为正式可用。

建议临时路径：

```text
GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/九州图迷雾显影/
```

建议台账字段：

| 字段 | 说明 |
|---|---|
| `assetId` | 如 `MAP-FOG-001` |
| `assetName` | 中文用途名，如“九州图雾散主揭示音” |
| `fileName` | 实际文件名 |
| `category` | map / route / warning / sanity / ui |
| `intendedUse` | 触发点和用途 |
| `sourceType` | AI生成 / 第三方素材 / 自录 / 合成占位 |
| `sourceToolOrSite` | 生成工具名或素材站名 |
| `sourceUrl` | 第三方素材链接；AI 生成可写任务链接或留空 |
| `promptId` | 对应提示语编号 |
| `promptTextPath` | 提示语文档路径 |
| `generationParams` | 模型、seed、时长、格式等 |
| `createdAt` | 生成或下载日期 |
| `operator` | 操作者 |
| `licenseStatus` | pending / cleared-for-demo / cleared-commercial / rejected |
| `licenseType` | 具体授权类型 |
| `commercialAllowed` | yes / no / unknown |
| `licenseEvidencePath` | 授权页截图、PDF、下载记录路径 |
| `editHistory` | 剪辑、降噪、响度、格式转换记录 |
| `loudness` | LUFS 或主观响度说明 |
| `loop` | true / false |
| `reviewer` | 复核人 |
| `status` | demo-temporary / candidate-review / usable / rejected |
| `notes` | 风险和替换建议 |

最低记录要求：

1. 没有授权证据的素材只能写 `demo-temporary` 或 `candidate-review`。
2. AI 生成素材也要记录工具、提示语、生成日期和使用限制。
3. 第三方素材必须保存授权页面截图或 PDF。
4. 正式发布前必须重新复核响度、循环点、授权和素材来源。

## 9. 给 C 线程的最小触发口径

后续如果 C 线程开始实现，F 线程建议只预留这些事件名，不要求本轮写代码：

| 事件名 | 触发位置 | 首版资产 |
|---|---|---|
| `map_open` | 进入九州图视图 | 可无声 / `MAP-OPEN-001` |
| `map_close` | 离开九州图视图 | 可无声 / `MAP-CLOSE-001` |
| `map_reveal` | `revealAroundLocation()` 开始 | `MAP-FOG-001` |
| `city_reveal` | 新城市成为当前 / 已见 | 可由 `map_reveal` 覆盖 |
| `route_reveal` | 新路线进入可见 | 可由 `map_reveal` 覆盖 |
| `route_locked` | 点击锁定路线 | 可无声 / `MAP-LOCK-001` |
| `route_draw` | 路线卡刷新出现 | 可无声 / `ROUTE-DRAW-001` |
| `route_confirm` | 点击可走路线并进入移动 | 复用 `select` |
| `resource_warning` | 资源首次危急 | 复用 `warnAxle/warnGrain/warnSanity` |
| `sanity_layer_update` | 神志区间变化 | 复用 `sanityLight/sanityLow` |

不要因为地图专用音效未生成而阻塞九州图实现。第一版可先做到：

```text
确认前进有声 + 资源危急有声 + 神志污染层有声
地图打开/雾散/路显先用 CSS 动效
```

## 10. 需要用户决策的问题

本轮没有必须立即让用户拍板的问题。可以按以下默认方向推进：

1. 地图声音偏“纸、墨、印、木签”，不做马车、不做科幻、不做现代 UI。
2. 第一版 Web Demo 不强行新增全套地图音效，先复用已有短音效和神志层。
3. 若只补两条新声音，优先补 `MAP-FOG-001` 和 `MAP-OPEN-001`。

后续非阻塞可选项：

- 城市显现更偏“朱砂印落下”，还是更偏“毛笔写名”。
- 雾散更偏“纸雾水渍”，还是更偏“墨晕退开”。
- 神志污染层是否要在九州图界面比旅途界面更明显。

