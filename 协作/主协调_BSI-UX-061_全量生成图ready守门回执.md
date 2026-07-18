# 主协调 BSI-UX-061 全量生成图 ready 守门回执

时间：2026-06-21 19:01 CST

范围：Web Demo 视觉资产清单、试玩入口、QA 守门、浏览器实测。

## 1. 目标

把“生成图已经到位”从人工口头判断推进为可验证状态：

- 全量生成图清单刷新到 59/59 ready。
- 试玩入口和主原型都读取最新 c146 清单。
- QA 能检查 ready 清单、ready 文件存在性和缓存号，防止浏览器继续吃旧清单。

## 2. 本轮改动

- 运行 `asset-readiness-check.js --write-manifest`，刷新：
  - `generated-art-manifest.js`
  - `generated-art-status.js`
- `index.html` 的生成图清单缓存号更新为 `20260621-c146`。
- `试玩入口.html` 的 build 与生成图状态脚本缓存号更新为 `20260621-c146`。
- `qa-check.js` 新增：
  - 读取 `window.BSI_GENERATED_ART_MANIFEST / STATUS` 的本地验证 helper。
  - `generated art full library ready` 检查：确认至少 59 张 ready、ready 文件存在、缺失/复核/异常均为 0。
  - `generated art cache-bust contract` 检查：确认主原型和试玩入口不再使用旧 `20260619-c083` 清单缓存号。
- `README.md` 同步说明全量生成图 `59/59 ready` 已纳入 QA 守门。

## 3. 验证结果

命令验证：

- `node --check GitHub资产区/03_WebDemo/prototype/qa-check.js` 通过。
- `node GitHub资产区/03_WebDemo/prototype/qa-check.js` 通过，包含：
  - `PASS generated art cache-bust contract`
  - `PASS generated art full library ready`
- `node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js` 通过。
- `node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js` 通过：全量 59/59 ready。
- `node GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js` 通过：高频重生图 11/11 已替换。

浏览器验证：

- 主原型地址：
  `http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&view=town&verify=c146-generated-art`
- 页面非空、无 error/warn。
- 运行态视觉资产：
  - `journeyStage.dataset.generatedBackground = ready`
  - 舞台背景：`MID-BG-ROAD-001_古道荒原路段长图.png`
  - 当前遭遇图：`EVT-001_post_gate_驿门未闭.png`，尺寸 `1672x941`
  - 当前地点图：`LOC-001_central_post_中原驿.png`，尺寸 `1280x720`
- 试玩入口地址：
  `http://127.0.0.1:4182/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html?verify=c146-generated-art`
- 入口页 build 显示 `20260621-c146`，状态脚本为 `generated-art-status.js?v=20260621-c146`，页面文本含全量 ready 状态，无 error/warn。

## 4. 结论

本轮完成“画面资产清单已 ready 且浏览器实际加载最新清单”的收口。当前视觉层不再只是“可选生成图机制存在”，而是已经有全量 ready 证据和自动回归守门。

## 5. 未解决边界

- 生成图 ready 不等同于最终美术主观满意；后续仍可逐张做审美、构图、统一风格复核。
- 浏览器截图接口仍可能超时，本轮以 DOM、图片 natural size、控制台和运行态 dataset 作为验收证据。
