# C_BSI-C-052 小横屏遭遇摘要与详情全文回执

日期：2026-06-18  
子线程：C 技术原型  
目标：继续压缩主界面文字密度，让横屏手机界面更像游戏停靠页，同时保留完整山海文本。

## 1. 问题

当前横屏框架已经可以隐藏长文本，但 `eventText` 同时承担“主界面显示”和“详情弹窗全文”两种职责。后续 B 线程继续扩写地点志、路遇和低神志文本时，如果仍直接把全文塞进主界面，界面会重新变重。

## 2. 本轮改动

- 新增 `eventFullText`，专门保存当前遭遇全文。
- 新增 `setEventCopy()`，把主界面遭遇文案压成短摘要，同时把全文写入 `data-full-text` 和 `eventFullText`。
- 详情弹窗改为读取 `eventFullText`，不再只读取主界面短文。
- 普通遭遇、半途路遇、已处理事件、失败和濒死补救都接入摘要/全文分离。
- 结局页仍保留完整本局摘要，不因本轮压缩丢失复盘信息。
- QA 新增 `compact event summary contract`，防止后续退回“主界面全文 = 弹窗全文”的旧结构。

## 3. 浏览器验证

验证环境：

- URL：`http://127.0.0.1:4179/.../03_WebDemo/prototype/index.html?view=town&c=c052`
- 视口：`844x390`
- 路径：首屏遭遇 -> 打开详情 -> 处理起点遭遇 -> 打开九州图 -> 选择 `central_to_road` -> 半途路遇 -> 打开详情。

半途路遇结果：

```text
事件：当康啼垄
标签：半途路遇 · 中原驿 → 故王道
主界面摘要：荒垄里有白牙兽低啼，土下翻出新谷味。
摘要长度：18
全文长度：34
摘要模式：true
选择数量：3
页面横向/纵向溢出：false / false
游戏页面控制台错误/警告：0
```

点击 `详` 后：

```text
弹窗标题：当康啼垄
弹窗全文：荒垄里有白牙兽低啼，土下翻出新谷味。跟着啼声走，粮会多些，车会陷些。
弹窗全文长度：34
弹窗文本等于保存全文：true
弹窗文本长于主界面摘要：true
页面横向/纵向溢出：false / false
```

## 4. 自检

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
```

`novice` 1000 局仍为 `SUCCESS_RATE 100%`，前 3 步失败为 `0`。

## 5. 主线程判断

`P0-UI-002` 从“主界面文字容易回流变重”降级为“已缓解”。  
当前文本层更适合继续扩写：主界面只吃短摘要，完整山海文本进弹窗。

剩余工作：

- 真人试玩时观察玩家是否会自然点 `详`。
- 下一轮可继续把路线卡和补给卡里的说明进一步图标化。
