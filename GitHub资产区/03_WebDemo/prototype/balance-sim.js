#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data.js");
const STATUS_FILE = path.join(ROOT, "balance-status.js");
const REPORT_FILE = path.join(ROOT, "balance-status.md");
const REPORT_HTML_FILE = path.join(ROOT, "balance-status.html");
const TARGET_LOCATION = "kyushu_rift";
const MAX_STEPS = 18;
let MAX_RESCUES_BEFORE_STRANDING = 3;
let HARD_BAD_LUCK_THRESHOLD = 96;
let RESOURCE_WARNING_LIMITS = { axle: 30, grain: 35, sanity: 45 };
let CRITICAL_RESCUE_LIMIT = 15;
let RANDOM_ROUTE_EVENT_BASE_CHANCE = 0.21;
let RANDOM_ROUTE_EVENT_MAX_CHANCE = 0.63;
let ROUTE_EVENT_BREATHER_STREAK = 2;
let RESCUE_WEIGHT_LOW_RESOURCE_LIMIT = 45;
let RESCUE_WEIGHT_SUPPLY = 22;
let RESCUE_WEIGHT_REST = 18;
let RESCUE_WEIGHT_ITEM = 14;
let RESCUE_WEIGHT_BAD_LUCK_THRESHOLD = 55;
let RESCUE_WEIGHT_BAD_LUCK = 28;
let RESCUE_FORCE_BAD_LUCK_THRESHOLD = 60;
let SANITY_EVENT_PENALTY_LIMIT = 28;
let SANITY_EVENT_PENALTY = -8;
let LOW_SANITY_PROTECTION_LIMIT = 30;
let BREATHER_BAD_LUCK_LIMIT = 55;
let BAD_LUCK_MID_BOOST_THRESHOLD = 35;
let BAD_LUCK_MID_BOOST = 0.08;
let BAD_LUCK_HIGH_BOOST_THRESHOLD = 65;
let BAD_LUCK_HIGH_BOOST = 0.14;
let DANGER_EVENT_CHANCE_BOOST = 0.09;
let BAD_LUCK_ROUTE_PRESSURE_DIVISOR = 10;
let BAD_LUCK_EVENT_PRESSURE_DIVISOR = 14;
let BAD_LUCK_EVENT_RECOVERY_DIVISOR = 12;
let BAD_LUCK_CRISIS_RECOVERY_DIVISOR = 10;
let BAD_LUCK_LOW_RESOURCE_LIMIT = 20;
let BAD_LUCK_LOW_RESOURCE_SHIFT = 3;
let SAME_CRISIS_HARD_FAIL_COUNT = 2;
let CRISIS_BAD_LUCK_GAIN = 12;

function applyBalanceConfig(config = {}) {
  if (!config || typeof config !== "object") return;
  MAX_RESCUES_BEFORE_STRANDING = config.maxRescuesBeforeStranding ?? MAX_RESCUES_BEFORE_STRANDING;
  HARD_BAD_LUCK_THRESHOLD = config.hardBadLuckThreshold ?? HARD_BAD_LUCK_THRESHOLD;
  RESOURCE_WARNING_LIMITS = { ...RESOURCE_WARNING_LIMITS, ...(config.resourceWarningLimits || {}) };
  CRITICAL_RESCUE_LIMIT = config.resourceCriticalLimit ?? CRITICAL_RESCUE_LIMIT;
  RANDOM_ROUTE_EVENT_BASE_CHANCE = config.randomRouteEventBaseChance ?? RANDOM_ROUTE_EVENT_BASE_CHANCE;
  RANDOM_ROUTE_EVENT_MAX_CHANCE = config.randomRouteEventMaxChance ?? RANDOM_ROUTE_EVENT_MAX_CHANCE;
  ROUTE_EVENT_BREATHER_STREAK = config.routeEventBreatherStreak ?? ROUTE_EVENT_BREATHER_STREAK;
  RESCUE_WEIGHT_LOW_RESOURCE_LIMIT = config.rescueWeightLowResourceLimit ?? RESCUE_WEIGHT_LOW_RESOURCE_LIMIT;
  RESCUE_WEIGHT_SUPPLY = config.rescueWeightSupply ?? RESCUE_WEIGHT_SUPPLY;
  RESCUE_WEIGHT_REST = config.rescueWeightRest ?? RESCUE_WEIGHT_REST;
  RESCUE_WEIGHT_ITEM = config.rescueWeightItem ?? RESCUE_WEIGHT_ITEM;
  RESCUE_WEIGHT_BAD_LUCK_THRESHOLD = config.rescueWeightBadLuckThreshold ?? RESCUE_WEIGHT_BAD_LUCK_THRESHOLD;
  RESCUE_WEIGHT_BAD_LUCK = config.rescueWeightBadLuck ?? RESCUE_WEIGHT_BAD_LUCK;
  RESCUE_FORCE_BAD_LUCK_THRESHOLD = config.rescueForceBadLuckThreshold ?? RESCUE_FORCE_BAD_LUCK_THRESHOLD;
  SANITY_EVENT_PENALTY_LIMIT = config.sanityEventPenaltyLimit ?? SANITY_EVENT_PENALTY_LIMIT;
  SANITY_EVENT_PENALTY = config.sanityEventPenalty ?? SANITY_EVENT_PENALTY;
  LOW_SANITY_PROTECTION_LIMIT = config.lowSanityProtectionLimit ?? LOW_SANITY_PROTECTION_LIMIT;
  BREATHER_BAD_LUCK_LIMIT = config.breatherBadLuckLimit ?? BREATHER_BAD_LUCK_LIMIT;
  BAD_LUCK_MID_BOOST_THRESHOLD = config.badLuckMidBoostThreshold ?? BAD_LUCK_MID_BOOST_THRESHOLD;
  BAD_LUCK_MID_BOOST = config.badLuckMidBoost ?? BAD_LUCK_MID_BOOST;
  BAD_LUCK_HIGH_BOOST_THRESHOLD = config.badLuckHighBoostThreshold ?? BAD_LUCK_HIGH_BOOST_THRESHOLD;
  BAD_LUCK_HIGH_BOOST = config.badLuckHighBoost ?? BAD_LUCK_HIGH_BOOST;
  DANGER_EVENT_CHANCE_BOOST = config.dangerEventChanceBoost ?? DANGER_EVENT_CHANCE_BOOST;
  BAD_LUCK_ROUTE_PRESSURE_DIVISOR = config.badLuckRoutePressureDivisor ?? BAD_LUCK_ROUTE_PRESSURE_DIVISOR;
  BAD_LUCK_EVENT_PRESSURE_DIVISOR = config.badLuckEventPressureDivisor ?? BAD_LUCK_EVENT_PRESSURE_DIVISOR;
  BAD_LUCK_EVENT_RECOVERY_DIVISOR = config.badLuckEventRecoveryDivisor ?? BAD_LUCK_EVENT_RECOVERY_DIVISOR;
  BAD_LUCK_CRISIS_RECOVERY_DIVISOR = config.badLuckCrisisRecoveryDivisor ?? BAD_LUCK_CRISIS_RECOVERY_DIVISOR;
  BAD_LUCK_LOW_RESOURCE_LIMIT = config.badLuckLowResourceLimit ?? BAD_LUCK_LOW_RESOURCE_LIMIT;
  BAD_LUCK_LOW_RESOURCE_SHIFT = config.badLuckLowResourceShift ?? BAD_LUCK_LOW_RESOURCE_SHIFT;
  SAME_CRISIS_HARD_FAIL_COUNT = config.sameCrisisHardFailCount ?? SAME_CRISIS_HARD_FAIL_COUNT;
  CRISIS_BAD_LUCK_GAIN = config.crisisBadLuckGain ?? CRISIS_BAD_LUCK_GAIN;
}
const STRATEGY_DESCRIPTIONS = {
  conservative: "资源安全优先，模拟谨慎玩家。",
  balanced: "推进与资源兼顾，模拟默认玩家。",
  risky: "推进优先，模拟熟悉路线后的冒险玩家。",
  novice: "会误判补给和路线，模拟第一次玩、不总选最优项的玩家。"
};
const BALANCE_GATES = {
  p0MinSuccessRate: 0.98,
  p0MaxHardFailures: 0,
  p0MaxEarlyFailures: 0,
  p0BalancedWarningMin: 0.02,
  p0BalancedWarningMax: 0.18,
  p0NoviceWarningMin: 0.45,
  p0NoviceWarningMax: 0.85,
  p0NoviceRescueMax: 0.05,
  p1NoviceSanityP10Min: 12,
  p1GrainP10Min: 30
};

