# C_BSI-C-075 B/C组专属图自动接入回执

> 子线程：C，技术原型  
> 日期：2026-06-19  
> 状态：代码自检通过  
> 目标：让 D020 生成的地点、事件、路遇、危机和结局图可以自动接入 Web Demo；图片未生成时不影响当前试玩。

## 1. 本轮完成

- 在 `app.js` 中新增 B/C 组专属图自动候选路径：
  - `LOC-*`、`EVT-*` 从 `02_设计资产/可用素材/B组地点事件图/` 读取。
  - `RTE-*`、`RND-*`、`CRS-*`、`END-*` 从 `02_设计资产/可用素材/C组路遇危机结局图/` 读取。
- 命名规则由当前 `data.js` 的真实地点、事件、路遇、危机顺序自动推导，和 D020 保持一致。
- 新增可选预加载逻辑：
  - 浏览器启动时尝试加载 B/C 组候选图。
  - 加载成功才覆盖旧插图。
  - 加载失败或文件未放入时继续使用现有地点/事件/路遇/危机/结局插图。
- 新增两个投放目录说明：
  - `GitHub资产区/02_设计资产/可用素材/B组地点事件图/README.md`
  - `GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/README.md`
- 更新 prototype README，记录 B/C 组自动接入规则。
- 更新 QA，新增 `optional B/C generated illustration paths are non-blocking` 契约检查。

## 2. 文件改动

- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `GitHub资产区/03_WebDemo/prototype/README.md`
- `GitHub资产区/02_设计资产/可用素材/B组地点事件图/README.md`
- `GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/README.md`

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
PASS optional B/C generated illustration paths are non-blocking
All prototype QA checks passed.
Journey smoke check passed.
```

完整路径 smoke 仍可抵达 `kyushu_rift`，最终资源：

```text
{"axle":69,"grain":86,"sanity":48}
```

## 4. 下一步

生成 B/C 组图后，直接按 D020 文件名放入：

```text
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/B组地点事件图/
/Users/yuanzhe/Documents/game/GitHub资产区/02_设计资产/可用素材/C组路遇危机结局图/
```

刷新试玩入口即可。若某张图质量不通过，删除或改名后原型会自动回退旧插图。
