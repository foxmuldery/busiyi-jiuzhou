# BSI-UX-028 路线行程条与半途停靠回执

日期：2026-06-21

## 目标

让玩家在从九州图选择路线后，能直观看到“正在走这一段路”，并在半途路遇时停在中点，强化“走一半突然停下进入事件”的体验。

## 已完成

- 在横向旅途舞台中加入路线行程条：起点、半途标记、终点同屏显示。
- 路线待选时显示“遇/半”提示；行进中进度条向中点推进。
- 触发半途路遇时，行程条固定在 50%，半途标记变成“停”并高亮。
- 接入状态机字段：`ready` / `traveling` / `interrupted` / `idle`。
- 更新缓存号到 `20260621-c106`，避免旧页面缓存误判。

## 涉及文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/styles.css`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 验收结果

自动检查通过：

- `node --check app.js`
- `node --check qa-check.js`
- `node qa-check.js`
- 新增检查项：`stage route progress contract`

浏览器复验通过：

- 测试尺寸：900 x 500 横屏
- 测试路径：开局选择“立刻上路” -> 打开九州图 -> 选择“沿旧王道向西缓行” -> 触发“当康啼垄”
- 结果：`#stageRouteProgress` 进入 `interrupted`
- 结果：半途标记显示“停”
- 结果：路线 ID 为 `central_to_road`
- 结果：事件弹窗居中显示，选项跟随弹窗展示
- 结果：控制台无错误日志

测试页面：

`http://127.0.0.1:4181/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1&verify=route-progress-c106-1782015062015`

## 下一步建议

下一步最小可验证动作建议交给 C/D：

- C：把“行程条”继续和不同路线类型绑定，例如危险路线、资源路线、异象路线显示不同半途符号。
- D：给半途标记设计更山海化的小图标，替代现在的“遇/停/半”文字。
- B：补充 3-5 个专门服务“半途停靠”的短事件，让这套机制不只在一条路线里出现。
