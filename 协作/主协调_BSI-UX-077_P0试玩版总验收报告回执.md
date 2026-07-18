# 主协调 BSI-UX-077 P0 试玩版总验收报告回执

日期：2026-06-24

## 1. 目标

把 P0 试玩版从“多个检查分散通过”推进到“一个总报告能看清当前是否可发测、还缺什么”。

本轮不改游戏玩法，只建立总验收脚本和报告。

## 2. 已完成

- 新增 `p0-readiness-check.js`。
- 新增 `p0-readiness-status.js`，供试玩入口首屏读取总验收状态。
- 新增 `P0试玩版总验收报告.md`。
- 新增 `P0试玩版总验收报告.html`。
- 试玩入口新增 “P0 总验收” 状态卡和报告链接。
- README、总体推进计划、任务交接台账和资产清单已同步。
- QA 已新增 P0 总验收报告、状态 JS 和入口状态卡守门。

## 3. 当前总验收结论

```text
P0 机器验收通过，待真人确认；机器验收 6/6；待人工 2；需处理 0
```

机器已通过：

- 总 QA 守门。
- 自动试玩链。
- P0/P1 平衡门槛。
- 全量试玩图。
- 高频事件图替换。
- 测试者交付入口。

待人工确认：

- 声音主观听感。
- 真人 5 分钟试玩。

## 4. 使用方式

```text
node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report
```

生成：

```text
GitHub资产区/03_WebDemo/prototype/p0-readiness-status.js
GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.md
GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.html
```

## 5. 边界

- 机器验收 6/6 只说明内部 P0 候选稳定，不等于正式发布完成。
- 音频仍含 `review-pending` 和 `demo-temporary`，不得标为正式素材。
- 必须至少回收 1 份真人 5 分钟试玩记录，才能判断玩家是否真的看懂下一步、感到资源压力、愿意再走一站。

## 6. 文件

- `GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js`
- `GitHub资产区/03_WebDemo/prototype/p0-readiness-status.js`
- `GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.md`
- `GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `协作/不思异九州_总体推进计划.md`
- `协作/不思异九州_任务交接台账.md`
- `GitHub资产区/00_同步台账/资产清单.md`
