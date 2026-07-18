# D_BSI-D-019 第二批事件路遇危机结局 Prompt 复制版

> 子线程：D，视觉体验与交互氛围设计  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 用途：给 ChatGPT 网页端或其它生图工具直接复制粘贴。  
> 范围：第二批试生产 9 张，覆盖地点事件、固定路遇、随机路遇、危机、结局。  
> 边界：不改代码，不移动素材，不标记任何资产为已授权正式商用。

## 0. 现在请先生成这 9 张

### A 组：地点事件图

- A1 `EVT-001_post_gate_驿门未闭.png`
- A2 `EVT-003_closed_order_废关旧令.png`
- A3 `EVT-004_ground_thunder_地底雷声.png`

### B 组：固定路遇 + 随机路遇

- B1 `RTE-001_wheel_omen_轮声入骨.png`
- B2 `RTE-003_black_cloud_半途黑云.png`
- B3 `RND-002_bitter_grass_soup_祝余苦汤.png`

### C 组：危机 + 结局

- C1 `CRS-001_axle_断轴边缘.png`
- C2 `CRS-003_sanity_神志崩线.png`
- C3 `END-001_rift_入裂隙.png`

这一批的目的不是补完全部图，而是先确认“事件图、路遇图、危机图、结局图”是否能和第一批地点/路段保持同一本《山海异图》的画风。

## 1. 共同参考图说明

每组生成前，优先上传共同参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

如果网页端无法读取本地路径，就手动上传这张图，并在 Prompt 中保留“参考上传图片”这句话。

辅助参考图可选上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

## 2. 统一正向规范

以下正向规范已写入每条 Prompt，不需要用户二次拼接：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。
```

## 3. 统一负向词

以下负向词已写入每条 Prompt：

```text
modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

透明素材规则：本批不生成透明素材。如果后续要生成角色/车队/前景抠图，不要要求透明 PNG，不要假透明棋盘格；改用纯绿幕或高对比单色底，硬边、少羽化、无发光边、无投影、无运动模糊。

## 4. A 组：地点事件图

### A1 EVT-001_post_gate_驿门未闭

建议文件名：

```text
EVT-001_post_gate_驿门未闭.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；允许出现局部木车、草束、门木等出发物件，但不要把车队烘焙进背景。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：中原驿门半开，驿门将闭未闭，门边有最后一束干草、木栓、破旧门槛、旧车辙和西路远雾。画面表现“刚要出发，但人间边界正在合上”的不安感。可以有极远的小人物剪影或局部木车物件，但不要完整车队，不要人物特写。

构图要求：16:9 横图，主体在中景，驿门和西路雾气形成视线方向。前景留少量车辙、草束和门槛；中景是半开的驿门；后景是雾中的西路和灰青远山。下方或右侧保留可叠 UI 的安静区域。无可读文字，无 UI，无水印。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A2 EVT-003_closed_order_废关旧令

建议文件名：

```text
EVT-003_closed_order_废关旧令.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止车队；不要画完整队伍。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：废关残墙上残留一道旧令痕迹，像曾经写着“不得西行”的禁令，但不能出现任何真实可读文字，只保留模糊笔画、裂纹、残灰和朱砂印迹。破碎门额、旧关墙、风中残旗、祭所残痕一起形成边境禁行感。墙后风起，灰尘像刚刚被谁擦过。

构图要求：16:9 横图，废关残墙和旧令痕迹在中景偏左或居中，前景有碎石、荒草、断旗杆，后景有门洞、低云和灰青远山。画面要表达“这条路被旧法禁过”，但不画可读字。下方或右侧保留 UI 安静区域。无车队，无 UI，无水印。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### A3 EVT-004_ground_thunder_地底雷声

建议文件名：

```text
EVT-004_ground_thunder_地底雷声.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；允许极少量车辙或沉木，不画队伍。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：雷泽泥水表面冒出一圈圈小泡，雷声像从地下滚过而不是从天空落下。浅水、沉木、泥泡、低云压水，水面和地面之间有轻微错位感。画面表现“车底传来地底雷声”的异象，但不出现完整车队。

构图要求：16:9 横图，前景是浅水、泥泡和沉木，中景是湿地水草与泥岸，后景是低云、远山和压低的天光。泥泡和水纹是视觉焦点，整体湿冷、低压、古老。下方保留 UI 安静区域。无可读文字，无 UI，无水印。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 5. B 组：固定路遇 + 随机路遇

### B1 RTE-001_wheel_omen_轮声入骨

建议文件名：

```text
RTE-001_wheel_omen_轮声入骨.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；允许车轮、轴心、车辙等局部符号。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：空路上车辙无人自响，路面没有石子却像有回声。前景出现一个旧车轮或轴心局部，轴心有细小暗裂，裂纹像从骨头里长出。远处古道空无一人，低云压着荒原，表现“轮声入骨”的不安。

构图要求：16:9 横图，车轮或轴心局部在前景偏侧，不要居中大特写；中景是空车辙和荒路，后景是远山与低云。画面要像路遇图，不像道具图。下方或右侧保留 UI 安静区域。无完整车队，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B2 RTE-003_black_cloud_半途黑云

建议文件名：

