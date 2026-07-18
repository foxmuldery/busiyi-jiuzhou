# D_BSI-D-034 UI / VI 元素大图生成与切割规格

> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-21  
> 用途：一次生成成套 UI / VI 元素大图，后续由 D/C 线程切割、抠绿、入库。  
> 原则：统一美学优先，不追求一次生成最终可商用；所有 AI 输出先标记 `internal-web-demo-candidate`。

## 0. 大图生成通用规则

```text
Generate one large sprite sheet image, 4096x4096, pure chroma key green background (#00FF00), hard clean edges, no cast shadow, no glow, no motion blur, no transparent checkerboard.

All UI/VI elements are separated in a clean grid with wide spacing. Each element is isolated and does not touch any other element. No labels, no text, no numbers, no readable characters, no watermark, no logo.

Visual style: ancient Chinese Jiuzhou game UI, old silk parchment, ink wash linework, mineral pigment, muted ochre, gray green, cinnabar red, ink black, old gold. Restrained, readable, not generic xianxia, not western fantasy, not modern flat UI, not plastic 3D.

Important: do not generate actual UI screens. Generate only isolated components and decorative parts for later cutting.
```

切割建议：

- 大图优先 `4096x4096`。
- 元素按 `6x6` 或 `5x5` 网格排列，每格周围留足绿底。
- 大元素可以占 2 格宽，但不能相互接触。
- 不要在图里写编号；编号由文件名/切割表记录。
- 生成后先保留原图，再切为 PNG；绿底后期抠掉。

## 1. 第一张：P0 核心 UI 零件大图

目标文件名：

```text
UI-SPRITES-P0-001_核心UI零件绿幕大图.png
```

复制 Prompt：

```text
File name: UI-SPRITES-P0-001_核心UI零件绿幕大图.png
Format: one large sprite sheet image, 4096x4096, pure chroma key green background (#00FF00), clean grid layout, hard clean edges.

Generate isolated UI components for an ancient Chinese Jiuzhou survival travel game. Style: old silk parchment, ink wash linework, mineral pigment, muted ochre, gray green, cinnabar red, ink black, old gold. Restrained, readable, handcrafted, mobile game UI quality, not generic xianxia, not modern flat UI, not western fantasy, not plastic 3D.

Create these isolated components, separated with wide spacing:
1. axle resource icon: ancient wooden axle and wheel hub, old wood, copper nail, hemp rope
2. grain resource icon: cloth grain sack with a few millet grains and rope tie
3. sanity resource icon: old map scroll, broken brush, offset shadow, faint cinnabar crack
4. repair action icon: small wood wedge, rope, copper nail, repair symbol without text
5. forage action icon: hand basket, wild grain, grass bundle, no character
6. rest action icon: rolled mat, small oil lamp, calm seal-like shape
7. read / inspect action icon: bamboo slip, brush, magnifying gesture but ancient style
8. route / travel action icon: curved road line and small cinnabar route mark
9. confirm action icon: old-gold seal check shape, no text
10. cancel / refuse action icon: dark ink crossed branch shape, no text
11. risk low badge: small cinnabar seal ring, calm and readable, no characters
12. risk mid badge: rough cinnabar seal ring with minor cracks, no characters
13. risk high badge: broken cinnabar seal ring with darker ink cracks, no characters
14. new discovery small stamp: cinnabar small mark, no characters
15. locked / unavailable small stamp: dark ink seal, no characters
16. clue / hint small stamp: old-gold tiny mark, no characters
17. event popup blank panel: parchment rectangle with thin old-gold border, empty center
18. choice button blank panel: long parchment button base, empty center
19. resource chip blank panel: compact horizontal parchment chip, empty center
20. log strip blank panel: narrow parchment strip, empty center
21. card corner ornament top-left
22. card corner ornament top-right
23. divider line ink stroke 1
24. divider line cinnabar stroke 2
25. small circular icon frame, old-gold edge
26. small square icon frame, turtle-shell inspired edge
27. scrollbar handle, old parchment and metal
28. tooltip blank small panel
29. result popup blank panel
30. warning triangle-like ancient talisman shape, no text

Do not include labels, do not include numbers, do not include Chinese characters, do not include English text, do not include UI screen composition, do not include shadows, do not include glow, do not include watermark, do not include transparent checkerboard. Pure green background only.
```

