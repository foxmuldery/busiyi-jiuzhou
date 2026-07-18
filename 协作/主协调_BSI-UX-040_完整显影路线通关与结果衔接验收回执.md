# BSI-UX-040 完整显影路线通关与结果衔接验收回执

日期：2026-06-21

责任：主协调 / C 视觉交互

目标：在硬失败闭环通过后，验证一局真实浏览器试玩能从 `中原驿` 走到 `九州裂隙` 并进入结局，同时优化结果页的下一步衔接，减少手机横屏里的额外找按钮。

## 本轮改动

1. 优化 `继续前行` 的结果页衔接：
   - 若结果后进入 `crisis`，继续自动打开危机补救。
   - 若结果后进入 `stranded`，继续自动打开失败页。
   - 若结果后进入 `ended`，继续自动打开结局页。
   - 若结果后抵达新地点且该地点遭遇未处理，继续自动打开新地点遭遇。
2. 更新缓存号到 `20260621-c120`。
3. 更新 `journey-smoke-check.js` 的完整主路径，使其与当前更稳定的显影保底路径一致：
   - `中原驿 -> 故王道 -> 无名祠 -> 黑齿市 -> 巫咸断碑 -> 九州裂隙`
4. 更新 QA 合同，覆盖“结果页继续后可进入普通新地点遭遇”的行为。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [journey-smoke-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js)

## 自动检查

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node --check journey-smoke-check.js`：通过
- `node journey-smoke-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check -- app.js qa-check.js index.html journey-smoke-check.js`：通过

`journey-smoke-check.js` 当前完整路径：

```text
central_to_road -> road_to_shrine -> shrine_to_market -> market_to_stele -> stele_to_rift
```

脚本结论：

- 抵达：`kyushu_rift`
- 结束资源：`{"axle":61,"grain":85,"sanity":63}`

## 浏览器验收

- 浏览器：Codex in-app browser
- 测试尺寸：`900 x 500`
- 测试服务：`http://127.0.0.1:4182/`
- 测试地址：`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town`
- 缓存号：`app.js?v=20260621-c120`

真实浏览器通关路径：

```text
中原驿
-> 故王道
-> 无名祠
-> 黑齿市
-> 巫咸断碑
-> 九州裂隙
-> 入裂隙结局
```

关键验收点：

1. 首站随机显影没有强制出现 `central_to_pass`，但出现了 `central_to_road` 与 `central_to_qingqiu`，仍有可通关出口。
2. 选择 `central_to_road` 后，半途路遇 `当康啼垄` 正常弹出。
3. 半途路遇结果点击 `继续前行` 后，自动进入抵达地点 `故王道` 的 `车辙分叉` 遭遇。
4. 后续 `故王道 -> 无名祠 -> 黑齿市 -> 巫咸断碑 -> 九州裂隙` 均可用真实按钮完成。
5. 每站补给能正常落账，已取补给会禁用，同站第二个补给显示本次已补。
6. `九州裂隙` 的 `裂隙前梦` 选择 `按梦中地图前进` 后进入 `入裂隙` 结局。
7. 结局弹窗有 `重开一局 / 复盘本局 / 查看日志` 三个动作。
8. 控制台无 error / warning。

浏览器终局资源：

```text
车轴 63 / 粮草 89 / 神志 51
```

## 结论

完整试玩主链路已经通过一次真实浏览器验收。当前版本不只是数据层可通关，也能在手机横屏尺寸里通过真实 UI 控件完成：

- 开局遭遇
- 补给
- 九州图选路
- 半途路遇
- 抵达新地点遭遇
- 多站补给与继续前进
- 终点事件
- 结局页

本轮也验证了随机显影不是必须抽到某一条固定路线才能通关；当前显影路线仍能自然抵达终点。

## 下一步建议

1. 做一次“新玩家不看说明”的 5 分钟手测，重点观察玩家是否知道先处理遭遇、再补给、再打开地图。
2. 给 `九州裂隙 / 入裂隙` 结局页补更强的方图或终局动效，提升终点仪式感。
3. 检查结局复盘页在 900x500 下是否也无需滚动、信息是否足够清楚。
