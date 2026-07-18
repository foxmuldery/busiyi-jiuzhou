# D_BSI-D-016 全量图像需求与统一 AI 提示语任务书

> 子线程：D 视觉体验与交互氛围设计师  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-18  
> 状态：主线程已批准开工  
> 目标：为当前 Web Demo 列出全量图片需求，并输出统一美学风格下的逐图 AI 生成提示语。  
> 边界：D 线程只产出视觉规范、参考图策略和可复制 Prompt 包；不修改代码，不接素材，不改玩法。

## 0. 主线程判断

当前试玩版需要从“文字选择游戏”继续推进到“山海经见闻游戏”。地点、事件、路遇、危机和结局都应有图示，哪怕首版部分复用同类图，也必须建立完整图片需求和统一美学规范。

不要让每张图各自发挥。所有图必须像来自同一本《山海异图》。

## 1. 统一美学规范

### 1.1 共同参考图

首选共同参考图：

- [BG-008_横向山海旅途舞台总场景.png](/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png)

辅助参考图：

- [BG-010_废关古道地点背景.png](/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png)
- [BG-009_赤水泽畔中景地貌.png](/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png)
- [BG-013_归墟边缘暗水裂隙.png](/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png)

如用户愿意再生一张“风格母图”，D 线程先输出 `STYLE-REF-001_九州山海异图母图` 提示语。后续所有图片都用这张母图作为共同 reference。

### 1.2 统一画风

核心风格：

- 中国古代神秘九州远行。
- 《山海经》异域地貌和古地图气质。
- 手绘感，水墨线描 + 矿物颜料 + 旧帛书纹理。
- 横向电影构图，但不是现代电影感。
- 低饱和土黄、灰青、赭红、墨黑、旧金为主。
- 画面允许神秘和诡异，但不要重口恐怖。
- 山、水、雾、石、残碑、祭器、异兽痕迹优先，人和车队弱化。

禁止项：

- 不要现代建筑、现代衣物、现代车辆、电线、霓虹。
- 不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。
- 不要动漫二次元、Q 版、3D 卡通、写实摄影。
- 不要把文字、UI、按钮、标题、水印画进图片。
- 不要把车队烘焙进背景图。车队如果后续要用，必须单独生绿幕或单色背景。
- 不要假透明棋盘格。
- 不要强烈虚化光边、发光描边、过度景深。

### 1.3 规格

| 用途 | 推荐尺寸 | 构图 | 是否带车队 | 是否带文字 |
|---|---|---|---|---|
| 风格母图 | 2048x1152 或 16:9 | 远景横向山海路 | 否 | 否 |
| 横向路段背景 | 3072x1024 或 3:1 | 可缓慢横移的长图 | 否 | 否 |
| 地点图 | 1920x1080 或 16:9 | 地点主体清楚，留 UI 安全区 | 否 | 否 |
| 事件图 | 1920x1080 或 16:9 | 一个异象/动作瞬间 | 通常否 | 否 |
| 危机/失败图 | 1920x1080 或 16:9 | 资源崩坏状态 | 可有残车局部，不要完整车队 | 否 |
| 结局图 | 1920x1080 或 16:9 | 仪式感、终局感 | 否 | 否 |
| 后续动画关键帧 | 同静帧 | 同一机位 2-3 帧 | 按需求 | 否 |

## 2. Prompt 通用骨架

D 线程输出每张图时，都应使用下面结构：

```text
统一前缀：
中国古代神秘九州，《山海经》气质，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，横向电影构图，幽远、古老、神秘，细节丰富但不拥挤，no text, no watermark, no UI

单图主体：
【这里写地点/事件的具体画面】

构图要求：
16:9 横图，主体在中景或远景，前景留少量路面/水面/祭器，画面下方或右侧保留可叠 UI 的安静区域

统一负面词：
modern city, modern vehicle, sci-fi, western fantasy castle, anime, cartoon, 3d render, photorealistic, neon, overexposed glow, readable text, logo, watermark, UI panel, checkerboard transparency, baked caravan, blurry edge
```

