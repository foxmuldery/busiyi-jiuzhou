# C_BSI-C-050 五分钟路径 HUD 落账复验回执

日期：2026-06-18
线程：C 技术原型
目标：复验上一轮 HUD 落账修复是否真正解决“行动结束后下一步仍显示等落账”的卡顿感。

## 1. 本轮问题

在 C-049 后的真实浏览器路径复盘中发现：

- 行动执行中显示 `下一步：等落账` 是正确状态。
- 但行动已经落账、按钮可以继续点击后，顶部 HUD 偶发仍停在 `下一步：等落账`。
- 这会让新玩家误以为还不能操作，尤其在抵达新地点、处理半途路遇后更明显。

根因：

- `nextStepLabel` 由 `renderOverview()` 计算。
- `setActionFeedback()` 和反馈自动清空只刷新了行动浮层，没有同步刷新 `renderOverview()`。
- 因此行动状态已变化，但顶部下一步提示没有立即重算。

## 2. 本轮修复

修改文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

修复方式：

- `setActionFeedback()` 在刷新行动反馈后同步调用 `renderOverview()`。
- `queueActionFeedbackReset()` 在反馈清空后同步调用 `renderOverview()`。
- QA 脚本新增契约检查，防止后续把这两个刷新点删掉。

## 3. 浏览器复验路径

视口：`844x390`
入口：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?view=town
```

实际点击路径：

```text
中原驿遭遇
-> 中原驿补给
-> central_to_road
-> 故王道遭遇/补给
-> road_to_pass
-> 废关遭遇/补给
-> pass_to_market
-> 黑齿市遭遇/补给
-> market_to_stele
-> 巫咸断碑遭遇/补给
-> stele_to_rift
-> 九州裂隙
```

说明：

- 本轮开局随机显影时，首段可见主线为 `central_to_road`，因此使用真实显影路线复验。
- 这是正常抽卡结果，不是失败；关键是路线、路遇、补给、到站和 HUD 状态都按真实页面按钮推进。

## 4. 关键验收结果

最终抵达：

```text
地点：九州裂隙
天数：第 6 日
下一步：处理遭遇
车轴：72
粮草：90
神志：51
```

非忙碌状态检查：

```text
stableWaitStates = []
```

含义：

- 只有行动执行中会显示 `下一步：等落账`。
- 行动结束、按钮可继续点击后，没有残留 `等落账`。
- 抵达新地点后，HUD 会正确回到 `下一步：处理遭遇` / `下一步：补给一次` / `下一步：开图选路` / `下一步：选一条路`。

布局与控制台：

```text
overflowStates = []
pageLogs = []
```

含义：

- 844x390 小横屏无页面级横向/纵向溢出。
- 页面控制台无应用错误/警告。

## 5. 主线程判断

`P0-UX-002 新玩家第一分钟引导` 继续降风险：

- 机器路径已经证明：新玩家主线所需的下一步提示不会在落账后卡住。
- 这不是最终“好不好看”的证明，但已经是“不会误导玩家不能继续操作”的证明。
- 下一轮仍建议做真人 5 分钟试玩，重点观察玩家是否自然理解“遭遇 -> 补给 -> 地图选路”的循环。

## 6. 收口自检

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
```

补充结果：

- `qa-check.js` 全部通过。
- `journey-smoke-check.js` 可抵达 `kyushu_rift`，结束资源为 `{"axle":69,"grain":86,"sanity":48}`。
- `novice` 1000 局成功率 `100%`，`early_0_3=0`，补救局数 `2`。
