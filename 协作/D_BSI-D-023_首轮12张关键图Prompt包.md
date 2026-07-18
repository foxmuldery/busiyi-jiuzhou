# D_BSI-D-023 首轮 12 张关键图 Prompt 包

> 子线程：D，视觉体验与交互氛围设计师  
> 日期：2026-06-19  
> 对齐：`C_BSI-C-077` 首轮生成图优先队列、`C_BSI-C-078` 地图节点 UI 切片接入  
> 用途：给 YuanZhe 直接复制到 ChatGPT 网页版 / Flow / Seedance 分线程生图。  
> 边界：不改代码，不移动素材，不讨论宣传图，不标记任何资产为正式商用授权。

## 0. 给用户直接复制版

先只做这 12 张，不要一次铺 59 张。

### 上传共同参考图

每个生图线程都先上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

如果支持多图参考，再加：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

### 统一风格句

每张图都保留这一段：

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游可用画面，假动态横向旅途舞台调性，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。
```

### 统一负向词

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 抠图规则

本轮 12 张都是背景、地点、事件大图，不要透明，不要绿幕。后续如果生成车队、角色、道具、资源图标或 UI 小标，使用：

```text
single solid green background, high contrast solid background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur
```

不要透明棋盘格，不要虚化光边，不要投影，不要运动模糊。

### 第一轮 12 张正式文件名

```text
A组风格锁定/
MID-BG-ROAD-001_古道荒原路段长图.png
MID-BG-MARKET-001_边市废关路段长图.png
MID-BG-WATER-001_雷泽赤水路段长图.png
MID-BG-RIFT-001_归墟裂隙路段长图.png

B组地点事件图/
LOC-001_central_post_中原驿.png
LOC-004_abandoned_pass_废关.png
LOC-010_black_teeth_market_黑齿市.png
LOC-013_broken_stele_巫咸断碑.png
LOC-014_kyushu_rift_九州裂隙.png
EVT-001_post_gate_驿门未闭.png

C组路遇危机结局图/
RTE-002_roadside_shrine_路旁无名祠.png
RTE-009_black_teeth_scale_price_黑齿鳞价.png
```

投放目录：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/A组风格锁定/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/
```

验收命令：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
```

## 1. A 线程：4 张路段长图

### A1 `MID-BG-ROAD-001_古道荒原路段长图.png`

比例尺寸：3:1，建议 3072x1024，最低 2400x800  
车队规则：背景图不带车队，不带人物站路心。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游可用画面，假动态横向旅途舞台调性，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。

主体：古道荒原、旧王道车辙、远山、残碑、荒草、低云。路面有多层车辙和被风沙掩住的旧道，像一段可从左向右展开的小路程。它要服务首屏与古道旅途底层，能替换当前重复背景。

构图：3:1 超宽横向旅途背景，wide panoramic landscape, seamless-feeling horizontal travel background。前景路面、中景荒原、后景远山和天空层次清楚，适合缓慢横移和视差。下方留出 HUD/路线叠加的低复杂区域。不能出现 UI 节点、红色图钉、金色节点、灰色未知节点。背景图不能带车队，不能有人物站在路中心。no text, no UI, no watermark.

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A2 `MID-BG-MARKET-001_边市废关路段长图.png`

比例尺寸：3:1，建议 3072x1024，最低 2400x800  
车队规则：背景图不带车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游可用画面，假动态横向旅途舞台调性，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。

主体：青丘外邑、废关、黑齿边市外缘混合气质。远处异族墟市剪影、旧关墙、低矮门楼、残旗、黑石土路、雾中灯影。重点是边境、墟市、废关之间的暧昧感，不是热闹市集。

构图：3:1 超宽横向旅途背景。前景黑石土路和残旗杆，中景废关外墙与边市外缘，后景山影与雾气。画面左右可横移，不能是单个地点特写。不能出现 UI 节点、红色图钉、金色节点、灰色未知节点。背景图不能带车队，不能有现代摊贩和现代市集。no text, no UI, no watermark.

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A3 `MID-BG-WATER-001_雷泽赤水路段长图.png`

比例尺寸：3:1，建议 3072x1024，最低 2400x800  
车队规则：背景图不带车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游可用画面，假动态横向旅途舞台调性，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。

主体：雷泽浅滩、赤水岸、湿地水草、旧骨路标、低云贴水、水纹异象。泥泡从浅水里冒起，远处赤水无波。赭红克制，不血腥。服务雷泽、赤水、水泽路线共用中地图底层。

构图：3:1 超宽横向旅途背景。前景浅水草泥岸，中景赤水外滩和旧骨路标，后景低云远山水汽。下方留路线层和 UI 的安静区。不能出现 UI 节点、红色图钉、金色节点、灰色未知节点。背景图不能带车队，不能有现代桥梁。no text, no UI, no watermark.

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A4 `MID-BG-RIFT-001_归墟裂隙路段长图.png`

比例尺寸：3:1，建议 3072x1024，最低 2400x800  
车队规则：背景图不带车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游可用画面，假动态横向旅途舞台调性，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。

主体：归墟边缘、暗水裂隙、远山重影、天空第二月、地图纸背般的地平线。远方像地图还没画完，裂隙像旧帛书、地平线和暗水一起开口，不是科幻能量门。服务终点归墟与神志异象共用中地图底层。

构图：3:1 超宽横向旅途背景。前景裂纹路面和暗水边缘，中景断续古道与低雾，后景远山重影和异常天空。不能出现 UI 节点、红色图钉、金色节点、灰色未知节点。背景图不能带车队。no text, no UI, no watermark, 神秘诡异但克制。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 2. B 线程：5 张主线路径地点图

### B1 `LOC-001_central_post_中原驿.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游地点主视觉，风景主导，神秘但可读。

