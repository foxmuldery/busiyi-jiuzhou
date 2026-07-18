# F_BSI-F-004 WebDemo 首版音乐+音效最小闭环

## 1. 目标

本文件给 C 线程提供最短音乐+音效接入说明。首版目标不是完成最终声音设计，而是让 Web Demo 出现最小声音闭环：

- 页面有一条可循环主环境音乐/氛围音乐。
- 玩家点击有反馈。
- 资源变化有反馈。
- 资源危急有反馈。
- 神志降低时音乐/低频层开始变脏。
- 荒外行旅声音有候选路线，不因授权未完成而阻塞原型。

## 1.1 首版可运行组合

主线程最新决策是：先让它跑起来，后面细节再说。C 线程第一轮只需要接以下组合。

| 分类 | 资产 ID | 文件 | 音量建议 | 循环 | 状态 |
|---|---|---|---:|---|---|
| 主环境音乐 | MUS-DEMO-001 | `../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CAND-002_Autumn_on_the_High_Plateau_webdemo_-24lufs.mp3` | 0.12-0.18 | 是 | Demo 临时，待授权确认 |
| 神志层 | SAN-001-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/SAN-001_light_sanity_layer_synth_placeholder_loop.mp3` | 0.06-0.12 | 是 | Demo 临时 |
| UI 点击 | UI-001-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3` | 0.35-0.45 | 否 | Demo 临时 |
| 资源减少 | UI-003-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-003_resource_decrease_synth_placeholder.mp3` | 0.35-0.45 | 否 | Demo 临时 |
| 资源增加 | UI-004-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3` | 0.35-0.45 | 否 | Demo 临时 |
| 车轴警告 | WARN-001-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-001_axle_crisis_synth_placeholder.mp3` | 0.45-0.55 | 否 | Demo 临时 |
| 粮草警告 | WARN-002-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-002_food_crisis_synth_placeholder.mp3` | 0.45-0.55 | 否 | Demo 临时 |
| 神志警告 | WARN-003-SYN | `../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3` | 0.42-0.52 | 否 | Demo 临时 |

第一轮不必接 `AMB-001`、`TRV-001`、`EVT-001`、`RES-001`、`RES-002`。这些继续保留为待复核或待生成。

最短逻辑：

- 用户打开音频开关后，播放 `MUS-DEMO-001` 循环。
- 神志 `<=55` 时叠加 `SAN-001-SYN`，神志恢复到 `>55` 时淡出。
- 点击路线/选项播放 `UI-001-SYN`。
- 资源下降播放 `UI-003-SYN`，资源上升播放 `UI-004-SYN`。
- 三个资源首次跌到 `<=35` 时播放对应 `WARN`，同一局每项只响一次。

## 1.2 核心背景音乐目标

用户最新判断：核心背景音乐应该是长的，要非常有韵味，古典、优雅、动听。

因此当前 `MUS-DEMO-001` 只作为“让 Web Demo 先跑起来”的短占位，不代表最终主音乐方向。正式首版应补“核心背景音乐组”，避免单曲长时间循环后无聊单调：

| 资产 ID | 类型 | 长度 | 用途 | 状态 |
|---|---|---:|---|---|
| MUS-CORE-001 | 核心背景音乐 | 2:57 | 九州古道/通用旅途主题 | 已上传，待主观试听，待授权确认 |
| MUS-CORE-002 | 核心背景音乐变体 | 2:36 | 山岭云海/高原远行 | 已上传，待主观试听，待授权确认 |
| MUS-CORE-003 | 核心背景音乐变体 | 2:36 | 水泽夜行/湿地迷雾 | 已上传，待主观试听，待授权确认 |
| MUS-CORE-004 | 核心背景音乐变体 | 2:40 | 废墟边境/归墟荒外 | 已上传，待主观试听，待授权确认 |

核心音乐方向：

- 古典、优雅、动听，不做单纯环境噪声。
- 有温柔但克制的旋律骨架，能让玩家愿意久听。
- 以古琴、箫、埙、低弦、轻打击或编钟/玉磬质感为主。
- 保留山海九州的神秘感，但不要恐怖片化。
- 能循环，段落起伏缓慢，不压过文字阅读。
- 四条核心音乐共享同一主题动机，但配器、空间和情绪不同，便于按地点/路线随机轮换。

