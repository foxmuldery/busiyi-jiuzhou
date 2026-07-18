# C 线程回执：BSI-C-081 试玩入口素材状态卡

## 结论

已完成。试玩入口现在会直接显示首轮 12 张关键图的导入状态，并提供两个入口：

- Prompt 包：[D_BSI-D-023_首轮12张关键图Prompt包.md](/Users/yuanzhe/Documents/game/协作/D_BSI-D-023_首轮12张关键图Prompt包.md)
- 核名工作台：[generated-art-import-workbench.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-import-workbench.md)

当前状态：`0 / 12` 张已就绪。下一张优先导入：

`MID-BG-ROAD-001_古道荒原路段长图.png`

## 已改动

- [asset-readiness-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js)：新增 `--write-entry-status`，可生成入口页读取的素材状态。
- [generated-art-status.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-status.js)：新增入口状态数据，记录总数、分组、下一张缺口、Prompt 包和核名工作台路径。
- [试玩入口.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html)：新增“素材导入状态”卡；横屏小尺寸下入口按钮改为两列，状态卡保留在首屏。
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)：新增入口素材状态卡契约检查。
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)：补充状态文件刷新命令。

## 刷新方法

```bash
node asset-readiness-check.js --write-entry-status
```

如果同时刷新清单或核名工作台，也会自动刷新入口状态：

```bash
node asset-readiness-check.js --write-manifest
node asset-readiness-check.js --write-import-workbench
```

## 验收记录

- `node --check app.js`
- `node --check data.js`
- `node --check asset-readiness-check.js`
- `node --check qa-check.js`
- `node qa-check.js`
- `node journey-smoke-check.js`
- `git diff --check`
- 尾随空白检查：通过
- 内置浏览器：入口页加载成功，状态卡显示 `0/12`，Prompt 包和核名工作台入口可见，控制台无错误。
- 内置浏览器：点击“开始干净新局”后进入主游戏，HUD 显示车轴、粮草、神志，中原驿首屏内容可见。
- 横屏手机尺寸 `844x390`：入口面板和素材状态卡均在首屏，页面无横向滚动。

截图证据：

`/private/tmp/busiyi-c081-entry-final.png`

## 后续交接

下一步建议交给视觉互动 / D 线程继续：按 D023 的 12 张 Prompt 生成或筛选图片，并按核名工作台里的目标文件名导入。导入后运行 `node asset-readiness-check.js --write-manifest`，入口状态会从 `0/12` 自动推进。
