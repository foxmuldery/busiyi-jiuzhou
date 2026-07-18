# D_BSI-D-037 高频补图到货整理回执

> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-21  
> 来源：用户上传的 2026-06-21 14:49-14:51 生成图  
> 状态：已整理、已导入可用素材；仍按 `internal-web-demo-candidate` 管理，不代表正式商用授权。

## 1. 已补入的硬缺图

以下 2 张原本属于全量 59 张生成图缺口，已补入 B 组地点事件图：

| 资产 ID | 文件路径 | 处理 |
|---|---|---|
| `EVT-004_ground_thunder_泽鼓回雷.png` | `/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/EVT-004_ground_thunder_泽鼓回雷.png` | 直接补入 |
| `EVT-007_hollow_pass_同穴分粮.png` | `/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/EVT-007_hollow_pass_同穴分粮.png` | 直接补入 |

结果：`asset-readiness-check.js` 已显示全量 59/59 ready。

## 2. 已导入的高频替换图

以下 7 张由用户本批生成图导入；另有既有结局图同批重新确认导入。导入脚本已自动备份旧图。

| 资产 ID | 来源判断 | 处理 |
|---|---|---|
| `EVT-001_post_gate_驿门未闭.png` | 半开驿门，适合作为开局事件 | 已导入 |
| `EVT-002_split_tracks_车辙分叉.png` | 原图上下有白边，已裁切去白边后导入 | 已导入 |
| `EVT-003_closed_order_废关旧令.png` | 废关旧令/破关门方向明确 | 已导入 |
| `EVT-005_black_trade_黑齿交易.png` | 黑齿市骨器交易氛围明确 | 已导入 |
| `RTE-009_black_teeth_scale_price_黑齿鳞价.png` | 秤盘、鳞片、旧币明确 | 已导入 |
| `RND-008_breathing_map_烛龙息图.png` | 地图与异象氛围明确 | 已导入 |
| `CRS-003_sanity_神志崩线.png` | 裂纹地图适合神志危机 | 已导入 |

额外保留：

| 文件 | 路径 | 用途 |
|---|---|---|
| `EVT-001_or_EVT-003_ALT_废关驿门备选.png` | `/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/待复核素材/高频重生图备选_2026-06-21/` | 驿门/废关备选，不进入当前导入 |

## 3. 当前剩余缺口

高频替换状态仍剩 2 张占位：

1. `EVT-013_read_name_断碑读名.png`
2. `EVT-014_rift_dream_裂隙前梦.png`

这两张已有旧占位文件，所以程序不缺图，但视觉一致性仍应重生替换。

## 4. 自检结果

已执行：

```text
node GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js
node GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js --apply
node GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-report --write-workbench
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest --write-entry-status
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

结果：

- 高频替换：`replaced 9/11, placeholder 2, missing 0, invalid 0`
- 全量生成图：`59/59 ready`
- 首轮优先包：`12/12 ready`
- QA：通过
- Journey smoke：通过

## 5. 下一步

只需要继续补 `断碑读名`、`裂隙前梦` 两张高频替换图。若用户继续生成，应按正式文件名投放到：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/待复核素材/高频重生图导入/
```

然后再次运行高频导入脚本即可。