## 1.3 事件音乐组

随机事件不只用 UI 音效解决。事件好坏、风险和挑战应该有不同的音乐过门或短氛围层，建议先做 4 类：

| 资产 ID | 类型 | 长度 | 用途 | 触发 |
|---|---|---:|---|---|
| MUS-EVT-001 | 好事/补给事件音乐 | 1:40 | 获得粮草、修复车轴、遇到墟市、受到庇护 | 好结果 |
| MUS-EVT-002 | 风险/不祥事件音乐 | 1:09 | 岔路、异象、神志轻微污染、未知地点 | 风险提示 |
| MUS-EVT-003 | 挑战/抉择事件音乐 | 3:00 | 山隘、河渡、祭所试炼、资源交换 | 需要选择 |
| MUS-EVT-004 | 危机/坏事事件音乐 | 1:09 | 车轴损坏、粮草危急、神志大降、禁地冲击 | 坏结果/危急 |

2026-06-16 新上传的事件音乐均为长版，适合先做风格试听或地点/事件氛围层。若要按“事件过门”接入，建议从每首中裁出 12-25 秒精华段，再单独登记为短版。

事件音乐接入原则：

- 事件音乐优先做短音乐层/过门，不替代核心背景音乐。
- 触发事件时，核心背景音乐降到 `0.06-0.10`，事件音乐以 `0.14-0.24` 淡入。
- 事件结束后，事件音乐淡出，核心背景音乐恢复到 `0.12-0.18`。
- 如果事件音乐缺失，回退到现有 UI/警告音效，不阻塞游戏。

生成后统一进入：

```text
GitHub资产区/06_音乐音效/04_待复核素材/音乐候选原始/
GitHub资产区/06_音乐音效/04_待复核素材/WebDemo低响度预览/
```

进入正式可用前必须补：生成工具、提示语、授权状态、响度、循环点、主观试听结论。

## 1.3.1 已上传正式编号音乐

2026-06-16 用户上传 8 首与正式编号对齐的音乐，已保留原始版并生成 Web Demo 低响度预览版。

整理位置：

```text
GitHub资产区/06_音乐音效/04_待复核素材/音乐候选原始/
GitHub资产区/06_音乐音效/04_待复核素材/WebDemo低响度预览/
GitHub资产区/06_音乐音效/用户上传正式编号音乐评估_2026-06-16.md
```

接入判断：

- `MUS-CORE-001` 到 `MUS-CORE-004` 已达到核心背景音乐目标时长，可作为第一批主音乐轮换候选。
- `MUS-EVT-001` 到 `MUS-EVT-004` 当前偏长，不建议直接作为短事件过门接入。
- 所有文件仍为待主观试听、待授权确认，不进入正式可用区。

## 1.4 已上传核心音乐短候选

2026-06-16 用户上传 3 首音乐，已整理为核心音乐候选。它们可以用于内部 Demo 试听和风格判断，但都只有约 30 秒，不等同于正式 2.5-4 分钟长核心背景音乐。

| 资产 ID | 曲名 | 长度 | 初筛用途 | 状态 |
|---|---|---:|---|---|
| MUS-CORE-CAND-001 | North of the Stone Pass | 30.77 秒 | 石关、山隘、边境路线候选 | 待主观试听，待授权确认 |
| MUS-CORE-CAND-002 | Jade Peaks at Dawn | 30.77 秒 | 山岭云海、高原清晨候选 | 待主观试听，待授权确认 |
| MUS-CORE-CAND-003 | Mountains of the Sleeping Wind | 30.77 秒 | 山岭、沉静旅途候选 | 待主观试听，待授权确认 |

整理位置：

```text
GitHub资产区/06_音乐音效/04_待复核素材/音乐候选原始/
GitHub资产区/06_音乐音效/04_待复核素材/WebDemo低响度预览/
GitHub资产区/06_音乐音效/用户上传核心音乐评估_2026-06-16.md
```

