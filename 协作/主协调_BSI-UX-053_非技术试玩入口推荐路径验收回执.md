# 主协调 BSI-UX-053 非技术试玩入口推荐路径验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 试玩入口页、README、自动验收

## 1. 目标

继续向“可直接发给别人试玩”的 P0 版本收口。入口页不只是一排测试按钮，而要让非技术测试者一眼知道：

1. 应该从哪里开始。
2. 5 分钟内要完成哪几个动作。
3. 结束后从哪里复制复盘反馈。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

实现内容：

- 入口页新增“推荐 5 分钟试玩”任务卡。
- 任务卡展示 5 个步骤：`遭遇 / 补给 / 开图 / 选路 / 复盘`。
- “开始干净新局”改为主推荐入口，高亮显示。
- 入口页版本标记更新为 `20260621-c136`。
- README 同步说明入口页已包含推荐试玩任务卡。
- QA 固化入口页任务卡、主入口高亮和紧凑横屏断点。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html?verify=c136-launcher`

### 3.1 960x540 横屏

- 页面标题：`不思异：九州 试玩入口`
- 版本：`20260621-c136`
- 推荐任务卡可见。
- 5 个步骤完整：`遭遇 / 补给 / 开图 / 选路 / 复盘`
- 入口数量：7
- 主入口链接：`./index.html?fresh=1`
- 横向溢出：0
- 纵向溢出：0
- 控制台 error / warning：0

### 3.2 844x390 小横屏

- 推荐任务卡可见。
- 5 个步骤完整。
- 入口数量：7
- 右侧状态卡可见。
- 横向溢出：0
- 纵向溢出：0
- 控制台 error / warning：0

### 3.3 主入口交互

从入口页点击主推荐入口后，页面进入：

`index.html?fresh=1`

并加载游戏标题：

`不思异：九州 Web Demo 原型`

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

补充说明：

- 浏览器截图 API 本轮仍出现 `Page.captureScreenshot` 超时；因此本轮视觉证据以 DOM 尺寸、入口文本、溢出读数和主入口导航结果为准。

## 5. 结论

BSI-UX-053 已完成。试玩入口页现在更像一个可直接发给测试者的入口，而不是开发调试页；测试者能看到推荐路径、直接开始新局，并在结束后知道去复盘。
