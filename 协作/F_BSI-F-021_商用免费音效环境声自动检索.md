# F_BSI-F-021 商用免费音效环境声自动检索

> 子线程：F-SFX-SEARCH  
> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-19  
> 范围：只检索音效和环境声；不下载素材；不移动文件；不改代码；不提交 Git。  
> 状态口径：所有候选仅为 `candidate-review` 或 `license-review`，正式使用前仍需人工听感复核和授权留痕。

## 1. 授权口径摘要

| 平台 | 本轮使用方式 | 许可证/授权口径 | 是否需署名 | 是否允许商用 | 是否允许修改 | 备注 |
|---|---|---|---|---|---|---|
| Pixabay Sound Effects | P0 主来源 | Pixabay Content License：可免费使用、免署名、可修改或改编；禁止原样独立分发，需自行检查附加权利 | 否 | 是 | 是 | 单条页可记录标题、作者、时长、媒体类型和发布日期，适合优先人工下载复核 |
| Mixkit Sound Effects | P0/P1 补充来源 | Mixkit Sound Effects Free License / FAQ：可用于个人和商业项目，署名非必需 | 否 | 是 | 待条目下载前复核 | 静态页面多为分类列表，单条永久页不稳定；下载前应保存分类页、条目标题和下载记录 |
| Freesound | 本轮未纳入单条候选 | 仅允许 CC0；CC-BY、CC-BY-NC、Sampling+ 本轮不进候选 | CC0 否 | CC0 是 | CC0 是 | 本轮未稳定检到可验证 CC0 单条页，列为缺口 |
| ZapSplat | 仅作备选风险记录 | Standard License：免费账号可用于商业项目，但需要署名；Premium 可免署名 | 免费账号需要 | 是 | 是 | 本轮不列入 P0，只建议在可接受署名或 Premium 记录明确时人工补充 |

## 2. 候选表

