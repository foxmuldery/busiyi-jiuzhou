#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const FILES = {
  html: path.join(ROOT, "index.html"),
  app: path.join(ROOT, "app.js"),
  data: path.join(ROOT, "data.js"),
  css: path.join(ROOT, "styles.css"),
  launcher: path.join(ROOT, "试玩入口.html"),
  readme: path.join(ROOT, "README.md"),
  webdeployPackage: path.join(ROOT, "build-webdeploy-package.js"),
  balanceSim: path.join(ROOT, "balance-sim.js"),
  balanceStatus: path.join(ROOT, "balance-status.js"),
  balanceReport: path.join(ROOT, "balance-status.md"),
  balanceReportHtml: path.join(ROOT, "balance-status.html"),
  audioHealthCheck: path.join(ROOT, "audio-health-check.js"),
  audioHealthStatus: path.join(ROOT, "audio-health-status.js"),
  audioHealthReport: path.join(ROOT, "audio-health-status.md"),
  onlineSmokeCheck: path.join(ROOT, "online-smoke-check.js"),
  onlineSmokeStatus: path.join(ROOT, "online-smoke-status.js"),
  onlineSmokeReport: path.join(ROOT, "online-smoke-status.md"),
  visualSmokeCheck: path.join(ROOT, "visual-smoke-check.js"),
  visualSmokeStatus: path.join(ROOT, "visual-smoke-status.js"),
  visualSmokeReport: path.join(ROOT, "visual-smoke-status.md"),
  visualSmokeRootShot: path.join(ROOT, "visual-smoke-screenshots/online-root-invite-1280x720.png"),
  visualSmokeGameShot: path.join(ROOT, "visual-smoke-screenshots/online-game-fresh-844x390.png"),
  playtestFlowCheck: path.join(ROOT, "playtest-flow-check.js"),
  playtestFlowReport: path.join(ROOT, "playtest-flow-status.md"),
  assetReadiness: path.join(ROOT, "asset-readiness-check.js"),
  generatedArtDeriver: path.join(ROOT, "derive-playtest-art.js"),
  generatedArtManifest: path.join(ROOT, "generated-art-manifest.js"),
  generatedArtImportWorkbench: path.join(ROOT, "generated-art-import-workbench.md"),
  generatedArtStatus: path.join(ROOT, "generated-art-status.js"),
  visualReplacementCheck: path.join(ROOT, "visual-replacement-check.js"),
  visualReplacementStatus: path.join(ROOT, "visual-replacement-status.md"),
  visualReplacementEntryStatus: path.join(ROOT, "visual-replacement-status.js"),
  visualReplacementWorkbench: path.join(ROOT, "highfreq-visual-replacement-workbench.md"),
  highfreqVisualImport: path.join(ROOT, "highfreq-visual-import.js"),
  highfreqVisualImportReadme: path.resolve(ROOT, "../../02_设计资产/待复核素材/高频重生图导入/README.md"),
  p0BatchDesk: path.join(ROOT, "P0发测批次台.html"),
  p0PlaytestWorkbench: path.join(ROOT, "P0真人试玩验收工作台.html"),
  p0AudioWorkbench: path.join(ROOT, "P0音频听感验收工作台.html"),
  p0FeedbackPage: path.join(ROOT, "P0反馈填写页.html"),
  p0FeedbackInbox: path.join(ROOT, "P0人工反馈收件台.html"),
  p0ReadinessCheck: path.join(ROOT, "p0-readiness-check.js"),
  p0ReadinessStatus: path.join(ROOT, "p0-readiness-status.js"),
  p0ReadinessReport: path.join(ROOT, "P0试玩版总验收报告.md"),
  p0ReadinessReportHtml: path.join(ROOT, "P0试玩版总验收报告.html")
};
const RESOURCE_EXTENSIONS = /\.(png|jpe?g|webp|gif|mp3|mp4|ttf)$/i;

let failures = 0;

function pass(label) {
  console.log(`PASS ${label}`);
}

function fail(label, detail) {
  failures += 1;
  console.error(`FAIL ${label}`);
  if (detail) console.error(String(detail));
}

function check(label, condition, detail = "") {
  if (condition) {
    pass(label);
  } else {
    fail(label, detail);
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadGameData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(FILES.data), sandbox, { filename: FILES.data });
  if (!sandbox.window.BSI_GAME_DATA) {
    throw new Error("window.BSI_GAME_DATA was not defined by data.js");
  }
  return sandbox.window.BSI_GAME_DATA;
}

function loadWindowGlobal(file, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window[globalName];
}

function collectStrings(value, result = []) {
  if (typeof value === "string") {
    result.push(value);
    return result;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, result));
    return result;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectStrings(item, result));
  }
  return result;
}

function unique(items) {
  return [...new Set(items)];
}

function maxBy(items, key) {
  return items.reduce((best, item) => (item[key] > best[key] ? item : best), items[0]);
}

function getReachableLocations(startLocation, routes) {
  const reachable = new Set([startLocation]);
  let changed = true;
  while (changed) {
    changed = false;
    routes.forEach((route) => {
      if (reachable.has(route.from) && !reachable.has(route.to)) {
        reachable.add(route.to);
        changed = true;
      }
    });
  }
  return reachable;
}

function applyResourceDelta(resources, delta = {}, resourceKeys) {
  const next = { ...resources };
  resourceKeys.forEach((key) => {
    next[key] = (next[key] || 0) + (delta[key] || 0);
  });
  return next;
}

function findRouteOnlySurvivablePath(data, startLocation, targetLocation) {
  const initialResources = data.initialStateTemplate?.resources || {};
  const resourceKeys = Object.keys(initialResources);
  if (!resourceKeys.length) return null;

  const outgoingRoutes = new Map();
  (data.routes || []).forEach((route) => {
    if (!outgoingRoutes.has(route.from)) outgoingRoutes.set(route.from, []);
    outgoingRoutes.get(route.from).push(route);
  });

  let best = null;
  const maxDepth = Object.keys(data.locations || {}).length + 1;

  function score(candidate) {
    const minResource = Math.min(...resourceKeys.map((key) => candidate.minimums[key]));
    const remainingTotal = resourceKeys.reduce((sum, key) => sum + candidate.resources[key], 0);
    return minResource * 1000 + remainingTotal;
  }

  function visit(locationId, resources, minimums, path, visited) {
    if (locationId === targetLocation) {
      const candidate = { path, resources, minimums };
      if (!best || score(candidate) > score(best)) best = candidate;
      return;
    }
    if (path.length > maxDepth) return;

    (outgoingRoutes.get(locationId) || []).forEach((route) => {
      if (visited.has(route.to)) return;
      const nextResources = applyResourceDelta(resources, route.cost, resourceKeys);
      const nextMinimums = { ...minimums };
      resourceKeys.forEach((key) => {
        nextMinimums[key] = Math.min(nextMinimums[key], nextResources[key]);
      });
      if (resourceKeys.some((key) => nextResources[key] <= 0)) return;
      visit(
        route.to,
        nextResources,
        nextMinimums,
        [...path, route],
        new Set([...visited, route.to])
      );
    });
  }

  visit(
    startLocation,
    initialResources,
    { ...initialResources },
    [],
    new Set([startLocation])
  );

  return best;
}

function asPoolItems(value, fallbackType) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (
    typeof item === "string" ? { id: item, type: fallbackType } : { type: fallbackType, ...item }
  ));
}

function getCountMax(value, fallback) {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && typeof value.max === "number") return value.max;
  return fallback;
}

function collectRevealReferenceProblems(data, routeById) {
  const problems = [];
  const plans = data.revealPlan || {};
  const locations = data.locations || {};
  Object.keys(locations).forEach((locationId) => {
    if (!plans[locationId]) problems.push(`地点 ${locationId} 缺少 revealPlan`);
  });

  Object.entries(plans).forEach(([locationId, plan]) => {
    if (!locations[locationId]) {
      problems.push(`revealPlan 引用了不存在的地点 ${locationId}`);
      return;
    }
    if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
      problems.push(`地点 ${locationId} 的 revealPlan 不是对象`);
      return;
    }

    ["routes", "fogLocations", "fogRoutes"].forEach((key) => {
      if (plan[key] !== undefined && !Array.isArray(plan[key])) {
        problems.push(`地点 ${locationId} 的 revealPlan.${key} 不是数组`);
      }
    });

    (Array.isArray(plan.routes) ? plan.routes : []).forEach((routeId) => {
      const route = routeById.get(routeId);
      if (!route) {
        problems.push(`地点 ${locationId} 的 revealPlan.routes 引用了不存在的路线 ${routeId}`);
      } else if (route.from !== locationId) {
        problems.push(`地点 ${locationId} 的 revealPlan.routes 包含非本地点出发路线 ${routeId}`);
      }
    });

    (Array.isArray(plan.fogLocations) ? plan.fogLocations : []).forEach((fogLocationId) => {
      if (!locations[fogLocationId]) {
        problems.push(`地点 ${locationId} 的 revealPlan.fogLocations 引用了不存在的地点 ${fogLocationId}`);
      }
    });

    (Array.isArray(plan.fogRoutes) ? plan.fogRoutes : []).forEach((routeId) => {
      if (!routeById.has(routeId)) {
        problems.push(`地点 ${locationId} 的 revealPlan.fogRoutes 引用了不存在的路线 ${routeId}`);
      }
    });
  });

  return problems;
}

function collectRoutePoolReferenceProblems(data, routeById) {
  const problems = [];
  const pools = data.routePools || {};
  const locations = data.locations || {};
  const routes = data.routes || [];

  Object.entries(pools).forEach(([locationId, pool]) => {
    if (!locations[locationId]) {
      problems.push(`routePools 引用了不存在的地点 ${locationId}`);
      return;
    }
    if (!pool || typeof pool !== "object" || Array.isArray(pool)) {
      problems.push(`地点 ${locationId} 的 routePools 不是对象`);
      return;
    }

    const requiredRoutes = asPoolItems(pool.requiredRoutes, "route");
    const optionalRoutes = asPoolItems(pool.optionalRoutes, "route");
    const outgoingRoutes = routes.filter((route) => route.from === locationId);
    if (outgoingRoutes.length && !requiredRoutes.length) {
      problems.push(`地点 ${locationId} 的 routePools.requiredRoutes 为空`);
    }

    [...requiredRoutes, ...optionalRoutes].forEach((item) => {
      const route = routeById.get(item.id);
      if (!route) {
        problems.push(`地点 ${locationId} 的 routePools 路线不存在：${item.id}`);
      } else if (route.from !== locationId) {
        problems.push(`地点 ${locationId} 的 routePools 路线不是从本地点出发：${item.id}`);
      }
    });

    if (getCountMax(pool.optionalCount, optionalRoutes.length) > optionalRoutes.length) {
      problems.push(`地点 ${locationId} 的 optionalCount 超过 optionalRoutes 数量`);
    }

    asPoolItems(pool.fogPool, "location").forEach((item) => {
      if (item.type === "location" && !locations[item.id]) {
        problems.push(`地点 ${locationId} 的 fogPool 地点不存在：${item.id}`);
      } else if (item.type === "route" && !routeById.has(item.id)) {
        problems.push(`地点 ${locationId} 的 fogPool 路线不存在：${item.id}`);
      } else if (!["location", "route"].includes(item.type)) {
        problems.push(`地点 ${locationId} 的 fogPool 类型非法：${item.type}`);
      }
    });
  });

  return problems;
}

function validateDeltaObject(delta, owner, resourceKeys, languageIds, endingIds) {
  const problems = [];
  const allowedKeys = new Set([...resourceKeys, "badLuck", "flag", "ending", "language"]);
  if (!delta || typeof delta !== "object" || Array.isArray(delta)) {
    return [`${owner} 缺少 effect/cost`];
  }

  Object.entries(delta).forEach(([key, value]) => {
    if (!allowedKeys.has(key)) {
      problems.push(`${owner} 使用未知数值字段 ${key}`);
      return;
    }
    if (resourceKeys.includes(key) || key === "badLuck") {
      if (!Number.isFinite(Number(value))) problems.push(`${owner} 的 ${key} 不是数字`);
      return;
    }
    if (key === "flag" && typeof value !== "string") {
      problems.push(`${owner} 的 flag 不是字符串`);
      return;
    }
    if (key === "ending" && !endingIds.has(value)) {
      problems.push(`${owner} 引用了未知结局 ${value}`);
      return;
    }
    if (key === "language") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        problems.push(`${owner} 的 language 不是对象`);
        return;
      }
      Object.entries(value).forEach(([languageId, amount]) => {
        if (!languageIds.has(languageId)) problems.push(`${owner} 引用了未知语言 ${languageId}`);
        if (!Number.isFinite(Number(amount))) problems.push(`${owner} 的语言变化不是数字：${languageId}`);
      });
    }
  });

  return problems;
}

function collectDeltaProblems(data) {
  const problems = [];
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const languageIds = new Set(Object.keys(data.initialStateTemplate?.languages || {}));
  const endingIds = new Set(Object.keys(data.endingDefinitions || {}));
  const allEventBuckets = [
    ["事件", data.events || {}],
    ["路遇事件", data.routeEvents || {}],
    ["随机路遇事件", data.randomRouteEvents || {}],
    ["危机事件", data.crisisEvents || {}]
  ];

  (data.routes || []).forEach((route) => {
    problems.push(...validateDeltaObject(
      route.cost,
      `路线 ${route.id}`,
      resourceKeys,
      languageIds,
      endingIds
    ));
  });

  Object.values(data.locations || {}).forEach((location) => {
    if (location.fieldNote?.effect) {
      problems.push(...validateDeltaObject(
        location.fieldNote.effect,
        `地点 ${location.id} / 采风题材`,
        resourceKeys,
        languageIds,
        endingIds
      ));
    }
    (location.supplies || []).forEach((supply) => {
      problems.push(...validateDeltaObject(
        supply.effect,
        `地点 ${location.id} / 补给 ${supply.id || "未知"}`,
        resourceKeys,
        languageIds,
        endingIds
      ));
    });
  });

  allEventBuckets.forEach(([bucketLabel, bucket]) => {
    Object.entries(bucket).forEach(([eventId, event]) => {
      (event.choices || []).forEach((choice) => {
        problems.push(...validateDeltaObject(
          choice.effect,
          `${bucketLabel} ${eventId} / 选项 ${choice.label || choice.id || "未知"}`,
          resourceKeys,
          languageIds,
          endingIds
        ));
      });
    });
  });

  return problems;
}

function getSupplyProfile(location, resourceKeys) {
  const totals = Object.fromEntries(resourceKeys.map((key) => [key, 0]));
  (location.supplies || []).forEach((supply) => {
    resourceKeys.forEach((key) => {
      totals[key] += Math.max(0, Number(supply.effect?.[key] || 0));
    });
  });
  const positiveKeys = resourceKeys.filter((key) => totals[key] > 0);
  const dominantKey = positiveKeys
    .map((key) => ({ key, value: totals[key] }))
    .sort((a, b) => b.value - a.value || a.key.localeCompare(b.key))[0]?.key || "";
  return {
    positiveKeys,
    signature: positiveKeys.join("+") || "none",
    dominantKey,
    totals
  };
}

function collectSupplyDiversityProblems(data) {
  const problems = [];
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const profiles = [];
  const dominantKeys = new Set();

  Object.values(data.locations || {}).forEach((location) => {
    if (!Array.isArray(location.supplies)) {
      problems.push(`地点 ${location.id} 的 supplies 不是数组`);
      return;
    }
    if (!location.supplies.length) {
      problems.push(`地点 ${location.id} 没有补给选项`);
      return;
    }

    const supplySignatures = new Set();
    location.supplies.forEach((supply) => {
      const effectSignature = resourceKeys.map((key) => `${key}:${Number(supply.effect?.[key] || 0)}`).join("|");
      if (supplySignatures.has(effectSignature)) {
        problems.push(`地点 ${location.id} 有重复补给效果：${effectSignature}`);
      }
      supplySignatures.add(effectSignature);
      if (resourceKeys.every((key) => Number(supply.effect?.[key] || 0) === 0)) {
        problems.push(`地点 ${location.id} / 补给 ${supply.id || "未知"} 没有任何资源变化`);
      }
    });

    const profile = getSupplyProfile(location, resourceKeys);
    profiles.push({ locationId: location.id, ...profile });
    if (!profile.positiveKeys.length) {
      problems.push(`地点 ${location.id} 的补给没有任何正向资源侧重`);
    }
    if (profile.dominantKey) dominantKeys.add(profile.dominantKey);
  });

  const uniqueProfileCount = new Set(profiles.map((profile) => profile.signature)).size;
  if (uniqueProfileCount < 3) {
    problems.push(`补给资源画像过少：仅 ${uniqueProfileCount} 类`);
  }
  resourceKeys.forEach((key) => {
    if (!dominantKeys.has(key)) {
      problems.push(`缺少以 ${key} 为主要收益的地点补给`);
    }
  });

  return problems;
}

function collectRouteDestinationSupplyProblems(data) {
  const problems = [];
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const locations = data.locations || {};

  (data.routes || []).forEach((route) => {
    const destination = locations[route.to];
    if (!destination) return;
    if (!Array.isArray(destination.supplies) || !destination.supplies.length) {
      problems.push(`路线 ${route.id} 的目的地 ${route.to} 没有可预览补给`);
      return;
    }

    const profile = getSupplyProfile(destination, resourceKeys);
    if (!profile.positiveKeys.length) {
      problems.push(`路线 ${route.id} 的目的地 ${route.to} 没有正向补给画像`);
    }
  });

  return problems;
}

