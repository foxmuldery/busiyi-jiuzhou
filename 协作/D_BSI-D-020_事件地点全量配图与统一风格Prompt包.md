# D_BSI-D-020 事件地点全量配图与统一风格 Prompt 包

> 子线程：D，视觉交互 / 美术资产规划  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 输入依据：`D_BSI-D-016`、`D_BSI-D-017`、`D_BSI-D-018`、`GitHub资产区/03_WebDemo/prototype/data.js`、`prototype/README.md`  
> 输出边界：只做视觉规范、资产清单、批次建议和可复制 AI Prompt；不修改代码，不接入素材。

## 0. 本轮判断

当前原型已经在 `stageAssets` 中为 14 个地点、14 个地点事件、13 个固定半途路遇、8 个随机半途路遇、3 类危机、结局/失败图预留了图示映射；但多数事件图和路遇图仍复用现有地点/背景素材。

本文件把这些“临时可跑图示”升级成“正式生成清单”：每个地点、城镇、祭所、墟市、禁地、半途路遇、地点事件都应有独立图示或后续小动画；所有图必须像来自同一本《山海异图》，避免每张图各自发挥。

## 1. 统一美学规范

核心方向：

- 山海经古代九州，不是泛古风、仙侠、西幻或现代奇幻。
- 横屏手机游戏可用图，优先 16:9；路段长图可用 3:1。
- 风景主导，地貌、雾、水、石、残碑、祭器、异象优先。
- 旧绢 / 旧帛书纹理，矿物颜料，工笔线稿，水墨线描。
- 荒古山水，神秘但可读；诡异可以有，但不要重口恐怖。
- 背景图不要带车队。车队后续如需出现，必须单独绿幕生成。
- 事件图可以出现器物、遗迹、祭器、远景人影、局部残车或异象，但不要现代物品，不要完整车队占画面中心。
- 所有图禁止文字、UI、按钮、水印、logo、字幕、现代路牌、现代建筑、现代交通工具。

统一色彩：

- 低饱和土黄、灰青、赭红、墨黑、旧金。
- 赤水、裂隙、神志污染可以更暗或偏红，但仍保持矿物颜料和旧绢质感。
- 不要霓虹、赛博蓝紫、现代电影强调色、二次元高饱和。

统一负面词，所有静帧都可追加：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 2. 共同参考图使用规则

首选共同参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

辅助参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

使用规则：

1. 先用现有最稳定背景 `BG-008` 作为 style reference 生成 `STYLE-REF-001_九州山海异图母图.png`。
2. 后续每次生成都上传 `STYLE-REF-001` 或 `BG-008`，并在 Prompt 里保留：`same style reference, consistent palette, consistent brush texture`。
3. 如果网页端无法读取本地路径，手动上传图片，Prompt 仍写“参考上传共同风格图”。
4. 不要混用不同平台默认风格。ChatGPT、Flow、SeeDance 之间也必须使用同一参考图、同一调色、同一笔触约束。
5. 如果 A 组风格跑偏，立即停，不要继续批量生成 B/C 组。

## 3. 生成批次建议

先小批验证风格，再全量。建议用户同时开两个或三个网页线程，但每个线程都上传同一张共同参考图。

### A 组：锁风格和路段长图

- `STYLE-REF-001`
- `MID-BG-ROAD-001`
- `MID-BG-MARKET-001`
- `MID-BG-WATER-001`
- `MID-BG-RIFT-001`

目的：先确认旧绢纹理、矿物色、荒古山水、横屏可裁切、无车队。

### B 组：地点与地点事件

- 14 个地点图：`LOC-001` 到 `LOC-014`
- 14 个地点事件图：`EVT-001` 到 `EVT-014`

目的：让玩家一眼知道“到了哪里”和“这里发生了什么”。

### C 组：半途路遇、危机、结局、UI 图标

- 13 个固定半途路遇：`RTE-001` 到 `RTE-013`
- 8 个随机半途路遇：`RND-001` 到 `RND-008`
- 3 类危机：`CRS-001` 到 `CRS-003`
- 3 个结局：`END-001` 到 `END-003`
- 若干 UI / 资源小图标：`UI-RES-*`、`UI-MARK-*`

目的：补齐遭遇图鉴、危机反馈、结局页和资源芯片。

## 4. 资产清单按优先级分层

### P0 必须：内部试玩可读闭环

