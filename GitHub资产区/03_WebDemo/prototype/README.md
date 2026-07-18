# 《不思异：九州》Web Demo 静态原型

这是 C 线程制作的第一版轻量原型代码，用于验证：

- 横向山海旅途舞台是假动态表现层，不是横版动作游戏。
- 底层逻辑仍然是节点、路线、事件和三资源。
- 路线选择会扣车轴、粮草、神志，并触发地点事件。
- 神志区间会切换事件文本。
- 每个地点会展示地点志，并记录已抵达见闻数量。
- 每个地点都有抵达句；有补给的地点都有补给发现句，避免随机显影地点只有数值没有探索反馈。
- 每个地点有差异化的一次性补给：驿站较全，废关偏修车，雷泽偏粮，断碑偏神志，黑齿市偏交易。
- 神志、flag 和语言理解度可以影响路线或选项是否出现。
- 地点、路线、事件、危机补救数据已拆到 `data.js`，运行逻辑保留在 `app.js`。
- 车轴、粮草、神志触底会进入最小濒死补救，不再直接停在死局。
- 连续补救过多、同类危机反复或坏运过高时会进入“旅途断绝”硬失败，并提供重开按钮。
- 已加入 `badLuckMeter` 和失败原因统计骨架，供后续自动平衡模拟器读取。
- 已接入首版音频纵切片：旅途循环音乐、地形音乐轮换、地点级音乐轮换、神志污染层、选择/资源/危机音效，默认静音，点击后启用。
- 已接入首次有效操作启声：玩家第一次补给、选路或处理事件时会尝试启用旅途声场；若玩家手动关闭音乐，则本局不再自动打开。
- 已接入设置面板音乐试听入口：可直接试听 6 首核心音乐候选，点击“跟随旅途”恢复地点/地形轮换。
- 已接入 HUD 曲牌小章：主界面直接显示当前音乐候选 ID 与适用场景，点击可打开设置试听面板。
- 已接入地图三短音效占位：显影、选路、半途路遇均有反馈钩子；当前仍是临时素材，不代表正式授权音色。
- 已接入地图 UI 切片纹理：节点、当前定位、可走路线和雾中城影使用已抠图素材，路线逻辑仍由数据层控制。
- 已接入半途路遇：路线先扣基础消耗，半途处理事件后才会抵达下一站。
- 已接入旅途章节进度带：桌面显示短地点名，小横屏只保留点状进度。
- 已接入轻量里程反馈：见闻入志、地图显影和新结局收录会触发非阻塞浮层。
- 已接入真人试玩下一步引导：顶部“下一步”会同步标记当前主操作，并对遭遇、补给、开图、选路、危机补救等目标按钮做克制高亮。
- 已接入低资源视觉压力：车轴、粮草、神志告急时，资源牌、舞台状态灯、车队和神志污染层会同步反馈。
- 已把路线消耗和补给收益升级为资源图标芯片：车轴、粮草、神志用小图标配数值，减少小横屏文字负担。
- 已接入本局试玩复盘：日志抽屉顶部会汇总状态、路线、补给、路遇、补救和资源最低点，并可一键复制给测试记录。
- 已接入见闻图鉴：日志抽屉会显示已抵达地点缩略图，点击可回看地点志大图和地点说明，强化探索成就感。
- 已接入遭遇图鉴：日志抽屉会显示本局已处理的地点事件和半途路遇，点击可回看遭遇图、诗引和落账结果，让山海异象也能被“收入见闻”。
- 行旅日志和当前局状态会写入 localStorage。
- 动态表现可关闭，并遵守 `prefers-reduced-motion`。
- 视频层预留为可降级表现层；当前不导入任何视频素材。
- 已接入已整理视觉资产：`BG-006`、`BG-005`、`FG-003`、`OV-004`、`OV-003`、`CAR-013`。
- 已接入 A 组风格锁定路段图清单：`MID-BG-ROAD/MARKET/WATER/RIFT-001` 四张长图放入 `02_设计资产/可用素材/A组风格锁定/` 后，运行 `asset-readiness-check.js --write-manifest`，通过清单覆盖对应地形舞台；没有文件时继续使用现有背景，不阻塞试玩，也不在控制台制造缺图 404。
- 已接入 B/C 组专属图清单：D020/D023 生成或临时派生的 `LOC/EVT` 图放入 `02_设计资产/可用素材/B组地点事件图/`，`RTE/RND/CRS/END` 图放入 `02_设计资产/可用素材/C组路遇危机结局图/` 后，运行 `asset-readiness-check.js --write-manifest`，通过清单覆盖对应地点、事件、路遇、危机和结局图；没有文件时继续使用现有插图，不阻塞试玩，也不在控制台制造缺图 404。
- 已接入画面素材状态：试玩入口会显示 59 张试玩图的全量进度，并分组展示路段、地点、事件、路遇、随机、危机、结局的 ready 数；当前 QA 已把 `59/59 ready`、高频重生图 `11/11 replaced` 和 ready 文件存在性纳入守门。
- 已接入声音状态：试玩入口会显示音乐 6 首待听、环境 1 层临时、神志 2 层临时、短音 11 个临时，并直达试听面板、P0 音频听感验收工作台和音频验收清单；设置抽屉里的每首候选音乐可直接标记“保留 / 待改 / 弃用”，复制听感模板时会自动带上本轮标记；当前只代表可跑与待复核，不代表正式授权或最终音色。
- 已压缩试玩入口为 P0 一屏启动器：1365x768 桌面和 844x390 横屏手机尺寸已用 Chromium 截图复验，核心测试入口、复制按钮、画面状态、声音状态和机制平衡状态均在首屏内。
- 已接入 P0 真人试玩验收工作台：可粘贴 5 分钟试玩记录、音频听感和本局复盘，按“下一步、复盘、资源、UI、声音”五项门槛生成主线程验收摘要。
- 已接入 P0 试玩版总验收报告：`p0-readiness-check.js --write-report` 会汇总总 QA、自动试玩链、P0/P1 平衡门槛、全量试玩图、高频图替换、声音可试玩状态、测试者交付入口和真人试玩待确认项，并同步生成 `p0-readiness-status.js` 供试玩入口直接显示机器项、待人工项和下一步。
- 已加入内部试玩派生工具：`derive-playtest-art.js` 可用现有大图裁切出缺失的试玩图，帮助机制测试先跑起来；这些派生图只作为内部 Demo 占位，正式美术仍需逐张复核和替换。
- 已接入事件图示映射：地点事件和半途路遇会优先使用各自插图，缺失时再回退到地点图；小横屏折叠态保留缩略图入口，点击地点图或遭遇图可打开详情大图；当前多为现有地点/背景资产临时复用，供正式事件图生成前先跑体验。
- 已接入横向舞台阶段提示：风景层左上会随状态显示停靠、补给、可开图、选路、行路、半途、困厄或结局，让玩家不用读长说明也能判断当前层级。
- 已接入九州图路线预览条：第一次点路线会显示目的地、消耗、半途路遇和补给倾向，并明确“再点启程”，降低触屏误操作。
- 已优化触屏弹窗：有选择项时禁止正文/空白误触关闭；结果、地点志和图鉴回看可轻点任意非按钮区域继续或返回，不再依赖可见关闭键。
- 已接入视图切换反馈：旅途 / 九州图切换会出现短暂浮层提示，并配合轻音效，让地图与城镇切换更像游戏状态变化。
- 已优化地图阻塞态：当前遭遇、半途路遇或困厄未处理时，九州图路线预览条可直接点击回旅途，减少“开了地图但不能走”的迷路感。
- 已接入“诗泉”古诗词 API 内容层：右上“古辞”抽屉会按当前地点/地形取诗词，失败时使用本地兜底诗笺，不阻塞主玩法。
- 已加入固定“诗引”覆盖表：地点志、事件、路遇、危机补救、结局和地图路线卡都会先显示一句对应古诗词，再进入说明文本。
- 已统一诗引排版：诗句按一句或两句一行显示，诗题与作者独立换行；旧式 `诗句 —— 作者《篇名》` 单行文本也会自动拆开，适配手机横屏弹窗和路线卡。
- 已接入低神志地点志：地点志会随神志从“所见可信”转向“异象增多 / 所见不真”，地点图鉴弹窗也同步显示污染态。

