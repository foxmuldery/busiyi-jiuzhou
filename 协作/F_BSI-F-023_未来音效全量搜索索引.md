# F_BSI-F-023 未来音效全量搜索索引

> 项目：《不思异：九州》Web Demo / 后续版本  
> 日期：2026-06-20  
> 范围：只处理音效和环境声，不处理音乐。  
> 本轮动作：按未来功能触发点做广域搜索和候选归档；未下载音频，未移动文件，未改代码，未提交 Git。  
> 状态口径：所有第三方素材仍为 `candidate-review` 或 `license-review`，正式入库前必须保留下载页、作者、日期、许可证和试听结论。  

## 1. 搜索结论

首版可先落地的音效方向已经比较清楚：风、纸页、木质吱呀、神志污染、雨雷、河流、火堆、夜虫、森林、短 UI、短提示都能从免费商用平台找到候选。真正难的是“古代车队复合行旅声”“粮草材质声”“朱砂印落纸”“山海异兽非现代怪物声”，这些建议后续自制 Foley 或 AI 生成，不要强行套用现代库。

本轮平台优先级：

1. Pixabay Sound Effects：优先。单条页相对容易保存标题、作者、时长、许可证。
2. Kenney：适合 UI、游戏成功/失败、基础反馈音，CC0，比较省心，但风格偏游戏化，需要降调。
3. Mixkit Sound Effects：适合环境、天气、转场补充；分类页证据要保存，先放 `license-review`。
4. Freesound：只收 CC0；CC-BY/CC-BY-NC/Sampling+ 本轮不进入首包。
5. ZapSplat：只作备选；免费账号需要署名，除非后续用户接受署名或有 Premium 记录。

## 2. 长期触发点总表

| 模块 | 未来可能触发点 | 需要的声音 |
|---|---|---|
| 行旅 | 荒原、山路、林中、水泽、夜行、暴雨、雷暴、渡河、火堆休整 | 可循环低音量环境声 |
| 车队 | 车轴低耐久、木轮转动、车架承重、绳索/布幡、急停、修车 | 木质 Foley、低频摩擦、短告警 |
| 资源 | 车轴增减、粮草增减、神志增减、资源满/空、补给结算 | 木、粮粒、空袋、低频污染、短 UI |
| 地图 | 地图打开、迷雾显影、地点解锁、路线选择、抵达地点、地点消失 | 纸页、帛书、薄雾、木印、轻铃 |
| 地点 | 墟市、祭所、山隘、河渡、禁地、洞窟、林地、营火、废墟 | 地点专属环境层 |
| 事件 | 好事、坏事、交易、危机、异象、战斗前兆、逃离、结局 | 短转场、冲击、低频、铃/鼓/风 |
| 神志 | 神志中、神志低、幻听、文字污染、异象逼近、濒死 | 低音量 whisper、心跳、低频风、非语言声 |
| UI | 按钮、选择、取消、确认、翻页、文本推进、失败、成功、禁用 | 轻、短、少电子感 |

## 3. 候选索引