横向路段背景额外加：

```text
wide panoramic landscape, 3:1 aspect ratio, seamless-feeling horizontal travel background, no caravan, no characters in the road center, clear depth layers for parallax
```

绿幕/单独动态素材额外加：

```text
single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur
```

## 3. 全量图片需求总表

### 3.1 风格与路段中地图

| ID | 用途 | 优先级 | 画面主题 | D 线程输出 |
|---|---|---:|---|---|
| STYLE-REF-001 | 全项目风格母图 | P0 | 九州山海远行、旧帛书质感、远山荒泽、无车队 | 1 条母图 Prompt |
| MID-BG-ROAD-001 | road 路段中地图 | P0 | 古道、荒原、旧王道、远山和车辙 | 1 条 3:1 长图 Prompt |
| MID-BG-MARKET-001 | market 路段中地图 | P0 | 青丘/废关/黑齿边市外缘，异族墟市远影 | 1 条 3:1 长图 Prompt |
| MID-BG-WATER-001 | water 路段中地图 | P0 | 雷泽、赤水、浅滩、水草、白骨或水纹异象 | 1 条 3:1 长图 Prompt |
| MID-BG-RIFT-001 | rift 路段中地图 | P0 | 归墟边缘、地图裂隙、远山重影、暗水 | 1 条 3:1 长图 Prompt |

### 3.2 地点图 14 张

| ID | locationId | 地点 | 地形 | 画面主题 | 优先级 |
|---|---|---|---|---|---:|
| LOC-001 | central_post | 中原驿 | road | 驿站将闭、车马未出、路口分岔 | P0 |
| LOC-002 | old_king_road | 故王道 | road | 旧王道车辙分叉、荒草与残碑 | P0 |
| LOC-003 | qingqiu_outer_city | 青丘外邑 | market | 狐灯、边邑门楼、温和但不可信的灯影 | P1 |
| LOC-004 | abandoned_pass | 废关 | market | 废关门额、旧令残墙、祭所残痕 | P0 |
| LOC-005 | bird_mouse_pass | 鸟鼠夹道 | road | 山腹暗路、鸟鼠同穴、岩洞夜声 | P1 |
| LOC-006 | nameless_shrine | 无名祠 | road | 无匾小祠、新香灰、短路怪脚印 | P0 |
| LOC-007 | thunder_marsh | 雷泽浅畔 | water | 浅泽、地底雷泡、低云压水 | P0 |
| LOC-008 | white_feather_mire | 白羽淖 | water | 羽毛沉水、倒影错乱、浅水白羽 | P1 |
| LOC-009 | feather_folk_ford | 羽民渡 | water | 无桥渡口、白羽舟、异族账册感 | P1 |
| LOC-010 | black_teeth_market | 黑齿市 | market | 黑齿边市、无声交易、黑石土路 | P0 |
| LOC-011 | dream_map_post | 梦图驿 | rift | 卷起的地图小门、纸背风、裂隙前哨 | P1 |
| LOC-012 | red_marsh | 赤水外滩 | water | 赤水无波、岸边旧骨、禁忌路标 | P0 |
| LOC-013 | broken_stele | 巫咸断碑 | road | 半埋断碑、残笔、祭名空缺 | P0 |
| LOC-014 | kyushu_rift | 九州裂隙 | rift | 地平线裂开、地图未画完、归墟暗水 | P0 |

### 3.3 地点事件图 14 张

