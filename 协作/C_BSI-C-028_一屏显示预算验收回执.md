# C_BSI-C-028 一屏显示预算验收回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-17  
> 范围：只验证“所有选择项一次性显示完，不依赖拖动条”的当前数据与布局边界；不改事件文本、不改路线逻辑。

## 本轮最小结论

当前第一章数据没有超过横屏布局预算：

```text
maxChoices: red_bones / 赤水岸骨 / 4
maxSupplies: central_post / 中原驿 / 2
maxRoutes: old_king_road / 故王道 / 4
overChoiceBudget: 0
overSupplyBudget: 0
overRouteBudget: 0
```

因此当前规则可写死为：

- 单个剧情/路遇/困厄事件：最多 4 个选择。
- 单个地点补给：当前最多 2 个，后续建议不超过 4 个。
- 单个地点可见路线：最多 4 条。

## 本轮最小改动

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`

落地内容：

- 小横屏补给区残留的 `scrollbar-width: thin` 改为 `scrollbar-width: none`。
- 这只是消除拖动条口径不一致，不改变补给卡数量和布局。

## 已完成自检

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/styles.css
```

一屏预算脚本已通过：

```text
overChoiceBudget: []
overSupplyBudget: []
overRouteBudget: []
```

## 后续约束

- B 线程后续新增事件时，单事件选择项默认不得超过 4 个。
- C 线程后续新增可见路线池时，单地点首屏路线默认不得超过 4 条。
- 若未来某地必须超过 4 个补给或路线，应改为“分页/切换分类”，而不是在主操作区加滚动条。
