# C_BSI-C-090 下一轮素材接入规格与验收建议

> 子线程：C 线程，技术原型与工具链工程师  
> 日期：2026-06-19  
> 范围：只整理 Web Demo 下一轮素材接入规格、已有槽位、字段缺口和验收建议；不改 UI、不引入依赖、不导入新素材。  
> 当前依据：`generated-art-manifest.js` 显示 ready 资产 59 个，分为 A-stage 4、B-location 14、B-event 14、C-route 13、C-random 8、C-crisis 3、C-ending 3。

## 1. 核心结论

第一版继续采用轻量 Web 接入：图片优先，CSS 分层动效兜底，短视频只作为可关闭的非阻断氛围层。不要为了素材升级引入 Phaser、Three.js 或视频状态机；核心玩法仍由 `locations / routes / events / resources / gameState` 驱动。

推荐下一轮素材强度：

- 3:1 长背景：优先接入，用于横向山海旅途舞台底层。
- 16:9 图：继续作为当前最稳的通用图规格，能直接进入现有槽位。
- 4:3 图：推荐给事件弹窗下一轮升级，但需要补 `aspect` 元数据或 CSS 分类。
- 方图：适合图鉴、路线小卡、资源/危机头像式插图，不建议直接替代舞台背景。
- 绿幕前景：先生成绿幕源，再抠成透明 PNG 或 keyed PNG 后接入；不要把纯绿底原图直接放进 Demo。
- 短视频：只接“短循环背景/神志异象”，默认静音、懒加载、有 poster、有静态 fallback。

## 2. 分规格接入方式

| 素材类型 | 第一版用途 | 推荐尺寸 | 当前是否能接 | 最小接入方式 | 兜底 |
|---|---:|---:|---|---|---|
| 方图 | 图鉴缩略、危机头像、小弹窗焦点图 | 1024x1024 或 1280x1280 | 部分能显示，但缺少语义字段 | 暂放 `locationIllustrations/eventIllustrations/routeEventIllustrations` 字符串路径；下一轮补 `illustrationMeta[id].aspect="1:1"` | 隐藏图片框或回退地点图 |
| 4:3 图 | 事件弹窗、路遇弹窗主图 | 1280x960 或 1600x1200 | 能被 `<img>` 显示，但会按现有框裁切 | 路径仍走现有 illustration map；补 `aspect="4:3"` 后再调 CSS | 回退 16:9 事件图/地点图 |
| 16:9 图 | 地点、事件、路遇、危机、结局通用图 | 1280x720 起 | 已支持 | 继续使用现有 `stageAssets.*Illustrations` 与 manifest 命名规则 | 回退地点图、隐藏图片框 |
| 3:1 长背景 | 横向旅途舞台底图 | 2400x800 起，建议 3000x1000 可压缩版 | 已支持 | `stageAssets.generatedStageBackgrounds[terrain]` 映射到 `road/market/water/rift` | 回退 `profiles[...].background` 旧背景 |
| 绿幕前景 | 车队、前景遮挡、云雾、污染层、资源图标 | 源图 1536px 以上，最终透明 PNG/WebP | 透明/keyed 后已支持 | 接入 `profiles[].foreground/atmosphere/pollution/caravan` 或 CSS 图标路径 | CSS 假动态、默认图标、CSS 车队剪影 |
| 短视频 | 氛围短循环、神志异象、轻路线转场 | 1280x720 或 1920x640，3-6 秒循环 | 页面有空 video 层，数据字段未成体系 | 新增 `videoAssets/videoHooks`，挂到 `ambientVideo`，只在 motion on 且用户设备允许时加载 | poster 静态图 + CSS/SVG 假动态 |

## 3. 当前已有槽位

### 3.1 已有图片槽位

现有数据入口集中在 `data.js` 的 `stageAssets`：

- `stageAssets.map.background`：九州地图底图。
- `stageAssets.generatedStageBackgrounds`：3:1 旅途舞台长背景候选，当前已有 `road / market / water / rift`。
- `stageAssets.profiles`：舞台 profile，支持 `background / foreground / atmosphere / pollution / caravan` 及 opacity、position、blend、filter。
- `stageAssets.terrainProfiles`：地形到舞台 profile 的兜底映射。
- `stageAssets.locationProfiles`：地点到舞台 profile 的映射，当前 14 个地点均有映射。
- `stageAssets.locationIllustrations`：地点图，当前 14 个地点均有槽位。
- `stageAssets.eventIllustrations`：地点事件图，当前 14 个地点事件均有槽位。
- `stageAssets.routeEventIllustrations`：固定路遇 + 随机路遇图，当前 21 个路遇均有槽位。
- `stageAssets.failureIllustrations`：三资源失败图，当前 `axle / grain / sanity`。
- `stageAssets.endingIllustrations`：结局图，当前 `return / lost / rift / stranded`。

