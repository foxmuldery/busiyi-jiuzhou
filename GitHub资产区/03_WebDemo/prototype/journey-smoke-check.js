#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data.js");
const FULL_PATH_ROUTE_IDS = [
  "central_to_road",
  "road_to_shrine",
  "shrine_to_market",
  "market_to_stele",
  "stele_to_rift"
];

let failures = 0;

function pass(label) {
  console.log(`PASS ${label}`);
}

function fail(label, detail = "") {
  failures += 1;
  console.error(`FAIL ${label}`);
  if (detail) console.error(String(detail));
}

function check(label, condition, detail = "") {
  if (condition) pass(label);
  else fail(label, detail);
}

function loadGameData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), sandbox, { filename: DATA_FILE });
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

function getFirstVisibleRoute(data, locationId) {
  const pool = data.routePools?.[locationId];
  if (pool?.requiredRoutes?.length) {
    const routeId = typeof pool.requiredRoutes[0] === "string"
      ? pool.requiredRoutes[0]
      : pool.requiredRoutes[0].id;
    return (data.routes || []).find((route) => route.id === routeId);
  }
  const plannedRouteId = data.revealPlan?.[locationId]?.routes?.[0];
  if (plannedRouteId) return (data.routes || []).find((route) => route.id === plannedRouteId);
  return (data.routes || []).find((route) => route.from === locationId);
}

function chooseFirstAvailableChoice(event) {
  return (event?.choices || [])[0];
}

function resourcesSurvive(resources, resourceKeys) {
  return resourceKeys.every((key) => resources[key] > 0);
}

function applyFirstChoiceIfPresent(data, state, eventId, resourceKeys, label) {
  const event = data.events?.[eventId];
  check(`${label} event exists`, Boolean(event), eventId || "");
  const choice = chooseFirstAvailableChoice(event);
  check(`${label} event has a choice`, Boolean(choice), event?.title || eventId || "");
  if (choice) {
    state.resources = applyDelta(state.resources, choice.effect, resourceKeys);
  }
  check(`${label} resources survive event`, resourcesSurvive(state.resources, resourceKeys), JSON.stringify(state.resources));
}

function applyRouteEventIfPresent(data, state, route, resourceKeys, label) {
  if (!route.midEvent) return;
  const routeEvent = (data.routeEvents || {})[route.midEvent] || (data.randomRouteEvents || {})[route.midEvent];
  check(`${label} route event exists`, Boolean(routeEvent), route.midEvent);
  const routeChoice = chooseFirstAvailableChoice(routeEvent);
  check(`${label} route event has a choice`, Boolean(routeChoice), routeEvent?.title || route.midEvent);
  if (routeChoice) {
    state.resources = applyDelta(state.resources, routeChoice.effect, resourceKeys);
  }
  check(`${label} resources survive route event`, resourcesSurvive(state.resources, resourceKeys), JSON.stringify(state.resources));
}

function useFirstSupplyIfPresent(data, state, resourceKeys, label) {
  const location = data.locations?.[state.currentLocation];
  const supplies = location?.supplies || [];
  check(`${label} supplies are listed`, Array.isArray(supplies), state.currentLocation);
  if (!supplies.length) return;

  const supplyIds = new Set();
  supplies.forEach((supply) => {
    check(`${label} supply ${supply.id || "unknown"} has a unique id`, Boolean(supply.id && !supplyIds.has(supply.id)), supply.id || "");
    if (supply.id) supplyIds.add(supply.id);
  });

  state.usedSupplies = state.usedSupplies || {};
  state.usedSupplies[state.currentLocation] = state.usedSupplies[state.currentLocation] || [];
  const supply = supplies.find((item) => !state.usedSupplies[state.currentLocation].includes(item.id));
  check(`${label} has an unused supply`, Boolean(supply), state.currentLocation);
  if (!supply) return;

  state.resources = applyDelta(state.resources, supply.effect, resourceKeys);
  state.usedSupplies[state.currentLocation].push(supply.id);
  check(`${label} resources survive supply ${supply.id}`, resourcesSurvive(state.resources, resourceKeys), JSON.stringify(state.resources));
  check(`${label} supply ${supply.id} marked used once`, (
    state.usedSupplies[state.currentLocation].filter((id) => id === supply.id).length === 1
  ), JSON.stringify(state.usedSupplies[state.currentLocation]));
}

function createSmokeState(data) {
  const state = clone(data.initialStateTemplate || {});
  state.currentLocation = data.startLocation || state.currentLocation;
  state.resources = { ...(state.resources || {}) };
  state.handledEvents = {};
  state.usedSupplies = {};
  return state;
}

