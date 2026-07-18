# B_BSI-B-014 随机事件配图提示语一键复制版

> 子线程：B，山海经世界观与叙事主创  
> 任务：BSI-B-014  
> 来源：承接 [B_BSI-B-013_第一章随机事件配图提示语.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-013_第一章随机事件配图提示语.md)  
> 用途：每个随机事件都提供完整可复制提示语，已内置主画风参考图、统一 Style lock、地点气氛参考、事件画面和负面提示词  
> 边界：只写提示语，不生成图片，不修改 C 代码，不复制现代《山海经》译文、百科文本或插画设定

## 0. 使用说明

下面每个事件都是独立完整提示语。复制单个代码块即可使用，不需要再另外拼接通用风格或负面词。

为解决批量生图画风不一致，执行时按这条规则：

- `Style reference image` 是唯一画风参考图，建议作为 style reference / image reference 上传。
- `Scene mood reference` 只用于理解地点气氛，不建议作为第二张参考图上传给生图引擎，避免风格漂移。
- `Style lock prompt` 每条完全相同，不要改字面；事件之间只改 `Event image prompt`。
- 同一批图尽量固定同一模型、同一 4:3 比例、同一质量/风格化强度、同一参考图权重。

建议参数：

- 主生成画幅：`4:3`（推荐 `2048x1536` 或 `1600x1200`）；弹窗可完整展示，紧凑弹窗不单独生成，直接由前端容器中心裁切，舞台缩略图从中心裁成 `16:9`
- 用途：事件牌、路遇弹窗、横向旅途舞台插图
- 风格：同一套山海经古籍矿物彩，但比 Web Demo 原型素材更华丽
- 字体：不要在图中生成文字，巫文只做抽象符号
- 校准顺序：先跑 `鸣蛇入轴`、`黑齿影价`、`半截骨桥` 三张；三张统一后再批量跑全部事件

## 1. 首版优先 8 张

### 01. 鸣蛇入轴 `rnd_loose_axle_song`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Close view of an ancient wooden cart wheel stopped on a lonely road, the axle glowing faintly with thin snake-like sound waves, a shadow of a mythical Ming snake coiling inside the wheel hub, travelers kneeling with bronze tools and cloth strips, distant marsh thunder under the ground, tense and beautiful, the danger is hidden inside the cart itself.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 02. 祝余苦汤 `rnd_bitter_grass_soup`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A small caravan camp at dusk, travelers boiling dark Zhuyu grass soup in a bronze pot beside the road, pale green herbs glowing softly, grain sacks nearby, steam rising into faint dreamlike mountain shapes, the food looks lifesaving and unsettling at the same time, elegant ritual survival scene.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 03. 巫咸反里 `rnd_wrong_milestone`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: An abandoned royal road with a leaning stone milestone covered in abstract reversed shamanic marks, no readable modern characters, a traveler making an ink rubbing while others watch the road split behind the stone, gold dust and black ink lines crawling across the old stone, ruined gate far away.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 04. 黑齿影价 `rnd_silent_barter`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A silent fog market at noon, black-toothed traders sitting behind bone and pottery stalls, they bargain only with long shadows cast on cloth, grain sacks and old iron parts placed between them and the caravan, dark smiles, gold-edged shadows, strange but not hostile.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 05. 夸父复迹 `rnd_repeated_footprints`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B / 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A low sanity road scene where the caravan finds its own fresh footprints returning from ahead, mixed with enormous ancient giant footprints like Kuafu traces pressed into dry earth, the path loops impossibly, red dust and golden rim light, travelers hesitate at the edge of the prints.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 06. 巫咸点名 `rnd_count_names_rest`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Night rest beside a small shamanic fire, caravan members seated in a circle while a leader counts names on bamboo slips, one extra shadow sits among them without a body, faint Wuxian-style ritual marks in the ash, warm firelight against cold dark wilderness.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 07. 雷泽云缝 `rnd_low_black_cloud_gap`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A black cloud rolling close to the ground over a thunder marsh, opening a narrow glowing passage like a mouth in the fog, the caravan unloading heavy bundles before the cloud, reeds bending without wind, faint lightning under black water, gorgeous dark gold and cinnabar highlights.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 08. 烛龙息图 `rnd_breathing_map`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A close cinematic view of an ancient silk map spread on a cart, the parchment rising and falling like a breathing chest, red route lines shifting with each breath, a faint vast shadow of Zhulong behind the horizon, travelers pressing bronze weights onto the map in fear.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

## 2. 后续随机事件一键复制