| 类别 | 数量 | 说明 |
|---|---:|---|
| 共同风格母图 | 1 | `STYLE-REF-001`，后续所有图用它锁风格 |
| 路段横屏长图 | 4 | road / market / water / rift，各 1 张，3:1，无车队 |
| 地点图 | 14 | 当前 `data.js` 全地点，每站独立图 |
| 地点事件图 | 14 | 当前 `events` 全事件，每个独立图 |
| 半途路遇图 | 21 | 13 个固定 `routeEvents` + 8 个 `randomRouteEvents` |
| 危机图 | 3 | 断轴、粮尽、神志崩线 |
| 结局图 | 3 | 入裂隙、归中原、迷失/旅途断绝 |
| 资源图标 | 3 | 车轴、粮草、神志，绿幕硬边，后期抠图 |

### P1 扩展：更清楚的图鉴和状态表达

- 每类地形补 1 张备用背景变体，避免重复出现。
- 每类地点事件补 1 张缩略图裁切版，适配小横屏抽屉。
- 资源获得 / 资源扣减 / 新见闻 / 新路显影 / 补给完成小图标。
- 祭所、墟市、禁地、裂隙、路线教学等类型图标。

### P2 动态 / 视频：只做氛围，不承担关键可读信息

- 日出日落、云雾、风沙、水波、赤水无波、神志污染、裂隙呼吸。
- Flow / SeeDance 只用于短循环背景或局部氛围层。
- 不要用视频承担“事件主题”“资源变化”“选项后果”这些必须静帧也能读懂的信息。

## 5. Prompt 统一前缀

下面每条 Prompt 都已经带有完整风格约束，可直接复制。若工具支持负面词栏，把 `Negative prompt:` 后半段放进负面词栏；若不支持，就整段复制。

## 6. 具体 AI 提示语

### 6.1 通用参考风格图

#### STYLE-REF-001_九州山海异图母图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，旧帛书山海图，工笔线稿，手绘水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：一张用于统一全项目画风的九州山海异图母图，远山、荒泽、古道、残碑、低云、雾气、干涸水脉层层展开，像古老山海地图被摊开。构图：16:9 横图，前景少量荒草石块和旧路面，中景水泽残碑古道分叉，后景远山低云和不可靠异象轮廓，下方和右侧保留 UI 安静区。无车队，无人物主体，无文字，无 UI，无水印。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.2 4 张路段横屏长图

#### MID-BG-ROAD-001_古道荒原路段长图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：古道荒原、旧王道车辙、远山、残碑、荒草、低云，路面有多层车辙和被风沙掩住的旧道。构图：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，前景路面、中景荒原、后景远山天空层次清楚，适合缓慢横移和视差。背景图不要带车队，不要人物站在路中心，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### MID-BG-MARKET-001_边市废关路段长图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：青丘外邑、废关、黑齿边市外缘混合气质，远处异族墟市剪影、旧关墙、低矮门楼、残旗、黑石土路、雾中灯影。构图：3:1 超宽横向旅途背景，前景黑石土路和残旗杆，中景废关外墙与边市外缘，后景山影与雾气，保留安静区域。背景图不要带车队，不要现代市集，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### MID-BG-WATER-001_雷泽赤水路段长图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：雷泽浅滩、赤水岸、湿地水草、旧骨路标、低云贴水、水纹异象，泥泡从浅水里冒起，远处赤水无波。构图：3:1 超宽横向旅途背景，前景浅水草泥岸，中景赤水外滩和旧骨路标，后景低云远山水汽，下方留路线层安静区。背景图不要带车队，不要现代桥梁，无文字，无 UI，赭红克制不血腥。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### MID-BG-RIFT-001_归墟裂隙路段长图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：归墟边缘、暗水裂隙、远山重影、天空第二月、地图纸背般的地平线，远方像地图还没画完。构图：3:1 超宽横向旅途背景，前景裂纹路面和暗水边缘，中景断续古道与低雾，后景远山重影和异常天空。背景图不要带车队，不要科幻能量裂缝，无文字，无 UI，诡异但克制。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.3 14 个地点图

