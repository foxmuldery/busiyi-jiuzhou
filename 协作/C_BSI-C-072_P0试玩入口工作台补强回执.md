# C_BSI-C-072 P0 试玩入口工作台补强回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过

## 1. 本次目标

P0 下一步需要真人 5 分钟试玩复盘。此前 `试玩入口.html` 已能进入干净新局、地图、音乐试听和低资源场景，但测试结束后的“复盘回收”还需要玩家自己记得打开 `志`。本轮把入口页补成更完整的测试工作台，减少真人试玩后的回收摩擦。

## 2. 已完成

- `试玩入口.html` build 标记更新为 `20260619-c072`。
- 新增 `打开本局复盘` 入口：

```text
index.html?drawer=log
```

- 新增 `结局复盘场景` 入口：

```text
index.html?fresh=1&ending=rift&drawer=log
```

- README 新增复盘日志和结局复盘场景直达 URL。
- QA 的 `playtest launcher contract` 已覆盖这两个新入口。

## 3. 边界

- 不改主游戏 UI。
- 不改玩法数值。
- 不改音乐默认策略。
- 不把测试入口做成宣传页；它仍是内部 P0 试玩分发和复盘回收工具。

## 4. 涉及文件

- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS playtest launcher contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
