# 主协调 BSI-UX-021：音乐 HUD 小横屏可见与试听入口复验

日期：2026-06-20  
范围：WebDemo 小横屏 HUD、音乐状态显示、试听入口、遭遇弹窗点击层级。

## 1. 修正目标

用户反馈已导入音乐没有明显展现。主线程复查后发现：小横屏下当前音乐芯片过窄，只显示“曲”，且故事弹窗覆盖全屏，导致 HUD 虽然可见但点击会先被弹窗吃掉。

本轮目标：

- 小横屏 HUD 明确显示当前音乐编号。
- 点击音乐芯片直接进入设置/试听入口。
- 遭遇弹窗不再遮住顶部 HUD 的点击区域。
- 不扩大音频系统，不把待复核音乐标为正式可商用素材。

## 2. 已完成修改

- 小横屏音乐芯片从纯图标改为紧凑编号显示，当前显示 `CORE-001`。
- `MUS-CORE-001` 在 HUD 中简化为 `CORE-001`，保留完整 aria 文案。
- 故事弹窗从 HUD 下方开始，不覆盖顶部 HUD。
- 打开任一侧边抽屉时自动收起当前故事弹窗，避免触屏用户卡住。
- QA 增加音乐 HUD 合同检查。

## 3. 验收结果

代码检查：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --strict
node GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --strict
```

全部通过。

浏览器复验：

- 视口：`900x500` 横屏。
- 开局音乐 HUD：显示 `曲 / CORE-001`。
- 点击音乐 HUD：进入 `设置` 抽屉。
- 试听候选：`6` 条，包含 `MUS-CORE-001`。
- 遭遇弹窗：点击音乐后自动收起。
- 页面溢出：无横向溢出，无纵向溢出。
- 控制台错误/警告：无。

## 4. 当前测试地址

```text
http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1
```

## 5. 后续建议

下一步不要继续堆 UI。建议先让用户试玩当前版本，然后按 A/B/D/F 线程输出补齐：

- 剩余 9 张高频遭遇图。
- 1 到 2 条山海经 P0 新遭遇。
- 1 条低资源补救随机路遇。
- 地图/地点/资源反馈三类短音效。