## 打开方式

线上试玩地址：

```text
https://webdeploy-green.vercel.app/
```

线上干净新局：

```text
https://webdeploy-green.vercel.app/play
```

访问密码：

```text
tusun2026
```

说明：当前线上包是静态试玩站，带轻量密码门和 `X-Robots-Tag: noindex`，用于小范围内部试玩；密码门只是防止随手扩散，不等于正式账号系统或服务器级保密。

公开入口页已带“复制试玩邀请”“复制 5 分钟任务”“复制听音任务”和“复制反馈模板”。外发时先复制试玩邀请，用一条短消息邀请测试者；对方愿意参与后，再让他看 5 分钟任务。需要单独判断声音时，把 3 分钟听音任务发给听音人并回收 `P0 音频听感验收摘要`。测试者走到结局后回传“复盘本局”里的 `P0 试玩反馈包`，未走到结局时再用反馈模板和游戏内“志”的本局复盘兜底。正式发测前先把名单登记到 `P0发测批次台.html`，记录渠道、发送时间和追收时间；收到多份反馈时，再集中粘贴到 `P0人工反馈收件台.html`，用编号、缺口和补收消息做第一层整理，最后把可验收候选转入真人验收台。

给非技术测试者，优先打开试玩入口页：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/试玩入口.html
```

直接用浏览器打开：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html
```

