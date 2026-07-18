# B_BSI-B-008 第一章可合并事件与补给文本

> 子线程：B，世界观、地点志、事件文本  
> 任务：BSI-B-008  
> 范围：只写协作文档，不修改 `data.js` 或其它代码  
> 用途：给 C 线程直接拆入 `locations / events / fogLabels / revealPlan`

## 0. 首版选择

本轮建议先合并 10 个地点：

1. `central_post` 中原驿
2. `old_king_road` 故王道
3. `abandoned_pass` 废关
4. `bird_mouse_pass` 鸟鼠夹道
5. `thunder_marsh` 雷泽浅畔
6. `white_feather_mire` 白羽淖
7. `black_teeth_market` 黑齿市
8. `red_marsh` 赤水外滩
9. `broken_stele` 巫咸断碑
10. `kyushu_rift` 九州裂隙

选择理由：这 10 个点能形成“人间秩序 -> 旧道分流 -> 山隘/泽地/边市取舍 -> 禁地高压 -> 巫文校准 -> 裂隙收束”的第一章闭环，且三资源定位清楚。

## 1. 可合并地点对象

### 1.1 中原驿

资源定位：低风险起点，补车轴和粮草，让玩家理解补给会改变资源。

```js
{
  id: "central_post",
  name: "中原驿",
  region: "人间边境",
  terrain: "road",
  fogName: "人间最后一灯",
  revealText: "驿外旧图吸了潮，西边两道朱砂线先浮出来。",
  detail: "驿灯照着旧王朝的里程木牌。这里还按人间规矩记账、分粮、修车。",
  supplies: [
    {
      id: "central_repair",
      label: "借驿钉修轴",
      hint: "车轴 +8，粮草 -2",
      effect: { axle: 8, grain: -2, sanity: 0 },
      result: "旧铜钉楔进轮毂，车声稳了一些。"
    },
    {
      id: "central_grain",
      label: "清点驿粮",
      hint: "粮草 +8",
      effect: { axle: 0, grain: 8, sanity: 0 },
      result: "驿仓角落还剩一袋干粟，够队伍多撑一段。"
    }
  ],
  event: {
    id: "post_gate",
    title: "驿门未闭",
    tag: "出发",
    texts: {
      clear: "驿卒说西边路还在，只是没人按时回来。",
      uneasy: "驿门在风里开合，像有人替你们数车轮。",
      mad: "门没有关。车轴才转半圈，归期已经写进旧账。"
    },
    choices: [
      {
        label: "整点车具",
        hint: "车轴 +8，粮草 -3",
        effect: { axle: 8, grain: -3, sanity: 0 },
        result: "车具重新捆紧，驿灯在身后缩成一点。"
      },
      {
        label: "问西行旧账",
        hint: "神志 -2，获得 old_account",
        effect: { axle: 0, grain: 0, sanity: -2, flag: "old_account" },
        result: "驿簿上许多名字只写了出发日。"
      }
    ]
  }
}
```

### 1.2 故王道

资源定位：低中风险旧路，偏补车轴，消耗粮草换路线判断。

```js
{
  id: "old_king_road",
  name: "故王道",
  region: "旧王道",
  terrain: "road",
  fogName: "西北深车辙",
  revealText: "故王道的车辙向两侧分开，泽气在远处压住纸面。",
  detail: "半埋石基从土里露出，深辙仍把车队往西牵。入暮后，岔路会多出一条。",
  supplies: [
    {
      id: "road_stones",
      label: "垫旧道石",
      hint: "车轴 +7，神志 -2",
      effect: { axle: 7, grain: 0, sanity: -2 },
      result: "王道石垫住车底，石缝里传出轻叹。"
    },
    {
      id: "road_rope",
      label: "绞旧绳束轮",
      hint: "车轴 +4，粮草 -2",
      effect: { axle: 4, grain: -2, sanity: 0 },
      result: "旧贡绳还能用，只是少煮一锅粟。"
    }
  ],
  event: {
    id: "split_tracks",
    title: "车辙分叉",
    tag: "路线",
    texts: {
      clear: "旧王道上有两道车辙，一道新而浅，一道旧而深。",
      uneasy: "两道车辙互相盖住，像同一辆车走了两次。",
      mad: "车辙在脚下分开，又在眼里合上。旧的是新的。"
    },
    choices: [
      {
        label: "验土再走",
        hint: "神志 +4，粮草 -4",
        effect: { axle: 0, grain: -4, sanity: 4 },
        result: "耽误半日，但你们认出哪道辙是真的。"
      },
      {
        label: "沿深辙快行",
        hint: "车轴 -5，粮草 -1",
        effect: { axle: -5, grain: -1, sanity: 0 },
        result: "车轮咬进旧痕，走得快，也响得难听。"
      }
    ]
  }
}
```

