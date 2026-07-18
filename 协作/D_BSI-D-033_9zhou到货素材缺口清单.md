# D_BSI-D-033 9zhou 到货素材缺口清单

> 日期：2026-06-21  
> 检查目录：`/Users/yuanzhe/Downloads/9zhou/`  
> 边界：只做到货盘点与缺口判断，不移动素材，不声明正式商用。

## 1. 总结

这批素材基本够下一步用了。

- 24 张静图需求：基本齐，含重复版本。
- 4 张 3:1 横向长背景：已到，但需要人工重命名。
- 纯动态叠层：核心 8 类已到，且多数是黑底叠层，可百搭接入。
- 明确不建议使用：3 个 `Ancient_China_ink_painting_lands...mp4`，它们带完整场景，不适合作为纯叠层。

## 2. 静图到货情况

### 已到：24 张关键静图

已看到以下资产或对应候选：

- `LOC-001_central_post_中原驿`
- `LOC-004_abandoned_pass_废关`
- `LOC-010_black_teeth_market_黑齿市`
- `LOC-014_kyushu_rift_九州裂隙`
- `EVT-001_post_gate_驿门未闭`
- `EVT-002_split_tracks_车辙分叉`
- `EVT-003_closed_order_废关旧令`，有多个版本
- `EVT-004_ground_thunder_地底雷声`
- `EVT-005_black_trade_黑齿交易`
- `EVT-008_nameless_prayer_无匾新灰`
- `EVT-013_read_name_断碑读名`
- `EVT-014_rift_dream_裂隙前梦`
- `RTE-002_roadside_shrine_路旁无名祠`
- `RTE-009_black_teeth_scale_price_黑齿鳞价`
- `RND-004_silent_barter_黑齿影价`
- `RND-008_breathing_map_烛龙息图`，有两个版本
- `CRS-003_sanity_神志崩线`，有两个版本
- `END-001_rift_入裂隙`
- `END-003_lost_stranded_迷失九州_旅途断绝`
- `UI-RES-AXLE-001_车轴资源图标_绿幕`

### 需要重命名：4 张横向长背景

顶层 4 张 `ChatGPT Image 2026年6月21日 ...png` 都是 `2172x724`，约等于 3:1，可以作为横向路段背景候选。

建议人工确认后重命名为：

- 古道荒原：`MID-BG-ROAD-001_古道荒原路段长图.png`
- 雷泽赤水：`MID-BG-WATER-001_雷泽赤水路段长图.png`
- 归墟裂隙：`MID-BG-RIFT-001_归墟裂隙路段长图.png`
- 边市废关：`MID-BG-MARKET-001_边市废关路段长图.png`

## 3. 动态叠层到货情况

### 可用：核心 8 个百搭叠层

这些可以进入候选整理：

- `Dust_particles_moving_diagonally...mp4`：对应风沙斜向掠过，可用。
- `Floating_parchment_dust_specks...mp4`：对应纸尘颗粒，可用。
- `Ink-wash_clouds_drifting_left...mp4`：对应淡灰云雾横移，可用。
- `Cloud_mass_moving_on_black...mp4`：对应低云团翻卷，可用。
- `Ripple_lines_on_black_background...mp4`：对应浅水细波纹，可用。
- `Slow_circular_ripple_rings_black...mp4`：对应泥泡圆纹扩散，可用。
- `Dark-red_cinnabar_crack_lines...mp4`：对应暗红裂纹微光，可用。
- `Dark_water_distortion_lines_wave...mp4`：对应黑水裂隙波动，可用。

### 额外可用：通用 UI / 神志叠层

- `Parchment_fog_and_paper_fibers...mp4`：地图纸雾，可用。
- `Cinnabar_dust_grains_flickering...mp4`：朱砂细尘，可用于按钮/显影反馈。
- `Soft_gray_shadow_shapes_drifting...mp4`：影子偏移，可用于低神志，但要避免过强。
- `Ink_lines_on_black_background...mp4`：错位墨线，可用于神志污染。
- `Old_silk_dark_edge_texture...mp4`：旧帛暗角，可用于界面暗角。
- `Ink_blots_blooming_fading_black...mp4`：墨晕呼吸，可用于地图/弹窗显影。

### 不建议使用：带场景的视频

以下 3 个不是纯叠层，带完整风景或建筑，会和背景打架：

- `Ancient_China_ink_painting_lands..._202606211214.mp4`
- `Ancient_China_ink_painting_lands..._202606211214_2.mp4`
- `Ancient_China_ink_painting_lands..._202606211214_3.mp4`

建议标记为 `reject-for-overlay_scene-baked`，不要接入叠层位。

## 4. 还缺什么

### 立即不缺

- 云雾、风沙、水纹、裂隙四类纯动效已齐。
- 24 张第一批关键静图基本已齐。
- 资源图标至少已有车轴绿幕候选。

### 后续可以补，但不急

1. `UI-RES-GRAIN-001_粮草资源图标_绿幕.png`
2. `UI-RES-SANITY-001_神志资源图标_绿幕.png`
3. `OV-VIDEO-RES-GAIN-001_资源获得旧金尘粒.mp4`
4. `OV-VIDEO-RES-LOSS-001_资源损耗墨尘下坠.mp4`
5. `OV-VIDEO-MAP-REVEAL-001_九州图雾散显影.mp4`

## 5. 下一步建议

1. 先别继续大批量生成。
2. 先把这批素材按候选、可用、禁用三类整理。
3. C 线程接入时优先接 8 个核心叠层和 4 张 3:1 背景。
4. 视频接入必须保留静态 fallback，所有视频暂标 `internal-web-demo-candidate`。