| 候选 ID | 用途 | 平台 | 标题/搜索项 | 链接 | 时长 | 优先级 | 状态 | 备注 |
|---|---|---|---|---|---:|---|---|---|
| SFX-FUT-001 | 荒原/旅途风 | Pixabay | Desert wind 2 | https://pixabay.com/sound-effects/nature-desert-wind-2-350417/ | 0:32 | P0 | candidate-review | 首版旅途底层可用，低音量循环。 |
| SFX-FUT-002 | 荒原/旅途风 | Pixabay | Desert wind 1 | https://pixabay.com/sound-effects/nature-desert-wind-1-350398/ | 0:29 | P0 | candidate-review | 可作弱风备选。 |
| SFX-FUT-003 | 山风/林风 | Mixkit | Wind blowing ambience | https://mixkit.co/free-sound-effects/nature/ | 1:01 | P1 | license-review | 分类页候选，适合山隘/高原。 |
| SFX-FUT-004 | 林地微风 | Mixkit | Breeze through the trees | https://mixkit.co/free-sound-effects/nature/ | 0:14 | P1 | license-review | 可作林地短循环。 |
| SFX-FUT-005 | 雨天行旅 | Pixabay | CALMING RAIN | https://pixabay.com/sound-effects/search/rain/ | 1:48 | P1 | candidate-review | 长度合适；需听是否过于睡眠音。 |
| SFX-FUT-006 | 轻雨/阴天 | Mixkit | Light rain loop | https://mixkit.co/free-sound-effects/nature/ | 0:15 | P1 | license-review | 可做短循环，注意循环点。 |
| SFX-FUT-007 | 暴雨/危机天气 | Mixkit | Heavy storm rain loop | https://mixkit.co/free-sound-effects/nature/ | 0:18 | P1 | license-review | 适合危机事件天气层。 |
| SFX-FUT-008 | 雷暴/异象 | Pixabay | Thunder clap | https://pixabay.com/sound-effects/search/thunder/ | 0:07 | P1 | candidate-review | 短雷击，适合异象或事件转折。 |
| SFX-FUT-009 | 远雷/神志低 | Pixabay | Peals of Thunder | https://pixabay.com/sound-effects/search/thunder/ | 0:09 | P1 | candidate-review | 适合低频远景，避免过戏剧化。 |
| SFX-FUT-010 | 雷雨长层 | Mixkit | Rain and thunder storm | https://mixkit.co/free-sound-effects/nature/ | 0:29 | P1 | license-review | 可用于暴雨路段。 |
| SFX-FUT-011 | 河渡/溪流 | Pixabay | Soothing River Flow | https://pixabay.com/sound-effects/search/river/ | 0:22 | P1 | candidate-review | 河渡地点可用。 |
| SFX-FUT-012 | 大河/渡口 | Pixabay | Big River | https://pixabay.com/sound-effects/search/river/ | 0:48 | P1 | candidate-review | 适合渡河事件，需降低水声占比。 |
| SFX-FUT-013 | 河谷/水泽 | Mixkit | Water flowing ambience loop | https://mixkit.co/free-sound-effects/nature/ | 0:51 | P1 | license-review | 可做水泽底层。 |
| SFX-FUT-014 | 营火/夜宿 | Pixabay | Fire Crackling Sound | https://pixabay.com/sound-effects/search/fire/ | 1:19 | P1 | candidate-review | 适合营地休整、夜间文本。 |
| SFX-FUT-015 | 火堆短层 | Pixabay | Fire Sounds | https://pixabay.com/sound-effects/search/fire/ | 0:32 | P1 | candidate-review | 可作为短火声。 |
| SFX-FUT-016 | 森林/鸟鸣 | Pixabay | Forest ambience | https://pixabay.com/sound-effects/search/forest/ | 3:32 | P1 | candidate-review | 适合林地；若鸟声太现代/地域感过强则降级。 |
| SFX-FUT-017 | 森林短层 | Pixabay | Forest Sound | https://pixabay.com/sound-effects/search/forest/ | 0:11 | P1 | candidate-review | 可作地点进入短环境。 |
| SFX-FUT-018 | 夜虫/水泽夜 | Pixabay | Insects at night | https://pixabay.com/sound-effects/search/insects/ | 0:31 | P1 | candidate-review | 夜行、低神志前的自然层。 |
| SFX-FUT-019 | 沼泽虫鸣 | Pixabay | Countryside Swamp Insects Environment | https://pixabay.com/sound-effects/search/insects/ | 1:43 | P1 | candidate-review | 适合水泽/瘴气场景。 |
| SFX-FUT-020 | 夜林虫声 | Mixkit | Night forest with insects | https://mixkit.co/free-sound-effects/nature/ | 1:24 | P1 | license-review | 可作为夜间长环境层。 |
| SFX-FUT-021 | 车轴告急 | Pixabay | Floorboard Creak 03 | https://pixabay.com/sound-effects/household-floorboard-creak-03-499651/ | 0:02 | P0 | candidate-review | 首版最稳车轴短告警。 |
| SFX-FUT-022 | 车架承重 | Pixabay | Wood creaks | https://pixabay.com/sound-effects/film-special-effects-wood-creaks-411791/ | 0:08 | P0 | candidate-review | 可裁 1-2 秒。 |
| SFX-FUT-023 | 木轮/车架 | Pixabay | Wood creaks | https://pixabay.com/sound-effects/search/wood%20creak/ | 0:07 | P1 | candidate-review | 搜索页同名候选，需下载前确认单条页。 |
| SFX-FUT-024 | 木结构压力 | Pixabay | Creaking Wood | https://pixabay.com/sound-effects/search/wood%20creak/ | 0:38 | P1 | candidate-review | 可做长一点的车架压迫声。 |
| SFX-FUT-025 | 车队脚步/泥路 | Pixabay | Footsteps on the Nature Trail | https://pixabay.com/sound-effects/search/footsteps/ | 0:06 | P2 | candidate-review | 车队前景可偶尔点缀，不要循环太明显。 |
| SFX-FUT-026 | 木地/车板脚步 | Pixabay | Footsteps on Wood | https://pixabay.com/sound-effects/search/footsteps/ | 0:04 | P2 | candidate-review | 可用于车内/客栈/木桥。 |
| SFX-FUT-027 | 地图打开 | Pixabay | Turn a Page | https://pixabay.com/sound-effects/film-special-effects-turn-a-page-336933/ | 0:01 | P0 | candidate-review | 首版地图和事件弹窗可复用。 |
| SFX-FUT-028 | 纸页/事件 | Pixabay | Page Turn | https://pixabay.com/sound-effects/search/page%20turn/ | 0:01 | P1 | candidate-review | 下载前确认单条页信息。 |
| SFX-FUT-029 | 书页/志怪文本 | Pixabay | Flipping Book Page | https://pixabay.com/sound-effects/search/page%20turn/ | 0:01 | P1 | candidate-review | 可作文本推进或志书翻页。 |
| SFX-FUT-030 | 卷轴/书页 | Pixabay | book flipping sound | https://pixabay.com/sound-effects/search/scroll/ | 0:05 | P2 | candidate-review | 现代书本感，需低音量。 |
| SFX-FUT-031 | 地点盖印 | Pixabay | traditional stamp | https://pixabay.com/sound-effects/search/stamp/ | 0:01 | P2 | license-review | Freesound 来源链，需追 CC0；但方向很准。 |
| SFX-FUT-032 | 地点盖印 | Pixabay | Office stamp | https://pixabay.com/sound-effects/search/stamp/ | 0:04 | P2 | license-review | 现代办公感，需处理；来源链待核。 |
| SFX-FUT-033 | 地点抵达铃 | Pixabay | Temple Bells | https://pixabay.com/sound-effects/search/temple/ | 0:05 | P1 | candidate-review | 可作祭所/地点抵达，不要太教堂感。 |
| SFX-FUT-034 | 祭所低铃 | Pixabay | Log Soft Low Frequency Bell Sound Temple ASMR | https://pixabay.com/sound-effects/search/temple/ | 0:08 | P1 | candidate-review | 适合祭所、禁地入口。 |
| SFX-FUT-035 | 墟市环境 | Pixabay | Open market | https://pixabay.com/sound-effects/search/market/ | 0:17 | P2 | candidate-review | 有人声，需确认语言/现代感，不建议首版用。 |
| SFX-FUT-036 | 墟市环境 | Pixabay | Market background noise | https://pixabay.com/sound-effects/search/market/ | 1:03 | P2 | candidate-review | 可能偏现代；正式版建议自制或 AI。 |
| SFX-FUT-037 | 亚洲市场参考 | Pixabay | Asian Market | https://pixabay.com/sound-effects/search/market/ | 0:21 | P2 | license-review | Freesound 来源链且地域现代感强，仅参考。 |
| SFX-FUT-038 | 神志低风层 | Pixabay | Eerie Wind | https://pixabay.com/sound-effects/horror-eerie-wind-478386/ | 0:13 | P0 | candidate-review | 首版神志层可用，极低音量。 |
| SFX-FUT-039 | 神志重污染 | Pixabay | Dark Horror Ambient 05 | https://pixabay.com/sound-effects/horror-dark-horror-ambient-05-425468/ | 0:22 | P1 | candidate-review | 裁短、降响度，避免恐怖片化。 |
| SFX-FUT-040 | 幻听/不可辨 whisper | Pixabay | Ghost Whisper | https://pixabay.com/sound-effects/search/whisper/ | 0:08 | P1 | candidate-review | 需确认是否有清晰英文；不能压文字。 |
| SFX-FUT-041 | 幻听/短 whisper | Pixabay | Creepy Whisper | https://pixabay.com/sound-effects/search/whisper/ | 0:03 | P1 | candidate-review | 可低音量做文字污染。 |
| SFX-FUT-042 | 禁地空间感 | Pixabay | Eerie Space Whisper of the Underworld | https://pixabay.com/sound-effects/search/whisper/ | 0:12 | P2 | candidate-review | 名称适配，但听感需防科幻化。 |
| SFX-FUT-043 | 心跳/濒危 | Pixabay | Heartbeat Sound | https://pixabay.com/sound-effects/search/heartbeat/ | 0:21 | P1 | candidate-review | 可用于神志或危机，不要长期循环。 |
| SFX-FUT-044 | 心跳短层 | Pixabay | Thudding Heartbeat | https://pixabay.com/sound-effects/search/heartbeat/ | 0:08 | P1 | candidate-review | 危机前兆可用。 |
| SFX-FUT-045 | 心跳单次 | Pixabay | Heartbeat (Single) | https://pixabay.com/sound-effects/search/heartbeat/ | 0:01 | P2 | candidate-review | 可作神志减少瞬间反馈。 |
| SFX-FUT-046 | 迷雾显影 | Pixabay | Whoosh Whisper - 2 | https://pixabay.com/sound-effects/film-special-effects-whoosh-whisper-2-404221/ | 0:04 | P0 | candidate-review | 首版可用，裁 0.8-1.4 秒。 |
| SFX-FUT-047 | 转场风擦 | Mixkit | Transition windy swoosh | https://mixkit.co/free-sound-effects/transition/ | 0:03 | P1 | license-review | 适合迷雾/地点切换，注意不要大片化。 |
| SFX-FUT-048 | 危机转场 | Mixkit | Mighty mysterious swoosh | https://mixkit.co/free-sound-effects/transition/ | 0:04 | P1 | license-review | 事件风险或神志异象。 |
| SFX-FUT-049 | UI 基础包 | Kenney | Audio assets search | https://kenney.nl/assets?q=audio | 不定 | P1 | candidate-review | Kenney 资产页音频需逐包确认；适合基础 UI。 |
| SFX-FUT-050 | UI/游戏成功失败 | Mixkit | Free Game Sound Effects | https://mixkit.co/free-sound-effects/game/ | 多条 | P2 | license-review | 风格偏现代/街机，需要筛选和处理。 |
| SFX-FUT-051 | 资源上涨 | Mixkit | Winning a coin, video game | https://mixkit.co/free-sound-effects/game/ | 0:01 | P2 | license-review | 只能作为参考，太游戏化；避免金币感。 |
| SFX-FUT-052 | 事件成功 | Mixkit | Game level completed | https://mixkit.co/free-sound-effects/game/ | 0:03 | P2 | license-review | 太现代，可能只做临时 UI。 |
| SFX-FUT-053 | 失败/坏事 | Mixkit | Player losing or failing | https://mixkit.co/free-sound-effects/game/ | 0:03 | P2 | license-review | 可参考失败音型，但需古雅化。 |
| SFX-FUT-054 | 粮草倾倒 | Pixabay | Rice Pour | https://pixabay.com/sound-effects/household-rice-pour-75555/ | 0:55 | P1 | license-review | 方向准确，但来源链需复核。 |
| SFX-FUT-055 | 粮草落碗 | Pixabay | rice falling into a rice bowl | https://pixabay.com/sound-effects/household-rice-falling-into-a-rice-bowl-67617/ | 0:18 | P1 | license-review | 方向准确，仍需追 Freesound 源。 |
| SFX-FUT-056 | 空袋/粮袋 | Pixabay | Paper Bag - Rustling Through it 1 | https://pixabay.com/sound-effects/search/bag/ | 0:02 | P1 | license-review | 可作粮草告急，需单条页留痕。 |
| SFX-FUT-057 | 袋子/补给 | Pixabay | Paper Bag search | https://pixabay.com/sound-effects/search/bag/ | 多条 | P2 | license-review | 多为现代包装声，谨慎。 |
| SFX-FUT-058 | 资源下降木扣 | Mixkit | Small wood plank pile drop | https://mixkit.co/free-sound-effects/wood/ | 0:01 | P1 | license-review | 可做资源下降短反馈。 |
| SFX-FUT-059 | 资源下降木击 | Mixkit | Wood hard hit | https://mixkit.co/free-sound-effects/wood/ | 0:01 | P1 | license-review | 可做低响度惩罚音。 |
| SFX-FUT-060 | 修车/木作 | Pixabay | Wooden Chair Move | https://pixabay.com/sound-effects/search/wood%20creak/ | 0:06 | P2 | license-review | Freesound 来源链，听感可能像室内。 |
| SFX-FUT-061 | 战斗/冲突 | Mixkit | Martial arts fast punch | https://mixkit.co/free-sound-effects/game/ | 0:01 | P2 | license-review | 若后续有短冲突事件，可作参考；不适合古雅首版。 |
| SFX-FUT-062 | 异兽/远吼 | Mixkit | Monster/Roar category | https://mixkit.co/free-sound-effects/game/ | 多条 | P2 | license-review | 易俗套，正式版建议 AI 自制。 |
| SFX-FUT-063 | 禁地/恶兆暴风 | Mixkit | Evil storm atmosphere | https://mixkit.co/free-sound-effects/nature/ | 1:39 | P2 | license-review | 可做禁地背景，避免太影视化。 |
| SFX-FUT-064 | 山林危机 | Mixkit | Wolves at scary forest | https://mixkit.co/free-sound-effects/nature/ | 0:09 | P2 | license-review | 动物指向明显，谨慎用于山海异兽。 |
| SFX-FUT-065 | 洞窟/地底脚步 | Pixabay | footsteps cellar | https://pixabay.com/sound-effects/search/footsteps/ | 0:36 | P2 | license-review | Freesound 来源链，洞窟地点参考。 |
| SFX-FUT-066 | 雪地/北地 | Pixabay | Footsteps in the Snow | https://pixabay.com/sound-effects/search/footsteps/ | 0:14 | P2 | candidate-review | 若有北地/寒山地点可用。 |
| SFX-FUT-067 | 重雷/天变 | Pixabay | Thunder Strike (Wav) | https://pixabay.com/sound-effects/search/thunder/ | 0:06 | P2 | candidate-review | 可用于重大异象，但需试听是否过度。 |
| SFX-FUT-068 | 火焰异象 | Pixabay | Designed Fire - Winds - Swoosh - 04 | https://pixabay.com/sound-effects/search/fire/ | 0:10 | P2 | candidate-review | 偏设计音，可用于异象而非自然火。 |
| SFX-FUT-069 | 文本滚动 | Pixabay | Text Scroll G4 180 OpenMPT (Agogo) | https://pixabay.com/sound-effects/search/scroll/ | 0:04 | P2 | license-review | 太电子/复古游戏感，通常不推荐。 |
| SFX-FUT-070 | UI 滚动 | Pixabay | UI Scroll Up / Down / Fast | https://pixabay.com/sound-effects/search/scroll/ | 0:01 | P2 | candidate-review | 现代 UI 感，除非处理后极轻使用。 |

