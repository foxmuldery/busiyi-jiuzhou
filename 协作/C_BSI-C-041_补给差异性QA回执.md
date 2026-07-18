# C_BSI-C-041 补给差异性 QA 回执

## 任务目标

把“每个城市资源不一样”的设计要求纳入命令行 QA，避免后续新增地点时补给逐渐变成同质化按钮。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectSupplyDiversityProblems()`。
- 新增 QA 项：
  - `supply diversity valid`

## 当前检查内容

- 每个地点必须有 `supplies` 数组。
- 每个地点至少有一个补给选项。
- 每个补给必须产生真实资源变化，不能三资源全为 0。
- 同一地点内不能出现完全重复的补给效果。
- 每个地点的补给必须至少有一个正向资源收益。
- 全地图补给画像不能少于 3 类。
- 全地图必须覆盖三类主要收益地点：
  - 车轴收益。
  - 粮草收益。
  - 神志收益。

## 当前验证结果

通过。

说明当前补给结构已经能形成基本策略差异：

- 有偏修车的地点。
- 有偏粮草的地点。
- 有偏神志恢复的地点。
- 也有以一种资源换另一种资源的交易型补给。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 直接保护用户此前明确的选择性要求：不同城市补给资源必须有区分，不能所有地点都只是“加粮/加水”式同质化补给。

下一步建议补“路线资源预览契约”：地图路线卡必须继续展示车轴、粮草、神志消耗，以及目的地可观察补给倾向。
