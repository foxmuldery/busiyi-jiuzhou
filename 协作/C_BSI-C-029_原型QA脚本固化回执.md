# C_BSI-C-029 原型 QA 脚本固化回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-17  
> 范围：把前几轮临时检查固化为可重复执行的本地 QA 脚本；不改玩法、不改数值、不新增依赖。

## 本轮最小改动

新增文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

更新文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`

## QA 脚本覆盖范围

`qa-check.js` 当前检查：

- `data.js` 是否能加载出 `window.BSI_GAME_DATA`。
- 单事件选择、单地点补给、单地点路线是否超过 4 个的一屏预算。
- `data.js` 里引用的图片、音频、字体、视频路径是否存在。
- 音乐循环与神志音频层是否配置。
- 音频素材状态是否仍是 `demo-temporary / review-pending / missing`，避免误标正式授权。
- 地点、事件、路遇、危机、结局的固定诗引是否覆盖。
- 顶部 `音` 按钮、详情弹窗、行囊抽屉、调试 UI 状态入口是否仍存在。
- 小横屏无滚动条策略是否仍存在。

## 运行方式

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js
```

## 本轮执行结果

已通过：

```text
PASS game data loaded
PASS choice budget <= 4
PASS supply budget <= 4
PASS route budget <= 4
INFO max choices: red_bones 4
INFO max supplies: central_post 2
INFO max routes: old_king_road 4
PASS referenced media files exist
INFO media refs: 46
PASS music loop configured
PASS sanity audio layer configured
PASS audio statuses are temporary/review states
PASS location verses covered
PASS event verses covered
PASS route event verses covered
PASS crisis verses covered
PASS ending verses covered
PASS hud audio button contract
PASS text modal contract
PASS drawer contract
PASS debug ui state helpers
PASS compact no-scroll policy

All prototype QA checks passed.
```

同时通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
git diff --check -- GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/README.md
```

## 后续约束

- C 线程后续每次改 `data.js / app.js / styles.css / index.html` 后，都先跑 `qa-check.js`。
- B 线程新增事件、D 线程新增素材、F 线程替换音频后，也可以用该脚本先做首轮断链检查。
- 浏览器恢复后仍需补真实点击和截图；该脚本不能替代实际渲染验收。
