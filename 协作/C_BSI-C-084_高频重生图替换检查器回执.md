# C_BSI-C-084 高频重生图替换检查器回执

日期：2026-06-19  
执行线程：C / 技术原型  
关联任务：D_BSI-D-024 全量试玩图复核与下一轮重生图提示语

## 目标

为 D024 复核指出的 11 张高频重生图建立固定检查器。后续视觉互动或用户把新图覆盖到同名文件后，可直接判断每张图是“仍为 C083 派生占位图”还是“已被新生成图替换”，并同时检查缺失、PNG 可读性、分辨率和 16:9 比例。

## 已完成

1. 新增检查器：
   `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js`
2. 生成当前状态报告：
   `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-status.md`
3. 接入 README 使用说明：
   `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`
4. 接入总 QA 合约：
   `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 当前状态

- 已替换：0/11
- 仍为占位：11/11
- 缺失：0
- 异常：0
- 当前 11 张图均为 1280x720，可用于内部试玩，但视觉差异仍需下一轮重生图补齐。

## 覆盖范围

P0：
- EVT-001 驿门未闭
- EVT-002 车辙分叉
- EVT-005 黑齿交易
- RTE-009 黑齿鳞价
- EVT-013 断碑读名
- EVT-014 裂隙前梦
- RND-008 烛龙息图
- CRS-003 神志崩线

P1：
- EVT-003 废关旧令
- END-001 入裂隙
- END-003 迷失九州_旅途断绝

## 使用方法

更新报告：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --write-report
```

常规验收，缺图或异常图失败，占位图不阻塞试玩：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --strict
```

完成态验收，要求 11 张全部替换：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/visual-replacement-check.js --strict-replaced
```

## 已验证

```text
node --check visual-replacement-check.js
node visual-replacement-check.js --strict
node visual-replacement-check.js --write-report
```

以上命令通过；当前报告显示 0/11 已替换、11/11 仍为占位、0 缺失、0 异常。

## 下一步

视觉互动线程依据 D024 提示语优先生成 P0 八张图。用户或视觉互动线程将新图按同名文件覆盖后，C 线程运行本检查器、`asset-readiness-check.js --write-manifest`、`qa-check.js` 和 `journey-smoke-check.js`，完成替换验收。
