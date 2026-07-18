# C_BSI-C-056 里程反馈与成就感浮层回执

日期：2026-06-18
子线程：C 技术原型与工具链
任务类型：P0 体验完成度 / 成就感反馈

## 1. 目标

让玩家在首次抵达新地点、九州图显影、收录新结局时，获得明确的即时反馈。此前这些信息主要写在日志里，玩家不一定能感受到“我推进了世界、拿到了见闻”。

## 2. 已完成改动

- `app.js` 新增轻量里程反馈：
  - `queueMilestoneAlert()` 统一触发舞台浮层。
  - 首次发现地点时记录 `见闻 x/14`。
  - 新路线/雾中城影显影时合并进同一条里程浮层。
  - 新结局首次收录时提示 `结局收录`。
- `styles.css` 新增 `.stage-alert.tone-milestone`，与原有资源/路遇反馈共用舞台浮层系统。
- `qa-check.js` 新增 `milestone feedback contract`，防止后续误删。

## 3. 验证结果

命令检查已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js
```

新增 QA：

- `milestone feedback contract` 通过。

浏览器复验：

- 内置浏览器默认窗口：
  - 页面可打开。
  - `stageAlertLayer` 存在。
  - 控制台错误/警告为 `0`。
  - 页面无横向/纵向溢出。
- Playwright 844x390：
  - 路径：`中原驿 -> 绕向废关 -> 半途路遇 -> 废关`。
  - 触发浮层：`见闻 2/14 · 废关 入志 · 新路 3 条`。
  - 同屏结果浮层：`废关 · 路遇已过`。
  - `alertCount=2`，不再出现三条并排过载。
  - 横向/纵向溢出为 `false`。
  - 截图：[busiyi-c056-milestone-844x390.png](/Users/yuanzhe/Documents/game/output/playwright/busiyi-c056-milestone-844x390.png)

## 4. 边界

- 本轮不是完整成就系统，不新增成就列表、奖章收藏或长期目标面板。
- 本轮不改资源、路线、随机、结局逻辑。
- 里程文案仍是内部试玩版短文案，后续可由 B/D 线程统一润色。

## 5. 主线程验收结论

通过。玩家在推进地图和见闻时会得到明确、短暂、非阻塞的成就感反馈；小横屏验证无溢出，且浮层数量已压缩到可接受的两条。
