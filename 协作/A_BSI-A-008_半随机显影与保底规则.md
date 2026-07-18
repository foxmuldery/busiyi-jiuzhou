# A_BSI-A-008 半随机显影与保底规则

> 子线程：A，核心规则、数值平衡和死局保护  
> 任务：BSI-A-008  
> 范围：只写规则与验收文档，不修改 WebDemo 原型代码  
> 依据：`主协调_BSI-UX-013_小横屏打磨与半随机显影推进指令.md`、`A_BSI-A-007_第一章数值验收与保底测试清单.md`、当前 `03_WebDemo/prototype/data.js`

## 1. 首版结论

本轮半随机显影不要推翻当前固定 `revealPlan`，而是在它上面分三层：

```text
固定保底路线：每个地点至少固定显出 1 条可推进或可回到主脊的路线。
可抽支线：从当前地点的支线池里稳定抽 0-2 条，制造每局差异。
雾中远影：只显方向、地貌和资源倾向，不作为可点击路线，也不计入保底。
```

首版目标不是让地图每次都变，而是让“主线骨架稳定、支线组合略变、远方有诱饵”。玩家可以因为选择高风险、低神志幻路或连续贪捷径而失败，但不能因为抽取结果导致无路可走。

## 2. 固定保底路线 + 可抽支线 + 雾中远影

### 2.1 三层定义

| 层级 | 数据建议 | 显示/规则含义 | 是否可交互 | 是否计入保底 |
|---|---|---|---|---|
| 固定保底路线 | `requiredRoutes` | 当前地点稳定显出的主脊、回主脊或终点前路线 | 是，若未锁定 | 是 |
| 可抽支线 | `optionalRoutes` + `optionalCount` | 同局稳定抽取的绕行、补给、捷径或高压路线 | 是，若未锁定 | 只有通过可承受检查后才可计入 |
| 雾中远影 | `fogPool` | 一跳外或更远的节点/路线影子，只给方向感和资源诱因 | 否 | 否 |

首版每次抵达地点后执行：

1. 固定加入本地点 `requiredRoutes`。
2. 从 `optionalRoutes` 中按稳定伪随机抽取 `optionalCount` 条。
3. 按资源危险、坏运和连续高压情况做保底修正。
4. 从 `fogPool` 抽 1-3 个远影，只入 `hintedLocations / hintedRoutes`。
5. 将本次结果写入 state，页面刷新不重新洗牌。

### 2.2 稳定抽取口径

抽取必须稳定。建议 C 线程二选一：

| 做法 | 规则 |
|---|---|
| 派生伪随机 | 用 `runId + locationId` 生成本局本地点固定抽取结果 |
| 结果入库 | 第一次抵达时生成 `state.revealDraws[locationId]`，之后直接读取 |

若资源危险触发补救，补救不应重新抽整组支线，只能做“追加补救路线 / 提高补救远影 / 标注警示”。追加结果也要写入 state，避免刷新后忽隐忽现。

### 2.3 第一章推荐显影池

下面是基于当前 `data.js` 的首版建议。`requiredRoutes` 不代表永远安全，只代表不能被随机隐藏；是否可走仍要受锁定和资源检查约束。

