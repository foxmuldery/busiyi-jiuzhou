# C_BSI-C-035 音频 Hook 引用 QA 回执

## 任务目标

把 Web Demo 中动作音效入口纳入命令行 QA，防止后续新增或替换音频时出现 `audioHooks` 指向不存在音频 key 的问题。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 `collectAudioHookProblems()`：
  - 检查必需 hook 是否存在：
    - `mapOpen`
    - `mapReveal`
    - `locationArrive`
    - `routeSelect`
    - `supplyComplete`
  - 检查每个 `audioHooks.*` 都指向真实存在的 `audioAssets.*`。
  - 检查每个音频资产是对象，并具备基础字段 `id/name/type`。
  - 检查 `loop` 是布尔值，`volume` 是数字。
- 新增 QA 项：
  - `audio hook references valid`

## 当前验证结果

通过。

当前以下入口均能找到音频资产：

- 打开地图。
- 迷雾显影。
- 抵达地点。
- 选择路线。
- 补给完成。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js 协作/C_BSI-C-034_舞台素材边界QA回执.md 协作/不思异九州_任务交接台账.md
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 保护的是“已经导入的音乐音效能被游戏入口正确找到”，不涉及正式授权判断；音频仍按 `demo-temporary` / `review-pending` 状态区分，不得误标为正式可用。

下一步建议继续做小横屏 UI 验收，或补“低神志音频层/告急音效”的触发契约检查。
