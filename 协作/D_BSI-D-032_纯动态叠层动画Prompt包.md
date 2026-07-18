# D_BSI-D-032 纯动态叠层动画 Prompt 包

> 用途：只生成云、雾、风沙、水纹、裂隙、墨线污染等“可叠加动效层”，不要生成完整场景图。  
> 使用方式：如果工具支持 alpha/transparent video，就用透明背景；如果不支持，就用纯黑背景，后期用 screen/add/lighten 混合。  
> 关键：不要地平线、不要山、不要路、不要车队、不要 UI、不要文字。

## 0. 通用写法

每条 Prompt 都保留这段：

```text
This is an isolated VFX overlay layer, not a landscape and not a scene. Transparent background if supported; otherwise pure black background for screen/add blending. Only the moving effect elements are visible. No horizon, no mountains, no road, no ground, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. 6 seconds, very slow movement, start and end frames should look similar, suitable for crossfade looping.
```

## 1. 今天最建议先跑的 8 个

### 01 `OV-VIDEO-CLOUD-001_淡灰云雾横移_黑底.mp4`

```text
File name: OV-VIDEO-CLOUD-001_淡灰云雾横移_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only a thin layer of pale gray ink-wash clouds and mist drifting slowly from right to left. Ancient Chinese ink texture, soft paper-grain mist, low contrast, elegant and restrained. The cloud layer should be sparse, semi-transparent looking, with empty black areas so it can overlay a game background.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 02 `OV-VIDEO-CLOUD-002_低云团缓慢翻卷_黑底.mp4`

```text
File name: OV-VIDEO-CLOUD-002_低云团缓慢翻卷_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only a low rolling cloud mass, pale gray and slightly warm beige, moving very slowly like ink spreading in water. The cloud shape should gently curl and unfold, with no scene behind it. Ancient parchment ink-wash feeling, subtle mineral pigment texture.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 03 `OV-VIDEO-DUST-001_细风沙斜向掠过_黑底.mp4`

```text
File name: OV-VIDEO-DUST-001_细风沙斜向掠过_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only sparse windblown dust particles and dry paper fibers moving diagonally from lower left to upper right. Colors: muted ochre, gray brown, tiny old-gold specks. Very light density, not a storm, not smoke. It should be usable as a subtle overlay on a road scene.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 04 `OV-VIDEO-DUST-002_近景纸尘颗粒漂浮_黑底.mp4`

```text
File name: OV-VIDEO-DUST-002_近景纸尘颗粒漂浮_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only floating parchment dust, tiny ash-like paper grains and subtle cinnabar red specks drifting slowly in random directions. Ancient manuscript atmosphere, very restrained. Mostly empty black background, particles should not fill the whole frame.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 05 `OV-VIDEO-WATER-001_浅水细波纹_黑底.mp4`

```text
File name: OV-VIDEO-WATER-001_浅水细波纹_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only subtle shallow-water ripple lines, pale gray-blue ink strokes with faint old-gold highlights. The ripples slowly expand and slide, like water drawn on old silk. No actual pond, no shore, no reflection scene. Mostly black empty background so the ripple lines can overlay a wetland image.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 06 `OV-VIDEO-WATER-002_泥泡圆纹扩散_黑底.mp4`

```text
File name: OV-VIDEO-WATER-002_泥泡圆纹扩散_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only several slow circular ripple rings, as if tiny mud bubbles rise under shallow water. Muted gray-green and brown ink lines, very subtle, no splash. The rings appear, expand slowly, fade, and return to a similar calm state.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 07 `OV-VIDEO-RIFT-001_暗红裂纹微光_黑底.mp4`

```text
File name: OV-VIDEO-RIFT-001_暗红裂纹微光_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only thin dark-red cinnabar crack lines slowly opening and closing on pure black, like a裂隙 drawn with ink and mineral pigment. The cracks glow very weakly, not neon, not sci-fi. Lines should be sparse and elegant, with empty black space around them.

This is an isolated VFX overlay layer, not a landscape and not a scene. No portal, no landscape, no rocks, no mountains, no ground, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

### 08 `OV-VIDEO-RIFT-002_黑水裂隙波动_黑底.mp4`

```text
File name: OV-VIDEO-RIFT-002_黑水裂隙波动_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only a few horizontal dark-water distortion lines and faint gray-blue wave traces, as if an unseen裂隙 is breathing under black water. Very subtle ink-wash movement, no scene, no shore, no portal. Good for overlaying on a rift background.