#### LOC-001_central_post_中原驿.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：中原驿立在多条古道交汇处，驿门半开，干草束、旧车辙、低矮木门、远处西路雾气，仍在人间边缘但已感到九州异域风压。构图：16:9 横图，地点主体在中景，前景留路面和车辙，下方或右侧保留 UI 安静区。无车队主体，无可读文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-002_old_king_road_故王道.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：故王道荒原，两道车辙一新一旧在残碑旁分叉，荒草掩住古道，远山灰青，路面像被不同年代反复碾过。构图：16:9 横图，车辙分叉清楚，残碑和荒草形成地点识别点，前景路面，中景分叉古道，后景远山低云。无车队主体，无可读文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-003_qingqiu_outer_city_青丘外邑.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：青丘外邑边城，低矮古门、城墙外缘、狐灯悬在墙边，灯影温和但不可信，远处丘陵和雾气包住边邑。构图：16:9 横图，城门或外邑门楼为主体，狐灯是识别元素但不要现代灯笼化，下方或右侧保留 UI 安静区。无车队主体，无可读文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-004_abandoned_pass_废关.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：废关残墙、破败门额、旧令石墙、祭所痕迹和风中残旗，关门像刚刚有人擦过灰，荒凉边境感强。构图：16:9 横图，废关门楼或残墙为主体，前景碎石断旗荒草，后景灰青远山，下方保留 UI 安静区。旧令只能有不可读笔画痕迹，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-005_bird_mouse_pass_鸟鼠夹道.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：鸟鼠夹道，山腹暗路，狭窄岩洞，鸟鼠同穴的细小痕迹，洞中微光和碎石路，岩壁像被许多小足迹磨过。构图：16:9 横图，洞口和夹道形成明显纵深，前景碎石小足迹，中景山腹暗路，后景微光。诡异但克制，不要恐怖怪物正脸，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-006_nameless_shrine_无名祠.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：无名祠，路旁无匾小祠，新香灰、空供位、短路怪脚印，荒草和低云环绕，小祠像在路旁也像挡在路中。构图：16:9 横图，小祠为中景主体，前景香灰石阶怪脚印，后景古道低云。不要可读匾额或文字，无车队主体，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-007_thunder_marsh_雷泽浅畔.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：雷泽浅畔，浅水、泥泡、低云压水，远处像有地底雷声滚过，水草和湿地层次清楚，泥面一圈圈小泡。构图：16:9 横图，前景浅水水草，中景泥泡岸线，后景低云远山。湿冷压抑但可辨认，不要现代桥梁，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-008_white_feather_mire_白羽淖.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：白羽淖浅水，白羽沉在水底，石块似乎浮在泥上，倒影轻微错乱，水下方向和重量关系不可信。构图：16:9 横图，前景浅水白羽，中景泥淖倒影，后景低雾湿地。白羽是识别重点但不要洁白发光，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-009_feather_folk_ford_羽民渡.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：羽民渡，无桥浅水渡口，白羽舟、岸边异族账册痕迹、轻物渡水的仪式感，渡口像在称量人的重量和名字。构图：16:9 横图，渡口和白羽舟为主体，前景浅水羽毛，中景岸边简陋渡具，后景雾与远岸。可有远景小人剪影，不要角色正面，不要完整车队，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-010_black_teeth_market_黑齿市.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：黑齿市外缘，黑石土路、低矮摊位、沉默商人远影、异族交易气氛，日中棚影立起但没有人声。构图：16:9 横图，黑石土路和低矮摊位形成地点识别，远景人物只作剪影或背影，不要现代市场感，下方或右侧保留 UI 安静区。无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-011_dream_map_post_梦图驿.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：梦图驿前哨，旧地图卷口像一扇小门，纸背风吹起，远处归墟雾光，现实和地图边界模糊，建筑很少，重点是地图像门。构图：16:9 横图，地图卷口或纸门为中景主体，前景旧帛边石块路面，后景雾光远山。不要可读地图字，无车队主体，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-012_red_marsh_赤水外滩.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：赤水外滩，水面无波，岸边旧骨排列成路标，草尖朝向同一方向，日落前的禁忌感。构图：16:9 横图，前景岸草浅滩，中景旧骨路标与赤水，后景低云远山，下方保留 UI 安静区。赭红克制不血腥，不要恐怖堆尸，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-013_broken_stele_巫咸断碑.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：巫咸断碑，半埋断碑、残笔、拓片、祭名空缺，荒原风沙和远山，碑上只有不可读笔画感和巫文痕迹。构图：16:9 横图，断碑为主体，前景拓片碎石荒草，中景半埋石碑，后景荒原远山，右侧或下方保留安静区。无车队主体，无真实文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### LOC-014_kyushu_rift_九州裂隙.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：九州裂隙，地平线像地图未画完处裂开，暗水和远山重影，天空低压，古地图边缘、现实地平线和归墟暗水同时错开。构图：16:9 横图，裂隙和远山重影为主体，前景旧路尽头和裂纹地面，中景暗水边缘，后景低压天空。不要科幻能量门，不要夸张发光，无车队主体，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.4 所有地点事件图

