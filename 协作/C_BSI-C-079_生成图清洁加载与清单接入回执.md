# C_BSI-C-079 生成图清洁加载与清单接入回执

- 任务编号：BSI-C-079
- 子线程：C 技术原型与工具链
- 日期：2026-06-19
- 目标：解决 A/B/C 组正式生成图尚未导入时，浏览器启动就产生大量缺图 404 的问题；保持当前 fallback 画面可玩，同时为后续正式图导入保留清单式自动启用能力。

## 本轮完成

1. 新增生成图清单文件。
   - 文件：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-manifest.js`
   - 当前状态：ready 0 张，记录 A/B/C 共 59 张待生成图的分组缺口。

2. 改造网页加载逻辑。
   - 默认模式只读取 `window.BSI_GENERATED_ART_MANIFEST.ready` 里的已确认生成图。
   - 未进入清单的 A/B/C 图不再用 `Image()` 主动探测，因此不会在试玩控制台刷 404。
   - 保留调试参数：需要主动探测缺图时，可在 URL 后加 `probeGeneratedAssets=1`。

3. 改造素材检查脚本。
   - `asset-readiness-check.js` 新增 `--write-manifest`。
   - 导入图片后运行：
     `node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest`
   - 脚本会只把尺寸、比例达标的 ready 图片写入 manifest。

4. 补掉 favicon 404。
   - 主页面和试玩入口页都改用现有神志资源 PNG 做 favicon。
   - 试玩入口 build 标识更新为 `20260619-c079`。

5. README 已更新。
   - 明确生成图投放后需要运行 `--write-manifest`。
   - 说明 `probeGeneratedAssets=1` 只用于调试，不建议发给试玩者。

## 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-manifest.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`
- `/Users/yuanzhe/Documents/game/协作/不思异九州_任务交接台账.md`

## 验收结果

- `node --check app.js`：通过
- `node --check asset-readiness-check.js`：通过
- `node --check qa-check.js`：通过
- `node asset-readiness-check.js --write-manifest`：通过，当前写入 0 张 ready 资产
- `node qa-check.js`：通过，含 `PASS generated art manifest clean-load contract`
- `node journey-smoke-check.js`：通过
- 静态服务访问：
  - `generated-art-manifest.js` 返回 200
  - favicon 图标返回 200
  - 主试玩页返回 200

## 页面验证

- Playwright 打开：
  - `http://127.0.0.1:4179/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=map&_c=079`
- 页面标题：`不思异：九州 Web Demo 原型`
- 快照确认：
  - 九州图战略模式正常显示。
  - 路线卡、资源预览、地图节点正常显示。
  - 本轮没有再出现上一轮的 `Console: 60 errors` 缺图错误输出。
- 交互验证：
  - 点击第一条路线后，页面切回旅途模式。
  - 天数从第 1 日变为第 2 日。
  - 车轴从 80 变为 76，粮草从 90 变为 86。
- 截图证据：
  - `/Users/yuanzhe/Documents/game/.playwright-cli/page-2026-06-19T05-39-37-243Z.png`

## 与视觉线程衔接

D 线程已产出首轮 12 张关键图 Prompt 包：

- `/Users/yuanzhe/Documents/game/协作/D_BSI-D-023_首轮12张关键图Prompt包.md`

用户生成并放入对应目录后，C 线程只需要运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
```

然后刷新试玩页即可使用符合清单的正式图。

## 下一步建议

下一小步建议推进 `BSI-C-080`：把 D023 里的 12 张关键图做成“导入工作台/核名清单”，在用户把图发来后快速检查文件名、比例、目录和可用状态，减少手工核对成本。
