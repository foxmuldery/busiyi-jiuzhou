# BSI-UX-106 试玩密码门与 5 分钟提醒收口回执

日期：2026-06-25

## 结论

已按主线程要求确认并发布公开试玩密码：

- 公开试玩入口：`https://webdeploy-green.vercel.app/`
- 试玩密码：`tusun2026`
- 最新生产部署：`dpl_8JmsVW2UVe5TNA2BuBm5aZxm79wJ`

## 本轮完成

1. 核对 `tusun2026` 的 SHA-256 哈希，确认与线上密码门哈希一致：`019be397cf10ba2e242d7507db0852b1dcab423c62bd150024ef1333a68136aa`。
2. 将“游戏内 5 分钟提醒”纳入 P0 总验收的“测试者交付入口”证据。
3. 重新生成 `output/webdeploy` 发布包并部署到 Vercel 生产环境。

## 验收证据

- `node GitHub资产区/03_WebDemo/prototype/p0-readiness-check.js --write-report`：通过，P0 机器验收 `9/9`，待人工 `2`，需处理 `0`。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- 线上冒烟：`10/10` 页面通过，阻断项 `0`。
- 线上根入口抽检：包含 `BSI_PLAYTEST_AUTH` 与密码门哈希。
- 线上 P0 状态抽检：`password` 为 `tusun2026`，机器验收 `9/9`。

## 仍需人工确认

机器验收已通过，但 P0 仍未最终完成：还需要回收真实玩家 5 分钟试玩反馈，以及音频主观听感反馈。
