window.BSI_BALANCE_STATUS = {
  "generatedAt": "2026-06-24T04:26:51.881Z",
  "seed": "busi-kyushu",
  "runsPerStrategy": 1000,
  "targetLocation": "kyushu_rift",
  "summary": {
    "title": "P0 平衡通过",
    "tone": "stable",
    "scoreText": "谨慎100% / 均衡100% / 冒险100% / 新手100%",
    "nextText": "门槛 8/8；新手告警 77.9%；神志 P10 15，粮草 P10 34；压力路线：dream_to_rift。",
    "minSuccessRate": 1,
    "maxWarningRate": 0.779,
    "hardFailures": 0,
    "gatePassText": "8/8",
    "gates": [
      {
        "id": "success",
        "label": "四策略通关率",
        "pass": true,
        "value": "100%",
        "target": ">= 98%"
      },
      {
        "id": "hard_failure",
        "label": "硬失败",
        "pass": true,
        "value": "0",
        "target": "0"
      },
      {
        "id": "early_failure",
        "label": "前 3 步死局",
        "pass": true,
        "value": "0",
        "target": "0"
      },
      {
        "id": "balanced_pressure",
        "label": "默认玩家告警",
        "pass": true,
        "value": "3.4%",
        "target": "2% - 18%"
      },
      {
        "id": "novice_pressure",
        "label": "新手压力告警",
        "pass": true,
        "value": "77.9%",
        "target": "45% - 85%"
      },
      {
        "id": "novice_rescue",
        "label": "新手补救局",
        "pass": true,
        "value": "0.8%",
        "target": "<= 5%"
      },
      {
        "id": "sanity_floor",
        "label": "新手神志 P10",
        "pass": true,
        "value": "15",
        "target": ">= 12"
      },
      {
        "id": "grain_floor",
        "label": "粮草 P10 下限",
        "pass": true,
        "value": "34",
        "target": ">= 30"
      }
    ]
  },
  "report": "./balance-status.html",
  "markdownReport": "./balance-status.md",
  "strategies": [
    {
      "strategy": "conservative",
      "label": "谨慎",
      "note": "资源安全优先，模拟谨慎玩家。",
      "runs": 1000,
      "successRate": 1,
      "successText": "100%",
      "warningRate": 0.032,
      "warningText": "3.2%",
      "rescueRate": 0,
      "rescueText": "0%",
      "averageSteps": 6.53,
      "averageRouteEvents": 5.74,
      "averageRandomRouteEvents": 0.63,
      "outcomes": {
        "rift": 1000
      },
      "failureTypes": {},
      "crises": {
        "axle": 0,
        "grain": 0,
        "sanity": 0,
        "rescues": 0,
        "hardFailures": 0
      },
      "warningRuns": {
        "axle": 0,
        "grain": 2,
        "sanity": 31,
        "any": 32
      },
      "rescuedRuns": 0,
      "failureStepBuckets": {
        "early_0_3": 0,
        "mid_4_6": 0,
        "late_7_plus": 0
      },
      "resourceMinimums": {
        "axle": {
          "min": 58,
          "p10": 66,
          "median": 68
        },
        "grain": {
          "min": 34,
          "p10": 40,
          "median": 45
        },
        "sanity": {
          "min": 39,
          "p10": 46,
          "median": 50
        }
      },
      "highestPressureRoutes": [
        {
          "routeId": "dream_to_rift",
          "pressure": 32000
        },
        {
          "routeId": "feather_to_dream",
          "pressure": 24000
        },
        {
          "routeId": "mire_to_feather",
          "pressure": 10080
        },
        {
          "routeId": "central_to_road",
          "pressure": 7664
        },
        {
          "routeId": "road_to_shrine",
          "pressure": 5886
        },
        {
          "routeId": "market_to_mire",
          "pressure": 5848
        },
        {
          "routeId": "shrine_to_marsh",
          "pressure": 5586
        },
        {
          "routeId": "shrine_to_market",
          "pressure": 4752
        }
      ]
    },
    {
      "strategy": "balanced",
      "label": "均衡",
      "note": "推进与资源兼顾，模拟默认玩家。",
      "runs": 1000,
      "successRate": 1,
      "successText": "100%",
      "warningRate": 0.034,
      "warningText": "3.4%",
      "rescueRate": 0,
      "rescueText": "0%",
      "averageSteps": 6.51,
      "averageRouteEvents": 5.72,
      "averageRandomRouteEvents": 0.62,
      "outcomes": {
        "rift": 1000
      },
      "failureTypes": {},
      "crises": {
        "axle": 0,
        "grain": 0,
        "sanity": 0,
        "rescues": 0,
        "hardFailures": 0
      },
      "warningRuns": {
        "axle": 0,
        "grain": 2,
        "sanity": 33,
        "any": 34
      },
      "rescuedRuns": 0,
      "failureStepBuckets": {
        "early_0_3": 0,
        "mid_4_6": 0,
        "late_7_plus": 0
      },
      "resourceMinimums": {
        "axle": {
          "min": 54,
          "p10": 66,
          "median": 69
        },
        "grain": {
          "min": 34,
          "p10": 40,
          "median": 45
        },
        "sanity": {
          "min": 39,
          "p10": 46,
          "median": 50
        }
      },
      "highestPressureRoutes": [
        {
          "routeId": "dream_to_rift",
          "pressure": 32000
        },
        {
          "routeId": "feather_to_dream",
          "pressure": 24000
        },
        {
          "routeId": "mire_to_feather",
          "pressure": 9900
        },
        {
          "routeId": "central_to_road",
          "pressure": 7488
        },
        {
          "routeId": "shrine_to_marsh",
          "pressure": 6062
        },
        {
          "routeId": "road_to_shrine",
          "pressure": 5760
        },
        {
          "routeId": "market_to_mire",
          "pressure": 5304
        },
        {
          "routeId": "shrine_to_market",
          "pressure": 4336
        }
      ]
    },
    {
      "strategy": "risky",
      "label": "冒险",
      "note": "推进优先，模拟熟悉路线后的冒险玩家。",
      "runs": 1000,
      "successRate": 1,
      "successText": "100%",
      "warningRate": 0.062,
      "warningText": "6.2%",
      "rescueRate": 0,
      "rescueText": "0%",
      "averageSteps": 5.58,
      "averageRouteEvents": 4.77,
      "averageRandomRouteEvents": 0.54,
      "outcomes": {
        "rift": 1000
      },
      "failureTypes": {},
      "crises": {
        "axle": 0,
        "grain": 0,
        "sanity": 0,
        "rescues": 0,
        "hardFailures": 0
      },
      "warningRuns": {
        "axle": 0,
        "grain": 0,
        "sanity": 62,
        "any": 62
      },
      "rescuedRuns": 0,
      "failureStepBuckets": {
        "early_0_3": 0,
        "mid_4_6": 0,
        "late_7_plus": 0
      },
      "resourceMinimums": {
        "axle": {
          "min": 42,
          "p10": 52,
          "median": 66
        },
        "grain": {
          "min": 36,
          "p10": 45,
          "median": 56
        },
        "sanity": {
          "min": 41,
          "p10": 47,
          "median": 52
        }
      },
      "highestPressureRoutes": [
        {
          "routeId": "dream_to_rift",
          "pressure": 25472
        },
        {
          "routeId": "red_to_dream",
          "pressure": 12475
        },
        {
          "routeId": "pass_to_market",
          "pressure": 8211
        },
        {
          "routeId": "mire_to_red",
          "pressure": 8050
        },
        {
          "routeId": "stele_to_rift",
          "pressure": 7140
        },
        {
          "routeId": "feather_to_dream",
          "pressure": 7128
        },
        {
          "routeId": "central_to_pass",
          "pressure": 6776
        },
        {
          "routeId": "market_to_mire",
          "pressure": 4709
        }
      ]
    },
    {
      "strategy": "novice",
      "label": "新手",
      "note": "会误判补给和路线，模拟第一次玩、不总选最优项的玩家。",
      "runs": 1000,
      "successRate": 1,
      "successText": "100%",
      "warningRate": 0.779,
      "warningText": "77.9%",
      "rescueRate": 0.008,
      "rescueText": "0.8%",
      "averageSteps": 6.08,
      "averageRouteEvents": 5.23,
      "averageRandomRouteEvents": 0.72,
      "outcomes": {
        "rift": 1000
      },
      "failureTypes": {},
      "crises": {
        "axle": 0,
        "grain": 0,
        "sanity": 8,
        "rescues": 8,
        "hardFailures": 0
      },
      "warningRuns": {
        "axle": 0,
        "grain": 119,
        "sanity": 740,
        "any": 779
      },
      "rescuedRuns": 8,
      "failureStepBuckets": {
        "early_0_3": 0,
        "mid_4_6": 0,
        "late_7_plus": 0
      },
      "resourceMinimums": {
        "axle": {
          "min": 33,
          "p10": 48,
          "median": 61
        },
        "grain": {
          "min": 11,
          "p10": 34,
          "median": 53
        },
        "sanity": {
          "min": 0,
          "p10": 15,
          "median": 36
        }
      },
      "highestPressureRoutes": [
        {
          "routeId": "dream_to_rift",
          "pressure": 22805
        },
        {
          "routeId": "red_to_dream",
          "pressure": 8750
        },
        {
          "routeId": "feather_to_dream",
          "pressure": 6816
        },
        {
          "routeId": "marsh_to_red",
          "pressure": 5616
        },
        {
          "routeId": "stele_to_rift",
          "pressure": 5530
        },
        {
          "routeId": "mire_to_red",
          "pressure": 4715
        },
        {
          "routeId": "road_to_marsh",
          "pressure": 4608
        },
        {
          "routeId": "red_to_rift",
          "pressure": 4512
        }
      ]
    }
  ]
};
