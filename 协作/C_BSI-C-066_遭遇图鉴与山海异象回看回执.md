# C_BSI-C-066 遭遇图鉴与山海异象回看回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过，待主线程浏览器补验

## 1. 本次目标

C065 已经让玩家能在日志抽屉回看已抵达地点。本次继续把“山海经亮点”从地点扩展到遭遇：玩家处理过的地点事件、半途路遇和随机路遇，也应该能作为本局见闻被回看，而不是只留在日志文字里。

## 2. 已完成

- 在“行旅日志”抽屉新增 `遭遇图鉴`。
- 图鉴读取本局真实落账数据：
  - `state.eventResults`：已处理的地点事件。
  - `state.routeEventResults`：已处理的半途路遇和随机路遇。
- 每张遭遇卡显示：
  - 遭遇缩略图。
  - 遭遇标题。
  - 类型与来源，例如 `路遇 · 循旧王道西行`。
- 点击遭遇卡会打开现有详情弹窗：
  - 弹窗标题为遭遇名。
  - 显示遭遇图、诗引和本局选择后的落账结果。
  - 不改变当前地点、路线、资源和结算。
- 新增 `getEncounterMemories()`、`renderEncounterGallery()`、`openEncounterMemory()`。
- 静态资源版本号更新到 `20260619-c066`。
- QA 新增 `encounter gallery contract`，防止后续 UI 重构丢失入口。

## 3. 当前边界

- 当前图鉴只展示本局已经处理过的遭遇，不显示未发现灰格。
- 路遇按遭遇 ID 去重，避免同一异象重复占用日志抽屉空间。
- 当前图像仍使用现有事件/路遇图示兜底；D 线程后续生成专属事件图后可替换素材映射。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS encounter gallery contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。

## 6. 待补验

- 小横屏浏览器验收待补：本轮内置浏览器在旧预览标签页上崩溃，不能作为可靠验收证据。
- 待补验路径：
  1. 以本地 HTTP 方式打开 Web Demo。
  2. 重开一局。
  3. 处理起点事件。
  4. 选择一条路线并处理半途路遇。
  5. 打开“志”抽屉。
  6. 确认 `遭遇图鉴` 至少显示地点事件与路遇卡。
  7. 点击遭遇卡，确认弹窗显示遭遇图、诗引和落账结果。
