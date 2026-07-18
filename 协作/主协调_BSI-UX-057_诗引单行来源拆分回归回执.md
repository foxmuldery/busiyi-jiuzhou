# 主协调 BSI-UX-057 诗引单行来源拆分回归回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 诗引格式器、弹窗/路线卡诗引显示、自动验收

## 1. 用户要求

诗词展示规则继续收紧：

1. 诗句一句一行，或者两句一行。
2. 作者要单独换行。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`

实现内容：

- 增加旧式单行诗引解析：`诗句 —— 作者《篇名》` 会自动拆为诗句、诗题、作者。
- 保留“短句可两句一行”的排版节奏。
- 作者行继续独立显示，不再和诗句或诗题挤在同一行。
- 诗句连续多行时加入极小行距，横屏弹窗里更像题记。
- 缓存版本更新到 `20260621-c141`。
- QA 增加旧式单行来源拆分契约。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&view=town&verify=c141-poetry`

浏览器 DOM 验收结果：

- 遭遇弹窗已打开。
- 诗句行、诗题行、作者行均为 `display: block`。
- 作者行独立换行。
- 页面横向溢出为 0。
- 浏览器日志无 error / warn。

实测弹窗诗引：

```text
“遂古之初，谁传道之？”
——《天问》
作者：屈原
```

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/README.md 协作/不思异九州_任务交接台账.md 协作/主协调_BSI-UX-057_诗引单行来源拆分回归回执.md`

## 5. 结论

BSI-UX-057 用于修复浏览器或旧文案中仍可能出现的单行诗引回归问题。后续新增诗引时仍建议优先使用结构化字段：`line/title/author/fit`。
