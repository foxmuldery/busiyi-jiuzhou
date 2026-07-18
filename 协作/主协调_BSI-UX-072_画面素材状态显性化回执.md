# 主协调回执：BSI-UX-072 画面素材状态显性化

日期：2026-06-24

## 1. 本轮目标

把已经完成的图像素材状态在试玩入口里显性化，避免后续发给测试者或协作者时还需要口头说明“哪些图已经 ready、哪些高频图已替换”。

## 2. 已确认状态

- 全量生成图：`59/59 ready`
- 高频重生图：`11/11 replaced`
- 高频图缺口：`0`
- 高频图占位：`0`

## 3. 改动

- `试玩入口.html`：
  - 构建号推进到 `20260624-c158`。
  - `generated-art-status.js` 与 `visual-replacement-status.js` 缓存号推进到 `20260624-c158`。
  - 右侧状态卡改为“画面素材状态 / 画面素材已就绪”，更适合非技术测试者理解。
- `index.html`：
  - 静态资源缓存号推进到 `20260624-c158`。
- `qa-check.js`：
  - 更新缓存号守门。
  - 新增入口页“画面素材状态 / 画面素材已就绪”文案守门。
- `README.md` 与总体推进计划：
  - 同步记录 `59/59 ready` 与 `11/11 replaced`。

## 4. 验收

已运行：

```text
node GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-report
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

结果：

- 高频重生图替换检查通过：`replaced 11/11, placeholder 0, missing 0, invalid 0`
- 生成图素材就绪检查通过：全量 `59/59 ready`

补充验收：

```text
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
```

结果：

- 原型 QA 通过。
- 试玩流程检查通过，并刷新 `playtest-flow-status.md`。
- QA 脚本语法检查通过。
