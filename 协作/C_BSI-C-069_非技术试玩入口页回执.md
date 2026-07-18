# C_BSI-C-069 非技术试玩入口页回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过

## 1. 本次目标

C068 已经提供 `?fresh=1` 干净新局参数，但发给非技术测试者时，直接给一串 URL 仍然不够友好。本轮新增一个本地可打开的试玩入口页，让测试者不用理解参数，也能一键进入干净新局、继续存档、地图视图和低资源压力场景。

## 2. 已完成

- 新增 [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)。
- 入口页提供四个按钮：
  - `开始干净新局` -> `index.html?fresh=1`
  - `继续当前存档` -> `index.html`
  - `从地图视图开始` -> `index.html?fresh=1&view=map`
  - `低资源压力场景` -> `index.html?pressure=low`
- 入口页使用现有 `BG-008_横向山海旅途舞台总场景.png` 作为背景，不新增外部素材。
- README 已把 `试玩入口.html` 作为非技术测试者优先入口。
- QA 新增 `playtest launcher contract`，防止后续入口页缺失或链接断掉。

## 3. 边界

- 入口页不是游戏主界面，不改变 `index.html` 的第一屏体验。
- 入口页只做测试分流，不做宣传页、不承诺发布状态。
- 当前仍需真实浏览器/外部浏览器复核入口页视觉；本轮先用文件和 QA 合同保证链接结构。
- 本轮尝试用内置浏览器打开本地 `file://` 入口页，但被浏览器 URL 安全策略拦截，不能作为视觉验收证据。

## 4. 涉及文件

- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS playtest launcher contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
- `git diff --check`：通过。
