# BSI-B-005 C 线程可直接替换 events 对象

> 子线程 B：山海经世界观与叙事主创  
> 目标：按 C 当前 `data.js` 结构，提供首版可直接替换的 `events` 对象。  
> 边界：只新增 B 协作文档，不改 C 代码，不提交 git。  
> 对齐依据：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`

## 1. 使用方式

C 线程若要接入 B 线程首版文案，可先只替换 `data.js` 里的 `events` 对象。

不需要同时替换：

- `locations`
- `routes`
- `routeEvents`
- `crisisEvents`
- `audioAssets`

这份数据保留 C 当前校验需要的字段：

- `title`
- `tag`
- `texts.clear`
- `texts.uneasy`
- `texts.mad`
- `choices[].label`
- `choices[].hint`
- `choices[].effect`
- `choices[].result`

## 2. 可直接替换的数据

```js
events: {
  post_gate: {
    title: "出驿问路",
    tag: "出发",
    texts: {
      clear: "驿中尚有人间秩序。车马停在院里，粮袋靠墙堆着，驿吏指向西边旧路，说过了废关就少有人回来。",
      uneasy: "驿门在风里开合，像有人替你们数车轮。西边路还在，路上的人不一定还在。",
      mad: "驿门还开着，像一张没合上的口。你仍可补粮，或修车，西边的路在等。"
    },
    choices: [
      {
        label: "买足干粮",
        hint: "粮草 +14",
        effect: { axle: 0, grain: 14, sanity: 0, flag: "bought_grain" },
        result: "你们在驿仓角落买下一袋干粟。粮袋沉了些，队伍也安静了些。"
      },
      {
        label: "检查车轴",
        hint: "车轴 +10，粮草 -3",
        effect: { axle: 10, grain: -3, sanity: 0, flag: "checked_axle" },
        result: "旧铜钉重新咬住轮毂，车轮声稳了。西边的风也更清楚了。"
      }
    ]
  },
  split_tracks: {
    title: "禁令残碑",
    tag: "路线",
    texts: {
      clear: "旧王道旁立着半截残碑，上面仍能辨出禁止西行的旧令。碑后的车辙却清楚地通向废关。",
      uneasy: "残碑写着不得西行，西字却被反复描深。两道车辙互相压住，像同一辆车走了两次。",
      mad: "碑说不可西行，车辙说快走。字在变，路没有变。你可以照车辙走，也可以绕开碑路。"
    },
    choices: [
      {
        label: "按车辙继续",
        hint: "车轴 -3，粮草 -3",
        effect: { axle: -3, grain: -3, sanity: 0, flag: "followed_old_tracks" },
        result: "车轮咬进旧痕，走得很快。残碑被抛在身后，仍像有人回头看你。"
      },
      {
        label: "绕开碑路",
        hint: "车轴 -7，粮草 -3",
        effect: { axle: -7, grain: -3, sanity: 0, flag: "avoided_forbidden_stele" },
        result: "你们绕过残碑，路变窄了，但旧令没有再出现在视线里。"
      }
    ]
  },
  closed_order: {
    title: "废关修辐",
    tag: "边境",
    texts: {
      clear: "废关下堆着旧车碎件。木辐多半朽坏，但仍能拆出几段可用的材料。",
      uneasy: "关门已倒，门额仍压着旧令。旧车碎件堆在关下，像许多没能过去的车队留下的骨头。",
      mad: "关门倒着，旧车也倒着。木头还肯做木头。你可以拆它修车，也可以立刻过关。"
    },
    choices: [
      {
        label: "拆旧车修辐",
        hint: "车轴 +14，粮草 -4",
        effect: { axle: 14, grain: -4, sanity: 0, flag: "repaired_at_pass" },
        result: "旧车木被拆成临时辐条。车轮重新稳住，关门少了一截阴影。"
      },
      {
        label: "立刻通过",
        hint: "车轴 -3",
        effect: { axle: -3, grain: 0, sanity: 0, flag: "passed_abandoned_pass" },
        result: "队伍没有停留。废关在身后合成一道低低的黑线。"
      }
    ]
  },
  ground_thunder: {
    title: "雷泽陷车",
    tag: "泽地",
    texts: {
      clear: "泽水不深，黑泥却吞住车轮。远雷贴着地面滚动，队伍必须尽快脱困。",
      uneasy: "雷声没有从天上来。泥水一圈圈吐气，像有东西在地下跟着车轮。",
      mad: "泥在拉车，雷在推你。推车会耗粮，绕雷声走会伤车。路还在前面。"
    },
    choices: [
      {
        label: "众人推车",
        hint: "车轴 -3，粮草 -8",
        effect: { axle: -3, grain: -8, sanity: 0, flag: "pushed_cart_in_marsh" },
        result: "众人踏进黑泥，终于把车轮推了出来。粮袋轻了，车还在。"
      },
      {
        label: "顺雷声绕行",
        hint: "车轴 -8，神志 -3",
        effect: { axle: -8, grain: 0, sanity: -3, flag: "avoided_next_risk" },
        result: "你们追着地底雷声绕开深泥。路确实通了，只是雷声像在身后数步。"
      }
    ]
  },
  black_trade: {
    title: "黑齿换物",
    tag: "异族",
    texts: {
      clear: "黑齿市午时忽现。市人指向粮袋，又指向车轴，似乎愿意以粮换车具。",
      uneasy: "他们笑时没有声音，只有黑齿在日光里一闪。你听不懂价格，却听见“粮”“路”“明日”三个词。",
      mad: "市不是市，是一排会笑的门。左边吃粮吐车具，右边吃旧物吐路标。你也可以不进门。"
    },
    choices: [
      {
        label: "以粮换车具",
        hint: "车轴 +14，粮草 -10",
        effect: { axle: 14, grain: -10, sanity: 0, flag: "traded_with_black_teeth" },
        result: "市人收走一袋粮，换来的车具冰冷但合用。"
      },
      {
        label: "拒绝交易离开",
        hint: "神志 +5",
        effect: { axle: 0, grain: 0, sanity: 5, flag: "refused_black_teeth_trade" },
        result: "你们退回市外。那些黑齿仍在笑，但至少没有跟上来。"
      }
    ]
  },
  red_bones: {
    title: "赤水岸骨",
    tag: "禁忌",
    texts: {
      clear: "赤水无波，岸边旧骨排列如路标。随从建议日落前离开。",
      uneasy: "旧骨像被人重新摆过，草尖一齐朝向队伍。水声从车底传来。",
      mad: "骨在指路，也在点名。沿骨走会近，祭骨会稳，离骨走会远。水等到夜里才开口。"
    },
    choices: [
      {
        label: "掩骨祭拜",
        hint: "粮草 -5，神志 +7",
        effect: { axle: 0, grain: -5, sanity: 7, flag: "buried_red_bones" },
        result: "你们掩埋了最靠近水的一排骨。赤水安静了一些。"
      },
      {
        label: "沿骨行路",
        hint: "车轴 -4，神志 -10，解锁裂隙方向",
        effect: { axle: -4, grain: 0, sanity: -10, flag: "followed_bones" },
        result: "骨路确实通向前方，只是每一截都像刚从水里捞出来。"
      }
    ]
  },
  read_name: {
    title: "断碑读名",
    tag: "巫文",
    texts: {
      clear: "断碑半埋土中，缺字甚多。若细读，或可辨出前方禁忌；若毁去碑面，也能止住队伍的不安。",
      uneasy: "碑上缺字会自己补齐。你刚看见“赤水不可夜渡”，下一眼又像写着“夜渡可归”。",
      mad: "碑没有字，字在你眼里补。读会伤神，毁碑可止住它。它正在写你的名。"
    },
    choices: [
      {
        label: "读碑辨路",
        hint: "神志 -10，解锁裂隙名",
        effect: { axle: 0, grain: 0, sanity: -10, flag: "rift_name" },
        result: "你读出一段不像地名的地名。裂隙在图上短暂地固定下来。"
      },
      {
        label: "毁去碑面",
        hint: "车轴 -3，神志 +6",
        effect: { axle: -3, grain: 0, sanity: 6, flag: "destroyed_stele" },
        result: "石屑落地，队伍安静了些。可有随从说他还记得碑上的字。"
      }
    ]
  },
  rift_dream: {
    title: "裂隙前梦",
    tag: "边界",
    texts: {
      clear: "入夜后，众人梦见同一张地图。梦图有一条近路通向裂隙，也有一条旧路通回废关。",
      uneasy: "梦里的地图比真图清楚。近路像一条伤口，回头路像一根缝线，醒来后仍留在掌心。",
      mad: "地图睡醒了。近路会吞神志，烧图能稳住队伍。你还在梦里选路。"
    },
    choices: [
      {
        label: "按梦中地图前进",
        hint: "神志 -12，进入裂隙结局",
        effect: { axle: 0, grain: 0, sanity: -12, ending: "rift" },
        result: "队伍驶向地图没有画完的地方。"
      },
      {
        label: "烧掉梦图，原路归返",
        hint: "粮草 -8，神志 +3，进入归返结局",
        effect: { axle: 0, grain: -8, sanity: 3, ending: "return" },
        result: "灰烬飞起时，你们终于看见来路仍在人间。"
      }
    ]
  }
}
```

## 3. 最小触发顺序建议

按 C 当前地点事件绑定，首版实际体验顺序可走：

```text
central_post/post_gate
-> old_king_road/split_tracks
-> abandoned_pass/closed_order
-> thunder_marsh/ground_thunder
-> black_teeth_market/black_trade
-> red_marsh/red_bones
-> broken_stele/read_name
-> kyushu_rift/rift_dream
```

若只想 3-5 分钟体验，建议路线侧先保证这条路可达：

```text
central_to_road
-> road_to_pass
-> pass_to_market
-> market_to_red
-> red_to_rift 或 red_to_stele -> stele_to_rift
```

## 4. 自检备注

- 事件数量：8 个，对齐 C 当前 8 个地点的 `location.event`。
- 每个事件：2 个选项。
- 每个事件：`clear / uneasy / mad` 三档文本齐全。
- 所有 `ending` 只引用 C 当前已有的 `rift`、`return`。
- 所有资源 effect 使用数字，能通过 C 当前 `validateDelta`。
- `followed_bones` 和 `rift_name` 保留，用于 C 当前 `red_to_rift.requireAny`。