接入策略：

- 当前仍以 `MUS-DEMO-001` 保持 Web Demo 可运行。
- 若 C 线程要测试“核心音乐轮换”，可临时从 `MUS-CORE-CAND-002` 或 `MUS-CORE-CAND-003` 的低响度预览版中选一首。
- `MUS-CORE-CAND-001` 更适合石关、山隘、挑战路线，不建议作为默认通用主音乐。
- 所有 `MUS-CORE-CAND` 均为待主观试听、待授权确认，不进入正式可用区。
- 这三首主要用于判断风格方向；正式核心背景音乐仍应继续生成 2.5-4 分钟长版本。

## 2. C 线程首版可以直接接入的音乐与音效

以下素材可以进入内部 Web Demo，但不得标为正式可用素材。

音乐路径：

```text
GitHub资产区/06_音乐音效/04_待复核素材/WebDemo低响度预览/
```

音效路径：

```text
GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/
```

| 资产 ID | 文件名 | 用途 | 触发规则 | 状态 |
|---|---|---|---|---|
| MUS-DEMO-001 | MUS-CAND-002_Autumn_on_the_High_Plateau_webdemo_-24lufs.mp3 | 首版主环境音乐/氛围音乐 | 音频开关开启后低音量循环播放 | Demo 临时，待主观试听，待授权确认 |
| MUS-DEMO-ALT-001 | MUS-CAND-003_Across_the_Forgotten_Basin_webdemo_-24lufs.mp3 | 盆地/荒外备选氛围音乐 | 主环境音乐备选，不默认启用 | 待复核，待授权确认 |
| MUS-CORE-CAND-002 | MUS-CORE-CAND-002_Jade_Peaks_at_Dawn_webdemo_-24lufs.mp3 | 山岭云海核心音乐短候选 | 可选测试，不默认启用 | 待复核，待授权确认 |
| MUS-CORE-CAND-003 | MUS-CORE-CAND-003_Mountains_of_the_Sleeping_Wind_webdemo_-24lufs.mp3 | 沉静山岭核心音乐短候选 | 可选测试，不默认启用 | 待复核，待授权确认 |
| UI-001-SYN | UI-001_select_confirm_synth_placeholder.mp3 | 选择确认 | 点击路线/选项后触发 | Demo 临时 |
| UI-003-SYN | UI-003_resource_decrease_synth_placeholder.mp3 | 资源减少 | 任意资源净下降时触发，避免和确认音重叠过密 | Demo 临时 |
| UI-004-SYN | UI-004_supply_gain_synth_placeholder.mp3 | 获得补给 | 任意资源净上升时触发 | Demo 临时 |
| WARN-001-SYN | WARN-001_axle_crisis_synth_placeholder.mp3 | 车轴危急 | 车轴首次从 `>35` 跌到 `<=35` | Demo 临时 |
| WARN-002-SYN | WARN-002_food_crisis_synth_placeholder.mp3 | 粮草危急 | 粮草首次从 `>35` 跌到 `<=35` | Demo 临时 |
| WARN-003-SYN | WARN-003_sanity_crisis_synth_placeholder.mp3 | 神志危急 | 神志首次从 `>35` 跌到 `<=35` | Demo 临时 |
| SAN-001-SYN | SAN-001_light_sanity_layer_synth_placeholder_loop.mp3 | 轻度神志污染层 | `26 <= 神志 <= 55` 时低音量淡入 | Demo 临时 |
| SAN-002-SYN | SAN-002_heavy_sanity_layer_synth_placeholder_loop.mp3 | 重度神志污染层 | 可选，首轮不必接 | Demo 临时 |

建议相对引用：

```text
../../06_音乐音效/04_待复核素材/WebDemo低响度预览/
../../06_音乐音效/04_待复核素材/程序生成占位音效/
```

音乐授权状态：

- 来源：用户上传 / AI 生成候选。
- 授权：待用户确认生成工具和商用授权。
- 当前用途：内部 Web Demo 占位测试。
- 不得进入正式可用素材区，不得作为发布版 OST 使用。