| 地点 | 固定保底路线 `requiredRoutes` | 可抽支线 `optionalRoutes` | 建议抽数 | 雾中远影 `fogPool` |
|---|---|---|---:|---|
| `central_post` 中原驿 | `central_to_road` | `central_to_pass`, `central_to_qingqiu` | 1-2 | 雷泽、鸟鼠夹道、无名祠 |
| `old_king_road` 故王道 | `road_to_marsh` | `road_to_pass`, `road_to_shrine`, `road_to_birdmouse` | 1-2 | 赤水、白羽淖、鸟鼠夹道 |
| `qingqiu_outer_city` 青丘外邑 | `qingqiu_to_road` | `qingqiu_to_shrine` | 0-1 | 故王道、无名祠、黑齿市 |
| `abandoned_pass` 废关 | `pass_to_market` | `pass_to_birdmouse` | 0-1 | 黑齿市、鸟鼠夹道、白羽淖 |
| `bird_mouse_pass` 鸟鼠夹道 | `birdmouse_to_marsh` | `birdmouse_to_market`, `birdmouse_to_mire` | 1-2 | 雷泽、黑齿市、白羽淖 |
| `nameless_shrine` 无名祠 | `shrine_to_marsh` | `shrine_to_market` | 0-1 | 雷泽、黑齿市、白羽淖 |
| `thunder_marsh` 雷泽浅畔 | `marsh_to_red` | `marsh_to_feather`, `thunder_to_mire` | 1-2 | 赤水、白羽淖、羽民渡 |
| `black_teeth_market` 黑齿市 | `market_to_stele` | `market_to_red`, `market_to_feather`, `market_to_mire` | 1-2 | 断碑、赤水、白羽淖 |
| `white_feather_mire` 白羽淖 | `mire_to_feather` | `mire_to_red` | 0-1 | 羽民渡、赤水、梦图驿 |
| `feather_folk_ford` 羽民渡 | `feather_to_dream` | `feather_to_red` | 0-1 | 赤水、梦图驿、裂隙 |
| `red_marsh` 赤水外滩 | `red_to_stele` | `red_to_dream`, `red_to_rift` | 1-2 | 断碑、梦图驿、裂隙 |
| `broken_stele` 巫咸断碑 | `stele_to_rift` | `stele_to_dream` | 0-1 | 梦图驿、裂隙 |
| `dream_map_post` 梦图驿 | `dream_to_rift` | 无 | 0 | 裂隙 |
| `kyushu_rift` 九州裂隙 | 无，终点例外 | 无 | 0 | 无 |

### 2.4 保底主脊

第一章至少保留一条清醒可验收主脊：

```text
中原驿 -> 故王道 -> 雷泽浅畔 -> 赤水外滩 -> 巫咸断碑 -> 九州裂隙
```

对应路线：

```text
central_to_road -> road_to_marsh -> marsh_to_red -> red_to_stele -> stele_to_rift
```

这条路不要求永远最优，也不要求玩家必须走；它的作用是证明第一章有一条从起点到裂隙的稳定骨架。半随机只能在它周围加绕行、补给和风险，不能随机拆掉骨架。

### 2.5 锁定路线处理

`red_to_rift` 是高压锁定路线，首版规则：

1. 抵达赤水外滩后可以灰显或半显，但不能作为唯一出口。
2. 不满足 `followed_bones / rift_name / sanity <= 34` 时不可点击。
3. 即使可点击，也不应替代 `red_to_stele` 的清醒保底解释线。
4. 低神志入口可作为危险诱惑，但路线风险和主要消耗必须仍可判断。

## 3. 资源危险时的补救倾斜

### 3.1 资源分层

沿用 A-007 阈值。

| 资源 | 低值预警 | 危急线 | 归零处理 |
|---|---:|---:|---|
| 车轴 | 30 | 12 | 断轴补救 |
| 粮草 | 35 | 15 | 粮尽补救 |
| 神志 | 45 | 20 | 神志崩线补救 |

半随机显影按三档处理：

| 状态 | 显影倾斜 |
|---|---|
| 低于预警 | 提高对应补给地点、低消耗路线和可安顿地点权重 |
| 低于危急线 | 必须追加至少 1 个补救行动：可用补给、可承受出口、补救地点或危机补救 |
| 结算会归零 | 先进入对应 `crisisEvents`，普通路线不再作为唯一行动 |

### 3.2 补救地点与路线倾向

| 危险资源 | 优先补救地点 | 可倾斜路线例子 | 注意 |
|---|---|---|---|
| 车轴低 | 中原驿、故王道、废关、鸟鼠夹道、梦图驿 | `road_to_pass`, `pass_to_birdmouse`, `birdmouse_to_marsh`, `stele_to_dream` | 不把连续水路高耗作为唯一出口 |
| 粮草低 | 中原驿、青丘外邑、雷泽浅畔、白羽淖、黑齿市 | `central_to_qingqiu`, `road_to_marsh`, `thunder_to_mire`, `market_to_mire` | `market_to_red` 粮耗高，不可作为粮草保底 |
| 神志低 | 青丘外邑、无名祠、黑齿市、巫咸断碑、梦图驿 | `road_to_shrine`, `qingqiu_to_shrine`, `market_to_stele`, `red_to_stele`, `stele_to_dream` | 可污染文案，但不能隐藏主消耗方向 |