### 3.2 manifest 当前 ready ID

`generated-art-manifest.js` 当前 ready 59 项：

- A-stage：`road, market, water, rift`
- B-location：`central_post, old_king_road, qingqiu_outer_city, abandoned_pass, bird_mouse_pass, nameless_shrine, thunder_marsh, white_feather_mire, feather_folk_ford, black_teeth_market, dream_map_post, red_marsh, broken_stele, kyushu_rift`
- B-event：`post_gate, split_tracks, closed_order, ground_thunder, black_trade, qingqiu_lamps, hollow_pass, nameless_prayer, sunken_feather, feather_ford_debt, dream_map_gate, red_bones, read_name, rift_dream`
- C-route：`wheel_omen, roadside_shrine, black_cloud, wenao_fish_rain, dang_kang_field_cry, xuan_gui_shell_bridge, zhu_bird_name_call, fox_lamp_tail, black_teeth_scale_price, ming_snake_crosswind, bone_ox_rut, mirror_reed_bed, dream_cicada_shell`
- C-random：`rnd_loose_axle_song, rnd_bitter_grass_soup, rnd_wrong_milestone, rnd_silent_barter, rnd_repeated_footprints, rnd_count_names_rest, rnd_low_black_cloud_gap, rnd_breathing_map`
- C-crisis：`axle, grain, sanity`
- C-ending：`rift, return, stranded`

### 3.3 视频槽位现状

`index.html` 已有：

- `#videoLayer`
- `#ambientVideo`
- `#motionToggle`
- `#videoNote`

但 `data.js` 暂无正式 `videoAssets` 或 `videoHooks`。因此下一轮短视频接入应新增字段，而不是把视频路径写死在 `app.js` 或 HTML。

建议最小字段：

```js
videoAssets: {
  sanityLoop01: {
    id: "VID-SAN-001",
    src: "../../07_视频动态/可用候选/VID-SAN-001_神志水纹短循环.webm",
    mp4: "../../07_视频动态/可用候选/VID-SAN-001_神志水纹短循环.mp4",
    poster: "../../02_设计资产/可用素材/C组路遇危机结局图/CRS-003_sanity_神志崩线.png",
    type: "sanity_overlay",
    loop: true,
    muted: true,
    maxBytes: 2500000,
    status: "review-pending"
  }
},
videoHooks: {
  lowSanityAmbient: "sanityLoop01"
}
```

## 4. 需要新增或补强的字段

当前图片 map 以“字符串路径”为主，优点是简单稳定；缺点是不能表达画幅、焦点、授权、压缩版本和 fallback 链。下一轮建议保持原字段不破坏，新增平行元数据：

```js
assetMeta: {
  "B-event:red_bones": {
    aspect: "4:3",
    role: "event_modal",
    focus: "center",
    source: "ai-generated",
    licenseStatus: "review-pending",
    cost: "manual-entry",
    originalPath: "../../02_设计资产/生成源文件/...",
    compressedPath: "../../02_设计资产/可用素材/B组地点事件图/EVT-012_red_bones_赤水岸骨.png",
    fallback: "location:red_marsh"
  }
}
```

建议新增字段优先级：

1. `assetMeta`：记录画幅、用途、来源、授权、成本、原始文件和压缩文件。
2. `videoAssets / videoHooks`：让视频可配置、可降级、可静音。
3. `illustrationMeta` 或并入 `assetMeta.aspect`：支持方图/4:3/16:9 混用。
4. `stageAssets.profiles[].foreground2` 可暂缓；第一版一个前景层足够。
5. `assetFallbacks` 可暂缓；当前函数已有地点图和隐藏图片框兜底。

## 5. 命名、路径与体积建议

### 5.1 路径

继续沿用现有目录，不另建复杂资产库：

