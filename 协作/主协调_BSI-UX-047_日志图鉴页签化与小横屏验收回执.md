# 主协调 BSI-UX-047 日志图鉴页签化与小横屏验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 试玩版日志抽屉、小横屏密度、试玩入口版本与自动验收

## 1. 本轮目标

上一轮小横屏抽屉已经压缩了行囊与设置，但“行旅日志”仍把复盘、地点见闻、遭遇图鉴、近志堆在一个纵向面板里。960x540 横屏下虽然可用，但信息层级仍偏繁。

本轮目标是把日志抽屉改成手游化页签结构：

1. 默认显示“复盘”，避免一打开就出现长文本堆叠。
2. “见闻 / 遭遇 / 近志”分成独立页签，玩家主动查看。
3. 小横屏下抽屉本体不整体滚动，避免触屏操作误滑。
4. 保留复盘复制、图鉴点击、近志记录等既有能力。

## 2. 已完成改动

### 2.1 日志抽屉结构

文件：`GitHub资产区/03_WebDemo/prototype/index.html`

已把原先的单列日志抽屉改为 4 个页签：

- 复盘：本局复盘、资源最低值、路线与压力摘要、复制按钮。
- 见闻：已到达地点图鉴。
- 遭遇：已处理遭遇图鉴。
- 近志：最近行旅记录。

### 2.2 页签交互

文件：`GitHub资产区/03_WebDemo/prototype/app.js`

新增并接入：

- `activeLogTab`
- `el.logTabButtons`
- `el.logTabPanels`
- `setActiveLogTab()`

日志抽屉重新打开时会保持上一次页签，不会强制跳回第一项。

### 2.3 小横屏样式

文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

已调整：

- 日志抽屉改成“标题 / 页签 / 当前内容”的固定网格。
- 抽屉本体隐藏整体滚动，当前页签内部独立承载内容。
- 960x540 横屏下压缩页签、复盘统计、图鉴卡片、近志条目。
- 隐藏页签内部滚动条，保持手游化观感。

### 2.4 入口与验收

文件：

- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

已更新：

- 试玩入口版本号：`20260621-c128`
- QA 契约新增日志页签结构、脚本切换与抽屉样式检查。

## 3. 本地自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

## 4. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&drawer=log&verify=ux047-c128-recap`

测试视口：`960x540`

验收结果：

- 默认打开日志抽屉，激活页签为“复盘”。
- 页签数量为 4。
- `复盘 / 见闻 / 遭遇 / 近志` 均可点击切换。
- 每次切换后仅一个面板可见。
- 页面无横向溢出。
- 页面无纵向溢出。
- 日志抽屉本体无整体滚动。
- 浏览器日志：0 条错误 / 警告。

## 5. 结论

BSI-UX-047 已通过。日志抽屉从“长文本堆叠”变成“手游页签抽屉”，更符合当前横屏试玩版的简洁方向。

## 6. 下一步建议

下一步不要继续扩展日志抽屉，而是回到主体验：

1. 优先继续压缩大地图路线选择浮层，让 Out There 式路线决策更简洁。
2. 再处理事件弹窗的“图片比例 / 诗词 / 状态变化”视觉层级。
3. 等 UI 稳定后，再把后续山海事件内容批量接入。