主体：中原驿立在多条古道交汇处，驿门半开，干草束、旧车辙、低矮木门、远处西路雾气。这里是出发点，仍在人间边缘，但已经能看见九州异域的风压。它是玩家第一眼抵达地点，需要清楚、稳定、可读。

构图：16:9 横图，地点主体在中景偏左或居中，前景留少量路面和车辙，下方或右侧保留可叠 UI 的安静区域。不要做成宣传海报，不要大标题空间。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B2 `LOC-004_abandoned_pass_废关.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游地点主视觉，风景主导，神秘但可读。

主体：废关残墙、破败门额、旧令石墙、祭所痕迹和风中残旗，关门像刚刚有人擦过灰，荒凉边境感强。旧令只能有不可读的笔画痕迹。它是当前稳定主线路径第二站，要有明显地点识别。

构图：16:9 横图，废关门楼或残墙为主体，前景碎石、断旗、荒草，后景灰青远山。下方保留 UI 安静区。禁止完整车队，无真实文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B3 `LOC-010_black_teeth_market_黑齿市.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游地点主视觉，风景主导，神秘但可读。

主体：黑齿市外缘，黑石土路、低矮摊位、沉默商人远影、异族交易气氛。日光偏暗，摊位不热闹，交易像在影子里完成，边市有古老规矩但不解释。它是山海异域感最强的中段地点。

构图：16:9 横图，黑石土路和低矮摊位形成地点识别，远景人物只作剪影或背影，不要现代市场感。下方或右侧保留 UI 安静区。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B4 `LOC-013_broken_stele_巫咸断碑.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游地点主视觉，风景主导，神秘但可读。

主体：巫咸断碑，半埋断碑、残笔、拓片、祭名空缺，荒原风沙和远山。碑上只能有不可读的笔画感和巫文痕迹，像名字被抹掉或尚未补全。它是后段叙事转折地点。

构图：16:9 横图，断碑为主体，前景可有拓片、碎石和荒草，中景是半埋石碑，后景是荒原与远山。保留右侧或下方安静区域。禁止完整车队，无真实文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B5 `LOC-014_kyushu_rift_九州裂隙.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游地点主视觉，风景主导，神秘但可读。

主体：九州裂隙，地平线像地图未画完处裂开，暗水和远山重影，天空低压。终点神秘感强但克制，像古地图边缘、现实地平线和归墟暗水同时错开。它是第一章终点与结局入口。

构图：16:9 横图，裂隙和远山重影是主体，前景有旧路尽头和裂纹地面，中景是暗水边缘，后景是低压天空。不要科幻能量门，不要夸张发光。禁止完整车队，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 3. C 线程：1 张开局事件 + 2 张高价值路遇

### C1 `EVT-001_post_gate_驿门未闭.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：允许局部木车器物，禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，神秘但可读。

主体：驿门未闭，中原驿门在风里半开，驿卒把最后一束干草塞上木车旁，西边官路在远雾里延伸，归期像旧账一样压在门口。重点是“出发前一刻”的事件感，不是普通地点风景。它是第一场剧情选择，会直接影响开局质感。

