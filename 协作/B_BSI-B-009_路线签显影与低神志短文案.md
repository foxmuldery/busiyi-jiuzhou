# B_BSI-B-009 路线签显影与低神志短文案

> 子线程：B，世界观、地点志、事件文本  
> 任务：BSI-B-009  
> 范围：只写协作文档，不修改 `data.js` 或其它代码  
> 用途：给 C 线程直接拆入 `routes / fogLabels / revealPlan / supplies` 的小横屏短文本

## 0. 本轮文本目标

本轮不新增长设定，优先把现有第一章文本压成横屏手机可读的短句。

- 路线卡：玩家扫一眼知道“去哪、怎么去、主要风险”。
- 雾中节点：只给剪影，不提前把未显影地点讲透。
- 显影日志：像地图自己发生了一次动作，不像旁白解释。
- 低神志提示：短、冷、偏错觉，但仍能提示玩家可走、可补、可慎选。

## 1. 路线卡短文案规范

### 1.1 长度与位置

| 字段建议 | 建议长度 | 用途 |
| --- | ---: | --- |
| `nameShort` | 8-18 字 | 路线卡主标题，小横屏优先显示 |
| `hintShort` | 8-18 字 | 路线卡副提示，替代长 `hint` |
| `lowSanityHint` | 8-18 字 | 神志低时覆盖或追加显示 |
| `lockedHintShort` | 8-18 字 | 锁路原因短提示 |

### 1.2 写法规则

- 主标题用“动作 + 地物 + 方向/结果”，例如“贴山影进入夹道西行”。
- 不在主标题里写资源数字；资源数字继续由 UI 单独显示。
- 副提示只写一个取舍：省粮、伤轴、稳神志、耗神志、补给、锁路。
- 避免“神秘、未知、命运、宿命”等泛词，优先写具体物：车辙、香灰、白羽、骨路、碑文、纸背。
- 不写完整设定句，不用长逗号串联。
- 低神志版本可以更不可靠，但不能误导玩家去理解成新机制。

### 1.3 路线卡候选短文案

| route id | `nameShort` | `hintShort` | `lowSanityHint` |
| --- | --- | --- | --- |
| `central_to_road` | 沿旧王道向西缓行 | 直道尚平少些惊扰 | 车辙记得回头路声 |
| `central_to_pass` | 绕向废关穿旧令西行 | 关墙残缺伤神志较重 | 门额在数车轮声一遍 |
| `central_to_qingqiu` | 借狐灯穿过边邑西行 | 灯火稳心少车料可取 | 灯像眼也像旧路口 |
| `road_to_marsh` | 顺深车辙驶入雷泽 | 泥浅有雷易伤车轴 | 泥下先听见车声回来 |
| `road_to_pass` | 沿旧令折回废关西口 | 旧令清楚路较稳一些 | 西字越看越往深处 |
| `road_to_shrine` | 循浅车辙寻见小祠 | 新灰问路要耗粮草 | 香灰知道你姓名了 |
| `road_to_birdmouse` | 贴山影进入鸟鼠夹道 | 少耗粮草但夜声重 | 洞声贴着车底走动 |
| `qingqiu_to_road` | 持狐灯照回旧王道 | 绕路较远但车辙稳 | 车辙被狐灯照醒了 |
| `qingqiu_to_shrine` | 绕狐灯影寻找无匾祠 | 灯引小祠会耗神志 | 灯影替你报了名一次 |
| `pass_to_market` | 趁日中影驶入黑齿市 | 可换粮草价很难明 | 摊口等着你的明日 |
| `pass_to_birdmouse` | 沿旧关墙进入鸟鼠道 | 路窄难行夜声很重 | 关影跟着车轮走动 |
| `shrine_to_marsh` | 沿香灰线驶入雷泽 | 灰指水路粮草会湿 | 灰线在纸背发亮了 |
| `shrine_to_market` | 按空名路进入黑齿市 | 空名换来市口方向 | 名字忽然少了一截 |
| `birdmouse_to_marsh` | 听山腹水声出夹道 | 洞声转水雷泽在后 | 水声从洞里回头了 |
| `birdmouse_to_market` | 穿洞影抵达日中市 | 山外浮起日中市影 | 黑齿声藏在洞里面 |
| `birdmouse_to_mire` | 听白羽声到沉羽淖 | 高压水路白羽引路 | 洞里飘出沉水羽影 |
| `marsh_to_red` | 沿暗水线靠近赤滩 | 高压芦深容易伤车 | 水色先把路染红了 |
| `marsh_to_feather` | 随沉白羽寻找渡口 | 渡口已近神志承压 | 羽毛沉着替你指路 |
| `thunder_to_mire` | 沿沉羽痕驶入白淖 | 可补粮草心神不稳 | 白羽在水下发亮了 |
| `market_to_stele` | 以旧物价换向碑路 | 市价指向一块断碑 | 碑影像一口旧价钱 |
| `market_to_feather` | 买白羽路寻找渡口 | 耗粮换渡少伤车轴 | 粮袋轻得像名字了 |
| `market_to_mire` | 循白羽价驶入浅淖 | 倒水浅处还能补给 | 价码浮在水下面了 |
| `red_to_rift` | 夜沿岸骨靠近裂隙 | 锁路高压直抵裂隙 | 浅滩只给低神志者 |
| `red_to_dream` | 沿红雾线进入梦图 | 避开直裂仍然高压 | 雾里有门在卷起来 |
| `red_to_stele` | 离赤水岸退往断碑 | 退离赤水寻找文字 | 骨路后面藏着残笔 |
| `stele_to_rift` | 照断碑文驶向裂隙 | 高压前进路线已定 | 碑文替地图补口了 |
| `stele_to_dream` | 拓断碑文进入梦驿 | 中压转入裂前梦驿 | 碑影开向纸背深处 |
| `market_to_red` | 买白羽舟渡向赤水 | 省些车轴耗掉粮草 | 白羽把水慢慢染红 |
| `mire_to_feather` | 随沉羽影找到渡口 | 浅水可过要耗粮草 | 渡口在水下眨眼了 |
| `mire_to_red` | 沿反照水靠近赤水 | 禁地已近心压更重 | 倒影先抵达赤水边 |
| `feather_to_red` | 弃旧姓名渡向赤水 | 省车却推向禁地深处 | 名字沉下，路浮起来 |
| `feather_to_dream` | 随白羽影落入梦图 | 高压直入梦图前哨 | 白羽先梦见地图边 |
| `dream_to_rift` | 照梦门缝抵达裂口 | 最后一段不像现实 | 门后不是人间旧路 |

