# C_BSI-C-057 全地点抵达与补给发现文案覆盖回执

## 目标

补齐支线/随机显影地点的抵达句与补给发现句，让玩家抽到任一地点时都先获得“这里是什么、我发现了什么”的反馈，而不是只有主线路径有成就感。

## 本轮改动

- 更新 [data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)。
- 为以下地点补齐 `arrivalText` 和 `supplyDiscoveryText`：
  - `qingqiu_outer_city` 青丘外邑
  - `nameless_shrine` 无名祠
  - `white_feather_mire` 白羽淖
  - `feather_folk_ford` 羽民渡
  - `dream_map_post` 梦图驿
  - `kyushu_rift` 九州裂隙
- 更新 [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)。
- 新增 `location arrival and supply flavor covered` 检查：
  - 所有地点必须有 `arrivalText`。
  - 所有地点志 `detail` 不能过短。
  - 有补给的地点必须有 `supplyDiscoveryText`。

## 验证

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node --check GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed c057-flavor --strategy novice
```

关键结果：

- `location arrival and supply flavor covered` 通过。
- 完整 smoke 仍按 `central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift` 抵达 `kyushu_rift`。
- 完整 smoke 结束资源：`{"axle":69,"grain":86,"sanity":48}`。
- `novice` 失误玩家 1000 局：`SUCCESS_RATE 100%`，`early_0_3` 为 `0`。
- 浏览器本地预览健康检查通过：页面标题正常，`中原驿` 地点志显示抵达句和地点志，下一步为“处理当前遭遇”，补给/选择数量正常，无项目控制台报错，无页面溢出。

## 主线程判断

此项提升的是内容完成度和首局探索成就感。它不增加新交互复杂度，但能保证后续所有地点都至少达到“可抵达、可读志、可发现补给”的最低叙事质量。
