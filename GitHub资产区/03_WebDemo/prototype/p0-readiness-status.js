window.BSI_P0_READINESS_STATUS = {
  "generatedAt": "2026-07-11T14:15:45.798Z",
  "title": "P0 机器验收通过，待真人确认",
  "onlineEntry": "https://webdeploy-green.vercel.app/",
  "onlinePlay": "https://webdeploy-green.vercel.app/play",
  "password": "tusun2026",
  "summary": {
    "total": 11,
    "passed": 9,
    "manual": 2,
    "failed": 0,
    "machineText": "9/9",
    "passText": "82%"
  },
  "report": "./P0试玩版总验收报告.html",
  "markdownReport": "./P0试玩版总验收报告.md",
  "checks": [
    {
      "id": "qa",
      "label": "总 QA 守门",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "qa-check.js 全部通过",
      "next": "继续保持"
    },
    {
      "id": "playtest-flow",
      "label": "自动试玩链",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "入口、第一分钟、补给、选路、半途、终点和复盘链路通过",
      "next": "等待真人试玩反馈"
    },
    {
      "id": "balance",
      "label": "P0/P1 平衡门槛",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "P0 平衡通过；门槛 8/8；门槛 8/8；新手告警 77.9%；神志 P10 15，粮草 P10 34；压力路线：dream_to_rift。",
      "next": "新增事件、路线或补给后重新跑 1000 局"
    },
    {
      "id": "art",
      "label": "全量试玩图",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "59/59 ready",
      "next": "继续做统一风格精修"
    },
    {
      "id": "highfreq-visual",
      "label": "高频事件图替换",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "11/11",
      "next": "后续按新事件继续补图"
    },
    {
      "id": "audio-health",
      "label": "音频技术体检",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "资产 20，唯一文件 15，阻断项 0",
      "next": "等待主观听音，不把待复核音频标为正式素材"
    },
    {
      "id": "online-smoke",
      "label": "线上公开站冒烟",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "页面 12/12，阻断项 0",
      "next": "每次部署后重新跑 online-smoke-check.js --write-report"
    },
    {
      "id": "visual-smoke",
      "label": "线上可视化验收",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "截图 2/2，阻断项 0",
      "next": "每次部署后重新跑 visual-smoke-check.js --write-report"
    },
    {
      "id": "audio",
      "label": "声音可试玩状态",
      "status": "manual",
      "statusLabel": "待人工",
      "evidence": "音乐 6，待复核 6，临时 14",
      "next": "用 P0 音频听感验收工作台复制 3 分钟听音任务，并回收音频验收摘要"
    },
    {
      "id": "handoff",
      "label": "测试者交付入口",
      "status": "pass",
      "statusLabel": "通过",
      "evidence": "公开根入口、发测批次台、反馈填写页、反馈收件台按试玩编号分组、试玩编号回传、听音编号回传、游戏内 5 分钟提醒、5 分钟试玩任务、3 分钟听音任务、完整试玩包、反馈包优先指引和人工回收清单可复制",
      "next": "先用发测批次台登记测试者并复制邀请；游戏内到 5 分钟会提醒填写反馈并带入试玩编号；声音反馈用听音工作台回传同一编号；未走到结局时让测试者打开反馈填写页复制统一反馈包；收到多份反馈先贴入反馈收件台，按 JZ 试玩编号分组后再判断缺口"
    },
    {
      "id": "human",
      "label": "真人 5 分钟试玩",
      "status": "manual",
      "statusLabel": "待人工",
      "evidence": "尚需真实玩家反馈；机器检查不能替代手感判断",
      "next": "至少回收 1 份结局 P0 试玩反馈包；未走到结局时收试玩记录、复盘文本和听感反馈"
    }
  ]
};
