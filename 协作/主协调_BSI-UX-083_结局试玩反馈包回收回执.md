# 主协调 BSI-UX-083 结局试玩反馈包回收回执

日期：2026-06-24

## 1. 本轮目标

P0 机器验收已经通过，但完整目标仍缺真人 5 分钟试玩、音频听感和本局“志”复盘材料。上一版已有“复制复盘”，但测试者如果直接进入游戏，仍需要把复盘和主观反馈拼在一起。本轮在结局复盘弹窗中加入一键“复制反馈包”，让外部试玩者走完一局后可以直接交回可验收材料。

## 2. 已完成

- 新增 `getPlaytestFeedbackPackageText()`，生成完整 P0 试玩反馈包。
- 反馈包包含：
  - 试玩者、设备/浏览器、试玩时长。
  - 本局复盘。
  - 是否看懂下一步。
  - 车轴/粮草/神志资源压力。
  - 是否愿意再走一站。
  - 山海经/神秘九州感觉。
  - UI 网页感、拥挤或不好点。
  - 音乐、环境声、神志低落声音。
  - 是否第一眼知道可以打开声音。
  - 最想保留和最想马上改的一处。
- 结局复盘弹窗新增 `复制反馈包` 动作。
- 剪贴板可用时直接复制；剪贴板被浏览器拦截时，自动展开已选中的反馈包文本供手动复制。
- 缓存号更新到 `20260624-c163`。

## 3. 修改文件

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/index.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 4. 验收结果

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- 本地浏览器验证：
  - 进入 `?fresh=1&ending=rift&recap=1&verify=c163-feedback`。
  - 结局复盘弹窗显示四个动作：`复制复盘`、`复制反馈包`、`完整日志`、`重开一局`。
  - `复制反馈包` 按钮唯一存在。
  - 浏览器未放行剪贴板时，按钮变为 `文本已展开`。
  - 展开的 `storyModalCopyFallback` 含 `《不思异：九州》P0 试玩反馈包`、`【本局复盘】`、`【主观反馈】`、`第一眼是否知道可以打开声音`、`车轴/粮草/神志`。
  - 控制台无 error/warn。
- 线上验证：
  - 固定试玩入口仍为 <https://webdeploy-green.vercel.app/>。
  - 直接游戏页已引用 `styles.css?v=20260624-c163`、`app.js?v=20260624-c163`。
  - 线上 `app.js` 包含 `copy-feedback`、`《不思异：九州》P0 试玩反馈包`、`是否愿意再走一站`。

## 5. 线上部署

- Vercel 项目：`foxlaoys-projects/webdeploy`
- 部署 ID：`dpl_DQhv3BtW26nKAiHh9TkzGebxWkGV`
- 部署检查页：<https://vercel.com/foxlaoys-projects/webdeploy/DQhv3BtW26nKAiHh9TkzGebxWkGV>
- 生产别名：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`

## 6. 剩余风险

- 反馈包能降低人工回收成本，但不能替代真实试玩者判断；P0 仍需至少一份真人 5 分钟试玩材料。
- 音频素材仍是内部 Demo / 待复核状态，不能作为正式商用音频资产宣称。