function collectLocationFlavorProblems(data) {
  const problems = [];
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});

  Object.values(data.locations || {}).forEach((location) => {
    if (!String(location.arrivalText || "").trim()) {
      problems.push(`地点 ${location.id} 缺少 arrivalText 抵达句`);
    }
    if (String(location.detail || "").trim().length < 24) {
      problems.push(`地点 ${location.id} 的 detail 过短，缺少地点志信息`);
    }
    if (!location.fieldNote || typeof location.fieldNote !== "object" || Array.isArray(location.fieldNote)) {
      problems.push(`地点 ${location.id} 缺少 fieldNote 采风题材`);
    } else {
      ["category", "subject", "evidence", "clue"].forEach((key) => {
        if (!String(location.fieldNote[key] || "").trim()) {
          problems.push(`地点 ${location.id} 的 fieldNote.${key} 为空`);
        }
      });
      const effect = location.fieldNote.effect || {};
      const hasResourceEffect = resourceKeys.some((key) => Number(effect[key] || 0) !== 0);
      if (!hasResourceEffect) {
        problems.push(`地点 ${location.id} 的 fieldNote.effect 缺少资源取舍`);
      }
    }
    if ((location.supplies || []).length && !String(location.supplyDiscoveryText || "").trim()) {
      problems.push(`地点 ${location.id} 有补给但缺少 supplyDiscoveryText`);
    }
  });

  return problems;
}

function collectLocationSanityTextProblems(data) {
  const problems = [];

  Object.values(data.locations || {}).forEach((location) => {
    ["uneasy", "mad"].forEach((band) => {
      const text = String(location.sanityDetails?.[band] || "").trim();
      if (text.length < 18) {
        problems.push(`地点 ${location.id} 缺少可读的 ${band} 低神志地点志`);
      }
    });
  });

  return problems;
}

function isCaravanPath(value) {
  return typeof value === "string" && /(^|\/)(CAR-|车队层\/)/.test(value);
}

function validateLayerPath(filePath, owner, layer, problems) {
  if (!filePath) return;
  if (layer !== "caravan" && isCaravanPath(filePath)) {
    problems.push(`${owner} 的 ${layer} 层引用了车队素材：${filePath}`);
  }
  if (layer === "caravan" && !isCaravanPath(filePath)) {
    problems.push(`${owner} 的 caravan 层不像车队素材：${filePath}`);
  }
}

function collectStageAssetProblems(data) {
  const problems = [];
  const assets = data.stageAssets || {};
  const profiles = assets.profiles || {};
  const defaultProfile = profiles.default || {};
  const locations = data.locations || {};
  const terrainKeys = data.terrainKeys || [];
  const layerKeys = ["background", "foreground", "atmosphere", "pollution", "caravan"];

  if (!assets.map?.background) problems.push("stageAssets.map.background 缺失");
  if (!profiles.default) problems.push("stageAssets.profiles.default 缺失");

  Object.entries(profiles).forEach(([profileId, profile]) => {
    const merged = { ...defaultProfile, ...profile };
    ["background", "foreground", "pollution", "caravan"].forEach((layer) => {
      if (!merged[layer]) problems.push(`舞台 profile ${profileId} 缺少 ${layer} 层素材`);
    });
    layerKeys.forEach((layer) => {
      validateLayerPath(merged[layer], `舞台 profile ${profileId}`, layer, problems);
    });
  });

  terrainKeys.forEach((terrain) => {
    const profileId = assets.terrainProfiles?.[terrain];
    if (!profileId) {
      problems.push(`地形 ${terrain} 缺少舞台 profile 映射`);
    } else if (!profiles[profileId]) {
      problems.push(`地形 ${terrain} 引用了不存在的舞台 profile：${profileId}`);
    }
  });

  const generatedStageBackgrounds = assets.generatedStageBackgrounds || {};
  terrainKeys.forEach((terrain) => {
    const generatedPath = generatedStageBackgrounds[terrain];
    if (!generatedPath) {
      problems.push(`地形 ${terrain} 缺少 A 组生成长图候选路径`);
      return;
    }
    if (!generatedPath.includes("A组风格锁定/") || !generatedPath.includes("MID-BG-")) {
      problems.push(`地形 ${terrain} 的 A 组生成长图路径命名不规范：${generatedPath}`);
    }
    if (isCaravanPath(generatedPath)) {
      problems.push(`地形 ${terrain} 的 A 组生成长图误用了车队素材：${generatedPath}`);
    }
  });
  Object.entries(generatedStageBackgrounds).forEach(([terrain]) => {
    if (!terrainKeys.includes(terrain)) {
      problems.push(`generatedStageBackgrounds 引用了未知地形：${terrain}`);
    }
  });
  Object.entries(profiles).forEach(([profileId, profile]) => {
    const generatedKey = profile.generatedBackgroundKey;
    if (generatedKey !== undefined && !generatedStageBackgrounds[generatedKey]) {
      problems.push(`舞台 profile ${profileId} 引用了不存在的 A 组生成长图 key：${generatedKey}`);
    }
  });

  Object.entries(assets.locationProfiles || {}).forEach(([locationId, profileId]) => {
    if (!locations[locationId]) problems.push(`locationProfiles 引用了不存在的地点：${locationId}`);
    if (!profiles[profileId]) problems.push(`地点 ${locationId} 引用了不存在的舞台 profile：${profileId}`);
  });

  Object.keys(locations).forEach((locationId) => {
    if (!assets.locationProfiles?.[locationId]) {
      const terrain = locations[locationId].terrain;
      const fallbackProfile = assets.terrainProfiles?.[terrain];
      if (!fallbackProfile || !profiles[fallbackProfile]) {
        problems.push(`地点 ${locationId} 缺少专属 profile，且地形 ${terrain} 没有有效兜底`);
      }
    }
  });

  Object.entries(assets.locationIllustrations || {}).forEach(([locationId]) => {
    if (!locations[locationId]) problems.push(`locationIllustrations 引用了不存在的地点：${locationId}`);
  });

  Object.keys(locations).forEach((locationId) => {
    if (!assets.locationIllustrations?.[locationId]) {
      problems.push(`地点 ${locationId} 缺少 locationIllustrations`);
    }
  });

  Object.entries(assets.failureIllustrations || {}).forEach(([resourceKey, filePath]) => {
    if (!data.resourceKeys?.includes(resourceKey)) {
      problems.push(`failureIllustrations 引用了未知资源：${resourceKey}`);
    }
    if (isCaravanPath(filePath)) {
      problems.push(`failureIllustrations.${resourceKey} 误用了车队素材：${filePath}`);
    }
  });

  const allowedEndingIllustrationFallbacks = new Set(["lost", "stranded"]);
  Object.entries(assets.endingIllustrations || {}).forEach(([endingId, filePath]) => {
    if (!data.endingDefinitions?.[endingId] && !allowedEndingIllustrationFallbacks.has(endingId)) {
      problems.push(`endingIllustrations 引用了未知结局：${endingId}`);
    }
    if (isCaravanPath(filePath)) {
      problems.push(`endingIllustrations.${endingId} 误用了车队素材：${filePath}`);
    }
  });

  return problems;
}

function collectEventIllustrationProblems(data) {
  const problems = [];
  const assets = data.stageAssets || {};
  const eventIllustrations = assets.eventIllustrations || {};
  const routeEventIllustrations = assets.routeEventIllustrations || {};
  const events = data.events || {};
  const routeEvents = {
    ...(data.routeEvents || {}),
    ...(data.randomRouteEvents || {})
  };

  Object.entries(eventIllustrations).forEach(([eventId, filePath]) => {
    if (!events[eventId]) {
      problems.push(`eventIllustrations 引用了不存在的地点事件：${eventId}`);
    }
    if (isCaravanPath(filePath)) {
      problems.push(`eventIllustrations.${eventId} 误用了车队素材：${filePath}`);
    }
  });
  Object.keys(events).forEach((eventId) => {
    if (!eventIllustrations[eventId]) {
      problems.push(`地点事件 ${eventId} 缺少 eventIllustrations`);
    }
  });

  Object.entries(routeEventIllustrations).forEach(([eventId, filePath]) => {
    if (!routeEvents[eventId]) {
      problems.push(`routeEventIllustrations 引用了不存在的路遇事件：${eventId}`);
    }
    if (isCaravanPath(filePath)) {
      problems.push(`routeEventIllustrations.${eventId} 误用了车队素材：${filePath}`);
    }
  });
  Object.keys(routeEvents).forEach((eventId) => {
    if (!routeEventIllustrations[eventId]) {
      problems.push(`路遇事件 ${eventId} 缺少 routeEventIllustrations`);
    }
  });

  return problems;
}

function collectAudioHookProblems(data) {
  const problems = [];
  const audioAssets = data.audioAssets || {};
  const audioHooks = data.audioHooks || {};
  const requiredHooks = ["mapOpen", "mapReveal", "locationArrive", "routeSelect", "supplyComplete"];

  requiredHooks.forEach((hook) => {
    if (!audioHooks[hook]) problems.push(`audioHooks 缺少 ${hook}`);
  });

  Object.entries(audioHooks).forEach(([hook, audioKey]) => {
    if (typeof audioKey !== "string" || !audioKey) {
      problems.push(`audioHooks.${hook} 不是有效音频 key`);
      return;
    }
    if (!audioAssets[audioKey]) {
      problems.push(`audioHooks.${hook} 指向不存在的 audioAssets.${audioKey}`);
    }
  });

  Object.entries(audioAssets).forEach(([audioKey, asset]) => {
    if (!asset || typeof asset !== "object" || Array.isArray(asset)) {
      problems.push(`audioAssets.${audioKey} 不是对象`);
      return;
    }
    if (!asset.id || !asset.name || !asset.type) {
      problems.push(`audioAssets.${audioKey} 缺少 id/name/type`);
    }
    if (asset.loop !== undefined && typeof asset.loop !== "boolean") {
      problems.push(`audioAssets.${audioKey}.loop 不是布尔值`);
    }
    if (asset.volume !== undefined && !Number.isFinite(Number(asset.volume))) {
      problems.push(`audioAssets.${audioKey}.volume 不是数字`);
    }
  });

  return problems;
}

function collectRoutePreviewContractProblems(app, css, html) {
  const problems = [];
  const htmlContracts = [
    ["九州图路线预览条", 'id="mapRoutePreview"'],
    ["路线预览图标", 'id="mapRoutePreviewIcon"'],
    ["路线预览标题", 'id="mapRoutePreviewTitle"'],
    ["路线预览详情", 'id="mapRoutePreviewDetail"']
  ];
  const appContracts = [
    ["路线预览状态函数", "function getMapRoutePreviewState"],
    ["路线预览渲染函数", "function renderMapRoutePreview"],
    ["路线预览随路线列表刷新", "renderMapRoutePreview(available)"],
    ["路线预览选中态显示再点启程", "title: `再点启程：${destinationName}`"],
    ["路线预览显示路线资源消耗", "formatCostShort(route.cost)"],
    ["路线预览显示目的地补给", "getDestinationSupplyPreview(route.to)"],
    ["路线卡片使用目标地点插图", "getLocationIllustrationSrc(route.to)"],
    ["路线卡片展示出发与目标地点", "route-path"],
    ["路线卡片展示目标地点短标签", "route-destination"],
    ["路线卡片目标地点短标签使用目的地名", "<b>至</b>${toName}"],
    ["路线卡片展示资源消耗预测", 'renderResourceDeltaChips(route.cost, { emptyLabel: "无耗", predict: true })'],
    ["路线卡片展示风险等级", "renderRouteRiskBadge(route)"],
    ["路线卡片展示路遇摘要", "formatRouteEventShort(route)"],
    ["路线卡片展示半途资源倾向", "renderRouteSignalBadge(routeSignal)"],
    ["路线卡片复用半途资源倾向算法", "getRouteSignalForRoute(route)"],
    ["路线卡片写入资源倾向数据", 'data-event-tone="${escapeHtml(routeSignal.tone)}"'],
    ["路线卡片展示符号情报条", "renderRouteIntelStrip(route, routeSignal)"],
    ["路线卡片情报条写入类型数据", "data-intel-type"],
    ["路线卡片情报条区分风险类型", 'type: "risk"'],
    ["路线卡片情报条区分定遇类型", 'type: handled ? "done" : "event"'],
    ["路线卡片情报条区分异象类型", 'type: "omen"'],
    ["路线卡片情报条区分补救类型", 'type: "rescue"'],
    ["路线卡片情报条区分补给类型", 'type: "supply"'],
    ["路线卡片符号情报条含补给压缩", "formatRouteSupplyIntelLabel(route.to)"],
    ["路线卡片展示异象/保底标签", "renderRouteOmenBadges(route)"],
    ["路线卡片展示目标补给预览", "getDestinationSupplyPreview(route.to)"],
    ["路线卡片保留补给预览样式钩子", "route-supply-preview"],
    ["路线卡片点击先进入确认预览", "function confirmRoute"],
    ["路线卡片二次点击才启程", "if (!isRoutePreviewSelected(route))"],
    ["路线卡片选中态写入 aria", 'aria-pressed="${selected}"'],
    ["路线卡片选中后提示再点启程", "route-confirm-mark"],
    ["路线卡片和地图节点复用确认点击", "confirmRoute(button.dataset.route)"]
  ];
  const cssContracts = [
    ["路线预览条样式", ".map-route-preview"],
    ["路线预览图标样式", ".map-route-preview-icon"],
    ["路线预览选中态样式", '.map-route-preview[data-state="selected"]'],
    ["路线预览阻断态样式", '.map-route-preview[data-state="blocked"]'],
    ["路线预览小横屏压缩", ".map-route-panel .map-route-preview"],
    ["路线面板有卡片布局", ".map-route-panel .route-card"],
    ["路线面板支持三到四条路线一屏压缩", '.map-route-panel .route-list[data-count="4"]'],
    ["路线卡保留风险行样式", ".route-risk-row"],
    ["路线卡保留异象标签样式", ".route-omen-row"],
    ["路线卡保留半途倾向徽记样式", ".route-signal-badge"],
    ["路线卡半途倾向小横屏降噪", ".map-route-panel .route-signal-badge small"],
    ["路线卡保留符号情报条样式", ".route-intel-strip"],
    ["路线卡情报条定遇颜色分层", ".route-intel-chip.event"],
    ["路线卡情报条异象颜色分层", ".route-intel-chip.omen"],
    ["路线卡情报条补救颜色分层", ".route-intel-chip.rescue"],
    ["路线卡情报条补给颜色分层", ".route-intel-chip.supply"],
    ["路线卡情报条小横屏稳定尺寸", ".map-route-panel .route-card .route-intel-chip"],
    ["路线卡目标地点短标签样式", ".route-destination"],
    ["路线卡目标地点短标签小横屏样式", ".map-route-panel .route-card .route-destination"],
    ["九州图小横屏路线盘浮层化", ".map-route-panel {\n    position: absolute;"],
    ["九州图小横屏地图全宽", "grid-template-columns: minmax(0, 1fr);"],
    ["九州图小横屏路线盘限制宽度", "width: min(44%, 390px)"],
    ["两条路线小横屏改为宽卡竖排", '.map-route-panel .route-list[data-count="2"]'],
    ["路线卡小横屏内容高度压缩", "grid-auto-rows: minmax(64px, auto)"],
    ["路线卡小横屏不拉伸空白", "align-content: start"],
    ["路线卡小横屏三行网格", ".map-route-panel .route-card {\n    display: grid;"],
    ["路线卡符号情报条小横屏隐藏旧长行", ".map-route-panel .route-risk-row,\n  .map-route-panel .route-omen-row,\n  .map-route-panel .route-supply-preview"],
    ["路线卡保留补给预览样式", ".route-supply-preview"],
    ["路线卡选中态样式", ".route-card.selected"],
    ["路线卡确认小章样式", ".route-confirm-mark"],
    ["地图节点选中态样式", ".map-node.selected"]
  ];

  htmlContracts.forEach(([label, needle]) => {
    if (!html.includes(needle)) problems.push(`${label}：缺少 ${needle}`);
  });
  appContracts.forEach(([label, needle]) => {
    if (!app.includes(needle)) problems.push(`${label}：缺少 ${needle}`);
  });
  cssContracts.forEach(([label, needle]) => {
    if (!css.includes(needle)) problems.push(`${label}：缺少 ${needle}`);
  });

  return problems;
}

