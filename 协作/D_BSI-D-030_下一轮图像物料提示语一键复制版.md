# D_BSI-D-030 下一轮图像物料提示语一键复制版

> 子线程：D，视觉体验与交互氛围设计师  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 对齐：`主协调_BSI-UX-020`、`D_BSI-D-017`、`D_BSI-D-024`  
> 边界：只提供图像生成提示语与视觉规范；不改代码，不移动素材，不标记任何 AI 候选素材为正式商用。

## 0. 给用户直接复制版

这批先生成 24 张，分 A/B/C 三组，适合开两个或三个生图线程并行：

- A 组：4 张横向旅途长图 + 4 张关键地点图。
- B 组：8 张高频事件/路遇弹窗图，优先 4:3 或 1:1，解决连续同图和弹窗缺乏参与感的问题。
- C 组：6 张随机/危机/结局图 + 1 张第二优先事件图 + 1 张绿幕资源图标，补齐沉浸感和资源反馈。

共同参考图建议优先上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

辅助参考图按题材补充上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

## 1. 统一美学规范 2.0

### 1.1 两套画幅体系

横向旅途长图：

- 用途：旅途舞台背景、中地图横向路段、假动态横移。
- 推荐画幅：`3:1`，建议生成 `3072x1024` 或 `3840x1280`。
- 构图：左中右都要有可裁切内容；前景路面、中景地点或路段、后景山影、天空云气分层清楚。
- 禁止：不要把车队、按钮、路线节点、文字、地图 UI 烘焙进背景。

弹窗方图/4:3 图：

- 用途：事件弹窗、路遇弹窗、危机、补给/选择结果。
- 推荐画幅：优先 `4:3`，建议 `1600x1200`；物件型路遇可用 `1:1`，建议 `1536x1536`。
- 构图：主体集中，边缘安静，适合放在居中弹窗上方；不要过度全景化。
- 禁止：不要生成网页 UI、文字标题、按钮、选项、面板、地图钉。

### 1.2 统一正向风格

