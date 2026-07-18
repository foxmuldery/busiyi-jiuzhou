# F_BSI-F-003 Sub-Agent 音频快测验收与接入指令

## 1. 验收对象

本文件记录主线程对 2026-06-14 三个音频专项 sub-agent 的验收结论。

| Sub-agent | 职责 | 主线程结论 |
|---|---|---|
| SFX-LEGAL / Mencius | 免费商用音效检索与授权复核 | 部分采纳 |
| SFX-SYNTH / Carson | 自制/AI 音效与快速测试包设计 | 采纳 |
| AUDIO-INTEGRATION / Cicero | Web Demo 音频接入与验收标准 | 采纳 |

边界：所有第三方音效仍为“候选/待复核”，不得标为正式可用；程序生成音效仅为“Demo 临时”。

## 2. 主线程采纳结论

### 2.1 第一版 Web Demo 音频范围

第一版先接入已有 8 个程序占位音效：

- `UI-001-SYN`：选择确认。
- `UI-003-SYN`：资源减少。
- `UI-004-SYN`：获得补给。
- `WARN-001-SYN`：车轴危急。
- `WARN-002-SYN`：粮草危急。
- `WARN-003-SYN`：神志危急。
- `SAN-001-SYN`：轻度神志污染循环层。
- `SAN-002-SYN`：重度神志污染循环层。

主线程后续决策已更新：第一版 Web Demo 必须有音乐。`MUS-CAND-002` 低响度预览版作为主环境音乐占位接入，仍为待复核、待授权确认，不能进入正式可用素材。

### 2.2 仍需补齐的声音

`AMB-001` 和 `TRV-001` 提升沉浸感很关键，但不阻塞 C 线程先接现有 8 个音效。

| 缺口 | 优先级 | 主线程判断 |
|---|---:|---|
| `AMB-001` 通用荒外风声 | P0 | 尽快从 Pixabay 候选人工下载复核 |
| `TRV-001` 木轮/车队行进循环 | P0 | 需要真实 Foley 或合成+录音混合，不阻塞短音效接入 |
| `EVT-001` 事件/异象弹出 | P1 | 第二批 AI 音效优先生成 |
| `TRV-002/003` 出发/停下 | P1 | 第二批 AI 音效或 Foley 候选 |
| `RES-001/002` 粮草/车轴细分下降 | P1 | 第二批 AI 音效优先生成 |

## 3. 第三方免费商用素材验收

### 3.1 可进入“待复核”的候选

以下链接只可进入“待复核”，不得直接进入 `05_可用素材`。

| 候选 ID | 用途 | 来源 | 链接 | 主线程结论 |
|---|---|---|---|---|
| AMB-CAND-01 | 荒外风声 | Pixabay | https://pixabay.com/sound-effects/nature-desert-wind-2-350417/ | 优先人工下载复核 |
| AMB-CAND-02 | 荒外风声备选 | Pixabay | https://pixabay.com/sound-effects/nature-desert-wind-1-350398/ | 优先人工下载复核 |
| TRV-CAND-01 | 木头/车轴吱呀 | Pixabay | https://pixabay.com/sound-effects/household-floorboard-creak-03-499651/ | 优先人工下载复核 |
| TRV-CAND-02 | 木头连续吱呀 | Pixabay | https://pixabay.com/sound-effects/film-special-effects-wood-creaks-411791/ | 优先人工下载复核 |
| SAN-CAND-01 | 神志污染风层 | Pixabay | https://pixabay.com/sound-effects/horror-eerie-wind-478386/ | 优先人工下载复核 |
| SAN-CAND-02 | 重度神志氛围 | Pixabay | https://pixabay.com/sound-effects/horror-dark-horror-ambient-05-425468/ | 可下载复核，严控音量 |

### 3.2 暂缓或不建议

| 候选 | 原因 | 主线程结论 |
|---|---|---|
| Mixkit 告警类音效 | 授权页需人工保存完整版本，且声音偏现代 | 暂缓 |
| Freesound 非 CC0 素材 | 署名链会增加发布管理成本 | 暂缓；只接受 CC0 或明确需要时接受 CC-BY |
| ZapSplat 免费素材 | 免费账号通常需要署名和账号下载记录 | 暂不纳入 |
| BAG-CAND-01 Pixabay/Freesound 来源条目 | 授权链混合，需要追原始 Freesound 页 | 谨慎复核，不作为首批 |

### 3.3 授权留痕规则

第三方素材进入待复核目录时，必须同时记录：

- 素材页面 URL。
- 作者/上传者。
- 下载日期。
- 页面显示许可证。
- 是否需要署名。
- 是否允许商用。
- 是否允许修改。
- 页面截图或 PDF 留痕。

## 4. C 线程接入指令

C 线程可以开始接入现有 8 个程序占位音效。范围如下：

- 不引入新依赖。
- 接入 1 条主环境音乐候选：`MUS-CAND-002` 低响度预览版，状态为 Demo 临时、待授权确认。
- 不接入未下载、未复核的第三方音效。
- 默认静音。
- 用户第一次点击音频开关后再解锁音频。
- 所有音频加载或播放失败都静默降级，不阻断游戏。
- 资源危急告警同一局同一资源只触发一次。
- 页面隐藏时暂停或静音循环层。

建议引用路径：

```text
../../06_音乐音效/04_待复核素材/程序生成占位音效/
```

若后续发布时只发布 `03_WebDemo/prototype`，需要将音频复制到发布目录或建立构建脚本；当前本地 Demo 可以先相对引用。

## 5. 音频状态机

建议状态：

```text
locked
unlocked-muted
enabled-idle
enabled-active
suspended
failed-soft
```

建议状态字段：

```js
audioState = {
  supported: true,
  unlocked: false,
  enabled: false,
  masterVolume: 0.7,
  warnedThisRun: {
    axle35: false,
    grain35: false,
    sanity35: false
  },
  currentSanityLayer: "none",
  failedAssets: []
}
```

## 6. 神志音频规则

主线程采纳 AUDIO-INTEGRATION 的建议：

- `sanity > 55`：无神志循环层。
- `26 <= sanity <= 55`：`SAN-001-SYN` 低音量淡入。
- `sanity <= 25`：`SAN-002-SYN` 淡入，`SAN-001-SYN` 淡出或降低。

说明：音频可以比视觉污染更早出现。视觉污染仍可保持当前 `<36` 阈值，音频提前制造“不对劲”的感觉。

## 7. 第二批 AI 音效生成优先级

采纳 Carson 的第二批方向，优先级如下：

1. `EVT-001-A` 异象事件出现。
2. `RES-001-A` 粮草减少。
3. `RES-002-A` 车轴轻损。
4. `TRV-002-A` 车队出发。
5. `TRV-003-A` 车队停下/抵达。
6. `SAN-003-A` 神志污染瞬时加深。
7. `UI-006-A` 不可操作/资源不足。
8. `SAN-004-A` 神志恢复/污染减轻。

提示语可先写入 F 线程提示语文档，生成后仍进入待复核，不直接进入可用素材。

## 8. 待主线程继续处理

- 将第二批 AI 音效提示语补入提示语文档。
- 将第三方候选链接补入免费商用音效检索清单。
- 通知 C 线程按本文件执行最小音频接入。
- 用户试听后决定是否保留程序合成占位风格，或尽快替换为真实 Foley。
