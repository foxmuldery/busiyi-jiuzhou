# B_BSI-B-010 第一章半途路遇事件包

> 子线程：B，山海经世界观与叙事主创  
> 任务：BSI-B-010  
> 范围：只写协作文档，不修改 `data.js` 或其它代码  
> 用途：给 C 线程扩充 `routeEvents`，让行进半途会停下、会抉择、会改资源

## 0. 合入口径

- 字段按现有 `routeEvents` 形状写：`title / tag / texts.clear / texts.uneasy / texts.mad / choices[].label / hint / effect / result`。
- 每条都给 `id` 建议、标签、三档神志文本、2-3 个选择、资源结果和短结果文案。
- 文本压短，适合小横屏事件面板；异象只写所见，不写现代解释。
- `tags` 供策划和 C 线程选挂路线；若当前代码只用 `tag`，可先保留 `tag: "路遇"`。

## 1. 可合入 `routeEvents` 草案

### 1. `wenao_fish_rain`

- 标题：文鳐雨
- 标签：`路遇` / `低风险提醒` `粮草补给` `水泽异象`
- 推荐挂载：`road_to_marsh`、`marsh_to_feather`、`mire_to_feather`
- 三档神志文本：
  - `clear`：薄云里游过一群文鳐，鳞光落在车辙旁。
  - `uneasy`：鱼影从云里翻身，车厢里先响起水声。
  - `mad`：天上有水。文鳐从你眼里游过，吐出一袋旧粮。
- 选择：
  - 收鳞作粮
    - 资源结果：粮草 +6，神志 -2
    - `effect`: `{ axle: 0, grain: 6, sanity: -2 }`
    - 短结果文案：鳞片入袋后仍有水腥，粮袋却重了。
  - 覆袋避鳞
    - 资源结果：粮草 -2，神志 +3
    - `effect`: `{ axle: 0, grain: -2, sanity: 3 }`
    - 短结果文案：车队不看天鱼，心神稳了一些。
  - 追鱼入浅泽
    - 资源结果：车轴 -2，粮草 +9，神志 -4，获得 `wenao_trace`
    - `effect`: `{ axle: -2, grain: 9, sanity: -4, flag: "wenao_trace" }`
    - 短结果文案：浅泽给了粮，也咬住一截车轮。

### 2. `dang_kang_field_cry`

- 标题：当康啼垄
- 标签：`路遇` / `低风险提醒` `粮草补给` `荒田`
- 推荐挂载：`central_to_road`、`qingqiu_to_road`、`road_to_shrine`
- 三档神志文本：
  - `clear`：荒垄里一兽如豕，白牙低啼，土下有新谷味。
  - `uneasy`：它每啼一声，旧田便鼓起一小块。
  - `mad`：田在肚中。那兽叫一声，粮袋就回头看你。
- 选择：
  - 随啼翻土
    - 资源结果：车轴 -2，粮草 +8
    - `effect`: `{ axle: -2, grain: 8, sanity: 0 }`
    - 短结果文案：旧田吐出干谷，车轮陷过一层软土。
  - 献粟安兽
    - 资源结果：粮草 -3，神志 +4
    - `effect`: `{ axle: 0, grain: -3, sanity: 4 }`
    - 短结果文案：白牙兽停啼，荒田也安静下来。
  - 驱兽快过
    - 资源结果：车轴 -3，神志 -2
    - `effect`: `{ axle: -3, grain: 0, sanity: -2 }`
    - 短结果文案：车队冲过田垄，身后仍有啼声跟来。

### 3. `xuan_gui_shell_bridge`

- 标题：旋龟浮甲
- 标签：`路遇` / `中风险抉择` `车轴补救` `渡水`
- 推荐挂载：`marsh_to_feather`、`mire_to_feather`、`market_to_feather`
- 三档神志文本：
  - `clear`：浅水中浮出龟甲，纹路像一截可过车的桥。
  - `uneasy`：龟甲自己转向，甲纹正对车轮。
  - `mad`：不是龟在水里，是路背着甲醒了。
