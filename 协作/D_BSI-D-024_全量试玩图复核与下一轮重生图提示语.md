# D_BSI-D-024 全量试玩图复核与下一轮重生图提示语

> 子线程：D，视觉体验与交互氛围设计师  
> 日期：2026-06-19  
> 对齐：`C_BSI-C-083` 全量 59 张试玩图导入  
> 输出边界：只做视觉复核、替换优先级和可复制 Prompt；不改代码，不移动素材，不把占位图标成正式商用资产。

## 0. 结论先说

现在 59 张图已经足够支撑内部试玩，但还没有达到“每个地点/事件都独一眼可记住”的美术完成度。

首局高频路径里最明显的问题是：**同一底图被连续复用**。例如 `中原驿` 和 `驿门未闭` 基本同图，`故王道` 和 `车辙分叉` 基本同图，`黑齿市 / 黑齿交易 / 黑齿鳞价` 也会连续给玩家相似画面。

下一轮不要一次重做 59 张。建议只重生 10 张：6 张高频事件/路遇图、1 张随机异象图、1 张神志危机图、2 张结局图。这样对首局 5 分钟沉浸感提升最大。

当前复核联系表：

```text
/private/tmp/busiyi-c084-priority-contact.png
```

联系表顺序：

```text
01 B-location:central_post
02 B-event:post_gate
03 B-location:old_king_road
04 B-event:split_tracks
05 C-route:roadside_shrine
06 B-location:abandoned_pass
07 B-event:closed_order
08 B-location:black_teeth_market
09 B-event:black_trade
10 C-route:black_teeth_scale_price
11 B-location:broken_stele
12 B-event:read_name
13 B-location:kyushu_rift
14 B-event:rift_dream
15 C-random:rnd_breathing_map
16 C-crisis:sanity
17 C-ending:rift
18 C-ending:stranded
```

## 1. 分级表

| 优先级 | 资产 ID | 当前判断 | 为什么 | 下一步 |
|---|---|---|---|---|
| 可暂用 | `LOC-001_central_post` | 可暂用 | 出发点清楚，色调稳定，适合第一屏地点图 | 保留，正式版后期再精修 |
| 必须重生 | `EVT-001_post_gate` | 重复感强 | 和中原驿地点图几乎同图，第一场遭遇没有“驿门未闭”的戏剧性 | P0 重生 |
| 可暂用 | `LOC-002_old_king_road` | 可暂用 | 古道荒原、车辙、远山都清楚 | 保留 |
| 必须重生 | `EVT-002_split_tracks` | 重复感强 | 和故王道地点图同源，事件主题“车辙分叉”不够明确 | P0 重生 |
| 可暂用 | `RTE-002_roadside_shrine` | 可暂用 | 画面有祭祀/门阙感，可作为路旁祠临时图 | 后续可小修，不阻断 |
| 可暂用 | `LOC-004_abandoned_pass` | 可暂用 | 废关地点主体明确，是目前质量较好的地点图 | 保留 |
| 优先替换 | `EVT-003_closed_order` | 语义不足 | 和废关地点图重复，缺少“旧令、关门、擦灰”的事件焦点 | P1 重生 |
| 可暂用 | `LOC-010_black_teeth_market` | 可暂用 | 异域边市气质够用，适合地点图 | 保留 |
| 必须重生 | `EVT-005_black_trade` | 重复感强 | 和黑齿市地点图重复，缺少交易动作、青鳞、三指价码 | P0 重生 |
| 必须重生 | `RTE-009_black_teeth_scale_price` | 高频且重复 | 和黑齿市/黑齿交易连续重复，主线路遇记忆点被削弱 | P0 重生 |
| 可暂用 | `LOC-013_broken_stele` | 可暂用 | 荒原断碑、灰冷气质可用 | 保留 |
| 必须重生 | `EVT-013_read_name` | 事件主体缺失 | 没有“读名、拓片、碑上名字浮出”的明确画面 | P0 重生 |
| 可暂用 | `LOC-014_kyushu_rift` | 可暂用 | 裂隙/归墟感可用，适合作为终点地点图 | 保留 |
| 必须重生 | `EVT-014_rift_dream` | 和终点同图 | 缺少“裂隙前梦”的梦境结构，和终点地点图连续重复 | P0 重生 |
| 必须重生 | `RND-008_breathing_map` | 语义不准 | 目前像水岸天象，不像“地图在呼吸” | P0 重生 |
| 必须重生 | `CRS-003_sanity` | 危机错位 | 当前是暗色地图，适合图鉴或迷雾，不像神志崩线的濒死状态 | P0 重生 |
| 优先替换 | `END-001_rift` | 结局张力不足 | 裂隙大构图可用，但带队伍小剪影且更像地图展示，不够像结局瞬间 | P1 重生 |
| 优先替换 | `END-003_lost_stranded` | 结局记忆点弱 | 迷失感有，但不够“旅途断绝”，缺少车辙断尽/补给散落等结果信息 | P1 重生 |

