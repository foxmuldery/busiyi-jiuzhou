# B_BSI-B-013 第一章随机事件配图提示语

> 子线程：B，山海经世界观与叙事主创  
> 任务：BSI-B-013  
> 来源：承接 [B_BSI-B-012_第一章随机事件扩展池.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-012_第一章随机事件扩展池.md)  
> 用途：给每个随机事件生成一张事件插图提示语，作为 Web Demo 后续事件牌、路遇弹窗、横向旅途舞台素材方向  
> 边界：只写提示语，不生成图片，不修改 C 代码，不复制现代《山海经》译文、百科文本或插画设定

## 0. 使用方式

每个事件最终图片提示语由三部分组成：

1. 事件专属提示语：见下方每一行。
2. 通用华丽正面风格：统一复制到每条提示语后面。
3. 通用负面提示词：统一作为 negative prompt。

建议母图画幅：`4:3` 装帧事件牌横图，推荐 `2048x1536` 或 `1600x1200`；弹窗完整显示 4:3，紧凑弹窗不单独生成，直接用同一张图按前端容器中心裁切；小横屏缩略图或舞台复用时从中心安全裁成 `16:9`。  
画面重点：一张图讲清“事件正在发生”，不要做成 UI 卡面，不要加文字标题。  
参考图使用规则：主画风只参考下方“主画风参考”；概念预告四张图只用于判断地点气氛和事件所属区域，不建议作为生图风格参考一起上传，否则容易造成每个事件画风不一致。

主画风参考：

![参考这个画风](/Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg)

| 图号 | 文件 | 适用事件 |
| --- | --- | --- |
| 图 A | `/Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_A_中原出发.png` | 起点、普通驿路、车队近景、低压路遇 |
| 图 B | `/Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_B_废关王道.png` | 故王道、废关、旧令、石碑、山隘 |
| 图 C | `/Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_C_雷泽墟市.png` | 雷泽、泽地、黑齿市、羽民渡、异族交易 |
| 图 D | `/Users/yuanzhe/Documents/game/协作/概念预告参考图/shot_ref_D_赤水裂隙.png` | 赤水、白骨、巫文、梦图、九州裂隙、高压禁地 |

## 1. 通用华丽正面风格

复制到每条事件提示语后面：

```text
Ornate Shanhaijing-inspired ancient Chinese mythic event illustration, horizontal 4:3 framed event-card composition, safe center crop for compact popup containers and 16:9 stage thumbnails, cinematic ancient wilderness journey, a small wooden caravan as scale reference, aged sepia and dark umber palette, parchment beige, charcoal ink linework, dull antique gold filigree, restrained cinnabar accents, weathered wood, bronze and rough cloth texture, hand-painted ancient event-card illustration, dark fabric outer border, thin aged-gold inner frame, subtle paper grain, vignette, close foreground subject plus distant narrative background, high detail, realistic ancient materials, restrained eastern mythic horror, no combat, no modern elements, no readable text.
```

如果批量生成时画风漂移，优先改用这段更硬的画风锁，且每条事件字面保持一致：

```text
horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.
```

## 2. 通用负面提示词

```text
modern city, sci-fi, neon, cyberpunk, cute anime style, bright fantasy RPG, heroic combat, martial arts duel, flying swords, western medieval castle, comedy tone, cartoon monster, plastic texture, clean modern UI, readable modern text, typography, logo, watermark, overdesigned armor, modern weapons, guns, cars, skyscrapers, futuristic interface, low detail, blurry, flat lighting.
```

