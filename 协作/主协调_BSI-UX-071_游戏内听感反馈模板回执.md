# 主协调回执：BSI-UX-071 游戏内听感反馈模板

日期：2026-06-24

## 1. 本轮目标

上一轮已在 `试玩入口.html` 增加“复制听感模板”。本轮继续往试玩完成度推进，把同样的听感反馈能力放进游戏内设置 / 音乐试听面板。

这样测试者不需要退出试玩入口：打开设置、试听音乐后，就能直接复制听感反馈。

## 2. 已完成修改

修改文件：

```text
GitHub资产区/03_WebDemo/prototype/index.html
GitHub资产区/03_WebDemo/prototype/app.js
GitHub资产区/03_WebDemo/prototype/styles.css
GitHub资产区/03_WebDemo/prototype/试玩入口.html
GitHub资产区/03_WebDemo/prototype/qa-check.js
GitHub资产区/03_WebDemo/prototype/README.md
协作/不思异九州_总体推进计划.md
协作/不思异九州_任务交接台账.md
GitHub资产区/00_同步台账/资产清单.md
```

新增游戏内能力：

- 设置面板新增 `复制听感模板` 按钮。
- 模板会自动带入：
  - 当前地点。
  - 当前地形。
  - 当前音乐 ID 与名称。
  - 可试听音乐列表。
  - 旅途环境层 ID。
  - 神志层 ID。
- 复制成功后，设置面板显示成功状态，并触发轻量状态反馈。
- 若浏览器拒绝剪贴板，设置面板内会展开可手动复制的文本框。

缓存标记：

```text
20260624-c157
```

## 3. 自动验收

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

结果：

- 原型 QA 全部通过。
- 完整试玩流程仍可抵达九州裂隙。
- 生成图素材仍为全 ready。
- QA 已检查 `audioReviewCopyButton`、`audioReviewCopyFallback`、`copyAudioReviewTemplateToClipboard` 和听感模板关键文本。

## 4. 浏览器复验状态

上一轮 Playwright 浏览器启动被当前 macOS 沙箱阻止：

```text
MachPortRendezvousServer Permission denied
```

本轮未再次声明浏览器截图验收，只以静态 QA、试玩流程和素材检查作为当前证据。

## 5. 下一步

下一步听感链路建议：

1. 从 `index.html?fresh=1&drawer=settings` 进入音乐试听面板。
2. 分别试听核心音乐候选。
3. 点击游戏内 `复制听感模板`。
4. 按反馈决定保留、替换或降级：
   - 主循环音乐。
   - 山地 / 水泽 / 墟市音乐。
   - `AMB-TRAVEL-001-SYN` 旅途环境层。
   - 程序占位短音效。
