# D_BSI-D-018 首批图像生成 Prompt 完整复制版

> 子线程：D，视觉体验与交互氛围设计  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-18  
> 用途：给 ChatGPT 网页端或其它生图线程直接复制粘贴。  
> 范围：第一批图像，先锁统一风格、横向路段中地图、14 张地点图。  
> 原则：每条 Prompt 都包含参考图、通用正向规范、单图主体、构图要求和统一负向词，避免跨线程漏词。

## 0. 使用方式

建议分两个生图线程并行：

- A 线程：生成共同风格参考图 + 4 张横向路段中地图。
- B 线程：生成 14 张地点图。

优先上传共同参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

如果网页端无法读取本地路径，就手动上传这张图，并在 Prompt 里保留“参考上传图片”这句话。

辅助参考图可选上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

## 1. 总体统一规范

所有图片都必须像来自同一本《山海异图》，不是一张一张独立发挥。

统一正向规范：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。
```

统一禁止事项：

```text
不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。
不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。
不要动漫二次元、Q 版、3D 卡通、写实摄影。
不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。
不要把车队烘焙进背景图，不要把完整车队画在路中央。
不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。
```

统一负向词：

```text
modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

角色/车队素材单独生成时才使用以下绿幕规范；本批背景和地点图不使用：

```text
single solid green background, hard clean edges, no feathering, no glow, no cast shadow, no motion blur
```

## 2. A 组：共同参考图与横向路段中地图

### A1 STYLE-REF-001_九州山海异图母图

建议文件名：

```text
STYLE-REF-001_九州山海异图母图.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：一张用于统一全项目画风的“九州山海异图母图”。远山、荒泽、古道、残碑、低云、雾气、干涸水脉层层展开，像一卷古老山海地图被摊开。画面不表现具体 UI，不表现具体玩法，只建立“古代九州远行、幽远、荒凉、神秘”的总体气质。

构图要求：16:9 横图，横向电影构图但保持古画感。前景有少量荒草、石块、旧路面；中景有水泽、残碑、古道分叉；后景有远山、低云和不可靠的异象轮廓。下方和右侧保留相对安静区域，方便后续叠 UI。无车队，无人物主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A2 MID-BG-ROAD-001_古道荒原路段长图

建议文件名：

```text
MID-BG-ROAD-001_古道荒原路段长图.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：古道荒原、旧王道车辙、远山、残碑、荒草、低云。路面有多层车辙和被风沙掩住的旧道，远处山影灰青，偶尔有残碑和断木露出。整体像一段可从左向右展开的小路程。

构图要求：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，适合在 Web Demo 中缓慢横移。前景路面、中景荒原、后景远山和天空层次清楚，便于做低成本视差。路面中间不要站人，不要画完整车队。无文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A3 MID-BG-MARKET-001_边市废关路段长图

建议文件名：

```text
MID-BG-MARKET-001_边市废关路段长图.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：青丘外邑、废关、黑齿边市外缘混合气质。远处有异族墟市剪影、旧关墙、低矮门楼、残旗、黑石土路、雾中灯影。整体有边境、市集、废关之间的暧昧感，但不要热闹现代市集。

构图要求：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，适合慢速横移。前景是黑石土路和残旗杆，中景是废关外墙和边市外缘，后景是山影与雾气。不要把摊位画得过满，保留可叠 UI 的安静区域。无车队，无文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A4 MID-BG-WATER-001_雷泽赤水路段长图

建议文件名：

```text
MID-BG-WATER-001_雷泽赤水路段长图.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：雷泽浅滩、赤水岸、湿地水草、旧骨路标、低云贴水、水纹异象。水面有浅滩和泥泡，远处赤水无波，岸边有旧骨和残木形成方向感。赭红克制使用，不要血腥。

构图要求：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，适合风景缓慢横移。前景是浅水、草、泥岸；中景是赤水外滩和旧骨路标；后景是低云、远山和水汽。保留画面下方一条可供路线/车队层叠加的安静区域。无车队，无文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A5 MID-BG-RIFT-001_归墟裂隙路段长图

