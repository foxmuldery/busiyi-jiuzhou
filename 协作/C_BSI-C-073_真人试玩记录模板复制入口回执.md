# C_BSI-C-073 真人试玩记录模板复制入口回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过

## 1. 本次目标

P0 还需要真人 5 分钟试玩复盘。此前入口页已能进入各类测试场景，但试玩记录模板仍散落在协作文档里，不适合直接发给测试者。本轮在 `试玩入口.html` 内加入复制模板按钮，让测试者或主线程可以一键复制标准反馈字段。

## 2. 已完成

- `试玩入口.html` build 标记更新为 `20260619-c073`。
- 新增 `复制试玩记录模板` 按钮。
- 点击后复制以下核心字段：
  - 试玩者。
  - 设备/视口。
  - 是否开音乐。
  - 试玩时长。
  - 是否抵达九州裂隙。
  - 是否失败。
  - 第一处卡住。
  - 玩家误解。
  - 玩家觉得像游戏的瞬间。
  - 玩家觉得像网页的瞬间。
  - 最想继续看的内容。
  - 最不清楚的按钮或文字。
  - 本局复盘卡文本。
- 复制成功会在按钮内显示“已复制，可直接发给测试者填写”。
- README 与 QA 合约已同步。

## 3. 边界

- 不改主游戏 UI。
- 不改核心循环。
- 不新增试玩教程层。
- 该按钮只服务 P0 真人试玩反馈收集。

## 4. 涉及文件

- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS playtest launcher contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