function parseArgs(argv) {
  const options = {
    runs: 100,
    seed: "busi-kyushu",
    strategy: "balanced",
    verbose: false,
    json: false,
    writeStatus: false,
    writeReport: false
  };
  argv.slice(2).forEach((arg, index, args) => {
    if (arg === "--runs") options.runs = Math.max(1, Number(args[index + 1]) || options.runs);
    if (arg.startsWith("--runs=")) options.runs = Math.max(1, Number(arg.split("=")[1]) || options.runs);
    if (arg === "--seed") options.seed = args[index + 1] || options.seed;
    if (arg.startsWith("--seed=")) options.seed = arg.split("=").slice(1).join("=") || options.seed;
    if (arg === "--strategy") options.strategy = args[index + 1] || options.strategy;
    if (arg.startsWith("--strategy=")) options.strategy = arg.split("=")[1] || options.strategy;
    if (arg === "--verbose") options.verbose = true;
    if (arg === "--json") options.json = true;
    if (arg === "--write-status") options.writeStatus = true;
    if (arg === "--write-report") options.writeReport = true;
  });
  return options;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadGameData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(DATA_FILE), sandbox, { filename: DATA_FILE });
  if (!sandbox.window.BSI_GAME_DATA) {
    throw new Error("window.BSI_GAME_DATA was not defined by data.js");
  }
  return sandbox.window.BSI_GAME_DATA;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function createRng(seed) {
  let h = 2166136261;
  String(seed).split("").forEach((char) => {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  });
  return function rng() {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(items, rng) {
  if (!items.length) return null;
  const total = items.reduce((sum, item) => sum + Math.max(1, Number(item.weight) || 1), 0);
  let cursor = rng() * total;
  for (const item of items) {
    cursor -= Math.max(1, Number(item.weight) || 1);
    if (cursor <= 0) return item;
  }
  return items[items.length - 1];
}

function sampleWeighted(items, count, rng) {
  const pool = [...items];
  const picked = [];
  while (pool.length && picked.length < count) {
    const item = pickWeighted(pool, rng);
    if (!item) break;
    picked.push(item);
    pool.splice(pool.indexOf(item), 1);
  }
  return picked;
}

function asPoolItems(value, fallbackType) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (
    typeof item === "string" ? { id: item, type: fallbackType, weight: 30, tags: [] } : { type: fallbackType, weight: 30, tags: [], ...item }
  ));
}

function resolveCount(value, fallback, rng) {
  if (typeof value === "number") return Math.min(fallback, Math.max(0, value));
  if (value && typeof value === "object") {
    const min = Math.max(0, Number(value.min) || 0);
    const max = Math.max(min, Number(value.max) || min);
    return Math.min(fallback, min + Math.floor(rng() * (max - min + 1)));
  }
  return fallback;
}

function getLocationStep(locations, locationId) {
  return Number(locations[locationId]?.map?.step || 0);
}

function getMaxJourneyStep(locations) {
  return Math.max(...Object.values(locations).map((location) => Number(location.map?.step || 0)));
}

function getDangerResourceKeys(state) {
  return Object.keys(state.resources).filter((key) => (
    Number(state.resources[key] || 0) <= (RESOURCE_WARNING_LIMITS[key] ?? 35)
  ));
}

function getCriticalResourceKeys(state) {
  return Object.keys(state.resources).filter((key) => (
    Number(state.resources[key] || 0) <= CRITICAL_RESCUE_LIMIT
  ));
}

function getLowestResourceKey(state) {
  return Object.entries(state.resources)
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))[0]?.[0] || "sanity";
}

function normalizeState(data, seed) {
  const template = clone(data.initialStateTemplate || {});
  return {
    ...template,
    runId: seed,
    currentLocation: data.startLocation || template.currentLocation || "central_post",
    resources: { ...(template.resources || {}) },
    languages: { ...(template.languages || {}) },
    flags: [...(template.flags || [])],
    eventResults: {},
    routeEventResults: {},
    usedSupplies: {},
    traveledRoutes: [],
    revealedRoutes: [],
    routePoolSelections: {},
    pendingRoute: null,
    status: "playing",
    ending: "",
    crisisType: "",
    failureType: "",
    badLuckMeter: 0,
    failureStats: {
      axleCrises: 0,
      grainCrises: 0,
      sanityCrises: 0,
      routeLocks: 0,
      rescues: 0,
      hardFailures: 0
    },
    stats: {
      steps: 0,
      routeEvents: 0,
      randomRouteEvents: 0,
      suppliesUsed: 0,
      lowest: { ...(template.resources || {}) },
      routePressure: {},
      choices: []
    }
  };
}

function updateLowest(state, resourceKeys) {
  resourceKeys.forEach((key) => {
    state.stats.lowest[key] = Math.min(state.stats.lowest[key], state.resources[key]);
  });
}

function updateBadLuck(state, delta = {}, context, resourceKeys) {
  const pressure = resourceKeys.reduce((total, key) => {
    const value = Number(delta[key] || 0);
    return value < 0 ? total + Math.abs(value) : total;
  }, 0);
  const recovery = resourceKeys.reduce((total, key) => {
    const value = Number(delta[key] || 0);
    return value > 0 ? total + value : total;
  }, 0);
  const lowResourceCount = resourceKeys.filter((key) => state.resources[key] <= BAD_LUCK_LOW_RESOURCE_LIMIT).length;
  let shift = Number(delta.badLuck || 0);

  if (context === "route") shift += Math.ceil(pressure / BAD_LUCK_ROUTE_PRESSURE_DIVISOR);
  if (context === "event") shift += Math.ceil(pressure / BAD_LUCK_EVENT_PRESSURE_DIVISOR) - Math.floor(recovery / BAD_LUCK_EVENT_RECOVERY_DIVISOR);
  if (context === "crisis") shift -= Math.floor(recovery / BAD_LUCK_CRISIS_RECOVERY_DIVISOR);
  shift += lowResourceCount * BAD_LUCK_LOW_RESOURCE_SHIFT;
  state.badLuckMeter = clamp(state.badLuckMeter + shift);
}

