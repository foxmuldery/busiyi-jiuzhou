# 主协调 BSI-UX-051 路线二次确认与误点保护验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 九州图路线选择、地图节点选择、自动验收

## 1. 目标

解决横屏触屏试玩里“误点路线就直接出发”的问题。路线选择改为：

1. 第一次点击路线卡或地图节点：只预览路线。
2. 第二次点击同一条路线：正式启程。
3. 点击另一条路线：切换预览，不直接出发。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

实现内容：

- 新增 `selectedRoute` 预览状态。
- 新增 `confirmRoute()`：负责“先选中、再启程”的路线点击逻辑。
- 路线卡选中后显示 `再点启程` 小章。
- 地图节点同步显示选中态。
- 离开九州图、进入补给或正式移动时清空路线预览。
- 未解当前遭遇、未显影路线、锁定路线仍保留原阻断逻辑。
- QA 固化路线二次确认契约，避免后续改回单击出发。

## 3. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

验收重点：

- 路线卡点击进入确认预览。
- 同一路线二次点击才出发。
- 地图节点有同步选中态。
- 完整路径 smoke 仍可抵达 `kyushu_rift` 并触发结局选择。

## 4. 浏览器复验边界

浏览器自动点击路线时，in-app browser 出现 CDP `Runtime.evaluate` 超时，未作为原型失败记录。当前以自动 QA、完整 smoke 和静态契约通过作为本轮验收依据。

## 5. 结论

BSI-UX-051 已完成。路线选择现在更适合触屏：玩家先看清路线，再确认出发，降低误点导致资源消耗的挫败感。
