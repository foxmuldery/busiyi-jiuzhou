# D_BSI-D-031 动画素材紧急生成 Prompt 包

> 项目：《不思异：九州》Web Demo  
> 日期：2026-06-21  
> 用途：用户积分即将过期时，优先生成后续一定用得上的短动画素材。  
> 规则：视频只做氛围层、遮罩层、转场层，不承载路线、文字、资源数值和选项后果。

## 0. 今天先生成什么

优先级从高到低：

1. A 组：舞台氛围循环，最通用，生成失败也不影响玩法。
2. B 组：地图/弹窗/神志叠层，最能提升“交互有过程”的感觉。
3. C 组：短转场和结局氛围，后续可用于截图、演示、结算页。

不要写“无限循环”。统一写：

```text
6 seconds, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.
```

通用负面词：

```text
No text, no UI, no subtitles, no logo, no watermark, no modern objects, no modern city, no modern vehicle, no sci-fi VFX, no neon portal, no western fantasy, no anime, no 3D render, no photorealistic camera shake, no fast camera movement, no cuts, no zoom, no dramatic explosion, no characters facing camera, no full caravan baked into the background.
```

参考图建议：

- `REF-01` 共同风格：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-030_同事复制粘贴包/参考图/REF-01_共同风格_横向山海旅途舞台.png`
- `REF-02` 废关古道：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-030_同事复制粘贴包/参考图/REF-02_废关古道_残关路面.png`
- `REF-03` 雷泽赤水：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-030_同事复制粘贴包/参考图/REF-03_雷泽赤水_水岸湿地.png`
- `REF-04` 归墟裂隙：`/Users/yuanzhe/Documents/game/协作/D_BSI-D-030_同事复制粘贴包/参考图/REF-04_归墟裂隙_暗水终点.png`

## A 组：横向旅途舞台氛围循环

### A01 `VID-ATM-CLOUD-001_古道低云横移.mp4`

```text
上传参考图：REF-01、REF-02。
文件名：VID-ATM-CLOUD-001_古道低云横移.mp4
规格：6 seconds, 16:9 or 3:1 if available, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.

中国古代神秘九州，山海荒原水墨长卷，旧帛书纹理，工笔线稿，水墨线描与矿物颜料，低饱和土黄、灰青、赭红、墨黑、旧金。古道荒原上低云和薄雾从右向左缓慢漂移，远山几乎不动，前景荒草轻微摆动。画面安静、古老、克制，适合叠在横向旅途舞台背景上。

No text, no UI, no subtitles, no logo, no watermark, no modern objects, no modern city, no modern vehicle, no sci-fi VFX, no neon portal, no western fantasy, no anime, no 3D render, no fast camera movement, no cuts, no zoom, no explosion, no full caravan baked into the background.
```

### A02 `VID-ATM-DUST-001_废关风沙薄层.mp4`

```text
上传参考图：REF-02。
文件名：VID-ATM-DUST-001_废关风沙薄层.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.

中国古代神秘九州，废关古道，旧帛书纹理，矿物颜料低饱和色。残关门前有极薄风沙贴地流动，破旗轻微动一下，尘土从画面下方斜向飘过，远处关墙保持稳定。动作要非常小，像静图活了一点点。

No text, no UI, no readable characters, no logo, no watermark, no modern objects, no modern road, no sci-fi, no western fantasy, no anime, no 3D render, no fast windstorm, no camera movement, no full caravan.
```

### A03 `VID-ATM-WATER-001_雷泽浅水微波.mp4`

```text
上传参考图：REF-03。
文件名：VID-ATM-WATER-001_雷泽浅水微波.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.

中国古代神秘九州，雷泽赤水湿地，旧帛书纹理与水墨矿物色。浅水表面出现很慢的微波，泥泡偶尔轻轻鼓起，水草微动，远处红水岸和灰青山影保持稳定。整体安静、不血腥、不夸张，适合水泽场景氛围层。

