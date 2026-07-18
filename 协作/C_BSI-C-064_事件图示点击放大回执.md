# C_BSI-C-064 事件图示点击放大回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：主线程已验收

## 1. 本次目标

上一轮已经让地点事件和半途路遇有图，但小横屏折叠态只显示很小的缩略图。为了让玩家真正能看见山海经图像细节，本次把“地点图 / 遭遇图”做成可点击入口：主界面保持简洁，点击后进入详情弹窗查看大图和全文。

## 2. 已完成

- `locationArtFrame` 和 `eventArtFrame` 增加 `role="button"`、`tabindex="0"` 和可读 `aria-label`。
- 新增 `bindImagePanelShortcut(node, panel)`：
  - 鼠标或触屏点击地点图，打开地点志详情弹窗。
  - 鼠标或触屏点击遭遇图，打开当前遭遇详情弹窗。
  - 键盘聚焦后按 `Enter` 或空格，也能打开对应详情。
- 图像框增加 `zoom-in` 光标、悬停和键盘聚焦边框反馈。
- 更新静态资源版本号到 `20260619-c064`，避免旧缓存导致点击无反应。
- QA 新增 `image opens detail modal contract`，防止后续改版丢掉这个交互。

## 3. 当前边界

- 弹窗仍复用原有文本详情弹窗，不新增复杂图库系统。
- 当前图片仍是 C063 的临时复用素材；正式事件图由 D 线程后续替换。
- 本次不改路线、资源、补给、事件结算和音乐逻辑。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 5. 验收结果

- 静态语法检查：`node --check app.js` 通过。
- 数据语法检查：`node --check data.js` 通过。
- 原型 QA：`node qa-check.js` 通过，新增 `image opens detail modal contract` 已纳入检查。
- 核心循环 smoke：`node journey-smoke-check.js` 通过。
- 浏览器小横屏验收：`844x390` 下点击遭遇缩略图后，详情弹窗打开并显示同一张遭遇大图。
- 键盘验收：聚焦遭遇图后按 `Enter`，也能打开同一详情弹窗。
- 控制台验收：交互前后无 `error` / `warn`。
- 验收截图：[busiyi-c064-event-image-modal-844x390.png](/private/tmp/busiyi-c064-event-image-modal-844x390.png)
