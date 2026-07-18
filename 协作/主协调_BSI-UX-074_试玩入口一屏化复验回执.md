# 主协调回执：BSI-UX-074 试玩入口一屏化复验

日期：2026-06-24

## 1. 本轮目标

`BSI-UX-073` 新增声音状态后，试玩入口右侧状态区变高。为了保证测试入口能真正发给外部试玩者，本轮把入口页压缩成 P0 一屏启动器，并用真实浏览器截图复验。

## 2. 已调整

- 低高度桌面下，入口按钮改为双列紧凑布局。
- 横屏手机尺寸下，右侧只保留 P0 测试需要的核心状态：画面素材、声音状态、机制平衡。
- 横屏手机隐藏高频重生图维护入口、右侧维护链接和长说明，避免把启动器撑成后台面板。
- 音乐入口文案从“五首核心候选”修正为“六首核心候选”。
- QA 增加入口压缩规则守门。

## 3. 浏览器复验

使用 Chromium 实际打开：

`http://127.0.0.1:4183/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html?verify=c159c`

截图证据：

- `output/playwright/launcher-desktop-c159b.png`
- `output/playwright/launcher-landscape-c159c.png`

复验指标：

- 1365x768：页面高度为 768，入口面板和状态面板都在首屏内。
- 844x390：页面高度为 390，入口面板、声音状态、机制平衡都在首屏内。

## 4. 自动验证

- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- `node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report`：通过。
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。

## 5. 结论

试玩入口现在可以作为 P0 外部测试启动器使用：玩家能一屏看到开始新局、地图、音乐试听、复盘、低资源压力场景、复制测试链接、复制反馈模板、复制听感模板，以及画面/声音/平衡状态。
