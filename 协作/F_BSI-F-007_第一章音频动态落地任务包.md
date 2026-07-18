# F_BSI-F-007 第一章音频动态落地任务包

> 子线程：F，音乐音效、视频和动态资产落地  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-15  
> 边界：本文件只写任务包，不改代码，不导入素材。  
> 依据：`主协调_BSI-UX-012_第一章可玩闭环推进指令.md`、`F_BSI-F-006_首版音频视频资产清单.md`、当前 `data.js`。

## 0. 本轮目标

把首版音乐和动态资产压成今天就能执行的任务：

```text
一首低响度主音乐
+ 已有程序占位音效
+ 3 个地图/抵达短音效
+ 3 到 6 个绿幕硬边动态图层候选
+ CSS 假动态先跑起来
```

首版不做宣传片，不做完整 OST，不做大量视频。所有未确认授权素材仍停留在内部 Demo / 待复核状态。

## 1. 先接入哪些音效 / 音乐

### 1.1 当前已经能接的 P0 音频

这些已经在 `data.js` 的 `audioAssets` 中有路径，C 线程可以先保持或接入触发逻辑。

| 触发 | 当前资产 ID | 当前文件 | 建议 UI/玩法用途 | 首版状态 |
|---|---|---|---|---|
| 背景音乐 | `MUS-CAND-006` | `GitHub资产区/06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CAND-006_Wheels_On_The_Stone_webdemo_-24lufs.mp3` | 用户开启声场后低音量循环 | P0，内部 Demo 待复核 |
| 轻度神志层 | `SAN-001-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/SAN-001_light_sanity_layer_synth_placeholder_loop.mp3` | 神志进入中低区间淡入 | P0，占位可用 |
| 重度神志层 | `SAN-002-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/SAN-002_heavy_sanity_layer_synth_placeholder_loop.mp3` | 神志极低时低音量叠加 | P0，占位可用 |
| 选择确认 | `UI-001-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3` | 点击路线、选择事件、确认补给 | P0，占位可用 |
| 资源下降 | `UI-003-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/UI-003_resource_decrease_synth_placeholder.mp3` | 行路消耗、事件扣资源 | P0，占位可用 |
| 补给获得 | `UI-004-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3` | 修车、得粮、恢复神志 | P0，占位可用 |
| 车轴危急 | `WARN-001-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/WARN-001_axle_crisis_synth_placeholder.mp3` | 车轴首次跌入危急线 | P0，占位可用 |
| 粮草危急 | `WARN-002-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/WARN-002_food_crisis_synth_placeholder.mp3` | 粮草首次跌入危急线 | P0，占位可用 |
| 神志危急 | `WARN-003-SYN` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3` | 神志首次跌入危急线 | P0，占位可用 |

### 1.2 今天优先补的 P1 短音效

新增音效先只做 3 个，生成后进入待复核，不直接标正式可用。

| 顺序 | 资产 ID | 建议文件名 | 放置目录 | 触发点 | 时长 |
|---:|---|---|---|---|---:|
| 1 | `MAP-FOG-001` | `MAP-FOG-001_fog_city_route_reveal_demo_pending.mp3` | `GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/` | 雾散、城显、路显主反馈 | 0.8-1.4s |
| 2 | `MAP-OPEN-001` | `MAP-OPEN-001_parchment_map_open_demo_pending.mp3` | `GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/` | 首次进入九州图 / 打开地图面板 | 0.7-1.2s |
| 3 | `CITY-ARRIVE-001` | `CITY-ARRIVE-001_cinnabar_stamp_arrival_demo_pending.mp3` | `GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/` | 抵达地点、朱砂印落点 | 0.5-0.9s |

生成方向：

- `MAP-FOG-001`：纸雾后退、墨线显出、低频轻气流，不要魔法爆闪。
- `MAP-OPEN-001`：羊皮纸展开、木轴轻响、很轻的风，不要网页弹窗感。
- `CITY-ARRIVE-001`：朱砂印轻落、木印/陶印质感、短促清楚，不要胜利音效。

### 1.3 可延后音频

| 资产 | 延后原因 | 替代方案 |
|---|---|---|
| `MUS-CAND-002/003` 音乐切换 | 首版只需要一首常驻音乐，切多首会增加 UI 和授权判断 | 先作为设置里的隐藏备选，不默认启用 |
| `AMB-001` 荒外风声 | 和音乐、神志层容易叠得太满 | 等主音乐听感稳定后再加 |
| `TRV-001` 木轮循环 | 车队动态还未定，过早接会显得重复 | 路线确认先用 `UI-001-SYN` + CSS 位移 |
| 资源细分音效 `RES-*` | 首版资源变化只需清楚，不需每项独立音色 | 先用 `UI-003-SYN` 和 `UI-004-SYN` |

## 2. 已导入音乐的 UI 展示

目标：让它像横屏手机游戏的设置，不像网页播放器。

### 2.1 主界面只露一个轻入口

主界面建议只显示一个小声场按钮：

```text
图标：喇叭 / 静音
文字：声场 低 / 静音
状态：播放中 / 已停用 / 加载失败
```

不要在主界面显示进度条、时间轴、文件名、上传入口、波形、封面图。玩家此时应该关注路线、资源和地点志。

### 2.2 设置抽屉叫“旅途声场”

设置层建议字段：

| 控件 | 展示文案 | 规则 |
|---|---|---|
| 总开关 | `旅途声场` | 默认关闭，用户点击后再播放 |
| 音量三档 | `低 / 中 / 高` | 默认低，内部映射约 0.12-0.18 |
| 音乐开关 | `底乐` | 控制 `musicLoop` |
| 音效开关 | `反馈音` | 控制选择、补给、告警、地图反馈 |
| 神志层开关 | `异象声` | 神志低时才出现，可单独关闭 |
| 当前曲 | `当前声场：石路行车` | 用游戏化名称，不展示 MP3 文件名 |

曲名可以从 `Wheels On The Stone` 改成更游戏内的显示名：

```text
当前声场：石路行车
开发备注：MUS-CAND-006 / Wheels On The Stone / review-pending
```

开发备注只进调试面板或台账，不出现在玩家界面。

### 2.3 加载失败的游戏化处理

如果音频加载失败：

- 主界面显示 `声场不可用`，不要出现浏览器错误文字。
- 设置里显示 `底乐未载入`。
- 音效失败不阻塞玩法。
- 不把授权状态、文件路径、浏览器自动播放限制直接暴露给玩家。

## 3. 三组图片 / 视频生成提示语

统一要求写进每次生成任务：

```text
纯绿幕或纯色高对比背景；主体硬边；边缘清楚；无虚化；无运动模糊；无阴影；无投影；无光晕；无烟雾软边粘连；无现代物品；无文字；无 logo；无水印；适合抠像、分层或 CSS 合成。
```

统一负面词：

```text
no soft edge, no blur, no motion blur, no cast shadow, no drop shadow, no glow, no bloom, no transparent haze blending into background, no depth of field, no modern vehicle, no sci-fi UI, no text, no logo, no watermark, no checkerboard transparency
```

### A 组：地图反馈层

1. `MAP-DYN-FOG-001` 羊皮纸雾散硬边层

```text
Ancient parchment map fog clearing elements, dry paper fiber feeling, ink-wash shaped mist pieces, isolated on pure chroma green background, horizontal 4:1 composition. Hard clean cutout edges, high contrast silhouette readability, no blur, no motion blur, no cast shadow, no glow, no soft haze. Designed for a game map reveal where fog recedes and hidden routes appear.
```

2. `MAP-DYN-ROUTE-001` 墨线路线显影层

```text
Black ink and cinnabar route-reveal stroke elements for an ancient hand-drawn map, several long thin path strokes and small branching marks, isolated on pure chroma green background. Hard edges, graphic readable shapes, no paper shadow, no blur, no glow, no feathered smoke. Suitable for CSS mask animation along game routes.
```

3. `MAP-DYN-SEAL-001` 朱砂城印落点层

```text
Cinnabar city stamp marks for an ancient parchment travel map, 8 to 12 small stamp variations, flat graphic style, isolated on pure green screen background. Hard edges, no shadow, no glow, no blur, no modern icon style. Designed as composited reveal marks for newly discovered locations.
```

### B 组：旅途舞台叠层

1. `DYN-CLOUD-001` 云气风沙短循环

```text
Create a 6 second loopable horizontal overlay video of ancient shanhai cloud bands and wind-sand streamers, isolated on pure chroma green background, 4:1 composition. Slow left-to-right movement, restrained motion, hard readable edges, no soft blur, no cast shadow, no glow, no heavy smoke, no text. Designed as a keyed overlay for a mobile landscape game stage.
```

2. `DYN-REDWATER-001` 赤水水纹叠层

```text
Create a 5 second loopable horizontal overlay video of shallow red marsh water ripples and thin broken shoreline reflections, isolated on pure chroma green background. Minimal movement, hard edge graphic shapes, no blur, no shadow, no glow, no cinematic depth of field, no realistic blood, no horror gore. Designed as a keyed overlay for the Chishui marsh scene.
```

3. `DYN-DUST-001` 旧道尘线过场层

```text
Ancient dry road dust streaks and small gravel movement, horizontal 4:1 overlay, pure green screen background. The dust shapes should be separated and hard-edged enough for clean keying, no soft smoke cloud, no blur, no motion blur, no cast shadow, no glow. Suitable for a short route travel transition in a parchment-like game scene.
```

### C 组：低神志异象层

1. `DYN-SAN-001` 幻路重复道路叠层

```text
Loopable 6 second low-sanity hallucination overlay: repeated ancient road traces, slightly wrong perspective lines, faint cinnabar cracks, isolated on pure chroma green background. Hard graphic edges, restrained eerie feeling, no monster, no face, no blur, no glow, no cast shadow, no heavy smoke. Designed as a keyed overlay at 8% to 28% opacity.
```

2. `DYN-SAN-MOON-001` 第二月亮异象层

```text
Flat graphic celestial omen layer for an ancient mythic travel scene: a second moon shape, dim sun mark, and a few wrong-direction cloud strips, pure green screen background, horizontal composition. Hard edges, no lens flare, no bloom, no blur, no shadow, no sci-fi star map, no text. Suitable for low-sanity sky overlay.
```

3. `DYN-RIFT-001` 裂隙边缘显影层

```text
Ancient map rift-edge reveal elements, torn parchment crack shapes mixed with black ink and cinnabar edges, isolated on pure chroma green background. Hard clean edges, high contrast, no soft haze, no blur, no shadow, no glow, no modern portal effect. Designed for the Kyushu rift reveal in a game map.
```

生成后先进入：

```text
GitHub资产区/02_设计资产/待复核素材/
GitHub资产区/07_视频动态/04_待复核素材/
```

通过边缘复核、体积压缩和授权留痕后，再进入：

```text
GitHub资产区/02_设计资产/可用素材/
GitHub资产区/07_视频动态/05_可用素材/
```

## 4. CSS / Flow / SeeDance 分级

### 4.1 CSS 假动态就够

这些首版不要花视频预算。

| 对象 | 推荐方式 | 原因 |
|---|---|---|
| 车队层 `CAR-*` | PNG 绿幕抠像后，CSS 2-4px 慢浮动 / 极轻横移 | 主体复杂，视频容易变形 |
| 前景层 `FG-*` | CSS 视差位移 | 静态层已经够用 |
| 地点图 `LOC-*` | opacity + scale + 雾层退开 | 首版只要“显影”成立 |
| 朱砂印 | CSS scale + opacity + 短音效 | 动作短，不值得视频 |
| 路线描线 | CSS stroke / mask / clip-path | 需要跟路线数据同步，视频反而不准 |
| 地图打开 | CSS 纸卷展开 + `MAP-OPEN-001` | 首版关注反馈，不追求真实纸张动画 |
| 资源变化 | 数字跳动、色条闪烁、短音效 | 视频会干扰读数 |
| 低神志轻度视觉 | `OV-008` 等静态叠层随数值淡入 | 可控、便宜、不会压 UI |

### 4.2 值得用 Flow 的素材

Flow 用于低成本短循环验证，单条 4-8 秒，最多 3 次试错。

| 对象 | 推荐 ID | 目标 |
|---|---|---|
| 云气 / 风沙 | `DYN-CLOUD-001` | 给旅途舞台加轻运动，多个地点复用 |
| 低神志污染 | `DYN-SAN-001` | 强化神志低的读秒压力，可随状态淡入 |
| 赤水水纹 | `DYN-REDWATER-001` | 只在赤水/水泽场景出现，提高地点差异 |
| 纸雾墨晕 | `MAP-DYN-FOG-001` | 可先生成关键帧，满意后再试短循环 |

### 4.3 才值得 SeeDance 的素材

SeeDance 暂不进 1 天首版执行。只有满足“可作为对外展示镜头、玩法与视觉方向已稳定、失败不影响 Demo”的资产才值得用。

| 对象 | 何时值得 | 现在结论 |
|---|---|---|
| 第一章开场 8-12 秒镜头 | 地图、车队、声场都稳定后，用于展示页或预告 | 暂缓 |
| 抵达九州裂隙关键镜头 | 裂隙玩法、结局文本、主视觉都定后 | 暂缓 |
| 章节转场 / 宣传短片 | 准备公开传播时 | 暂缓 |
| 普通路线移动、按钮反馈、资源变化 | 不值得 | 用 CSS 和短音效 |

## 5. 一天内可执行的资产落地顺序

| 时间块 | 执行动作 | 输出 |
|---|---|---|
| 0.5h | 锁定首版音频列表：`MUS-CAND-006` + 8 个占位音效 + 3 个新短音效 | C 线程接入清单 |
| 1h | 生成或筛选 `MAP-FOG-001`、`MAP-OPEN-001`、`CITY-ARRIVE-001` | 3 个待复核 MP3 |
| 0.5h | 听感快检：不刺耳、不压文字、响度低、触发点清楚 | 通过 / 重生成记录 |
| 1h | 生成 A 组地图反馈层：雾散、路线、朱砂印 | 3 张待复核绿幕图 |
| 1h | 生成 B/C 组选 3 个：云气、低神志、车队或赤水 | 3 个待复核图 / 短视频 |
| 1h | 边缘复核：绿幕是否干净、硬边是否可抠、无阴影无虚化 | 可用候选 / 退回 |
| 1h | 压缩与命名：图片进 `02_设计资产`，视频进 `07_视频动态`，音频进 `06_音乐音效` | 资产路径表 |
| 1h | 交给 C 线程接入 CSS 假动态与音频触发 | 接入任务说明 |
| 1h | 横屏手机快测：能开声、能关声、路线/补给/危急有反馈，低神志不过度遮 UI | 首版验收备注 |

当天不要做：

- 不做宣传视频。
- 不做多首 OST 切换。
- 不做每个地点独立视频。
- 不把待复核素材移动到正式可用区，除非主线程明确验收。

## 6. 建议优先生成的 6 个素材

| 顺序 | 资产 ID | 类型 | 为什么优先 |
|---:|---|---|---|
| 1 | `MAP-FOG-001` | 音效 | 雾散、城显、路显都能复用，是地图反馈的主声音 |
| 2 | `MAP-OPEN-001` | 音效 | 让进入九州图像游戏状态切换，不像网页面板展开 |
| 3 | `CITY-ARRIVE-001` | 音效 | 抵达地点、朱砂印落点需要短促确认 |
| 4 | `MAP-DYN-FOG-001` | 绿幕关键帧 / 可选短循环 | 雾散显影是第一章最核心的动态感 |
| 5 | `DYN-CLOUD-001` | Flow 短循环 | 舞台背景复用率最高，低成本提升氛围 |
| 6 | `CAR-CLEAN-001` | 绿幕硬边静态图 | 车队是第一眼主行动层，但首版只要干净 PNG，不做视频 |

`CAR-CLEAN-001` 建议文件名：

```text
CAR-CLEAN-001_caravan_green_hardedge_3x1.png
```

放置建议：

```text
生成后：GitHub资产区/02_设计资产/待复核素材/
通过后：GitHub资产区/02_设计资产/可用素材/车队层/
```

## 7. 给 C 线程的落地提示

1. 音乐开关优先做成“旅途声场”，不做播放器。
2. `MUS-CAND-006` 只作为内部 Demo 待复核音乐，不写成正式 OST。
3. 地图打开、雾散、抵达三类音效即使素材没生成，也应先预留触发点。
4. 动态优先用 CSS：云雾横移、前景视差、车队轻浮动、地点淡入、朱砂印缩放。
5. Flow 视频只作为增强层，有静态 poster 和关闭路径。
6. 任何音频 / 视频加载失败都不能阻塞路线、补给、事件和结局。

## 8. 验收口径

首版通过标准：

- 玩家能开启 / 关闭声场。
- 背景音乐默认低音量，不压过地点志和选择文本。
- 点击路线、补给、资源下降、危急状态至少有占位反馈。
- 进入九州图、雾散显影、抵达地点有预留或真实短音效。
- 动态层不遮挡 UI，不让横屏手机卡顿。
- 绿幕素材边缘干净，硬边，无虚化、无阴影、无光晕。
- 所有待复核素材都保留工具、提示语、日期、授权状态记录。
