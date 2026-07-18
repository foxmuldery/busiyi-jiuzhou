# 《不思异：九州》采风使动态漫画开场分镜与生图提示语

> 目的：按“王朝采风使”新设定，设计一段可先生成静图、后续图生视频的动态漫画开场。  
> 建议总时长：约 48 秒，12 格，每格 4 秒。  
> 画幅：16:9 横屏，适合开场动画和横屏手机 Demo。  
> 重要：图片内不要生成文字，所有标题、诗句、旁白后期叠加。

## 0. 开场核心

玩家不是普通旅人，而是王朝派出的采风使。  
表面任务是记录九州风土、写诗成册；真实任务是替王朝判断每座城：可治理、可隐瞒、可镇压，还是不可上报。

开场要在 48 秒内讲清四件事：

1. 王朝授命：你奉命采风。
2. 三种声音：官员之声、民众之声、异象之声。
3. 道德选择：你可以受贿、隐瞒、如实上报、直接干预。
4. 诗即判词：你写下的诗，会改变一座城的命运。

## 1. 统一风格锁定

参考图：

```text
/Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
```

每张图都建议使用同一张参考图，并尽量固定同一模型、同一比例、同一风格强度。

通用正向提示词：

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.
```

通用负面提示词：

```text
readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

## 2. 动态漫画完整分镜

| 镜头 | 时长 | 画面 | 动态方式 | 后期字幕 / 旁白建议 |
| --- | --- | --- | --- | --- |
| 01 | 4s | 王朝内廷，空白采风册被递出 | 慢推到册页与玉印 | “王朝命你西行，采九州之风。” |
| 02 | 4s | 采风使接册，身后官员如屏风阴影 | 轻微推近，烛火摇动 | “所见，皆须成诗；所闻，皆须入册。” |
| 03 | 4s | 内廷外，一名地方使者暗递财物 | 横向轻移，手与袖中礼物特写 | “但还未出城，第一份风声已经有了价。” |
| 04 | 4s | 三声并现：官员、民众、异象 | 三处声源微微显影 | “官有官声，民有民声，山川另有声。” |
| 05 | 4s | 车队离开王城，空白舆图展开 | 地图从前景展开，远处城门后退 | “你带着诗简上路，也带着王朝的眼睛。” |
| 06 | 4s | 第一座边城，官员在高处宣读安民令 | 由高处俯视到城下饥民 | “一城之中，太平与饥饿可以同时存在。” |
| 07 | 4s | 市巷暗处，百姓把民谣低声唱给采风使 | 轻推到人群与耳语 | “有人求你写下真相，有人求你不要写。” |
| 08 | 4s | 异象出现，赤水/碑影/鸟影压住城墙 | 墨色从地面蔓延，朱砂线闪动 | “还有些声音，不像人说的。” |
| 09 | 4s | 四种诗简摆开：颂、讽、哀、谶的视觉象征 | 俯拍，四枚无字简牍逐一亮起 | “你如何写，这地方就如何被王朝看见。” |
| 10 | 4s | 采风使站在冲突中央：官吏、饥民、异族商人三方对峙 | 缓慢环绕或左右摇镜 | “受贿、隐瞒、上报、干预，皆会留下后果。” |
| 11 | 4s | 诗简送回王朝，远处边城却出现不同命运 | 前景诗简，远景城市一半安定一半阴影 | “一首诗，可以救一城，也可以封一城。” |
| 12 | 4s | 采风使站在九州裂隙前，诗册自行翻页 | 慢推，纸页翻动，裂隙亮起暗红 | “奉命采风，写下即判决。” |

## 3. 每格一键复制生图提示语

