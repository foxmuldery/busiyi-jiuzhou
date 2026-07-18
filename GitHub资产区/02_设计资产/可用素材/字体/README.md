# 《不思异：九州》可用字体入库说明

> 入库日期：2026-06-14  
> 入库原则：商用免费、授权明确、古韵优先、正文清晰优先  
> 许可证：本批字体均按 SIL Open Font License 1.1 入库；不得单独出售字体文件。

## 1. 字体清单

| 字体文件 | 字体 | 来源 | 授权 | 建议用途 |
|---|---|---|---|---|
| `fonts/NotoSerifSC-wght.ttf` | Noto Serif SC / 思源宋体同源 | Google Fonts | SIL OFL 1.1 | 事件正文、地点描述、日志正文 |
| `fonts/NotoSansSC-wght.ttf` | Noto Sans SC / 思源黑体同源 | Google Fonts | SIL OFL 1.1 | 资源数字、按钮小字、移动端小字号 |
| `fonts/LXGWWenKai-Regular.ttf` | 霞鹜文楷 | LXGW GitHub | SIL OFL 1.1 | 异闻文本、批注、事件标题、轻度神志污染文本 |
| `fonts/ZCOOLXiaoWei-Regular.ttf` | 站酷小薇体 | Google Fonts | SIL OFL 1.1 | 地点名、章节标题、卡片标题 |
| `fonts/MaShanZheng-Regular.ttf` | 马善政毛笔楷体 | Google Fonts | SIL OFL 1.1 | 大标题、卷名、结局标题，少量使用 |
| `fonts/LongCang-Regular.ttf` | 龙藏体 | Google Fonts | SIL OFL 1.1 | 神谕、碑文感、低神志异象标题，少量使用 |

## 2. 推荐搭配

第一版 Web Demo 建议采用：

- 正文：`Noto Serif SC`
- UI 小字与数字：`Noto Sans SC`
- 地点名与事件标题：`ZCOOL XiaoWei`
- 异闻批注：`LXGW WenKai`
- 神谕或结局大字：`Ma Shan Zheng` 或 `Long Cang`

不要让毛笔体承担正文阅读。`Ma Shan Zheng` 和 `Long Cang` 只适合大字号、低频、强气氛文本。

## 3. Web Demo CSS 建议

```css
@font-face {
  font-family: "Noto Serif SC";
  src: url("./assets/fonts/NotoSerifSC-wght.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans SC";
  src: url("./assets/fonts/NotoSansSC-wght.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "LXGW WenKai";
  src: url("./assets/fonts/LXGWWenKai-Regular.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "ZCOOL XiaoWei";
  src: url("./assets/fonts/ZCOOLXiaoWei-Regular.ttf") format("truetype");
  font-display: swap;
}
```

## 4. 授权与使用边界

- 可以随 Web Demo、游戏软件、网页和宣传物料一起使用与分发。
- 可以嵌入网页、应用、导出图片和视频。
- 不要单独售卖字体文件。
- 若修改字体文件或制作衍生字体，需继续遵守 SIL OFL，并注意保留名称限制。
- 若商业发行前需要正式合规证明，应由 E 线程或法务再做一次授权复核。

## 5. 来源记录

| 字体 | 下载来源 |
|---|---|
| Noto Serif SC | `https://github.com/google/fonts/tree/main/ofl/notoserifsc` |
| Noto Sans SC | `https://github.com/google/fonts/tree/main/ofl/notosanssc` |
| LXGW WenKai | `https://github.com/lxgw/LxgwWenKai` |
| ZCOOL XiaoWei | `https://github.com/google/fonts/tree/main/ofl/zcoolxiaowei` |
| Ma Shan Zheng | `https://github.com/google/fonts/tree/main/ofl/mashanzheng` |
| Long Cang | `https://github.com/google/fonts/tree/main/ofl/longcang` |

许可证文本保存在 `licenses/` 目录。