若需要验证音频、古辞 API 或浏览器权限差异，建议用本地静态服务访问：

```text
http://127.0.0.1:4177/03_WebDemo/prototype/
```

当前常用本地预览端口：

```text
http://127.0.0.1:4178/03_WebDemo/prototype/
```

如果从仓库根目录 `/Users/yuanzhe/Documents/game` 启动本地服务，URL 需要包含 `GitHub资产区`：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/
```

发给测试者时，建议使用干净试玩入口，避免旧存档让玩家直接落在半途或结局页：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1
```

`?fresh=1` 或 `?reset=1` 只会让本次打开从新局开始；普通入口仍会继续当前浏览器里的存档。

`试玩入口.html` 已把“开始干净新局 / 继续存档 / 地图视图 / 音乐试听面板 / 本局复盘 / 结局复盘场景 / 低资源压力场景”做成可点击入口，并提供“推荐 5 分钟试玩”任务卡、“看懂下一步 / 感到资源紧 / 愿意再走一站”三项观察目标、“复制试玩说明”“复制测试链接”“复制 5 分钟任务”“复制反馈模板”“复制听感模板”“复制完整试玩包”和“复制回收清单”按钮；试玩说明是给第一次接触项目的人阅读的极短介绍，5 分钟任务是直接发给测试者本人的短任务，完整试玩包会同时带出 P0 发测批次台、P0 真人试玩验收台、P0 人工反馈收件台、P0 反馈填写页和 P0 音频听感验收台链接，提醒测试者优先回传结局 `P0 试玩反馈包`。回收清单面向主线程，明确优先回收结局反馈包，未通关时再收《5分钟试玩记录》《音频听感复核》和游戏内“志”的本局复盘，并提示用反馈证据雷达检查下一步、复盘、资源、UI、声音五类证据。如果浏览器不允许直接写入剪贴板，入口页会展开可手动复制的试玩说明、链接、5 分钟任务、反馈模板、听感模板、完整试玩包或人工回收清单。

