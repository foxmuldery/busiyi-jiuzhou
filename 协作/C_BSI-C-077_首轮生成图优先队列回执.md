# C_BSI-C-077 首轮生成图优先队列回执

> 子线程：C，技术原型
> 日期：2026-06-19
> 状态：代码自检通过
> 目标：把 59 张生成图缺口压缩成第一轮最值得生成的 12 张关键图，便于用户和 D 视觉交互线程优先补齐试玩观感。

## 1. 本轮完成

- 在 `asset-readiness-check.js` 中新增首轮优先生成包。
- 新增命令：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --markdown
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --json
```

- 首轮优先包覆盖：
  - 4 张 A 组中地图路段长图。
  - 5 张稳定主线路径地点图。
  - 1 张开局地点事件图。
  - 2 张高价值半途路遇图。
- 更新 README，补充给视觉交互线程和生图线程使用的命令。
- 更新 QA，防止 `--priority`、`--markdown` 和首轮优先表被后续误删。

## 2. 首轮 12 张

```text
01. A-stage:road -> MID-BG-ROAD-001_古道荒原路段长图.png
02. A-stage:market -> MID-BG-MARKET-001_边市废关路段长图.png
03. A-stage:water -> MID-BG-WATER-001_雷泽赤水路段长图.png
04. A-stage:rift -> MID-BG-RIFT-001_归墟裂隙路段长图.png
05. B-location:central_post -> LOC-001_central_post_中原驿.png
06. B-location:abandoned_pass -> LOC-004_abandoned_pass_废关.png
07. B-location:black_teeth_market -> LOC-010_black_teeth_market_黑齿市.png
08. B-location:broken_stele -> LOC-013_broken_stele_巫咸断碑.png
09. B-location:kyushu_rift -> LOC-014_kyushu_rift_九州裂隙.png
10. B-event:post_gate -> EVT-001_post_gate_驿门未闭.png
11. C-route:roadside_shrine -> RTE-002_roadside_shrine_路旁无名祠.png
12. C-route:black_teeth_scale_price -> RTE-009_black_teeth_scale_price_黑齿鳞价.png
```

当前 12 张状态均为 `missing`，因为图片还未投放到正式目录；这不阻塞试玩，程序仍会走旧图和兜底图。

## 3. 文件改动

- `GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `协作/不思异九州_任务交接台账.md`

## 4. 自检结果

通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --markdown
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --json
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

关键 QA 结果：

```text
PASS generated art readiness checker contract
All prototype QA checks passed.
Journey smoke check passed.
```

## 5. 给 D 线程和用户的用法

视觉交互线程可以直接运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --markdown
```

把输出贴入生图任务；图片生成后，按文件名放入对应目录，再运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
```

首轮 12 张全部 `ready` 后，再推进剩余 B/C 组全量图。