首版默认音乐建议：

- 默认候选：`MUS-DEMO-001`。
- 默认音量：`music = 0.12-0.18`，最大不超过 `0.28`。
- 循环方式：HTMLAudio `loop = true`，进入/退出使用 1200-1800ms 淡入淡出。
- 循环风险：MP3 头尾可能有轻微缝隙，内部 Demo 可接受；正式版需要重剪循环点或导出 OGG/WAV 循环版本。
- 替换目标：生成并复核核心背景音乐组后，用 `MUS-CORE-001` 到 `MUS-CORE-004` 轮换替换当前短占位。

## 3. 首版还缺但不阻塞接入的声音

这些是首版体验缺口，但当前没有已验收文件。C 线程不要硬接不存在的文件。

| 资产 ID | 用途 | 当前处理 | C 线程策略 |
|---|---|---|---|
| AMB-001 | 荒外风声循环 | 走 Pixabay 待复核候选或 AI 生成 | manifest 预留，不启用 |
| TRV-001 | 木轮/车队行进循环 | 走 Pixabay 木头吱呀候选 + AI 生成 | manifest 预留，不启用 |
| EVT-001 | 异象/事件弹出 | 走 AI 生成提示语 | manifest 预留，不启用 |
| RES-001 | 粮草减少细分 | 走 AI 生成提示语 | 先用 UI-003-SYN 代替 |
| RES-002 | 车轴轻损细分 | 走 AI 生成提示语 | 先用 UI-003-SYN 或 WARN-001-SYN 代替 |

## 4. 第三方素材候选

以下素材只能进入待复核，不能进入正式可用区。下载后必须保留授权页面截图或 PDF。

| 候选 ID | 对应用途 | 链接 | 当前状态 |
|---|---|---|---|
| AMB-CAND-01 | AMB-001 荒外风声 | https://pixabay.com/sound-effects/nature-desert-wind-2-350417/ | 待人工下载/授权留痕/试听 |
| AMB-CAND-02 | AMB-001 备选风声 | https://pixabay.com/sound-effects/nature-desert-wind-1-350398/ | 待人工下载/授权留痕/试听 |
| TRV-CAND-01 | TRV-001 木头/车轴吱呀 | https://pixabay.com/sound-effects/household-floorboard-creak-03-499651/ | 待人工下载/授权留痕/试听 |
| TRV-CAND-02 | TRV-001 连续木头吱呀 | https://pixabay.com/sound-effects/film-special-effects-wood-creaks-411791/ | 待人工下载/授权留痕/试听 |

首版原则：

- C 线程不要直接引用网页 URL。
- 第三方素材未进入本地待复核目录前，manifest 中不要启用。
- 即便下载，也必须先经过 F 线程响度、循环点、授权留痕复核。

## 5. AI 生成优先提示语

这些提示语已经写入：

```text
GitHub资产区/06_音乐音效/03_生成提示语/第一批音频生成提示语.md
```

优先生成顺序：

1. `AMB-001-A` 通用荒外风声，32 秒循环。
2. `TRV-001-A` 木轮稳定行进，12 秒循环。
3. `EVT-001-A` 异象事件出现，1 秒。
4. `RES-001-A` 粮草减少，0.5 秒。
5. `RES-002-A` 车轴轻损，0.55 秒。

生成后统一放入：

```text
GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/
```

不得直接进入：

```text
GitHub资产区/06_音乐音效/05_可用素材/
```

## 6. 最短接入规则

### 6.1 默认状态

- 页面首次打开默认静音。
- 不自动播放任何音频。
- 显示音频开关。
- 用户点击音频开关或第一次交互后再尝试解锁音频。
- 解锁失败不影响游戏。
- 用户开启音频后，主环境音乐低音量循环播放。

### 6.2 播放优先级

