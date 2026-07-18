# C_BSI-C-010 小横屏与半随机显影实现回执

项目：不思异：九州  
线程角色：C 线程 / Web Demo 技术实现  
日期：2026-06-15  
状态：已完成实现与静态验证；Browser 小横屏截图验证受阻

## 一、本轮改动文件

- `GitHub资产区/03_WebDemo/prototype/data.js`
- `GitHub资产区/03_WebDemo/prototype/app.js`
- `GitHub资产区/03_WebDemo/prototype/styles.css`

`index.html` 本轮未改动。

## 二、实现内容

1. 半随机显影池
   - 新增 `routePools`，采用 A_BSI-A-008 建议的 `requiredRoutes / optionalRoutes / optionalCount / fogPool / rescueTags` 结构。
   - `revealPlan.routes / fogLocations / fogRoutes` 继续保留，作为旧结构和校验参考，不被删除。
   - `requiredRoutes` 永远先显，不参与随机隐藏。
   - `optionalRoutes` 以 `runId + locationId` 派生稳定伪随机，并把结果写入 `state.routePoolSelections`。
   - `fogPool` 只进入 `hintedLocations / hintedRoutes`，地图上表现为雾中远影，不生成当前地点可点击路线。

2. 保底与补救
   - 保留 A 线程主脊：`central_to_road -> road_to_marsh -> marsh_to_red -> red_to_stele -> stele_to_rift`。
   - `red_marsh` 固定保留 `red_to_stele`，`red_to_rift` 仍可灰显/锁定，但不会成为唯一出口。
   - 资源低于预警线时，抽取排序会提高补救标签或目的地补给匹配项；若已抽项没有补救方向，会尝试追加 1 个补救路线或雾中补救远影。

3. 小横屏 UI
   - 路线卡恢复羊皮纸浅底深字，避免深底深字不可读。
   - 路线卡字段压缩为路线名、去向、短消耗、风险/路遇、目的地补给状态。
   - 补给按钮在低高横屏保留收益和状态短标：`可 / 已 / 本`。
   - 地图节点增强当前、可达、雾中、锁定状态：朱砂点、亮边、虚线远影、断线封条。
   - HUD 小横屏距离文案短化为 `西行1/6`、`裂隙5段` 一类。
   - 兼容并行新增的“古辞”抽屉初始化：将 `poetryState` 改为首次渲染前延迟创建，避免无界面验证和页面加载时提前引用失败。

4. 音效钩子
   - 新增并接入 `mapOpen / mapReveal / locationArrive`。
   - 新增语义 key `routeSelect / supplyComplete`，复用现有占位音效。
   - `mapOpen / mapReveal / locationArrive` 当前标记为 `missing`，缺素材时静默 no-op，不阻断 `move / completeRoute / renderMap`。
   - `mapReveal` 只在本次确有新增路线或雾中远影时触发；初始化和读档不触发。

5. 短文案
   - 合入代表性 `nameShort / hintShort / lowSanityHint / lockedHintShort`。
   - 合入全部 `revealTextShort` 和短 `fogLabels`。
   - 小横屏路线卡优先使用短字段；长文案保留给后续详情层。

## 三、验证结果

- `node --check GitHub资产区/03_WebDemo/prototype/app.js`：通过。
- `node --check GitHub资产区/03_WebDemo/prototype/data.js`：通过。
- `window.BSI_PROTOTYPE.validate()` 等价结构化验证：0 errors / 0 warnings。
  - 地点 14，路线 33，routePools 14，音频槽位 14，补给 26。
- 主脊可行验证：通过。
  - 最终地点：`kyushu_rift`
  - 最终资源：车轴 55 / 粮草 45 / 神志 56
- 同一存档刷新稳定性：通过。
  - 同一 `runId` 下，中原驿可见路线与 `routePoolSelections.central_post` 完全一致。
- 资源危急补救抽查：通过。
  - 故王道车轴 10 时，可见 `road_to_pass` / `road_to_birdmouse` 等修轴倾向路线，未只留下高压水路。
- Browser 渲染验证：受阻，未完成截图验收。
  - 已启动本地静态服务，但 Browser 通道先报 `native pipe closed before response`，重置后报告 `Browser is not available: iab`。

## 四、可行路径

```text
中原驿
-> 故王道
-> 雷泽浅畔
-> 赤水外滩
-> 巫咸断碑
-> 九州裂隙
```

对应路线：

```text
central_to_road
-> road_to_marsh
-> marsh_to_red
-> red_to_stele
-> stele_to_rift
```

## 五、未完成风险

1. 内置 Browser 渲染验证受阻：本地静态服务可启动，但 Browser 通道先报 `native pipe closed before response`，重置后报告 `Browser is not available: iab`。本轮已完成语法、数据、主脊、稳定性和补救逻辑验证，但 844x390 / 932x430 的截图级验收仍建议 D 或主线程复测。
2. 短文案已接入代表性高价值字段和全部显影短句；剩余路线的全量 `nameShort / hintShort / lowSanityHint` 可后续批量补齐。
3. `mapOpen / mapReveal / locationArrive` 目前只有语义 key 和缺素材兜底，正式纸、墨、朱印、木轴音效仍需 F 线程素材落地后接入 src。
4. 资源补救已实现首版倾斜和追加，但还不是完整权重系统；后续可继续加入连续高风险、坏运、补给已用后的更细权重。