function applyDelta(state, delta = {}, context, resourceKeys) {
  resourceKeys.forEach((key) => {
    state.resources[key] = clamp((state.resources[key] || 0) + Number(delta[key] || 0));
  });
  if (delta.language) {
    Object.entries(delta.language).forEach(([key, value]) => {
      state.languages[key] = clamp((state.languages[key] || 0) + Number(value || 0));
    });
  }
  if (delta.flag && !state.flags.includes(delta.flag)) state.flags.push(delta.flag);
  if (delta.ending) {
    state.status = "ended";
    state.ending = delta.ending;
  }
  updateBadLuck(state, delta, context, resourceKeys);
  updateLowest(state, resourceKeys);
}

function meetsCondition(state, condition = {}) {
  if (condition.flag) return state.flags.includes(condition.flag);
  if (condition.sanityMax !== undefined) return state.resources.sanity <= condition.sanityMax;
  if (condition.sanityMin !== undefined) return state.resources.sanity >= condition.sanityMin;
  if (condition.languageMin) {
    return (state.languages[condition.languageMin.key] || 0) >= condition.languageMin.value;
  }
  return true;
}

function canUseRoute(state, route) {
  const all = (route.conditions || []).every((condition) => meetsCondition(state, condition));
  const any = !route.requireAny?.length || route.requireAny.some((condition) => meetsCondition(state, condition));
  return all && any;
}

function getRouteContextTags(data, route) {
  const fromTerrain = data.locations[route.from]?.terrain;
  const toTerrain = data.locations[route.to]?.terrain;
  const step = Math.max(getLocationStep(data.locations, route.from), getLocationStep(data.locations, route.to));
  const maxStep = getMaxJourneyStep(data.locations);
  return [
    route.terrain,
    fromTerrain,
    toTerrain,
    route.from,
    route.to,
    step <= 1 ? "early" : "",
    step >= maxStep - 1 ? "late" : "mid"
  ].filter(Boolean);
}

function getVisibleRoutes(data, state, rng) {
  const locationId = state.currentLocation;
  const outgoing = (data.routes || []).filter((route) => route.from === locationId);
  const pool = data.routePools?.[locationId];
  if (!pool) return outgoing;

  if (!state.routePoolSelections[locationId]) {
    const required = asPoolItems(pool.requiredRoutes, "route")
      .filter((item) => outgoing.some((route) => route.id === item.id));
    const optional = asPoolItems(pool.optionalRoutes, "route")
      .filter((item) => outgoing.some((route) => route.id === item.id))
      .filter((item) => !required.some((requiredItem) => requiredItem.id === item.id));
    const optionalCount = resolveCount(pool.optionalCount, optional.length, rng);
    const picked = sampleWeighted(optional, optionalCount, rng);
    const routeIds = [...new Set([...required, ...picked].map((item) => item.id))];
    state.routePoolSelections[locationId] = { routeIds };
  }

  const routeIds = state.routePoolSelections[locationId].routeIds || [];
  const visible = routeIds
    .map((routeId) => outgoing.find((route) => route.id === routeId))
    .filter(Boolean);
  return visible.length ? visible : outgoing;
}

function scoreDeltaForNeed(state, delta = {}, resourceKeys) {
  const lowest = getLowestResourceKey(state);
  return resourceKeys.reduce((score, key) => {
    const value = Number(delta[key] || 0);
    const need = Math.max(0, 100 - state.resources[key]);
    const multiplier = key === lowest ? 2.2 : 1 + need / 100;
    return score + value * multiplier;
  }, 0) + Number(delta.badLuck || 0) * -0.9;
}

function rankChoices(state, choices = [], resourceKeys, rng) {
  return choices.map((choice) => ({
    choice,
    score: scoreDeltaForNeed(state, choice.effect, resourceKeys) + rng() * 0.25
  })).sort((a, b) => b.score - a.score);
}

function pickBestChoice(state, choices = [], resourceKeys, rng) {
  if (!choices.length) return null;
  return rankChoices(state, choices, resourceKeys, rng)[0].choice;
}

function pickChoiceByStrategy(state, choices = [], resourceKeys, rng, context = "choice") {
  if (!choices.length) return null;
  const ranked = rankChoices(state, choices, resourceKeys, rng);
  if (state.strategy !== "novice" || ranked.length === 1) return ranked[0].choice;

  const roll = rng();
  const randomChoice = choices[Math.floor(rng() * choices.length)];
  const secondChoice = ranked[Math.min(1, ranked.length - 1)].choice;
  const worstChoice = ranked[ranked.length - 1].choice;

  if (context === "supply") {
    if (roll < 0.46) return ranked[0].choice;
    if (roll < 0.74) return randomChoice;
    if (roll < 0.9) return secondChoice;
    return worstChoice;
  }

  if (context === "routeEvent") {
    if (roll < 0.58) return ranked[0].choice;
    if (roll < 0.82) return randomChoice;
    return secondChoice;
  }

  if (roll < 0.62) return ranked[0].choice;
  if (roll < 0.86) return randomChoice;
  return secondChoice;
}

function resolveCrisis(data, state, resourceKeys, rng) {
  const crisisType = resourceKeys.find((key) => state.resources[key] <= 0) || "";
  if (!crisisType || state.status !== "playing") return false;
  const statKey = `${crisisType}Crises`;
  const sameCrisisCount = state.failureStats[statKey] || 0;
  if (
    state.failureStats.rescues >= MAX_RESCUES_BEFORE_STRANDING
    || sameCrisisCount >= SAME_CRISIS_HARD_FAIL_COUNT
    || state.badLuckMeter >= HARD_BAD_LUCK_THRESHOLD
  ) {
    state.status = "stranded";
    state.failureType = crisisType;
    state.badLuckMeter = 100;
    state.failureStats.hardFailures += 1;
    return true;
  }

  state.crisisType = crisisType;
  state.badLuckMeter = clamp(state.badLuckMeter + CRISIS_BAD_LUCK_GAIN);
  state.failureStats[statKey] = sameCrisisCount + 1;
  const choice = pickBestChoice(state, data.crisisEvents?.[crisisType]?.choices || [], resourceKeys, rng);
  if (!choice) {
    state.status = "stranded";
    state.failureType = crisisType;
    state.failureStats.hardFailures += 1;
    return true;
  }
  applyDelta(state, choice.effect, "crisis", resourceKeys);
  state.failureStats.rescues += 1;
  state.crisisType = "";
  state.status = "playing";
  return true;
}