建议文件名：

```text
MID-BG-RIFT-001_归墟裂隙路段长图.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：归墟边缘、暗水裂隙、远山重影、天空第二月、地图纸背般的地平线。远方像地图还没画完，山与水开始错位，裂隙不是科幻能量裂缝，而像旧帛书、地平线和暗水一起开口。

构图要求：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，适合慢速横移。前景是裂纹路面和暗水边缘；中景是断续古道与低雾；后景是远山重影和异常天空。神秘诡异但克制。无车队，无文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 3. B 组：14 张地点图

### B1 LOC-001_central_post_中原驿

建议文件名：

```text
LOC-001_central_post_中原驿.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：中原驿立在多条古道交汇处，驿门半开，干草束、旧车辙、低矮木门、远处西路雾气。这里是出发点，仍在人间边缘，但已经能看见九州异域的风压。气氛安静、不安、即将启程。

构图要求：16:9 横图，地点主体在中景偏左或居中，前景留少量路面和车辙，下方或右侧保留可叠 UI 的安静区域。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B2 LOC-002_old_king_road_故王道

建议文件名：

```text
LOC-002_old_king_road_故王道.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：旧王道荒原，两道车辙一新一旧在残碑旁分叉，荒草掩住古道，远山灰青，路面像被不同年代反复碾过。这里是路线判断地点，旧路与新路都不完全可信。

构图要求：16:9 横图，车辙分叉要清楚，残碑和荒草形成地点识别点。前景留路面，中景是分叉古道，后景是远山与低云。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B3 LOC-003_qingqiu_outer_city_青丘外邑

建议文件名：

```text
LOC-003_qingqiu_outer_city_青丘外邑.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：青丘外邑边城，低矮古门、城墙外缘、狐灯悬在墙边，灯影温和但不可信。远处丘陵和雾气包住边邑，门前路面干净得不自然，像有人刚刚擦去足迹。

构图要求：16:9 横图，城门或外邑门楼作为主体，狐灯作为识别元素但不要变成现代灯笼装饰。下方或右侧保留可叠 UI 的安静区域。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B4 LOC-004_abandoned_pass_废关

建议文件名：

```text
LOC-004_abandoned_pass_废关.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：废关残墙、破败门额、旧令石墙、祭所痕迹和风中残旗。关门像刚刚有人擦过灰，残墙后方雾气压低，荒凉边境感强。旧令只能有不可读的笔画痕迹，不能出现真实文字。

构图要求：16:9 横图，废关门楼或残墙是主体，前景可有碎石、断旗、荒草，后景是灰青远山。下方保留 UI 安静区域。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B5 LOC-005_bird_mouse_pass_鸟鼠夹道

建议文件名：

```text
LOC-005_bird_mouse_pass_鸟鼠夹道.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：山腹暗路，狭窄岩洞，鸟鼠同穴的细小痕迹，洞中微光和碎石路。岩壁像被许多小足迹磨过，暗路若隐若现，仿佛小路在山腹里移动。

构图要求：16:9 横图，洞口和夹道形成明显空间纵深。前景是碎石和小足迹，中景是山腹暗路，后景有微光。画面诡异但克制，不要恐怖怪物正脸。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B6 LOC-006_nameless_shrine_无名祠

建议文件名：

```text
LOC-006_nameless_shrine_无名祠.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：路旁无匾小祠，新香灰、空供位、短路怪脚印，荒草和低云环绕。小祠像在路旁，也像挡在路中；香灰很新，但周围没有人。

构图要求：16:9 横图，小祠作为主体，中景清楚，前景可有香灰、石阶、怪脚印，后景有古道与低云。不要出现可读匾额或文字。无车队主体，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B7 LOC-007_thunder_marsh_雷泽浅畔

建议文件名：

```text
LOC-007_thunder_marsh_雷泽浅畔.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：雷泽浅畔，浅水、泥泡、低云压水，远处像有地底雷声滚过。水草和湿地层次清楚，泥面有一圈圈小泡，天空低得像压在水上。

