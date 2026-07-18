# 主协调 BSI-UX-048 诗词换行与作者分行验收回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 固定诗引、路线诗引、古辞抽屉、自动验收

## 1. 用户要求

诗词排版调整为：

1. 诗句一句一行，或者两句一行。
2. 作者要单独换行。

## 2. 已完成改动

### 2.1 固定诗引统一分行

文件：`GitHub资产区/03_WebDemo/prototype/app.js`

新增：

- `splitSceneVerseLine()`
- `formatSceneVerseLines()`

现在固定诗引会按中文标点切分，短句会两句一行，长句会自然分行；作者和篇名作为来源行单独显示。

示例：

```text
“遂古之初，谁传道之？”
—— 屈原《天问》
```

### 2.2 古辞抽屉作者独立显示

文件：`GitHub资产区/03_WebDemo/prototype/app.js`

古辞抽屉元信息从单行：

```text
唐 · 王维 · 五言律诗
```

改为：

```text
作者：王维
唐 · 五言律诗
```

### 2.3 CSS 换行渲染

文件：`GitHub资产区/03_WebDemo/prototype/styles.css`

为以下区域补充 `white-space: pre-line`：

- `.scene-verse`
- `.route-card .route-verse`
- `.poetry-meta`

保证换行符在地点、事件、路线、弹窗、古辞抽屉中真实显示。

### 2.4 缓存与 QA

文件：

- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

已更新：

- 版本号：`20260621-c129`
- QA 新增“诗词换行显示契约”

## 3. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/试玩入口.html`

## 4. 浏览器验收

固定诗引测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&view=town&verify=c129-poetry-linebreak`

古辞抽屉测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&drawer=poetry&verify=c129-poetry-drawer`

浏览器验收结果：

- 固定诗引文本包含换行。
- 固定诗引 CSS 为 `white-space: pre-line`。
- 古辞抽屉作者独立一行。
- 古辞抽屉诗句逐行展示。
- 页面无横向溢出。
- 页面无纵向溢出。
- 浏览器日志无 error / warn。

## 5. 结论

BSI-UX-048 已通过。诗词显示从原来“一整行横向挤压”改为“诗句分行 + 来源单独行”，更符合山海经题记的阅读节奏。