| 候选 ID | 用途 | 平台 | 素材标题 | URL | 时长 | 许可证/授权口径 | 是否需署名 | 是否允许商用 | 是否允许修改 | 风险备注 | 建议状态 |
|---|---|---|---|---|---:|---|---|---|---|---|---|
| SFX-CAND-001 | 旅途环境 | Pixabay Sound Effects | Desert wind 2 | https://pixabay.com/sound-effects/nature-desert-wind-2-350417/ | 0:32 | Pixabay Content License | 否 | 是 | 是 | 荒外风层适配度高；注意不要让风声抢主音乐和文字阅读 | candidate-review |
| SFX-CAND-002 | 旅途环境 | Pixabay Sound Effects | Desert wind 1 | https://pixabay.com/sound-effects/nature-desert-wind-1-350398/ | 0:29 | Pixabay Content License | 否 | 是 | 是 | 可作 SFX-CAND-001 的弱循环备选；仍需听循环点 | candidate-review |
| SFX-CAND-003 | 旅途环境 | Mixkit Sound Effects | Wind in the top of the mountain | https://mixkit.co/free-sound-effects/wind/ | 0:31 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 分类页条目；需下载前保存条目标题和下载记录 | license-review |
| SFX-CAND-004 | 地图打开 | Pixabay Sound Effects | Turn a Page | https://pixabay.com/sound-effects/film-special-effects-turn-a-page-336933/ | 0:01 | Pixabay Content License | 否 | 是 | 是 | 非古帛质感，但可低音量叠加竹轴/木签声 | candidate-review |
| SFX-CAND-005 | 地图打开 | Pixabay Sound Effects | Page Turn | https://pixabay.com/sound-effects/film-special-effects-page-turn-305789/ | 0:01 | Pixabay Content License | 否 | 是 | 是 | 页面未显示作者名，下载前需保存完整页面截图或详情 | license-review |
| SFX-CAND-006 | 地图打开 | Mixkit Sound Effects | Single book paging | https://mixkit.co/free-sound-effects/page/ | 0:02 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 分类页条目；现代书页感，适合轻处理后做地图展开 | license-review |
| SFX-CAND-007 | 迷雾显影 | Pixabay Sound Effects | Whoosh Whisper - 2 | https://pixabay.com/sound-effects/film-special-effects-whoosh-whisper-2-404221/ | 0:04 | Pixabay Content License | 否 | 是 | 是 | 时长偏长，建议裁 0.8-1.4 秒并降低高频 | candidate-review |
| SFX-CAND-008 | 迷雾显影 | Mixkit Sound Effects | Transition windy swoosh | https://mixkit.co/free-sound-effects/wind/ | 0:03 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 可能偏转场感；需避免影视冲击音 | license-review |
| SFX-CAND-009 | 迷雾显影 | Mixkit Sound Effects | Mighty mysterious swoosh | https://mixkit.co/free-sound-effects/wind/ | 0:04 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 名称适配迷雾，但需听感确认是否过度大片化 | license-review |
| SFX-CAND-010 | 地点抵达 | Mixkit Sound Effects | Page forward single chime | https://mixkit.co/free-sound-effects/chimes/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 可作“地点志刷新”的尾音；需叠木印/木盒声才更古雅 | license-review |
| SFX-CAND-011 | 地点抵达 | Mixkit Sound Effects | Relaxing bell chime | https://mixkit.co/free-sound-effects/chimes/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 可作抵达提示尾音；注意避免现代冥想 App 感 | license-review |
| SFX-CAND-012 | 地点抵达 | Pixabay Sound Effects | Wood Tap Rhythmic | https://pixabay.com/sound-effects/search/wood%20tap/ | 0:11 | Pixabay 页面候选；条目标注 freesound_community 来源 | 待复核 | 待复核 | 待复核 | 只在搜索页稳定可见，需进入单条页核原始授权链；可裁短为木签/木印层 | license-review |
| SFX-CAND-013 | 资源上涨 | Pixabay Sound Effects | Inventory Open | https://pixabay.com/sound-effects/film-special-effects-inventory-open-94932/ | 0:01 | Pixabay Content License；历史清单提示为 Freesound 来源 | 待复核 | 待复核 | 待复核 | 与“补给记账”贴合，但必须追原始授权链 | license-review |
| SFX-CAND-014 | 资源上涨 | Mixkit Sound Effects | Page forward single chime | https://mixkit.co/free-sound-effects/page/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 可作为上涨的短促明亮层；不能做金币/抽卡感 | license-review |
| SFX-CAND-015 | 资源下降 | Mixkit Sound Effects | Small wood plank pile drop | https://mixkit.co/free-sound-effects/wood/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 适合普通资源下降；需确认不太像施工/现代木板 | license-review |
| SFX-CAND-016 | 资源下降 | Mixkit Sound Effects | Wood hard hit | https://mixkit.co/free-sound-effects/wood/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 适合作为低响木扣；需做柔化，避免惩罚感过重 | license-review |
| SFX-CAND-017 | 车轴告急 | Pixabay Sound Effects | Floorboard Creak 03 | https://pixabay.com/sound-effects/household-floorboard-creak-03-499651/ | 0:02 | Pixabay Content License | 否 | 是 | 是 | P0：木轮/车轴吱呀适配度高，可变调叠入车轴告急 | candidate-review |
| SFX-CAND-018 | 车轴告急 | Pixabay Sound Effects | Wood creaks | https://pixabay.com/sound-effects/film-special-effects-wood-creaks-411791/ | 0:08 | Pixabay Content License | 否 | 是 | 是 | P0：连续木质压力纹理，需裁短并避免像室内地板 | candidate-review |
| SFX-CAND-019 | 车轴告急 | Mixkit Sound Effects | Twig breaking | https://mixkit.co/free-sound-effects/wood/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 可作“干裂点”；单独用可能像树枝断裂，建议只叠一层 | license-review |
| SFX-CAND-020 | 粮草告急 | Pixabay Sound Effects | RiceGrains2 | https://pixabay.com/sound-effects/search/grain/ | 0:14 | Pixabay 页面候选；条目标注 freesound_community 来源 | 待复核 | 待复核 | 待复核 | 声音方向贴近粮粒，但只在搜索页稳定可见，需核单条页与原始授权 | license-review |
| SFX-CAND-021 | 粮草告急 | Pixabay Sound Effects | sandfall5 | https://pixabay.com/sound-effects/search/grain/ | 0:04 | Pixabay 页面候选；条目标注 freesound_community 来源 | 待复核 | 待复核 | 待复核 | 可模拟干粮/砂粒落入空器；需确认不是沙尘环境误导 | license-review |
| SFX-CAND-022 | 粮草告急 | Pixabay Sound Effects | Paper Bag - Rustling Through it 1 | https://pixabay.com/sound-effects/search/bag/ | 0:02 | Pixabay 搜索页候选 | 待复核 | 待复核 | 待复核 | 可作空布袋层；需进入单条页保存作者和授权详情 | license-review |
| SFX-CAND-023 | 神志告急 | Pixabay Sound Effects | Eerie Wind | https://pixabay.com/sound-effects/horror-eerie-wind-478386/ | 0:13 | Pixabay Content License | 否 | 是 | 是 | P0：低音量做神志污染风层；避免直接恐怖片化 | candidate-review |
| SFX-CAND-024 | 神志告急 | Pixabay Sound Effects | Dark Horror Ambient 05 | https://pixabay.com/sound-effects/horror-dark-horror-ambient-05-425468/ | 0:22 | Pixabay Content License | 否 | 是 | 是 | 适合重度神志告急，必须裁短、降响度、去冲击感 | candidate-review |
| SFX-CAND-025 | 神志告急 | Mixkit Sound Effects | Creepy tomb ambience | https://mixkit.co/free-sound-effects/wind/ | 0:41 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 时长偏环境层，适合低音量截取；需确认无尖叫/清晰人声 | license-review |
| SFX-CAND-026 | 事件弹窗 | Mixkit Sound Effects | Page back chime | https://mixkit.co/free-sound-effects/page/ | 0:02 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 适合事件弹窗出现；需避免现代界面音感 | license-review |
| SFX-CAND-027 | 事件弹窗 | Mixkit Sound Effects | Page turn chime | https://mixkit.co/free-sound-effects/page/ | 0:01 | Mixkit Sound Effects Free License | 否 | 是 | 待复核 | 短、轻、可叠竹简声；需保存下载记录 | license-review |
| SFX-CAND-028 | 事件弹窗 | Pixabay Sound Effects | Turn a Page | https://pixabay.com/sound-effects/film-special-effects-turn-a-page-336933/ | 0:01 | Pixabay Content License | 否 | 是 | 是 | 可复用地图打开候选，适合轻提示；需避免重复听感疲劳 | candidate-review |

