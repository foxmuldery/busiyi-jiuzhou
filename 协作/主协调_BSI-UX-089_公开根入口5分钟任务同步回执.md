# 主协调 BSI-UX-089 公开根入口 5 分钟任务同步回执

日期：2026-06-24

## 1. 本轮目标

按用户最新确认，将公开试玩密码维持为 `tusun2026`，并确保直接分享固定公开入口时，测试者可以在根页复制 5 分钟试玩任务，不必先进入内部 `试玩入口.html`。

## 2. 已完成

- `build-webdeploy-package.js` 已把公开根页同步为双按钮：
  - `复制 5 分钟任务`
  - `复制听音任务`
  - `复制反馈模板`
- 根页 5 分钟任务包含：
  - 试玩链接：<https://webdeploy-green.vercel.app/play>
  - 试玩密码：`tusun2026`
  - 横屏打开、试玩 5 分钟。
  - 遭遇、补给、开图、选路、半途路遇、结局反馈包等试玩目标。
  - 走到结局后优先回传“复盘本局”里的 `复制反馈包`。
  - 未走到结局时，再用入口反馈模板和游戏内“志”的本局复盘兜底。
- `qa-check.js` 新增公开根入口守门项，防止后续打包时丢失 5 分钟任务、密码和反馈包回收指引。
- `README.md` 已同步说明：优先把根页的 5 分钟任务发给外部测试者。

## 3. 验收结果

- 密码哈希复核：`tusun2026` 对应 `019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa`，与网页密码门一致。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：全部通过。
- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js`：`P0 机器验收通过，待真人确认；机器验收 6/6；待人工 2；需处理 0`。
- `node GitHub资产区/03_WebDemo/prototype/build-webdeploy-package.js`：已重新生成 `output/webdeploy`。
- 已部署到 Vercel 生产环境：
  - 最新部署：`dpl_HJ7UwPQRCrJgi4kEmmNtfY8bTHut`
  - 固定试玩入口：<https://webdeploy-green.vercel.app/>
  - 直接进入干净新局：<https://webdeploy-green.vercel.app/play>
- 线上抽检通过：
  - 根入口返回 200，包含 `复制 5 分钟任务`、`复制听音任务`、`《不思异：九州》5 分钟试玩任务`、`试玩密码：tusun2026`、`复制反馈模板`。
  - `/play` 返回 200，包含密码门脚本和正确密码哈希。
  - `playtest-auth.js` 返回 200，包含正确/错误密码提示。
  - 三个线上响应均带 `X-Robots-Tag: noindex`。

## 4. 当前判断

公开入口现在可以直接发给测试者，密码为 `tusun2026`。这一步只完成“可外发入口与密码口径”的同步；P0 总状态仍是机器验收通过、待真人确认，仍需回收真实 5 分钟试玩反馈和音频听感判断。