构图：16:9 横图，事件重点是半开的驿门、干草、旧车辙和西路。允许局部木车器物，但不能画完整车队，不能让车队占中心。无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C2 `RTE-002_roadside_shrine_路旁无名祠.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游半途路遇图，神秘但可读。

主体：路旁无名祠，小祠无匾，香灰新鲜，祠后短路旁留着怪脚印，供位空着像写着车队的影子。这是主线第一段半途路遇，要有“路上突然遇见”的瞬间感。

构图：16:9 横图，小祠和香灰为主体，前景脚印，后景岔路低云。不要可读匾额，不要完整车队，无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C3 `RTE-009_black_teeth_scale_price_黑齿鳞价.png`

比例尺寸：16:9，建议 1920x1080，最低 1280x720  
车队规则：禁止完整车队。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，羊皮纸九州图、古绢山海图、旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游半途路遇图，神秘但可读。

主体：黑齿鳞价，路心低矮摊位上摊着青鳞，黑齿商人远影伸三指比价，鳞片像从价码里捞出，交易无声，影子却在讨价。这里是主线中段高价值路遇，要有异族交易和资源交换的事件感。

构图：16:9 横图，青鳞、低矮摊位、黑齿商人远影是主体。商人用远景背影或剪影，不要正面角色海报，不要现代市场，不要可读价码，不要完整车队。无文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 4. 下一批视觉资产优先级

### 4.1 最影响试玩沉浸感，首轮通过后优先补

1. 剩余稳定主线地点图：`LOC-002_old_king_road_故王道.png`、`LOC-007_thunder_marsh_雷泽浅畔.png`、`LOC-012_red_marsh_赤水外滩.png`。  
原因：玩家 5 分钟试玩最容易经过，能明显降低“同图反复出现”的感觉。

2. 剩余开局/主线地点事件图：`EVT-002_split_tracks_车辙分叉.png`、`EVT-003_closed_order_废关旧令.png`、`EVT-004_ground_thunder_地底雷声.png`、`EVT-012_red_bones_赤水岸骨.png`、`EVT-013_read_name_断碑读名.png`。  
原因：事件图最能让“点击选择”变成“发生了一件事”，避免生硬交互。

3. 高价值危机和结局图：`CRS-001_axle_断轴边缘.png`、`CRS-002_grain_粮袋见底.png`、`CRS-003_sanity_神志崩线.png`、`END-001_rift_入裂隙.png`。  
原因：资源告急、失败和通关仪式感是试玩记忆点。

### 4.2 可以先用占位图，不阻塞首轮试玩

- 非主线分支地点：`LOC-003_qingqiu_outer_city_青丘外邑.png`、`LOC-005_bird_mouse_pass_鸟鼠夹道.png`、`LOC-008_white_feather_mire_白羽淖.png`、`LOC-009_feather_folk_ford_羽民渡.png`、`LOC-011_dream_map_post_梦图驿.png`。  
理由：首轮试玩不一定稳定经过，可先复用同地形图。

- P1 路遇图：文鳐、当康、旋龟、鴸鸟、狐灯、骨牛、倒芦、梦蝉等。  
理由：山海味强，但出现频率低，首轮可以先用通用路遇占位。

- UI 小图标和资源图标。  
理由：C078 已经接入地图节点切片，短期 UI 资产感已改善；资源图标可以等下一轮统一绿幕抠图。

### 4.3 必须等用户生成/确认后再接入

- 4 张 A-stage 路段长图。  
原因：它们会成为旅途舞台底层，一旦风格跑偏会污染全局。

- `LOC-014_kyushu_rift_九州裂隙.png` 与裂隙/神志污染相关图。  
原因：最容易跑成科幻裂缝、魔法门或西幻特效，必须人工看过。

- 所有需要抠图的车队、人物、资源图标、UI 图标。  
原因：必须使用纯绿幕或高反差纯色底，硬边、无投影、少虚化；不能直接用假透明棋盘格。

## 5. 主线程验收点

1. 12 张图是否全部按正式文件名投放到对应目录。
2. `asset-readiness-check.js --priority` 是否从 `0/12` 变为 `12/12 ready`，且没有 `review/invalid`。
3. A-stage 4 张是否满足 3:1，最低 2400x800。
4. B/C 8 张是否满足 16:9，最低 1280x720。
5. 是否统一为山海荒原水墨长卷风格，没有跳成仙侠、西幻、二次元、现代电影感。
6. 是否无 UI、无可读文字、无水印、无完整车队烘焙进背景。
7. 如果任意 2 张明显跑偏，停止扩展 59 张，先重生首轮 12 张。