## 2. 雾中节点短名与短提示规范

### 2.1 写法规则

- `fogLabels[id].name` 建议 4-8 字，像地图上的临时名。
- `fogLabels[id].hint` 建议 8-18 字，给一个可辨物，不给完整解释。
- 未显影前少用正式地名；可以用“影、痕、口、纸背、残笔”等临时称呼。
- 同一雾池里避免多个节点都叫“影”，优先用不同物件区分。
- 不用星、星轨、星盘等词，第一眼保持“山海舆图”。

### 2.2 雾中节点可替换文本

| location id | `name` | `hint` |
| --- | --- | --- |
| `old_king_road` | 旧道深辙 | 两道车痕压向雾里 |
| `qingqiu_outer_city` | 狐灯城影 | 小灯成排，不报真名 |
| `bird_mouse_pass` | 山腹细洞 | 细洞声贴着车轮 |
| `nameless_shrine` | 无匾小祠 | 新香灰指向岔路 |
| `thunder_marsh` | 伏雷浅泽 | 泥下有雷压着水 |
| `white_feather_mire` | 沉羽浅淖 | 白羽在水下发亮 |
| `feather_folk_ford` | 羽压水纹 | 渡口暂不肯显名 |
| `black_teeth_market` | 日中市口 | 正午处立起棚影 |
| `dream_map_post` | 梦图卷口 | 图边卷成一扇门 |
| `red_marsh` | 赤水纸背 | 红水从纸背渗出 |
| `broken_stele` | 断碑残笔 | 半截巫文露出雾 |
| `kyushu_rift` | 纸尽裂痕 | 图尽处有暗缝 |

## 3. 地图显影日志短句规范

### 3.1 写法规则

- 建议字段名：`revealTextShort` 或 `mapLogShort`。
- 建议 8-18 字；若保留现有 `revealText`，短句用于小横屏 toast / log。
- 句子结构优先“物件 + 动作 + 结果”，例如“朱砂线浮出三道”。
- 不解释为什么显影，只写地图表面的变化。
- 每条日志只出现一个主要视觉动作：浮出、渗开、卷起、压住、补上、合拢。
- 半随机显影时，保底路线日志写得确定；可抽支线日志写得像“远影/边角”。

### 3.2 `revealPlan` 可新增短日志

