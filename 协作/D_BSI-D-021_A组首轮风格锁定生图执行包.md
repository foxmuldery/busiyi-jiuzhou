# D_BSI-D-021 A组首轮风格锁定生图执行包

> 子线程：D，视觉交互 / 美术资产规划  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 状态：主线程整理，供用户直接复制到 ChatGPT 网页版或其它生图线程  
> 目的：先生成 1 张风格母图 + 4 张路段长图，锁定全项目统一美学。不要一开始批量生成全部地点和事件图。

## 0. 这一批只做什么

A 组只生成 5 张图：

| 顺序 | 文件名 | 用途 | 比例 |
|---|---|---|---|
| A1 | `STYLE-REF-001_九州山海异图母图.png` | 后续所有图的共同风格参考 | 16:9 |
| A2 | `MID-BG-ROAD-001_古道荒原路段长图.png` | road 古道/旧王道路段中地图 | 3:1 |
| A3 | `MID-BG-MARKET-001_边市废关路段长图.png` | market 墟市/废关路段中地图 | 3:1 |
| A4 | `MID-BG-WATER-001_雷泽赤水路段长图.png` | water 雷泽/赤水路段中地图 | 3:1 |
| A5 | `MID-BG-RIFT-001_归墟裂隙路段长图.png` | rift 裂隙/归墟路段中地图 | 3:1 |

本批不生成地点图、事件图、车队、人物、透明素材或视频。

## 1. 先上传参考图

优先上传这一张作为共同参考图：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png
```

如果网页端允许多图参考，可再上传：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png
```

生成时反复保留这句：

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。
```

## 2. A1 风格母图 Prompt

### `STYLE-REF-001_九州山海异图母图.png`

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，旧帛书山海图，工笔线稿，手绘水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：一张用于统一全项目画风的九州山海异图母图，远山、荒泽、古道、残碑、低云、雾气、干涸水脉层层展开，像古老山海地图被摊开。构图：16:9 横图，前景少量荒草石块和旧路面，中景水泽残碑古道分叉，后景远山低云和不可靠异象轮廓，下方和右侧保留 UI 安静区。无车队，无人物主体，无文字，无 UI，无水印。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 3. A2-A5 路段长图 Prompt

### `MID-BG-ROAD-001_古道荒原路段长图.png`

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：古道荒原、旧王道车辙、远山、残碑、荒草、低云，路面有多层车辙和被风沙掩住的旧道。构图：3:1 超宽横向旅途背景，wide panoramic landscape，seamless-feeling horizontal travel background，前景路面、中景荒原、后景远山天空层次清楚，适合缓慢横移和视差。背景图不要带车队，不要人物站在路中心，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### `MID-BG-MARKET-001_边市废关路段长图.png`

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：青丘外邑、废关、黑齿边市外缘混合气质，远处异族墟市剪影、旧关墙、低矮门楼、残旗、黑石土路、雾中灯影。构图：3:1 超宽横向旅途背景，前景黑石土路和残旗杆，中景废关外墙与边市外缘，后景山影与雾气，保留安静区域。背景图不要带车队，不要现代市集，无文字，无 UI。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### `MID-BG-WATER-001_雷泽赤水路段长图.png`

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：雷泽浅滩、赤水岸、湿地水草、旧骨路标、低云贴水、水纹异象，泥泡从浅水里冒起，远处赤水无波。构图：3:1 超宽横向旅途背景，前景浅水草泥岸，中景赤水外滩和旧骨路标，后景低云远山水汽，下方留路线层安静区。背景图不要带车队，不要现代桥梁，无文字，无 UI，赭红克制不血腥。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

### `MID-BG-RIFT-001_归墟裂隙路段长图.png`

```text
请参考上传共同风格图，same style reference, consistent palette, consistent brush texture。中国古代神秘九州，《山海经》气质，横屏手机游戏风景主导，旧绢纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金，荒古山水，神秘但可读。主体：归墟边缘、暗水裂隙、远山重影、天空第二月、地图纸背般的地平线，远方像地图还没画完。构图：3:1 超宽横向旅途背景，前景裂纹路面和暗水边缘，中景断续古道与低雾，后景远山重影和异常天空。背景图不要带车队，不要科幻能量裂缝，无文字，无 UI，诡异但克制。Negative prompt: modern city, modern vehicle, modern road, modern bridge, electric pole, sci-fi, cyberpunk, western fantasy castle, European armor, magic circle, anime, cartoon, cute style, chibi, 3d render, photorealistic, neon, overexposed glow, strong bloom, readable text, Chinese characters, English text, logo, watermark, UI panel, menu, button, subtitle, checkerboard transparency, baked caravan, centered caravan, full caravan, blurry edge, heavy motion blur, shallow depth of field
```

## 4. 首轮通过标准

生成完先不要继续 B/C 组，先按这个表判断：

| 检查项 | 通过标准 |
|---|---|
| 风格一致 | 5 张图像像同一本《山海异图》，不是 5 种模型风格 |
| 无车队 | 路段背景完全不带车队、现代车辆或人物站路心 |
| 可横移 | 4 张路段长图左右有足够风景延展，不是单点构图 |
| 小横屏可读 | 缩到手机横屏时仍看得清地貌，不糊、不花 |
| UI 安静区 | 下方或右侧有能压 HUD/按钮的低复杂区域 |
| 山海感 | 有荒古九州、旧绢、矿物色、山海异域，不像仙侠海报 |
| 无文字 | 没有可读汉字、英文、水印、logo、UI 面板 |

任意 2 项不通过，就停在 A 组重生，不要进入 14 地点批量。

## 5. 回填表

生成后把结果填到这里，主线程再判断是否进入 B 组：

| ID | 结果路径/截图 | 通过/重生 | 问题 |
|---|---|---|---|
| STYLE-REF-001 |  |  |  |
| MID-BG-ROAD-001 |  |  |  |
| MID-BG-MARKET-001 |  |  |  |
| MID-BG-WATER-001 |  |  |  |
| MID-BG-RIFT-001 |  |  |  |

## 6. 下一步

A 组通过后，再执行：

- B 组：14 个地点 + 14 个地点事件。
- C 组：21 个半途路遇 + 3 个危机 + 3 个结局 + UI/资源图标。

完整全量提示语仍以 [D_BSI-D-020_事件地点全量配图与统一风格Prompt包.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-020_事件地点全量配图与统一风格Prompt包.md) 为准。