#### EVT-001_post_gate_驿门未闭.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：驿门未闭，中原驿门在风里半开，驿卒把最后一束干草塞上车旁，西边官路在远雾里延伸，归期像旧账一样压在门口。构图：16:9 横图，事件重点是半开的驿门、干草、旧车辙和西路，不要完整车队，允许局部木车器物但不占中心，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-002_split_tracks_车辙分叉.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：车辙分叉，旧王道上两道车辙一新一旧互相盖住，一道浅而绕远，一道深而伤车，随从在远景蹲下辨土。构图：16:9 横图，分叉车辙必须清楚，残碑荒草和低云辅助识别，允许远景人物剪影，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-003_closed_order_废关旧令.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：废关旧令，废关门额和残墙上留有不可读旧令痕迹，墙后有风，门木冷硬，像旧令仍在拦住西行。构图：16:9 横图，残墙旧令和破门为主体，文字只保留笔画感不可读，前景碎木铜钉，后景低雾。无完整车队，无真实文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-004_ground_thunder_地底雷声.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：地底雷声，泽水不深，雷声却像从地下滚过，泥面冒出一圈圈小泡，木板半沉在泥里，水下像有巨大鼓皮。构图：16:9 横图，前景泥泡与浅水，中景沉木和水草，后景低云压水。不要现代桥梁，不要闪电特效过强，无车队主体，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-005_black_trade_黑齿交易.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：黑齿交易，日中无声边市，黑齿商人以手势示意交易，旧铁、粮袋、白羽放在低矮摊位上，影子像在数人数。构图：16:9 横图，摊位器物为主体，商人用远景背影或剪影，不要现代市场，不要可读价码，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-006_qingqiu_lamps_狐灯绕名.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：狐灯绕名，青丘外邑墙边成排狐灯亮起，灯影像还没出口的名字，温和而不可信，城门低伏在雾里。构图：16:9 横图，灯影和城墙是主体，灯光克制不霓虹，不要现代灯笼，不要可读名册，无车队主体，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-007_hollow_pass_山腹夜声.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：山腹夜声，鸟鼠夹道的岩洞里传来细碎搬运声，碎石和暗路若隐若现，洞口微光像有小路在山中移动。构图：16:9 横图，洞口纵深清楚，前景碎石小洞，中景暗路，后景微光。不要恐怖怪物正脸，不要现代洞穴灯，无车队主体，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-008_nameless_prayer_无匾新灰.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：无匾新灰，小祠前没有匾额，香灰却是新的，灰面被风吹出半截弯路，空供位像缺一个称呼。构图：16:9 横图，小祠和香灰为主体，前景灰面足迹，中景供桌空位，后景岔路低云。无可读匾额，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-009_sunken_feather_白羽沉水.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：白羽沉水，羽毛沉在水底，重石却浮在泥上，水面反着照人，渡口方向短暂从上下颠倒处显出。构图：16:9 横图，前景白羽和浅水，中景浮石和倒影，后景雾中渡口轮廓。不要发光羽毛，不要现代物品，无车队主体，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-010_feather_ford_debt_羽民记名.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：羽民记名，渡口没有桥，白羽压在水面排成路，岸边有人记录名字的远景，但账册不可读，重物要留下一个名字。构图：16:9 横图，白羽舟和水面账感为主体，可有远景羽民剪影，不要角色正面，不要可读文字，无完整车队，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-011_dream_map_gate_梦图小门.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：梦图小门，夜里旧地图自己卷起，卷口像一扇小门，纸背风吹出，醒来后门缝仍留在纸上。构图：16:9 横图，旧帛地图卷口为主体，前景纸边和石块，中景纸门，后景归墟雾光。不要可读地图字，不要现代门，无车队主体，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-012_red_bones_赤水岸骨.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：赤水岸骨，赤水无波，岸边旧骨排列如路标，草尖一齐朝向队伍方向，日落前必须离开的禁忌感。构图：16:9 横图，骨路标和赤水岸为主体，赭红克制，不血腥，不堆尸，后景低云远山。无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-013_read_name_断碑读名.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：断碑读名，半埋断碑、拓片卷起、残笔像在等待名字补全，石屑和荒草被低风吹动，碑文缺口像要落在人身上。构图：16:9 横图，断碑和拓片为主体，巫文不可读，只保留笔画感，无真实文字，无完整车队，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### EVT-014_rift_dream_裂隙前梦.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏事件图，神秘但可读。主体：裂隙前梦，众人梦见同一张地图，地图边缘没有画完，折痕压在队伍所在位置，醒来后车辙也按折痕转弯。构图：16:9 横图，旧地图、折痕、地平线错位为主体，梦境感克制，不要人物特写，不要科幻裂缝，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.5 所有半途路遇图

