# 主协调 BSI-UX-058 触屏弹窗防误触与轻点继续回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 遭遇弹窗、结果弹窗、地点/遭遇图鉴回看、自动验收

## 1. 用户要求

延续横屏手机试玩方向：

1. 不再依赖可见“关闭”按钮。
2. 默认轻点弹窗即可关闭或进入下一页。
3. 但有剧情选择时，不能因为误点正文或空白导致选项消失。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 弹窗新增 `data-tap-mode`：
  - `choices`：有选择项时，点正文/背景不会关闭弹窗，必须点选项。
  - `continue`：结果页可点正文、背景或“轻点继续”继续。
  - `close`：地点志、图鉴回看可点正文、背景或“轻点返回”关闭。
- 打开地点图鉴、遭遇图鉴时会清理旧结果区和旧选择区，避免从结果页跳转后残留。
- 有选择项时光标不再提示“可关闭”，降低误触预期。
- 缓存版本更新到 `20260621-c142`。
- README 增加触屏弹窗规则说明。
- QA 增加触屏弹窗模式契约。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c142-touchmodal`

目标流程：

`新局地点遭遇弹窗 -> 点正文误触 -> 点第一个选项 -> 结果弹窗 -> 点正文继续`

浏览器 DOM / 交互验收结果：

- 初始遭遇弹窗为 `tapMode=choices`。
- 初始遭遇弹窗有 2 个选项。
- 可见关闭按钮样式为 `display:none`。
- “轻点继续”在选择态隐藏。
- 点正文后弹窗仍然打开，选项仍为 2 个。
- 点第一个选项后进入结果页，`tapMode=continue`。
- 结果页选项数为 0，结果区显示，提示为“轻点继续”。
- 点结果正文后弹窗关闭。
- 页面横向溢出为 0。
- 浏览器日志无 error / warn。

说明：截图接口本轮仍然超时；本次以 DOM、实际点击状态、控制台日志、自动测试作为验收依据。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/README.md`

## 5. 结论

BSI-UX-058 已完成。弹窗现在更接近横屏手机游戏的轻点继续体验，同时避免玩家在有选项时误点正文导致弹窗消失。