### 1.3 废关

资源定位：高车轴收益点，用神志换修车材料。

```js
{
  id: "abandoned_pass",
  name: "废关",
  region: "人间边境",
  terrain: "market",
  fogName: "关影压纸",
  revealText: "废关门额下的旧令松动，日中市影从雾里露出边角。",
  detail: "塌关守着西出窄口，旧令上还写着不得西行。木梁和铁钉能救车，也会压住人心。",
  supplies: [
    {
      id: "pass_timbers",
      label: "拆门木补车",
      hint: "车轴 +10，神志 -3",
      effect: { axle: 10, grain: 0, sanity: -3 },
      result: "门梁被锯下一截，旧令少了一角。"
    },
    {
      id: "pass_nails",
      label: "拔关楼铁钉",
      hint: "车轴 +6，神志 -2",
      effect: { axle: 6, grain: 0, sanity: -2 },
      result: "铁钉离梁时，钉头还带着旧火黑。"
    }
  ],
  event: {
    id: "closed_order",
    title: "废关旧令",
    tag: "边境",
    texts: {
      clear: "门额残令写着不得西行，灰却像昨日才擦过。",
      uneasy: "西字被反复描深，墙后风声像在念姓名。",
      mad: "不得西行。不得归。不得看见第二座门。"
    },
    choices: [
      {
        label: "拓下旧令",
        hint: "神志 -5，获得 old_order",
        effect: { axle: 0, grain: 0, sanity: -5, flag: "old_order" },
        result: "墨拓未干，字像从纸背往外生。"
      },
      {
        label: "拆门木修车",
        hint: "车轴 +12，神志 -3",
        effect: { axle: 12, grain: 0, sanity: -3 },
        result: "车轴修好了，关影却跟着车走。"
      }
    ]
  }
}
```

### 1.4 鸟鼠夹道

资源定位：山隘支线，轻补车轴、少耗粮，但神志会被夜声磨损。

```js
{
  id: "bird_mouse_pass",
  name: "鸟鼠夹道",
  region: "兽穴山口",
  terrain: "road",
  fogName: "鸟鼠夹道",
  revealText: "两山夹出一线窄路，洞口像针眼一样浮在纸上。",
  detail: "白日无声，夜里满山像在搬运粮草和骨片。窄道能省粮，也容易让人听错方向。",
  supplies: [
    {
      id: "burrow_hard_branches",
      label: "拾洞口硬枝",
      hint: "车轴 +5，神志 -2",
      effect: { axle: 5, grain: 0, sanity: -2 },
      result: "硬枝被啃得整齐，正好能作轮楔。"
    },
    {
      id: "burrow_dry_seed",
      label: "收山腹干籽",
      hint: "粮草 +5，神志 -3",
      effect: { axle: 0, grain: 5, sanity: -3 },
      result: "干籽没有霉味，只在袋里轻轻滚动。"
    }
  ],
  event: {
    id: "hollow_pass",
    title: "山腹夜声",
    tag: "山隘",
    texts: {
      clear: "洞中传来细碎搬运声，像有什么正避开车队。",
      uneasy: "夜声一阵近一阵远，随从说山腹是空的。",
      mad: "洞里不是鸟鼠，是许多小路在磨牙。"
    },
    choices: [
      {
        label: "等夜声辨路",
        hint: "粮草 -2，获得 hollow_pass_hint",
        effect: { axle: 0, grain: -2, sanity: 0, flag: "hollow_pass_hint" },
        result: "声音避开的位置，正是一条能过车的暗路。"
      },
      {
        label: "堵洞快走",
        hint: "车轴 +3，神志 -4",
        effect: { axle: 3, grain: 0, sanity: -4 },
        result: "石块堵住洞口，夜声转到车底。"
      },
      {
        label: "留粮试探",
        hint: "粮草 -5，神志 +3",
        effect: { axle: 0, grain: -5, sanity: 3 },
        result: "粮袋消失后，山路安静了一小段。"
      }
    ]
  }
}
```

