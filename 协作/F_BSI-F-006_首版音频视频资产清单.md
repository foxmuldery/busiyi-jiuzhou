# F_BSI-F-006 首版音频视频资产清单

> 子线程：F，音乐音效与视频/动态资产规划  
> 对应主协调口径：先让 Web Demo 跑起来，第一版有音乐，先不要宣传  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-15  
> 边界：本文件只写资产规划，不改代码，不导入音频或视频素材。

## 0. 首版原则

第一版目标不是做宣传片，也不是做完整视听包装，而是让玩家在 Web Demo 里感到：

```text
它能玩，有音乐，有路线反馈，有资源压力，有一点九州图显影气氛。
```

本轮资产优先级：

1. 先接一首低响度背景音乐。
2. 先保留现有选择、补给、资源下降、危急、神志污染占位音效。
3. 地图打开、雾散城显、到达城市这些专用音效可先补 2-3 个，不要求全量。
4. 视频资产暂不作为首版核心依赖；优先用静态关键帧、分层 PNG 和 CSS 假动态。
5. 不做宣传向剪辑，不做预告片，不把未授权音乐/视频包装成正式素材。

## 1. Web Demo 首版最小音频清单

当前 `data.js` 已接入一组可跑的临时音频。首版资产清单按“必须有 / 建议补 / 可延后”分级。

| 场景 | 首版资产 | 当前状态 | 触发建议 | 优先级 |
|---|---|---|---|---|
| 背景音乐 | `MUS-CAND-006_Wheels_On_The_Stone_webdemo_-24lufs.mp3` | 已在 `data.js` 作为 `musicLoop`，待主观试听/授权确认 | 用户开启音频后低音量循环 | P0 |
| 备用背景音乐 | `MUS-CAND-002` 或 `MUS-CAND-003` 低响度预览 | 已在待复核目录 | 音乐切换用，不默认宣传 | P1 |
| 地图打开 | `MAP-OPEN-001` | 待生成 | 进入九州图时播放，纸卷展开 | P1 |
| 雾散城显 | `MAP-FOG-001` | 待生成 | 抵达新城后，覆盖雾散、城显、路显主反馈 | P1 |
| 路线选择 | `UI-001-SYN`，后续替换 `ROUTE-CONFIRM-001` | 已有程序占位 | 点击可走路线 / 选项确认 | P0 |
| 补给获得 | `UI-004-SYN`，后续替换 `SUPPLY-GAIN-001` | 已有程序占位 | 修车、得粮、恢复神志时 | P0 |
| 资源下降 | `UI-003-SYN`，后续拆 `RES-DOWN-AXLE/GAIN/GRAIN/SANITY` | 已有程序占位 | 行路消耗、事件损耗后延迟 80-120ms | P0 |
| 低神志 | `SAN-001-SYN` / `SAN-002-SYN` | 已有程序占位循环 | 神志进入中低 / 极低区间淡入 | P0 |
| 资源危急 | `WARN-001/002/003-SYN` | 已有程序占位 | 每项资源首次跌入危急线时 | P0 |
| 到达城市 | `CITY-ARRIVE-001` 或并入 `MAP-FOG-001` | 待生成 | 完成路线并写入新地点时，朱印/木印落点 | P1 |

### 1.1 首版可直接跑的组合

不等新增素材，C 线程也能先接这套：

```text
musicLoop = MUS-CAND-006 低响度预览
select = UI-001-SYN
resourceUp = UI-004-SYN
resourceDown = UI-003-SYN
warnAxle / warnGrain / warnSanity = WARN-001/002/003-SYN
sanityLight / sanityLow = SAN-001/002-SYN
```

第一版不要同时接太多新短音效。建议新增音效先只补：

1. `MAP-FOG-001`：雾散城显主揭示音。
2. `MAP-OPEN-001`：九州图打开音。
3. `CITY-ARRIVE-001`：到达城市落点音；如果工期紧，可先并入 `MAP-FOG-001`。

### 1.2 背景音乐使用口径

当前已有 6 首低响度预览，均只能作为内部 Demo 待复核素材：

| 编号 | 曲名 | 建议用途 | 首版判断 |
|---|---|---|---|
| `MUS-CAND-001` | Thunder Across the Plains | 危险旅途、路线压力、风暴前奏 | 不默认常驻，可能太戏剧 |
| `MUS-CAND-002` | Autumn on the High Plateau | 平静旅途、驿站外景、高原 | 适合备选主音乐 |
| `MUS-CAND-003` | Across the Forgotten Basin | 荒外、盆地、神秘区域 | 适合备选神秘氛围 |
| `MUS-CAND-004` | Cold Mountain Breath | 寒山、夜路、冷风 | 可作区域备选 |
| `MUS-CAND-005` | Beyond the Stone Gate | 石门、废关、边界 | 可作地点/抵达候选，不建议常驻 |
| `MUS-CAND-006` | Wheels On The Stone | 石路行车、路线推进 | 当前 Demo 默认更贴合行旅 |