补救优先级：

1. 当前地点未使用补给，且补给能拉高危险资源。
2. 当前地点有可承受路线通向对应补救地点。
3. 没有直达补救地点时，显出低/中风险中转路线，并把补救地点放进雾中远影。
4. 若所有可见路线都会让资源归零，进入对应危机补救。
5. 危机补救次数已用尽时，才允许判定公平失败，并给清楚失败原因。

### 3.3 权重修正规则

可抽支线不做纯随机。首版权重建议：

| 条件 | 权重修正 |
|---|---:|
| 低风险路线 | +40 |
| 中风险路线 | +35 |
| 高风险路线 | +20 |
| 锁定路线 | +15，可灰显，不占可走保底 |
| 通向当前最低资源补救地点 | +35 |
| 目的地有未使用的对应补给 | +30 |
| 路线会让最低资源低于危急线 | -35 |
| 路线会让任一资源归零 | 不计入保底，可显示警示 |
| 上一条路线为高风险 | 下一次至少保留 1 条低/中风险；高风险不能独占 |
| `badLuckMeter >= 75` 或连续坏事件 >= 2 | 强制插入补救路线、补救地点或喘息事件 |

### 3.4 补救不能变成免费通道

补救是为了防死局，不是奖励。允许的压力：

| 补救方式 | 可以给 | 必须保留的代价 |
|---|---|---|
| 低成本回撤 | 回到已见地或绕向补给点 | 不推进主线，已用补给不刷新 |
| 补救地点显影 | 让玩家看见修车、采粮、安神方向 | 到达仍有路线消耗或事件代价 |
| 危机补救 | 把资源拉离 0 | 另一资源损耗、坏运变化或旗标后患 |
| 线索补发 | 解释锁定路线缺口 | 通常付神志、粮草或事件选择 |
| 高风险替代 | 危险捷径可见 | 明确标高风险，不能作为唯一出口 |

## 4. 不会死局的检查条件

### 4.1 死局定义

本规则中的死局包括：

```text
非终点地点没有任何可行动作；
所有可走路线都会立刻让资源归零，且没有危机补救；
只显示锁定路线或雾中远影，玩家不能实际推进；
已用补给被重复算作保底，导致表面有救、实际无救；
赤水/裂隙锁定路线成为唯一出口。
```

玩家主动选高风险后失败，不算死局；玩家被显影结果堵死，算规则错误。

### 4.2 每次显影后的硬检查

| 检查项 | 通过条件 | 不通过时 |
|---|---|---|
| 引用完整 | `requiredRoutes / optionalRoutes / fogPool` 中所有 id 存在 | 修正 id 或从池中移除 |
| 固定保底存在 | 非终点地点至少 1 条 `requiredRoutes` | 补入回主脊或终点方向路线 |
| 可行动作存在 | 至少有可走路线、可用补给、危机补救、结局选择之一 | 强制插入补救行动 |
| 锁定不计保底 | 条件未满足的锁定路线不算可走出口 | 另显清醒出口或补救 |
| 雾影不计保底 | `fogPool` 只预告，不当成可行动作 | 另显真实路线 |
| 可承受 | 至少 1 个行动不会让任一资源结算后 <= 0，或会先触发危机补救 | 降低路线压力或触发危机 |
| 补给真实可用 | `usedSupplies[id]` 为 true 的补给不参与保底 | 换未用补给或危机补救 |
| 高压不连锁 | 刚走高风险后，下一地点不只有高风险出口 | 加入低/中风险出口 |
| 赤水不单点 | `red_marsh` 必须保留 `red_to_stele`，`red_to_rift` 不可独占 | 强制显出断碑线 |
| 终点例外 | `kyushu_rift.routes` 为空不判死局 | 进入结局选择或终点整理 |
| 稳定性 | 同一局同一地点刷新后显影结果不变 | 读取保存结果，不重新抽 |
| 主脊可达 | 从 `central_post` 到 `kyushu_rift` 至少有一条可解析路线链 | 修复缺口或补路线 |

