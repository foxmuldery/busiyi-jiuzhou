# C_BSI-C-036 神志与告急音频触发 QA 回执

## 任务目标

在已验证音频文件和 `audioHooks` 引用有效的基础上，继续把低神志音频层、三资源告急音效的触发逻辑纳入 QA，避免后续 UI 或音频代码调整时把关键反馈断掉。

## 本轮改动

- 文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- 新增 QA 项：
  - `sanity audio trigger contract`
  - `resource warning audio contract`

## 当前保护内容

- `sanityLight`：
  - 神志进入轻度异常区间时开启。
- `sanityLow`：
  - 神志低于重度阈值，或进入危机状态时开启。
- 三资源告急音效：
  - 车轴告急调用 `warnAxle`。
  - 粮草告急调用 `warnGrain`。
  - 神志告急调用 `warnSanity`。
- 危机与硬失败：
  - 进入危机或硬失败时，会调用对应资源的 warning 音效。

## 已执行自检

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js
```

结果：全部通过。

## 主线程验收意见

通过。此项 QA 不判断音效“好不好听”，只确保音频触发链路不断。后续 F 线程替换正式音效时，只要 key 和触发契约不变，C 线程就可以稳定接入。

下一步建议继续补 UI 侧契约：小横屏必须保留音频按钮、行囊入口、地点/事件文本弹窗入口、路线选择一屏预算。