| location id | `revealTextShort` |
| --- | --- |
| `central_post` | 朱砂线浮出三道 |
| `old_king_road` | 车辙分开，泽气压纸 |
| `qingqiu_outer_city` | 狐灯照出两条小路 |
| `abandoned_pass` | 旧令松动，市影露角 |
| `bird_mouse_pass` | 夹道在纸上收窄 |
| `nameless_shrine` | 香灰分向泽畔与市口 |
| `thunder_marsh` | 纸背滚雷，赤水现线 |
| `black_teeth_market` | 摊布收起，两路定价 |
| `white_feather_mire` | 白羽沉下，渡向闪现 |
| `feather_folk_ford` | 白羽压水成轻桥 |
| `red_marsh` | 赤水渗开，裂痕隔雾 |
| `broken_stele` | 残笔补西，裂隙定住 |
| `dream_map_post` | 梦图卷口正对裂痕 |
| `kyushu_rift` | 地图合拢，路到尽处 |

### 3.3 半随机显影池通用短日志

| 类型 | 文案 |
| --- | --- |
| 保底路线显影 | 一条正路先压住雾 |
| 支线抽中 | 纸边又露出一角 |
| 支线未抽中 | 雾把旁路暂时盖回 |
| 补救路线显影 | 近处补出一条活路 |
| 资源危险补救 | 地图让出一处补给 |
| 雾中远影出现 | 远影只露半个名字 |
| 裂隙方向出现 | 图尽头裂开一线 |
| 刷新保持稳定 | 墨迹没有重新洗牌 |

## 4. 低神志地图/路线/补给提示短文案

这些文案可作为低神志状态下的 toast、路线卡副提示、补给按钮下方短提示，或地图雾层的随机提示。建议只在神志低于阈值时抽取，避免正常状态过早变成恐怖旁白。

### 4.1 地图显影类

| 场景 | 短文案 |
| --- | --- |
| 地图打开 | 地图边缘正在呼吸 |
| 地图雾层 | 墨线比路先动起来 |
| 地图雾层 | 雾把旧路折回来了 |
| 地图显影 | 图上多出一枚车声 |
| 地图显影 | 纸背有人正在标路 |
| 地图折叠 | 西边被折成两层了 |
| 地图路线 | 车辙开始反着发亮 |
| 赤水远影 | 红水先于地图醒来 |
| 裂隙远影 | 裂痕在图角眨眼了 |
| 裂隙远影 | 这张图记得所有人 |

### 4.2 路线选择类

| 场景 | 短文案 |
| --- | --- |
| 普通路线 | 这条路刚刚看过你 |
| 普通路线 | 车轮声被前方收走 |
| 去异域 | 下一站像在等姓名 |
| 去祠路 | 路牌写着你的回声 |
| 半随机支线 | 雾里多出一条近路 |
| 高风险近路 | 近路比远路更饥饿 |
| 旧道路线 | 旧道在脚下调头了 |
| 水路路线 | 水下车辙正在发亮 |
| 赤水路线 | 骨路只在夜里清楚 |
| 梦图路线 | 梦图门缝已经开了 |
| 锁路提示 | 这不是路而是折痕 |
| 低声提示 | 别在雾里叫地名 |

### 4.3 补给与状态类

| 场景 | 短文案 |
| --- | --- |
| 粮草补给 | 粮袋比刚才轻一口 |
| 车轴补给 | 铜钉在掌心冷起来 |
| 神志补给 | 药粉闻起来像旧水 |
| 雷泽补粮 | 芦根里藏着远雷声 |
| 白羽补粮 | 白羽鱼还在看你们 |
| 粮草危急 | 别数粮，粮会回头 |
| 黑市交易 | 旧铁换走明日一角 |
| 赤水记路 | 骨粉替地图认路了 |
| 祠灰压惊 | 这包香灰别贴身带 |
| 梦图补给 | 残图自己勒紧绳结 |
| 车轴低 | 车轴像在梦里转动 |
| 已取补给 | 这里已经取走你了 |

## 5. 给 C 线程可直接替换或新增的字段建议

### 5.1 路线字段

建议不要直接删除现有 `name / hint / lockedHint`，先新增短字段，UI 小横屏优先读短字段：

```js
{
  name: "循旧王道西行",
  hint: "直道尚平，适合作为教程段。",
  nameShort: "沿旧王道向西缓行",
  hintShort: "直道尚平少些惊扰",
  lowSanityHint: "车辙记得回头路声",
  lockedHintShort: "还缺一个裂隙名"
}
```

