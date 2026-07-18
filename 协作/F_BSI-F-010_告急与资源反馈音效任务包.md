# F_BSI-F-010 告急与资源反馈音效任务包

> 子线程：F，音乐音效与音频体验  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-16  
> 状态：交付给主线程验收  
> 范围：只整理短音效任务包、触发规则、生成提示语与授权状态建议；不移动音频、不改代码、不把 AI 生成候选标为正式 cleared。

## 结论

当前 Web Demo 已经具备资源涨跌、资源告急、地图打开、迷雾显影、地点抵达的播放槽位。BSI-F-010 不需要新增复杂音频系统，建议采用“两层处理”：

1. **首版继续可跑**：沿用当前程序生成占位音效，状态保持 `demo-temporary`。
2. **下一轮生成替换**：生成 5 个更贴题的资源/告急短音效，进入 `04_待复核素材/AI生成候选/`，通过主线程试听和授权记录后再替换现有占位。

核心原则：

- 资源上涨要“轻、明、短”，像补给入袋或木匣轻合，不做胜利音。
- 资源下降要“干、低、短”，像木签折损或粮袋空落，不做失败音。
- 三类告急必须能区分：车轴是木轴裂响，粮草是空袋/米粒散落，神志是低频错觉和耳鸣。
- 地图三短音效本轮可以继续沿用 F-009 的临时方案，但 `MAP-FOG-001` 仍建议后续生成专用纸雾显影音。
- 所有新生成素材初始状态均为 `candidate-review` 或 `demo-temporary`，不得写 `cleared`。

## 可直接进入 Demo 的内容

当前代码中已经存在以下音频槽位，C 线程可以先保持。若新素材暂未生成，不影响试玩。

| 触发点 | 当前音效 key | 当前资产 ID | 当前文件 | 音量建议 | 状态 | F 线程判断 |
|---|---|---|---|---:|---|---|
| 资源上涨、补给完成 | `resourceUp` / `supplyComplete` | `UI-004-SYN` / `SUPPLY-GAIN-001` | `UI-004_supply_gain_synth_placeholder.mp3` | `0.24-0.30` | `demo-temporary` | 可继续临时沿用，后续替换为 `RESOURCE-UP-001` |
| 资源下降 | `resourceDown` | `UI-003-SYN` | `UI-003_resource_decrease_synth_placeholder.mp3` | `0.24-0.30` | `demo-temporary` | 可继续临时沿用，后续替换为 `RESOURCE-DOWN-001` |
| 车轴首次告急 | `warnAxle` | `WARN-001-SYN` | `WARN-001_axle_crisis_synth_placeholder.mp3` | `0.32-0.40` | `demo-temporary` | 可继续临时沿用，后续替换为 `WARN-AXLE-001` |
| 粮草首次告急 | `warnGrain` | `WARN-002-SYN` | `WARN-002_food_crisis_synth_placeholder.mp3` | `0.30-0.38` | `demo-temporary` | 可继续临时沿用，后续替换为 `WARN-GRAIN-001` |
| 神志首次告急 | `warnSanity` | `WARN-003-SYN` | `WARN-003_sanity_crisis_synth_placeholder.mp3` | `0.28-0.36` | `demo-temporary` | 可继续临时沿用，但要严控音量，后续替换为 `WARN-SANITY-001` |
| 打开九州图 | `mapOpen` | `MAP-OPEN-001` | `UI-001_select_confirm_synth_placeholder.mp3` | `0.18-0.22` | `demo-temporary` | 继续沿用，够首版使用 |
| 迷雾/路线显影 | `mapReveal` | `MAP-FOG-001` | `WARN-003_sanity_crisis_synth_placeholder.mp3` | `0.12-0.16` | `demo-temporary` | 可临时沿用，但语义偏阴，建议生成专用版 |
| 抵达地点 | `locationArrive` | `CITY-ARRIVE-001` | `UI-004_supply_gain_synth_placeholder.mp3` | `0.18-0.22` | `demo-temporary` | 继续沿用，后续可换朱砂印落点音 |

## 触发点与音效 key

以下表给主线程和 C 线程做验收用。首版只需保证触发点存在、音量克制、失败时静默跳过。