function resolveCrisesUntilStable(data, state, resourceKeys, rng) {
  let guard = 0;
  while (state.status === "playing" && resourceKeys.some((key) => state.resources[key] <= 0) && guard < 5) {
    resolveCrisis(data, state, resourceKeys, rng);
    guard += 1;
  }
}

function applyLocationEvent(data, state, resourceKeys, rng) {
  const location = data.locations[state.currentLocation];
  const eventId = location?.event;
  if (!eventId || state.eventResults[eventId]) return;
  const event = data.events?.[eventId];
  const choices = event?.choices || [];
  const choice = state.currentLocation === TARGET_LOCATION
    ? choices.find((item) => item.effect?.ending === "rift") || pickBestChoice(state, choices, resourceKeys, rng)
    : pickChoiceByStrategy(state, choices, resourceKeys, rng, "location");
  if (!choice) return;
  applyDelta(state, choice.effect, "event", resourceKeys);
  state.eventResults[eventId] = choice.result || choice.label || "done";
  state.stats.choices.push({ type: "location", id: eventId, choice: choice.label });
  resolveCrisesUntilStable(data, state, resourceKeys, rng);
}

function useSupply(data, state, resourceKeys, rng) {
  const location = data.locations[state.currentLocation];
  const supplies = location?.supplies || [];
  const used = state.usedSupplies[state.currentLocation] || [];
  const available = supplies.filter((supply) => !used.includes(supply.id));
  if (!available.length) return;
  const supply = pickChoiceByStrategy(state, available, resourceKeys, rng, "supply");
  if (!supply) return;
  applyDelta(state, supply.effect, "event", resourceKeys);
  state.usedSupplies[state.currentLocation] = [...used, supply.id];
  state.stats.suppliesUsed += 1;
  state.stats.choices.push({ type: "supply", id: supply.id, choice: supply.label });
  resolveCrisesUntilStable(data, state, resourceKeys, rng);
}

function eventTriggerMatches(state, event) {
  const trigger = event.trigger || {};
  if (trigger.phase && trigger.phase !== "mid_route") return false;
  if (trigger.axleMax !== undefined && state.resources.axle > trigger.axleMax) return false;
  if (trigger.grainMax !== undefined && state.resources.grain > trigger.grainMax) return false;
  if (trigger.sanityMax !== undefined && state.resources.sanity > trigger.sanityMax) return false;
  if (trigger.sanityMin !== undefined && state.resources.sanity < trigger.sanityMin) return false;
  if (trigger.badLuckMin !== undefined && state.badLuckMeter < trigger.badLuckMin) return false;
  return true;
}

function routeEventMatches(data, event, route) {
  const routeTags = Array.isArray(event.routeTags) ? event.routeTags.filter(Boolean) : [];
  if (!routeTags.length) return true;
  const contextTags = getRouteContextTags(data, route);
  return routeTags.some((tag) => contextTags.includes(tag));
}

function getWorstSanityLoss(event) {
  return Math.min(0, ...(event?.choices || []).map((choice) => Number(choice.effect?.sanity || 0)));
}

function isHighPressureEvent(event) {
  const pools = Array.isArray(event?.pool) ? event.pool : [];
  return event?.risk === "high"
    || (event?.risk === "medium" && pools.includes("sanity"))
    || getWorstSanityLoss(event) <= -6;
}

function isLowPressureEvent(event) {
  const pools = Array.isArray(event?.pool) ? event.pool : [];
  return Boolean(event?.rescueCandidate)
    || pools.some((pool) => ["rest", "supply", "clue"].includes(pool));
}

function getRecentEventStreak(state) {
  let streak = 0;
  [...state.traveledRoutes].reverse().some((routeId) => {
    const hadEvent = Object.keys(state.routeEventResults || {}).some((key) => key.startsWith(`${routeId}:`));
    if (hadEvent) {
      streak += 1;
      return false;
    }
    return true;
  });
  return streak;
}

function getRandomRouteEventCandidates(data, state, route) {
  return Object.entries(data.randomRouteEvents || {})
    .filter(([eventId, event]) => (
      !state.routeEventResults[`${route.id}:${eventId}`]
      && !Object.keys(state.routeEventResults).some((key) => key.endsWith(`:${eventId}`))
      && eventTriggerMatches(state, event)
      && routeEventMatches(data, event, route)
      && !(state.resources.sanity <= LOW_SANITY_PROTECTION_LIMIT && !isLowPressureEvent(event))
    ))
    .map(([id, event]) => {
      const pools = Array.isArray(event.pool) ? event.pool : [];
      let weight = Math.max(1, Number(event.weight) || 10);
      if (state.resources.grain <= RESCUE_WEIGHT_LOW_RESOURCE_LIMIT && pools.includes("supply")) weight += RESCUE_WEIGHT_SUPPLY;
      if (state.resources.sanity <= RESCUE_WEIGHT_LOW_RESOURCE_LIMIT && pools.includes("rest")) weight += RESCUE_WEIGHT_REST;
      if (state.resources.axle <= RESCUE_WEIGHT_LOW_RESOURCE_LIMIT && pools.includes("item")) weight += RESCUE_WEIGHT_ITEM;
      if (state.badLuckMeter >= RESCUE_WEIGHT_BAD_LUCK_THRESHOLD && event.rescueCandidate) weight += RESCUE_WEIGHT_BAD_LUCK;
      if (pools.includes("sanity") && state.resources.sanity <= SANITY_EVENT_PENALTY_LIMIT) weight += SANITY_EVENT_PENALTY;
      return { id, event, weight: Math.max(1, weight) };
    });
}

function selectRouteEvent(data, state, route, rng) {
  const fixedEvent = route.midEvent && !state.routeEventResults[`${route.id}:${route.midEvent}`]
    ? { id: route.midEvent, event: data.routeEvents?.[route.midEvent], fixed: true }
    : null;
  const candidates = getRandomRouteEventCandidates(data, state, route);
  const rescueCandidates = candidates.filter((item) => item.event.rescueCandidate);
  const eventStreak = getRecentEventStreak(state);
  const dangerCount = getDangerResourceKeys(state).length;
  const criticalRescue = rescueCandidates.length && getCriticalResourceKeys(state).length > 0;
  const isBreather = eventStreak >= ROUTE_EVENT_BREATHER_STREAK;

  let randomEvent = null;
  if (candidates.length) {
    if (isBreather) {
      const breather = candidates.filter((item) => isLowPressureEvent(item.event));
      const needsRescue = getDangerResourceKeys(state).length > 0 || state.badLuckMeter >= BREATHER_BAD_LUCK_LIMIT;
      randomEvent = needsRescue && breather.length ? pickWeighted(breather, rng) : null;
    } else {
      const pressureBoost = state.badLuckMeter >= BAD_LUCK_HIGH_BOOST_THRESHOLD
        ? BAD_LUCK_HIGH_BOOST
        : state.badLuckMeter >= BAD_LUCK_MID_BOOST_THRESHOLD
          ? BAD_LUCK_MID_BOOST
          : 0;
      const dangerBoost = dangerCount * DANGER_EVENT_CHANCE_BOOST;
      const chance = Math.min(RANDOM_ROUTE_EVENT_MAX_CHANCE, RANDOM_ROUTE_EVENT_BASE_CHANCE + pressureBoost + dangerBoost);
      if (rng() <= chance || criticalRescue || (rescueCandidates.length && state.badLuckMeter >= RESCUE_FORCE_BAD_LUCK_THRESHOLD)) {
        randomEvent = pickWeighted(
          criticalRescue || (rescueCandidates.length && state.badLuckMeter >= RESCUE_FORCE_BAD_LUCK_THRESHOLD) ? rescueCandidates : candidates,
          rng
        );
      }
    }
  }

  if (isBreather) return randomEvent;
  if (!fixedEvent?.event) return randomEvent;
  if (!randomEvent) return fixedEvent;
  const lastHigh = Object.values(state.routeEventResults || {}).slice(-1)[0]?.highPressure;
  if (lastHigh && isHighPressureEvent(fixedEvent.event)) return randomEvent;
  const swapChance = Math.min(0.62, 0.3 + dangerCount * 0.08 + state.badLuckMeter / 300);
  return rng() < swapChance ? randomEvent : fixedEvent;
}

