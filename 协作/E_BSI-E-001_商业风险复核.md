# BSI-E-001 商业风险复核

> 子线程：E 商业合规与竞品研究顾问  
> 任务：开源与竞品商业风险复核  
> 结论性质：产品侧风险判断，不构成法律意见  
> 适用阶段：网页版测试原型与后续商业化边界  

## 0. 总结判断

《不思异：九州》当前方向可以成立，但必须把参考对象拆成“通用机制”和“具体表达”两层处理。

- 低风险：自研核心循环、自研文本、自研数值、自研山海经世界观转译；使用 MIT/BSD 类前端库并保留许可证。
- 可控风险：参考《Out There》、A Dark Room、Seedship 的节奏和问题结构；使用 MPL/GPL/工具型项目时只作工具或研究，并做好隔离。
- 高风险：直接沿用竞品的 UI 布局、资源命名对应、事件结构、文案语气、结局路径、图标和视觉表达；直接把现代《山海经》译文、百科整理、插画设定改写后使用。
- 禁止使用：ChoiceScript 用于任何商业 Demo 或商业发行；未授权现代译文/插画/百科文本进入游戏正文或宣传页；直接 fork 完整开源游戏做换皮；商店页明示“山海经版 Out There”等依附竞品的表述。

建议默认路线：

```text
自研核心游戏逻辑
+ React / TypeScript
+ 可选 xyflow 做节点地图
+ 可选 inkjs 仅处理复杂文本分支
+ 不引入 A Dark Room / Seedship / ChoiceScript 代码
+ 不复制现代资料表达
```

## 1. 风险等级定义

| 等级 | 含义 | 本项目处理 |
|---|---|---|
| 低风险 | 可直接进入 Web Demo，但要保留许可证、来源和版本记录 | 可用 |
| 可控风险 | 可以研究或有限使用，但需要隔离、署名、替代表达或后续复核 | 谨慎用 |
| 高风险 | 不建议进入首版 Demo；如必须使用，需要单独授权或法律复核 | 暂缓 |
| 禁止使用 | 与商业化目标冲突，或容易形成侵权/平台/品牌风险 | 不用 |

## 2. 《Out There》玩法借鉴的安全边界

公开来源显示，《Out There: Ω Edition》由 Mi-Clos Studio / FibreTigre 开发，Steam 页面将其描述为融合 roguelike、资源管理和互动小说的太空探索游戏，并列出程序生成星系、350+ 多选文本冒险、4 个结局、飞船、外星语言、无战斗、资源补给等卖点。

### 2.1 可以安全参考的抽象机制

| 对象 | 风险等级 | 判断 |
|---|---|---|
| 节点式远行 | 低风险 | “在地图节点间移动并付出代价”是通用玩法结构，可以自研实现。 |
| 多资源压力 | 低风险 | 资源管理是通用机制，但三资源含义必须彻底转译为车轴、粮、神志。 |
| 随机事件池 | 低风险 | 随机遭遇、选择、后果是通用设计手法，可以使用自研事件数据。 |
| 失败重开 | 低风险 | Roguelike / Roguelite 常见结构，可以使用，但失败文本和奖励逻辑要原创。 |
| 未知语言理解 | 可控风险 | 可以保留“逐渐理解世界”的抽象，但不能复制外星语学习流程、界面和叙事节奏。 |
| 无战斗环境生存 | 低风险 | “不靠战斗推进”的定位是通用方向，可以作为差异化坚持。 |

### 2.2 必须避开的具体表达

| 禁止对象 | 风险等级 | 替代建议 |
|---|---|---|
| 直接使用“燃料 / 氧气 / 船体”三资源对应关系 | 高风险 | 使用车轴、粮、神志，并让数值影响路线、饥荒、认知污染，而不是飞船维护。 |
| 复制星图 UI、星系跳跃流程、飞船舱位和设备槽表达 | 禁止使用 | 改为山海图、驿路、舟车、器物槽、巫文记录。 |
| 复制事件文案、开局情境、宇航员孤独叙事、外星文明设定 | 禁止使用 | 以古代行旅队伍、王命/游记/失路、山海异域为叙事核心。 |
| 商店页写“Out There 的山海经版” | 禁止使用 | 改写为“山海经题材远行生存叙事游戏”。 |
| 复制“太空迷航 + 资源采集 + 飞船升级 + 外星语言”的组合外观 | 高风险 | 保留资源压力，删除太空、飞船、采矿、外星文明可识别表达。 |

