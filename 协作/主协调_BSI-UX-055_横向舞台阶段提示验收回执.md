# 主协调 BSI-UX-055 横向舞台阶段提示验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 横向旅途舞台、下一步提示、九州图切换、自动验收

## 1. 目标

继续把试玩版从“机制能跑”推进到“玩家一眼能读懂当前层级”。  
本轮为横向风景舞台增加轻量阶段提示，让玩家不用读长段说明，也能知道当前是在停靠、补给、开图、选路、行路、半途路遇、困厄还是结局。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 新增 `#stagePhaseCard`，位于横向舞台左上角。
- 新增阶段状态逻辑：
  - `event`：停靠 / 当前遭遇
  - `supply`：补给 / 地利未取
  - `route-ready`：可开图 / 打开九州图选择下一站
  - `route-pick`：选路 / 路线显现
  - `traveling`：行路 / 当前路线
  - `route-event`：半途路遇 / 被路遇打断
  - `crisis`：困厄 / 求生补救
  - `ending`：结局 / 复盘
- 视图切换时同步刷新阶段数据，方便地图状态和 QA 读取。
- 小横屏下阶段牌压缩到 238px 左右，长提示省略，不压住风景主体。
- QA 增加 `stage phase hint contract`，防止后续 UI 改动漏掉阶段提示。
- 缓存版本更新到 `20260621-c139`。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c139-stagephase`

浏览器 DOM 验收结果：

| 状态 | 阶段 | 图标 | 标题 | 详情 | 结果 |
|---|---|---|---|---|---|
| 初始停靠 | `event` | 遇 | 停靠 | 中原驿 · 驿门未闭 | 通过 |
| 处理遭遇后 | `supply` | 补 | 补给 | 中原驿 · 地利未取 | 通过 |
| 补给完成后 | `route-ready` | 图 | 可开图 | 打开九州图选择下一站 | 通过 |
| 打开九州图 | `route-pick` | 图 | 选路 | 2 条路线显现 | 通过 |
| 确认路线后 | `route-event` | 停 | 半途路遇 | 中原驿 → 故王道 · 当康啼垄 | 通过 |

附加验收：

- 页面标题正确：`不思异：九州 Web Demo 原型`
- 阶段牌在舞台内可见。
- 横向溢出：0。
- 纵向溢出：0。
- 浏览器日志无 error / warn。

说明：浏览器截图接口本轮仍超时并重置浏览器自动化内核；本次采用 DOM、样式尺寸、控制台日志和自动测试作为验收证据。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

## 5. 结论

BSI-UX-055 已完成。横向风景舞台现在有了更清晰的“当前阶段”锚点，能帮助真人试玩者更快理解：现在是看风景停靠、补给、开图选路，还是被半途路遇打断。