| 触发点 | 音效 key | 建议资产 ID | 播放规则 | 音量建议 | 状态 |
|---|---|---|---|---:|---|
| 任意资源净上涨 | `resourceUp` | `RESOURCE-UP-001` | 资源结算后延迟 `80-120ms` 播放；补给完成可复用 | `0.24-0.30` | 待生成；当前用 `UI-004-SYN` |
| 任意资源净下降 | `resourceDown` | `RESOURCE-DOWN-001` | 资源结算后延迟 `80-120ms` 播放；避免和选择确认音重叠过密 | `0.24-0.30` | 待生成；当前用 `UI-003-SYN` |
| 车轴首次跌破告急线 | `warnAxle` | `WARN-AXLE-001` | 每局每资源只响一次；建议比资源下降音晚 `140-180ms` | `0.32-0.40` | 待生成；当前用 `WARN-001-SYN` |
| 粮草首次跌破告急线 | `warnGrain` | `WARN-GRAIN-001` | 每局每资源只响一次；不要太尖锐 | `0.30-0.38` | 待生成；当前用 `WARN-002-SYN` |
| 神志首次跌破告急线 | `warnSanity` | `WARN-SANITY-001` | 每局每资源只响一次；可带低频和轻微耳鸣，但不能跳吓 | `0.28-0.36` | 待生成；当前用 `WARN-003-SYN` |
| 打开九州图 | `mapOpen` | `MAP-OPEN-001` | 打开地图/切到舆图时播放 | `0.18-0.22` | 已有临时占位 |
| 迷雾显影、路线显出 | `mapReveal` | `MAP-FOG-001` | 显影发生后延迟 `80-160ms` 播放 | `0.12-0.16` | 已有临时占位；建议后续专用生成 |
| 抵达地点 | `locationArrive` | `CITY-ARRIVE-001` | 抵达地点、地点志刷新时播放 | `0.18-0.22` | 已有临时占位 |

## 需要 C 线程实现的内容

本轮不要求 C 线程重构音频系统。建议只做以下最小实现或保持现状：

| 优先级 | 内容 | 说明 |
|---|---|---|
| P0 | 保持当前槽位可用 | `resourceUp`、`resourceDown`、`warnAxle`、`warnGrain`、`warnSanity`、`mapOpen`、`mapReveal`、`locationArrive` 已有结构，不需要改 key |
| P1 | 新素材生成后只替换资产信息 | 替换 `id`、`name`、`src`、`volume`、`status`，不要改触发逻辑 |
| P1 | 告急音每项每局只响一次 | 当前逻辑已接近目标，保留即可 |
| P2 | 资源上涨/下降避免和选择音叠太密 | 保持 `80-120ms` 延迟；若声音拥挤，可降低资源音量到 `0.22` |
| P2 | `mapReveal` 生成专用素材后替换 | 当前借用神志告警音，语义临时可用但不适合长期保留 |

## 生成提示语

以下提示语可直接复制给音频生成工具。所有生成结果必须先放入：

```text
GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/
```

不得直接进入：

```text
GitHub资产区/06_音乐音效/05_可用素材/
```

### RESOURCE-UP-001 资源上涨

用途：资源上涨、补给完成、修复成功的轻反馈。  
建议长度：`0.45-0.75 秒`。  
建议命名：`RESOURCE-UP-001_supply_gain_ancient_demo_pending.mp3`。

```text
Create a very short UI sound effect for an ancient Chinese mythic travel game. The sound means a resource has increased: a small cloth pouch of grain being set down, a light wooden box closing softly, and one gentle jade or bronze chime. Elegant, restrained, warm, readable, suitable under text. Duration 0.45 to 0.75 seconds. No melody, no victory fanfare, no modern synth lead, no arcade coin sound, no loud cymbal, no explosion, no cinematic trailer impact, no jump scare, no reference to any existing game or film sound.
```

负面要求：

```text
Avoid: triumphant fanfare, casino reward sound, mobile gacha sparkle, heavy percussion, sharp high frequency, long reverb tail, modern sci-fi UI, horror sting, copyrighted or recognizable style.
```

### RESOURCE-DOWN-001 资源下降

