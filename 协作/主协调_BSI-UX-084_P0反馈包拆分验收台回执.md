# 主协调 BSI-UX-084 P0 反馈包拆分验收台回执

日期：2026-06-24

## 1. 本轮目标

上一轮游戏结局复盘弹窗已能复制 `《不思异：九州》P0 试玩反馈包`。但 P0 真人试玩验收台仍按三段材料粘贴：`5分钟试玩记录`、`音频听感复核`、游戏内“志”本局复盘。为了减少主线程拆材料成本，本轮给验收台增加“拆入三栏”能力。

## 2. 已完成

- `P0真人试玩验收工作台.html` 新增 `拆入三栏` 按钮。
- 支持把游戏结局复制出的整段 `P0 试玩反馈包` 粘贴到任意一栏。
- 点击后自动拆成：
  - `5分钟试玩记录`：保留头部、主观反馈、机器摘要。
  - `音频听感复核`：提取主观反馈中包含音乐、声音、神志层的问题。
  - `游戏内“志”本局复盘`：提取 `【本局复盘】` 段落。
- 拆分后自动刷新三段材料回收状态、反馈证据雷达和验收摘要。
- 若未找到反馈包，按钮下方提示先粘贴整段反馈包。

## 3. 修改文件

- `GitHub资产区/03_WebDemo/prototype/P0真人试玩验收工作台.html`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 4. 验收结果

- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js`：`P0 机器验收通过，待真人确认；机器验收 6/6；待人工 2；需处理 0`。
- 本地浏览器验证：
  - 打开 `P0真人试玩验收工作台.html?verify=split-package`。
  - 页面标题为 `不思异：九州 P0 真人试玩验收工作台`。
  - `拆入三栏` 按钮唯一存在。
  - 将模拟 `P0 试玩反馈包` 粘贴到 `5分钟试玩记录` 栏后点击拆分。
  - 状态提示变为 `已拆入三栏：试玩记录、音频听感、本局复盘。`
  - 三段材料均显示 `已收`。
  - 五类反馈证据均命中：下一步、复盘、资源、UI、声音。
  - 验收摘要包含 `材料缺口：无`。
  - 控制台无 error/warn。
- 线上验证：
  - 固定试玩入口仍为 <https://webdeploy-green.vercel.app/>。
  - 线上 P0 真人试玩验收台包含 `拆入三栏`、`splitFeedbackPackageIntoFields`、`《不思异：九州》P0 试玩反馈包`、`已拆入三栏：试玩记录、音频听感、本局复盘`。

## 5. 线上部署

- Vercel 项目：`foxlaoys-projects/webdeploy`
- 部署 ID：`dpl_YpZaySZ3tjCLuCfPvRpNioutAezw`
- 部署检查页：<https://vercel.com/foxlaoys-projects/webdeploy/YpZaySZ3tjCLuCfPvRpNioutAezw>
- 生产别名：<https://webdeploy-green.vercel.app/>
- 试玩密码：`tusun2026`

## 6. 剩余风险

- 拆包只能降低整理成本，不能替代真人试玩判断。
- P0 仍需至少一份真实玩家材料，主线程才能最终确认是否达到完整试玩版目标。