## 2. 下一轮只重生这 10 张

### 统一风格句

每张都保留：

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。无车队主体，无 UI，无文字，无水印。
```

### 统一负向词

```text
Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

本轮都是地点/事件大图，不要透明，不要绿幕。只有后续车队、资源图标、UI 小图标才用纯绿幕硬边规则。

## 3. 可复制 Prompt

### 01 `EVT-001_post_gate_驿门未闭.png`

用途：第一场剧情遭遇，必须和中原驿地点图区分开。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。不是泛仙侠，不是西幻，不是现代奇幻，不是宣传海报。

主体：中原驿的驿门半掩未闭，门缝里透出一线旧灯，门外有散落铜钉、干粟、半截车辙，像有人刚从门后离开。重点是“门未闭”的瞬间，而不是完整驿站全景。构图：中景驿门偏左，前景铜钉和粮袋痕迹，远处官路没入雾中；下方保留 UI 安静区。无车队主体，无可读文字，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 02 `EVT-002_split_tracks_车辙分叉.png`

用途：故王道第一事件，必须清楚展示路线选择感。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。

主体：故王道上两道车辙在残碑前分叉，一条旧辙深黑，一条新辙浅亮，第三条若隐若现的细辙从荒草里斜出，像图上没有画出的路。重点是“车辙分叉”和选择压力。构图：前景车辙从画面下方进入，中景残碑和三路分叉，后景远山低云；不要做成普通荒原全景。无车队主体，无文字，无 UI。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 03 `EVT-003_closed_order_废关旧令.png`

用途：废关事件，突出旧令和封关感。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。

主体：废关门前一块旧令木牌倒在灰里，关门从里面被旧绳半锁，灰尘上有新擦过的手印，残旗斜在门侧。旧令上只能有不可读笔画，不要真实文字。重点是“明明废弃，却像刚刚下过封关令”。构图：前景旧令木牌和新手印，中景半闭关门，后景残墙与灰雾。无车队主体，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 04 `EVT-005_black_trade_黑齿交易.png`

用途：黑齿市核心交易事件。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。

主体：黑齿市阴影摊位上摆着青鳞、旧铁、干粮袋，黑齿商人只露出手和黑齿笑影，伸出三根手指示价。不要热闹市场，不要人物大特写。重点是“沉默交易”和“价码不可信”。构图：前景青鳞和旧铁，中景低矮摊位和半遮商人，后景黑石土路与雾中摊影。无文字，无 UI，无车队主体。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 05 `RTE-009_black_teeth_scale_price_黑齿鳞价.png`

用途：主线中段高价值路遇，必须和黑齿市地点图区分。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游路遇图，16:9，风景主导，神秘但可读。

主体：荒路正中只摆着一片湿青鳞，鳞片上反出黑齿商人的笑影和三指价码影，周围没有完整市集，只有低矮黑石和雾。重点是“路心忽然出现的价格”，不是边市场景。构图：青鳞作为前景主体，后景荒路和远处极小摊影，画面留出选择 UI 安静区。无文字，无 UI，无车队主体。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 06 `EVT-013_read_name_断碑读名.png`

用途：断碑后段叙事转折事件。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。

主体：巫咸断碑近景，碑面裂开，几道不可读的残笔像名字一样从石缝里浮出，地上有半卷拓片和压纸石，风把拓片边缘卷起。不要真实文字，只要“像名字”的不可读痕迹。构图：断碑占中景，拓片在前景，远山和荒草在后景。无车队主体，无 UI，无水印。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 07 `EVT-014_rift_dream_裂隙前梦.png`

用途：终点前最后事件，避免和裂隙地点图重复。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游事件图，16:9，风景主导，神秘但可读。

