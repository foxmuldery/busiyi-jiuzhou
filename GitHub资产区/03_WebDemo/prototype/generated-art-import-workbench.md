# 《不思异：九州》首轮 12 张关键图导入核名工作台

生成时间：2026-06-20T04:50:40.661Z

## 当前状态

- 首轮关键图 ready：12/12
- 正式图目标：只认下表中的目录和文件名。
- 现有候选素材：只作参考或 fallback，不自动当作正式生成图。
- 导入后刷新网页加载清单：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
```

- 视觉 Prompt 包：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-023_首轮12张关键图Prompt包.md`

## 导入步骤

1. 按 D023 生成首轮 12 张图。
2. 按下表的“目标文件”保存，不要改名、不要多加括号或版本号。
3. A 组放入 `A组风格锁定/`；B 组放入 `B组地点事件图/`；C 组放入 `C组路遇危机结局图/`。
4. 运行 `asset-readiness-check.js --priority` 看 12 张是否 ready。
5. 运行 `asset-readiness-check.js --write-manifest` 让试玩网页启用已 ready 图片。
6. 打开试玩入口验证地图页和旅途页。

## 首轮 12 张核名表

| 优先级 | 分组 | ID | 状态 | 规格 | 目标文件 | 用途 | 现有参考候选 |
|---:|---|---|---|---|---|---|---|
| 1 | A-stage | road | ready | 3:1 / >= 2400x800 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-ROAD-001_古道荒原路段长图.png` | 首屏与古道旅途底层，最能替换当前重复背景 | `../../02_设计资产/可用素材/地点图/LOC-008_废关古道地点显影图.png` 1672x941<br>`../../02_设计资产/可用素材/背景长图/BG-002_中景古道山间仪式.png` 2508x627<br>`../../02_设计资产/可用素材/背景长图/BG-003_中景荒原石碑.png` 2508x627<br>`../../02_设计资产/可用素材/背景长图/BG-006_废关古道暮色.png` 2508x627<br>`../../02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png` 2508x627 |
| 2 | A-stage | market | ready | 3:1 / >= 2400x800 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-MARKET-001_边市废关路段长图.png` | 废关、边市、青丘一带共用中地图底层 | `../../02_设计资产/可用素材/B组地点事件图/EVT-003_closed_order_废关旧令.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/EVT-005_black_trade_黑齿交易.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-003_qingqiu_outer_city_青丘外邑.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-004_abandoned_pass_废关.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-010_black_teeth_market_黑齿市.png` 1280x720 |
| 3 | A-stage | water | ready | 3:1 / >= 2400x800 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-WATER-001_雷泽赤水路段长图.png` | 雷泽、赤水、水泽路线共用中地图底层 | `../../02_设计资产/可用素材/B组地点事件图/EVT-012_red_bones_赤水岸骨.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-007_thunder_marsh_雷泽浅畔.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-012_red_marsh_赤水外滩.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RND-007_low_black_cloud_gap_雷泽云缝.png` 1280x720<br>`../../02_设计资产/可用素材/分层素材/FG-005_水泽边缘前景视差层.png` 2508x627 |
| 4 | A-stage | rift | ready | 3:1 / >= 2400x800 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-RIFT-001_归墟裂隙路段长图.png` | 终点归墟与神志异象共用中地图底层 | `../../02_设计资产/可用素材/B组地点事件图/EVT-014_rift_dream_裂隙前梦.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-014_kyushu_rift_九州裂隙.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/END-001_rift_入裂隙.png` 1280x720<br>`../../02_设计资产/可用素材/结局失败图/END-003_九州裂隙结局插图.png` 1672x941<br>`../../02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png` 2508x627 |
| 5 | B-location | central_post | ready | 16:9 / >= 1280x720 | `../../02_设计资产/可用素材/B组地点事件图/LOC-001_central_post_中原驿.png` | 玩家第一眼抵达地点 | `../../02_设计资产/可用素材/B组地点事件图/EVT-001_post_gate_驿门未闭.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-011_dream_map_post_梦图驿.png` 1280x720 |
| 6 | B-location | abandoned_pass | ready | 16:9 / >= 1280x720 | `../../02_设计资产/可用素材/B组地点事件图/LOC-004_abandoned_pass_废关.png` | 当前稳定主线路径第二站 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-MARKET-001_边市废关路段长图.png` 2400x800<br>`../../02_设计资产/可用素材/B组地点事件图/EVT-003_closed_order_废关旧令.png` 1280x720<br>`../../02_设计资产/可用素材/地点剪影/LOC-001_废关祭所异族墟市地点层.png` 2508x627<br>`../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png` 2508x627<br>`../../02_设计资产/可用素材/地点图/LOC-008_废关古道地点显影图.png` 1672x941 |
| 7 | B-location | black_teeth_market | ready | 16:9 / >= 1280x720 | `../../02_设计资产/可用素材/B组地点事件图/LOC-010_black_teeth_market_黑齿市.png` | 山海异域感最强的中段地点 | `../../02_设计资产/可用素材/B组地点事件图/EVT-005_black_trade_黑齿交易.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RND-004_silent_barter_黑齿影价.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RTE-009_black_teeth_scale_price_黑齿鳞价.png` 1280x720<br>`../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png` 2508x627 |
| 8 | B-location | broken_stele | ready | 16:9 / >= 1280x720 | `../../02_设计资产/可用素材/B组地点事件图/LOC-013_broken_stele_巫咸断碑.png` | 后段叙事转折地点 | `../../02_设计资产/可用素材/B组地点事件图/EVT-013_read_name_断碑读名.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RND-003_wrong_milestone_巫咸反里.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RND-006_count_names_rest_巫咸点名.png` 1280x720<br>`../../02_设计资产/可用素材/背景长图/BG-003_中景荒原石碑.png` 2508x627 |
| 9 | B-location | kyushu_rift | ready | 16:9 / >= 1280x720 | `../../02_设计资产/可用素材/B组地点事件图/LOC-014_kyushu_rift_九州裂隙.png` | 第一章终点与结局入口 | `../../02_设计资产/可用素材/A组风格锁定/MID-BG-RIFT-001_归墟裂隙路段长图.png` 2400x800<br>`../../02_设计资产/可用素材/B组地点事件图/EVT-014_rift_dream_裂隙前梦.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/END-001_rift_入裂隙.png` 1280x720<br>`../../02_设计资产/可用素材/结局失败图/END-003_九州裂隙结局插图.png` 1672x941<br>`../../02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png` 2508x627 |
| 10 | B-event | post_gate | ready | 1:1 / 4:3 / 16:9 / >= 960x720 | `../../02_设计资产/可用素材/B组地点事件图/EVT-001_post_gate_驿门未闭.png` | 第一场剧情选择，影响开局质感 | `../../02_设计资产/可用素材/B组地点事件图/LOC-001_central_post_中原驿.png` 1280x720 |
| 11 | C-route | roadside_shrine | ready | 1:1 / 4:3 / 16:9 / >= 960x720 | `../../02_设计资产/可用素材/C组路遇危机结局图/RTE-002_roadside_shrine_路旁无名祠.png` | 主线第一段半途路遇 | `../../02_设计资产/可用素材/B组地点事件图/LOC-006_nameless_shrine_无名祠.png` 1280x720<br>`../../02_设计资产/可用素材/地点剪影/LOC-001_废关祭所异族墟市地点层.png` 2508x627<br>`../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png` 2508x627 |
| 12 | C-route | black_teeth_scale_price | ready | 1:1 / 4:3 / 16:9 / >= 960x720 | `../../02_设计资产/可用素材/C组路遇危机结局图/RTE-009_black_teeth_scale_price_黑齿鳞价.png` | 主线中段重复出现的高价值路遇 | `../../02_设计资产/可用素材/B组地点事件图/EVT-005_black_trade_黑齿交易.png` 1280x720<br>`../../02_设计资产/可用素材/B组地点事件图/LOC-010_black_teeth_market_黑齿市.png` 1280x720<br>`../../02_设计资产/可用素材/C组路遇危机结局图/RND-004_silent_barter_黑齿影价.png` 1280x720<br>`../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png` 2508x627 |

## 验收命令

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

## 注意

- A 组必须是背景长图，不带车队、人物、UI、文字、水印。
- B/C 组必须是地点或事件大图，不要把 UI 节点、地图钉、路线卡画进图里。
- 如果工具输出 `review`，先看比例和分辨率；不要急着接入网页。
- 如果风格明显偏仙侠、西幻、现代电影感，宁可重生，不要强行入库。