正式发测前，可先打开 P0 发测批次台：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0发测批次台.html
```

`P0发测批次台.html` 用来记录这一批发给谁、从哪个渠道发出、何时追收、当前是 `待发送 / 已发送 / 待追收 / 已完成 / 阻断`。它可以复制本批试玩邀请、追收消息、发测汇总和 JSON。收到反馈后，不直接散落在聊天里，先进入 `P0人工反馈收件台.html` 编号。

主线程同时收到多份反馈时，先打开 P0 人工反馈收件台：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0人工反馈收件台.html
```

`P0人工反馈收件台.html` 会给每份反馈生成 `P0-FB-*` 编号，自动检查是否缺《5分钟试玩记录》《音频听感复核》《本局复盘》，并给出 `可验收候选 / 需补材料 / 阻断反馈` 状态。需要追问测试者时，点击“复制本条补收消息”；阶段收口时，点击“复制收件汇总”，再把完整候选贴入真人验收台。

主线程汇总完整真人反馈时，可打开 P0 验收工作台：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0真人试玩验收工作台.html
```

它用于粘贴 5 分钟试玩记录、音频听感和本局复盘，并输出可复制的《P0 真人试玩验收摘要》。工作台会用“三段材料回收状态”先判断试玩记录、音频听感、游戏内“志”本局复盘是否齐全，再用“反馈证据雷达”提示下一步、复盘、资源、UI、音频五类证据是否已经出现在反馈里；它不替代人工判断，只把 P0 门槛收成可评审记录。

如果材料没收齐，可在同一工作台点击“复制补收消息”。它会根据当前缺口自动生成追问文本，提醒测试者补 `5分钟试玩记录`、`音频听感复核` 或游戏内“志”的本局复盘，避免主线程临时手写追问。

音乐主观听感复核可直接打开设置抽屉：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&drawer=settings
```

听感反馈可从 `试玩入口.html` 或游戏内设置抽屉直接复制。游戏内设置抽屉支持先对 `MUS-CORE-001/002/003/004/005/006` 点击“保留 / 待改 / 弃用”，再复制听感模板；模板会自动带出本轮试听标记，并继续询问第一章主音乐、旅途环境层、神志层、地图/选路/抵达/资源短音效、是否愿意默认开低音量音乐。

如果要逐条试听并生成可复制结论，可打开 P0 音频听感验收工作台：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0音频听感验收工作台.html
```

它会直接读取 `data.js` 的音频资产，按音乐、环境、神志、告急、短音和地图音效分组；每条可标记“保留 / 待改 / 弃用”。工作台会用“顺序试听”显示当前条目，支持上一条、听当前、下一条，并在标记后自动跳到下一条未评声音；“分层验收门槛”会显示每个声音层的已评数量，并在《P0 音频听感验收摘要》里写出分层缺口。标为“待改 / 弃用”的声音会进入“待改/弃用重做清单”，可单独复制给 F 线程或用于下一轮生成。这里仍然只代表内部听感，不代表正式授权完成。

真人试玩结束后，可直接打开当前本局复盘弹窗：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?recap=1
```

结局和复盘入口可用这个固定场景快速复核：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&ending=rift&recap=1
```

## 本地 QA 检查

每轮改动后可运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js
```

它会检查：数据一屏预算、媒体文件引用、A 组生成路段图可选覆盖契约、B/C 组专属图可选覆盖契约、全量生成图 `59/59 ready`、事件/路遇图示覆盖、图示点击打开详情大图、见闻图鉴、遭遇图鉴、音乐入口、音乐候选试听、音乐试听深链、地形/地点音乐轮换、新增核心音乐候选内部复核接入、章节进度带、下一步目标高亮、里程反馈、低资源视觉压力、资源图标芯片、干净试玩入口、试玩入口页、本局试玩复盘、全地点抵达/补给发现文案覆盖、详情弹窗、行囊抽屉、固定诗引覆盖和小横屏无滚动条策略。

