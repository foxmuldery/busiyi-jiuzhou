# BSI-UX-043 试玩入口一键直达复盘验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已补齐结局直达复盘数据，但试玩入口页仍沿用旧的日志抽屉入口。玩家或测试者点击“打开本局复盘 / 结局复盘场景”时，应第一屏直接看到居中复盘弹窗，而不是再进入日志抽屉或二次寻找按钮。

## 已完成

1. 新增 URL 参数：`?recap=1`，打开页面后自动显示居中“本局复盘”弹窗。
2. `?fresh=1&ending=rift&recap=1` 会直接进入完整演示通关复盘。
3. 试玩入口页更新：
   - “打开本局复盘”改为 `./index.html?recap=1`
   - “结局复盘场景”改为 `./index.html?fresh=1&ending=rift&recap=1`
   - 入口页构建号更新为 `20260621-c123`
4. README 中的固定复盘链接同步更新为 `recap=1`。
5. QA 合约增加 `recap=1` 初始化和入口链接检查。
6. 页面缓存版本更新至 `app.js?v=20260621-c123`。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html GitHub资产区/03_WebDemo/prototype/README.md`

浏览器验收：

- 视口：`960 x 540` 横屏。
- 从试玩入口页点击“结局复盘场景”。
- 导航后 URL 为：`index.html?fresh=1&ending=rift&recap=1`。
- 第一屏直接显示居中弹窗：
  - 眉题：`本局复盘`
  - 标题：`入裂隙`
  - 文本包含：`第 6 日 · 显影 6 处 · 行过 5 段路。`
  - 文本包含：`互动：事件 6 · 路遇 4 · 补给 6 · 补救 0。`
- 页面无横向溢出，控制台无 error / warn。

## 后续建议

1. 可继续给 `?recap=1` 增加“复制复盘”按钮，减少从复盘弹窗再进日志抽屉的二次操作。
2. 若要发给外部测试者，优先发 `试玩入口.html`，入口页现在比直接 URL 更清楚。
