# 《不思异：九州》真人试玩链自动验收

生成时间：2026-07-18T23:16:35.204Z

## 结论

通过。入口、第一分钟、补给、选路、半途、终点和复盘复制链路均有自动证据。

## 模拟路径

- 路线：central_to_road -> road_to_shrine -> shrine_to_market -> market_to_stele -> stele_to_rift
- 终点：kyushu_rift
- 当前资源：车轴 61 / 粮草 85 / 神志 68
- 最低资源：车轴 61 / 粮草 74 / 神志 60
- 互动计数：地点事件 6 / 采风写法 5 / 路遇 4 / 补给 6

## 试玩观察重点

- 看懂下一步
- 感到资源紧
- 愿意再走一站

## 自动检查明细

- PASS launcher exposes clean start link
- PASS launcher exposes tester focus strip
- PASS launcher exposes feedback handoff
- PASS main page exposes recap drawer
- PASS app exposes recap copy fallback
- PASS app exposes guided next-step states
- PASS playtest starts at configured start location：central_post
- PASS step 1 location has event：post_gate
- PASS step 1 event has visible choice：驿门未闭
- PASS step 1 survives event choice：车轴 88 / 粮草 87 / 神志 85
- PASS step 1 field note choices available：central_post
- PASS step 1 survives field note：车轴 88 / 粮草 87 / 神志 86
- PASS step 1 has supply action or explicit empty list：central_post
- PASS step 1 supply has label and result：central_repair
- PASS step 1 survives supply：车轴 96 / 粮草 85 / 神志 86
- PASS step 1 route exists：central_to_road
- PASS step 1 route starts from current location：central_post != central_post
- PASS step 1 survives route cost：车轴 92 / 粮草 81 / 神志 86
- PASS step 1 has mid-route event：dang_kang_field_cry
- PASS step 1 route event has visible choice：当康啼垄
- PASS step 1 survives route event：车轴 90 / 粮草 89 / 神志 86
- PASS step 1 reaches next location：old_king_road
- PASS step 2 location has event：split_tracks
- PASS step 2 event has visible choice：车辙分叉
- PASS step 2 survives event choice：车轴 90 / 粮草 85 / 神志 90
- PASS step 2 field note choices available：old_king_road
- PASS step 2 survives field note：车轴 90 / 粮草 85 / 神志 91
- PASS step 2 has supply action or explicit empty list：old_king_road
- PASS step 2 supply has label and result：road_stones
- PASS step 2 survives supply：车轴 97 / 粮草 85 / 神志 89
- PASS step 2 route exists：road_to_shrine
- PASS step 2 route starts from current location：old_king_road != old_king_road
- PASS step 2 survives route cost：车轴 94 / 粮草 81 / 神志 87
- PASS step 2 has mid-route event：dang_kang_field_cry
- PASS step 2 route event has visible choice：当康啼垄
- PASS step 2 survives route event：车轴 92 / 粮草 89 / 神志 87
- PASS step 2 reaches next location：nameless_shrine
- PASS step 3 location has event：nameless_prayer
- PASS step 3 event has visible choice：无匾新灰
- PASS step 3 survives event choice：车轴 92 / 粮草 85 / 神志 92
- PASS step 3 field note choices available：nameless_shrine
- PASS step 3 survives field note：车轴 92 / 粮草 85 / 神志 93
- PASS step 3 has supply action or explicit empty list：nameless_shrine
- PASS step 3 supply has label and result：shrine_ash_path
- PASS step 3 survives supply：车轴 92 / 粮草 81 / 神志 98
- PASS step 3 route exists：shrine_to_market
- PASS step 3 route starts from current location：nameless_shrine != nameless_shrine
- PASS step 3 survives route cost：车轴 88 / 粮草 74 / 神志 93
- PASS step 3 has mid-route event：zhu_bird_name_call
- PASS step 3 route event has visible choice：鴸鸟呼名
- PASS step 3 survives route event：车轴 86 / 粮草 74 / 神志 97
- PASS step 3 reaches next location：black_teeth_market
- PASS step 4 location has event：black_trade
- PASS step 4 event has visible choice：黑齿交易
- PASS step 4 survives event choice：车轴 82 / 粮草 89 / 神志 97
- PASS step 4 field note choices available：black_teeth_market
- PASS step 4 survives field note：车轴 82 / 粮草 89 / 神志 98
- PASS step 4 has supply action or explicit empty list：black_teeth_market
- PASS step 4 supply has label and result：market_trade_grain
- PASS step 4 survives supply：车轴 79 / 粮草 100 / 神志 98
- PASS step 4 route exists：market_to_stele
- PASS step 4 route starts from current location：black_teeth_market != black_teeth_market
- PASS step 4 survives route cost：车轴 74 / 粮草 94 / 神志 89
- PASS step 4 has mid-route event：black_teeth_scale_price
- PASS step 4 route event has visible choice：黑齿鳞价
- PASS step 4 survives route event：车轴 71 / 粮草 100 / 神志 89
- PASS step 4 reaches next location：broken_stele
- PASS step 5 location has event：read_name
- PASS step 5 event has visible choice：断碑读名
- PASS step 5 survives event choice：车轴 71 / 粮草 100 / 神志 82
- PASS step 5 field note choices available：broken_stele
- PASS step 5 survives field note：车轴 71 / 粮草 100 / 神志 83
- PASS step 5 has supply action or explicit empty list：broken_stele
- PASS step 5 supply has label and result：stele_rubbing
- PASS step 5 survives supply：车轴 71 / 粮草 98 / 神志 88
- PASS step 5 route exists：stele_to_rift
- PASS step 5 route starts from current location：broken_stele != broken_stele
- PASS step 5 survives route cost：车轴 61 / 粮草 89 / 神志 72
- PASS step 5 direct ending route may skip mid-route event：stele_to_rift
- PASS step 5 reaches next location：kyushu_rift
- PASS final location has event：rift_dream
- PASS final event has visible choice：裂隙前梦
- PASS final survives event choice：车轴 61 / 粮草 89 / 神志 60
- PASS final has supply action or explicit empty list：kyushu_rift
- PASS final supply has label and result：rift_map
- PASS final survives supply：车轴 61 / 粮草 85 / 神志 68
- PASS playtest reaches kyushu rift：kyushu_rift
- PASS final event has ending choice：rift_dream
- PASS playtest has enough recap material：{"routes":5,"events":6,"fieldNotes":5,"routeEvents":4,"supplies":6}
