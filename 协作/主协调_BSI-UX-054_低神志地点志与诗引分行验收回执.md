# 主协调 BSI-UX-054 低神志地点志与诗引分行验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 地点志、地点图鉴、遭遇弹窗诗引、路线诗引、自动验收

## 1. 用户要求

本轮收口两个体验点：

1. 神志低时，玩家看到的地点志也要逐渐变得恐怖和不可靠。
2. 诗词展示要更适合横屏手机弹窗：诗句一句或两句一行，作者单独换行。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/data.js`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 14 个地点新增 `sanityDetails.uneasy / mad`，地点志会随神志状态变化。
- 当前地点志、地点图鉴弹窗、见闻回看统一读取 `getLocationTextForSanity(...)`。
- 地点志容器带 `data-sanity-band` 和感知标签，低神志时可显示“异象增多 / 所见不真”。
- 固定诗引改为“诗句行 + 诗题行 + 作者行”：
  - 诗句按中文标点切分，短句可两句一行。
  - 诗题行示例：`——《送元二使安西》`
  - 作者行示例：`作者：王维`
- QA 增加地点低神志文本覆盖检查和诗引作者独立行契约。
- 缓存版本更新到 `20260621-c138`。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c138-verse`

浏览器 DOM 验收结果：

- 页面标题为 `不思异：九州 Web Demo 原型`。
- 遭遇弹窗已打开。
- 当前遭遇、地点志、弹窗诗引都生成了独立作者行。
- `scene-verse-line`、`scene-verse-source`、`scene-verse-author` 均为 `display: block`。
- 页面横向溢出为 0。
- 弹窗纵向溢出为 0。
- 浏览器日志无 error / warn。

实测弹窗诗引：

```text
“劝君更尽一杯酒，西出阳关无故人。”
——《送元二使安西》
作者：王维
```

低神志地点志此前已在 `pressure=low` 状态验收：

- 神志值：18
- 地点志状态：`mad`
- 感知标签：`所见不真`
- 地点志文本已切换为污染态文本。

说明：截图接口本轮仍会超时；本次以 DOM、样式计算、日志和自动测试作为验收依据。

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/README.md`

## 5. 结论

BSI-UX-054 已完成。神志低时的地点阅读体验已经接入核心文本层；诗引也恢复为适合横屏手机阅读的题记节奏，作者不再和诗句或诗题挤在同一行。
