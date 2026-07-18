# C_BSI-C-065 日志见闻图鉴与地点回顾回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：主线程已验收

## 1. 本次目标

P0 试玩版已经能显示地点图和事件图，但探索成果主要散落在日志文字里。本次在“行旅日志”抽屉加入“见闻图鉴”，让玩家能看到已抵达地点的图像缩略图，并回看地点志大图和说明，增强《山海经》远行探索的成就感。

## 2. 已完成

- 在日志抽屉的本局复盘卡下新增 `见闻图鉴`。
- 图鉴只展示本局已经抵达并收入见闻的地点。
- 每个图鉴卡显示地点缩略图、地点名和地形类型。
- 点击图鉴卡可打开地点回顾弹窗：
  - 弹窗标题为地点名。
  - 弹窗显示该地点的大图、诗引和地点志。
  - 不改变玩家当前所在地点，不影响路线、补给、事件结算。
- 新增 `renderDiscoveryGallery()` 与 `openLocationMemory(locationId)`。
- QA 新增 `discovery gallery contract`，防止后续改版丢掉图鉴入口。
- 静态资源版本号更新到 `20260619-c065`。

## 3. 当前边界

- 当前图鉴使用现有地点图素材，正式地点图仍需 D 线程后续替换。
- 图鉴暂不显示未发现地点的灰格，以免增加小横屏抽屉密度。
- 图鉴是回顾/成就层，不参与数值结算。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 5. 主线程验收结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS discovery gallery contract`。
- `node journey-smoke-check.js`：通过。
- 浏览器小横屏验收：通过。
  - 预览入口：`http://127.0.0.1:8792/03_WebDemo/prototype/index.html?verify=c065-http`
  - 验收尺寸：`844 x 390`
  - 打开“志”抽屉后，`见闻图鉴` 显示 `1 / 14`，首张卡为 `中原驿 / 古道`，缩略图加载正常。
  - 点击 `中原驿` 图鉴卡后，地点回顾弹窗打开，标题、地点志、诗引和地点大图均加载正常。
  - 页面无横向溢出、无纵向溢出，控制台无 error/warn。
- 截图证据：
  - `/private/tmp/busiyi-c065-discovery-gallery-844x390.png`
  - `/private/tmp/busiyi-c065-discovery-modal-844x390.png`

## 6. 继续观察

- 当前图鉴只显示已发现地点，不显示未发现灰格；如果后续要强化收集欲，可以由 D 线程设计更轻的“未见之地”占位样式。
- 当前正式地点图仍未完全齐备，图鉴会随 D 线程后续地点图资产替换自动受益。