- 3:1 舞台长图：`GitHub资产区/02_设计资产/可用素材/A组风格锁定/`
- 地点/事件图：`GitHub资产区/02_设计资产/可用素材/B组地点事件图/`
- 路遇/危机/结局图：`GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/`
- 绿幕源图：先放待复核或生成源区，抠图后再进入 `可用素材/分层素材/` 或 `可用素材/车队层/`
- 视频候选：先放 `GitHub资产区/07_视频动态/` 下待复核目录，不直接塞进 `prototype`

### 5.2 命名

保持可排序、可追溯、可替换：

```text
MID-BG-ROAD-002_古道荒原路段长图.png
LOC-015_new_location_id_地点名.png
EVT-015_event_id_事件名.png
RTE-014_route_event_id_路遇名.png
RND-009_random_event_id_随机路遇名.png
CRS-004_sanity_神志危机二版.png
END-004_return_variant_归返中原二版.png
FG-012_green_keyed_赤水芦苇前景_透明抠图.png
OV-012_sanity_overlay_赤水幻路污染层_透明抠图.png
VID-SAN-001_神志水纹短循环.webm
VID-SAN-001_神志水纹短循环_poster.png
```

不要使用空格、斜杠、括号堆叠、临时导出名、平台随机文件名；中文说明可以保留在最后一段。

### 5.3 体积上限

| 类型 | 单文件建议上限 | 阻断上限 | 备注 |
|---|---:|---:|---|
| 方图/4:3/16:9 PNG | 800 KB | 1.5 MB | 弹窗图优先压缩；可保留源文件另存 |
| 3:1 舞台长图 | 1.2 MB | 2.5 MB | 首屏会加载，严控体积 |
| 透明/前景 PNG | 500 KB | 1 MB | 前景层重复显示，边缘要干净 |
| poster 图 | 300 KB | 600 KB | 视频失败时第一兜底 |
| 短视频 WebM/MP4 | 2.5 MB | 5 MB | 第一版只许短循环，不做剧情长片 |

如果画质需要保留，源文件另放“生成源/原始”目录，Demo 只引用压缩版。

## 6. fallback 与加载失败策略

当前代码已经具备三类兜底：

- 生成图先看 manifest ready，再预加载；失败则使用旧图。
- 事件/路遇图失败时回退地点图或隐藏图片框。
- 车队图失败时退回 CSS 车队剪影。

下一轮继续遵守：

1. 图片缺失不阻断玩法；按钮、文本、资源变化必须仍可用。
2. 3:1 长背景缺失时使用 `profiles[].background`。
3. 事件图缺失时使用地点图；地点图也缺失时隐藏图框。
4. 视频缺失时使用 poster；poster 缺失时使用静态背景 + CSS 动效。
5. manifest 中没有的候选图默认 `manifest-missing`，不能强行进入 ready。
6. 加载失败只写 `videoNote` 或 console 信息，不弹阻断错误。

## 7. 视频方案取舍

### 7.1 HTML video

适合：短循环背景、神志污染、水纹/云影、地点氛围。

优点：浏览器原生、无需依赖、能静音循环。  
缺点：移动端自动播放限制、体积容易失控、透明视频兼容复杂。  
结论：第一版可用，但必须懒加载、默认静音、poster 兜底、motion off 时不加载。

### 7.2 CSS 动效

适合：云漂移、昼夜色调、污染闪烁、轻微背景漂移。

优点：最稳、最轻、可被 `prefers-reduced-motion` 和设置开关控制。  
缺点：表现上限有限。  
结论：继续作为默认动态层。

### 7.3 静态图

适合：地点/事件/路线决策图、结局图、危机图。

优点：最快、最稳定、最容易审授权。  
缺点：缺少动态感。  
结论：第一版素材升级仍以静态图为基准，视频只锦上添花。

### 7.4 关键帧序列

适合：只有 3-5 张轻量变化图、需要精准控制且视频兼容不好时。

优点：能用现有图片预加载和 CSS opacity 切换。  
缺点：图片数量多时请求膨胀。  
结论：作为视频失败后的 B 方案，不作为首选。

## 8. D / F / B 配合规格

### 8.1 给 D 线程

- 背景长图必须无车队、无 UI、无文字、水印、现代物品。
- 3:1 背景按 `road / market / water / rift` 四类先做，不要每个地点一张长图。
- 事件图可以优先给 4:3 或方图，但必须在交付表里标注 `aspect` 与主体焦点。
- 绿幕素材用纯绿色或高对比纯色源图；接入版必须交透明/抠图文件，不交带绿底的最终图。
- 前景、云雾、污染层要轻，不遮挡 HUD、事件文字、资源芯片和按钮。