## 2. 第二张：VI / 菜单 / 启动装饰大图

目标文件名：

```text
VI-SPRITES-001_菜单启动装饰绿幕大图.png
```

复制 Prompt：

```text
File name: VI-SPRITES-001_菜单启动装饰绿幕大图.png
Format: one large sprite sheet image, 4096x4096, pure chroma key green background (#00FF00), clean grid layout, hard clean edges.

Generate isolated VI and menu decorative components for an ancient Chinese Jiuzhou game. Style: old silk parchment, ink wash linework, mineral pigment, muted ochre, gray green, cinnabar red, ink black, old gold. Mysterious, restrained, premium, not generic xianxia, not modern flat UI, not western fantasy, not plastic 3D.

Create these isolated components, separated with wide spacing:
1. app icon symbol: abstract Jiuzhou rift and old map fragment, no text
2. square app icon background frame: old parchment and cinnabar edge, empty center
3. splash screen central emblem: old map, rift, cinnabar seal dust, no text
4. blank title plaque: wide old parchment title base, empty center, for logo overlay
5. blank subtitle plaque: smaller old-gold and ink title base, empty center
6. loading spinner symbol: rotating-feel ancient compass / turtle-shell ring, still image
7. chapter end seal: large cinnabar stamp shape, no characters
8. ending collection stamp: old-gold and cinnabar round seal, no characters
9. credits / staff screen ornament: long ink divider with seal dust, no text
10. main menu button blank base: long parchment button, empty center
11. main menu selected button base: long parchment button with cinnabar edge, empty center
12. main menu disabled button base: dark muted parchment button, empty center
13. settings icon: ancient gear-like bronze ring, no modern gear look
14. audio icon: small ancient bell / sound wave mark, no text
15. archive / save icon: tied bamboo slip and old map tag
16. continue icon: old-gold road mark and small seal
17. start game icon: cinnabar route opening mark
18. codex / glossary icon: bamboo slip and old book knot
19. return / back icon: curved old-gold road arrow, no modern arrow
20. close icon: ink crossed sticks, no modern X button
21. menu frame corner ornament set
22. large parchment background patch, empty, no text
23. dark parchment vignette corner piece
24. red dust decorative particle cluster, still image

Optional: include one separate calligraphy-style "九州" title candidate only if the characters are correct and clear; place it isolated in one large cell. Do not include "不思异". If unsure, leave it as a blank title plaque instead.

Do not include labels, do not include numbers, do not include English text, do not include readable random Chinese characters, do not include UI screen composition, do not include shadows, do not include glow, do not include watermark, do not include transparent checkerboard. Pure green background only.
```

## 3. 第三张：地图 / 路线 / 节点大图

目标文件名：

```text
MAP-SPRITES-001_地图路线节点绿幕大图.png
```

复制 Prompt：