### 2.3 本项目安全表达原则

不要说“我们把 Out There 换成山海经”。应说：

```text
这是一款以山海经式神秘地理为灵感的远行生存叙事游戏。
玩家管理车轴、粮和神志，在节点地图上穿越九州与大荒，通过事件选择、巫文理解和失败游记逐步认识一个不可完全理解的世界。
```

## 3. 候选项目与开源商业风险判断

| 对象 | 核查到的公开信息 | 风险等级 | 能否直接用 | 产品侧建议 |
|---|---|---:|---|---|
| A Dark Room | GitHub 仓库标注 MPL-2.0；公开资料显示其是开源文字冒险，源代码于 2013 年以 MPL 2.0 发布。 | 可控风险 | 不建议直接用代码 | 只研究节奏、极简反馈和渐进展开；不要复用代码、UI、文本、资源链、开局“暗室/火”等表达。 |
| inkjs | GitHub 仓库标注 MIT license；README 说明其是 ink 脚本语言的 JavaScript port，可在浏览器和 Node.js 使用。 | 低风险 | 可选直接用 | 可用于复杂分支文本，但 MVP 若 JSON 事件足够，先不引入，避免内容管线复杂化。使用时保留 MIT 许可证。 |
| xyflow / React Flow | GitHub LICENSE 为 MIT；用于 React/Svelte 节点式 UI。 | 低风险 | 可直接用 | 可用于山海图节点地图。不要照搬官方示例视觉风格；保留 MIT 许可证。 |
| Yarn Spinner | GitHub 仓库标注 MIT license；定位为游戏对话工具，Unity 版本有商店发行渠道。 | 可控风险 | Web Demo 暂不建议 | 核心仓库 MIT 可研究，但它更适合对话系统/Unity/Godot 路线。Web Demo 先用自研 JSON，后续转引擎再复核具体包。 |
| rot.js | GitHub 仓库标注 BSD-3-Clause；Roguelike Toolkit in JavaScript。 | 低风险 | 可选直接用 | 如需要随机数、调度、地图算法可用；本项目早期不做地牢，默认不引入。使用时保留 BSD 许可证并不得用作者名背书。 |
| Twine | Twine 主程序仓库标注 GPL-3.0；项目还包含多个 story format，格式各自有独立仓库。 | 可控风险 | 只作为创作工具，不嵌入产品 | 可用于纸面/叙事草稿；不建议把 Twine 引擎或导出物作为商业 Web Demo 底座，除非先复核 story format 和导出代码许可证。 |
| ChoiceScript | GitHub LICENSE 明确禁止商业用途，包括销售完整应用、用代码生成广告收入等；商业许可需联系 Choice of Games。 | 禁止使用 | 不可直接用 | 不进入 Web Demo 或商业发行；除非未来单独采购商业许可。 |
| Seedship | itch.io / Google Play 显示为 Space Goblin Games 的 HTML5 / Twine / 策略 / 互动小说游戏；未核查到可复用开源许可证。 | 高风险 | 不能用代码或文本 | 只能作为竞品研究对象。可抽象研究“短局、随机星球、押运殖民者、风险继续/定居”的设计效果，但不能使用其代码、文本、星球参数结构、宣传语或 UI。 |

## 4. 直接用 / 只能参考 / 禁止用清单

### 4.1 可以直接用

前提：记录版本、保留 LICENSE、不要复制示例视觉或示例内容。

- React / TypeScript：低风险，建议作为 Web Demo 基础。
- xyflow / React Flow：低风险，可用于节点地图。
- inkjs：低风险，可选，用于复杂叙事分支。
- rot.js：低风险，可选，用于随机、调度或 Roguelike 工具函数。
- Yarn Spinner 核心 MIT 代码：许可证层面可用，但 Web Demo 阶段不建议作为默认依赖。

### 4.2 只能参考

- 《Out There》：参考抽象机制，不参考表达。
- A Dark Room：参考极简文字生存节奏，不复用代码和开局表达。
- Seedship：参考短局随机与“继续冒险还是停下”的压力，不复用代码、文案和参数结构。
- Twine：可作为内容草稿工具，不作为商业 Demo 运行时底座。
- 现代《山海经》研究文章：只用于理解，不进入游戏文本。