## 3. 首版优先 8 个随机事件配图提示语

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_loose_axle_song` | 鸣蛇入轴 | 图 A / 图 C | 车轴异响与鸣蛇声异 | Close view of an ancient wooden cart wheel stopped on a lonely road, the axle glowing faintly with thin snake-like sound waves, a shadow of a mythical Ming snake coiling inside the wheel hub, travelers kneeling with bronze tools and cloth strips, distant marsh thunder under the ground, tense and beautiful, the danger is hidden inside the cart itself. |
| `rnd_bitter_grass_soup` | 祝余苦汤 | 图 A | 草木补给与梦中苦味 | A small caravan camp at dusk, travelers boiling dark Zhuyu grass soup in a bronze pot beside the road, pale green herbs glowing softly, grain sacks nearby, steam rising into faint dreamlike mountain shapes, the food looks lifesaving and unsettling at the same time, elegant ritual survival scene. |
| `rnd_wrong_milestone` | 巫咸反里 | 图 B | 反字里程牌与巫文占路 | An abandoned royal road with a leaning stone milestone covered in abstract reversed shamanic marks, no readable modern characters, a traveler making an ink rubbing while others watch the road split behind the stone, gold dust and black ink lines crawling across the old stone, ruined gate far away. |
| `rnd_silent_barter` | 黑齿影价 | 图 C | 黑齿市影子比价 | A silent fog market at noon, black-toothed traders sitting behind bone and pottery stalls, they bargain only with long shadows cast on cloth, grain sacks and old iron parts placed between them and the caravan, dark smiles, gold-edged shadows, strange but not hostile. |
| `rnd_repeated_footprints` | 夸父复迹 | 图 B / 图 D | 重复脚印与巨人遗迹 | A low sanity road scene where the caravan finds its own fresh footprints returning from ahead, mixed with enormous ancient giant footprints like Kuafu traces pressed into dry earth, the path loops impossibly, red dust and golden rim light, travelers hesitate at the edge of the prints. |
| `rnd_count_names_rest` | 巫咸点名 | 图 A / 图 D | 休整点名与人数不对 | Night rest beside a small shamanic fire, caravan members seated in a circle while a leader counts names on bamboo slips, one extra shadow sits among them without a body, faint Wuxian-style ritual marks in the ash, warm firelight against cold dark wilderness. |
| `rnd_low_black_cloud_gap` | 雷泽云缝 | 图 C | 贴地黑云开缝 | A black cloud rolling close to the ground over a thunder marsh, opening a narrow glowing passage like a mouth in the fog, the caravan unloading heavy bundles before the cloud, reeds bending without wind, faint lightning under black water, gorgeous dark gold and cinnabar highlights. |
| `rnd_breathing_map` | 烛龙息图 | 图 D | 地图纸面呼吸 | A close cinematic view of an ancient silk map spread on a cart, the parchment rising and falling like a breathing chest, red route lines shifting with each breath, a faint vast shadow of Zhulong behind the horizon, travelers pressing bronze weights onto the map in fear. |

## 4. 后续随机事件配图提示语

### 4.1 低压路遇池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_warm_stone` | 温石垫轮 | 图 A / 图 B | 暖石补轴与祭灰 | A warm jade-like road stone fits perfectly under a damaged cart wheel, gray sacrificial ash glowing beneath it, travelers debating whether to use it, old road shrine fragments nearby, soft gold light on stone dust. |
| `rnd_crowded_shadow` | 影子挤路 | 图 A | 影子数量多于车队 | A caravan at sunset on a narrow road, their shadows stretch too long and multiply until more shadows than people crowd the roadside, faint fox-tail shapes in the darkness, beautiful long silhouettes on parchment-colored dust. |
| `rnd_dry_well_echo` | 枯井回声 | 图 A / 图 B | 枯井回声先说未来 | An abandoned roadside well beside cracked earth, a traveler leaning over the rim while black-gold sound ripples rise from the empty depth, the caravan waits behind, faint shamanic dust patterns forming around the well stones. |
| `rnd_red_leaf_on_axle` | 赤叶缠轴 | 图 D | 赤叶提前污染车轴 | A single cinnabar red leaf wrapped tightly around a wooden cart axle, the leaf veins glowing like tiny rivers, red water far in the distance, a traveler reaching toward it with hesitation, ominous beauty in close detail. |
| `rnd_two_moons_puddle` | 双月水坑 | 图 C | 水坑双月与月母母题 | A shallow marsh puddle reflects two moons, one whole and one broken, while the real sky shows only one dim moon, reeds and cart wheels frame the reflection, travelers avoid stepping into the mirrored second moon. |
| `rnd_old_rope_knot` | 鸟鼠结绳 | 图 B | 鸟鼠小爪与绳结 | Old ropes on the caravan tie themselves into impossible knots, tiny bird and mouse claw marks around the cart, a narrow mountain pass with dark holes in the cliffs, bronze hooks and frayed fibers rendered in rich detail. |

