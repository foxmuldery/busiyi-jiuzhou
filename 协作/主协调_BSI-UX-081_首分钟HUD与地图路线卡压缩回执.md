# 主协调 BSI-UX-081 首分钟 HUD 与地图路线卡压缩回执

日期：2026-06-24

## 1. 目标

继续提升外部测试者首分钟体验，减少“下一步看不全”和“路线卡像文本墙”的问题。

## 2. 本轮改动

- `GitHub资产区/03_WebDemo/prototype/app.js`
  - 新增 `getNextStepDisplayText()`。
  - HUD 顶部下一步提示改为短显示：
    - `处理遭遇`
    - `补给一次`
    - `开图选路`
    - `选一条路`
    - `再点启程`
  - 完整说明仍保留在 `title` 和 `aria-label` 中，例如 `下一步：补给一次，再开地图`。
- `GitHub资产区/03_WebDemo/prototype/styles.css`
  - 地图右侧路线卡全局压缩。
  - 路线选择卡默认隐藏长图、诗句、路径说明和重复风险行。
  - 保留路线名、路线倾向、目的地、资源消耗和图标化情报。
- `GitHub资产区/03_WebDemo/prototype/index.html`
  - 样式和脚本缓存号更新为 `20260624-c161`。

## 3. 验收

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js`：通过。
- 本地浏览器首分钟验证：
  - 处理首个遭遇后，HUD 显示 `补给一次`，不溢出。
  - 完整提示仍为 `下一步：补给一次，再开地图`。
  - 地图路线卡高度约 `76px`，`route-verse` 与 `route-art` 为 `display: none`，无纵向溢出。
- 线上验证：
  - <https://webdeploy-green.vercel.app/>：返回 200。
  - <https://webdeploy-green.vercel.app/play>：返回 200。
  - 游戏页引用 `styles.css?v=20260624-c161` 与 `app.js?v=20260624-c161`。
  - 线上 `styles.css` 包含路线卡压缩规则。
  - 线上 `app.js` 包含 `getNextStepDisplayText()`。

## 4. 最新线上部署

- 固定入口：<https://webdeploy-green.vercel.app/>
- 干净新局：<https://webdeploy-green.vercel.app/play>
- 密码：`tusun2026`
- Vercel 部署：`dpl_D4KymazhukAu8C794ccJqRSus1Aa`
- 检查页：<https://vercel.com/foxlaoys-projects/webdeploy/D4KymazhukAu8C794ccJqRSus1Aa>

## 5. 仍需人工确认

- 路线卡压缩后，诗句不再直接显示在路线卡上；如果用户希望地图也保留古辞气质，可下一轮在选中路线后的预览区显示一句短诗，而不是塞进每张路线卡。
- P0 仍需真人 5 分钟试玩、音频听感和游戏内“志”复盘回收。
