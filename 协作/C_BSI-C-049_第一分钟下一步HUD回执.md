# C_BSI-C-049 第一分钟下一步 HUD 回执

日期：2026-06-18
线程：C 技术原型
目标：减少新玩家第一分钟迷路，让玩家始终知道当前最该做的下一步。

## 1. 本轮改动

- 在顶部旅程 HUD 增加 `nextStepLabel`，以小胶囊形式显示“下一步”。
- 根据当前状态自动切换提示：
  - 遭遇未处理：`下一步：处理当前遭遇`
  - 遭遇处理后且有补给：`下一步：补给一次，再开地图`
  - 地图页有可选路线：`下一步：选择一条显现路线`
  - 半途路遇：`下一步：处理半途路遇`
  - 濒死补救：`下一步：先处理濒死补救`
  - 终局：`下一步：查看日志或重开`
- 小横屏下将“西行进度 + 距裂隙段数”合并为一行，避免下一步胶囊被裁切。
- QA 脚本新增 `first minute next-step hud contract`，防止后续 UI 回退。

## 2. 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 3. 自检结果

已通过：

```text
node --check app.js
node --check data.js
node --check qa-check.js
node qa-check.js
node journey-smoke-check.js
node balance-sim.js --runs 1000 --seed p0 --strategy novice
```

关键结果：

- QA 全部通过。
- 完整 smoke 路径仍可抵达 `kyushu_rift`。
- novice 1000 局通关率 `100%`，前 3 步失败 `0`。
- 本轮没有改动数值，只改 UI 引导。

## 4. 浏览器验证

测试 URL：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/
```

小横屏 844x390：

- 首屏 `nextStepLabel` 可见。
- 无页面级横向/纵向滚动：`scrollWidth=844`，`scrollHeight=390`。
- 重开后地点为 `中原驿`，提示为 `下一步：处理遭遇`。
- 点击第一个遭遇选择后，提示变为 `下一步：补给一次`。
- 切到地图页后，提示变为 `下一步：选一条路`。
- 地图页可选路线 `2` 条，地图节点 `5` 个。
- 控制台错误/警告：`0`。

桌面 1365x768：

- `nextStepLabel` 可见。
- `distanceLabel` 正常显示完整距离文字。
- 无页面级横向/纵向滚动：`scrollWidth=1365`，`scrollHeight=768`。
- 控制台错误/警告：`0`。

截图说明：

- 本轮已通过 in-app browser 回显桌面 1365x768 与小横屏 844x390 两张截图。
- 浏览器运行时写入本地截图文件时被权限拦截，因此本回执不伪造本地截图路径。

## 5. 主线程判断

`P0-UX-002 新玩家第一分钟引导` 已从高风险降为中风险：

- 玩家不再只能从大段文字中推断下一步。
- 旅途页、事件处理后、地图页三种关键状态都有顶部持续提示。
- 后续仍需要做一次真人试玩，确认提示是否足够自然、不打扰画面。
