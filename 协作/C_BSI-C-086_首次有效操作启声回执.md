# C_BSI-C-086 首次有效操作启声回执

日期：2026-06-19  
执行线程：C / 技术原型  
关联目标：提升试玩版第一分钟音乐与音效完成度

## 目标

解决试玩首分钟容易“看起来有音乐但实际静音”的体验问题。浏览器仍会限制自动播放，因此本次不做强制绕过，而是利用玩家第一次有效操作作为合法手势，自动尝试启用旅途声场。

## 已完成

1. 新增首次有效操作启声：
   - 玩家第一次处理地点事件、半途路遇、危机、补给或选路时，会尝试启用音乐与声场层。
   - 若玩家手动关闭音乐，则后续操作不再自动打开。
2. 手动控制仍保留：
   - 右上“音”按钮仍可随时开关。
   - 设置抽屉中的“播放音乐 / 关闭音乐”仍可用。
3. 状态提示更新：
   - 设置页提示改为“静音；首次操作会尝试启声，也可点击/手动播放音乐”。
   - 自动启声时用已有舞台浮层提示“声场已启”，不打断玩法。
4. 缓存版本更新：
   - `index.html` 中 `app.js` 引用更新为 `20260619-c086`。
5. QA 合约更新：
   - `qa-check.js` 已纳入 `autoUnlockAudioFromGesture`、`audioUserMuted`、`audioAutoUnlocked` 和启声提示检查。

## 浏览器复验

使用 in-app browser，入口：

```text
http://127.0.0.1:4180/GitHub资产区/03_WebDemo/prototype/index.html?fresh=1
```

复验结果：

- 初始进入：右上音频按钮为“播放音乐”，状态提示为“静音；首次操作会尝试启声，也可点击‘播放音乐’”。
- 点击第一个地点事件选择“整点车具”后：
  - 右上音频按钮切换为“关闭音乐”。
  - `aria-pressed` 切换为 `true`。
  - 事件正常落账，资源从 80/90/85 变为 88/87/85。
  - 浏览器提示“已请求播放；浏览器暂未放行 3 个音频槽”时，页面没有报错，玩法继续。
- 点击右上“音”关闭音乐后：
  - 右上音频按钮切换为“播放音乐”。
  - `aria-pressed` 切换为 `false`。
  - 状态提示为“静音；已手动关闭，点击‘播放音乐’可重新启用。”
- 手动关闭后再次点击补给：
  - 音乐没有被自动重新打开。
  - 补给正常落账，资源变为 96/85/85。
- 控制台无应用级 error/warn。

## 修改文件

- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/app.js`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/index.html`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/README.md`
- `/Users/yuanzhe/Documents/game/GitHub资产区/03_WebDemo/prototype/qa-check.js`

## 说明

浏览器可能仍会因权限策略临时阻止部分音频槽播放；这不是素材未接入。页面会明确显示“浏览器暂未放行”，玩家可以继续游玩，也可以再次点击“音”按钮尝试。
