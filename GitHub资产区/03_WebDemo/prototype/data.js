const BSI_CORE_DATA = {
  saveVersion: 2,
  resourceKeys: ["axle", "grain", "sanity"],
  terrainKeys: ["road", "market", "water", "rift"],
  balanceConfig: {
    randomRouteEventBaseChance: 0.21,
    randomRouteEventMaxChance: 0.63,
    routeEventBreatherStreak: 2,
    maxRescuesBeforeStranding: 3,
    hardBadLuckThreshold: 96,
    resourceCriticalLimit: 15,
    sameCrisisHardFailCount: 2,
    breatherBadLuckLimit: 55,
    badLuckMidBoostThreshold: 35,
    badLuckMidBoost: 0.08,
    badLuckHighBoostThreshold: 65,
    badLuckHighBoost: 0.14,
    dangerEventChanceBoost: 0.09,
    highChanceDangerCount: 2,
    highChanceBadLuckThreshold: 72,
    highChanceFloor: 0.58,
    rescueWeightLowResourceLimit: 45,
    rescueWeightSupply: 22,
    rescueWeightRest: 18,
    rescueWeightItem: 14,
    rescueWeightBadLuckThreshold: 55,
    rescueWeightBadLuck: 28,
    rescueForceBadLuckThreshold: 60,
    sanityEventPenaltyLimit: 28,
    sanityEventPenalty: -8,
    lowSanityProtectionLimit: 30,
    lowSanityProtectionMaxLoss: -8,
    highPressureSanityLoss: -6,
    crisisBadLuckGain: 12,
    badLuckRoutePressureDivisor: 10,
    badLuckEventPressureDivisor: 14,
    badLuckEventRecoveryDivisor: 12,
    badLuckCrisisRecoveryDivisor: 10,
    badLuckLowResourceLimit: 20,
    badLuckLowResourceShift: 3,
    resourceWarningLimits: { axle: 30, grain: 35, sanity: 45 }
  }
};

