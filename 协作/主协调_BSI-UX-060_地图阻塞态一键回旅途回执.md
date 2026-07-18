# 主协调 BSI-UX-060 地图阻塞态一键回旅途回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 九州图阻塞态、当前遭遇弹窗、触屏回旅途入口、自动验收

## 1. 用户要求

继续提升试玩完成感：

1. 玩家打开地图后，如果当前遭遇未处理，要明确知道为什么不能走。
2. 玩家应该能从地图页快速回到具体城镇/遭遇页。
3. 地图阻塞态不能像网页一样让玩家迷路。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 九州图路线预览条改为真实 `button`，阻塞态可直接点击回旅途。
- 当前遭遇、半途路遇、困厄等阻塞态会给预览条设置 `data-action="return-town"`。
- 阻塞预览条文案改为“点此回旅途，处理……”，不是只展示静态说明。
- 地图页不再被当前遭遇弹窗自动覆盖；遭遇弹窗只在旅途页自动打开。
- 从地图页点击阻塞预览条回旅途后，会回到旅途页并自动打开当前遭遇弹窗。
- 缓存版本更新到 `20260621-c144`。
- QA 增加地图阻塞态返回入口与“地图页不自动弹遭遇”的契约。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=map&verify=c144-blocked-map-return-3`

目标流程：

`新局直接打开地图 -> 当前遭遇未处理 -> 点击地图预览条 -> 回到旅途页 -> 自动打开当前遭遇弹窗`

浏览器 DOM / 交互验收结果：

- 初始为 `body[data-view="map"]`。
- 地图页显示，旅途页隐藏。
- 当前遭遇弹窗隐藏，没有遮挡地图页。
- `mapRoutePreview` 为真实 `BUTTON`。
- `mapRoutePreview[data-action="return-town"]`。
- 预览条文案为：`遇 遭遇未决 点此回旅途，处理「驿门未闭」`。
- 命中测试显示点击区域落在预览条内部，不再命中弹窗。
- 点击预览条后：
  - `body[data-view="town"]`
  - 旅途页显示，地图页隐藏。
  - 当前遭遇弹窗打开。
  - 弹窗标题为 `驿门未闭`。
  - 下一步状态为 `event-choice`。
  - 切换提示为：`遇 / 回到停靠 / 中原驿 · 先处理当前遭遇。`
- 页面横向溢出为 0。
- 浏览器日志无 error / warn。

说明：本轮中途真实点击验收发现原先地图页被当前遭遇弹窗遮挡，导致预览条无法实际点击；已修复并复测通过。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/README.md`

## 5. 结论

BSI-UX-060 已完成。玩家在地图页看到“遭遇未决”时，可以直接点击预览条回到旅途页处理遭遇，首分钟地图阻塞态更清晰，不再像卡住。