No text, no UI, no watermark, no modern bridge, no modern object, no sci-fi water effect, no neon, no fantasy magic, no anime, no 3D, no fast camera movement, no big splash, no full caravan.
```

### A04 `VID-ATM-RIFT-001_归墟暗水呼吸.mp4`

```text
上传参考图：REF-04。
文件名：VID-ATM-RIFT-001_归墟暗水呼吸.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.

中国古代神秘九州，归墟边缘，旧帛书山海图质感。暗水裂隙边缘轻微起伏，像在很慢地呼吸；远山重影略微错位又回到原处；天空第二月淡淡闪一下。动作克制，不要科幻传送门，不要强光。

No text, no UI, no watermark, no neon portal, no sci-fi crack, no laser, no explosion, no modern object, no western fantasy, no anime, no 3D render, no fast camera movement, no full caravan.
```

### A05 `VID-ATM-DAYNIGHT-001_古道日暮光线变化.mp4`

```text
上传参考图：REF-01。
文件名：VID-ATM-DAYNIGHT-001_古道日暮光线变化.mp4
规格：6 seconds, 16:9, fixed camera, very slow light change, start and end frames should look similar enough for crossfade looping.

中国古代神秘九州，横向旅途舞台，旧帛书纹理，低饱和矿物色。古道荒原从灰黄日光缓慢变成偏暗赭色暮光，云层轻微移动，远山和路面保持稳定。不要明显日落大太阳，只要微妙的天色变化，用于时间流逝氛围。

No text, no UI, no watermark, no modern object, no cinematic lens flare, no photorealistic sunset, no neon, no sci-fi, no western fantasy, no anime, no 3D render, no camera movement, no full caravan.
```

### A06 `VID-ATM-FOG-001_纸雾墨晕漂移.mp4`

```text
上传参考图：REF-01。
文件名：VID-ATM-FOG-001_纸雾墨晕漂移.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, suitable for crossfade looping.

旧帛书纹理上的纸雾和淡墨晕缓慢漂移，像地图纸面起雾。画面以半透明灰白雾、淡墨痕、少量赭色颗粒为主，背景尽量简单干净，方便后期叠加到地图或弹窗。动作很慢，不要形成具体人物或文字。

No text, no UI, no logo, no watermark, no characters, no readable symbols, no modern objects, no sci-fi, no neon, no fast motion, no camera movement, no hard black frame.
```

## B 组：地图、弹窗、神志污染叠层

### B01 `VID-OV-SANITY-001_轻度神志污染_墨线漂移.mp4`

```text
上传参考图：REF-04。
文件名：VID-OV-SANITY-001_轻度神志污染_墨线漂移.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, black or dark paper background, suitable for screen/add blending.

中国古代神秘九州，低神志视觉叠层。旧地图上的墨线和道路痕迹轻微漂移，影子慢慢错开又靠近，像玩家开始看不准路。画面整体很暗，只有灰白墨线、暗红朱砂痕、少量旧金颗粒，适合低透明度叠在游戏画面上。不要出现可读文字。

No text, no UI, no subtitles, no logo, no watermark, no horror face, no gore, no modern object, no sci-fi glitch, no digital glitch, no neon, no anime, no 3D render, no fast movement, no camera shake.
```

### B02 `VID-OV-SANITY-002_重度神志污染_幻路重复.mp4`

```text
上传参考图：REF-04。
文件名：VID-OV-SANITY-002_重度神志污染_幻路重复.mp4
规格：6 seconds, 16:9, fixed camera, very slow movement, start and end frames should look similar, black or dark paper background, suitable for screen/add blending.

中国古代神秘九州，重度神志污染叠层。几条旧帛书道路影子重复出现，向不同方向慢慢偏移，暗红朱砂小裂纹轻微闪动，远处山影像眼睛一样错位但不要画成恐怖脸。压迫、克制、低透明叠层感。

No text, no UI, no watermark, no horror face, no gore, no monster, no modern digital glitch, no sci-fi, no neon, no western fantasy, no anime, no 3D render, no fast camera, no explosion.
```

### B03 `VID-MAP-REVEAL-001_九州图雾散显影.mp4`

```text
上传参考图：REF-01。
文件名：VID-MAP-REVEAL-001_九州图雾散显影.mp4
规格：4 seconds, 16:9, fixed camera, one-shot reveal, no loop required.

