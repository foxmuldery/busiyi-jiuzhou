#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = __dirname;
const CHECKER = path.join(ROOT, "asset-readiness-check.js");
const SIZE = "1280x720";
const OVERWRITE = process.argv.includes("--overwrite");
const DRY_RUN = process.argv.includes("--dry-run");

const SOURCE = {
  central: "../../02_设计资产/可用素材/B组地点事件图/LOC-001_central_post_中原驿.png",
  oldRoad: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-ROAD-001_古道荒原路段长图.png",
  qingqiu: "../../02_设计资产/可用素材/背景长图/BG-011_青丘边境荒外古道.png",
  oldPass: "../../02_设计资产/可用素材/B组地点事件图/LOC-004_abandoned_pass_废关.png",
  mountain: "../../02_设计资产/可用素材/背景长图/BG-004_裂山荒泽废墟.png",
  shrine: "../../02_设计资产/可用素材/C组路遇危机结局图/RTE-002_roadside_shrine_路旁无名祠.png",
  water: "../../02_设计资产/可用素材/A组风格锁定/MID-BG-WATER-001_雷泽赤水路段长图.png",
  redWater: "../../02_设计资产/可用素材/背景长图/BG-005_赤水骨滩荒泽.png",
  blackMarket: "../../02_设计资产/可用素材/B组地点事件图/LOC-010_black_teeth_market_黑齿市.png",
  stele: "../../02_设计资产/可用素材/B组地点事件图/LOC-013_broken_stele_巫咸断碑.png",
  rift: "../../02_设计资产/可用素材/B组地点事件图/LOC-014_kyushu_rift_九州裂隙.png",
  sky: "../../02_设计资产/可用素材/背景长图/BG-007_九州边境天象天空层.png",
  journey: "../../02_设计资产/可用素材/背景长图/BG-008_横向山海旅途舞台总场景.png",
  failureAxle: "../../02_设计资产/可用素材/结局失败图/FAIL-001_断轴失败状态插图.png",
  failureGrain: "../../02_设计资产/可用素材/结局失败图/FAIL-002_粮尽失败状态插图.png",
  failureSanity: "../../02_设计资产/可用素材/结局失败图/FAIL-003_神志崩坏失败状态插图.png",
  endingReturn: "../../02_设计资产/可用素材/结局失败图/END-001_归返中原结局插图.png",
  endingLost: "../../02_设计资产/可用素材/结局失败图/END-002_迷失九州结局插图.png",
  endingRift: "../../02_设计资产/可用素材/结局失败图/END-003_九州裂隙结局插图.png"
};

const MAP = {
  "B-location:old_king_road": ["oldRoad", "Center"],
  "B-location:qingqiu_outer_city": ["qingqiu", "Center"],
  "B-location:bird_mouse_pass": ["mountain", "Center"],
  "B-location:nameless_shrine": ["shrine", "Center"],
  "B-location:thunder_marsh": ["water", "Center"],
  "B-location:white_feather_mire": ["water", "East"],
  "B-location:feather_folk_ford": ["water", "West"],
  "B-location:dream_map_post": ["rift", "Center"],
  "B-location:red_marsh": ["redWater", "Center"],

  "B-event:split_tracks": ["oldRoad", "Center"],
  "B-event:closed_order": ["oldPass", "Center"],
  "B-event:ground_thunder": ["water", "Center"],
  "B-event:black_trade": ["blackMarket", "Center"],
  "B-event:qingqiu_lamps": ["qingqiu", "Center"],
  "B-event:hollow_pass": ["mountain", "Center"],
  "B-event:nameless_prayer": ["shrine", "Center"],
  "B-event:sunken_feather": ["water", "East"],
  "B-event:feather_ford_debt": ["water", "West"],
  "B-event:dream_map_gate": ["rift", "Center"],
  "B-event:red_bones": ["redWater", "Center"],
  "B-event:read_name": ["stele", "Center"],
  "B-event:rift_dream": ["rift", "Center"],

  "C-route:wheel_omen": ["oldRoad", "Center"],
  "C-route:black_cloud": ["sky", "Center"],
  "C-route:wenao_fish_rain": ["water", "Center"],
  "C-route:dang_kang_field_cry": ["journey", "Center"],
  "C-route:xuan_gui_shell_bridge": ["water", "West"],
  "C-route:zhu_bird_name_call": ["qingqiu", "East"],
  "C-route:fox_lamp_tail": ["qingqiu", "Center"],
  "C-route:ming_snake_crosswind": ["mountain", "Center"],
  "C-route:bone_ox_rut": ["oldPass", "Center"],
  "C-route:mirror_reed_bed": ["water", "East"],
  "C-route:dream_cicada_shell": ["rift", "Center"],

  "C-random:rnd_loose_axle_song": ["oldRoad", "Center"],
  "C-random:rnd_bitter_grass_soup": ["journey", "West"],
  "C-random:rnd_wrong_milestone": ["stele", "Center"],
  "C-random:rnd_silent_barter": ["blackMarket", "Center"],
  "C-random:rnd_repeated_footprints": ["oldPass", "Center"],
  "C-random:rnd_count_names_rest": ["shrine", "Center"],
  "C-random:rnd_low_black_cloud_gap": ["sky", "Center"],
  "C-random:rnd_breathing_map": ["rift", "Center"],

  "C-crisis:axle": ["failureAxle", "Center"],
  "C-crisis:grain": ["failureGrain", "Center"],
  "C-crisis:sanity": ["failureSanity", "Center"],

  "C-ending:rift": ["endingRift", "Center"],
  "C-ending:return": ["endingReturn", "Center"],
  "C-ending:stranded": ["endingLost", "Center"]
};

function resolveFromRoot(relativePath) {
  return path.resolve(ROOT, relativePath);
}

function readReadiness() {
  const raw = execFileSync(process.execPath, [CHECKER, "--json"], {
    cwd: ROOT,
    encoding: "utf8"
  });
  return JSON.parse(raw);
}

function deriveImage(source, target, gravity) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  execFileSync("magick", [
    source,
    "-resize",
    `${SIZE}^`,
    "-gravity",
    gravity,
    "-extent",
    SIZE,
    target
  ], { stdio: "inherit" });
}

function main() {
  const readiness = readReadiness();
  const candidates = readiness.results.filter((item) => item.status !== "ready");
  const generated = [];
  const skipped = [];
  const missingRules = [];

  candidates.forEach((item) => {
    const key = `${item.group}:${item.id}`;
    const rule = MAP[key];
    if (!rule) {
      missingRules.push(key);
      return;
    }

    const [sourceKey, gravity] = rule;
    const sourcePath = resolveFromRoot(SOURCE[sourceKey]);
    const targetPath = resolveFromRoot(item.path);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`source missing for ${key}: ${sourcePath}`);
    }
    if (fs.existsSync(targetPath) && !OVERWRITE) {
      skipped.push(key);
      return;
    }
    if (!DRY_RUN) {
      deriveImage(sourcePath, targetPath, gravity);
    }
    generated.push({ key, sourceKey, gravity, target: item.path });
  });

  if (missingRules.length) {
    throw new Error(`No derivation rule for: ${missingRules.join(", ")}`);
  }

  console.log(JSON.stringify({
    generated: generated.length,
    skipped: skipped.length,
    dryRun: DRY_RUN,
    overwrite: OVERWRITE,
    items: generated
  }, null, 2));
}

main();
