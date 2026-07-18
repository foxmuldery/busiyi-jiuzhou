# D_BSI-D-022 视觉交互下一步生图执行清单

> 子线程：D，视觉体验与交互氛围设计师  
> 日期：2026-06-19  
> 对齐文件：`C_BSI-C-076`、`C_BSI-C-077`、`D_BSI-D-020`、`D_BSI-D-021`、`asset-readiness-check.js`  
> 程序侧优先级来源：`node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --markdown`  
> 目标：给 YuanZhe 一份可直接拿去 ChatGPT 网页版 / Flow / Seedance 分线程生成的首轮 12 张素材清单。  
> 边界：不改代码，不移动素材，不讨论宣传图，不标记任何资产为正式商用授权。

## 0. 第一轮只生成这 12 张

不要一口气压 59 张。第一轮按 C-077 程序优先队列，只做这 12 张：

| 优先级 | 分组 | ID | 正式文件名 | 投放目录 | 尺寸 |
|---:|---|---|---|---|---|
| 1 | A-stage | road | `MID-BG-ROAD-001_古道荒原路段长图.png` | `A组风格锁定` | 3:1，建议 3072x1024，最低 2400x800 |
| 2 | A-stage | market | `MID-BG-MARKET-001_边市废关路段长图.png` | `A组风格锁定` | 3:1，建议 3072x1024，最低 2400x800 |
| 3 | A-stage | water | `MID-BG-WATER-001_雷泽赤水路段长图.png` | `A组风格锁定` | 3:1，建议 3072x1024，最低 2400x800 |
| 4 | A-stage | rift | `MID-BG-RIFT-001_归墟裂隙路段长图.png` | `A组风格锁定` | 3:1，建议 3072x1024，最低 2400x800 |
| 5 | B-location | central_post | `LOC-001_central_post_中原驿.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 6 | B-location | abandoned_pass | `LOC-004_abandoned_pass_废关.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 7 | B-location | black_teeth_market | `LOC-010_black_teeth_market_黑齿市.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 8 | B-location | broken_stele | `LOC-013_broken_stele_巫咸断碑.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 9 | B-location | kyushu_rift | `LOC-014_kyushu_rift_九州裂隙.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 10 | B-event | post_gate | `EVT-001_post_gate_驿门未闭.png` | `B组地点事件图` | 16:9，建议 1920x1080，最低 1280x720 |
| 11 | C-route | roadside_shrine | `RTE-002_roadside_shrine_路旁无名祠.png` | `C组路遇危机结局图` | 16:9，建议 1920x1080，最低 1280x720 |
| 12 | C-route | black_teeth_scale_price | `RTE-009_black_teeth_scale_price_黑齿鳞价.png` | `C组路遇危机结局图` | 16:9，建议 1920x1080，最低 1280x720 |

投放目录：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/A组风格锁定/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/
```

生成后先跑首轮验收：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
```

全部通过后再跑全量状态：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

正式严格验收：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --strict
```

## 1. 统一参考图和美学规范

每个生图线程都先上传共同参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

如果网页端支持多参考图，可再上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

统一风格：

```text
参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。
中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。
```

统一负向词：

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

透明/抠图规则：

- 本轮 12 张都是背景、地点或事件大图，不要透明，不要绿幕。
- 后续若生成车队、角色、资源图标、UI 小标，不要假透明棋盘格。
- 需要抠图时使用纯绿幕或纯色高反差背景：`single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur`。

## 2. A 线程：4 张路段长图

### A1 `MID-BG-ROAD-001_古道荒原路段长图.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，风景主导，神秘但可读，不是泛仙侠，不是西幻，不是现代奇幻。

主体：古道荒原、旧王道车辙、远山、残碑、荒草、低云，路面有多层车辙和被风沙掩住的旧道。整体像横向山海旅途舞台的一段长路。

构图：3:1 超宽横向旅途背景，wide panoramic landscape, seamless-feeling horizontal travel background。前景路面、中景荒原、后景远山和天空层次清楚，适合缓慢横移和视差。背景图不能带车队，不能有人物站在路中心，无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A2 `MID-BG-MARKET-001_边市废关路段长图.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，风景主导，神秘但可读，不是泛仙侠，不是西幻，不是现代奇幻。

主体：青丘外邑、废关、黑齿边市外缘混合气质，远处异族墟市剪影、旧关墙、低矮门楼、残旗、黑石土路、雾中灯影。重点是边境、墟市、废关之间的暧昧感，不是热闹市集。

构图：3:1 超宽横向旅途背景。前景黑石土路和残旗杆，中景废关外墙与边市外缘，后景山影与雾气。背景图不能带车队，不能有现代摊贩和现代市集，无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A3 `MID-BG-WATER-001_雷泽赤水路段长图.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，风景主导，神秘但可读，不是泛仙侠，不是西幻，不是现代奇幻。

主体：雷泽浅滩、赤水岸、湿地水草、旧骨路标、低云贴水、水纹异象，泥泡从浅水里冒起，远处赤水无波。赭红克制，不血腥。