旧帛书九州图表面，纸雾和淡墨从中心慢慢退开，露出模糊山川线条和淡朱砂路线痕迹，但不要出现可读文字、不要 UI 节点。适合地图打开或地点显影时作为覆盖转场。动作平稳、古老、克制。

No readable text, no UI, no map pins, no buttons, no logo, no watermark, no modern map style, no satellite view, no sci-fi, no neon, no anime, no 3D render, no fast camera movement.
```

### B04 `VID-POPUP-IN-001_事件弹窗纸尘入场.mp4`

```text
上传参考图：REF-01。
文件名：VID-POPUP-IN-001_事件弹窗纸尘入场.mp4
规格：3 seconds, 4:3 or 1:1, fixed camera, one-shot transition, no loop required.

旧帛书纸面、淡墨、少量朱砂尘粒从四周轻轻聚拢，中间逐渐变清，像事件弹窗的图像即将显现。不要出现任何边框、按钮、文字，只做可叠加在弹窗图上的纸尘入场动画。古老、克制、干净。

No text, no UI, no button, no frame design, no logo, no watermark, no modern object, no sci-fi, no neon, no anime, no 3D render, no fast zoom, no camera shake.
```

### B05 `VID-RES-GAIN-001_资源获得_旧金尘粒.mp4`

```text
不需要上传参考图。
文件名：VID-RES-GAIN-001_资源获得_旧金尘粒.mp4
规格：2 seconds, 1:1, pure black background, fixed camera, one-shot, no loop required.

适合 UI 资源增加时叠加的小动画：少量旧金色尘粒和淡朱砂微点从下方向上轻轻散开，像古纸上的金粉被吹起。背景纯黑，方便 screen/add 混合；动作短、轻、克制，不遮挡数字。

No text, no numbers, no UI panel, no logo, no watermark, no modern sparkle, no neon, no 3D particles, no explosion, no fast motion, no camera movement.
```

### B06 `VID-RES-LOSS-001_资源损耗_墨尘下坠.mp4`

```text
不需要上传参考图。
文件名：VID-RES-LOSS-001_资源损耗_墨尘下坠.mp4
规格：2 seconds, 1:1, pure black background, fixed camera, one-shot, no loop required.

适合 UI 资源下降时叠加的小动画：少量墨黑尘粒、灰褐纸屑和暗红裂纹微光向下沉落，像古纸被轻轻磨损。背景纯黑，方便 screen/add 混合；动作短、轻、克制，不遮挡数字。

No text, no numbers, no UI panel, no logo, no watermark, no modern sparkle, no neon, no 3D particles, no explosion, no blood, no fast motion, no camera movement.
```

## C 组：路线转场、危机、结局氛围

### C01 `VID-TRANS-ROAD-001_路线选择_风沙掠过.mp4`

```text
上传参考图：REF-01、REF-02。
文件名：VID-TRANS-ROAD-001_路线选择_风沙掠过.mp4
规格：3 seconds, 16:9, fixed camera, one-shot transition, no loop required.

中国古代神秘九州，古道荒原。玩家确认路线后，一层薄风沙从左下向右上掠过，车辙和残草短暂变模糊，然后画面恢复清晰。用于路线切换转场。不要出现车队，不要出现 UI 或文字。

No text, no UI, no logo, no watermark, no full caravan, no modern object, no sci-fi, no neon, no western fantasy, no anime, no 3D render, no fast camera movement, no hard cut.
```

### C02 `VID-TRANS-WATER-001_涉水转场_水雾掠过.mp4`

```text
上传参考图：REF-03。
文件名：VID-TRANS-WATER-001_涉水转场_水雾掠过.mp4
规格：3 seconds, 16:9, fixed camera, one-shot transition, no loop required.

中国古代神秘九州，雷泽赤水湿地。浅水雾和细小水纹从画面下方向上漫过，短暂遮住路面，然后退开，像车队经过水泽但不直接画车队。用于进入水泽路段或水泽事件转场。