## 4. 最适合优先下载试听的 12 条

| 顺序 | 候选 ID | 目的 |
|---:|---|---|
| 1 | SFX-FUT-001 | 首版旅途风声 |
| 2 | SFX-FUT-027 | 地图打开/事件弹窗 |
| 3 | SFX-FUT-021 | 车轴告急 |
| 4 | SFX-FUT-022 | 车架承重 |
| 5 | SFX-FUT-038 | 神志低风层 |
| 6 | SFX-FUT-046 | 迷雾显影 |
| 7 | SFX-FUT-014 | 营火休整 |
| 8 | SFX-FUT-011 | 河渡地点 |
| 9 | SFX-FUT-018 | 夜行虫声 |
| 10 | SFX-FUT-033 | 祭所/地点铃 |
| 11 | SFX-FUT-043 | 危机心跳 |
| 12 | SFX-FUT-005 | 雨天行旅 |

## 5. 建议自制或 AI 生成的音效

| 音效 | 原因 | 建议做法 |
|---|---|---|
| 古代车队复合行旅 | 免费库里很难同时满足木轮、车架、风、布幡、非现代道路 | 用风声 + 木 creak + 低频摩擦自制混合。 |
| 粮草告急 | 粮粒/袋子常带现代厨房或包装质感，来源链也复杂 | 自录米粒/豆子/布袋，或 AI 生成干粮落入空木碗。 |
| 朱砂印落纸 | 免费库多为现代办公室印章 | 自录木印/橡皮章叠纸张，再低频化。 |
| 山海异兽远声 | 现成怪物音太西幻/恐怖片 | AI 生成“远山低鸣、非动物、非人声”，再低音量使用。 |
| 神志污染幻听 | 现成 whisper 常有人声语言，商业与内容风险都高 | AI 生成不可辨气声/风声，不出现清晰单词。 |
| 古代墟市 | 现成市场多有现代语言、广播、车辆、餐具 | AI 或 Foley 分层做低人群、木器、布摊、脚步。 |

