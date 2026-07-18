# BSI-B-003 第一图事件数据化清单与异族词条

> 子线程 B：山海经世界观与叙事主创  
> 来源：整理自 [B_BSI-B-002_第一张地图事件包与神志文本样例.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-002_第一张地图事件包与神志文本样例.md)  
> 用途：给 C 线程接入 Web Demo 事件数据，给 A 线程映射数值和风险权重。  
> 边界：本文件只提供 B 线程事件数据化清单，不改 C 代码，不决定最终数值，不做 git commit/push。

## 1. 字段约定

### 1.1 事件主字段

| 字段 | 含义 | 建议类型 |
|---|---|---|
| `id` | 事件唯一 ID | string |
| `sourceNo` | B-002 原事件编号 | string |
| `title` | 事件标题 | string |
| `locationId` | 绑定节点 ID | string |
| `locationName` | 中文地点名 | string |
| `routeId` | 可选，绑定路程段 | string/null |
| `stage` | 地图阶段 | `start` / `low_pressure` / `turning` / `high_pressure` / `ending` |
| `timing` | 触发时间 | `pre_arrival` / `mid_route` / `arrival` / `night` |
| `conditions` | 触发条件摘要 | string |
| `pool` | 事件池标签 | string[] |
| `riskLevel` | 风险等级 | `risk_low` / `risk_mid` / `risk_high` |
| `resourceBias` | 主要资源倾向 | `axle` / `grain` / `sanity` 数组 |
| `textLayers` | 神志文本层级 | `clear` / `uneasy` / `mad` |
| `textStatus` | 文本状态 | `sample_ready` / `outline_ready` |
| `choices` | 选项 ID 数组 | string[] |
| `flags` | 可能读写的 flag | string[] |
| `cNotes` | C 线程接入备注 | string |

### 1.2 资源变化枚举

| 枚举 | 含义 |
|---|---|
| `gain_small` | 小幅恢复 |
| `gain_medium` | 中幅恢复 |
| `gain_large` | 大幅恢复，第一版慎用 |
| `loss_small` | 小幅消耗 |
| `loss_medium` | 中幅消耗 |
| `loss_large` | 大幅消耗，避免强制连续触发 |
| `none` | 无变化 |
| `uncertain` | 低神志或未识语言时可显示为模糊代价 |

## 2. 事件主表