构图要求：16:9 横图，前景浅水和水草，中景泥泡和岸线，后景低云与远山。画面要湿冷、压抑、可辨认，不要现代桥梁。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B8 LOC-008_white_feather_mire_白羽淖

建议文件名：

```text
LOC-008_white_feather_mire_白羽淖.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：白羽淖浅水，白羽沉在水底，石块似乎浮在泥上，倒影轻微错乱。湿地表面很安静，但水下方向和重量关系不可信。

构图要求：16:9 横图，前景浅水和白羽，中景泥淖和倒影，后景低雾与湿地。白羽是识别重点，但不要画得洁白发光。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B9 LOC-009_feather_folk_ford_羽民渡

建议文件名：

```text
LOC-009_feather_folk_ford_羽民渡.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：无桥浅水渡口，白羽舟、岸边异族账册痕迹、轻物渡水的神秘仪式感。水面很浅，却让人觉得不能直接走过；渡口像在称量人的重量和名字。

构图要求：16:9 横图，渡口和白羽舟是主体，前景浅水与羽毛，中景岸边简陋渡具，后景雾和远岸。可以有远景小人剪影，但不要角色正面，不要完整车队。无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B10 LOC-010_black_teeth_market_黑齿市

建议文件名：

```text
LOC-010_black_teeth_market_黑齿市.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：黑齿市外缘，黑石土路、低矮摊位、沉默商人远影、异族交易气氛。日光偏暗，摊位不热闹，交易像在影子里完成，边市有古老规矩但不解释。

构图要求：16:9 横图，黑石土路和低矮摊位形成地点识别，远景人物只作剪影或背影，不要现代市场感。下方或右侧保留 UI 安静区域。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B11 LOC-011_dream_map_post_梦图驿

建议文件名：

```text
LOC-011_dream_map_post_梦图驿.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：梦图驿前哨，旧地图卷口像一扇小门，纸背风吹起，远处归墟雾光，现实和地图边界模糊。建筑很少，重点是“地图像门”这个不可靠空间。

构图要求：16:9 横图，地图卷口或纸门作为中景主体，前景可有折起的旧帛边、石块、路面，后景是雾光和远山。不要出现可读地图字。无车队主体，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B12 LOC-012_red_marsh_赤水外滩

建议文件名：

```text
LOC-012_red_marsh_赤水外滩.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：赤水外滩，水面无波，岸边旧骨排列成路标，草尖朝向同一方向，日落前的禁忌感。赭红只作为水色和远光点缀，不要血腥，不要恐怖堆尸。

构图要求：16:9 横图，前景是岸草和浅滩，中景是旧骨路标与赤水，后景低云和远山。画面需要禁忌感和方向感，下方保留 UI 安静区域。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B13 LOC-013_broken_stele_巫咸断碑

建议文件名：

```text
LOC-013_broken_stele_巫咸断碑.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：半埋断碑，残笔、拓片、祭名空缺，荒原风沙和远山。碑上只能有不可读的笔画感和巫文痕迹，像名字被抹掉或尚未补全。

构图要求：16:9 横图，断碑为主体，前景可有拓片、碎石和荒草，中景是半埋石碑，后景是荒原与远山。保留右侧或下方安静区域。无车队主体，无真实文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B14 LOC-014_kyushu_rift_九州裂隙

建议文件名：

```text
LOC-014_kyushu_rift_九州裂隙.png
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和赭色、灰绿、铁锈红、墨黑、暗金色，幽远、古老、神秘，细节丰富但不拥挤，山、水、雾、石、残碑、祭器、异兽痕迹优先。
画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：九州裂隙，地平线像地图未画完处裂开，暗水和远山重影，天空低压。终点神秘感强但克制，像古地图边缘、现实地平线和归墟暗水同时错开。

构图要求：16:9 横图，裂隙和远山重影是主体，前景有旧路尽头和裂纹地面，中景是暗水边缘，后景是低压天空。不要做成科幻能量门，不要夸张发光。无车队主体，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把车队烘焙进背景图，不要把完整车队画在路中央。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