## 6. 后续搜索词库

```text
wooden cart wheel creak
wooden wagon ambience
cloth banner wind
rice grains fall wooden bowl
dry grain pour sack
empty cloth bag rustle
wood stamp paper
seal stamp paper
parchment page turn
ancient scroll open
low temple bell
forest insects night ambience
mountain wind ambience
river crossing ambience
campfire crackle loop
eerie wind low drone
non verbal whisper wind
heartbeat low tension
mist whoosh soft
fog reveal sound
wooden bridge creak
market crowd no language
```

## 7. 下载留痕规则

```text
asset_id:
用途:
平台:
标题:
作者:
原始页面:
许可证页面:
下载日期:
原始文件名:
文件格式:
时长:
是否需署名:
是否允许商用:
是否允许修改:
是否存在 Freesound/第三方来源链:
是否包含清晰人声/商标/现代噪声:
试听结论:
处理动作:
当前状态: candidate-review / license-review
```

## 8. 已核验来源

- Pixabay Content License Summary: https://pixabay.com/service/license-summary/
- Mixkit License: https://mixkit.co/license/
- Mixkit Nature Sound Effects: https://mixkit.co/free-sound-effects/nature/
- Mixkit Game Sound Effects: https://mixkit.co/free-sound-effects/game/
- Kenney support / CC0 statement: https://kenney.nl/support
- Kenney audio asset search: https://kenney.nl/assets?q=audio
- Freesound FAQ licenses: https://freesound.org/help/faq/