| id | sourceNo | title | locationId | locationName | routeId | stage | timing | conditions | pool | riskLevel | resourceBias | textLayers | textStatus | choices | flags | cNotes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `map01_e01_depart_ask_road` | E01 | 出驿问路 | `central_inn` | 中原驿 | null | `start` | `arrival` | 首局开始或首次出发前 | `pool_supply`, `pool_clue` | `risk_low` | `grain`, `axle` | `clear`, `uneasy`, `mad` | `outline_ready` | `buy_grain`, `check_axle`, `ask_west_road` | `clue_old_road_warning` | 教学事件，建议固定首发，不进入随机池。 |
| `map01_e02_forbidden_stele` | E02 | 禁令残碑 | `old_royal_road` | 故王道/废关前路 | `old_road_to_abandoned_pass` | `low_pressure` | `pre_arrival` | 第一次进入废关前；低神志可复触发 | `pool_clue`, `pool_sanity` | `risk_low` | `sanity`, `axle` | `clear`, `uneasy`, `mad` | `outline_ready` | `follow_tracks`, `read_stele`, `detour_stele` | `clue_pass_reverse_mark` | 可作为第一处“路线信息可能矛盾”的演示。 |
| `map01_e03_repair_at_pass` | E03 | 废关修辐 | `abandoned_pass` | 废关 | null | `low_pressure` | `arrival` | 首次通过废关；车轴低时提高权重 | `pool_supply`, `pool_item` | `risk_low` | `axle`, `grain` | `clear`, `uneasy`, `mad` | `outline_ready` | `repair_with_old_cart`, `search_pass_tower`, `pass_immediately` | `clue_abandoned_pass_side_path` | 车轴补救事件，可被 A 线程标为 `rescue_candidate`。 |
| `map01_e04_ferry_without_ferryman` | E04 | 无渡之渡 | `old_ferry` | 旧渡口 | `abandoned_pass_to_old_ferry` | `low_pressure` | `arrival` | 从废关进入旧渡口，或选择水路支线 | `pool_risk`, `pool_clue` | `risk_mid` | `axle`, `grain`, `sanity` | `clear`, `uneasy`, `mad` | `outline_ready` | `force_ferry`, `search_shallow`, `wait_night_tide` | `route_night_shoal` | 适合测试等待、夜路和隐藏路线。 |
| `map01_e05_empty_village_grain` | E05 | 空村晾粮 | `empty_grain_village` | 荒禾村 | null | `low_pressure` | `arrival` | 粮低于预警线时高权重；正常抵达中权重 | `pool_supply`, `pool_sanity` | `risk_low` | `grain`, `sanity` | `clear`, `uneasy`, `mad` | `outline_ready` | `take_grain`, `take_half_and_ritual`, `avoid_village` | `flag_took_empty_village_grain`, `flag_respected_empty_village` | 早期补粮事件，适合坏运气保护。 |
| `map01_e06_broken_spoke_slope` | E06 | 断辐坡 | `broken_cart_ridge` | 断车岭 | `empty_village_to_broken_ridge` | `low_pressure` | `mid_route` | 进入坡岭路程段；车轴低时高权重 | `pool_risk`, `pool_item` | `risk_low` | `axle`, `grain` | `clear`, `uneasy`, `mad` | `outline_ready` | `slow_protect_cart`, `rush_up_slope`, `salvage_spokes` | `flag_salvaged_spokes` | 清楚展示车轴和粮的互换。 |
| `map01_e07_stone_drum_three_beats` | E07 | 石鼓三响 | `stone_drum_slope` | 石鼓坡 | null | `turning` | `arrival` | 首次抵达石鼓坡；已有巫文线索时可复触发 | `pool_sanity`, `pool_clue` | `risk_mid` | `sanity`, `grain` | `clear`, `uneasy`, `mad` | `sample_ready` | `record_drum`, `answer_drum`, `leave_ears_covered` | `clue_stone_drum_rhythm`, `flag_answered_stone_drum` | 已有三层文本，可优先接入 sanityTextSystem。 |
| `map01_e08_thunder_marsh_stuck` | E08 | 雷泽陷车 | `thunder_marsh_shallow` | 雷泽浅畔 | `stone_drum_to_thunder_marsh` | `turning` | `mid_route` | 进入泽畔路程段；低神志/雨雾时权重提高 | `pool_risk` | `risk_mid` | `axle`, `grain` | `clear`, `uneasy`, `mad` | `outline_ready` | `push_cart`, `discard_load`, `follow_thunder_detour` | `flag_avoided_next_risk`, `flag_discarded_load` | 中段资源压力事件，适合横向舞台暂停触发。 |
| `map01_e09_black_teeth_trade` | E09 | 黑齿换物 | `black_teeth_market` | 黑齿市 | null | `turning` | `arrival` | 首次进入异族边市；有语言线索时显示额外提示 | `pool_supply`, `pool_clue` | `risk_mid` | `grain`, `sanity` | `clear`, `uneasy`, `mad` | `sample_ready` | `trade_grain_for_axle`, `trade_item_for_sign`, `refuse_trade` | `clue_black_teeth_route_sign`, `flag_refused_black_teeth_trade` | 已有三层文本；可接异族关键词系统。 |
| `map01_e10_feather_without_shadow` | E10 | 羽落无影 | `feather_marsh_edge` | 羽民泽外 | `thunder_marsh_to_feather_edge` | `high_pressure` | `pre_arrival` | 从雷泽或黑齿市进入泽外；有黑齿路标可降误读 | `pool_clue`, `pool_sanity` | `risk_mid` | `sanity`, `axle`, `grain` | `clear`, `uneasy`, `mad` | `outline_ready` | `rush_head_down`, `catch_feather`, `call_upward` | `clue_feather_speech_token`, `flag_called_feather_people` | 语言线索事件，低神志只模糊提示，不隐藏行动。 |
| `map01_e11_red_water_bones` | E11 | 赤水岸骨 | `red_water_outer_bank` | 赤水外滩 | `feather_edge_to_red_water` | `high_pressure` | `arrival` | 首次抵达赤水外滩；低神志或夜行提高权重 | `pool_sanity`, `pool_risk` | `risk_high` | `sanity`, `axle`, `grain` | `clear`, `uneasy`, `mad` | `sample_ready` | `follow_bones`, `bury_bones_ritual`, `leave_water_bank` | `flag_followed_red_bones`, `flag_buried_red_bones`, `route_red_water_night_crossing` | 已有三层文本；可作为禁地入口主事件。 |
| `map01_e12_broken_stele_reads_name` | E12 | 断碑读名 | `wu_xian_broken_stele` | 巫咸断碑 | `red_water_to_broken_stele` | `high_pressure` | `arrival` | 有巫文/鼓声线索，或从赤水进入断碑路段 | `pool_sanity`, `pool_clue` | `risk_high` | `sanity`, `grain`, `axle` | `clear`, `uneasy`, `mad` | `sample_ready` | `read_stele`, `take_rubbing`, `destroy_stele` | `item_stele_rubbing`, `clue_red_water_taboo`, `flag_destroyed_stele` | 已有三层文本；高风险线索事件，需坏运气保护。 |
| `map01_e13_second_abandoned_pass` | E13 | 第二废关 | `second_abandoned_pass` | 第二废关 | `broken_stele_to_second_pass` | `high_pressure` | `arrival` | 已经过废关；进入高压段后触发 | `pool_sanity`, `pool_item` | `risk_high` | `sanity`, `axle`, `grain` | `clear`, `uneasy`, `mad` | `outline_ready` | `pass_by_old_rule`, `compare_old_notes`, `break_gate_for_wood` | `flag_broke_second_pass`, `route_red_water_night_crossing` | 认知校验事件；可测试低神志地点重复。 |
| `map01_e14_dream_before_rift` | E14 | 裂隙前梦 | `nine_province_rift` | 九州裂隙 | `red_water_to_rift` | `ending` | `night` | 抵达终点前夜；神志危急时可提前触发 | `pool_sanity`, `pool_clue` | `risk_high` | `sanity`, `axle`, `grain` | `clear`, `uneasy`, `mad` | `sample_ready` | `take_dream_shortcut`, `burn_dream_map`, `return_by_old_map` | `ending_lost_route`, `ending_stable_rift`, `ending_return_with_pollution` | 已有三层文本；终局分流事件。 |

