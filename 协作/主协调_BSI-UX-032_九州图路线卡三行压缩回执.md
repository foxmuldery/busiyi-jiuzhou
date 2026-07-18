# BSI-UX-032 九州图路线卡三行压缩回执

日期：2026-06-21  
责任：主协调 / C 视觉交互  
目标：减少九州图右侧路线卡的大块空白，让路线选择更接近横屏手机游戏的简洁按钮，而不是网页卡片。

## 本轮改动

1. 路线卡在小横屏下改为内容高度优先，不再拉满整列高度。
2. 路线卡固定为三段信息：
   - 标题行：路线名 + 半途倾向小徽记。
   - 消耗行：车轴 / 粮草 / 神志的图标数字。
   - 情报行：风险、路遇、异象、目的地补给的符号情报条。
3. 小横屏下隐藏旧的长文本风险行、异象行、补给预览行，避免同一信息重复出现。
4. 更新缓存号到 `20260621-c110`，方便浏览器拉取最新版。
5. 将“路线卡不拉伸空白”的规则写入 QA 合约，防止后续改 UI 时回退。

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
- 预览地址：`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-card-compact-c110-ready-1782017095884`
- 九州图已进入可选路线状态：`nextAction = pick-route`
- 开局弹窗已关闭：`modalHidden = true`
- 路线数：2
- 两张路线卡高度均约 `76px`
- 情报条高度约 `18px`
- 路线卡 `scrollHeight` 与可见高度一致，无内部溢出
- 点击 `central_to_road` 后能正常进入半途路遇 `当康啼垄`
- 半途路遇弹窗内显示 3 个选项
- 控制台无 error / warning

## 结论

本轮达成“路线选择更像横屏手游控件”的最小可验证目标。右侧卡片已经明显压缩，不再出现整张空白大纸；玩家仍能一眼看到路线名、资源消耗、风险/路遇/补给情报。

## 下一步建议

1. 继续优化九州图右侧空白区域：可考虑将“下一站”标题与路线按钮进一步合并，或把右侧栏改成更窄的浮层。
2. 继续整理事件弹窗的诗词、提示、状态反馈，让信息更像游戏内提示，而不是说明文。
3. 保留这一版作为 C 线程后续 UI 紧凑化的基准。