小横屏低资源视觉验收可用：

```text
http://127.0.0.1:4178/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?pressure=low
```

该参数只用于截图/验收，不会写回玩家存档。

也可运行一条不依赖浏览器的核心循环 smoke：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

它会模拟：起点事件选择、第一条路线消耗、半途路遇、抵达下一站和补给数据可读性；同时会沿当前稳定主线走到九州裂隙，检查完整路径、每站一次补给、半途路遇、地点事件和结局入口不断链。

如果要检查“真人试玩入口 -> 第一局 -> 复盘反馈”这条链，可运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
```

它会检查试玩入口、三项观察目标、复制链接/反馈模板兜底、第一分钟事件、每站补给、路线与半途路遇、终点结局和复盘复制入口，并输出：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/playtest-flow-status.md
```

如果要生成 P0 试玩版总验收报告，可运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report
```

它会生成：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/p0-readiness-status.js
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.md
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/P0试玩版总验收报告.html
```

试玩入口会读取 `p0-readiness-status.js`，在首屏显示 “P0 总验收” 状态卡。当前总验收的机器项已通过，剩余人工项是音频主观听感和真人 5 分钟试玩记录。P0 总验收报告的人工收口路径以线上公开入口 `https://webdeploy-green.vercel.app/` 为优先外发入口，密码为 `tusun2026`；需要完整交接时再从内部 `试玩入口.html` 复制完整试玩包。发测前先进入 `P0发测批次台.html` 记录批次、任务类型、目标反馈数、已回收反馈和追收时间；多份反馈先进入 `P0人工反馈收件台.html` 编号和补缺，再把可验收候选贴入 `P0真人试玩验收工作台.html`。

如果要验证公开站的真实画面渲染，可运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-smoke-check.js --write-report
```

它会用本机 Chrome 打开线上公开入口和 844x390 小横屏游戏首屏，生成两张截图和 `visual-smoke-status.md/js`。P0 总验收会读取该状态，确认公开入口的试玩邀请兜底、小横屏资源栏、下一步提示、遭遇选项和横向溢出状态。

如果要看随机性和资源压力是否稳定，可运行平衡模拟：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs=1000 --strategy=novice
```

如果要刷新试玩入口页右侧“机制平衡”状态和 Markdown 报告：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs=1000 --write-status --write-report
```

它会分别模拟谨慎、均衡、冒险、新手四类玩家，输出到：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-status.js
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-status.md
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-status.html
```

入口页会链接到 HTML 版，避免浏览器直接打开 Markdown 时出现编码乱码；Markdown 版保留给交接和版本记录。

当前报告会同时写入 P0 / P1 门槛：四策略通关率、硬失败、前 3 步死局、默认玩家告警、新手压力告警、新手补救局、新手神志 P10 和粮草 P10 下限。P0 试玩版先看“能通关、不早死、有压力”；P1 再继续调压力曲线和资源下限。

生成图投放后，可运行素材就绪检查：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

默认模式只报告 A/B/C 组生成图缺口，不阻塞当前 Demo。正式验收时使用严格模式：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --strict
```

严格模式会把缺图、无法读取尺寸、比例不对或分辨率过低视为失败。

如果只想看第一轮最该生成的 12 张图：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
```

如果要贴给生图线程或视觉交互线程，可直接输出 Markdown 表：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority --markdown
```

如果要生成“首轮 12 张关键图”的导入核名工作台：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-import-workbench
```

工作台会列出正式目标文件名、规格、当前状态和现有参考候选，输出到：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-import-workbench.md
```

如果只刷新试玩入口页右侧的“全量生成图”状态卡：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-entry-status
```

`--write-manifest` 和 `--write-import-workbench` 也会同步刷新这个状态卡。

