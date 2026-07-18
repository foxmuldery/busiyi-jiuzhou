# B组地点事件图投放说明

这里用于放置 D020 生成的地点图和地点事件图。图片放入后，Web Demo 会自动尝试加载；加载成功才替换旧插图，加载失败则继续使用现有可用素材。

## 覆盖范围

- 14 张地点图：`LOC-001` 到 `LOC-014`
- 14 张地点事件图：`EVT-001` 到 `EVT-014`

## 命名规则

命名必须与 D020 保持一致：

```text
LOC-序号_locationId_中文名.png
EVT-序号_eventId_中文名.png
```

例如：

```text
LOC-001_central_post_中原驿.png
LOC-014_kyushu_rift_九州裂隙.png
EVT-001_post_gate_驿门未闭.png
EVT-014_rift_dream_裂隙前梦.png
```

## 生成参考

完整提示语：

```text
/Users/yuanzhe/Documents/game/协作/D_BSI-D-020_事件地点全量配图与统一风格Prompt包.md
```

## 验收要点

- 16:9 横图。
- 背景图不要带完整车队。
- 不要文字、logo、水印或 UI。
- 地点图一眼能区分城镇、祭所、墟市、禁地、水泽、裂隙。
- 事件图一眼能看出事件主题。
- 小横屏中裁后主体仍可读。