### 09. 温石垫轮 `rnd_warm_stone`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A warm jade-like road stone fits perfectly under a damaged cart wheel, gray sacrificial ash glowing beneath it, travelers debating whether to use it, old road shrine fragments nearby, soft gold light on stone dust.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 10. 影子挤路 `rnd_crowded_shadow`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A caravan at sunset on a narrow road, their shadows stretch too long and multiply until more shadows than people crowd the roadside, faint fox-tail shapes in the darkness, beautiful long silhouettes on parchment-colored dust.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 11. 枯井回声 `rnd_dry_well_echo`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: An abandoned roadside well beside cracked earth, a traveler leaning over the rim while black-gold sound ripples rise from the empty depth, the caravan waits behind, faint shamanic dust patterns forming around the well stones.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 12. 赤叶缠轴 `rnd_red_leaf_on_axle`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A single cinnabar red leaf wrapped tightly around a wooden cart axle, the leaf veins glowing like tiny rivers, red water far in the distance, a traveler reaching toward it with hesitation, ominous beauty in close detail.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 13. 双月水坑 `rnd_two_moons_puddle`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A shallow marsh puddle reflects two moons, one whole and one broken, while the real sky shows only one dim moon, reeds and cart wheels frame the reflection, travelers avoid stepping into the mirrored second moon.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 14. 鸟鼠结绳 `rnd_old_rope_knot`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Old ropes on the caravan tie themselves into impossible knots, tiny bird and mouse claw marks around the cart, a narrow mountain pass with dark holes in the cliffs, bronze hooks and frayed fibers rendered in rich detail.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 15. 灰中粟 `rnd_millet_in_ashes`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A nameless roadside altar filled with pale ash, unburned golden millet grains emerging from the ash like small stars, grain-starved travelers kneeling near it, a cart and empty sacks behind them, sacred and troubling.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 16. 白籽芦 `rnd_white_seed_reed`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Reeds growing upside down beneath still marsh water, white seeds hanging from submerged stalks, a traveler reaching down with a sickle while their reflection reaches up first, elegant water distortion and mineral green light.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 17. 睡粮袋 `rnd_sleeping_grain_bag`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A grain sack on a cart slowly swelling and breathing like a sleeping creature, pale dream mist leaking from its seams, travelers asleep around it, red map lines and gold dust drifting in the night air.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 18. 骨盐 `rnd_bone_salt`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: White bones along the red water bank covered with glittering salt frost, a traveler scraping salt into a small bronze bowl while another prepares to bury the bones, the red marsh behind them perfectly still.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 19. 狐灯小市 `rnd_fox_lamp_market`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Nine small fox-lamps floating above a roadside hollow, their warm light revealing a temporary tiny market that exists only inside the glow, silk bundles, grain, bronze charms, and fox-tail shadows, luxurious and eerie.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 20. 雷根 `rnd_thunder_root`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: In a thunder marsh, white roots emerge from black mud as if cooked by underground lightning, blue-gold sparks in the wet soil, travelers digging carefully beside a half-sunk cart wheel, lush ominous detail.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 21. 轮影分裂 `rnd_wheel_shadow_split`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A cart wheel casts two separate shadows pointing in opposite directions on the dust, one shadow bright gold and one shadow black red, travelers examining the wheel while the road forks behind them.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 22. 暗辙 `rnd_hidden_rut`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Deep ancient wheel ruts suddenly appear across flat royal road stones, far larger than the caravan cart, filled with red dust and old gold light, the small caravan stands at the edge of the impossible track.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 23. 铜钉低鸣 `rnd_bronze_nail_hum`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Close detail of bronze nails in a cart frame vibrating with dark gold sound rings, the ruined border gate and old decree stone blurred behind, travelers deciding whether to pull the nails out.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 24. 泥咬轮 `rnd_mud_bites_wheel`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Black marsh mud gripping a wooden wheel like a mouth, bubbles rising in abstract shamanic patterns, no readable text, reeds and distant underground lightning, the caravan struggling in the background.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 25. 轮欲歇 `rnd_wheel_wants_rest`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A tired caravan at twilight, the front wheel sinks gently into golden dust as if refusing to move, faint face-like grain in the wood, travelers setting down grain and tools around it.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 26. 轴上热名 `rnd_axle_warm_name`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A wooden axle glowing with ember-like abstract Wuxian marks, a traveler scraping the hot surface with a bronze knife, the cart interior lit by red-gold shamanic light, ominous close-up.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 27. 白羽渡价 `rnd_feather_toll`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A pale feather ford over black marsh water, feather-folk silhouettes standing lightly on the water surface, a caravan offers grain and a name token, white feathers glowing with gold edges.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 28. 黑齿数车 `rnd_black_teeth_count`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Black-toothed traders kneel beside the caravan counting cart wheels with black stones, ignoring the travelers, a silent market of bone tags and grain sacks around them, strange rules made visible.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 29. 三指价 `rnd_three_finger_price`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 C, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A market trader extends three long elegant fingers over a cloth of goods, but the shadow shows a different hand, grain and bronze parts arranged like ritual prices, unsettling and ornate.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 30. 鸟鼠过税 `rnd_bird_mouse_tax`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: In a narrow cliff pass, many tiny claws reach from dark holes in the rock toward a grain pouch and rope, the caravan halted below, bird feathers and mouse tracks mixed in the dust.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 31. 盐面卖者 `rnd_salt_mask_seller`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A pale salt-masked seller at the edge of red marsh offers dry grain under a black canopy, asking for a story rather than money, travelers sit before them, white mask, cinnabar water, dark gold ritual bowls.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 32. 哑童引路 `rnd_silent_child_guide`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A silent small guide drawing a route in dust with one bare toe, the line glows faintly gold and winds toward the mountains, the caravan waits behind, one fox-lamp hanging nearby.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 33. 皮下缺笔 `rnd_word_under_skin`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Close view of a traveler's hand above a broken shamanic stele, a missing abstract stroke moving faintly under the skin like dark gold ink, no gore, red mist and carved stone texture.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 34. 无主名 `rnd_name_without_owner`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B / 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A lonely roadside stone with abstract name-like marks that belong to nobody, one traveler points while all shadows turn away, dry road and red horizon, elegant dread, no readable text.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 35. 灰上短谕 `rnd_oracle_ash`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A small altar bowl of ash rearranging itself into abstract omen strokes, no legible writing, gold ash particles floating upward, caravan lanterns and old stone fragments behind.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 36. 倒鸟声 `rnd_reverse_birdsong`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 A / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A red-beaked omen bird perched on a wooden road sign, its song visualized as reversed gold ink ripples in the air, travelers covering their ears, old road and dark forest beyond.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 37. 梦中筹码 `rnd_dream_tally`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Inside a dim dream camp, black and gold counting tokens float above a sleeping traveler's palm, each token casting a tiny road shadow, silk map and red mist around them.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 38. 墨又湿 `rnd_ink_wet_again`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: An ancient travel log on silk or bamboo slips, dried ink becoming wet again and crawling into new abstract strokes, a bronze lamp, red dust, and blurred caravan silhouettes in the background.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 39. 赤水试味 `rnd_red_water_taste`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A grain sack on the red marsh bank staining cinnabar from one corner before touching the water, the red water perfectly still, travelers seal the sack with trembling hands, white bones in the distance.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 40. 半截骨桥 `rnd_bone_bridge_half`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A bridge made of old white bones reaches only halfway across red water, its missing half visible only in the reflection below, the caravan stands at the shore under dark gold mist.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 41. 第二层天 `rnd_second_sky_low`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: The sky hangs unnaturally low like a second parchment layer, scraping the caravan banner, travelers lowering the flag beneath a vast dark celestial skin, red horizon and gold cracks overhead.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 42. 裂隙生粟 `rnd_rift_grain_sprout`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: Golden millet grows upside down from the edge of a world crack, roots exposed to red mist, the caravan tempted near the rift, lush grain against dangerous darkness, beautiful and forbidden.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 43. 死路归来 `rnd_dead_route_returns`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: A dead road loops back from the horizon and returns in front of the caravan like a living ribbon of dust, old wheel tracks crossing themselves, low sanity atmosphere, gold and red map lines in the air.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

### 44. 无人之车 `rnd_cart_without_team`

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
Scene mood reference (do not use as style reference): 图 D / 图 B, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png, /Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: An empty ancient cart rolls backward from red fog toward the caravan, fresh wheel tracks appearing before the wheels touch the ground, no driver, no horses, broken gold light on the silent wood.

Negative prompt: modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

## 3. 自检

- 44 个事件均为独立完整提示语。
- 每条都包含：唯一主画风参考图、地点气氛参考、统一 Style lock、事件画面、负面提示。
- 每条都可单独复制，不依赖前文通用词。
- 画面统一为横向 4:3 装帧事件牌母图，中心安全区适合紧凑弹窗容器裁切或 16:9 缩略图复用，适合 Web Demo 事件牌、弹窗和横向旅途舞台缩略图。
- 全部提示语避免可读文字、现代 UI、现代城市、科幻霓虹和战斗爽感。