## 3. 选项效果表

| eventId | choiceId | label | axle | grain | sanity | addFlags/unlock | C 接入备注 |
|---|---|---|---|---|---|---|---|
| `map01_e01_depart_ask_road` | `buy_grain` | 买足干粮 | `none` | `gain_medium` | `none` | none | 教学补给。 |
| `map01_e01_depart_ask_road` | `check_axle` | 检查车轴 | `gain_small` | `loss_small` | `none` | none | 教学资源交换。 |
| `map01_e01_depart_ask_road` | `ask_west_road` | 只问西路 | `none` | `none` | `loss_small` | `clue_old_road_warning` | 获得路线警告。 |
| `map01_e02_forbidden_stele` | `follow_tracks` | 按车辙继续 | `loss_small` | `loss_small` | `none` | none | 正常前进。 |
| `map01_e02_forbidden_stele` | `read_stele` | 停车辨碑 | `none` | `none` | `loss_small` | `clue_pass_reverse_mark` | 低神志可显示伪方向。 |
| `map01_e02_forbidden_stele` | `detour_stele` | 绕开碑路 | `loss_medium` | `loss_small` | `none` | `flag_avoided_forbidden_stele` | 降低本次神志风险。 |
| `map01_e03_repair_at_pass` | `repair_with_old_cart` | 拆旧车修辐 | `gain_medium` | `loss_small` | `none` | `flag_repaired_at_pass` | 车轴补救。 |
| `map01_e03_repair_at_pass` | `search_pass_tower` | 搜关楼找路 | `none` | `none` | `loss_small` | `clue_abandoned_pass_side_path` | 支线路线线索。 |
| `map01_e03_repair_at_pass` | `pass_immediately` | 立刻通过 | `loss_small` | `none` | `none` | none | 跳过收益。 |
| `map01_e04_ferry_without_ferryman` | `force_ferry` | 修船强渡 | `loss_medium` | `loss_small` | `none` | `flag_forced_old_ferry` | 推进到对岸。 |
| `map01_e04_ferry_without_ferryman` | `search_shallow` | 沿岸找浅处 | `none` | `loss_medium` | `loss_small` | `route_low_risk_bank_path` | 可能给低风险回路。 |
| `map01_e04_ferry_without_ferryman` | `wait_night_tide` | 等到夜潮 | `none` | `loss_small` | `loss_medium` | `route_night_shoal` | 解锁夜路，后续污染提高。 |
| `map01_e05_empty_village_grain` | `take_grain` | 取走谷物 | `none` | `gain_medium` | `loss_small` | `flag_took_empty_village_grain` | 补粮但带污染标记。 |
| `map01_e05_empty_village_grain` | `take_half_and_ritual` | 留下一半并祭告 | `none` | `gain_small` | `gain_small` | `flag_respected_empty_village` | 稳定选择。 |
| `map01_e05_empty_village_grain` | `avoid_village` | 不入村 | `none` | `loss_small` | `none` | `flag_avoided_empty_village` | 降低后续污染风险。 |
| `map01_e06_broken_spoke_slope` | `slow_protect_cart` | 慢行护车 | `loss_small` | `loss_medium` | `none` | none | 粮换车轴安全。 |
| `map01_e06_broken_spoke_slope` | `rush_up_slope` | 催车上坡 | `loss_medium` | `loss_small` | `none` | none | 车轴换粮。 |
| `map01_e06_broken_spoke_slope` | `salvage_spokes` | 拾旧辐加固 | `gain_small` | `loss_small` | `loss_small` | `flag_salvaged_spokes` | 小收益加小污染。 |
| `map01_e07_stone_drum_three_beats` | `record_drum` | 记录鼓声 | `none` | `none` | `loss_small` | `clue_stone_drum_rhythm` | 线索选择。 |
| `map01_e07_stone_drum_three_beats` | `answer_drum` | 敲鼓回应 | `none` | `none` | `loss_medium` | `flag_answered_stone_drum`, `unlock_wu_script_options` | 高风险巫文入口。 |
| `map01_e07_stone_drum_three_beats` | `leave_ears_covered` | 掩耳离开 | `none` | `loss_small` | `none` | `flag_avoided_stone_drum` | 避开神志损耗。 |
| `map01_e08_thunder_marsh_stuck` | `push_cart` | 众人推车 | `loss_small` | `loss_medium` | `none` | none | 人力脱困。 |
| `map01_e08_thunder_marsh_stuck` | `discard_load` | 拆载减重 | `gain_small` | `loss_small` | `none` | `flag_discarded_load` | 可解释为避免车轴损耗。 |
| `map01_e08_thunder_marsh_stuck` | `follow_thunder_detour` | 顺雷声绕行 | `loss_medium` | `none` | `loss_small` | `flag_avoided_next_risk` | 可降低下一风险事件权重。 |
| `map01_e09_black_teeth_trade` | `trade_grain_for_axle` | 以粮换车具 | `gain_medium` | `loss_medium` | `none` | `flag_traded_with_black_teeth` | 交易主选项。 |
| `map01_e09_black_teeth_trade` | `trade_item_for_sign` | 以旧器换路标 | `none` | `none` | `none` | `clue_black_teeth_route_sign`, `lose_common_item` | 若无器物系统，先用 flag 占位。 |
| `map01_e09_black_teeth_trade` | `refuse_trade` | 拒绝交易离开 | `none` | `none` | `gain_small` | `flag_refused_black_teeth_trade` | 稳定但错过支线。 |
| `map01_e10_feather_without_shadow` | `rush_head_down` | 低头疾行 | `loss_small` | `loss_small` | `none` | `flag_avoided_feather_speech` | 避免交流。 |
| `map01_e10_feather_without_shadow` | `catch_feather` | 以布接羽 | `none` | `none` | `loss_medium` | `clue_feather_speech_token` | 获得语言线索。 |
| `map01_e10_feather_without_shadow` | `call_upward` | 呼喊回应 | `none` | `none` | `loss_small` | `flag_called_feather_people` | 可能触发误读或支线。 |
| `map01_e11_red_water_bones` | `follow_bones` | 依骨行路 | `loss_small` | `none` | `loss_medium` | `flag_followed_red_bones`, `route_red_water_night_crossing` | 危险近路。 |
| `map01_e11_red_water_bones` | `bury_bones_ritual` | 掩骨祭拜 | `none` | `loss_small` | `gain_small` | `flag_buried_red_bones` | 降低本段高风险。 |
| `map01_e11_red_water_bones` | `leave_water_bank` | 远离水岸 | `loss_medium` | `loss_small` | `none` | `flag_avoided_red_water_bank` | 远路避污染。 |
| `map01_e12_broken_stele_reads_name` | `read_stele` | 读碑 | `none` | `none` | `loss_medium` | `clue_red_water_taboo`, `unlock_hidden_route_hint` | 高风险线索。 |
| `map01_e12_broken_stele_reads_name` | `take_rubbing` | 拓碑带走 | `none` | `loss_small` | `loss_small` | `item_stele_rubbing` | 延迟解读用。 |
| `map01_e12_broken_stele_reads_name` | `destroy_stele` | 毁去碑面 | `loss_small` | `none` | `gain_small` | `flag_destroyed_stele` | 稳定神志但断线索。 |
| `map01_e13_second_abandoned_pass` | `pass_by_old_rule` | 按旧法通过 | `loss_small` | `none` | `loss_medium` | `route_red_water_night_crossing` | 可直入夜渡。 |
| `map01_e13_second_abandoned_pass` | `compare_old_notes` | 对照旧记录 | `none` | `loss_small` | `gain_small` | `flag_confirmed_loop_pass` | 稳定判断。 |
| `map01_e13_second_abandoned_pass` | `break_gate_for_wood` | 拆门为材 | `gain_small` | `none` | `loss_small` | `flag_broke_second_pass` | 小车轴补救。 |
| `map01_e14_dream_before_rift` | `take_dream_shortcut` | 按梦中近路走 | `none` | `none` | `loss_large` | `ending_lost_route`, `unlock_hidden_route` | 高风险终局。 |
| `map01_e14_dream_before_rift` | `burn_dream_map` | 烧掉梦图 | `none` | `loss_small` | `gain_small` | `ending_stable_rift` | 稳定终局判断。 |
| `map01_e14_dream_before_rift` | `return_by_old_map` | 对照旧图归返 | `loss_medium` | `loss_medium` | `none` | `ending_return_with_pollution` | 归返出口。 |