- 选择：
  - 借甲过水
    - 资源结果：车轴 +5，粮草 -5，神志 -1
    - `effect`: `{ axle: 5, grain: -5, sanity: -1 }`
    - 短结果文案：龟甲托过车辙，水声在车后合拢。
  - 撬甲补轴
    - 资源结果：车轴 +7，神志 -4，获得 `xuan_shell`
    - `effect`: `{ axle: 7, grain: 0, sanity: -4, flag: "xuan_shell" }`
    - 短结果文案：甲片嵌进轮侧，纹路还在慢慢转。
  - 绕水慢行
    - 资源结果：粮草 -4，神志 +2
    - `effect`: `{ axle: 0, grain: -4, sanity: 2 }`
    - 短结果文案：你们避开浮甲，远路反而让人安心。

### 4. `zhu_bird_name_call`

- 标题：鴸鸟呼名
- 标签：`路遇` / `中风险抉择` `神志污染` `名字`
- 推荐挂载：`qingqiu_to_shrine`、`shrine_to_market`、`market_to_stele`
- 三档神志文本：
  - `clear`：赤喙鸟落在辕木上，叫声像在学随从姓名。
  - `uneasy`：它叫错一字，被叫的人却先回头。
  - `mad`：鸟没有叫。名字自己飞到辕木上，等你答应。
- 选择：
  - 不应声赶鸟
    - 资源结果：车轴 -2，神志 +4
    - `effect`: `{ axle: -2, grain: 0, sanity: 4 }`
    - 短结果文案：鸟影被赶走，辕木却裂出一道细纹。
  - 以假名答
    - 资源结果：神志 -3，获得 `false_name_echo`
    - `effect`: `{ axle: 0, grain: 0, sanity: -3, flag: "false_name_echo" }`
    - 短结果文案：假名被鸟叼走，真名暂时无事。
  - 记下鸟声
    - 资源结果：神志 -6，巫咸古辞 +10
    - `effect`: `{ axle: 0, grain: 0, sanity: -6, language: { wuxian: 10 } }`
    - 短结果文案：鸟声写成残笔，听久了像碑文。

### 5. `fox_lamp_tail`

- 标题：九尾灯影
- 标签：`路遇` / `低风险提醒` `青丘` `神志恢复`
- 推荐挂载：`central_to_qingqiu`、`qingqiu_to_road`、`qingqiu_to_shrine`
- 三档神志文本：
  - `clear`：岔路旁九点小灯排开，像狐尾拖在土上。
  - `uneasy`：灯不照路，只照车队的影子。
  - `mad`：九条尾巴绕住车轮，每一条都通向同一盏灯。
- 选择：
  - 挂灯行夜
    - 资源结果：粮草 -3，神志 +5
    - `effect`: `{ axle: 0, grain: -3, sanity: 5 }`
    - 短结果文案：狐灯挂上车头，夜色退后半步。
  - 剪影留路
    - 资源结果：车轴 -2，神志 -2，获得 `fox_tail_mark`
    - `effect`: `{ axle: -2, grain: 0, sanity: -2, flag: "fox_tail_mark" }`
    - 短结果文案：一截影子留在地上，指向狐灯外的小路。
  - 熄灯守名
    - 资源结果：粮草 -1，神志 +2
    - `effect`: `{ axle: 0, grain: -1, sanity: 2 }`
    - 短结果文案：灯灭之后，队里没人再报真名。

### 6. `black_teeth_scale_price`

- 标题：黑齿鳞价
- 标签：`路遇` / `中风险抉择` `黑齿` `交易`
- 推荐挂载：`pass_to_market`、`birdmouse_to_market`、`market_to_stele`
- 三档神志文本：
  - `clear`：路心摊着一片青鳞，黑齿商人只伸出三指。
  - `uneasy`：青鳞离水不干，价码却在鳞上游动。
  - `mad`：鳞是价，价是舌。黑齿一笑，明日少了一角。