用途：车轴、粮草、神志任一资源普通下降时的轻反馈。  
建议长度：`0.45-0.75 秒`。  
建议命名：`RESOURCE-DOWN-001_resource_loss_ancient_demo_pending.mp3`。

```text
Create a very short UI sound effect for an ancient Chinese mythic travel game. The sound means a resource has decreased: a dry wooden tally slipping, a small grain pouch becoming lighter, and a muted low wood tap. Restrained, slightly tense, not punishing, clear under reading text. Duration 0.45 to 0.75 seconds. No melody, no failure jingle, no modern digital beep, no metal alarm, no horror sting, no jump scare, no reference to any existing game or film sound.
```

负面要求：

```text
Avoid: harsh buzzer, game over cue, dramatic boom, glass shatter, arcade damage sound, excessive bass, long tail, comic effect, copyrighted or recognizable style.
```

### WARN-AXLE-001 车轴告急

用途：车轴首次跌破告急线。  
建议长度：`0.9-1.3 秒`。  
建议命名：`WARN-AXLE-001_axle_crisis_wood_crack_demo_pending.mp3`。

```text
Create a short warning sound effect for an ancient caravan in a mythic Chinese wilderness. The warning means the cart axle is in danger: strained wooden wheel creak, a small dry crack in the axle, rope tension, and a muted low thump. Serious but not too loud, old wood and travel texture, readable under text. Duration 0.9 to 1.3 seconds. No engine sound, no car crash, no modern alarm, no metal siren, no explosion, no horror jump scare, no reference to any existing game or film sound.
```

负面要求：

```text
Avoid: vehicle crash, tire skid, metallic brake squeal, loud snap that feels fatal, trailer hit, war drum, electronic alarm, copyrighted or recognizable style.
```

### WARN-GRAIN-001 粮草告急

用途：粮草首次跌破告急线。  
建议长度：`0.8-1.2 秒`。  
建议命名：`WARN-GRAIN-001_grain_crisis_empty_bag_demo_pending.mp3`。

```text
Create a short warning sound effect for an ancient Chinese mythic travel game. The warning means grain supplies are critically low: an almost empty cloth sack being lifted, a few dry grains falling into a wooden bowl, a soft hollow container knock, and a restrained low breath of wind. Serious, sparse, human, not comedic. Duration 0.8 to 1.2 seconds. No melody, no modern inventory sound, no cash register, no cartoon stomach sound, no horror sting, no jump scare, no reference to any existing game or film sound.
```

负面要求：

```text
Avoid: comedic hunger sound, coins, shopping UI, bright reward chime, sharp high frequencies, huge bass, dramatic failure cue, copyrighted or recognizable style.
```

### WARN-SANITY-001 神志告急

用途：神志首次跌破告急线。  
建议长度：`1.0-1.6 秒`。  
建议命名：`WARN-SANITY-001_sanity_crisis_low_whisper_demo_pending.mp3`。

```text
Create a short warning sound effect for an ancient Chinese mythic travel game with subtle cosmic horror atmosphere. The warning means sanity is critically low: a low unstable hum, faint reversed breath, distant stone resonance, and a barely audible distorted whisper texture without intelligible words. Mysterious and unsettling but quiet, not a jump scare, suitable under text. Duration 1.0 to 1.6 seconds. No clear speech, no screaming, no monster sound, no horror movie hit, no modern synth alarm, no reference to any existing game or film sound.
```

负面要求：

```text
Avoid: scream, spoken words, demonic voice, loud impact, jump scare, sharp tinnitus that hurts, excessive reverb, modern sci-fi UI, copyrighted or recognizable style.
```

## 临时沿用判断

| 资产 ID | 当前判断 | 是否继续沿用 | 说明 |
|---|---|---|---|
| `MAP-OPEN-001` | 可继续沿用 | 是 | 目前用 `UI-001-SYN`，语义是“打开/确认”，虽然不够纸轴感，但不阻塞 Demo |
| `MAP-FOG-001` | 可短期沿用，但建议替换 | 是，限内部 Demo | 目前用 `WARN-003-SYN`，有异象感，但偏神志告急；后续应生成专用“纸雾退开、墨线显出”音 |
| `CITY-ARRIVE-001` | 可继续沿用 | 是 | 目前用 `UI-004-SYN`，作为抵达正反馈足够轻；后续可换成朱砂印/木印落点 |