## 4. Flag 与路线解锁清单

| flag / route | 来源事件 | 类型 | 用途 |
|---|---|---|---|
| `clue_old_road_warning` | E01 | clue | 提前解释废关风险。 |
| `clue_pass_reverse_mark` | E02 | clue | 支撑第二废关“方向反了”的认知回收。 |
| `clue_abandoned_pass_side_path` | E03 | clue | 后续可开低风险支线。 |
| `route_night_shoal` | E04 | route | 夜潮/夜渡类支线入口。 |
| `flag_took_empty_village_grain` | E05 | flag | 后续低神志可让粮袋污染文本回响。 |
| `flag_respected_empty_village` | E05 | flag | 降低村落相关污染风险。 |
| `clue_stone_drum_rhythm` | E07 | clue | 解锁巫文、断碑或三响提示。 |
| `flag_answered_stone_drum` | E07 | flag | 提高巫文事件权重。 |
| `flag_avoided_next_risk` | E08 | flag | 一次性降低下一风险事件权重。 |
| `clue_black_teeth_route_sign` | E09 | clue | 降低羽民泽外误读，或显示额外关键词。 |
| `clue_feather_speech_token` | E10 | clue | 开启羽民语关键词。 |
| `route_red_water_night_crossing` | E11/E13 | route | 赤水夜渡入口。 |
| `item_stele_rubbing` | E12 | item | 延迟阅读巫文，后续可消耗神志换线索。 |
| `clue_red_water_taboo` | E12 | clue | 赤水夜渡警告或安全选项提示。 |
| `flag_destroyed_stele` | E12 | flag | 阻断部分巫文线索，但稳定神志。 |
| `flag_confirmed_loop_pass` | E13 | flag | 确认第二废关不是普通回路。 |
| `ending_lost_route` | E14 | ending | 迷失/幻路结局方向。 |
| `ending_stable_rift` | E14 | ending | 稳定抵达裂隙方向。 |
| `ending_return_with_pollution` | E14 | ending | 归返但带回污染记录方向。 |

