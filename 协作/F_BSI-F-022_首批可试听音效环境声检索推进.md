# F_BSI-F-022 首批可试听音效环境声检索推进

> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 范围：只处理音效和环境声，不处理音乐。  
> 本轮动作：在线实搜、核验平台授权页、核验部分单条素材页；未下载音频，未移动文件，未改代码，未提交 Git。  
> 状态口径：所有第三方素材仍为 `candidate-review` 或 `license-review`，正式入库前必须保留下载页、作者、日期、许可证和试听结论。

## 1. 平台授权口径

| 平台 | 本轮结论 | 授权页 | 当前使用边界 |
|---|---|---|---|
| Pixabay Sound Effects | 优先使用。单条页通常能看到标题、作者、时长、媒体类型、发布日期和 Content License 链接。 | https://pixabay.com/service/license-summary/ | 可作为 Web Demo 首批候选，但仍需下载留痕；不能把原始素材单独转卖或原样分发。 |
| Mixkit Sound Effects | 可作为补充。平台列出 Sound Effects Free License，但分类页条目留痕不如 Pixabay 单条页清晰。 | https://mixkit.co/license/ | 先作为 `license-review`，下载前保存分类页、条目标题、下载日期。 |
| Freesound | 只考虑 CC0。CC-BY 虽可商用但要署名，CC-BY-NC 不可商用，本轮不进入首批测试包。 | https://freesound.org/help/faq/ | 若通过 Pixabay 出现 `freesound_community` 来源，也先标 `license-review`，需要追原始授权链。 |
| ZapSplat | 可作为备选，不作为首批优先。 | https://www.zapsplat.com/license-type/standard-license/ | 免费账号通常需要署名；只有接受署名或 Premium 记录明确时再用。 |

## 2. 首批建议试听候选

| 优先级 | 候选 ID | 用途 | 平台 | 标题 | 链接 | 时长 | 建议音量 | 状态 | 处理建议 |
|---|---|---|---|---|---|---:|---:|---|---|
| P0 | SFX-P0-001 | 旅途底层风声 | Pixabay | Desert wind 2 | https://pixabay.com/sound-effects/nature-desert-wind-2-350417/ | 0:32 | -26 到 -22 dB | candidate-review | 可做荒外风声底层，需检查循环点，避免压主音乐和文字。 |
| P0 | SFX-P0-002 | 地图打开/事件纸页 | Pixabay | Turn a Page | https://pixabay.com/sound-effects/film-special-effects-turn-a-page-336933/ | 0:01 | -20 到 -16 dB | candidate-review | 可先用于地图打开和轻事件弹窗，后续再叠竹简/帛书材质。 |
| P0 | SFX-P0-003 | 车轴告急 | Pixabay | Floorboard Creak 03 | https://pixabay.com/sound-effects/household-floorboard-creak-03-499651/ | 0:02 | -18 到 -14 dB | candidate-review | 车轴低耐久时很合适，可变调、低通，让它更像木轮承重。 |
| P0 | SFX-P0-004 | 车轴告急/木架压力 | Pixabay | Wood creaks | https://pixabay.com/sound-effects/film-special-effects-wood-creaks-411791/ | 0:08 | -22 到 -16 dB | candidate-review | 可裁成 1-2 秒短版，作为连续木架压力层。 |
| P0 | SFX-P0-005 | 神志告急 | Pixabay | Eerie Wind | https://pixabay.com/sound-effects/horror-eerie-wind-478386/ | 0:13 | -30 到 -24 dB | candidate-review | 可低音量铺在神志低状态，不要做跳吓，不要盖住文字阅读。 |
| P1 | SFX-P1-001 | 粮草告急/粮粒倾倒 | Pixabay | Rice Pour | https://pixabay.com/sound-effects/household-rice-pour-75555/ | 0:55 | -24 到 -18 dB | license-review | 方向准确，但页面显示 Freesound 来源，必须追原始授权链后再决定是否入包。 |
| P1 | SFX-P1-002 | 粮草告急/米落碗 | Pixabay | rice falling into a rice bowl | https://pixabay.com/sound-effects/household-rice-falling-into-a-rice-bowl-67617/ | 0:18 | -24 到 -18 dB | license-review | 方向比普通 grain 更贴合，但同样是 Freesound 来源链，先不放正式可用。 |
| P1 | SFX-P1-003 | 粮草告急/空袋摩擦 | Pixabay 搜索页 | Paper Bag - Rustling Through it 1 | https://pixabay.com/sound-effects/search/bag/ | 0:02 | -24 到 -18 dB | license-review | 搜索页显示作者与条目，但单条页抓取不稳定；下载前要保存完整页。 |

## 3. 当前最适合先跑起来的组合

| 触发点 | 临时音效 key | 推荐候选 | 接入说明 |
|---|---|---|---|
| 旅途默认环境 | `amb_journey_wind` | SFX-P0-001 | 低音量循环，淡入淡出 1.5 秒；只在用户开启声音后播放。 |
| 地图打开 | `ui_map_open` | SFX-P0-002 | 单次播放，必要时裁掉尾部；后续可叠竹简/木轴声。 |
| 事件弹窗 | `ui_event_open` | SFX-P0-002 | 与地图共用也可以，音量低一点，避免重复感太重。 |
| 车轴告急 | `warn_axle_low` | SFX-P0-003 / SFX-P0-004 | 低频化、轻微变调；只在告急首次触发或资源继续恶化时播放。 |
| 神志告急 | `warn_sanity_low` | SFX-P0-005 | 做 2-4 秒短版，低音量，随神志下降逐步提高湿声/混响。 |
| 粮草告急 | `warn_grain_low` | SFX-P1-001 / SFX-P1-002 | 只作为待复核方向；若赶 Demo，可先用程序生成占位音效替代。 |

## 4. 缺口

1. 粮草告急还没有“授权链短、听感古雅、可直接入首包”的强候选。
2. 地点抵达还缺“朱砂印/木印落纸”的短音效。
3. 迷雾显影还需要一条更轻、更非影视化的风擦/薄雾散开音。
4. 古代车队复合行旅声仍建议后续自制混合：风声 + 低音量木轮 + 布幡轻响。

## 5. 下载留痕模板

下载任何第三方音效前，先复制这一段到授权台账：

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
试听结论:
处理动作:
当前状态: candidate-review / license-review
```

## 6. 主线程建议

第一批不要贪多，先人工下载试听 5 条：SFX-P0-001 到 SFX-P0-005。它们覆盖旅途环境、地图/事件、车轴告急、神志告急，足够让 Web Demo 听起来“活起来”。粮草告急暂时继续用程序占位音效或后续自制 Foley，避免为了赶进度误用授权链不清的素材。

