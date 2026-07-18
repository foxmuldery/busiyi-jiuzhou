# BSI-UX-023｜小横屏音频与结果触屏小修回执

日期：2026-06-20  
负责人：主线程协调  
范围：Web Demo 小横屏 UI / 音频交互

## 1. 本轮来源

已读取并采纳 C 线程回填：

- [C_BSI-C-091_下一轮小横屏UI验收与修复建议.md](/Users/yuanzhe/Documents/game/协作/C_BSI-C-091_下一轮小横屏UI验收与修复建议.md)

同时已收到但本轮未直接合并代码：

- [A_BSI-A-013_后段压力与保底复核建议.md](/Users/yuanzhe/Documents/game/协作/A_BSI-A-013_后段压力与保底复核建议.md)
- [B_BSI-B-026_下一批山海事件与配图文字包.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-026_下一批山海事件与配图文字包.md)
- [D_BSI-D-032_下一批事件方图与绿幕动态物料提示语.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-032_下一批事件方图与绿幕动态物料提示语.md)

主线程判断：本轮优先落地 UI/音频小修，因为它直接影响试玩手感，且不扩大玩法数据风险。

## 2. 已改内容

### 2.1 试听覆盖自动恢复

当玩家在设置抽屉试听音乐后，关闭设置抽屉或切到其他抽屉，会自动清除试听覆盖，回到当前旅途音乐。

涉及文件：

- `GitHub资产区/03_WebDemo/prototype/app.js`

### 2.2 结果弹窗继续按钮

`轻点继续` 从普通小字改成真实按钮，仅在结果弹窗中显示。触屏玩家可以明确点击继续；原有点击空白继续的手感仍保留。

涉及文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`

### 2.3 小横屏 HUD 降噪

在 `900 x 500` 这类小横屏下隐藏 `辞` 入口，减少辅助按钮数量；古辞面板仍保留深链和代码能力，未删除功能。

涉及文件：

- `GitHub资产区/03_WebDemo/prototype/styles.css`

### 2.4 缓存版本号

入口页版本号已更新：

```text
styles.css?v=20260620-c101
app.js?v=20260620-c101
```

## 3. 已通过验证

### 3.1 自动检查

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- 本轮相关文件 `git diff --check`

本轮新增 QA 契约：

- `audio review audition contract` 覆盖离开设置抽屉清试听。
- `text modal contract` 覆盖 `storyModalContinue` 必须是按钮并具备结果态样式。

### 3.2 浏览器复验

测试地址：

```text
http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=result-continue-c101-1781938920314
```

测试尺寸：`900 x 500`

复验结果：

- 页面加载 `styles.css?v=20260620-c101` 与 `app.js?v=20260620-c101`。
- `辞` 入口在小横屏下隐藏，`曲 CORE-001 古道` 音乐芯片保留。
- 点击音乐芯片可打开 `设置` 抽屉。
- 试听 `MUS-CORE-003` 后 HUD 显示 `CORE-003 试听`。
- 关闭设置抽屉后 HUD 自动恢复 `CORE-001 古道`，试听覆盖清空。
- 开局选择 `立刻上路` 后，结果弹窗出现 `轻点继续` 按钮。
- 点击 `轻点继续` 后弹窗关闭，继续回到旅途界面。
- 控制台无 error / warn。

截图接口仍超时，未作为阻塞项；本轮以 DOM、按钮状态和交互链路为验收证据。

## 4. 下一步建议

下一轮最小可验证步骤：

1. 从 B 线程事件包中优先合并 1-2 个地点事件文本，建议先接 `鸟鼠夹道：同穴分粮` 或 `雷泽浅滩：泽鼓回雷`。
2. 暂不继续增加硬失败风险，先保持 A 线程建议的试玩安全区间。
3. 把 D 线程的 `EVT-015 狐册问名` 和 `SFX-021 青丘狐灯入册` 作为下一批用户生成物料的优先项。

