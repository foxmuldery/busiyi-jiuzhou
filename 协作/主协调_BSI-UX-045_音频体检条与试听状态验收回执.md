# BSI-UX-045 音频体检条与试听状态验收回执

日期：2026-06-21  
负责人：主协调 / C 线程  
状态：已完成并通过本地验收

## 目标

上一轮已把结局复盘复制链路打通。本轮继续处理用户早前提出的“已经导入的音乐没有展现出来”的体验问题：让测试者不用读长说明，也能在设置面板里确认音乐候选、交互音、神志层是否已接入，并能清楚看到当前音乐、试听音乐或浏览器拦截状态。

## 已完成

1. 设置面板新增 `audioHealthStrip` 音频体检条：
   - `乐`：显示候选音乐接入数，例如 `5/5`。
   - `效`：显示交互 / 告急 / 地图反馈短音效数量。
   - `神`：显示神志污染层数量。
   - `声`：显示 `未播放 / 播放中 / 试听中 / 待授权 / 失效`。
2. 音乐候选卡片新增状态标签：
   - 当前旅途音乐显示 `当前`。
   - 点击试听后显示 `试听中`。
   - 浏览器未放行音频时显示 `待授权`，不误报为已播放。
   - 失败素材显示 `加载失败`。
3. 候选音乐卡片编号从完整 `MUS-CORE-003` 压缩为 `CORE-003`，避免小横屏抽屉内被截断；完整编号和名称保留在悬停提示。
4. 音频详情从多行说明压缩为两行，保留当前曲目、试听覆盖、场景轮换、地点轮换、神志层、地图反馈音和交互音数量。
5. 页面缓存版本更新至 `styles.css?v=20260621-c126`、`app.js?v=20260621-c126`，试玩入口构建号更新至 `20260621-c126`。
6. QA 增加音频体检条和试听状态合同，防止后续 UI 调整漏掉该入口。

## 修改文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)

## 验收记录

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

浏览器验收：

- 测试入口：`index.html?fresh=1&drawer=settings&verify=audio-c126b`。
- 设置抽屉自动打开，`audioHealthStrip` 显示 4 个状态格。
- 音频体检结果显示：候选音乐 `5/5`、交互音 `11`、神志层 `2`。
- 音乐候选共 6 张卡：`跟随旅途` + `CORE-001 / CORE-003 / CORE-004 / CORE-005 / CORE-006`。
- 点击 `musicDawn` 后，顶部音乐芯片显示 `CORE-006 / 试听`。
- 浏览器未放行音频时，状态条显示 `待授权`，主状态文案显示 `已请求播放；浏览器暂未放行 1 个音频槽。`
- 页面无横向 / 纵向溢出，控制台无 error。

## 后续建议

1. 后续若用户确认音乐候选，可把 `review-pending` 中的最终曲目迁入 `05_可用素材`，并在台账中改为正式可用状态。
2. 可以把候选卡片继续压缩成“试听轮盘 / 上一首下一首”，为更小的移动横屏释放抽屉空间。