| ID | eventId | 标题 | 标签 | 画面主题 | 优先级 |
|---|---|---|---|---|---:|
| EVT-001 | post_gate | 驿门未闭 | 出发 | 驿卒塞草、驿门半开、西路将暗 | P0 |
| EVT-002 | split_tracks | 车辙分叉 | 路线教学 | 两道车辙一新一旧，随从辨土 | P0 |
| EVT-003 | closed_order | 废关旧令 | 边境 | 残墙旧令“不得西行”的视觉感，但不要真实文字 | P0 |
| EVT-004 | ground_thunder | 地底雷声 | 泽地 | 泥水冒泡、雷声从车底来 | P0 |
| EVT-005 | black_trade | 黑齿交易 | 异族 | 黑齿商人手势、旧铁换粮、摊位无声 | P0 |
| EVT-006 | qingqiu_lamps | 狐灯绕名 | 边邑 | 狐灯绕墙、真名假名的灯影 | P1 |
| EVT-007 | hollow_pass | 山腹夜声 | 山隘 | 山洞里细碎搬运声、暗路若隐若现 | P1 |
| EVT-008 | nameless_prayer | 无匾新灰 | 祭所 | 空供位、新香灰、灰面显路 | P0 |
| EVT-009 | sunken_feather | 白羽沉水 | 异象 | 羽毛沉在水底，重石浮在泥上 | P1 |
| EVT-010 | feather_ford_debt | 羽民记名 | 渡口 | 羽民渡口，轻物过水，重物留名 | P1 |
| EVT-011 | dream_map_gate | 梦图小门 | 前哨 | 地图卷口像门，纸上仍有门缝 | P1 |
| EVT-012 | red_bones | 赤水岸骨 | 禁忌 | 赤水岸骨排列成路标，日落前离开 | P0 |
| EVT-013 | read_name | 断碑读名 | 巫文 | 断碑残笔、拓片、名字被碑补全的危险 | P0 |
| EVT-014 | rift_dream | 裂隙前梦 | 边界 | 众人梦见同一张地图，边缘未画完 | P0 |

### 3.4 固定路遇图 13 张

| ID | routeEventId | 标题 | 画面主题 | 优先级 |
|---|---|---|---|---:|
| RTE-001 | wheel_omen | 轮声入骨 | 空路上车轮声入骨，轴心暗裂 | P0 |
| RTE-002 | roadside_shrine | 路旁无名祠 | 小祠无匾，新香灰，怪脚印 | P0 |
| RTE-003 | black_cloud | 半途黑云 | 黑云贴地滚来，车队需避云 | P0 |
| RTE-004 | wenao_fish_rain | 文鳐雨 | 云里文鳐游过，鳞光如雨 | P1 |
| RTE-005 | dang_kang_field_cry | 当康啼垄 | 荒垄白牙兽低啼，旧田翻谷 | P1 |
| RTE-006 | xuan_gui_shell_bridge | 旋龟浮甲 | 浅水龟甲接成桥 | P1 |
| RTE-007 | zhu_bird_name_call | 鴸鸟呼名 | 赤喙鸟落辕木，叫人姓名 | P1 |
| RTE-008 | fox_lamp_tail | 九尾灯影 | 岔路九点狐灯，尾影拖地 | P1 |
| RTE-009 | black_teeth_scale_price | 黑齿鳞价 | 青鳞摊位，黑齿商人比价 | P0 |
| RTE-010 | ming_snake_crosswind | 鸣蛇横风 | 无风处蛇影横过车辙 | P0 |
| RTE-011 | bone_ox_rut | 骨牛空辙 | 骨牛拉空车，无轮却压出深辙 | P1 |
| RTE-012 | mirror_reed_bed | 倒芦照人 | 倒生芦苇，水下倒影伸手 | P1 |
| RTE-013 | dream_cicada_shell | 梦蝉蜕壳 | 枯树蝉蜕，空壳里有车声 | P1 |

### 3.5 随机路遇图 8 张

| ID | randomEventId | 标题 | 画面主题 | 优先级 |
|---|---|---|---|---:|
| RND-001 | rnd_loose_axle_song | 鸣蛇入轴 | 轮毂里像有细蛇盘绕，木楔发热 | P0 |
| RND-002 | rnd_bitter_grass_soup | 祝余苦汤 | 路旁祝余草，黑汤压饥 | P0 |
| RND-003 | rnd_wrong_milestone | 巫咸反里 | 倒插里程牌，反字往西长 | P1 |
| RND-004 | rnd_silent_barter | 黑齿影价 | 无声小摊，影子伸手比价 | P0 |
| RND-005 | rnd_repeated_footprints | 夸父复迹 | 半日前脚印巨大，朝西也朝回头路 | P1 |
| RND-006 | rnd_count_names_rest | 巫咸点名 | 停车点名，人数比影子少一个 | P1 |
| RND-007 | rnd_low_black_cloud_gap | 雷泽云缝 | 贴地黑云裂开一条干路 | P1 |
| RND-008 | rnd_breathing_map | 烛龙息图 | 地图像胸口呼吸，昼夜换位 | P1 |

