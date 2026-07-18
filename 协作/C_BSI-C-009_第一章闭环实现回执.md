# C_BSI-C-009 第一章闭环实现回执

项目：不思异：九州  
线程角色：C 线程 / Web Demo 技术实现  
日期：2026-06-15  
状态：已完成实现与验证

## 一、本轮改动文件

- `GitHub资产区/03_WebDemo/prototype/data.js`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`

`index.html` 本轮未改动，继续保留上一轮横屏框架、羊皮纸九州图、迷雾显影、路线卡、行囊九宫格和音乐入口。

## 二、实现内容

1. 第一章地点池从 8 个扩展到 14 个：
   - 保留：中原驿、故王道、废关、雷泽浅畔、黑齿市、赤水外滩、巫咸断碑、九州裂隙。
   - 新增：青丘外邑、鸟鼠夹道、无名祠、白羽淖、羽民渡、梦图驿。
   - 按用户补充上下文，已优先合入 B-008 建议的 `bird_mouse_pass` 鸟鼠夹道和 `white_feather_mire` 白羽淖。

2. 补全新地点数据接入：
   - 每个新增地点都有 `location.detail`、`supplies`、`event`、`map` 坐标。
   - `routes` 扩展到 33 条，形成山隘、泽地、边市、禁地、断碑、裂隙前哨的分岔与汇合。
   - `revealPlan` 覆盖全部 14 个地点。
   - `fogLabels` 覆盖所有会作为雾中远影出现的地点。

3. 资源差异：
   - 偏车轴：废关、故王道、鸟鼠夹道、羽民渡。
   - 偏粮草：雷泽浅畔、白羽淖、黑齿市。
   - 偏神志：青丘外邑、无名祠、巫咸断碑、梦图驿。
   - 禁地高压：赤水外滩、赤水到裂隙/梦图驿相关路线。

4. 已实现“每次抵达最多 1 次补给”：
   - 新增 `arrivalSupplyUsed` 状态。
   - 抵达新地点后重置。
   - 使用任一补给后，本地点其它未用补给会禁用并显示“已补”。
   - 原有 `usedSupplies` 仍保留，保证同一个补给 id 每局只可用一次。

5. 强化数据验证：
   - `validatePrototypeData()` 现检查 `revealPlan` 是否覆盖地点。
   - 检查 `revealPlan.routes` 是否为当前地点出发路线。
   - 检查 `fogLocations`、`fogRoutes`、`fogLabels` 是否引用真实地点/路线。
   - `getBalanceInputs()` 增加导出 `revealPlan` 和 `fogLabels`，便于其它线程验收。

## 三、验证结果

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`：通过。
- 本地结构化数据验证：通过，0 errors / 0 warnings。
  - 地点：14
  - 路线：33
  - 地点事件：14
  - 补给：26
  - `bird_mouse_pass`、`white_feather_mire` 均存在并接入闭环。
- 浏览器点击验证：通过。
  - 重开后显示：中原驿、见闻 1 / 14、起点 3 条路线、2 个补给可取。
  - 使用 `central_repair` 后，`central_grain` 变为禁用状态并显示“已补”。
  - 浏览器控制台 `error / warn`：空。

## 四、测试路径

已实测从中原驿到九州裂隙：

```text
中原驿
-> 故王道
-> 鸟鼠夹道
-> 白羽淖
-> 赤水外滩
-> 巫咸断碑
-> 九州裂隙
```

到达九州裂隙时资源为：

```text
车轴 55 / 粮草 45 / 神志 50
```

该路径覆盖 B-008 新增重点地点 `bird_mouse_pass` 和 `white_feather_mire`，中途没有死局。

## 五、未完成风险

1. 当前仍是预制 `revealPlan`，不是完整权重抽卡；首版适合闭环验证，后续可继续接 A 线程权重和保底规则。
2. 地点池已扩到 14 个，超过 B-008 建议的首版 10 个；如果 D 线程横屏试玩觉得路线卡过密，可从青丘外邑、无名祠、羽民渡、梦图驿中裁剪或降为雾中远影。
3. 浏览器验证使用 prototype 目录作为临时静态服务根目录，外部图片/音频相对路径会出现 404；这是验证服务根目录导致的既有素材路径问题，不影响本轮 JS/CSS 和玩法逻辑。
4. 内置浏览器的只读执行环境无法直接读取页面上的 `window.BSI_PROTOTYPE.validate()`，本轮用本地结构化脚本按同一引用口径验证数据，并用真实浏览器点击验证玩法路径。