## 5. 异族语言与巫文关键词小表

这些词条是原创游戏机制词，不模拟现实民族语言，不复制现代译文。第一版建议只做“关键词逐步解锁”，不做完整语法。

### 5.1 黑齿市关键词

| tokenId | 初见显示 | 略识显示 | 通意显示 | 低神志伪读 | 解锁来源 | Demo 用途 |
|---|---|---|---|---|---|---|
| `bt_grain` | `...粮...` | 粮 | 可用粮交换 | “明日的肉” | 初入黑齿市 | 解释以粮换车具。 |
| `bt_axle` | `...轮...` | 车/轮 | 车具、辐、轴 | “走出去的骨” | `trade_grain_for_axle` 预览 | 标注车轴收益。 |
| `bt_route` | `...路...` | 路 | 路标/旧路 | “回头的嘴” | `clue_black_teeth_route_sign` | 解锁路线提示。 |
| `bt_tomorrow` | `...明...` | 明日 | 延后代价或后续风险 | “昨日的粮” | 初入黑齿市 | 给交易带不安感。 |
| `bt_no` | `...不可...` | 不可 | 禁忌、不要 | “可以” | 低神志时自动伪读 | 风险提示，可制造误读。 |

### 5.2 羽民泽外关键词

| tokenId | 初见显示 | 略识显示 | 通意显示 | 低神志伪读 | 解锁来源 | Demo 用途 |
|---|---|---|---|---|---|---|
| `fp_feather` | `...羽...` | 羽 | 信物/接羽 | “落下的眼” | `catch_feather` | 解释以布接羽。 |
| `fp_above` | `...上...` | 上方 | 声音来自上方 | “水下” | `clue_feather_speech_token` | 表现看不见的异族。 |
| `fp_head_down` | `...低...` | 低头 | 低头可避视线 | “抬头” | 初入羽民泽外 | 给安全行动提示。 |
| `fp_shallow` | `...浅...` | 浅路 | 芦苇间有浅路 | “夜里更浅” | `clue_black_teeth_route_sign` | 解锁支线或降低误读。 |
| `fp_return` | `...归...` | 归 | 可回到旧路 | “不得归” | 中神志以上 | 提供撤退提示。 |

