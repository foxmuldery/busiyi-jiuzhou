# C_BSI-C-015 路线与结局视觉接入回执

## 本轮目标

继续降低 Web Demo 的“网页文字感”，把已入库的可用图像资产接到路线选择、半途路遇、结局和失败状态中。

## 已完成

1. 路线卡新增目的地缩略图，复用 `stageAssets.locationIllustrations`。
2. 当前遭遇卡新增事件插图框：
   - 半途路遇显示目的地显影图。
   - 濒死危机显示对应失败状态图。
   - 正式结局显示对应结局插图。
   - 硬失败显示断轴 / 粮尽 / 神志崩坏对应失败图。
3. 数据层新增：
   - `stageAssets.endingIllustrations`
   - `stageAssets.failureIllustrations`
   - `state.failureType`
4. 小横屏界面压缩路线缩略图和事件插图高度，避免挤占操作区。

## 涉及文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`

## 验证

- `app.js` 语法检查通过。
- `data.js` 语法检查通过。
- `git diff --check` 通过。
- 视觉资源引用检查通过：共 22 个引用，路径均存在。

## 未做

1. 未接入待复核素材中的疑似含车队背景、白底污染层、裁切异常图。
2. 未主动打开 in-app browser 验证，原因是此前 `file://` 页面有卡死反馈。
3. 未加入视频资产，当前仍以图片 + CSS 假动态为主。

## 下一步建议

下一轮优先检查真实试玩反馈：

1. 路线卡缩略图是否过于占空间。
2. 事件插图是否应该默认只在结局 / 危机时显示，普通半途路遇是否保留。
3. 地图页路线卡是否还需要显示资源图标，而不是纯文字耗损。
