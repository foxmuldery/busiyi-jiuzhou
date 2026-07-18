# 主协调验收记录：BSI-UX-018 全量试玩图视觉复核

## 验收结论

通过。D 线程已基于 C083 的 `59/59` 试玩图状态，完成首局高频图视觉复核，并输出下一轮可直接复制的重生图提示语。

交付物：

- [D_BSI-D-024_全量试玩图复核与下一轮重生图提示语.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-024_全量试玩图复核与下一轮重生图提示语.md)
- 高频图联系表：`/private/tmp/busiyi-c084-priority-contact.png`

## 核心判断

当前 Demo 的主要视觉问题不是缺图，而是高频路径里同一底图连续复用：

- `中原驿 / 驿门未闭`
- `故王道 / 车辙分叉`
- `废关 / 废关旧令`
- `黑齿市 / 黑齿交易 / 黑齿鳞价`
- `巫咸断碑 / 断碑读名`
- `九州裂隙 / 裂隙前梦 / 烛龙息图`

D 线程建议下一轮只重生 10-11 张高影响图，不继续铺开 59 张，以最快提升首局 5 分钟沉浸感。

## 下一轮执行建议

优先让用户使用 D024 中的 Prompt 生成：

1. `EVT-001_post_gate_驿门未闭.png`
2. `EVT-002_split_tracks_车辙分叉.png`
3. `EVT-003_closed_order_废关旧令.png`
4. `EVT-005_black_trade_黑齿交易.png`
5. `RTE-009_black_teeth_scale_price_黑齿鳞价.png`
6. `EVT-013_read_name_断碑读名.png`
7. `EVT-014_rift_dream_裂隙前梦.png`
8. `RND-008_breathing_map_烛龙息图.png`
9. `CRS-003_sanity_神志崩线.png`
10. `END-001_rift_入裂隙.png`
11. `END-003_lost_stranded_迷失九州_旅途断绝.png`

生成后只需按同名文件替换，再由 C 线程刷新 manifest 和跑 QA。

## 风险边界

- 当前 47 张派生图仍只作为内部试玩占位。
- 本轮没有改变任何素材授权状态。
- 大图不需要绿幕；只有后续车队、资源图标、UI 小图标才使用纯绿幕硬边规则。