如果要追踪 D024 复核指出的 11 张高频重生图是否已经被新图替换：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-report
```

报告、试玩入口页右侧“高频重生图”状态和 11 张专用生产工作台会同步刷新，输出到：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-status.md
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-status.js
/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/highfreq-visual-replacement-workbench.md
```

其中“占位”表示仍是 C083 派生图；把新生成图按同名文件覆盖后，会变成“已替换”。常规验收可运行：

注意：地点图仍按 16:9 横图验收；高频遭遇、路遇、危机、结局图支持 `1:1 / 4:3 / 16:9`，最低 `960x720`，便于按弹窗视觉生成方图或近方图。

建议不要手动直接覆盖正式素材。把高频重生图先放到导入区：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/待复核素材/高频重生图导入/
```

先 dry-run 检查命名、尺寸和比例：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js
```

确认无误后再写入，脚本会把旧图备份到 `02_设计资产/待复核素材/高频重生图备份/`：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/highfreq-visual-import.js --apply
```

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --strict
```

如果只刷新入口页卡片，不改 Markdown 报告：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-status
```

如果只重建 11 张高频图的生产/导入工作台：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-workbench
```

等 11 张重生图全部替换完后，再使用完成态验收：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --strict-replaced
```

如果要用现有大图快速补齐内部试玩缺口，可先 dry-run 看将生成哪些图，再正式派生：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/derive-playtest-art.js --dry-run
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/derive-playtest-art.js
```

派生工具会优先跳过已存在文件；如果要覆盖旧派生图，才使用 `--overwrite`。

生成图放入对应目录后，运行下面命令刷新网页加载清单。默认试玩只加载清单里确认 ready 的生成图，因此不会为了探测缺图而刷 404：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
```

如果需要临时在浏览器里主动探测缺图，可在地址后加 `probeGeneratedAssets=1`。这个模式只用于调试，不建议发给试玩者。

也可运行批量平衡模拟：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy balanced
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy conservative
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy risky
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/balance-sim.js --runs 1000 --seed p0 --strategy novice
```

它会统计通关率、平均步数、随机路遇次数、失败原因、危机次数、三资源最低点、高压路线、触达告警线的局数、补救局数和失败发生阶段。当前 P0 基线中四种策略 1000 局均能进入裂隙；默认/谨慎策略几乎无压力，`novice` 失误玩家会大量触达神志/粮草告警线但不会前 3 步死局。

## 3-5 分钟核心循环测试

1. 打开 `index.html`，确认顶部显示车轴、粮草、神志和 6 段旅途进度。
2. 打开“设置”，点击音乐候选试听，确认当前音乐切换；点击“跟随旅途”后恢复地点/地形音乐。也可点击“播放音乐”，切换到水泽、裂隙、故王道或黑齿市时，确认音频详情显示对应地形或地点音乐。
3. 在“九州图”里选择“循旧王道西行”，观察资源扣减、选路音效和半途状态提示。
4. 回到“旅途”处理半途路遇，确认处理后才抵达“故王道”。
5. 抵达“故王道”后阅读地点志，确认见闻计数增加。
6. 点击一个补给选项，确认资源变化、日志写入，并且该补给变为“已搜集”。
7. 点击一个事件选项，确认执行中主选项区立即收起；落账后旧选择消失，并提示打开九州图继续选路。
8. 连续选择路线进入“赤水外滩”，确认“夜近裂隙”会先显示为“尚未显明”。
9. 在赤水事件中选择“凝视赤水辨路”，确认神志触底并出现“神志崩线”补救。
10. 点击补救选择，确认队伍回到可玩状态，日志和困厄统计更新。
11. 打开右上“志”，确认复盘卡显示本局状态、路线、资源最低点、补给和路遇次数；见闻图鉴和遭遇图鉴都能点开大图回看；点击“复制”可写入试玩记录。
12. 也可在控制台执行 `window.BSI_PROTOTYPE.setTestState({ resources: { axle: 0 } })`，单独确认“断轴边缘”补救。
13. 执行 `window.BSI_PROTOTYPE.setTestState({ resources: { axle: 0 }, failureStats: { rescues: 3 } })`，确认进入“旅途断绝”失败态。
14. 点击右上“古辞”，确认出现当前地点诗笺；点击“换一条”请求诗泉 API，点击“收入日志”确认日志新增古辞记录。
15. 切换不同地点、路遇、危机或结局状态时，确认说明区第一句都是固定诗引，且诗句和当前场景主题相符。