所有图片尽量沿用这一段核心风格，不要改成泛仙侠或西幻：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，但不直接照抄古籍图像；古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合。低饱和土黄、灰青、赭红、墨黑、旧金；画面古老、克制、荒凉、神秘，但主体清晰可读。适合横屏手游 Web Demo，不是宣传海报，不是现代网页插画。
```

### 1.3 统一负面规范

所有背景、地点、事件、路遇、危机、结局图都使用：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

绿幕抠图素材单独使用：

```text
Negative prompt: checkerboard transparency, fake transparent background, transparent layer, gradient background, textured background, shadow, cast shadow, glow, rim light, motion blur, soft blurry edge, heavy feathering, UI panel, text, watermark, logo, photorealistic render, 3d plastic icon, modern object
```

## 2. 第一批优先生图清单

| 组别 | 序号 | 资产 ID | 用途 | 画幅 | 是否禁止车队 |
|---|---:|---|---|---|---|
| A | A01 | `MID-BG-ROAD-001` | 古道荒原旅途长图 | 3:1 | 是 |
| A | A02 | `MID-BG-MARKET-001` | 边市废关旅途长图 | 3:1 | 是 |
| A | A03 | `MID-BG-WATER-001` | 雷泽赤水旅途长图 | 3:1 | 是 |
| A | A04 | `MID-BG-RIFT-001` | 归墟裂隙旅途长图 | 3:1 | 是 |
| A | A05 | `LOC-001_central_post` | 中原驿地点图 | 16:9 | 是 |
| A | A06 | `LOC-004_abandoned_pass` | 废关地点图 | 16:9 | 是 |
| A | A07 | `LOC-010_black_teeth_market` | 黑齿市地点图 | 16:9 | 是 |
| A | A08 | `LOC-014_kyushu_rift` | 九州裂隙地点图 | 16:9 | 是 |
| B | B01 | `EVT-001_post_gate` | 驿门未闭事件弹窗 | 4:3 | 是 |
| B | B02 | `EVT-002_split_tracks` | 车辙分叉事件弹窗 | 4:3 | 是 |
| B | B03 | `EVT-003_closed_order` | 废关旧令事件弹窗 | 4:3 | 是 |
| B | B04 | `EVT-005_black_trade` | 黑齿交易事件弹窗 | 4:3 | 是 |
| B | B05 | `EVT-013_read_name` | 断碑读名事件弹窗 | 4:3 | 是 |
| B | B06 | `EVT-014_rift_dream` | 裂隙前梦事件弹窗 | 4:3 | 是 |
| B | B07 | `RTE-009_black_teeth_scale_price` | 黑齿鳞价路遇弹窗 | 1:1 | 是 |
| B | B08 | `RTE-002_roadside_shrine` | 路旁无名祠路遇弹窗 | 4:3 | 是 |
| C | C01 | `RND-008_breathing_map` | 烛龙息图随机路遇 | 4:3 | 是 |
| C | C02 | `CRS-003_sanity` | 神志崩线危机弹窗 | 4:3 | 是 |
| C | C03 | `END-001_rift` | 入裂隙结局图 | 16:9 | 可极小剪影 |
| C | C04 | `END-003_lost_stranded` | 迷失九州失败结局图 | 16:9 | 是 |
| C | C05 | `EVT-004_ground_thunder` | 地底雷声事件弹窗 | 4:3 | 是 |
| C | C06 | `EVT-008_nameless_prayer` | 无匾新灰事件弹窗 | 4:3 | 是 |
| C | C07 | `RND-004_silent_barter` | 黑齿影价随机路遇 | 1:1 | 是 |
| C | C08 | `UI-RES-AXLE-001` | 车轴资源小图标绿幕素材 | 1:1 | 不涉及 |

## 3. A 组：横向旅途长图与关键地点图

### A01 `MID-BG-ROAD-001_古道荒原路段长图.png`

用途：默认古道荒原旅途舞台背景。  
画幅：`3:1`，建议 `3072x1024` 或 `3840x1280`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-010_废关古道地点背景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 3:1 超宽横向旅途背景：古道荒原、旧王道车辙、残碑、荒草、低云、远山层层展开。前景是可横移的土路和草木，中景有残碑与路面转折，后景有灰青远山和云气。画面适合做假动态横向路程，从左到右都要有可观看内容。无车队、无人群主体、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A02 `MID-BG-MARKET-001_边市废关路段长图.png`

用途：废关至黑齿市之间的旅途舞台背景。  
画幅：`3:1`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-010_废关古道地点背景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 3:1 超宽横向旅途背景：边市废关路段，左侧隐约残关墙，右侧远处黑齿边市低矮摊影，路面是黑石土路和破旗残影。前景可见枯草、碎石、旧木桩；中景有半塌关墙和荒路；后景有雾中摊影、远山和低云。气氛沉默、异域、危险，但不西幻。无车队、无完整商队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A03 `MID-BG-WATER-001_雷泽赤水路段长图.png`

用途：雷泽、白羽淖、赤水外滩一线旅途背景。  
画幅：`3:1`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-009_赤水泽畔中景地貌.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 3:1 超宽横向旅途背景：雷泽浅滩与赤水岸相连，湿地水草、泥泡、白羽、旧骨路标、暗红水岸和低云贴水。前景有湿泥路和浅水草，中景有赤水边滩和骨质路标，后景是水雾、远山、云影。水面安静但不可靠，适合轻微横移和云影动效。无车队、无桥梁、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A04 `MID-BG-RIFT-001_归墟裂隙路段长图.png`

用途：梦图驿至九州裂隙的终段旅途背景。  
画幅：`3:1`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-013_归墟边缘暗水裂隙.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 3:1 超宽横向旅途背景：归墟边缘、暗水裂隙、远山重影、第二月淡影、地平线像旧帛书折痕一样错位。前景是裂开的古道和暗水边缘，中景有未画完的山河轮廓，后景为低云、远山重影和不可信天象。神秘、压迫、克制，不要科幻传送门。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: sci-fi portal, neon portal, laser, modern city, modern vehicle, modern road, modern bridge, electric pole, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A05 `LOC-001_central_post_中原驿.png`

用途：第一章起点地点图。  
画幅：`16:9`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 地点图：中原驿立在多条古道交汇处，驿门半开，门外有干草束、旧车辙、木桩、残旗，远处西路没入灰雾。画面是出发前的安静和不安，主体是地点本身，不是事件动作。无车队、无人物特写、无 UI、无真实可读文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A06 `LOC-004_abandoned_pass_废关.png`

用途：废关地点图。  
画幅：`16:9`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-010_废关古道地点背景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 地点图：荒边废关，残墙、破门、旧令石、倒旗、风沙、荒草，关门像废弃很久却仍有人经过。构图要有开阔路面，适合旅途舞台切入；地点清楚但不要像宣传海报。无车队、无 UI、无真实可读文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A07 `LOC-010_black_teeth_market_黑齿市.png`

用途：黑齿市地点图。  
画幅：`16:9`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 地点图：黑齿市外缘，黑石土路、低矮摊位、遮布、异族交易影子、远处雾中门廊。画面要让人知道这里是边市地点，但人物和摊位都克制，不要热闹现代集市。无车队、无 UI、无真实可读文字、无水印。
```