- 选择：
  - 旧铁换粮
    - 资源结果：车轴 -3，粮草 +10
    - `effect`: `{ axle: -3, grain: 10, sanity: 0 }`
    - 短结果文案：旧铁离车，粮袋多了几日重量。
  - 粮换鳞引
    - 资源结果：粮草 -5，神志 -2，获得 `scale_price`
    - `effect`: `{ axle: 0, grain: -5, sanity: -2, flag: "scale_price" }`
    - 短结果文案：青鳞贴在地图边，自己游出一寸方向。
  - 不看价码
    - 资源结果：粮草 -2，神志 +3
    - `effect`: `{ axle: 0, grain: -2, sanity: 3 }`
    - 短结果文案：你们绕开摊位，身后笑声很快收住。

### 7. `ming_snake_crosswind`

- 标题：鸣蛇横风
- 标签：`路遇` / `高风险污染` `雷泽` `风声`
- 推荐挂载：`road_to_marsh`、`birdmouse_to_marsh`、`marsh_to_red`
- 三档神志文本：
  - `clear`：无风处忽起细鸣，一条蛇影横在车辙前。
  - `uneasy`：蛇鸣从车底钻出，辕马不肯踩过影子。
  - `mad`：风长出鳞。它横在路上，用你们的骨声作鸣。
- 选择：
  - 埋火等风停
    - 资源结果：粮草 -3，神志 +4
    - `effect`: `{ axle: 0, grain: -3, sanity: 4 }`
    - 短结果文案：火灰压住蛇鸣，车队等到风影变淡。
  - 趁鸣急过
    - 资源结果：车轴 -4，神志 -5
    - `effect`: `{ axle: -4, grain: 0, sanity: -5 }`
    - 短结果文案：车队冲过蛇影，轮声里多了一段细鸣。
  - 割绳引蛇
    - 资源结果：车轴 +3，粮草 -4，神志 -3
    - `effect`: `{ axle: 3, grain: -4, sanity: -3 }`
    - 短结果文案：旧绳被蛇影吞去，车架反而松出活路。

### 8. `bone_ox_rut`

- 标题：骨牛空辙
- 标签：`路遇` / `中风险抉择` `车轴补救` `赤水`
- 推荐挂载：`red_to_stele`、`red_to_dream`、`stele_to_dream`
- 三档神志文本：
  - `clear`：一头骨牛拉着空车，从侧路无声经过。
  - `uneasy`：空车无轮，却在土上压出深辙。
  - `mad`：骨牛没有头。它拉着你们尚未抵达的车。
- 选择：
  - 沿空辙借路
    - 资源结果：车轴 +4，神志 -5，获得 `bone_rut`
    - `effect`: `{ axle: 4, grain: 0, sanity: -5, flag: "bone_rut" }`
    - 短结果文案：空辙托住车轮，也把影子拖长了。
  - 折辙止影
    - 资源结果：车轴 -3，神志 +5
    - `effect`: `{ axle: -3, grain: 0, sanity: 5 }`
    - 短结果文案：你们铲断深辙，骨牛声停在远处。
  - 投粮换辙
    - 资源结果：车轴 +6，粮草 -5
    - `effect`: `{ axle: 6, grain: -5, sanity: 0 }`
    - 短结果文案：粮袋落地后，空车让出一条硬路。

### 9. `mirror_reed_bed`

- 标题：倒芦照人
- 标签：`路遇` / `低风险提醒` `泽地` `粮草补给`
- 推荐挂载：`shrine_to_marsh`、`thunder_to_mire`、`mire_to_red`
- 三档神志文本：
  - `clear`：芦苇倒生在水面下，穗上挂着可食的白籽。
  - `uneasy`：水下芦穗比岸上更密，倒影先伸手来摘。
  - `mad`：你们站在水下。岸上的人正弯腰收割你们。
