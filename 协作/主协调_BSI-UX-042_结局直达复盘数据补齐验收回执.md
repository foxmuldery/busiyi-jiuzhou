# BSI-UX-042 结局直达复盘数据补齐验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已把“复盘本局”和“查看日志”分流，但结局直达测试入口仍像空壳状态：复盘里会出现事件、补给、路遇统计不足的问题。本轮将 `ending=rift` 直达入口补成一条完整演示通关记录，方便快速验 UI 和给外部 AI/子线程同步时展示真实完成感。

## 已完成

1. 新增演示通关路线：`中原驿 -> 故王道 -> 无名祠 -> 黑齿市 -> 巫咸断碑 -> 九州裂隙`。
2. 结局直达状态会自动补齐：
   - 显影地点：6
   - 行过路线：5
   - 地点事件：6
   - 半途路遇：4
   - 补给记录：6
   - 当前资源：车轴 61 / 粮草 85 / 神志 63
   - 最低资源：车轴 54 / 粮草 60 / 神志 53
3. 日志开头加入“演示复盘”记录，避免测试入口看起来像未游玩存档。
4. 页面缓存版本更新至 `app.js?v=20260621-c122`。
5. QA 合约增加演示结局状态构造检查。

## 修改文件

- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/qa-check.js`

浏览器验收：

- 视口：`960 x 540` 横屏。
- 测试入口：`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&view=town`
- 点击“复盘本局”后，中央弹窗显示：
  - `第 6 日 · 显影 6 处 · 行过 5 段路。`
  - `互动：事件 6 · 路遇 4 · 补给 6 · 补救 0。`
  - `当前资源：轴61 / 粮85 / 神63。`
  - `最低压力：轴54 / 粮60 / 神53，最低项为 神志 53。`
- 点击“完整日志”后打开右侧“行旅日志”，日志前三条为结局、演示复盘、第 6 日记录。
- 页面无横向溢出，控制台无 error / warn。

## 后续建议

1. B 线程可继续把演示复盘文字压成更像“简牍结算”的短文案。
2. D 线程可把复盘中的数值行做成更像结算章印的图标化布局。
3. C 线程后续可为 `ending=return` 补另一条折返演示路线。
