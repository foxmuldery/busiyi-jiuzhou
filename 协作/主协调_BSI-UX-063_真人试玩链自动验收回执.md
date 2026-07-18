# 主协调 BSI-UX-063 真人试玩链自动验收回执

时间：2026-06-24

范围：Web Demo 试玩入口、5 分钟路径、复盘反馈链、自动 QA。

## 1. 本轮目标

把 `BSI-UX-062` 的真人试玩入口继续推进为可自动守门的试玩链：

- 入口能让测试者从干净新局进入。
- 第一局有明确观察目标。
- 第一分钟能处理遭遇、补给、选路。
- 中段有半途路遇和地点补给。
- 终点能进入结局/复盘。
- 复盘文本能回填到试玩记录。

## 2. 本轮改动

- 新增 `playtest-flow-check.js`。
  - 检查试玩入口的干净新局链接、三项观察目标、复制链接/反馈模板兜底。
  - 检查主页面的复盘抽屉、复盘复制按钮、复制失败文本兜底。
  - 沿稳定试玩路径模拟：
    - `central_to_road`
    - `road_to_shrine`
    - `shrine_to_market`
    - `market_to_stele`
    - `stele_to_rift`
  - 验证地点事件、补给、路线消耗、半途路遇、终点事件和结局入口。
- 新增 `playtest-flow-status.md` 自动验收报告。
- `qa-check.js` 新增 `human playtest flow contract` 守门。
- `README.md` 新增真人试玩链检查命令说明。

## 3. 验证结果

命令验证：

- `node --check GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js` 通过。
- `node GitHub资产区/03_WebDemo/prototype/playtest-flow-check.js --write-report` 通过。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js` 通过，包含 `PASS human playtest flow contract`。
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js` 通过。
- `node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js` 通过，生成图全量 `59/59 ready`。

自动报告摘要：

- 路线：`central_to_road -> road_to_shrine -> shrine_to_market -> market_to_stele -> stele_to_rift`
- 终点：`kyushu_rift`
- 当前资源：`车轴 61 / 粮草 85 / 神志 63`
- 最低资源：`车轴 61 / 粮草 74 / 神志 55`
- 互动计数：地点事件 `6` / 路遇 `4` / 补给 `6`

浏览器抽样：

- 打开 `index.html?fresh=1&ending=rift&recap=1&verify=c148-playtest-flow-ending`。
- 结局复盘弹窗真实可见。
- 复盘文本包含：
  - 第 6 日
  - 显影 6 处
  - 行过 5 段路
  - 事件 6 / 路遇 4 / 补给 6
  - 当前资源与最低压力
  - 完整路线
- `复制复盘 / 完整日志 / 重开一局` 三个复盘动作可见。
- 控制台 error/warn：0。

## 4. 结论

当前版本不只是“机制能走通”，而是已经有一条可自动验证的内部真人试玩链。后续任何机制、UI、素材或音频改动，都应该继续跑 `playtest-flow-check.js`，防止入口、复盘或反馈回收断链。

## 5. 下一步建议

1. `BSI-UX-064`：做一次小横屏真实点击完整路径复验，重点看路线卡、弹窗和复盘按钮是否都不溢出。
2. `BSI-AUDIO-012`：做音乐/音效主观听感复核，至少覆盖古道、市场、水泽、裂隙和低神志污染层。
3. `BSI-VIS-063`：只复核前 5 分钟高频视觉，不平均检查 59 张图。
