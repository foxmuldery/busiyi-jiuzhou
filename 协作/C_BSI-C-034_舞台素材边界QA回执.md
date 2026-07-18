# C_BSI-C-034 舞台素材边界 QA 回执

## 任务目标

把横向旅途舞台的素材边界纳入命令行 QA，防止后续继续导入图片时出现路径断裂、profile 引用失效，或“背景图里带车队 / 车队素材放错层”的问题。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectStageAssetProblems()`：
  - 检查 `stageAssets.map.background` 存在。
  - 检查 `stageAssets.profiles.default` 存在。
  - 按 `default + 当前 profile` 合并后的最终舞台配置检查必需层。
  - 检查 `background`、`foreground`、`atmosphere`、`pollution` 不应引用车队素材。
  - 检查 `caravan` 层应引用车队素材。
  - 检查 `terrainProfiles` 和 `locationProfiles` 都引用真实 profile。
  - 检查每个地点都有地点插图，且插图不引用不存在的地点。
  - 检查失败图、结局图不误用车队素材。
- 新增 QA 项：
  - `stage asset references valid`

## 当前验证结果

通过。

当前舞台素材结构符合：

- 背景、前景、气氛、神志污染层没有引用车队素材。
- 车队素材只在 `caravan` 层出现。
- 地点、地形、profile 映射均有效。
- 地图底图、地点插图、失败图、结局图引用有效。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 固化了用户已明确的素材边界：生成背景图不应该带车队，车队应作为前景独立图层在 Web Demo 中行走。

下一步建议：

1. 继续补 UI/小横屏可读性检查，或
2. 补音频资产状态边界：正式可用、待复核、Demo 临时三类状态不得混淆。