构图：3:1 超宽横向旅途背景。前景浅水草泥岸，中景赤水外滩和旧骨路标，后景低云远山水汽。下方留路线层和 UI 的安静区。背景图不能带车队，不能有现代桥梁，无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A4 `MID-BG-RIFT-001_归墟裂隙路段长图.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，风景主导，神秘但可读，不是泛仙侠，不是西幻，不是现代奇幻。

主体：归墟边缘、暗水裂隙、远山重影、天空第二月、地图纸背般的地平线，远方像地图还没画完。裂隙像旧帛书、地平线和暗水一起开口，不是科幻能量门。

构图：3:1 超宽横向旅途背景。前景裂纹路面和暗水边缘，中景断续古道与低雾，后景远山重影和异常天空。背景图不能带车队，无文字，无 UI，无水印，诡异但克制。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 3. B 线程：5 张主线路径地点图

### B1 `LOC-001_central_post_中原驿.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，地点主视觉，神秘但可读。

主体：中原驿立在多条古道交汇处，驿门半开，干草束、旧车辙、低矮木门、远处西路雾气。这里是出发点，仍在人间边缘，但已经能看见九州异域的风压。

构图：16:9 横图，地点主体在中景偏左或居中，前景留少量路面和车辙，下方或右侧保留可叠 UI 的安静区域。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B2 `LOC-004_abandoned_pass_废关.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，地点主视觉，神秘但可读。

主体：废关残墙、破败门额、旧令石墙、祭所痕迹和风中残旗，关门像刚刚有人擦过灰，荒凉边境感强。旧令只能有不可读的笔画痕迹。

构图：16:9 横图，废关门楼或残墙为主体，前景碎石、断旗、荒草，后景灰青远山。下方保留 UI 安静区。禁止完整车队，无真实文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B3 `LOC-010_black_teeth_market_黑齿市.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，地点主视觉，神秘但可读。

主体：黑齿市外缘，黑石土路、低矮摊位、沉默商人远影、异族交易气氛。日光偏暗，摊位不热闹，交易像在影子里完成，边市有古老规矩但不解释。

构图：16:9 横图，黑石土路和低矮摊位形成地点识别，远景人物只作剪影或背影，不要现代市场感。下方或右侧保留 UI 安静区。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B4 `LOC-013_broken_stele_巫咸断碑.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，地点主视觉，神秘但可读。

主体：巫咸断碑，半埋断碑、残笔、拓片、祭名空缺，荒原风沙和远山。碑上只能有不可读的笔画感和巫文痕迹，像名字被抹掉或尚未补全。

构图：16:9 横图，断碑为主体，前景可有拓片、碎石和荒草，中景是半埋石碑，后景是荒原与远山。保留右侧或下方安静区域。禁止完整车队，无真实文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B5 `LOC-014_kyushu_rift_九州裂隙.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。荒古山水，地点主视觉，神秘但可读。

主体：九州裂隙，地平线像地图未画完处裂开，暗水和远山重影，天空低压。终点神秘感强但克制，像古地图边缘、现实地平线和归墟暗水同时错开。

构图：16:9 横图，裂隙和远山重影是主体，前景有旧路尽头和裂纹地面，中景是暗水边缘，后景是低压天空。不要科幻能量门，不要夸张发光。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 4. C 线程：1 张开局事件 + 2 张高价值路遇

### C1 `EVT-001_post_gate_驿门未闭.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手机游戏事件图，神秘但可读。

主体：驿门未闭，中原驿门在风里半开，驿卒把最后一束干草塞上木车旁，西边官路在远雾里延伸，归期像旧账一样压在门口。重点是“出发前一刻”的事件感，不是普通地点风景。

构图：16:9 横图，事件重点是半开的驿门、干草、旧车辙和西路。允许局部木车器物，但不能画完整车队，不能让车队占中心。无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C2 `RTE-002_roadside_shrine_路旁无名祠.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手机游戏半途路遇图，神秘但可读。

主体：路旁无名祠，小祠无匾，香灰新鲜，祠后短路旁留着怪脚印，供位空着像写着车队的影子。这是主线第一段半途路遇，要有“路上突然遇见”的瞬间感。

构图：16:9 横图，小祠和香灰为主体，前景脚印，后景岔路低云。不要可读匾额，不要完整车队，无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C3 `RTE-009_black_teeth_scale_price_黑齿鳞价.png`

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，古绢山海图，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手机游戏半途路遇图，神秘但可读。

主体：黑齿鳞价，路心低矮摊位上摊着青鳞，黑齿商人远影伸三指比价，鳞片像从价码里捞出，交易无声，影子却在讨价。这里是主线中段高价值路遇，要有异族交易和资源交换的事件感。

构图：16:9 横图，青鳞、低矮摊位、黑齿商人远影是主体。商人用远景背影或剪影，不要正面角色海报，不要现代市场，不要可读价码，不要完整车队。无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 5. 主线程验收点

1. 12 张图是否全部按正式文件名投放到对应目录。
2. `asset-readiness-check.js --priority` 是否从 `0/12` 变为 `12/12 ready`，且没有 `review/invalid`。
3. A-stage 4 张是否满足 3:1，最低 2400x800。
4. B/C 8 张是否满足 16:9，最低 1280x720。
5. 是否统一为山海荒原水墨长卷风格，没有跳成仙侠、西幻、二次元、现代电影感。
6. 是否无 UI、无可读文字、无水印、无完整车队烘焙进背景。
7. 如果任意 2 张明显跑偏，停止扩展 59 张，先重生首轮 12 张。

