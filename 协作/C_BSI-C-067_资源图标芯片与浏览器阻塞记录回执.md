# C_BSI-C-067 资源图标芯片与浏览器阻塞记录回执

日期：2026-06-19  
子线程：C 技术原型与工具链  
状态：代码自检通过；内置浏览器仍无法作为验收证据

## 1. 本次目标

C066 已经把“遭遇图鉴”做进日志抽屉，但小横屏浏览器补验被内置浏览器崩溃挡住。本轮先不在浏览器环节空转，转向一个能直接提升试玩 UI 的小改：把路线消耗和补给收益从“文字资源变化”升级为“资源图标芯片”，减少小横屏文字负担。

## 2. 已完成

- `renderResourceDeltaChips()` 输出新增：
  - `data-resource="axle|grain|sanity"`。
  - `aria-label="车轴-10"` 这类可读标签。
  - `resource-delta-value` 数值层，便于后续单独样式控制。
- CSS 新增资源芯片小图标：
  - 车轴：`RES-001_车轴资源图标绿幕_透明抠图.png`
  - 粮草：`RES-002_粮草资源图标绿幕_透明抠图.png`
  - 神志：`RES-003_神志资源图标绿幕_透明抠图.png`
- 路线卡和补给卡都会自动继承这套图标芯片。
- QA 新增 `resource icon chip contract`，防止后续重构退回纯文字资源变化。
- 静态资源版本号更新到 `20260619-c067`。

## 3. 浏览器补验状态

本轮再次尝试用内置浏览器打开本地 HTTP 预览：

```text
http://127.0.0.1:8793/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?verify=c067-browser
```

本地服务已返回 `200`，但浏览器标签页进入 `This page crashed`，随后读取 DOM / 日志被浏览器安全策略拦截。因此本轮不能声称“浏览器小横屏验收通过”。

## 4. 涉及文件

- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 5. 自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- `node qa-check.js`：通过，包含 `PASS resource icon chip contract`。
- `node journey-smoke-check.js`：通过，完整主路径仍能抵达九州裂隙。
- `git diff --check`：通过。

## 6. 后续建议

- 浏览器验收不要再依赖当前崩溃标签；下次需要先确认内置浏览器是否能稳定打开任意本地静态页。
- 若仍无法打开，应由用户明确允许改用外部浏览器或 Playwright 作为渲染验收路径。
- 当前代码层面继续靠 QA 和 smoke 守住核心玩法，不能把无截图验收写成已通过。
