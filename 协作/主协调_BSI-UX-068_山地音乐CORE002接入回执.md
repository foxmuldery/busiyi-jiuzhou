# 主协调回执：BSI-UX-068 山地音乐 CORE-002 接入

日期：2026-06-24

## 1. 本轮目标

继续推进《不思异：九州》网页版试玩版的音乐完成度。

本轮选择一个低风险、可立即验证的音频缺口：

> `MUS-CORE-002_mountain_clouds` 已有低响度 WebDemo 预览文件，但此前没有映射到原型中的具体地点或地形。

## 2. 已完成接入

新增音频槽：

```text
audioAssets.musicMountain
```

对应素材：

```text
MUS-CORE-002_mountain_clouds_webdemo_-24lufs.mp3
```

用途：

```text
bird_mouse_pass / 鸟鼠夹道
```

玩家侧表现：

- 进入鸟鼠夹道 / 山腹细洞类地点时，顶部音乐芯片显示 `CORE-002`。
- 场景名显示为 `鸟鼠夹道`。
- 音乐标题显示为 `山岭云行 WebDemo 低响度预览`。
- 状态仍标记为 `待复核`，只用于内部试玩。

## 3. 音乐层次变化

接入后，第一章 WebDemo 已有 6 首音乐候选参与轮换：

| 音乐 | 当前用途 |
| --- | --- |
| `MUS-CORE-001` | 默认 / 古道 |
| `MUS-CORE-002` | 山岭 / 鸟鼠夹道 |
| `MUS-CORE-003` | 水泽 |
| `MUS-CORE-004` | 废关 / 边境 / 裂隙 |
| `MUS-CORE-005` | 神秘九州行旅 |
| `MUS-CORE-006` | 青丘 / 墟市 / 较安全边境 |

这使试玩版从“有背景音乐”进一步接近“不同地点有不同音乐气质”。

## 4. 台账同步

已同步：

- `GitHub资产区/06_音乐音效/00_音频台账/音频资产清单.md`
- `协作/F_BSI-F-024_下一轮音乐音效生成与验收清单.md`

关键边界：

- `MUS-CORE-002` 仍为 `review-pending / 待主观试听`。
- 授权仍为 `待确认生成工具与商用授权`。
- 不进入正式可用区，不宣称商用 cleared。

## 5. 自动验收

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
- 音频引用数量从 51 增至 52。
- 完整旅程仍可抵达九州裂隙。
- 试玩流程仍可完成。
- 图像素材仍为 59/59 ready。

## 6. 浏览器复验

测试地址：

```text
http://127.0.0.1:4182/GitHub资产区/03_WebDemo/prototype/index.html?fresh=1&captureLocation=bird_mouse_pass&verify=c154-mountain-music
```

浏览器读取结果：

```text
locationTitle: 鸟鼠夹道
musicId: CORE-002
musicScene: 鸟鼠夹道
musicAria: 当前音乐：MUS-CORE-002，鸟鼠夹道，未播放，待复核
musicTitle: 当前音乐：MUS-CORE-002 山岭云行 WebDemo 低响度预览
console: no error / warn
```

## 7. 下一步建议

下一步音乐方向建议：

1. 试听 `MUS-CORE-002` 在鸟鼠夹道是否过亮或过空。
2. 若合适，可继续把 `MUS-CORE-002` 扩展给更多山岭/高原路线。
3. 下一轮优先补 `AMB-TRAVEL-001` 旅途环境层，让“地图缓缓右走”的风、车架、远空声更明显。
