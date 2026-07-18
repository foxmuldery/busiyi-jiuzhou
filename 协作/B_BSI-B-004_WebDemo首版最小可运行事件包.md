# BSI-B-004 Web Demo 首版最小可运行事件包

> 子线程 B：山海经世界观与叙事主创  
> 目标：先让 Web Demo 跑起来，支撑 3-5 分钟体验。  
> 边界：本文件只保留 C 线程可直接接入的最小事件字段；不追求 14 个事件全上，不改 C 代码，不提交 git。

## 1. 首版只上 8 个事件

推荐顺序：

```text
出驿问路 -> 禁令残碑 -> 废关修辐 -> 空村晾粮 -> 石鼓三响 -> 雷泽陷车 -> 黑齿换物 -> 裂隙前梦
```

保留体验：

- 出发补给
- 路线征兆
- 车轴补救
- 粮补给
- 神志污染
- 路途资源压力
- 异族交易
- 终点分流

## 2. 最小事件数据

资源影响仍使用枚举，交给 A/C 映射成实际数值：

- `gain_small`
- `gain_medium`
- `loss_small`
- `loss_medium`
- `loss_large`
- `none`

```json
[
  {
    "id": "map01_e01_depart_ask_road",
    "title": "出驿问路",
    "body": "驿中尚有人间秩序。车马停在院里，粮袋靠墙堆着，驿吏指向西边旧路，说过了废关就少有人回来。",
    "lowSanityText": "驿门还开着，像一张没合上的口。你仍可补粮，或修车，西边的路在等。",
    "choices": [
      {
        "id": "buy_grain",
        "label": "买足干粮",
        "resources": {
          "axle": "none",
          "grain": "gain_medium",
          "sanity": "none"
        },
        "flags": ["flag_bought_grain"]
      },
      {
        "id": "check_axle",
        "label": "检查车轴",
        "resources": {
          "axle": "gain_small",
          "grain": "loss_small",
          "sanity": "none"
        },
        "flags": ["flag_checked_axle"]
      }
    ]
  },
  {
    "id": "map01_e02_forbidden_stele",
    "title": "禁令残碑",
    "body": "旧王道旁立着半截残碑，上面仍能辨出禁止西行的旧令。碑后的车辙却清楚地通向废关。",
    "lowSanityText": "碑说不可西行，车辙说快走。字在变，路没有变。你可以照车辙走，也可以绕开碑路。",
    "choices": [
      {
        "id": "follow_tracks",
        "label": "按车辙继续",
        "resources": {
          "axle": "loss_small",
          "grain": "loss_small",
          "sanity": "none"
        },
        "flags": ["flag_followed_old_tracks"]
      },
      {
        "id": "detour_stele",
        "label": "绕开碑路",
        "resources": {
          "axle": "loss_medium",
          "grain": "loss_small",
          "sanity": "none"
        },
        "flags": ["flag_avoided_forbidden_stele"]
      }
    ]
  },
  {
    "id": "map01_e03_repair_at_pass",
    "title": "废关修辐",
    "body": "废关下堆着旧车碎件。木辐多半朽坏，但仍能拆出几段可用的材料。",
    "lowSanityText": "关门倒着，旧车也倒着。木头还肯做木头。你可以拆它修车，也可以立刻过关。",
    "choices": [
      {
        "id": "repair_with_old_cart",
        "label": "拆旧车修辐",
        "resources": {
          "axle": "gain_medium",
          "grain": "loss_small",
          "sanity": "none"
        },
        "flags": ["flag_repaired_at_pass"]
      },
      {
        "id": "pass_immediately",
        "label": "立刻通过",
        "resources": {
          "axle": "loss_small",
          "grain": "none",
          "sanity": "none"
        },
        "flags": ["flag_passed_abandoned_pass"]
      }
    ]
  },
  {
    "id": "map01_e05_empty_village_grain",
    "title": "空村晾粮",
    "body": "荒村无人，院中晾着谷物，灶灰仍有余温。粮食就在眼前，但村中安静得不像无人。",
    "lowSanityText": "粮袋在呼吸。屋里没人，屋外有粮。你仍可取粮，也可留下一半再走。",
    "choices": [
      {
        "id": "take_grain",
        "label": "取走谷物",
        "resources": {
          "axle": "none",
          "grain": "gain_medium",
          "sanity": "loss_small"
        },
        "flags": ["flag_took_empty_village_grain"]
      },
      {
        "id": "take_half_and_ritual",
        "label": "留下一半并祭告",
        "resources": {
          "axle": "none",
          "grain": "gain_small",
          "sanity": "gain_small"
        },
        "flags": ["flag_respected_empty_village"]
      }
    ]
  },
  {
    "id": "map01_e07_stone_drum_three_beats",
    "title": "石鼓三响",
    "body": "坡上有三面石鼓。风过时，鼓腹自鸣三声。随从说此地宜速过，也可记下鼓声，日后辨路。",
    "lowSanityText": "鼓在数路。一声是走，二声是绕，三声是别回头。你仍可记声，或立刻离开。",
    "choices": [
      {
        "id": "record_drum",
        "label": "记录鼓声",
        "resources": {
          "axle": "none",
          "grain": "none",
          "sanity": "loss_small"
        },
        "flags": ["clue_stone_drum_rhythm"]
      },
      {
        "id": "leave_ears_covered",
        "label": "掩耳离开",
        "resources": {
          "axle": "none",
          "grain": "loss_small",
          "sanity": "none"
        },
        "flags": ["flag_avoided_stone_drum"]
      }
    ]
  },
  {
    "id": "map01_e08_thunder_marsh_stuck",
    "title": "雷泽陷车",
    "body": "泽水不深，黑泥却吞住车轮。远雷贴着地面滚动，队伍必须尽快脱困。",
    "lowSanityText": "泥在拉车，雷在推你。推车会耗粮，绕雷声走会伤车。路还在前面。",
    "choices": [
      {
        "id": "push_cart",
        "label": "众人推车",
        "resources": {
          "axle": "loss_small",
          "grain": "loss_medium",
          "sanity": "none"
        },
        "flags": ["flag_pushed_cart_in_marsh"]
      },
      {
        "id": "follow_thunder_detour",
        "label": "顺雷声绕行",
        "resources": {
          "axle": "loss_medium",
          "grain": "none",
          "sanity": "loss_small"
        },
        "flags": ["flag_avoided_next_risk"]
      }
    ]
  },
  {
    "id": "map01_e09_black_teeth_trade",
    "title": "黑齿换物",
    "body": "黑齿市午时忽现。市人指向粮袋，又指向车轴，似乎愿意以粮换车具，也愿用旧器换一枚路标。",
    "lowSanityText": "市不是市，是一排会笑的门。左边吃粮吐车具，右边吃旧物吐路标。你也可以不进门。",
    "choices": [
      {
        "id": "trade_grain_for_axle",
        "label": "以粮换车具",
        "resources": {
          "axle": "gain_medium",
          "grain": "loss_medium",
          "sanity": "none"
        },
        "flags": ["flag_traded_with_black_teeth"]
      },
      {
        "id": "refuse_trade",
        "label": "拒绝交易离开",
        "resources": {
          "axle": "none",
          "grain": "none",
          "sanity": "gain_small"
        },
        "flags": ["flag_refused_black_teeth_trade"]
      }
    ]
  },
  {
    "id": "map01_e14_dream_before_rift",
    "title": "裂隙前梦",
    "body": "入夜后，众人梦见同一张地图。梦图有一条近路通向裂隙，也有一条旧路通回废关。",
    "lowSanityText": "地图睡醒了。近路会吞神志，烧图能稳住队伍。你还在梦里选路。",
    "choices": [
      {
        "id": "take_dream_shortcut",
        "label": "按梦中近路走",
        "resources": {
          "axle": "none",
          "grain": "none",
          "sanity": "loss_large"
        },
        "flags": ["ending_lost_route"]
      },
      {
        "id": "burn_dream_map",
        "label": "烧掉梦图",
        "resources": {
          "axle": "none",
          "grain": "loss_small",
          "sanity": "gain_small"
        },
        "flags": ["ending_stable_rift"]
      }
    ]
  }
]
```

## 3. 首版接入备注

- 第一版只需要 `body` 和 `lowSanityText` 两档文本；中神志可先继续显示 `body`。
- 第一版不需要异族语言词条系统，黑齿事件先按普通事件跑。
- 第一版不需要复杂 flag 分支，先把 flag 写入日志即可。
- 第一版不需要隐藏路线，结局先用 `ending_lost_route` 和 `ending_stable_rift` 两个 flag 做占位。