## 3. P0 推荐

首批最建议人工试听和下载留痕的候选：

| 用途 | P0 候选 | 理由 |
|---|---|---|
| 旅途环境 | SFX-CAND-001 / SFX-CAND-002 | 荒外、沙风、空旷感直接贴合旅途底层 |
| 地图打开 | SFX-CAND-004 | 单条 Pixabay 页完整，短促、轻，易叠加古代材质层 |
| 迷雾显影 | SFX-CAND-007 | 轻 whoosh/whisper 可裁短成迷雾退开 |
| 地点抵达 | SFX-CAND-010 / SFX-CAND-011 | 短 chime 适合地点志刷新尾音，但需要另找木印层 |
| 资源上涨 | SFX-CAND-013 | 与 inventory/补给反馈方向接近，但授权链需先核 |
| 资源下降 | SFX-CAND-015 | 木板轻落更像资源减少，不像失败音 |
| 车轴告急 | SFX-CAND-017 / SFX-CAND-018 | 木质吱呀、承重、车轴压力感最贴合 |
| 粮草告急 | SFX-CAND-020 / SFX-CAND-022 | 粮粒与空袋方向接近，但都需授权链复核 |
| 神志告急 | SFX-CAND-023 / SFX-CAND-024 | 已有历史清单方向一致，低音量使用即可 |
| 事件弹窗 | SFX-CAND-026 / SFX-CAND-028 | 纸页/短 chime 适合普通路遇弹窗 |

