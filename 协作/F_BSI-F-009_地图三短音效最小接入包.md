# F_BSI-F-009 地图三短音效最小接入包

> 子线程：F，音乐音效与音频体验  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-15  
> 边界：本文件只给最小接入方案；不修改代码，不移动素材，不改音频台账。  
> 依据：`主协调_BSI-UX-014_半途路遇与旅途舞台素材推进指令.md`、`GitHub资产区/06_音乐音效/00_音频台账/音频资产清单.md`、`程序生成占位音效包_2026-06-14.md`、当前 `data.js` 音频槽位。

## 0. 结论

当前资产区没有专门命名为 `MAP-OPEN-001`、`MAP-FOG-001`、`CITY-ARRIVE-001` 的已生成文件。为了让 `mapOpen`、`mapReveal`、`locationArrive` 三个槽位不再全部 missing，首版建议先复用已入库的程序生成占位音效。

这些声音只能作为内部 Web Demo 临时占位，状态写 `demo-temporary`。授权写“项目自制，待主线程验收”，不得写 `cleared`，也不得移动到 `05_可用素材`。

## 1. 三槽位最小可用表

| 槽位 key | 最小接入文件 | 类型 | 触发语义 | 源文件快检 | 接入响度建议 | 循环 | 授权 / 状态 |
|---|---|---|---|---|---|---|---|
| `mapOpen` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3` | `map-sfx` / UI 确认占位 | 打开九州图、切入舆图界面 | 0.35s；mean -31.0 dB；max -16.4 dB | `volume: 0.18-0.22`；比普通点击略低 | 否 | ffmpeg 程序合成；项目自制，待主线程验收；`demo-temporary`，非 cleared |
| `mapReveal` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3` | `map-sfx` / 异象显影临时占位 | 雾散、路线显影、地点显影 | 1.50s；EBU I -30.3 LUFS；mean -28.7 dB；max -17.1 dB | `volume: 0.12-0.16`；延迟 80-160ms 播放，避免压过抵达音 | 否 | ffmpeg 程序合成；项目自制，待主线程验收；`demo-temporary`，非 cleared |
| `locationArrive` | `GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3` | `map-sfx` / 抵达正反馈占位 | 抵达地点、朱砂印落点 | 0.85s；EBU I -33.6 LUFS；mean -33.1 dB；max -20.6 dB | `volume: 0.18-0.22`；不要叠加胜利感 UI | 否 | ffmpeg 程序合成；项目自制，待主线程验收；`demo-temporary`，非 cleared |

说明：

- `mapReveal` 使用 `WARN-003-SYN` 是临时取其“异象/低频污染感”，不是把神志危急音效转正为地图音效。若主线程觉得太危险或太阴沉，备选是把 `mapReveal` 临时指向 `UI-003_resource_decrease_synth_placeholder.mp3`，音量 `0.14-0.18`。
- `UI-001` 太短，EBU LUFS 会被门限算法判成无效；本表对短音效优先采用 `volumedetect` 的 mean / max 和浏览器接入音量建议。
- 三个槽位都不循环，失败时直接静默跳过，不阻断地图、移动、显影或抵达。

## 2. 给 C 线程的 `data.js` 填空建议

当前 `data.js` 中 `mapOpen`、`mapReveal`、`locationArrive` 已有 key，但 `src` 为空。建议只填 `src`、保持 `loop: false`，状态继续用临时态。

```js
mapOpen: {
  id: "MAP-OPEN-001",
  name: "地图打开程序占位",
  src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3",
  type: "map-sfx",
  loop: false,
  volume: 0.2,
  status: "demo-temporary"
},
mapReveal: {
  id: "MAP-FOG-001",
  name: "纸雾显影程序占位",
  src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3",
  type: "map-sfx",
  loop: false,
  volume: 0.14,
  status: "demo-temporary"
},
locationArrive: {
  id: "CITY-ARRIVE-001",
  name: "地点抵达程序占位",
  src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3",
  type: "map-sfx",
  loop: false,
  volume: 0.2,
  status: "demo-temporary"
}
```

建议保留现有 `audioHooks`：

```js
mapOpen: "mapOpen",
mapReveal: "mapReveal",
locationArrive: "locationArrive"
```

## 3. 不建议本轮启用的素材

| 素材 | 原因 | 本轮处理 |
|---|---|---|
| `MUS-CAND-*` 音乐候选 | 28-29 秒音乐，不是短音效；授权仍待用户确认生成工具与商用条款 | 只保留当前主音乐/备选音乐用途，不裁成地图短音效 |
| `AMB-CAND-*`、`TRV-CAND-*`、`SAN-CAND-*` 第三方候选 | 目前只是检索清单，未下载到本地，授权留痕未完成 | 不写入 `data.js`，不标可用 |
| `05_可用素材` | 当前目录只有占位 `.gitkeep`，没有已验收音效 | 不引用，不伪造 cleared |

## 4. 后续正式替换方向

最小接入跑通后，建议下一轮生成或筛选三个专用文件，统一进入：

```text
GitHub资产区/06_音乐音效/04_待复核素材/AI生成候选/
```

推荐命名：

```text
MAP-OPEN-001_parchment_map_open_demo_pending.mp3
MAP-FOG-001_fog_city_route_reveal_demo_pending.mp3
CITY-ARRIVE-001_cinnabar_stamp_arrival_demo_pending.mp3
```

正式听感目标：

| 资产 ID | 听感目标 | 时长 | 响度方向 | 循环 |
|---|---|---:|---|---|
| `MAP-OPEN-001` | 羊皮纸展开、木轴轻响、很轻的风 | 0.7-1.2s | 短音效源文件 peak 留到 -6 dBFS 以下，Web 接入 `0.18-0.24` | 否 |
| `MAP-FOG-001` | 纸雾退开、墨线显出、低频轻气流 | 0.8-1.4s | 避免尖高频；Web 接入 `0.12-0.20` | 否 |
| `CITY-ARRIVE-001` | 朱砂印轻落、木印/陶印质感 | 0.5-0.9s | 清楚但不胜利；Web 接入 `0.16-0.24` | 否 |

通过主线程试听、授权留痕和体积复核后，才能复制或移动到 `05_可用素材/WebDemo/`，状态再改为 `cleared` 或主线程指定的正式状态。

## 5. 自检

- 已读取主协调 `BSI-UX-014`，确认本轮目标是地图三短音效最小闭环，且不能把待复核素材标为正式 cleared。
- 已查看 `06_音乐音效` 文件名、README、音频台账、程序生成占位音效包、用户上传音乐评估和免费商用音效检索清单。
- 已只读查看原型 `data.js` / `app.js`，确认三个 key 已存在且当前 `src` 为空。
- 已用本地音频工具快检推荐文件；四个候选 MP3 均能被读取，时长与台账基本一致。
- 未修改代码、未移动音频、未修改台账；本轮只新增本交付文件。

## 6. 需要主线程决策

1. 是否接受 `WARN-003-SYN` 作为 `mapReveal` 的临时异象显影音？如果觉得太像危急告警，建议改用 `UI-003-SYN`，或让 `mapReveal` 暂时静音直到专用 `MAP-FOG-001` 生成。
2. 是否允许 C 线程本轮直接把上述三个 `src` 填入 `data.js`，并保持 `status: "demo-temporary"`？
3. 下一轮是否启动三个专用地图音效生成：`MAP-OPEN-001`、`MAP-FOG-001`、`CITY-ARRIVE-001`，生成后由 F 线程复核再更新台账？