优先落地字段：

- `routes[].nameShort`
- `routes[].hintShort`
- `routes[].lowSanityHint`
- `routes[].lockedHintShort`

若 C 线程不想加字段，也可以把 `nameShort` 直接替换 `name`，把 `hintShort` 直接替换 `hint`；但建议保留长文，方便桌面版或详情层以后使用。

### 5.2 雾中节点字段

现有 `fogLabels[id].name / hint` 已经合适，可直接替换为第 2 节表格。若需要兼容长短两套显示，建议新增：

```js
fogLabels: {
  thunder_marsh: {
    name: "伏雷浅泽",
    hint: "泥下有雷压着水",
    longHint: "雾中有水声压着车辙。"
  }
}
```

优先落地字段：

- `fogLabels[id].name`
- `fogLabels[id].hint`
- 可选 `fogLabels[id].lowSanityHint`

### 5.3 显影日志字段

现有 `revealPlan[id].revealText` 适合地点页或日志详情，但横屏 toast 偏长。建议新增：

```js
revealPlan: {
  central_post: {
    routes: ["central_to_road", "central_to_pass"],
    fogLocations: ["thunder_marsh"],
    fogRoutes: ["road_to_marsh"],
    revealText: "驿外旧图吸了潮，西边三道朱砂线先浮出来。",
    revealTextShort: "朱砂线浮出三道",
    lowSanityRevealText: "墨线比路先动起来"
  }
}
```

优先落地字段：

- `revealPlan[id].revealTextShort`
- `revealPlan[id].lowSanityRevealText`
- 可选 `revealPlan[id].poolRevealTextShort`

### 5.4 半随机显影池文案字段

若 C 线程采用 `requiredRoutes / optionalRoutes / optionalCount / fogPool`，建议文案跟池子同层，方便抽中后显示：

```js
revealPlan: {
  old_king_road: {
    requiredRoutes: ["road_to_pass"],
    optionalRoutes: ["road_to_marsh", "road_to_shrine", "road_to_birdmouse"],
    optionalCount: 2,
    fogPool: ["red_marsh", "white_feather_mire"],
    revealTextShort: "车辙分开，泽气压纸",
    requiredRevealText: "一条正路先压住雾",
    optionalRevealText: "纸边又露出一角",
    rescueRevealText: "近处补出一条活路"
  }
}
```

建议字段：

- `requiredRevealText`
- `optionalRevealText`
- `rescueRevealText`
- `fogPoolText`

### 5.5 补给状态短提示字段

主协调要求补给预览区分“可补 / 已取 / 本次已补”。建议每个 `supply` 可新增状态文案；不加时由 UI 用通用文案兜底。

```js
{
  id: "central_grain",
  label: "清点驿粮",
  hint: "粮草 +8",
  stateText: {
    available: "可补粮草",
    taken: "已取走",
    takenThisVisit: "本次已补",
    lowSanity: "粮袋像少了一口"
  }
}
```

通用状态文案建议：

| 状态 | 文案 |
| --- | --- |
| `available` | 此处还能补给 |
| `taken` | 此处已取过 |
| `takenThisVisit` | 本次抵达已补 |
| `locked` | 条件未满足 |
| `dangerAxle` | 先救车轴 |
| `dangerGrain` | 先找粮草 |
| `dangerSanity` | 先稳神志 |
| `lowSanity` | 补给看着不对 |

## 6. 最适合立刻合并的 10 条短文案

这 10 条覆盖路线卡、雾中节点、显影日志和低神志提示，字段明确，改动小，最适合先并入 C 线程：

1. `routes.central_to_road.nameShort`: 沿旧王道向西缓行
2. `routes.road_to_birdmouse.hintShort`: 少耗粮草但夜声重
3. `routes.red_to_rift.lockedHintShort`: 还缺骨路或裂隙名
4. `fogLabels.thunder_marsh.name`: 伏雷浅泽
5. `fogLabels.red_marsh.hint`: 红水从纸背渗出
6. `revealPlan.central_post.revealTextShort`: 朱砂线浮出三道
7. `revealPlan.red_marsh.revealTextShort`: 赤水渗开，裂痕隔雾
8. `lowSanity.map`: 地图边缘正在呼吸
9. `lowSanity.route`: 雾里多出一条近路
10. `supply.stateText.takenThisVisit`: 本次抵达已补
