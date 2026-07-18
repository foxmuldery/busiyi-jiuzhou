# C_BSI-C-061 试玩复盘卡与复制记录回执

## 目标

让 5 分钟试玩结束后不只剩一串日志，而是能直接看到“这局走了哪里、用了多少补给、触发多少路遇、资源最低点在哪里”，方便主线程和外部测试玩家快速复盘。

## 本轮改动

- 更新 [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)。
  - 在 `行旅日志` 抽屉顶部新增 `runRecapCard`。
  - 复盘卡包含状态、统计芯片、路线、资源压力和复制按钮。
  - 更新静态资源版本号到 `20260618-c061`。
- 更新 [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)。
  - 新增 `resourceMinimums`，记录本局三资源最低点。
  - 新增 `getRunRecapData()`、`getRunRecapText()`、`renderRunRecap()`。
  - 新增 `copyRunRecapToClipboard()`，把复盘文本复制给测试记录。
  - 结局页新增 `复盘本局` 操作卡，点击后打开日志抽屉。
  - 调试接口新增 `getRunRecapText`。
- 更新 [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)。
  - 新增 `.run-recap-card`、`.run-recap-stats` 和 `ending-recap` 样式。
  - 复盘卡压缩为数字和短句，避免小横屏文字过量。
- 更新 [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)。
  - 新增 `run recap drawer contract`。
  - 结局操作从 2 个卡片扩展为 3 个卡片：重开、复盘、日志。

## 验证口径

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed c061-final --strategy novice
```

自动检查摘要：

- `qa-check.js` 新增并通过 `run recap drawer contract`。
- 完整路径 smoke 仍可抵达 `kyushu_rift`。
- smoke 结束资源为 `{"axle":69,"grain":86,"sanity":48}`。
- novice 1000 局模拟通关率 `100%`，前 3 步失败 `0`，硬失败 `0`。

浏览器复验结果：

- 小横屏 `844x390` 下打开 `志` 抽屉，`runRecapCard` 可见。
- 初始复盘卡显示 `仍在路上`、`日1 地1 路0 遇0 补0 救0`。
- 结局验收地址 `ending=rift` 下，主选项区显示 3 个操作：`重开一局`、`复盘本局`、`查看日志`。
- 点击 `复盘本局` 后打开 `行旅日志` 抽屉。
- 结局复盘卡显示 `入裂隙`、`日6 地2 路4 遇0 补0 救0`。
- 复盘路线显示 `绕向废关 → 日中入市 → 以旧物换碑路 → 照碑文西去`。
- 页面级横向/纵向溢出为 `false / false`。
- 控制台错误/警告为 `0`。

## 主线程判断

此项服务于下一步真人试玩复盘。外部玩家试玩后，不需要翻日志推断路线和资源压力，可以直接把复盘卡复制给主线程或其它 AI 引擎继续分析。
