# 《不思异：九州》BSI-UX-013 小横屏打磨与半随机显影推进指令

- 发起时间：2026-06-15
- 发起人：主协调线程
- 状态：已下发
- 当前目标：在 BSI-UX-012 的第一章闭环基础上，提升小横屏试玩手感，并把固定 `revealPlan` 推进为“固定保底 + 半随机显影”的首版结构。

## 1. 本轮总目标

1. 小横屏 844x390 / 932x430 下，地点页、九州图、路线卡、补给区和行囊入口更像横屏手机游戏，而不是网页堆叠。
2. 地图显影从完全固定计划升级为“核心保底路线固定，若干支线/雾影按池子稳定抽取”。
3. 地图打开、雾散显影、抵达地点加入音效钩子；没有正式素材时仍保持静音可玩，不报错。
4. 补给预览避免误导：已用补给、同次抵达已补给，应在 UI 和路线卡上更清楚。
5. 所有改动继续避开古风星图、竞品 UI、现代山海图鉴和来源不明素材风险。

## 2. A 线程：半随机显影保底规则

- 任务 ID：BSI-A-008
- 交付文件：[A_BSI-A-008_半随机显影与保底规则.md](/Users/yuanzhe/Documents/game/协作/A_BSI-A-008_半随机显影与保底规则.md)
- 任务内容：
  - 定义“固定保底路线 + 可抽支线 + 雾中远影”的首版规则。
  - 给出资源危险时如何提高补救路线/补救地点出现概率。
  - 给出不会死局的检查条件。
  - 给 C 线程一份可实现的数据结构建议。

## 3. B 线程：路线签与显影文案

- 任务 ID：BSI-B-009
- 交付文件：[B_BSI-B-009_路线签显影与低神志短文案.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-009_路线签显影与低神志短文案.md)
- 任务内容：
  - 为路线卡、雾中节点、显影日志写更短的手机可读文本。
  - 给低神志状态下的地图显影和路线提示短文案。
  - 避免长段设定，优先 8-18 字短句。

## 4. C 线程：原型实现

- 任务 ID：BSI-C-010
- 交付文件：[C_BSI-C-010_小横屏与半随机显影实现回执.md](/Users/yuanzhe/Documents/game/协作/C_BSI-C-010_小横屏与半随机显影实现回执.md)
- 允许修改：
  - [data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)
  - [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
  - [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
  - [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- 必须实现：
  - 在不破坏现有 `revealPlan` 的前提下，支持半随机显影池。建议新增 `routePools` 或在 `revealPlan` 中新增 `requiredRoutes / optionalRoutes / optionalCount / fogPool` 等字段。
  - 抽取结果必须稳定：同一局同一地点刷新不变，不因 reload 改变。可以用 `runId + locationId` 派生伪随机，或把抽取结果写入 state。
  - 保底路线必须始终存在，玩家不能因抽卡无路可走。
  - 资源危险时，优先显出补救倾向路线或补救地点；若本轮实现不了完整权重，至少保留固定安全路线并在回执说明。
  - 小横屏 UI 优化：路线卡、地图节点、补给按钮、HUD 在 844x390 / 932x430 下更紧凑，不重叠。
  - 音效钩子：地图打开、地图显影、抵达地点可调用音频 key；未接素材时不报错、不影响玩法。
  - 路线卡的目的地补给预览应区分“可补”“已取”“本次已补”或降低误导。
- 验证要求：
  - `node --check app.js`
  - `node --check data.js`
  - `window.BSI_PROTOTYPE.validate()` 或等价结构化数据验证 0 errors。
  - 说明一条从中原驿到裂隙的可行路径。

## 5. D 线程：小横屏 UI 返工单

- 任务 ID：BSI-D-011
- 交付文件：[D_BSI-D-011_小横屏UI返工单.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-011_小横屏UI返工单.md)
- 任务内容：
  - 对 844x390 / 932x430 两个横屏尺寸列出 P0 问题和建议样式。
  - 给 C 线程明确修改优先级。
  - 不写泛泛 UI 理论，只写具体容器、按钮、文字、卡片、地图节点。

## 6. E 线程：本轮新增机制风险复核

- 任务 ID：BSI-E-007
- 交付文件：[E_BSI-E-007_随机显影与UI打磨风险复核.md](/Users/yuanzhe/Documents/game/协作/E_BSI-E-007_随机显影与UI打磨风险复核.md)
- 任务内容：
  - 复核“半随机显影、路线卡、音效钩子、小横屏 UI”是否会重新靠近 Out There / 西部横屏远行 / Darkest Dungeon。
  - 给 C/D/F 线程一份红线清单。

## 7. F 线程：地图音效接入规格

- 任务 ID：BSI-F-008
- 交付文件：[F_BSI-F-008_地图音效接入规格.md](/Users/yuanzhe/Documents/game/协作/F_BSI-F-008_地图音效接入规格.md)
- 任务内容：
  - 定义音频 key：地图打开、雾散显影、抵达地点、路线选择、补给完成。
  - 给出临时素材、正式素材、缺素材三种状态下 UI 如何显示。
  - 给 C 线程音效接入点建议，不能让缺音频阻断玩法。

## 8. 主线程验收口径

1. 半随机必须稳定，不因刷新页面改变。
2. 保底必须存在，不因抽卡导致无路可走。
3. 小横屏必须不遮挡主要操作。
4. 音效缺素材时不报错、不阻塞。
5. 商业风险继续以“山海舆图”而不是“古风星图”为第一眼。
