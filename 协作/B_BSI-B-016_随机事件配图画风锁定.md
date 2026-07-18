# B_BSI-B-016 随机事件配图画风锁定

> 子线程：B，山海经世界观与叙事主创  
> 任务：BSI-B-016  
> 目的：根据用户新增参考图，锁定随机事件插图的统一画风  
> 边界：只写风格规范，不生成图片，不修改 C 代码

## 0. 主参考图

![参考这个画风](/Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg)

文件：

```text
/Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg
```

## 1. 要学习的不是内容，而是画风结构

这张图的核心价值不是“车轮”本身，而是下面这套事件插图语言：

| 维度 | 应学习的点 |
| --- | --- |
| 画幅 | 近似 `4:3` 横向事件牌，不是全屏宽银幕。 |
| 装帧 | 黑褐布纹外框 + 细暗金内框，像古籍插图或桌游事件牌。 |
| 构图 | 左侧或前景放一个大主体，右侧/远景讲地点和后果。 |
| 叙事 | 一个瞬间讲清事件：异象、人物动作、资源道具、远方危险同时存在。 |
| 色彩 | 暗褐、旧纸黄、灰黑、木色为主，只用少量朱砂红和暗金线做异象。 |
| 线条 | 手绘墨线、旧版画感，边缘有磨损和纸纹，不要光滑数码感。 |
| 华丽度 | 华丽体现在细节、边框、纹理、祭器和暗金线，不是高饱和或强发光。 |
| 山海经感 | 异象要像古籍见闻：蛇线、巫文、赤水、旧碑、祭器、车队，不要现代怪物大片。 |

## 2. 统一风格提示词

后续每张随机事件图都应带上：

```text
horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.
```

负面提示词：

```text
full-screen cinematic poster, ultra-wide landscape only, bright fantasy RPG, colorful magic explosion, cute anime, clean digital painting, glossy 3D render, modern UI card, readable text, logo, watermark, sci-fi, neon, cyberpunk, modern city, western medieval armor, heroic combat, martial arts duel, flying swords, overdesigned monster, plastic texture.
```

## 2.1 画风不一致的修正规则

当前问题不是事件信息不够，而是每条提示语里的地点参考、正面词和情绪词太自由，模型会把每个事件当成不同项目来画。后续批量生图按下面规则收束：

1. 只把“主参考图”作为画风参考图。概念预告的图 A-D 只作为地点气氛参考，不建议和事件图一起上传给生图引擎，否则容易把画风拉散。
2. 每条事件都使用同一段 `Style lock prompt`，字面不要改。事件之间只替换 `Event image prompt`。
3. 生成参数尽量固定：同一模型、同一 4:3 比例、同一质量/风格化强度、同一参考图权重。若引擎支持 seed，可以先固定 seed 测 3 张；若构图过于重复，再只固定风格参考和参数，不固定 seed。
4. 每条事件的专属提示语控制在 1-2 句，只写“主体、动作、异象、地点后果”，不要再加入新的画风词，例如 anime、oil painting、watercolor、poster、cinematic、bright fantasy、high saturation。
5. 若引擎强制要求额外 `Positive prompt`，只补充事件物件和山海经意象，不补充新的美术风格；一键复制版默认不再保留独立 `Positive prompt`。
6. 先生成 3 张校准图：`鸣蛇入轴`、`黑齿影价`、`半截骨桥`。这三张分别覆盖车队近景、异族交易、高风险禁地；三张统一后，再批量跑 44 张。

推荐每条事件复制时采用这个顺序：

```text
Style reference image: /Users/yuanzhe/.codex/attachments/366ce679-5ae3-49d2-ae39-8f7fb176b1ed/参考这个画风_Event_image_prompt__Close_202606160949.jpeg

Style lock prompt: horizontal 4:3 framed event-card composition, ancient Chinese Shanhaijing event illustration, dark cloth outer border, thin aged-gold inner frame, aged parchment background, close foreground subject plus distant narrative background, hand-painted ink-and-mineral-pigment style, sepia, dark umber, charcoal black, weathered wood brown, restrained cinnabar red, dull antique gold linework, paper grain, worn edges, vignette, ritual bronze details, grounded ancient travelers, eerie but not flashy, ornate through texture and linework, no readable text.

Event image prompt: [只替换这里：一个事件瞬间，包含前景主体、中景人物动作、远景路线后果。]

Negative prompt: full-screen cinematic poster, ultra-wide landscape only, bright fantasy RPG, colorful magic explosion, cute anime, clean digital painting, glossy 3D render, modern UI card, readable text, logo, watermark, sci-fi, neon, cyberpunk, modern city, western medieval armor, heroic combat, martial arts duel, flying swords, overdesigned monster, plastic texture.
```

## 3. 和旧提示语的关系

- [B_BSI-B-013_第一章随机事件配图提示语.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-013_第一章随机事件配图提示语.md)：总览版，已同步为 4:3 装帧事件牌方向。
- [B_BSI-B-014_随机事件配图提示语一键复制版.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-014_随机事件配图提示语一键复制版.md)：一键复制版，已给每条事件加入本参考图路径和同一段 `Style lock prompt`。
- [B_BSI-B-015_随机事件弹窗配图尺寸与交互建议.md](/Users/yuanzhe/Documents/game/协作/B_BSI-B-015_随机事件弹窗配图尺寸与交互建议.md)：尺寸建议已改为 4:3 母图，紧凑弹窗不单独生成，缩略图安全裁 16:9。

## 4. 生成时的构图规则

1. 前景必须有一个大主体：车轮、粮袋、碑、手、祭器、骨桥、地图、鸟、草根等。
2. 中景放人物动作：跪拜、修车、交易、观察、封袋、点名、挖根。
3. 远景放路线后果：赤水、废关、雷泽、裂隙、远处车队、旧路。
4. 异象用暗金线或朱砂线表现，不能靠大面积发光。
5. 保留边框和旧纸感，图片本身要像一张可收藏的事件插图。
6. 中心 70% 是安全叙事区，便于后续做紧凑弹窗容器裁切或 16:9 缩略图。
