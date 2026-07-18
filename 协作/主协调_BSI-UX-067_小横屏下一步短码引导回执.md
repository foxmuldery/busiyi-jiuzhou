# 主协调回执：BSI-UX-067 小横屏下一步短码引导

日期：2026-06-24

## 1. 本轮目标

继续提升网页版试玩版的小横屏手游感与可读性。

上一轮已验证路线二次确认能跑通。本轮重点处理一个真实体验细节：

> 顶部“下一步”提示虽然有文字，但在小横屏里空间紧，玩家扫视时不够像手游状态提示。

## 2. 已完成修改

### 2.1 下一步状态短码

已为顶部 `nextStepLabel` 增加短码显示。

当前映射：

| 状态 | 短码 | 含义 |
| --- | --- | --- |
| `event-choice` | 遇 | 处理当前遭遇 |
| `supply` | 补 | 补给一次 |
| `open-map` | 图 | 打开九州图 |
| `pick-route` | 路 | 选择路线 |
| `route-confirm` | 行 | 再点启程 |
| `route-event` | 异 | 处理半途路遇 |
| `crisis` | 危 | 求生补救 |
| `busy` | 等 | 等待落账 |
| `recap` | 录 | 复盘或重开 |
| `review` | 志 | 查看日志/地点志 |

视觉表现：

- 胶囊提示左侧显示一个小圆印记。
- 小横屏下印记缩小，减少占用空间。
- 完整文字仍保留在胶囊内。
- `title` 与 `aria-label` 保留完整提示，方便鼠标悬停、辅助读取和自动验收。

### 2.2 缓存版本

本轮构建标记更新为：

```text
20260624-c153
```

已同步：

- `index.html`
- `试玩入口.html`
- `qa-check.js`

## 3. 自动验收

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

结果：

- 原型 QA 全部通过。
- 完整旅程可抵达九州裂隙。
- 试玩流程检查通过。
- 生成图素材 59/59 ready。
- 首轮优先生成包 12/12 ready。

## 4. 浏览器实测

测试地址：

```text
http://127.0.0.1:4182/GitHub资产区/03_WebDemo/prototype/index.html?fresh=1&verify=c153-next-chip
```

视口：

```text
960x540
```

实测状态链：

```text
初始遭遇：event-choice → 遇
处理遭遇后：supply → 补
补给后：open-map → 图
打开九州图后：pick-route → 路
选中路线后：route-confirm → 行
```

浏览器读取结果：

- `#nextStepLabel` 可见。
- `data-short` 正确变化。
- `::before` 正确显示短码。
- `title` 与 `aria-label` 均等于完整下一步提示。
- 控制台无 error / warn。

## 5. 意义

这个改动不是大功能，但能让顶部状态更像手机游戏 HUD：

- 玩家不必读长句，也能扫到当前要做什么。
- 路线二次确认的“再点启程”更明确。
- 后续如果继续压缩 UI，短码可以保留为主要提示，文字可以进一步缩短或折叠。

## 6. 下一步

建议下一轮继续推进两个方向之一：

1. 真实接入《山野逸事》第三部小批资料，跑一次“AI 追问 → 内容协作者确认 → 游戏事件转译”闭环。
2. 继续打磨试玩版首 5 分钟的手机观感：减少文字面板占比，强化弹窗、状态飘字、音乐反馈和路线图节奏。
