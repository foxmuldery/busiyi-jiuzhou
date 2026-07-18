# C_BSI-C-030 路线图结构 QA 补强回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-17  
> 范围：只增强本地 QA 脚本的数据断链检查；不改玩法、不改路线、不改数值。

## 本轮最小改动

更新文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

新增 QA 检查：

- 路线 ID 不重复。
- 每条路线的 `from / to` 地点存在。
- 每个地点引用的 `event` 存在。
- 每条路线引用的 `midEvent` 存在。
- `startLocation` 存在。
- 终点 `kyushu_rift` 存在。
- 从起点可以抵达 `kyushu_rift`。
- 所有地点都能从起点抵达。
- 除终点外，没有无后续路线的死路地点。

## 本轮执行结果

已通过：

```text
PASS game data loaded
PASS route ids unique
PASS route endpoints exist
PASS location events exist
PASS route event references exist
PASS start location exists
PASS target location exists
PASS target reachable from start
PASS all locations reachable from start
PASS no non-target route dead ends
PASS choice budget <= 4
PASS supply budget <= 4
PASS route budget <= 4
INFO max choices: red_bones 4
INFO max supplies: central_post 2
INFO max routes: old_king_road 4
PASS referenced media files exist
INFO media refs: 46
PASS music loop configured
PASS sanity audio layer configured
PASS audio statuses are temporary/review states
PASS location verses covered
PASS event verses covered
PASS route event verses covered
PASS crisis verses covered
PASS ending verses covered
PASS hud audio button contract
PASS text modal contract
PASS drawer contract
PASS debug ui state helpers
PASS compact no-scroll policy

All prototype QA checks passed.
```

同时通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js
```

## 后续约束

- 后续新增地点或路线时，必须先跑 `qa-check.js`，确认不会出现断点、孤点或无法抵达裂隙。
- 如果未来设计需要真正的“死路”或“回头路”，要在数据中显式标记，不要让 QA 把无后续路线误判为缺陷。