### 5.3 巫文/断碑关键词

| tokenId | 初见显示 | 可摹写显示 | 可误读显示 | 低神志伪读 | 解锁来源 | Demo 用途 |
|---|---|---|---|---|---|---|
| `wu_forbid` | `刻痕` | 禁 | 不可/禁行 | “可行” | E02/E12 | 禁令和风险提示。 |
| `wu_west` | `残画` | 西 | 西行/西路 | “归路” | `clue_pass_reverse_mark` | 对应废关方向。 |
| `wu_night` | `黑点` | 夜 | 夜渡/夜路 | “白日” | `route_night_shoal` | 赤水夜渡提示。 |
| `wu_red_water` | `水痕` | 赤水 | 赤水禁忌 | “饮水” | E11/E12 | 禁地风险提示。 |
| `wu_name` | `缺字` | 名 | 读者之名 | 队伍成员名 | E12 | 神志污染核心词。 |
| `wu_return` | `回纹` | 归 | 回返/旧路 | “不得归” | E14 | 归返结局线索。 |
| `wu_rift` | `裂痕` | 裂 | 九州裂隙 | “入口” | E14 | 终点提示。 |
| `wu_three_beats` | `三点` | 三响 | 鼓声节律 | “三次回头” | `clue_stone_drum_rhythm` | 石鼓与断碑联动。 |

## 6. 可直接交给 C 的最小接入建议

1. 先接入 `map01_e01` 到 `map01_e09` 九个事件，覆盖起点、低压段和转折段。
2. 三层文本第一轮优先接入 `map01_e07`、`map01_e09`、`map01_e11`、`map01_e12`、`map01_e14`。
3. 若 C 线程暂时不做完整 flag 系统，至少保留 `addFlags` 字段并写入日志。
4. 异族关键词先用 `unlockedTokens: string[]`，不做复杂语言推理。
5. 低神志伪读第一版只影响显示文本和风险提示，不建议直接改真实路线，除非主线程另行拍板。

## 7. 待主线程/用户拍板

1. 事件 ID 是否采用本文件的 `map01_eXX_slug` 命名，还是 C 线程已有其他命名规范？
2. 低神志伪读第一版是否确认只影响显示，不影响真实路线解锁？
3. 黑齿市与羽民泽外关键词是否都进第一版 Demo，还是先只做黑齿市一组？
4. `item_stele_rubbing` 是否第一版就作为器物存在，还是先只作为普通 flag？
