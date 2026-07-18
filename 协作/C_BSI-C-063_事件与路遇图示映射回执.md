# C_BSI-C-063 事件与路遇图示映射回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：主线程已验收

## 1. 本次目标

让每个地点事件、固定半途路遇和随机半途路遇都有可显示的图示入口，避免玩家进入事件时只看到文字，削弱《山海经》地点和异象的成就感。

## 2. 已完成

- 在 `data.js` 新增 `stageAssets.eventIllustrations`，覆盖全部地点事件。
- 在 `data.js` 新增 `stageAssets.routeEventIllustrations`，覆盖全部固定路遇和随机路遇。
- 在 `app.js` 新增事件图示取图函数：
  - `getEventIllustrationSrc(eventId, locationId)`
  - `getRouteEventIllustrationSrc(eventId, route)`
- 地点事件页会优先显示事件图示；缺失时回退到当前地点图。
- 半途路遇页会优先显示路遇图示；缺失时回退到目的地/出发地地点图。
- 在 `qa-check.js` 新增图示覆盖检查，后续新增事件或路遇时，如果忘记配图会直接失败。
- 修复小横屏折叠态事件图被 CSS 隐藏的问题：事件卡现在保留一张很薄的横向缩略图，正文仍通过详情弹窗展开。
- 更新 `index.html` 的静态资源版本号，避免浏览器继续使用旧 CSS / JS 缓存。

## 3. 当前边界

- 当前图示多数是临时复用已有地点图或背景长图，并不是最终专属事件美术。
- 图示层已经具备数据结构和渲染入口，D 线程后续可以按统一美学规范替换为专属事件图、小动画或短循环视频。
- 车队素材不会被误用到事件图示中，QA 已做防漏。

## 4. 涉及文件

- [data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [不思异九州_总体推进计划.md](/Users/yuanzhe/Documents/game/协作/不思异九州_总体推进计划.md)

## 5. 验收结果

- 静态语法检查：`node --check app.js` 通过。
- 数据语法检查：`node --check data.js` 通过。
- 原型 QA：`node qa-check.js` 通过，新增 `event illustrations covered` 与 `compact event illustration visible contract` 已纳入检查。
- 核心循环 smoke：`node journey-smoke-check.js` 通过。
- 浏览器小横屏复核：`844x390` 下半途路遇“当康啼垄”图示加载成功，折叠态图框显示为 `38 x 26`，不再是 `display:none`。
- 验收截图：[busiyi-event-art-844x390.png](/private/tmp/busiyi-event-art-844x390.png)
