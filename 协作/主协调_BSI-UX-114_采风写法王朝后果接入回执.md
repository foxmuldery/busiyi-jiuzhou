# 主协调 BSI-UX-114 采风写法王朝后果接入回执

> 日期：2026-06-25  
> 负责人：主协调 / C  
> 状态：已验收并已部署  

## 1. 本轮目标

让“颂 / 讽 / 哀 / 谶”从记录型选择推进为有后果感的复盘信息：玩家写下的方式，会被王朝整理成不同案牍判断。

## 2. 已完成内容

1. 新增 `FIELD_NOTE_CONSEQUENCES`，为四种写法配置王朝判断：
   - 颂：可安抚。
   - 讽：须查访。
   - 哀：宜赈济。
   - 谶：入禁录。
2. 采风册地点详情新增 `【王朝案牍】` 段落。
3. 本局复盘弹窗新增“王朝案牍”摘要。
4. 复制复盘与 P0 试玩反馈包新增“王朝案牍”字段。
5. QA 守门新增 `FIELD_NOTE_CONSEQUENCES`、`getFieldNoteConsequenceSummary`、`【王朝案牍】` 检查。

## 3. 验收结果

- `node --check app.js`：通过。
- `node --check qa-check.js`：通过。
- `qa-check.js`：通过。
- `playtest-flow-check.js --write-report`：通过，前五站均完成采风写法并抵达九州裂隙。
- `p0-readiness-check.js --write-report`：机器验收 9/9，通过；待人工 2 项。
- 浏览器实测：处理首个遭遇后选择“颂记此地”；采风册详情显示 `【王朝案牍】中原驿：案牍暂作“可安抚”`；复制复盘兜底文本含 `王朝案牍` 和 `可安抚`。
- `online-smoke-check.js --write-report`：线上 12/12 通过，阻断项 0。

## 4. 最新线上版本

- 固定入口：https://webdeploy-green.vercel.app/
- 密码：`tusun2026`
- 最新生产部署：`dpl_9jeQnNuqdhBFhqViWBR1QwJVLdiw`

## 5. 后续建议

下一步可以让“王朝案牍”不只出现在复盘里，而是在中后期路线里回流：例如被标为“入禁录”的地点，后续相邻路线出现更高神志压力；被标为“宜赈济”的地点，后续可能出现补粮回报。