### 4.2 补给与诱惑池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_millet_in_ashes` | 灰中粟 | 图 A / 图 B | 祭灰中翻出粟粒 | A nameless roadside altar filled with pale ash, unburned golden millet grains emerging from the ash like small stars, grain-starved travelers kneeling near it, a cart and empty sacks behind them, sacred and troubling. |
| `rnd_white_seed_reed` | 白籽芦 | 图 C | 倒生芦苇与白籽 | Reeds growing upside down beneath still marsh water, white seeds hanging from submerged stalks, a traveler reaching down with a sickle while their reflection reaches up first, elegant water distortion and mineral green light. |
| `rnd_sleeping_grain_bag` | 睡粮袋 | 图 A / 图 D | 粮袋呼吸入梦 | A grain sack on a cart slowly swelling and breathing like a sleeping creature, pale dream mist leaking from its seams, travelers asleep around it, red map lines and gold dust drifting in the night air. |
| `rnd_bone_salt` | 骨盐 | 图 D | 白骨结盐保粮 | White bones along the red water bank covered with glittering salt frost, a traveler scraping salt into a small bronze bowl while another prepares to bury the bones, the red marsh behind them perfectly still. |
| `rnd_fox_lamp_market` | 狐灯小市 | 图 A / 图 C | 狐灯照出一刻小市 | Nine small fox-lamps floating above a roadside hollow, their warm light revealing a temporary tiny market that exists only inside the glow, silk bundles, grain, bronze charms, and fox-tail shadows, luxurious and eerie. |
| `rnd_thunder_root` | 雷根 | 图 C | 泥中雷火烤熟白根 | In a thunder marsh, white roots emerge from black mud as if cooked by underground lightning, blue-gold sparks in the wet soil, travelers digging carefully beside a half-sunk cart wheel, lush ominous detail. |

### 4.3 车轴事故池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_wheel_shadow_split` | 轮影分裂 | 图 A / 图 B | 一轮双影指向两路 | A cart wheel casts two separate shadows pointing in opposite directions on the dust, one shadow bright gold and one shadow black red, travelers examining the wheel while the road forks behind them. |
| `rnd_hidden_rut` | 暗辙 | 图 B | 古老巨辙突然显形 | Deep ancient wheel ruts suddenly appear across flat royal road stones, far larger than the caravan cart, filled with red dust and old gold light, the small caravan stands at the edge of the impossible track. |
| `rnd_bronze_nail_hum` | 铜钉低鸣 | 图 B | 旧铜钉认得废关旧令 | Close detail of bronze nails in a cart frame vibrating with dark gold sound rings, the ruined border gate and old decree stone blurred behind, travelers deciding whether to pull the nails out. |
| `rnd_mud_bites_wheel` | 泥咬轮 | 图 C | 雷泽泥水咬轮吐字 | Black marsh mud gripping a wooden wheel like a mouth, bubbles rising in abstract shamanic patterns, no readable text, reeds and distant underground lightning, the caravan struggling in the background. |
| `rnd_wheel_wants_rest` | 轮欲歇 | 图 A | 车轮像有意志要求休息 | A tired caravan at twilight, the front wheel sinks gently into golden dust as if refusing to move, faint face-like grain in the wood, travelers setting down grain and tools around it. |
| `rnd_axle_warm_name` | 轴上热名 | 图 D | 巫文在轴木发热显名 | A wooden axle glowing with ember-like abstract Wuxian marks, a traveler scraping the hot surface with a bronze knife, the cart interior lit by red-gold shamanic light, ominous close-up. |

### 4.4 异族交易池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_feather_toll` | 白羽渡价 | 图 C | 羽民以羽与名字收费 | A pale feather ford over black marsh water, feather-folk silhouettes standing lightly on the water surface, a caravan offers grain and a name token, white feathers glowing with gold edges. |
| `rnd_black_teeth_count` | 黑齿数车 | 图 C | 黑齿商人只数车不数人 | Black-toothed traders kneel beside the caravan counting cart wheels with black stones, ignoring the travelers, a silent market of bone tags and grain sacks around them, strange rules made visible. |
| `rnd_three_finger_price` | 三指价 | 图 C | 三指价码与异人身体 | A market trader extends three long elegant fingers over a cloth of goods, but the shadow shows a different hand, grain and bronze parts arranged like ritual prices, unsettling and ornate. |
| `rnd_bird_mouse_tax` | 鸟鼠过税 | 图 B | 山洞小爪索粮索绳 | In a narrow cliff pass, many tiny claws reach from dark holes in the rock toward a grain pouch and rope, the caravan halted below, bird feathers and mouse tracks mixed in the dust. |
| `rnd_salt_mask_seller` | 盐面卖者 | 图 D | 白面卖者以故事换粮 | A pale salt-masked seller at the edge of red marsh offers dry grain under a black canopy, asking for a story rather than money, travelers sit before them, white mask, cinnabar water, dark gold ritual bowls. |
| `rnd_silent_child_guide` | 哑童引路 | 图 A / 图 B | 哑童脚尖画路 | A silent small guide drawing a route in dust with one bare toe, the line glows faintly gold and winds toward the mountains, the caravan waits behind, one fox-lamp hanging nearby. |

