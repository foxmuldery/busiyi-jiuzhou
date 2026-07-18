# C_BSI-C-021 路线预感标签与素材兜底回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-16  
> 来源任务：用户要求“继续优化”

## 1. 本轮结论

已继续优化九州图路线卡，让随机路遇不再只是后台抽取，而是能在战略选路时被玩家感知。

## 2. 已完成

- 路线卡新增“预感标签”：
  - `定遇`：该路线有固定半途事件。
  - `异象低 / 异象中 / 异象高`：该路线存在随机路遇候选，并按当前资源压力显示大致强度。
  - `有补救`：候选池里存在补给或休整类事件，资源紧张时会更容易抽到。
- `BSI_PROTOTYPE.getMapSummary()` 增加 `randomRouteEventPreview`，方便 A 线程后续做数值回填。
- `BSI_PROTOTYPE.getRouteEventPreview(routeId)` 可单独查看某条路线的固定路遇、随机候选和标签。
- 路线卡缩略图增加加载失败兜底：素材路径不通时自动隐藏，不显示破图标。

## 3. 自检结果

已执行：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`：通过
- `git diff --check`：通过
- 浏览器验证 `http://localhost:4177/03_WebDemo/prototype/`：
  - 页面加载成功
  - 起点事件可处理
  - 九州图可打开
  - 路线卡显示 `定遇 / 异象低 / 有补救`
  - 控制台无 error/warn

## 4. 后续建议

- A 线程：根据 `randomRouteEventPreview` 做触发频率和保底强度模拟。
- D 线程：后续可把文字标签升级为更短的图标章，例如“定 / 异 / 救”。
- B 线程：继续按同一结构补第二批随机事件。