function run() {
  const html = read(FILES.html);
  const app = read(FILES.app);
  const css = read(FILES.css);
  const launcher = read(FILES.launcher);
  const readme = read(FILES.readme);
  const webdeployPackage = fs.existsSync(FILES.webdeployPackage) ? read(FILES.webdeployPackage) : "";
  const balanceSimSource = fs.existsSync(FILES.balanceSim) ? read(FILES.balanceSim) : "";
  const dataSource = read(FILES.data);
  const data = loadGameData();

  check("game data loaded", Boolean(data.locations && data.routes && data.events));

  const allEvents = {
    ...(data.events || {}),
    ...(data.routeEvents || {}),
    ...(data.randomRouteEvents || {}),
    ...(data.crisisEvents || {})
  };
  const allRouteEvents = {
    ...(data.routeEvents || {}),
    ...(data.randomRouteEvents || {})
  };

  const locationIds = Object.keys(data.locations || {});
  const routeIds = new Set((data.routes || []).map((route) => route.id));
  const routeById = new Map((data.routes || []).map((route) => [route.id, route]));
  const routeEndpointProblems = (data.routes || []).filter((route) => (
    !data.locations?.[route.from] || !data.locations?.[route.to]
  ));
  const duplicateRouteIds = [...routeIds].filter((id) => (
    (data.routes || []).filter((route) => route.id === id).length > 1
  ));
  const missingLocationEvents = locationIds.filter((id) => (
    data.locations[id].event && !data.events?.[data.locations[id].event]
  ));
  const missingRouteEvents = (data.routes || []).filter((route) => (
    route.midEvent && !allRouteEvents[route.midEvent]
  ));
  const startLocation = data.startLocation || "central_post";
  const targetLocation = data.locations?.kyushu_rift ? "kyushu_rift" : locationIds[locationIds.length - 1];
  const reachableLocations = getReachableLocations(startLocation, data.routes || []);
  const unreachableLocations = locationIds.filter((id) => !reachableLocations.has(id));
  const deadEndLocations = locationIds.filter((id) => (
    id !== targetLocation
    && (data.routes || []).filter((route) => route.from === id).length === 0
  ));
  const routeOnlyPath = findRouteOnlySurvivablePath(data, startLocation, targetLocation);
  const revealReferenceProblems = collectRevealReferenceProblems(data, routeById);
  const routePoolReferenceProblems = collectRoutePoolReferenceProblems(data, routeById);
  const deltaProblems = collectDeltaProblems(data);
  const supplyDiversityProblems = collectSupplyDiversityProblems(data);
  const routeDestinationSupplyProblems = collectRouteDestinationSupplyProblems(data);
  const locationFlavorProblems = collectLocationFlavorProblems(data);
  const locationSanityTextProblems = collectLocationSanityTextProblems(data);
  const stageAssetProblems = collectStageAssetProblems(data);
  const eventIllustrationProblems = collectEventIllustrationProblems(data);
  const audioHookProblems = collectAudioHookProblems(data);
  const routePreviewContractProblems = collectRoutePreviewContractProblems(app, css, html);

  check("route ids unique", duplicateRouteIds.length === 0, duplicateRouteIds.join("\n"));
  check("route endpoints exist", routeEndpointProblems.length === 0, JSON.stringify(routeEndpointProblems, null, 2));
  check("location events exist", missingLocationEvents.length === 0, missingLocationEvents.join("\n"));
  check("route event references exist", missingRouteEvents.length === 0, JSON.stringify(missingRouteEvents, null, 2));
  check("start location exists", Boolean(data.locations?.[startLocation]), startLocation);
  check("target location exists", Boolean(data.locations?.[targetLocation]), targetLocation);
  check("target reachable from start", reachableLocations.has(targetLocation), `${startLocation} -> ${targetLocation}`);
  check("all locations reachable from start", unreachableLocations.length === 0, unreachableLocations.join("\n"));
  check("no non-target route dead ends", deadEndLocations.length === 0, deadEndLocations.join("\n"));
  check("route-only survivable path exists", Boolean(routeOnlyPath), `${startLocation} -> ${targetLocation}`);
  check("reveal plan references valid", revealReferenceProblems.length === 0, revealReferenceProblems.join("\n"));
  check("route pool references valid", routePoolReferenceProblems.length === 0, routePoolReferenceProblems.join("\n"));
  check("resource delta fields valid", deltaProblems.length === 0, deltaProblems.join("\n"));
  check("supply diversity valid", supplyDiversityProblems.length === 0, supplyDiversityProblems.join("\n"));
  check("route destination supplies previewable", routeDestinationSupplyProblems.length === 0, routeDestinationSupplyProblems.join("\n"));
  check("location arrival and supply flavor covered", locationFlavorProblems.length === 0, locationFlavorProblems.join("\n"));
  check("location sanity text covered", locationSanityTextProblems.length === 0, locationSanityTextProblems.join("\n"));
  check("stage asset references valid", stageAssetProblems.length === 0, stageAssetProblems.join("\n"));
  check("event illustrations covered", eventIllustrationProblems.length === 0, eventIllustrationProblems.join("\n"));
  check("event illustration render contract", (
    app.includes("function getEventIllustrationSrc")
    && app.includes("function getRouteEventIllustrationSrc")
    && app.includes("renderEventArt(getEventIllustrationSrc")
    && app.includes("renderEventArt(getRouteEventIllustrationSrc")
  ));
  check("scenery-first stage mode", (
    data.stageAssets?.profiles?.default?.travelMode === "scenery"
    && app.includes("dataset.travelMode")
    && css.includes(".journey-stage.scenery-first")
    && css.includes("@keyframes sceneryDrift")
  ));
  check("caravan fallback asset retained", (
    data.stageAssets?.profiles?.default?.caravan?.includes("CAR-013_双马辎重车透明抠图.png")
    && html.includes("CAR-013_双马辎重车透明抠图.png")
  ));
  check("audio hook references valid", audioHookProblems.length === 0, audioHookProblems.join("\n"));
  check("route preview contract", routePreviewContractProblems.length === 0, routePreviewContractProblems.join("\n"));
  check("sanity audio trigger contract", (
    app.includes('setLoopVolume("sanityLight", sanity <= 55 && sanity > 25')
    && app.includes('setLoopVolume("sanityLow", sanity <= 25 || state.status === "crisis"')
    && app.includes("function updateAudioLayers()")
    && app.includes("updateAudioLayers();")
  ));
  check("audio play rejection is separated from asset failure", (
    app.includes("blocked: new Set()")
    && app.includes("audioState.blocked.add(key)")
    && app.includes("浏览器暂未放行")
    && app.includes("素材加载失败")
  ));
  check("resource warning audio contract", (
    app.includes('const warningMap = { axle: "warnAxle", grain: "warnGrain", sanity: "warnSanity" }')
    && app.includes("RESOURCE_WARNING_LIMITS")
    && app.includes("audioState.warningPlayed[key]")
    && app.includes("playElement(warningMap[key])")
    && app.includes("playElement(warningMap[crisisType])")
  ));
  check("resource visual pressure contract", (
    html.includes('id="stageConditionLights"')
    && html.includes('data-resource-light="axle"')
    && app.includes("function getResourceStatuses()")
    && app.includes("function applyStageResourcePressure")
    && app.includes("low-${key}")
    && app.includes("critical-${key}")
    && css.includes(".stage-condition-lights")
    && css.includes(".journey-stage.low-grain::after")
    && css.includes(".caravan.critical-axle")
    && css.includes("@keyframes conditionPulse")
  ));
  check("resource icon chip contract", (
    app.includes('data-resource="${key}"')
    && app.includes('class="resource-delta-value"')
    && css.includes('.resource-delta-chip::before')
    && css.includes(".choice-card .resource-delta-row")
    && css.includes(".choice-card .resource-delta-chip")
    && css.includes(".choice-card .resource-delta-value")
    && css.includes('RES-001_车轴资源图标绿幕_透明抠图.png')
    && css.includes('RES-002_粮草资源图标绿幕_透明抠图.png')
    && css.includes('RES-003_神志资源图标绿幕_透明抠图.png')
  ));
  const mapNodeSlicePaths = [
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/P1_map_node_gold_14_keyed.png",
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/P1_map_node_gray_unknown_21_keyed.png",
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/P1_map_pin_red_01_keyed.png",
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线/P0_map_route_line_06.png",
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线/P1_map_red_route_segment_50.png",
    "../../02_设计资产/可用素材/UI切片精选/地图节点路线_透明处理/P1_map_fog_small_09_keyed.png"
  ];
  check("map node ui slice contract", (
    mapNodeSlicePaths.every((assetPath) => fs.existsSync(path.resolve(ROOT, assetPath)))
    && css.includes("--map-node-gold")
    && css.includes("--map-node-gray")
    && css.includes("--map-node-pin")
    && css.includes("--map-route-paper")
    && css.includes("--map-route-red")
    && css.includes("--map-fog-patch")
    && css.includes("地图节点路线_透明处理")
    && css.includes("P0_map_route_line_06.png")
    && css.includes("P1_map_red_route_segment_50.png")
    && app.includes("function renderMapNodeSupplyStrip")
    && app.includes("function getAvailableSupplyGain")
    && app.includes("map-node-supply-strip")
    && css.includes(".map-node .map-node-supply-strip")
    && css.includes(".map-node .map-node-supply-chip")
    && css.includes(".game-landscape-shell .map-node .map-node-supply-chip:nth-child(n+3)")
    && css.includes(".game-landscape-shell .map-node.current::before")
  ), "map keyed UI slices are missing or not referenced");
  if (routeOnlyPath) {
    const routeNames = routeOnlyPath.path.map((route) => route.id).join(" -> ");
    console.log(`INFO route-only path: ${routeNames}`);
    console.log(`INFO route-only remaining: ${JSON.stringify(routeOnlyPath.resources)}`);
    console.log(`INFO route-only minimums: ${JSON.stringify(routeOnlyPath.minimums)}`);
  }

  const choiceCounts = Object.entries(allEvents).map(([id, event]) => ({
    id,
    title: event.title || id,
    count: (event.choices || []).length
  }));
  const supplyCounts = Object.entries(data.locations || {}).map(([id, location]) => ({
    id,
    name: location.name || id,
    count: (location.supplies || []).length
  }));
  const routeCounts = Object.keys(data.locations || {}).map((id) => ({
    id,
    name: data.locations[id].name || id,
    count: (data.routes || []).filter((route) => route.from === id).length
  }));
  const overChoiceBudget = choiceCounts.filter((item) => item.count > 4);
  const overSupplyBudget = supplyCounts.filter((item) => item.count > 4);
  const overRouteBudget = routeCounts.filter((item) => item.count > 4);

  check("choice budget <= 4", overChoiceBudget.length === 0, JSON.stringify(overChoiceBudget, null, 2));
  check("supply budget <= 4", overSupplyBudget.length === 0, JSON.stringify(overSupplyBudget, null, 2));
  check("route budget <= 4", overRouteBudget.length === 0, JSON.stringify(overRouteBudget, null, 2));
  if (choiceCounts.length && supplyCounts.length && routeCounts.length) {
    const maxChoices = maxBy(choiceCounts, "count");
    const maxSupplies = maxBy(supplyCounts, "count");
    const maxRoutes = maxBy(routeCounts, "count");
    console.log(`INFO max choices: ${maxChoices.id} ${maxChoices.count}`);
    console.log(`INFO max supplies: ${maxSupplies.id} ${maxSupplies.count}`);
    console.log(`INFO max routes: ${maxRoutes.id} ${maxRoutes.count}`);
  }

  const optionalGeneratedStagePaths = new Set(
    Object.values(data.stageAssets?.generatedStageBackgrounds || {})
  );
  const pathRefs = unique(collectStrings(data).filter((item) => (
    RESOURCE_EXTENSIONS.test(item) && !optionalGeneratedStagePaths.has(item)
  )));
  const missingPaths = pathRefs.filter((item) => !fs.existsSync(path.resolve(ROOT, item)));
  check("referenced media files exist", missingPaths.length === 0, missingPaths.join("\n"));
  console.log(`INFO media refs: ${pathRefs.length}`);
  check("optional A-stage generated paths are non-blocking", (
    optionalGeneratedStagePaths.size === 4
    && [...optionalGeneratedStagePaths].every((item) => item.includes("A组风格锁定/MID-BG-"))
    && app.includes("preloadGeneratedStageBackgrounds")
    && app.includes("getReadyGeneratedStageBackground")
    && app.includes('dataset.generatedBackground = readyGeneratedBackground ? "ready" : "fallback"')
  ), JSON.stringify([...optionalGeneratedStagePaths], null, 2));
  check("optional B/C generated illustration paths are non-blocking", (
    app.includes("GENERATED_LOCATION_EVENT_ROOT")
    && app.includes("B组地点事件图")
    && app.includes("GENERATED_ENCOUNTER_ROOT")
    && app.includes("C组路遇危机结局图")
    && app.includes("preloadGeneratedIllustrations")
    && app.includes("getReadyGeneratedIllustration")
    && app.includes("getGeneratedLocationIllustrationCandidate")
    && app.includes("getGeneratedEventIllustrationCandidate")
    && app.includes("getGeneratedRouteEventIllustrationCandidate")
    && app.includes("getGeneratedCrisisIllustrationCandidate")
    && app.includes("getGeneratedEndingIllustrationCandidate")
    && app.includes("END-003_lost_stranded_迷失九州_旅途断绝.png")
  ), "B/C generated illustration optional loader contract missing");
  const assetReadiness = fs.existsSync(FILES.assetReadiness) ? read(FILES.assetReadiness) : "";
  check("generated art readiness checker contract", (
    assetReadiness.includes("buildExpectedAssets")
    && assetReadiness.includes("--strict")
    && assetReadiness.includes("--write-manifest")
    && assetReadiness.includes("--write-import-workbench")
    && assetReadiness.includes("--write-entry-status")
    && assetReadiness.includes("A-stage")
    && assetReadiness.includes("B-location")
    && assetReadiness.includes("C-ending")
    && assetReadiness.includes("RATIO_TOLERANCE")
    && assetReadiness.includes("ENCOUNTER_RATIOS")
    && assetReadiness.includes("1:1 / 4:3 / 16:9")
    && assetReadiness.includes("expectedRatios")
    && assetReadiness.includes("FIRST_PASS_PRIORITIES")
    && assetReadiness.includes("--priority")
    && assetReadiness.includes("--markdown")
    && assetReadiness.includes("black_teeth_scale_price")
  ), "asset-readiness-check.js missing or incomplete");
  const generatedArtManifest = fs.existsSync(FILES.generatedArtManifest) ? read(FILES.generatedArtManifest) : "";
  check("generated art manifest clean-load contract", (
    html.includes("generated-art-manifest.js")
    && html.includes("RES-003_神志资源图标绿幕_透明抠图.png")
    && app.includes("BSI_GENERATED_ART_MANIFEST")
    && app.includes("GENERATED_ASSET_PROBE_PARAM")
    && app.includes("probeGeneratedAssets")
    && app.includes("manifest-missing")
    && app.includes("preloadGeneratedImageCandidate")
    && generatedArtManifest.includes("window.BSI_GENERATED_ART_MANIFEST")
    && generatedArtManifest.includes("ready")
  ), "generated art manifest loader contract missing");
  check("generated art cache-bust contract", (
    html.includes("generated-art-manifest.js?v=20260624-c159")
    && launcher.includes("generated-art-status.js?v=20260624-c159")
    && launcher.includes("visual-replacement-status.js?v=20260624-c159")
    && launcher.includes('<span class="build">20260624-c159</span>')
    && !html.includes("generated-art-manifest.js?v=20260619-c083")
    && !launcher.includes("generated-art-status.js?v=20260619-c083")
  ), "generated art manifest/status cache version is stale");
  const generatedArtImportWorkbench = fs.existsSync(FILES.generatedArtImportWorkbench)
    ? read(FILES.generatedArtImportWorkbench)
    : "";
  check("generated art import workbench contract", (
    assetReadiness.includes("buildImportWorkbench")
    && assetReadiness.includes("CANDIDATE_KEYWORDS_BY_KEY")
    && readme.includes("--write-import-workbench")
    && generatedArtImportWorkbench.includes("首轮 12 张关键图导入核名工作台")
    && generatedArtImportWorkbench.includes("MID-BG-ROAD-001_古道荒原路段长图.png")
    && generatedArtImportWorkbench.includes("D_BSI-D-023_首轮12张关键图Prompt包.md")
  ), "generated art import workbench missing or incomplete");
  const generatedArtStatus = fs.existsSync(FILES.generatedArtStatus) ? read(FILES.generatedArtStatus) : "";
  const generatedArtManifestData = fs.existsSync(FILES.generatedArtManifest)
    ? loadWindowGlobal(FILES.generatedArtManifest, "BSI_GENERATED_ART_MANIFEST")
    : null;
  const generatedArtStatusData = fs.existsSync(FILES.generatedArtStatus)
    ? loadWindowGlobal(FILES.generatedArtStatus, "BSI_GENERATED_ART_STATUS")
    : null;
  const missingReadyGeneratedArt = (generatedArtManifestData?.ready || [])
    .filter((assetPath) => !fs.existsSync(path.resolve(ROOT, assetPath)));
  check("generated art full library ready", (
    Array.isArray(generatedArtManifestData?.ready)
    && Array.isArray(generatedArtManifestData?.assets)
    && generatedArtManifestData.ready.length >= 59
    && generatedArtManifestData.assets.length >= 59
    && missingReadyGeneratedArt.length === 0
    && generatedArtStatusData?.librarySummary?.total >= 59
    && generatedArtStatusData?.librarySummary?.ready === generatedArtStatusData?.librarySummary?.total
    && generatedArtStatusData?.librarySummary?.missing === 0
    && generatedArtStatusData?.librarySummary?.review === 0
    && generatedArtStatusData?.librarySummary?.invalid === 0
    && generatedArtStatusData?.nextLibraryMissing === null
    && generatedArtStatus.includes('"ready": 59')
  ), missingReadyGeneratedArt.join("\n") || JSON.stringify(generatedArtStatusData?.librarySummary || null, null, 2));
  const generatedArtDeriver = fs.existsSync(FILES.generatedArtDeriver) ? read(FILES.generatedArtDeriver) : "";
  check("playtest entry art status contract", (
    launcher.includes("generated-art-status.js")
    && launcher.includes("assetStatusScore")
    && launcher.includes("assetStatusGroups")
    && launcher.includes("assetPromptLink")
    && launcher.includes("assetWorkbenchLink")
    && launcher.includes("画面素材状态")
    && launcher.includes("画面素材已就绪")
    && launcher.includes("librarySummary")
    && launcher.includes("libraryGroups")
    && assetReadiness.includes("buildEntryStatus")
    && assetReadiness.includes("writeEntryStatus")
    && assetReadiness.includes("librarySummary")
    && assetReadiness.includes("libraryGroups")
    && readme.includes("--write-entry-status")
    && generatedArtStatus.includes("window.BSI_GENERATED_ART_STATUS")
    && generatedArtStatus.includes("librarySummary")
    && generatedArtStatus.includes("libraryGroups")
    && generatedArtStatus.includes("D_BSI-D-023_首轮12张关键图Prompt包.md")
  ), "playtest entry generated art status contract missing");
  check("generated art derivation helper contract", (
    fs.existsSync(FILES.generatedArtDeriver)
    && generatedArtDeriver.includes("asset-readiness-check.js")
    && generatedArtDeriver.includes("--json")
    && generatedArtDeriver.includes("const SOURCE")
    && generatedArtDeriver.includes("const MAP")
    && generatedArtDeriver.includes("magick")
    && readme.includes("derive-playtest-art.js")
  ), "derive-playtest-art.js missing or incomplete");
  const visualReplacementCheck = fs.existsSync(FILES.visualReplacementCheck)
    ? read(FILES.visualReplacementCheck)
    : "";
  const visualReplacementStatus = fs.existsSync(FILES.visualReplacementStatus)
    ? read(FILES.visualReplacementStatus)
    : "";
  const visualReplacementEntryStatus = fs.existsSync(FILES.visualReplacementEntryStatus)
    ? read(FILES.visualReplacementEntryStatus)
    : "";
  const visualReplacementWorkbench = fs.existsSync(FILES.visualReplacementWorkbench)
    ? read(FILES.visualReplacementWorkbench)
    : "";
  const highfreqVisualImport = fs.existsSync(FILES.highfreqVisualImport)
    ? read(FILES.highfreqVisualImport)
    : "";
  const highfreqVisualImportReadme = fs.existsSync(FILES.highfreqVisualImportReadme)
    ? read(FILES.highfreqVisualImportReadme)
    : "";
  check("visual replacement tracker contract", (
    fs.existsSync(FILES.visualReplacementCheck)
    && fs.existsSync(FILES.visualReplacementStatus)
    && fs.existsSync(FILES.visualReplacementEntryStatus)
    && fs.existsSync(FILES.visualReplacementWorkbench)
    && visualReplacementCheck.includes("TARGETS")
    && visualReplacementCheck.includes("baselineSha256")
    && visualReplacementCheck.includes("STRICT_REPLACED")
    && visualReplacementCheck.includes("--write-report")
    && visualReplacementCheck.includes("--write-status")
    && visualReplacementCheck.includes("--write-workbench")
    && visualReplacementCheck.includes("visual-replacement-status.md")
    && visualReplacementCheck.includes("visual-replacement-status.js")
    && visualReplacementCheck.includes("highfreq-visual-replacement-workbench.md")
    && visualReplacementCheck.includes("ENCOUNTER_RATIOS")
    && visualReplacementCheck.includes("1:1 / 4:3 / 16:9")
    && visualReplacementCheck.includes("buildEntryStatus")
    && visualReplacementCheck.includes("buildWorkbench")
    && visualReplacementCheck.includes("highfreq-visual-import.js")
    && visualReplacementCheck.includes("高频重生图导入")
    && visualReplacementCheck.includes("EVT-001")
    && visualReplacementCheck.includes("END-003")
    && visualReplacementStatus.includes("高频重生图替换状态")
    && visualReplacementStatus.includes("进度：已替换")
    && visualReplacementStatus.includes("/11")
    && visualReplacementStatus.includes("EVT-001")
    && visualReplacementStatus.includes("RTE-009")
    && visualReplacementStatus.includes("CRS-003")
    && visualReplacementEntryStatus.includes("window.BSI_VISUAL_REPLACEMENT_STATUS")
    && visualReplacementEntryStatus.includes("D_BSI-D-024_全量试玩图复核与下一轮重生图提示语.md")
    && visualReplacementEntryStatus.includes("highfreq-visual-replacement-workbench.md")
    && visualReplacementWorkbench.includes("高频重生图生产与导入工作台")
    && visualReplacementWorkbench.includes("EVT-001_post_gate_驿门未闭.png")
    && visualReplacementWorkbench.includes("RTE-009_black_teeth_scale_price_黑齿鳞价.png")
    && visualReplacementWorkbench.includes("END-003_lost_stranded_迷失九州_旅途断绝.png")
    && visualReplacementWorkbench.includes("```text")
    && launcher.includes("visual-replacement-status.js")
    && launcher.includes("visual-replacement-status.js?v=20260624-c159")
    && launcher.includes("highfreq-visual-replacement-workbench.md")
    && launcher.includes("priorityVisualScore")
    && launcher.includes("priorityVisualList")
    && launcher.includes("高频重生图")
    && readme.includes("visual-replacement-check.js")
    && readme.includes("--strict-replaced")
  ), "visual-replacement-check.js or visual-replacement-status.md missing or incomplete");

  check("high-frequency visual import helper contract", (
    fs.existsSync(FILES.highfreqVisualImport)
    && fs.existsSync(FILES.highfreqVisualImportReadme)
    && highfreqVisualImport.includes("visual-replacement-status.js")
    && highfreqVisualImport.includes("DEFAULT_SOURCE_DIR")
    && highfreqVisualImport.includes("高频重生图导入")
    && highfreqVisualImport.includes("BACKUP_ROOT")
    && highfreqVisualImport.includes("--apply")
    && highfreqVisualImport.includes("magick")
    && highfreqVisualImport.includes("1, 4 / 3, 16 / 9")
    && highfreqVisualImportReadme.includes("高频重生图导入区")
    && highfreqVisualImportReadme.includes("highfreq-visual-import.js")
    && highfreqVisualImportReadme.includes("EVT-001_post_gate_驿门未闭.png")
    && readme.includes("高频重生图导入")
    && readme.includes("highfreq-visual-import.js --apply")
  ), "highfreq-visual-import.js or staging readme missing or incomplete");

  const audioAssets = data.audioAssets || {};
  const musicProfileByTerrain = data.musicProfileByTerrain || {};
  const musicProfileByLocation = data.musicProfileByLocation || {};
  const musicKeys = Object.entries(audioAssets)
    .filter(([, asset]) => asset?.type === "music")
    .map(([key]) => key);
  const terrainMusicProblems = (data.terrainKeys || [])
    .filter((terrain) => !musicProfileByTerrain[terrain] || !audioAssets[musicProfileByTerrain[terrain]])
    .map((terrain) => `${terrain} -> ${musicProfileByTerrain[terrain] || "未配置"}`);
  const locationMusicProblems = Object.entries(musicProfileByLocation)
    .filter(([locationId, musicKey]) => !data.locations?.[locationId] || !audioAssets[musicKey] || audioAssets[musicKey]?.type !== "music")
    .map(([locationId, musicKey]) => `${locationId} -> ${musicKey || "未配置"}`);
  check("music loop configured", (
    audioAssets.musicLoop?.id === "MUS-CORE-001"
    && audioAssets.musicLoop?.src?.includes("MUS-CORE-001_jiuzhou_ancient_road_webdemo_-24lufs.mp3")
    && audioAssets.musicLoop.loop === true
    && Number(audioAssets.musicLoop.volume) > 0
  ));
  check("contextual music profile configured", (
    musicKeys.length >= 6
    && musicProfileByTerrain.default === "musicLoop"
    && terrainMusicProblems.length === 0
    && locationMusicProblems.length === 0
    && app.includes("function getActiveMusicKey()")
    && app.includes("function getCurrentAudioLocationId()")
    && app.includes("musicProfileByLocation")
    && app.includes("getMusicKeys().forEach")
    && app.includes("activeTerrain")
  ), [...terrainMusicProblems, ...locationMusicProblems].join("\n"));
  check("new core music candidates wired for internal review", (
    audioAssets.musicJourney?.id === "MUS-CORE-005"
    && audioAssets.musicJourney?.src?.includes("MUS-CORE-005_instrumental_mystic_journey_guzheng_pipa_webdemo_-24lufs.mp3")
    && audioAssets.musicJourney?.status === "review-pending"
    && audioAssets.musicDawn?.id === "MUS-CORE-006"
    && audioAssets.musicDawn?.src?.includes("MUS-CORE-006_spring_dawn_instrumental_webdemo_-24lufs.mp3")
    && audioAssets.musicDawn?.status === "review-pending"
    && audioAssets.musicMountain?.id === "MUS-CORE-002"
    && audioAssets.musicMountain?.src?.includes("MUS-CORE-002_mountain_clouds_webdemo_-24lufs.mp3")
    && audioAssets.musicMountain?.status === "review-pending"
    && musicProfileByLocation.bird_mouse_pass === "musicMountain"
    && Object.values(musicProfileByLocation).includes("musicJourney")
    && Object.values(musicProfileByLocation).includes("musicDawn")
    && Object.values(musicProfileByLocation).includes("musicMountain")
  ));
  check("sanity audio layer configured", Boolean(audioAssets.sanityLow || audioAssets.sanityLight));
  check("travel ambience layer configured", (
    audioAssets.travelAmbience?.id === "AMB-TRAVEL-001-SYN"
    && audioAssets.travelAmbience?.src?.includes("AMB-TRAVEL-001_travel_air_wood_frame_placeholder_loop.mp3")
    && audioAssets.travelAmbience?.type === "ambience"
    && audioAssets.travelAmbience?.loop === true
    && audioAssets.travelAmbience?.status === "demo-temporary"
    && app.includes('setLoopVolume("travelAmbience", audioAssets.travelAmbience?.volume || 0.045)')
    && app.includes('asset.type === "ambience"')
    && app.includes("环境层：${ambienceCount} 层")
  ));
  check("audio statuses are temporary/review states", Object.values(audioAssets).every((asset) => (
    ["demo-temporary", "review-pending", "missing"].includes(asset.status)
  )));
  const audioHealthCheck = fs.existsSync(FILES.audioHealthCheck) ? read(FILES.audioHealthCheck) : "";
  const audioHealthStatus = fs.existsSync(FILES.audioHealthStatus) ? read(FILES.audioHealthStatus) : "";
  const audioHealthReport = fs.existsSync(FILES.audioHealthReport) ? read(FILES.audioHealthReport) : "";
  check("audio technical health contract", (
    fs.existsSync(FILES.audioHealthCheck)
    && fs.existsSync(FILES.audioHealthStatus)
    && fs.existsSync(FILES.audioHealthReport)
    && audioHealthStatus.includes("window.BSI_AUDIO_HEALTH_STATUS")
    && audioHealthStatus.includes('"problemCount": 0')
    && audioHealthStatus.includes('"totalAssets": 20')
    && audioHealthReport.includes("音频技术体检通过，待主观听感")
    && audioHealthReport.includes("资产：20；唯一文件：15；阻断项：0")
    && audioHealthReport.includes("所有接入音频文件存在，时长和 loop/短音效规则通过机器体检")
    && audioHealthReport.includes("仍需 P0 听音人回传主观摘要")
    && audioHealthCheck.includes("ffprobe")
    && audioHealthCheck.includes("expectedDurationRange")
    && audioHealthCheck.includes("window.BSI_AUDIO_HEALTH_STATUS")
  ));

  const verses = data.poetryContent?.sceneVerses || {};
  const missingLocationVerses = Object.keys(data.locations || {}).filter((id) => !verses.locations?.[id]);
  const missingEventVerses = Object.keys(data.events || {}).filter((id) => !verses.events?.[id]);
  const missingRouteEventVerses = [
    ...Object.keys(data.routeEvents || {}),
    ...Object.keys(data.randomRouteEvents || {})
  ].filter((id) => !verses.routeEvents?.[id]);
  const missingCrisisVerses = Object.keys(data.crisisEvents || {}).filter((id) => !verses.crisisEvents?.[id]);
  const missingEndingVerses = Object.keys(data.endingDefinitions || {}).filter((id) => !verses.endings?.[id]);
  check("location verses covered", missingLocationVerses.length === 0, missingLocationVerses.join("\n"));
  check("event verses covered", missingEventVerses.length === 0, missingEventVerses.join("\n"));
  check("route event verses covered", missingRouteEventVerses.length === 0, missingRouteEventVerses.join("\n"));
  check("crisis verses covered", missingCrisisVerses.length === 0, missingCrisisVerses.join("\n"));
  check("ending verses covered", missingEndingVerses.length === 0, missingEndingVerses.join("\n"));
  check("poetry line break display contract", (
    app.includes("function splitSceneVerseLine")
    && app.includes("function formatSceneVerseLines")
    && app.includes("function parseSceneVerseSourceText")
    && app.includes("function normalizeSceneVerseDisplayText")
    && app.includes("clauseCount < 2")
    && app.includes("const sourceAuthor = normalizePoetryText(")
    && app.includes('sourceAuthor.replace(/^作者[:：]\\s*/, "")')
    && app.includes('const collapsed = normalized.replace(/\\s*\\n+\\s*/g, " ");')
    && app.includes('return formatSceneVerseLines(value).join("\\n");')
    && app.includes('const authorLine = verse.author ? `作者：${verse.author}` : "";')
    && app.includes("sourceMatch")
    && app.includes("formatSceneVerse(collapsed)")
    && app.includes("scene-verse-author")
    && app.includes("function renderSceneVerseMarkupFromText")
    && app.includes("scene-verse-source")
    && app.includes('`作者：${poem.author || "佚名"}`')
    && css.includes(".scene-verse")
    && css.includes(".scene-verse-line")
    && css.includes(".scene-verse-line + .scene-verse-line")
    && css.includes(".scene-verse-source")
    && css.includes(".scene-verse-author")
    && css.includes(".story-modal-verse .scene-verse-line")
    && css.includes(".story-modal-verse .scene-verse-source")
    && css.includes(".story-modal-verse .scene-verse-author")
    && css.includes(".route-card .route-verse")
    && css.includes("text-align: right")
  ));

  const p0ShanhaiEvents = data.events || {};
  const qingqiuChoices = p0ShanhaiEvents.qingqiu_lamps?.choices?.map((choice) => choice.label) || [];
  const shrineChoices = p0ShanhaiEvents.nameless_prayer?.choices?.map((choice) => choice.label) || [];
  const marketChoices = p0ShanhaiEvents.black_trade?.choices?.map((choice) => choice.label) || [];
  const hollowPassChoices = p0ShanhaiEvents.hollow_pass?.choices || [];
  const groundThunderChoices = p0ShanhaiEvents.ground_thunder?.choices || [];
  const hollowPassChoiceLabels = hollowPassChoices.map((choice) => choice.label);
  const groundThunderChoiceLabels = groundThunderChoices.map((choice) => choice.label);
  check("p0 shanhai encounter expansion contract", (
    p0ShanhaiEvents.qingqiu_lamps?.texts?.clear?.includes("空册")
    && qingqiuChoices.includes("以粮换无名路引")
    && p0ShanhaiEvents.nameless_prayer?.texts?.clear?.includes("香灰被风吹开")
    && shrineChoices.includes("不拜直过")
    && p0ShanhaiEvents.black_trade?.texts?.clear?.includes("影子替他称粮")
    && marketChoices.includes("踩散价码")
  ));
  check("mid-route shanhai encounter expansion contract", (
    p0ShanhaiEvents.hollow_pass?.title === "同穴分粮"
    && p0ShanhaiEvents.hollow_pass?.texts?.clear?.includes("碎粟")
    && hollowPassChoices.length >= 3
    && hollowPassChoiceLabels.includes("拾洞口碎粟")
    && hollowPassChoices.some((choice) => choice.effect?.flag === "hollow_pass_hint")
    && hollowPassChoices.some((choice) => choice.effect?.grain > 0)
    && p0ShanhaiEvents.ground_thunder?.title === "泽鼓回雷"
    && p0ShanhaiEvents.ground_thunder?.texts?.clear?.includes("浅泥像鼓面")
    && groundThunderChoices.length >= 3
    && groundThunderChoiceLabels.includes("采雷熟芦根")
    && groundThunderChoices.some((choice) => choice.effect?.flag === "heard_ground_thunder")
    && groundThunderChoices.some((choice) => choice.effect?.grain > 0)
  ));
  check("critical rescue route event contract", (
    app.includes("function getCriticalResourceKeys")
    && app.includes("criticalRescue")
    && app.includes("getCriticalResourceKeys(state).length > 0")
    && balanceSimSource.includes("let CRITICAL_RESCUE_LIMIT = 15")
    && balanceSimSource.includes("function getCriticalResourceKeys")
    && balanceSimSource.includes("criticalRescue")
  ));

  check("hud audio button contract", (
    html.includes('id="audioHudButton"')
    && html.includes('aria-label="播放音乐"')
    && app.includes("function toggleAudio()")
    && app.includes("function autoUnlockAudioFromGesture()")
    && app.includes("audioUserMuted")
    && app.includes("audioAutoUnlocked")
    && app.includes('queueMilestoneAlert("声", "声场已启"')
    && app.includes("首次操作会尝试启声")
    && app.includes("已手动关闭")
    && readme.includes("首次有效操作启声")
    && app.includes('audioHudButton.classList.toggle("active", audioEnabled)')
    && app.includes('audioHudButton.classList.toggle("audio-nudge", showAudioNudge)')
    && app.includes('audioHudButton.dataset.audioNudge = showAudioNudge ? "听" : ""')
    && app.includes("播放音乐：建议试玩时打开声音")
    && css.includes('.audio-hud-button[aria-pressed="true"]')
    && css.includes(".audio-hud-button.audio-nudge::after")
  ));
  check("hud current music chip contract", (
    html.includes('id="musicNowChip"')
    && html.includes('id="musicNowId"')
    && html.includes('id="musicNowScene"')
    && app.includes("function getActiveMusicDisplay")
    && app.includes("function renderMusicNowChip")
    && app.includes("function formatMusicChipId")
    && app.includes("closeStoryModal();")
    && app.includes("currentMusicScene")
    && app.includes('musicNowChip.dataset.audioEnabled')
    && css.includes(".music-now-chip[data-audio-enabled=\"true\"]")
    && css.includes("max-width: 88px")
    && css.includes(".music-now-chip strong")
    && css.includes("inset: calc(var(--hud-height, 72px) + var(--game-gap, 8px)) 0 0")
  ));
  check("audio review deep link contract", (
    app.includes("function getInitialDrawerFromUrl()")
    && app.includes('new URLSearchParams(window.location.search).get("drawer")')
    && app.includes("drawerLabels[drawer] ? drawer :")
    && app.includes("setActiveDrawer(getInitialDrawerFromUrl())")
    && launcher.includes("./index.html?fresh=1&amp;drawer=settings")
    && launcher.includes("音乐试听面板")
    && readme.includes("drawer=settings")
  ));
  check("audio review audition contract", (
    html.includes('id="audioReviewList"')
    && html.includes('id="audioHealthStrip"')
    && html.includes('id="audioReviewProgress"')
    && html.includes('id="audioReviewCopyButton"')
    && html.includes('id="audioReviewCopyFallback"')
    && html.includes("保留 / 待改 / 弃用")
    && app.includes("let audioPreviewKey")
    && app.includes("function renderAudioReviewList")
    && app.includes("function renderAudioHealthStrip")
    && app.includes("function setAudioPreview")
    && app.includes("AUDIO_REVIEW_KEY")
    && app.includes("function setAudioReviewMark")
    && app.includes("function getAudioReviewMarksSummary")
    && app.includes("function getAudioReviewProgress")
    && app.includes("function renderAudioReviewProgress")
    && app.includes("audioReviewProgress: getAudioReviewProgress()")
    && app.includes("getAudioReviewTemplateText,")
    && app.includes("data-audio-review-mark")
    && app.includes("听感进度：")
    && app.includes("听感进度 ${progress.marked}/${progress.total}")
    && app.includes("本轮试听标记")
    && readme.includes("本轮试听标记")
    && readme.includes("保留 / 待改 / 弃用")
    && app.includes("function getAudioReviewTemplateText")
    && app.includes("function getAudioReviewWorkbenchUrl")
    && app.includes("function copyAudioReviewTemplateToClipboard")
    && app.includes("writeTextToClipboard(text)")
    && app.includes("试玩编号：${getPlaytestRunCode()}")
    && app.includes('source: "game-settings"')
    && app.includes("P0音频听感验收工作台.html?")
    && app.includes("旅途环境层是否加分")
    && app.includes("function clearAudioPreviewIfLeavingSettings")
    && app.includes('activeDrawer !== "settings"')
    && app.includes('nextDrawer === "settings"')
    && app.includes("data-audio-preview")
    && app.includes("跟随旅途")
    && app.includes("第一眼是否知道可以打开声音")
    && app.includes("previewMusicKey")
    && app.includes("试听中")
    && css.includes(".audio-review-list")
    && css.includes(".audio-review-progress")
    && css.includes(".audio-review-progress-bar")
    && css.includes(".audio-review-card")
    && css.includes(".audio-review-mark")
    && css.includes(".audio-review-marks")
    && css.includes(".audio-health-strip")
    && css.includes(".audio-copy-button")
    && css.includes(".audio-copy-fallback")
  ));
  check("text modal contract", (
    html.includes('id="locationLoreToggle"')
    && html.includes('id="eventTextToggle"')
    && html.includes('id="storyModal"')
    && html.includes('id="storyModalOutcome"')
    && html.includes('id="storyModalChoices"')
    && html.includes('id="storyModalContinue"')
    && html.includes('id="storyModalContinue" class="story-modal-continue" type="button"')
    && app.includes('setTextPanelExpanded("location"')
    && app.includes('setTextPanelExpanded("event"')
    && app.includes("function renderStoryModalChoices")
    && app.includes("function renderStoryModalOutcome")
    && app.includes("function setStoryModalContinueHint")
    && app.includes("function setStoryModalTapMode")
    && app.includes("function canTapDismissStoryModal")
    && app.includes('el.storyModal.dataset.tapMode = normalized')
    && app.includes('setStoryModalTapMode(hasModalActions ? "choices" : result ? "continue" : "close")')
    && app.includes('setStoryModalContinueHint(!hasModalActions, result ? "轻点继续" : "轻点返回")')
    && app.includes('setStoryModalContinueHint(true, "轻点返回")')
    && app.includes('el.storyModalContinue?.addEventListener("click"')
    && app.includes("if (!canTapDismissStoryModal()) return;")
    && app.includes("function shouldAdvanceResultToFollowupDecision")
    && app.includes('state.status === "crisis"')
    && app.includes('state.status === "stranded"')
    && app.includes("getUnresolvedCurrentEventContext()?.event?.choices?.length")
    && app.includes("advanceToFollowupDecision")
    && app.includes("function syncDecisionModalState")
    && app.includes("storyResultOverride")
    && css.includes(".story-modal[hidden]")
    && css.includes(".story-modal-outcome")
    && css.includes(".story-modal-choices")
    && css.includes(".story-modal-continue")
    && css.includes('.story-modal[data-tap-mode="choices"] .story-modal-panel')
    && css.includes(".story-modal.result-modal .story-modal-continue")
    && css.includes("grid-area: continue")
  ));
  check("outcome feedback visual contract", (
    app.includes("function hasResourceDelta")
    && app.includes("function renderOutcomeDeltaChips")
    && app.includes("function getOutcomeTone")
    && app.includes("function getOutcomeNote")
    && app.includes("function getOutcomeSeal")
    && app.includes("el.storyModalOutcome.dataset.outcomeTone = tone")
    && app.includes("function getStageAlertDetail")
    && app.includes("renderStoryModalOutcome(result);")
    && app.includes("effect: choice.effect")
    && app.includes("delta: choice.effect")
    && app.includes("delta: supply.effect")
    && css.includes(".stage-alert-deltas")
    && css.includes(".stage-alert-detail")
    && css.includes(".story-modal-outcome-seal")
    && css.includes(".story-modal-outcome-note")
    && css.includes(".story-modal-outcome-deltas")
    && css.includes('.story-modal-outcome[data-outcome-tone="mixed"]')
    && css.includes(".story-modal-outcome-label")
    && css.includes(".story-modal.result-modal .story-modal-continue")
    && html.includes('aria-live="polite" hidden')
  ));
  check("image opens detail modal contract", (
    html.includes('id="locationArtFrame" role="button" tabindex="0"')
    && html.includes('id="eventArtFrame" role="button" tabindex="0"')
    && app.includes("function bindImagePanelShortcut")
    && app.includes('bindImagePanelShortcut(el.locationArtFrame, "location")')
    && app.includes('bindImagePanelShortcut(el.eventArtFrame, "event")')
    && app.includes('["Enter", " "].includes(event.key)')
    && css.includes("cursor: zoom-in")
    && css.includes(".event-art-frame:focus-visible")
  ));
  check("busy action hides stale choices", (
    css.includes(".action-busy .choice-list")
    && css.includes("max-height: 0")
    && css.includes("pointer-events: none")
  ));
  check("route blocked by current encounter contract", (
    app.includes("function getUnresolvedCurrentEventContext")
    && app.includes("function blockRouteUntilCurrentEventHandled")
    && app.includes("if (blockRouteUntilCurrentEventHandled(route)) return;")
    && app.includes('title: "先处理当前遭遇"')
    && app.includes("还没有落账")
    && app.includes("先处理 ${unresolvedEventContext.loc.name} 的遭遇，再选下一站")
    && app.includes('const eventDone = !loc?.event || Boolean(state.eventResults[loc.event]);')
  ));
  check("drawer contract", (
    html.includes('data-drawer-target="inventory"')
    && html.includes('data-drawer-close')
    && app.includes("toggleDrawer(button.dataset.drawerTarget)")
    && app.includes("document.body.dataset.drawer = nextDrawer")
    && app.includes("delete document.body.dataset.drawer")
    && app.includes("function renderCompactStatChips")
    && app.includes("compact-stat-row language-stat-row")
    && app.includes("compact-stat-row safety-stat-row")
    && css.includes("body[data-drawer] .drawer-panel")
    && css.includes(".compact-stat-chip")
    && css.includes("@media (max-height: 560px) and (orientation: landscape)")
  ));
  check("ending recap action contract", (
    app.includes("function restartRun()")
    && app.includes("function getRunSummaryText()")
    && app.includes('kind: "restart"')
    && app.includes('kind: "recap"')
    && app.includes('kind: "log"')
    && app.includes('kind: "copy-recap"')
    && app.includes('kind: "copy-feedback"')
    && app.includes('kind: "feedback-form"')
    && app.includes("window.location.href = getFeedbackFormUrl")
    && app.includes("runFeedbackLink: document.querySelector")
    && app.includes('getFeedbackFormUrl({ source: "recap" })')
    && app.includes("data-modal-action")
    && app.includes("function showRunRecapModal")
    && app.includes("getRunRecapModalText")
    && app.includes("function getPlaytestFeedbackPackageText")
    && app.includes("function copyPlaytestFeedbackPackageToClipboard")
    && app.includes("《不思异：九州》P0 试玩反馈包")
    && app.includes("是否愿意再走一站")
    && app.includes("第一眼是否知道可以打开声音")
    && app.includes("采风入册是否有成就感")
    && app.includes("采风条数：")
    && app.includes("fieldNoteCount")
    && app.includes('kicker: "本局复盘"')
    && app.includes('label: "复制复盘"')
    && app.includes('label: "复制反馈包"')
    && app.includes('label: "填写反馈"')
    && app.includes("没通关或要补主观感受时使用")
    && app.includes("function setModalActionFeedback")
    && app.includes("function writeTextToClipboard")
    && app.includes("function showRecapCopyFallback")
    && app.includes("storyModalCopyFallback")
    && app.includes("已选中文本，可手动复制")
    && app.includes("反馈包已复制")
    && app.includes('setModalActionFeedback(options.button, "已复制"')
    && app.includes('setActiveDrawer("log")')
    && app.includes('renderEventDecisionLauncher(3, "查看结局")')
    && css.includes(".story-choice-card")
    && css.includes(".ending-recap")
    && css.includes(".ending-log")
    && css.includes(".ending-copy")
    && css.includes(".ending-feedback")
    && css.includes(".story-modal-copy-fallback")
  ));
  check("run recap drawer contract", (
    html.includes('id="runRecapCard"')
    && html.includes('id="runRecapCopyButton"')
    && html.includes('id="runFeedbackLink"')
    && html.includes('href="./P0反馈填写页.html"')
    && html.includes('class="run-recap-copy run-feedback-link"')
    && html.includes('class="log-drawer-tabs"')
    && html.includes('data-log-tab="recap"')
    && html.includes('data-log-tab="discovery"')
    && html.includes('data-log-tab="encounter"')
    && html.includes('data-log-tab="trail"')
    && html.includes('data-log-panel="recap"')
    && app.includes("let activeLogTab")
    && app.includes("function setActiveLogTab")
    && app.includes("el.logTabButtons")
    && app.includes("setActiveLogTab(activeLogTab)")
    && app.includes("resourceMinimums")
    && app.includes("function updateResourceMinimums")
    && app.includes("function getRunRecapText")
    && app.includes("function getFieldNoteCounts")
    && app.includes("FIELD_NOTE_STYLES")
    && app.includes("FIELD_NOTE_CONSEQUENCES")
    && app.includes("function getFieldNoteConsequenceSummary")
    && app.includes("function resolveFieldNote")
    && app.includes("function hasPendingFieldNoteAtCurrentLocation")
    && app.includes("fieldNoteReports")
    && app.includes("采风写法")
    && app.includes("王朝案牍")
    && app.includes("function renderRunRecap")
    && app.includes("copyRunRecapToClipboard")
    && app.includes("getRunRecapText,")
    && css.includes(".run-recap-actions")
    && css.includes(".run-feedback-link")
    && css.includes(".run-recap-card")
    && css.includes(".run-recap-stats")
    && css.includes(".log-drawer-tabs")
    && css.includes(".log-tab-panel")
    && css.includes(".drawer-pane .log-tab-panel.active")
  ));
  check("discovery gallery contract", (
    html.includes('id="discoveryGallery"')
    && html.includes('id="discoveryGalleryCount"')
    && html.includes('aria-label="采风册"')
    && html.includes("<strong>采风册</strong>")
    && app.includes("function renderDiscoveryGallery")
    && app.includes("function openLocationMemory")
    && app.includes("function getFieldNoteProfile")
    && app.includes("function mergeFieldNoteEffect")
    && app.includes("function renderFieldNoteChoiceChip")
    && app.includes("function getCompactFieldNoteClue")
    && app.includes("FIELD_NOTE_CATEGORY_ICONS")
    && app.includes("function getFieldNoteReportText")
    && app.includes("function getFieldNoteConsequenceLine")
    && app.includes('el.storyModalKicker.textContent = "采风册"')
    && app.includes("采风入册：")
    && app.includes("【采风题材】")
    && app.includes("【采风线索】")
    && app.includes("【采风写法】")
    && app.includes("【王朝案牍】")
    && app.includes("写法 ${report.label}")
    && app.includes("currentFieldNoteProfile")
    && app.includes("getCurrentFieldNoteProfile")
    && app.includes('data-discovery-location')
    && app.includes("formatTerrainAudioLabel(loc.terrain)")
    && app.includes("renderDiscoveryGallery();")
    && css.includes(".field-note-choice-chip")
    && css.includes(".field-note-choice-icon")
    && css.includes(".discovery-gallery-card")
    && css.includes(".discovery-card-art")
  ));
  check("encounter gallery contract", (
    html.includes('id="encounterGallery"')
    && html.includes('id="encounterGalleryCount"')
    && html.includes('aria-label="异闻采风"')
    && html.includes("<strong>异闻采风</strong>")
    && app.includes("function renderEncounterGallery")
    && app.includes("function openEncounterMemory")
    && app.includes("function getEncounterMemories")
    && app.includes('el.storyModalKicker.textContent = "异闻采风"')
    && app.includes("处理遭遇后会收入异闻采风")
    && app.includes('data-encounter-id')
    && app.includes("state.routeEventResults")
    && app.includes("renderEncounterGallery();")
    && css.includes(".encounter-gallery-card")
    && css.includes(".encounter-card")
  ));
  check("compact event summary contract", (
    app.includes("let eventFullText")
    && app.includes("function getCompactEventText")
    && app.includes("function setEventCopy")
    && app.includes("eventFullText || el.eventText.textContent")
    && app.includes("eventSummaryMode")
    && css.includes(".event-copy-card .event-text.is-summary")
  ));
  check("sanity-aware encounter text contract", (
    app.includes("function getSanityBandForValue")
    && app.includes("function getSanityPerception")
    && app.includes("function getEventTextForBand")
    && app.includes("getEventTextForSanity(event)")
    && app.includes("function getLocationDetailForBand")
    && app.includes("function getLocationTextForSanity")
    && app.includes("getLocationTextForSanity(state.currentLocation)")
    && app.includes("getLocationTextForSanity(locationId)")
    && app.includes("eventText.dataset.sanityBand")
    && app.includes("eventSanityLabel")
    && app.includes("setPerceptionDataset(el.locationLore, perception)")
    && app.includes("previewSanityText")
    && css.includes('.location-lore[data-sanity-band="mad"]')
    && css.includes(".game-action-area .location-lore[data-sanity-label]::after")
    && css.includes(".event-copy-card[data-sanity-label]::after")
    && css.includes('.story-modal[data-sanity-band="mad"] .story-modal-text')
  ));
  check("compact event illustration visible contract", (
    css.includes(".game-action-area .event-copy-card .event-art-frame:not([hidden])")
    && css.includes("grid-template-columns: 54px minmax(0, 1fr) 30px")
    && css.includes("grid-template-columns: 44px minmax(0, 1fr) 24px")
    && !css.includes(".event-copy-card.expanded .event-art-frame:not([hidden]) {\n    display: none")
  ));
  check("compact landscape story modal density contract", (
    css.includes("width: min(820px, calc(100vw - 12px))")
    && css.includes("grid-template-columns: minmax(122px, 0.24fr) minmax(0, 1fr)")
    && css.includes('"head meta"\n      "art text"\n      "verse verse"\n      "choices choices"')
    && css.includes(".story-modal-head > div")
    && css.includes("grid-area: verse")
    && css.includes(".story-modal-meta {\n    grid-area: meta;")
    && css.includes("display: inline-flex")
    && css.includes("border-radius: 999px")
    && css.includes("align-self: start")
    && css.includes("max-height: 112px")
    && css.includes("-webkit-line-clamp: 4")
    && css.includes(".story-choice-card {\n    min-height: 44px")
    && css.includes('.story-modal-choices[data-count="4"] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));')
  ));
  check("debug ui state helpers", (
    app.includes("function getUiState()")
    && app.includes("window.BSI_DEBUG = window.BSI_PROTOTYPE")
    && app.includes("openTextPanel")
    && app.includes("openDrawer")
    && app.includes("closeDrawer")
  ));
  check("visual capture direct location contract", (
    app.includes('const captureLocationId = params.get("captureLocation")')
    && app.includes("currentLocation: captureLocationId")
    && app.includes("getLocationStep(captureLocationId)")
    && app.includes("eventResults: {}")
    && app.includes("routeEventResults: {}")
    && app.includes("测试入口：已直达")
    && app.includes("function getCaptureResourcePatch(params)")
    && app.includes('params.get("captureResources")')
    && app.includes('part.split(/[:=]/)')
    && app.includes("测试入口：资源已设为")
    && app.includes("function getCaptureFailureStatsPatch(params)")
    && app.includes('params.get("captureFailureStats")')
    && app.includes("测试入口：失败计数已设为")
  ));
  check("compact no-scroll policy", (
    css.includes("overflow: clip")
    && css.includes("scrollbar-width: none")
    && app.includes("el.supplyList.dataset.count = String(supplies.length)")
    && css.includes(".game-action-area .supply-list[data-count=\"2\"]")
    && css.includes(".game-action-area .choice-list[data-count=\"4\"]")
    && css.includes(".game-action-area .choice-card .choice-heading")
    && css.includes(".game-action-area .choice-card > .choice-hint")
    && css.includes(".game-action-area .choice-card .resource-delta-chip")
    && css.includes(".map-route-panel .route-list[data-count=\"2\"]")
    && css.includes(".map-route-panel .route-list[data-count=\"4\"]")
  ));
  check("landscape utility entry contract", (
    html.includes('id="audioHudButton"')
    && html.includes('data-drawer-target="inventory"')
    && html.includes('data-drawer-target="poetry"')
    && html.includes('data-drawer-target="log"')
    && html.includes('data-drawer-target="settings"')
    && html.includes('aria-label="行囊九宫格"')
    && html.includes('id="locationLoreToggle"')
    && html.includes('id="eventTextToggle"')
    && css.includes("@media (max-height: 560px) and (orientation: landscape)")
    && css.includes(".game-action-area .supply-list")
    && css.includes(".game-action-area .choice-list")
    && css.includes(".map-route-panel .route-list")
    && app.includes('matchMedia("(max-height: 560px) and (orientation: landscape)")')
  ));
  check("mobile safe-area contract", (
    html.includes("viewport-fit=cover")
    && html.includes('rel="preload" as="font"')
    && html.includes('defer></script>')
    && css.includes("env(safe-area-inset-top)")
    && css.includes("env(safe-area-inset-left)")
    && css.includes("calc(var(--game-gap) + env(safe-area-inset-top))")
  ));
  check("save migration contract", (
    app.includes("const SAVE_MIGRATIONS = {")
    && app.includes("function migrateSavedState(parsed)")
    && app.includes("function loadLegacyPayload(keyPrefix)")
    && app.includes('loadLegacyPayload(SAVE_KEY_PREFIX)')
    && app.includes('loadLegacyPayload(META_KEY_PREFIX)')
    && app.includes("旧存档已迁移至新版本，旅途继续。")
    && app.includes("-discarded-v")
  ));
  check("content pack interface contract", (
    dataSource.includes("const BSI_CORE_DATA = {")
    && dataSource.includes('const BSI_P0_CONTENT_PACK = {')
    && dataSource.includes('id: "p0"')
    && dataSource.includes("window.BSI_CONTENT_PACKS = {")
    && dataSource.includes("window.BSI_GAME_DATA = { ...BSI_CORE_DATA, ...BSI_CORE_AUDIO, ...BSI_P0_CONTENT_PACK }")
    && app.includes("function resolveGameData()")
    && app.includes('.get("pack")')
    && app.includes("window.BSI_CONTENT_PACKS?.[packId]")
  ));
  check("balance config contract", (
    dataSource.includes("balanceConfig: {")
    && dataSource.includes("randomRouteEventBaseChance: 0.21")
    && dataSource.includes("hardBadLuckThreshold: 96")
    && dataSource.includes("resourceWarningLimits: { axle: 30, grain: 35, sanity: 45 }")
    && app.includes("const BALANCE = { ...BALANCE_DEFAULTS, ...(gameData.balanceConfig || {}) };")
    && app.includes("BALANCE.resourceCriticalLimit")
    && app.includes("BALANCE.crisisBadLuckGain")
    && app.includes("BALANCE.rescueForceBadLuckThreshold")
    && balanceSimSource.includes("function applyBalanceConfig(config = {})")
    && balanceSimSource.includes("applyBalanceConfig(data.balanceConfig)")
  ));
  check("first minute next-step hud contract", (
    html.includes('id="nextStepLabel"')
    && html.includes('class="next-step-label"')
    && html.includes('data-short="遇"')
    && app.includes("function getNextStepGuidance")
    && app.includes("function getNextStepShortCode")
    && app.includes('document.body.dataset.nextAction = guidance.action || "review"')
    && app.includes("el.nextStepLabel.dataset.short = getNextStepShortCode(guidance.action)")
    && app.includes("el.nextStepLabel.title = guidance.text")
    && app.includes('el.nextStepLabel.setAttribute("aria-label", guidance.text)')
    && app.includes("nextAction: document.body.dataset.nextAction")
    && app.includes('`西行${step + 1}/${maxStep + 1} · ${getCompactDistanceLabel()}`')
    && app.includes('text: compact ? "下一步：处理遭遇"')
    && app.includes('text: compact ? "下一步：采风入册"')
    && app.includes('text: compact ? "下一步：补给一次"')
    && app.includes('text: compact ? "下一步：选一条路"')
    && app.includes('text: compact ? "下一步：再点启程"')
    && app.includes("renderNextStepGuidance({ loc, pending, playableRoutes, compact })")
    && app.includes("renderActionFeedback();\n  renderOverview();")
    && css.includes(".next-step-label::before")
    && css.includes(".next-step-label[data-tone=\"supply\"]")
    && css.includes(".game-hud .distance-board .next-step-label")
  ));
  check("five minute playtest reminder contract", (
    html.includes('id="playtestReminder"')
    && html.includes('id="playtestReminderFeedback"')
    && html.includes('id="playtestReminderDismiss"')
    && html.includes("已试玩 5 分钟")
    && html.includes("填写反馈")
    && html.includes("styles.css?v=20260720-c169")
    && html.includes("data.js?v=20260720-c169")
    && html.includes("app.js?v=20260720-c169")
    && app.includes("PLAYTEST_REMINDER_DEFAULT_MS = 5 * 60 * 1000")
    && app.includes("PLAYTEST_REMINDER_MS = getPlaytestReminderMs()")
    && app.includes('params.get("playtestReminderMs")')
    && app.includes("playtestStartedAt")
    && app.includes("playtestReminderShown")
    && app.includes("playtestFeedbackOpened")
    && app.includes("function schedulePlaytestReminder")
    && app.includes("function triggerPlaytestReminder")
    && app.includes("function renderPlaytestReminder")
    && app.includes("function markPlaytestFeedbackOpened")
    && app.includes("function getPlaytestRunCode")
    && app.includes("function getFeedbackFormUrl")
    && app.includes("编号 ${getPlaytestRunCode()}")
    && app.includes("试玩编号：${getPlaytestRunCode()}")
    && app.includes("&& !textPanelState.location")
    && app.includes("&& !textPanelState.event")
    && app.includes("window.location.href = getFeedbackFormUrl")
    && app.includes("renderPlaytestReminder();")
    && app.includes("schedulePlaytestReminder();")
    && css.includes(".playtest-reminder")
    && css.includes("#playtestReminderFeedback")
    && css.includes("#playtestReminderDismiss")
  ));
  check("opening hint stale guard contract", (
    app.includes("function showOpeningHintIfNeeded")
    && app.includes("const currentLoc = locations[state.currentLocation];")
    && app.includes("state.eventResults[currentLoc?.event]")
    && app.includes("return;\n    }\n    setActionFeedback({\n      phase: \"done\",\n      tone: \"quiet\",\n      kicker: \"第一步\"")
  ));
  check("guided next action target contract", (
    app.includes('action: "event-choice"')
    && app.includes('action: "field-note"')
    && app.includes('action: "supply"')
    && app.includes('action: "open-map"')
    && app.includes('action: "pick-route"')
    && app.includes('action: "route-confirm"')
    && app.includes('action: "crisis"')
    && css.includes('body[data-next-action="event-choice"] .choice-card:not(:disabled)')
    && css.includes('body[data-next-action="field-note"] .event-decision-launcher')
    && css.includes('body[data-next-action="supply"] .supply-card:not(:disabled):not(.used):not(.blocked)')
    && css.includes('body[data-next-action="open-map"] #mapViewButton')
    && css.includes('body[data-next-action="pick-route"] .route-card:not(.locked):not(:disabled)')
    && css.includes('body[data-next-action="route-confirm"] .route-card.selected:not(.locked):not(:disabled)')
    && css.includes('body[data-next-action="crisis"] .choice-card:not(:disabled)')
    && css.includes("@keyframes guidedTargetPulse")
    && css.includes("@media (prefers-reduced-motion: no-preference)")
  ));
  check("journey step track contract", (
    html.includes('id="journeyStepTrack"')
    && html.includes('aria-label="章节进度"')
    && app.includes("function getJourneyStepItems")
    && app.includes("function renderJourneyStepTrack")
    && app.includes("renderJourneyStepTrack();")
    && app.includes("getJourneyStepItems,")
    && css.includes(".journey-step-track")
    && css.includes(".journey-step.is-current")
    && css.includes(".game-hud .journey-step-name")
  ));
  check("stage route progress contract", (
    html.includes('id="stageRouteProgress"')
    && html.includes('id="stageRouteMidMarker"')
    && app.includes("function renderStageRouteProgress")
    && app.includes('el.stageRouteProgress.dataset.progressState = progressState')
    && app.includes('el.stageRouteProgress.dataset.hasMidEvent = routeEvent ? "true" : "false"')
    && app.includes("function getRouteEventSignal")
    && app.includes("function getTopScoredResource")
    && app.includes("el.stageRouteProgress.dataset.eventTone = eventSignal.tone")
    && app.includes("el.stageRouteProgress.dataset.eventThreat = eventSignal.threat")
    && app.includes("el.stageRouteProgress.dataset.eventIcon = eventSignal.icon")
    && app.includes("getRouteEventSignalResourceLabel")
    && app.includes('renderStageRouteProgress({ isTraveling, pending, nextRoute });')
    && css.includes('.stage-route-progress[data-event-tone="grain"] .stage-route-mid')
    && css.includes('.stage-route-progress[data-event-tone="axle"] .stage-route-mid')
    && css.includes('.stage-route-progress[data-event-tone="sanity"] .stage-route-mid')
    && css.includes('.stage-route-progress[data-event-tone="danger"] .stage-route-mid')
    && css.includes(".stage-route-progress[data-progress-state=\"traveling\"]::after")
    && css.includes(".stage-route-progress[data-progress-state=\"interrupted\"] .stage-route-mid")
    && css.includes("@keyframes routeProgressHalf")
    && css.includes(".stage-route-mid")
  ));
  check("stage phase hint contract", (
    html.includes('id="stagePhaseCard"')
    && html.includes('id="stagePhaseIcon"')
    && html.includes('id="stagePhaseTitle"')
    && html.includes('id="stagePhaseDetail"')
    && app.includes("function getStagePhaseContext")
    && app.includes("function renderStagePhase")
    && app.includes('document.body.dataset.stagePhase = phase.phase')
    && app.includes('phase: "route-event"')
    && app.includes('phase: "field-note"')
    && app.includes('phase: activeView === "map" ? "route-pick" : "route-ready"')
    && app.includes("renderStagePhase({ isTraveling, pending, nextRoute });")
    && css.includes(".stage-phase-card")
    && css.includes(".stage-phase-icon")
    && css.includes(".stage-phase-copy")
    && css.includes('.stage-phase-card[data-tone="supply"]')
    && css.includes('.stage-phase-card[data-tone="route"]')
    && css.includes('.stage-phase-card[data-tone="warning"]')
  ));
  check("milestone feedback contract", (
    app.includes("function queueMilestoneAlert")
    && app.includes("采风 ${state.discoveredLocations.length}/${Object.keys(locations).length}")
    && app.includes("const milestoneTitle = [")
    && app.includes("revealedCount ? `新路 ${revealedCount} 条`")
    && app.includes("function queueEndingMilestone")
    && app.includes("结局收录")
    && css.includes(".stage-alert.tone-milestone")
  ));
  check("visual capture view query contract", (
    app.includes("function getInitialViewFromUrl()")
    && app.includes('new URLSearchParams(window.location.search).get("view")')
    && app.includes('view === "map" ? "map" : "town"')
    && app.includes("function applyVisualCaptureStateFromUrl()")
    && app.includes('params.get("pressure") === "low"')
    && app.includes('const endingId = params.get("ending")')
    && app.includes("function shouldOpenInitialRecapFromUrl")
    && app.includes('params.get("recap")')
    && app.includes("function applyInitialRecapFromUrl")
    && app.includes("applyInitialRecapFromUrl()")
    && app.includes("function buildDemoEndingCaptureState")
    && app.includes('"central_to_road"')
    && app.includes('"stele_to_rift"')
    && app.includes("buildDemoEndingEventResults")
    && app.includes("buildDemoEndingRouteEventResults")
    && app.includes("buildDemoEndingUsedSupplies")
    && app.includes("resourceMinimums")
    && app.includes("演示复盘：核心路线已走完")
    && app.includes('status: "ended"')
    && app.includes("const visualCaptureStateApplied = applyVisualCaptureStateFromUrl()")
    && app.includes("if (!visualCaptureStateApplied) saveState();")
    && app.includes("setActiveView(getInitialViewFromUrl())")
  ));
  check("view switch feedback contract", (
    html.includes('id="viewSwitchToast"')
    && html.includes('id="viewSwitchIcon"')
    && html.includes('id="viewSwitchTitle"')
    && html.includes('id="viewSwitchDetail"')
    && app.includes("let viewSwitchToastTimer = 0")
    && app.includes("function getViewSwitchToastCopy")
    && app.includes("function showViewSwitchToast")
    && app.includes("showViewSwitchToast(activeView)")
    && app.includes('title: "九州图已展"')
    && app.includes('title: "回到旅途"')
    && app.includes('playElement("select", 0.12)')
    && css.includes(".view-switch-toast")
    && css.includes(".view-switch-toast.showing")
    && css.includes('@keyframes view-switch-toast')
    && css.includes('.view-switch-toast[data-view-tone="map"]')
    && css.includes(".view-switch-toast.showing {\n    animation: none !important;")
  ));
  check("blocked map return affordance contract", (
    html.includes('id="mapRoutePreview" type="button"')
    && html.includes('aria-disabled="true" tabindex="-1"')
    && app.includes('if (isMap) {\n    textPanelState = { location: false, event: false };\n    renderStoryModal("");\n  }')
    && app.includes('if (!isMap) {\n    syncDecisionModalState();\n    updateTextPanelState();\n  }')
    && app.includes('el.mapRoutePreview?.addEventListener("click"')
    && app.includes('dataset.action === "return-town"')
    && app.includes('action: "return-town"')
    && app.includes('if (actions.length && activeView === "town")')
    && app.includes('activeView === "town"\n    && storyModalActions.length\n    && !actionBusy\n    && !storyResultOverride\n    && decisionModalDismissedKey !== getDecisionKey()')
    && app.includes('setAttribute("tabindex", "0")')
    && app.includes('setAttribute("aria-disabled", "false")')
    && app.includes('setAttribute("aria-disabled", "true")')
    && app.includes('setAttribute("tabindex", "-1")')
    && app.includes('点此回旅途')
    && css.includes('.map-route-preview[data-action="return-town"]')
    && css.includes('.map-route-preview[data-action="return-town"]:focus-visible')
    && css.includes("appearance: none")
  ));
  check("fresh playtest entry contract", (
    app.includes("function shouldStartFreshRunFromUrl()")
    && app.includes('params.get("fresh")')
    && app.includes('params.get("reset")')
    && app.includes('["1", "true", "yes"]')
    && app.includes("测试入口：已从干净新局开始。")
    && readme.includes("?fresh=1")
  ));
  check("public webdeploy root task contract", (
    fs.existsSync(FILES.webdeployPackage)
    && webdeployPackage.includes("copyPlaytestInvite")
    && webdeployPackage.includes("copyFiveMinuteTask")
    && webdeployPackage.includes("copyAudioTask")
    && webdeployPackage.includes("复制试玩邀请")
    && webdeployPackage.includes("复制 5 分钟任务")
    && webdeployPackage.includes("复制听音任务")
    && webdeployPackage.includes("《不思异：九州》内部试玩邀请")
    && webdeployPackage.includes("《不思异：九州》5 分钟试玩任务")
    && webdeployPackage.includes("《不思异：九州》P0 3 分钟听音任务")
    && webdeployPackage.includes("试玩密码：tusun2026")
    && webdeployPackage.includes("想请你帮忙试一个 5 分钟的横屏网页版 Demo")
    && webdeployPackage.includes("请不要研究攻略，就按第一次打开手机游戏的直觉玩")
    && webdeployPackage.includes("请横屏打开，像第一次玩手机游戏一样试玩 5 分钟")
    && webdeployPackage.includes("请只判断听感，不判断授权")
    && webdeployPackage.includes("先听完 6 首音乐候选")
    && webdeployPackage.includes("复制音频验收摘要")
    && webdeployPackage.includes("如果走到结局：请点“复盘本局”里的“复制反馈包”")
    && webdeployPackage.includes("复制反馈模板")
    && webdeployPackage.includes("feedback-fallback")
    && webdeployPackage.includes("copyText(invite")
    && webdeployPackage.includes("copyText(task")
    && webdeployPackage.includes("copyText(audioTask")
    && webdeployPackage.includes("copyText(template")
    && webdeployPackage.includes("走到结局后，优先点“复盘本局”里的“复制反馈包”。")
    && webdeployPackage.includes("P0反馈填写页.html")
    && webdeployPackage.includes("P0发测批次台.html")
    && webdeployPackage.includes("P0人工反馈收件台.html")
    && webdeployPackage.includes("填写反馈")
    && webdeployPackage.includes("没走到结局也可以点“填写反馈”")
  ));
  check("playtest launcher contract", (
    fs.existsSync(FILES.launcher)
    && fs.existsSync(FILES.p0PlaytestWorkbench)
    && fs.existsSync(FILES.p0AudioWorkbench)
    && launcher.includes("不思异：九州")
    && launcher.includes("BG-008_横向山海旅途舞台总场景.png")
    && launcher.includes("./index.html?fresh=1")
    && launcher.includes("./index.html?fresh=1&amp;view=map")
    && launcher.includes("./index.html?fresh=1&amp;drawer=settings")
    && launcher.includes("./P0音频听感验收工作台.html")
    && launcher.includes("./index.html?recap=1")
    && launcher.includes("./index.html?fresh=1&amp;ending=rift&amp;recap=1")
    && launcher.includes("./P0真人试玩验收工作台.html")
    && launcher.includes("./P0发测批次台.html")
    && launcher.includes("P0 发测批次台")
    && launcher.includes("发测批次台")
    && launcher.includes("./P0人工反馈收件台.html")
    && launcher.includes("P0 反馈收件台")
    && launcher.includes("反馈收件台")
    && launcher.includes("20260624-c159")
    && launcher.includes("推荐 5 分钟试玩")
    && launcher.includes("目标：走完一段旅程")
    && launcher.includes("试听六首核心候选")
    && launcher.includes("音频验收台")
    && launcher.includes("playtest-brief")
    && launcher.includes("playtest-step")
    && launcher.includes("tester-focus")
    && launcher.includes("看懂下一步")
    && launcher.includes("感到资源紧")
    && launcher.includes("愿意再走一站")
    && launcher.includes("primary-action")
    && launcher.includes("@media (max-height: 820px)")
    && launcher.includes("max-height: 620px")
    && launcher.includes("max-width: 1100px")
    && launcher.includes("height: 100svh")
    && launcher.includes(".audio-readiness .priority-links")
    && launcher.includes("display: none")
    && launcher.includes("asset-groups")
    && launcher.includes("balance-strategies")
    && launcher.includes("遭遇")
    && launcher.includes("补给")
    && launcher.includes("开图")
    && launcher.includes("选路")
    && launcher.includes("复盘")
    && launcher.includes("打开本局复盘")
    && launcher.includes("结局复盘场景")
    && launcher.includes("P0 试玩验收台")
    && launcher.includes("./P0试玩版总验收报告.html")
    && launcher.includes("P0 总验收")
    && launcher.includes("p0-readiness-status.js?v=20260624-c160")
    && launcher.includes('id="p0Readiness"')
    && launcher.includes('aria-label="P0 总验收状态"')
    && launcher.includes('id="p0ReadinessTitle"')
    && launcher.includes('id="p0MachineCount"')
    && launcher.includes("renderP0ReadinessStatus")
    && launcher.includes("机器项已过，下一步回收真人试玩和听感")
    && launcher.includes('id="copyPlaytestLink"')
    && launcher.includes('id="copyPlaytestIntro"')
    && launcher.includes('id="copyFiveMinuteTask"')
    && launcher.includes("复制 5 分钟任务")
    && launcher.includes("getFiveMinutePlaytestTaskText")
    && launcher.includes("《不思异：九州》5 分钟试玩任务")
    && launcher.includes("试玩密码：tusun2026")
    && launcher.includes("请横屏打开，像第一次玩手机游戏一样试玩 5 分钟")
    && launcher.includes("如果走到结局：请点“复盘本局”里的“复制反馈包”")
    && launcher.includes('id="playtestIntroSource"')
    && launcher.includes("copyPlaytestIntroNow")
    && launcher.includes("document.querySelector('#playtestIntroSource')")
    && launcher.includes("已展开试玩说明")
    && launcher.includes("复制试玩说明")
    && launcher.includes("getPlaytestIntroText")
    && launcher.includes("copyLauncherText")
    && launcher.includes("BSI_COPY_PLAYTEST_INTRO_READY")
    && launcher.includes("BSI_PLAYTEST_INTRO_TEXT")
    && launcher.includes("《不思异：九州》试玩说明")
    && launcher.includes("这是一款以《山海经》和古典志怪为灵感的横屏旅途生存文字游戏")
    && launcher.includes("手动复制试玩说明")
    && launcher.includes("复制测试链接")
    && launcher.includes('new URL("./index.html?fresh=1", window.location.href).href')
    && launcher.includes('id="copyPlaytestTemplate"')
    && launcher.includes("复制反馈模板")
    && launcher.includes('id="copyAudioTemplate"')
    && launcher.includes("复制听感模板")
    && launcher.includes('id="copyPlaytestPackage"')
    && launcher.includes("复制完整试玩包")
    && launcher.includes("复制反馈包")
    && launcher.includes('id="copyRecoveryChecklist"')
    && launcher.includes("复制回收清单")
    && launcher.includes("getRecoveryChecklistText")
    && launcher.includes("P0 人工回收清单")
    && launcher.includes("必须回收 3 段材料")
    && launcher.includes("反馈证据雷达")
    && launcher.includes("navigator.clipboard.writeText(checklistText)")
    && launcher.includes("getPlaytestPackageText")
    && launcher.includes("《不思异：九州》P0 试玩包")
    && launcher.includes("playtestWorkbenchUrl")
    && launcher.includes("audioWorkbenchUrl")
    && launcher.includes("回收方式")
    && launcher.includes("主线程打开 P0 真人试玩验收台")
    && launcher.includes("优先让测试者发回游戏结局里的《P0 试玩反馈包》")
    && launcher.includes("整段《P0 试玩反馈包》可粘贴到任意一栏后点“拆入三栏”")
    && launcher.includes("拆入三栏")
    && launcher.includes("P0真人试玩验收工作台.html")
    && launcher.includes("P0 音频听感验收台")
    && launcher.includes("P0音频听感验收工作台.html")
    && launcher.includes("audioReviewTemplate")
    && launcher.includes('aria-label="声音状态"')
    && launcher.includes("待听感复核")
    && launcher.includes("音乐已能试听与轮换")
    && launcher.includes("逐条试听并复制听感结论")
    && launcher.includes("短音仍按临时素材处理")
    && launcher.includes("F_BSI-F-024_下一轮音乐音效生成与验收清单.md")
    && launcher.includes("MUS-CORE-001/002/003/004/005/006")
    && launcher.includes("旅途环境层是否加分")
    && launcher.includes("navigator.clipboard.writeText(audioReviewTemplate)")
    && launcher.includes('id="copyFallback"')
    && launcher.includes("showCopyFallback")
    && launcher.includes("navigator.clipboard.writeText(introText)")
    && launcher.includes("document.addEventListener(\"click\"")
    && launcher.includes("手动复制测试链接")
    && launcher.includes("手动复制 5 分钟试玩任务")
    && launcher.includes("手动复制反馈模板")
    && launcher.includes("手动复制听感模板")
    && launcher.includes("手动复制完整试玩包")
    && launcher.includes("手动复制人工回收清单")
    && launcher.includes("playtestTemplate")
    && launcher.includes("抵达进度：中原驿 / 第二站 / 第三站 / 九州裂隙 / 失败")
    && launcher.includes("是否一眼知道下一步点哪里")
    && launcher.includes("音乐/音效是否打扰或加分")
    && launcher.includes("navigator.clipboard.writeText(playtestTemplate)")
    && launcher.includes("navigator.clipboard.writeText(packageText)")
    && launcher.includes("哪一刻最像游戏")
    && launcher.includes("./index.html?pressure=low")
    && launcher.includes("复制本局复盘")
    && readme.includes("试玩入口.html")
    && readme.includes("推荐 5 分钟试玩")
    && readme.includes("p0-readiness-check.js --write-report")
    && readme.includes("?recap=1")
  ));
  const p0FeedbackPage = fs.existsSync(FILES.p0FeedbackPage) ? read(FILES.p0FeedbackPage) : "";
  check("P0 feedback form contract", (
    fs.existsSync(FILES.p0FeedbackPage)
    && p0FeedbackPage.includes("P0 反馈填写页")
    && p0FeedbackPage.includes("开始干净新局")
    && p0FeedbackPage.includes("打开本局复盘")
    && p0FeedbackPage.includes("音频听感验收台")
    && p0FeedbackPage.includes("生成并复制反馈包")
    && p0FeedbackPage.includes("只生成不复制")
    && p0FeedbackPage.includes("localStorage.setItem(storageKey")
    && p0FeedbackPage.includes("navigator.clipboard.writeText(text)")
    && p0FeedbackPage.includes("《不思异：九州》P0 统一反馈包")
    && p0FeedbackPage.includes('id="runCode"')
    && p0FeedbackPage.includes("试玩编号")
    && p0FeedbackPage.includes("function applyUrlPrefill")
    && p0FeedbackPage.includes('params.get("run")')
    && p0FeedbackPage.includes("已带入本局试玩编号")
    && p0FeedbackPage.includes("是否一眼知道下一步点哪里")
    && p0FeedbackPage.includes("车轴 / 粮草 / 神志是否看得懂、有压力")
    && p0FeedbackPage.includes("哪一刻最像游戏，最有山海经感觉")
    && p0FeedbackPage.includes("哪里还像网页，哪里不好点或信息太多")
    && p0FeedbackPage.includes("音乐 / 音效 / 环境声是否加分或打扰")
    && p0FeedbackPage.includes("本局复盘 / 结局反馈包 / 音频验收摘要")
    && p0FeedbackPage.includes("只改一件事的话")
    && launcher.includes("./P0反馈填写页.html")
    && launcher.includes("P0 反馈填写页")
    && launcher.includes("测试者填完后一键复制统一反馈包")
  ));
  const p0BatchDesk = fs.existsSync(FILES.p0BatchDesk) ? read(FILES.p0BatchDesk) : "";
  check("P0 playtest batch desk contract", (
    fs.existsSync(FILES.p0BatchDesk)
    && p0BatchDesk.includes("P0 发测批次台")
    && p0BatchDesk.includes("发测批次台")
    && p0BatchDesk.includes("bsi.p0.playtest.batch.v1")
    && p0BatchDesk.includes("复制本批邀请")
    && p0BatchDesk.includes("复制本批追收")
    && p0BatchDesk.includes("复制发测汇总")
    && p0BatchDesk.includes("任务类型")
    && p0BatchDesk.includes("目标反馈数")
    && p0BatchDesk.includes("已回收反馈")
    && p0BatchDesk.includes("还差反馈")
    && p0BatchDesk.includes("5分钟试玩+听音")
    && p0BatchDesk.includes("P0-BATCH-")
    && p0BatchDesk.includes("https://webdeploy-green.vercel.app/")
    && p0BatchDesk.includes("试玩密码：tusun2026")
    && p0BatchDesk.includes("P0 人工反馈收件台")
    && p0BatchDesk.includes("反馈收件台")
    && p0BatchDesk.includes("真人验收台")
    && p0BatchDesk.includes("localStorage")
    && launcher.includes("./P0发测批次台.html")
    && launcher.includes("P0 发测批次台")
    && webdeployPackage.includes("P0发测批次台.html")
  ));
  const p0FeedbackInbox = fs.existsSync(FILES.p0FeedbackInbox) ? read(FILES.p0FeedbackInbox) : "";
  check("P0 feedback inbox contract", (
    fs.existsSync(FILES.p0FeedbackInbox)
    && p0FeedbackInbox.includes("P0 人工反馈收件台")
    && p0FeedbackInbox.includes("人工反馈收件台")
    && p0FeedbackInbox.includes("bsi.p0.feedback.inbox.v1")
    && p0FeedbackInbox.includes("MATERIALS")
    && p0FeedbackInbox.includes("EVIDENCE")
    && p0FeedbackInbox.includes("function extractRunCodes")
    && p0FeedbackInbox.includes("runCodes")
    && p0FeedbackInbox.includes("runCodeCount")
    && p0FeedbackInbox.includes("试玩编号")
    && p0FeedbackInbox.includes("局数")
    && p0FeedbackInbox.includes("按试玩编号分组")
    && p0FeedbackInbox.includes("缺试玩编号")
    && p0FeedbackInbox.includes("补同一局的 JZ 试玩编号")
    && p0FeedbackInbox.includes("buildLedger")
    && p0FeedbackInbox.includes("buildFollowup")
    && p0FeedbackInbox.includes("复制收件汇总")
    && p0FeedbackInbox.includes("复制本条补收消息")
    && p0FeedbackInbox.includes("P0-FB-")
    && p0FeedbackInbox.includes("可验收候选")
    && p0FeedbackInbox.includes("需补材料")
    && p0FeedbackInbox.includes("localStorage")
    && launcher.includes("./P0人工反馈收件台.html")
    && launcher.includes("P0 反馈收件台")
    && webdeployPackage.includes("P0人工反馈收件台.html")
  ));
  const onlineSmokeCheck = fs.existsSync(FILES.onlineSmokeCheck) ? read(FILES.onlineSmokeCheck) : "";
  const onlineSmokeStatus = fs.existsSync(FILES.onlineSmokeStatus) ? read(FILES.onlineSmokeStatus) : "";
  const onlineSmokeReport = fs.existsSync(FILES.onlineSmokeReport) ? read(FILES.onlineSmokeReport) : "";
  check("online smoke check contract", (
    fs.existsSync(FILES.onlineSmokeCheck)
    && fs.existsSync(FILES.onlineSmokeStatus)
    && fs.existsSync(FILES.onlineSmokeReport)
    && onlineSmokeCheck.includes("DEFAULT_BASE_URL")
    && onlineSmokeCheck.includes("https://webdeploy-green.vercel.app")
    && onlineSmokeCheck.includes("PLAYTEST_PASSWORD")
    && onlineSmokeCheck.includes("tusun2026")
    && onlineSmokeCheck.includes("PASSWORD_HASH")
    && onlineSmokeCheck.includes("BSI_PLAYTEST_AUTH")
    && onlineSmokeCheck.includes("runFeedbackLink")
    && onlineSmokeCheck.includes("feedback-form")
    && onlineSmokeCheck.includes("getPlaytestRunCode")
    && onlineSmokeCheck.includes("getFeedbackFormUrl")
    && onlineSmokeCheck.includes("P0反馈填写页.html")
    && onlineSmokeCheck.includes("P0 发测批次台")
    && onlineSmokeCheck.includes("P0 真人验收台")
    && onlineSmokeCheck.includes("P0 人工反馈收件台")
    && onlineSmokeCheck.includes("试玩编号一致性")
    && onlineSmokeCheck.includes("按试玩编号分组")
    && onlineSmokeCheck.includes("补同一局的 JZ 试玩编号")
    && onlineSmokeCheck.includes("目标反馈数")
    && onlineSmokeCheck.includes("x-robots-tag")
    && onlineSmokeCheck.includes("window.BSI_ONLINE_SMOKE_STATUS")
    && onlineSmokeStatus.includes("window.BSI_ONLINE_SMOKE_STATUS")
    && onlineSmokeStatus.includes('"baseUrl": "https://webdeploy-green.vercel.app"')
    && onlineSmokeStatus.includes('"problemCount": 0')
    && onlineSmokeStatus.includes('"passed": 12')
    && onlineSmokeStatus.includes('"total": 12')
    && onlineSmokeReport.includes("线上公开站冒烟检查")
    && onlineSmokeReport.includes("结论：线上公开站冒烟通过，待真人试玩")
    && onlineSmokeReport.includes("页面：12；通过：12；失败：0；阻断项：0")
    && webdeployPackage.includes("online-smoke-status.js")
    && webdeployPackage.includes("online-smoke-status.md")
  ));
  const visualSmokeCheck = fs.existsSync(FILES.visualSmokeCheck) ? read(FILES.visualSmokeCheck) : "";
  const visualSmokeStatus = fs.existsSync(FILES.visualSmokeStatus) ? read(FILES.visualSmokeStatus) : "";
  const visualSmokeReport = fs.existsSync(FILES.visualSmokeReport) ? read(FILES.visualSmokeReport) : "";
  check("visual smoke check contract", (
    fs.existsSync(FILES.visualSmokeCheck)
    && fs.existsSync(FILES.visualSmokeStatus)
    && fs.existsSync(FILES.visualSmokeReport)
    && fs.existsSync(FILES.visualSmokeRootShot)
    && fs.existsSync(FILES.visualSmokeGameShot)
    && visualSmokeCheck.includes("DEFAULT_BASE_URL")
    && visualSmokeCheck.includes("https://webdeploy-green.vercel.app")
    && visualSmokeCheck.includes("CHROME_PATH")
    && visualSmokeCheck.includes("Page.captureScreenshot")
    && visualSmokeCheck.includes("copyPlaytestInvite")
    && visualSmokeCheck.includes("844")
    && visualSmokeCheck.includes("390")
    && visualSmokeCheck.includes("resource-card[data-resource]")
    && visualSmokeCheck.includes("window.BSI_VISUAL_SMOKE_STATUS")
    && visualSmokeStatus.includes("window.BSI_VISUAL_SMOKE_STATUS")
    && visualSmokeStatus.includes('"baseUrl": "https://webdeploy-green.vercel.app"')
    && visualSmokeStatus.includes('"problemCount": 0')
    && visualSmokeStatus.includes('"passed": 2')
    && visualSmokeStatus.includes('"total": 2')
    && visualSmokeStatus.includes("online-root-invite-1280x720.png")
    && visualSmokeStatus.includes("online-game-fresh-844x390.png")
    && visualSmokeStatus.includes('"hasResources": true')
    && visualSmokeStatus.includes('"hasNext": true')
    && visualSmokeStatus.includes('"fallbackHasInvite": true')
    && visualSmokeReport.includes("线上可视化验收")
    && visualSmokeReport.includes("结论：线上可视化验收通过，待真人试玩")
    && visualSmokeReport.includes("截图：2/2；阻断项：0")
    && webdeployPackage.includes("visual-smoke-status.js")
    && webdeployPackage.includes("visual-smoke-status.md")
    && webdeployPackage.includes("visual-smoke-screenshots")
  ));
  const p0ReadinessCheck = fs.existsSync(FILES.p0ReadinessCheck) ? read(FILES.p0ReadinessCheck) : "";
  const p0ReadinessStatus = fs.existsSync(FILES.p0ReadinessStatus) ? read(FILES.p0ReadinessStatus) : "";
  const p0ReadinessReport = fs.existsSync(FILES.p0ReadinessReport) ? read(FILES.p0ReadinessReport) : "";
  const p0ReadinessReportHtml = fs.existsSync(FILES.p0ReadinessReportHtml) ? read(FILES.p0ReadinessReportHtml) : "";
  if (!process.env.BSI_SKIP_P0_READINESS_CONTRACT) {
    check("P0 readiness report contract", (
      fs.existsSync(FILES.p0ReadinessCheck)
      && fs.existsSync(FILES.p0ReadinessStatus)
      && fs.existsSync(FILES.p0ReadinessReport)
      && fs.existsSync(FILES.p0ReadinessReportHtml)
      && p0ReadinessCheck.includes("qa-check.js")
      && p0ReadinessCheck.includes("playtest-flow-check.js")
      && p0ReadinessCheck.includes("BSI_BALANCE_STATUS")
      && p0ReadinessCheck.includes("BSI_GENERATED_ART_STATUS")
      && p0ReadinessCheck.includes("BSI_VISUAL_REPLACEMENT_STATUS")
      && p0ReadinessCheck.includes("audio-health-check.js")
      && p0ReadinessCheck.includes("BSI_AUDIO_HEALTH_STATUS")
      && p0ReadinessCheck.includes("online-smoke-status.js")
      && p0ReadinessCheck.includes("BSI_ONLINE_SMOKE_STATUS")
      && p0ReadinessCheck.includes("visual-smoke-status.js")
      && p0ReadinessCheck.includes("BSI_VISUAL_SMOKE_STATUS")
      && p0ReadinessCheck.includes("P0 机器验收通过，待真人确认")
      && p0ReadinessCheck.includes("ONLINE_ENTRY_URL")
      && p0ReadinessCheck.includes("https://webdeploy-green.vercel.app/")
      && p0ReadinessCheck.includes("PLAYTEST_PASSWORD")
      && p0ReadinessCheck.includes("tusun2026")
      && p0ReadinessCheck.includes("hasInGamePlaytestReminder")
      && p0ReadinessCheck.includes("游戏内 5 分钟提醒")
      && p0ReadinessCheck.includes("hasFeedbackCorrelation")
      && p0ReadinessCheck.includes("试玩编号回传")
      && p0ReadinessCheck.includes("hasPublicRootTask")
      && p0ReadinessCheck.includes("hasPublicRootAudioTask")
      && p0ReadinessCheck.includes("P0发测批次台.html")
      && p0ReadinessCheck.includes("hasBatchDesk")
      && p0ReadinessCheck.includes("复制本批邀请")
      && p0ReadinessCheck.includes("复制本批追收")
      && p0ReadinessCheck.includes("《不思异：九州》P0 3 分钟听音任务")
      && p0ReadinessCheck.includes("复制音频验收摘要")
      && p0ReadinessCheck.includes("复制回收清单")
      && p0ReadinessCheck.includes("P0 人工回收清单")
      && p0ReadinessCheck.includes("优先回收游戏结局里的《P0 试玩反馈包》")
      && p0ReadinessCheck.includes("P0反馈填写页.html")
      && p0ReadinessCheck.includes("P0人工反馈收件台.html")
      && p0ReadinessCheck.includes("feedbackInbox")
      && p0ReadinessCheck.includes("function extractRunCodes")
      && p0ReadinessCheck.includes("按试玩编号分组")
      && p0ReadinessCheck.includes("按 JZ 试玩编号分组")
      && p0ReadinessCheck.includes("补同一局的 JZ 试玩编号")
      && p0ReadinessCheck.includes("复制收件汇总")
      && p0ReadinessCheck.includes("复制本条补收消息")
      && p0ReadinessCheck.includes("P0 统一反馈包")
      && p0ReadinessCheck.includes("拆入三栏")
      && p0ReadinessCheck.includes("人工收口路径")
      && p0ReadinessCheck.includes("反馈证据雷达")
      && p0ReadinessCheck.includes("p0-readiness-status.js")
      && p0ReadinessCheck.includes("BSI_P0_READINESS_STATUS")
      && p0ReadinessCheck.includes("P0试玩版总验收报告.md")
      && p0ReadinessCheck.includes("P0试玩版总验收报告.html")
      && p0ReadinessStatus.includes("window.BSI_P0_READINESS_STATUS")
      && p0ReadinessStatus.includes('"machineText": "9/9"')
      && p0ReadinessStatus.includes("P0 机器验收通过，待真人确认")
      && p0ReadinessStatus.includes('"id": "audio-health"')
      && p0ReadinessStatus.includes('"id": "online-smoke"')
      && p0ReadinessStatus.includes('"id": "visual-smoke"')
      && p0ReadinessStatus.includes("线上公开站冒烟")
      && p0ReadinessStatus.includes("页面 12/12，阻断项 0")
      && p0ReadinessStatus.includes("线上可视化验收")
      && p0ReadinessStatus.includes("截图 2/2，阻断项 0")
      && p0ReadinessStatus.includes("音频技术体检")
      && p0ReadinessStatus.includes('"onlineEntry": "https://webdeploy-green.vercel.app/"')
      && p0ReadinessStatus.includes('"password": "tusun2026"')
      && p0ReadinessStatus.includes("./P0试玩版总验收报告.html")
      && p0ReadinessStatus.includes("公开根入口、发测批次台、反馈填写页、反馈收件台按试玩编号分组、试玩编号回传、听音编号回传、游戏内 5 分钟提醒、5 分钟试玩任务")
      && p0ReadinessReport.includes("P0 试玩版总验收报告")
      && p0ReadinessReport.includes("机器验收：9/9")
      && p0ReadinessReport.includes("真人 5 分钟试玩")
      && p0ReadinessReport.includes("线上公开站冒烟")
      && p0ReadinessReport.includes("页面 12/12，阻断项 0")
      && p0ReadinessReport.includes("线上可视化验收")
      && p0ReadinessReport.includes("截图 2/2，阻断项 0")
      && p0ReadinessReport.includes("音频技术体检")
      && p0ReadinessReport.includes("资产 20，唯一文件 15，阻断项 0")
      && p0ReadinessReport.includes("声音可试玩状态")
      && p0ReadinessReport.includes("公开根入口、发测批次台、反馈填写页、反馈收件台按试玩编号分组、试玩编号回传、听音编号回传、游戏内 5 分钟提醒、5 分钟试玩任务、3 分钟听音任务、完整试玩包、反馈包优先指引和人工回收清单可复制")
      && p0ReadinessReport.includes("## 人工收口路径")
      && p0ReadinessReport.includes("线上公开入口：https://webdeploy-green.vercel.app/")
      && p0ReadinessReport.includes("点击“复制听音任务”")
      && p0ReadinessReport.includes("P0发测批次台.html")
      && p0ReadinessReport.includes("任务类型、目标反馈数、已回收反馈")
      && p0ReadinessReport.includes("复制本批追收")
      && p0ReadinessReport.includes("P0反馈填写页.html")
      && p0ReadinessReport.includes("P0人工反馈收件台.html")
      && p0ReadinessReport.includes("按同一局分组")
      && p0ReadinessReport.includes("复制收件汇总")
      && p0ReadinessReport.includes("P0 统一反馈包")
      && p0ReadinessReport.includes("P0 音频听感验收摘要")
      && p0ReadinessReport.includes("试玩密码：`tusun2026`")
      && p0ReadinessReport.includes("P0 试玩反馈包")
      && p0ReadinessReport.includes("拆入三栏")
      && p0ReadinessReport.includes("复制补收消息")
      && p0ReadinessReport.includes("5分钟试玩记录")
      && p0ReadinessReport.includes("反馈证据雷达")
      && p0ReadinessReportHtml.includes("<title>不思异：九州 P0 试玩版总验收报告</title>")
      && p0ReadinessReportHtml.includes("P0 机器验收通过，待真人确认")
      && p0ReadinessReportHtml.includes("线上公开站冒烟")
      && p0ReadinessReportHtml.includes("音频技术体检")
      && p0ReadinessReportHtml.includes("人工收口路径")
      && p0ReadinessReportHtml.includes("P0 发测批次台")
      && p0ReadinessReportHtml.includes("复制本批追收")
      && p0ReadinessReportHtml.includes("P0 反馈填写页")
      && p0ReadinessReportHtml.includes("P0 人工反馈收件台")
      && p0ReadinessReportHtml.includes("反馈收件台")
      && p0ReadinessReportHtml.includes("复制听音任务")
      && p0ReadinessReportHtml.includes("线上公开入口")
      && p0ReadinessReportHtml.includes("tusun2026")
      && p0ReadinessReportHtml.includes("P0 真人试玩验收台")
      && p0ReadinessReportHtml.includes("P0 试玩反馈包")
      && p0ReadinessReportHtml.includes("拆入三栏")
      && p0ReadinessReportHtml.includes("复制补收消息")
    ));
  }
  const p0AudioWorkbench = fs.existsSync(FILES.p0AudioWorkbench) ? read(FILES.p0AudioWorkbench) : "";
  check("P0 audio review workbench contract", (
    p0AudioWorkbench.includes("P0 音频听感验收工作台")
    && p0AudioWorkbench.includes("window.BSI_GAME_DATA")
    && p0AudioWorkbench.includes("audioAssets")
    && p0AudioWorkbench.includes('id="copyAudioTask"')
    && p0AudioWorkbench.includes("复制听音任务")
    && p0AudioWorkbench.includes("function buildAudioTaskText")
    && p0AudioWorkbench.includes("function copyAudioTask")
    && p0AudioWorkbench.includes('id="runCode"')
    && p0AudioWorkbench.includes("试玩编号")
    && p0AudioWorkbench.includes("new URLSearchParams(window.location.search)")
    && p0AudioWorkbench.includes('urlParams.get("run") || urlParams.get("runCode")')
    && p0AudioWorkbench.includes("已带入试玩编号")
    && p0AudioWorkbench.includes('audioUrlObject.searchParams.set("run", runCode.value)')
    && p0AudioWorkbench.includes('audioUrlObject.searchParams.set("source", "audio-workbench")')
    && p0AudioWorkbench.includes("《不思异：九州》P0 3 分钟听音任务")
    && p0AudioWorkbench.includes("请只判断听感，不判断授权")
    && p0AudioWorkbench.includes("先听完 6 首音乐候选")
    && p0AudioWorkbench.includes("review-pending")
    && p0AudioWorkbench.includes("demo-temporary")
    && p0AudioWorkbench.includes("保留")
    && p0AudioWorkbench.includes("待改")
    && p0AudioWorkbench.includes("弃用")
    && p0AudioWorkbench.includes("分层验收门槛")
    && p0AudioWorkbench.includes("顺序试听")
    && p0AudioWorkbench.includes("currentAuditionAsset")
    && p0AudioWorkbench.includes("advanceToNextUnreviewed")
    && p0AudioWorkbench.includes("playAudition")
    && p0AudioWorkbench.includes("待改/弃用重做清单")
    && p0AudioWorkbench.includes("copyRevisionPlan")
    && p0AudioWorkbench.includes("buildRevisionPlan")
    && p0AudioWorkbench.includes("getRevisionItems")
    && p0AudioWorkbench.includes("P0 音频待改/弃用重做清单")
    && p0AudioWorkbench.includes("coverageGroups")
    && p0AudioWorkbench.includes("分层缺口")
    && p0AudioWorkbench.includes("音乐、环境、神志、告急、短音、地图层")
    && p0AudioWorkbench.includes("AUD-P0-PASS-CANDIDATE")
    && p0AudioWorkbench.includes("《不思异：九州》P0 音频听感验收摘要")
    && p0AudioWorkbench.includes("复制音频验收摘要")
    && p0AudioWorkbench.includes("localStorage")
    && p0AudioWorkbench.includes("new Audio(asset.src)")
    && p0AudioWorkbench.includes("内部 Demo 听感")
    && readme.includes("P0 音频听感验收工作台")
  ));
  const p0PlaytestWorkbench = fs.existsSync(FILES.p0PlaytestWorkbench) ? read(FILES.p0PlaytestWorkbench) : "";
  check("P0 human playtest acceptance workbench contract", (
    p0PlaytestWorkbench.includes("P0 真人试玩验收工作台")
    && p0PlaytestWorkbench.includes("P0 门槛")
    && p0PlaytestWorkbench.includes("玩家知道下一步")
    && p0PlaytestWorkbench.includes("一局能形成复盘")
    && p0PlaytestWorkbench.includes("资源压力可读")
    && p0PlaytestWorkbench.includes("横屏 UI 不阻塞")
    && p0PlaytestWorkbench.includes("声音不打扰")
    && p0PlaytestWorkbench.includes("反馈证据雷达")
    && p0PlaytestWorkbench.includes("evidenceRules")
    && p0PlaytestWorkbench.includes("自动证据雷达")
    && p0PlaytestWorkbench.includes("五类 P0 反馈证据")
    && p0PlaytestWorkbench.includes("三段材料回收状态")
    && p0PlaytestWorkbench.includes("试玩编号一致性")
    && p0PlaytestWorkbench.includes("run-code-check")
    && p0PlaytestWorkbench.includes("function extractRunCodes")
    && p0PlaytestWorkbench.includes("function analyzeRunCodes")
    && p0PlaytestWorkbench.includes("function renderRunCodeCheck")
    && p0PlaytestWorkbench.includes("同一局")
    && p0PlaytestWorkbench.includes("编号不一致")
    && p0PlaytestWorkbench.includes("补同一局的 JZ 试玩编号")
    && p0PlaytestWorkbench.includes("materialRules")
    && p0PlaytestWorkbench.includes("analyzeMaterials")
    && p0PlaytestWorkbench.includes("材料缺口")
    && p0PlaytestWorkbench.includes("试玩编号一致性：")
    && p0PlaytestWorkbench.includes("拆入三栏")
    && p0PlaytestWorkbench.includes("function splitFeedbackPackageIntoFields")
    && p0PlaytestWorkbench.includes("function extractPackageSection")
    && p0PlaytestWorkbench.includes("《不思异：九州》P0 试玩反馈包")
    && p0PlaytestWorkbench.includes("已拆入三栏：试玩记录、音频听感、本局复盘")
    && p0PlaytestWorkbench.includes('id="copyFollowupRequest"')
    && p0PlaytestWorkbench.includes("复制补收消息")
    && p0PlaytestWorkbench.includes("function buildFollowupRequest")
    && p0PlaytestWorkbench.includes("function copyFollowupRequest")
    && p0PlaytestWorkbench.includes("补收消息已复制")
    && p0PlaytestWorkbench.includes("最省事的补法")
    && p0PlaytestWorkbench.includes("5分钟试玩记录")
    && p0PlaytestWorkbench.includes("音频听感复核")
    && p0PlaytestWorkbench.includes("游戏内“志”本局复盘")
    && p0PlaytestWorkbench.includes("《不思异：九州》P0 真人试玩验收摘要")
    && p0PlaytestWorkbench.includes("复制验收摘要")
    && p0PlaytestWorkbench.includes("localStorage")
    && p0PlaytestWorkbench.includes("试玩入口")
    && p0PlaytestWorkbench.includes("听感面板")
    && readme.includes("复制补收消息")
  ));
  const playtestFlowCheck = fs.existsSync(FILES.playtestFlowCheck) ? read(FILES.playtestFlowCheck) : "";
  const playtestFlowReport = fs.existsSync(FILES.playtestFlowReport) ? read(FILES.playtestFlowReport) : "";
  check("human playtest flow contract", (
    fs.existsSync(FILES.playtestFlowCheck)
    && playtestFlowCheck.includes("HUMAN_PATH_ROUTE_IDS")
    && playtestFlowCheck.includes("launcher exposes feedback handoff")
    && playtestFlowCheck.includes("main page exposes recap drawer")
    && playtestFlowCheck.includes("app exposes guided next-step states")
    && playtestFlowCheck.includes("playtest has enough recap material")
    && playtestFlowCheck.includes("--write-report")
    && fs.existsSync(FILES.playtestFlowReport)
    && playtestFlowReport.includes("真人试玩链自动验收")
    && playtestFlowReport.includes("入口、第一分钟、补给、选路、半途、终点和复盘复制链路")
    && playtestFlowReport.includes("看懂下一步")
    && playtestFlowReport.includes("愿意再走一站")
    && readme.includes("playtest-flow-check.js --write-report")
  ));
  const balanceSim = fs.existsSync(FILES.balanceSim) ? read(FILES.balanceSim) : "";
  const balanceStatus = fs.existsSync(FILES.balanceStatus) ? read(FILES.balanceStatus) : "";
  const balanceReport = fs.existsSync(FILES.balanceReport) ? read(FILES.balanceReport) : "";
  const balanceReportHtml = fs.existsSync(FILES.balanceReportHtml) ? read(FILES.balanceReportHtml) : "";
  check("balance simulator novice stress contract", (
    fs.existsSync(FILES.balanceSim)
    && balanceSim.includes("novice")
    && balanceSim.includes("FAILURE_STEP_BUCKETS")
    && balanceSim.includes("WARNING_RUNS")
    && balanceSim.includes("RESCUED_RUNS")
    && balanceSim.includes("BALANCE_GATES")
    && balanceSim.includes("getBalanceGates")
    && balanceSim.includes("gatePassText")
    && balanceSim.includes("--write-status")
    && balanceSim.includes("--write-report")
    && balanceSim.includes("window.BSI_BALANCE_STATUS")
    && balanceSim.includes("平衡健康报告")
    && balanceSim.includes("P0 / P1 门槛")
    && balanceSim.includes("balance-status.html")
    && balanceSim.includes("<meta charset=\"UTF-8\"")
    && fs.existsSync(FILES.balanceStatus)
    && fs.existsSync(FILES.balanceReport)
    && fs.existsSync(FILES.balanceReportHtml)
    && balanceStatus.includes("window.BSI_BALANCE_STATUS")
    && balanceStatus.includes('"report": "./balance-status.html"')
    && balanceStatus.includes('"runsPerStrategy": 1000')
    && balanceStatus.includes('"title": "P0 平衡通过"')
    && balanceStatus.includes('"gatePassText": "8/8"')
    && balanceStatus.includes('"label": "四策略通关率"')
    && balanceStatus.includes('"label": "前 3 步死局"')
    && balanceStatus.includes('"label": "新手压力告警"')
    && balanceStatus.includes('"novice"')
    && balanceStatus.includes('"runsPerStrategy"')
    && balanceReport.includes("平衡健康报告")
    && balanceReport.includes("结论：P0 平衡通过")
    && balanceReport.includes("## P0 / P1 门槛")
    && balanceReport.includes("| 四策略通关率 | 100% | >= 98% | 通过 |")
    && balanceReport.includes("新手")
    && balanceReportHtml.includes("<meta charset=\"UTF-8\"")
    && balanceReportHtml.includes("平衡健康报告")
    && balanceReportHtml.includes("<th>门槛</th>")
    && balanceReportHtml.includes("<td>四策略通关率</td>")
    && balanceReportHtml.includes("<td>新手压力告警</td>")
    && balanceReportHtml.includes("门槛：<strong>8/8</strong>")
    && balanceReportHtml.includes("新手告警")
    && launcher.includes("balance-status.js")
    && launcher.includes("balance-status.html")
    && launcher.includes("balanceStatusTitle")
    && launcher.includes("balanceStrategyList")
    && launcher.includes("机制平衡")
    && launcher.includes("平衡报告")
    && readme.includes("balance-sim.js --runs=1000 --write-status --write-report")
  ));

  if (failures) {
    console.error(`\n${failures} QA check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll prototype QA checks passed.");
}

run();