### 4.3 一句硬断言

```text
每次刷新后，玩家必须至少拥有一种有效行动：可承受路线、可用补给、危机补救、结局选择或明确回撤。
```

## 5. 给 C 线程的数据结构建议

### 5.1 最小兼容结构

建议新增 `routePools`，不破坏现有 `revealPlan`。第一版可从 `revealPlan` 自动迁移，也可手写覆盖。

```js
routePools: {
  central_post: {
    requiredRoutes: ["central_to_road"],
    optionalRoutes: [
      { id: "central_to_pass", weight: 35, tags: ["axle_path", "side"] },
      { id: "central_to_qingqiu", weight: 35, tags: ["grain_rescue", "sanity_rescue"] }
    ],
    optionalCount: { min: 1, max: 2 },
    fogPool: [
      { type: "location", id: "thunder_marsh", weight: 35, tags: ["grain_rescue"] },
      { type: "location", id: "bird_mouse_pass", weight: 25, tags: ["axle_rescue"] },
      { type: "route", id: "road_to_birdmouse", weight: 20, tags: ["side"] }
    ],
    fogCount: { min: 1, max: 3 },
    rescueTags: ["axle_rescue", "grain_rescue", "sanity_rescue"]
  }
}
```

字段说明：

| 字段 | 类型 | 用途 |
|---|---|---|
| `requiredRoutes` | route id 数组 | 永远显出的保底路线池，不能被随机隐藏 |
| `optionalRoutes` | route id 或对象数组 | 可抽支线，支持权重和标签 |
| `optionalCount` | number 或 `{min,max}` | 本地点抽几条支线 |
| `fogPool` | location/route 对象数组 | 雾中远影候选，只预告不可点 |
| `fogCount` | number 或 `{min,max}` | 本地点显示几个远影 |
| `rescueTags` | tag 数组 | 本地点能响应哪些资源危险 |

### 5.2 标签建议

给地点和路线加标签，比在实现里硬写地点名更稳。

```js
locationTags: {
  abandoned_pass: ["axle_rescue", "market", "border"],
  thunder_marsh: ["grain_rescue", "water", "mid_pressure"],
  black_teeth_market: ["grain_rescue", "sanity_rescue", "trade"],
  broken_stele: ["sanity_rescue", "rift_clue"],
  dream_map_post: ["sanity_rescue", "rift_buffer"]
}
```

```js
routeTags: {
  road_to_pass: ["axle_rescue_path", "low_risk"],
  road_to_shrine: ["sanity_rescue_path", "low_risk"],
  thunder_to_mire: ["grain_rescue_path", "mid_risk"],
  market_to_red: ["high_grain_cost", "danger"],
  red_to_stele: ["sanity_rescue_path", "core_safe_exit"],
  red_to_rift: ["locked", "rift_shortcut", "danger"]
}
```

### 5.3 State 建议

为了保证稳定抽取，建议 state 增加：

```js
revealDraws: {
  [locationId]: {
    seed: "runId:locationId",
    requiredRoutes: [],
    optionalRoutes: [],
    fogLocations: [],
    fogRoutes: [],
    rescueInjected: [],
    generatedAtDay: 1
  }
}
```

另可增加：

| 字段 | 用途 |
|---|---|
| `runId` | 新开局生成一次，用于稳定伪随机 |
| `lastRouteRisk` | 判断高风险是否连压 |
| `crisisCooldown` | 濒死补救后 2 步内保护 |
| `consecutiveBadEvents` | 连续坏事件触发补救 |
| `stepsWithoutPositive` | 连续无正向收益触发补救 |
| `arrivalId` | 若未来允许同地点多次抵达不同抽取，可用它区分；首版可不用 |

### 5.4 与现有字段兼容

当前已有字段可以继续使用：