负面提示语：

```text
Negative prompt: modern market, bazaar photo, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### A08 `LOC-014_kyushu_rift_九州裂隙.png`

用途：第一章终点地点图。  
画幅：`16:9`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`，可辅以 `BG-013_归墟边缘暗水裂隙.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 地点图：九州裂隙，地平线像旧帛书未画完处裂开，暗水和远山重影，天色低压，路面车辙在裂隙前变细。这里是终点地点展示，不是结局瞬间。克制、古老、诡异，不要科幻光门。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: sci-fi portal, neon portal, laser, modern city, modern vehicle, modern road, modern bridge, electric pole, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

## 4. B 组：事件与路遇弹窗图

### B01 `EVT-001_post_gate_驿门未闭.png`

用途：第一场剧情遭遇弹窗，必须和中原驿地点图区分。  
画幅：`4:3`，建议 `1600x1200`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：中原驿门半掩未闭，门缝里透出一线旧灯，门外散落铜钉、干粟、半截车辙，像有人刚从门后离开。主体集中在“门未闭”的瞬间，不要做完整驿站全景。边缘留安静暗部，适合放在游戏弹窗内。无车队、无人物特写、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B02 `EVT-002_split_tracks_车辙分叉.png`

用途：故王道路线上第一个选择感事件。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：旧王道上的车辙在残碑前分叉，一条旧辙深黑，一条新辙浅亮，第三条细辙从荒草里斜出，像地图上没有画出的路。主体是车辙分叉和选择压力，前景车辙要清楚，中景残碑压住画面。无车队、无 UI、无真实文字、无水印。
```

负面提示语：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B03 `EVT-003_closed_order_废关旧令.png`

用途：废关事件弹窗，突出封关和旧令。  
画幅：`4:3`。  
共同参考图：上传 `BG-010_废关古道地点背景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：废关门前一块旧令木牌倒在灰里，关门从里面被旧绳半锁，灰尘上有新擦过的手印，残旗斜在门侧。旧令上只能有不可读笔画，不要真实文字。重点是“废弃很久，却像刚刚下过封关令”。无车队、无 UI、无水印。
```

负面提示语：

```text
Negative prompt: readable text, Chinese characters, English text, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B04 `EVT-005_black_trade_黑齿交易.png`

用途：黑齿市核心交易事件弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：阴影摊位上摆着青鳞、旧铁、干粮袋，黑齿商人只露出手和黑齿笑影，伸出三根手指示价。不要热闹市场，不要人物大特写；重点是沉默交易和价码不可信。主体集中，边缘安静，适合游戏弹窗。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern market, bazaar photo, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B05 `EVT-013_read_name_断碑读名.png`

用途：巫咸断碑事件弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：巫咸断碑近景，碑面裂开，几道不可读残笔像名字一样从石缝里浮出，地上有半卷拓片和压纸石，风把拓片边缘卷起。不要真实文字，只要“像名字”的不可读痕迹。无车队、无 UI、无水印。
```

负面提示语：

