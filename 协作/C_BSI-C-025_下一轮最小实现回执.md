# C_BSI-C-025 下一轮最小实现回执

> 子线程：C，技术原型与工具链工程师  
> 日期：2026-06-16  
> 范围：Web Demo 静态原型最小实现；不换框架、不大重构、不新增复杂背包/战斗/成就系统。  
> 原型入口：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`  
> 本地预览：`http://127.0.0.1:4177/03_WebDemo/prototype/`

## 已完成改动

### 1. 随机路遇降密与连续保护

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`

落地内容：

- 随机路遇基础概率由 `0.28` 下调到 `0.21`。
- 随机路遇上限由 `0.74` 下调到 `0.63`。
- 新增连续路遇保护：连续 2 段已发生半途路遇后，下一段默认休整跳过；若资源告急或坏运较高，则只允许低压补救类路遇。
- 新增高压保护：上一段若是高压神志/污染类路遇，下一段不再抽同类高压路遇。
- 神志 `<= 30` 时，随机池只保留休整、补给、线索或补救候选，避免继续压不可读的神志事件。

### 2. `red_bones` 首版可玩调整

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`

落地内容：

- `凝视赤水辨路` 从 `神志 -75` 调整为 `神志 -28`。
- 选项提示改为“禁忌试演 / 神志 -28，解锁裂隙方向”。
- 保留禁忌味道和裂隙方向 flag，不再直接破坏 5 分钟试玩节奏。

### 3. 8 个地点志与抵达/补给短句

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`

落地内容：

- 已替换 8 个优先地点的 `detail`：中原驿、故王道、废关、鸟鼠夹道、雷泽浅畔、黑齿市、赤水外滩、巫咸断碑。
- 已新增并接入 `arrivalText`：抵达时写入“抵达见闻”日志，地点志区域同步显示抵达句 + 地点志。
- 已新增并接入 `supplyDiscoveryText`：补给完成时写入“补给发现”日志，并优先用于行动反馈详情。

### 4. 6 个半途路遇文本替换

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`

落地内容：

- 已按 B 线程稿替换/校正 6 个半途路遇 `texts.clear / texts.uneasy`：
  `wheel_omen`、`roadside_shrine`、`black_cloud`、`wenao_fish_rain`、`dang_kang_field_cry`、`xuan_gui_shell_bridge`。
- `mad` 档暂保留现有版本，首版低神志优先使用 `uneasy`。

### 5. 资源芯片 / 风险章 / 动作小章

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`

落地内容：

- 路线卡消耗从纯文字改为资源芯片：轴、粮、志分别显示涨跌。
- 路线卡风险改为 `险低 / 险中 / 险高` 小章，路遇短句保留为文字兜底。
- 路线、补给、选择若会把资源推入告急线，会显示 `将危` 小标。
- 资源卡新增常驻状态：`安 / 紧 / 危`，保留原有涨跌闪光和飘字。
- 选择按钮新增一字动作章：修、取、辨、避、祭、险、终、行。
- 补给按钮继续使用现有资源图标，同时改为资源芯片显示收益/代价。
- `index.html` 的 `data.js / app.js / styles.css` 版本号已更新到 `20260616-c025b`，减少本地浏览器缓存旧文件的概率。
- 主线程验收时补了一处小横屏样式修正：`844x390` 地图路线卡隐藏路线缩略图和长诗句，让资源芯片、风险章、路遇和补给预览优先露出。

### 6. 音频槽位保持

涉及文件：

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`

落地内容：

- 未改动现有音频 key：`resourceUp`、`resourceDown`、`warnAxle`、`warnGrain`、`warnSanity`、`mapOpen`、`mapReveal`、`locationArrive`。
- 继续按 F 线程口径作为 `demo-temporary` 内部 Demo 音频槽位。
- 未导入新音频，未把临时素材标为正式可用。

## 本地自检

### 语法检查

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
```

### 真实点击验收

已启动本地静态服务：

```text
http://127.0.0.1:4177/03_WebDemo/prototype/
```

已用浏览器完成一段核心链路：

```text
加载页面 -> 处理起点事件 -> 打开地图 -> 选择“沿旧王道向西缓行”
-> 触发“当康啼垄”半途路遇 -> 处理路遇 -> 抵达“故王道”
```

验收观察：

- 页面标题正确：`不思异：九州 Web Demo 原型`。
- 首屏显示三资源，资源卡带 `安` 状态章。
- 刷新后新版资源芯片和状态章仍存在，控制台无 `error / warn`。
- 地图路线卡显示资源芯片、风险章、定遇/随机/补救徽记。
- 选择按钮显示动作章和资源芯片。
- 处理半途路遇后成功抵达 `故王道`。
- 日志出现 `抵达见闻：深车辙把车往西牵，像旧路还认得队伍。`
- 控制台未捕获 `error / warn`。

未完成项：

- 浏览器插件截图接口 `Page.captureScreenshot` 超时，本轮未产出截图证据。
- 浏览器插件只读执行环境无法读取 `window.BSI_PROTOTYPE` 调试对象；本轮以 DOM 与真实点击结果作为验收依据。

## 风险与边界

- 本轮没有改 React/Vite/TypeScript 工程方向，仍是静态 HTML/CSS/JS 原型。
- 本轮没有新增素材、音频或外部库，不新增授权风险。
- `arrivalText / supplyDiscoveryText` 为 C 线程直接加字段，后续若 B 线程输出正式补丁表，可继续同字段覆盖。
- 随机路遇连续保护目前用 `traveledRoutes + routeEventResults` 推断，不额外写复杂存档字段；足够首版试玩，后续若要精确模拟可再字段化。
- 小横屏真机触控仍建议主线程复测，尤其是 844x390 下路线列表滚动和按钮命中面积。

## 交付文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/协作/C_BSI-C-025_下一轮最小实现回执.md`

## 等待主线程验收

建议主线程按以下顺序验收：

1. 打开 `http://127.0.0.1:4177/03_WebDemo/prototype/`。
2. 走 3-5 分钟核心循环，确认半途路遇不再每段高压。
3. 到达故王道、雷泽或赤水时检查地点志与抵达见闻。
4. 检查路线卡资源芯片、风险章、动作章是否比纯文字更易读。
5. 由 E 线程复核本轮新增文本是否仍保持原创表达和内部 Demo 边界。