主体：裂隙前的梦境，地面像旧帛书被水浸开，远山和车辙在同一画面里出现两层重影，天空有第二个月的淡影，但没有科幻能量门。重点是“还没进入裂隙，先梦见地图背面”。构图：前景湿裂帛纹，中景重影古道，后景裂隙轮廓和低云。无车队主体，无文字，无 UI。

Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 08 `RND-008_breathing_map_烛龙息图.png`

用途：高记忆随机异象，不要再像普通水岸。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游随机路遇图，16:9，风景主导，神秘但可读。

主体：一张摊开的旧山海图在荒路上微微鼓起，图纸边缘像在呼吸，山川线条随呼吸起伏，远处有烛龙般的长影只作为云中轮廓，不要画成西幻巨龙。重点是“地图在呼吸”。构图：前景旧图纸和压图石，中景荒路，后景低云长影。无文字，无 UI，无车队主体。

Negative prompt: modern dragon, western dragon, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 09 `CRS-003_sanity_神志崩线.png`

用途：神志触底危机，必须比普通地图更有压迫。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游危机图，16:9，神秘压迫但不血腥。

主体：记路人的竹简和地图散在车辙旁，笔迹断成不可读黑线，影子把道路拉成几条互相矛盾的方向，远处山影像眼睛一样错位。重点是“神志崩线”，不是普通暗色地图。构图：前景散落竹简和断笔，中景混乱车辙，后景重影山路和低云。无人物大特写，无车队主体，无文字，无 UI。

Negative prompt: gore, horror face, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 10 `END-001_rift_入裂隙.png`

用途：第一章主结局，必须比终点地点图更像结局。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游结局图，16:9，风景主导，神秘但可读。

主体：地图没有画完的地方裂开，古道尽头被旧帛书般的巨大裂隙吞入，路面车辙停在裂隙边缘，裂隙内不是科幻光门，而是另一层未画完的山河。可有极小队伍剪影，但不能成为画面中心。重点是“进入裂隙的选择已经不可逆”。构图：前景断裂古道，中景裂隙口，后景未画完山河和低云。无文字，无 UI，无水印。

Negative prompt: sci-fi portal, neon portal, modern city, modern vehicle, modern road, modern bridge, electric pole, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### 11 `END-003_lost_stranded_迷失九州_旅途断绝.png`

用途：硬失败结局，必须让玩家知道“断绝”。

```text
请参考上传共同风格图，参考已锁定的山海荒原水墨长卷风格，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，旧绢纹理，旧帛书山海图，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。横屏手游失败结局图，16:9，荒凉、静止、可读，不血腥。

主体：荒路尽头车辙断成几截，散落空粮袋、断木楔、半卷残图，远山和雾把所有路都盖住。没有完整车队，没有角色哭喊，只有“旅途已经断绝”的物件证据。构图：前景空粮袋和断木楔，中景断裂车辙，后景雾中山影和消失道路。无文字，无 UI，无水印。

Negative prompt: gore, corpses, modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, map pin, UI node, checkerboard transparency, fake transparent background, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 4. 第二优先级：暂不急，但后续应替换

这些图先不拖住 Web Demo，但第二轮可以补：

- `EVT-004_ground_thunder`：目前和水泽路段接近，后续要更突出泥泡和地底雷。
- `EVT-008_nameless_prayer`：和无名祠地点图重复，后续要突出香灰显路。
- `EVT-011_dream_map_gate`：和裂隙/梦图地点重复，后续要有“小门”主体。
- `RTE-003_black_cloud`：目前偏天空层，后续要让黑云贴地滚来。
- `RND-004_silent_barter`：和黑齿市重复，后续要做“影价”主题。
- `RND-005_repeated_footprints`：和废关/旧路重复，后续要做复迹脚印。

## 5. 给 C 线程的接入建议

下一轮用户生成完图后，只需要替换同名文件，然后运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

如果只替换这 10-11 张图，不需要改 `data.js` 和 `app.js`。

## 6. 验收口径

下一轮不是看“图片是否都很漂亮”，而是看这 4 条：

1. 首局连续 5 分钟不再出现明显同图连播。
2. 每个高频事件能从缩略图一眼看出主题。
3. 危机和结局图有足够的情绪差异。
4. 仍保持同一套旧绢、水墨、矿物颜料、山海九州风格。