### 4.3 禁止使用

- ChoiceScript：非商业限制与本项目商业化目标冲突。
- 未授权现代《山海经》白话译文、注释、百科介绍、插画、异兽设定图。
- 竞品截图、图标、UI 布局、商店页文案、事件文本、结局文本。
- “山海经版 Out There”“中国版 Out There”“精神续作 Out There”等宣传语。
- 直接 fork A Dark Room、Seedship 或其他完整游戏换皮。

## 5. 现代《山海经》资料使用边界

### 5.1 可以使用

| 类型 | 风险等级 | 使用方式 |
|---|---|---|
| 《山海经》原典中的名称、古代地名、异兽名、神话母题 | 低风险 | 可作为灵感和命名基础，但文本表达应重新创作。 |
| 公共领域古籍影印、古籍原文 | 可控风险 | 可查证设定来源；若原文进入游戏，建议极少量引用并标注出处。 |
| 学术性事实判断 | 可控风险 | 只提炼事实，不复制作者语言和结构。 |
| 自研翻译、自研解释、自研事件文本 | 低风险 | 推荐路线。 |

### 5.2 不应直接使用

| 类型 | 风险等级 | 原因 |
|---|---|---|
| 现代白话译文 | 高风险 | 翻译是独立表达，通常受著作权保护。 |
| 现代注释、考据段落、百科条目 | 高风险 | 其选择、编排、解释和文字表达有版权风险。 |
| 现代插画、异兽图鉴、设定图 | 高风险 | 美术作品权利明确，不能“参考后改一点”。 |
| 影视、游戏、漫画中的山海经二创设定 | 高风险 | 很容易继承他人的原创设定。 |
| 网络整理表格、百科描述、公众号文章 | 高风险 | 来源链不清，容易混入现代作者表达。 |

### 5.3 推荐工作方法

1. 建立“资料来源台账”：原典来源、现代参考、是否进入正文、是否需要改写。
2. 叙事线程只把现代资料当“理解辅助”，不把现代句子放进游戏。
3. 每个地点和异兽至少做一次“原创化改写”：换叙事视角、换事件功能、换资源后果。
4. 美术线程不使用现代图鉴构图；优先做抽象器物、地图符号、材质语言。
5. 商店页只说“以《山海经》神秘地理为灵感”，避免暗示忠实改编某一现代译本。

## 6. 商店页 / 宣传页应避免的表述

### 6.1 禁止或高风险说法

| 应避免表述 | 风险等级 | 原因 |
|---|---|---|
| 山海经版 Out There | 禁止使用 | 直接依附竞品品牌和表达。 |
| 中国版 Out There | 禁止使用 | 商业定位过度绑定竞品。 |
| Out There 精神续作 | 禁止使用 | 容易造成授权关系误解。 |
| 克苏鲁山海经 / 山海经克苏鲁 | 高风险 | “克苏鲁”可作为文化形容时仍易引发商标/误导/审美依附问题。 |
| 完全还原《山海经》 | 可控风险 | 内容其实是原创转译，容易引发考据预期和资料争议。 |
| 最真实山海经游戏 | 高风险 | 绝对化宣传，容易被质疑。 |
| 取材自某现代译本/某画集 | 禁止使用 | 除非已获授权。 |
| 使用某游戏同款机制 | 高风险 | 不必要地提高竞品投诉和玩家比较风险。 |

### 6.2 建议安全说法

- 山海经题材远行生存叙事游戏。
- 管理车轴、粮和神志，穿越一个越来越不可理解的九州。
- 节点地图、文字事件、资源压力和失败游记共同构成每一局远行。
- 没有传统打怪升级，主要敌人是路、饥饿和失真的认知。
- 你不是在收集怪物图鉴，而是在写一卷可能没人能读懂的荒外游记。

## 7. Web Demo 阶段许可证清单建议

建议在 Web Demo 根目录维护 `THIRD_PARTY_LICENSES.md`，至少记录以下字段：

```text
名称 / 版本 / 用途 / 许可证 / 官方仓库 / 是否进入运行时代码 / 是否修改源码 / 署名要求 / 复核日期
```