#### RTE-001_wheel_omen_轮声入骨.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：轮声入骨，空路上车辙无人自响，轴心暗裂的局部符号，路面没有石子却像有回声从车轮里追来。构图：16:9 横图，前景车辙和局部轴心符号，中景荒路，后景低云。允许局部车轮器物，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-002_roadside_shrine_路旁无名祠.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：路旁无名祠，小祠无匾，香灰新鲜，祠后短路旁留着怪脚印，供位空着像写着车队的影子。构图：16:9 横图，小祠和香灰为主体，前景脚印，后景岔路低云。无可读匾额，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-003_black_cloud_半途黑云.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：半途黑云，黑云贴着地面滚来，像低飞的影，古道前方被黑云吞没，地上黑色的口像在等待车辙。构图：16:9 横图，前景古道车辙，中景贴地黑云，后景低天远山。不要现代风暴特效，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-004_wenao_fish_rain_文鳐雨.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：文鳐雨，薄云里文鳐游过，鳞光像雨落在车辙旁，粮袋闻到水腥味，天上先响起水声。构图：16:9 横图，鱼影在云中克制出现，前景古道湿痕，中景鳞光如雨，后景浅泽远山。不要可爱鱼群，不要强发光，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-005_dang_kang_field_cry_当康啼垄.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：当康啼垄，荒垄里白牙兽低啼，旧田鼓起翻出谷味，土地像在等车轮压下。构图：16:9 横图，异兽只作远景或半遮轮廓，前景田垄干谷，中景鼓起土地，后景荒原低云。不要可爱化，不要怪物正脸抢画面，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-006_xuan_gui_shell_bridge_旋龟浮甲.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：旋龟浮甲，浅水浮出巨大龟甲，甲纹接成一截临时桥，水声在车后合拢，像路背着甲醒来。构图：16:9 横图，龟甲桥为中景主体，前景浅水泥岸，后景低雾湿地。不要可爱化，不要现代桥梁，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-007_zhu_bird_name_call_鴸鸟呼名.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：鴸鸟呼名，赤喙怪鸟落在旧辕木或枯木上，像在呼喊人的姓名，名字自己飞到辕木上等待回应。构图：16:9 横图，鸟与枯木为视觉点，前景旧辕木局部，中景荒路，后景低云远山。不要现代鸟笼，不要完整车队，无可读名字，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-008_fox_lamp_tail_九尾灯影.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：九尾灯影，岔路旁九点狐灯排开，灯影像九条尾巴拖在土上，只照出近路边缘，每条都通向同一盏灯。构图：16:9 横图，狐灯和尾影为主体，前景岔路土面，中景灯影，后景雾中边邑。灯光克制不霓虹，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-009_black_teeth_scale_price_黑齿鳞价.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：黑齿鳞价，路心摊着一片青鳞，黑齿商人远影伸三指比价，鳞片带水，像刚从价码里捞出。构图：16:9 横图，青鳞和黑石小摊为主体，商人远景剪影，前景土路，后景边市雾影。不要可读价码，不要现代摊位，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-010_ming_snake_crosswind_鸣蛇横风.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：鸣蛇横风，无风处忽起细鸣，蛇影横过车辙，风像长出鳞，用细鸣挡住古道。构图：16:9 横图，蛇影和车辙交叉为主体，前景土路鳞影，中景荒草，后景低云裂山。不要真实巨蛇正面，不要现代特效，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-011_bone_ox_rut_骨牛空辙.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：骨牛空辙，一头骨牛拉着空车从侧路无声经过，车没有轮，却在土上压出深辙，空辙比前路更清楚。构图：16:9 横图，骨牛和空辙为中远景，不血腥，前景深辙土路，后景暮色荒原。不要完整玩家车队，不要恐怖堆骨，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-012_mirror_reed_bed_倒芦照人.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：倒芦照人，芦苇倒生在水面下，穗上挂着白籽，倒影先伸了手，岸上的影子像在收割人。构图：16:9 横图，水面和倒生芦苇为主体，前景浅水倒影，中景白籽芦穗，后景水岸低雾。不要恐怖手臂特写，不要现代湿地设施，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RTE-013_dream_cicada_shell_梦蝉蜕壳.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏半途路遇图，神秘但可读。主体：梦蝉蜕壳，枯树挂满蝉蜕，空壳里有微弱车声，每只壳都朝西，西边像一层旧皮。构图：16:9 横图，枯树和蝉蜕为主体，前景碎壳和荒草，中景枯树，后景梦图雾光。不要昆虫恐怖特写，不要现代树林，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-001_loose_axle_song_鸣蛇入轴.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：鸣蛇入轴，轮毂局部发热，像有看不见的鸣蛇盘绕其中，木楔没有裂却一直发出细鸣。构图：16:9 横图，局部车轮和轮毂作为器物特写但不画完整车队，前景木楔绳结，中景荒路，后景低云。无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-002_bitter_grass_soup_祝余苦汤.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：祝余苦汤，路旁祝余草叶厚如小掌，旧陶罐中黑色草汤微微冒气，苦味像夜路但能压饥。构图：16:9 横图，祝余草和陶罐为主体，前景草叶汤气，中景荒路，后景远山低云。不要现代锅具，不要写实食物广告感，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-003_wrong_milestone_巫咸反里.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：巫咸反里，里程牌倒插在路边，反字痕迹像往西生长但不可读，木牌背后雾气和古道像在倒数。构图：16:9 横图，倒插木牌和反向路痕为主体，前景土路，后景灰雾远山。文字不可读，只保留笔画感，无完整车队，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-004_silent_barter_黑齿影价.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：黑齿影价，路旁无声小摊，黑齿商人的影子伸手比价，摊上的粮袋没有口却很沉，价码在地上爬来爬去但不可读。构图：16:9 横图，影子和小摊为主体，商人远景剪影，黑石土路和低棚影。不要现代市场，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-005_repeated_footprints_夸父复迹.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：夸父复迹，路面出现半日前车队自己的脚印，又大得不像人，脚印朝西也朝回头路，日影追在后面。构图：16:9 横图，巨大旧脚印和古道为主体，前景尘土脚印，中景荒路回折，后景低日远山。不要现代鞋印，不要怪物正脸，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-006_count_names_rest_巫咸点名.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：巫咸点名，短暂停车点名，地上影子数量比人多或少一个，旧帛名册不可读，空答应在队尾退到风里。构图：16:9 横图，影子和旧帛名册为主体，人物只作远景剪影，前景地面影子，中景旧帛，后景荒路。不要可读姓名，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-007_low_black_cloud_gap_雷泽云缝.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：雷泽云缝，贴地黑云裂开一条干路，云缝像门也像口，缝里没有雨，只有很干的雷声。构图：16:9 横图，贴地黑云和干路为主体，前景浅泽泥岸，中景云缝，后景低天远山。不要现代风暴，不要强闪电特效，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### RND-008_breathing_map_烛龙息图.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏随机半途路遇图，神秘但可读。主体：烛龙息图，旧地图纸面像胸口呼吸，山川随一呼一吸偏移，白天和黑夜位置互换，图背慢慢转动。构图：16:9 横图，旧帛地图和起伏纸面为主体，前景纸纹墨线，中景山川错位，后景裂隙暗光。不要可读地图字，不要科幻全息，无完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.6 3 类危机图