function resolveRouteEvent(data, state, route, routeEvent, resourceKeys, rng) {
  if (!routeEvent?.event) return;
  const choice = pickChoiceByStrategy(state, routeEvent.event.choices || [], resourceKeys, rng, "routeEvent");
  if (!choice) return;
  applyDelta(state, choice.effect, "event", resourceKeys);
  state.routeEventResults[`${route.id}:${routeEvent.id}`] = {
    result: choice.result || choice.label || "done",
    highPressure: isHighPressureEvent(routeEvent.event)
  };
  state.stats.routeEvents += 1;
  if (!routeEvent.fixed) state.stats.randomRouteEvents += 1;
  state.stats.choices.push({ type: routeEvent.fixed ? "routeEvent" : "randomRouteEvent", id: routeEvent.id, choice: choice.label });
  resolveCrisesUntilStable(data, state, resourceKeys, rng);
}

function routeScore(data, state, route, resourceKeys, rng, strategy) {
  const nextStep = getLocationStep(data.locations, route.to);
  const currentStep = getLocationStep(data.locations, state.currentLocation);
  const progress = nextStep - currentStep;
  const costPressure = resourceKeys.reduce((sum, key) => {
    const cost = Math.abs(Math.min(0, Number(route.cost?.[key] || 0)));
    const scarcity = Math.max(0.8, (110 - state.resources[key]) / 60);
    return sum + cost * scarcity;
  }, 0);
  const destination = data.locations[route.to];
  const supplyPotential = (destination?.supplies || []).reduce((sum, supply) => (
    sum + resourceKeys.reduce((subtotal, key) => {
      const value = Math.max(0, Number(supply.effect?.[key] || 0));
      const need = Math.max(0, 100 - state.resources[key]);
      return subtotal + value * (key === getLowestResourceKey(state) ? 1.4 : 0.8 + need / 120);
    }, 0)
  ), 0);
  const lockPenalty = canUseRoute(state, route) ? 0 : 999;
  const riftBonus = route.to === TARGET_LOCATION ? 36 : 0;
  const loopPenalty = state.traveledRoutes.includes(route.id) ? 18 : 0;
  const riskValue = { "低": 1, "中": 2, "高": 3 }[route.risk] || 2;
  const strategyProfiles = {
    conservative: { progress: 24, supply: 0.7, cost: 1.45, rift: 0.8, risk: -4 },
    balanced: { progress: 34, supply: 0.45, cost: 1, rift: 1, risk: 0 },
    risky: { progress: 54, supply: 0.25, cost: 0.42, rift: 1.65, risk: 4 },
    novice: { progress: 42, supply: 0.18, cost: 0.72, rift: 1.05, risk: 5 }
  };
  const profile = strategyProfiles[strategy] || strategyProfiles.balanced;
  return progress * profile.progress
    + supplyPotential * profile.supply
    + riftBonus * profile.rift
    + riskValue * profile.risk
    - costPressure * profile.cost
    - lockPenalty
    - loopPenalty
    + rng() * 2;
}

function pickRouteByStrategy(scoredRoutes, rng, strategy) {
  const ordered = scoredRoutes.sort((a, b) => b.score - a.score);
  if (strategy !== "novice" || ordered.length === 1) return ordered[0].route;
  const roll = rng();
  if (roll < 0.52) return ordered[0].route;
  if (roll < 0.78) return ordered[Math.min(1, ordered.length - 1)].route;
  return ordered[Math.floor(rng() * ordered.length)].route;
}

function pickRoute(data, state, resourceKeys, rng) {
  const visible = getVisibleRoutes(data, state, rng).filter((route) => canUseRoute(state, route));
  if (!visible.length) {
    state.failureStats.routeLocks += 1;
    return null;
  }
  return pickRouteByStrategy(
    visible.map((route) => ({ route, score: routeScore(data, state, route, resourceKeys, rng, state.strategy) })),
    rng,
    state.strategy
  );
}

function travelRoute(data, state, route, resourceKeys, rng) {
  state.stats.steps += 1;
  state.traveledRoutes.push(route.id);
  const before = { ...state.resources };
  applyDelta(state, route.cost, "route", resourceKeys);
  const routePressure = resourceKeys.reduce((sum, key) => sum + Math.max(0, before[key] - state.resources[key]), 0);
  state.stats.routePressure[route.id] = (state.stats.routePressure[route.id] || 0) + routePressure;
  resolveCrisesUntilStable(data, state, resourceKeys, rng);
  if (state.status !== "playing") return;
  const event = selectRouteEvent(data, state, route, rng);
  resolveRouteEvent(data, state, route, event, resourceKeys, rng);
  if (state.status !== "playing") return;
  state.currentLocation = route.to;
  state.pendingRoute = null;
}

function simulateRun(data, index, options) {
  const rng = createRng(`${options.seed}:${index}`);
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const state = normalizeState(data, `${options.seed}-${index}`);
  state.strategy = options.strategy;

  updateLowest(state, resourceKeys);
  while (state.status === "playing" && state.stats.steps < MAX_STEPS) {
    if (state.currentLocation === TARGET_LOCATION) {
      applyLocationEvent(data, state, resourceKeys, rng);
      return { outcome: state.ending || "reached", state };
    }

    applyLocationEvent(data, state, resourceKeys, rng);
    if (state.status !== "playing") break;
    useSupply(data, state, resourceKeys, rng);
    if (state.status !== "playing") break;

    const route = pickRoute(data, state, resourceKeys, rng);
    if (!route) {
      state.status = "stranded";
      state.failureType = "routeLock";
      break;
    }
    travelRoute(data, state, route, resourceKeys, rng);
  }

  if (state.status === "playing" && state.stats.steps >= MAX_STEPS) {
    state.status = "stranded";
    state.failureType = "maxSteps";
  }
  return { outcome: state.ending || state.failureType || state.status, state };
}