function runFirstSegmentSmoke(data, resourceKeys) {
  const state = createSmokeState(data);

  check("smoke start location exists", Boolean(data.locations?.[state.currentLocation]), state.currentLocation);
  const startLocation = data.locations?.[state.currentLocation];
  applyFirstChoiceIfPresent(data, state, startLocation?.event, resourceKeys, "smoke start");

  const route = getFirstVisibleRoute(data, state.currentLocation);
  check("smoke first route exists", Boolean(route), state.currentLocation);
  check("smoke first route starts from current location", route?.from === state.currentLocation, route ? `${route.from} != ${state.currentLocation}` : "");

  if (route) {
    state.resources = applyDelta(state.resources, route.cost, resourceKeys);
  }
  check("smoke resources survive route cost", resourcesSurvive(state.resources, resourceKeys), JSON.stringify(state.resources));

  applyRouteEventIfPresent(data, state, route, resourceKeys, "smoke");

  if (route) state.currentLocation = route.to;
  const destination = data.locations?.[state.currentLocation];
  check("smoke destination exists", Boolean(destination), state.currentLocation);
  check("smoke destination event exists", Boolean(data.events?.[destination?.event]), destination?.event || "");
  check("smoke destination supplies are available or explicitly empty", Array.isArray(destination?.supplies || []), state.currentLocation);

  console.log(`INFO smoke route: ${route?.id || "none"} -> ${state.currentLocation}`);
  console.log(`INFO smoke resources: ${JSON.stringify(state.resources)}`);
}

function runFullPathSmoke(data, resourceKeys) {
  const state = createSmokeState(data);
  const traveled = [];

  check("full smoke start location exists", Boolean(data.locations?.[state.currentLocation]), state.currentLocation);

  FULL_PATH_ROUTE_IDS.forEach((routeId, index) => {
    const location = data.locations?.[state.currentLocation];
    check(`full smoke step ${index + 1} location exists`, Boolean(location), state.currentLocation);
    if (location?.event && !state.handledEvents[location.event]) {
      applyFirstChoiceIfPresent(data, state, location.event, resourceKeys, `full smoke ${location.id}`);
      state.handledEvents[location.event] = true;
    }
    useFirstSupplyIfPresent(data, state, resourceKeys, `full smoke ${location?.id || state.currentLocation}`);

    const route = (data.routes || []).find((item) => item.id === routeId);
    check(`full smoke route ${routeId} exists`, Boolean(route), routeId);
    check(`full smoke route ${routeId} chains from current location`, route?.from === state.currentLocation, route ? `${route.from} != ${state.currentLocation}` : "");
    if (!route || route.from !== state.currentLocation) return;

    state.resources = applyDelta(state.resources, route.cost, resourceKeys);
    check(`full smoke resources survive ${routeId} cost`, resourcesSurvive(state.resources, resourceKeys), JSON.stringify(state.resources));
    applyRouteEventIfPresent(data, state, route, resourceKeys, `full smoke ${routeId}`);

    state.currentLocation = route.to;
    traveled.push(route.id);
  });

  const destination = data.locations?.[state.currentLocation];
  check("full smoke reaches kyushu rift", state.currentLocation === "kyushu_rift", state.currentLocation);
  check("full smoke final destination exists", Boolean(destination), state.currentLocation);

  if (destination?.event && !state.handledEvents[destination.event]) {
    applyFirstChoiceIfPresent(data, state, destination.event, resourceKeys, `full smoke ${destination.id}`);
    state.handledEvents[destination.event] = true;
  }
  useFirstSupplyIfPresent(data, state, resourceKeys, `full smoke ${destination?.id || state.currentLocation}`);
  check("full smoke has an ending choice result", Boolean(data.events?.[destination?.event]?.choices?.[0]?.effect?.ending), destination?.event || "");

  console.log(`INFO full smoke path: ${traveled.join(" -> ")}`);
  console.log(`INFO full smoke destination: ${state.currentLocation}`);
  console.log(`INFO full smoke resources: ${JSON.stringify(state.resources)}`);
}

function run() {
  const data = loadGameData();
  const resourceKeys = data.resourceKeys || ["axle", "grain", "sanity"];

  runFirstSegmentSmoke(data, resourceKeys);
  runFullPathSmoke(data, resourceKeys);

  if (failures) {
    console.error(`\n${failures} smoke check(s) failed.`);
    process.exit(1);
  }
  console.log("\nJourney smoke check passed.");
}

run();
