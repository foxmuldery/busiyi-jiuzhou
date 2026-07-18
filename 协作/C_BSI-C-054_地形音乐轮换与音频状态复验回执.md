# C_BSI-C-054 地形音乐轮换与音频状态复验回执

日期：2026-06-18
子线程：C 技术原型与工具链
任务类型：音频体验补强 / P0 验收补证

## 1. 目标

把音乐从“只有一个播放入口”推进到“会随当前地点地形切换的体验层”。本轮只做 Web Demo 内部试玩接入，不升级任何素材授权状态。

## 2. 已完成改动

- `data.js` 新增两首地形音乐候选：
  - `MUS-CORE-003` 水泽夜行，用于水泽/湿地路线。
  - `MUS-CORE-004` 废墟边境，用于废关/边境/裂隙路线。
- `data.js` 新增 `musicProfileByTerrain`：
  - `road/default` 使用 `MUS-CORE-001`。
  - `water` 使用 `MUS-CORE-003`。
  - `market/rift` 使用 `MUS-CORE-004`。
- `app.js` 新增当前地形音乐选择逻辑：
  - 地形变化时只保留当前地形对应音乐，暂停其它长音乐。
  - 神志污染层仍然按神志状态叠加。
  - 音频详情会显示当前音乐和“场景轮换：地形 · 候选数”。
- `qa-check.js` 新增 `contextual music profile configured` 检查：
  - 至少 3 首音乐候选。
  - 地形映射都能找到真实音频资源。
  - `default` 必须回落到 `musicLoop`。

## 3. 验证结果

命令检查已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
```

关键结果：

- QA 全部通过，媒体引用数为 `48`。
- 新增检查 `contextual music profile configured` 通过。
- 完整 smoke 仍可抵达 `kyushu_rift`。
- `novice` 失误玩家 1000 局成功率 `100%`，前 3 步失败 `0`。

浏览器与 Playwright 复验：

- 初始 `中原驿 / road`：当前音乐为 `MUS-CORE-001`，详情显示 `场景轮换：古道 · 3 首候选`。
- 切到 `雷泽浅畔 / water`：当前音乐为 `MUS-CORE-003`，详情显示 `场景轮换：水泽 · 3 首候选`。
- 切到 `九州裂隙 / rift` 且神志 20：当前音乐为 `MUS-CORE-004`，详情显示 `场景轮换：裂隙 · 3 首候选`。
- 点击播放后，`musicBorder` 播放中，`sanityLow` 污染层同步播放；控制台错误/警告为 `0`。

## 4. 边界与风险

- `MUS-CORE-001/003/004` 仍是 `review-pending` / 待主观试听素材，不代表正式授权完成。
- 本轮未裁切事件长音乐，也未接入事件专用音乐段。
- 本轮未做主观听感判断，只验证播放逻辑、地形轮换和状态可读。
- 正式发布前仍需 F 线程完成试听、授权留痕和音量复核。

## 5. 主线程验收结论

通过 P0 内部试玩接入验收。音频缺口从“入口可点但只有单曲”推进为“可随地形轮换的临时音乐层”。下一步不再优先改音频代码，应先由 F 线程做主观试听与授权状态收口。