### 8.2 给 B 线程

- 每张图需要稳定绑定一个玩法 ID：`locationId / eventId / routeEventId / crisisType / endingId`。
- 若同一事件有神志高/中/低变体，技术上先共用一个基础 ID，变体用 `assetMeta.variant` 或下一轮再拆。
- 方图/4:3 图的画面一句话要说明主体位置，方便 D 给 `focus`。
- 不要把核心事件结果写进视频或图像；文本和选择仍在事件数据里。

### 8.3 给 F 线程

- 视频默认静音；音频仍由 `audioAssets/audioHooks` 控制，不跟视频文件绑定。
- 若视频需要“低频层/神志层”同步，只给 C 一个 hook 名称，例如 `lowSanityAmbient`，不要把音轨混入视频。
- poster 与视频素材分开登记；音频授权、视频授权、图像授权分别记录。

## 9. 最小验收脚本建议

下一批素材进入 `可用素材` 前，建议执行三层检查。

### 9.1 语法与引用检查

```bash
cd /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype
node --check data.js
node --check app.js
node asset-readiness-check.js --strict
node qa-check.js
```

验收标准：

- `data.js/app.js` 无语法错误。
- manifest 能 clean load。
- 所有已引用图片存在。
- A-stage 仍为 4 个地形长图。
- 非车队层不得引用 `CAR-` 或 `车队层/`。
- B/C 生成图缺失时必须非阻断 fallback。

### 9.2 图片尺寸与体积检查

建议在 `asset-readiness-check.js` 基础上补两个轻量检查项：

- 读取 PNG 宽高，确认 `A-stage` 接近 3:1，B/C 图接近声明 `aspect`。
- 读取文件大小，超过阻断上限时报错，超过建议上限报 warning。

现有脚本已经有 `pngDimensions()` 和 `RATIO_TOLERANCE`，扩展成本低，不需要新依赖。

### 9.3 页面冒烟检查

本地打开：

```bash
cd /Users/yuanzhe/Documents/game/GitHub资产区
python3 -m http.server 4177 --bind 127.0.0.1
```

访问：

```text
http://127.0.0.1:4177/03_WebDemo/prototype/
```

手测 3 分钟：

1. 开始新局。
2. 打开地图并选一条路线。
3. 触发事件或半途路遇。
4. 处理选择，确认三资源变化。
5. 抵达下一地点，确认地点图/事件图/舞台背景没有空白。
6. 关闭动态，确认视频/动画停用后仍可玩。
7. 临时把一个候选图路径改坏一份本地副本，确认页面不白屏、按钮仍可点。

## 10. 风险与边界

- 授权风险：所有 AI 候选素材仍是内部 Demo 候选，不等于正式可商用。
- 性能风险：长图和视频最容易拖慢首屏；第一版宁可少量、高压缩、强 fallback。
- 体验风险：污染层、云雾、前景不能遮挡文字、资源和按钮。
- 工程风险：不要把不同画幅硬塞进同一个 CSS 框；先用 `assetMeta.aspect` 标记，再按需微调样式。
- 仓库风险：不要直接把大视频或源文件塞进 `prototype`；Demo 引用压缩版，源文件和台账分开。

## 11. 需要用户决策的问题

1. 下一批事件图默认主规格选 4:3，还是继续 16:9 稳定推进？
2. 方图是否只用于图鉴/危机，还是也允许进入事件弹窗？
3. 短视频第一批是否只做神志异象与背景循环，不做路线转场？
4. 视频候选单文件阻断上限是否接受 5 MB，还是压到 3 MB？
5. 绿幕源图是否由 D 线程统一先交“源图 + 抠图版”两份，还是 C 线程只接收已抠图版？

## 12. 自检

- 已读取 `主协调_BSI-UX-020_全线程物料提示语开工指令.md`、`不思异九州_任务交接台账.md`、`generated-art-manifest.js`。
- 已核对当前 manifest：ready 59 项，分组和 ID 如上。
- 已核对当前 `data.js`：已有舞台、地点、事件、路遇、失败、结局、音频槽位；视频只有 HTML 空层，缺数据字段。
- 已核对当前 `qa-check.js`：已有舞台分层、素材引用、音频 hook、manifest clean-load 等检查，可作为下一轮验收基础。
- 本轮未修改 prototype 代码，未安装依赖，未导入新素材，未 git commit/push。
