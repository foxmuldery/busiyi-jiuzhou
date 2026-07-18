# C组路遇危机结局图投放说明

这里用于放置 D020 生成的半途路遇、随机路遇、危机和结局图。图片放入后，Web Demo 会自动尝试加载；加载成功才替换旧插图，加载失败则继续使用现有可用素材。

## 覆盖范围

- 13 张固定半途路遇：`RTE-001` 到 `RTE-013`
- 8 张随机半途路遇：`RND-001` 到 `RND-008`
- 3 张危机图：`CRS-001` 到 `CRS-003`
- 3 张结局图：`END-001` 到 `END-003`

## 命名规则

命名必须与 D020 保持一致：

```text
RTE-序号_routeEventId_中文名.png
RND-序号_randomEventId去掉rnd前缀_中文名.png
CRS-序号_resourceId_中文名.png
END-序号_endingId_中文名.png
```

例如：

```text
RTE-001_wheel_omen_轮声入骨.png
RTE-013_dream_cicada_shell_梦蝉蜕壳.png
RND-001_loose_axle_song_鸣蛇入轴.png
RND-008_breathing_map_烛龙息图.png
CRS-001_axle_断轴边缘.png
CRS-003_sanity_神志崩线.png
END-001_rift_入裂隙.png
END-002_return_归中原.png
END-003_lost_stranded_迷失九州_旅途断绝.png
```

## 生成参考

完整提示语：

```text
/Users/yuanzhe/Documents/game/协作/D_BSI-D-020_事件地点全量配图与统一风格Prompt包.md
```

## 验收要点

- 16:9 横图。
- 不要文字、logo、水印或 UI。
- 路遇图静帧就能看懂异象主题。
- 危机图要分别对应断轴、粮尽、神志崩线，不要混成同一种失败感。
- 结局图要有仪式感，但不要科幻传送门或强光爆炸。
- 小横屏中裁后主体仍可读。
