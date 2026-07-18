# C_BSI-C-058 新增核心音乐地点轮换与试听状态回执

## 目标

把 F 线程已编号的两首新增核心音乐候选接入 Web Demo，让它们在具体地点中真实轮换并在设置面板里可见，同时继续保持 `review-pending`，不误标为正式音乐。

## 本轮改动

- 更新 [data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)。
- 新增两条音乐资产：
  - `MUS-CORE-005`：神秘九州行 WebDemo 低响度预览，内部试听候选。
  - `MUS-CORE-006`：春晓清行 WebDemo 低响度预览，内部试听候选。
- 新增地点级音乐轮换 `musicProfileByLocation`：
  - `old_king_road`、`bird_mouse_pass`、`nameless_shrine` 使用 `MUS-CORE-005`。
  - `qingqiu_outer_city`、`black_teeth_market`、`feather_folk_ford` 使用 `MUS-CORE-006`。
- 更新 [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)。
  - 当前音乐优先读取地点轮换；没有地点专属音乐时再回落到地形音乐。
  - 设置面板新增“地点轮换”显示，玩家能看到当前地点是否使用专属音乐。
- 更新 [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)。
  - 新增地点音乐映射合法性检查。
  - 新增 `new core music candidates wired for internal review`，防止 005/006 只登记未接入。

## 验证

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed c058-audio --strategy novice
```

关键结果：

- `contextual music profile configured` 通过。
- `new core music candidates wired for internal review` 通过。
- 媒体引用数量为 `50`，所有引用文件存在。
- 完整 smoke 仍按 `central_to_pass -> pass_to_market -> market_to_stele -> stele_to_rift` 抵达 `kyushu_rift`。
- 完整 smoke 结束资源：`{"axle":69,"grain":86,"sanity":48}`。
- `novice` 失误玩家 1000 局：`SUCCESS_RATE 100%`，`early_0_3` 为 `0`，只触发 `2` 次神志补救。

## 浏览器复验

本地预览地址：

```text
http://127.0.0.1:4186/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?c=c058-audio
```

验证路径：

```text
中原驿
-> central_to_road
-> 半途路遇
-> 故王道
-> road_to_pass
-> 废关
-> pass_to_market
-> 黑齿市
```

浏览器结果：

- 初始 `中原驿` 设置面板显示 `MUS-CORE-001`，`场景轮换：古道 · 5 首候选`，`地点轮换：沿用地形音乐`。
- `故王道` 设置面板显示 `当前音乐：MUS-CORE-005 神秘九州行 WebDemo 低响度预览（待复核）`，`地点轮换：故王道 · MUS-CORE-005`。
- `黑齿市` 设置面板显示 `当前音乐：MUS-CORE-006 春晓清行 WebDemo 低响度预览（待复核）`，`地点轮换：黑齿市 · MUS-CORE-006`。
- 页面控制台错误/警告：`0`。

## 主线程判断

此项解决的是“导入音乐没有在游戏里展现”的体验缺口。现在 005/006 不只是资产清单里的文件，而是已经进入地点级轮换和设置面板可见状态。

仍需注意：这不是正式音频完成。两首音乐仍为内部 Web Demo 试听候选，后续必须由 F 线程和用户继续做主观听感、响度、循环点和授权状态复核。
