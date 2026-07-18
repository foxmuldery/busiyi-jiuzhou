# 《不思异：九州》音频技术体检

生成时间：2026-07-18T23:16:36.596Z

结论：音频技术体检通过，待主观听感

资产：20；唯一文件：15；阻断项：0；提醒：0。

## 分层统计

- 类型：music 6，sanity 1，sanity-low 1，ambience 1，ui 5，warning 3，map-sfx 3
- 状态：review-pending 6，demo-temporary 14

## 文件体检表

| key | 编号 | 类型 | 状态 | loop | 音量 | 时长 | 大小 | 结果 |
|---|---|---|---|---|---:|---:|---:|---|
| musicLoop | MUS-CORE-001 | music | review-pending | 是 | 0.160 | 177.5s | 2.71MB | 通过 |
| musicWater | MUS-CORE-003 | music | review-pending | 是 | 0.140 | 156.1s | 2.38MB | 通过 |
| musicMountain | MUS-CORE-002 | music | review-pending | 是 | 0.140 | 156.2s | 2.38MB | 通过 |
| musicBorder | MUS-CORE-004 | music | review-pending | 是 | 0.140 | 160.1s | 2.44MB | 通过 |
| musicJourney | MUS-CORE-005 | music | review-pending | 是 | 0.150 | 166.1s | 2.54MB | 通过 |
| musicDawn | MUS-CORE-006 | music | review-pending | 是 | 0.130 | 152.3s | 2.32MB | 通过 |
| sanityLight | SAN-001-SYN | sanity | demo-temporary | 是 | 0.080 | 16.0s | 250.9KB | 通过 |
| sanityLow | SAN-002-SYN | sanity-low | demo-temporary | 是 | 0.130 | 18.0s | 282.0KB | 通过 |
| travelAmbience | AMB-TRAVEL-001-SYN | ambience | demo-temporary | 是 | 0.045 | 48.0s | 751.1KB | 通过 |
| select | UI-001-SYN | ui | demo-temporary | 否 | 0.280 | 0.35s | 6.4KB | 通过 |
| routeSelect | ROUTE-CONFIRM-001 | ui | demo-temporary | 否 | 0.260 | 0.35s | 6.4KB | 通过 |
| resourceDown | UI-003-SYN | ui | demo-temporary | 否 | 0.280 | 0.65s | 11.3KB | 通过 |
| resourceUp | UI-004-SYN | ui | demo-temporary | 否 | 0.280 | 0.85s | 14.3KB | 通过 |
| supplyComplete | SUPPLY-GAIN-001 | ui | demo-temporary | 否 | 0.260 | 0.85s | 14.3KB | 通过 |
| warnAxle | WARN-001-SYN | warning | demo-temporary | 否 | 0.360 | 1.25s | 20.7KB | 通过 |
| warnGrain | WARN-002-SYN | warning | demo-temporary | 否 | 0.340 | 1.20s | 19.5KB | 通过 |
| warnSanity | WARN-003-SYN | warning | demo-temporary | 否 | 0.340 | 1.50s | 24.4KB | 通过 |
| mapOpen | MAP-OPEN-001 | map-sfx | demo-temporary | 否 | 0.200 | 0.35s | 6.4KB | 通过 |
| mapReveal | MAP-FOG-001 | map-sfx | demo-temporary | 否 | 0.160 | 1.50s | 24.4KB | 通过 |
| locationArrive | CITY-ARRIVE-001 | map-sfx | demo-temporary | 否 | 0.200 | 0.85s | 14.3KB | 通过 |

## 机器结论

- 所有接入音频文件存在，时长和 loop/短音效规则通过机器体检。

## 仍需人工判断

- 本报告只能证明音频文件能作为内部 Web Demo 技术素材运行。
- 音乐审美、循环接缝、压迫感、山海经气质、默认开声是否打扰，仍需 P0 听音人回传主观摘要。
- `review-pending` 和 `demo-temporary` 不代表正式授权完成。
