# C_BSI-C-071 真人试玩下一步目标高亮回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过，Browser 渲染验证被本地 URL 策略阻塞

## 1. 本次目标

当前版本已有顶部“下一步”文字，但真人试玩时玩家仍可能不知道具体该点哪个区域。本轮把“下一步”升级为可读状态和目标高亮，让玩家不看说明也更容易完成：

```text
遭遇 -> 补给 -> 开图 -> 选路 -> 半途路遇/危机补救
```

## 2. 已完成

- `getNextStepGuidance()` 新增 `action` 字段。
- `body[data-next-action]` 会同步当前主操作：
  - `event-choice`
  - `supply`
  - `open-map`
  - `pick-route`
  - `route-event`
  - `crisis`
  - `recap`
- 当前目标按钮会克制高亮：
  - 遭遇选择。
  - 可用补给。
  - 地图按钮和“打开九州图”按钮。
  - 可选路线卡和可达地图节点。
  - 濒死补救选项。
  - 结局复盘/日志按钮。
- 修正提示优先级：半途进入濒死补救时，顶部优先提示“求生补救”，不再误提示“处理路遇”。
- `getUiState()` 暴露 `nextAction`，方便后续自动验收。
- README 与 QA 合约已同步。
- 静态资源版本号更新到 `20260619-c071`。

## 3. 设计边界

- 不新增教程页。
- 不新增选择滚动区。
- 不隐藏任何选择项。
- 高亮遵守 `prefers-reduced-motion`；减少动态时只保留描边，不做呼吸动画。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS guided next action target contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。

## 6. 浏览器验证记录

- 已启动本地预览服务：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1
```

- in-app Browser 打开该本地 URL 时触发 Browser URL policy，并显示页面崩溃；本轮不绕过该策略做替代浏览器验证。
- 因此本轮不能声称已完成真实渲染截图验收，后续需要由用户浏览器或可用的 Browser 环境复核画面。