This is an isolated VFX overlay layer, not a landscape and not a scene. No horizon, no mountains, no road, no ground, no sky background, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar, suitable for crossfade looping.
```

## 2. 如果积分还够，再跑这 6 个

### 09 `OV-VIDEO-INK-001_墨晕呼吸_黑底.mp4`

```text
File name: OV-VIDEO-INK-001_墨晕呼吸_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only slow ink blots blooming and fading on black, like pale gray ink spreading through old paper fibers. Very subtle, low opacity feeling, no recognizable image. Useful for map reveal, popup reveal, sanity pollution overlay.

No scene, no horizon, no mountains, no road, no ground, no buildings, no caravan, no characters, no UI, no text, no logo, no watermark. Fixed camera, no cuts, no zoom, no camera shake. Start and end frames should look similar.
```

### 10 `OV-VIDEO-INK-002_朱砂细尘闪动_黑底.mp4`

```text
File name: OV-VIDEO-INK-002_朱砂细尘闪动_黑底.mp4
Format: 4 seconds, 1:1 or 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only tiny cinnabar-red dust specks and old-gold grains flickering softly on black, like particles from an ancient seal. Very restrained, not modern sparkle, not magic. Useful for button feedback, route reveal, event popup emphasis.

No scene, no UI, no text, no logo, no watermark, no modern sparkle, no neon, no 3D particles, no explosion, no camera movement.
```

### 11 `OV-VIDEO-SANITY-001_错位墨线_黑底.mp4`

```text
File name: OV-VIDEO-SANITY-001_错位墨线_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only thin pale ink road-lines drifting slightly out of alignment, with a few dark red cinnabar scratches. It should feel like a map becoming unreliable, but without any readable map or scene. Lines move slowly, split slightly, then nearly return.

No readable text, no map labels, no UI, no route nodes, no landscape, no mountains, no road scene, no characters, no logo, no watermark, no digital glitch, no sci-fi, no neon, no camera movement.
```

### 12 `OV-VIDEO-SANITY-002_影子偏移_黑底.mp4`

```text
File name: OV-VIDEO-SANITY-002_影子偏移_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only soft gray shadow shapes slowly drifting out of place on black, like cast shadows becoming unreliable. Abstract, no person shape, no monster, no face. Add a few faint ink scratches and red mineral pigment specks. Useful for low-sanity overlay.

No scene, no characters, no horror face, no gore, no UI, no text, no logo, no watermark, no modern glitch, no sci-fi, no neon, no 3D render, no fast motion, no camera movement.
```

### 13 `OV-VIDEO-MAP-FOG-001_地图纸雾_黑底.mp4`

```text
File name: OV-VIDEO-MAP-FOG-001_地图纸雾_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, transparent background if supported; otherwise pure black background for screen/add blending.

Create only thin parchment fog and paper fibers moving slowly across black, like fog on an old map surface. Pale beige, gray white, very subtle. No map drawing, no labels, no nodes. Useful for map open and fog reveal effects.

No scene, no horizon, no mountains, no road, no buildings, no map labels, no UI, no text, no logo, no watermark, no camera movement.
```

### 14 `OV-VIDEO-EDGE-VIGNETTE-001_旧帛暗角浮动_黑底.mp4`

```text
File name: OV-VIDEO-EDGE-VIGNETTE-001_旧帛暗角浮动_黑底.mp4
Format: 6 seconds, 16:9, isolated overlay layer, black background with subtle dark brown edge texture, suitable for multiply/overlay blending.

Create only subtle old-silk dark edge texture and faint paper stains breathing slowly around the frame edges. Center remains mostly empty. Useful as a UI atmosphere vignette over game screens.

No scene, no text, no UI, no logo, no watermark, no characters, no modern object, no camera movement, no bright effects.
```

## 3. 生成后怎么判断可用

- 合格：黑底上只有效果元素，能叠到任何画面上。
- 不合格：出现山、路、天空、地平线、建筑、车队、角色、文字、UI。
- 合格：动得很慢，首尾相近，能交叉淡化循环。
- 不合格：镜头推进、快速飞行、爆炸、强光、完整风景。