#### CRS-001_axle_断轴边缘.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏危机图，神秘但可读。主体：断轴边缘，断裂车轴局部、旧绳、铜钉、门木和辐条堆在荒路上，车轮歪斜像在原地画符，队伍濒临停滞。构图：16:9 横图，局部残车器物为主体，但不要完整车队，前景断轴绳钉，中景荒路，后景低云。无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### CRS-002_grain_粮袋见底.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏危机图，神秘但可读。主体：粮袋见底，最后一袋粟倒在旧布上，少得不像一支队伍的明日，空粮袋被冷风吹起，粮粒朝同一方向散落。构图：16:9 横图，粮袋旧布和少量粟粒为主体，前景细节清楚，中景荒地，后景低风远山。不要现代粮袋，不要文字商标，无完整车队，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### CRS-003_sanity_神志崩线.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏危机图，神秘但可读。主体：神志崩线，记路人的笔落在旧地图旁，影子被当成路标，墨迹和道路开始散开，字散了，路散了，只有车轮声还在。构图：16:9 横图，旧地图、落笔、散开的墨路和错位影子为主体，梦魇感克制，不要可读文字，不要恐怖脸，无完整车队，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.7 3 个结局图

#### END-001_rift_入裂隙.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏结局图，神秘但可读。主体：入裂隙，地图没有画完的地方打开，地平线裂成暗水与远山重影，旧路尽头通向未名处，来路和去路都变薄。构图：16:9 横图，裂隙和旧帛地图边缘为主体，仪式感强但克制，不要科幻能量门，不要完整车队，只可有极远极小剪影，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### END-002_return_归中原.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏结局图，神秘但可读。主体：归中原，残图被火烧成灰，灰烬飞起时来路仍在人间，远处中原古道若隐若现，归返但未圆满。构图：16:9 横图，残图灰烬和远处古道为主体，前景旧帛火灰，中景回路，后景淡雾驿灯。不要现代火光，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

