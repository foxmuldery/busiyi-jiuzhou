# C_BSI-C-074 A组路段生成图自动接入回执

> 子线程：C，技术原型  
> 日期：2026-06-19  
> 状态：代码自检通过  
> 目标：让 D021 A 组生成图可以无痛接入横向旅途舞台；图片未生成时不影响当前试玩。

## 1. 本轮完成

- 在 `data.js` 中新增 `stageAssets.generatedStageBackgrounds`：
  - `road` -> `MID-BG-ROAD-001_古道荒原路段长图.png`
  - `market` -> `MID-BG-MARKET-001_边市废关路段长图.png`
  - `water` -> `MID-BG-WATER-001_雷泽赤水路段长图.png`
  - `rift` -> `MID-BG-RIFT-001_归墟裂隙路段长图.png`
- 给舞台 profiles 补 `generatedBackgroundKey`，让地点/地形能对应到 A 组长图。
- 在 `app.js` 中新增可选预加载逻辑：
  - 浏览器启动时尝试加载 A 组长图。
  - 加载成功才覆盖舞台背景。
  - 加载失败或文件未放入时继续使用现有旧背景。
  - 舞台 DOM 会标记 `data-generated-background="ready/fallback"`，便于后续调试。
- 新增投放目录说明：
  - `GitHub资产区/02_设计资产/可用素材/A组风格锁定/README.md`
- 更新 prototype README，记录 A 组图自动接入规则。
- 更新 QA：
  - 正式媒体引用仍必须真实存在。
  - A 组生成长图属于可选候选路径，当前允许暂缺，但必须命名和目录正确。

## 2. 文件改动

- `GitHub资产区/03_WebDemo/prototype/data.js`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `GitHub资产区/02_设计资产/可用素材/A组风格锁定/README.md`

## 3. 自检结果

通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

关键 QA 结果：

```text
PASS referenced media files exist
PASS optional A-stage generated paths are non-blocking
All prototype QA checks passed.
Journey smoke check passed.
```

完整路径 smoke 仍可抵达 `kyushu_rift`，最终资源：

```text
{"axle":69,"grain":86,"sanity":48}
```

## 4. 下一步

用户生成 A 组 4 张路段长图后，直接按文件名放入：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/A组风格锁定/
```

刷新试玩入口即可。若图片质量不通过，删除或改名后原型会自动回退到旧背景。
