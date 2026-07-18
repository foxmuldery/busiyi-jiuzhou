#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const FILES = {
  app: path.join(ROOT, "app.js"),
  data: path.join(ROOT, "data.js"),
  html: path.join(ROOT, "index.html"),
  launcher: path.join(ROOT, "试玩入口.html"),
  report: path.join(ROOT, "playtest-flow-status.md")
};

const HUMAN_PATH_ROUTE_IDS = [
  "central_to_road",
  "road_to_shrine",
  "shrine_to_market",
  "market_to_stele",
  "stele_to_rift"
];

let failures = 0;
const evidence = [];

function pass(label, detail = "") {
  console.log(`PASS ${label}`);
  evidence.push({ ok: true, label, detail });
}

function fail(label, detail = "") {
  failures += 1;
  console.error(`FAIL ${label}`);
  if (detail) console.error(String(detail));
  evidence.push({ ok: false, label, detail });
}

function check(label, condition, detail = "") {
  if (condition) pass(label, detail);
  else fail(label, detail);
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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function applyDelta(resources, delta = {}, resourceKeys) {
  const next = { ...resources };
  resourceKeys.forEach((key) => {
    next[key] = Math.max(0, Math.min(100, (next[key] || 0) + (delta[key] || 0)));
  });
  return next;
}

function updateMinimums(minimums, resources, resourceKeys) {
  resourceKeys.forEach((key) => {
    minimums[key] = Math.min(Number(minimums[key] ?? resources[key] ?? 0), Number(resources[key] ?? 0));
  });
}

function resourcesSurvive(resources, resourceKeys) {
  return resourceKeys.every((key) => Number(resources[key] || 0) > 0);
}

function resourceLine(resources) {
  return `车轴 ${resources.axle} / 粮草 ${resources.grain} / 神志 ${resources.sanity}`;
}

function firstChoice(event) {
  return (event?.choices || [])[0];
}

function createPlaytestState(data) {
  const state = clone(data.initialStateTemplate || {});
  state.currentLocation = data.startLocation || state.currentLocation;
  state.resources = { ...(state.resources || {}) };
  state.minimums = { ...state.resources };
  state.discoveredLocations = [state.currentLocation];
  state.traveledRoutes = [];
  state.eventCount = 0;
  state.routeEventCount = 0;
  state.usedSupplyCount = 0;
  state.fieldNoteCount = 0;
  state.recapNotes = [];
  return state;
}

function chooseLocationEvent(data, state, resourceKeys, label) {
  const location = data.locations?.[state.currentLocation];
  const event = data.events?.[location?.event];
  check(`${label} location has event`, Boolean(event), location?.event || "");
  const choice = firstChoice(event);
  check(`${label} event has visible choice`, Boolean(choice), event?.title || "");
  if (!choice) return;
  state.resources = applyDelta(state.resources, choice.effect, resourceKeys);
  updateMinimums(state.minimums, state.resources, resourceKeys);
  state.eventCount += 1;
  state.recapNotes.unshift(`${location.name}：${choice.label}`);
  check(`${label} survives event choice`, resourcesSurvive(state.resources, resourceKeys), resourceLine(state.resources));
}

function writeFieldNote(data, state, resourceKeys, label) {
  const app = read(FILES.app);
  const location = data.locations?.[state.currentLocation];
  check(`${label} field note choices available`, app.includes("FIELD_NOTE_STYLES") && app.includes("function resolveFieldNote"), state.currentLocation);
  const effect = { sanity: 1 };
  state.resources = applyDelta(state.resources, effect, resourceKeys);
  updateMinimums(state.minimums, state.resources, resourceKeys);
  state.fieldNoteCount += 1;
  state.recapNotes.unshift(`${location?.name || state.currentLocation}采风：颂记此地`);
  check(`${label} survives field note`, resourcesSurvive(state.resources, resourceKeys), resourceLine(state.resources));
}

function useFirstSupply(data, state, resourceKeys, label) {
  const location = data.locations?.[state.currentLocation];
  const supply = (location?.supplies || [])[0];
  check(`${label} has supply action or explicit empty list`, Array.isArray(location?.supplies), state.currentLocation);
  if (!supply) return;
  check(`${label} supply has label and result`, Boolean(supply.id && supply.label && supply.result), supply.id || "");
  state.resources = applyDelta(state.resources, supply.effect, resourceKeys);
  updateMinimums(state.minimums, state.resources, resourceKeys);
  state.usedSupplyCount += 1;
  state.recapNotes.unshift(`${location.name}补给：${supply.label}`);
  check(`${label} survives supply`, resourcesSurvive(state.resources, resourceKeys), resourceLine(state.resources));
}

function handleRouteEvent(data, state, route, resourceKeys, label, options = {}) {
  if (!route.midEvent && options.allowDirectEnding) {
    pass(`${label} direct ending route may skip mid-route event`, route.id);
    return;
  }
  const routeEvent = (data.routeEvents || {})[route.midEvent] || (data.randomRouteEvents || {})[route.midEvent];
  check(`${label} has mid-route event`, Boolean(routeEvent), route.midEvent || "");
  const choice = firstChoice(routeEvent);
  check(`${label} route event has visible choice`, Boolean(choice), routeEvent?.title || "");
  if (!choice) return;
  state.resources = applyDelta(state.resources, choice.effect, resourceKeys);
  updateMinimums(state.minimums, state.resources, resourceKeys);
  state.routeEventCount += 1;
  state.recapNotes.unshift(`${route.name}路遇：${choice.label}`);
  check(`${label} survives route event`, resourcesSurvive(state.resources, resourceKeys), resourceLine(state.resources));
}

function walkRoute(data, state, resourceKeys, routeId, stepIndex) {
  const route = (data.routes || []).find((item) => item.id === routeId);
  check(`step ${stepIndex} route exists`, Boolean(route), routeId);
  check(`step ${stepIndex} route starts from current location`, route?.from === state.currentLocation, route ? `${route.from} != ${state.currentLocation}` : "");
  if (!route || route.from !== state.currentLocation) return;

  state.resources = applyDelta(state.resources, route.cost, resourceKeys);
  updateMinimums(state.minimums, state.resources, resourceKeys);
  state.traveledRoutes.push(route.id);
  check(`step ${stepIndex} survives route cost`, resourcesSurvive(state.resources, resourceKeys), resourceLine(state.resources));
  handleRouteEvent(data, state, route, resourceKeys, `step ${stepIndex}`, {
    allowDirectEnding: route.to === "kyushu_rift"
  });

  state.currentLocation = route.to;
  if (!state.discoveredLocations.includes(route.to)) state.discoveredLocations.push(route.to);
  check(`step ${stepIndex} reaches next location`, Boolean(data.locations?.[route.to]), route.to);
}

function simulateHumanFiveMinuteRun(data) {
  const resourceKeys = data.resourceKeys || ["axle", "grain", "sanity"];
  const state = createPlaytestState(data);

  check("playtest starts at configured start location", Boolean(data.locations?.[state.currentLocation]), state.currentLocation);
  HUMAN_PATH_ROUTE_IDS.forEach((routeId, index) => {
    chooseLocationEvent(data, state, resourceKeys, `step ${index + 1}`);
    writeFieldNote(data, state, resourceKeys, `step ${index + 1}`);
    useFirstSupply(data, state, resourceKeys, `step ${index + 1}`);
    walkRoute(data, state, resourceKeys, routeId, index + 1);
  });

  chooseLocationEvent(data, state, resourceKeys, "final");
  useFirstSupply(data, state, resourceKeys, "final");
  const finalLocation = data.locations?.[state.currentLocation];
  const finalEvent = data.events?.[finalLocation?.event];
  check("playtest reaches kyushu rift", state.currentLocation === "kyushu_rift", state.currentLocation);
  check("final event has ending choice", Boolean(firstChoice(finalEvent)?.effect?.ending), finalLocation?.event || "");
  check("playtest has enough recap material", (
    state.traveledRoutes.length >= 5
    && state.eventCount >= 5
    && state.fieldNoteCount >= 5
    && state.routeEventCount >= 4
    && state.usedSupplyCount >= 5
  ), JSON.stringify({
    routes: state.traveledRoutes.length,
    events: state.eventCount,
    fieldNotes: state.fieldNoteCount,
    routeEvents: state.routeEventCount,
    supplies: state.usedSupplyCount
  }));

  return state;
}

function checkLauncherAndRecapContracts() {
  const launcher = read(FILES.launcher);
  const html = read(FILES.html);
  const app = read(FILES.app);

  check("launcher exposes clean start link", launcher.includes("./index.html?fresh=1"));
  check("launcher exposes tester focus strip", (
    launcher.includes("看懂下一步")
    && launcher.includes("感到资源紧")
    && launcher.includes("愿意再走一站")
  ));
  check("launcher exposes feedback handoff", (
    launcher.includes('id="copyPlaytestLink"')
    && launcher.includes('id="copyPlaytestTemplate"')
    && launcher.includes('id="copyAudioTemplate"')
    && launcher.includes('id="copyFallback"')
    && launcher.includes("手动复制反馈模板")
    && launcher.includes("手动复制听感模板")
    && launcher.includes("旅途环境层是否加分")
  ));
  check("main page exposes recap drawer", (
    html.includes('data-log-tab="recap"')
    && html.includes('id="runRecapCopyButton"')
    && html.includes('id="runRecapCopyState"')
  ));
  check("app exposes recap copy fallback", (
    app.includes("function getRunRecapText()")
    && app.includes("copyRunRecapToClipboard")
    && app.includes("showRecapCopyFallback")
    && app.includes("story-modal-copy-fallback")
  ));
  check("app exposes guided next-step states", (
    app.includes("下一步：处理遭遇")
    && app.includes("下一步：补给一次")
    && app.includes("下一步：选一条路")
    && app.includes("下一步：复盘或重开")
  ));
}

function writeReport(state) {
  const routeNames = state.traveledRoutes.join(" -> ");
  const lines = [
    "# 《不思异：九州》真人试玩链自动验收",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "## 结论",
    "",
    failures
      ? `未通过。当前有 ${failures} 项断链风险，需要先修复。`
      : "通过。入口、第一分钟、补给、选路、半途、终点和复盘复制链路均有自动证据。",
    "",
    "## 模拟路径",
    "",
    `- 路线：${routeNames}`,
    `- 终点：${state.currentLocation}`,
    `- 当前资源：${resourceLine(state.resources)}`,
    `- 最低资源：${resourceLine(state.minimums)}`,
    `- 互动计数：地点事件 ${state.eventCount} / 采风写法 ${state.fieldNoteCount} / 路遇 ${state.routeEventCount} / 补给 ${state.usedSupplyCount}`,
    "",
    "## 试玩观察重点",
    "",
    "- 看懂下一步",
    "- 感到资源紧",
    "- 愿意再走一站",
    "",
    "## 自动检查明细",
    "",
    ...evidence.map((item) => `- ${item.ok ? "PASS" : "FAIL"} ${item.label}${item.detail ? `：${item.detail}` : ""}`)
  ];
  fs.writeFileSync(FILES.report, `${lines.join("\n")}\n`);
  console.log(`REPORT ${FILES.report}`);
}

function run() {
  const write = process.argv.includes("--write-report");
  const data = loadGameData();
  checkLauncherAndRecapContracts();
  const state = simulateHumanFiveMinuteRun(data);
  if (write) writeReport(state);
  if (failures) {
    console.error(`\n${failures} playtest flow check(s) failed.`);
    process.exit(1);
  }
  console.log("\nPlaytest flow check passed.");
}

run();