No text, no UI, no watermark, no modern bridge, no modern object, no sci-fi water effect, no neon, no anime, no 3D render, no big splash, no camera movement, no full caravan.
```

### C03 `VID-CRISIS-AXLE-001_断轴危机_裂纹微动.mp4`

```text
不需要上传参考图。
文件名：VID-CRISIS-AXLE-001_断轴危机_裂纹微动.mp4
规格：3 seconds, 1:1 or 4:3, fixed camera, one-shot warning, no loop required.

古代木制车轴局部特写，旧木、铜钉、麻绳，水墨矿物色质感。木轴裂纹轻微扩大，几粒木屑落下，暗金尘粒一闪即灭。适合车轴告急弹窗或资源卡警示，不要画完整车队。

No text, no UI, no numbers, no logo, no watermark, no modern wheel, no rubber tire, no 3D render, no photorealistic macro, no explosion, no fast camera, no full caravan.
```

### C04 `VID-CRISIS-GRAIN-001_粮尽危机_空袋落粒.mp4`

```text
不需要上传参考图。
文件名：VID-CRISIS-GRAIN-001_粮尽危机_空袋落粒.mp4
规格：3 seconds, 1:1 or 4:3, fixed camera, one-shot warning, no loop required.

旧布粮袋局部特写，低饱和旧帛书质感。粮袋口轻轻塌下，只有几粒粟米慢慢滚出，灰褐尘土落下。适合粮草告急弹窗或资源卡警示。画面克制，不要饥荒人物。

No text, no UI, no numbers, no logo, no watermark, no modern sack, no plastic, no 3D render, no photorealistic macro, no gore, no fast camera movement.
```

### C05 `VID-END-RIFT-001_入裂隙结局_暗水开合.mp4`

```text
上传参考图：REF-04。
文件名：VID-END-RIFT-001_入裂隙结局_暗水开合.mp4
规格：6 seconds, 16:9, fixed camera, slow one-shot ending atmosphere, no loop required.

中国古代神秘九州，归墟裂隙结局氛围。古道尽头的暗水裂隙缓慢开合一次，旧帛书般的山河线条在裂隙里轻轻浮现，远山重影偏移。可以非常远地有一点点队伍尺度剪影，但不要完整车队，不要作为主体。

No text, no UI, no logo, no watermark, no neon portal, no sci-fi, no laser, no explosion, no western fantasy, no anime, no 3D render, no fast camera, no full caravan.
```

### C06 `VID-END-LOST-001_迷失结局_雾吞旧路.mp4`

```text
上传参考图：REF-01。
文件名：VID-END-LOST-001_迷失结局_雾吞旧路.mp4
规格：6 seconds, 16:9, fixed camera, slow one-shot ending atmosphere, no loop required.

中国古代神秘九州，迷失失败结局氛围。荒路上的断裂车辙、空粮袋、残图边缘被灰雾慢慢吞没，远山和道路一点点看不清。画面安静、荒凉、不血腥，像旅途被世界擦掉。

No text, no UI, no logo, no watermark, no corpses, no gore, no modern object, no sci-fi, no neon, no western fantasy, no anime, no 3D render, no fast camera movement, no full caravan.
```

## 4. 如果时间只够很少，先跑这 8 个

1. `VID-ATM-CLOUD-001_古道低云横移.mp4`
2. `VID-ATM-DUST-001_废关风沙薄层.mp4`
3. `VID-ATM-WATER-001_雷泽浅水微波.mp4`
4. `VID-ATM-RIFT-001_归墟暗水呼吸.mp4`
5. `VID-OV-SANITY-001_轻度神志污染_墨线漂移.mp4`
6. `VID-OV-SANITY-002_重度神志污染_幻路重复.mp4`
7. `VID-MAP-REVEAL-001_九州图雾散显影.mp4`
8. `VID-TRANS-ROAD-001_路线选择_风沙掠过.mp4`

## 5. 入库备注

- 这些都只标记为 `internal-web-demo-candidate`。
- 不进入宣传素材，不声明正式商用。
- 视频失败时保留静帧首帧，也能当占位图用。
- C 线程接入时优先压成 `mp4/webm`，并保留静态 fallback。
