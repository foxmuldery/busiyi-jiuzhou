# 主协调回执：BSI-UX-070 试玩入口听感反馈模板

日期：2026-06-24

## 1. 本轮目标

继续推进 Web Demo 的音乐、声场和试玩反馈闭环。

当前音频已经接入主音乐、地形/地点轮换、神志层、旅途环境层和交互音效，但“听起来是否加分”仍需要真人主观反馈。本轮在试玩入口页补上专门的听感反馈模板，方便回收音乐、环境声、神志层和短音效判断。

## 2. 已完成修改

修改文件：

```text
GitHub资产区/03_WebDemo/prototype/试玩入口.html
GitHub资产区/03_WebDemo/prototype/index.html
GitHub资产区/03_WebDemo/prototype/qa-check.js
GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js
GitHub资产区/03_WebDemo/prototype/README.md
协作/不思异九州_总体推进计划.md
```

新增入口页能力：

- 新增“复制听感模板”按钮。
- 模板单独询问：
  - 当前主音乐是否适合第一章行旅。
  - `MUS-CORE-001/002/003/004/005/006` 中最想保留哪首。
  - 旅途环境层是否太弱、正好、太吵或需要替换。
  - 神志低时声音是否能感觉到不对劲。
  - 地图打开、选路、抵达、资源变化短音效是否清楚。
  - 哪个声音最打扰，哪个声音最有山海九州感。
  - 是否愿意默认开低音量音乐。
- 如果浏览器不允许剪贴板，会展开手动复制区域。

缓存标记：

```text
20260624-c156
```

## 3. 自动验收

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
```

结果：

- 原型 QA 全部通过。
- 完整试玩流程仍可抵达九州裂隙。
- 入口页合约已检查 `copyAudioTemplate`、`audioReviewTemplate`、`旅途环境层是否加分` 和手动复制听感模板。

## 4. 浏览器复验状态

尝试用 Playwright 打开入口页做真实 DOM 验证时，Chromium 被当前 macOS 沙箱阻止：

```text
MachPortRendezvousServer Permission denied
```

因此本轮只声明静态 QA 和自动流程验收通过，不声明浏览器截图验收完成。

## 5. 下一步

下一轮建议：

1. 用户或测试者从 `试玩入口.html` 点击“音乐试听面板”。
2. 听完后点击“复制听感模板”回填。
3. 主线程根据反馈决定：
   - 哪几首音乐继续保留为内部候选。
   - `AMB-TRAVEL-001-SYN` 是否继续作为临时环境层。
   - 哪些程序占位短音效必须优先替换。
