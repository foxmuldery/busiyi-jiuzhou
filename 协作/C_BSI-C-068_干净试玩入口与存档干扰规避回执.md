# C_BSI-C-068 干净试玩入口与存档干扰规避回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过

## 1. 本次目标

P0 试玩版接近可发给别人测试，但普通入口会继续当前浏览器里的旧存档。若测试者或主线程之前玩到半途、结局或危机页，再次打开可能不是新局，影响“新玩家是否能理解第一分钟”的判断。本轮新增一个干净试玩入口，专门用于发测试链接。

## 2. 已完成

- 新增 URL 参数：
  - `?fresh=1`
  - `?reset=1`
- 当上述参数为 `1 / true / yes` 时，本次打开会从新局开始。
- 普通入口不变，仍会继续浏览器里的当前存档。
- 新局日志会写入：`测试入口：已从干净新局开始。`
- README 新增测试者入口说明。
- QA 新增 `fresh playtest entry contract`，防止后续删掉测试入口。
- 静态资源版本号更新到 `20260619-c068`。

## 3. 边界

- 本功能不清空设置，不改变默认静音策略。
- 本功能不删除长期 meta 记录，只保证当前试玩 run 从头开始。
- `?fresh=1` 每次刷新都会重新开局，适合测试链接；正常继续游戏请使用普通入口。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS fresh playtest entry contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
- `git diff --check`：通过。
