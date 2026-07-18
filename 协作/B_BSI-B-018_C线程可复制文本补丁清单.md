# B_BSI-B-018 C线程可复制文本补丁清单

## locations 文本补丁

```js
const locationTextPatch = {
  central_post: {
    detail: "驿灯还亮，旧王朝的里程牌只剩向西的空数。粮袋在檐下重新扎紧，车轴也能借几枚驿钉稳住。过了这里，官路只剩传说。",
    arrivalText: "驿灯还亮，你们在最后一段官路前停下。",
    supplyDiscoveryText: "驿仓角落还剩一袋干粟，铜钉压在粮袋底。"
  },
  old_king_road: {
    detail: "王道石基半埋在尘里，深车辙还把车往西牵。白日路直，入暮后会多出一条不在图上的辙。有人说那是前队留下的错路。",
    arrivalText: "深车辙把车往西牵，像旧路还认得队伍。",
    supplyDiscoveryText: "半埋王道石可垫轮，石缝里还夹着旧贡绳。"
  },
  abandoned_pass: {
    detail: "关门塌了一半，旧令仍钉在木上。铜钉和断梁能救车，字缝却像还在拦人。越过此处，就算离开人间边界。",
    arrivalText: "塌关横在前方，旧令仍不肯闭眼。",
    supplyDiscoveryText: "断梁里能拆出好木，钉头带着冷锈。"
  },
  bird_mouse_pass: {
    detail: "两山夹出一线窄路，洞眼密得像针。白日无声，入夜后满山都在搬粮和碎骨。车过此地，轮声会被山腹学走。",
    arrivalText: "山腹细洞贴着车声，夹道只容一车过。",
    supplyDiscoveryText: "洞口落着碎粟和旧绳，像谁刚交过路税。"
  },
  thunder_marsh: {
    detail: "雷泽水浅，雷声却从泥下滚过。芦根能吃，白羽能引路，断绳提醒车队别在水声里久停。低头看久了，水面会慢半拍。",
    arrivalText: "泥下滚过低雷，水面把车队照得很慢。",
    supplyDiscoveryText: "芦根被雷火烤熟一截，白羽下压着可走的浅泥。"
  },
  black_teeth_market: {
    detail: "黑齿市只在日中立起棚影，摊位无声围成市口。旧铁、黑粟、白羽都能换路，但摊主先看影子，不先看人。价钱常在明日才少。",
    arrivalText: "日中棚影立起，市声却没有一口人声。",
    supplyDiscoveryText: "旧铁能换黑粟，白羽能换一句不说出口的路价。"
  },
  red_marsh: {
    detail: "赤水不急不响，红得像一直在记账。岸骨白日是残骸，夜里会排成浅路。车队若沿骨前行，就要少相信一点自己。",
    arrivalText: "赤水不响，岸骨却排出一段浅路。",
    supplyDiscoveryText: "骨边结着盐霜，可保粮，也会让手心发红。"
  },
  broken_stele: {
    detail: "断碑半埋黑土，残笔像方位，也像人名。拓下它能稳住西路，看久了却觉得缺的那一笔落在自己身上。碑后风声很低，像有人点名。",
    arrivalText: "断碑露出残笔，像方位，也像人名。",
    supplyDiscoveryText: "碑下压着旧炭和拓纸，纸背还留着半截路名。"
  }
};
```

## routeEvents 文本补丁

```js
const routeEventTextPatch = {
  wheel_omen: {
    texts: {
      clear: "前轮忽然空响，路面却没有石子。轴心像被人从里面轻敲了一下。",
      uneasy: "空响从队尾追上来。轴心里有一小段路醒着。"
    }
  },
  roadside_shrine: {
    texts: {
      clear: "路旁小祠无匾，香灰却新。祠后短路旁留着几道怪脚印。",
      uneasy: "小祠每走一步都近一点。空供位上像写着车队的影子。"
    }
  },
  black_cloud: {
    texts: {
      clear: "黑云贴着地面滚来，像低飞的影。车队得卸重等它，或抢在云前穿过。",
      uneasy: "云在地上，天在车轮旁。黑色的口等你们驶进去。"
    }
  },
  wenao_fish_rain: {
    texts: {
      clear: "薄云里游过文鳐，鳞光落在车辙旁。粮袋闻到水腥味。",
      uneasy: "天上先响起水声。文鳐从眼里游过，吐出旧粮。"
    }
  },
  dang_kang_field_cry: {
    texts: {
      clear: "荒垄里有白牙兽低啼，土下翻出新谷味。跟着啼声走，粮会多些，车会陷些。",
      uneasy: "那声啼叫像从粮袋里传来。旧田鼓起，等车轮压下去。"
    }
  },
  xuan_gui_shell_bridge: {
    texts: {
      clear: "浅水浮出龟甲，甲纹正好接成一截桥。借它过水，车轴能少受些苦。",
      uneasy: "不是龟在水里，是路背着甲醒了。甲纹慢慢转向车轮。"
    }
  }
};
```

## 见闻日志短句

```js
const seenLogTextPatch = [
  { id: "leave_central_post", text: "你们离开了最后一盏官灯。" },
  { id: "reach_old_king_road", text: "舆图添了一道旧辙。" },
  { id: "axle_repaired_once", text: "车轮重新认得路。" },
  { id: "grain_found_once", text: "粮袋沉了一点，人心也沉住一点。" },
  { id: "low_sanity_vision_once", text: "你看见了别人没看见的路。" },
  { id: "near_red_marsh_or_stele", text: "九州在纸背露出一条红线。" }
];
```
