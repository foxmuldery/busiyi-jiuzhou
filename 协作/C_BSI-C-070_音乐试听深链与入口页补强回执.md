# C_BSI-C-070 音乐试听深链与入口页补强回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过

## 1. 本次目标

P0 仍需要做音乐主观听感复核。此前设置抽屉里已经有 5 首核心音乐候选试听，但测试者必须先进入游戏、再点设置。本轮新增 `drawer=settings` 深链，并把“音乐试听面板”放进 `试玩入口.html`，让测试者能直接进入设置抽屉试听。

## 2. 已完成

- 新增 `getInitialDrawerFromUrl()`。
- 支持 URL 参数：
  - `index.html?fresh=1&drawer=settings`
  - 也可打开其它合法抽屉，例如 `drawer=log`。
- 初始化时会先按 `view` 参数进入旅途/地图，再打开指定抽屉。
- 入口页新增 `音乐试听面板` 按钮，指向 `index.html?fresh=1&drawer=settings`。
- README 新增音乐主观听感复核入口。
- QA 新增 `audio review deep link contract`，并把音乐入口纳入 `playtest launcher contract`。
- 静态资源版本号更新到 `20260619-c070`。

## 3. 边界

- 该入口不会自动播放音乐，仍需玩家点击试听；这是为了遵守浏览器自动播放限制。
- 该入口不改变默认静音策略。
- 该入口只降低测试摩擦，不代表候选音乐已正式授权或终选。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS audio review deep link contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
- `git diff --check`：通过。
