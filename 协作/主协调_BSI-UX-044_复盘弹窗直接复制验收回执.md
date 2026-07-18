# BSI-UX-044 复盘弹窗直接复制验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已实现 `recap=1` 一键打开居中复盘。本轮继续减少试玩者回填成本：复盘弹窗内直接提供“复制复盘”按钮，不再要求测试者进入“完整日志”抽屉后再找复制按钮。

## 已完成

1. 复盘弹窗新增“复制复盘”动作。
2. 复制内容复用 `getRunRecapText()`，与日志抽屉顶部的本局复盘保持同源。
3. 复制成功后，按钮文字变为“已复制”，提示变为“可粘贴到试玩记录”。
4. 增加剪贴板兜底：
   - 优先使用系统剪贴板写入。
   - 若浏览器拒绝剪贴板写入，则在复盘弹窗内展开已选中的文本框，测试者可手动复制。
5. 增加 `ending-copy` 和 `story-modal-copy-fallback` 样式。
6. 页面缓存版本更新至 `app.js?v=20260621-c125`，试玩入口构建号更新至 `20260621-c125`。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/试玩入口.html`

浏览器验收：

- 视口：`960 x 540` 横屏。
- 测试入口：`index.html?fresh=1&ending=rift&recap=1`。
- 复盘弹窗第一行按钮包含：
  - `复制复盘`
  - `完整日志`
  - `重开一局`
- 点击“复制复盘”后，按钮变为：`已复制 / 可粘贴到试玩记录`。
- 浏览器剪贴板内容以 `《不思异：九州》试玩复盘` 开头，包含路线、资源、补给和近志。
- 页面无横向溢出，控制台无 error / warn。

## 后续建议

1. 后续可把复制成功反馈做成更轻的半透明浮字，减少结算弹窗内文字变化。
2. 若移动浏览器仍存在剪贴板权限差异，可保留已选中文本框作为可靠兜底。
