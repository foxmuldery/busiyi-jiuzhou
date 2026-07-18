# 主协调 BSI-UX-059 旅途九州图切换反馈回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 旅途 / 九州图切换、全局轻提示、视图切换音效、自动验收

## 1. 用户要求

继续提升试玩完成感：

1. 主页面参考 Out There 与西行车队式横屏体验。
2. 旅途页和九州地图页之间的切换要更像游戏状态变化，而不是网页标签切换。
3. 音乐、画面、UI、机制都要向完整可玩试玩版推进。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 新增全局 `viewSwitchToast`，放在横屏游戏画面层，不依赖城镇舞台，因此地图页和旅途页都能显示。
- 切到九州图时显示“九州图已展”，并根据当前状态提示可预览路线或需要先处理停靠。
- 切回旅途时显示“回到停靠 / 回到半途 / 回到旅途”等短提示。
- 切到地图沿用 `mapOpen` 音效钩子；从地图回旅途增加轻量 `select` 音效。
- 支持减少动态设置：减弱动效时提示静态短显，不做飞行动画。
- 缓存版本更新到 `20260621-c143`。
- QA 增加视图切换反馈契约。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c143-view-switch`

目标流程：

`打开新局旅途页 -> 点击地图 -> 查看切换提示 -> 点击旅途 -> 查看切换提示 -> 等待提示自动消失`

浏览器 DOM / 交互验收结果：

- 页面标题为 `不思异：九州 Web Demo 原型`。
- 初始为 `body[data-view="town"]`，旅途页显示，地图页隐藏。
- 点击“地图”后：
  - `body[data-view="map"]`
  - 地图页显示，旅途页隐藏。
  - `viewSwitchToast` 显示。
  - 提示文案为：`图 / 九州图已展 / 雾未散开，先处理当前停靠。`
  - 页面横向溢出为 0。
  - 浏览器日志无 error / warn。
- 点击“旅途”后：
  - `body[data-view="town"]`
  - 旅途页显示，地图页隐藏。
  - `viewSwitchToast` 显示。
  - 提示文案为：`遇 / 回到停靠 / 中原驿 · 先处理当前遭遇。`
  - 页面横向溢出为 0。
  - 浏览器日志无 error / warn。
- 等待后 `viewSwitchToast.hidden === true`，不会永久遮挡 UI。

说明：截图接口本轮仍然超时；本次以 DOM、实际点击状态、控制台日志、自动测试作为验收依据。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/README.md`

## 5. 结论

BSI-UX-059 已完成。旅途 / 九州图切换现在有轻量视觉与声音反馈，玩家能更明确感到自己进入了战略地图或回到停靠场景。