### 1.5 雷泽浅畔

资源定位：主要粮草补给点，代价是车轴和神志承压。

```js
{
  id: "thunder_marsh",
  name: "雷泽浅畔",
  region: "泽畔异域",
  terrain: "water",
  fogName: "泽上伏雷",
  revealText: "雷声从纸背滚过，赤水方向被淡墨勾出一截。",
  detail: "浅泽先在图上渗出湿痕。雷不在天上，在车轮将要压过的泥下。",
  supplies: [
    {
      id: "marsh_roots",
      label: "采雷泽芦根",
      hint: "粮草 +10，神志 -3",
      effect: { axle: 0, grain: 10, sanity: -3 },
      result: "芦根能吃，咬开时有远雷。"
    },
    {
      id: "marsh_fish",
      label: "捞泥下白鱼",
      hint: "粮草 +6，车轴 -3",
      effect: { axle: -3, grain: 6, sanity: 0 },
      result: "白鱼在泥里不动，离水后才挣扎。"
    }
  ],
  event: {
    id: "ground_thunder",
    title: "地底雷声",
    tag: "泽地",
    texts: {
      clear: "泽水不深，远雷却从车底滚过。",
      uneasy: "雷声不从天上来，泥水一圈圈吐气。",
      mad: "车轮压着一张大鼓的皮，鼓里有人醒了。"
    },
    choices: [
      {
        label: "铺木过泽",
        hint: "车轴 -3，粮草 -5",
        effect: { axle: -3, grain: -5, sanity: 0 },
        result: "木板一片片沉下去，车队也一寸寸过去。"
      },
      {
        label: "听雷辨路",
        hint: "神志 -8，获得 heard_ground_thunder",
        effect: { axle: 0, grain: 0, sanity: -8, flag: "heard_ground_thunder" },
        result: "雷声有间隔，像在替水下路报数。"
      }
    ]
  }
}
```

### 1.6 白羽淖

资源定位：泽地替代补粮点，提供羽民线索，但神志收益很差。

```js
{
  id: "white_feather_mire",
  name: "白羽淖",
  region: "泽畔异象",
  terrain: "water",
  fogName: "白羽沉水",
  revealText: "浅淖漂出一圈白羽，羽民渡的方向在水下闪了一下。",
  detail: "白羽沉在浅水里，没有一枚真正浮起。当地人说轻物在这里欠债。",
  supplies: [
    {
      id: "mire_feather_fish",
      label: "捞白羽鱼",
      hint: "粮草 +8，神志 -4",
      effect: { axle: 0, grain: 8, sanity: -4 },
      result: "鱼鳞像羽，肉能充饥，眼睛却一直睁着。"
    },
    {
      id: "mire_reed_bundle",
      label: "束沉水芦",
      hint: "车轴 +3，粮草 +3，神志 -3",
      effect: { axle: 3, grain: 3, sanity: -3 },
      result: "沉水芦很韧，捆上车后仍滴着冷水。"
    }
  ],
  event: {
    id: "sunken_feather",
    title: "白羽沉水",
    tag: "异象",
    texts: {
      clear: "羽毛沉在水底，重石却浮在泥上。",
      uneasy: "水面像反着照人，轻的下沉，重的迟迟不落。",
      mad: "羽毛沉着，水却浮着。渡口藏在上下颠倒处。"
    },
    choices: [
      {
        label: "留重物试渡",
        hint: "车轴 -3，获得 feather_ford_hint",
        effect: { axle: -3, grain: 0, sanity: 0, flag: "feather_ford_hint" },
        result: "旧铁沉入水面之上，渡口方向短暂显出。"
      },
      {
        label: "捞羽问路",
        hint: "神志 -5，羽民语 +10",
        effect: { axle: 0, grain: 0, sanity: -5, language: { feather: 10 } },
        result: "白羽贴在掌心，像一枚未说出口的词。"
      },
      {
        label: "绕水而行",
        hint: "粮草 -4，神志 +2",
        effect: { axle: 0, grain: -4, sanity: 2 },
        result: "你们不再看水，队伍终于走出倒影。"
      }
    ]
  }
}
```

### 1.7 黑齿市

资源定位：交易型中继，可补粮或神志，常用车轴、粮草或语言作代价。

