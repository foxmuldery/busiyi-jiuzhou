# BSI-UX-033 九州图路线盘浮层化回执

日期：2026-06-21  
责任：主协调 / C 视觉交互  
目标：解决 BSI-UX-032 后路线卡已压缩、但右侧仍有整栏空白的问题；让九州图更像横屏手游地图界面，而不是网页左右分栏。

## 本轮改动

1. 小横屏下九州图改为地图全宽展示。
2. “下一站”路线选择区改为右上角浮层路线盘。
3. 路线盘只按内容高度显示，不再占满整列高度。
4. 路线盘加入半透明深色底、细边框和轻微阴影，视觉上像贴在羊皮纸地图上的操作控件。
5. 保留 BSI-UX-032 的三行路线卡结构：路线名、资源消耗、符号情报条。
6. 更新缓存号到 `20260621-c111`。
7. 将“地图全宽 + 路线盘浮层”的规则写入 QA 合约。

## 修改文件

- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

## 验收结果

自动检查：

- `node --check app.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：全部通过
- `git diff --check`：通过

浏览器横屏验收：

- 测试尺寸：`900 x 500`
- 预览地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=map-float-c111-ready-1782017485759`
- 九州图已进入可选路线状态：`nextAction = pick-route`
- 开局弹窗已关闭：`modalHidden = true`
- 地图宽度：`874px`
- 路线盘尺寸：约 `318 x 112px`
- 路线盘定位：`position = absolute`，右上浮层
- 路线卡高度：约 `76px`
- 路线按钮可点击
- 点击路线后正常进入半途路遇 `当康啼垄`
- 半途路遇弹窗内显示 3 个选项
- 控制台无 error / warning

## 结论

本轮达成“地图为主、路线为浮层”的最小可验证目标。九州图不再被右侧空栏挤压，画面更接近 Out There 式战略选择和横屏手游的紧凑控件。

## 下一步建议

1. 继续优化事件弹窗的信息层级：诗词、提示、状态、选项应更像游戏 UI，而不是说明文块。
2. 检查 3-4 条路线同时出现时浮层高度是否仍能一屏显示。
3. 后续可让 D 线程按这一版浮层样式继续做地图节点、路线按钮、状态图标的视觉统一。