授权提醒：

- 这些音乐仍是“用户上传 / AI 生成候选”，授权、生成工具、账号条款未最终确认。
- 当前只建议用于本地/内部 Web Demo。
- 不得用于宣传片、公开预告、正式发布页或商用包装。

## 2. 用户已有 / 导入音乐在 UI 上怎么展示

UI 目标：让玩家知道当前有音乐、可以关掉、可以换曲，但不要像网页播放器。

建议把音乐控制做成“声场设置”或“旅途声场”，不做播放器面板。

### 2.1 显示字段

| 字段 | 展示方式 | 说明 |
|---|---|---|
| 曲名 | 小字显示，如 `Wheels On The Stone` | 只显示曲名，不展示文件路径 |
| 状态 | `静音 / 播放中 / 已暂停 / 加载失败` | 用简短状态，不出现进度条 |
| 音量 | 细滑杆或三档 `低 / 中 / 高` | 默认低音量，阅读不被压过 |
| 静音 | 一个清晰开关 | 默认静音，用户开启后播放 |
| 切换 | `上一首 / 下一首` 或一个小菜单 | 只在设置抽屉里，不占主界面 |
| 授权状态 | 仅开发/调试视图显示 | 玩家界面不显示“待授权”噪音 |

### 2.2 不要像网页播放器

避免：

- 不要大播放条、进度条、时间轴、唱片封面。
- 不要歌词、波形、可拖动播放进度。
- 不要把曲名做成内容标题。
- 不要在主界面放“上传音乐”入口；首版先不做 UGC 音乐管理。

建议：

- 放在右上角设置、暂停菜单或音频开关展开层。
- 主界面只保留一个小的音频开关图标和当前状态。
- 曲名显示为“当前声场：Wheels On The Stone”，而不是“正在播放 MP3”。
- 切歌只切待复核候选，不对玩家暗示这是正式 OST。

### 2.3 导入音乐的记录字段

后续如果允许用户导入音乐，至少要记录：

| 字段 | 说明 |
|---|---|
| `trackId` | 本地唯一编号 |
| `displayName` | UI 展示曲名 |
| `fileName` | 文件名 |
| `source` | 用户上传 / AI 生成 / 第三方素材 |
| `licenseStatus` | pending / demo-only / cleared |
| `webPreviewPath` | 低响度预览版路径 |
| `originalPath` | 原始文件路径 |
| `defaultVolume` | 默认音量 |
| `loopReady` | 是否剪过循环点 |
| `notes` | 失真、峰值、授权风险、使用建议 |

## 3. 可用视频 / 关键帧资产清单

当前仓库没有现成视频文件；可用的是静态分层素材。首版应优先用关键帧和 CSS 假动态，视频只作为后续增强。

### 3.1 首版可直接用于假动态的静态资产

| 类型 | 推荐资产 | 用法 | 是否适合视频化 |
|---|---|---|---|
| 默认背景 | `BG-006_废关古道暮色.png` | 首版舞台底图 | 不急，静态足够 |
| 默认前景 | `FG-003_荒外路面泥痕车辙前景层.png` | 底部前景，轻微视差 | 不建议视频化 |
| 默认车队 | `CAR-005_古代辇车队伍抠图初版.png` | 静态车队，轻微上下/横向漂移 | 不建议首版视频化 |
| 雾/风沙 | `OV-004_云雾风沙气流轻叠层.png` | 透明叠层，CSS 慢速横移 | 适合后续短循环 |
| 低神志 | `OV-008_黑底神志污染幻路重复道路.png` | 低透明叠层，随神志改变透明度 | 适合后续短循环 |
| 地点显影 | `LOC-005_废关祭所地点图.png` | 抵达地点淡入 | 先关键帧/CSS |
| 赤水场景 | `BG-005_赤水骨滩荒泽.png` + `FG-005_水泽边缘前景视差层.png` | 第二套场景 | 水纹可后续视频化 |
| 天象 | `BG-001_后景天空云气山影日月.png` / `BG-007_九州边境天象天空层.png` | 天空/日月层 | 云气和日月适合短循环 |

### 3.2 哪些适合用视频

适合视频的条件：动作本身是连续的、低速的、循环不突兀，并且失败时能退回静态图。

