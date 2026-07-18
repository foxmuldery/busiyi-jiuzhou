# 主协调 BSI-UX-052 诗词作者分行回归修复回执

日期：2026-06-21  
负责人：主协调 / C  
范围：Web Demo 遭遇弹窗诗引、缓存版本、自动验收

## 1. 用户要求

诗词展示规则：

1. 诗句一句一行，或者两句一行。
2. 作者和篇名单独换行。

## 2. 已完成改动

文件：

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/试玩入口.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

实现内容：

- 诗句按标点切分，最多两句合成一行。
- 弹窗内 `.story-modal-verse .scene-verse-line` 明确独占一行。
- 弹窗内 `.story-modal-verse .scene-verse-source` 明确独占一行并靠右显示。
- QA 增加弹窗诗引分行契约。
- 缓存版本更新到 `20260621-c135`。

## 3. 浏览器验收

测试地址：

`http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&view=town&verify=c135-poetry-source-line`

浏览器 DOM 验收结果：

- 弹窗已打开。
- 诗句行 `display: block`。
- 作者来源行 `display: block`。
- 作者来源行在诗句下一行。
- 作者来源行右对齐。
- 页面无横向溢出。
- 弹窗无纵向溢出。
- 浏览器日志无 error / warn。

实测文本：

```text
“遂古之初，谁传道之？”
—— 屈原《天问》
```

## 4. 自动验收

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

## 5. 结论

BSI-UX-052 已完成。遭遇弹窗的诗词现在恢复为“诗句分行 + 作者单独行”的题记节奏，更适合横屏手游阅读。