## 诗泉 API 接入方式

当前原型使用公开接口：

```text
https://poetry.palemoky.com/api/poems/random?lang=zh-Hans
```

地点会在 `data.js` 的 `poetryContent.terrainProfiles` 和 `poetryContent.locationProfiles` 中映射筛选条件，例如 `dynasty=唐&type=五言律诗`。接口返回结构为：

```json
{
  "data": {
    "title": "诗题",
    "content": ["第一句", "第二句"],
    "author": { "name": "作者" },
    "dynasty": { "name": "朝代" },
    "type": { "name": "体裁" }
  },
  "lang": "zh-Hans"
}
```

如果后续要自托管，可用官方 Docker 服务：

```text
docker run -d -p 1279:1279 palemoky/chinese-poetry-api:latest
```

自托管 README 里的 REST 路径是 `http://localhost:1279/api/v1/poems/random`；公开站点当前使用 `/api/poems/random`。正式发布前需要复核诗词数据源与 GPL-3.0 API 服务的授权边界，并保留来源标注。

注意：2026-06-15 实测公开站点 JSON 响应没有返回 `Access-Control-Allow-Origin`，所以直接用 `file://` 打开本原型时，浏览器可能拦截跨域 `fetch`。当前代码会自动降级到 `fallbackPoems`。如果要稳定批量增加内容，建议用 Node/后端在构建期拉取诗词后写入本地数据，或在正式服务里做同源代理。

固定诗引不依赖实时 API，放在 `data.js` 的 `poetryContent.sceneVerses`：

- `locations`：每个地点的地点志开头。
- `events`：每个地点事件的当前说明开头。
- `routeEvents`：每个半途路遇的说明开头。
- `crisisEvents`：断轴、饥荒、失神补救的说明开头。
- `endings`：入裂隙、归中原、旅途断绝的结局说明开头。
- `routes`：可选；未单独配置时，地图路线卡会使用目的地的地点诗引。

`window.BSI_PROTOTYPE.validate()` 会检查上述固定诗引是否覆盖所有地点、事件、路遇、危机和结局，后续新增随机场景时应先补 `sceneVerses`。

诗引选择要跟世界观叙事一起校，不只看字面风景：

- 优先服务“凡人车队离开人间、进入山海异域”的远行压力。
- 地点诗引要对应地理异常、风俗、异族交易方式、禁忌或可补给资源。
- 事件和路遇诗引要先提示叙事功能：禁行、误读、交易、读名、梦图、白骨、裂隙、危机补救。
- 低神志相关内容优先使用梦、魂、碑、名、不可归、道阻等意象，避免只做普通山水抒情。
- 可适度重复同一句，让地点和对应事件形成主题回响；不为去重牺牲准确性。

## 当前假数据与边界