### 3.6 危机、失败、结局图

| ID | 系统 ID | 标题 | 画面主题 | 优先级 |
|---|---|---|---|---:|
| CRS-001 | axle | 断轴边缘 | 断裂车轴、绳钉门木堆在一起，局部残车即可 | P0 |
| CRS-002 | grain | 粮袋见底 | 最后一袋粟倒在布上，粮尽寒意 | P0 |
| CRS-003 | sanity | 神志崩线 | 记路人忘笔，影子当路标，文字散开 | P0 |
| END-001 | rift | 入裂隙 | 地图未画完处，地平线裂开，队伍将入未名处 | P0 |
| END-002 | return | 归中原 | 灰烬飞起，来路仍在人间，残图折返 | P1 |
| END-003 | stranded/lost | 迷失九州 | 旧帛书地图沉入雾中，路线断裂，人间不可辨 | P1 |

## 4. D 线程交付格式

D 线程下一步必须输出一个新文件，建议命名：

```text
协作/D_BSI-D-017_全量图像AI提示语一键复制版.md
```

该文件必须包含：

1. `STYLE-REF-001` 母图提示语。
2. 4 张横向路段背景提示语。
3. 14 张地点图提示语。
4. 14 张地点事件图提示语。
5. 21 张路遇图提示语。
6. 3 张危机图提示语。
7. 3 张结局/失败图提示语。
8. 每张图必须包含：
   - 文件建议名。
   - 推荐比例。
   - 可复制正向 Prompt。
   - 统一负向 Prompt。
   - 是否需要上传共同参考图。
   - 是否禁止车队。

## 5. 生成批次建议

### A 批：锁风格

先生成：

- `STYLE-REF-001`
- `MID-BG-ROAD-001`
- `MID-BG-MARKET-001`
- `MID-BG-WATER-001`
- `MID-BG-RIFT-001`

目的：确认整体风格、色彩、纹理、横向风景节奏。

### B 批：地点图

生成 14 张地点图。地点图承担“我到了哪里”的第一视觉锚点，优先于事件图。

### C 批：事件与路遇

生成 14 张地点事件 + 21 张路遇。首版允许只做静帧。后续如果要视频，用这些静帧做首帧或参考帧。

### D 批：危机与结局

生成 3 张危机 + 3 张结局/失败图。用于告急、失败、结局页和复盘。

## 6. 验收标准

主线程验收 D 的提示语时，只看以下标准：

- 同一批提示语是否明显属于同一本画册。
- 是否每张图都无文字、无 UI、无水印。
- 横向背景是否明确禁止烘焙车队。
- 地点图是否能一眼区分墟市、祭所、禁地、水泽、裂隙。
- 事件图是否能一眼看出事件主题，而不是普通风景。
- 低神志/裂隙类是否诡异但不跳到西幻或科幻。
- 是否能直接复制给 ChatGPT 网页版、Flow 或其它生图工具使用。

## 7. 给 C 线程的后续接入预期

D 完成提示语后，C 线程再做：

1. `stageAssets.eventIllustrations` 映射。
2. `stageAssets.routeEventIllustrations` 映射。
3. `stageAssets.randomRouteEventIllustrations` 映射。
4. QA 检查所有地点、地点事件、路遇、危机、结局都有图。
5. 半途路段图默认隐藏车队，以风景横移为主。

在图片未生成前，C 不应继续硬接更多临时车队效果。

## 8. 主线程备注

用户已经明确：如果小车和地面不搭，可以不要小车。第一优先级应转为“风光主导 + 横向路段中地图 + 每个地点/事件都有图”。图片生产时必须优先服务这个方向。