function percentile(values, pct) {
  if (!values.length) return 0;
  const ordered = [...values].sort((a, b) => a - b);
  const index = Math.min(ordered.length - 1, Math.floor((ordered.length - 1) * pct));
  return ordered[index];
}

function summarize(results, resourceKeys) {
  const outcomes = {};
  const failureTypes = {};
  const routePressure = {};
  const mins = Object.fromEntries(resourceKeys.map((key) => [key, []]));
  const crises = { axle: 0, grain: 0, sanity: 0, rescues: 0, hardFailures: 0 };
  const warningRuns = { axle: 0, grain: 0, sanity: 0, any: 0 };
  const failureStepBuckets = { early_0_3: 0, mid_4_6: 0, late_7_plus: 0 };
  let totalSteps = 0;
  let totalRouteEvents = 0;
  let totalRandomRouteEvents = 0;
  let rescuedRuns = 0;

  results.forEach(({ outcome, state }) => {
    outcomes[outcome] = (outcomes[outcome] || 0) + 1;
    if (state.status === "stranded") {
      failureTypes[state.failureType || "unknown"] = (failureTypes[state.failureType || "unknown"] || 0) + 1;
      if (state.stats.steps <= 3) failureStepBuckets.early_0_3 += 1;
      else if (state.stats.steps <= 6) failureStepBuckets.mid_4_6 += 1;
      else failureStepBuckets.late_7_plus += 1;
    }
    resourceKeys.forEach((key) => mins[key].push(state.stats.lowest[key]));
    const warnedKeys = resourceKeys.filter((key) => state.stats.lowest[key] <= (RESOURCE_WARNING_LIMITS[key] ?? 35));
    warnedKeys.forEach((key) => {
      warningRuns[key] += 1;
    });
    if (warnedKeys.length) warningRuns.any += 1;
    crises.axle += state.failureStats.axleCrises || 0;
    crises.grain += state.failureStats.grainCrises || 0;
    crises.sanity += state.failureStats.sanityCrises || 0;
    crises.rescues += state.failureStats.rescues || 0;
    crises.hardFailures += state.failureStats.hardFailures || 0;
    if ((state.failureStats.rescues || 0) > 0) rescuedRuns += 1;
    totalSteps += state.stats.steps;
    totalRouteEvents += state.stats.routeEvents;
    totalRandomRouteEvents += state.stats.randomRouteEvents;
    Object.entries(state.stats.routePressure).forEach(([routeId, pressure]) => {
      routePressure[routeId] = (routePressure[routeId] || 0) + pressure;
    });
  });

  const successful = results.filter(({ state }) => state.currentLocation === TARGET_LOCATION || ["rift", "return", "reached"].includes(state.ending)).length;
  return {
    runs: results.length,
    successRate: successful / results.length,
    outcomes,
    failureTypes,
    averageSteps: totalSteps / results.length,
    averageRouteEvents: totalRouteEvents / results.length,
    averageRandomRouteEvents: totalRandomRouteEvents / results.length,
    crises,
    warningRuns,
    rescuedRuns,
    failureStepBuckets,
    resourceMinimums: Object.fromEntries(resourceKeys.map((key) => [key, {
      min: Math.min(...mins[key]),
      p10: percentile(mins[key], 0.1),
      median: percentile(mins[key], 0.5)
    }])),
    highestPressureRoutes: Object.entries(routePressure)
      .map(([routeId, pressure]) => ({ routeId, pressure }))
      .sort((a, b) => b.pressure - a.pressure)
      .slice(0, 8)
  };
}