```js
{
  id: "black_teeth_market",
  name: "黑齿市",
  region: "异族边市",
  terrain: "market",
  fogName: "日中有市影",
  revealText: "黑齿市人收起摊布，换来的不是路，而是两枚方向。",
  detail: "正午空白处立起棚帐。市人不喊价，只把旧铁和明日放在同一张兽皮上。",
  supplies: [
    {
      id: "market_trade_grain",
      label: "以旧铁换粮",
      hint: "粮草 +12，车轴 -3",
      effect: { axle: -3, grain: 12, sanity: 0 },
      result: "粮袋沉得出奇，颗粒都朝同一方向。"
    },
    {
      id: "market_sedative",
      label: "买静神药粉",
      hint: "神志 +8，粮草 -5",
      effect: { axle: 0, grain: -5, sanity: 8 },
      result: "药粉苦而清凉，影子终于退回脚下。"
    }
  ],
  event: {
    id: "black_trade",
    title: "黑齿交易",
    tag: "异族",
    texts: {
      clear: "日中见市，旧铁可换粮，粮也可换白羽。",
      uneasy: "他们笑时没有声音，只露出一闪黑齿。",
      mad: "不是市。是口。它买明日，找零昨日。"
    },
    choices: [
      {
        label: "以旧铁换粮",
        hint: "粮草 +15，车轴 -4",
        effect: { axle: -4, grain: 15, sanity: 0 },
        result: "市人收走旧铁，粮草没有霉味。"
      },
      {
        label: "换取白羽",
        hint: "粮草 -8，神志 -3，羽民语 +20",
        effect: { axle: 0, grain: -8, sanity: -3, language: { feather: 20 } },
        result: "白羽落在手上，像有人交来一条路。"
      },
      {
        label: "买一句旧价",
        hint: "神志 -4，获得 black_price",
        effect: { axle: 0, grain: 0, sanity: -4, flag: "black_price" },
        result: "你听懂一个价，也忘掉一个常用字。"
      }
    ]
  }
}
```

### 1.8 赤水外滩

资源定位：第一章高压禁地，少量补粮，主要提供裂隙方向和失败保护张力。

```js
{
  id: "red_marsh",
  name: "赤水外滩",
  region: "大荒边缘",
  terrain: "water",
  fogName: "红水在纸背",
  revealText: "赤水在图上渗开，裂隙破痕隔着一层红雾显出。",
  detail: "赤色水线从地图边缘渗出，岸骨排成路标。白日是禁地，夜里像有人在水下铺路。",
  supplies: [
    {
      id: "red_shoregrass",
      label: "采岸草充饥",
      hint: "粮草 +7，神志 -5",
      effect: { axle: 0, grain: 7, sanity: -5 },
      result: "岸草能煮成糊，颜色却洗不净。"
    },
    {
      id: "red_bone_chalk",
      label: "磨岸骨记路",
      hint: "神志 +4，车轴 -3",
      effect: { axle: -3, grain: 0, sanity: 4 },
      result: "骨粉在图上留痕，短路暂时不再游移。"
    }
  ],
  event: {
    id: "red_bones",
    title: "赤水岸骨",
    tag: "禁忌",
    texts: {
      clear: "赤水无波，岸边旧骨排列如路标。",
      uneasy: "旧骨像被重新摆过，草尖一齐朝向队伍。",
      mad: "水没有来。骨先来了。草在数人。"
    },
    choices: [
      {
        label: "掩骨祭拜",
        hint: "粮草 -6，神志 +6",
        effect: { axle: 0, grain: -6, sanity: 6 },
        result: "最靠水的一排骨被掩住，夜色慢了半拍。"
      },
      {
        label: "沿骨行路",
        hint: "车轴 -4，神志 -10，获得 followed_bones",
        effect: { axle: -4, grain: 0, sanity: -10, flag: "followed_bones" },
        result: "骨路确实通向前方，每一截都像刚捞出水。"
      },
      {
        label: "夜里下水",
        hint: "低神志可见 / 车轴 -2，神志 -12",
        conditions: [{ sanityMax: 34 }],
        effect: { axle: -2, grain: 0, sanity: -12, flag: "followed_bones" },
        result: "你听见车轮在水下，随从却说你走在岸上。"
      }
    ]
  }
}
```

### 1.9 巫咸断碑

资源定位：神志校准和裂隙解锁点，用少量车轴、粮草换方向确认。

