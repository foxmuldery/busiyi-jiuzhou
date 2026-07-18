# C_BSI-C-003 Web Demo 可运行纵切片优先

## 产物路径

- 原型入口：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- 数据模块：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`
- 运行逻辑：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- 验证说明：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`

## 本轮完成

1. 优先级已调整为“先让 Web Demo 跑起来”的 3-5 分钟可玩纵切片。
2. 将原本内联在 `app.js` 的地点、路线、事件拆到 `data.js`。
3. 在 `data.js` 中新增三类最小濒死补救事件：断轴、饥荒、神志崩线。
4. 在运行状态中加入 `badLuckMeter` 与 `failureStats`，包含断轴、饥荒、崩解、路线锁定、补救次数、硬失败占位。
5. 资源触底时不再直接停局，先进入 `status: "crisis"`，由事件区给出补救选择。
6. 已加入音乐/音效启用闭环：旅途循环音乐、神志污染层、选择音效、资源变化音效、危机警示音。
7. 增强 `validate()`，覆盖地点、路线、事件、危机事件、音频槽位、条件、语言、结局和数值字段。
8. 增加 `getBalanceInputs()`，为后续自动平衡模拟器提供当前数据、危机事件、音频资产和统计字段入口。

## 数据结构变化

`data.js` 当前暴露：

- `saveVersion`
- `resourceKeys`
- `terrainKeys`
- `startLocation`
- `locations`
- `routes`
- `events`
- `crisisEvents`
- `audioAssets`
- `endingDefinitions`
- `initialStateTemplate`

`GameState` 当前新增：

- `crisisType`
- `badLuckMeter`
- `failureStats.axleCrises`
- `failureStats.grainCrises`
- `failureStats.sanityCrises`
- `failureStats.routeLocks`
- `failureStats.rescues`
- `failureStats.hardFailures`

## 保底逻辑

- `axle <= 0`：进入断轴补救。
- `grain <= 0`：进入饥荒补救。
- `sanity <= 0`：进入神志崩线补救。
- 补救选择会恢复对应资源，并记录 `failureStats.rescues`。
- 若补救选择导致另一项资源触底，会继续进入下一类危机。
- `badLuckMeter` 会随路线损耗、事件损耗、低资源压力和补救选择变化。

## 自动平衡模拟器连接方式

第一版暂不写完整模拟器，只保留稳定输入，不阻塞可玩纵切片：

```js
window.BSI_PROTOTYPE.getBalanceInputs()
```

返回内容包含：

- 初始状态模板。
- 所有路线及消耗。
- 所有事件与选项效果。
- 所有危机事件与补救效果。
- 当前接入的音频资产槽位。
- 三资源 key。
- 失败原因统计字段。

后续模拟器可直接按这些字段批量跑路线选择、随机事件选择、危机触发和补救次数统计。

## 当前能跑的纵切片

1. 开始旅程：打开 `index.html`，从中原驿开始。
2. 路线选择：选择“循旧王道西行”等路线，车队横向推进。
3. 事件：抵达地点后显示事件文本和选项。
4. 三资源变化：路线和事件会改变车轴、粮草、神志。
5. 神志污染：神志降低后视觉污染层加强，低神志文本和选项出现。
6. 音乐/音效启用：点击“启用音乐”后播放旅途循环音乐；神志降低后叠加神志层；路线/选项/资源/危机有短反馈。
7. 失败或濒死反馈：到赤水后选择“凝视赤水辨路”可触发“神志崩线”；任一资源触底也会进入断轴、饥荒或神志崩线补救。

## 验证方法

1. 直接打开 `index.html`。
2. 控制台运行 `window.BSI_PROTOTYPE.validate()`，期望 `ok: true`。
3. 点击“启用音乐”，期望状态显示临时音乐启用。
4. 正常走到“赤水外滩”，选择“凝视赤水辨路”，期望事件区显示“神志崩线”。
5. 点击一个补救选项，期望 `failureStats.rescues` 增加，状态回到 `playing` 或进入下一类危机。
6. 控制台也可运行 `window.BSI_PROTOTYPE.setTestState({ resources: { axle: 0 } })`，单测“断轴边缘”补救。

## 本轮自检结果

- `node --check app.js`：通过。
- `node --check data.js`：通过。
- 桌面浏览器自检：`validate().ok === true`，地点 8、路线 11、事件 8、危机事件 3、结局 2。
- 桌面浏览器自检：从中原驿走到故王道后，日期变为第 2 日，三资源正常扣减。
- 桌面浏览器自检：强制 `axle: 0` 后进入 `status: "crisis"`、`crisisType: "axle"`，事件标题为“断轴边缘”。
- 桌面浏览器自检：点击补救后回到 `status: "playing"`，`failureStats.rescues === 1`。
- 移动端宽度 390px 自检：无横向溢出，强制 `sanity: 0` 后显示“神志崩线”。
- 本轮新增语法自检：`node --check app.js`、`node --check data.js` 均通过。
- 本轮新增数据流自检：中原驿 -> 故王道 -> 雷泽浅畔 -> 赤水外滩 -> 神志崩线补救可跑通，补救后状态回到可玩资源区间。
- 本轮新增音频自检：9 个音频槽位已接入，必需的 `musicLoop`、`sanityLow`、选择、资源、神志警示文件均存在。
- 本轮浏览器限制：内置 Browser 拒绝打开本地 `file://` 页面，未通过绕行方式复测。

## 仍是假数据的部分

- 地点、路线、事件文本仍是 C 线程样例，不替代 A/B 正式数据。
- 数值只是为了验证系统骨架，不代表最终平衡。
- `badLuckMeter` 公式是可调占位，后续应由 A 线程数值表校准。
- `hardFailures` 只预留字段，当前不主动触发硬失败。
- 音频当前引用待复核/临时素材，音乐候选为 `review-pending`，程序生成神志层和短音效为 `demo-temporary`，不得标为正式可用。

## 风险与边界

- 未安装依赖。
- 未引入框架或游戏引擎。
- 未导入大视频或新音频文件，只引用现有待复核/临时音频。
- 未修改 A/B/D/E/F 线程交付文件。
- 未执行 git commit/push。