function formatPercent(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function formatDecimal(value, digits = 1) {
  return Number(value || 0).toFixed(digits);
}

function compactSummary(summary, strategy) {
  const warningRate = summary.warningRuns.any / summary.runs;
  const rescueRate = summary.rescuedRuns / summary.runs;
  return {
    strategy,
    label: {
      conservative: "谨慎",
      balanced: "均衡",
      risky: "冒险",
      novice: "新手"
    }[strategy] || strategy,
    note: STRATEGY_DESCRIPTIONS[strategy] || "",
    runs: summary.runs,
    successRate: summary.successRate,
    successText: formatPercent(summary.successRate),
    warningRate,
    warningText: formatPercent(warningRate),
    rescueRate,
    rescueText: formatPercent(rescueRate),
    averageSteps: Number(formatDecimal(summary.averageSteps, 2)),
    averageRouteEvents: Number(formatDecimal(summary.averageRouteEvents, 2)),
    averageRandomRouteEvents: Number(formatDecimal(summary.averageRandomRouteEvents, 2)),
    outcomes: summary.outcomes,
    failureTypes: summary.failureTypes,
    crises: summary.crises,
    warningRuns: summary.warningRuns,
    rescuedRuns: summary.rescuedRuns,
    failureStepBuckets: summary.failureStepBuckets,
    resourceMinimums: summary.resourceMinimums,
    highestPressureRoutes: summary.highestPressureRoutes
  };
}

function evaluateStrategy(data, strategy, options) {
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const strategyOptions = { ...options, strategy };
  const results = Array.from({ length: options.runs }, (_, index) => simulateRun(data, index + 1, strategyOptions));
  return compactSummary(summarize(results, resourceKeys), strategy);
}

function getBalanceGates(strategies) {
  const minSuccess = Math.min(...strategies.map((item) => item.successRate));
  const hardFailures = strategies.reduce((total, item) => total + (item.crises?.hardFailures || 0), 0);
  const earlyFailures = strategies.reduce((total, item) => total + (item.failureStepBuckets?.early_0_3 || 0), 0);
  const balanced = strategies.find((item) => item.strategy === "balanced");
  const novice = strategies.find((item) => item.strategy === "novice");
  const balancedWarning = balanced?.warningRate || 0;
  const noviceWarning = novice?.warningRate || 0;
  const noviceRescue = novice?.rescueRate || 0;
  const noviceSanityP10 = novice?.resourceMinimums?.sanity?.p10 ?? 0;
  const grainP10Floor = Math.min(...strategies.map((item) => item.resourceMinimums?.grain?.p10 ?? 0));
  const gates = [
    {
      id: "success",
      label: "四策略通关率",
      pass: minSuccess >= BALANCE_GATES.p0MinSuccessRate,
      value: formatPercent(minSuccess),
      target: `>= ${formatPercent(BALANCE_GATES.p0MinSuccessRate)}`
    },
    {
      id: "hard_failure",
      label: "硬失败",
      pass: hardFailures <= BALANCE_GATES.p0MaxHardFailures,
      value: String(hardFailures),
      target: "0"
    },
    {
      id: "early_failure",
      label: "前 3 步死局",
      pass: earlyFailures <= BALANCE_GATES.p0MaxEarlyFailures,
      value: String(earlyFailures),
      target: "0"
    },
    {
      id: "balanced_pressure",
      label: "默认玩家告警",
      pass: balancedWarning >= BALANCE_GATES.p0BalancedWarningMin && balancedWarning <= BALANCE_GATES.p0BalancedWarningMax,
      value: formatPercent(balancedWarning),
      target: `${formatPercent(BALANCE_GATES.p0BalancedWarningMin)} - ${formatPercent(BALANCE_GATES.p0BalancedWarningMax)}`
    },
    {
      id: "novice_pressure",
      label: "新手压力告警",
      pass: noviceWarning >= BALANCE_GATES.p0NoviceWarningMin && noviceWarning <= BALANCE_GATES.p0NoviceWarningMax,
      value: formatPercent(noviceWarning),
      target: `${formatPercent(BALANCE_GATES.p0NoviceWarningMin)} - ${formatPercent(BALANCE_GATES.p0NoviceWarningMax)}`
    },
    {
      id: "novice_rescue",
      label: "新手补救局",
      pass: noviceRescue <= BALANCE_GATES.p0NoviceRescueMax,
      value: formatPercent(noviceRescue),
      target: `<= ${formatPercent(BALANCE_GATES.p0NoviceRescueMax)}`
    },
    {
      id: "sanity_floor",
      label: "新手神志 P10",
      pass: noviceSanityP10 >= BALANCE_GATES.p1NoviceSanityP10Min,
      value: String(noviceSanityP10),
      target: `>= ${BALANCE_GATES.p1NoviceSanityP10Min}`
    },
    {
      id: "grain_floor",
      label: "粮草 P10 下限",
      pass: grainP10Floor >= BALANCE_GATES.p1GrainP10Min,
      value: String(grainP10Floor),
      target: `>= ${BALANCE_GATES.p1GrainP10Min}`
    }
  ];
  return {
    gates,
    passCount: gates.filter((gate) => gate.pass).length,
    total: gates.length,
    blocking: gates.filter((gate) => !gate.pass && ["success", "hard_failure", "early_failure"].includes(gate.id)),
    warnings: gates.filter((gate) => !gate.pass && !["success", "hard_failure", "early_failure"].includes(gate.id))
  };
}

function getBalanceTitle(gateResult) {
  if (gateResult.blocking.length) return "平衡有风险";
  if (gateResult.warnings.length) return "P0 可玩，P1 待调";
  return "P0 平衡通过";
}

function getBalanceTone(title) {
  if (title === "平衡有风险") return "danger";
  if (title === "P0 可玩，P1 待调") return "warning";
  return "stable";
}

function getBalanceNext(strategies, gateResult) {
  const novice = strategies.find((item) => item.strategy === "novice");
  const balanced = strategies.find((item) => item.strategy === "balanced");
  const pressureRoute = novice?.highestPressureRoutes?.[0] || balanced?.highestPressureRoutes?.[0];
  const noviceWarning = novice ? formatPercent(novice.warningRate) : "-";
  const sanityP10 = novice?.resourceMinimums?.sanity?.p10;
  const grainP10 = novice?.resourceMinimums?.grain?.p10;
  const routeText = pressureRoute?.routeId ? `压力路线：${pressureRoute.routeId}` : "暂无压力路线";
  const gateText = `门槛 ${gateResult.passCount}/${gateResult.total}`;
  return `${gateText}；新手告警 ${noviceWarning}；神志 P10 ${sanityP10 ?? "-"}，粮草 P10 ${grainP10 ?? "-"}；${routeText}。`;
}

function buildBalancePayload(data, options) {
  const order = ["conservative", "balanced", "risky", "novice"];
  const strategies = order.map((strategy) => evaluateStrategy(data, strategy, options));
  const gateResult = getBalanceGates(strategies);
  const title = getBalanceTitle(gateResult);
  return {
    generatedAt: new Date().toISOString(),
    seed: options.seed,
    runsPerStrategy: options.runs,
    targetLocation: TARGET_LOCATION,
    summary: {
      title,
      tone: getBalanceTone(title),
      scoreText: strategies.map((item) => `${item.label}${item.successText}`).join(" / "),
      nextText: getBalanceNext(strategies, gateResult),
      minSuccessRate: Math.min(...strategies.map((item) => item.successRate)),
      maxWarningRate: Math.max(...strategies.map((item) => item.warningRate)),
      hardFailures: strategies.reduce((total, item) => total + (item.crises?.hardFailures || 0), 0),
      gatePassText: `${gateResult.passCount}/${gateResult.total}`,
      gates: gateResult.gates
    },
    report: "./balance-status.html",
    markdownReport: "./balance-status.md",
    strategies
  };
}

function buildBalanceMarkdown(payload) {
  const lines = [
    "# 平衡健康报告",
    "",
    `生成时间：${payload.generatedAt}`,
    "",
    `种子：\`${payload.seed}\`；每种策略模拟：${payload.runsPerStrategy} 局；目标地点：\`${payload.targetLocation}\`。`,
    "",
    `结论：${payload.summary.title}。${payload.summary.nextText}`,
    "",
    "| 策略 | 成功率 | 告警率 | 补救局 | 均步数 | 路遇/局 | 随机路遇/局 | 神志 P10 | 粮草 P10 | 车轴 P10 |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|"
  ];

  payload.strategies.forEach((item) => {
    lines.push([
      item.label,
      item.successText,
      item.warningText,
      item.rescueText,
      formatDecimal(item.averageSteps, 2),
      formatDecimal(item.averageRouteEvents, 2),
      formatDecimal(item.averageRandomRouteEvents, 2),
      item.resourceMinimums.sanity?.p10 ?? "-",
      item.resourceMinimums.grain?.p10 ?? "-",
      item.resourceMinimums.axle?.p10 ?? "-"
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });

  lines.push(
    "",
    "## P0 / P1 门槛",
    "",
    "| 门槛 | 当前 | 目标 | 状态 |",
    "|---|---:|---:|---|"
  );

  payload.summary.gates.forEach((gate) => {
    lines.push(`| ${gate.label} | ${gate.value} | ${gate.target} | ${gate.pass ? "通过" : "待调"} |`);
  });

  lines.push(
    "",
    "## 压力路线",
    "",
    "| 策略 | 最高压力路线 | 压力值 |",
    "|---|---|---:|"
  );

  payload.strategies.forEach((item) => {
    const route = item.highestPressureRoutes?.[0];
    lines.push(`| ${item.label} | \`${route?.routeId || "-"}\` | ${route?.pressure || 0} |`);
  });

  lines.push(
    "",
    "## 使用说明",
    "",
    "- 成功率不是越高越好；试玩版需要保证不死局，同时让新手能明显感到资源压力。",
    "- 告警率表示本局最低资源触发过告急阈值。",
    "- 若后续新增随机事件、路线或补给，先重新生成本报告，再做真人试玩。",
    ""
  );

  return `${lines.join("\n")}\n`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBalanceHtml(payload) {
  const rows = payload.strategies.map((item) => `
            <tr>
              <td>${escapeHtml(item.label)}</td>
              <td>${escapeHtml(item.successText)}</td>
              <td>${escapeHtml(item.warningText)}</td>
              <td>${escapeHtml(item.rescueText)}</td>
              <td>${escapeHtml(formatDecimal(item.averageSteps, 2))}</td>
              <td>${escapeHtml(item.resourceMinimums.sanity?.p10 ?? "-")}</td>
              <td>${escapeHtml(item.resourceMinimums.grain?.p10 ?? "-")}</td>
              <td><code>${escapeHtml(item.highestPressureRoutes?.[0]?.routeId || "-")}</code></td>
            </tr>`).join("");
  const gateRows = payload.summary.gates.map((gate) => `
            <tr>
              <td>${escapeHtml(gate.label)}</td>
              <td>${escapeHtml(gate.value)}</td>
              <td>${escapeHtml(gate.target)}</td>
              <td>${escapeHtml(gate.pass ? "通过" : "待调")}</td>
            </tr>`).join("");
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>《不思异：九州》平衡健康报告</title>
    <style>
      :root { color-scheme: dark; font-family: "Songti SC", "Noto Serif SC", "STSong", serif; background: #15100b; color: #f4ead0; }
      body { margin: 0; padding: 28px; background: radial-gradient(circle at 50% 0%, rgba(217, 170, 91, 0.12), transparent 42%), #15100b; }
      main { max-width: 920px; margin: 0 auto; }
      h1 { margin: 0 0 10px; font-size: 34px; letter-spacing: 0; }
      p { color: rgba(244, 234, 208, 0.78); line-height: 1.65; }
      .summary { border: 1px solid rgba(234, 205, 140, 0.24); border-radius: 8px; padding: 16px; background: rgba(255, 238, 189, 0.06); }
      table { width: 100%; border-collapse: collapse; margin-top: 18px; overflow: hidden; border: 1px solid rgba(234, 205, 140, 0.22); border-radius: 8px; }
      th, td { padding: 10px 11px; border-bottom: 1px solid rgba(234, 205, 140, 0.14); text-align: left; }
      th { color: #d2bd8c; font-size: 13px; background: rgba(0, 0, 0, 0.18); }
      td { font-size: 14px; }
      code { color: #d9aa5b; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      a { color: #d9aa5b; }
    </style>
  </head>
  <body>
    <main>
      <h1>平衡健康报告</h1>
      <section class="summary">
        <p>生成时间：${escapeHtml(payload.generatedAt)}</p>
        <p>种子：<code>${escapeHtml(payload.seed)}</code>；每种策略模拟：${escapeHtml(payload.runsPerStrategy)} 局；目标地点：<code>${escapeHtml(payload.targetLocation)}</code>。</p>
        <p><strong>结论：${escapeHtml(payload.summary.title)}</strong>。${escapeHtml(payload.summary.nextText)}</p>
        <p>门槛：<strong>${escapeHtml(payload.summary.gatePassText)}</strong>。P0 看通关、硬失败和早期死局；P1 继续调默认压力、新手压力和资源下限。</p>
        <p>Markdown 版：<a href="./balance-status.md">balance-status.md</a></p>
      </section>
      <table>
        <thead>
          <tr>
            <th>门槛</th>
            <th>当前</th>
            <th>目标</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>${gateRows}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>策略</th>
            <th>成功率</th>
            <th>告警率</th>
            <th>补救局</th>
            <th>均步数</th>
            <th>神志 P10</th>
            <th>粮草 P10</th>
            <th>压力路线</th>
          </tr>
        </thead>
        <tbody>${rows}
        </tbody>
      </table>
    </main>
  </body>
</html>
`;
}

function writeBalanceArtifacts(payload) {
  fs.writeFileSync(STATUS_FILE, `window.BSI_BALANCE_STATUS = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  fs.writeFileSync(REPORT_FILE, buildBalanceMarkdown(payload), "utf8");
  fs.writeFileSync(REPORT_HTML_FILE, buildBalanceHtml(payload), "utf8");
}

function printSummary(summary, options) {
  console.log(`Balance simulation: runs=${summary.runs} seed=${options.seed} strategy=${options.strategy}`);
  console.log(`STRATEGY_NOTE ${STRATEGY_DESCRIPTIONS[options.strategy] || STRATEGY_DESCRIPTIONS.balanced}`);
  console.log(`SUCCESS_RATE ${formatPercent(summary.successRate)}`);
  console.log(`AVERAGE_STEPS ${summary.averageSteps.toFixed(2)}`);
  console.log(`AVERAGE_ROUTE_EVENTS ${summary.averageRouteEvents.toFixed(2)}`);
  console.log(`AVERAGE_RANDOM_ROUTE_EVENTS ${summary.averageRandomRouteEvents.toFixed(2)}`);
  console.log(`OUTCOMES ${JSON.stringify(summary.outcomes)}`);
  console.log(`FAILURE_TYPES ${JSON.stringify(summary.failureTypes)}`);
  console.log(`CRISES ${JSON.stringify(summary.crises)}`);
  console.log(`WARNING_RUNS ${JSON.stringify(summary.warningRuns)}`);
  console.log(`RESCUED_RUNS ${summary.rescuedRuns}`);
  console.log(`FAILURE_STEP_BUCKETS ${JSON.stringify(summary.failureStepBuckets)}`);
  console.log(`RESOURCE_MINIMUMS ${JSON.stringify(summary.resourceMinimums)}`);
  console.log(`HIGHEST_PRESSURE_ROUTES ${JSON.stringify(summary.highestPressureRoutes)}`);
}

function run() {
  const options = parseArgs(process.argv);
  const data = loadGameData();
  applyBalanceConfig(data.balanceConfig);
  const resourceKeys = data.resourceKeys || Object.keys(data.initialStateTemplate?.resources || {});
  const results = Array.from({ length: options.runs }, (_, index) => simulateRun(data, index + 1, options));
  const summary = summarize(results, resourceKeys);
  const compact = compactSummary(summary, options.strategy);
  if (options.writeStatus || options.writeReport) {
    const payload = buildBalancePayload(data, options);
    if (options.writeStatus) {
      fs.writeFileSync(STATUS_FILE, `window.BSI_BALANCE_STATUS = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
      console.log(`Wrote ${path.relative(process.cwd(), STATUS_FILE)}.`);
    }
    if (options.writeReport) {
      fs.writeFileSync(REPORT_FILE, buildBalanceMarkdown(payload), "utf8");
      fs.writeFileSync(REPORT_HTML_FILE, buildBalanceHtml(payload), "utf8");
      console.log(`Wrote ${path.relative(process.cwd(), REPORT_FILE)}.`);
      console.log(`Wrote ${path.relative(process.cwd(), REPORT_HTML_FILE)}.`);
    }
  } else if (options.json) {
    console.log(JSON.stringify(compact, null, 2));
  } else {
    printSummary(summary, options);
  }
  if (options.verbose) {
    results.slice(0, 10).forEach(({ outcome, state }, index) => {
      console.log(`RUN ${index + 1} outcome=${outcome} location=${state.currentLocation} resources=${JSON.stringify(state.resources)} lowest=${JSON.stringify(state.stats.lowest)} steps=${state.stats.steps}`);
    });
  }
}

run();
