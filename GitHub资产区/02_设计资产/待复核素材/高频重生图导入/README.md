# 高频重生图导入区

把新生成的 11 张高频遭遇、路遇、危机、结局图先放到这个文件夹，再由导入脚本检查和写入正式素材目录。

## 文件名

请尽量使用下面这些目标文件名。脚本按同名匹配，支持 `.png`、`.jpg`、`.jpeg`、`.webp`；正式写入时会统一成为 PNG。

```text
EVT-001_post_gate_驿门未闭.png
EVT-002_split_tracks_车辙分叉.png
EVT-003_closed_order_废关旧令.png
EVT-005_black_trade_黑齿交易.png
RTE-009_black_teeth_scale_price_黑齿鳞价.png
EVT-013_read_name_断碑读名.png
EVT-014_rift_dream_裂隙前梦.png
RND-008_breathing_map_烛龙息图.png
CRS-003_sanity_神志崩线.png
END-001_rift_入裂隙.png
END-003_lost_stranded_迷失九州_旅途断绝.png
```

## 验收规则

- 支持画幅：`1:1 / 4:3 / 16:9`
- 最低尺寸：`960x720`
- 避免真实文字、水印、车队、UI、现代物品、强发光边缘和过度虚化。
- 如果是绿幕或纯色底抠图资产，边缘要硬一些，不要黑白棋盘格透明背景。

## 导入流程

先检查，不写入正式素材：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js
```

确认全部合格后再写入；脚本会先备份原图：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js --apply
```

写入后刷新状态和试玩入口：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-report --write-workbench
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest --write-entry-status
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```
