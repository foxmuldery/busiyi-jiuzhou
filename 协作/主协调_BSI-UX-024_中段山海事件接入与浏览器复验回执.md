# BSI-UX-024 中段山海事件接入与浏览器复验回执

时间：2026-06-20 15:20 CST

## 目标

把 B 线程 `BSI-B-026` 中最适合先落地的中段山海遭遇接进当前 Web 试玩闭环，并做一次真实浏览器路线验证。

本轮只做最小可验证步骤：

- 不新增地图节点，沿用现有地点与事件 ID。
- 升级 `鸟鼠夹道 / hollow_pass` 与 `雷泽浅畔 / ground_thunder` 两个已有事件。
- 加入 QA 契约，防止后续 UI 或内容整理时回退。

## 已完成

### 1. 鸟鼠夹道事件升级

文件：[data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)

- 事件 ID：`hollow_pass`
- 新标题：`同穴分粮`
- 地点：`鸟鼠夹道`
- 新文本：`洞口落着碎粟和白羽，山腹里传来细碎搬粮声。`
- 三项选择：
  - `留粮换暗路`：粮草 -5，神志 +3，获得 `hollow_pass_hint`
  - `拾洞口碎粟`：粮草 +5，神志 -4
  - `堵洞快行`：车轴 +3，神志 -5

### 2. 雷泽浅畔事件升级

文件：[data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)

- 事件 ID：`ground_thunder`
- 新标题：`泽鼓回雷`
- 地点：`雷泽浅畔`
- 新文本：`浅泥像鼓面，车轮每压一寸，远雷便从泥下回一声。`
- 三项选择：
  - `铺芦过鼓面`：车轴 -2，粮草 -4，神志 +2
  - `听雷辨浅路`：神志 -7，获得 `heard_ground_thunder`
  - `采雷熟芦根`：粮草 +9，神志 -3

### 3. QA 契约

文件：[qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)

新增 `mid-route shanhai encounter expansion contract`，检查：

- `同穴分粮` 标题存在。
- 鸟鼠夹道包含三项选择、粮草收益选项和 `hollow_pass_hint`。
- `泽鼓回雷` 标题存在。
- 雷泽浅畔包含三项选择、粮草收益选项和 `heard_ground_thunder`。

### 4. 浏览器缓存版本

文件：[index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)

- `data.js` 引用版本提升到 `20260620-b014`。

## 验证结果

### 自动检查

已通过：

- `node --check GitHub资产区/03_WebDemo/prototype/data.js`
- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`

平衡模拟：

- `balanced` 300 局：成功率 100%，告警率 3.3%，硬失败 0。
- `novice` 300 局：成功率 100%，新手告警 81%，补救局 1%，硬失败 0。
- 结论：默认玩家压力稳定，新手会紧张但不死局。

### 浏览器复验

测试地址：

http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=mid-shanhai-b014-1781939633947

视口：900x500 横屏。

已实测路径：

1. 中原驿开局事件正常进入结果态。
2. 九州图可选择 `中原驿 -> 故王道`。
3. 半途路遇弹窗居中显示，选项跟随弹窗。
4. 抵达 `故王道` 后，九州图显影 `雷泽浅畔 / 无名祠 / 鸟鼠夹道`。
5. 地图路线卡显示不同资源预览：
   - `鸟鼠夹道`：车轴 +5 / 粮草 +5
   - `雷泽浅畔`：粮草 +16
6. 选择 `故王道 -> 鸟鼠夹道` 后抵达。
7. 打开地点遭遇，看到：
   - 标题：`同穴分粮`
   - 文本：`洞口落着碎粟和白羽，山腹里传来细碎搬粮声。`
   - 三项选择一次性显示：
     - `留粮换暗路`
     - `拾洞口碎粟`
     - `堵洞快行`

控制台错误/警告：无。

截图接口：仍然超时，本轮采用 DOM 状态与真实点击路径作为验收证据。

## 主线程判断

这一步可以视为“中段内容扩展”已进入可玩状态。

下一步不建议继续单纯堆文字，建议做一个更有感知的最小改进：

1. 把“直接选路时若当前地点遭遇未处理”的提示变得更明确，避免玩家误以为点路没反应。
2. 再接入 `雷泽浅畔 / 泽鼓回雷` 的浏览器路径验证。
3. 开始对接 D 线程，为 `同穴分粮` 与 `泽鼓回雷` 生成方图事件配图提示语。