| 现有字段 | 用法 |
|---|---|
| `discoveredLocations` | 完整显现地点 |
| `revealedRoutes` | 当前已显路线 |
| `hintedLocations` | 雾中远影地点 |
| `hintedRoutes` | 雾中远影路线 |
| `usedSupplies` | 排除已用补给，不参与救援保底 |
| `arrivalSupplyUsed` | 区分本次抵达是否已补给 |
| `badLuckMeter` | 坏运保底触发 |
| `failureStats` | 记录危机、锁定、硬失败 |

## 6. 测试用例

| ID | 测试 | 执行方式 | 通过标准 |
|---|---|---|---|
| A008-T01 | 固定保底不被抽掉 | 新开局，在每个地点读取显影结果 | 非终点地点均包含本表 `requiredRoutes`；`kyushu_rift` 作为终点例外 |
| A008-T02 | 同局稳定抽取 | 同一局到达 `old_king_road` 后刷新页面或重复打开地图 | 支线和远影不变化，不重新洗牌 |
| A008-T03 | 新局可变 | 开两局不同 `runId`，都到 `old_king_road` | 固定保底相同，`optionalRoutes / fogPool` 可不同但都合法 |
| A008-T04 | 雾中远影不可点击 | 在 `central_post` 查看雷泽、鸟鼠、无名祠远影 | 远影只显示方向/影子，不能当路线选择，不计入可行动作 |
| A008-T05 | 保守主脊可达 | 走 `central_to_road -> road_to_marsh -> marsh_to_red -> red_to_stele -> stele_to_rift` | 可抵达九州裂隙；中途不因随机隐藏路线断链 |
| A008-T06 | 起点不死局 | 新开局，资源为初始值 | 至少有 `central_to_road` 可走；可选支线不会隐藏起点教学路 |
| A008-T07 | 车轴危险补救 | 设置车轴 10-12，在故王道、废关或雷泽打开地图 | 不直接硬失败；优先显示修车补给、低车轴消耗出口或断轴补救 |
| A008-T08 | 粮草危险补救 | 设置粮草 13-15，在雷泽或黑齿市打开地图 | 不出现所有可走路线都会粮草归零且无补救的局面 |
| A008-T09 | 神志危险补救 | 设置神志 18-20，在赤水或断碑打开地图 | 不直接硬失败；优先显断碑、梦图、静神补给或神志崩线补救 |
| A008-T10 | 已用补给不算保底 | 使用 `market_trade_grain` 后把粮草降到危急，再在黑齿市刷新 | 已用补给不再当作粮草保底；必须找别的路线或危机补救 |
| A008-T11 | 赤水锁定不独占 | 到赤水，未获得 `followed_bones/rift_name` 且神志 >34 | `red_to_rift` 可灰显但不可走；`red_to_stele` 仍可走 |
| A008-T12 | 高风险不连压 | 走 `marsh_to_red` 或 `market_to_red` 后检查下一地点 | 下一次显影不只有高风险路线；至少有 1 条低/中风险出口或补救 |
| A008-T13 | 归零先危机 | 让任一资源在路线结算后 <=0 | 先进入对应 `crisisEvents`，未超过次数时不直接硬失败 |
| A008-T14 | 终点不误判 | 到达 `kyushu_rift` | 普通路线为空不算死局；进入裂隙事件、终点整理或结局选择 |

用户试玩前最低执行 T01、T02、T05、T07、T08、T09、T11、T14。这 8 条过了，才能说半随机显影没有破坏第一章保底。

## 7. 最重要的 5 条保底规则

1. `requiredRoutes` 只能被锁定条件限制，不能被随机抽取隐藏。
2. `optionalRoutes` 可以变化，但抽取结果必须按同局同地点稳定保存。
3. `fogPool` 只做雾中远影，不可点击，也不能算作“还有路可走”。
4. 任一资源进入危急线时，下一次显影必须追加可用补给、补救路线、补救地点或危机补救。
5. 赤水外滩必须保留 `red_to_stele` 清醒出口，`red_to_rift` 不能成为唯一出口。
