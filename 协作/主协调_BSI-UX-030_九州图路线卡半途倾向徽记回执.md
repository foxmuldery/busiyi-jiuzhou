# BSI-UX-030 九州图路线卡半途倾向徽记回执

日期：2026-06-21

## 目标

把 BSI-UX-029 的半途资源倾向信号同步到九州图路线卡，让玩家在战略选路阶段就能看到“这条路线的半途路遇偏什么资源、主要风险是什么”，而不是出发后才知道。

## 已完成

- 新增 `getRouteSignalForRoute()`：路线卡复用半途路遇信号算法。
- 新增 `renderRouteSignalBadge()`：在路线卡标题旁显示小徽记。
- 桌面/大视口显示短标签，例如 `偏粮/轴险`。
- 小横屏压缩为单个圆形图标，避免路线卡变挤。
- 路线卡按钮写入：
  - `data-event-tone`
  - `data-event-threat`
- 徽记保留 title / aria-label，例如：`当康啼垄：偏粮草，风险车轴`。
- 更新缓存号到 `20260621-c108`。

## 涉及文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 验收结果

自动检查通过：

- `node --check app.js`
- `node --check qa-check.js`
- `node qa-check.js`
- `route preview contract` 已覆盖路线卡倾向徽记。

浏览器复验通过：

- 测试尺寸：900 x 500 横屏
- 测试路径 1：开局 -> 轻点继续 -> 打开九州图
  - `central_to_road`：`tone = grain`，`threat = axle`
  - 徽记 title：`当康啼垄：偏粮草，风险车轴`
  - 小横屏可视宽度约 18px，只显示圆形图标，不撑开路线卡。
- 测试路径 2：点击旧王道 -> 半途路遇
  - 舞台行程条仍为 `stageTone = grain`
  - `stageThreat = axle`
  - 弹窗标题为 `当康啼垄`
  - console 无 error / warn

测试页面：

`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-card-signal-c108-map-1782015961332`

## 下一步建议

- D：把路线卡徽记和半途点徽记统一成同一套正式图标。
- C：下一步可以把路线卡的“风险 / 补给 / 路遇”三组信息进一步合并成更 Out There 式的符号行。
- B/A：后续新路遇应继续保持资源倾向清楚，否则路线卡会落到“异象”兜底。