- 地点、路线、事件和补给已经拆成 `data.js` 样例数据，但还不是 A/B 线程正式数据表。
- 三资源数值是测试值，不代表最终平衡。
- 濒死补救和 `badLuckMeter` 是最小骨架，当前只保证不死局和可统计，不代表最终困厄规则。
- 音频引用待复核/临时素材：`MUS-CORE-001/003/004` 已用于古道、水泽、废墟/裂隙地形轮换，`MUS-CORE-005/006` 已用于故王道、鸟鼠夹道、无名祠、青丘外邑、黑齿市、羽民渡等地点级轮换；设置面板可直接试听 5 首核心音乐候选；音乐候选仍为 `review-pending`，神志层和短音效为 `demo-temporary`，不代表正式授权完成。
- 横向舞台使用已整理静态素材和 CSS 假动态，没有接入视频文件；默认改为“风景主导”模式，背景长卷和前景层承担主要行进感。
- `CAR-013` 仍作为可回退的车队前景层保留，但当前只用作很淡的远行状态标记，避免车队与地面不贴合时抢走画面重心。
- 地点事件和半途路遇已经有图示数据层与渲染入口，但当前不是最终美术清单；正式版仍需按 D 线程统一美学规范补专属事件图、小动画或短循环。
- 自动平衡模拟器已实现 P0 基线统计，支持 `balanced`、`conservative`、`risky`、`novice` 四种策略；当前仍是静态数据模拟，不等同于真人试玩手感。
- 古辞层现在只作为氛围/日志内容，不改写路线、资源和事件结算；在线请求失败时会自动降级到 `fallbackPoems`。固定诗引独立于在线请求，保证每段说明开头稳定有诗词。

## 当前边界

- 未安装依赖。
- 未使用 React/Vite。
- 未导入视频素材。
- 未引入 Phaser、Pixi 或其他游戏引擎。
- 当前是静态原型，不是正式工程。

## 调试入口

浏览器控制台可运行：

```js
window.BSI_PROTOTYPE.validate()
window.BSI_PROTOTYPE.getState()
window.BSI_PROTOTYPE.getAudioState()
window.BSI_PROTOTYPE.getBalanceInputs()
window.BSI_PROTOTYPE.getVisibleSupplies()
await window.BSI_PROTOTYPE.moveRoute(window.BSI_PROTOTYPE.getVisibleRoutes()[0].id)
await window.BSI_PROTOTYPE.chooseOption(0)
await window.BSI_PROTOTYPE.useSupply(window.BSI_PROTOTYPE.getVisibleSupplies()[0].id)
window.BSI_PROTOTYPE.setTestState({ resources: { axle: 0 } })
window.BSI_PROTOTYPE.forceCrisis("sanity")
```

常用 URL 验收参数：

```text
?fresh=1&captureLocation=old_king_road&captureResources=axle:4,grain:22,sanity:18
?fresh=1&captureLocation=feather_folk_ford&captureResources=axle:18,grain:6,sanity:18
?fresh=1&pressure=low&captureLocation=red_marsh
?fresh=1&captureLocation=old_king_road&captureResources=axle:4,grain:22,sanity:18&captureFailureStats=rescues:3
```

`captureLocation` 用于直达指定地点，`captureResources` 用于临时设置三资源，格式为 `axle:4,grain:22,sanity:18`；`captureFailureStats` 用于临时设置失败计数，格式为 `rescues:3`，方便复现多次补救后的 `旅途断绝`。这些参数仅用于内部 QA，不改变普通试玩入口。

`validate()` 会检查地点、路线、事件、危机补救、选项、条件、结局和数值字段是否有明显断链。

## 下一步建议

短期先不要急着迁移框架。当前最值得继续推进的是：

- 真人 5 到 8 分钟试玩复盘，确认玩家是否自然理解“事件 → 补给 → 开图选路 → 半途路遇 → 抵达”的节奏。
- 主观试听当前音乐、神志层和 `travelAmbience` 旅途环境层，决定哪些可继续作为内部占位。
- 用《山野逸事》第三部主创资料交接机制试运行 3 到 5 个旧设定，先转出 1 到 2 条新事件。
- 继续替换关键事件图、路遇图和结局图，让视觉从“地点兜底”推进到“遭遇专属”。

如果主线程验收方向成立，再把这版静态原型迁移到 React + TypeScript + Vite，并拆成：

- `JourneyStage`
- `RoutePanel`
- `EventPanel`
- `ResourcePanel`
- `LogPanel`
- `routeSystem`
- `eventSystem`
- `saveSystem`
