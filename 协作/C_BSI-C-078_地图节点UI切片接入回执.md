# C_BSI-C-078 地图节点 UI 切片接入回执

- 任务编号：BSI-C-078
- 子线程：C 技术原型与工具链
- 日期：2026-06-19
- 目标：把战略九州图里的地图节点从纯 CSS 圆点，推进为可复用的 UI 切片标识，减少网页感，增强横屏手游界面的资产感。

## 本轮完成

1. 生成了地图节点切片的透明处理副本，原图保留不覆盖。
   - 目录：`/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/`
   - 已生成：
     - `P1_map_pin_red_01_keyed.png`
     - `P1_map_node_gold_14_keyed.png`
     - `P1_map_node_gray_unknown_21_keyed.png`
     - `P1_map_red_ring_marker_35_keyed.png`
     - `P1_map_fog_small_09_keyed.png`

2. 接入战略地图节点显示。
   - 普通已显影节点使用金色节点切片。
   - 当前所在与可达节点使用红色地图钉切片。
   - 雾中未知节点使用灰色未知节点切片。
   - 小横屏模式单独缩小节点尺寸，避免遮挡地图文字。

3. 增加 QA 合约。
   - `qa-check.js` 新增 `map node ui slice contract`。
   - 检查关键切片文件存在、CSS 变量存在、移动横屏节点样式存在。

## 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/`
- `/Users/yuanzhe/Documents/game/协作/不思异九州_任务交接台账.md`

## 验收结果

- `node --check app.js`：通过
- `node --check data.js`：通过
- `node --check qa-check.js`：通过
- `node qa-check.js`：通过，含 `PASS map node ui slice contract`
- `node journey-smoke-check.js`：通过
- `git diff --check`：通过
- 透明角点抽查：红色图钉、金色节点、灰色未知节点左上角均为 `srgba(0,0,0,0)`

## 页面验证

- 入口页可访问：
  - `http://127.0.0.1:4179/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html`
- 地图页可访问：
  - `http://127.0.0.1:4179/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=map`
- Playwright 截图证据：
  - `/Users/yuanzhe/Documents/game/.playwright-cli/page-2026-06-19T05-29-31-143Z.png`
- 交互验证：
  - 从地图页点击第一条路线后，页面切回旅途模式。
  - 天数从第 1 日变为第 2 日。
  - 车轴从 80 变为 76，粮草从 90 变为 86。
  - 页面出现 `轴-4`、`粮-4` 的状态变化提示。

## 已知情况

- 页面控制台目前有 60 条图片 404，来源是 A/B/C 组预留生成图路径尚未补齐。这与 BSI-C-076/077 的“生成图素材就绪检查”一致，不是本轮地图节点切片问题。
- 入口页有 `favicon.ico` 404，不影响试玩。
- In-app Browser 本地页曾出现崩溃页，本轮改用 Playwright 命令行做可视化验收。

## 下一步建议

下一小步建议推进 `BSI-C-079`：把 A/B/C 组缺失图片的前 12 个优先资产做成“待用户生成清单 + 可直接复制 prompt + 导入后命名检查”，让视觉线程和用户生图入口真正闭环。
