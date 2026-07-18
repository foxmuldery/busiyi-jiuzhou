# C_BSI-C-076 生成图素材就绪检查脚本回执

> 子线程：C，技术原型
> 日期：2026-06-19
> 状态：代码自检通过
> 目标：把 A/B/C 组生成图从“约定文件名”推进到“可自动验收的素材清单”，让视觉交互线程和主线程能快速知道哪些图已可用、哪些还缺。

## 1. 本轮完成

- 新增 `asset-readiness-check.js`，用于检查生成图是否已按约定放入正确目录。
- 检查范围覆盖 59 张生成图：
  - A 组路段长图：4 张。
  - B 组地点图：14 张。
  - B 组事件图：14 张。
  - C 组路线半途路遇图：13 张。
  - C 组随机路遇图：8 张。
  - C 组危机图：3 张。
  - C 组结局图：3 张。
- 默认模式只提示缺口，不阻塞当前试玩。
- 严格模式 `--strict` 会把缺图、无法读取尺寸、比例不对或分辨率过低视为失败，适合正式验收。
- JSON 模式 `--json` 可供后续资产工作台读取。
- 更新 `qa-check.js`，把该脚本作为 QA 契约的一部分，避免后续误删。
- 更新 prototype README，补充素材就绪检查命令。

## 2. 当前素材状态

当前检查结果为：

```text
A-stage: ready 0/4, missing 4
B-location: ready 0/14, missing 14
B-event: ready 0/14, missing 14
C-route: ready 0/13, missing 13
C-random: ready 0/8, missing 8
C-crisis: ready 0/3, missing 3
C-ending: ready 0/3, missing 3
WARN not ready: 59/59
```

这不是试玩阻断问题。原因是 A/B/C 组生成图目前还没有按 D021/D020 的正式命名投放到自动接入目录；原型仍会继续使用旧图或兜底图。

## 3. 文件改动

- `GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `协作/不思异九州_任务交接台账.md`

## 4. 自检结果

通过：

```text
node --check GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
node GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --json
node --check GitHub资产区/03_WebDemo/prototype/app.js
node --check GitHub资产区/03_WebDemo/prototype/data.js
node --check GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/qa-check.js
node GitHub资产区/03_WebDemo/prototype/journey-smoke-check.js
```

关键 QA 结果：

```text
PASS optional A-stage generated paths are non-blocking
PASS optional B/C generated illustration paths are non-blocking
PASS generated art readiness checker contract
All prototype QA checks passed.
Journey smoke check passed.
```

## 5. 给视觉交互线程的交接

下一步由 D 线程继续把 D020/D021 的统一风格 Prompt 和文件命名对齐到真实投放目录。交付时只需要把 PNG 放到以下三个目录，程序会自动识别：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/A组风格锁定/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/
```

放入后运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js
```

若要正式验收，则运行：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --strict
```