#### END-003_lost_stranded_迷失九州_旅途断绝.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，水墨线描与矿物颜料，横屏手机游戏结局/失败图，神秘但可读。主体：迷失九州 / 旅途断绝，旧帛书地图沉入雾中，路线断裂，远山和水泽无法辨认，几处路标互相矛盾，人间方向消失。构图：16:9 横图，断裂路线和沉雾地图为主体，前景碎路标和旧帛边，中景雾中断路，后景不可辨远山。不要现代迷宫，不要完整车队，无文字无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 6.8 UI 小图标 / 资源图标

透明资产不要要求透明背景，先按绿幕硬边规则生成，再后期抠图。

#### UI-RES-001_车轴资源图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 资源图标，旧绢矿物色质感，主体：一枚古车轴 / 车轮辐条资源图标，木轴、铜钉、旧绳，轮廓清楚，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, text, number, logo, modern tire, metal car wheel, 3d render, photorealistic, anime, cartoon
```

#### UI-RES-002_粮草资源图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 资源图标，旧绢矿物色质感，主体：一只古布粮袋和几粒粟，粮袋扎口、旧麻布、少量谷粒，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, text, number, logo, modern sack label, plastic bag, 3d render, photorealistic, anime, cartoon
```

#### UI-RES-003_神志资源图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 资源图标，旧绢矿物色质感，主体：一枚旧帛地图卷、落笔和轻微错位影子组成的神志图标，象征记路和心神，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, number, logo, modern brain icon, sci-fi icon, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-001_地图显影图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：一角旧帛地图被风掀起，露出一段新路墨线，用于地图显影提示，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, modern map pin, GPS icon, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-002_见闻入志图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：一枚小竹简 / 旧帛册页收入一缕山雾，表示新见闻入志，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, modern notebook, modern book, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-003_路遇图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：古道车辙旁突然出现一枚小异象符号，像风、云、蛇影混合，用于半途路遇提示，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, modern warning sign, neon icon, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-004_祭所图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：无匾小祠、香灰和短脚印组合成祭所图标，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, modern temple, neon shrine, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-005_墟市图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：黑石小摊、青鳞和粮袋组合成墟市交易图标，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, modern shop, modern price tag, 3d render, photorealistic, anime, cartoon
```

#### UI-MARK-006_裂隙图标绿幕.png

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。山海经古代九州横屏手机游戏 UI 小图标，旧绢矿物色质感，主体：旧帛地图边缘裂开一条暗水细缝，用于裂隙 / 禁地提示，小尺寸可读。512x512，single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur，无文字无数字无 UI 框，不要透明背景，不要棋盘格。Negative prompt: transparent background, checkerboard transparency, soft edge, feathering, glow, cast shadow, motion blur, readable text, logo, sci-fi portal, neon crack, 3d render, photorealistic, anime, cartoon
```

## 7. 绿幕抠图规则

适用对象：