| 候选 | 推荐形式 | 时长 | 说明 |
|---|---|---:|---|
| 云气横移 | WebM/MP4 短循环 | 4-8s | 最适合视频，低成本提升氛围 |
| 纸雾墨晕 | WebM/MP4 或序列帧 | 2-4s | 用于九州图雾散，可循环或一次性 |
| 低神志污染 | WebM/MP4 透明叠层或黑底混合 | 4-8s | 透明度 8%-28%，必须可关闭 |
| 赤水水纹 | WebM/MP4 短循环 | 4-6s | 只用于水泽场景，不覆盖 UI |
| 路线转场风沙 | 短视频或 CSS 过渡 | 0.8-1.5s | 第二阶段可做 |

### 3.3 哪些更适合关键帧 / CSS 假动态

| 候选 | 推荐做法 | 原因 |
|---|---|---|
| 车队 | 绿幕/透明静态 PNG + CSS 轻位移 | 车队主体容易变形，视频成本高且不稳定 |
| 朱砂印 | 静态 PNG/SVG/Canvas/CSS scale+opacity | 动作短，视频没必要 |
| 路线描线 | CSS stroke / mask / clip-path | 比视频更清晰、可跟路线数据同步 |
| 地点显影 | LOC 图淡入 + 雾层退开 | 不需要每个地点生成视频 |
| 资源变化 | UI 动画 + 音效 | 视频会干扰资源读数 |
| 地图打开 | CSS 纸卷展开 + 音效 | 首版先假动态，后续再考虑视频 |

### 3.4 首版动态组合建议

第一版可跑组合：

```text
BG-006 静态底图
+ FG-003 前景层轻微视差
+ CAR-005 车队层 2-4px 慢浮动
+ OV-004 云雾风沙层低透明横移
+ OV-008 低神志时淡入
+ LOC-005 到达地点时淡入
```

不要在第一版加入大量视频。等玩法、路线、音频开关稳定后，再补 1 个云气循环和 1 个低神志污染循环。

## 4. 下一批生成提示语

统一生成要求：

```text
绿幕或纯色高对比背景；主体硬边；无虚化；无阴影；无投影；无光晕；无运动模糊；主体与背景分离清楚；适合后期抠像或 CSS 分层。
```

统一负面词：

```text
no soft edge, no blur, no motion blur, no glow, no cast shadow, no transparent haze blending into background, no western wagon, no cowboy style, no sci-fi UI, no modern vehicle, no cinematic depth of field
```

### A 组：车队 / 主行动层

1. `A-CAR-001` 远行车队硬边绿幕

```text
Ancient Chinese long-distance caravan silhouette, wooden cart and tired attendants, side view, horizontal composition, pure chroma green background, hard clean edges, no shadow, no blur, no glow, no motion blur, no horses in western cowboy style, no modern objects. Designed as a cutout layer for a 4:1 game stage.
```

2. `A-CAR-002` 破损辇车与随从

```text
Damaged ancient wooden travel cart, weary attendants pushing and walking beside it, dark ink-and-cinnabar game art style, side view, pure green screen background, hard edge cutout, no ground shadow, no depth of field, no soft feathering, no blur. For compositing into a parchment fantasy road scene.
```

3. `A-CAR-003` 夜行灯笼车队

```text
Ancient night caravan with one small lantern, low-key silhouette, side view, clean isolated subject, pure chroma green background, hard edges, no glow spill, no cast shadow, no motion blur, no western wagon feeling, no horses emphasized. Suitable for later keying and CSS animation.
```

### B 组：雾 / 云 / 日月 / 天象叠层

1. `B-FOG-001` 纸雾硬边叠层

```text
Stylized parchment mist shapes, ink-wash fog strips for an ancient map, separated on pure chroma green background, clear hard-edged graphic shapes, no soft blur, no shadow, no glow, no transparent feathering. Horizontal 4:1 overlay elements, suitable for keying and CSS movement.
```

2. `B-CLOUD-001` 云气横移关键帧

```text
Ancient shanhai map cloud bands and wind-sand streamers, long horizontal composition, clean isolated cloud shapes on pure green screen, hard readable edges, no blur, no cast shadow, no sci-fi particles, no modern fantasy magic. Designed as a loopable overlay layer.
```

3. `B-MOON-001` 日月异象层

```text
Two moons and a dim sun omen for ancient mythic travel, flat graphic celestial layer, isolated on pure green background, hard edges, no glow bloom, no lens flare, no blur, no shadow, no sci-fi star map. Horizontal composition for low-sanity sky overlay.
```

### C 组：九州图 / 纸雾墨晕 / 朱砂印

1. `C-PAPER-001` 羊皮纸雾散素材

```text
Ancient parchment fog clearing shapes, dry paper fibers and ink-wash edges, pure green background, high contrast, hard cutout edges, no soft haze, no blur, no shadow, no glow. Elements should feel like paper mist receding on a hand-drawn map.
```

2. `C-INK-001` 墨晕路线显影素材