建议下一轮补生成三个专用地图音效，但不作为 UX-016 的阻塞项：

```text
MAP-OPEN-001_parchment_map_open_demo_pending.mp3
MAP-FOG-001_ink_fog_reveal_demo_pending.mp3
CITY-ARRIVE-001_cinnabar_stamp_arrival_demo_pending.mp3
```

## 授权状态建议

建议 C 线程和音频台账统一使用以下字段，避免把候选误写成正式素材。

| 字段 | 示例 | 说明 |
|---|---|---|
| `id` | `RESOURCE-UP-001` | 资产编号 |
| `src` | `../../06_音乐音效/04_待复核素材/AI生成候选/...mp3` | 内部 Demo 路径 |
| `type` | `ui` / `warning` / `map-sfx` | 音频类型 |
| `loop` | `false` | 本任务包全部为短音效，不循环 |
| `volume` | `0.28` | 浏览器内播放音量 |
| `status` | `candidate-review` / `demo-temporary` | 未验收前不得写 `cleared` |
| `source` | `AI generated by user` / `ffmpeg programmatic placeholder` | 来源 |
| `sourceTool` | 待用户填写 | 生成工具名称，如具体 AI 音频服务 |
| `promptId` | `WARN-SANITY-001` | 对应提示语编号 |
| `licenseStatus` | `pending-user-confirmation` | 授权状态 |
| `reviewStatus` | `pending-main-thread-listen` | 主线程试听状态 |
| `usageScope` | `internal-web-demo-only` | 当前用途 |
| `clearedBy` | 空 | 正式验收人，未验收保持空 |

推荐状态枚举：

| 状态 | 含义 | 是否能进正式发布 |
|---|---|---|
| `demo-temporary` | 内部 Demo 临时占位 | 否 |
| `candidate-review` | 候选素材，待试听/授权确认 | 否 |
| `blocked-license` | 授权不清或不适合使用 | 否 |
| `cleared` | 主线程确认授权、来源、试听、体积后可用 | 是 |

## 风险 / 待确认

1. 新生成音效不能自动视为可商用，必须由用户确认生成工具、账号条款和商用授权。
2. `WARN-SANITY-001` 要避免太恐怖、太响、太像影视恐怖音效；它应该像“神志被污染”，不是跳吓。
3. `MAP-FOG-001` 当前借用 `WARN-003-SYN`，内部 Demo 可用，但语义不是最终版本。
4. 资源上涨音不能太奖励化，否则会把《不思异：九州》的克制气质拉向普通手游。
5. 若浏览器里短音效和文字浮层同时出现显得拥挤，优先降低音量，而不是增加更多声音。

## 待主线程确认

1. 是否批准下一轮按本文 5 条提示语生成 `RESOURCE-UP-001`、`RESOURCE-DOWN-001`、`WARN-AXLE-001`、`WARN-GRAIN-001`、`WARN-SANITY-001`？
2. 是否接受当前 `mapReveal` 继续临时使用 `WARN-003-SYN`，直到专用 `MAP-FOG-001` 生成？
3. 资源上涨音的气质是否偏“温柔补给”，而不是“奖励成功”？F 线程建议选择温柔补给。
4. 用户需要补充每条 AI 生成音频的生成工具、账号授权、是否允许商用。

## 自检

- 已读取 `主协调_BSI-UX-016_全线程三轮持续推进指令.md`，确认 BSI-F-010 只做短音效任务包，不扩展系统。
- 已读取 `F_BSI-F-009_地图三短音效最小接入包.md`，沿用 `mapOpen`、`mapReveal`、`locationArrive` 的临时判断。
- 已查看 `C_BSI-C-023_资源涨跌闪光与告急反馈回执.md`，确认资源闪光、飘字和告急浮层已经存在。
- 已查看当前 `data.js` 和 `app.js` 的音频 key，本文没有新增 C 线程必须改名的 key。
- 未移动音频文件，未生成音频，未修改代码，未把 AI 生成候选标为正式 `cleared`。