```js
{
  id: "broken_stele",
  name: "巫咸断碑",
  region: "巫文界标",
  terrain: "road",
  fogName: "黑土中缺一笔",
  revealText: "断碑残笔补上西向，裂隙的位置终于不再游移。",
  detail: "断碑半埋黑土，碑文像方位，也像人名。看久了，会觉得缺的是自己。",
  supplies: [
    {
      id: "stele_rubbing",
      label: "拓碑定方",
      hint: "神志 +5，粮草 -2",
      effect: { axle: 0, grain: -2, sanity: 5 },
      result: "拓片补齐几处方位，队伍重新认出西边。"
    },
    {
      id: "stele_chant",
      label: "依碑文正名",
      hint: "神志 +6，车轴 -2",
      effect: { axle: -2, grain: 0, sanity: 6 },
      result: "众人重新叫出彼此名字，路也有了前后。"
    }
  ],
  event: {
    id: "read_name",
    title: "断碑读名",
    tag: "巫文",
    texts: {
      clear: "碑面只剩残笔，能辨方位，不能辨祭给谁。",
      uneasy: "空缺总等你补全，像缺的那笔是你的姓。",
      mad: "碑不是缺字。它在等你把名字还给它。"
    },
    choices: [
      {
        label: "拓碑带走",
        hint: "神志 -7，巫咸古辞 +20",
        effect: { axle: 0, grain: 0, sanity: -7, language: { wuxian: 20 } },
        result: "拓片卷起时，残画像车队，又像裂口。"
      },
      {
        label: "毁去碑面",
        hint: "车轴 -3，神志 +5",
        effect: { axle: -3, grain: 0, sanity: 5 },
        result: "石屑落地，队伍安静了些。"
      },
      {
        label: "让碑补名",
        hint: "低神志 / 神志 -12，获得 rift_name",
        conditions: [{ sanityMax: 34 }],
        effect: { axle: 0, grain: 0, sanity: -12, flag: "rift_name" },
        result: "完整的不是字，是通往裂口的称呼。"
      }
    ]
  }
}
```

### 1.10 九州裂隙

资源定位：第一章终点，低资源收益，承担结局选择和下一章钩子。

```js
{
  id: "kyushu_rift",
  name: "九州裂隙",
  region: "地图尽头",
  terrain: "rift",
  fogName: "纸尽处有裂",
  revealText: "地图在裂隙前合拢，远处已无普通道路。",
  detail: "舆图在此不再画山水，只留一道折错破痕。来路和去路都变薄了。",
  supplies: [
    {
      id: "rift_map",
      label: "整束残图",
      hint: "神志 +8，粮草 -4",
      effect: { axle: 0, grain: -4, sanity: 8 },
      result: "残图被重新束好，裂隙短暂像一条路。"
    }
  ],
  event: {
    id: "rift_dream",
    title: "裂隙前梦",
    tag: "边界",
    texts: {
      clear: "夜里众人梦见同一张地图，边缘没有画完。",
      uneasy: "地图在梦中自己折起，折痕压住车队。",
      mad: "地图睡着了。你们醒在它的梦里。"
    },
    choices: [
      {
        label: "按梦图前进",
        hint: "神志 -12，进入 rift",
        effect: { axle: 0, grain: 0, sanity: -12, ending: "rift" },
        result: "队伍驶向地图没有画完的地方。"
      },
      {
        label: "烧图折返",
        hint: "粮草 -8，神志 +3，进入 return",
        effect: { axle: 0, grain: -8, sanity: 3, ending: "return" },
        result: "灰烬飞起时，来路仍在人间。"
      }
    ]
  }
}
```

## 2. 给 C 线程的合并备注

- `fogName` 可进入 `fogLabels[id].name`，`revealText` 可进入对应 `revealPlan[id].revealText`。
- `detail` 建议控制在地点卡 2 行内，移动横屏不用再显示长地点志。
- 本文每个地点的 `event.id` 可直接作为 `locations[id].event`。
- `conditions / flag / language / ending` 沿用现有 `data.js` 已出现的字段写法。
- 若首版只加 10 个地点，优先保持 `central_post -> old_king_road / abandoned_pass -> thunder_marsh / bird_mouse_pass / black_teeth_market -> white_feather_mire / red_marsh -> broken_stele -> kyushu_rift` 的闭环。