### 4.5 巫文与神志池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_word_under_skin` | 皮下缺笔 | 图 D | 断碑缺笔游入手背 | Close view of a traveler's hand above a broken shamanic stele, a missing abstract stroke moving faintly under the skin like dark gold ink, no gore, red mist and carved stone texture. |
| `rnd_name_without_owner` | 无主名 | 图 B / 图 D | 路边石上无主之名 | A lonely roadside stone with abstract name-like marks that belong to nobody, one traveler points while all shadows turn away, dry road and red horizon, elegant dread, no readable text. |
| `rnd_oracle_ash` | 灰上短谕 | 图 B | 香灰排成短谕 | A small altar bowl of ash rearranging itself into abstract omen strokes, no legible writing, gold ash particles floating upward, caravan lanterns and old stone fragments behind. |
| `rnd_reverse_birdsong` | 倒鸟声 | 图 A / 图 B | 鴸鸟倒念路标 | A red-beaked omen bird perched on a wooden road sign, its song visualized as reversed gold ink ripples in the air, travelers covering their ears, old road and dark forest beyond. |
| `rnd_dream_tally` | 梦中筹码 | 图 D | 梦中有人数路程 | Inside a dim dream camp, black and gold counting tokens float above a sleeping traveler's palm, each token casting a tiny road shadow, silk map and red mist around them. |
| `rnd_ink_wet_again` | 墨又湿 | 图 D | 日志墨迹重新变湿 | An ancient travel log on silk or bamboo slips, dried ink becoming wet again and crawling into new abstract strokes, a bronze lamp, red dust, and blurred caravan silhouettes in the background. |

### 4.6 高风险禁地池

| id | 事件 | 参考图 | 图片叙事重点 | 事件专属提示语 |
| --- | --- | --- | --- | --- |
| `rnd_red_water_taste` | 赤水试味 | 图 D | 赤水先染粮袋 | A grain sack on the red marsh bank staining cinnabar from one corner before touching the water, the red water perfectly still, travelers seal the sack with trembling hands, white bones in the distance. |
| `rnd_bone_bridge_half` | 半截骨桥 | 图 D | 半座骨桥入倒影 | A bridge made of old white bones reaches only halfway across red water, its missing half visible only in the reflection below, the caravan stands at the shore under dark gold mist. |
| `rnd_second_sky_low` | 第二层天 | 图 D | 第二层天压低刮车旗 | The sky hangs unnaturally low like a second parchment layer, scraping the caravan banner, travelers lowering the flag beneath a vast dark celestial skin, red horizon and gold cracks overhead. |
| `rnd_rift_grain_sprout` | 裂隙生粟 | 图 D | 裂隙边倒生金粟 | Golden millet grows upside down from the edge of a world crack, roots exposed to red mist, the caravan tempted near the rift, lush grain against dangerous darkness, beautiful and forbidden. |
| `rnd_dead_route_returns` | 死路归来 | 图 D | 放弃的死路从前方回来 | A dead road loops back from the horizon and returns in front of the caravan like a living ribbon of dust, old wheel tracks crossing themselves, low sanity atmosphere, gold and red map lines in the air. |
| `rnd_cart_without_team` | 无人之车 | 图 D / 图 B | 空车倒退而来 | An empty ancient cart rolls backward from red fog toward the caravan, fresh wheel tracks appearing before the wheels touch the ground, no driver, no horses, broken gold light on the silent wood. |

## 5. 接入优先级

第一轮只建议生成 8 张，用于验证风格和 UI 承载：

1. `鸣蛇入轴`
2. `祝余苦汤`
3. `巫咸反里`
4. `黑齿影价`
5. `夸父复迹`
6. `巫咸点名`
7. `雷泽云缝`
8. `烛龙息图`

第二轮再补每个事件池各 2 张，避免一次性生成 44 张导致风格漂移和成本失控。

## 6. 自检

- 随机事件数量：44 个，均已给图片提示语。
- 美学统一：全部使用横向 4:3 装帧事件牌母图，中心安全区适合紧凑弹窗容器裁切或 16:9 缩略图复用，旧纸、暗褐、暗金线、朱砂点染、华丽但克制的恐怖风格。
- 与事件对应：每张图都围绕事件核心动作或异象，不只画普通风景。
- 版权边界：未引用现代译文、插画构图、影视镜头或竞品 UI。
- 生成边界：不要求画面出现可读文字，巫文和路标均为抽象符号。