### 7.1 推荐首版清单

| 名称 | 用途 | 许可证 | 建议 |
|---|---|---|---|
| React | UI | MIT | 可用，记录版本。 |
| TypeScript | 开发工具 | Apache-2.0 | 可用，通常不进入最终运行时代码。 |
| Vite | 构建工具 | MIT | 可用，记录版本。 |
| xyflow / React Flow | 节点地图 | MIT | 若引入，保留许可证。 |
| inkjs | 叙事分支 | MIT | 若引入，保留许可证；先确认是否真的需要。 |
| rot.js | 随机/调度 | BSD-3-Clause | 若引入，保留许可证和免责声明。 |

### 7.2 不建议进入首版清单

| 名称 | 原因 |
|---|---|
| Twine runtime / story format 导出物 | GPL 主程序与 story format 分离，商业导出边界需逐项复核。 |
| Yarn Spinner | 对 Web Demo 价值不够直接，后续若转 Unity/Godot 再复核。 |
| A Dark Room | 游戏代码不是工具层依赖，直接引入会制造表达和结构风险。 |
| ChoiceScript | 非商业限制明确。 |
| Seedship | 未核实到可复用许可证，且是竞品完整游戏。 |

## 8. 来源记录

本次只使用公开页面做产品侧复核，未使用未授权素材或复制竞品表达。

- Out There: Ω Edition Steam 页面：开发/发行信息、玩法卖点、资源管理、互动小说、程序生成、语言学习等公开描述。  
  https://store.steampowered.com/app/334420/Out_There__Edition/
- A Dark Room GitHub：仓库与 MPL-2.0 标注。  
  https://github.com/doublespeakgames/adarkroom
- A Dark Room LICENSE：MPL 2.0 条款。  
  https://raw.githubusercontent.com/doublespeakgames/adarkroom/main/LICENSE.md
- inkjs GitHub：MIT license、浏览器/Node.js 使用说明。  
  https://github.com/y-lohse/inkjs
- xyflow GitHub / LICENSE：MIT license。  
  https://github.com/xyflow/xyflow  
  https://raw.githubusercontent.com/xyflow/xyflow/main/LICENSE
- Yarn Spinner GitHub：MIT license、对话工具定位。  
  https://github.com/YarnSpinnerTool/YarnSpinner
- rot.js GitHub / LICENSE：BSD-3-Clause。  
  https://github.com/ondras/rot.js  
  https://raw.githubusercontent.com/ondras/rot.js/master/license.txt
- Twine GitHub：GPL-3.0 license、story formats 分离说明。  
  https://github.com/klembot/twinejs
- ChoiceScript GitHub：CSL v1.0，明确非商业限制。  
  https://github.com/dfabulich/choicescript
- Seedship itch.io：HTML5 / Twine / 策略 / 互动小说、玩法描述。  
  https://spacegoblingames.itch.io/seedship
- Seedship Google Play：随机文本策略游戏、下载量、发行主体等公开信息。  
  https://play.google.com/store/apps/details?id=com.johnayliff.seedship
- React GitHub：MIT license。  
  https://github.com/react/react
- TypeScript GitHub：Apache-2.0 license。  
  https://github.com/microsoft/TypeScript
- Vite GitHub：MIT license。  
  https://github.com/vitejs/vite
- Classic of Mountains and Seas 公开资料：古籍年代、结构、现代译本示例。  
  https://en.wikipedia.org/wiki/Classic_of_Mountains_and_Seas
- 著作权保护期背景资料：中国大陆通常为作者终生加 50 年，现代翻译/注释需按独立作品处理。  
  https://en.wikipedia.org/wiki/List_of_copyright_duration_by_country

## 9. 需要用户决策的问题

1. Web Demo 第一版是否默认使用 `xyflow / React Flow` 做节点地图，还是先用纯文本路线列表？
2. 叙事分支是否先坚持自研 JSON 事件系统，暂不引入 `inkjs`？
3. 宣传口径是否完全避开“克苏鲁”一词，改用“认知污染 / 不可理解 / 荒外异闻”？
4. 是否建立《山海经》资料台账，把每条地点/异兽设定的原典来源和现代参考分开记录？
5. 商业发行前是否安排一次正式法律复核，重点看商店页、素材授权、开源许可证和现代资料引用？