```text
Negative prompt: readable text, Chinese characters, English text, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B06 `EVT-014_rift_dream_裂隙前梦.png`

用途：终点前梦境事件弹窗，避免和裂隙地点图重复。  
画幅：`4:3`。  
共同参考图：上传 `BG-013_归墟边缘暗水裂隙.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：裂隙前的梦境，地面像旧帛书被水浸开，远山和车辙在同一画面出现两层重影，天空有第二个月的淡影，但没有科幻能量门。重点是“还没进入裂隙，先梦见地图背面”。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: sci-fi portal, neon portal, modern city, modern vehicle, modern road, modern bridge, electric pole, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B07 `RTE-009_black_teeth_scale_price_黑齿鳞价.png`

用途：黑齿主题路遇弹窗，和黑齿市地点/交易图区分。  
画幅：`1:1`，建议 `1536x1536`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 1:1 弹窗路遇图：荒路正中只摆着一片湿青鳞，鳞片上反出黑齿商人的笑影和三指价码影，周围没有完整市集，只有低矮黑石、雾、几粒散落粮。重点是“路心忽然出现的价格”。主体清晰居中，边缘安静。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: modern market, full market scene, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### B08 `RTE-002_roadside_shrine_路旁无名祠.png`

用途：固定路遇弹窗，补充路上参与感。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗路遇图：荒路旁一座无匾小祠，香灰新鲜，供位空着，祠后有一截短路和怪脚印。画面像玩家在路上停下观察，而不是地点全景。主体是小祠、香灰、脚印，边缘留暗。无车队、无 UI、无真实文字、无水印。
```

负面提示语：

```text
Negative prompt: modern shrine, temple tourism photo, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

## 5. C 组：随机、危机、结局与资源图标

### C01 `RND-008_breathing_map_烛龙息图.png`

用途：高记忆随机异象弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗随机路遇图：一张摊开的旧山海图在荒路上微微鼓起，图纸边缘像在呼吸，山川线条随呼吸起伏，远处有烛龙般的长影只作为云中轮廓，不要画成西方巨龙。重点是“地图在呼吸”。无车队、无 UI、无真实文字、无水印。
```

负面提示语：

```text
Negative prompt: modern dragon, western dragon, readable map labels, Chinese characters, English text, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C02 `CRS-003_sanity_神志崩线.png`

用途：神志触底危机弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-013_归墟边缘暗水裂隙.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗危机图：记路人的竹简和地图散在车辙旁，笔迹断成不可读黑线，影子把道路拉成几条互相矛盾的方向，远处山影像眼睛一样错位。重点是“神志崩线”，压迫但不血腥。无车队、无人物恐怖脸、无 UI、无真实文字、无水印。
```

负面提示语：

```text
Negative prompt: gore, horror face, jumpscare, readable text, Chinese characters, English text, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C03 `END-001_rift_入裂隙.png`

用途：第一章主结局图。  
画幅：`16:9`。  
共同参考图：上传 `BG-013_归墟边缘暗水裂隙.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 结局图：地图没有画完的地方裂开，古道尽头被旧帛书般的巨大裂隙吞入，路面车辙停在裂隙边缘，裂隙内是另一层未画完的山河。可以有极小队伍剪影作为尺度，但不能成为画面中心，不能画完整车队。无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: sci-fi portal, neon portal, laser, modern city, modern vehicle, modern road, modern bridge, electric pole, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, centered caravan, full caravan, detailed caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C04 `END-003_lost_stranded_迷失九州_旅途断绝.png`

用途：失败结局图。  
画幅：`16:9`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图、旧帛书纹理、工笔线稿、水墨线描与矿物颜料结合，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 16:9 失败结局图：荒路尽头车辙断成几截，散落空粮袋、断木楔、半卷残图，远山和雾把所有路都盖住。没有完整车队，没有角色哭喊，只有“旅途已经断绝”的物件证据。荒凉、静止、可读，不血腥。无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: gore, corpses, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C05 `EVT-004_ground_thunder_地底雷声.png`

用途：雷泽浅畔事件弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-009_赤水泽畔中景地貌.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：泽水泥面冒出一圈圈小泡，几块木板半沉入泥中，浅水下有雷纹般的暗线扩散，像雷声从地下滚过。主体是泥泡、水纹、沉木，不要做普通水泽风景。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: lightning bolt, modern storm photo, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C06 `EVT-008_nameless_prayer_无匾新灰.png`

用途：无名祠事件弹窗。  
画幅：`4:3`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 4:3 弹窗事件图：无匾小祠前的新香灰被风吹出半截弯路，供位空着，灰线指向祠后荒草中的短路，像有人刚刚替旅人祈过。主体是香灰显路和空供位，画面安静诡异。无车队、无 UI、无真实文字、无水印。
```