### 01 王朝授册

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: Inside a dim imperial archive hall, an elderly court official presents a blank folklore-collection register and a jade seal across a low lacquer table. Bronze lamps burn low, folded maps and bamboo slips surround the table, the throne is only a distant shadow behind curtains. The blank register is the main foreground object, solemn and dangerous, as if an order has just become a fate.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 02 采风使接命

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: A young imperial folklore envoy kneels and receives the blank register with both hands. Behind the envoy, several court officials stand like dark vertical screens, their faces half hidden by lamp smoke. The envoy wears practical travel robes under formal court layers, a brush case and empty poem slips at the belt. The mood is not heroic; it feels like being recruited into a quiet machine.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 03 第一份贿赂

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: In a narrow palace corridor outside the archive, a local emissary discreetly slides a small dark pouch, black grain, and a dull jade token from one sleeve toward the folklore envoy. The envoy's blank poem slip is visible in the other hand. Lantern shadows stretch long across the floor, making the gift look larger than it is. The scene should feel like temptation before the journey even begins.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 04 三种声音

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: One composed scene inside a provincial hearing hall, not a split screen. At left, a polished official speaks behind a desk and seal box; at right, common people wait in dim shadow with grain sacks and worn clothes; in the far background, a dark river reflection and faint bird-shaped omen rise behind the wall. Three invisible voices are represented by thin ink ripples traveling toward the envoy's ear.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 05 离城西行

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: The folklore envoy's small travel cart leaves the imperial city gate at dawn, carrying blank poem slips, sealed registers, grain bags, and spare wheel parts. In the foreground, an enormous blank map unfurls like a road, its western edge dissolving into fog. The city behind is orderly and rigid; the road ahead is empty, dusty, and faintly red at the horizon.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 06 官员之声

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: In the first frontier city, a local official stands on a raised wooden platform with attendants and seal boxes, presenting an orderly version of the city. Below the platform, hungry townspeople wait behind a low barrier, half hidden by banners and dust. The envoy observes from the side with a brush and blank slip. The image should show official calm above and human distress below.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 07 民众之声

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: In a narrow market alley at night, several townspeople lean close to the folklore envoy and whisper a local song, while one child watches the street corner for guards. A cracked grain bowl, worn shoes, and a hidden paper charm sit in the foreground. Warm lamplight touches faces but leaves the alley mouth black, creating the feeling of a secret that could cost someone their life.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 08 异象之声

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: The city wall at midnight, with red water stains creeping up from the ground like veins, a broken stele shadow falling across the street, and a strange bird silhouette perched on the roof beam. The envoy stands alone, brush raised but not writing. Thin cinnabar sound waves and dark ink ripples move from river, stone, and bird toward the blank register.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 09 诗文即治理

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: A top-down view of four blank bamboo slips on a dark writing table, each marked only by a symbolic object, no writing: a gold seal for praise, a cracked bronze mirror for satire, a torn grain cloth for lament, and a cinnabar omen mark for prophecy. The envoy's brush hovers above them, while the city appears faintly reflected in spilled ink.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 10 干预与代价

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: The folklore envoy stands in the center of a tense frontier square. On one side, local officials with seal boxes demand an official report; on another side, hungry townspeople plead silently; on a third side, an異族 merchant offers grain and a dark gift. In the background, a shrine brazier smokes with unnatural cinnabar sparks. The envoy's open hand is undecided.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 11 诗简回朝

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: Back in the imperial archive, a sealed poem slip lies on a lacquer tray before expressionless court officials. In the distant background, visible like an ink reflection inside the tray, the frontier city splits into two possible fates: one side guarded and orderly, the other side hungry and shadowed. The officials only look at the slip, not the people in the reflection.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

### 12 写下即判决

```text
16:9 horizontal dynamic comic keyframe, ancient Chinese dark ink-and-mineral-pigment illustration, Shanhaijing-inspired imperial folklore thriller, aged parchment texture, dark cloth border feeling, thin antique-gold linework, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, smoky ink atmosphere, ritual bronze details, grounded ancient Chinese officials and travelers, East Asian facial features, cinematic but like a hand-painted graphic novel panel, ornate through texture and linework, eerie political thriller mood, no readable text.

Scene: The folklore envoy stands at the edge of a vast dark rift where the road and the map become the same torn surface. The blank register in the envoy's hands flips open by itself, pages moving in an unseen wind. Behind the envoy, faint silhouettes of officials, townspeople, and supernatural omens overlap like three voices following from the journey. The final image should feel like a vow and a curse.

Negative prompt: readable text, fake Chinese characters, subtitles, speech bubbles, logo, watermark, modern city, modern clothes, guns, sci-fi, cyberpunk, neon, western medieval armor, European fantasy faces, cute anime, glossy 3D render, plastic texture, bright colorful magic explosion, heroic battle pose, flying swords, wuxia duel, gore, excessive blood, UI, collage, split-screen layout, over-saturated fantasy poster.
```

## 4. 图生视频动效建议

| 镜头 | 建议动效 |
| --- | --- |
| 01 | 慢推到采风册，玉印轻微反光。 |
| 02 | 烛火摇动，官员阴影轻微拉长。 |
| 03 | 镜头横移到袖中礼物，暗处手指收紧。 |
| 04 | 三处声源出现淡淡墨纹波动。 |
| 05 | 舆图向前展开，车队轻微向西移动。 |
| 06 | 从官员高台慢慢压到城下饥民。 |
| 07 | 灯火轻晃，人群靠近，远处巡逻影子掠过。 |
| 08 | 朱砂水纹缓慢爬上墙根，鸟影不动。 |
| 09 | 四枚诗简依次微亮，墨水倒映城市。 |
| 10 | 轻微环绕，三方人物保持压迫距离。 |
| 11 | 前景诗简清晰，远景城市两种命运交替闪现。 |
| 12 | 诗册自动翻页，裂隙中暗红光缓慢亮起。 |

## 5. 后期字幕建议

```text
王朝命你西行，采九州之风。
所见，皆须成诗；所闻，皆须入册。
官有官声，民有民声，山川另有声。
你可以受贿，可以隐瞒，可以上报，也可以干预。
但你写下的每一首诗，都会改变一座城。
奉命采风，写下即判决。
```

## 6. 生成顺序建议

先生成 3 张校准图：

```text
01 王朝授册
07 民众之声
12 写下即判决
```

这三张分别验证：王朝政治感、民间惊悚感、山海终局感。三张风格统一后，再批量生成剩余 9 张。