- 资源图标、状态图标、地图标记、可能后续独立叠加的车队/器物/异象小素材。
- 不适用于地点背景和事件大图。背景图直接生成完整横图，不要绿幕。

必须写入 Prompt：

```text
single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur
```

明确禁忌：

- 不要要求透明背景。
- 不要假透明棋盘格。
- 不要柔边、羽化、光晕、投影、运动模糊。
- 不要把绿色反光画到主体上。
- 图标主体必须完整，不要被裁切，边缘干净，后期方便一键抠图。

## 8. SeeDance / Flow 视频只做 P2

适合做视频的内容：

- 日出日落：地点图或路段长图上做 3-5 秒轻微光线变化。
- 云雾 / 风沙：古道、废关、裂隙边缘的低速循环。
- 水波：雷泽、赤水、白羽淖、羽民渡的微弱水纹。
- 神志污染：旧地图墨线轻微漂移，影子错位，低频呼吸感。
- 裂隙呼吸：九州裂隙边缘轻微开合，暗水起伏。

不适合做视频的内容：

- 不要用视频承担关键文字、路线、资源变化、选项后果。
- 不要把事件主体只放在动态里；静帧停住时仍必须看得懂。
- 不要生成夸张镜头运动、人物冲突、现代 VFX 裂缝、强光爆炸。
- 不要给 P0 内部试玩增加视频依赖。P0 静帧必须已经可玩可读。

## 9. 命名与尺寸建议

命名：

- 共同参考图：`STYLE-REF-001_九州山海异图母图.png`
- 路段长图：`MID-BG-{TERRAIN}-001_{中文主题}.png`
- 地点图：`LOC-序号_locationId_中文名.png`
- 地点事件图：`EVT-序号_eventId_中文名.png`
- 固定半途路遇：`RTE-序号_routeEventId_中文名.png`
- 随机半途路遇：`RND-序号_randomEventId_中文名.png`
- 危机图：`CRS-序号_resourceId_中文名.png`
- 结局图：`END-序号_endingId_中文名.png`
- UI / 资源图标：`UI-RES-序号_中文名_绿幕.png`、`UI-MARK-序号_中文名_绿幕.png`

尺寸：

| 用途 | 推荐尺寸 | 裁切策略 |
|---|---:|---|
| 风格母图 | 2048x1152 | 16:9，保留下方/右侧安静区 |
| 路段长图 | 3072x1024 | 3:1，左右可横移，中间不要关键 UI |
| 地点图 | 1920x1080 | 16:9，小横屏可中裁 |
| 事件 / 路遇图 | 1920x1080 | 16:9，主体在中景，不贴边 |
| 危机 / 结局图 | 1920x1080 | 16:9，主体清楚，可压暗但不糊 |
| UI / 资源图标 | 512x512 或 1024x1024 | 纯绿背景，主体完整居中，硬边 |

## 10. 给主线程验收清单

- [ ] 数量：是否至少有 1 张风格母图、4 张路段长图、14 张地点图、14 张地点事件图、21 张半途路遇图、3 张危机图、3 张结局图、3 张资源图标。
- [ ] 命名：是否按 `STYLE-REF / MID-BG / LOC / EVT / RTE / RND / CRS / END / UI-RES / UI-MARK` 命名，能直接映射到 `data.js` 的 ID。
- [ ] 尺寸：地点/事件/危机/结局是否 16:9，路段长图是否 3:1，图标是否方图。
- [ ] 车队：背景图是否完全不带车队；事件图如有局部车轮/器物，是否没有完整车队占中心。
- [ ] 裁切：小横屏中裁后，主体是否仍可读；下方/右侧是否有 UI 安静区。
- [ ] 风格：是否同一参考图、同一矿物色、同一旧绢笔触，没有二次元、3D、写实摄影、西幻或科幻跳风格。
- [ ] 可读性：地点图是否一眼区分城镇、祭所、墟市、禁地、水泽、裂隙；事件图是否一眼看出事件主题。
- [ ] 绿幕：图标和独立叠加素材是否纯绿色背景、硬边、无虚化、无光晕、无投影、无运动模糊，没有要求透明背景。
- [ ] P2：视频是否只做氛围层；静帧是否已经能承担全部关键可读信息。
- [ ] 小横屏：图像压到手机横屏时，主体不糊、不挤、不被 UI 盖住，颜色不影响资源、选项和日志阅读。