负面提示语：

```text
Negative prompt: readable text, Chinese characters, English text, modern shrine, tourism temple, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C07 `RND-004_silent_barter_黑齿影价.png`

用途：随机交易路遇弹窗，和黑齿市地点图区分。  
画幅：`1:1`。  
共同参考图：上传 `BG-008_横向山海旅途舞台总场景.png`。

正向提示语：

```text
请参考上传的共同风格图，保持同一套山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧帛书纹理、工笔线稿、水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。

生成一张 1:1 弹窗随机路遇图：路旁无声小摊没有主人，只有黑齿商人的影子从摊布后伸手比价，沉重粮袋没有开口，青鳞放在影子边缘。主体是影子比价和粮袋，背景只保留荒路暗雾。无车队、无 UI、无文字、无水印。
```

负面提示语：

```text
Negative prompt: full market scene, modern market, readable price tag, Chinese characters, English text, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, generic xianxia palace, anime, cartoon, cute style, chibi, 3d render, photorealistic, cinematic photo, neon, overexposed glow, strong bloom, logo, watermark, UI panel, web UI, menu, button, subtitle, map pin, route node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, people posing at camera, blurry edge, heavy motion blur, shallow depth of field
```

### C08 `UI-RES-AXLE-001_车轴资源图标_绿幕.png`

用途：车轴资源小图标候选，供后续抠图或切片。  
画幅：`1:1`，建议 `1536x1536`。  
共同参考图：不需要山海背景；可参考现有 UI 切片色调，但只生成独立物件。

正向提示语：

```text
生成一个适合横屏手游 UI 的车轴资源小图标，古代木制车轴与轮毂局部，旧木、铜钉、麻绳、少量旧金边线，风格古朴、清晰、硬边缘，适合缩小到 32-64 像素仍能辨认。物件居中，占画面 70%，纯绿色背景 chroma key green screen，单色高对比背景，不要透明棋盘格。无投影、无发光边、无运动模糊、少羽化、硬边缘、无文字、无 UI 面板。
```

负面提示语：

```text
Negative prompt: checkerboard transparency, fake transparent background, transparent layer, gradient background, textured background, shadow, cast shadow, glow, rim light, motion blur, soft blurry edge, heavy feathering, UI panel, text, watermark, logo, photorealistic render, 3d plastic icon, modern object, car wheel, rubber tire, metal machine axle
```

## 6. 投放与验收建议

- 第一轮不要把 24 张直接视为正式资产；全部先进入内部 Demo 候选。
- 长图优先检查：是否无车队、可横移、前中后景分明、左右裁切不空。
- 弹窗图优先检查：主体是否一眼可懂，是否比地点图更像“动作过程”。
- 事件图不要再连续复用地点图；`中原驿/驿门未闭`、`故王道/车辙分叉`、`黑齿市/黑齿交易/黑齿鳞价` 必须形成不同画面动作。
- 绿幕素材不要要求透明层；只要纯绿色或高反差纯色背景，后续再抠。

## 7. 需要用户决策的问题

1. 事件弹窗默认用 `4:3`，物件型路遇用 `1:1`，是否确认作为后续统一规则？
2. 这 24 张是否直接分 A/B/C 三组全跑，还是先每组各跑 2 张小样确认风格后再批量生成？

## 8. D 线程自检

- [x] 已读取主协调 BSI-UX-020、D-017、D-024。
- [x] 已输出统一美学规范 2.0，覆盖横向旅途长图与弹窗方图/4:3 图。
- [x] 已提供 24 条可复制提示语，并按 A/B/C 三组分配。
- [x] 已包含方图/4:3 事件图，不再全部沿用 16:9。
- [x] 已明确无车队、无 UI、无文字、水印、现代物品。
- [x] 已明确绿幕素材规则：纯绿色背景、硬边缘、少羽化、无光晕、无投影、无运动模糊。
- [x] 未修改代码，未移动素材，未声明任何素材正式可商用。
