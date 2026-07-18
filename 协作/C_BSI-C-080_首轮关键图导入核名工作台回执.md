# C_BSI-C-080 首轮关键图导入核名工作台回执

- 任务编号：BSI-C-080
- 子线程：C 技术原型与工具链
- 日期：2026-06-19
- 目标：把首轮 12 张关键图从“Prompt/缺口清单”推进成可执行的导入核名工作台，方便用户生成图片后快速验收、入库和启用。

## 本轮完成

1. 扩展 `asset-readiness-check.js`。
   - 新增 `--import-workbench`：直接输出首轮 12 张关键图导入核名表。
   - 新增 `--write-import-workbench`：写入 Markdown 工作台文件。
   - 工作台会列出：
     - 正式目标文件名。
     - 分组目录。
     - 当前 ready/missing/review 状态。
     - 规格要求。
     - 用途说明。
     - 现有参考候选素材。

2. 生成导入核名工作台。
   - 文件：`/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-import-workbench.md`
   - 当前状态：首轮关键图 ready `0/12`。
   - 目标目录 `A组风格锁定/`、`B组地点事件图/`、`C组路遇危机结局图/` 当前只有 README，没有正式命名图片。

3. 保留旧素材作为参考，而不是误判为正式图。
   - 工作台会显示已有 fallback 候选，例如废关、赤水、归墟、黑齿等旧图。
   - 这些候选只用于参考和临时 fallback，不会自动写入 manifest。

4. 更新 README。
   - 增加 `--write-import-workbench` 使用说明。
   - 明确工作台输出路径。

5. 更新 QA 合约。
   - `qa-check.js` 新增 `generated art import workbench contract`。

## 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/generated-art-import-workbench.md`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`
- `/Users/yuanzhe/Documents/game/协作/不思异九州_任务交接台账.md`

## 使用方法

生成或刷新工作台：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-import-workbench
```

只看首轮 12 张状态：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --priority
```

图片放入正式目录后启用到网页：

```text
node /Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/asset-readiness-check.js --write-manifest
```

## 当前核名结果

- A-stage：4 张 missing。
- B-location：5 张 missing。
- B-event：1 张 missing。
- C-route：2 张 missing。
- 首轮 12 张关键图 ready：0/12。

## 验收结果

- `node --check asset-readiness-check.js`：通过
- `node --check qa-check.js`：通过
- `node asset-readiness-check.js --write-import-workbench`：通过
- `node asset-readiness-check.js --import-workbench`：通过
- `node asset-readiness-check.js --priority --markdown`：通过
- `node qa-check.js`：通过，含 `PASS generated art import workbench contract`
- `node journey-smoke-check.js`：通过
- `git diff --check`：通过

## 下一步建议

下一小步建议推进 `BSI-C-081`：在试玩入口页增加一个“素材导入状态”入口，面向非技术测试者展示首轮 12 张图的 ready/missing 状态和 D023 Prompt 包位置；这样用户无需打开终端也能看见画面素材进度。
