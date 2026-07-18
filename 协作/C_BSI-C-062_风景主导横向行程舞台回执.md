# C_BSI-C-062 风景主导横向行程舞台回执

## 目标

回应主线程最新判断：如果小车与地面不搭，第一版宁可弱化车队，把横向行程改成“风景缓缓往右走”的中地图体验。

## 已完成

1. `stageAssets.profiles.default` 新增 `travelMode: "scenery"`，默认舞台从“车队主导”改为“风景主导”。
2. 行进时不再让车队大幅横穿画面，主要由背景长图、前景层、风沙云雾层承担推进感。
3. 车队层 `CAR-013` 保留为可回退素材，但当前只作为很淡的小型远行标记。
4. 风景层新增常态慢漂移 `sceneryDrift`，不点路线时也有轻微活气。
5. 行进态背景层左右扩展，避免横向移动时露出暗边。
6. `qa-check.js` 更新为检查“风景优先模式”和“车队回退素材保留”。
7. `README.md` 已更新当前边界说明。

## 修改文件

- [data.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/data.js)
- [app.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js)
- [styles.css](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css)
- [index.html](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html)
- [qa-check.js](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js)
- [README.md](/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md)

## 验证

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js`
- `git diff --check -- GitHub资产区/03_WebDemo/prototype/index.html GitHub资产区/03_WebDemo/prototype/data.js GitHub资产区/03_WebDemo/prototype/app.js GitHub资产区/03_WebDemo/prototype/styles.css GitHub资产区/03_WebDemo/prototype/qa-check.js GitHub资产区/03_WebDemo/prototype/README.md`

全部通过。

## 浏览器复验

使用本地预览地址：

- `http://127.0.0.1:8787/03_WebDemo/prototype/index.html`

小横屏 `844 x 390` 复验结果：

- 首屏能渲染，标题为《不思异：九州 Web Demo 原型》。
- `#journeyStage` 带有 `scenery-first` 与 `travelMode = scenery`。
- 背景层启用 `sceneryDrift`。
- 点击地图路线后，舞台进入 `traveling`，背景位移为主要运动。
- 车队图层宽约 `112px`，图像透明度 `0.16`，不再成为主视觉。
- 页面无横向溢出。
- 控制台无 error / warn。

## 后续建议

下一步接 D 线程的新图时，优先替换 4 类横向路段中地图背景：古道、墟市、水泽、裂隙。车队层暂时不作为 P0 重点。