## 4. 缺口与建议搜索词

| 缺口 | 当前情况 | 建议下一轮搜索词 |
|---|---|---|
| 古代车队复合旅途环境 | 免费库里纯“古代车架+风+布幡”的组合较少，目前只能用风声加木质 Foley 自行混合 | `cart wooden wheel creak`、`wagon wood creak wind`、`wooden cart ambience` |
| 地点抵达的“朱砂印/木印落下” | 找到 chime 和木 tap，但没有非常准确的古代印章声 | `wood stamp`、`rubber stamp soft`、`seal stamp paper`、`wooden stamp` |
| 粮草告急的“空布袋+粮粒落碗” | 搜索页候选多为 freesound_community 或现代包装声，授权链和听感都需复核 | `grain pour bowl`、`rice grains fall`、`empty cloth bag`、`dry grain bag` |
| Freesound CC0 单条 | 本轮没有稳定查到可验证 CC0 单条页，未纳入表格 | `site:freesound.org/people grain CC0`、`paper rustle license cc0 freesound`、`wood creak license cc0 freesound` |
| ZapSplat 备选 | 免费账号需署名，本轮不放入 P0 | `zapsplat wood creak`、`zapsplat parchment paper`、`zapsplat grain bag`；记录时必须写“免费账号需要署名” |

## 5. 风险

- Pixabay 的 `freesound_community` 来源条目虽然出现在 Pixabay Sound Effects，但仍建议追原始授权链；本报告已统一标为 `license-review`。
- Mixkit 静态页面能确认分类、标题、时长和平台 FAQ，但单条 URL/下载记录需人工下载前保存；本报告 Mixkit 条目统一标为 `license-review`。
- 粮草告急是最大缺口：可检到“grain/bag”方向，但准确、古代、免署名、可商用且授权链短的单条较少。
- 神志告急候选偏恐怖氛围，正式接入前必须做响度和裁切，避免跳吓、尖叫、清晰人声或压文字阅读。
- 所有第三方音效只能作为待复核候选，正式入库前需要记录下载日期、原始文件名、作者、页面链接、许可证链接和人工试听结论。

## 6. 自检

- 已阅读 `GitHub资产区/06_音乐音效/免费商用音效检索清单_2026-06-14.md`。
- 已阅读 `协作/F_BSI-F-020_下一轮音乐音效提示语一键复制版.md`。
- 已按要求只检索音效和环境声，未检索音乐。
- 已优先使用 Pixabay Sound Effects 和 Mixkit Sound Effects。
- Freesound 未纳入候选，因为本轮未稳定确认 CC0 单条页；ZapSplat 只在缺口中作为备选并标明免费账号需署名。
- 已覆盖：旅途环境、地图打开、迷雾显影、地点抵达、资源上涨、资源下降、车轴告急、粮草告急、神志告急、事件弹窗。
- 每条候选均包含：候选 ID、用途、平台、素材标题、URL、时长、许可证/授权口径、是否需署名、是否允许商用、是否允许修改、风险备注、建议状态。
- 建议状态只使用 `candidate-review` 或 `license-review`。
- 未下载任何音频，未移动文件，未改代码，未 git commit/push。

## 7. 本轮查验过的授权与平台页

- Pixabay Content License Summary: https://pixabay.com/service/license-summary/
- Mixkit License: https://mixkit.co/license/
- Mixkit Sound Effects FAQ / category index: https://mixkit.co/free-sound-effects/
- Freesound FAQ licenses: https://freesound.org/help/faq/
- ZapSplat Standard License: https://www.zapsplat.com/license-type/standard-license/