const BSI_P0_CONTENT_PACK = {
  id: "p0",
  name: "P0 原型基线",
  startLocation: "central_post",
  stageAssets: {
    map: {
      background: "../../02_设计资产/可用素材/地图底图/MAP-002_九州大地图战略底图暗帛书变体.png"
    },
    locationIllustrations: {
      central_post: "../../02_设计资产/可用素材/地点剪影/LOC-002_三地点场景节点素材图.png",
      old_king_road: "../../02_设计资产/可用素材/地点图/LOC-008_废关古道地点显影图.png",
      qingqiu_outer_city: "../../02_设计资产/可用素材/地点剪影/LOC-004_异族边境地标剪影场景.png",
      abandoned_pass: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      bird_mouse_pass: "../../02_设计资产/可用素材/地点剪影/LOC-003_异族边境地标剪影裁切源图.png",
      nameless_shrine: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      thunder_marsh: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      white_feather_mire: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      feather_folk_ford: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      black_teeth_market: "../../02_设计资产/可用素材/地点剪影/LOC-004_异族边境地标剪影场景.png",
      dream_map_post: "../../02_设计资产/可用素材/地点剪影/LOC-002_三地点场景节点素材图.png",
      red_marsh: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      broken_stele: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      kyushu_rift: "../../02_设计资产/可用素材/地点剪影/LOC-007_无声林入口地点图.png"
    },
    eventIllustrations: {
      post_gate: "../../02_设计资产/可用素材/地点剪影/LOC-002_三地点场景节点素材图.png",
      split_tracks: "../../02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png",
      closed_order: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      ground_thunder: "../../02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png",
      black_trade: "../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png",
      qingqiu_lamps: "../../02_设计资产/可用素材/背景长图/BG-011_青丘边境荒外古道.png",
      hollow_pass: "../../02_设计资产/可用素材/背景长图/BG-004_裂山荒泽废墟.png",
      nameless_prayer: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      sunken_feather: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      feather_ford_debt: "../../02_设计资产/可用素材/地点剪影/LOC-006_赤水渡口地点图.png",
      dream_map_gate: "../../02_设计资产/可用素材/背景长图/BG-014_归墟边缘横向背景图.png",
      red_bones: "../../02_设计资产/可用素材/背景长图/BG-005_赤水骨滩荒泽.png",
      read_name: "../../02_设计资产/可用素材/背景长图/BG-003_中景荒原石碑.png",
      rift_dream: "../../02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png"
    },
    routeEventIllustrations: {
      wheel_omen: "../../02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png",
      roadside_shrine: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      black_cloud: "../../02_设计资产/可用素材/背景长图/BG-007_九州边境天象天空层.png",
      wenao_fish_rain: "../../02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png",
      dang_kang_field_cry: "../../02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png",
      xuan_gui_shell_bridge: "../../02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png",
      zhu_bird_name_call: "../../02_设计资产/可用素材/背景长图/BG-011_青丘边境荒外古道.png",
      fox_lamp_tail: "../../02_设计资产/可用素材/背景长图/BG-011_青丘边境荒外古道.png",
      black_teeth_scale_price: "../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png",
      ming_snake_crosswind: "../../02_设计资产/可用素材/背景长图/BG-004_裂山荒泽废墟.png",
      bone_ox_rut: "../../02_设计资产/可用素材/背景长图/BG-006_废关古道暮色.png",
      mirror_reed_bed: "../../02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png",
      dream_cicada_shell: "../../02_设计资产/可用素材/背景长图/BG-014_归墟边缘横向背景图.png",
      rnd_loose_axle_song: "../../02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png",
      rnd_bitter_grass_soup: "../../02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png",
      rnd_wrong_milestone: "../../02_设计资产/可用素材/背景长图/BG-003_中景荒原石碑.png",
      rnd_silent_barter: "../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png",
      rnd_repeated_footprints: "../../02_设计资产/可用素材/背景长图/BG-006_废关古道暮色.png",
      rnd_count_names_rest: "../../02_设计资产/可用素材/地点剪影/LOC-005_废关祭所地点图.png",
      rnd_low_black_cloud_gap: "../../02_设计资产/可用素材/背景长图/BG-007_九州边境天象天空层.png",
      rnd_breathing_map: "../../02_设计资产/可用素材/背景长图/BG-014_归墟边缘横向背景图.png"
    },
    endingIllustrations: {
      return: "../../02_设计资产/可用素材/结局失败图/END-001_归返中原结局插图.png",
      lost: "../../02_设计资产/可用素材/结局失败图/END-002_迷失九州结局插图.png",
      rift: "../../02_设计资产/可用素材/结局失败图/END-003_九州裂隙结局插图.png",
      stranded: "../../02_设计资产/可用素材/结局失败图/END-000_结局页通用旧帛书地图背景.png"
    },
    failureIllustrations: {
      axle: "../../02_设计资产/可用素材/结局失败图/FAIL-001_断轴失败状态插图.png",
      grain: "../../02_设计资产/可用素材/结局失败图/FAIL-002_粮尽失败状态插图.png",
      sanity: "../../02_设计资产/可用素材/结局失败图/FAIL-003_神志崩坏失败状态插图.png"
    },
    generatedStageBackgrounds: {
      road: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-ROAD-001_古道荒原路段长图.png",
      market: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-MARKET-001_边市废关路段长图.png",
      water: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-WATER-001_雷泽赤水路段长图.png",
      rift: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-RIFT-001_归墟裂隙路段长图.png"
    },
    profiles: {
      default: {
        label: "横向山海长卷",
        travelMode: "scenery",
        generatedBackgroundKey: "road",
        background: "../../02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png",
        backgroundPosition: "48% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.76,
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.24,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-008_黑底神志污染幻路重复道路.png",
        pollutionOpacity: 0.28,
        caravan: "../../02_设计资产/可用素材/车队层/CAR-013_双马辎重车透明抠图.png",
        caravanWidth: "clamp(112px, 13vw, 210px)",
        caravanBottom: "7%",
        caravanOpacity: 0.16,
        caravanFilter: "contrast(0.9) saturate(0.48) sepia(0.38)"
      },
      oldRoad: {
        label: "废关古道",
        generatedBackgroundKey: "road",
        background: "../../02_设计资产/可用素材/背景长图/BG-010_废关古道地点背景.png",
        backgroundPosition: "42% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.06,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.2,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-008_黑底神志污染幻路重复道路.png",
        pollutionOpacity: 0.26,
        caravanOpacity: 0.78,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)",
        caravanBottom: "8%"
      },
      qingqiu: {
        label: "青丘边境",
        generatedBackgroundKey: "market",
        background: "../../02_设计资产/可用素材/背景长图/BG-011_青丘边境荒外古道.png",
        backgroundPosition: "46% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.08,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.22,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-010_黑底神志污染远山重影断裂.png",
        pollutionOpacity: 0.28,
        caravanOpacity: 0.8,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)",
        caravanBottom: "8%"
      },
      oldPass: {
        label: "废关旧令",
        generatedBackgroundKey: "market",
        background: "../../02_设计资产/可用素材/背景长图/BG-006_废关古道暮色.png",
        backgroundPosition: "44% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-003_荒外路面泥痕车辙前景层.png",
        foregroundOpacity: 0.08,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.25,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-008_黑底神志污染幻路重复道路.png",
        pollutionOpacity: 0.3,
        caravanOpacity: 0.8,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)",
        caravanBottom: "8%"
      },
      mountainPass: {
        label: "鸟鼠夹道",
        generatedBackgroundKey: "road",
        background: "../../02_设计资产/可用素材/背景长图/BG-004_裂山荒泽废墟.png",
        backgroundPosition: "50% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.08,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-006_昆仑云海星辰远景层.png",
        atmosphereOpacity: 0.18,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-010_黑底神志污染远山重影断裂.png",
        pollutionOpacity: 0.32,
        caravanOpacity: 0.8,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)",
        caravanBottom: "8%"
      },
      blackMarket: {
        label: "黑齿市口",
        generatedBackgroundKey: "market",
        background: "../../02_设计资产/可用素材/背景长图/BG-012_黑齿国外缘黑石土路.png",
        backgroundPosition: "52% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.08,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.2,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-007_低神志星象远山后景层.png",
        pollutionOpacity: 0.3,
        caravanOpacity: 0.8,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)",
        caravanBottom: "8%"
      },
      marsh: {
        label: "泽畔浅行",
        generatedBackgroundKey: "water",
        background: "../../02_设计资产/可用素材/背景长图/BG-009_赤水泽畔中景地貌.png",
        backgroundPosition: "50% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-005_水泽边缘前景视差层.png",
        foregroundOpacity: 0.74,
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.26,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-011_黑底神志污染赤水水纹幻路.png",
        pollutionOpacity: 0.34,
        caravanBottom: "13%"
      },
      redMarsh: {
        label: "赤水骨滩",
        generatedBackgroundKey: "water",
        background: "../../02_设计资产/可用素材/背景长图/BG-005_赤水骨滩荒泽.png",
        backgroundPosition: "50% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-005_水泽边缘前景视差层.png",
        foregroundOpacity: 0.68,
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-004_云雾风沙气流轻叠层.png",
        atmosphereOpacity: 0.3,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-011_黑底神志污染赤水水纹幻路.png",
        pollutionOpacity: 0.42,
        caravanBottom: "13%"
      },
      stele: {
        label: "巫咸断碑",
        generatedBackgroundKey: "road",
        background: "../../02_设计资产/可用素材/背景长图/BG-003_中景荒原石碑.png",
        backgroundPosition: "48% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-004_荒废土地破碎前景视差层.png",
        foregroundOpacity: 0.08,
        foregroundBlend: "multiply",
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-006_昆仑云海星辰远景层.png",
        atmosphereOpacity: 0.18,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-010_黑底神志污染远山重影断裂.png",
        pollutionOpacity: 0.3,
        caravanOpacity: 0.8,
        caravanFilter: "contrast(0.95) saturate(0.62) sepia(0.24)"
      },
      dream: {
        label: "梦图卷口",
        generatedBackgroundKey: "rift",
        background: "../../02_设计资产/可用素材/背景长图/BG-014_归墟边缘横向背景图.png",
        backgroundPosition: "56% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-005_水泽边缘前景视差层.png",
        foregroundOpacity: 0.62,
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-006_昆仑云海星辰远景层.png",
        atmosphereOpacity: 0.22,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-009_黑底神志污染天象第二月亮.png",
        pollutionOpacity: 0.36,
        caravanBottom: "13%"
      },
      rift: {
        label: "归墟裂隙",
        generatedBackgroundKey: "rift",
        background: "../../02_设计资产/可用素材/背景长图/BG-013_归墟边缘暗水裂隙.png",
        backgroundPosition: "54% center",
        foreground: "../../02_设计资产/可用素材/分层素材/FG-005_水泽边缘前景视差层.png",
        foregroundOpacity: 0.66,
        atmosphere: "../../02_设计资产/可用素材/分层素材/OV-007_低神志星象远山后景层.png",
        atmosphereOpacity: 0.22,
        pollution: "../../02_设计资产/可用素材/分层素材/OV-010_黑底神志污染远山重影断裂.png",
        pollutionOpacity: 0.38,
        caravanBottom: "14%"
      }
    },
    terrainProfiles: {
      road: "oldRoad",
      market: "blackMarket",
      water: "marsh",
      rift: "rift"
    },
    locationProfiles: {
      central_post: "default",
      old_king_road: "oldRoad",
      qingqiu_outer_city: "qingqiu",
      abandoned_pass: "oldPass",
      nameless_shrine: "oldRoad",
      bird_mouse_pass: "mountainPass",
      thunder_marsh: "marsh",
      white_feather_mire: "marsh",
      feather_folk_ford: "marsh",
      black_teeth_market: "blackMarket",
      red_marsh: "redMarsh",
      broken_stele: "stele",
      dream_map_post: "dream",
      kyushu_rift: "rift"
    }
  },
  locations: {
    central_post: {
      id: "central_post",
      name: "中原驿",
      region: "人间边境",
      terrain: "road",
      event: "post_gate",
      map: { x: 8, y: 52, step: 0 },
      arrivalText: "驿灯还亮，你们在最后一段官路前停下。",
      detail: "驿灯还亮，旧王朝的里程牌只剩向西的空数。粮袋在檐下重新扎紧，车轴也能借几枚驿钉稳住。过了这里，官路只剩传说。",
      sanityDetails: {
        uneasy: "驿灯还亮，里程牌却像把数字都咽了下去。粮袋能扎紧，车轴也能补稳，只是檐下风声总像有人催你们快些离开。",
        mad: "驿灯没有照路，它在数人。里程牌向西空着，像等车队把自己的日数填进去。粮袋扎得越紧，袋底越像有牙在磨。"
      },
      supplyDiscoveryText: "驿仓角落还剩一袋干粟，铜钉压在粮袋底。",
      fieldNote: {
        category: "地风",
        subject: "驿灯与空里程",
        evidence: "里程牌只剩向西的空数，驿灯仍为过界者留明。",
        clue: "官路在此断成传说，后续路线多靠旧物与口供辨认。",
        effect: { axle: 0, grain: 0, sanity: 1 }
      },
      supplies: [
        {
          id: "central_repair",
          label: "借驿钉修轴",
          hint: "车轴 +8，粮草 -2",
          effect: { axle: 8, grain: -2, sanity: 0 },
          result: "驿卒从旧木匣里取出几枚铜钉，车轮声稳了一些。"
        },
        {
          id: "central_grain",
          label: "清点驿粮",
          hint: "粮草 +8",
          effect: { axle: 0, grain: 8, sanity: 0 },
          result: "你们在驿仓角落找出一小袋干粟，足够队伍多撑一段路。"
        }
      ]
    },
    old_king_road: {
      id: "old_king_road",
      name: "故王道",
      region: "旧王道",
      terrain: "road",
      event: "split_tracks",
      map: { x: 25, y: 38, step: 1 },
      arrivalText: "深车辙把车往西牵，像旧路还认得队伍。",
      detail: "王道石基半埋在尘里，深车辙还把车往西牵。白日路直，入暮后会多出一条不在图上的辙。有人说那是前队留下的错路。",
      sanityDetails: {
        uneasy: "王道石基半埋在尘里，车辙却比昨日更深。白日只有一条路，入暮后多出一条不在图上的辙，像有人刚替你们走过。",
        mad: "王道不是路，是一只旧手。深辙扣住车轮往西牵，暮色里那条错路开始学你们的轮声，走在车队前面。"
      },
      supplyDiscoveryText: "半埋王道石可垫轮，石缝里还夹着旧贡绳。",
      fieldNote: {
        category: "地风",
        subject: "故王车辙",
        evidence: "旧石基半埋，暮后多出一条不在图上的车辙。",
        clue: "记录车辙深浅可帮助辨别王道与错路，但夜间抄录会磨损神志。",
        effect: { axle: -1, grain: 0, sanity: 1 }
      },
      supplies: [
        {
          id: "road_stones",
          label: "垫旧道石",
          hint: "车轴 +7，神志 -2",
          effect: { axle: 7, grain: 0, sanity: -2 },
          result: "你们把半埋的王道石撬起垫在车底，石缝里传出很轻的叹息。"
        },
        {
          id: "road_rope",
          label: "绞旧绳束轮",
          hint: "车轴 +4，粮草 -2",
          effect: { axle: 4, grain: -2, sanity: 0 },
          result: "旧贡绳还能绞紧车轮，只是队伍得少煮一锅粟。"
        }
      ]
    },
    qingqiu_outer_city: {
      id: "qingqiu_outer_city",
      name: "青丘外邑",
      region: "异域边邑",
      terrain: "market",
      event: "qingqiu_lamps",
      map: { x: 24, y: 52, step: 1 },
      arrivalText: "狐灯一盏盏亮起，城影低伏在旧路尽头。",
      detail: "青丘外邑挂着成排狐灯，城墙低得像随时能越过。市人交易温和，却总先问真名还是假名。",
      sanityDetails: {
        uneasy: "青丘外邑的狐灯一盏盏亮起，城墙低得像在伏身听话。市人笑得温和，却只问真名和假名，像除此之外都不算人。",
        mad: "狐灯不是灯，是尾。九条影子贴着城墙扫来扫去，摊主没有脸，只有一口温和的声音：真名，还是假名？"
      },
      supplyDiscoveryText: "狐灯能换一夜安眠，干粮却带着说不清的甜腥。",
      fieldNote: {
        category: "民风",
        subject: "真名与假名",
        evidence: "市人交易温和，却总先问真名还是假名。",
        clue: "青丘风俗可作为异族交涉样本，问得太细会消耗粮礼。",
        effect: { axle: 0, grain: -1, sanity: 2 }
      },
      supplies: [
        {
          id: "qingqiu_lamp",
          label: "换狐灯静夜",
          hint: "神志 +7，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 7 },
          result: "一盏不灭小灯挂上车头，夜路里的影子终于少了几层。"
        },
        {
          id: "qingqiu_grain",
          label: "换边邑干粮",
          hint: "粮草 +6，神志 -2",
          effect: { axle: 0, grain: 6, sanity: -2 },
          result: "边邑干粮带着甜腥味，能果腹，也让人记不准摊主的脸。"
        }
      ]
    },
    abandoned_pass: {
      id: "abandoned_pass",
      name: "废关",
      region: "人间边境",
      terrain: "market",
      event: "closed_order",
      map: { x: 26, y: 66, step: 1 },
      arrivalText: "塌关横在前方，旧令仍不肯闭眼。",
      detail: "关门塌了一半，旧令仍钉在木上。铜钉和断梁能救车，字缝却像还在拦人。越过此处，就算离开人间边界。",
      sanityDetails: {
        uneasy: "关门塌了一半，旧令却比活人还直。断梁能救车，铜钉能补轴，可字缝里总有一只眼，盯着谁先越界。",
        mad: "关没有塌，是蹲下来了。旧令睁着木头眼，字缝一开一合，念的不是禁令，是队伍里每个人的过关死期。"
      },
      supplyDiscoveryText: "断梁里能拆出好木，钉头带着冷锈。",
      fieldNote: {
        category: "官声",
        subject: "塌关旧令",
        evidence: "关门已塌，禁令仍直钉在木上，像还在替王朝守界。",
        clue: "拓录旧令可补王朝案牍，也会让队伍再次感到被盘查。",
        effect: { axle: 1, grain: 0, sanity: -1 }
      },
      supplies: [
        {
          id: "pass_timbers",
          label: "拆门木补车",
          hint: "车轴 +10，神志 -3",
          effect: { axle: 10, grain: 0, sanity: -3 },
          result: "关门木梁被锯下一截，纹理像被封住的旧路。"
        },
        {
          id: "pass_nails",
          label: "拔关楼铁钉",
          hint: "车轴 +6，粮草 +4，神志 -2",
          effect: { axle: 6, grain: 4, sanity: -2 },
          result: "铁钉从关楼梁骨里拔出，钉头还沾着旧火的黑；墟人识货，愿以干粮换这几枚好钉。"
        }
      ]
    },
    bird_mouse_pass: {
      id: "bird_mouse_pass",
      name: "鸟鼠夹道",
      region: "兽穴山口",
      terrain: "road",
      event: "hollow_pass",
      map: { x: 36, y: 71, step: 2 },
      arrivalText: "山腹细洞贴着车声，夹道只容一车过。",
      detail: "两山夹出一线窄路，洞眼密得像针。白日无声，入夜后满山都在搬粮和碎骨。车过此地，轮声会被山腹学走。",
      sanityDetails: {
        uneasy: "两山夹得很窄，洞眼密得像针。白日无声，入夜后洞里传来搬粮声和碎骨声，车轮每响一下，山腹就学一遍。",
        mad: "山在咀嚼。洞眼全是细小的嘴，白日闭着，夜里开了。你们的轮声被它们吞进去，又从前方吐回来。"
      },
      supplyDiscoveryText: "洞口落着碎粟和旧绳，像谁刚交过路税。",
      fieldNote: {
        category: "异闻",
        subject: "山腹学轮声",
        evidence: "洞眼密如针孔，车轮每响一下，山腹便从前方吐回一遍。",
        clue: "这类异闻可提示山口风险；采录时容易听错自己的队伍人数。",
        effect: { axle: 0, grain: 1, sanity: -2 }
      },
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
      ]
    },
    nameless_shrine: {
      id: "nameless_shrine",
      name: "无名祠",
      region: "旧道祭所",
      terrain: "road",
      event: "nameless_prayer",
      map: { x: 42, y: 49, step: 2 },
      arrivalText: "无匾小祠伏在岔路旁，香灰像刚被人拨过。",
      detail: "小祠没有匾，香灰却新。灰后有一截短路，也有几道不像人的脚印。",
      sanityDetails: {
        uneasy: "小祠没有匾，香灰却新。灰后短路一会儿近，一会儿远，那几道不像人的脚印总比车队多半步。",
        mad: "祠在路旁，也在路中。香灰新得像刚从喉咙里吐出来，灰面空着一块，正好能供下车队的影子。"
      },
      supplyDiscoveryText: "香灰能压惊，也能显出半截不该在图上的路。",
      fieldNote: {
        category: "民风",
        subject: "无名供位",
        evidence: "小祠无匾，香灰却新，灰后脚印总比车队多半步。",
        clue: "问香灰与供位能稳定人心，但要留下少量粮草作礼。",
        effect: { axle: 0, grain: -1, sanity: 2 }
      },
      supplies: [
        {
          id: "shrine_ash_path",
          label: "献粟问路",
          hint: "神志 +5，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 5 },
          result: "粟粒落进香灰，灰面显出半截弯路，队伍重新分得清前后。"
        },
        {
          id: "shrine_quiet_charm",
          label: "取灰压惊",
          hint: "神志 +4，车轴 -2",
          effect: { axle: -2, grain: 0, sanity: 4 },
          result: "香灰封入布囊，随从的低语少了些，车轮却压过祠后硬坎。"
        }
      ]
    },
    thunder_marsh: {
      id: "thunder_marsh",
      name: "雷泽浅畔",
      region: "泽畔异域",
      terrain: "water",
      event: "ground_thunder",
      map: { x: 45, y: 30, step: 2 },
      arrivalText: "泥下滚过低雷，水面把车队照得很慢。",
      detail: "雷泽水浅，雷声却从泥下滚过。芦根能吃，白羽能引路，断绳提醒车队别在水声里久停。低头看久了，水面会慢半拍。",
      sanityDetails: {
        uneasy: "雷泽水浅，雷却从泥下滚过。水面把人照得慢半拍，像倒影还没决定要不要跟着你们离开。",
        mad: "水在下面打雷，天在泥里喘气。倒影比你们慢半拍，又比你们多一个人；那个人一直低头看车轴。"
      },
      supplyDiscoveryText: "芦根被雷火烤熟一截，白羽下压着可走的浅泥。",
      fieldNote: {
        category: "异闻",
        subject: "泥下低雷",
        evidence: "水浅而雷从泥下滚过，倒影总比真人慢半拍。",
        clue: "采录雷泽水声能辨浅泥，也会让随从怀疑倒影里多出的人。",
        effect: { axle: 0, grain: 1, sanity: -2 }
      },
      supplies: [
        {
          id: "marsh_roots",
          label: "采雷泽芦根",
          hint: "粮草 +10，神志 -3",
          effect: { axle: 0, grain: 10, sanity: -3 },
          result: "芦根能吃，只是咬开时会听见一声很远的闷雷。"
        },
        {
          id: "marsh_fish",
          label: "捞泥下白鱼",
          hint: "粮草 +6，车轴 -3",
          effect: { axle: -3, grain: 6, sanity: 0 },
          result: "白鱼在泥水里一动不动，捞上来后才开始挣扎。"
        }
      ]
    },
    white_feather_mire: {
      id: "white_feather_mire",
      name: "白羽淖",
      region: "泽畔异象",
      terrain: "water",
      event: "sunken_feather",
      map: { x: 55, y: 37, step: 3 },
      arrivalText: "白羽沉在水底，重物反倒能从水面走过。",
      detail: "白羽淖的羽毛沉在水底，重物反倒能渡。这里能补粮，也会把羽民渡的方向拖进倒影里。",
      sanityDetails: {
        uneasy: "白羽沉在水底，重物反倒能渡。粮能从水里捞出来，方向也会一起被拖进倒影里。",
        mad: "羽毛都沉下去了，人却浮着。水底有一条白路，路上走着你们的倒影，倒影先到渡口，正回头招手。"
      },
      supplyDiscoveryText: "羽鱼可充饥，沉水芦能束车，只是都带着冷水气。",
      fieldNote: {
        category: "异闻",
        subject: "沉羽白路",
        evidence: "白羽沉在水底，重物反倒能从水面慢慢走过。",
        clue: "记录白羽沉浮可预判水路，但看久了会把方向拖进倒影。",
        effect: { axle: 0, grain: 1, sanity: -2 }
      },
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
      ]
    },
    feather_folk_ford: {
      id: "feather_folk_ford",
      name: "羽民渡",
      region: "异族渡口",
      terrain: "water",
      event: "feather_ford_debt",
      map: { x: 62, y: 46, step: 3 },
      arrivalText: "渡口没有桥，白羽排在水面上等一笔债。",
      detail: "羽民渡没有桥，白羽压着水面排成路。轻物先过，重物要留下一个名字。",
      sanityDetails: {
        uneasy: "羽民渡没有桥，白羽压着水面排成路。轻物能过，重物要留下一个名字；水面已经替你们空出位置。",
        mad: "桥是羽毛做的，债是名字做的。水面排好白羽，一根一根指向队伍里还没被拿走的人。"
      },
      supplyDiscoveryText: "羽舟轻得像影子，路标却要用粮和名字来换。",
      fieldNote: {
        category: "商路",
        subject: "羽民名债",
        evidence: "轻物先渡，重物要留下一个名字，渡价不只收粮。",
        clue: "采得渡规可帮助后续交易判断，但需以粮礼换取白羽路引。",
        effect: { axle: 0, grain: -1, sanity: 1 }
      },
      supplies: [
        {
          id: "feather_boat",
          label: "以粮换羽舟",
          hint: "车轴 +4，粮草 -7",
          effect: { axle: 4, grain: -7, sanity: 0 },
          result: "羽舟轻得像影子，带车队过了最伤车的一段浅水。"
        },
        {
          id: "feather_names",
          label: "换羽民路标",
          hint: "神志 +4，粮草 -5",
          effect: { axle: 0, grain: -5, sanity: 4 },
          result: "羽民把一枚白羽插在车辕上，水面短暂显出可辨的方向。"
        }
      ]
    },
    black_teeth_market: {
      id: "black_teeth_market",
      name: "黑齿市",
      region: "异族边市",
      terrain: "market",
      event: "black_trade",
      map: { x: 47, y: 62, step: 2 },
      arrivalText: "日中棚影立起，市声却没有一口人声。",
      detail: "黑齿市只在日中立起棚影，摊位无声围成市口。旧铁、黑粟、白羽都能换路，但摊主先看影子，不先看人。价钱常在明日才少。",
      sanityDetails: {
        uneasy: "黑齿市只在日中立起棚影，摊位无声围成市口。摊主先看影子，再看货物；价钱常在明日才从你身上少掉。",
        mad: "市声没有人声，因为人都在影子里。黑齿一笑，价码从明日伸手，先拿走你还没丢的东西。"
      },
      supplyDiscoveryText: "旧铁能换黑粟，白羽能换一句不说出口的路价。",
      fieldNote: {
        category: "商路",
        subject: "黑齿影价",
        evidence: "摊主先看影子再看货物，价钱常在明日才少。",
        clue: "记下影价能帮王朝理解边市规矩，却会让采风册沾上债味。",
        effect: { axle: 0, grain: 1, sanity: -1 }
      },
      supplies: [
        {
          id: "market_trade_grain",
          label: "以旧铁换粮",
          hint: "粮草 +12，车轴 -3",
          effect: { axle: -3, grain: 12, sanity: 0 },
          result: "黑齿市人收走一段旧铁，换来的粮袋沉得出奇。"
        },
        {
          id: "market_sedative",
          label: "买静神药粉",
          hint: "神志 +8，粮草 -5",
          effect: { axle: 0, grain: -5, sanity: 8 },
          result: "药粉苦而清凉，随从们终于能把眼前的影子看回影子。"
        }
      ]
    },
    dream_map_post: {
      id: "dream_map_post",
      name: "梦图驿",
      region: "裂隙前哨",
      terrain: "rift",
      event: "dream_map_gate",
      map: { x: 79, y: 52, step: 4 },
      arrivalText: "梦图在夜里卷起边角，像一扇小门半开着。",
      detail: "梦图驿只在夜里承认自己存在。地图会卷成一扇小门，醒来后门还在纸上。",
      sanityDetails: {
        uneasy: "梦图驿只在夜里承认自己存在。地图卷起一角，像一扇小门；醒来后门还在纸上，门缝里也有车声。",
        mad: "地图睡着了，你们醒在它的梦里。纸边卷成门，门后不是屋，是另一张还没画完的九州。"
      },
      supplyDiscoveryText: "残图能定方位，也会偷走醒来后的一小段路。",
      fieldNote: {
        category: "谶兆",
        subject: "梦图纸门",
        evidence: "地图在夜里卷成一扇门，醒后门缝仍留在纸上。",
        clue: "梦中采得的路向可指向裂隙，也可能混淆来路。",
        effect: { axle: 0, grain: 0, sanity: 1 }
      },
      supplies: [
        {
          id: "dream_map_bundle",
          label: "整束梦图",
          hint: "神志 +7，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 7 },
          result: "残图被绳重新束住，队伍短暂确认了裂隙前的方位。"
        },
        {
          id: "dream_axle_rest",
          label: "贴图歇轴",
          hint: "车轴 +3，神志 -3",
          effect: { axle: 3, grain: 0, sanity: -3 },
          result: "车轴在梦图阴影里冷却下来，只是醒后每个人都少记一小段路。"
        }
      ]
    },
    red_marsh: {
      id: "red_marsh",
      name: "赤水外滩",
      region: "大荒边缘",
      terrain: "water",
      event: "red_bones",
      map: { x: 67, y: 32, step: 3 },
      arrivalText: "赤水不响，岸骨却排出一段浅路。",
      detail: "赤水不急不响，红得像一直在记账。岸骨白日是残骸，夜里会排成浅路。车队若沿骨前行，就要少相信一点自己。",
      sanityDetails: {
        uneasy: "赤水不急不响，红得像一直在记账。岸骨白日是残骸，夜里会排成浅路，像有人用旧死者替你们搭桥。",
        mad: "赤水在纸背流。岸骨排成路，又拆成字；你们每走一段，就有一根骨头在账上写下一个名字。"
      },
      supplyDiscoveryText: "骨边结着盐霜，可保粮，也会让手心发红。",
      fieldNote: {
        category: "灾情",
        subject: "赤水骨账",
        evidence: "岸骨白日是残骸，夜里排成浅路，像替活人记账。",
        clue: "灾情条目能解释赤水禁忌，但采录越细，越像在替骨头点名。",
        effect: { axle: 0, grain: 2, sanity: -3 }
      },
      supplies: [
        {
          id: "red_shoregrass",
          label: "采岸草充饥",
          hint: "粮草 +7，神志 -5",
          effect: { axle: 0, grain: 7, sanity: -5 },
          result: "岸草能煮成糊，颜色却总带一点洗不掉的红。"
        }
      ]
    },
    broken_stele: {
      id: "broken_stele",
      name: "巫咸断碑",
      region: "巫文界标",
      terrain: "road",
      event: "read_name",
      map: { x: 70, y: 66, step: 3 },
      arrivalText: "断碑露出残笔，像方位，也像人名。",
      detail: "断碑半埋黑土，残笔像方位，也像人名。拓下它能稳住西路，看久了却觉得缺的那一笔落在自己身上。碑后风声很低，像有人点名。",
      sanityDetails: {
        uneasy: "断碑半埋黑土，残笔像方位，也像人名。缺的那一笔总落在眼角，碑后风声很低，像有人点到你又停住。",
        mad: "碑不是缺字。碑在等你把名字还给它。每读一笔，车队少一日；每拓一痕，影子少一截。"
      },
      supplyDiscoveryText: "碑下压着旧炭和拓纸，纸背还留着半截路名。",
      fieldNote: {
        category: "谶兆",
        subject: "巫咸缺笔",
        evidence: "断碑残笔既像方位，也像人名，缺的一笔总落在眼角。",
        clue: "拓碑可稳定西路判断，代价是要反复确认自己的名字。",
        effect: { axle: 0, grain: -1, sanity: 2 }
      },
      supplies: [
        {
          id: "stele_rubbing",
          label: "拓碑定方",
          hint: "神志 +5，粮草 -2",
          effect: { axle: 0, grain: -2, sanity: 5 },
          result: "拓片补齐了几处方位，队伍重新确认自己仍在往西。"
        },
        {
          id: "stele_chant",
          label: "依碑文正名",
          hint: "神志 +6，车轴 -2",
          effect: { axle: -2, grain: 0, sanity: 6 },
          result: "随从按碑文重新叫出彼此的名字，队伍短暂地记起自己是谁。"
        }
      ]
    },
    kyushu_rift: {
      id: "kyushu_rift",
      name: "九州裂隙",
      region: "地图尽头",
      terrain: "rift",
      event: "rift_dream",
      map: { x: 91, y: 48, step: 5 },
      arrivalText: "舆图在这里折错，九州从纸背裂开一道暗缝。",
      detail: "九州裂隙不是城也不是山口，只是舆图折错后的破痕。车队到这里时，来路和去路都会变薄。",
      sanityDetails: {
        uneasy: "九州裂隙不是城也不是山口，只是舆图折错后的破痕。来路和去路都变薄，像再走一步就会被纸背看见。",
        mad: "图尽了。路还在。裂隙从纸背睁开，里面没有远方，只有车队所有没有发生的归程。"
      },
      supplyDiscoveryText: "残图被重新束紧，裂隙短暂像一条还能命名的路。",
      fieldNote: {
        category: "谶兆",
        subject: "纸背裂缝",
        evidence: "舆图在此折错，来路和去路都变薄，像被纸背看见。",
        clue: "终点采风不再给出答案，只把此前所有写法推向判词。",
        effect: { axle: 0, grain: 0, sanity: -2 }
      },
      supplies: [
        {
          id: "rift_map",
          label: "整束残图",
          hint: "神志 +8，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 8 },
          result: "残图被重新束好，至少有一瞬间，裂隙看起来像可以被理解的路。"
        }
      ]
    }
  },
  routes: [
    {
      id: "central_to_road",
      from: "central_post",
      to: "old_king_road",
      name: "循旧王道西行",
      nameShort: "沿旧王道向西缓行",
      terrain: "road",
      risk: "低",
      cost: { axle: -4, grain: -4, sanity: 0 },
      hint: "直道尚平，适合作为教程段。",
      hintShort: "直道尚平少些惊扰",
      lowSanityHint: "车辙记得回头路声",
      midEvent: "dang_kang_field_cry"
    },
    {
      id: "central_to_pass",
      from: "central_post",
      to: "abandoned_pass",
      name: "绕向废关",
      nameShort: "绕向废关穿旧令西行",
      terrain: "market",
      risk: "中",
      cost: { axle: -6, grain: -5, sanity: -3 },
      hint: "关墙仍在，但方向标残缺。",
      hintShort: "关墙残缺伤神志较重",
      lowSanityHint: "门额在数车轮声一遍",
      midEvent: "roadside_shrine"
    },
    {
      id: "central_to_qingqiu",
      from: "central_post",
      to: "qingqiu_outer_city",
      name: "借狐灯西行",
      nameShort: "借狐灯穿过边邑西行",
      terrain: "market",
      risk: "低",
      cost: { axle: -5, grain: -5, sanity: -2 },
      hint: "边邑仍有灯火，可稳神志但少修车料。",
      hintShort: "灯火稳心少车料可取",
      lowSanityHint: "灯像眼也像旧路口",
      midEvent: "fox_lamp_tail"
    },
    {
      id: "road_to_marsh",
      from: "old_king_road",
      to: "thunder_marsh",
      name: "车辙入泽",
      nameShort: "顺深车辙驶入雷泽",
      terrain: "water",
      risk: "中",
      cost: { axle: -8, grain: -6, sanity: -4 },
      hint: "泥黑而浅，雷声贴地。",
      hintShort: "泥浅有雷易伤车轴",
      lowSanityHint: "泥下先听见车声回来",
      midEvent: "wenao_fish_rain"
    },
    {
      id: "road_to_pass",
      from: "old_king_road",
      to: "abandoned_pass",
      name: "沿旧令入关",
      terrain: "market",
      risk: "低",
      cost: { axle: -5, grain: -4, sanity: -2 },
      hint: "旧令禁止西行，字还清楚。",
      midEvent: "roadside_shrine"
    },
    {
      id: "road_to_shrine",
      from: "old_king_road",
      to: "nameless_shrine",
      name: "循车辙见小祠",
      terrain: "road",
      risk: "低",
      cost: { axle: -3, grain: -4, sanity: -2 },
      hint: "旧道旁有新香灰，可问路但要耗粮。",
      midEvent: "dang_kang_field_cry"
    },
    {
      id: "road_to_birdmouse",
      from: "old_king_road",
      to: "bird_mouse_pass",
      name: "贴山入夹道",
      nameShort: "贴山影进入鸟鼠夹道",
      terrain: "road",
      risk: "中",
      cost: { axle: -6, grain: -4, sanity: -4 },
      hint: "山隘少耗粮，洞声会磨神志。",
      hintShort: "少耗粮草但夜声重",
      lowSanityHint: "洞声贴着车底走动",
      midEvent: "wheel_omen"
    },
    {
      id: "qingqiu_to_road",
      from: "qingqiu_outer_city",
      to: "old_king_road",
      name: "持灯回王道",
      terrain: "road",
      risk: "低",
      cost: { axle: -4, grain: -5, sanity: -1 },
      hint: "狐灯照回车辙，路稳但绕。",
      midEvent: "fox_lamp_tail"
    },
    {
      id: "qingqiu_to_shrine",
      from: "qingqiu_outer_city",
      to: "nameless_shrine",
      name: "绕灯影寻祠",
      terrain: "road",
      risk: "中",
      cost: { axle: -4, grain: -5, sanity: -3 },
      hint: "边邑路引指向无匾小祠。",
      midEvent: "zhu_bird_name_call"
    },
    {
      id: "pass_to_market",
      from: "abandoned_pass",
      to: "black_teeth_market",
      name: "日中入市",
      terrain: "market",
      risk: "中",
      cost: { axle: -4, grain: -7, sanity: -6 },
      hint: "粮草或许能换，但价格未必是粮。",
      midEvent: "black_teeth_scale_price"
    },
    {
      id: "pass_to_birdmouse",
      from: "abandoned_pass",
      to: "bird_mouse_pass",
      name: "沿关墙入夹道",
      terrain: "road",
      risk: "中",
      cost: { axle: -4, grain: -4, sanity: -5 },
      hint: "旧关后是窄山口，车能过，人会听见太多夜声。",
      midEvent: "wheel_omen"
    },
    {
      id: "shrine_to_marsh",
      from: "nameless_shrine",
      to: "thunder_marsh",
      name: "沿灰路入泽",
      terrain: "water",
      risk: "中",
      cost: { axle: -5, grain: -6, sanity: -3 },
      hint: "香灰指向泽畔，粮草会湿。",
      midEvent: "mirror_reed_bed"
    },
    {
      id: "shrine_to_market",
      from: "nameless_shrine",
      to: "black_teeth_market",
      name: "按空名入市",
      terrain: "market",
      risk: "中",
      cost: { axle: -4, grain: -7, sanity: -5 },
      hint: "祠中空名可换市口方向。",
      midEvent: "zhu_bird_name_call"
    },
    {
      id: "birdmouse_to_marsh",
      from: "bird_mouse_pass",
      to: "thunder_marsh",
      name: "循山腹水声",
      terrain: "water",
      risk: "中",
      cost: { axle: -6, grain: -4, sanity: -5 },
      hint: "洞声转成水声，雷泽在山后。",
      midEvent: "ming_snake_crosswind"
    },
    {
      id: "birdmouse_to_market",
      from: "bird_mouse_pass",
      to: "black_teeth_market",
      name: "过洞影入市",
      terrain: "market",
      risk: "中",
      cost: { axle: -5, grain: -5, sanity: -5 },
      hint: "山口另一侧有日中市影。",
      midEvent: "black_teeth_scale_price"
    },
    {
      id: "birdmouse_to_mire",
      from: "bird_mouse_pass",
      to: "white_feather_mire",
      name: "听空穴至白淖",
      terrain: "water",
      risk: "高",
      cost: { axle: -6, grain: -5, sanity: -6 },
      hint: "空穴里的羽声指向沉水白羽。",
      midEvent: "mirror_reed_bed"
    },
    {
      id: "marsh_to_red",
      from: "thunder_marsh",
      to: "red_marsh",
      name: "沿羽落处南行",
      terrain: "water",
      risk: "高",
      cost: { axle: -10, grain: -8, sanity: -9 },
      hint: "水色变暗，芦苇高过车盖。",
      midEvent: "ming_snake_crosswind"
    },
    {
      id: "marsh_to_feather",
      from: "thunder_marsh",
      to: "feather_folk_ford",
      name: "随白羽找渡",
      terrain: "water",
      risk: "中",
      cost: { axle: -6, grain: -6, sanity: -5 },
      hint: "白羽沉在浅淖里，渡口不远。",
      midEvent: "xuan_gui_shell_bridge"
    },
    {
      id: "thunder_to_mire",
      from: "thunder_marsh",
      to: "white_feather_mire",
      name: "沿沉羽入淖",
      nameShort: "沿沉羽痕驶入白淖",
      terrain: "water",
      risk: "中",
      cost: { axle: -6, grain: -5, sanity: -5 },
      hint: "雷泽边缘漂着白羽，粮草可补，神志承压。",
      hintShort: "可补粮草心神不稳",
      lowSanityHint: "白羽在水下发亮了",
      midEvent: "mirror_reed_bed"
    },
    {
      id: "market_to_stele",
      from: "black_teeth_market",
      to: "broken_stele",
      name: "以旧物换碑路",
      terrain: "road",
      risk: "中",
      cost: { axle: -5, grain: -6, sanity: -9 },
      hint: "市人指向一块不像文字的碑。",
      midEvent: "black_teeth_scale_price"
    },
    {
      id: "market_to_feather",
      from: "black_teeth_market",
      to: "feather_folk_ford",
      name: "买羽寻渡",
      terrain: "water",
      risk: "中",
      cost: { axle: -5, grain: -8, sanity: -4 },
      hint: "粮袋变轻，水路却少伤车轴。",
      midEvent: "xuan_gui_shell_bridge"
    },
    {
      id: "market_to_mire",
      from: "black_teeth_market",
      to: "white_feather_mire",
      name: "循白羽货价入淖",
      nameShort: "循白羽价驶入浅淖",
      terrain: "water",
      risk: "中",
      cost: { axle: -5, grain: -7, sanity: -5 },
      hint: "市人给出的白羽价，指向一片倒着浮的浅水。",
      hintShort: "倒水浅处还能补给",
      lowSanityHint: "价码浮在水下面了",
      midEvent: "mirror_reed_bed"
    },
    {
      id: "red_to_rift",
      from: "red_marsh",
      to: "kyushu_rift",
      name: "夜近裂隙",
      nameShort: "夜沿岸骨靠近裂隙",
      terrain: "rift",
      risk: "高",
      cost: { axle: -12, grain: -9, sanity: -14 },
      hint: "白日无路，低神志者说看见浅滩。",
      hintShort: "锁路高压直抵裂隙",
      lowSanityHint: "浅滩只给低神志者",
      requireAny: [
        { flag: "followed_bones" },
        { flag: "rift_name" },
        { sanityMax: 34 }
      ],
      lockedHint: "需沿骨行路、读出裂隙名，或神志低至能看见幻路。",
      lockedHintShort: "还缺骨路或裂隙名"
    },
    {
      id: "red_to_dream",
      from: "red_marsh",
      to: "dream_map_post",
      name: "沿红雾入梦图",
      terrain: "rift",
      risk: "高",
      cost: { axle: -8, grain: -7, sanity: -10 },
      hint: "避开直抵裂隙的浅滩，先找梦图前哨。",
      midEvent: "dream_cicada_shell"
    },
    {
      id: "red_to_stele",
      from: "red_marsh",
      to: "broken_stele",
      name: "退往断碑",
      nameShort: "离赤水岸退往断碑",
      terrain: "road",
      risk: "中",
      cost: { axle: -7, grain: -6, sanity: -4 },
      hint: "离开赤水，寻找能解释骨路的文字。",
      hintShort: "退离赤水寻找文字",
      lowSanityHint: "骨路后面藏着残笔",
      midEvent: "bone_ox_rut"
    },
    {
      id: "stele_to_rift",
      from: "broken_stele",
      to: "kyushu_rift",
      name: "照碑文西去",
      nameShort: "照断碑文驶向裂隙",
      terrain: "rift",
      risk: "高",
      cost: { axle: -10, grain: -9, sanity: -16 },
      hint: "碑文像在补全地图。",
      hintShort: "高压前进路线已定",
      lowSanityHint: "碑文替地图补口了"
    },
    {
      id: "stele_to_dream",
      from: "broken_stele",
      to: "dream_map_post",
      name: "拓碑入梦驿",
      terrain: "rift",
      risk: "中",
      cost: { axle: -5, grain: -6, sanity: -6 },
      hint: "碑文没有直指裂隙，而是指向一处会卷起的图。",
      midEvent: "bone_ox_rut"
    },
    {
      id: "market_to_red",
      from: "black_teeth_market",
      to: "red_marsh",
      name: "买羽渡泽",
      terrain: "water",
      risk: "高",
      cost: { axle: -7, grain: -11, sanity: -8 },
      hint: "交易省车轴，耗粮草。",
      midEvent: "black_cloud"
    },
    {
      id: "mire_to_feather",
      from: "white_feather_mire",
      to: "feather_folk_ford",
      name: "随沉羽找渡",
      nameShort: "随沉羽影找到渡口",
      terrain: "water",
      risk: "中",
      cost: { axle: -4, grain: -6, sanity: -5 },
      hint: "白羽沉处能找到羽民渡的浅水。",
      hintShort: "浅水可过要耗粮草",
      lowSanityHint: "渡口在水下眨眼了",
      midEvent: "xuan_gui_shell_bridge"
    },
    {
      id: "mire_to_red",
      from: "white_feather_mire",
      to: "red_marsh",
      name: "沿反照近赤水",
      terrain: "water",
      risk: "高",
      cost: { axle: -7, grain: -7, sanity: -9 },
      hint: "倒影尽头泛红，是更高压的禁地。",
      midEvent: "mirror_reed_bed"
    },
    {
      id: "feather_to_red",
      from: "feather_folk_ford",
      to: "red_marsh",
      name: "弃名近赤水",
      terrain: "water",
      risk: "高",
      cost: { axle: -6, grain: -8, sanity: -8 },
      hint: "水路省车，却把队伍推向禁地。"
    },
    {
      id: "feather_to_dream",
      from: "feather_folk_ford",
      to: "dream_map_post",
      name: "羽落入梦图",
      terrain: "rift",
      risk: "高",
      cost: { axle: -5, grain: -8, sanity: -11 },
      hint: "羽民说轻物能先抵达梦里。",
      midEvent: "dream_cicada_shell"
    },
    {
      id: "dream_to_rift",
      from: "dream_map_post",
      to: "kyushu_rift",
      name: "照梦门抵裂",
      nameShort: "照梦门缝抵达裂口",
      terrain: "rift",
      risk: "高",
      cost: { axle: -8, grain: -9, sanity: -15 },
      hint: "梦图前哨后的最后一段路，能走，但不会像现实。",
      hintShort: "最后一段不像现实",
      lowSanityHint: "门后不是人间旧路"
    }
  ],
  revealPlan: {
    central_post: {
      routes: ["central_to_road", "central_to_pass", "central_to_qingqiu"],
      fogLocations: ["thunder_marsh", "bird_mouse_pass", "nameless_shrine"],
      fogRoutes: ["road_to_marsh", "road_to_birdmouse", "qingqiu_to_shrine"],
      revealText: "驿外旧图吸了潮，西边三道朱砂线先浮出来。",
      revealTextShort: "朱砂线浮出三道",
      lowSanityRevealText: "墨线比路先动起来"
    },
    old_king_road: {
      routes: ["road_to_marsh", "road_to_pass", "road_to_shrine", "road_to_birdmouse"],
      fogLocations: ["red_marsh", "bird_mouse_pass", "white_feather_mire"],
      fogRoutes: ["marsh_to_red", "birdmouse_to_mire", "thunder_to_mire"],
      revealText: "故王道的车辙向两侧分开，泽气在远处压住纸面。",
      revealTextShort: "车辙分开，泽气压纸"
    },
    qingqiu_outer_city: {
      routes: ["qingqiu_to_road", "qingqiu_to_shrine"],
      fogLocations: ["old_king_road", "nameless_shrine", "black_teeth_market"],
      fogRoutes: ["road_to_marsh", "shrine_to_market"],
      revealText: "狐灯沿纸纹排开，照出回王道与绕祠两条小路。",
      revealTextShort: "狐灯照出两条小路"
    },
    abandoned_pass: {
      routes: ["pass_to_market", "pass_to_birdmouse"],
      fogLocations: ["black_teeth_market", "bird_mouse_pass", "white_feather_mire"],
      fogRoutes: ["market_to_stele", "birdmouse_to_mire", "market_to_mire"],
      revealText: "废关门额下的旧令松动，日中市影从雾里露出边角。",
      revealTextShort: "旧令松动，市影露角"
    },
    bird_mouse_pass: {
      routes: ["birdmouse_to_marsh", "birdmouse_to_market", "birdmouse_to_mire"],
      fogLocations: ["thunder_marsh", "black_teeth_market", "white_feather_mire"],
      fogRoutes: ["thunder_to_mire", "market_to_mire", "mire_to_red"],
      revealText: "两山夹出一线窄路，洞口像针眼一样浮在纸上。",
      revealTextShort: "夹道在纸上收窄"
    },
    nameless_shrine: {
      routes: ["shrine_to_marsh", "shrine_to_market"],
      fogLocations: ["thunder_marsh", "black_teeth_market", "white_feather_mire"],
      fogRoutes: ["thunder_to_mire", "market_to_mire"],
      revealText: "香灰在图上散开，一半落向泽畔，一半落向市影。",
      revealTextShort: "香灰分向泽畔与市口"
    },
    thunder_marsh: {
      routes: ["marsh_to_red", "marsh_to_feather", "thunder_to_mire"],
      fogLocations: ["red_marsh", "white_feather_mire", "feather_folk_ford"],
      fogRoutes: ["mire_to_feather", "mire_to_red", "feather_to_dream"],
      revealText: "雷声从纸背滚过，赤水方向被淡墨勾出一截。",
      revealTextShort: "纸背滚雷，赤水现线"
    },
    black_teeth_market: {
      routes: ["market_to_stele", "market_to_red", "market_to_feather", "market_to_mire"],
      fogLocations: ["broken_stele", "red_marsh", "white_feather_mire"],
      fogRoutes: ["stele_to_dream", "mire_to_red", "mire_to_feather"],
      revealText: "黑齿市人收起摊布，换来的不是路，而是两枚方向。",
      revealTextShort: "摊布收起，两路定价"
    },
    white_feather_mire: {
      routes: ["mire_to_feather", "mire_to_red"],
      fogLocations: ["feather_folk_ford", "red_marsh", "dream_map_post"],
      fogRoutes: ["feather_to_dream", "red_to_dream", "dream_to_rift"],
      revealText: "浅淖漂出一圈白羽，羽民渡的方向在水下闪了一下。",
      revealTextShort: "白羽沉下，渡向闪现"
    },
    feather_folk_ford: {
      routes: ["feather_to_red", "feather_to_dream"],
      fogLocations: ["red_marsh", "dream_map_post", "kyushu_rift"],
      fogRoutes: ["red_to_rift", "dream_to_rift"],
      revealText: "白羽在水面排成轻桥，赤水与梦图前哨同时浮出。",
      revealTextShort: "白羽压水成轻桥"
    },
    red_marsh: {
      routes: ["red_to_rift", "red_to_stele", "red_to_dream"],
      fogLocations: ["broken_stele", "dream_map_post", "kyushu_rift"],
      fogRoutes: ["stele_to_rift", "dream_to_rift"],
      revealText: "赤水在图上渗开，裂隙破痕隔着一层红雾显出。",
      revealTextShort: "赤水渗开，裂痕隔雾",
      lowSanityRevealText: "红水先于地图醒来"
    },
    broken_stele: {
      routes: ["stele_to_rift", "stele_to_dream"],
      fogLocations: ["dream_map_post", "kyushu_rift"],
      fogRoutes: ["dream_to_rift"],
      revealText: "断碑残笔补上西向，裂隙的位置终于不再游移。",
      revealTextShort: "残笔补西，裂隙定住"
    },
    dream_map_post: {
      routes: ["dream_to_rift"],
      fogLocations: ["kyushu_rift"],
      fogRoutes: [],
      revealText: "梦图驿把地图重新卷起，卷口正对裂隙破痕。",
      revealTextShort: "梦图卷口正对裂痕"
    },
    kyushu_rift: {
      routes: [],
      fogLocations: [],
      fogRoutes: [],
      revealText: "地图在裂隙前合拢，远处已无普通道路。",
      revealTextShort: "地图合拢，路到尽处"
    }
  },
  routePools: {
    central_post: {
      requiredRoutes: ["central_to_road"],
      optionalRoutes: [
        { id: "central_to_pass", weight: 35, tags: ["axle_rescue", "side"] },
        { id: "central_to_qingqiu", weight: 35, tags: ["grain_rescue", "sanity_rescue", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "thunder_marsh", weight: 35, tags: ["grain_rescue"] },
        { type: "location", id: "bird_mouse_pass", weight: 25, tags: ["axle_rescue"] },
        { type: "location", id: "nameless_shrine", weight: 25, tags: ["sanity_rescue"] },
        { type: "route", id: "road_to_birdmouse", weight: 20, tags: ["side"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["axle_rescue", "grain_rescue", "sanity_rescue"]
    },
    old_king_road: {
      requiredRoutes: ["road_to_marsh"],
      optionalRoutes: [
        { id: "road_to_pass", weight: 35, tags: ["axle_rescue", "low_risk"] },
        { id: "road_to_shrine", weight: 35, tags: ["sanity_rescue", "low_risk"] },
        { id: "road_to_birdmouse", weight: 30, tags: ["axle_rescue", "side"] }
      ],
      optionalCount: 2,
      fogPool: [
        { type: "location", id: "red_marsh", weight: 35, tags: ["core"] },
        { type: "location", id: "white_feather_mire", weight: 30, tags: ["grain_rescue"] },
        { type: "location", id: "bird_mouse_pass", weight: 25, tags: ["axle_rescue"] },
        { type: "route", id: "marsh_to_red", weight: 25, tags: ["core"] },
        { type: "route", id: "thunder_to_mire", weight: 25, tags: ["grain_rescue"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["axle_rescue", "grain_rescue", "sanity_rescue"]
    },
    qingqiu_outer_city: {
      requiredRoutes: ["qingqiu_to_road"],
      optionalRoutes: [
        { id: "qingqiu_to_shrine", weight: 35, tags: ["sanity_rescue", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "old_king_road", weight: 25, tags: ["core"] },
        { type: "location", id: "nameless_shrine", weight: 30, tags: ["sanity_rescue"] },
        { type: "location", id: "black_teeth_market", weight: 25, tags: ["grain_rescue", "sanity_rescue"] },
        { type: "route", id: "shrine_to_market", weight: 20, tags: ["side"] }
      ],
      fogCount: { min: 1, max: 2 },
      rescueTags: ["grain_rescue", "sanity_rescue"]
    },
    abandoned_pass: {
      requiredRoutes: ["pass_to_market"],
      optionalRoutes: [
        { id: "pass_to_birdmouse", weight: 35, tags: ["axle_rescue", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "black_teeth_market", weight: 30, tags: ["grain_rescue", "sanity_rescue"] },
        { type: "location", id: "bird_mouse_pass", weight: 30, tags: ["axle_rescue"] },
        { type: "location", id: "white_feather_mire", weight: 25, tags: ["grain_rescue"] },
        { type: "route", id: "birdmouse_to_mire", weight: 20, tags: ["grain_rescue"] }
      ],
      fogCount: { min: 1, max: 3 },
      rescueTags: ["axle_rescue", "grain_rescue", "sanity_rescue"]
    },
    bird_mouse_pass: {
      requiredRoutes: ["birdmouse_to_marsh"],
      optionalRoutes: [
        { id: "birdmouse_to_market", weight: 35, tags: ["grain_rescue", "sanity_rescue", "side"] },
        { id: "birdmouse_to_mire", weight: 30, tags: ["grain_rescue", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "thunder_marsh", weight: 30, tags: ["grain_rescue"] },
        { type: "location", id: "black_teeth_market", weight: 30, tags: ["grain_rescue", "sanity_rescue"] },
        { type: "location", id: "white_feather_mire", weight: 25, tags: ["grain_rescue"] },
        { type: "route", id: "thunder_to_mire", weight: 20, tags: ["grain_rescue"] },
        { type: "route", id: "mire_to_red", weight: 20, tags: ["danger"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["axle_rescue", "grain_rescue", "sanity_rescue"]
    },
    nameless_shrine: {
      requiredRoutes: ["shrine_to_marsh"],
      optionalRoutes: [
        { id: "shrine_to_market", weight: 35, tags: ["grain_rescue", "sanity_rescue", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "thunder_marsh", weight: 30, tags: ["grain_rescue"] },
        { type: "location", id: "black_teeth_market", weight: 25, tags: ["grain_rescue", "sanity_rescue"] },
        { type: "location", id: "white_feather_mire", weight: 25, tags: ["grain_rescue"] },
        { type: "route", id: "market_to_mire", weight: 20, tags: ["grain_rescue"] }
      ],
      fogCount: { min: 1, max: 3 },
      rescueTags: ["grain_rescue", "sanity_rescue"]
    },
    thunder_marsh: {
      requiredRoutes: ["marsh_to_red"],
      optionalRoutes: [
        { id: "marsh_to_feather", weight: 35, tags: ["side", "mid_risk"] },
        { id: "thunder_to_mire", weight: 35, tags: ["grain_rescue", "mid_risk"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "red_marsh", weight: 35, tags: ["core", "danger"] },
        { type: "location", id: "white_feather_mire", weight: 30, tags: ["grain_rescue"] },
        { type: "location", id: "feather_folk_ford", weight: 25, tags: ["side"] },
        { type: "route", id: "mire_to_feather", weight: 20, tags: ["side"] },
        { type: "route", id: "mire_to_red", weight: 20, tags: ["danger"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["grain_rescue"]
    },
    black_teeth_market: {
      requiredRoutes: ["market_to_stele"],
      optionalRoutes: [
        { id: "market_to_red", weight: 20, tags: ["danger", "high_grain_cost"] },
        { id: "market_to_feather", weight: 30, tags: ["side"] },
        { id: "market_to_mire", weight: 35, tags: ["grain_rescue", "side"] }
      ],
      optionalCount: 2,
      fogPool: [
        { type: "location", id: "broken_stele", weight: 35, tags: ["sanity_rescue", "core"] },
        { type: "location", id: "red_marsh", weight: 25, tags: ["danger"] },
        { type: "location", id: "white_feather_mire", weight: 30, tags: ["grain_rescue"] },
        { type: "route", id: "stele_to_dream", weight: 20, tags: ["sanity_rescue"] },
        { type: "route", id: "mire_to_feather", weight: 20, tags: ["side"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["grain_rescue", "sanity_rescue"]
    },
    white_feather_mire: {
      requiredRoutes: ["mire_to_feather"],
      optionalRoutes: [
        { id: "mire_to_red", weight: 30, tags: ["danger", "core"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "feather_folk_ford", weight: 30, tags: ["side"] },
        { type: "location", id: "red_marsh", weight: 30, tags: ["danger", "core"] },
        { type: "location", id: "dream_map_post", weight: 25, tags: ["sanity_rescue", "rift_buffer"] },
        { type: "route", id: "feather_to_dream", weight: 20, tags: ["rift_buffer"] },
        { type: "route", id: "red_to_dream", weight: 20, tags: ["rift_buffer"] }
      ],
      fogCount: { min: 1, max: 3 },
      rescueTags: ["grain_rescue", "sanity_rescue"]
    },
    feather_folk_ford: {
      requiredRoutes: ["feather_to_dream"],
      optionalRoutes: [
        { id: "feather_to_red", weight: 30, tags: ["danger", "side"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "red_marsh", weight: 30, tags: ["danger"] },
        { type: "location", id: "dream_map_post", weight: 30, tags: ["sanity_rescue", "rift_buffer"] },
        { type: "location", id: "kyushu_rift", weight: 20, tags: ["rift"] },
        { type: "route", id: "dream_to_rift", weight: 20, tags: ["rift"] }
      ],
      fogCount: { min: 1, max: 3 },
      rescueTags: ["sanity_rescue"]
    },
    red_marsh: {
      requiredRoutes: ["red_to_stele"],
      optionalRoutes: [
        { id: "red_to_dream", weight: 30, tags: ["sanity_rescue", "rift_buffer"] },
        { id: "red_to_rift", weight: 15, tags: ["locked", "danger", "rift_shortcut"] }
      ],
      optionalCount: 2,
      fogPool: [
        { type: "location", id: "broken_stele", weight: 35, tags: ["sanity_rescue", "core_safe_exit"] },
        { type: "location", id: "dream_map_post", weight: 30, tags: ["sanity_rescue", "rift_buffer"] },
        { type: "location", id: "kyushu_rift", weight: 20, tags: ["rift"] },
        { type: "route", id: "stele_to_rift", weight: 30, tags: ["core"] },
        { type: "route", id: "dream_to_rift", weight: 20, tags: ["rift"] }
      ],
      fogCount: { min: 2, max: 3 },
      rescueTags: ["sanity_rescue"]
    },
    broken_stele: {
      requiredRoutes: ["stele_to_rift"],
      optionalRoutes: [
        { id: "stele_to_dream", weight: 35, tags: ["sanity_rescue", "rift_buffer"] }
      ],
      optionalCount: 1,
      fogPool: [
        { type: "location", id: "dream_map_post", weight: 30, tags: ["sanity_rescue", "rift_buffer"] },
        { type: "location", id: "kyushu_rift", weight: 30, tags: ["rift"] },
        { type: "route", id: "dream_to_rift", weight: 20, tags: ["rift"] }
      ],
      fogCount: { min: 1, max: 2 },
      rescueTags: ["sanity_rescue"]
    },
    dream_map_post: {
      requiredRoutes: ["dream_to_rift"],
      optionalRoutes: [],
      optionalCount: 0,
      fogPool: [
        { type: "location", id: "kyushu_rift", weight: 30, tags: ["rift"] }
      ],
      fogCount: 1,
      rescueTags: ["sanity_rescue"]
    },
    kyushu_rift: {
      requiredRoutes: [],
      optionalRoutes: [],
      optionalCount: 0,
      fogPool: [],
      fogCount: 0,
      rescueTags: []
    }
  },
  fogLabels: {
    old_king_road: { name: "旧道深辙", hint: "两道车痕压向雾里" },
    qingqiu_outer_city: { name: "狐灯城影", hint: "小灯成排，不报真名" },
    bird_mouse_pass: { name: "山腹细洞", hint: "细洞声贴着车轮" },
    nameless_shrine: { name: "无匾小祠", hint: "新香灰指向岔路" },
    thunder_marsh: { name: "伏雷浅泽", hint: "泥下有雷压着水" },
    white_feather_mire: { name: "沉羽浅淖", hint: "白羽在水下发亮" },
    feather_folk_ford: { name: "羽压水纹", hint: "渡口暂不肯显名" },
    black_teeth_market: { name: "日中市口", hint: "正午处立起棚影" },
    dream_map_post: { name: "梦图卷口", hint: "图边卷成一扇门" },
    red_marsh: { name: "赤水纸背", hint: "红水从纸背渗出" },
    broken_stele: { name: "断碑残笔", hint: "半截巫文露出雾" },
    kyushu_rift: { name: "纸尽裂痕", hint: "图尽处有暗缝" }
  },
  routeEvents: {
    wheel_omen: {
      title: "轮声入骨",
      tag: "路遇",
      texts: {
        clear: "前轮忽然空响，路面却没有石子。轴心像被人从里面轻敲了一下。",
        uneasy: "空响从队尾追上来。轴心里有一小段路醒着。",
        mad: "轮在叫你。轴心里有一小段路醒着，它说再往前一点，就能把车队套进去。"
      },
      choices: [
        {
          label: "停车紧轴",
          hint: "车轴 +5，粮草 -3",
          effect: { axle: 5, grain: -3, sanity: 0 },
          result: "你们在路心停下，重新紧过轮楔。耽误了一顿饭的工夫，但车声重新变稳。"
        },
        {
          label: "不停赶路",
          hint: "粮草 -1，神志 -5",
          effect: { axle: 0, grain: -1, sanity: -5 },
          result: "车队没有停。那声空响很快追到每个人耳后。"
        }
      ]
    },
    roadside_shrine: {
      title: "路旁无名祠",
      tag: "路遇",
      texts: {
        clear: "路旁小祠无匾，香灰却新。祠后短路旁留着几道怪脚印。",
        uneasy: "小祠每走一步都近一点。空供位上像写着车队的影子。",
        mad: "祠在路旁，也在路中。你们每走一步，它就近一点。祠里供着空位，空位上写着车队的影子。"
      },
      choices: [
        {
          label: "献粟问路",
          hint: "粮草 -4，神志 +5",
          effect: { axle: 0, grain: -4, sanity: 5 },
          result: "一小撮粟撒进香灰，灰面显出半截可走的弯路。"
        },
        {
          label: "绕祠而过",
          hint: "车轴 -3",
          effect: { axle: -3, grain: 0, sanity: 0 },
          result: "你们绕开小祠，车轮压过一片硬土，像压碎了许多干骨。"
        }
      ]
    },
    black_cloud: {
      title: "半途黑云",
      tag: "路遇",
      texts: {
        clear: "黑云贴着地面滚来，像低飞的影。车队得卸重等它，或抢在云前穿过。",
        uneasy: "云在地上，天在车轮旁。黑色的口等你们驶进去。",
        mad: "云在下面。天在车轮旁边。黑色的东西一张一合，等你们把名字驶进去。"
      },
      choices: [
        {
          label: "卸重避云",
          hint: "车轴 +4，粮草 -5",
          effect: { axle: 4, grain: -5, sanity: 0 },
          result: "车队卸下一箱湿重杂物，避到浅坡后。黑云擦着车辙过去，留下一层细灰。"
        },
        {
          label: "循雷快行",
          hint: "车轴 -4，神志 -4",
          effect: { axle: -4, grain: 0, sanity: -4 },
          result: "你们追着云下的雷声疾行，确实省了时间，也听见雷声里有人跟着数步。"
        }
      ]
    },
    wenao_fish_rain: {
      title: "文鳐雨",
      tag: "路遇",
      texts: {
        clear: "薄云里游过文鳐，鳞光落在车辙旁。粮袋闻到水腥味。",
        uneasy: "天上先响起水声。文鳐从眼里游过，吐出旧粮。",
        mad: "天上有水。文鳐从你眼里游过，吐出一袋旧粮。"
      },
      choices: [
        {
          label: "收鳞作粮",
          hint: "粮草 +6，神志 -2",
          effect: { axle: 0, grain: 6, sanity: -2 },
          result: "鳞片入袋后仍有水腥，粮袋却重了。"
        },
        {
          label: "覆袋避鳞",
          hint: "粮草 -2，神志 +3",
          effect: { axle: 0, grain: -2, sanity: 3 },
          result: "车队不看天鱼，心神稳了一些。"
        },
        {
          label: "追鱼入浅泽",
          hint: "车轴 -2，粮草 +9，神志 -4",
          effect: { axle: -2, grain: 9, sanity: -4, flag: "wenao_trace" },
          result: "浅泽给了粮，也咬住一截车轮。"
        }
      ]
    },
    dang_kang_field_cry: {
      title: "当康啼垄",
      tag: "路遇",
      texts: {
        clear: "荒垄里有白牙兽低啼，土下翻出新谷味。跟着啼声走，粮会多些，车会陷些。",
        uneasy: "那声啼叫像从粮袋里传来。旧田鼓起，等车轮压下去。",
        mad: "田在肚中。那兽叫一声，粮袋就回头看你。"
      },
      choices: [
        {
          label: "随啼翻土",
          hint: "车轴 -2，粮草 +8",
          effect: { axle: -2, grain: 8, sanity: 0 },
          result: "旧田吐出干谷，车轮陷过一层软土。"
        },
        {
          label: "献粟安兽",
          hint: "粮草 -3，神志 +4",
          effect: { axle: 0, grain: -3, sanity: 4 },
          result: "白牙兽停啼，荒田也安静下来。"
        },
        {
          label: "驱兽快过",
          hint: "车轴 -3，神志 -2",
          effect: { axle: -3, grain: 0, sanity: -2 },
          result: "车队冲过田垄，身后仍有啼声跟来。"
        }
      ]
    },
    xuan_gui_shell_bridge: {
      title: "旋龟浮甲",
      tag: "路遇",
      texts: {
        clear: "浅水浮出龟甲，甲纹正好接成一截桥。借它过水，车轴能少受些苦。",
        uneasy: "不是龟在水里，是路背着甲醒了。甲纹慢慢转向车轮。",
        mad: "不是龟在水里，是路背着甲醒了。"
      },
      choices: [
        {
          label: "借甲过水",
          hint: "车轴 +5，粮草 -5，神志 -1",
          effect: { axle: 5, grain: -5, sanity: -1 },
          result: "龟甲托过车辙，水声在车后合拢。"
        },
        {
          label: "撬甲补轴",
          hint: "车轴 +7，神志 -4",
          effect: { axle: 7, grain: 0, sanity: -4, flag: "xuan_shell" },
          result: "甲片嵌进轮侧，纹路还在慢慢转。"
        },
        {
          label: "绕水慢行",
          hint: "粮草 -4，神志 +2",
          effect: { axle: 0, grain: -4, sanity: 2 },
          result: "你们避开浮甲，远路反而让人安心。"
        }
      ]
    },
    zhu_bird_name_call: {
      title: "鴸鸟呼名",
      tag: "路遇",
      texts: {
        clear: "赤喙鸟落在辕木上，学着随从的姓名叫。被叫的人先回了头。",
        uneasy: "名字自己飞到辕木上。鸟只是等你答应。",
        mad: "鸟没有叫。名字自己飞到辕木上，等你答应。"
      },
      choices: [
        {
          label: "不应声赶鸟",
          hint: "车轴 -2，神志 +4",
          effect: { axle: -2, grain: 0, sanity: 4 },
          result: "鸟影被赶走，辕木却裂出一道细纹。"
        },
        {
          label: "以假名答",
          hint: "神志 -3",
          effect: { axle: 0, grain: 0, sanity: -3, flag: "false_name_echo" },
          result: "假名被鸟叼走，真名暂时无事。"
        },
        {
          label: "记下鸟声",
          hint: "神志 -6，巫咸古辞 +10",
          effect: { axle: 0, grain: 0, sanity: -6, language: { wuxian: 10 } },
          result: "鸟声写成残笔，听久了像碑文。"
        }
      ]
    },
    fox_lamp_tail: {
      title: "九尾灯影",
      tag: "路遇",
      texts: {
        clear: "岔路旁九点狐灯排开，像尾巴拖在土上。灯不照远处，只照出近路的边。",
        uneasy: "九条灯尾绕住车轮。每一条都通向同一盏灯。",
        mad: "九条尾巴绕住车轮，每一条都通向同一盏灯。"
      },
      choices: [
        {
          label: "挂灯行夜",
          hint: "粮草 -3，神志 +5",
          effect: { axle: 0, grain: -3, sanity: 5 },
          result: "狐灯挂上车头，夜色退后半步。"
        },
        {
          label: "剪影留路",
          hint: "车轴 -2，神志 -2",
          effect: { axle: -2, grain: 0, sanity: -2, flag: "fox_tail_mark" },
          result: "一截影子留在地上，指向狐灯外的小路。"
        },
        {
          label: "熄灯守名",
          hint: "粮草 -1，神志 +2",
          effect: { axle: 0, grain: -1, sanity: 2 },
          result: "灯灭之后，队里没人再报真名。"
        }
      ]
    },
    black_teeth_scale_price: {
      title: "黑齿鳞价",
      tag: "路遇",
      texts: {
        clear: "路心摊着一片青鳞，黑齿商人伸出三指。鳞上还带水，像刚从价码里捞出。",
        uneasy: "鳞是价，价在鳞上游。黑齿一笑，明日少了一角。",
        mad: "鳞是价，价是舌。黑齿一笑，明日少了一角。"
      },
      choices: [
        {
          label: "旧铁换粮",
          hint: "车轴 -3，粮草 +10",
          effect: { axle: -3, grain: 10, sanity: 0 },
          result: "旧铁离车，粮袋多了几日重量。"
        },
        {
          label: "粮换鳞引",
          hint: "粮草 -5，神志 -2",
          effect: { axle: 0, grain: -5, sanity: -2, flag: "scale_price" },
          result: "青鳞贴在地图边，自己游出一寸方向。"
        },
        {
          label: "不看价码",
          hint: "粮草 -2，神志 +3",
          effect: { axle: 0, grain: -2, sanity: 3 },
          result: "你们绕开摊位，身后笑声很快收住。"
        }
      ]
    },
    ming_snake_crosswind: {
      title: "鸣蛇横风",
      tag: "路遇",
      texts: {
        clear: "无风处忽起细鸣，蛇影横过车辙。马不肯踩影，队伍得先决定怎么过。",
        uneasy: "风长出鳞，蛇鸣从车底钻出。它用骨声挡路。",
        mad: "风长出鳞。它横在路上，用你们的骨声作鸣。"
      },
      choices: [
        {
          label: "埋火等风停",
          hint: "粮草 -3，神志 +4",
          effect: { axle: 0, grain: -3, sanity: 4 },
          result: "火灰压住蛇鸣，车队等到风影变淡。"
        },
        {
          label: "趁鸣急过",
          hint: "车轴 -4，神志 -5",
          effect: { axle: -4, grain: 0, sanity: -5 },
          result: "车队冲过蛇影，轮声里多了一段细鸣。"
        },
        {
          label: "割绳引蛇",
          hint: "车轴 +3，粮草 -4，神志 -3",
          effect: { axle: 3, grain: -4, sanity: -3 },
          result: "旧绳被蛇影吞去，车架反而松出活路。"
        }
      ]
    },
    bone_ox_rut: {
      title: "骨牛空辙",
      tag: "路遇",
      texts: {
        clear: "一头骨牛拉着空车，从侧路无声经过。车没有轮，却在土上压出深辙。",
        uneasy: "骨牛拉着你们没到的车。空辙比前路更清楚。",
        mad: "骨牛没有头。它拉着你们尚未抵达的车。"
      },
      choices: [
        {
          label: "沿空辙借路",
          hint: "车轴 +4，神志 -5",
          effect: { axle: 4, grain: 0, sanity: -5, flag: "bone_rut" },
          result: "空辙托住车轮，也把影子拖长了。"
        },
        {
          label: "折辙止影",
          hint: "车轴 -3，神志 +5",
          effect: { axle: -3, grain: 0, sanity: 5 },
          result: "你们铲断深辙，骨牛声停在远处。"
        },
        {
          label: "投粮换辙",
          hint: "车轴 +6，粮草 -5",
          effect: { axle: 6, grain: -5, sanity: 0 },
          result: "粮袋落地后，空车让出一条硬路。"
        }
      ]
    },
    mirror_reed_bed: {
      title: "倒芦照人",
      tag: "路遇",
      texts: {
        clear: "芦苇倒生在水面下，穗上挂着白籽。能收粮，但倒影先伸了手。",
        uneasy: "你们像站在水下。岸上的影子正弯腰收割你们。",
        mad: "你们站在水下。岸上的人正弯腰收割你们。"
      },
      choices: [
        {
          label: "割倒芦籽",
          hint: "粮草 +7，神志 -3",
          effect: { axle: 0, grain: 7, sanity: -3 },
          result: "白籽入袋，倒影少了一只手。"
        },
        {
          label: "闭眼过芦",
          hint: "粮草 -2，神志 +4",
          effect: { axle: 0, grain: -2, sanity: 4 },
          result: "你们不看水面，芦影也不再追来。"
        },
        {
          label: "铺芦垫轮",
          hint: "车轴 +4，粮草 -4",
          effect: { axle: 4, grain: -4, sanity: 0 },
          result: "湿芦托住车轮，很快沉进泥下。"
        }
      ]
    },
    dream_cicada_shell: {
      title: "梦蝉蜕壳",
      tag: "路遇",
      texts: {
        clear: "枯树挂满蝉蜕，空壳里有微弱车声。每只壳都朝西。",
        uneasy: "蝉把梦蜕下，车队还在壳里走。西边像一层旧皮。",
        mad: "蝉把梦蜕下。你们还在壳里走路。"
      },
      choices: [
        {
          label: "束壳静心",
          hint: "粮草 -4，神志 +6",
          effect: { axle: 0, grain: -4, sanity: 6 },
          result: "蝉壳被绳束住，梦声也低了下去。"
        },
        {
          label: "垫壳护轴",
          hint: "车轴 +4，神志 -3",
          effect: { axle: 4, grain: 0, sanity: -3 },
          result: "空壳垫在轮下，碎响像一夜小梦。"
        },
        {
          label: "焚壳辨烟",
          hint: "粮草 -2，神志 -2",
          effect: { axle: 0, grain: -2, sanity: -2, flag: "dream_smoke" },
          result: "烟柱向纸背弯去，指出梦图前路。"
        }
      ]
    }
  },
  randomRouteEvents: {
    rnd_loose_axle_song: {
      title: "鸣蛇入轴",
      tag: "随机路遇",
      pool: ["risk", "item"],
      shjAnchor: { name: "鸣蛇", type: "异兽/雷泽声异", mode: "直名引用" },
      risk: "low",
      routeTags: ["road", "water", "early", "mid"],
      trigger: { phase: "mid_route", axleMax: 62 },
      weight: 18,
      cooldown: 2,
      positiveTag: true,
      rescueCandidate: true,
      texts: {
        clear: "车轴里钻出细鸣，像一条看不见的蛇绕着轮毂盘了一圈。木楔没有裂，却一直发热。",
        uneasy: "鸣声先从骨头里响起。轮毂像含着一条细蛇，催你们不要停。",
        mad: "轴在唱。蛇在轴里学你们的归期，一圈一圈，把路绕成喉咙。"
      },
      choices: [
        {
          label: "停车听声辨裂",
          hint: "车轴 +7，粮草 -3",
          effect: { axle: 7, grain: -3, sanity: 0, badLuck: -6, flag: "heard_axle_song" },
          result: "你们拆开轮毂，照着鸣声紧过暗裂。耽误一顿饭的工夫，车轴却稳了。"
        },
        {
          label: "塞布止鸣赶路",
          hint: "粮草 -1，神志 -4",
          effect: { axle: 0, grain: -1, sanity: -4, badLuck: 2 },
          result: "布条堵住鸣声，却堵不住耳后的回响。车队继续走，没人再提那条蛇。"
        }
      ]
    },
    rnd_bitter_grass_soup: {
      title: "祝余苦汤",
      tag: "随机路遇",
      pool: ["supply", "rest"],
      shjAnchor: { name: "祝余", type: "草木物产", mode: "直名引用" },
      risk: "low",
      routeTags: ["road", "water", "early", "mid"],
      trigger: { phase: "mid_route", grainMax: 60 },
      weight: 20,
      cooldown: 2,
      positiveTag: true,
      rescueCandidate: true,
      texts: {
        clear: "路旁祝余草叶厚如小掌，煮后能压饥，只是汤色黑得像夜路。",
        uneasy: "苦味先在梦里醒来。草汤还没煮，粮袋已经轻了一点。",
        mad: "你喝下路。路在肚里发苦，仍替你们顶住一程饥。"
      },
      choices: [
        {
          label: "采草煮汤",
          hint: "粮草 +10，神志 -3",
          effect: { axle: 0, grain: 10, sanity: -3, badLuck: -10, flag: "bitter_grass" },
          result: "苦汤入腹，队伍多撑了一程。夜里有人梦见草根在替车队数路。"
        },
        {
          label: "只取草籽",
          hint: "粮草 +5，神志 +2",
          effect: { axle: 0, grain: 5, sanity: 2, badLuck: -7 },
          result: "草籽少，却干净。随从把剩下的苦味留在路边。"
        }
      ]
    },
    rnd_wrong_milestone: {
      title: "巫咸反里",
      tag: "随机路遇",
      pool: ["clue", "sanity"],
      shjAnchor: { name: "巫咸", type: "巫祝/占路", mode: "直名引用" },
      risk: "medium",
      routeTags: ["road", "market", "mid"],
      trigger: { phase: "mid_route" },
      weight: 15,
      cooldown: 2,
      positiveTag: true,
      texts: {
        clear: "里程牌倒插在路边，字却反着往西长。若拓下来，或许能省一段错路。",
        uneasy: "里程不是写给活人看的。反字从牌背爬出来，像在替你们倒数。",
        mad: "牌子走在你们前面。每一里都反过来，把你们往已经经过的地方推。"
      },
      choices: [
        {
          label: "拓下反字",
          hint: "神志 -4，巫咸古辞 +8",
          effect: { axle: 0, grain: 0, sanity: -4, language: { wuxian: 8 }, badLuck: -4, flag: "reverse_mile_mark" },
          result: "反字印在纸上，西边的雾少了一层。只是看久了，连脚步也想倒着走。"
        },
        {
          label: "推倒里程牌",
          hint: "车轴 -3，神志 +2",
          effect: { axle: -3, grain: 0, sanity: 2, badLuck: 1 },
          result: "木牌倒地，车轮压过一声闷响。前路没有更清楚，但人心稳了些。"
        }
      ]
    },
    rnd_silent_barter: {
      title: "黑齿影价",
      tag: "随机路遇",
      pool: ["supply", "trade", "clue"],
      shjAnchor: { name: "黑齿国", type: "异国贸易", mode: "直名引用" },
      risk: "low",
      routeTags: ["market", "mid"],
      trigger: { phase: "mid_route" },
      weight: 17,
      cooldown: 2,
      positiveTag: true,
      rescueCandidate: true,
      texts: {
        clear: "路旁小摊无声，黑齿商人只让影子伸手比价。摊上的粮袋没有口，却很沉。",
        uneasy: "摊主不开口，影子却比人多一只手。价码在地上爬来爬去。",
        mad: "影子在卖你们。黑齿只是站着，等地上的价把人咬住。"
      },
      choices: [
        {
          label: "旧铁换粮",
          hint: "车轴 -3，粮草 +9",
          effect: { axle: -3, grain: 9, sanity: 0, badLuck: -8, flag: "silent_price" },
          result: "一截旧铁换来沉粮。车身轻了一点，粮袋却像多了一条影子。"
        },
        {
          label: "粮换路引",
          hint: "粮草 -5，神志 -2",
          effect: { axle: 0, grain: -5, sanity: -2, badLuck: -3, flag: "silent_price" },
          result: "商人收走粮，影子在地图边按出一枚黑印。"
        }
      ]
    },
    rnd_repeated_footprints: {
      title: "夸父复迹",
      tag: "随机路遇",
      pool: ["sanity", "clue"],
      shjAnchor: { name: "夸父", type: "巨迹遗路", mode: "直名引用" },
      risk: "medium",
      routeTags: ["road", "rift", "late"],
      trigger: { phase: "mid_route", sanityMax: 58 },
      weight: 16,
      cooldown: 2,
      positiveTag: true,
      texts: {
        clear: "路面出现半日前车队自己的脚印，又大得不像人。脚印朝西，也朝回头路。",
        uneasy: "你们踩进自己的过去。巨大的脚印像刚从日影里退回来。",
        mad: "脚印先走了你们。太阳追在后面，你们只剩下一串被走过的名字。"
      },
      choices: [
        {
          label: "跟脚印走",
          hint: "车轴 +2，粮草 +2，神志 -6",
          effect: { axle: 2, grain: 2, sanity: -6, badLuck: -3, flag: "followed_own_tracks" },
          result: "脚印带你们少绕一段湿地，却把队伍的影子拉得很长。"
        },
        {
          label: "抹掉脚印",
          hint: "粮草 -3，神志 +5",
          effect: { axle: 0, grain: -3, sanity: 5, badLuck: -5 },
          result: "随从撒土抹去脚印。路没有近些，但每个人终于只剩一双脚。"
        }
      ]
    },
    rnd_count_names_rest: {
      title: "巫咸点名",
      tag: "随机路遇",
      pool: ["rest", "sanity"],
      shjAnchor: { name: "巫咸国", type: "招魂点名", mode: "直名引用" },
      risk: "low",
      routeTags: ["road", "market", "water", "rift", "mid", "late"],
      trigger: { phase: "mid_route", sanityMax: 65 },
      weight: 18,
      cooldown: 2,
      positiveTag: true,
      rescueCandidate: true,
      texts: {
        clear: "短暂停车时，随从照例点名。点到最后，人数比影子少一个。",
        uneasy: "名字比人先坐下。点名声绕过车队，带回来一个空答应。",
        mad: "少的不是人，是你们还没丢的那个名字。它在队尾答到。"
      },
      choices: [
        {
          label: "重新点名",
          hint: "粮草 -4，神志 +7",
          effect: { axle: 0, grain: -4, sanity: 7, badLuck: -10, flag: "counted_names" },
          result: "你们多点了一遍名，空答应慢慢退到风里。队伍敢继续向前。"
        },
        {
          label: "不点名继续",
          hint: "神志 -4",
          effect: { axle: 0, grain: 0, sanity: -4, badLuck: 2 },
          result: "车队没有再数。走出很远后，队尾仍有人轻声说到。"
        }
      ]
    },
    rnd_low_black_cloud_gap: {
      title: "雷泽云缝",
      tag: "随机路遇",
      pool: ["risk", "clue"],
      shjAnchor: { name: "雷泽", type: "云雷异象", mode: "地貌衍生" },
      risk: "medium",
      routeTags: ["water", "rift", "late"],
      trigger: { phase: "mid_route" },
      weight: 14,
      cooldown: 2,
      positiveTag: true,
      texts: {
        clear: "贴地黑云裂开一条缝，缝里露出干路。它像在请车队进去，又像在合嘴前等最后一口气。",
        uneasy: "云从地上开门。门里没有雨，只有很干的雷声。",
        mad: "天在脚下张嘴。你们若进去，云会替你们把名字嚼轻。"
      },
      choices: [
        {
          label: "卸重等云",
          hint: "粮草 -5，车轴 +4",
          effect: { axle: 4, grain: -5, sanity: 0, badLuck: -4 },
          result: "队伍卸下湿重之物，等云缝自己合上。车轴少受了一截泥路。"
        },
        {
          label: "穿缝疾行",
          hint: "车轴 -4，神志 -5，获得捷径痕",
          effect: { axle: -4, grain: 0, sanity: -5, badLuck: 2, flag: "black_cloud_gap" },
          result: "车队冲进云缝，确实省了远路。只是每个人都听见雷声在背后数名。"
        }
      ]
    },
    rnd_breathing_map: {
      title: "烛龙息图",
      tag: "随机路遇",
      pool: ["sanity", "item", "clue"],
      shjAnchor: { name: "烛龙", type: "昼夜呼吸", mode: "直名引用" },
      risk: "medium",
      routeTags: ["rift", "late"],
      trigger: { phase: "mid_route", sanityMax: 62 },
      weight: 15,
      cooldown: 2,
      positiveTag: true,
      texts: {
        clear: "地图纸面像胸口起伏，山川随着一呼一吸偏移。若顺着它描，或许能看见图背的路。",
        uneasy: "地图在呼吸。每一次起伏，都把白天和黑夜换一次位置。",
        mad: "图在活。它把你们吸进去，又吐成一条更细的线。"
      },
      choices: [
        {
          label: "压住地图",
          hint: "粮草 -3，神志 +4",
          effect: { axle: 0, grain: -3, sanity: 4, badLuck: -5 },
          result: "几袋粮压住图角，山川渐渐平下去。队伍重新相信脚下的路。"
        },
        {
          label: "随呼吸描路",
          hint: "神志 -6，获得图息线索",
          effect: { axle: 0, grain: 0, sanity: -6, badLuck: -2, flag: "map_breath" },
          result: "你们按着纸面起伏描下一条新线。墨迹未干，线已经在图背慢慢转动。"
        }
      ]
    }
  },
  events: {
    post_gate: {
      title: "驿门未闭",
      tag: "出发",
      texts: {
        clear: "驿卒把最后一束干草塞上车，说西边路还在，只是没人按时回来。",
        uneasy: "驿门在风里开合，像有人替你们数车轮。西边路还在，路上的人不一定还在。",
        mad: "门没有关。门在等。车轴才转半圈，驿卒已经把你们的归期写成旧账。"
      },
      choices: [
        {
          label: "整点车具",
          hint: "车轴 +8，粮草 -3",
          effect: { axle: 8, grain: -3, sanity: 0 },
          result: "你们用一袋豆粟换了几枚旧铜钉，车轮声稳了一些。"
        },
        {
          label: "立刻上路",
          hint: "粮草 -2",
          effect: { axle: 0, grain: -2, sanity: 0 },
          result: "队伍未再回头。驿门声很快被风盖住。"
        }
      ]
    },
    split_tracks: {
      title: "车辙分叉",
      tag: "路线教学",
      texts: {
        clear: "旧王道上有两道车辙，一道新而浅，一道旧而深。随从说新辙绕远，旧辙伤车。",
        uneasy: "两道车辙互相盖住，像同一辆车走了两次。随从不肯先说自己看见哪一道。",
        mad: "车辙在你脚下分开，又在你眼里合上。旧的是新的，新的还没发生。"
      },
      choices: [
        {
          label: "验土再走",
          hint: "神志 +4，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 4 },
          result: "你们停下辨土，耽误半日，但至少知道哪道车辙是真的。"
        },
        {
          label: "沿深辙快行",
          hint: "车轴 -5",
          effect: { axle: -5, grain: 0, sanity: 0 },
          result: "车轮咬进旧痕，走得很快，也响得很难听。"
        }
      ]
    },
    closed_order: {
      title: "废关旧令",
      tag: "边境",
      texts: {
        clear: "废关门额残存旧令：不得西行。字迹陈旧，但像昨日才擦过灰。",
        uneasy: "旧令写着不得西行，西字却被反复描深。墙后有风，风里像有人念你的姓名。",
        mad: "不得西行。不得归。不得看见第二座门。旧令写完，墙自己又补了一笔。"
      },
      choices: [
        {
          label: "拓下旧令",
          hint: "神志 -5，获得巫文线索",
          effect: { axle: 0, grain: 0, sanity: -5, flag: "old_order" },
          result: "墨拓未干，字却像从纸背往外生。"
        },
        {
          label: "拆门木修车",
          hint: "车轴 +12，神志 -3",
          effect: { axle: 12, grain: 0, sanity: -3 },
          result: "门木很硬，也很冷。车轴修好了，旧令少了一角。"
        }
      ]
    },
    ground_thunder: {
      title: "泽鼓回雷",
      tag: "泽地",
      texts: {
        clear: "浅泥像鼓面，车轮每压一寸，远雷便从泥下回一声。",
        uneasy: "雷没有从天上来。泥水替车队数步，数到空拍时，浅路才肯露出来。",
        mad: "天在脚下。雷在脚下。车轮压着一面大鼓，鼓里有人替你们点名。"
      },
      choices: [
        {
          label: "铺芦过鼓面",
          hint: "车轴 -2，粮草 -4，神志 +2",
          effect: { axle: -2, grain: -4, sanity: 2 },
          result: "芦束一层层压住鼓面，雷声低下去，车轮慢慢挪过浅泥。"
        },
        {
          label: "听雷辨浅路",
          hint: "神志 -7，获得 heard_ground_thunder",
          effect: { axle: 0, grain: 0, sanity: -7, flag: "heard_ground_thunder" },
          result: "你听出雷声的空拍。那不是沉默，是一条水下浅路正在换气。"
        },
        {
          label: "采雷熟芦根",
          hint: "粮草 +9，神志 -3",
          effect: { axle: 0, grain: 9, sanity: -3 },
          result: "芦根被泥雷烤得半熟，能吃；咬开时，齿间响起一声很远的闷雷。"
        }
      ]
    },
    black_trade: {
      title: "黑齿交易",
      tag: "异族",
      texts: {
        clear: "日中棚影下多出一张小摊，摊主不开口，只让影子替他称粮。价码落在地上，比货物先动。",
        uneasy: "摊主没有影。影子在卖摊主，也在卖你们明日的脚步。",
        mad: "不是市。是口。摊位一张一合。影子在卖你们，黑齿只是站着，等地上的价把人咬住。"
      },
      choices: [
        {
          label: "以旧铁换粮",
          hint: "粮草 +15，车轴 -4",
          effect: { axle: -4, grain: 15, sanity: 0 },
          result: "市人收下旧铁，给的粮草没有霉味，只是颗粒都朝同一方向。"
        },
        {
          label: "换取白羽",
          hint: "粮草 -8，神志 -3，羽民语 +20",
          effect: { axle: 0, grain: -8, sanity: -3, language: { feather: 20 } },
          result: "白羽很轻，落在手上却像有人把一条路交给你。"
        },
        {
          label: "踩散价码",
          hint: "粮草 -2，神志 +4",
          effect: { axle: 0, grain: -2, sanity: 4, flag: "black_price" },
          result: "你把地上的影价踩散。摊主没有追，只把笑声收回牙后。"
        }
      ]
    },
    qingqiu_lamps: {
      title: "狐灯绕名",
      tag: "边邑",
      texts: {
        clear: "城门下挂着狐灯，市吏递来空册。册页不问来处，只问真名、假名，或不留名。",
        uneasy: "灯先替你写了一笔。册页翻到最后，空格里已经有一个会回头的名字。",
        mad: "灯不是挂在墙上，是挂在你们眼里。空册自己翻页，每眨一次，城里就少一个人。"
      },
      choices: [
        {
          label: "换狐灯静夜",
          hint: "神志 +7，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 7 },
          result: "狐灯挂上车头，夜路里的影子退远了一些。"
        },
        {
          label: "留假名入册",
          hint: "神志 -3，获得 false_name_pass",
          effect: { axle: 0, grain: 0, sanity: -3, flag: "false_name_pass" },
          result: "边邑路引写下了一个不是你的名字，纸面却很快干了。"
        },
        {
          label: "以粮换无名路引",
          hint: "粮草 -5，神志 +4",
          effect: { axle: 0, grain: -5, sanity: 4, flag: "false_name_pass" },
          result: "市吏收粮，不再问名。空册合上时，狐灯替队伍照出一段无名小路。"
        }
      ]
    },
    hollow_pass: {
      title: "同穴分粮",
      tag: "山隘",
      texts: {
        clear: "洞口落着碎粟和白羽，山腹里传来细碎搬粮声。",
        uneasy: "白羽没有风也在动。山腹一阵近一阵远，像有什么正替你们分粮。",
        mad: "洞里不是鸟鼠，是许多小路在磨牙。粮袋一响，山腹就多咬下一口。"
      },
      choices: [
        {
          label: "留粮换暗路",
          hint: "粮草 -5，神志 +3，获得 hollow_pass_hint",
          effect: { axle: 0, grain: -5, sanity: 3, flag: "hollow_pass_hint" },
          result: "碎粟被拖进小洞。片刻后，洞声向两侧退开，夹道露出一段能过车的暗路。"
        },
        {
          label: "拾洞口碎粟",
          hint: "粮草 +5，神志 -4",
          effect: { axle: 0, grain: 5, sanity: -4 },
          result: "碎粟补进粮袋，袋底却轻轻响了一夜，像山腹还在往外吐粮。"
        },
        {
          label: "堵洞快行",
          hint: "车轴 +3，神志 -5",
          effect: { axle: 3, grain: 0, sanity: -5 },
          result: "石块堵住洞口，轮轴少受山壁剐蹭；夜里，那些细声全转到车底。"
        }
      ]
    },
    nameless_prayer: {
      title: "无匾新灰",
      tag: "祭所",
      texts: {
        clear: "香灰被风吹开，祠后露出一截新踩出的短路。供桌空着，像等一口粮，也等一个称呼。",
        uneasy: "不是灰开了路，是路从灰里醒了。空供位转向你们，像认得队伍里少的那个人。",
        mad: "祠在路旁，也在路中。路从灰里醒来，你们每走一步，它就近一点。"
      },
      choices: [
        {
          label: "献粟问路",
          hint: "粮草 -4，神志 +5",
          effect: { axle: 0, grain: -4, sanity: 5 },
          result: "粟粒落进香灰，灰面显出半截可走的弯路。"
        },
        {
          label: "记下供位空名",
          hint: "神志 -2，获得 nameless_seat",
          effect: { axle: 0, grain: 0, sanity: -2, flag: "nameless_seat" },
          result: "空位没有名字，却在你记下时轻轻让开了一点路。"
        },
        {
          label: "不拜直过",
          hint: "车轴 -3，神志 +2",
          effect: { axle: -3, grain: 0, sanity: 2 },
          result: "车队没有停拜，轮子压过祠后硬坎。灰没有追来，只在风里合上。"
        }
      ]
    },
    sunken_feather: {
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
    },
    feather_ford_debt: {
      title: "羽民记名",
      tag: "渡口",
      texts: {
        clear: "渡口没有桥，羽民说轻物可以先过，重物要留下一个名字。",
        uneasy: "白羽压在水面上，像一张张没写完的账。",
        mad: "羽不是桥，是许多未说出口的名字。踏上一枚，就少记得一件事。"
      },
      choices: [
        {
          label: "以粮换羽舟",
          hint: "车轴 +4，粮草 -7",
          effect: { axle: 4, grain: -7, sanity: 0 },
          result: "羽舟轻得像影子，带车队过了最伤车的一段浅水。"
        },
        {
          label: "留下旧名过渡",
          hint: "神志 -5，获得 feather_debt",
          effect: { axle: 0, grain: 0, sanity: -5, flag: "feather_debt" },
          result: "旧名被记入羽民账，渡水时车轮几乎没有陷下去。"
        }
      ]
    },
    dream_map_gate: {
      title: "梦图小门",
      tag: "前哨",
      texts: {
        clear: "夜里地图自己卷起，卷口像一扇小门。醒来后门还在纸上。",
        uneasy: "没人能证明昨夜开过门，但每个人都记得门后的风。",
        mad: "地图睡着了。你们醒在它的梦里，驿门开在纸背。"
      },
      choices: [
        {
          label: "整束梦图",
          hint: "神志 +7，粮草 -4",
          effect: { axle: 0, grain: -4, sanity: 7 },
          result: "残图被绳重新束住，队伍短暂确认了裂隙前的方位。"
        },
        {
          label: "按梦门标记前哨",
          hint: "神志 -6，获得 dream_gate_mark",
          effect: { axle: 0, grain: 0, sanity: -6, flag: "dream_gate_mark" },
          result: "地图多出一枚裂隙前记号，像昨夜的门终于承认自己开过。"
        }
      ]
    },
    red_bones: {
      title: "赤水岸骨",
      tag: "禁忌",
      texts: {
        clear: "赤水无波，岸边旧骨排列如路标。随从建议日落前离开。",
        uneasy: "旧骨像被人重新摆过，草尖一齐朝向队伍。水声从车底传来。",
        mad: "水没有来。骨先来了。草在数人，数到你时停住。有人说夜里才浅。"
      },
      choices: [
        {
          label: "掩骨祭拜",
          hint: "粮草 -6，神志 +6",
          effect: { axle: 0, grain: -6, sanity: 6 },
          result: "你们掩埋了最靠近水的一排骨。夜色慢了半拍。"
        },
        {
          label: "沿骨行路",
          hint: "车轴 -4，神志 -10，解锁裂隙方向",
          effect: { axle: -4, grain: 0, sanity: -10, flag: "followed_bones" },
          result: "骨路确实通向前方，只是每一截都像刚从水里捞出来。"
        },
        {
          label: "凝视赤水辨路",
          hint: "禁忌试演 / 神志 -28，解锁裂隙方向",
          conditions: [{ sanityMax: 70 }],
          effect: { axle: 0, grain: 0, sanity: -28, flag: "followed_bones" },
          result: "你盯住水底那条并不存在的路，直到所有字都从眼前散开。"
        },
        {
          label: "夜里下水",
          hint: "神志低时可见 / 车轴 -2，神志 -12，直接认出幻路",
          conditions: [{ sanityMax: 34 }],
          effect: { axle: -2, grain: 0, sanity: -12, flag: "followed_bones" },
          result: "水并不深，至少在你眼中不深。随从说你走在岸上，你却听见车轮在水下。"
        }
      ]
    },
    read_name: {
      title: "断碑读名",
      tag: "巫文",
      texts: {
        clear: "断碑半埋，碑面只有残笔。你能辨出方位，却无法辨出它祭给谁。",
        uneasy: "碑上的空缺总在等你补全。你越看，越觉得缺的那一笔是自己的姓。",
        mad: "碑不是缺字。碑在等你把名字还给它。你读一笔，少一日。"
      },
      choices: [
        {
          label: "拓碑带走",
          hint: "神志 -7，巫咸古辞 +20",
          effect: { axle: 0, grain: 0, sanity: -7, language: { wuxian: 20 } },
          result: "拓片卷起时，碑上的一处残画像车队，又像裂口。"
        },
        {
          label: "毁去碑面",
          hint: "车轴 -3，神志 +5",
          effect: { axle: -3, grain: 0, sanity: 5 },
          result: "石屑落地，队伍安静了些。可有随从说他还记得碑上的字。"
        },
        {
          label: "让碑补全你的名字",
          hint: "低神志选项 / 神志 -12，解锁裂隙名",
          conditions: [{ sanityMax: 34 }],
          effect: { axle: 0, grain: 0, sanity: -12, flag: "rift_name" },
          result: "碑文终于完整。完整的不是字，是一条通往地图裂口的称呼。"
        }
      ]
    },
    rift_dream: {
      title: "裂隙前梦",
      tag: "边界",
      texts: {
        clear: "前方地平线像被刀背压低。夜里众人梦见同一张地图，地图边缘没有画完。",
        uneasy: "地图在梦中自己折起，折痕正压在你们所在的位置。醒来后，车辙也按折痕转弯。",
        mad: "地图睡着了。你们醒在它的梦里。前方不是下一站，是纸破的声音。"
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
          hint: "粮草 -8，进入归返结局",
          effect: { axle: 0, grain: -8, sanity: 3, ending: "return" },
          result: "灰烬飞起时，你们终于看见来路仍在人间。"
        }
      ]
    }
  },
  crisisEvents: {
    axle: {
      title: "断轴边缘",
      tag: "濒死补救",
      texts: {
        clear: "车轴终于撑不住了。随从把绳、钉、门木和旧辐条堆在一起，等你决定还要不要继续走。",
        uneasy: "车轮歪着转了一圈，像在原地画符。你们还有一点办法，只是不再体面。",
        mad: "车没有坏。路坏了。轴心里有人敲门，说把重物留下，路就肯放你们过去。"
      },
      choices: [
        {
          label: "拆旧车具补轴",
          hint: "车轴 +22，粮草 -6，坏运 +4",
          effect: { axle: 22, grain: -6, sanity: 0, badLuck: 4 },
          result: "旧车具被拆成一把把临时楔子，车轮重新咬住路面。"
        },
        {
          label: "弃重慢行",
          hint: "车轴 +12，神志 -5，坏运 -3",
          effect: { axle: 12, grain: 0, sanity: -5, badLuck: -3, flag: "abandoned_load" },
          result: "你们把最沉的箱子留在路边，队伍轻了，心也空了一块。"
        }
      ]
    },
    grain: {
      title: "粮袋见底",
      tag: "濒死补救",
      texts: {
        clear: "最后一袋粟被倒在布上，少得不像一支队伍的明日。",
        uneasy: "粮袋轻得像装着风。有人说昨夜听见袋底有牙齿磨动。",
        mad: "粮草没有尽。尽的是数粮的人。你数到最后一粒，它抬头看了你一眼。"
      },
      choices: [
        {
          label: "宰牲分粮",
          hint: "粮草 +24，车轴 -4，坏运 +3",
          effect: { axle: -4, grain: 24, sanity: 0, badLuck: 3 },
          result: "役畜少了一匹，粮锅里终于有了热气。"
        },
        {
          label: "向梦里求粮",
          hint: "粮草 +14，神志 -9，坏运 -2",
          effect: { axle: 0, grain: 14, sanity: -9, badLuck: -2, flag: "dream_grain" },
          result: "醒来时袋中多出半袋黑粟，没人敢问它从哪里来。"
        }
      ]
    },
    sanity: {
      title: "神志崩线",
      tag: "濒死补救",
      texts: {
        clear: "记路人忽然忘了自己手里的笔。队伍仍在前进，但每个人说的方向都不同。",
        uneasy: "你们开始把影子当成路标。幸好还有人记得中原话该怎么写。",
        mad: "字散了。路散了。只有车轮声还在替你们证明队伍没有完全碎开。"
      },
      choices: [
        {
          label: "让巫祝代记",
          hint: "神志 +22，粮草 -5，坏运 +4",
          effect: { axle: 0, grain: -5, sanity: 22, badLuck: 4 },
          result: "巫祝把众人的名字按次序念了一遍，路终于又有了前后。"
        },
        {
          label: "接受幻路",
          hint: "神志 +10，获得幻路标记，坏运 -4",
          effect: { axle: 0, grain: 0, sanity: 10, badLuck: -4, flag: "accepted_mirage" },
          result: "你不再反驳那些不存在的路。奇怪的是，车队因此没有停下。"
        }
      ]
    }
  },
  endingDefinitions: {
    rift: "入裂隙：队伍抵达地图没有画完的地方。",
    return: "归中原：队伍带着残图折返。"
  },
  poetryContent: {
    sourceName: "诗泉",
    sourceUrl: "https://poetry.palemoky.com/",
    apiBaseUrl: "https://poetry.palemoky.com",
    randomPath: "/api/poems/random",
    lang: "zh-Hans",
    timeoutMs: 5200,
    terrainProfiles: {
      road: { dynasty: "唐", type: "五言律诗" },
      market: { dynasty: "唐", type: "乐府诗" },
      water: { dynasty: "宋", type: "宋词" },
      rift: { dynasty: "先秦", type: "楚辞" }
    },
    locationProfiles: {
      central_post: { dynasty: "唐", type: "五言律诗" },
      qingqiu_outer_city: { dynasty: "宋", type: "宋词" },
      feather_folk_ford: { type: "楚辞" },
      broken_stele: { type: "楚辞" },
      kyushu_rift: { type: "楚辞" }
    },
    sceneVerses: {
      locations: {
        central_post: {
          line: "征蓬出汉塞，归雁入胡天。",
          title: "使至塞上",
          author: "王维",
          fit: "中原驿是人间秩序的最后一站，诗句先把车队推出边塞。"
        },
        old_king_road: {
          line: "古道西风瘦马，夕阳西下，断肠人在天涯。",
          title: "天净沙·秋思",
          author: "马致远",
          fit: "故王道的核心不是风景，而是旧路、远行和离开人间的天涯感。"
        },
        qingqiu_outer_city: {
          line: "月出皎兮，佼人僚兮。",
          title: "诗经·陈风·月出",
          author: "佚名",
          fit: "青丘外城以月色、狐灯和姓名诱惑为主。"
        },
        abandoned_pass: {
          line: "秦时明月汉时关，万里长征人未还。",
          title: "出塞",
          author: "王昌龄",
          fit: "废关旧令与边塞不可归的气息相合。"
        },
        bird_mouse_pass: {
          line: "空山不见人，但闻人语响。",
          title: "鹿柴",
          author: "王维",
          fit: "鸟鼠同穴的山口有声无人，适合幽深窄关。"
        },
        nameless_shrine: {
          line: "若有人兮山之阿，被薜荔兮带女萝。",
          title: "九歌·山鬼",
          author: "屈原",
          fit: "无名祠由山鬼、藤萝和祭辞支撑。"
        },
        thunder_marsh: {
          line: "雷填填兮雨冥冥。",
          title: "九歌·山鬼",
          author: "屈原",
          fit: "雷泽不靠晴空天雷，而是楚辞式山泽雷雨从地下压上来。"
        },
        white_feather_mire: {
          line: "鸿雁于飞，肃肃其羽。",
          title: "诗经·小雅·鸿雁",
          author: "佚名",
          fit: "白羽泥沼的羽、迁徙和失落感都落在这一句里。"
        },
        feather_folk_ford: {
          line: "谁谓河广，一苇杭之。",
          title: "诗经·卫风·河广",
          author: "佚名",
          fit: "羽民渡口讲过河与借路，轻舟一苇正好。"
        },
        black_teeth_market: {
          line: "氓之蚩蚩，抱布贸丝。",
          title: "诗经·卫风·氓",
          author: "佚名",
          fit: "黑齿市先是以物易物的边市，笑意和交易背后才藏着代价。"
        },
        dream_map_post: {
          line: "庄生晓梦迷蝴蝶，望帝春心托杜鹃。",
          title: "锦瑟",
          author: "李商隐",
          fit: "梦图驿把地图、梦和真假路径搅在一起。"
        },
        red_marsh: {
          line: "可怜无定河边骨，犹是春闺梦里人。",
          title: "陇西行",
          author: "陈陶",
          fit: "赤水外滩有骨、归梦和战后残响。"
        },
        broken_stele: {
          line: "前不见古人，后不见来者。",
          title: "登幽州台歌",
          author: "陈子昂",
          fit: "断碑读名时，过去与后来都断在碑前。"
        },
        kyushu_rift: {
          line: "路漫漫其修远兮，吾将上下而求索。",
          title: "离骚",
          author: "屈原",
          fit: "裂隙是地图尽头，也是继续求索的门。"
        }
      },
      routes: {},
      events: {
        post_gate: {
          line: "劝君更尽一杯酒，西出阳关无故人。",
          title: "送元二使安西",
          author: "王维",
          fit: "出发前的送别和无人归路。"
        },
        split_tracks: {
          line: "行到水穷处，坐看云起时。",
          title: "终南别业",
          author: "王维",
          fit: "车辙分叉不是乐观转机，而是无路处暂辨云气和方向。"
        },
        closed_order: {
          line: "黄河远上白云间，一片孤城万仞山。",
          title: "凉州词",
          author: "王之涣",
          fit: "废关旧令要有孤城边塞的压迫。"
        },
        ground_thunder: {
          line: "夜阑卧听风吹雨，铁马冰河入梦来。",
          title: "十一月四日风雨大作",
          author: "陆游",
          fit: "泽鼓回雷，让车马与风雨都像从泥下梦里滚来。"
        },
        black_trade: {
          line: "半匹红绡一丈绫，系向牛头充炭直。",
          title: "卖炭翁",
          author: "白居易",
          fit: "黑齿交易强调不对等的价格和被迫交换。"
        },
        qingqiu_lamps: {
          line: "众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。",
          title: "青玉案·元夕",
          author: "辛弃疾",
          fit: "狐灯绕名，以灯火和回首制造诱惑。"
        },
        hollow_pass: {
          line: "空山不见人，但闻人语响。",
          title: "鹿柴",
          author: "王维",
          fit: "同穴分粮里看不见鸟鼠，只听得山腹替旅人分路。"
        },
        nameless_prayer: {
          line: "不知何处吹芦管，一夜征人尽望乡。",
          title: "夜上受降城闻笛",
          author: "李益",
          fit: "无名祠让旅人短暂望乡。"
        },
        sunken_feather: {
          line: "鸿雁于飞，肃肃其羽。",
          title: "诗经·小雅·鸿雁",
          author: "佚名",
          fit: "羽沉泥下，仍保留飞鸟的方向。"
        },
        feather_ford_debt: {
          line: "谁谓河广，一苇杭之。",
          title: "诗经·卫风·河广",
          author: "佚名",
          fit: "渡债是过河的代价。"
        },
        dream_map_gate: {
          line: "庄生晓梦迷蝴蝶，望帝春心托杜鹃。",
          title: "锦瑟",
          author: "李商隐",
          fit: "梦图入口需要梦与醒的错位。"
        },
        red_bones: {
          line: "可怜无定河边骨，犹是春闺梦里人。",
          title: "陇西行",
          author: "陈陶",
          fit: "赤水露骨时，人的姓名仍留在梦里。"
        },
        read_name: {
          line: "念天地之悠悠，独怆然而涕下。",
          title: "登幽州台歌",
          author: "陈子昂",
          fit: "读断碑姓名时，孤独感比信息更先到。"
        },
        rift_dream: {
          line: "魂兮归来，君无上天些。",
          title: "招魂",
          author: "屈原",
          fit: "裂隙前梦不是怀古，而是在边界处召回快要离身的神志。"
        }
      },
      routeEvents: {
        wheel_omen: {
          line: "车辚辚，马萧萧，行人弓箭各在腰。",
          title: "兵车行",
          author: "杜甫",
          fit: "轮声异兆要先听见车马压路。"
        },
        roadside_shrine: {
          line: "神之格思，不可度思。",
          title: "诗经·大雅·抑",
          author: "佚名",
          fit: "路旁无名祠不应像寺院游赏，而是不可度量的旧神路标。"
        },
        black_cloud: {
          line: "黑云压城城欲摧，甲光向日金鳞开。",
          title: "雁门太守行",
          author: "李贺",
          fit: "黑云压境带来危险预兆。"
        },
        wenao_fish_rain: {
          line: "鸿雁长飞光不度，鱼龙潜跃水成文。",
          title: "春江花月夜",
          author: "张若虚",
          fit: "文鳐雨不是寻常鱼味，而是鱼龙、鳞光和车辙文字一起显形。"
        },
        dang_kang_field_cry: {
          line: "田家少闲月，五月人倍忙。",
          title: "观刈麦",
          author: "白居易",
          fit: "当康田鸣落在农事与粮草。"
        },
        xuan_gui_shell_bridge: {
          line: "水何澹澹，山岛竦峙。",
          title: "观沧海",
          author: "曹操",
          fit: "玄龟壳桥需要水面与巨物并现。"
        },
        zhu_bird_name_call: {
          line: "月出惊山鸟，时鸣春涧中。",
          title: "鸟鸣涧",
          author: "王维",
          fit: "朱鸟唤名从山鸟惊鸣里生出。"
        },
        fox_lamp_tail: {
          line: "东风夜放花千树，更吹落、星如雨。",
          title: "青玉案·元夕",
          author: "辛弃疾",
          fit: "狐尾灯适合灯火如星坠落的夜路。"
        },
        black_teeth_scale_price: {
          line: "半匹红绡一丈绫，系向牛头充炭直。",
          title: "卖炭翁",
          author: "白居易",
          fit: "黑齿秤价强调价格不公。"
        },
        ming_snake_crosswind: {
          line: "腾蛇乘雾，终为土灰。",
          title: "龟虽寿",
          author: "曹操",
          fit: "鸣蛇横风要有蛇、雾和凶兆，不只是水边天气。"
        },
        bone_ox_rut: {
          line: "白骨露于野，千里无鸡鸣。",
          title: "蒿里行",
          author: "曹操",
          fit: "骨牛空辙要把荒野、白骨和无人声先压出来。"
        },
        mirror_reed_bed: {
          line: "蒹葭苍苍，白露为霜。",
          title: "诗经·秦风·蒹葭",
          author: "佚名",
          fit: "镜芦荡先要有成片芦苇和白露。"
        },
        dream_cicada_shell: {
          line: "蝉噪林逾静，鸟鸣山更幽。",
          title: "入若耶溪",
          author: "王籍",
          fit: "梦蝉蜕壳在噪与静之间制造失真。"
        },
        rnd_loose_axle_song: {
          line: "腾蛇乘雾，终为土灰。",
          title: "龟虽寿",
          author: "曹操",
          fit: "鸣蛇入轴以蛇声和雾路提示车轴异常。"
        },
        rnd_bitter_grass_soup: {
          line: "采采卷耳，不盈顷筐。",
          title: "诗经·周南·卷耳",
          author: "佚名",
          fit: "祝余苦汤要从采草补饥开始，而不是现代补给包。"
        },
        rnd_wrong_milestone: {
          line: "行道迟迟，载渴载饥。",
          title: "诗经·小雅·采薇",
          author: "佚名",
          fit: "巫咸反里把行路迟滞和反向里程压在一起。"
        },
        rnd_silent_barter: {
          line: "日中为市，致天下之民。",
          title: "周易·系辞下",
          author: "佚名",
          fit: "黑齿影价是异国日中交易，不靠对白解释规则。"
        },
        rnd_repeated_footprints: {
          line: "道阻且长，溯游从之。",
          title: "诗经·秦风·蒹葭",
          author: "佚名",
          fit: "夸父复迹强调长路、回环和追逐过的痕迹。"
        },
        rnd_count_names_rest: {
          line: "魂兮归来，反故居些。",
          title: "楚辞·招魂",
          author: "屈原",
          fit: "巫咸点名是把散掉的魂和队伍名册重新收束。"
        },
        rnd_low_black_cloud_gap: {
          line: "黑云压城城欲摧，甲光向日金鳞开。",
          title: "雁门太守行",
          author: "李贺",
          fit: "雷泽云缝要有压低的云、迫近的危险和一线可行。"
        },
        rnd_breathing_map: {
          line: "日月安属？列星安陈？",
          title: "楚辞·天问",
          author: "屈原",
          fit: "烛龙息图让日月和山川秩序在纸面上呼吸。"
        }
      },
      crisisEvents: {
        axle: {
          line: "行路难，行路难，多歧路，今安在。",
          title: "行路难",
          author: "李白",
          fit: "断轴时路多而车不能行。"
        },
        grain: {
          line: "谁知盘中餐，粒粒皆辛苦。",
          title: "悯农",
          author: "李绅",
          fit: "饥荒补救必须先落到粮食本身。"
        },
        sanity: {
          line: "梦里不知身是客，一晌贪欢。",
          title: "浪淘沙令",
          author: "李煜",
          fit: "失神时人分不清身在梦内还是路上。"
        }
      },
      endings: {
        rift: {
          line: "遂古之初，谁传道之？",
          title: "天问",
          author: "屈原",
          fit: "入裂隙不是远别，而是抵达世界无法回答的开端问题。"
        },
        return: {
          line: "羁鸟恋旧林，池鱼思故渊。",
          title: "归园田居",
          author: "陶渊明",
          fit: "归中原是残队回到旧世界，但已经带着荒外污染。"
        },
        stranded: {
          line: "溯洄从之，道阻且长。",
          title: "诗经·秦风·蒹葭",
          author: "佚名",
          fit: "旅途断绝不是黄昏感伤，而是路明明在前却再也走不到。"
        }
      }
    },
    fallbackPoems: {
      road: [
        {
          title: "关中言怀",
          author: "黄滔",
          dynasty: "唐",
          type: "五言律诗",
          lines: ["三秦五岭意，不得不依然。", "迹寓枯槐曲，业芜芳草川。"],
          note: "诗泉 API 缓存样本，适合旧道、枯槐、荒草路段。"
        },
        {
          title: "使至塞上",
          author: "王维",
          dynasty: "唐",
          type: "五言律诗",
          lines: ["大漠孤烟直", "长河落日圆"],
          note: "可作为旧道、驿路、车队远行的氛围底色。"
        },
        {
          title: "终南别业",
          author: "王维",
          dynasty: "唐",
          type: "五言律诗",
          lines: ["行到水穷处", "坐看云起时"],
          note: "适合路线显影或无路处暂歇。"
        }
      ],
      market: [
        {
          title: "鼓吹曲辞 雉子班",
          author: "李白",
          dynasty: "唐",
          type: "乐府诗",
          lines: ["辟邪伎作鼓吹惊，雉子班之奏曲成。", "所贵旷士怀，朗然合太清。"],
          note: "诗泉 API 缓存样本，可转为辟邪铃、市口鼓吹或异族仪式。"
        },
        {
          title: "客中作",
          author: "李白",
          dynasty: "唐",
          type: "七言绝句",
          lines: ["兰陵美酒郁金香", "玉碗盛来琥珀光"],
          note: "可转为边市交易、异乡停驻的文案钩子。"
        },
        {
          title: "问刘十九",
          author: "白居易",
          dynasty: "唐",
          type: "五言绝句",
          lines: ["绿蚁新醅酒", "红泥小火炉"],
          note: "可为危险市口保留一点人间暖意。"
        }
      ],
      water: [
        {
          title: "贺新郎",
          author: "葛长庚",
          dynasty: "宋",
          type: "宋词",
          lines: ["目断水苍山翠。", "更送客、长亭分袂。"],
          note: "诗泉 API 缓存样本，适合水泽送别、长亭渡口与远山压境。"
        },
        {
          title: "春江花月夜",
          author: "张若虚",
          dynasty: "唐",
          type: "乐府诗",
          lines: ["春江潮水连海平", "海上明月共潮生"],
          note: "适合雷泽、赤水、羽民渡的水面异象。"
        },
        {
          title: "次北固山下",
          author: "王湾",
          dynasty: "唐",
          type: "五言律诗",
          lines: ["潮平两岸阔", "风正一帆悬"],
          note: "可转为渡口、浅水、短暂顺风的提示。"
        }
      ],
      rift: [
        {
          title: "礼魂",
          author: "屈原",
          dynasty: "先秦",
          type: "楚辞",
          lines: ["成礼兮会鼓，", "传芭兮代舞"],
          note: "诗泉 API 缓存样本，适合裂隙前仪式、巫文和祭所。"
        },
        {
          title: "离骚",
          author: "屈原",
          dynasty: "先秦",
          type: "楚辞",
          lines: ["路漫漫其修远兮", "吾将上下而求索"],
          note: "适合作为裂隙前的方向感与执念。"
        },
        {
          title: "观沧海",
          author: "曹操",
          dynasty: "两汉",
          type: "四言古诗",
          lines: ["日月之行，若出其中", "星汉灿烂，若出其里"],
          note: "可用于梦图、星象、纸面边界变大的时刻。"
        }
      ]
    }
  }
};

const BSI_CORE_AUDIO = {
  audioAssets: {
    musicLoop: {
      id: "MUS-CORE-001",
      name: "九州古道 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-001_jiuzhou_ancient_road_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.16,
      status: "review-pending"
    },
    musicWater: {
      id: "MUS-CORE-003",
      name: "水泽夜行 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-003_marsh_night_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.14,
      status: "review-pending"
    },
    musicMountain: {
      id: "MUS-CORE-002",
      name: "山岭云行 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-002_mountain_clouds_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.14,
      status: "review-pending"
    },
    musicBorder: {
      id: "MUS-CORE-004",
      name: "废墟边境 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-004_ruins_border_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.14,
      status: "review-pending"
    },
    musicJourney: {
      id: "MUS-CORE-005",
      name: "神秘九州行 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-005_instrumental_mystic_journey_guzheng_pipa_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.15,
      status: "review-pending"
    },
    musicDawn: {
      id: "MUS-CORE-006",
      name: "春晓清行 WebDemo 低响度预览",
      src: "../../06_音乐音效/04_待复核素材/WebDemo低响度预览/MUS-CORE-006_spring_dawn_instrumental_webdemo_-24lufs.mp3",
      type: "music",
      loop: true,
      volume: 0.13,
      status: "review-pending"
    },
    sanityLight: {
      id: "SAN-001-SYN",
      name: "轻度污染程序占位循环",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/SAN-001_light_sanity_layer_synth_placeholder_loop.mp3",
      type: "sanity",
      loop: true,
      volume: 0.08,
      status: "demo-temporary"
    },
    sanityLow: {
      id: "SAN-002-SYN",
      name: "重度污染低频程序占位循环",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/SAN-002_heavy_sanity_layer_synth_placeholder_loop.mp3",
      type: "sanity-low",
      loop: true,
      volume: 0.13,
      status: "demo-temporary"
    },
    travelAmbience: {
      id: "AMB-TRAVEL-001-SYN",
      name: "荒外风与车架空气层程序占位循环",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/AMB-TRAVEL-001_travel_air_wood_frame_placeholder_loop.mp3",
      type: "ambience",
      loop: true,
      volume: 0.045,
      status: "demo-temporary"
    },
    select: {
      id: "UI-001-SYN",
      name: "选择确认程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3",
      type: "ui",
      loop: false,
      volume: 0.28,
      status: "demo-temporary"
    },
    routeSelect: {
      id: "ROUTE-CONFIRM-001",
      name: "路引签确认占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3",
      type: "ui",
      loop: false,
      volume: 0.26,
      status: "demo-temporary"
    },
    resourceDown: {
      id: "UI-003-SYN",
      name: "资源减少程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-003_resource_decrease_synth_placeholder.mp3",
      type: "ui",
      loop: false,
      volume: 0.28,
      status: "demo-temporary"
    },
    resourceUp: {
      id: "UI-004-SYN",
      name: "补给获得程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3",
      type: "ui",
      loop: false,
      volume: 0.28,
      status: "demo-temporary"
    },
    supplyComplete: {
      id: "SUPPLY-GAIN-001",
      name: "补给完成占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3",
      type: "ui",
      loop: false,
      volume: 0.26,
      status: "demo-temporary"
    },
    warnAxle: {
      id: "WARN-001-SYN",
      name: "车轴危急程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-001_axle_crisis_synth_placeholder.mp3",
      type: "warning",
      loop: false,
      volume: 0.36,
      status: "demo-temporary"
    },
    warnGrain: {
      id: "WARN-002-SYN",
      name: "粮草危急程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-002_food_crisis_synth_placeholder.mp3",
      type: "warning",
      loop: false,
      volume: 0.34,
      status: "demo-temporary"
    },
    warnSanity: {
      id: "WARN-003-SYN",
      name: "神志危急程序占位",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3",
      type: "warning",
      loop: false,
      volume: 0.34,
      status: "demo-temporary"
    },
    mapOpen: {
      id: "MAP-OPEN-001",
      name: "地图打开临时确认音",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-001_select_confirm_synth_placeholder.mp3",
      type: "map-sfx",
      loop: false,
      volume: 0.2,
      status: "demo-temporary"
    },
    mapReveal: {
      id: "MAP-FOG-001",
      name: "临时异象显影音效",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/WARN-003_sanity_crisis_synth_placeholder.mp3",
      type: "map-sfx",
      loop: false,
      volume: 0.16,
      status: "demo-temporary"
    },
    locationArrive: {
      id: "CITY-ARRIVE-001",
      name: "地点抵达临时落点音",
      src: "../../06_音乐音效/04_待复核素材/程序生成占位音效/UI-004_supply_gain_synth_placeholder.mp3",
      type: "map-sfx",
      loop: false,
      volume: 0.2,
      status: "demo-temporary"
    }
  },
  audioHooks: {
    mapOpen: "mapOpen",
    mapReveal: "mapReveal",
    locationArrive: "locationArrive",
    routeSelect: "routeSelect",
    supplyComplete: "supplyComplete"
  }
};

BSI_P0_CONTENT_PACK.musicProfileByTerrain = {
    default: "musicLoop",
    road: "musicLoop",
    market: "musicBorder",
    water: "musicWater",
    rift: "musicBorder"
};

BSI_P0_CONTENT_PACK.musicProfileByLocation = {
    old_king_road: "musicJourney",
    bird_mouse_pass: "musicMountain",
    nameless_shrine: "musicJourney",
    qingqiu_outer_city: "musicDawn",
    black_teeth_market: "musicDawn",
    feather_folk_ford: "musicDawn"
};

BSI_P0_CONTENT_PACK.initialStateTemplate = {
    day: 1,
    currentLocation: "central_post",
    resources: { axle: 80, grain: 90, sanity: 85 },
    items: ["辟邪铃", "旧车具"],
    languages: { feather: 0, wuxian: 0 },
    flags: [],
    eventResults: {},
    routeEventResults: {},
    pendingRoute: null,
    discoveredLocations: ["central_post"],
    traveledRoutes: [],
    revealedRoutes: [],
    hintedLocations: [],
    hintedRoutes: [],
    routePoolSelections: {},
    lastReveal: null,
    usedSupplies: {},
    arrivalSupplyUsed: false,
    status: "playing",
    ending: "",
    crisisType: "",
    failureType: "",
    badLuckMeter: 0,
    failureStats: {
      axleCrises: 0,
      grainCrises: 0,
      sanityCrises: 0,
      routeLocks: 0,
      rescues: 0,
      hardFailures: 0
    },
    log: ["第 1 日：车队自中原驿整装，西路未明。"]
  };

window.BSI_CONTENT_PACKS = {
  ...(window.BSI_CONTENT_PACKS || {}),
  [BSI_P0_CONTENT_PACK.id]: BSI_P0_CONTENT_PACK
};
window.BSI_GAME_DATA = { ...BSI_CORE_DATA, ...BSI_CORE_AUDIO, ...BSI_P0_CONTENT_PACK };