```text
RTE-003_black_cloud_半途黑云.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；不要画队伍卸重，只画黑云和路面压迫感。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：黑云贴着地面滚来，像低飞的影子，不在天上，而是沿着古道压过来。古道前方被黑云吞没，路边荒草向同一方向倒伏，远山被遮去一半。画面表达“半途黑云，必须避开或卸重”的危险预感，但不画完整车队。

构图要求：16:9 横图，黑云从画面一侧或远处地面滚入，中景压迫古道，前景有车辙、荒草和碎石，后景远山被黑云吞掉。黑云要像山海异象，不要像现代烟雾特效。下方或右侧保留 UI 安静区域。无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### B3 RND-002_bitter_grass_soup_祝余苦汤

建议文件名：

```text
RND-002_bitter_grass_soup_祝余苦汤.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；允许陶罐、草束、石灶等近景物件。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：路旁祝余草叶厚如小掌，旧陶罐里煮着黑色草汤，微微冒气。汤能压饥，但让人不安。草叶、陶罐、石灶、荒路、水汽形成一个小型随机补给事件。不要把它画成现代食物或温馨野餐。

构图要求：16:9 横图，前景是祝余草、旧陶罐和石灶，中景是荒路边缘和低草，后景是雾气和灰青远山。画面应有“可取资源，但有代价”的感觉。下方或右侧保留 UI 安静区域。无完整车队，无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 6. C 组：危机 + 结局

### C1 CRS-001_axle_断轴边缘

建议文件名：

```text
CRS-001_axle_断轴边缘.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；允许断裂车轴、旧绳、铜钉、辐条等局部残车。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：断裂车轴局部、旧绳、铜钉、门木和辐条堆在荒路上，像队伍即将停滞的危机边缘。木纹开裂，绳结松散，荒路继续向西延伸但无法轻易前进。只画局部残车物件，不画完整车队。

构图要求：16:9 横图，前景是断轴、绳、铜钉、辐条等局部残车，中景是荒路车辙和碎石，后景是灰青远山和低云。画面要有资源告急的压迫感，但不做血腥或灾难片。下方或右侧保留 UI 安静区域。无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C2 CRS-003_sanity_神志崩线

建议文件名：

```text
CRS-003_sanity_神志崩线.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止车队；不要画完整人物队伍。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：记路人的笔落在旧地图旁，影子被当成路标，墨迹和道路开始散开。旧帛书上的山川线条像在呼吸、偏移、断开，但不能出现真实可读文字。画面表现神志降低后的不可靠界面感，诡异但克制。

构图要求：16:9 横图，前景是落下的笔、旧地图边缘和散开的墨线，中景是影子状路标和错位道路，后景是低雾与远山。画面可以有轻微视觉错乱，但不要科幻特效，不要恐怖怪脸。下方或右侧保留 UI 安静区域。无可读文字，无 UI。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### C3 END-001_rift_入裂隙

建议文件名：

```text
END-001_rift_入裂隙.png
```

推荐比例：

```text
16:9 横图，1920x1080 或 2048x1152
```

是否禁止车队：

```text
禁止完整车队；可以让远处有非常小的行旅影子，但不画清楚队伍。
```

完整 Prompt：

```text
参考上传图片的整体气质、旧帛书纹理、横向山海旅途氛围和低饱和矿物色。
中国古代神秘九州，《山海经》气质，古绢山海图，工笔线稿，手绘水墨线描与矿物颜料结合，旧帛书纹理，低饱和土黄、灰青、赭红、墨黑、旧金色，幽远、古老、神秘，细节丰富但不拥挤。
山、水、雾、石、残碑、祭器、异兽痕迹优先。画面应有手绘线稿质感、古地图质感、旧绢纸磨损感，颜色克制，不要鲜艳，不要现代电影调色。

主体画面：地图没有画完的地方打开，地平线裂成暗水与远山重影。古道尽头进入未名之处，天与地像旧帛书折痕一样错开。画面有终局仪式感，但不是科幻传送门。可以有极远、极小、不可辨认的行旅影子作为尺度，但不要画完整车队。

构图要求：16:9 横图，前景是旧路尽头和裂纹地面，中景是暗水裂隙和未画完的地图边界，后景是远山重影与低压天空。裂隙应像古地图、地平线和归墟暗水共同开口。下方或右侧保留 UI 安静区域。无可读文字，无 UI，无水印。

禁止事项：不要现代建筑、现代衣物、现代车辆、电线、霓虹、现代道路、现代桥梁。不要西幻城堡、欧美盔甲、魔法阵、夸张游戏特效。不要动漫二次元、Q 版、3D 卡通、写实摄影。不要把文字、UI、按钮、标题、水印、logo、字幕画进图片。不要把完整车队画进背景，不要把车队放在画面中心。不要假透明棋盘格，不要强烈虚化光边，不要发光描边，不要过度景深，不要运动模糊。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 7. 已覆盖 ID

- 地点事件图：`EVT-001`、`EVT-003`、`EVT-004`
- 固定路遇图：`RTE-001`、`RTE-003`
- 随机路遇图：`RND-002`
- 危机图：`CRS-001`、`CRS-003`
- 结局图：`END-001`

## 8. 待用户生成/确认事项

- 用户先生成上述 9 张，检查是否与第一批路段/地点图同属一套古绢山海图风格。
- 如果事件图过于像普通风景，下一批需要加强“动作瞬间/异象焦点”。
- 如果路遇图过于像地点图，下一批需要加强“半途发生了一件事”的瞬间感。
- 如果危机图过于写实或灾难片，下一批需要回到旧帛书、局部物件和心理压迫。
- 主线程验收后再展开剩余地点事件、固定路遇、随机路遇、危机和结局图。