```text
Cinnabar and black ink spreading along a hand-drawn route line, isolated graphic stroke elements, pure green background, hard edges, no motion blur, no soft feathering, no shadow. Ancient parchment map UI effect, not sci-fi, not modern.
```

3. `C-SEAL-001` 朱砂印落点素材

```text
Cinnabar seal stamp mark for an ancient city appearing on a parchment map, several clean stamp variations, pure green background, hard edges, no paper shadow, no blur, no glow, no modern UI icon. Designed as a composited city reveal mark.
```

生成后建议进入：

```text
GitHub资产区/02_设计资产/待复核素材/
```

通过抠像/边缘复核后，再进入：

```text
GitHub资产区/02_设计资产/可用素材/
```

## 5. 成本建议：什么时候值得用视频

工作假设：

- SeeDance 贵，适合少量关键镜头，不适合批量试错。
- Flow 相对便宜，适合做短循环、小范围动态验证。
- 开源模型适合批量小动态、抠像层、风雾云等可接受瑕疵的素材。

### 5.1 值得用视频的情况

满足 3 条以上再用视频：

1. 静态图 + CSS 无法表达核心感受。
2. 动作是低速循环，如云、雾、水纹、污染层。
3. 该素材会在多个地点复用。
4. 视频失败可以退回静态图，不影响玩法。
5. 单个视频能控制在 2-4MB 左右。
6. 不含复杂人物、车轮、动物、手部等容易穿帮主体。
7. 它能明显增强“先玩起来”的第一印象，而不是只服务宣传。

### 5.2 不值得用视频的情况

以下优先用关键帧 / CSS：

- 车队完整行走、车轮细动、多人同步移动。
- 每个事件单独一段短片。
- 朱砂印、路线描线、地图开合这种短 UI 反馈。
- 资源变化、按钮状态、日志出现。
- 移动端首屏背景。
- 未确认授权、未确认用途、只是“看起来更高级”的动效。

### 5.3 平台使用建议

| 任务 | 推荐路线 | 原因 |
|---|---|---|
| 云气/雾层小循环 | Flow 或开源模型 | 便宜，容错高，适合批量试 |
| 纸雾墨晕关键帧 | 开源模型 + 后处理 | 可批量生成硬边素材 |
| 朱砂印/路线显影 | 静态生成 + CSS | 视频浪费 |
| 低神志污染循环 | Flow 先试，满意后再考虑更贵模型 | 要看氛围，但不需要高复杂运动 |
| 关键宣传镜头 | SeeDance | 暂不做；等玩法和视觉方向稳定 |
| 车队动态视频 | 暂缓 | 主体复杂，贵且容易穿帮 |

### 5.4 首版预算纪律

- 第一阶段最多做 2 个短视频候选：云气循环、低神志污染循环。
- 每个视频候选最多 3 次试错，超过就退回关键帧/CSS。
- 车队、朱砂印、路线显影先不花视频预算。
- 不为了发布宣传而扩张资产；现在只做内部 Demo 可玩体验。

## 6. 建议现在最先补的 6 个音频 / 动态资产

| 顺序 | 资产 ID | 类型 | 用途 | 推荐方式 |
|---:|---|---|---|---|
| 1 | `MAP-FOG-001` | 音效 | 雾散、城显、路显的主揭示反馈 | AI 生成短音效 |
| 2 | `MAP-OPEN-001` | 音效 | 九州图打开，建立羊皮纸地图质感 | AI 生成短音效 |
| 3 | `CITY-ARRIVE-001` | 音效 | 到达城市 / 朱印落点 | AI 生成短音效，可并入 `MAP-FOG-001` |
| 4 | `DYN-FOG-001` | 动态/关键帧 | 纸雾墨晕叠层，地图和舞台都能复用 | 绿幕硬边关键帧，先 CSS 移动 |
| 5 | `DYN-CLOUD-001` | 动态 | 云气/风沙短循环，舞台背景复用 | Flow 或开源模型短循环 |
| 6 | `CAR-CLEAN-001` | 静态关键帧 | 更干净的车队绿幕硬边层，替换临时抠图 | 生图绿幕硬边，不做视频 |

这 6 个补完后，首版就能有：

```text
背景音乐 + 路线确认 + 资源反馈 + 神志污染
+ 九州图打开 + 雾散城显 + 舞台轻动态
```

足够支持内部试玩，不需要进入宣传素材制作。

## 7. 待用户决策

没有必须阻塞当前文档或 C 线程实现的问题。后续可选决策：

1. 首版默认音乐继续用 `MUS-CAND-006`，还是换成更安静的 `MUS-CAND-002`。
2. 低神志污染视觉更偏“幻路重复道路”，还是“第二月亮 / 天象错位”。
3. 是否允许为了云气循环先用 Flow 生成 1-2 个短视频候选。