- 选择：
  - 割倒芦籽
    - 资源结果：粮草 +7，神志 -3
    - `effect`: `{ axle: 0, grain: 7, sanity: -3 }`
    - 短结果文案：白籽入袋，倒影少了一只手。
  - 闭眼过芦
    - 资源结果：粮草 -2，神志 +4
    - `effect`: `{ axle: 0, grain: -2, sanity: 4 }`
    - 短结果文案：你们不看水面，芦影也不再追来。
  - 铺芦垫轮
    - 资源结果：车轴 +4，粮草 -4
    - `effect`: `{ axle: 4, grain: -4, sanity: 0 }`
    - 短结果文案：湿芦托住车轮，很快沉进泥下。

### 10. `dream_cicada_shell`

- 标题：梦蝉蜕壳
- 标签：`路遇` / `高风险污染` `梦图` `神志`
- 推荐挂载：`red_to_dream`、`stele_to_dream`、`feather_to_dream`
- 三档神志文本：
  - `clear`：枯树挂满蝉蜕，壳里有微弱车声。
  - `uneasy`：每只空壳都朝西，像替谁醒着。
  - `mad`：蝉把梦蜕下。你们还在壳里走路。
- 选择：
  - 束壳静心
    - 资源结果：粮草 -4，神志 +6
    - `effect`: `{ axle: 0, grain: -4, sanity: 6 }`
    - 短结果文案：蝉壳被绳束住，梦声也低了下去。
  - 垫壳护轴
    - 资源结果：车轴 +4，神志 -3
    - `effect`: `{ axle: 4, grain: 0, sanity: -3 }`
    - 短结果文案：空壳垫在轮下，碎响像一夜小梦。
  - 焚壳辨烟
    - 资源结果：粮草 -2，神志 -2，获得 `dream_smoke`
    - `effect`: `{ axle: 0, grain: -2, sanity: -2, flag: "dream_smoke" }`
    - 短结果文案：烟柱向纸背弯去，指出梦图前路。

## 2. 接入优先级建议

优先合入 8 个即可覆盖第一章前中后段：

1. 前半段低风险：`dang_kang_field_cry`、`fox_lamp_tail`
2. 泽地与渡水：`wenao_fish_rain`、`xuan_gui_shell_bridge`、`mirror_reed_bed`
3. 中高风险污染：`zhu_bird_name_call`、`ming_snake_crosswind`
4. 后段梦图/赤水：`bone_ox_rut`、`dream_cicada_shell`

`black_teeth_scale_price` 可作为黑齿市相关路线的交易替换件，若 C 线程本轮只要 8 个，可先放入备选。

## 3. 自检

- 数量：10 个草案，满足“至少 8 个”。
- 字段：每个都有 id 建议、标题、标签、三档神志文本、2-3 个选择、资源结果、短结果文案。
- 资源：每条至少改变车轴、粮草、神志或旗标之一；没有纯叙事空事件。
- 文本：事件正文短句化，避免长解释；异象集中在文鳐、当康、旋龟、鴸鸟、狐灯、黑齿、鸣蛇、骨牛、倒芦、梦蝉。
- 边界：未改代码，未引入现代解释，未写宣传文案。

## 4. 需要主线程决策的问题

1. `routeEvents` 是否允许保留 `tags` 数组？若暂不改代码，可只落 `tag: "路遇"`，把标签留在协作文档。
2. 新增 flag 是否接受：`wenao_trace`、`xuan_shell`、`false_name_echo`、`fox_tail_mark`、`scale_price`、`bone_rut`、`dream_smoke`。
3. 后段是否现在就接 `bone_ox_rut`、`dream_cicada_shell`，还是本轮只保证主线前半段有路遇。