| 场景 | 播放 |
|---|---|
| 音频开关开启 | `MUS-DEMO-001` 低音量淡入循环 |
| 点击路线/选项 | `UI-001-SYN` |
| 本次行为有资源下降 | `UI-003-SYN`，可和确认音错开 80-120ms |
| 本次行为有资源上升 | `UI-004-SYN`，可和确认音错开 80-120ms |
| 车轴首次危急 | `WARN-001-SYN` |
| 粮草首次危急 | `WARN-002-SYN` |
| 神志首次危急 | `WARN-003-SYN` |
| 神志进入 26-55 | `SAN-001-SYN` 淡入 |
| 神志进入 25 以下 | 首轮仍保持 `SAN-001-SYN`，后续再升级到 `SAN-002-SYN` |

### 6.3 降级规则

- 单个音频文件失败：跳过该文件。
- 音乐或循环层失败：不播放该循环层，短音效继续。
- 所有音频失败：游戏仍可完整运行。
- 页面隐藏：循环层暂停或音量降为 0。
- 页面恢复：如果音频开关仍开启，循环层淡入恢复。

## 7. 建议 manifest

```js
const AUDIO_ASSETS = {
  musicMain: {
    id: "MUS-DEMO-001",
    src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CAND-002_Autumn_on_the_High_Plateau_webdemo_-24lufs.mp3",
    type: "music",
    loop: true,
    volume: 0.16,
    fadeMs: 1500,
    status: "demo-temporary",
    licenseStatus: "pending-user-confirmation"
  },
  musicAltBasin: {
    id: "MUS-DEMO-ALT-001",
    src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CAND-003_Across_the_Forgotten_Basin_webdemo_-24lufs.mp3",
    type: "music",
    loop: true,
    volume: 0.14,
    fadeMs: 1500,
    status: "candidate-review",
    licenseStatus: "pending-user-confirmation"
  },
  select: {
    id: "UI-001-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3",
    type: "ui",
    loop: false,
    volume: 0.4,
    status: "demo-temporary"
  },
  resourceDown: {
    id: "UI-003-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-003_resource_decrease_synth_placeholder.mp3",
    type: "ui",
    loop: false,
    volume: 0.42,
    status: "demo-temporary"
  },
  resourceUp: {
    id: "UI-004-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3",
    type: "ui",
    loop: false,
    volume: 0.4,
    status: "demo-temporary"
  },
  warnAxle: {
    id: "WARN-001-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-001_axle_crisis_synth_placeholder.mp3",
    type: "warning",
    loop: false,
    volume: 0.55,
    status: "demo-temporary"
  },
  warnGrain: {
    id: "WARN-002-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-002_food_crisis_synth_placeholder.mp3",
    type: "warning",
    loop: false,
    volume: 0.52,
    status: "demo-temporary"
  },
  warnSanity: {
    id: "WARN-003-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3",
    type: "warning",
    loop: false,
    volume: 0.5,
    status: "demo-temporary"
  },
  sanityLight: {
    id: "SAN-001-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/SAN-001_light_sanity_layer_synth_placeholder_loop.mp3",
    type: "sanity",
    loop: true,
    volume: 0.1,
    fadeMs: 1500,
    status: "demo-temporary"
  },
  sanityHeavy: {
    id: "SAN-002-SYN",
    src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/SAN-002_heavy_sanity_layer_synth_placeholder_loop.mp3",
    type: "sanity",
    loop: true,
    volume: 0.14,
    fadeMs: 1800,
    status: "demo-temporary-optional"
  }
};
```

## 8. 首版验收标准

- 音频开关关闭时，游戏完整可玩。
- 音频开关开启后，`MUS-DEMO-001` 能低音量循环播放。
- 音乐不压过事件文字阅读，默认音量不超过 `0.18`。
- 音乐循环允许内部 Demo 有轻微 MP3 缝隙，但必须记录为发布前风险。
- 音频开关开启后，点击路线/选项有轻量反馈。
- 资源变化有反馈，但不连续堆叠吵人。
- 三个危急告警每局每项最多触发一次。
- 神志降低后，神志低频层能叠加到音乐下方；神志恢复后能淡出或降级。
- 控制台没有未捕获的 `play()` 报错。
- 任一音频路径失效时，游戏不崩。
- 所有接入素材仍显示为 `Demo 临时` 或 `待复核`，没有素材被标为正式可用。