```text
File name: MAP-SPRITES-001_地图路线节点绿幕大图.png
Format: one large sprite sheet image, 4096x4096, pure chroma key green background (#00FF00), clean grid layout, hard clean edges.

Generate isolated map UI components for an ancient Chinese Jiuzhou parchment map. Style: old silk map, ink wash linework, mineral pigment, cinnabar route marks, old-gold edges, muted ochre, gray green, ink black. Clear mobile game readability, not generic xianxia, not western fantasy, not modern map UI.

Create these isolated components, separated with wide spacing:
1. current location node: cinnabar map pin / seal hybrid, no text
2. reachable location node: old-gold round node with subtle ring, no text
3. visited location node: muted ochre node with ink edge, no text
4. hidden fog node: gray ink unknown node, no question mark
5. danger node: broken cinnabar node with cracks, no text
6. destination node: old-gold and cinnabar double-ring node, no text
7. safe route line segment: old-gold dashed road line, horizontal
8. risky route line segment: cinnabar dashed road line with minor cracks
9. unknown route line segment: gray ink broken road line
10. locked route line segment: dark ink line with crossed twig mark
11. curved safe route line
12. curved risky route line
13. route endpoint dot
14. route small arrow / direction notch, ancient style, no modern arrow
15. map compass ornament, old-gold / turtle-shell inspired, no letters
16. map fog patch: soft gray paper fog edge, isolated
17. reveal ring: pale ink circular reveal mark
18. location tooltip blank mini panel, parchment, empty center
19. map legend blank chip, empty center
20. route cost chip blank base, compact, empty center
21. small clue marker: old-gold tiny knot / seal, no text
22. crisis marker: dark red broken seal, no text
23. rest marker: small calm parchment mat icon, no text
24. market marker: small bundle / coin-like old-gold marker, no text
25. shrine marker: tiny shrine silhouette icon, no text
26. rift marker: dark-water crack icon, no text
27. map border corner top-left
28. map border corner top-right
29. map border corner bottom-left
30. map border corner bottom-right

Do not include labels, do not include numbers, do not include Chinese characters, do not include English text, do not include a full map, do not include backgrounds, do not include shadows, do not include glow, do not include watermark, do not include transparent checkerboard. Pure green background only.
```

## 4. 第四张：特殊文字 / 纹样候选大图

> 这张是可选。AI 生成文字风险高，只能作为灵感和临时 Demo 候选；正式版要用字体或手写重绘。  

目标文件名：

```text
TYPE-ORNAMENT-001_特殊字样纹样候选绿幕大图.png
```

复制 Prompt：

```text
File name: TYPE-ORNAMENT-001_特殊字样纹样候选绿幕大图.png
Format: one large sprite sheet image, 4096x4096, pure chroma key green background (#00FF00), clean grid layout, hard clean edges.

Generate typography-inspired ornaments and calligraphy candidates for an ancient Chinese Jiuzhou game. Style: old silk parchment, ink brush texture, mineral pigment, cinnabar seal, old-gold edges, restrained and mysterious.

Create isolated elements:
1. "九州" calligraphy candidate, large, white ink on dark ink texture, must be correct Chinese characters
2. "九州" calligraphy candidate, old-gold mineral pigment style, must be correct Chinese characters
3. "九州" seal-script inspired candidate, cinnabar style, must be correct Chinese characters
4. blank calligraphy brush stroke underline
5. blank cinnabar title seal block with no characters
6. blank old-gold subtitle plaque
7. decorative oracle-bone-like pattern strip, no readable characters
8. decorative bamboo-slip pattern strip, no readable characters
9. decorative turtle-shell crack pattern, no readable characters
10. decorative ink wash title smoke, no text

Do not include "不思异". Do not include random Chinese characters. Do not include English text, numbers, watermark, logo, UI screen, shadows, glow, transparent checkerboard. Pure green background only.
```

## 5. 生成后切割命名建议

切割后的命名可按：

```text
UI-RES-AXLE-001.png
UI-RES-GRAIN-001.png
UI-RES-SANITY-001.png
UI-ACT-REPAIR-001.png
UI-ACT-FORAGE-001.png
UI-ACT-REST-001.png
UI-RISK-LOW-001.png
UI-RISK-MID-001.png
UI-RISK-HIGH-001.png
UI-PANEL-EVENT-001.png
UI-PANEL-CHOICE-001.png
UI-PANEL-RESOURCE-001.png
MAP-NODE-CURRENT-001.png
MAP-ROUTE-SAFE-001.png
VI-APP-ICON-001.png
VI-SPLASH-EMBLEM-001.png
```

## 6. 验收标准

可切割：

- 绿底干净、单色、元素之间有间距。
- 图标缩到 32-64px 仍能辨认。
- 面板底板内部空白，能放真实文字。
- 风格统一：旧帛、墨线、朱砂、旧金。

不可用：

- 生成了完整界面截图。
- 图里有随机文字、乱码、按钮字。
- 元素相互粘连，切不开。
- 带阴影、发光边、透明棋盘格。
- 现代扁平图标、3D 塑料质感、泛仙侠宫殿纹样过重。
