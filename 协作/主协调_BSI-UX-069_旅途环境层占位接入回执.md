# 主协调回执：BSI-UX-069 旅途环境层占位接入

日期：2026-06-24

## 1. 本轮目标

继续推进《不思异：九州》网页版试玩版的音乐与声场完成度。

本轮处理 `F_BSI-F-024` 中的 P0 缺口：

> 横向旅途画面已有音乐与 UI 音，但缺少风、车架、远空感的旅途环境层。

## 2. 已生成内部占位素材

新增文件：

```text
GitHub资产区/06_音乐音效/04_待复核素材/程序生成占位音效/AMB-TRAVEL-001_travel_air_wood_frame_placeholder_loop.mp3
```

规格：

- 时长：48 秒。
- 格式：MP3。
- 大小：约 751K。
- 生成方式：ffmpeg 程序合成。
- 声音意图：低风噪、低频空气感、极轻车架/木质底层暗示。

重要边界：

- 这是 `demo-temporary` 内部试玩占位。
- 不进入正式可用区。
- 不代表最终音乐音效质量。
- 后续仍应替换为真实或更高质量生成的风声、车架、远空环境层。

## 3. 已接入 Web Demo

新增音频槽：

```text
audioAssets.travelAmbience
```

配置：

```text
id: AMB-TRAVEL-001-SYN
type: ambience
loop: true
volume: 0.045
status: demo-temporary
```

播放逻辑：

- 开启音乐后，`travelAmbience` 作为常驻低音量循环层播放。
- 关闭音乐或页面隐藏时，会跟随循环音频一起暂停。
- 不进入音乐试听列表，避免和主音乐候选混在一起。

## 4. UI 显示

设置页音频详情已新增：

```text
环境层：1 层
```

这样测试者能确认环境层确实接入，而不是被埋在交互音效数量里。

## 5. 台账同步

已更新：

- `GitHub资产区/06_音乐音效/00_音频台账/音频资产清单.md`
- `协作/F_BSI-F-024_下一轮音乐音效生成与验收清单.md`

## 6. 自动验收

已通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

结果：

- 原型 QA 全部通过。
- 音频引用数量增至 53。
- 新增 `travel ambience layer configured` 合约通过。
- 完整旅程仍可抵达九州裂隙。
- 试玩流程仍可完成。
- 图像素材仍为 59/59 ready。

## 7. 浏览器复验

测试地址：

```text
http://127.0.0.1:4182/GitHub资产区/03_WebDemo/prototype/index.html?fresh=1&drawer=settings&verify=c155-ambience
```

读取结果：

```text
音频详情：
当前：CORE-001 · 地形：旅途 / 古道 · 待复核；试听：跟随旅途
轮换：古道 · 6 首；地点：随地形；神志层：2 层；环境层：1 层；地图音：已启用；交互音效：8 个

控制台：
no error / warn
```

## 8. 下一步建议

下一轮音频方向：

1. 让用户试听 `AMB-TRAVEL-001-SYN` 是否过暗、过噪或可接受为内部试玩占位。
2. 若可接受，继续保留到下一批真实环境声到位。
3. 若不接受，按 `F_BSI-F-024` 的 `AMB-TRAVEL-001` 提示语重新生成真实风声/车架环境层。
4. 后续可继续补 `MAP-OPEN-001 / CITY-ARRIVE-001 / RESOURCE-DOWN-001` 的自然材质版，替换程序占位音效。
