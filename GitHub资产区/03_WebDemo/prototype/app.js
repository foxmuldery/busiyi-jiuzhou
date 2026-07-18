const gameData = window.BSI_GAME_DATA;

if (!gameData) {
  throw new Error("BSI_GAME_DATA 未加载，请先加载 data.js。");
}

const SAVE_VERSION = gameData.saveVersion || 2;
const SAVE_KEY = `busi-kyushu-prototype-run-v${SAVE_VERSION}`;
const META_KEY = `busi-kyushu-prototype-meta-v${SAVE_VERSION}`;
const SETTINGS_KEY = "busi-kyushu-prototype-settings-v1";
const AUDIO_REVIEW_KEY = "busi-kyushu-prototype-audio-review-v1";

const locations = gameData.locations || {};
const routes = gameData.routes || [];
const routeEvents = gameData.routeEvents || {};
const randomRouteEvents = gameData.randomRouteEvents || {};
const allRouteEvents = { ...routeEvents, ...randomRouteEvents };
const events = gameData.events || {};
const crisisEvents = gameData.crisisEvents || {};
const endingDefinitions = gameData.endingDefinitions || {};
const audioAssets = gameData.audioAssets || {};
const musicProfileByTerrain = gameData.musicProfileByTerrain || {};
const musicProfileByLocation = gameData.musicProfileByLocation || {};
const poetryContent = gameData.poetryContent || {};
const revealPlan = gameData.revealPlan || {};
const routePools = gameData.routePools || {};
const fogLabels = gameData.fogLabels || {};
const stageAssets = gameData.stageAssets || {};
const generatedStageBackgroundStatus = new Map();
let generatedStageBackgroundRefreshQueued = false;
const GENERATED_LOCATION_EVENT_ROOT = "../../02_设计资产/可用素材/B组地点事件图";
const GENERATED_ENCOUNTER_ROOT = "../../02_设计资产/可用素材/C组路遇危机结局图";
const generatedIllustrationStatus = new Map();
const GENERATED_ASSET_PROBE_PARAM = "probeGeneratedAssets";
const generatedArtManifest = window.BSI_GENERATED_ART_MANIFEST || {};
const generatedAssetProbeEnabled = new URLSearchParams(window.location.search).has(GENERATED_ASSET_PROBE_PARAM);
const generatedAssetReadyPaths = new Set(
  Array.isArray(generatedArtManifest.ready) ? generatedArtManifest.ready : []
);
const audioHooks = {
  mapOpen: "mapOpen",
  mapReveal: "mapReveal",
  locationArrive: "locationArrive",
  routeSelect: "routeSelect",
  supplyComplete: "supplyComplete",
  ...(gameData.audioHooks || {})
};
const initialStateTemplate = gameData.initialStateTemplate || {};
const resourceKeys = gameData.resourceKeys || ["axle", "grain", "sanity"];
const terrainKeys = gameData.terrainKeys || ["road", "market", "water", "rift"];
const conditionKeys = ["flag", "sanityMax", "sanityMin", "languageMin"];
const targetLocationId = "kyushu_rift";
const REVEAL_ANIMATION_MS = 2600;
const ACTION_PROCESS_MS = 560;
const ACTION_FEEDBACK_RESET_MS = 2200;
const DEBUG_ACTION_SETTLE_MS = 980;
const PLAYTEST_REMINDER_DEFAULT_MS = 5 * 60 * 1000;
const PLAYTEST_REMINDER_MS = getPlaytestReminderMs();
const RANDOM_ROUTE_EVENT_BASE_CHANCE = 0.21;
const RANDOM_ROUTE_EVENT_MAX_CHANCE = 0.63;
const ROUTE_EVENT_BREATHER_STREAK = 2;

const crisisMeta = {
  axle: { label: "断轴", statKey: "axleCrises" },
  grain: { label: "饥荒", statKey: "grainCrises" },
  sanity: { label: "崩解", statKey: "sanityCrises" }
};
const inventoryFlagSlots = {
  old_account: "西行旧账",
  old_order: "旧令墨拓",
  heard_ground_thunder: "地雷听路",
  false_name_pass: "青丘假名",
  hollow_pass_hint: "山腹暗路",
  nameless_seat: "无名供位",
  feather_ford_hint: "沉羽渡向",
  followed_bones: "赤水骨路",
  feather_debt: "羽民旧名债",
  black_price: "黑齿旧价",
  last_bundle_mark: "末栈残记",
  dream_gate_mark: "梦门前哨",
  rift_name: "裂隙名",
  accepted_mirage: "幻路标记",
  wenao_trace: "文鳐水痕",
  xuan_shell: "旋龟甲片",
  false_name_echo: "假名回声",
  fox_tail_mark: "狐尾灯痕",
  scale_price: "青鳞价引",
  bone_rut: "骨牛空辙",
  dream_smoke: "梦烟路向",
  heard_axle_song: "鸣蛇轴声",
  bitter_grass: "祝余苦味",
  reverse_mile_mark: "反里墨拓",
  silent_price: "黑齿影价",
  followed_own_tracks: "夸父复迹",
  counted_names: "点名回魂",
  black_cloud_gap: "雷泽云缝",
  map_breath: "烛龙息图"
};
const inventoryLanguageSlots = {
  feather: "白羽语片",
  wuxian: "巫咸古辞"
};
const drawerLabels = {
  inventory: "行囊",
  poetry: "古辞",
  log: "行旅日志",
  settings: "设置"
};
const MAX_RESCUES_BEFORE_STRANDING = 3;
const HARD_BAD_LUCK_THRESHOLD = 96;
const RESOURCE_WARNING_LIMITS = { axle: 30, grain: 35, sanity: 45 };
const RESOURCE_RESCUE_TAGS = {
  axle: "axle_rescue",
  grain: "grain_rescue",
  sanity: "sanity_rescue"
};
const RESOURCE_ALERT_LABELS = {
  axle: { kicker: "车轴", title: "车轴告急" },
  grain: { kicker: "粮草", title: "粮草告急" },
  sanity: { kicker: "神志", title: "神志告急" }
};
const FIELD_NOTE_STYLES = [
  {
    id: "praise",
    badge: "颂",
    label: "颂记此地",
    hint: "写成可安抚之地，稳住队伍。",
    effect: { sanity: 1 },
    line: (loc) => `你把 ${loc.name} 写成仍可安抚之地：山川虽异，民心尚可问。`
  },
  {
    id: "satire",
    badge: "讽",
    label: "讽记民声",
    hint: "留一笔讽意，记下矛盾。",
    effect: { grain: -1, sanity: 2 },
    line: (loc) => `你在 ${loc.name} 的条目旁另起一行：官辞太满，民声太轻。`
  },
  {
    id: "lament",
    badge: "哀",
    label: "哀录灾情",
    hint: "写下苦难，耗些粮草问证。",
    effect: { grain: -2, sanity: 1 },
    line: (loc) => `你多问了几户残灯，把 ${loc.name} 的饥苦与失踪写入残页。`
  },
  {
    id: "omen",
    badge: "谶",
    label: "谶写异兆",
    hint: "把不可解之物写成预兆。",
    effect: { sanity: -3 },
    line: (loc) => `你没有解释 ${loc.name} 的异象，只写下一句谶语：此地未必愿被人间命名。`
  }
];
const FIELD_NOTE_CONSEQUENCES = {
  praise: {
    verdict: "可安抚",
    line: (locName) => `${locName}：案牍暂作“可安抚”，准许缓行赈抚，不列禁地。`
  },
  satire: {
    verdict: "须查访",
    line: (locName) => `${locName}：案牍标为“须查访”，地方官声不可尽信，需另遣耳目。`
  },
  lament: {
    verdict: "宜赈济",
    line: (locName) => `${locName}：案牍记为“宜赈济”，准调粮药，亦须防疫封路。`
  },
  omen: {
    verdict: "入禁录",
    line: (locName) => `${locName}：案牍归入“禁录”，暂不宣示，后续路线须避其名。`
  }
};
const FIELD_NOTE_CATEGORY_FALLBACK = {
  road: "地风",
  market: "民风",
  water: "异闻",
  rift: "谶兆"
};
const FIELD_NOTE_CATEGORY_ICONS = {
  地风: "风",
  民风: "民",
  官声: "官",
  异闻: "异",
  商路: "商",
  灾情: "灾",
  谶兆: "谶"
};

let state = loadState();
let selectedRoute = null;
let settings = loadSettings();
let motionEnabled = settings.motionEnabled;
let audioEnabled = false;
let audioAutoUnlocked = false;
let audioUserMuted = Boolean(settings.audioMuted);
let activeView = "town";
let activeDrawer = "";
let activeLogTab = "recap";
let lastMapOpenSoundAt = 0;
let viewSwitchToastTimer = 0;
let textPanelState = { location: false, event: false };
let eventFullText = "";
let storyModalActions = [];
let storyResultOverride = null;
let lastDecisionKey = "";
let decisionModalDismissedKey = "";
let actionBusy = false;
let actionFeedback = null;
let actionFeedbackResetTimer = 0;
let playtestReminderTimer = 0;
let pendingResourceFloaters = [];
let pendingStageAlerts = [];
let storageWarningShown = false;
let openingHintShown = false;
settings.audioEnabled = false;
let poetryFallbackSpin = 0;
let poetryState = null;
const audioState = {
  elements: {},
  failed: new Set(),
  blocked: new Set(),
  warningPlayed: { axle: false, grain: false, sanity: false },
  visible: document.visibilityState !== "hidden"
};
let audioPreviewKey = "";
let audioReviewMarks = loadAudioReviewMarks();
const AUDIO_REVIEW_MARK_LABELS = {
  pass: "保留",
  revise: "待改",
  reject: "弃用"
};

const el = {
  app: document.body,
  stage: document.querySelector("#journeyStage"),
  stageAlertLayer: document.querySelector("#stageAlertLayer"),
  stageConditionLights: [...document.querySelectorAll("[data-resource-light]")],
  caravan: document.querySelector("#caravan"),
  caravanArt: document.querySelector(".caravan-art"),
  locationTitle: document.querySelector("#locationTitle"),
  dayLabel: document.querySelector("#dayLabel"),
  regionLabel: document.querySelector("#regionLabel"),
  townViewButton: document.querySelector("#townViewButton"),
  mapViewButton: document.querySelector("#mapViewButton"),
  townView: document.querySelector("#townView"),
  mapView: document.querySelector("#mapView"),
  progressLabel: document.querySelector("#progressLabel"),
  distanceLabel: document.querySelector("#distanceLabel"),
  nextStepLabel: document.querySelector("#nextStepLabel"),
  journeyProgressMeter: document.querySelector("#journeyProgressMeter"),
  journeyStepTrack: document.querySelector("#journeyStepTrack"),
  nextStopLabel: document.querySelector("#nextStopLabel"),
  mapDistanceLabel: document.querySelector("#mapDistanceLabel"),
  mapRouteHint: document.querySelector("#mapRouteHint"),
  mapRoutePreview: document.querySelector("#mapRoutePreview"),
  mapRoutePreviewIcon: document.querySelector("#mapRoutePreviewIcon"),
  mapRoutePreviewTitle: document.querySelector("#mapRoutePreviewTitle"),
  mapRoutePreviewDetail: document.querySelector("#mapRoutePreviewDetail"),
  viewSwitchToast: document.querySelector("#viewSwitchToast"),
  viewSwitchIcon: document.querySelector("#viewSwitchIcon"),
  viewSwitchTitle: document.querySelector("#viewSwitchTitle"),
  viewSwitchDetail: document.querySelector("#viewSwitchDetail"),
  playtestReminder: document.querySelector("#playtestReminder"),
  playtestReminderDetail: document.querySelector("#playtestReminderDetail"),
  playtestReminderFeedback: document.querySelector("#playtestReminderFeedback"),
  playtestReminderDismiss: document.querySelector("#playtestReminderDismiss"),
  kyushuMap: document.querySelector("#kyushuMap"),
  mapRoutesLayer: document.querySelector("#mapRoutesLayer"),
  mapNodeLayer: document.querySelector("#mapNodeLayer"),
  routeList: document.querySelector("#routeList"),
  eventTitle: document.querySelector("#eventTitle"),
  eventTag: document.querySelector("#eventTag"),
  locationLore: document.querySelector("#locationLore"),
  locationLoreToggle: document.querySelector("#locationLoreToggle"),
  locationLoreTitle: document.querySelector("#locationLoreTitle"),
  locationArtFrame: document.querySelector("#locationArtFrame"),
  locationArt: document.querySelector("#locationArt"),
  locationVerse: document.querySelector("#locationVerse"),
  locationLoreText: document.querySelector("#locationLoreText"),
  discoveryCount: document.querySelector("#discoveryCount"),
  supplyList: document.querySelector("#supplyList"),
  actionProcess: document.querySelector("#actionProcess"),
  actionProcessKicker: document.querySelector("#actionProcessKicker"),
  actionProcessTitle: document.querySelector("#actionProcessTitle"),
  actionProcessDetail: document.querySelector("#actionProcessDetail"),
  eventCopyCard: document.querySelector("#eventCopyCard"),
  eventTextToggle: document.querySelector("#eventTextToggle"),
  eventArtFrame: document.querySelector("#eventArtFrame"),
  eventArt: document.querySelector("#eventArt"),
  eventVerse: document.querySelector("#eventVerse"),
  eventText: document.querySelector("#eventText"),
  choiceList: document.querySelector("#choiceList"),
  latestLogPeek: document.querySelector("#latestLogPeek"),
  runRecapCard: document.querySelector("#runRecapCard"),
  runRecapTitle: document.querySelector("#runRecapTitle"),
  runRecapStats: document.querySelector("#runRecapStats"),
  runRecapRoute: document.querySelector("#runRecapRoute"),
  runRecapPressure: document.querySelector("#runRecapPressure"),
  runRecapCopyButton: document.querySelector("#runRecapCopyButton"),
  runRecapCopyState: document.querySelector("#runRecapCopyState"),
  runFeedbackLink: document.querySelector("#runFeedbackLink"),
  logTabButtons: [...document.querySelectorAll("[data-log-tab]")],
  logTabPanels: [...document.querySelectorAll("[data-log-panel]")],
  discoveryGallery: document.querySelector("#discoveryGallery"),
  discoveryGalleryCount: document.querySelector("#discoveryGalleryCount"),
  encounterGallery: document.querySelector("#encounterGallery"),
  encounterGalleryCount: document.querySelector("#encounterGalleryCount"),
  logList: document.querySelector("#logList"),
  itemList: document.querySelector("#itemList"),
  languageList: document.querySelector("#languageList"),
  safetyList: document.querySelector("#safetyList"),
  poetryLocation: document.querySelector("#poetryLocation"),
  poetryTitle: document.querySelector("#poetryTitle"),
  poetryMeta: document.querySelector("#poetryMeta"),
  poetryLines: document.querySelector("#poetryLines"),
  poetryHint: document.querySelector("#poetryHint"),
  poetryStatus: document.querySelector("#poetryStatus"),
  poetryRefreshButton: document.querySelector("#poetryRefreshButton"),
  poetryLogButton: document.querySelector("#poetryLogButton"),
  audioHudButton: document.querySelector("#audioHudButton"),
  musicNowChip: document.querySelector("#musicNowChip"),
  musicNowId: document.querySelector("#musicNowId"),
  musicNowScene: document.querySelector("#musicNowScene"),
  audioToggleButton: document.querySelector("#audioToggleButton"),
  audioStatus: document.querySelector("#audioStatus"),
  audioHealthStrip: document.querySelector("#audioHealthStrip"),
  audioDetails: document.querySelector("#audioDetails"),
  audioReviewProgress: document.querySelector("#audioReviewProgress"),
  audioReviewList: document.querySelector("#audioReviewList"),
  audioReviewCopyButton: document.querySelector("#audioReviewCopyButton"),
  audioReviewCopyState: document.querySelector("#audioReviewCopyState"),
  audioReviewCopyFallback: document.querySelector("#audioReviewCopyFallback"),
  motionToggle: document.querySelector("#motionToggle"),
  videoNote: document.querySelector("#videoNote"),
  ambientVideo: document.querySelector("#ambientVideo"),
  fromNode: document.querySelector("#fromNode"),
  routeNode: document.querySelector("#routeNode"),
  toNode: document.querySelector("#toNode"),
  stageRouteProgress: document.querySelector("#stageRouteProgress"),
  stageRouteMidMarker: document.querySelector("#stageRouteMidMarker"),
  stagePhaseCard: document.querySelector("#stagePhaseCard"),
  stagePhaseIcon: document.querySelector("#stagePhaseIcon"),
  stagePhaseTitle: document.querySelector("#stagePhaseTitle"),
  stagePhaseDetail: document.querySelector("#stagePhaseDetail"),
  axleValue: document.querySelector("#axleValue"),
  grainValue: document.querySelector("#grainValue"),
  sanityValue: document.querySelector("#sanityValue"),
  axleMeter: document.querySelector("#axleMeter"),
  grainMeter: document.querySelector("#grainMeter"),
  sanityMeter: document.querySelector("#sanityMeter"),
  axleHint: document.querySelector("#axleHint"),
  grainHint: document.querySelector("#grainHint"),
  sanityHint: document.querySelector("#sanityHint"),
  newRunButton: document.querySelector("#newRunButton"),
  storyModal: document.querySelector("#storyModal"),
  storyModalPanel: document.querySelector("#storyModalPanel"),
  storyModalBackdrop: document.querySelector("#storyModalBackdrop"),
  storyModalClose: document.querySelector("#storyModalClose"),
  storyModalKicker: document.querySelector("#storyModalKicker"),
  storyModalTitle: document.querySelector("#storyModalTitle"),
  storyModalArtFrame: document.querySelector("#storyModalArtFrame"),
  storyModalArt: document.querySelector("#storyModalArt"),
  storyModalVerse: document.querySelector("#storyModalVerse"),
  storyModalText: document.querySelector("#storyModalText"),
  storyModalOutcome: document.querySelector("#storyModalOutcome"),
  storyModalChoices: document.querySelector("#storyModalChoices"),
  storyModalMeta: document.querySelector("#storyModalMeta"),
  storyModalContinue: document.querySelector("#storyModalContinue"),
  drawer: document.querySelector("#sideDrawer"),
  drawerTitle: document.querySelector("#drawerTitle"),
  drawerCloseButton: document.querySelector("#drawerCloseButton"),
  drawerButtons: [...document.querySelectorAll("[data-drawer-target]")],
  drawerPanels: [...document.querySelectorAll("[data-drawer-panel]")]
};

el.motionToggle.checked = motionEnabled;
if (!motionEnabled) {
  document.body.classList.add("disabled-motion");
}

el.motionToggle.addEventListener("change", () => {
  motionEnabled = el.motionToggle.checked;
  settings.motionEnabled = motionEnabled;
  saveSettings();
  document.body.classList.toggle("disabled-motion", !motionEnabled);
  el.videoNote.textContent = motionEnabled
    ? "视频层未加载素材；当前使用 CSS/SVG 假动态。"
    : "已关闭动态：保留静态舞台和文字玩法。";
});

el.runRecapCopyButton?.addEventListener("click", () => copyRunRecapToClipboard());
el.audioReviewCopyButton?.addEventListener("click", () => copyAudioReviewTemplateToClipboard());
el.logTabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveLogTab(button.dataset.logTab || "recap"));
});

el.ambientVideo.addEventListener("error", () => {
  el.videoNote.textContent = "视频加载失败，已回退到 poster / CSS 假动态，不影响玩法。";
});

el.caravanArt.addEventListener("load", () => {
  el.caravan.classList.add("has-art");
});

el.caravanArt.addEventListener("error", () => {
  el.caravan.classList.remove("has-art");
  el.videoNote.textContent = "车队素材加载失败，已回退到 CSS 车队剪影，不影响玩法。";
});

if (el.caravanArt.complete && el.caravanArt.naturalWidth > 0) {
  el.caravan.classList.add("has-art");
}

setupAudioElements();
renderAudioStatus();

el.audioHudButton?.addEventListener("click", toggleAudio);
el.audioToggleButton.addEventListener("click", toggleAudio);
el.audioReviewList?.addEventListener("click", (event) => {
  const markButton = event.target.closest("[data-audio-review-mark]");
  if (markButton) {
    setAudioReviewMark(markButton.dataset.audioKey || "", markButton.dataset.audioReviewMark || "");
    return;
  }
  const button = event.target.closest("[data-audio-preview]");
  if (!button) return;
  setAudioPreview(button.dataset.audioPreview || "");
});

function toggleAudio() {
  audioEnabled = !audioEnabled;
  settings.audioEnabled = audioEnabled;
  audioUserMuted = !audioEnabled;
  settings.audioMuted = audioUserMuted;
  saveSettings();
  if (audioEnabled) {
    unlockAudio();
  } else {
    stopLoopingAudio();
    renderAudioStatus();
  }
}

el.poetryRefreshButton?.addEventListener("click", () => {
  refreshPoetryForCurrentLocation({ force: true });
});

el.poetryLogButton?.addEventListener("click", () => {
  addCurrentPoetryToLog();
});

el.locationLoreToggle?.addEventListener("click", () => {
  setTextPanelExpanded("location", !textPanelState.location);
});

el.eventTextToggle?.addEventListener("click", () => {
  setTextPanelExpanded("event", !textPanelState.event);
});

el.locationLore?.addEventListener("click", (event) => {
  if (event.target.closest("button, a, [role='button']")) return;
  setTextPanelExpanded("location", true);
});

el.eventCopyCard?.addEventListener("click", (event) => {
  if (event.target.closest("button, a, [role='button']")) return;
  setTextPanelExpanded("event", true);
});

function bindImagePanelShortcut(node, panel) {
  node?.addEventListener("click", () => setTextPanelExpanded(panel, true));
  node?.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setTextPanelExpanded(panel, true);
  });
}

bindImagePanelShortcut(el.locationArtFrame, "location");
bindImagePanelShortcut(el.eventArtFrame, "event");

el.mapRoutePreview?.addEventListener("click", () => {
  if (el.mapRoutePreview.dataset.action === "return-town") {
    setActiveView("town");
  }
});

document.addEventListener("visibilitychange", () => {
  audioState.visible = document.visibilityState !== "hidden";
  if (!audioState.visible) {
    stopLoopingAudio();
  } else {
    updateAudioLayers();
  }
});

el.newRunButton.addEventListener("click", restartRun);
el.playtestReminderFeedback?.addEventListener("click", () => {
  markPlaytestFeedbackOpened();
  window.location.href = getFeedbackFormUrl({ source: "reminder" });
});
el.playtestReminderDismiss?.addEventListener("click", () => {
  state.playtestReminderDismissed = true;
  saveState();
  renderPlaytestReminder();
});

function restartRun() {
  state = createInitialState();
  selectedRoute = null;
  openingHintShown = false;
  storyResultOverride = null;
  storyModalActions = [];
  lastDecisionKey = "";
  decisionModalDismissedKey = "";
  resetTextPanels();
  poetryFallbackSpin = 0;
  poetryState = createPoetryFallbackState(state.currentLocation, "idle");
  resetAudioWarnings();
  schedulePlaytestReminder();
  setActiveView("town");
  setActiveDrawer("");
  saveState();
  render();
}

el.townViewButton.addEventListener("click", () => setActiveView("town"));
el.mapViewButton.addEventListener("click", () => setActiveView("map"));
el.drawerButtons.forEach((button) => {
  button.addEventListener("click", () => toggleDrawer(button.dataset.drawerTarget));
});
el.drawerCloseButton.addEventListener("click", () => setActiveDrawer(""));
el.drawer.addEventListener("click", (event) => {
  if (event.target.matches("[data-drawer-close]")) {
    setActiveDrawer("");
  }
});
el.storyModalClose?.addEventListener("click", closeStoryModal);
el.storyModalBackdrop?.addEventListener("click", () => {
  if (canTapDismissStoryModal()) closeStoryModal();
});
el.storyModalContinue?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (canTapDismissStoryModal()) closeStoryModal();
});
el.storyModalPanel?.addEventListener("click", (event) => {
  if (event.target.closest("button, a, input, select, textarea, [role='button']")) return;
  if (!canTapDismissStoryModal()) return;
  closeStoryModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (textPanelState.location || textPanelState.event) {
    closeStoryModal();
    return;
  }
  if (activeDrawer) setActiveDrawer("");
});
window.addEventListener("resize", () => {
  renderOverview();
  renderMap();
});

function createRunId() {
  return `run-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(100, numericValue));
}

function createFailureStats(seed = {}) {
  return {
    axleCrises: 0,
    grainCrises: 0,
    sanityCrises: 0,
    routeLocks: 0,
    rescues: 0,
    hardFailures: 0,
    ...seed
  };
}

function normalizeLocationIds(ids = []) {
  const source = Array.isArray(ids) ? ids : [];
  return [...new Set(source.filter((id) => locations[id]))];
}

function normalizeRouteIds(ids = []) {
  const routeIds = new Set(routes.map((route) => route.id));
  const source = Array.isArray(ids) ? ids : [];
  return [...new Set(source.filter((id) => routeIds.has(id)))];
}

function normalizeLastReveal(value) {
  if (!isPlainObject(value)) return null;
  return {
    locationIds: normalizeLocationIds(value.locationIds),
    routeIds: normalizeRouteIds(value.routeIds),
    hintedLocationIds: normalizeLocationIds(value.hintedLocationIds),
    hintedRouteIds: normalizeRouteIds(value.hintedRouteIds),
    at: Number.isFinite(Number(value.at)) ? Number(value.at) : 0
  };
}

function normalizeRoutePoolSelection(locationId, value) {
  if (!isPlainObject(value) || !locations[locationId]) {
    return {
      routeIds: [],
      fogRouteIds: [],
      fogLocationIds: [],
      requiredRouteIds: [],
      optionalRouteIds: [],
      rescueInjected: []
    };
  }
  const routeIds = normalizeRouteIds(value.routeIds)
    .filter((routeId) => getRouteById(routeId)?.from === locationId);
  const requiredRouteIds = normalizeRouteIds(value.requiredRouteIds)
    .filter((routeId) => getRouteById(routeId)?.from === locationId);
  const optionalRouteIds = normalizeRouteIds(value.optionalRouteIds)
    .filter((routeId) => routeIds.includes(routeId) && !requiredRouteIds.includes(routeId));
  const rescueInjected = [
    ...normalizeRouteIds(value.rescueInjected),
    ...normalizeLocationIds(value.rescueInjected)
  ].filter((id, index, list) => list.indexOf(id) === index);
  const fogRouteIds = normalizeRouteIds(value.fogRouteIds)
    .filter((routeId) => !routeIds.includes(routeId));
  const directDestinations = routeIds
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const fogLocationIds = normalizeLocationIds(value.fogLocationIds)
    .filter((id) => id !== locationId && !directDestinations.includes(id));
  return {
    seed: typeof value.seed === "string" ? value.seed : "",
    routeIds,
    fogRouteIds,
    fogLocationIds,
    requiredRouteIds,
    optionalRouteIds,
    rescueInjected,
    generatedAtDay: Number.isFinite(Number(value.generatedAtDay)) ? Number(value.generatedAtDay) : 0
  };
}

function normalizeRoutePoolSelections(value) {
  if (!isPlainObject(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([locationId]) => locations[locationId])
      .map(([locationId, selection]) => [locationId, normalizeRoutePoolSelection(locationId, selection)])
  );
}

function addUniqueIds(target, ids = []) {
  const added = [];
  ids.forEach((id) => {
    if (id && !target.includes(id)) {
      target.push(id);
      added.push(id);
    }
  });
  return added;
}

function getRouteById(routeId) {
  return routes.find((route) => route.id === routeId);
}

function hashString(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededScore(...parts) {
  return hashString(parts.join("|")) / 4294967295;
}

function normalizePoolItems(items = [], fallbackType = "route") {
  const source = Array.isArray(items) ? items : [];
  return source
    .map((item) => {
      if (typeof item === "string") {
        return { id: item, type: fallbackType, weight: 30, tags: [] };
      }
      if (!isPlainObject(item) || !item.id) return null;
      return {
        id: item.id,
        type: item.type || fallbackType,
        weight: Number.isFinite(Number(item.weight)) ? Number(item.weight) : 30,
        tags: Array.isArray(item.tags) ? item.tags.filter(Boolean) : []
      };
    })
    .filter(Boolean);
}

function getCountRange(countConfig, fallbackMax) {
  if (isPlainObject(countConfig)) {
    const min = Math.max(0, Math.floor(Number(countConfig.min) || 0));
    const max = Math.max(min, Math.floor(Number(countConfig.max) || min));
    return { min: Math.min(min, fallbackMax), max: Math.min(max, fallbackMax) };
  }
  const count = Math.max(0, Math.floor(Number(countConfig) || 0));
  return { min: Math.min(count, fallbackMax), max: Math.min(count, fallbackMax) };
}

function resolveDrawCount(countConfig, fallbackMax, seedParts) {
  const { min, max } = getCountRange(countConfig, fallbackMax);
  if (max <= min) return min;
  return min + Math.floor(seededScore(...seedParts, "count") * (max - min + 1));
}

function getDangerResourceKeys(targetState) {
  return resourceKeys.filter((key) => (
    Number(targetState.resources?.[key] || 0) <= (RESOURCE_WARNING_LIMITS[key] ?? 35)
  ));
}

function getCriticalResourceKeys(targetState = state) {
  return resourceKeys.filter((key) => Number(targetState.resources?.[key] || 0) <= 15);
}

function itemMatchesRescueNeed(item, targetState) {
  const dangerKeys = getDangerResourceKeys(targetState);
  if (!dangerKeys.length) return false;
  const dangerTags = dangerKeys.map((key) => RESOURCE_RESCUE_TAGS[key]).filter(Boolean);
  if (dangerTags.some((tag) => item.tags.includes(tag))) return true;

  const destinationId = item.type === "location"
    ? item.id
    : getRouteById(item.id)?.to;
  const gain = getSupplyGain(destinationId);
  return dangerKeys.some((key) => gain[key] > 0);
}

function pickStableItems(items, count, seedParts, targetState) {
  if (!items.length || count <= 0) return [];
  const ranked = items
    .map((item, index) => {
      const rescueBoost = itemMatchesRescueNeed(item, targetState) ? 80 : 0;
      const weight = Math.max(1, item.weight + rescueBoost);
      return {
        item,
        rank: seededScore(...seedParts, item.id, index) * 100 - weight
      };
    })
    .sort((a, b) => a.rank - b.rank || a.item.id.localeCompare(b.item.id));
  return ranked.slice(0, count).map((entry) => entry.item);
}

function routeItemIsValidForLocation(item, locationId) {
  const route = getRouteById(item.id);
  return item.type === "route" && route?.from === locationId;
}

function fogItemIsValid(item, locationId) {
  if (item.type === "location") {
    return locations[item.id] && item.id !== locationId;
  }
  if (item.type === "route") {
    const route = getRouteById(item.id);
    return Boolean(route && route.from !== locationId);
  }
  return false;
}

function addRescueRouteIfNeeded(selectedItems, optionalItems, requiredItems, targetState, seedParts) {
  const dangerKeys = getDangerResourceKeys(targetState);
  if (!dangerKeys.length) return [];
  const selectedAndRequired = [...requiredItems, ...selectedItems];
  if (selectedAndRequired.some((item) => itemMatchesRescueNeed(item, targetState))) return [];
  const rescueCandidates = optionalItems.filter((item) => (
    !selectedItems.some((selected) => selected.id === item.id)
    && itemMatchesRescueNeed(item, targetState)
  ));
  return pickStableItems(rescueCandidates, 1, [...seedParts, "rescue-route"], targetState);
}

function addRescueFogIfNeeded(selectedItems, fogItems, targetState, seedParts) {
  const dangerKeys = getDangerResourceKeys(targetState);
  if (!dangerKeys.length) return [];
  if (selectedItems.some((item) => itemMatchesRescueNeed(item, targetState))) return [];
  const rescueCandidates = fogItems.filter((item) => (
    !selectedItems.some((selected) => selected.id === item.id && selected.type === item.type)
    && itemMatchesRescueNeed(item, targetState)
  ));
  return pickStableItems(rescueCandidates, 1, [...seedParts, "rescue-fog"], targetState);
}

function ensureRescueInExistingSelection(locationId, pool, targetState, selection) {
  const dangerKeys = getDangerResourceKeys(targetState);
  if (!dangerKeys.length) return selection;
  const seedParts = [targetState.runId || "run", locationId];
  const requiredItems = normalizePoolItems(pool.requiredRoutes, "route")
    .filter((item) => routeItemIsValidForLocation(item, locationId));
  const optionalItems = normalizePoolItems(pool.optionalRoutes, "route")
    .filter((item) => routeItemIsValidForLocation(item, locationId));
  const knownRouteItems = [...requiredItems, ...optionalItems];
  const selectedRouteItems = selection.routeIds.map((routeId) => (
    knownRouteItems.find((item) => item.id === routeId) || { id: routeId, type: "route", weight: 30, tags: [] }
  ));
  if (selectedRouteItems.some((item) => itemMatchesRescueNeed(item, targetState))) {
    return selection;
  }

  const rescueRouteItems = pickStableItems(
    optionalItems.filter((item) => !selection.routeIds.includes(item.id) && itemMatchesRescueNeed(item, targetState)),
    1,
    [...seedParts, "existing-rescue-route"],
    targetState
  );
  if (rescueRouteItems.length) {
    const routeId = rescueRouteItems[0].id;
    selection.routeIds = [...selection.routeIds, routeId];
    selection.rescueInjected = [...new Set([...(selection.rescueInjected || []), routeId])];
    return selection;
  }

  const fogItems = normalizePoolItems(pool.fogPool, "location")
    .filter((item) => fogItemIsValid(item, locationId));
  const existingFogKeys = new Set([
    ...selection.fogLocationIds.map((id) => `location:${id}`),
    ...selection.fogRouteIds.map((id) => `route:${id}`)
  ]);
  const rescueFogItems = pickStableItems(
    fogItems.filter((item) => !existingFogKeys.has(`${item.type}:${item.id}`) && itemMatchesRescueNeed(item, targetState)),
    1,
    [...seedParts, "existing-rescue-fog"],
    targetState
  );
  rescueFogItems.forEach((item) => {
    if (item.type === "route") {
      const route = getRouteById(item.id);
      if (route && !selection.fogRouteIds.includes(item.id)) selection.fogRouteIds.push(item.id);
      if (route?.to && !selection.fogLocationIds.includes(route.to)) selection.fogLocationIds.push(route.to);
    } else if (!selection.fogLocationIds.includes(item.id)) {
      selection.fogLocationIds.push(item.id);
    }
    selection.rescueInjected = [...new Set([...(selection.rescueInjected || []), item.id])];
  });
  return selection;
}

function getRoutePoolSelection(locationId, plan, pool, targetState) {
  targetState.routePoolSelections = normalizeRoutePoolSelections(targetState.routePoolSelections);
  const existing = targetState.routePoolSelections[locationId];
  const hasOutgoingRoute = routes.some((route) => route.from === locationId);
  if (existing && (existing.routeIds.length || !hasOutgoingRoute)) {
    return ensureRescueInExistingSelection(locationId, pool, targetState, existing);
  }
  if (existing) delete targetState.routePoolSelections[locationId];

  const seedParts = [targetState.runId || "run", locationId];
  const fallbackRequired = normalizeRouteIds(plan.routes)
    .filter((routeId) => getRouteById(routeId)?.from === locationId);
  const requiredItems = normalizePoolItems(pool.requiredRoutes, "route")
    .filter((item) => routeItemIsValidForLocation(item, locationId));
  const optionalItems = normalizePoolItems(pool.optionalRoutes, "route")
    .filter((item) => routeItemIsValidForLocation(item, locationId))
    .filter((item) => !requiredItems.some((required) => required.id === item.id));
  const optionalCount = resolveDrawCount(pool.optionalCount, optionalItems.length, [...seedParts, "optional"]);
  const selectedOptionalItems = pickStableItems(optionalItems, optionalCount, [...seedParts, "optional"], targetState);
  const rescueRouteItems = addRescueRouteIfNeeded(
    selectedOptionalItems,
    optionalItems,
    requiredItems,
    targetState,
    seedParts
  );
  const routeIds = [
    ...requiredItems.map((item) => item.id),
    ...selectedOptionalItems.map((item) => item.id),
    ...rescueRouteItems.map((item) => item.id)
  ];

  const safeRouteIds = routeIds.length ? [...new Set(routeIds)] : fallbackRequired;
  const fogItems = normalizePoolItems(pool.fogPool, "location")
    .filter((item) => fogItemIsValid(item, locationId));
  const fogCount = resolveDrawCount(pool.fogCount, fogItems.length, [...seedParts, "fog"]);
  const selectedFogItems = pickStableItems(fogItems, fogCount, [...seedParts, "fog"], targetState);
  const rescueFogItems = addRescueFogIfNeeded(selectedFogItems, fogItems, targetState, seedParts);
  const allFogItems = [...selectedFogItems, ...rescueFogItems];
  const directDestinations = safeRouteIds
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const fogRouteIds = normalizeRouteIds(
    allFogItems.filter((item) => item.type === "route").map((item) => item.id)
  ).filter((routeId) => !safeRouteIds.includes(routeId));
  const fogRouteDestinations = fogRouteIds
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const fogLocationIds = normalizeLocationIds([
    ...allFogItems.filter((item) => item.type === "location").map((item) => item.id),
    ...fogRouteDestinations
  ]).filter((id) => id !== locationId && !directDestinations.includes(id));

  const selection = {
    seed: seedParts.join(":"),
    routeIds: safeRouteIds,
    fogRouteIds,
    fogLocationIds,
    requiredRouteIds: requiredItems.map((item) => item.id),
    optionalRouteIds: selectedOptionalItems.map((item) => item.id),
    rescueInjected: [
      ...rescueRouteItems.map((item) => item.id),
      ...rescueFogItems.map((item) => item.id)
    ],
    generatedAtDay: targetState.day
  };
  targetState.routePoolSelections[locationId] = selection;
  return selection;
}

function getRevealPlan(locationId, targetState = state) {
  const plan = revealPlan[locationId] || {};
  const pool = routePools[locationId];
  if (pool) {
    const selection = getRoutePoolSelection(locationId, plan, pool, targetState);
    return {
      routes: selection.routeIds,
      fogRoutes: selection.fogRouteIds,
      fogLocations: selection.fogLocationIds,
      revealText: plan.revealText || "",
      revealTextShort: plan.revealTextShort || "",
      lowSanityRevealText: plan.lowSanityRevealText || "",
      rescueInjected: selection.rescueInjected || []
    };
  }

  const outgoing = routes.filter((route) => route.from === locationId);
  const plannedRouteIds = normalizeRouteIds(plan.routes);
  const routeIds = plannedRouteIds.length ? plannedRouteIds : outgoing.map((route) => route.id);
  const directDestinations = routeIds
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const derivedFogRoutes = routes
    .filter((route) => directDestinations.includes(route.from) && route.to !== locationId)
    .map((route) => route.id);
  const fogRoutes = normalizeRouteIds([...(plan.fogRoutes || []), ...derivedFogRoutes])
    .filter((routeId) => !routeIds.includes(routeId))
    .slice(0, 3);
  const fogRouteDestinations = fogRoutes
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const fogLocations = normalizeLocationIds([...(plan.fogLocations || []), ...fogRouteDestinations])
    .filter((id) => id !== locationId && !directDestinations.includes(id))
    .slice(0, 3);

  return {
    routes: routeIds,
    fogRoutes,
    fogLocations,
    revealText: plan.revealText || "",
    revealTextShort: plan.revealTextShort || "",
    lowSanityRevealText: plan.lowSanityRevealText || ""
  };
}

function applyRevealForLocation(targetState, locationId, options = {}) {
  if (!locations[locationId]) {
    return { routeIds: [], fogRouteIds: [], fogLocationIds: [] };
  }
  targetState.revealedRoutes = normalizeRouteIds(targetState.revealedRoutes);
  targetState.hintedRoutes = normalizeRouteIds(targetState.hintedRoutes);
  targetState.hintedLocations = normalizeLocationIds(targetState.hintedLocations)
    .filter((id) => id !== locationId);

  const plan = getRevealPlan(locationId, targetState);
  const addedRouteIds = addUniqueIds(targetState.revealedRoutes, plan.routes);
  const visibleDestinations = plan.routes
    .map((routeId) => getRouteById(routeId)?.to)
    .filter(Boolean);
  const fogLocationIds = plan.fogLocations
    .filter((id) => !targetState.discoveredLocations.includes(id) && !visibleDestinations.includes(id));
  const fogRouteIds = plan.fogRoutes
    .filter((routeId) => !targetState.revealedRoutes.includes(routeId));
  const addedFogLocationIds = addUniqueIds(targetState.hintedLocations, fogLocationIds);
  const addedFogRouteIds = addUniqueIds(targetState.hintedRoutes, fogRouteIds);

  if (options.markLastReveal) {
    targetState.lastReveal = {
      locationIds: [locationId, ...visibleDestinations],
      routeIds: addedRouteIds,
      hintedLocationIds: addedFogLocationIds,
      hintedRouteIds: addedFogRouteIds,
      at: Date.now()
    };
  }

  return {
    routeIds: addedRouteIds,
    fogRouteIds: addedFogRouteIds,
    fogLocationIds: addedFogLocationIds,
    revealText: plan.revealText,
    revealTextShort: plan.revealTextShort,
    lowSanityRevealText: plan.lowSanityRevealText,
    rescueInjected: plan.rescueInjected || []
  };
}

function normalizeState(raw = {}) {
  const template = clone(initialStateTemplate);
  const merged = { ...template, ...raw };
  const resources = {};
  const currentLocation = locations[merged.currentLocation]
    ? merged.currentLocation
    : gameData.startLocation;
  const discoveredSeed = Array.isArray(merged.discoveredLocations)
    ? merged.discoveredLocations
    : [currentLocation];
  const discoveredLocations = [...new Set(discoveredSeed.filter((id) => locations[id]))];
  if (!discoveredLocations.includes(currentLocation)) {
    discoveredLocations.push(currentLocation);
  }
  resourceKeys.forEach((key) => {
    resources[key] = clamp(merged.resources?.[key] ?? template.resources?.[key] ?? 0);
  });
  const resourceMinimums = {};
  resourceKeys.forEach((key) => {
    const savedMinimum = Number(merged.resourceMinimums?.[key]);
    resourceMinimums[key] = Number.isFinite(savedMinimum)
      ? clamp(Math.min(savedMinimum, resources[key]))
      : resources[key];
  });

  const normalizedState = {
    saveVersion: SAVE_VERSION,
    runId: merged.runId || createRunId(),
    day: Number.isFinite(Number(merged.day)) ? Number(merged.day) : 1,
    currentLocation,
    resources,
    resourceMinimums,
    items: Array.isArray(merged.items) ? [...merged.items] : [],
    languages: { ...(template.languages || {}), ...(merged.languages || {}) },
    flags: Array.isArray(merged.flags) ? [...merged.flags] : [],
    discoveredLocations,
    traveledRoutes: normalizeRouteIds(merged.traveledRoutes),
    revealedRoutes: normalizeRouteIds(merged.revealedRoutes),
    hintedLocations: normalizeLocationIds(merged.hintedLocations),
    hintedRoutes: normalizeRouteIds(merged.hintedRoutes),
    routePoolSelections: normalizeRoutePoolSelections(merged.routePoolSelections),
    lastReveal: normalizeLastReveal(merged.lastReveal),
    usedSupplies: isPlainObject(merged.usedSupplies) ? { ...merged.usedSupplies } : {},
    arrivalSupplyUsed: Boolean(merged.arrivalSupplyUsed),
    routeEventResults: isPlainObject(merged.routeEventResults) ? { ...merged.routeEventResults } : {},
    fieldNoteReports: isPlainObject(merged.fieldNoteReports) ? { ...merged.fieldNoteReports } : {},
    pendingRoute: normalizePendingRoute(merged.pendingRoute),
    status: ["playing", "crisis", "ended", "stranded"].includes(merged.status)
      ? merged.status
      : "playing",
    ending: merged.ending || "",
    crisisType: crisisEvents[merged.crisisType] ? merged.crisisType : "",
    failureType: crisisEvents[merged.failureType] || crisisMeta[merged.failureType] ? merged.failureType : "",
    playtestStartedAt: Number.isFinite(Number(merged.playtestStartedAt)) ? Number(merged.playtestStartedAt) : Date.now(),
    playtestReminderShown: Boolean(merged.playtestReminderShown),
    playtestReminderDismissed: Boolean(merged.playtestReminderDismissed),
    playtestFeedbackOpened: Boolean(merged.playtestFeedbackOpened),
    badLuckMeter: clamp(merged.badLuckMeter || 0),
    eventResults: isPlainObject(merged.eventResults) ? { ...merged.eventResults } : {},
    failureStats: createFailureStats(merged.failureStats),
    log: Array.isArray(merged.log) && merged.log.length
      ? [...merged.log]
      : [...(template.log || [])]
  };
  applyRevealForLocation(normalizedState, currentLocation, { silent: true });
  return normalizedState;
}

function createInitialState() {
  return normalizeState({ ...clone(initialStateTemplate), runId: createRunId(), playtestStartedAt: Date.now() });
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizePendingRoute(value) {
  if (!isPlainObject(value)) return null;
  const route = routes.find((item) => item.id === value.routeId);
  if (!route || !allRouteEvents[value.eventId]) return null;
  return { routeId: route.id, eventId: value.eventId };
}

function loadSettings() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const defaults = { motionEnabled: !reducedMotion, audioEnabled: false, audioMuted: false };
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return defaults;
    return { ...defaults, ...JSON.parse(saved), audioEnabled: false };
  } catch {
    return defaults;
  }
}

function getInitialViewFromUrl() {
  const view = new URLSearchParams(window.location.search).get("view");
  return view === "map" ? "map" : "town";
}

function getInitialDrawerFromUrl() {
  const drawer = new URLSearchParams(window.location.search).get("drawer");
  return drawerLabels[drawer] ? drawer : "";
}

function shouldOpenInitialRecapFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return ["1", "true", "yes"].includes(String(params.get("recap") || "").toLowerCase())
    || params.get("modal") === "recap";
}

function applyInitialRecapFromUrl() {
  if (!shouldOpenInitialRecapFromUrl()) return false;
  setActiveDrawer("");
  showRunRecapModal();
  return true;
}

function getPlaytestReminderMs() {
  const params = new URLSearchParams(window.location.search);
  const override = Number(params.get("playtestReminderMs"));
  return Number.isFinite(override) && override >= 1000
    ? override
    : PLAYTEST_REMINDER_DEFAULT_MS;
}

function getPlaytestElapsedMs() {
  return Math.max(0, Date.now() - Number(state.playtestStartedAt || Date.now()));
}

function getPlaytestRunCode() {
  const raw = String(state.runId || createRunId()).replace(/^run-/, "");
  return `JZ-${raw.slice(-10).toUpperCase()}`;
}

function getPlaytestDurationForFeedback() {
  const minutes = Math.round(getPlaytestElapsedMs() / 60000);
  if (minutes <= 5) return "5 分钟以内";
  if (minutes <= 10) return "5-10 分钟";
  return "10 分钟以上";
}

function getPlaytestProgressForFeedback() {
  if (state.status === "ended" || state.status === "stranded") return "走到结局或失败复盘";
  if (state.pendingRoute || state.traveledRoutes.length >= 1) return "走到第二站或半途事件";
  const loc = locations[state.currentLocation] || {};
  const eventDone = !loc.event || Boolean(state.eventResults[loc.event]);
  if (eventDone || Object.keys(state.usedSupplies || {}).length) return "完成补给并打开地图";
  return "只处理了第一场遭遇";
}

function getFeedbackFormUrl(extra = {}) {
  const params = new URLSearchParams({
    run: getPlaytestRunCode(),
    duration: getPlaytestDurationForFeedback(),
    progress: getPlaytestProgressForFeedback(),
    status: getRunStatusLabel(),
    ...extra
  });
  return `./P0反馈填写页.html?${params.toString()}`;
}

function getAudioReviewWorkbenchUrl(extra = {}) {
  const params = new URLSearchParams({
    run: getPlaytestRunCode(),
    status: getRunStatusLabel(),
    location: locations[state.currentLocation]?.name || state.currentLocation || "",
    ...extra
  });
  return `./P0音频听感验收工作台.html?${params.toString()}`;
}

function markPlaytestFeedbackOpened() {
  state.playtestFeedbackOpened = true;
  state.playtestReminderDismissed = true;
  saveState();
  renderPlaytestReminder();
}

function schedulePlaytestReminder() {
  if (playtestReminderTimer) {
    window.clearTimeout(playtestReminderTimer);
    playtestReminderTimer = 0;
  }
  if (state.playtestFeedbackOpened || state.playtestReminderShown) return;
  const remaining = PLAYTEST_REMINDER_MS - getPlaytestElapsedMs();
  playtestReminderTimer = window.setTimeout(() => {
    playtestReminderTimer = 0;
    triggerPlaytestReminder();
  }, Math.max(0, remaining));
}

function triggerPlaytestReminder() {
  if (state.playtestFeedbackOpened) return;
  if (!state.playtestReminderShown) {
    state.playtestReminderShown = true;
    saveState();
    setActionFeedback({
      phase: "done",
      tone: "milestone",
      kicker: "发测",
      title: "已试玩 5 分钟",
      detail: "可以继续玩，也可以先点填写反馈，把第一感受留下。"
    });
    queueActionFeedbackReset();
  }
  renderPlaytestReminder();
}

function renderPlaytestReminder() {
  if (!el.playtestReminder) return;
  const due = getPlaytestElapsedMs() >= PLAYTEST_REMINDER_MS;
  if (due && !state.playtestReminderShown && !state.playtestFeedbackOpened) {
    triggerPlaytestReminder();
    return;
  }
  const visible = due
    && state.playtestReminderShown
    && !state.playtestReminderDismissed
    && !state.playtestFeedbackOpened
    && !textPanelState.location
    && !textPanelState.event
    && state.status !== "ended";
  el.playtestReminder.hidden = !visible;
  el.playtestReminder.classList.toggle("showing", visible);
  if (el.playtestReminderDetail) {
    const minutes = Math.max(5, Math.round(PLAYTEST_REMINDER_MS / 60000));
    el.playtestReminderDetail.textContent = state.status === "stranded"
      ? "旅途已断，也可以先交反馈。"
      : `已达到 ${minutes} 分钟任务，可继续走，也可先交第一感受。编号 ${getPlaytestRunCode()}。`;
  }
}

const demoEndingRouteIds = [
  "central_to_road",
  "road_to_shrine",
  "shrine_to_market",
  "market_to_stele",
  "stele_to_rift"
];

const demoEndingSupplyByLocation = {
  central_post: "central_repair",
  old_king_road: "road_stones",
  nameless_shrine: "shrine_ash_path",
  black_teeth_market: "market_trade_grain",
  broken_stele: "stele_rubbing",
  kyushu_rift: "rift_map"
};

function getDemoEndingLocationIds(routeIds = demoEndingRouteIds) {
  const locationIds = [gameData.startLocation];
  routeIds.forEach((routeId) => {
    const route = routes.find((item) => item.id === routeId);
    if (route?.to) locationIds.push(route.to);
  });
  return [...new Set(locationIds.filter((locationId) => locations[locationId]))];
}

function buildDemoEndingEventResults(locationIds, endingId) {
  const eventResults = {};
  locationIds.forEach((locationId) => {
    const loc = locations[locationId];
    const event = events[loc?.event];
    if (!loc?.event || !event) return;
    if (locationId === targetLocationId) {
      eventResults[loc.event] = endingId === "rift"
        ? "演示记录：车队驶入裂隙，舆图在纸背合拢。"
        : "演示记录：车队在裂隙前折返，把九州异闻带回中原。";
      return;
    }
    eventResults[loc.event] = `演示记录：${loc.name} 的「${event.title}」已落账。`;
  });
  return eventResults;
}

function buildDemoEndingRouteEventResults(routeIds = demoEndingRouteIds) {
  const routeEventResults = {};
  routeIds.forEach((routeId) => {
    const route = routes.find((item) => item.id === routeId);
    const routeEvent = getRouteEventById(route?.midEvent);
    if (!route || !routeEvent) return;
    routeEventResults[getRouteEventKey(route, route.midEvent)] =
      `演示记录：${route.name} 中途处理「${routeEvent.title}」。`;
  });
  return routeEventResults;
}

function buildDemoEndingUsedSupplies(locationIds) {
  const usedSupplies = {};
  locationIds.forEach((locationId) => {
    const supplyId = demoEndingSupplyByLocation[locationId];
    const loc = locations[locationId];
    if (!supplyId || !loc?.supplies?.some((supply) => supply.id === supplyId)) return;
    usedSupplies[getSupplyKey(locationId, supplyId)] = true;
  });
  return usedSupplies;
}

function buildDemoEndingCaptureState(baseState, endingId, { preserveResources = false } = {}) {
  const locationIds = getDemoEndingLocationIds();
  const resources = preserveResources
    ? { ...baseState.resources }
    : { axle: 61, grain: 85, sanity: 63 };
  const resourceMinimums = preserveResources
    ? { ...baseState.resourceMinimums }
    : { axle: 54, grain: 60, sanity: 53 };
  return {
    ...baseState,
    day: Math.max(baseState.day || 1, 6),
    currentLocation: targetLocationId,
    discoveredLocations: [...new Set([...(baseState.discoveredLocations || []), ...locationIds])],
    traveledRoutes: [...demoEndingRouteIds],
    revealedRoutes: [...new Set([...(baseState.revealedRoutes || []), ...demoEndingRouteIds])],
    hintedLocations: [],
    hintedRoutes: [],
    routePoolSelections: {},
    lastReveal: null,
    pendingRoute: null,
    status: "ended",
    ending: endingId,
    crisisType: "",
    failureType: "",
    resources,
    resourceMinimums,
    eventResults: {
      ...(baseState.eventResults || {}),
      ...buildDemoEndingEventResults(locationIds, endingId)
    },
    routeEventResults: {
      ...(baseState.routeEventResults || {}),
      ...buildDemoEndingRouteEventResults()
    },
    usedSupplies: {
      ...(baseState.usedSupplies || {}),
      ...buildDemoEndingUsedSupplies(locationIds)
    },
    arrivalSupplyUsed: true,
    log: [
      `结局：${endingDefinitions[endingId] || endingId}`,
      "演示复盘：核心路线已走完，地点、路遇、补给均已落账。",
      "第 6 日：舆图尽头裂开，车辙停在纸背。",
      ...(Array.isArray(baseState.log) ? baseState.log : [])
    ].slice(0, 9)
  };
}

function applyVisualCaptureStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let nextState = state;
  let applied = false;
  if (params.get("pressure") === "low") {
    nextState = normalizeState({
      ...nextState,
      status: "playing",
      crisisType: "",
      failureType: "",
      resources: {
        ...nextState.resources,
        axle: 14,
        grain: 22,
        sanity: 18
      }
    });
    applied = true;
  }
  const captureLocationId = params.get("captureLocation");
  if (captureLocationId && locations[captureLocationId]) {
    nextState = normalizeState({
      ...nextState,
      currentLocation: captureLocationId,
      discoveredLocations: [...new Set([...nextState.discoveredLocations, captureLocationId])],
      day: Math.max(Number(nextState.day || 1), getLocationStep(captureLocationId) || 1),
      pendingRoute: null,
      status: "playing",
      ending: "",
      crisisType: "",
      failureType: "",
      eventResults: {},
      routeEventResults: {},
      arrivalSupplyUsed: false,
      log: [
        `测试入口：已直达${locations[captureLocationId].name}。`,
        ...(Array.isArray(nextState.log) ? nextState.log : [])
      ]
    });
    applied = true;
  }
  const captureResources = getCaptureResourcePatch(params);
  if (captureResources) {
    nextState = normalizeState({
      ...nextState,
      resources: {
        ...nextState.resources,
        ...captureResources
      },
      log: [
        `测试入口：资源已设为${getResourceLine(captureResources)}。`,
        ...(Array.isArray(nextState.log) ? nextState.log : [])
      ]
    });
    applied = true;
  }
  const captureFailureStats = getCaptureFailureStatsPatch(params);
  if (captureFailureStats) {
    nextState = normalizeState({
      ...nextState,
      failureStats: {
        ...nextState.failureStats,
        ...captureFailureStats
      },
      log: [
        `测试入口：失败计数已设为${getFailureStatsLine(captureFailureStats)}。`,
        ...(Array.isArray(nextState.log) ? nextState.log : [])
      ]
    });
    applied = true;
  }
  const endingId = params.get("ending");
  if (endingId && endingDefinitions[endingId]) {
    nextState = normalizeState(buildDemoEndingCaptureState(nextState, endingId, {
      preserveResources: Boolean(captureResources)
    }));
    applied = true;
  }
  state = nextState;
  return applied;
}

function getCaptureResourcePatch(params) {
  const raw = params.get("captureResources");
  if (!raw) return null;
  const patch = {};
  raw.split(",").forEach((part) => {
    const [rawKey, rawValue] = part.split(/[:=]/);
    const key = String(rawKey || "").trim();
    const value = Number(rawValue);
    if (!resourceKeys.includes(key) || !Number.isFinite(value)) return;
    patch[key] = value;
  });
  return Object.keys(patch).length ? patch : null;
}

function getCaptureFailureStatsPatch(params) {
  const raw = params.get("captureFailureStats");
  if (!raw) return null;
  const allowedKeys = Object.keys(createFailureStats());
  const patch = {};
  raw.split(",").forEach((part) => {
    const [rawKey, rawValue] = part.split(/[:=]/);
    const key = String(rawKey || "").trim();
    const value = Number(rawValue);
    if (!allowedKeys.includes(key) || !Number.isFinite(value)) return;
    patch[key] = Math.max(0, Math.floor(value));
  });
  return Object.keys(patch).length ? patch : null;
}

function getFailureStatsLine(patch) {
  const labels = {
    axleCrises: "断轴",
    grainCrises: "饥荒",
    sanityCrises: "失神",
    routeLocks: "锁路",
    rescues: "补救",
    hardFailures: "败局"
  };
  return Object.entries(patch)
    .map(([key, value]) => `${labels[key] || key}${value}`)
    .join("，");
}

function setActiveView(view) {
  const previousView = activeView;
  activeView = view === "map" ? "map" : "town";
  if (previousView === "map" && activeView !== "map" && !state.pendingRoute) {
    selectedRoute = null;
  }
  const isMap = activeView === "map";
  if (isMap) {
    textPanelState = { location: false, event: false };
    renderStoryModal("");
  }
  if (isMap && previousView !== "map") {
    const now = Date.now();
    if (now - lastMapOpenSoundAt > 300) {
      playSfx(audioHooks.mapOpen);
      lastMapOpenSoundAt = now;
    }
  } else if (!isMap && previousView === "map") {
    playElement("select", 0.12);
  }
  el.townView.hidden = isMap;
  el.mapView.hidden = !isMap;
  el.townView.classList.toggle("active", !isMap);
  el.mapView.classList.toggle("active", isMap);
  el.townViewButton.classList.toggle("active", !isMap);
  el.mapViewButton.classList.toggle("active", isMap);
  el.townViewButton.setAttribute("aria-selected", String(!isMap));
  el.mapViewButton.setAttribute("aria-selected", String(isMap));
  document.body.dataset.view = activeView;
  renderStage();
  renderOverview();
  renderMap();
  if (!isMap) {
    syncDecisionModalState();
    updateTextPanelState();
  }
  if (previousView !== activeView) {
    showViewSwitchToast(activeView);
  }
}

function getViewSwitchToastCopy(view) {
  const loc = locations[state.currentLocation] || {};
  if (view === "map") {
    const visibleRoutes = getRoutesFromCurrent().filter((route) => !blockRouteUntilCurrentEventHandledPreview(route));
    const routeCount = visibleRoutes.length;
    return {
      tone: "map",
      icon: "图",
      title: "九州图已展",
      detail: routeCount
        ? `${loc.name || "此地"} · 可预览 ${routeCount} 条路`
        : "雾未散开，先处理当前停靠。"
    };
  }
  if (state.pendingRoute) {
    return { tone: "town", icon: "遇", title: "回到半途", detail: "处理路遇后，车队才会抵达下一站。" };
  }
  if (state.status === "ended" || state.status === "stranded") {
    return { tone: "town", icon: "终", title: "回到旅途", detail: "查看结局、日志或重开一局。" };
  }
  if (getUnresolvedCurrentEventContext()) {
    return { tone: "town", icon: "遇", title: "回到停靠", detail: `${loc.name || "此地"} · 先处理当前遭遇。` };
  }
  return { tone: "town", icon: "旅", title: "回到旅途", detail: "补给、读志，或打开九州图选路。" };
}

function blockRouteUntilCurrentEventHandledPreview(route) {
  return Boolean(route && getUnresolvedCurrentEventContext());
}

function showViewSwitchToast(view) {
  if (!el.viewSwitchToast) return;
  const copy = getViewSwitchToastCopy(view);
  el.viewSwitchToast.dataset.viewTone = copy.tone;
  if (el.viewSwitchIcon) el.viewSwitchIcon.textContent = copy.icon;
  if (el.viewSwitchTitle) el.viewSwitchTitle.textContent = copy.title;
  if (el.viewSwitchDetail) el.viewSwitchDetail.textContent = copy.detail;
  el.viewSwitchToast.hidden = false;
  el.viewSwitchToast.classList.remove("showing");
  void el.viewSwitchToast.offsetWidth;
  el.viewSwitchToast.classList.add("showing");
  if (viewSwitchToastTimer) window.clearTimeout(viewSwitchToastTimer);
  viewSwitchToastTimer = window.setTimeout(() => {
    el.viewSwitchToast.hidden = true;
    el.viewSwitchToast.classList.remove("showing");
    viewSwitchToastTimer = 0;
  }, motionEnabled ? 1650 : 950);
}

function setTextPanelExpanded(panel, expanded) {
  const nextExpanded = Boolean(expanded);
  if (!panel) {
    textPanelState = { location: false, event: false };
    updateTextPanelState();
    return;
  }
  if (panel === "location" && nextExpanded) {
    storyResultOverride = null;
  }
  if (panel === "event" && nextExpanded) {
    decisionModalDismissedKey = "";
  }
  if (panel === "event" && !nextExpanded) {
    if (storyResultOverride) {
      storyResultOverride = null;
    } else {
      decisionModalDismissedKey = getDecisionKey();
    }
  }
  textPanelState = nextExpanded
    ? { location: panel === "location", event: panel === "event" }
    : { ...textPanelState, [panel]: false };
  updateTextPanelState();
}

function getDecisionKey() {
  if (storyResultOverride?.key) return storyResultOverride.key;
  if (state.status === "crisis") return `crisis:${state.crisisType || "unknown"}`;
  if (state.status === "ended") return `ended:${state.ending || "unknown"}`;
  if (state.status === "stranded") return `stranded:${state.failureType || "unknown"}`;
  if (state.pendingRoute) {
    return `route:${state.pendingRoute.routeId || "unknown"}:${state.pendingRoute.eventId || "unknown"}`;
  }
  const loc = locations[state.currentLocation];
  const eventId = loc?.event || "none";
  const resultState = state.eventResults[eventId] ? "result" : "choice";
  return `location:${state.currentLocation}:${eventId}:${resultState}`;
}

function shouldAdvanceResultToFollowupDecision() {
  if (!storyResultOverride || activeView !== "town") return false;
  if (state.status === "crisis") {
    return Boolean(crisisEvents[state.crisisType]?.choices?.length);
  }
  if (state.status === "stranded") {
    return Boolean(state.failureType);
  }
  if (state.status === "ended") {
    return Boolean(state.ending);
  }
  if (state.status === "playing" && !state.pendingRoute) {
    return Boolean(getUnresolvedCurrentEventContext()?.event?.choices?.length);
  }
  return false;
}

function closeStoryModal() {
  const advanceToFollowupDecision = shouldAdvanceResultToFollowupDecision();
  if (storyResultOverride) {
    storyResultOverride = null;
  } else if (textPanelState.event) {
    decisionModalDismissedKey = getDecisionKey();
  }
  if (advanceToFollowupDecision) {
    decisionModalDismissedKey = "";
    textPanelState = { location: false, event: true };
    updateTextPanelState();
    return;
  }
  setTextPanelExpanded("", false);
}

function setStoryModalTapMode(mode = "close") {
  if (!el.storyModal) return;
  const normalized = ["choices", "continue", "close"].includes(mode) ? mode : "close";
  el.storyModal.dataset.tapMode = normalized;
  if (el.storyModalBackdrop) {
    el.storyModalBackdrop.setAttribute(
      "aria-label",
      normalized === "choices" ? "请先选择行动" : "关闭文本弹窗"
    );
  }
}

function canTapDismissStoryModal() {
  return el.storyModal?.dataset.tapMode !== "choices";
}

function syncDecisionModalState() {
  const decisionKey = getDecisionKey();
  if (decisionKey !== lastDecisionKey) {
    lastDecisionKey = decisionKey;
    decisionModalDismissedKey = "";
  }
  if (storyResultOverride) {
    textPanelState = { location: false, event: true };
    return;
  }
  if (
    activeView === "town"
    && !actionBusy
    && !textPanelState.location
    && storyModalActions.length
    && decisionModalDismissedKey !== decisionKey
  ) {
    textPanelState = { location: false, event: true };
  }
}

function resetTextPanels() {
  textPanelState = { location: false, event: false };
  updateTextPanelState();
}

function updateTextPanelState() {
  const locationExpanded = Boolean(textPanelState.location);
  const eventExpanded = Boolean(textPanelState.event);
  const activePanel = locationExpanded ? "location" : eventExpanded ? "event" : "";
  el.locationLore?.classList.toggle("expanded", false);
  el.eventCopyCard?.classList.toggle("expanded", false);
  el.locationLore?.classList.toggle("modal-active", locationExpanded);
  el.eventCopyCard?.classList.toggle("modal-active", eventExpanded);
  if (el.locationLoreToggle) {
    el.locationLoreToggle.innerHTML = `<span aria-hidden="true">${locationExpanded ? "×" : "详"}</span>`;
    el.locationLoreToggle.setAttribute("aria-label", locationExpanded ? "关闭地点志" : "打开地点志");
    el.locationLoreToggle.setAttribute("title", locationExpanded ? "关闭地点志" : "地点志详情");
    el.locationLoreToggle.setAttribute("aria-expanded", String(locationExpanded));
  }
  if (el.eventTextToggle) {
    el.eventTextToggle.innerHTML = `<span aria-hidden="true">${eventExpanded ? "×" : "详"}</span>`;
    el.eventTextToggle.setAttribute("aria-label", eventExpanded ? "关闭当前遭遇" : "打开当前遭遇");
    el.eventTextToggle.setAttribute("title", eventExpanded ? "关闭当前遭遇" : "遭遇详情");
    el.eventTextToggle.setAttribute("aria-expanded", String(eventExpanded));
  }
  renderStoryModal(activePanel);
}

function setStoryModalArt(src, alt = "") {
  if (!el.storyModalArtFrame || !el.storyModalArt) return;
  if (src) {
    if (el.storyModalArt.getAttribute("src") !== src) {
      el.storyModalArt.src = src;
    }
    el.storyModalArt.alt = alt;
    el.storyModalArtFrame.hidden = false;
  } else {
    el.storyModalArt.removeAttribute("src");
    el.storyModalArt.alt = "";
    el.storyModalArtFrame.hidden = true;
  }
}

function setStoryModalActions(actions = []) {
  storyModalActions = Array.isArray(actions) ? actions.filter(Boolean) : [];
}

function setStoryResultModal(result = null) {
  storyResultOverride = result ? {
    key: `${getDecisionKey()}:result:${Date.now()}`,
    actions: [],
    ...result
  } : null;
  if (storyResultOverride) {
    decisionModalDismissedKey = "";
    textPanelState = { location: false, event: true };
  }
}

function renderEventDecisionLauncher(count, label = "处理遭遇") {
  if (!el.choiceList) return;
  el.choiceList.dataset.count = count ? "1" : "0";
  if (!count) {
    el.choiceList.innerHTML = "";
    return;
  }
  el.choiceList.innerHTML = `
    <button class="event-decision-launcher" type="button" data-open-event-modal>
      <span class="action-badge" aria-hidden="true">遇</span>
      <strong>${escapeHtml(label)}</strong>
      <small>${count} 项选择</small>
    </button>
  `;
  el.choiceList.querySelector("[data-open-event-modal]")?.addEventListener("click", () => {
    decisionModalDismissedKey = "";
    setTextPanelExpanded("event", true);
  });
}

function renderStoryModalAction(action) {
  if (action.kind === "choice") {
    const choice = action.choice;
    const hint = getChoiceModalHint(choice);
    const fieldNoteChip = renderFieldNoteChoiceChip(choice);
    return `
      <button class="story-choice-card" type="button" data-modal-choice="${action.index}" ${actionBusy ? "disabled" : ""}>
        <span class="choice-heading">
          <span class="action-badge">${getChoiceActionBadge(choice)}</span>
          <strong>${escapeHtml(choice.label)}</strong>
        </span>
        ${fieldNoteChip}
        ${renderResourceDeltaChips(choice.effect, { predict: true })}
        ${hint ? `<span class="choice-hint">${escapeHtml(hint)}</span>` : ""}
      </button>
    `;
  }
  return `
    <button class="story-choice-card ${action.className || ""}" type="button" data-modal-action="${action.kind}" ${actionBusy ? "disabled" : ""}>
      <span class="choice-heading">
        <span class="action-badge">${escapeHtml(action.badge || "行")}</span>
        <strong>${escapeHtml(action.label || "行动")}</strong>
      </span>
      <span class="choice-hint">${escapeHtml(action.hint || "")}</span>
    </button>
  `;
}

function getChoiceModalHint(choice = {}) {
  if (choice.fieldNoteSubject) return String(choice.hint || "").trim();
  const hint = String(choice.hint || "").trim();
  if (!hint) return "";
  if (/^(车轴|粮草|神志)\s*[+\-＋－]/.test(hint)) return "";
  if (/(车轴|粮草|神志)\s*[+\-＋－]\d/.test(hint) && hint.length <= 24) return "";
  return hint;
}

function renderFieldNoteChoiceChip(choice = {}) {
  if (!choice.fieldNoteSubject) return "";
  const category = choice.fieldNoteCategory || "见闻";
  const icon = FIELD_NOTE_CATEGORY_ICONS[category] || String(category).slice(0, 1) || "采";
  const clue = choice.fieldNoteCompactClue || getCompactFieldNoteClue(choice.fieldNoteClue);
  return `
    <span class="field-note-choice-chip" title="${escapeHtml(choice.fieldNoteClue || "")}">
      <span class="field-note-choice-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      <span class="field-note-choice-copy">
        <b>${escapeHtml(category)} · ${escapeHtml(choice.fieldNoteSubject)}</b>
        ${clue ? `<small>${escapeHtml(clue)}</small>` : ""}
      </span>
    </span>
  `;
}

function bindStoryModalActions() {
  if (!el.storyModalChoices) return;
  el.storyModalChoices.querySelectorAll("[data-modal-choice]").forEach((button) => {
    button.addEventListener("click", () => choose(Number(button.dataset.modalChoice)));
  });
  el.storyModalChoices.querySelectorAll("[data-modal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.modalAction;
      if (action === "restart") restartRun();
      if (action === "recap") {
        showRunRecapModal();
      }
      if (action === "copy-recap") {
        copyRunRecapToClipboard({ button });
      }
      if (action === "copy-feedback") {
        copyPlaytestFeedbackPackageToClipboard({ button });
      }
      if (action === "feedback-form") {
        markPlaytestFeedbackOpened();
        window.location.href = getFeedbackFormUrl({ source: "modal" });
      }
      if (action === "log") {
        closeStoryModal();
        setActiveDrawer("log");
      }
    });
  });
}

function getFieldNoteKey(locationId = state.currentLocation) {
  return locationId;
}

function mergeFieldNoteEffect(...deltas) {
  const merged = {};
  resourceKeys.forEach((key) => {
    merged[key] = deltas.reduce((total, delta) => total + Number(delta?.[key] || 0), 0);
  });
  deltas.forEach((delta) => {
    if (delta?.badLuck) merged.badLuck = Number(merged.badLuck || 0) + Number(delta.badLuck || 0);
    if (delta?.flag && !merged.flag) merged.flag = delta.flag;
  });
  Object.keys(merged).forEach((key) => {
    if (Number(merged[key]) === 0) delete merged[key];
  });
  return merged;
}

function getFieldNoteProfile(locationId = state.currentLocation) {
  const loc = locations[locationId];
  if (!loc) return null;
  const note = loc.fieldNote || {};
  const category = note.category || FIELD_NOTE_CATEGORY_FALLBACK[loc.terrain] || "地风";
  const subject = note.subject || loc.name || "地方见闻";
  const evidence = note.evidence || loc.arrivalText || loc.detail || "此地见闻已入册。";
  const clue = note.clue || "此条采风可供回程复核。";
  return {
    category,
    subject,
    evidence,
    clue,
    effect: mergeFieldNoteEffect(note.effect || {})
  };
}

function getFieldNoteProfileLine(locationId = state.currentLocation) {
  const profile = getFieldNoteProfile(locationId);
  if (!profile) return "";
  return `${profile.category} · ${profile.subject}：${profile.evidence}`;
}

function getCompactFieldNoteClue(value, maxLength = 22) {
  const text = normalizeInlineText(value);
  if (!text) return "";
  const firstSentence = text.match(/^[^。！？!?；;]+[。！？!?；;]?/u)?.[0] || text;
  const source = firstSentence.length <= maxLength ? firstSentence : text;
  return source.length > maxLength ? `${source.slice(0, maxLength - 1)}…` : source;
}

function hasPendingFieldNoteAtCurrentLocation() {
  if (state.status !== "playing" || state.pendingRoute) return false;
  const loc = locations[state.currentLocation];
  if (!loc?.event || !state.eventResults[loc.event]) return false;
  return !state.fieldNoteReports?.[getFieldNoteKey(loc.id)];
}

function getFieldNoteChoices(locationId = state.currentLocation) {
  const loc = locations[locationId];
  if (!loc) return [];
  const profile = getFieldNoteProfile(locationId);
  return FIELD_NOTE_STYLES.map((style) => ({
    label: style.label,
    hint: style.hint,
    effect: mergeFieldNoteEffect(profile?.effect, style.effect),
    result: [
      profile ? `你采得「${profile.subject}」：${profile.evidence}` : "",
      style.line(loc)
    ].filter(Boolean).join("\n"),
    fieldNoteStyle: style.id,
    fieldNoteCategory: profile?.category || "",
    fieldNoteSubject: profile?.subject || "",
    fieldNoteEvidence: profile?.evidence || "",
    fieldNoteClue: profile?.clue || "",
    fieldNoteCompactClue: getCompactFieldNoteClue(profile?.clue || ""),
    badge: style.badge
  }));
}

function getFieldNoteReportCount() {
  return Object.keys(state.fieldNoteReports || {}).filter((locationId) => locations[locationId]).length;
}

function getFieldNoteReportLine(locationId, report = {}) {
  const locName = locations[locationId]?.name || locationId;
  return `${locName}：${report.label || "已入册"}`;
}

function getFieldNoteReportText(locationId) {
  const report = state.fieldNoteReports?.[getFieldNoteKey(locationId)];
  if (!report) return "";
  const label = report.label || "已入册";
  const text = report.text || getFieldNoteReportLine(locationId, report);
  const day = Number.isFinite(report.day) ? `第 ${report.day} 日入册` : "已入册";
  const consequence = getFieldNoteConsequenceLine(locationId, report);
  return [
    report.subject ? `【采风题材】${report.category || "见闻"} · ${report.subject}` : "",
    report.evidence ? `【采风线索】${report.evidence}` : "",
    `【采风写法】${label}`,
    text,
    consequence ? `【王朝案牍】${consequence}` : "",
    day
  ].filter(Boolean).join("\n");
}

function getFieldNoteConsequenceLine(locationId, report = {}) {
  const locName = locations[locationId]?.name || locationId;
  const consequence = FIELD_NOTE_CONSEQUENCES[report.style];
  if (!consequence) return "";
  return consequence.line(locName);
}

function getFieldNoteConsequenceLines(limit = Infinity) {
  const reports = Object.entries(state.fieldNoteReports || {})
    .filter(([locationId]) => locations[locationId])
    .sort(([leftId, leftReport], [rightId, rightReport]) => {
      const leftDay = Number.isFinite(leftReport.day) ? leftReport.day : 999;
      const rightDay = Number.isFinite(rightReport.day) ? rightReport.day : 999;
      if (leftDay !== rightDay) return leftDay - rightDay;
      return state.discoveredLocations.indexOf(leftId) - state.discoveredLocations.indexOf(rightId);
    })
    .map(([locationId, report]) => getFieldNoteConsequenceLine(locationId, report))
    .filter(Boolean);
  if (!Number.isFinite(limit)) return reports;
  return reports.slice(0, Math.max(0, limit));
}

function getFieldNoteConsequenceSummary(limit = 3) {
  const lines = getFieldNoteConsequenceLines(limit);
  const total = getFieldNoteReportCount();
  if (!lines.length) return "尚未形成王朝案牍。";
  const suffix = total > lines.length ? ` 等 ${total} 处` : "";
  return `${lines.join(" / ")}${suffix}`;
}

function renderStoryModalChoices(actions) {
  if (!el.storyModalChoices) return;
  const modalActions = Array.isArray(actions) ? actions : [];
  el.storyModalChoices.dataset.count = String(modalActions.length);
  if (!modalActions.length) {
    el.storyModalChoices.hidden = true;
    el.storyModalChoices.innerHTML = "";
    return;
  }
  el.storyModalChoices.hidden = false;
  el.storyModalChoices.innerHTML = modalActions.map(renderStoryModalAction).join("");
  bindStoryModalActions();
}

function renderStoryModalOutcome(result) {
  if (!el.storyModalOutcome) return;
  const delta = result?.effect || result?.delta;
  const deltaChips = renderOutcomeDeltaChips(delta);
  const label = result?.outcomeLabel || (deltaChips ? "本次变化" : "");
  if (!result || (!label && !deltaChips)) {
    el.storyModalOutcome.hidden = true;
    el.storyModalOutcome.innerHTML = "";
    delete el.storyModalOutcome.dataset.outcomeTone;
    return;
  }
  const tone = getOutcomeTone(delta);
  const note = result?.outcomeNote || getOutcomeNote(tone);
  el.storyModalOutcome.hidden = false;
  el.storyModalOutcome.dataset.outcomeTone = tone;
  el.storyModalOutcome.innerHTML = `
    <span class="story-modal-outcome-seal" aria-hidden="true">${escapeHtml(getOutcomeSeal(tone))}</span>
    <span class="story-modal-outcome-copy">
      <span class="story-modal-outcome-label">${escapeHtml(label)}</span>
      <small class="story-modal-outcome-note">${escapeHtml(note)}</small>
    </span>
    ${deltaChips ? `<span class="story-modal-outcome-deltas">${deltaChips}</span>` : ""}
  `;
}

function setStoryModalContinueHint(show, label = "轻点继续") {
  if (!el.storyModalContinue) return;
  el.storyModalContinue.hidden = !show;
  el.storyModalContinue.textContent = show ? label : "";
}

function setPerceptionDataset(node, perception) {
  if (!node) return;
  if (!perception) {
    delete node.dataset.sanityBand;
    delete node.dataset.sanityLabel;
    return;
  }
  node.dataset.sanityBand = perception.band;
  node.dataset.sanityLabel = perception.label;
}

function renderStoryModal(panel) {
  if (!el.storyModal) return;
  clearRecapCopyFallback();
  if (!panel) {
    el.storyModal.hidden = true;
    el.storyModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("story-modal-open");
    el.storyModal.classList.remove("decision-modal", "result-modal", "location-modal", "encounter-modal");
    delete el.storyModal.dataset.tapMode;
    setPerceptionDataset(el.storyModal, null);
    setStoryModalContinueHint(false);
    renderStoryModalOutcome(null);
    renderStoryModalChoices([]);
    renderPlaytestReminder();
    return;
  }

  const loc = locations[state.currentLocation];
  const isLocation = panel === "location";
  const result = !isLocation ? storyResultOverride : null;
  const perception = getSanityPerception();
  const modalActions = isLocation ? [] : (result?.actions || storyModalActions);
  const hasModalActions = modalActions.length > 0;
  el.storyModal.hidden = false;
  el.storyModal.setAttribute("aria-hidden", "false");
  renderPlaytestReminder();
  el.storyModal.classList.toggle("decision-modal", !isLocation);
  el.storyModal.classList.toggle("result-modal", Boolean(result));
  el.storyModal.classList.toggle("location-modal", isLocation);
  el.storyModal.classList.toggle("encounter-modal", !isLocation);
  setPerceptionDataset(el.storyModal, perception);
  document.body.classList.add("story-modal-open");
  setStoryModalTapMode(hasModalActions ? "choices" : result ? "continue" : "close");
  el.storyModalKicker.textContent = result
    ? (result.kicker || "结果")
    : isLocation
      ? "地点志"
      : el.eventTag.textContent || "当前遭遇";
  el.storyModalTitle.textContent = result
    ? (result.title || "行动结果")
    : isLocation
      ? (loc?.name || "未知地点")
      : (el.eventTitle.textContent || "当前遭遇");
  const modalVerseText = result
    ? (result.verse || "")
    : isLocation
      ? getRenderedSceneVerseText(el.locationVerse)
      : getRenderedSceneVerseText(el.eventVerse);
  renderSceneVerseText(el.storyModalVerse, modalVerseText);
  el.storyModalText.textContent = result
    ? (result.text || "队伍继续前行。")
    : isLocation
      ? (el.locationLoreText.textContent || "此地尚无记录。")
      : (eventFullText || el.eventText.textContent || "队伍还在等待指令。");
  el.storyModalMeta.textContent = result
    ? [result.meta || "", perception?.label || ""].filter(Boolean).join(" · ")
    : isLocation
      ? [el.discoveryCount.textContent || "", perception?.label || ""].filter(Boolean).join(" · ")
      : `${loc?.name || "此地"} · ${state.pendingRoute ? "半途路遇" : "事件"} · ${perception.label}`;
  const artSrc = result
    ? result.artSrc
    : isLocation
      ? el.locationArt?.getAttribute("src")
      : (!el.eventArtFrame?.hidden ? el.eventArt?.getAttribute("src") : "");
  setStoryModalArt(artSrc, result
    ? `${result.title || "结果"}图`
    : isLocation
      ? `${loc?.name || "地点"}图`
      : `${el.eventTitle.textContent || "遭遇"}图`);
  renderStoryModalOutcome(result);
  setStoryModalContinueHint(!hasModalActions, result ? "轻点继续" : "轻点返回");
  renderStoryModalChoices(modalActions);
}

function openLocationMemory(locationId) {
  const loc = locations[locationId];
  if (!loc || !el.storyModal) return;
  storyResultOverride = null;
  textPanelState = { location: false, event: false };
  updateTextPanelState();
  el.locationLore?.classList.remove("modal-active");
  el.eventCopyCard?.classList.remove("modal-active");
  el.storyModal.hidden = false;
  el.storyModal.setAttribute("aria-hidden", "false");
  el.storyModal.classList.remove("decision-modal", "result-modal", "encounter-modal");
  el.storyModal.classList.add("location-modal");
  const perception = getSanityPerception();
  setPerceptionDataset(el.storyModal, perception);
  document.body.classList.add("story-modal-open");
  setStoryModalTapMode("close");
  el.storyModalKicker.textContent = "采风册";
  el.storyModalTitle.textContent = loc.name || "未知地点";
  renderSceneVerseText(el.storyModalVerse, formatSceneVerse(getLocationVerse(locationId)));
  el.storyModalText.textContent = [
    getLocationTextForSanity(locationId),
    getFieldNoteReportText(locationId)
  ].filter(Boolean).join("\n\n");
  const index = Math.max(0, state.discoveredLocations.indexOf(locationId)) + 1;
  const report = state.fieldNoteReports?.[getFieldNoteKey(locationId)];
  el.storyModalMeta.textContent = [
    `采风 ${index} / ${state.discoveredLocations.length}`,
    report?.category || getFieldNoteProfile(locationId)?.category || "地风",
    report?.subject || getFieldNoteProfile(locationId)?.subject || "",
    report?.label ? `写法 ${report.label}` : "",
    perception.label
  ].filter(Boolean).join(" · ");
  renderStoryModalOutcome(null);
  renderStoryModalChoices([]);
  setStoryModalContinueHint(true, "轻点返回");
  setStoryModalArt(getLocationIllustrationSrc(locationId), `${loc.name || "地点"}图`);
}

function getLocationIdByEvent(eventId) {
  return Object.entries(locations).find(([, loc]) => loc?.event === eventId)?.[0] || "";
}

function getRouteEventMemoryFromKey(key, result) {
  const [routeId, eventId = ""] = String(key || "").split(":");
  const route = routes.find((item) => item.id === routeId);
  const event = getRouteEventById(eventId);
  if (!event) return null;
  return {
    kind: "route",
    id: eventId,
    routeId,
    title: event.title || eventId,
    label: event.tag || "路遇",
    meta: route?.name || "半途",
    text: result || event.texts?.clear || "此遭遇尚无记录。",
    verse: formatSceneVerse(getRouteEventVerse(eventId, route)),
    artSrc: getRouteEventIllustrationSrc(eventId, route)
  };
}

function getEncounterMemories() {
  const eventMemories = Object.entries(state.eventResults || {}).map(([eventId, result]) => {
    const event = events[eventId];
    if (!event) return null;
    const locationId = getLocationIdByEvent(eventId);
    const loc = locations[locationId];
    return {
      kind: "location",
      id: eventId,
      routeId: "",
      title: event.title || eventId,
      label: event.tag || "地点事件",
      meta: loc?.name || "地点",
      text: result || event.texts?.clear || "此遭遇尚无记录。",
      verse: formatSceneVerse(getEventMemoryVerse(eventId, locationId)),
      artSrc: getEventIllustrationSrc(eventId, locationId || state.currentLocation)
    };
  }).filter(Boolean);

  const seenRouteEvents = new Set();
  const routeMemories = Object.entries(state.routeEventResults || {}).map(([key, result]) => {
    const memory = getRouteEventMemoryFromKey(key, result);
    if (!memory || seenRouteEvents.has(memory.id)) return null;
    seenRouteEvents.add(memory.id);
    return memory;
  }).filter(Boolean);

  return [...eventMemories, ...routeMemories];
}

function openEncounterMemory(kind, encounterId, routeId = "") {
  if (!encounterId || !el.storyModal) return;
  const memory = kind === "route"
    ? getRouteEventMemoryFromKey(`${routeId}:${encounterId}`, state.routeEventResults?.[`${routeId}:${encounterId}`])
    : getEncounterMemories().find((item) => item.kind === "location" && item.id === encounterId);
  if (!memory) return;
  storyResultOverride = null;
  textPanelState = { location: false, event: false };
  updateTextPanelState();
  el.locationLore?.classList.remove("modal-active");
  el.eventCopyCard?.classList.remove("modal-active");
  el.storyModal.hidden = false;
  el.storyModal.setAttribute("aria-hidden", "false");
  el.storyModal.classList.remove("location-modal", "decision-modal", "result-modal");
  el.storyModal.classList.add("encounter-modal");
  setPerceptionDataset(el.storyModal, null);
  document.body.classList.add("story-modal-open");
  setStoryModalTapMode("close");
  el.storyModalKicker.textContent = "异闻采风";
  el.storyModalTitle.textContent = memory.title;
  renderSceneVerseText(el.storyModalVerse, memory.verse);
  el.storyModalText.textContent = memory.text;
  el.storyModalMeta.textContent = `采风入册 · ${memory.label} · ${memory.meta}`;
  renderStoryModalOutcome(null);
  renderStoryModalChoices([]);
  setStoryModalContinueHint(true, "轻点返回");
  setStoryModalArt(memory.artSrc, `${memory.title}图`);
}

function normalizeInlineText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getCompactEventText(value, maxLength = 46) {
  const text = normalizeInlineText(value);
  if (!text) return "";
  const firstSentence = text.match(/^[^。！？!?]+[。！？!?]?/u)?.[0] || text;
  const summary = firstSentence.length <= maxLength ? firstSentence : text;
  return summary.length > maxLength ? `${summary.slice(0, maxLength - 1)}…` : summary;
}

function setEventCopy(text, options = {}) {
  const fullText = String(text || "");
  const compact = options.compact !== false;
  const maxLength = options.maxLength || 46;
  const summary = compact ? getCompactEventText(fullText, maxLength) : fullText;
  const perception = options.perception === false
    ? null
    : getSanityPerception(options.sanityBand || getSanityBand());
  eventFullText = fullText;
  el.eventText.textContent = summary || fullText;
  el.eventText.dataset.fullText = fullText;
  if (perception) {
    el.eventText.dataset.sanityBand = perception.band;
  } else {
    delete el.eventText.dataset.sanityBand;
  }
  setPerceptionDataset(el.eventCopyCard, perception);
  el.eventText.classList.toggle("is-summary", Boolean(summary && summary !== fullText));
}

function toggleDrawer(drawer) {
  setActiveDrawer(activeDrawer === drawer ? "" : drawer);
}

function clearAudioPreviewIfLeavingSettings(nextDrawer) {
  if (activeDrawer !== "settings" || nextDrawer === "settings" || !audioPreviewKey) return;
  audioPreviewKey = "";
  updateAudioLayers();
  renderAudioStatus();
}

function setActiveLogTab(tab = "recap") {
  const nextTab = el.logTabPanels.some((panel) => panel.dataset.logPanel === tab) ? tab : "recap";
  activeLogTab = nextTab;
  el.logTabButtons.forEach((button) => {
    const isActive = button.dataset.logTab === nextTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  el.logTabPanels.forEach((panel) => {
    const isActive = panel.dataset.logPanel === nextTab;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

function setActiveDrawer(drawer) {
  const nextDrawer = drawerLabels[drawer] ? drawer : "";
  if (nextDrawer && (textPanelState.location || textPanelState.event)) {
    closeStoryModal();
  }
  clearAudioPreviewIfLeavingSettings(nextDrawer);
  activeDrawer = nextDrawer;
  if (nextDrawer) {
    document.body.dataset.drawer = nextDrawer;
  } else {
    delete document.body.dataset.drawer;
  }
  el.drawer.setAttribute("aria-hidden", String(!nextDrawer));
  el.drawerButtons.forEach((button) => {
    const isActive = button.dataset.drawerTarget === nextDrawer;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-expanded", String(isActive));
  });
  el.drawerPanels.forEach((panel) => {
    const isActive = panel.dataset.drawerPanel === nextDrawer;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
  if (el.drawerTitle) {
    el.drawerTitle.textContent = drawerLabels[nextDrawer] || "状态";
  }
  if (nextDrawer === "poetry") {
    refreshPoetryForCurrentLocation();
  }
  if (nextDrawer === "log") {
    setActiveLogTab(activeLogTab);
  }
}

function saveSettings() {
  writeLocalStorage(SETTINGS_KEY, settings);
}

function writeLocalStorage(key, value) {
  try {
    const payload = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, payload);
    return true;
  } catch {
    notifyStorageUnavailable();
    return false;
  }
}

function notifyStorageUnavailable() {
  if (storageWarningShown) return;
  storageWarningShown = true;
  if (state?.log) {
    state.log.unshift("存档提示：本局暂未保存，当前浏览器拒绝写入本地存档。");
    trimLog();
  }
  setActionFeedback({
    phase: "blocked",
    tone: "warning",
    kicker: "存档",
    title: "本局暂未保存",
    detail: "当前浏览器暂时拒绝写入本地存档，试玩可以继续，但刷新后可能回到旧进度。"
  });
  queueActionFeedbackReset();
  renderStatus();
}

function setupAudioElements() {
  Object.entries(audioAssets).forEach(([key, asset]) => {
    if (!asset.src) return;
    const element = new Audio(asset.src);
    element.preload = asset.loop ? "metadata" : "auto";
    element.loop = Boolean(asset.loop);
    element.volume = 0;
    element.addEventListener("error", () => {
      audioState.failed.add(key);
      renderAudioStatus();
    });
    audioState.elements[key] = element;
  });
}

function renderAudioStatus() {
  const musicKeys = getMusicKeys();
  const hasMusic = musicKeys.some((key) => Boolean(audioState.elements[key]));
  const hasSanityLayer = Boolean(audioState.elements.sanityLow || audioState.elements.sanityLight);
  const failedCount = audioState.failed.size;
  const blockedCount = audioState.blocked.size;
  renderMusicNowChip();
  renderAudioDetails();
  renderAudioHealthStrip();
  el.audioToggleButton.textContent = audioEnabled ? "关闭音乐" : "播放音乐";
  if (el.audioHudButton) {
    const showAudioNudge = !audioEnabled && !audioUserMuted && hasPlayableAudio();
    const label = audioEnabled
      ? "关闭音乐"
      : showAudioNudge
        ? "播放音乐：建议试玩时打开声音"
        : "播放音乐";
    el.audioHudButton.classList.toggle("active", audioEnabled);
    el.audioHudButton.classList.toggle("audio-nudge", showAudioNudge);
    el.audioHudButton.dataset.audioNudge = showAudioNudge ? "听" : "";
    el.audioHudButton.setAttribute("aria-pressed", String(audioEnabled));
    el.audioHudButton.setAttribute("aria-label", label);
    el.audioHudButton.setAttribute("title", label);
  }
  if (!hasMusic && !hasSanityLayer) {
    el.audioStatus.textContent = "音频槽位未接素材；玩法保持可用。";
    return;
  }
  if (!audioEnabled) {
    if (audioUserMuted) {
      el.audioStatus.textContent = "静音；已手动关闭，点击“播放音乐”可重新启用。";
      return;
    }
    el.audioStatus.textContent = "静音；首次操作会尝试启声，也可点击“播放音乐”。";
    return;
  }
  if (failedCount) {
    el.audioStatus.textContent = `临时音乐启用；${failedCount} 个素材加载失败。`;
    return;
  }
  if (blockedCount) {
    el.audioStatus.textContent = `已请求播放；浏览器暂未放行 ${blockedCount} 个音频槽。`;
    return;
  }
  if (audioPreviewKey && audioAssets[audioPreviewKey]) {
    const previewAsset = audioAssets[audioPreviewKey];
    el.audioStatus.textContent = `正在试听：${previewAsset.id} ${previewAsset.name}；离开设置后回到旅途音乐。`;
    return;
  }
  el.audioStatus.textContent = "临时音乐启用；神志降低时叠加污染层。";
}

function renderAudioHealthStrip() {
  if (!el.audioHealthStrip) return;
  const musicKeys = getMusicKeys();
  const readyMusicCount = musicKeys.filter((key) => audioState.elements[key] && !audioState.failed.has(key)).length;
  const readySfxCount = Object.entries(audioAssets).filter(([key, asset]) => (
    ["ui", "warning", "map-sfx"].includes(asset.type)
    && audioState.elements[key]
    && !audioState.failed.has(key)
  )).length;
  const sanityLayerCount = ["sanityLight", "sanityLow"].filter((key) => (
    audioState.elements[key] && !audioState.failed.has(key)
  )).length;
  const statusTone = audioState.failed.size
    ? "warn"
    : audioState.blocked.size
      ? "hold"
      : audioEnabled
        ? "play"
        : "idle";
  const statusLabel = audioState.failed.size
    ? "失效"
    : audioState.blocked.size
      ? "待授权"
      : audioEnabled
        ? (audioPreviewKey ? "试听中" : "播放中")
        : "未播放";
  el.audioHealthStrip.dataset.tone = statusTone;
  el.audioHealthStrip.innerHTML = [
    { icon: "乐", value: `${readyMusicCount}/${musicKeys.length}`, label: "候选" },
    { icon: "效", value: readySfxCount, label: "交互音" },
    { icon: "神", value: sanityLayerCount, label: "神志层" },
    { icon: "声", value: statusLabel, label: "状态", tone: statusTone }
  ].map((item) => `
    <span class="audio-health-pill" data-tone="${item.tone || "ready"}">
      <b>${item.icon}</b>
      <strong>${item.value}</strong>
      <small>${item.label}</small>
    </span>
  `).join("");
}

function getActiveMusicDisplay() {
  const activeTerrain = getCurrentAudioTerrain();
  const activeLocationId = getCurrentAudioLocationId();
  const activeMusicKey = getActiveMusicKey();
  const music = audioAssets[activeMusicKey] || audioAssets.musicLoop || {};
  const scene = audioPreviewKey
    ? "试听"
    : musicProfileByLocation[activeLocationId]
      ? (locations[activeLocationId]?.name || "地点")
      : formatTerrainAudioLabel(activeTerrain);
  return {
    key: activeMusicKey,
    id: music.id || "未接",
    name: music.name || "未接入音乐",
    scene,
    status: formatAssetStatus(music.status || "missing")
  };
}

function renderMusicNowChip() {
  if (!el.musicNowChip) return;
  const current = getActiveMusicDisplay();
  const enabledLabel = audioEnabled ? "播放中" : "未播放";
  el.musicNowId.textContent = formatMusicChipId(current.id);
  el.musicNowScene.textContent = current.scene;
  el.musicNowChip.dataset.musicKey = current.key || "";
  el.musicNowChip.dataset.audioEnabled = audioEnabled ? "true" : "false";
  el.musicNowChip.dataset.audioNudge = (!audioEnabled && !audioUserMuted && hasPlayableAudio()) ? "true" : "false";
  el.musicNowChip.setAttribute(
    "aria-label",
    `当前音乐：${current.id}，${current.scene}，${enabledLabel}，${current.status}`
  );
  el.musicNowChip.setAttribute(
    "title",
    `当前音乐：${current.id} ${current.name}\n场景：${current.scene}\n状态：${current.status}\n点击打开试听`
  );
}

function formatMusicChipId(id) {
  return String(id || "未接").replace(/^MUS-/, "");
}

function renderAudioDetails() {
  if (!el.audioDetails) return;
  const musicKeys = getMusicKeys();
  const activeTerrain = getCurrentAudioTerrain();
  const activeLocationId = getCurrentAudioLocationId();
  const activeMusicKey = getActiveMusicKey();
  const music = audioAssets[activeMusicKey] || audioAssets.musicLoop;
  const sanityLayers = ["sanityLight", "sanityLow"]
    .map((key) => audioAssets[key])
    .filter(Boolean)
    .map((asset) => `${asset.id} ${asset.name}`);
  const sfxCount = Object.values(audioAssets)
    .filter((asset) => asset.type === "ui" || asset.type === "warning")
    .length;
  const ambienceCount = Object.values(audioAssets)
    .filter((asset) => asset.type === "ambience" && asset.src && asset.status !== "missing")
    .length;
  const mapSfx = ["mapOpen", "mapReveal", "locationArrive"]
    .map((key) => audioAssets[key])
    .filter(Boolean);
  const connectedMapSfx = mapSfx.filter((asset) => asset.src && asset.status !== "missing").length;
  const musicLine = music
    ? `当前：${formatMusicChipId(music.id)} · ${formatMusicUsageLabel(activeMusicKey)} · ${formatAssetStatus(music.status)}`
    : "当前：未接入";
  const terrainLine = musicKeys.length > 1
    ? `轮换：${formatTerrainAudioLabel(activeTerrain)} · ${musicKeys.length} 首`
    : "轮换：未启用";
  const locationLine = musicProfileByLocation[activeLocationId]
    ? `地点：${locations[activeLocationId]?.name || activeLocationId} · ${formatMusicChipId(audioAssets[musicProfileByLocation[activeLocationId]]?.id || "未接入")}`
    : "地点：随地形";
  const previewLine = audioPreviewKey && audioAssets[audioPreviewKey]
    ? `试听：${formatMusicChipId(audioAssets[audioPreviewKey].id)} · 可恢复`
    : "试听：跟随旅途";
  const sanityLine = sanityLayers.length
    ? `神志层：${sanityLayers.length} 层`
    : "神志层：未接入";
  const mapSfxLine = mapSfx.length && connectedMapSfx
    ? `地图音：${connectedMapSfx === mapSfx.length ? "已启用" : "部分接入"}`
    : "地图音：未接入";
  const ambienceLine = ambienceCount ? `环境层：${ambienceCount} 层` : "环境层：未接入";
  el.audioDetails.textContent = [
    [musicLine, previewLine].join("；"),
    [terrainLine, locationLine, sanityLine, ambienceLine, mapSfxLine, `交互音效：${sfxCount} 个`].join("；")
  ].join("\n");
  renderAudioReviewList(activeMusicKey);
}

function getMusicKeys() {
  return Object.entries(audioAssets)
    .filter(([, asset]) => asset.type === "music")
    .map(([key]) => key);
}

function loadAudioReviewMarks() {
  try {
    const saved = localStorage.getItem(AUDIO_REVIEW_KEY);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    writeLocalStorage(AUDIO_REVIEW_KEY, "{}");
    return {};
  }
}

function saveAudioReviewMarks() {
  writeLocalStorage(AUDIO_REVIEW_KEY, JSON.stringify(audioReviewMarks));
}

function getAudioReviewMarkLabel(mark) {
  return AUDIO_REVIEW_MARK_LABELS[mark] || "未评";
}

function setAudioReviewMark(key, mark) {
  if (!audioAssets[key] || !AUDIO_REVIEW_MARK_LABELS[mark]) return;
  audioReviewMarks = { ...audioReviewMarks, [key]: mark };
  saveAudioReviewMarks();
  renderAudioReviewList();
  if (el.audioReviewCopyState) {
    const asset = audioAssets[key];
    el.audioReviewCopyState.textContent = `${asset.id} 已标记为“${getAudioReviewMarkLabel(mark)}”；复制听感模板会带上本轮标记。`;
  }
}

function getAudioReviewMarksSummary() {
  const rows = getMusicKeys().map((key) => {
    const asset = audioAssets[key] || {};
    return `${asset.id || key} ${asset.name || ""}：${getAudioReviewMarkLabel(audioReviewMarks[key])}`.trim();
  });
  return rows.length ? rows.join("；") : "未接入音乐候选";
}

function getAudioReviewProgress() {
  const musicKeys = getMusicKeys();
  const markedKeys = musicKeys.filter((key) => AUDIO_REVIEW_MARK_LABELS[audioReviewMarks[key]]);
  const pendingAssets = musicKeys
    .filter((key) => !AUDIO_REVIEW_MARK_LABELS[audioReviewMarks[key]])
    .map((key) => audioAssets[key]?.id || key);
  return {
    total: musicKeys.length,
    marked: markedKeys.length,
    pending: pendingAssets,
    complete: musicKeys.length > 0 && markedKeys.length === musicKeys.length
  };
}

function getAudioReviewProgressLine() {
  const progress = getAudioReviewProgress();
  if (!progress.total) return "听感进度：未接入音乐候选";
  const pending = progress.pending.length ? `；未评 ${progress.pending.join(" / ")}` : "；已全部标记";
  return `听感进度：${progress.marked}/${progress.total}${pending}`;
}

function renderAudioReviewProgress() {
  if (!el.audioReviewProgress) return;
  const progress = getAudioReviewProgress();
  if (!progress.total) {
    el.audioReviewProgress.innerHTML = "";
    delete el.audioReviewProgress.dataset.complete;
    return;
  }
  const percent = Math.round((progress.marked / progress.total) * 100);
  el.audioReviewProgress.dataset.complete = progress.complete ? "true" : "false";
  el.audioReviewProgress.innerHTML = `
    <span class="audio-review-progress-head">
      <strong>听感进度 ${progress.marked}/${progress.total}</strong>
      <small>${progress.complete ? "可复制摘要" : `还差 ${progress.total - progress.marked} 首`}</small>
    </span>
    <span class="audio-review-progress-bar" aria-hidden="true"><i style="width:${percent}%"></i></span>
    <span class="audio-review-progress-pending">${escapeHtml(progress.pending.length ? `未评：${progress.pending.join(" / ")}` : "全部音乐已标记")}</span>
  `;
}

function renderAudioReviewList(activeMusicKey = getActiveMusicKey()) {
  if (!el.audioReviewList) return;
  const musicKeys = getMusicKeys();
  if (!musicKeys.length) {
    el.audioReviewList.innerHTML = "";
    renderAudioReviewProgress();
    return;
  }
  const followActive = !audioPreviewKey;
  const followLabel = followActive ? "跟随中" : "恢复";
  const buttons = [
    `<button class="audio-review-card audio-review-follow ${followActive ? "active" : ""}" type="button" data-audio-preview="" aria-pressed="${followActive}">
      <span>跟随旅途</span>
      <small>${followLabel}</small>
    </button>`,
    ...musicKeys.map((key) => {
      const asset = audioAssets[key];
      const isActive = audioPreviewKey ? key === audioPreviewKey : key === activeMusicKey;
      const reviewClass = audioPreviewKey === key ? "previewing" : "";
      const mark = audioReviewMarks[key] || "";
      const loadState = audioState.failed.has(key)
        ? "加载失败"
        : audioState.blocked.has(key)
          ? "待授权"
          : audioPreviewKey === key
            ? "试听中"
          : key === activeMusicKey
            ? "当前"
            : formatAssetStatus(asset.status);
      const markButtons = Object.entries(AUDIO_REVIEW_MARK_LABELS).map(([value, label]) => (
        `<button class="audio-review-mark" type="button" data-audio-key="${escapeHtml(key)}" data-audio-review-mark="${value}" aria-pressed="${mark === value}">${label}</button>`
      )).join("");
      return `<div class="audio-review-item" data-audio-review-state="${escapeHtml(mark || "unmarked")}">
        <button class="audio-review-card ${isActive ? "active" : ""} ${reviewClass}" type="button" data-audio-preview="${key}" aria-pressed="${isActive}" title="${escapeHtml(`${asset.id} ${asset.name}`)}">
          <span>${escapeHtml(formatMusicChipId(asset.id))}</span>
          <em>${escapeHtml(mark ? getAudioReviewMarkLabel(mark) : loadState)}</em>
          <small>${escapeHtml(formatMusicUsageLabel(key))}</small>
        </button>
        <div class="audio-review-marks" aria-label="${escapeHtml(`${asset.id} 听感标记`)}">${markButtons}</div>
      </div>`;
    })
  ];
  el.audioReviewList.innerHTML = buttons.join("");
  renderAudioReviewProgress();
}

function setAudioPreview(key) {
  audioPreviewKey = audioAssets[key]?.type === "music" ? key : "";
  if (audioPreviewKey && !audioEnabled) {
    audioEnabled = true;
    settings.audioEnabled = true;
    audioUserMuted = false;
    settings.audioMuted = false;
    saveSettings();
  }
  updateAudioLayers();
  renderAudioStatus();
}

function formatMusicUsageLabel(key) {
  const terrainNames = Object.entries(musicProfileByTerrain)
    .filter(([, musicKey]) => musicKey === key)
    .map(([terrain]) => formatTerrainAudioLabel(terrain))
    .filter((label, index, arr) => arr.indexOf(label) === index);
  const locationNames = Object.entries(musicProfileByLocation)
    .filter(([, musicKey]) => musicKey === key)
    .map(([locationId]) => locations[locationId]?.name || locationId)
    .slice(0, 2);
  if (locationNames.length) return `地点：${locationNames.join(" / ")}`;
  if (terrainNames.length) return `地形：${terrainNames.join(" / ")}`;
  return "候选";
}

function getLoopKeys() {
  return Object.entries(audioAssets)
    .filter(([, asset]) => asset.loop === true)
    .map(([key]) => key);
}

function getCurrentAudioTerrain() {
  if (state.pendingRoute) {
    const route = routes.find((item) => item.id === state.pendingRoute.routeId);
    if (route?.terrain) return route.terrain;
  }
  const loc = locations[state.currentLocation];
  return loc?.terrain || "default";
}

function getCurrentAudioLocationId() {
  return state.pendingRoute ? "" : state.currentLocation;
}

function getActiveMusicKey() {
  if (audioAssets[audioPreviewKey]?.type === "music") return audioPreviewKey;
  const locationId = getCurrentAudioLocationId();
  const locationMusicKey = musicProfileByLocation[locationId];
  if (audioAssets[locationMusicKey]?.type === "music") return locationMusicKey;
  const terrain = getCurrentAudioTerrain();
  const configuredKey = musicProfileByTerrain[terrain] || musicProfileByTerrain.default || "musicLoop";
  if (audioAssets[configuredKey]?.type === "music") return configuredKey;
  return audioAssets.musicLoop?.type === "music" ? "musicLoop" : getMusicKeys()[0] || "";
}

function formatTerrainAudioLabel(terrain) {
  const labels = {
    road: "古道",
    market: "边市",
    water: "水泽",
    rift: "裂隙",
    default: "旅途"
  };
  return labels[terrain] || terrain || "旅途";
}

function formatAssetStatus(status) {
  if (status === "review-pending") return "待复核";
  if (status === "demo-temporary") return "临时";
  if (status === "missing") return "未接入";
  if (status === "cleared") return "已启用";
  return status || "未知";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function normalizePoetryText(value, fallback = "") {
  const text = typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";
  return text || fallback;
}

function parseSceneVerseSourceText(value) {
  const raw = normalizePoetryText(value);
  if (!raw) return null;
  const sourceMatch = raw.match(/^(.*?)\s*(?:——|--|－{2})\s*(.+)$/);
  if (!sourceMatch) return { line: raw, title: "", author: "" };
  const line = normalizePoetryText(sourceMatch[1].replace(/[“”"]/g, ""));
  const source = normalizePoetryText(sourceMatch[2]);
  const titleMatch = source.match(/《([^》]+)》/);
  const title = titleMatch ? normalizePoetryText(titleMatch[1]) : "";
  const sourceAuthor = normalizePoetryText(
    source
      .replace(/《[^》]+》/g, "")
      .replace(/^[—\-－\s]+|[。；;，,\s]+$/g, "")
  );
  const author = normalizePoetryText(sourceAuthor.replace(/^作者[:：]\s*/, ""));
  return { line, title, author };
}

function normalizePoetryLines(content) {
  const sourceLines = Array.isArray(content)
    ? content
    : String(content || "").split(/[\n。！？；]+/);
  return sourceLines
    .map((line) => normalizePoetryText(line))
    .filter(Boolean)
    .slice(0, 4);
}

function getPoetryProfile(locationId) {
  const loc = locations[locationId] || {};
  return {
    ...(poetryContent.terrainProfiles?.[loc.terrain] || {}),
    ...(poetryContent.locationProfiles?.[locationId] || {})
  };
}

function formatPoetryProfile(profile = {}) {
  const parts = [profile.dynasty, profile.author, profile.type].filter(Boolean);
  return parts.length ? parts.join(" / ") : "随机";
}

function normalizeSceneVerse(value) {
  if (typeof value === "string" || typeof value === "number") {
    const parsed = parseSceneVerseSourceText(value);
    return parsed?.line ? { ...parsed, fit: "" } : null;
  }
  if (!isPlainObject(value)) return null;
  const parsed = parseSceneVerseSourceText(value.line || value.text || value.lines?.[0]);
  if (!parsed?.line) return null;
  return {
    line: parsed.line,
    title: normalizePoetryText(value.title || parsed.title),
    author: normalizePoetryText(value.author || parsed.author),
    fit: normalizePoetryText(value.fit)
  };
}

function splitSceneVerseLine(line) {
  const text = normalizePoetryText(line);
  if (!text) return [];
  const clauses = text
    .match(/[^，。！？；,.!?;]+[，。！？；,.!?;]?/g)
    ?.map((part) => part.trim())
    .filter(Boolean) || [text];
  const lines = [];
  let clauseCount = 0;
  clauses.forEach((clause) => {
    const previous = lines[lines.length - 1] || "";
    if (previous && clauseCount < 2 && `${previous}${clause}`.length <= 20) {
      lines[lines.length - 1] = `${previous}${clause}`;
      clauseCount += 1;
    } else {
      lines.push(clause);
      clauseCount = 1;
    }
  });
  return lines;
}

function formatSceneVerseLines(value) {
  const verse = normalizeSceneVerse(value);
  if (!verse) return [];
  const lines = splitSceneVerseLine(verse.line);
  if (!lines.length) return [];
  const quotedLines = lines.map((line, index) => {
    const prefix = index === 0 ? "“" : "";
    const suffix = index === lines.length - 1 ? "”" : "";
    return `${prefix}${line}${suffix}`;
  });
  const titleLine = verse.title ? `——《${verse.title}》` : "";
  const authorLine = verse.author ? `作者：${verse.author}` : "";
  return [...quotedLines, titleLine, authorLine].filter(Boolean);
}

function formatSceneVerse(value) {
  return formatSceneVerseLines(value).join("\n");
}

function getRenderedSceneVerseText(element) {
  return element?.dataset?.verseText || element?.textContent || "";
}

function normalizeSceneVerseDisplayText(text) {
  const normalized = normalizePoetryText(text);
  if (!normalized) return "";
  if (/(?:——|--|－{2})/.test(normalized)) {
    const collapsed = normalized.replace(/\s*\n+\s*/g, " ");
    return formatSceneVerse(collapsed);
  }
  return normalized;
}

function renderSceneVerseMarkupFromText(text) {
  const lines = normalizeSceneVerseDisplayText(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.map((line) => {
    const className = line.startsWith("作者：")
      ? "scene-verse-source scene-verse-author"
      : line.startsWith("——")
        ? "scene-verse-source"
        : "scene-verse-line";
    return `<span class="${className}">${escapeHtml(line)}</span>`;
  }).join("");
}

function renderSceneVerseText(element, text) {
  if (!element) return;
  const normalized = normalizeSceneVerseDisplayText(text);
  element.dataset.verseText = normalized;
  element.innerHTML = renderSceneVerseMarkupFromText(normalized);
  element.hidden = !normalized;
}

function getSceneVerse(bucket, id, fallbackVerse = null) {
  const sceneVerses = poetryContent.sceneVerses || {};
  return normalizeSceneVerse(sceneVerses[bucket]?.[id]) || normalizeSceneVerse(fallbackVerse);
}

function getLocationVerse(locationId) {
  return getSceneVerse("locations", locationId);
}

function getRouteVerse(route) {
  return getSceneVerse("routes", route?.id, getLocationVerse(route?.to));
}

function getEventVerse(eventId) {
  return getSceneVerse("events", eventId, getLocationVerse(state.currentLocation));
}

function getEventMemoryVerse(eventId, locationId) {
  return getSceneVerse("events", eventId, getLocationVerse(locationId));
}

function getRouteEventVerse(eventId, route) {
  return getSceneVerse("routeEvents", eventId, getRouteVerse(route));
}

function getCrisisVerse(crisisType) {
  return getSceneVerse("crisisEvents", crisisType, getLocationVerse(state.currentLocation));
}

function getEndingVerse(endingId) {
  return getSceneVerse("endings", endingId, getLocationVerse(state.currentLocation));
}

function renderSceneVerse(element, verse) {
  renderSceneVerseText(element, formatSceneVerse(verse));
}

function getFallbackPoemForLocation(locationId) {
  const loc = locations[locationId] || {};
  const fallbackPoems = poetryContent.fallbackPoems || {};
  const allPoems = Object.values(fallbackPoems).flat();
  const candidates = fallbackPoems[loc.terrain] || allPoems;
  if (!candidates.length) {
    return {
      title: "旧路无题",
      author: "佚名",
      dynasty: "古辞",
      type: "本地兜底",
      lines: ["西路未明", "车声仍在"],
      note: "诗泉暂不可用时保留一条最小内容。"
    };
  }
  const index = Math.floor(
    seededScore(
      state.runId || "run",
      locationId || "unknown",
      loc.terrain || "road",
      poetryFallbackSpin,
      "poetry"
    ) * candidates.length
  );
  return clone(candidates[Math.min(candidates.length - 1, index)]);
}

function createPoetryFallbackState(locationId, status = "fallback", error = "") {
  const loc = locations[locationId] || {};
  const profile = getPoetryProfile(locationId);
  return {
    locationId,
    status,
    error,
    requestUrl: "",
    profile,
    poem: {
      ...getFallbackPoemForLocation(locationId),
      source: "fallback",
      locationName: loc.name || "未知地点",
      profile
    }
  };
}

function buildPoetryRequestUrl(locationId) {
  if (!poetryContent.apiBaseUrl || !poetryContent.randomPath) return "";
  const profile = getPoetryProfile(locationId);
  try {
    const url = new URL(poetryContent.randomPath, poetryContent.apiBaseUrl);
    const params = new URLSearchParams();
    params.set("lang", poetryContent.lang || "zh-Hans");
    ["author", "dynasty", "type"].forEach((key) => {
      if (profile[key]) params.set(key, profile[key]);
    });
    url.search = params.toString();
    return url.toString();
  } catch {
    return "";
  }
}

function normalizePoemPayload(payload, locationId) {
  const rawPoem = payload?.data || payload?.poem || payload;
  if (!isPlainObject(rawPoem)) return null;
  const lines = normalizePoetryLines(rawPoem.content);
  if (!lines.length) return null;
  const author = isPlainObject(rawPoem.author) ? rawPoem.author.name : rawPoem.author;
  const dynasty = isPlainObject(rawPoem.dynasty) ? rawPoem.dynasty.name : rawPoem.dynasty;
  const type = isPlainObject(rawPoem.type) ? rawPoem.type.name : rawPoem.type;
  return {
    title: normalizePoetryText(rawPoem.title, "无题"),
    author: normalizePoetryText(author, "佚名"),
    dynasty: normalizePoetryText(dynasty, "未明"),
    type: normalizePoetryText(type, "古辞"),
    lines,
    note: "来自诗泉 API，可改写为地点志、路遇旁白或日志碎片。",
    source: "api",
    locationName: locations[locationId]?.name || "未知地点",
    profile: getPoetryProfile(locationId)
  };
}

async function refreshPoetryForCurrentLocation(options = {}) {
  const locationId = state.currentLocation;
  const alreadyLoaded = poetryState?.locationId === locationId
    && ["loading", "ready"].includes(poetryState.status);
  if (!options.force && alreadyLoaded) {
    renderPoetry();
    return;
  }

  if (options.force) {
    poetryFallbackSpin += 1;
  }
  const fallbackState = createPoetryFallbackState(locationId, "fallback");
  const requestUrl = buildPoetryRequestUrl(locationId);
  if (!requestUrl || typeof window.fetch !== "function") {
    poetryState = {
      ...fallbackState,
      error: "诗泉接口未配置，已使用本地古辞。"
    };
    renderPoetry();
    return;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), poetryContent.timeoutMs || 5200);
  poetryState = { ...fallbackState, status: "loading", error: "", requestUrl };
  renderPoetry();

  try {
    const response = await fetch(requestUrl, {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Poetry API ${response.status}`);
    }
    const payload = await response.json();
    const poem = normalizePoemPayload(payload, locationId);
    if (!poem) {
      throw new Error("Poetry API returned an empty poem");
    }
    poetryState = {
      locationId,
      status: "ready",
      error: "",
      requestUrl,
      profile: getPoetryProfile(locationId),
      poem
    };
  } catch {
    poetryState = {
      ...fallbackState,
      requestUrl,
      error: "诗泉暂不可达，已使用本地古辞。"
    };
  } finally {
    window.clearTimeout(timeout);
    renderPoetry();
  }
}

function addCurrentPoetryToLog() {
  const poem = poetryState.poem || getFallbackPoemForLocation(state.currentLocation);
  if (!poem?.lines?.length) return;
  const loc = locations[state.currentLocation];
  const quotedLines = poem.lines.slice(0, 2).join(" / ");
  state.log.unshift(
    `古辞入笺：${loc.name} 录《${poem.title}》：“${quotedLines}”（${poem.dynasty}·${poem.author}）。`
  );
  trimLog();
  saveState();
  renderStatus();
  renderPoetry();
}

function renderPoetry() {
  if (!el.poetryTitle || !el.poetryLines) return;
  if (poetryState.locationId !== state.currentLocation) {
    poetryState = createPoetryFallbackState(state.currentLocation, "idle");
  }
  const loc = locations[state.currentLocation];
  const poem = poetryState.poem || getFallbackPoemForLocation(state.currentLocation);
  const sourceName = poetryContent.sourceName || "诗泉";
  const statusLabels = {
    idle: "可取诗泉",
    loading: "正在取诗泉",
    ready: "诗泉在线",
    fallback: "本地兜底"
  };
  const sourceLabel = poem.source === "api" ? `${sourceName} API` : "本地兜底";

  el.poetryLocation.textContent = loc?.name || "未知地点";
  el.poetryTitle.textContent = `《${poem.title || "无题"}》`;
  el.poetryMeta.textContent = [
    `作者：${poem.author || "佚名"}`,
    [poem.dynasty || "未明", poem.type || "古辞"].filter(Boolean).join(" · ")
  ].filter(Boolean).join("\n");
  el.poetryStatus.textContent = statusLabels[poetryState.status] || "古辞";
  el.poetryHint.textContent = [
    `来源：${sourceLabel}`,
    `取样：${formatPoetryProfile(poem.profile || poetryState.profile)}`,
    poetryState.error || poem.note || ""
  ].filter(Boolean).join("；");
  el.poetryLines.innerHTML = "";
  (poem.lines || []).forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    el.poetryLines.append(item);
  });
  if (el.poetryRefreshButton) {
    el.poetryRefreshButton.disabled = poetryState.status === "loading";
    el.poetryRefreshButton.textContent = poetryState.status === "loading" ? "取诗中" : "换一条";
  }
  if (el.poetryLogButton) {
    el.poetryLogButton.disabled = !poem.lines?.length;
  }
}

function playElement(key, volumeOverride) {
  if (!audioEnabled || audioState.failed.has(key)) return;
  const element = audioState.elements[key];
  const asset = audioAssets[key];
  if (!element || !asset?.src) return;
  try {
    element.volume = clampVolume(volumeOverride ?? asset.volume ?? 0.2);
    element.currentTime = 0;
    audioState.blocked.delete(key);
  } catch {
    audioState.failed.add(key);
    renderAudioStatus();
    return;
  }
  element.play().then(() => {
    audioState.blocked.delete(key);
    renderAudioStatus();
  }).catch(() => {
    audioState.blocked.add(key);
    renderAudioStatus();
  });
}

function playSfx(primaryKey, fallbackKey = "", volumeOverride) {
  const primaryAsset = audioAssets[primaryKey];
  if (primaryAsset?.src && audioState.elements[primaryKey] && !audioState.failed.has(primaryKey)) {
    playElement(primaryKey, volumeOverride);
    return;
  }
  if (fallbackKey) {
    playElement(fallbackKey, volumeOverride);
  }
}

function setLoopVolume(key, targetVolume) {
  const element = audioState.elements[key];
  if (!element) return;
  element.volume = clampVolume(targetVolume);
  if (!audioEnabled || !audioState.visible || targetVolume <= 0 || audioState.failed.has(key)) {
    element.pause();
    audioState.blocked.delete(key);
    return;
  }
  audioState.blocked.delete(key);
  element.play().then(() => {
    audioState.blocked.delete(key);
    renderAudioStatus();
  }).catch(() => {
    audioState.blocked.add(key);
    renderAudioStatus();
  });
}

function clampVolume(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(1, numericValue));
}

function unlockAudio(options = {}) {
  updateAudioLayers();
  if (options.playSelect !== false) {
    playElement("select", 0.16);
  }
  renderAudioStatus();
}

function hasPlayableAudio() {
  return getMusicKeys().some((key) => Boolean(audioState.elements[key]) && !audioState.failed.has(key));
}

function autoUnlockAudioFromGesture() {
  if (audioEnabled || audioUserMuted || audioAutoUnlocked || !hasPlayableAudio()) return;
  audioAutoUnlocked = true;
  audioEnabled = true;
  settings.audioEnabled = true;
  settings.audioMuted = false;
  saveSettings();
  unlockAudio({ playSelect: false });
  queueMilestoneAlert("声", "声场已启", "旅途音乐会随地点和神志变化。");
}

function stopLoopingAudio() {
  getLoopKeys().forEach((key) => {
    const element = audioState.elements[key];
    if (element) element.pause();
  });
}

function updateAudioLayers() {
  if (!audioEnabled || !audioState.visible) {
    stopLoopingAudio();
    return;
  }
  const sanity = state.resources.sanity;
  const activeMusicKey = getActiveMusicKey();
  getMusicKeys().forEach((key) => {
    const targetVolume = key === activeMusicKey ? audioAssets[key]?.volume || 0.16 : 0;
    setLoopVolume(key, targetVolume);
  });
  setLoopVolume("travelAmbience", audioAssets.travelAmbience?.volume || 0.045);
  setLoopVolume("sanityLight", sanity <= 55 && sanity > 25 ? audioAssets.sanityLight?.volume || 0.08 : 0);
  setLoopVolume("sanityLow", sanity <= 25 || state.status === "crisis" ? audioAssets.sanityLow?.volume || 0.13 : 0);
  renderAudioStatus();
}

function playResourceFeedback(beforeResources, context) {
  if (!beforeResources) return;
  const changes = resourceKeys
    .map((key) => ({
      key,
      value: state.resources[key] - beforeResources[key]
    }))
    .filter((item) => item.value !== 0);
  if (context !== "silent") {
    queueResourceFloaters(changes, context);
  }
  const totalChange = resourceKeys.reduce(
    (total, key) => total + state.resources[key] - beforeResources[key],
    0
  );
  if (context !== "silent" && context !== "supply") {
    if (totalChange < 0) {
      window.setTimeout(() => playElement("resourceDown"), 90);
    } else if (totalChange > 0) {
      window.setTimeout(() => playElement("resourceUp"), 90);
    }
  }
  const warningMap = { axle: "warnAxle", grain: "warnGrain", sanity: "warnSanity" };
  resourceKeys.forEach((key) => {
    const warningLimit = RESOURCE_WARNING_LIMITS[key] || 35;
    if (!audioState.warningPlayed[key] && beforeResources[key] > warningLimit && state.resources[key] <= warningLimit) {
      audioState.warningPlayed[key] = true;
      window.setTimeout(() => playElement(warningMap[key]), 160);
      const label = RESOURCE_ALERT_LABELS[key] || { kicker: "告急", title: "资源告急" };
      queueStageAlert({
        phase: "blocked",
        tone: "warning",
        kicker: label.kicker,
        title: label.title,
        detail: `${label.title}，下一段路要优先补救。`
      });
    }
  });
}

function getResourceShortLabel(key) {
  return { axle: "轴", grain: "粮", sanity: "神" }[key] || key;
}

function queueResourceFloaters(changes = [], context = "event") {
  if (!changes.length) return;
  pendingResourceFloaters.push({ changes, context });
  window.setTimeout(flushVisualFeedbackQueue, 0);
}

function flashResourceCard(card, value) {
  if (!card || !value) return;
  const flashClass = value > 0 ? "resource-flash-gain" : "resource-flash-loss";
  card.classList.remove("resource-flash-gain", "resource-flash-loss");
  void card.offsetWidth;
  card.classList.add(flashClass);
  window.setTimeout(() => card.classList.remove(flashClass), 900);
}

function showResourceFloaters(changes = [], context = "event") {
  if (!motionEnabled || !changes.length) return;
  changes.forEach(({ key, value }, index) => {
    const card = document.querySelector(`.resource-card[data-resource="${key}"]`);
    if (!card) return;
    flashResourceCard(card, value);
    const floater = document.createElement("span");
    floater.className = `resource-floater ${value > 0 ? "gain" : "loss"} context-${context}`;
    floater.textContent = `${value > 0 ? "+" : ""}${getResourceShortLabel(key)}${value}`;
    floater.style.setProperty("--float-delay", `${index * 70}ms`);
    card.appendChild(floater);
    window.setTimeout(() => floater.remove(), 1500 + index * 70);
  });
}

function showStageAlert(feedback = {}) {
  if (!motionEnabled || !el.stageAlertLayer) return;
  const phase = feedback.phase || "";
  if (!["done", "blocked"].includes(phase)) return;
  const detail = getStageAlertDetail(feedback);
  const deltaChips = renderOutcomeDeltaChips(feedback.delta || feedback.effect);
  const alert = document.createElement("div");
  alert.className = `stage-alert tone-${feedback.tone || "quiet"} phase-${phase}`;
  alert.innerHTML = `
    <span>${escapeHtml(feedback.kicker || "行旅")}</span>
    <strong>${escapeHtml(feedback.title || "状态变化")}</strong>
    ${deltaChips ? `<span class="stage-alert-deltas">${deltaChips}</span>` : ""}
    ${detail ? `<small class="stage-alert-detail">${escapeHtml(detail)}</small>` : ""}
  `;
  el.stageAlertLayer.appendChild(alert);
  const alerts = [...el.stageAlertLayer.querySelectorAll(".stage-alert")];
  alerts.slice(0, Math.max(0, alerts.length - 3)).forEach((item) => item.remove());
  window.setTimeout(() => alert.remove(), 1900);
}

function queueStageAlert(feedback = {}) {
  const phase = feedback.phase || "";
  if (!["done", "blocked"].includes(phase)) return;
  pendingStageAlerts.push(feedback);
  window.setTimeout(flushVisualFeedbackQueue, 0);
}

function queueMilestoneAlert(kicker, title, detail = "") {
  queueStageAlert({
    phase: "done",
    tone: "milestone",
    kicker,
    title,
    detail
  });
}

function getStageAlertDetail(feedback = {}) {
  const detail = String(feedback.shortDetail || feedback.detail || "").trim().replace(/\s+/g, " ");
  if (!detail) return "";
  return detail.length > 34 ? `${detail.slice(0, 34)}...` : detail;
}

function hasResourceDelta(delta = {}) {
  return resourceKeys.some((key) => Number(delta?.[key] || 0) !== 0);
}

function renderOutcomeDeltaChips(delta = {}) {
  if (!hasResourceDelta(delta)) return "";
  return renderResourceDeltaChips(delta, { emptyLabel: "" });
}

function getOutcomeTone(delta = {}) {
  const values = resourceKeys.map((key) => Number(delta?.[key] || 0));
  const hasGain = values.some((value) => value > 0);
  const hasLoss = values.some((value) => value < 0);
  if (hasGain && hasLoss) return "mixed";
  if (hasGain) return "gain";
  if (hasLoss) return "loss";
  return "quiet";
}

function getOutcomeNote(tone) {
  return {
    gain: "补益入囊",
    loss: "代价已付",
    mixed: "得失已记",
    quiet: "事已记下"
  }[tone] || "事已记下";
}

function getOutcomeSeal(tone) {
  return {
    gain: "益",
    loss: "损",
    mixed: "变",
    quiet: "记"
  }[tone] || "变";
}

function flushVisualFeedbackQueue() {
  if (pendingResourceFloaters.length) {
    const floaters = pendingResourceFloaters.splice(0);
    floaters.forEach(({ changes, context }) => showResourceFloaters(changes, context));
  }
  if (pendingStageAlerts.length) {
    const alerts = pendingStageAlerts.splice(0);
    alerts.forEach((feedback) => showStageAlert(feedback));
  }
}

function resetAudioWarnings() {
  audioState.warningPlayed = { axle: false, grain: false, sanity: false };
}

function waitForActionProcess(duration = ACTION_PROCESS_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, motionEnabled ? duration : 0);
  });
}

async function runDebugAction(action) {
  await action();
  await waitForActionProcess(DEBUG_ACTION_SETTLE_MS);
  return clone(state);
}

function getIdleActionFeedback() {
  const loc = locations[state.currentLocation];
  if (state.pendingRoute) {
    const route = routes.find((item) => item.id === state.pendingRoute.routeId);
    const routeEvent = getRouteEventById(state.pendingRoute.eventId);
    return {
      phase: "idle",
      tone: "warning",
      kicker: "半途",
      title: routeEvent?.title || "路遇未决",
      detail: route ? `${locations[route.from].name} 到 ${locations[route.to].name} 之间，队伍停下等你决断。` : "队伍停在半途。"
    };
  }
  if (state.status === "crisis") {
    const meta = crisisMeta[state.crisisType];
    return {
      phase: "idle",
      tone: "danger",
      kicker: "危急",
      title: meta?.label || "濒死补救",
      detail: "资源已经触底，先处理补救选择，队伍才能继续动。"
    };
  }
  if (state.status !== "playing") {
    return {
      phase: "idle",
      tone: "quiet",
      kicker: "终局",
      title: "行旅已止",
    detail: "查看采风册复盘，或重开一局。"
    };
  }
  return {
    phase: "idle",
    tone: "quiet",
    kicker: loc?.name || "行旅",
    title: "等待指令",
    detail: "选择补给、路线或当前遭遇，队伍会先执行再落账。"
  };
}

function setActionFeedback(feedback) {
  actionFeedback = feedback;
  if (actionFeedbackResetTimer) {
    window.clearTimeout(actionFeedbackResetTimer);
    actionFeedbackResetTimer = 0;
  }
  renderActionFeedback();
  renderOverview();
  queueStageAlert(feedback);
}

function queueActionFeedbackReset() {
  if (actionFeedbackResetTimer) window.clearTimeout(actionFeedbackResetTimer);
  actionFeedbackResetTimer = window.setTimeout(() => {
    actionFeedback = null;
    renderActionFeedback();
    renderOverview();
  }, motionEnabled ? ACTION_FEEDBACK_RESET_MS : 650);
}

function setActionBusy(value) {
  actionBusy = Boolean(value);
  document.body.classList.toggle("action-busy", actionBusy);
}

function renderActionFeedback() {
  if (!el.actionProcess) return;
  const feedback = actionFeedback || getIdleActionFeedback();
  el.actionProcess.dataset.phase = feedback.phase || "idle";
  el.actionProcess.dataset.tone = feedback.tone || "quiet";
  el.actionProcessKicker.textContent = feedback.kicker || "行旅";
  el.actionProcessTitle.textContent = feedback.title || "等待指令";
  el.actionProcessDetail.textContent = feedback.detail || "选择一个动作后，队伍会先执行再落账。";
}

function describeSupplyProcess(loc, supply) {
  const badge = getSupplyBadge(supply);
  const processMap = {
    axle: "车夫卸下轴钉，随从扶住辇轮，先听一遍木声再收紧。",
    grain: "两人入仓清点干粟，一人守门记数，粮袋装满后再上车。",
    sanity: "队伍暂歇，抄下可信文字，等众人认准路名再继续。"
  };
  return {
    kicker: loc.name,
    title: `${badge.label}中`,
    detail: `${processMap[badge.type] || "队伍分头搜检可用之物。"} ${formatSupplyDeltaCompact(supply.effect)}`
  };
}

function describeChoiceProcess(choice) {
  return {
    kicker: state.pendingRoute ? "路遇" : "决断",
    title: choice.label,
    detail: choice.hint || "队伍按你的判断行动。"
  };
}

function describeRouteProcess(route) {
  const fromName = locations[route.from]?.name || "此地";
  const toName = locations[route.to]?.name || "下一站";
  return {
    kicker: "出发",
    title: `整车往 ${toName}`,
    detail: `${fromName} 起辕，先辨路、束粮、点人数。${formatCostShort(route.cost)}`
  };
}

function loadMeta() {
  try {
    const saved = localStorage.getItem(META_KEY);
    if (!saved) return { seenEvents: [], endings: [], lastPlayedAt: "" };
    return { seenEvents: [], endings: [], lastPlayedAt: "", ...JSON.parse(saved) };
  } catch {
    return { seenEvents: [], endings: [], lastPlayedAt: "" };
  }
}

function saveMeta(patch = {}) {
  const meta = { ...loadMeta(), ...patch, lastPlayedAt: new Date().toISOString() };
  return writeLocalStorage(META_KEY, meta);
}

function loadState() {
  if (shouldStartFreshRunFromUrl()) {
    const freshState = createInitialState();
    freshState.log = ["测试入口：已从干净新局开始。", ...freshState.log];
    return freshState;
  }
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return createInitialState();
    const parsed = JSON.parse(saved);
    if (parsed.saveVersion !== SAVE_VERSION) {
      const freshState = createInitialState();
      freshState.log = ["存档版本已变化，已回到新开局。", ...freshState.log];
      return freshState;
    }
    return normalizeState(parsed);
  } catch {
    const freshState = createInitialState();
    freshState.log = ["读档失败，已回到新开局。", ...freshState.log];
    return freshState;
  }
}

function shouldStartFreshRunFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const values = [params.get("fresh"), params.get("reset")].filter((value) => value !== null);
  return values.some((value) => ["1", "true", "yes"].includes(String(value).toLowerCase()));
}

function saveState() {
  state.saveVersion = SAVE_VERSION;
  const stateSaved = writeLocalStorage(SAVE_KEY, state);
  const loc = locations[state.currentLocation];
  const eventId = loc?.event;
  const meta = loadMeta();
  const seenEvents = eventId && !meta.seenEvents.includes(eventId)
    ? [...meta.seenEvents, eventId]
    : meta.seenEvents;
  const endings = state.ending && !meta.endings.includes(state.ending)
    ? [...meta.endings, state.ending]
    : meta.endings;
  const metaSaved = saveMeta({ seenEvents, endings });
  return stateSaved && metaSaved;
}

function updateBadLuck(delta = {}, context = "event") {
  const pressure = resourceKeys.reduce((total, key) => {
    const value = Number(delta[key] || 0);
    return value < 0 ? total + Math.abs(value) : total;
  }, 0);
  const recovery = resourceKeys.reduce((total, key) => {
    const value = Number(delta[key] || 0);
    return value > 0 ? total + value : total;
  }, 0);
  const lowResourceCount = resourceKeys.filter((key) => state.resources[key] <= 20).length;
  let shift = Number(delta.badLuck || 0);

  if (context === "route") shift += Math.ceil(pressure / 10);
  if (context === "event") shift += Math.ceil(pressure / 14) - Math.floor(recovery / 12);
  if (context === "crisis") shift -= Math.floor(recovery / 10);
  shift += lowResourceCount * 3;

  state.badLuckMeter = clamp((state.badLuckMeter || 0) + shift);
}

function updateResourceMinimums() {
  state.resourceMinimums = state.resourceMinimums || {};
  resourceKeys.forEach((key) => {
    const current = Number(state.resources[key] || 0);
    const previous = Number(state.resourceMinimums[key]);
    state.resourceMinimums[key] = Number.isFinite(previous)
      ? Math.min(previous, current)
      : current;
  });
}

function applyDelta(delta = {}, context = "event") {
  const beforeResources = { ...state.resources };
  resourceKeys.forEach((key) => {
    state.resources[key] = clamp(state.resources[key] + (delta[key] || 0));
  });
  updateResourceMinimums();
  if (delta.language) {
    Object.entries(delta.language).forEach(([key, value]) => {
      state.languages[key] = clamp((state.languages[key] || 0) + value);
    });
  }
  if (delta.flag && !state.flags.includes(delta.flag)) {
    state.flags.push(delta.flag);
  }
  updateBadLuck(delta, context);
  if (context !== "silent" && locations[state.currentLocation]) {
    applyRevealForLocation(state, state.currentLocation, { silent: true });
  }
  playResourceFeedback(beforeResources, context);
  updateAudioLayers();
  if (delta.ending) {
    state.status = "ended";
    state.ending = delta.ending;
  }
}

function getSanityBandForValue(value) {
  const sanity = Number.isFinite(Number(value)) ? Number(value) : 0;
  if (sanity >= 70) return "clear";
  if (sanity >= 35) return "uneasy";
  return "mad";
}

function getSanityBand() {
  return getSanityBandForValue(state.resources.sanity);
}

function getSanityPerception(band = getSanityBand()) {
  const perceptions = {
    clear: { band: "clear", label: "所见可信", meta: "神志清明" },
    uneasy: { band: "uneasy", label: "异象增多", meta: "神志动摇" },
    mad: { band: "mad", label: "所见不真", meta: "神志崩线" }
  };
  return perceptions[band] || perceptions.uneasy;
}

function getEventTextForBand(event, band = getSanityBand()) {
  if (!event) return "";
  const texts = event.texts || {};
  return texts[band] || texts.uneasy || texts.clear || event.text || "";
}

function getEventTextForSanity(event) {
  return getEventTextForBand(event, getSanityBand());
}

function getLocationDetailForBand(loc, band = getSanityBand()) {
  if (!loc) return "";
  const details = loc.sanityDetails || {};
  if (band === "clear") return loc.detail || "";
  return details[band] || details.uneasy || loc.detail || "";
}

function getLocationTextForSanity(locationId, band = getSanityBand()) {
  const loc = locations[locationId];
  if (!loc) return "此地尚无记录。";
  const detail = getLocationDetailForBand(loc, band);
  return [loc.arrivalText, detail].filter(Boolean).join("\n\n") || "此地尚无记录。";
}

function meetsCondition(condition) {
  if (condition.flag) return state.flags.includes(condition.flag);
  if (condition.sanityMax !== undefined) return state.resources.sanity <= condition.sanityMax;
  if (condition.sanityMin !== undefined) return state.resources.sanity >= condition.sanityMin;
  if (condition.languageMin) {
    return (state.languages[condition.languageMin.key] || 0) >= condition.languageMin.value;
  }
  return true;
}

function meetsAll(conditions = []) {
  return conditions.every(meetsCondition);
}

function meetsAny(conditions = []) {
  return conditions.length === 0 || conditions.some(meetsCondition);
}

function canUseRoute(route) {
  return meetsAll(route.conditions) && meetsAny(route.requireAny);
}

function getRoutesFromCurrent() {
  return routes.filter((route) => route.from === state.currentLocation);
}

function getRouteEventById(eventId) {
  return allRouteEvents[eventId] || null;
}

function getRouteEventKey(route, eventId = route?.midEvent || "") {
  return `${route.id}:${eventId}`;
}

function shouldTriggerMidEvent(route) {
  return Boolean(
    route?.midEvent
    && getRouteEventById(route.midEvent)
    && !state.routeEventResults[getRouteEventKey(route, route.midEvent)]
  );
}

function getRouteContextTags(route) {
  const fromTerrain = locations[route.from]?.terrain;
  const toTerrain = locations[route.to]?.terrain;
  const step = Math.max(getLocationStep(route.from), getLocationStep(route.to));
  return [
    route.terrain,
    fromTerrain,
    toTerrain,
    route.from,
    route.to,
    step <= 1 ? "early" : "",
    step >= getMaxJourneyStep() - 1 ? "late" : "mid"
  ].filter(Boolean);
}

function randomEventTriggerMatches(event) {
  const trigger = event.trigger || {};
  if (trigger.phase && trigger.phase !== "mid_route") return false;
  if (trigger.axleMax !== undefined && state.resources.axle > trigger.axleMax) return false;
  if (trigger.grainMax !== undefined && state.resources.grain > trigger.grainMax) return false;
  if (trigger.sanityMax !== undefined && state.resources.sanity > trigger.sanityMax) return false;
  if (trigger.sanityMin !== undefined && state.resources.sanity < trigger.sanityMin) return false;
  if (trigger.badLuckMin !== undefined && state.badLuckMeter < trigger.badLuckMin) return false;
  return true;
}

function randomEventMatchesRoute(event, route) {
  const routeTags = Array.isArray(event.routeTags) ? event.routeTags.filter(Boolean) : [];
  if (!routeTags.length) return true;
  const contextTags = getRouteContextTags(route);
  return routeTags.some((tag) => contextTags.includes(tag));
}

function routeHadEvent(routeId) {
  return Object.keys(state.routeEventResults || {}).some((key) => key.startsWith(`${routeId}:`));
}

function getRecentRouteEventStreak() {
  let streak = 0;
  [...state.traveledRoutes].reverse().some((routeId) => {
    if (routeHadEvent(routeId)) {
      streak += 1;
      return false;
    }
    return true;
  });
  return streak;
}

function isBreatherRoute(route) {
  return Boolean(route) && getRecentRouteEventStreak() >= ROUTE_EVENT_BREATHER_STREAK;
}

function getLastResolvedRouteEvent() {
  const lastRouteId = [...state.traveledRoutes].reverse().find((routeId) => routeHadEvent(routeId));
  if (!lastRouteId) return null;
  const key = Object.keys(state.routeEventResults || {}).find((item) => item.startsWith(`${lastRouteId}:`));
  const eventId = key?.split(":")[1] || "";
  return getRouteEventById(eventId);
}

function getWorstSanityLoss(event) {
  return Math.min(0, ...(event?.choices || []).map((choice) => Number(choice.effect?.sanity || 0)));
}

function isHighPressureRouteEvent(event) {
  const pools = Array.isArray(event?.pool) ? event.pool : [];
  return event?.risk === "high"
    || (event?.risk === "medium" && pools.includes("sanity"))
    || getWorstSanityLoss(event) <= -6;
}

function isLowPressureRouteEvent(event) {
  const pools = Array.isArray(event?.pool) ? event.pool : [];
  return Boolean(event?.rescueCandidate)
    || pools.some((pool) => ["rest", "supply", "clue"].includes(pool));
}

function randomEventPassesProtection(event) {
  const pools = Array.isArray(event?.pool) ? event.pool : [];
  if (state.resources.sanity <= 30) {
    const safeLowSanityPool = Boolean(event?.rescueCandidate)
      || pools.some((pool) => ["rest", "supply", "clue"].includes(pool));
    if (!safeLowSanityPool || getWorstSanityLoss(event) < -8) return false;
  }
  return !(isHighPressureRouteEvent(getLastResolvedRouteEvent()) && isHighPressureRouteEvent(event));
}

function getRandomRouteEventChance(route) {
  if (isBreatherRoute(route) && !getDangerResourceKeys(state).length && state.badLuckMeter < 55) return 0;
  const dangerCount = getDangerResourceKeys(state).length;
  const pressureBoost = state.badLuckMeter >= 65 ? 0.14 : state.badLuckMeter >= 35 ? 0.08 : 0;
  const dangerBoost = dangerCount * 0.09;
  return Math.min(
    RANDOM_ROUTE_EVENT_MAX_CHANCE,
    RANDOM_ROUTE_EVENT_BASE_CHANCE + pressureBoost + dangerBoost
  );
}

function getRandomRouteEventWeight(event) {
  const pools = Array.isArray(event.pool) ? event.pool : [];
  let weight = Math.max(1, Number(event.weight) || 10);
  if (state.resources.grain <= 45 && pools.includes("supply")) weight += 22;
  if (state.resources.sanity <= 45 && pools.includes("rest")) weight += 18;
  if (state.resources.axle <= 45 && pools.includes("item")) weight += 14;
  if (state.badLuckMeter >= 55 && event.rescueCandidate) weight += 28;
  if (pools.includes("sanity") && state.resources.sanity <= 28) weight -= 8;
  return Math.max(1, weight);
}

function getRandomRouteEventCandidates(route) {
  return Object.entries(randomRouteEvents)
    .filter(([eventId, event]) => (
      !state.routeEventResults[getRouteEventKey(route, eventId)]
      && !Object.keys(state.routeEventResults).some((key) => key.endsWith(`:${eventId}`))
      && randomEventTriggerMatches(event)
      && randomEventMatchesRoute(event, route)
      && randomEventPassesProtection(event)
    ))
    .map(([eventId, event]) => ({
      id: eventId,
      event,
      weight: getRandomRouteEventWeight(event)
    }));
}

function pickWeightedRouteEvent(candidates, route, seedLabel) {
  if (!candidates.length) return "";
  const totalWeight = candidates.reduce((total, item) => total + item.weight, 0);
  let cursor = seededScore(
    state.runId || "run",
    route.id,
    state.day,
    state.traveledRoutes.length,
    seedLabel
  ) * totalWeight;
  const ordered = [...candidates].sort((a, b) => a.id.localeCompare(b.id));
  for (const item of ordered) {
    cursor -= item.weight;
    if (cursor <= 0) return item.id;
  }
  return ordered[ordered.length - 1]?.id || "";
}

function selectRandomRouteEventId(route) {
  const candidates = getRandomRouteEventCandidates(route);
  if (!candidates.length) return "";
  const rescueCandidates = candidates.filter((item) => item.event.rescueCandidate);
  const criticalRescue = rescueCandidates.length && getCriticalResourceKeys(state).length > 0;
  if (isBreatherRoute(route)) {
    const breatherCandidates = candidates.filter((item) => isLowPressureRouteEvent(item.event));
    if (!breatherCandidates.length) return "";
    const needsRescue = getDangerResourceKeys(state).length > 0 || state.badLuckMeter >= 55;
    return needsRescue ? pickWeightedRouteEvent(breatherCandidates, route, "random-route-event-breather") : "";
  }
  const dangerCount = getDangerResourceKeys(state).length;
  const chance = (dangerCount >= 2 || state.badLuckMeter >= 72)
    ? Math.max(0.58, getRandomRouteEventChance(route))
    : getRandomRouteEventChance(route);
  const roll = seededScore(
    state.runId || "run",
    route.id,
    state.day,
    state.traveledRoutes.length,
    "random-route-event-roll"
  );
  if (roll > chance && !(criticalRescue || (rescueCandidates.length && state.badLuckMeter >= 60))) return "";
  return pickWeightedRouteEvent(
    criticalRescue || (rescueCandidates.length && state.badLuckMeter >= 60) ? rescueCandidates : candidates,
    route,
    "random-route-event-pick"
  );
}

function selectRouteEventId(route) {
  const fixedEventId = shouldTriggerMidEvent(route) ? route.midEvent : "";
  const randomEventId = selectRandomRouteEventId(route);
  if (isBreatherRoute(route)) return randomEventId;
  if (fixedEventId && isHighPressureRouteEvent(getLastResolvedRouteEvent()) && isHighPressureRouteEvent(getRouteEventById(fixedEventId))) {
    return randomEventId;
  }
  if (!fixedEventId) return randomEventId;
  if (!randomEventId) return fixedEventId;
  const swapChance = Math.min(0.62, 0.3 + getDangerResourceKeys(state).length * 0.08 + state.badLuckMeter / 300);
  const roll = seededScore(
    state.runId || "run",
    route.id,
    state.day,
    state.traveledRoutes.length,
    "fixed-random-route-event-swap"
  );
  return roll < swapChance ? randomEventId : fixedEventId;
}

function getRandomRouteEventPreview(route) {
  const candidates = getRandomRouteEventCandidates(route);
  if (!candidates.length) {
    return {
      chance: 0,
      level: "none",
      label: "无异象",
      pickedId: "",
      hasRescue: false,
      candidates: []
    };
  }
  const chance = getRandomRouteEventChance(route);
  if (chance <= 0) {
    return {
      chance: 0,
      level: "none",
      label: "休整",
      pickedId: "",
      hasRescue: false,
      candidates: []
    };
  }
  const pickedId = pickWeightedRouteEvent(candidates, route, "random-route-event-pick");
  const hasRescue = candidates.some((item) => item.event.rescueCandidate);
  const level = chance >= 0.58 ? "high" : chance >= 0.38 ? "medium" : "low";
  const labels = { low: "异象低", medium: "异象中", high: "异象高" };
  return {
    chance,
    level,
    label: labels[level],
    pickedId,
    hasRescue,
    candidates: candidates.map((item) => ({
      id: item.id,
      title: item.event.title,
      weight: item.weight,
      pool: Array.isArray(item.event.pool) ? [...item.event.pool] : [],
      rescueCandidate: Boolean(item.event.rescueCandidate)
    }))
  };
}

function getRouteOmenBadges(route) {
  const badges = [];
  const fixedEvent = getRouteEventById(route?.midEvent);
  if (fixedEvent) {
    const handled = state.routeEventResults[getRouteEventKey(route, route.midEvent)];
    badges.push({
      tone: handled ? "done" : "fixed",
      label: handled ? "定遇已过" : "定遇",
      title: fixedEvent.title
    });
  }
  const randomPreview = getRandomRouteEventPreview(route);
  if (randomPreview.level !== "none") {
    badges.push({
      tone: `random-${randomPreview.level}`,
      label: randomPreview.label,
      title: `${randomPreview.candidates.length} 类路遇候选`
    });
    if (randomPreview.hasRescue) {
      badges.push({
        tone: "rescue",
        label: "有补救",
        title: "资源紧张时更容易抽到补给或休整"
      });
    }
  }
  return badges;
}

function renderRouteOmenBadges(route) {
  const badges = getRouteOmenBadges(route);
  if (!badges.length) return "";
  return `
    <span class="route-omen-row">
      ${badges.map((badge) => (
        `<span class="route-omen ${escapeHtml(badge.tone)}" title="${escapeHtml(badge.title)}">${escapeHtml(badge.label)}</span>`
      )).join("")}
    </span>
  `;
}

function getLocationStep(locationId) {
  return Number(locations[locationId]?.map?.step || 0);
}

function getMaxJourneyStep() {
  return Math.max(
    1,
    ...Object.values(locations).map((location) => Number(location.map?.step || 0))
  );
}

function getDistanceLabel() {
  const remaining = Math.max(0, getMaxJourneyStep() - getLocationStep(state.currentLocation));
  return remaining === 0
    ? "已抵达九州裂隙"
    : `距九州裂隙约 ${remaining} 段路`;
}

function getCompactDistanceLabel() {
  const remaining = Math.max(0, getMaxJourneyStep() - getLocationStep(state.currentLocation));
  return remaining === 0 ? "已抵裂隙" : `裂隙${remaining}段`;
}

function formatShortLocationName(name = "") {
  const text = String(name || "").replace(/^九州/, "");
  return text.length > 4 ? `${text.slice(0, 3)}…` : text;
}

function getStepLocations(step) {
  return Object.values(locations)
    .filter((location) => Number(location.map?.step || 0) === step)
    .sort((a, b) => Number(a.map?.x || 0) - Number(b.map?.x || 0));
}

function getJourneyStepItems() {
  const maxStep = getMaxJourneyStep();
  const currentStep = getLocationStep(state.currentLocation);
  const pendingRoute = state.pendingRoute ? getRouteById(state.pendingRoute.routeId) : null;
  const pendingStep = pendingRoute ? getLocationStep(pendingRoute.to) : -1;
  const fallbackLabels = ["中原", "关道", "泽市", "赤水", "梦图", "裂隙"];
  return Array.from({ length: maxStep + 1 }, (_, step) => {
    const stepLocations = getStepLocations(step);
    const discovered = stepLocations.find((location) => state.discoveredLocations.includes(location.id));
    const hinted = stepLocations.find((location) => state.hintedLocations.includes(location.id));
    const current = step === currentStep ? locations[state.currentLocation] : null;
    const destination = stepLocations.find((location) => location.id === "kyushu_rift");
    const label = formatShortLocationName(
      current?.name
      || discovered?.name
      || hinted?.name
      || destination?.name
      || fallbackLabels[step]
      || `${step + 1}程`
    );
    let status = "mist";
    if (step < currentStep) status = "done";
    if (step === currentStep) status = "current";
    if (step === pendingStep) status = "pending";
    if (step === maxStep && currentStep >= maxStep) status = "end";
    const statusText = {
      done: "已走过",
      current: "当前所在",
      pending: "半途将至",
      end: "已抵达",
      mist: hinted ? "雾中显影" : "仍在雾中"
    }[status];
    return { step, label, status, statusText };
  });
}

function renderJourneyStepTrack() {
  if (!el.journeyStepTrack) return;
  const items = getJourneyStepItems();
  el.journeyStepTrack.style.setProperty("--journey-steps", String(items.length));
  el.journeyStepTrack.innerHTML = items
    .map((item) => `
      <span class="journey-step is-${item.status}" role="listitem" title="第 ${item.step + 1} 段：${escapeHtml(item.label)}，${escapeHtml(item.statusText)}">
        <span class="journey-step-dot" aria-hidden="true"></span>
        <span class="journey-step-name">${escapeHtml(item.label)}</span>
      </span>
    `)
    .join("");
}

function isCompactLandscape() {
  return window.matchMedia("(max-height: 560px) and (orientation: landscape)").matches;
}

function getSupplySummary(locationId) {
  const supplyGain = getSupplyGain(locationId);
  const labels = { axle: "车轴", grain: "粮草", sanity: "神志" };
  const available = resourceKeys
    .filter((key) => supplyGain[key] > 0)
    .sort((a, b) => supplyGain[b] - supplyGain[a])
    .map((key) => labels[key]);
  if (!available.length) return "地利不明";
  if (available.length === 1) return `偏补${available[0]}`;
  return `可补${available.slice(0, 2).join(" / ")}`;
}

function getDestinationSupplyPreview(locationId) {
  const supplies = locations[locationId]?.supplies || [];
  if (!supplies.length) return "不可补：无补给";
  if (locationId === state.currentLocation && state.arrivalSupplyUsed) {
    return "本次已补：先上路";
  }
  const availableSupplies = supplies.filter((supply) => !state.usedSupplies[getSupplyKey(locationId, supply.id)]);
  if (!availableSupplies.length) return "已取：补给耗尽";
  const gain = availableSupplies.reduce((total, supply) => {
    resourceKeys.forEach((key) => {
      total[key] += Math.max(0, Number(supply.effect?.[key] || 0));
    });
    return total;
  }, { axle: 0, grain: 0, sanity: 0 });
  const usedCount = supplies.length - availableSupplies.length;
  const suffix = usedCount ? ` · 已${usedCount}/${supplies.length}` : "";
  return `可补：${formatSupplyGainCompact(gain)}${suffix}`;
}

function getSupplyGain(locationId) {
  const supplyGain = { axle: 0, grain: 0, sanity: 0 };
  (locations[locationId]?.supplies || []).forEach((supply) => {
    resourceKeys.forEach((key) => {
      supplyGain[key] += Math.max(0, Number(supply.effect?.[key] || 0));
    });
  });
  return supplyGain;
}

function formatSupplyGainCompact(gain = {}) {
  const labels = { axle: "轴", grain: "粮", sanity: "神" };
  const parts = resourceKeys
    .filter((key) => gain[key] > 0)
    .map((key) => `${labels[key]}+${gain[key]}`);
  return parts.join(" ") || "不明";
}

function formatSupplyScan(locationId) {
  const gain = getSupplyGain(locationId);
  const parts = [];
  if (gain.axle > 0) parts.push(`车轴 +${gain.axle}`);
  if (gain.grain > 0) parts.push(`粮草 +${gain.grain}`);
  if (gain.sanity > 0) parts.push(`神志 +${gain.sanity}`);
  return parts.join(" / ") || "暂无可见补给";
}

function getAvailableSupplyGain(locationId) {
  const supplyGain = { axle: 0, grain: 0, sanity: 0 };
  (locations[locationId]?.supplies || [])
    .filter((supply) => !state.usedSupplies[getSupplyKey(locationId, supply.id)])
    .forEach((supply) => {
      resourceKeys.forEach((key) => {
        supplyGain[key] += Math.max(0, Number(supply.effect?.[key] || 0));
      });
    });
  return supplyGain;
}

function getMapNodeSupplyItems(locationId) {
  const labels = { axle: "轴", grain: "粮", sanity: "志" };
  const fullLabels = { axle: "车轴", grain: "粮草", sanity: "神志" };
  const gain = getAvailableSupplyGain(locationId);
  return resourceKeys
    .filter((key) => gain[key] > 0)
    .sort((a, b) => gain[b] - gain[a])
    .map((key) => ({
      key,
      label: labels[key] || key,
      fullLabel: fullLabels[key] || key,
      value: gain[key]
    }));
}

function renderMapNodeSupplyStrip(locationId) {
  const items = getMapNodeSupplyItems(locationId);
  const supplyScan = items.length
    ? items.map((item) => `${item.fullLabel}+${item.value}`).join(" / ")
    : "暂无可见补给";
  const chips = items.slice(0, 3).map((item) => `
    <span class="map-node-supply-chip" data-resource="${escapeHtml(item.key)}" title="${escapeHtml(`${item.fullLabel}+${item.value}`)}">
      <b>${escapeHtml(item.label)}</b><em>+${escapeHtml(item.value)}</em>
    </span>
  `).join("");
  return `<span class="map-node-supply-strip ${items.length ? "" : "empty"}" title="${escapeHtml(supplyScan)}" aria-label="${escapeHtml(supplyScan)}">${chips || "<b>无</b>"}</span>`;
}

function getSupplyBadge(supply) {
  const gain = resourceKeys
    .map((key) => ({ key, value: Math.max(0, Number(supply.effect?.[key] || 0)) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)[0];
  const badges = {
    axle: { icon: "轴", label: "修轴" },
    grain: { icon: "粮", label: "取粮" },
    sanity: { icon: "神", label: "定神" }
  };
  return {
    type: gain?.key || "unknown",
    value: gain?.value || 0,
    ...(badges[gain?.key] || { icon: "补", label: "补给" })
  };
}

function formatSupplyDelta(effect = {}) {
  const labels = { axle: "轴", grain: "粮", sanity: "神" };
  return resourceKeys
    .filter((key) => effect[key])
    .map((key) => `${labels[key] || key}${effect[key] > 0 ? "+" : ""}${effect[key]}`)
    .join(" / ") || "无变化";
}

function formatSupplyDeltaCompact(effect = {}) {
  const labels = { axle: "轴", grain: "粮", sanity: "神" };
  return resourceKeys
    .filter((key) => effect[key])
    .map((key) => {
      const value = Number(effect[key]);
      return `${value > 0 ? "+" : "-"}${labels[key] || key}${Math.abs(value)}`;
    })
    .join(" ") || "无变化";
}

function getResourceStatus(key) {
  const value = Number(state.resources[key] || 0);
  if (value <= 15) return { key: "danger", label: "危" };
  if (value <= (RESOURCE_WARNING_LIMITS[key] || 35)) return { key: "warn", label: "紧" };
  return { key: "normal", label: "安" };
}

function getResourceStatuses() {
  return resourceKeys.reduce((statuses, key) => {
    statuses[key] = getResourceStatus(key);
    return statuses;
  }, {});
}

function getResourcePressure(statuses = getResourceStatuses()) {
  if (resourceKeys.some((key) => statuses[key]?.key === "danger")) return "danger";
  if (resourceKeys.some((key) => statuses[key]?.key === "warn")) return "warn";
  return "normal";
}

function renderStageConditionLights(statuses = getResourceStatuses()) {
  el.stageConditionLights.forEach((light) => {
    const key = light.dataset.resourceLight;
    const status = statuses[key] || { key: "normal", label: "安" };
    light.dataset.status = status.key;
    light.setAttribute("aria-label", `${key} ${status.label}`);
  });
}

function applyStageResourcePressure(statuses = getResourceStatuses()) {
  const pressure = getResourcePressure(statuses);
  el.stage.dataset.resourcePressure = pressure;
  resourceKeys.forEach((key) => {
    const statusKey = statuses[key]?.key || "normal";
    el.stage.classList.toggle(`low-${key}`, statusKey === "warn" || statusKey === "danger");
    el.stage.classList.toggle(`critical-${key}`, statusKey === "danger");
    el.caravan.classList.toggle(`low-${key}`, statusKey === "warn" || statusKey === "danger");
    el.caravan.classList.toggle(`critical-${key}`, statusKey === "danger");
  });
}

function renderResourceDeltaChips(delta = {}, options = {}) {
  const labels = { axle: "轴", grain: "粮", sanity: "志" };
  const fullLabels = { axle: "车轴", grain: "粮草", sanity: "神志" };
  const chips = resourceKeys
    .filter((key) => Number(delta[key] || 0) !== 0)
    .map((key) => {
      const value = Number(delta[key] || 0);
      const nextValue = clamp((state.resources[key] || 0) + value);
      const willWarn = value < 0 && nextValue <= (RESOURCE_WARNING_LIMITS[key] || 35);
      const tone = value > 0 ? "gain" : "loss";
      const sign = value > 0 ? "+" : "";
      return `
        <span class="resource-delta-chip ${key} ${tone} ${willWarn ? "will-warn" : ""}" data-resource="${key}" aria-label="${fullLabels[key] || key}${sign}${value}">
          <b>${labels[key] || key}</b><span class="resource-delta-value">${sign}${value}</span>
        </span>
      `;
    });
  const warning = options.predict && resourceKeys.some((key) => {
    const value = Number(delta[key] || 0);
    return value < 0 && clamp((state.resources[key] || 0) + value) <= (RESOURCE_WARNING_LIMITS[key] || 35);
  });
  const body = chips.join("") || `<span class="resource-delta-chip neutral">${options.emptyLabel || "无变化"}</span>`;
  return `
    <span class="resource-delta-row">
      ${body}
      ${warning ? '<span class="resource-danger-badge">将危</span>' : ""}
    </span>
  `;
}

function getRiskClass(risk) {
  const text = String(risk || "");
  if (text.includes("高") || text.includes("5") || text.includes("4")) return "high";
  if (text.includes("中") || text.includes("3")) return "medium";
  return "low";
}

function renderRouteRiskBadge(route) {
  const riskClass = getRiskClass(route.risk);
  return `<span class="route-risk-seal ${riskClass}">险${escapeHtml(route.risk)}</span>`;
}

function getChoiceActionBadge(choice = {}) {
  if (choice.badge) return String(choice.badge).slice(0, 2);
  const text = `${choice.label || ""} ${choice.hint || ""}`;
  if (choice.effect?.ending) return "终";
  if (/凝视|夜里|沿骨|穿缝|险/.test(text)) return "险";
  if (/修|紧|轴|轮|车/.test(text)) return "修";
  if (/粮|粟|采|收|取|汤/.test(text)) return "取";
  if (/问|辨|读|拓|名|记/.test(text)) return "辨";
  if (/绕|避|等|覆|停/.test(text)) return "避";
  if (/祭|献|拜|祠/.test(text)) return "祭";
  return "行";
}

function formatRouteEventScan(route) {
  const fixedEvent = getRouteEventById(route?.midEvent);
  if (!fixedEvent) {
    return Object.keys(randomRouteEvents).length ? "半途路遇：可能有异象" : "半途路遇：无";
  }
  const handled = state.routeEventResults[getRouteEventKey(route, route.midEvent)];
  const randomHint = Object.keys(randomRouteEvents).length ? " / 或遇随机异象" : "";
  return handled ? `半途路遇：${fixedEvent.title}（已处理）${randomHint}` : `半途路遇：${fixedEvent.title}${randomHint}`;
}

function formatRouteEventShort(route) {
  const fixedEvent = getRouteEventById(route?.midEvent);
  if (!fixedEvent) {
    return Object.keys(randomRouteEvents).length ? "或有路遇" : "路遇无";
  }
  const handled = state.routeEventResults[getRouteEventKey(route, route.midEvent)];
  return handled ? `路遇已：${fixedEvent.title}` : `路遇：${fixedEvent.title}`;
}

function formatCostShort(cost = {}) {
  const labels = { axle: "轴", grain: "粮", sanity: "神" };
  return resourceKeys
    .filter((key) => Number(cost[key] || 0) !== 0)
    .map((key) => `${labels[key] || key}${Number(cost[key] || 0)}`)
    .join(" ") || "无耗";
}

function getRouteDisplayName(route) {
  return route.nameShort || route.name;
}

function getRouteHintText(route) {
  if (state.resources.sanity < 35 && route.lowSanityHint) return route.lowSanityHint;
  return route.hintShort || route.hint || "路引未明。";
}

function getStageProfiles() {
  return isPlainObject(stageAssets.profiles) ? stageAssets.profiles : {};
}

function getGeneratedStageBackgroundMap() {
  return isPlainObject(stageAssets.generatedStageBackgrounds)
    ? stageAssets.generatedStageBackgrounds
    : {};
}

function getGeneratedStageBackgroundCandidate(profile = {}) {
  const generatedMap = getGeneratedStageBackgroundMap();
  const key = profile.generatedBackgroundKey;
  return profile.generatedBackground || generatedMap[key] || "";
}

function getReadyGeneratedStageBackground(profile = {}) {
  const src = getGeneratedStageBackgroundCandidate(profile);
  if (!src) return "";
  return generatedStageBackgroundStatus.get(src) === "ready" ? src : "";
}

function queueGeneratedStageBackgroundRefresh() {
  if (generatedStageBackgroundRefreshQueued) return;
  generatedStageBackgroundRefreshQueued = true;
  window.setTimeout(() => {
    generatedStageBackgroundRefreshQueued = false;
    render(false);
  }, 0);
}

function isGeneratedAssetReadyInManifest(src) {
  return Boolean(src && generatedAssetReadyPaths.has(src));
}

function preloadGeneratedImageCandidate(src, statusMap, onReady) {
  if (!src || statusMap.has(src)) return;
  if (!generatedAssetProbeEnabled) {
    statusMap.set(src, isGeneratedAssetReadyInManifest(src) ? "ready" : "manifest-missing");
    return;
  }
  if (typeof Image === "undefined") return;
  statusMap.set(src, "pending");
  const image = new Image();
  image.onload = () => {
    statusMap.set(src, "ready");
    onReady?.();
  };
  image.onerror = () => {
    statusMap.set(src, "missing");
  };
  image.src = src;
}

function preloadGeneratedStageBackgrounds() {
  Object.values(getGeneratedStageBackgroundMap()).forEach((src) => {
    preloadGeneratedImageCandidate(src, generatedStageBackgroundStatus, queueGeneratedStageBackgroundRefresh);
  });
}

function getGeneratedAssetIndex(keys, id) {
  const index = keys.indexOf(id);
  return index < 0 ? "" : String(index + 1).padStart(3, "0");
}

function normalizeGeneratedAssetTitle(title) {
  return String(title || "")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function getOrderedGeneratedIllustrationPath(collection, id, prefix, root, options = {}) {
  const keys = Object.keys(collection || {});
  const serial = getGeneratedAssetIndex(keys, id);
  const item = collection?.[id];
  if (!serial || !item) return "";
  const assetId = options.assetId || (options.stripRandomPrefix ? id.replace(/^rnd_/, "") : id);
  const title = normalizeGeneratedAssetTitle(options.title || item.name || item.title || id);
  return `${root}/${prefix}-${serial}_${assetId}_${title}.png`;
}

function getGeneratedLocationIllustrationCandidate(locationId) {
  return getOrderedGeneratedIllustrationPath(
    locations,
    locationId,
    "LOC",
    GENERATED_LOCATION_EVENT_ROOT
  );
}

function getGeneratedEventIllustrationCandidate(eventId) {
  return getOrderedGeneratedIllustrationPath(
    events,
    eventId,
    "EVT",
    GENERATED_LOCATION_EVENT_ROOT
  );
}

function getGeneratedRouteEventIllustrationCandidate(eventId) {
  if (routeEvents[eventId]) {
    return getOrderedGeneratedIllustrationPath(
      routeEvents,
      eventId,
      "RTE",
      GENERATED_ENCOUNTER_ROOT
    );
  }
  if (randomRouteEvents[eventId]) {
    return getOrderedGeneratedIllustrationPath(
      randomRouteEvents,
      eventId,
      "RND",
      GENERATED_ENCOUNTER_ROOT,
      { stripRandomPrefix: true }
    );
  }
  return "";
}

function getGeneratedCrisisIllustrationCandidate(type) {
  return getOrderedGeneratedIllustrationPath(
    crisisEvents,
    type,
    "CRS",
    GENERATED_ENCOUNTER_ROOT
  );
}

function getGeneratedEndingIllustrationCandidate(endingId) {
  if (endingId === "stranded" || endingId === "lost") {
    return `${GENERATED_ENCOUNTER_ROOT}/END-003_lost_stranded_迷失九州_旅途断绝.png`;
  }
  const endingOrder = ["rift", "return"];
  const serial = getGeneratedAssetIndex(endingOrder, endingId);
  if (!serial) return "";
  const title = endingId === "rift" ? "入裂隙" : "归中原";
  return `${GENERATED_ENCOUNTER_ROOT}/END-${serial}_${endingId}_${title}.png`;
}

function getReadyGeneratedIllustration(src) {
  if (!src) return "";
  return generatedIllustrationStatus.get(src) === "ready" ? src : "";
}

function collectGeneratedIllustrationCandidates() {
  return [
    ...Object.keys(locations).map(getGeneratedLocationIllustrationCandidate),
    ...Object.keys(events).map(getGeneratedEventIllustrationCandidate),
    ...Object.keys(routeEvents).map(getGeneratedRouteEventIllustrationCandidate),
    ...Object.keys(randomRouteEvents).map(getGeneratedRouteEventIllustrationCandidate),
    ...Object.keys(crisisEvents).map(getGeneratedCrisisIllustrationCandidate),
    getGeneratedEndingIllustrationCandidate("rift"),
    getGeneratedEndingIllustrationCandidate("return"),
    getGeneratedEndingIllustrationCandidate("stranded")
  ].filter(Boolean);
}

function preloadGeneratedIllustrations() {
  collectGeneratedIllustrationCandidates().forEach((src) => {
    preloadGeneratedImageCandidate(src, generatedIllustrationStatus, queueGeneratedStageBackgroundRefresh);
  });
}

function resolveStageProfile(profileId, terrain) {
  const profiles = getStageProfiles();
  const terrainProfileId = stageAssets.terrainProfiles?.[terrain] || "default";
  const defaultProfile = profiles.default || {};
  const terrainProfile = profiles[terrainProfileId] || {};
  const targetProfile = profiles[profileId] || {};
  return {
    ...defaultProfile,
    ...terrainProfile,
    ...targetProfile,
    id: profiles[profileId] ? profileId : terrainProfileId
  };
}

function getStageProfile(loc, route, nextLoc) {
  const terrain = route?.terrain || loc?.terrain || "road";
  const targetLocationId = nextLoc?.id || loc?.id;
  const profileId = stageAssets.locationProfiles?.[targetLocationId]
    || stageAssets.locationProfiles?.[loc?.id]
    || stageAssets.terrainProfiles?.[terrain]
    || "default";
  return resolveStageProfile(profileId, terrain);
}

function toCssUrl(src) {
  if (!src) return "";
  return `url("${String(src).replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}")`;
}

function setStageVar(name, value) {
  if (value === undefined || value === null || value === "") {
    el.stage.style.removeProperty(name);
    return;
  }
  el.stage.style.setProperty(name, String(value));
}

function setStageImageVar(name, src) {
  setStageVar(name, src ? toCssUrl(src) : "");
}

function getStagePhaseContext({ isTraveling = false, pending = null, nextRoute = null } = {}) {
  const loc = locations[state.currentLocation] || {};
  const locName = loc.name || "此地";
  if (state.status === "stranded") {
    return {
      phase: "stranded",
      tone: "danger",
      icon: "断",
      title: "旅途断绝",
      detail: "查看复盘或重开"
    };
  }
  if (state.status === "ended") {
    return {
      phase: "ending",
      tone: "ending",
      icon: "终",
      title: getEndingTitle(state.ending),
      detail: "旅程暂结，可查看复盘"
    };
  }
  if (state.status === "crisis") {
    return {
      phase: "crisis",
      tone: "danger",
      icon: "厄",
      title: "困厄",
      detail: "先完成求生补救"
    };
  }
  if (pending) {
    const routeEvent = getRouteEventById(state.pendingRoute?.eventId);
    return {
      phase: "route-event",
      tone: "warning",
      icon: "停",
      title: "半途路遇",
      detail: `${locations[pending.from]?.name || "此地"} → ${locations[pending.to]?.name || "彼处"} · ${routeEvent?.title || "异象拦路"}`
    };
  }
  if (isTraveling) {
    return {
      phase: "traveling",
      tone: "travel",
      icon: "行",
      title: "行路",
      detail: nextRoute
        ? `${locName} → ${locations[nextRoute.to]?.name || "远方"}`
        : `${locName} · 长图行进`
    };
  }

  const eventDone = !loc.event || Boolean(state.eventResults[loc.event]);
  if (!eventDone) {
    const event = events[loc.event];
    return {
      phase: "event",
      tone: "event",
      icon: "遇",
      title: "停靠",
      detail: `${locName} · ${event?.title || "当前遭遇"}`
    };
  }
  if (hasPendingFieldNoteAtCurrentLocation()) {
    return {
      phase: "field-note",
      tone: "event",
      icon: "采",
      title: "采风",
      detail: `${locName} · 选择如何入册`
    };
  }
  if (hasAvailableSupplyAtCurrentLocation()) {
    return {
      phase: "supply",
      tone: "supply",
      icon: "补",
      title: "补给",
      detail: `${locName} · 地利未取`
    };
  }

  const visibleRouteCount = getVisibleRoutesFromCurrent().filter((route) => canUseRoute(route)).length;
  if (visibleRouteCount) {
    return {
      phase: activeView === "map" ? "route-pick" : "route-ready",
      tone: "route",
      icon: "图",
      title: activeView === "map" ? "选路" : "可开图",
      detail: activeView === "map"
        ? `${visibleRouteCount} 条路线显现`
        : "打开九州图选择下一站"
    };
  }

  return {
    phase: "review",
    tone: "quiet",
    icon: "志",
    title: "整理采风",
    detail: `${locName} · 查采风册或复盘`
  };
}

function renderStagePhase(context) {
  if (!el.stagePhaseCard) return;
  const phase = getStagePhaseContext(context);
  el.stagePhaseCard.dataset.phase = phase.phase;
  el.stagePhaseCard.dataset.tone = phase.tone;
  el.stagePhaseCard.title = `${phase.title}：${phase.detail}`;
  if (el.stagePhaseIcon) el.stagePhaseIcon.textContent = phase.icon;
  if (el.stagePhaseTitle) el.stagePhaseTitle.textContent = phase.title;
  if (el.stagePhaseDetail) el.stagePhaseDetail.textContent = phase.detail;
  document.body.dataset.stagePhase = phase.phase;
}

function applyMapAssets() {
  if (!el.kyushuMap) return;
  const mapBackground = stageAssets.map?.background;
  if (mapBackground) {
    el.kyushuMap.style.setProperty("--map-bg-image", toCssUrl(mapBackground));
    el.kyushuMap.classList.add("has-map-art");
  } else {
    el.kyushuMap.style.removeProperty("--map-bg-image");
    el.kyushuMap.classList.remove("has-map-art");
  }
}

function getLocationIllustrationSrc(locationId) {
  const generated = getReadyGeneratedIllustration(getGeneratedLocationIllustrationCandidate(locationId));
  if (generated) return generated;
  return stageAssets.locationIllustrations?.[locationId] || "";
}

function getEventIllustrationSrc(eventId, locationId = state.currentLocation) {
  const generated = getReadyGeneratedIllustration(getGeneratedEventIllustrationCandidate(eventId));
  return generated
    || stageAssets.eventIllustrations?.[eventId]
    || getLocationIllustrationSrc(locationId)
    || "";
}

function getRouteEventIllustrationSrc(eventId, route) {
  const generated = getReadyGeneratedIllustration(getGeneratedRouteEventIllustrationCandidate(eventId));
  return generated
    || stageAssets.routeEventIllustrations?.[eventId]
    || getLocationIllustrationSrc(route?.to)
    || getLocationIllustrationSrc(route?.from)
    || "";
}

function getEndingIllustrationSrc(endingId) {
  const generated = getReadyGeneratedIllustration(getGeneratedEndingIllustrationCandidate(endingId));
  if (generated) return generated;
  return stageAssets.endingIllustrations?.[endingId] || "";
}

function getEndingTitle(endingId) {
  const definition = endingDefinitions[endingId] || "旅程暂结";
  return definition.split("：")[0] || definition;
}

function getEndingDetail(endingId) {
  if (endingId === "rift") {
    return "裂隙并不在远处，它是地图停止相信自己的地方。";
  }
  if (endingId === "return") {
    return "你们带着不完整的图回到人间，知道西边还有话没有写完。";
  }
  return endingDefinitions[endingId] || "本局已结束。";
}

function getRunSummaryText() {
  const meta = loadMeta();
  const fieldNoteCount = getFieldNoteCounts().total;
  const endingCount = meta.endings?.length || 0;
  const totalEndings = Math.max(1, Object.keys(endingDefinitions).length);
  return [
    `第 ${state.day} 日止`,
    `车轴 ${state.resources.axle}`,
    `粮草 ${state.resources.grain}`,
    `神志 ${state.resources.sanity}`,
    `采风 ${fieldNoteCount}`,
    `结局 ${endingCount}/${totalEndings}`
  ].join(" · ");
}

function getRunStatusLabel() {
  if (state.status === "ended") return getEndingTitle(state.ending);
  if (state.status === "stranded") return "旅途断绝";
  if (state.status === "crisis") return "濒死补救";
  if (state.pendingRoute) return "半途路遇";
  return "仍在路上";
}

function getRouteName(routeId) {
  return routes.find((route) => route.id === routeId)?.name || routeId;
}

function getResourceLine(source = state.resources) {
  const labels = { axle: "轴", grain: "粮", sanity: "神" };
  return resourceKeys
    .map((key) => `${labels[key] || key}${Number(source[key] ?? state.resources[key] ?? 0)}`)
    .join(" / ");
}

function getFieldNoteCounts() {
  const locationCount = state.discoveredLocations.filter((locationId) => locations[locationId]).length;
  const encounterCount = getEncounterMemories().length;
  const reportCount = getFieldNoteReportCount();
  return {
    location: locationCount,
    encounter: encounterCount,
    report: reportCount,
    total: locationCount + encounterCount + reportCount
  };
}

function getRunRecapData() {
  const stats = state.failureStats;
  const routeNames = state.traveledRoutes.map(getRouteName);
  const usedSupplyCount = Object.keys(state.usedSupplies || {}).length;
  const eventCount = Object.keys(state.eventResults || {}).length;
  const routeEventCount = Object.keys(state.routeEventResults || {}).length;
  const fieldNotes = getFieldNoteCounts();
  const minimums = state.resourceMinimums || state.resources;
  const lowest = resourceKeys
    .map((key) => ({ key, value: Number(minimums[key] ?? state.resources[key] ?? 0) }))
    .sort((a, b) => a.value - b.value)[0];
  const labels = { axle: "车轴", grain: "粮草", sanity: "神志" };
  return {
    status: getRunStatusLabel(),
    day: state.day,
    locationCount: state.discoveredLocations.length,
    fieldNoteCount: fieldNotes.total,
    locationFieldNoteCount: fieldNotes.location,
    encounterFieldNoteCount: fieldNotes.encounter,
    reportFieldNoteCount: fieldNotes.report,
    routeCount: state.traveledRoutes.length,
    eventCount,
    routeEventCount,
    usedSupplyCount,
    rescueCount: stats.rescues,
    currentResources: getResourceLine(state.resources),
    minimumResources: getResourceLine(minimums),
    lowestLabel: lowest ? `${labels[lowest.key] || lowest.key} ${lowest.value}` : "无",
    routeLine: routeNames.length ? routeNames.join(" → ") : "尚未离开中原驿",
    latestLog: state.log.slice(0, 3),
    fieldNoteConsequenceLines: getFieldNoteConsequenceLines(),
    fieldNoteConsequenceSummary: getFieldNoteConsequenceSummary()
  };
}

function getRunRecapText() {
  const recap = getRunRecapData();
  return [
    "《不思异：九州》试玩复盘",
    `试玩编号：${getPlaytestRunCode()}`,
    `状态：${recap.status} · 第 ${recap.day} 日 · 地点 ${recap.locationCount} · 采风 ${recap.fieldNoteCount} · 路线 ${recap.routeCount}`,
    `采风：地风 ${recap.locationFieldNoteCount} · 异闻 ${recap.encounterFieldNoteCount} · 写法 ${recap.reportFieldNoteCount}`,
    `王朝案牍：${recap.fieldNoteConsequenceSummary}`,
    `互动：事件 ${recap.eventCount} · 路遇 ${recap.routeEventCount} · 补给 ${recap.usedSupplyCount} · 补救 ${recap.rescueCount}`,
    `资源：当前 ${recap.currentResources} · 最低 ${recap.minimumResources} · 最低项 ${recap.lowestLabel}`,
    `路线：${recap.routeLine}`,
    `近志：${recap.latestLog.join(" / ") || "暂无"}`
  ].join("\n");
}

function getPlaytestFeedbackPackageText() {
  const recap = getRunRecapData();
  return [
    "《不思异：九州》P0 试玩反馈包",
    "",
    `试玩编号：${getPlaytestRunCode()}`,
    "试玩者：",
    "设备/浏览器：",
    "试玩时长：",
    "",
    "【本局复盘】",
    getRunRecapText(),
    "",
    "【主观反馈】",
    "1. 是否看懂下一步要做什么：",
    "2. 车轴/粮草/神志是否形成了资源压力：",
    "3. 是否愿意再走一站，原因是：",
    "4. 采风入册是否有成就感，是否知道自己是采风使：",
    "5. 山海经/神秘九州感觉最强的一处是：",
    "6. UI 是否仍有网页感、拥挤或不好点的地方：",
    "7. 音乐、环境声、神志低落声音是否有帮助：",
    "8. 第一眼是否知道可以打开声音：知道 / 没注意 / 打开后才知道",
    "9. 最想保留的一处：",
    "10. 最想马上改的一处：",
    "",
    "【机器摘要】",
    `状态：${recap.status}`,
    `采风条数：${recap.fieldNoteCount}（地风 ${recap.locationFieldNoteCount} / 异闻 ${recap.encounterFieldNoteCount} / 写法 ${recap.reportFieldNoteCount}）`,
    `王朝案牍：${recap.fieldNoteConsequenceSummary}`,
    `资源最低项：${recap.lowestLabel}`,
    `路线段数：${recap.routeCount}`,
    `补给次数：${recap.usedSupplyCount}`,
    `路遇次数：${recap.routeEventCount}`
  ].join("\n");
}

function getRunRecapModalText() {
  const recap = getRunRecapData();
  return [
    `第 ${recap.day} 日 · 显影 ${recap.locationCount} 处 · 采风 ${recap.fieldNoteCount} 条 · 行过 ${recap.routeCount} 段路。`,
    `互动：事件 ${recap.eventCount} · 路遇 ${recap.routeEventCount} · 补给 ${recap.usedSupplyCount} · 补救 ${recap.rescueCount}。`,
    `采风：地风 ${recap.locationFieldNoteCount} · 异闻 ${recap.encounterFieldNoteCount} · 写法 ${recap.reportFieldNoteCount}。`,
    `王朝案牍：${recap.fieldNoteConsequenceSummary}`,
    `当前资源：${recap.currentResources}。`,
    `最低压力：${recap.minimumResources}，最低项为 ${recap.lowestLabel}。`,
    `路线：${recap.routeLine}。`
  ].join("\n");
}

function showRunRecapModal() {
  const recap = getRunRecapData();
  const endingKey = state.status === "ended" ? state.ending : "";
  setStoryResultModal({
    kicker: "本局复盘",
    title: recap.status,
    verse: "九州一局，归于简册；车辙犹在，雾色未收。",
    text: getRunRecapModalText(),
    meta: `采风 ${recap.fieldNoteCount} 条 · 最低项 ${recap.lowestLabel} · 近志 ${recap.latestLog.length} 条`,
    artSrc: endingKey ? getEndingIllustrationSrc(endingKey) : getLocationIllustrationSrc(state.currentLocation),
    actions: [
      { kind: "copy-recap", badge: "录", label: "复制复盘", hint: "直接复制给试玩记录。", className: "ending-action-card ending-copy" },
      { kind: "copy-feedback", badge: "测", label: "复制反馈包", hint: "含复盘、声音和主观问题。", className: "ending-action-card ending-copy" },
      { kind: "feedback-form", badge: "填", label: "填写反馈", hint: "没通关或要补主观感受时使用。", className: "ending-action-card ending-feedback" },
      { kind: "log", badge: "册", label: "采风册", hint: "查看地点采风、异闻采风与近志。", className: "ending-action-card ending-log" },
      { kind: "restart", badge: "再", label: "重开一局", hint: "保留采风与结局记录，回到中原驿。", className: "ending-action-card" }
    ]
  });
  renderStoryModal("event");
}

function renderRunRecap() {
  if (!el.runRecapCard) return;
  const recap = getRunRecapData();
  el.runRecapTitle.textContent = recap.status;
  el.runRecapStats.innerHTML = [
    ["日", recap.day],
    ["地", recap.locationCount],
    ["采", recap.fieldNoteCount],
    ["路", recap.routeCount],
    ["遇", recap.routeEventCount],
    ["补", recap.usedSupplyCount],
    ["救", recap.rescueCount]
  ].map(([label, value]) => `<span><b>${label}</b>${escapeHtml(String(value))}</span>`).join("");
  el.runRecapRoute.textContent = `路线：${recap.routeLine}`;
  el.runRecapPressure.textContent = `资源：当前 ${recap.currentResources} · 最低 ${recap.minimumResources}`;
  el.runRecapCopyButton.textContent = "复制";
  el.runRecapCopyState.textContent = "可复制给测试记录。";
  if (el.runFeedbackLink) {
    el.runFeedbackLink.href = getFeedbackFormUrl({ source: "recap" });
  }
}

function renderDiscoveryGallery() {
  if (!el.discoveryGallery) return;
  const discovered = state.discoveredLocations.filter((locationId) => locations[locationId]);
  const total = Object.keys(locations).length;
  if (el.discoveryGalleryCount) {
    el.discoveryGalleryCount.textContent = `${discovered.length} / ${total}`;
  }
  if (!discovered.length) {
    el.discoveryGallery.innerHTML = `<p class="discovery-gallery-empty">尚未采到地点风物。</p>`;
    return;
  }
  el.discoveryGallery.innerHTML = discovered.map((locationId) => {
    const loc = locations[locationId];
    const artSrc = getLocationIllustrationSrc(locationId);
    const terrainLabel = formatTerrainAudioLabel(loc.terrain);
    const report = state.fieldNoteReports?.[getFieldNoteKey(locationId)];
    const profile = getFieldNoteProfile(locationId);
    const reportLabel = report?.label ? ` · ${report.label}` : "";
    const subjectLabel = report?.subject || profile?.subject || "";
    return `
      <button class="discovery-card" type="button" data-discovery-location="${escapeHtml(locationId)}" role="listitem">
        ${artSrc ? `<span class="discovery-card-art"><img src="${escapeHtml(artSrc)}" alt="" onerror="this.closest('.discovery-card-art').hidden = true;" /></span>` : ""}
        <span class="discovery-card-copy">
          <strong>${escapeHtml(loc.name || locationId)}</strong>
          <small>${escapeHtml(`${subjectLabel || terrainLabel}${reportLabel}`)}</small>
        </span>
      </button>
    `;
  }).join("");
  el.discoveryGallery.querySelectorAll("[data-discovery-location]").forEach((button) => {
    button.addEventListener("click", () => openLocationMemory(button.dataset.discoveryLocation));
  });
}

function renderEncounterGallery() {
  if (!el.encounterGallery) return;
  const memories = getEncounterMemories();
  const total = Object.keys(events).length + Object.keys(allRouteEvents).length;
  if (el.encounterGalleryCount) {
    el.encounterGalleryCount.textContent = `${memories.length} / ${total}`;
  }
  if (!memories.length) {
    el.encounterGallery.innerHTML = `<p class="discovery-gallery-empty">处理遭遇后会收入异闻采风。</p>`;
    return;
  }
  el.encounterGallery.innerHTML = memories.map((memory) => `
    <button
      class="discovery-card encounter-card"
      type="button"
      data-encounter-kind="${escapeHtml(memory.kind)}"
      data-encounter-id="${escapeHtml(memory.id)}"
      data-encounter-route="${escapeHtml(memory.routeId || "")}">
      ${memory.artSrc ? `<span class="discovery-card-art"><img src="${escapeHtml(memory.artSrc)}" alt="" onerror="this.closest('.discovery-card-art').hidden = true;" /></span>` : ""}
      <span class="discovery-card-copy">
        <strong>${escapeHtml(memory.title)}</strong>
        <small>${escapeHtml(memory.label)} · ${escapeHtml(memory.meta)}</small>
      </span>
    </button>
  `).join("");
  el.encounterGallery.querySelectorAll("[data-encounter-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openEncounterMemory(
        button.dataset.encounterKind,
        button.dataset.encounterId,
        button.dataset.encounterRoute
      );
    });
  });
}

async function writeTextToClipboard(text) {
  if (globalThis.navigator?.clipboard?.writeText) {
    await globalThis.navigator.clipboard.writeText(text);
    return true;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, text.length);
  let copied = false;
  try {
    copied = Boolean(document.queryCommandSupported?.("copy")) && document.execCommand("copy");
  } finally {
    textArea.remove();
  }
  if (!copied) throw new Error("copy rejected");
  return copied;
}

function setModalActionFeedback(button, label, hint) {
  if (!button) return;
  const strong = button.querySelector("strong");
  const hintNode = button.querySelector(".choice-hint");
  if (strong) strong.textContent = label;
  if (hintNode) hintNode.textContent = hint;
}

function clearRecapCopyFallback() {
  document.querySelector("#storyModalCopyFallback")?.remove();
}

function showRecapCopyFallback(text) {
  if (!el.storyModalPanel || !el.storyModalChoices) return;
  clearRecapCopyFallback();
  const textArea = document.createElement("textarea");
  textArea.id = "storyModalCopyFallback";
  textArea.className = "story-modal-copy-fallback";
  textArea.value = text;
  textArea.readOnly = true;
  textArea.setAttribute("aria-label", "本局复盘文本");
  el.storyModalPanel.insertBefore(textArea, el.storyModalChoices);
  window.setTimeout(() => {
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);
  }, 0);
}

function getAudioReviewTemplateText() {
  const activeLocationId = getCurrentAudioLocationId();
  const activeTerrain = getCurrentAudioTerrain();
  const activeMusicKey = getActiveMusicKey();
  const activeAsset = audioAssets[activeMusicKey] || {};
  const audioReviewUrl = getAudioReviewWorkbenchUrl({ source: "game-settings" });
  const musicChoices = getMusicKeys()
    .map((key) => audioAssets[key]?.id)
    .filter(Boolean)
    .join(" / ");
  const ambienceAssets = Object.values(audioAssets)
    .filter((asset) => asset.type === "ambience" && asset.src && asset.status !== "missing")
    .map((asset) => asset.id)
    .join(" / ") || "未接入";
  const sanityAssets = ["sanityLight", "sanityLow"]
    .map((key) => audioAssets[key]?.id)
    .filter(Boolean)
    .join(" / ") || "未接入";
  return [
    "《不思异：九州》音频听感复核",
    "",
    `试玩编号：${getPlaytestRunCode()}`,
    `听音入口：${audioReviewUrl}`,
    "试听者：",
    "设备/耳机或外放：",
    `当前地点：${locations[activeLocationId]?.name || activeLocationId || "未知"}`,
    `当前地形：${formatTerrainAudioLabel(activeTerrain)}`,
    `当前音乐：${activeAsset.id || "未接入"} ${activeAsset.name || ""}`.trim(),
    `可试听音乐：${musicChoices || "未接入"}`,
    getAudioReviewProgressLine(),
    `本轮试听标记：${getAudioReviewMarksSummary()}`,
    `旅途环境层：${ambienceAssets}`,
    `神志层：${sanityAssets}`,
    "",
    "1. 当前主音乐是否适合第一章行旅：",
    "2. 最想保留哪首音乐，最想删哪首：",
    "3. 第一眼是否知道可以打开声音：知道 / 没注意 / 打开后才知道",
    "4. 旅途环境层是否加分：太弱 / 正好 / 太吵 / 需要替换",
    "5. 神志低时的声音是否能感觉到不对劲：",
    "6. 地图打开、选路、抵达、资源变化的短音效是否清楚：",
    "7. 哪个声音最打扰：",
    "8. 哪个声音最有山海九州感：",
    "9. 是否愿意默认开低音量音乐：",
    "",
    "备注："
  ].join("\n");
}

function showAudioReviewCopyFallback(text) {
  if (!el.audioReviewCopyFallback) return;
  el.audioReviewCopyFallback.hidden = false;
  el.audioReviewCopyFallback.value = text;
  window.setTimeout(() => {
    el.audioReviewCopyFallback.focus();
    el.audioReviewCopyFallback.select();
    el.audioReviewCopyFallback.setSelectionRange(0, text.length);
  }, 0);
}

async function copyAudioReviewTemplateToClipboard() {
  const text = getAudioReviewTemplateText();
  try {
    await writeTextToClipboard(text);
    if (el.audioReviewCopyButton) el.audioReviewCopyButton.textContent = "听感模板已复制";
    if (el.audioReviewCopyState) el.audioReviewCopyState.textContent = "可粘贴给主线程复核音乐与音效。";
    if (el.audioReviewCopyFallback) el.audioReviewCopyFallback.hidden = true;
    setActionFeedback({
      phase: "done",
      tone: "milestone",
      kicker: "听感",
      title: "模板已复制",
      detail: "音乐、环境层和短音效反馈模板已写入剪贴板。"
    });
  } catch {
    if (el.audioReviewCopyButton) el.audioReviewCopyButton.textContent = "文本已展开";
    if (el.audioReviewCopyState) el.audioReviewCopyState.textContent = "浏览器未放行复制，已展开文本。";
    showAudioReviewCopyFallback(text);
  }
}

async function copyRunRecapToClipboard(options = {}) {
  const text = getRunRecapText();
  try {
    await writeTextToClipboard(text);
    if (el.runRecapCopyButton) el.runRecapCopyButton.textContent = "已复制";
    if (el.runRecapCopyState) el.runRecapCopyState.textContent = "复盘已复制。";
    setModalActionFeedback(options.button, "已复制", "可粘贴到试玩记录。");
    setActionFeedback({
      phase: "done",
      tone: "milestone",
      kicker: "复盘",
      title: "已复制",
      detail: "本局路线、资源和日志摘要已写入剪贴板。"
    });
  } catch {
    if (el.runRecapCopyButton) el.runRecapCopyButton.textContent = "不可复制";
    if (el.runRecapCopyState) el.runRecapCopyState.textContent = "浏览器未放行复制，已展开文本。";
    showRecapCopyFallback(text);
    setModalActionFeedback(options.button, "文本已展开", "已选中文本，可手动复制。");
  }
}

async function copyPlaytestFeedbackPackageToClipboard(options = {}) {
  const text = getPlaytestFeedbackPackageText();
  try {
    await writeTextToClipboard(text);
    markPlaytestFeedbackOpened();
    setModalActionFeedback(options.button, "反馈包已复制", "可直接粘贴给主线程。");
    setActionFeedback({
      phase: "done",
      tone: "milestone",
      kicker: "反馈包",
      title: "已复制",
      detail: "本局复盘、声音问题和主观反馈字段已写入剪贴板。"
    });
  } catch {
    showRecapCopyFallback(text);
    setModalActionFeedback(options.button, "文本已展开", "已选中文本，可手动复制。");
  }
}

function getNewEndingIdBeforeSave() {
  if (state.status !== "ended" || !state.ending) return "";
  return loadMeta().endings.includes(state.ending) ? "" : state.ending;
}

function queueEndingMilestone(endingId) {
  if (!endingId) return;
  queueMilestoneAlert("结局收录", getEndingTitle(endingId));
}

function getFailureIllustrationSrc(failureType) {
  const generated = getReadyGeneratedIllustration(getGeneratedCrisisIllustrationCandidate(failureType));
  if (generated) return generated;
  return stageAssets.failureIllustrations?.[failureType] || "";
}

function renderEventArt(src, altText = "") {
  if (!el.eventArtFrame || !el.eventArt) return;
  if (!src) {
    el.eventArtFrame.hidden = true;
    el.eventArt.removeAttribute("src");
    el.eventArt.alt = "";
    return;
  }
  if (el.eventArt.getAttribute("src") !== src) {
    el.eventArt.src = src;
  }
  el.eventArt.alt = altText;
  el.eventArtFrame.hidden = false;
}

function applyStageProfile(profile = {}) {
  el.stage.classList.add("stage-mapped");
  el.stage.dataset.stageProfile = profile.id || "default";
  el.stage.dataset.stageLabel = profile.label || "";
  const readyGeneratedBackground = getReadyGeneratedStageBackground(profile);
  el.stage.dataset.generatedBackground = readyGeneratedBackground ? "ready" : "fallback";
  const travelMode = profile.travelMode || (profile.sceneryFirst ? "scenery" : "caravan");
  el.stage.dataset.travelMode = travelMode;
  el.stage.classList.toggle("scenery-first", travelMode === "scenery");
  setStageImageVar("--stage-bg-image", readyGeneratedBackground || profile.background);
  setStageVar("--stage-bg-position", profile.backgroundPosition || "center");
  setStageVar("--stage-bg-opacity", profile.backgroundOpacity ?? 0.98);
  setStageVar("--stage-bg-filter", profile.backgroundFilter || "none");
  setStageImageVar("--stage-foreground-image", profile.foreground);
  setStageVar("--stage-foreground-opacity", profile.foregroundOpacity ?? 0.66);
  setStageVar("--stage-foreground-position", profile.foregroundPosition || "center bottom");
  setStageVar("--stage-foreground-blend", profile.foregroundBlend || "multiply");
  setStageImageVar("--stage-atmosphere-image", profile.atmosphere);
  setStageVar("--stage-atmosphere-opacity", profile.atmosphereOpacity ?? 0.24);
  setStageVar("--stage-atmosphere-blend", profile.atmosphereBlend || "screen");
  setStageImageVar("--stage-pollution-image", profile.pollution);
  setStageVar("--stage-pollution-opacity", profile.pollutionOpacity ?? 0.34);
  setStageVar("--stage-pollution-blend", profile.pollutionBlend || "screen");
  setStageVar("--stage-caravan-width", profile.caravanWidth || "clamp(190px, 28vw, 460px)");
  setStageVar("--stage-caravan-bottom", profile.caravanBottom || "12%");
  setStageVar("--stage-caravan-filter", profile.caravanFilter || "contrast(1.18) saturate(0.78)");
  setStageVar("--stage-caravan-opacity", profile.caravanOpacity ?? 0.92);
  if (profile.caravan && el.caravanArt.getAttribute("src") !== profile.caravan) {
    el.caravan.classList.remove("has-art");
    el.caravanArt.src = profile.caravan;
  }
  if (el.caravanArt.complete && el.caravanArt.naturalWidth > 0) {
    el.caravan.classList.add("has-art");
  }
}

function getLockedHintText(route) {
  return route.lockedHintShort || route.lockedHint || "条件不足，路线尚未显明。";
}

function getSupplyKey(locationId, supplyId) {
  return `${locationId}:${supplyId}`;
}

function getSuppliesForCurrent() {
  const loc = locations[state.currentLocation];
  return (loc?.supplies || []).map((supply) => ({
    ...supply,
    used: Boolean(state.usedSupplies[getSupplyKey(loc.id, supply.id)]),
    blockedThisArrival: Boolean(state.arrivalSupplyUsed)
  }));
}

function hasAvailableSupplyAtCurrentLocation() {
  return getSuppliesForCurrent().some((supply) => !supply.used && !supply.blockedThisArrival);
}

function markRouteTraveled(routeId) {
  addUniqueIds(state.traveledRoutes, [routeId]);
  state.hintedRoutes = state.hintedRoutes.filter((id) => id !== routeId);
}

function isRevealFresh() {
  const at = state.lastReveal?.at || 0;
  return at && Date.now() - at <= REVEAL_ANIMATION_MS;
}

function wasJustRevealed(kind, id) {
  if (!isRevealFresh()) return false;
  return (state.lastReveal?.[kind] || []).includes(id);
}

function getVisibleRoutesFromCurrent() {
  const currentRoutes = getRoutesFromCurrent();
  const visibleRoutes = currentRoutes.filter((route) => state.revealedRoutes.includes(route.id));
  return visibleRoutes.length ? visibleRoutes : currentRoutes;
}

function getVisibleRouteToLocationFromCurrent(locationId) {
  return getVisibleRoutesFromCurrent().find((route) => route.to === locationId);
}

function getRouteVisibility(route) {
  const isPending = state.pendingRoute?.routeId === route.id;
  const isTraveled = state.traveledRoutes.includes(route.id);
  const isCurrent = route.from === state.currentLocation;
  const isRevealed = state.revealedRoutes.includes(route.id);
  const isHinted = state.hintedRoutes.includes(route.id) && !isRevealed && !isTraveled;

  if (isPending) return "pending";
  if (isTraveled) return "traveled";
  if (isCurrent && isRevealed) return canUseRoute(route) ? "reachable" : "locked";
  if (isHinted) return "fogged";
  return "hidden";
}

function getLocationVisibility(locationId) {
  const currentRoute = getVisibleRouteToLocationFromCurrent(locationId);
  const pendingRoute = state.pendingRoute
    ? routes.find((route) => route.id === state.pendingRoute.routeId)
    : null;

  if (locationId === state.currentLocation) return "current";
  if (pendingRoute?.to === locationId) return "pending";
  if (currentRoute) return canUseRoute(currentRoute) ? "reachable" : "locked";
  if (state.discoveredLocations.includes(locationId)) return "visited";
  if (state.hintedLocations.includes(locationId)) return "fogged";
  return "hidden";
}

function getFogLabel(locationId) {
  return {
    name: "雾中城影",
    hint: "纸雾未散，只能看出一点地势。",
    ...(fogLabels[locationId] || {})
  };
}

function discoverLocation(locationId) {
  if (!locations[locationId] || state.discoveredLocations.includes(locationId)) return false;
  state.discoveredLocations.push(locationId);
  state.log.unshift(
    `采风入册：${locations[locationId].name} 已录入采风册（${state.discoveredLocations.length}/${Object.keys(locations).length}）。`
  );
  trimLog();
  return true;
}

function getUnresolvedCurrentEventContext() {
  const loc = locations[state.currentLocation];
  if (
    state.status !== "playing"
    || state.pendingRoute
    || !loc?.event
    || state.eventResults[loc.event]
  ) {
    return null;
  }
  const event = events[loc.event];
  return event ? { loc, event } : null;
}

function blockRouteUntilCurrentEventHandled(route) {
  const context = getUnresolvedCurrentEventContext();
  const destinationName = locations[route.to]?.name || "下一站";
  if (!context && !hasPendingFieldNoteAtCurrentLocation()) return false;
  storyResultOverride = null;
  decisionModalDismissedKey = "";
  textPanelState = { location: false, event: true };
  setActiveView("town");
  if (!context) {
    const loc = locations[state.currentLocation];
    state.log.unshift(`起行暂缓：先把 ${loc.name} 的见闻写入采风册，再前往 ${destinationName}。`);
    trimLog();
    saveState();
    setActionFeedback({
      phase: "blocked",
      tone: "event",
      kicker: "采风未记",
      title: "先采风入册",
      detail: `${loc.name} 的遭遇已经处理，但还没有决定如何写入采风册。入册后，再从九州图选择去 ${destinationName}。`
    });
    queueActionFeedbackReset();
    render();
    return true;
  }
  state.log.unshift(
    `起行暂缓：先处理 ${context.loc.name} 的「${context.event.title}」，再前往 ${destinationName}。`
  );
  trimLog();
  saveState();
  setActionFeedback({
    phase: "blocked",
    tone: "event",
    kicker: "遭遇未决",
    title: "先处理当前遭遇",
    detail: `${context.loc.name} 的「${context.event.title}」还没有落账。处理后，再从九州图选择去 ${destinationName}。`
  });
  queueActionFeedbackReset();
  render();
  return true;
}

async function useSupply(supplyId) {
  if (actionBusy || state.status !== "playing" || state.pendingRoute) return;
  if (hasPendingFieldNoteAtCurrentLocation()) {
    const loc = locations[state.currentLocation];
    textPanelState = { location: false, event: true };
    setActionFeedback({
      phase: "blocked",
      tone: "event",
      kicker: "采风未记",
      title: "先采风入册",
      detail: `${loc.name} 的遭遇已处理，先决定如何写入采风册，再安排补给。`
    });
    queueActionFeedbackReset();
    render();
    return;
  }
  selectedRoute = null;
  const loc = locations[state.currentLocation];
  const supply = (loc?.supplies || []).find((item) => item.id === supplyId);
  if (!supply) return;
  const supplyKey = getSupplyKey(loc.id, supply.id);
  if (state.usedSupplies[supplyKey] || state.arrivalSupplyUsed) return;
  const process = describeSupplyProcess(loc, supply);
  autoUnlockAudioFromGesture();
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "supply" });
  playElement("select");
  await waitForActionProcess(620);
  playSfx(audioHooks.supplyComplete || "supplyComplete", "resourceUp");
  applyDelta(supply.effect, "supply");
  state.usedSupplies[supplyKey] = true;
  state.arrivalSupplyUsed = true;
  if (loc.supplyDiscoveryText) {
    state.log.unshift(`补给发现：${loc.supplyDiscoveryText}`);
  }
  state.log.unshift(`补给：${supply.result}`);
  state.log.unshift(`本次抵达 ${loc.name} 已完成一次补给。`);
  checkResourceFailure();
  trimLog();
  saveState();
  setActionBusy(false);
  setActionFeedback({
    phase: "done",
    tone: "supply",
    kicker: loc.name,
    title: "补给完成",
    detail: `${loc.supplyDiscoveryText || supply.result} ${formatSupplyDeltaCompact(supply.effect)}`,
    delta: supply.effect
  });
  render();
  queueActionFeedbackReset();
}

function isRoutePreviewSelected(route) {
  return Boolean(
    route
    && selectedRoute?.id === route.id
    && selectedRoute?.from === state.currentLocation
    && state.status === "playing"
    && !state.pendingRoute
  );
}

function previewRoute(route) {
  selectedRoute = route;
  autoUnlockAudioFromGesture();
  playElement("select");
  setActionFeedback({
    phase: "done",
    tone: "route",
    kicker: "路线已选",
    title: getRouteDisplayName(route),
    detail: `再点一次启程。${formatCostShort(route.cost)} · ${formatRouteEventShort(route)}。`
  });
  render();
}

function confirmRoute(routeId) {
  if (actionBusy || state.status !== "playing" || state.pendingRoute) return;
  const route = routes.find((item) => item.id === routeId);
  if (!route) return;
  if (
    route.from !== state.currentLocation
    || !state.revealedRoutes.includes(route.id)
    || !canUseRoute(route)
    || getUnresolvedCurrentEventContext()
  ) {
    move(routeId);
    return;
  }
  if (!isRoutePreviewSelected(route)) {
    previewRoute(route);
    return;
  }
  move(routeId);
}

async function move(routeId) {
  if (actionBusy || state.status !== "playing" || state.pendingRoute) return;
  const route = routes.find((item) => item.id === routeId);
  if (!route) return;
  if (route.from !== state.currentLocation || !state.revealedRoutes.includes(route.id)) {
    state.log.unshift(`${route.name} 仍在雾里，当前舆图还没有描出这条路。`);
    setActionFeedback({
      phase: "blocked",
      tone: "warning",
      kicker: "雾路",
      title: "路线未显",
      detail: `${route.name} 还没有被九州图描出，不能贸然起行。`
    });
    queueActionFeedbackReset();
    trimLog();
    saveState();
    render();
    return;
  }
  if (!canUseRoute(route)) {
    state.log.unshift(`${route.name} 尚未显明：${route.lockedHint || "条件不足"}。`);
    setActionFeedback({
      phase: "blocked",
      tone: "warning",
      kicker: "未显",
      title: getRouteDisplayName(route),
      detail: route.lockedHint || "条件不足，队伍不敢走这条路。"
    });
    queueActionFeedbackReset();
    trimLog();
    saveState();
    render();
    return;
  }
  if (blockRouteUntilCurrentEventHandled(route)) return;
  const process = describeRouteProcess(route);
  autoUnlockAudioFromGesture();
  resetTextPanels();
  setActiveView("town");
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "route" });
  playElement("select");
  await waitForActionProcess(520);
  selectedRoute = route;
  playSfx(audioHooks.routeSelect || "routeSelect", "select");
  applyDelta(route.cost, "route");
  state.day += 1;
  state.log.unshift(
    `第 ${state.day} 日：${route.name}，${formatCost(route.cost)}。`
  );
  trimLog();
  render(true);

  window.setTimeout(
    () => {
      const routeEventId = selectRouteEventId(route);
      const routeEvent = getRouteEventById(routeEventId);
      if (routeEvent) {
        state.pendingRoute = { routeId: route.id, eventId: routeEventId };
        resetTextPanels();
        state.log.unshift(`半途停下：${routeEvent.title}。`);
        trimLog();
        saveState();
        setActionBusy(false);
        setActionFeedback({
          phase: "done",
          tone: "warning",
          kicker: "半途",
          title: routeEvent.title,
          detail: `${locations[route.from].name} 到 ${locations[route.to].name} 之间，队伍被迫停下。`,
          delta: route.cost
        });
        render();
        queueActionFeedbackReset();
        return;
      }
      setActionBusy(false);
      completeRoute(route);
      setActionFeedback({
        phase: "done",
        tone: "route",
        kicker: locations[route.to].name,
        title: "抵达下一站",
        detail: `车队抵达 ${locations[route.to].name}，新的地点志和补给机会已经刷新。`,
        delta: route.cost
      });
      queueActionFeedbackReset();
    },
    motionEnabled ? 780 : 0
  );
}

function completeRoute(route) {
  if (!route) return;
  state.currentLocation = route.to;
  selectedRoute = null;
  state.pendingRoute = null;
  resetTextPanels();
  state.arrivalSupplyUsed = false;
  poetryFallbackSpin = 0;
  poetryState = createPoetryFallbackState(state.currentLocation, "idle");
  markRouteTraveled(route.id);
  const destination = locations[state.currentLocation];
  const discoveredNow = discoverLocation(state.currentLocation);
  playSfx(audioHooks.locationArrive);
  const revealResult = applyRevealForLocation(state, state.currentLocation, { markLastReveal: true });
  let revealedCount = 0;
  if (revealResult.routeIds.length || revealResult.fogLocationIds.length || revealResult.fogRouteIds.length) {
    const revealText = state.resources.sanity < 35 && revealResult.lowSanityRevealText
      ? revealResult.lowSanityRevealText
      : revealResult.revealTextShort || revealResult.revealText;
    state.log.unshift(
      revealText
        ? `地图显影：${revealText}`
        : `地图显影：${locations[state.currentLocation].name} 周遭新路浮出。`
    );
    revealedCount = revealResult.routeIds.length + revealResult.fogRouteIds.length;
    window.setTimeout(() => playSfx(audioHooks.mapReveal), 120);
  }
  const enteredCrisis = checkResourceFailure();
  if (discoveredNow || revealedCount || revealResult.fogLocationIds.length) {
    const milestoneTitle = [
      discoveredNow ? `${destination.name} 入志` : "",
      revealedCount ? `新路 ${revealedCount} 条` : "",
      !revealedCount && revealResult.fogLocationIds.length ? "雾中城影" : ""
    ].filter(Boolean).join(" · ");
    queueMilestoneAlert(
      `采风 ${state.discoveredLocations.length}/${Object.keys(locations).length}`,
      milestoneTitle
    );
  }
  if (destination.arrivalText) {
    state.log.unshift(`采风见闻：${destination.arrivalText}`);
  }
  state.log.unshift(
    enteredCrisis
      ? `勉强抵达 ${destination.name}，但队伍已到极限。`
      : `抵达 ${destination.name}。`
  );
  trimLog();
  saveState();
  render();
}

async function choose(index) {
  if (actionBusy) return;
  if (state.status === "crisis") {
    await resolveCrisis(index);
    return;
  }
  if (state.status !== "playing") return;
  if (state.pendingRoute) {
    await resolveRouteEvent(index);
    return;
  }
  if (hasPendingFieldNoteAtCurrentLocation()) {
    await resolveFieldNote(index);
    return;
  }
  const eventId = locations[state.currentLocation].event;
  const event = events[eventId];
  const visibleChoices = getVisibleChoices(event);
  const choice = visibleChoices[index];
  if (!choice) return;
  const process = describeChoiceProcess(choice);
  autoUnlockAudioFromGesture();
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "event" });
  playElement("select");
  await waitForActionProcess(560);
  applyDelta(choice.effect, "event");
  state.eventResults[eventId] = choice.result;
  setStoryResultModal({
    kicker: "结果",
    title: choice.label,
    text: choice.result,
    verse: formatSceneVerse(getEventVerse(eventId)),
    artSrc: getEventIllustrationSrc(eventId, state.currentLocation),
    meta: `${locations[state.currentLocation]?.name || "此地"} · ${event.title}`,
    effect: choice.effect
  });
  state.log.unshift(choice.result);
  const unlockedEndingId = getNewEndingIdBeforeSave();
  if (state.status === "ended") {
    state.log.unshift(`结局：${endingDefinitions[state.ending] || state.ending}`);
  } else {
    checkResourceFailure();
  }
  trimLog();
  saveState();
  queueEndingMilestone(unlockedEndingId);
  setActionBusy(false);
  setActionFeedback({
    phase: "done",
    tone: state.status === "ended" ? "warning" : "event",
    kicker: "结果",
    title: choice.label,
    detail: choice.result,
    delta: choice.effect
  });
  render();
  queueActionFeedbackReset();
}

async function resolveFieldNote(index) {
  if (actionBusy) return;
  const loc = locations[state.currentLocation];
  const choices = getFieldNoteChoices(loc?.id);
  const choice = choices[index];
  if (!loc || !choice) return;
  const process = {
    title: choice.label,
    detail: choice.hint || "写入采风册。"
  };
  autoUnlockAudioFromGesture();
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "event" });
  playElement("select");
  await waitForActionProcess(420);
  applyDelta(choice.effect, "event");
  state.fieldNoteReports[getFieldNoteKey(loc.id)] = {
    style: choice.fieldNoteStyle,
    category: choice.fieldNoteCategory,
    subject: choice.fieldNoteSubject,
    evidence: choice.fieldNoteEvidence,
    label: choice.label,
    text: choice.result,
    day: state.day,
    resources: { ...state.resources }
  };
  setStoryResultModal({
    kicker: "采风入册",
    title: choice.fieldNoteSubject ? `${choice.fieldNoteSubject} · ${choice.label}` : choice.label,
    text: `${choice.result}\n\n这不是游记的一行，而是你交给王朝的第一种说法。`,
    verse: "朝命西行，采风成册；一字入简，一地有命。",
    artSrc: getLocationIllustrationSrc(loc.id),
    meta: [loc.name, choice.fieldNoteCategory, choice.badge, "采风写法"].filter(Boolean).join(" · "),
    effect: choice.effect
  });
  state.log.unshift(`采风入册：${getFieldNoteReportLine(loc.id, state.fieldNoteReports[getFieldNoteKey(loc.id)])}`);
  trimLog();
  saveState();
  setActionBusy(false);
  setActionFeedback({
    phase: "done",
    tone: "event",
    kicker: "采风",
    title: choice.label,
    detail: choice.result,
    delta: choice.effect
  });
  render();
  queueActionFeedbackReset();
}

async function resolveRouteEvent(index) {
  if (actionBusy) return;
  const pending = state.pendingRoute;
  const route = routes.find((item) => item.id === pending?.routeId);
  const routeEvent = getRouteEventById(pending?.eventId);
  const visibleChoices = getVisibleChoices(routeEvent);
  const choice = visibleChoices[index];
  if (!route || !routeEvent || !choice) return;
  const process = describeChoiceProcess(choice);
  autoUnlockAudioFromGesture();
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "event" });
  playElement("select");
  await waitForActionProcess(560);
  applyDelta(choice.effect, "event");
  state.routeEventResults[getRouteEventKey(route, pending.eventId)] = choice.result;
  setStoryResultModal({
    kicker: "路遇结果",
    title: choice.label,
    text: `${choice.result}\n\n车队继续抵达 ${locations[route.to].name}。`,
    verse: formatSceneVerse(getRouteEventVerse(routeEvent.id || pending.eventId, route)),
    artSrc: getRouteEventIllustrationSrc(pending.eventId, route),
    meta: `${locations[route.from].name} → ${locations[route.to].name}`,
    effect: choice.effect
  });
  state.log.unshift(`路遇：${choice.result}`);
  const unlockedEndingId = getNewEndingIdBeforeSave();
  if (state.status === "ended") {
    state.log.unshift(`结局：${endingDefinitions[state.ending] || state.ending}`);
  } else if (checkResourceFailure()) {
    trimLog();
    saveState();
    setActionBusy(false);
    setActionFeedback({
      phase: "done",
      tone: "warning",
      kicker: "路遇",
      title: choice.label,
      detail: choice.result,
      delta: choice.effect
    });
    render();
    queueActionFeedbackReset();
    return;
  } else {
    trimLog();
    setActionBusy(false);
    completeRoute(route);
    setActionFeedback({
      phase: "done",
      tone: "route",
      kicker: locations[route.to].name,
      title: "路遇已过",
      detail: `${choice.result} 车队继续抵达 ${locations[route.to].name}。`,
      delta: choice.effect
    });
    queueActionFeedbackReset();
    return;
  }
  trimLog();
  saveState();
  queueEndingMilestone(unlockedEndingId);
  setActionBusy(false);
  setActionFeedback({
    phase: "done",
    tone: state.status === "ended" ? "warning" : "event",
    kicker: "路遇",
    title: choice.label,
    detail: choice.result,
    delta: choice.effect
  });
  render();
  queueActionFeedbackReset();
}

function detectCrisisType() {
  if (state.resources.axle <= 0) return "axle";
  if (state.resources.grain <= 0) return "grain";
  if (state.resources.sanity <= 0) return "sanity";
  return "";
}

function checkResourceFailure() {
  if (state.status !== "playing") return false;
  const crisisType = detectCrisisType();
  if (!crisisType) return false;
  if (shouldHardFail(crisisType)) {
    enterHardFailure(crisisType);
    return true;
  }
  enterCrisis(crisisType);
  return true;
}

function shouldHardFail(crisisType) {
  const meta = crisisMeta[crisisType];
  const sameCrisisCount = meta?.statKey ? state.failureStats[meta.statKey] : 0;
  return (
    state.failureStats.rescues >= MAX_RESCUES_BEFORE_STRANDING
    || sameCrisisCount >= 2
    || state.badLuckMeter >= HARD_BAD_LUCK_THRESHOLD
  );
}

function enterCrisis(crisisType) {
  const meta = crisisMeta[crisisType];
  state.status = "crisis";
  state.crisisType = crisisType;
  state.badLuckMeter = clamp(state.badLuckMeter + 12);
  if (meta?.statKey) state.failureStats[meta.statKey] += 1;
  const warningMap = { axle: "warnAxle", grain: "warnGrain", sanity: "warnSanity" };
  playElement(warningMap[crisisType]);
  updateAudioLayers();
  state.log.unshift(`${meta?.label || "危机"}：触发濒死补救。`);
}

function enterHardFailure(crisisType) {
  const meta = crisisMeta[crisisType];
  state.status = "stranded";
  state.crisisType = "";
  state.failureType = crisisType;
  state.badLuckMeter = 100;
  state.failureStats.hardFailures += 1;
  const warningMap = { axle: "warnAxle", grain: "warnGrain", sanity: "warnSanity" };
  playElement(warningMap[crisisType]);
  updateAudioLayers();
  state.log.unshift(`败局：${meta?.label || "危机"}已无可救，队伍停在九州边缘。`);
}

async function resolveCrisis(index) {
  if (actionBusy) return;
  const crisisType = state.crisisType;
  const crisisEvent = crisisEvents[crisisType];
  const choice = crisisEvent?.choices?.[index];
  if (!choice) return;
  const process = describeChoiceProcess(choice);
  autoUnlockAudioFromGesture();
  setActionBusy(true);
  setActionFeedback({ ...process, phase: "running", tone: "warning" });
  playElement("select");
  await waitForActionProcess(620);
  applyDelta(choice.effect, "crisis");
  state.failureStats.rescues += 1;
  state.status = "playing";
  state.crisisType = "";
  setStoryResultModal({
    kicker: "补救结果",
    title: choice.label,
    text: choice.result,
    verse: formatSceneVerse(getCrisisVerse(crisisType)),
    artSrc: getFailureIllustrationSrc(crisisType),
    meta: crisisMeta[crisisType]?.label || "困厄",
    effect: choice.effect
  });
  state.log.unshift(choice.result);
  checkResourceFailure();
  if (state.status === "playing" && state.pendingRoute) {
    const route = routes.find((item) => item.id === state.pendingRoute.routeId);
    setActionBusy(false);
    completeRoute(route);
    setActionFeedback({
      phase: "done",
      tone: "route",
      kicker: "补救",
      title: "勉强续行",
      detail: `${choice.result} 队伍继续抵达下一站。`,
      delta: choice.effect
    });
    queueActionFeedbackReset();
    return;
  }
  trimLog();
  saveState();
  setActionBusy(false);
  setActionFeedback({
    phase: "done",
    tone: state.status === "playing" ? "event" : "warning",
    kicker: "补救",
    title: choice.label,
    detail: choice.result,
    delta: choice.effect
  });
  render();
  queueActionFeedbackReset();
}

function trimLog() {
  state.log = state.log.slice(0, 9);
}

function formatCost(cost = {}) {
  const labels = { axle: "车轴", grain: "粮草", sanity: "神志" };
  const parts = [];
  resourceKeys.forEach((key) => {
    if (cost[key]) parts.push(`${labels[key] || key} ${cost[key]}`);
  });
  return parts.join(" / ") || "无消耗";
}

function getVisibleChoices(event) {
  return (event?.choices || []).filter((choice) => meetsAll(choice.conditions));
}

function resourceHint(value, labels) {
  if (value <= 15) return labels[2];
  if (value <= 35) return labels[1];
  return labels[0];
}

function renderResources() {
  const { axle, grain, sanity } = state.resources;
  const statuses = getResourceStatuses();
  el.axleValue.textContent = axle;
  el.grainValue.textContent = grain;
  el.sanityValue.textContent = sanity;
  el.axleMeter.style.width = `${axle}%`;
  el.grainMeter.style.width = `${grain}%`;
  el.sanityMeter.style.width = `${sanity}%`;
  el.axleHint.textContent = resourceHint(axle, ["尚可远行", "车具吃紧", "断轴边缘"]);
  el.grainHint.textContent = resourceHint(grain, ["队伍安稳", "粮袋渐轻", "饥荒边缘"]);
  el.sanityHint.textContent = resourceHint(sanity, ["文字可信", "异象增多", "所见不真"]);
  document.querySelectorAll(".resource-card").forEach((card) => {
    const key = card.dataset.resource;
    const status = statuses[key] || { key: "normal", label: "安" };
    const head = card.querySelector(".resource-head");
    card.dataset.status = status.key;
    if (head) head.dataset.statusLabel = status.label;
    card.classList.toggle("warning", status.key === "warn");
    card.classList.toggle("danger", status.key === "danger");
  });
  renderStageConditionLights(statuses);
}

function renderStage(isTraveling = false) {
  const loc = locations[state.currentLocation];
  const pending = state.pendingRoute
    ? routes.find((route) => route.id === state.pendingRoute.routeId)
    : null;
  const nextRoute = pending || selectedRoute || getRoutesFromCurrent()[0];
  const nextLoc = nextRoute ? locations[nextRoute.to] : loc;
  const terrain = nextRoute?.terrain || loc.terrain;
  const stageProfile = getStageProfile(loc, nextRoute, nextLoc);
  const sceneryFirst = stageProfile.travelMode === "scenery" || stageProfile.sceneryFirst;
  el.stage.className = "journey-stage";
  el.stage.classList.add(`terrain-${terrain}`);
  applyStageProfile(stageProfile);
  if (state.resources.sanity < 36 || state.status === "crisis" || state.status === "stranded") {
    el.stage.classList.add("polluted");
  }
  if (state.day % 3 === 0) el.stage.classList.add("night");
  else if (state.day % 3 === 2) el.stage.classList.add("dusk");
  if (isTraveling && motionEnabled) {
    el.stage.classList.add("traveling");
    el.caravan.classList.toggle("traveling", !sceneryFirst);
    el.caravan.classList.remove("interrupted");
  } else if (pending) {
    el.stage.classList.add("interrupted");
    el.caravan.classList.toggle("interrupted", !sceneryFirst);
    el.caravan.classList.remove("traveling");
  } else {
    el.caravan.classList.remove("traveling");
    el.caravan.classList.remove("interrupted");
  }
  applyStageResourcePressure();
  el.fromNode.textContent = loc.name;
  el.routeNode.textContent = nextRoute ? nextRoute.name : "路尽";
  el.toNode.textContent = nextLoc.name;
  renderStageRouteProgress({ isTraveling, pending, nextRoute });
  renderStagePhase({ isTraveling, pending, nextRoute });
}

function renderStageRouteProgress({ isTraveling = false, pending = null, nextRoute = null } = {}) {
  if (!el.stageRouteProgress) return;
  const routeEvent = pending
    ? getRouteEventById(state.pendingRoute?.eventId)
    : (nextRoute?.midEvent ? getRouteEventById(nextRoute.midEvent) : null);
  const eventSignal = getRouteEventSignal(routeEvent);
  const progressState = pending
    ? "interrupted"
    : isTraveling
      ? "traveling"
      : nextRoute
        ? "ready"
        : "idle";
  el.stageRouteProgress.dataset.progressState = progressState;
  el.stageRouteProgress.dataset.hasMidEvent = routeEvent ? "true" : "false";
  el.stageRouteProgress.dataset.eventTone = eventSignal.tone;
  el.stageRouteProgress.dataset.eventThreat = eventSignal.threat;
  el.stageRouteProgress.dataset.eventIcon = eventSignal.icon;
  el.stageRouteProgress.dataset.routeId = nextRoute?.id || "";
  if (el.stageRouteMidMarker) {
    el.stageRouteMidMarker.textContent = pending
      ? "停"
      : routeEvent
        ? eventSignal.icon
        : "半";
    el.stageRouteMidMarker.title = routeEvent
      ? `${routeEvent.title || "半途路遇"}：${eventSignal.label}`
      : "半途";
  }
}

function getRouteEventSignal(event) {
  if (!event?.choices?.length) {
    return { tone: "none", threat: "none", icon: "半", label: "半途" };
  }
  const gainScores = resourceKeys.reduce((scores, key) => ({ ...scores, [key]: 0 }), {});
  const threatScores = resourceKeys.reduce((scores, key) => ({ ...scores, [key]: 0 }), {});
  event.choices.forEach((choice) => {
    resourceKeys.forEach((key) => {
      const value = Number(choice.effect?.[key] || 0);
      if (value > 0) gainScores[key] += value;
      if (value < 0) threatScores[key] += Math.abs(value);
    });
  });
  const gainKey = getTopScoredResource(gainScores);
  const threatKey = getTopScoredResource(threatScores);
  const tone = gainKey || (threatKey ? "danger" : "omen");
  const icons = { axle: "轴", grain: "粮", sanity: "神", danger: "险", omen: "异", none: "半" };
  const labels = { axle: "偏车轴", grain: "偏粮草", sanity: "偏神志", danger: "偏危险", omen: "偏异象", none: "半途" };
  const threatLabel = threatKey ? `，风险${getRouteEventSignalResourceLabel(threatKey)}` : "";
  return {
    tone,
    threat: threatKey || "none",
    icon: icons[tone] || "异",
    label: `${labels[tone] || "偏异象"}${threatLabel}`
  };
}

function getTopScoredResource(scores) {
  return resourceKeys.reduce((bestKey, key) => {
    const score = Number(scores[key] || 0);
    if (score <= 0) return bestKey;
    if (!bestKey || score > Number(scores[bestKey] || 0)) return key;
    return bestKey;
  }, "");
}

function getRouteEventSignalResourceLabel(key) {
  return { axle: "车轴", grain: "粮草", sanity: "神志" }[key] || key;
}

function getRouteSignalForRoute(route) {
  const event = getRouteEventById(route?.midEvent);
  return {
    event,
    ...getRouteEventSignal(event)
  };
}

function getRouteEventSignalShortLabel(signal = {}) {
  const toneLabels = {
    axle: "偏轴",
    grain: "偏粮",
    sanity: "偏神",
    danger: "偏险",
    omen: "异象"
  };
  const toneLabel = toneLabels[signal.tone] || "半途";
  if (!signal.threat || signal.threat === "none") return toneLabel;
  return `${toneLabel}/${getRouteEventSignalShortResourceLabel(signal.threat)}险`;
}

function getRouteEventSignalShortResourceLabel(key) {
  return { axle: "轴", grain: "粮", sanity: "神" }[key] || key;
}

function renderRouteSignalBadge(signal) {
  if (!signal?.event || signal.tone === "none") return "";
  const tone = escapeHtml(signal.tone || "omen");
  const threat = escapeHtml(signal.threat || "none");
  const icon = escapeHtml(signal.icon || "异");
  const shortLabel = escapeHtml(getRouteEventSignalShortLabel(signal));
  const title = escapeHtml(`${signal.event.title || "半途路遇"}：${signal.label || "偏异象"}`);
  return `
    <span class="route-signal-badge ${tone}" data-event-tone="${tone}" data-event-threat="${threat}" title="${title}" aria-label="${title}">
      <b>${icon}</b><small>${shortLabel}</small>
    </span>
  `;
}

function renderRouteIntelStrip(route, signal) {
  const chips = [];
  const riskClass = getRiskClass(route.risk);
  chips.push({
    type: "risk",
    tone: `risk ${riskClass}`,
    icon: "险",
    label: String(route.risk || "低"),
    title: `风险：${route.risk || "低"}`
  });
  const fixedEvent = signal?.event || getRouteEventById(route?.midEvent);
  if (fixedEvent) {
    const handled = state.routeEventResults[getRouteEventKey(route, route.midEvent)];
    chips.push({
      type: handled ? "done" : "event",
      tone: handled ? "event done" : "event",
      icon: "遇",
      label: handled ? "已过" : fixedEvent.title,
      title: handled ? `已处理：${fixedEvent.title}` : `定遇：${fixedEvent.title}`
    });
  }
  const randomPreview = getRandomRouteEventPreview(route);
  if (randomPreview.level !== "none") {
    chips.push({
      type: "omen",
      tone: `omen ${randomPreview.level}`,
      icon: "异",
      label: randomPreview.label.replace("异象", ""),
      title: `${randomPreview.label}：${randomPreview.candidates.length} 类候选`
    });
    if (randomPreview.hasRescue) {
      chips.push({
        type: "rescue",
        tone: "rescue",
        icon: "救",
        label: "补救",
        title: "资源紧张时更容易遇到补给或休整"
      });
    }
  }
  chips.push({
    type: "supply",
    tone: "supply",
    icon: "补",
    label: formatRouteSupplyIntelLabel(route.to),
    title: getDestinationSupplyPreview(route.to)
  });
  return `
    <span class="route-intel-strip" aria-label="路线情报">
      ${chips.map((chip) => `
        <span class="route-intel-chip ${escapeHtml(chip.tone)}" data-intel-type="${escapeHtml(chip.type || "info")}" title="${escapeHtml(chip.title)}" aria-label="${escapeHtml(chip.title)}">
          <b>${escapeHtml(chip.icon)}</b><em>${escapeHtml(chip.label)}</em>
        </span>
      `).join("")}
    </span>
  `;
}

function formatRouteSupplyIntelLabel(locationId) {
  return getDestinationSupplyPreview(locationId)
    .replace(/^可补：/, "")
    .replace(/^不可补：/, "")
    .replace(/^本次已补：/, "")
    .replace(/^已取：/, "");
}

function getMapRoutePreviewState(available = getVisibleRoutesFromCurrent()) {
  const unresolvedEventContext = getUnresolvedCurrentEventContext();
  if (state.pendingRoute) {
    const pending = routes.find((route) => route.id === state.pendingRoute.routeId);
    return {
      state: "pending",
      action: "return-town",
      icon: "停",
      title: "半途路遇",
      detail: pending
        ? `${locations[pending.from]?.name || "此地"} → ${locations[pending.to]?.name || "彼处"} · 处理后抵达`
        : "车队尚未抵达下一站"
    };
  }
  if (state.status === "crisis") {
    return { state: "blocked", action: "return-town", icon: "厄", title: "先求生", detail: "点此回旅途，处理当前困厄。" };
  }
  if (state.status !== "playing") {
    return { state: "ended", icon: "终", title: "旅程暂结", detail: "查看复盘或重开一局。" };
  }
  if (unresolvedEventContext) {
    return {
      state: "blocked",
      action: "return-town",
      icon: "遇",
      title: "遭遇未决",
      detail: `点此回旅途，处理「${unresolvedEventContext.event.title}」`
    };
  }
  if (isRoutePreviewSelected(selectedRoute)) {
    const route = selectedRoute;
    const destinationName = locations[route.to]?.name || "下一站";
    return {
      state: "selected",
      icon: "行",
      title: `再点启程：${destinationName}`,
      detail: `${formatCostShort(route.cost)} · ${formatRouteEventShort(route)} · ${getDestinationSupplyPreview(route.to)}`
    };
  }
  if (available.length) {
    const currentName = locations[state.currentLocation]?.name || "此地";
    return {
      state: "idle",
      icon: "图",
      title: `从 ${currentName} 选路`,
      detail: `${available.length} 条路线显现 · 先点预览，再点启程`
    };
  }
  return { state: "empty", icon: "雾", title: "暂无显路", detail: "查看地点志或等待下一步线索。" };
}

function renderMapRoutePreview(available = getVisibleRoutesFromCurrent()) {
  if (!el.mapRoutePreview) return;
  const preview = getMapRoutePreviewState(available);
  el.mapRoutePreview.dataset.state = preview.state;
  if (preview.action) {
    el.mapRoutePreview.dataset.action = preview.action;
    el.mapRoutePreview.setAttribute("tabindex", "0");
    el.mapRoutePreview.setAttribute("aria-label", `${preview.title}，${preview.detail}`);
    el.mapRoutePreview.setAttribute("aria-disabled", "false");
  } else {
    delete el.mapRoutePreview.dataset.action;
    el.mapRoutePreview.setAttribute("tabindex", "-1");
    el.mapRoutePreview.setAttribute("aria-disabled", "true");
    el.mapRoutePreview.removeAttribute("aria-label");
  }
  el.mapRoutePreview.title = `${preview.title}：${preview.detail}`;
  if (el.mapRoutePreviewIcon) el.mapRoutePreviewIcon.textContent = preview.icon;
  if (el.mapRoutePreviewTitle) el.mapRoutePreviewTitle.textContent = preview.title;
  if (el.mapRoutePreviewDetail) el.mapRoutePreviewDetail.textContent = preview.detail;
}

function renderRoutes() {
  const available = getVisibleRoutesFromCurrent();
  const unresolvedEventContext = getUnresolvedCurrentEventContext();
  renderMapRoutePreview(available);
  if (state.pendingRoute) {
    el.routeList.dataset.count = "0";
    el.routeList.innerHTML = `<p class="video-note">车队还在半途：先处理路遇，处理后才会抵达下一站。</p>`;
    return;
  }
  if (state.status === "crisis") {
    el.routeList.dataset.count = "0";
    el.routeList.innerHTML = `<p class="video-note">队伍正在濒死补救，请回到旅途模式处理当前困厄。</p>`;
    return;
  }
  if (state.status !== "playing") {
    el.routeList.dataset.count = "0";
    el.routeList.innerHTML = `<p class="video-note">当前局已结束，请重开或查看采风册复盘。</p>`;
    return;
  }
  if (!available.length) {
    el.routeList.dataset.count = "0";
    el.routeList.innerHTML = `<p class="video-note">此处暂无可见路线。下一版应触发困境或归返事件。</p>`;
    return;
  }
  el.routeList.dataset.count = String(available.length);
  el.routeList.innerHTML = available
    .map((route) => {
      const locked = !canUseRoute(route);
      const selected = isRoutePreviewSelected(route);
      const fromName = locations[route.from].name;
      const toName = locations[route.to].name;
      const routeVerse = formatSceneVerse(getRouteVerse(route));
      const routeArt = getLocationIllustrationSrc(route.to);
      const routeSignal = getRouteSignalForRoute(route);
      return `
        <button class="route-card ${locked ? "locked" : ""} ${selected ? "selected" : ""}" type="button" data-route="${route.id}" data-event-tone="${escapeHtml(routeSignal.tone)}" data-event-threat="${escapeHtml(routeSignal.threat)}" aria-pressed="${selected}" title="${selected ? "已选中，再点启程" : "点选路线"}" ${actionBusy ? "disabled" : ""}>
          ${routeArt ? `<span class="route-art"><img src="${escapeHtml(routeArt)}" alt="" onerror="this.closest('.route-art').hidden = true;" /></span>` : ""}
          <span class="route-heading">
            <strong>${getRouteDisplayName(route)}</strong>
            ${renderRouteSignalBadge(routeSignal)}
            ${selected ? '<span class="route-confirm-mark">再点启程</span>' : ""}
          </span>
          <span class="route-destination"><b>至</b>${toName}</span>
          <span class="route-path">${fromName} → ${toName}</span>
          <span class="route-verse">${renderSceneVerseMarkupFromText(routeVerse)}</span>
          ${renderResourceDeltaChips(route.cost, { emptyLabel: "无耗", predict: true })}
          ${renderRouteIntelStrip(route, routeSignal)}
          <span class="route-risk-row">
            ${renderRouteRiskBadge(route)}
            <span class="route-event-short">${escapeHtml(formatRouteEventShort(route))}</span>
          </span>
          ${renderRouteOmenBadges(route)}
          <span class="route-scan route-supply-preview">${getDestinationSupplyPreview(route.to)}</span>
          <span class="route-hint">${selected ? "已预览路线，再点一次正式启程。" : unresolvedEventContext ? "先处理当前遭遇，再起行。" : locked ? getLockedHintText(route) : getRouteHintText(route)}</span>
        </button>
      `;
    })
    .join("");
  el.routeList.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => confirmRoute(button.dataset.route));
  });
}

function renderOverview() {
  if (!el.progressLabel) return;
  const loc = locations[state.currentLocation];
  const maxStep = getMaxJourneyStep();
  const step = Math.min(maxStep, getLocationStep(state.currentLocation));
  const progress = Math.round((step / maxStep) * 100);
  const pending = state.pendingRoute
    ? routes.find((route) => route.id === state.pendingRoute.routeId)
    : null;
  const playableRoutes = getVisibleRoutesFromCurrent().filter((route) => canUseRoute(route));
  const nextNames = playableRoutes.map((route) => locations[route.to]?.name).filter(Boolean);
  const compact = isCompactLandscape();
  el.progressLabel.textContent = compact
    ? `西行${step + 1}/${maxStep + 1} · ${getCompactDistanceLabel()}`
    : `西行 ${step + 1} / ${maxStep + 1}`;
  el.distanceLabel.textContent = compact ? getCompactDistanceLabel() : getDistanceLabel();
  el.mapDistanceLabel.textContent = getDistanceLabel();
  el.journeyProgressMeter.style.width = `${progress}%`;
  renderJourneyStepTrack();
  renderNextStepGuidance({ loc, pending, playableRoutes, compact });
  if (pending) {
    el.nextStopLabel.textContent =
      `半途：${locations[pending.from].name} → ${locations[pending.to].name} · 还未抵达，先处理路遇`;
    return;
  }
  el.nextStopLabel.textContent = nextNames.length
    ? `当前：${loc.name} · 可往 ${nextNames.join("、")}`
    : `当前：${loc.name} · 暂无显明路线`;
}

function getNextStepGuidance({ loc, pending, playableRoutes, compact }) {
  const eventDone = !loc?.event || Boolean(state.eventResults[loc.event]);
  if (actionBusy || actionFeedback?.phase === "running") {
    return {
      action: "busy",
      tone: "busy",
      text: compact ? "下一步：等落账" : "下一步：等待行动落账"
    };
  }
  if (state.status === "crisis") {
    return {
      action: "crisis",
      tone: "danger",
      text: compact ? "下一步：求生补救" : "下一步：先处理濒死补救"
    };
  }
  if (state.status !== "playing") {
    return {
      action: "recap",
      tone: "quiet",
      text: compact ? "下一步：复盘或重开" : "下一步：查看采风册或重开"
    };
  }
  if (pending) {
    return {
      action: "route-event",
      tone: "warning",
      text: compact ? "下一步：处理路遇" : "下一步：处理半途路遇"
    };
  }
  if (!eventDone) {
    return {
      action: "event-choice",
      tone: "event",
      text: compact ? "下一步：处理遭遇" : "下一步：先处理当前遭遇"
    };
  }
  if (hasPendingFieldNoteAtCurrentLocation()) {
    return {
      action: "field-note",
      tone: "event",
      text: compact ? "下一步：采风入册" : "下一步：选择如何写入采风册"
    };
  }
  if (activeView === "map") {
    if (isRoutePreviewSelected(selectedRoute)) {
      const destinationName = locations[selectedRoute.to]?.name || "下一站";
      return {
        action: "route-confirm",
        tone: "route",
        text: compact ? "下一步：再点启程" : `下一步：再点启程前往${destinationName}`
      };
    }
    return playableRoutes.length
      ? {
        action: "pick-route",
        tone: "route",
        text: compact ? "下一步：选一条路" : "下一步：选择一条显现路线"
      }
      : {
        action: "return-town",
        tone: "quiet",
        text: compact ? "下一步：回城镇" : "下一步：回到地点页处理线索"
      };
  }
  if (hasAvailableSupplyAtCurrentLocation()) {
    return {
      action: "supply",
      tone: "supply",
      text: compact ? "下一步：补给一次" : "下一步：补给一次，再开地图"
    };
  }
  return playableRoutes.length
    ? {
      action: "open-map",
      tone: "route",
      text: compact ? "下一步：开图选路" : "下一步：打开地图选择下一站"
    }
    : {
      action: "review",
      tone: "quiet",
      text: compact ? "下一步：查日志" : "下一步：查看地点志与日志"
    };
}

function renderNextStepGuidance(context) {
  if (!el.nextStepLabel) return;
  const guidance = getNextStepGuidance(context);
  document.body.dataset.nextAction = guidance.action || "review";
  el.nextStepLabel.textContent = getNextStepDisplayText(guidance);
  el.nextStepLabel.dataset.tone = guidance.tone;
  el.nextStepLabel.dataset.action = guidance.action || "review";
  el.nextStepLabel.dataset.short = getNextStepShortCode(guidance.action);
  el.nextStepLabel.title = guidance.text;
  el.nextStepLabel.setAttribute("aria-label", guidance.text);
}

function getNextStepDisplayText(guidance = {}) {
  return {
    busy: "等待落账",
    crisis: "求生补救",
    recap: "复盘本局",
    "route-event": "处理路遇",
    "event-choice": "处理遭遇",
    "field-note": "采风入册",
    "route-confirm": "再点启程",
    "pick-route": "选一条路",
    "return-town": "回旅途",
    supply: "补给一次",
    "open-map": "开图选路",
    review: "查日志"
  }[guidance.action] || guidance.text || "先处理当前状态";
}

function getNextStepShortCode(action) {
  return {
    busy: "等",
    crisis: "危",
    recap: "录",
    "route-event": "异",
    "event-choice": "遇",
    "field-note": "采",
    "route-confirm": "行",
    "pick-route": "路",
    "return-town": "返",
    supply: "补",
    "open-map": "图",
    review: "志"
  }[action] || "行";
}

function renderMap() {
  if (!el.mapRoutesLayer || !el.mapNodeLayer) return;
  applyMapAssets();
  const currentRoutes = getVisibleRoutesFromCurrent();
  const routeByDestination = new Map(currentRoutes.map((route) => [route.to, route]));
  const unresolvedEventContext = getUnresolvedCurrentEventContext();
  el.mapRouteHint.textContent = state.pendingRoute
    ? "车队在半途，处理路遇后抵达"
    : unresolvedEventContext
      ? `先处理 ${unresolvedEventContext.loc.name} 的遭遇，再选下一站`
    : state.status === "playing"
      ? `从 ${locations[state.currentLocation].name} 出发 · 雾中 ${state.hintedLocations.length} 处`
      : "先处理当前状态";

  el.mapRoutesLayer.innerHTML = routes
    .map((route) => {
      const visibility = getRouteVisibility(route);
      if (visibility === "hidden") return "";
      const from = locations[route.from]?.map;
      const to = locations[route.to]?.map;
      if (!from || !to) return "";
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const revealing = wasJustRevealed("routeIds", route.id) || wasJustRevealed("hintedRouteIds", route.id);
      const className = [
        "map-route-line",
        visibility,
        visibility === "fogged" ? "unknown" : "",
        revealing ? "revealing" : ""
      ].filter(Boolean).join(" ");
      return `
        <div class="${className}"
          style="--x:${from.x}%; --y:${from.y}%; --length:${length}%; --angle:${angle}deg"></div>
      `;
    })
    .join("");

  el.mapNodeLayer.innerHTML = Object.values(locations)
    .map((location) => {
      const visibility = getLocationVisibility(location.id);
      if (visibility === "hidden") return "";
      const map = location.map || { x: 50, y: 50 };
      const route = routeByDestination.get(location.id);
      const fogLabel = getFogLabel(location.id);
      const isFogged = visibility === "fogged";
      const revealing = wasJustRevealed("locationIds", location.id)
        || wasJustRevealed("hintedLocationIds", location.id);
      const selected = isRoutePreviewSelected(route);
      const stateClass = [
        visibility === "fogged" ? "future fogged" : visibility,
        selected ? "selected" : "",
        revealing ? "revealing" : ""
      ].filter(Boolean).join(" ");
      const routeAttr = route && !state.pendingRoute && ["reachable", "locked"].includes(visibility)
        ? `data-route="${route.id}"`
        : "";
      const routeScan = isFogged
        ? fogLabel.hint
        : route
          ? canUseRoute(route)
            ? `险${route.risk} / ${formatCostShort(route.cost)}`
            : `未显：${route.lockedHint || "条件不足"}`
          : visibility === "current"
            ? "车队所在"
            : "已入地点志";
      const title = isFogged ? fogLabel.name : location.name;
      const supplyScan = isFogged ? "雾中未显" : renderMapNodeSupplyStrip(location.id);
      return `
        <button class="map-node ${stateClass}" type="button" style="--x:${map.x}%; --y:${map.y}%" ${routeAttr} aria-pressed="${selected}" ${actionBusy ? "disabled" : ""}>
          <strong>${title}</strong>
          <span class="map-node-route-scan">${routeScan}</span>
          ${isFogged ? `<small>${supplyScan}</small>` : supplyScan}
        </button>
      `;
    })
    .join("");

  el.mapNodeLayer.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => confirmRoute(button.dataset.route));
  });
}

function renderLocationLore() {
  const loc = locations[state.currentLocation];
  const artSrc = getLocationIllustrationSrc(state.currentLocation);
  const perception = getSanityPerception();
  setPerceptionDataset(el.locationLore, perception);
  el.locationLoreTitle.textContent = loc.name;
  if (artSrc && el.locationArt) {
    if (el.locationArt.getAttribute("src") !== artSrc) {
      el.locationArt.src = artSrc;
    }
    el.locationArtFrame.hidden = false;
  } else if (el.locationArtFrame) {
    el.locationArtFrame.hidden = true;
  }
  renderSceneVerse(el.locationVerse, getLocationVerse(state.currentLocation));
  el.locationLoreText.textContent = getLocationTextForSanity(state.currentLocation);
  el.discoveryCount.textContent =
    `采风 ${state.discoveredLocations.length} / ${Object.keys(locations).length}`;
}

function renderSupplies() {
  el.supplyList.dataset.count = "0";
  if (state.pendingRoute) {
    el.supplyList.innerHTML = `<p class="video-note">车队还在半途，尚未抵达城镇；处理路遇后才能搜集补给。</p>`;
    return;
  }
  if (state.status === "crisis") {
    el.supplyList.innerHTML = `<p class="video-note">队伍正在濒死补救，暂不能搜集补给。</p>`;
    return;
  }
  if (state.status !== "playing") {
    el.supplyList.innerHTML = `<p class="video-note">当前局已结束，补给记录保留在日志中。</p>`;
    return;
  }

  const supplies = getSuppliesForCurrent();
  if (!supplies.length) {
    el.supplyList.innerHTML = `<p class="video-note">此地暂无可搜集补给。</p>`;
    return;
  }

  el.supplyList.dataset.count = String(supplies.length);
  el.supplyList.innerHTML = supplies
    .map((supply) => {
      const badge = getSupplyBadge(supply);
      const disabled = actionBusy || supply.used || supply.blockedThisArrival;
      const stateText = supply.used
        ? "已取"
        : supply.blockedThisArrival
          ? "本次已补"
          : "可补";
      const shortStateText = supply.used
        ? "已"
        : supply.blockedThisArrival
          ? "本"
          : "可";
      const ariaState = supply.used
        ? "已搜集"
        : supply.blockedThisArrival
          ? "本次抵达已补给"
          : "可搜集";
      return `
      <button class="supply-card ${supply.used ? "used" : ""} ${supply.blockedThisArrival && !supply.used ? "blocked" : ""}" type="button" data-supply="${supply.id}" title="${supply.hint}" aria-label="${supply.label}：${supply.hint}，${ariaState}" ${disabled ? "disabled" : ""}>
        <span class="supply-icon" data-supply-type="${badge.type}">${badge.icon}</span>
        <span class="supply-copy">
          <strong>${badge.label}</strong>
          <small>${renderResourceDeltaChips(supply.effect, { predict: true })}</small>
        </span>
        <span class="supply-state" data-short-state="${shortStateText}">${stateText}</span>
      </button>
    `;
    })
    .join("");

  el.supplyList.querySelectorAll("[data-supply]:not(:disabled)").forEach((button) => {
    button.addEventListener("click", () => useSupply(button.dataset.supply));
  });
}

function renderEvent() {
  setStoryModalActions([]);
  if (state.status === "crisis") {
    renderCrisisEvent();
    return;
  }
  if (state.pendingRoute) {
    renderRouteEvent();
    return;
  }

  const loc = locations[state.currentLocation];
  const event = events[loc.event];
  el.eventTitle.textContent = state.status === "ended" ? "旅程暂结" : event.title;
  el.eventTag.textContent = state.status === "playing" ? event.tag : "结局 / 困境";
  if (state.status === "ended") {
    renderEventArt(getEndingIllustrationSrc(state.ending), endingDefinitions[state.ending] || "结局");
    renderSceneVerse(el.eventVerse, getEndingVerse(state.ending === "rift" ? "rift" : "return"));
    el.eventTitle.textContent = getEndingTitle(state.ending);
    setEventCopy(`${getEndingDetail(state.ending)} ${getRunSummaryText()}`, { compact: false, perception: false });
    setStoryModalActions([
      { kind: "restart", badge: "再", label: "重开一局", hint: "保留采风与结局记录，回到中原驿重新出发。", className: "ending-action-card" },
      { kind: "recap", badge: "盘", label: "复盘本局", hint: "查看路线、资源最低点和补给路遇。", className: "ending-action-card ending-recap" },
      { kind: "log", badge: "册", label: "采风册", hint: "查看地点采风、异闻采风与近志。", className: "ending-action-card ending-log" }
    ]);
    renderEventDecisionLauncher(3, "查看结局");
    return;
  }
  if (state.status === "stranded") {
    el.eventTitle.textContent = "旅途断绝";
    el.eventTag.textContent = "失败";
    renderEventArt(
      getFailureIllustrationSrc(state.failureType) || getEndingIllustrationSrc("stranded"),
      "失败"
    );
    renderSceneVerse(el.eventVerse, getEndingVerse("stranded"));
    setEventCopy(getFailureText(), { maxLength: 42 });
    setStoryModalActions([
      { kind: "restart", badge: "再", label: "重开一局", hint: "保留日志经验，回到中原驿重新出发。", className: "failure-restart" }
    ]);
    renderEventDecisionLauncher(1, "旅途断绝");
    return;
  }
  if (state.eventResults[loc.event]) {
    renderEventArt(getEventIllustrationSrc(loc.event, loc.id), event.title);
    renderSceneVerse(el.eventVerse, getEventVerse(loc.event));
    if (hasPendingFieldNoteAtCurrentLocation()) {
      const profileLine = getFieldNoteProfileLine(loc.id);
      el.eventTitle.textContent = `${event.title} · 待入册`;
      el.eventTag.textContent = "采风";
      setEventCopy(`${state.eventResults[loc.event]}\n\n${profileLine ? `可采：${profileLine}\n` : ""}采风使须决定：这件事要如何写进王朝的册页？`, { maxLength: 58, perception: false });
      renderChoiceButtons(getFieldNoteChoices(loc.id), "采风入册");
      return;
    }
    el.eventTitle.textContent = `${event.title} · 已处理`;
    el.eventTag.textContent = "等待前进";
    setEventCopy(state.eventResults[loc.event], { maxLength: 42, perception: false });
    el.choiceList.dataset.count = "1";
    el.choiceList.innerHTML = `
      <div class="event-resolved-note">
        <span>当前地点事件已处理。可补给一次，或打开九州图选择下一段显现的路。</span>
        <button class="map-jump-button" type="button" data-open-map-view>打开九州图</button>
      </div>
    `;
    el.choiceList.querySelector("[data-open-map-view]")?.addEventListener("click", () => setActiveView("map"));
    return;
  }
  renderSceneVerse(el.eventVerse, getEventVerse(loc.event));
  renderEventArt(getEventIllustrationSrc(loc.event, loc.id), event.title);
  setEventCopy(getEventTextForSanity(event), { maxLength: 42 });
  renderChoiceButtons(getVisibleChoices(event));
}

function renderRouteEvent() {
  const pending = state.pendingRoute;
  const route = routes.find((item) => item.id === pending?.routeId);
  const routeEvent = getRouteEventById(pending?.eventId);
  if (!route || !routeEvent) {
    state.pendingRoute = null;
    renderEvent();
    return;
  }
  el.eventTitle.textContent = routeEvent.title;
  el.eventTag.textContent = `半途路遇 · ${locations[route.from].name} → ${locations[route.to].name}`;
  renderEventArt(getRouteEventIllustrationSrc(pending.eventId, route), routeEvent.title);
  renderSceneVerse(el.eventVerse, getRouteEventVerse(routeEvent.id || pending.eventId, route));
  setEventCopy(getEventTextForSanity(routeEvent), { maxLength: 42 });
  renderChoiceButtons(getVisibleChoices(routeEvent));
}

function getCrisisGuideText(type) {
  const meta = crisisMeta[type] || { label: "困厄" };
  const rescueLeft = Math.max(0, MAX_RESCUES_BEFORE_STRANDING - state.failureStats.rescues);
  const rescueText = rescueLeft > 1
    ? `本局还可承受 ${rescueLeft} 次左右补救。`
    : rescueLeft === 1
      ? "这是最后一次保底补救窗口。"
      : "再撑不住就会旅途断绝。";
  return `${meta.label}已经触底：先选一项补救，成功后队伍才能继续移动。${rescueText}`;
}

function renderCrisisEvent() {
  const crisisEvent = crisisEvents[state.crisisType];
  el.eventTitle.textContent = crisisEvent?.title || "濒死补救";
  el.eventTag.textContent = crisisEvent?.tag || "困厄";
  renderEventArt(getFailureIllustrationSrc(state.crisisType), crisisEvent?.title || "困厄");
  renderSceneVerse(el.eventVerse, getCrisisVerse(state.crisisType));
  setEventCopy([
    getCrisisGuideText(state.crisisType),
    getEventTextForSanity(crisisEvent) || "队伍已到极限，需要一次最低限度的补救选择。"
  ].join("\n\n"), { maxLength: 46 });
  renderChoiceButtons(crisisEvent?.choices || []);
}

function renderChoiceButtons(choices, label = "") {
  const actions = choices.map((choice, index) => ({ kind: "choice", choice, index }));
  setStoryModalActions(actions);
  renderEventDecisionLauncher(actions.length, label || (state.pendingRoute ? "处理路遇" : "处理遭遇"));
  if (actions.length && activeView === "town") {
    textPanelState = { location: false, event: true };
    renderStoryModal("event");
  }
}

function buildInventorySlots() {
  const carriedSlots = state.items.map((name) => ({
    name,
    type: "器物",
    status: "随身",
    occupied: true
  }));
  const clueSlots = Object.entries(inventoryFlagSlots)
    .filter(([flag]) => state.flags.includes(flag))
    .map(([, name]) => ({
      name,
      type: "线索",
      status: "已得",
      occupied: true
    }));
  const languageSlots = Object.entries(inventoryLanguageSlots)
    .filter(([key]) => (state.languages[key] || 0) > 0)
    .map(([, name]) => ({
      name,
      type: "语言",
      status: "已得",
      occupied: true
    }));
  const slots = [...carriedSlots, ...clueSlots, ...languageSlots];
  const visibleSlots = slots.length > 9
    ? [
        ...slots.slice(0, 8),
        { name: "另有若干", type: "余物", status: `尚余 ${slots.length - 8} 项`, occupied: true }
      ]
    : slots.slice(0, 9);

  while (visibleSlots.length < 9) {
    visibleSlots.push({ name: "空格", type: "空", status: "未得", occupied: false });
  }

  return visibleSlots;
}

function renderInventoryGrid() {
  el.itemList.innerHTML = "";
  buildInventorySlots().forEach((slot) => {
    const cell = document.createElement("div");
    cell.className = `inventory-cell${slot.occupied ? "" : " empty"}`;
    cell.setAttribute("role", "listitem");

    const name = document.createElement("strong");
    name.textContent = slot.name;
    const meta = document.createElement("span");
    meta.textContent = slot.type;
    const status = document.createElement("small");
    status.textContent = slot.status;

    cell.append(name, meta, status);
    el.itemList.append(cell);
  });
}

function renderCompactStatChips(items) {
  return items.map((item) => `
    <span class="compact-stat-chip" data-tone="${item.tone || "neutral"}">
      <b>${escapeHtml(item.icon || item.label)}</b>
      <strong>${escapeHtml(item.value)}</strong>
      <small>${escapeHtml(item.label)}</small>
    </span>
  `).join("");
}

function renderStatus() {
  const stats = state.failureStats;
  renderInventoryGrid();
  el.languageList.className = "compact-stat-row language-stat-row";
  el.languageList.setAttribute(
    "aria-label",
    `羽民语 ${state.languages.feather || 0}，巫咸古辞 ${state.languages.wuxian || 0}`
  );
  el.languageList.innerHTML = renderCompactStatChips([
    { icon: "羽", label: "羽民", value: state.languages.feather || 0 },
    { icon: "巫", label: "巫辞", value: state.languages.wuxian || 0 }
  ]);
  el.safetyList.className = "compact-stat-row safety-stat-row";
  el.safetyList.setAttribute(
    "aria-label",
    `厄运 ${state.badLuckMeter}，求生 ${stats.rescues}，败局 ${stats.hardFailures}，断轴 ${stats.axleCrises}，饥荒 ${stats.grainCrises}，失神 ${stats.sanityCrises}`
  );
  el.safetyList.innerHTML = renderCompactStatChips([
    { icon: "厄", label: "厄运", value: state.badLuckMeter, tone: state.badLuckMeter >= 70 ? "danger" : state.badLuckMeter >= 40 ? "warn" : "neutral" },
    { icon: "生", label: "求生", value: stats.rescues, tone: stats.rescues ? "warn" : "neutral" },
    { icon: "败", label: "败局", value: stats.hardFailures, tone: stats.hardFailures ? "danger" : "neutral" },
    { icon: "轴", label: "断轴", value: stats.axleCrises, tone: stats.axleCrises ? "warn" : "neutral" },
    { icon: "饥", label: "饥荒", value: stats.grainCrises, tone: stats.grainCrises ? "warn" : "neutral" },
    { icon: "神", label: "失神", value: stats.sanityCrises, tone: stats.sanityCrises ? "warn" : "neutral" }
  ]);
  renderAudioStatus();
  renderRunRecap();
  renderDiscoveryGallery();
  renderEncounterGallery();
  el.logList.innerHTML = state.log.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
  if (el.latestLogPeek) {
    el.latestLogPeek.textContent = state.log[0] || "暂无行旅日志。";
  }
  renderPoetry();
}

function showOpeningHintIfNeeded() {
  if (openingHintShown || actionBusy || state.status !== "playing" || state.pendingRoute) return;
  if (state.day !== 1 || state.currentLocation !== gameData.startLocation) return;
  const loc = locations[state.currentLocation];
  if (state.eventResults[loc?.event]) return;
  openingHintShown = true;
  window.setTimeout(() => {
    const currentLoc = locations[state.currentLocation];
    if (
      actionBusy
      || state.status !== "playing"
      || state.pendingRoute
      || state.day !== 1
      || state.currentLocation !== gameData.startLocation
      || state.eventResults[currentLoc?.event]
    ) {
      return;
    }
    setActionFeedback({
      phase: "done",
      tone: "quiet",
      kicker: "第一步",
      title: "先处理当前遭遇",
      detail: "点一个选择让结果落账；之后打开九州图，选择下一段显现的路。"
    });
    queueActionFeedbackReset();
  }, motionEnabled ? 180 : 0);
}

function render(isTraveling = false) {
  const loc = locations[state.currentLocation];
  document.body.classList.toggle("game-crisis", state.status === "crisis");
  document.body.classList.toggle("game-stranded", state.status === "stranded");
  document.body.classList.toggle("game-ended", state.status === "ended");
  el.locationTitle.textContent = loc.name;
  el.dayLabel.textContent = `第 ${state.day} 日`;
  el.regionLabel.textContent = loc.region;
  renderResources();
  renderOverview();
  renderStage(isTraveling);
  renderRoutes();
  renderMap();
  renderLocationLore();
  renderSupplies();
  renderEvent();
  renderActionFeedback();
  renderPlaytestReminder();
  renderStatus();
  syncDecisionModalState();
  updateTextPanelState();
  updateAudioLayers();
  flushVisualFeedbackQueue();
  showOpeningHintIfNeeded();
  schedulePlaytestReminder();
  if (activeView === "town" && storyModalActions.length && !actionBusy && !storyResultOverride) {
    textPanelState = { location: false, event: true };
    renderStoryModal("event");
  }
}

function getFailureText() {
  if (state.resources.axle <= 0) {
    return "车轴彻底断开，辇车陷在旧路中央。随从还在推车，但路已经不再向前。";
  }
  if (state.resources.grain <= 0) {
    return "粮袋空了，火也不肯旺。队伍还能看见下一座山，却没有力气抵达。";
  }
  if (state.resources.sanity <= 0) {
    return "记路的人忘了来处，地图上的字散成黑水。车队仍在走，但已经没有人知道方向。";
  }
  return "坏运积满，九州边缘合上了路。队伍没有死在某一处，而是被漫长的错误耗尽。";
}

function validatePrototypeData() {
  const errors = [];
  const warnings = [];
  const locationIds = new Set(Object.keys(locations));
  const eventIds = new Set(Object.keys(events));
  const routeIds = new Set();
  const endingIds = new Set(Object.keys(endingDefinitions));
  const languageIds = new Set(Object.keys(initialStateTemplate.languages || {}));

  if (!locations[gameData.startLocation]) {
    errors.push(`起始地点不存在：${gameData.startLocation}`);
  }

  Object.entries(locations).forEach(([key, location]) => {
    if (location.id !== key) errors.push(`地点 key 与 id 不一致：${key}`);
    if (!location.detail) errors.push(`地点 ${location.id} 缺少地点志 detail`);
    if (!location.fieldNote || typeof location.fieldNote !== "object" || Array.isArray(location.fieldNote)) {
      errors.push(`地点 ${location.id} 缺少采风题材 fieldNote`);
    } else {
      ["category", "subject", "evidence", "clue"].forEach((key) => {
        if (!String(location.fieldNote[key] || "").trim()) {
          errors.push(`地点 ${location.id} 的 fieldNote.${key} 为空`);
        }
      });
      if (!location.fieldNote.effect) {
        errors.push(`地点 ${location.id} 缺少 fieldNote.effect`);
      } else {
        validateDelta(location.fieldNote.effect, `地点 ${location.id} / 采风题材`, errors);
      }
    }
    ["uneasy", "mad"].forEach((band) => {
      if (!location.sanityDetails?.[band]) {
        errors.push(`地点 ${location.id} 缺少低神志地点志 ${band}`);
      }
    });
    if (!eventIds.has(location.event)) {
      errors.push(`地点 ${location.id} 绑定了不存在的事件 ${location.event}`);
    }
    if (!terrainKeys.includes(location.terrain)) {
      errors.push(`地点 ${location.id} 使用未知 terrain：${location.terrain}`);
    }
    if (!location.map || !Number.isFinite(Number(location.map.x)) || !Number.isFinite(Number(location.map.y))) {
      errors.push(`地点 ${location.id} 缺少合法九州图坐标`);
    }
    validateSupplies(location, errors);
  });

  routes.forEach((route) => {
    if (routeIds.has(route.id)) errors.push(`路线 id 重复：${route.id}`);
    routeIds.add(route.id);
    if (!locationIds.has(route.from)) {
      errors.push(`路线 ${route.id} 的起点不存在：${route.from}`);
    }
    if (!locationIds.has(route.to)) {
      errors.push(`路线 ${route.id} 的终点不存在：${route.to}`);
    }
    if (!terrainKeys.includes(route.terrain)) {
      errors.push(`路线 ${route.id} 使用未知 terrain：${route.terrain}`);
    }
    if (route.midEvent && !getRouteEventById(route.midEvent)) {
      errors.push(`路线 ${route.id} 引用了不存在的路遇事件 ${route.midEvent}`);
    }
    validateDelta(route.cost, `路线 ${route.id}`, errors);
    [...(route.conditions || []), ...(route.requireAny || [])].forEach((condition) => {
      validateCondition(condition, `路线 ${route.id}`, languageIds, errors, warnings);
    });
  });

  Object.entries(events).forEach(([eventId, event]) => {
    validateEvent(event, `事件 ${eventId}`, languageIds, endingIds, errors, warnings);
  });

  Object.entries(routeEvents).forEach(([eventId, event]) => {
    validateEvent(event, `路遇事件 ${eventId}`, languageIds, endingIds, errors, warnings);
  });

  Object.entries(randomRouteEvents).forEach(([eventId, event]) => {
    validateEvent(event, `随机路遇事件 ${eventId}`, languageIds, endingIds, errors, warnings);
  });

  Object.entries(crisisEvents).forEach(([crisisId, crisisEvent]) => {
    if (!crisisMeta[crisisId]) warnings.push(`危机事件 ${crisisId} 暂无 failureStats 映射`);
    validateEvent(crisisEvent, `危机事件 ${crisisId}`, languageIds, endingIds, errors, warnings);
  });

  validateRevealPlan(revealPlan, locationIds, routeIds, errors, warnings);
  validateRoutePools(routePools, locationIds, routeIds, errors, warnings);
  validateFogLabels(fogLabels, locationIds, revealPlan, errors, warnings);
  validateStageAssets(stageAssets, locationIds, errors, warnings);
  validateAudioAssets(audioAssets, errors, warnings);
  validatePoetryContent(poetryContent, errors, warnings);

  Object.values(locations).forEach((location) => {
    const hasOutgoing = routes.some((route) => route.from === location.id);
    const event = events[location.event];
    const hasEndingChoice = (event?.choices || []).some((choice) => choice.effect?.ending);
    if (!hasOutgoing && !hasEndingChoice) {
      warnings.push(`地点 ${location.id} 无后续路线，也没有结局选项`);
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    counts: {
      locations: locationIds.size,
      routes: routes.length,
      events: eventIds.size,
      routeEvents: Object.keys(routeEvents).length,
      randomRouteEvents: Object.keys(randomRouteEvents).length,
      crisisEvents: Object.keys(crisisEvents).length,
      routePools: Object.keys(routePools).length,
      stageProfiles: Object.keys(stageAssets.profiles || {}).length,
      audioAssets: Object.keys(audioAssets).length,
      poetryFallbacks: Object.values(poetryContent.fallbackPoems || {}).reduce(
        (total, poems) => total + (Array.isArray(poems) ? poems.length : 0),
        0
      ),
      poetrySceneVerses: Object.values(poetryContent.sceneVerses || {}).reduce(
        (total, bucket) => total + (isPlainObject(bucket) ? Object.keys(bucket).length : 0),
        0
      ),
      supplies: Object.values(locations).reduce(
        (total, location) => total + (location.supplies || []).length,
        0
      ),
      endings: endingIds.size
    },
    saveVersion: SAVE_VERSION
  };
}

function validateRevealPlan(plans, locationIds, routeIds, errors, warnings) {
  Object.keys(locations).forEach((locationId) => {
    if (!plans[locationId]) {
      errors.push(`地点 ${locationId} 缺少 revealPlan`);
    }
  });

  Object.entries(plans).forEach(([locationId, plan]) => {
    if (!locationIds.has(locationId)) {
      errors.push(`revealPlan 引用了不存在的地点 ${locationId}`);
      return;
    }
    if (!isPlainObject(plan)) {
      errors.push(`地点 ${locationId} 的 revealPlan 不是对象`);
      return;
    }
    ["routes", "fogLocations", "fogRoutes"].forEach((key) => {
      if (plan[key] !== undefined && !Array.isArray(plan[key])) {
        errors.push(`地点 ${locationId} 的 revealPlan.${key} 不是数组`);
      }
    });

    const plannedRoutes = Array.isArray(plan.routes) ? plan.routes : [];
    const outgoingRoutes = routes.filter((route) => route.from === locationId).map((route) => route.id);
    plannedRoutes.forEach((routeId) => {
      const route = routes.find((item) => item.id === routeId);
      if (!routeIds.has(routeId)) {
        errors.push(`地点 ${locationId} 的 revealPlan.routes 引用了不存在的路线 ${routeId}`);
        return;
      }
      if (route.from !== locationId) {
        errors.push(`地点 ${locationId} 的 revealPlan.routes 包含非本地点出发路线 ${routeId}`);
      }
    });

    const omittedRoutes = outgoingRoutes.filter((routeId) => !plannedRoutes.includes(routeId));
    if (omittedRoutes.length) {
      warnings.push(`地点 ${locationId} 有未列入 revealPlan.routes 的出发路线：${omittedRoutes.join(", ")}`);
    }

    (Array.isArray(plan.fogLocations) ? plan.fogLocations : []).forEach((fogLocationId) => {
      if (!locationIds.has(fogLocationId)) {
        errors.push(`地点 ${locationId} 的 revealPlan.fogLocations 引用了不存在的地点 ${fogLocationId}`);
      }
      if (fogLocationId === locationId) {
        warnings.push(`地点 ${locationId} 把自己列入了 fogLocations`);
      }
    });

    (Array.isArray(plan.fogRoutes) ? plan.fogRoutes : []).forEach((routeId) => {
      if (!routeIds.has(routeId)) {
        errors.push(`地点 ${locationId} 的 revealPlan.fogRoutes 引用了不存在的路线 ${routeId}`);
      }
    });

    if (!plan.revealText) {
      warnings.push(`地点 ${locationId} 缺少 revealPlan.revealText`);
    }
  });
}

function validateRoutePools(pools, locationIds, routeIds, errors, warnings) {
  Object.keys(locations).forEach((locationId) => {
    if (!pools[locationId]) {
      warnings.push(`地点 ${locationId} 缺少 routePools，将沿用 revealPlan`);
    }
  });

  Object.entries(pools).forEach(([locationId, pool]) => {
    if (!locationIds.has(locationId)) {
      errors.push(`routePools 引用了不存在的地点 ${locationId}`);
      return;
    }
    if (!isPlainObject(pool)) {
      errors.push(`地点 ${locationId} 的 routePools 不是对象`);
      return;
    }
    const requiredItems = normalizePoolItems(pool.requiredRoutes, "route");
    const optionalItems = normalizePoolItems(pool.optionalRoutes, "route");
    const outgoingRoutes = routes.filter((route) => route.from === locationId);
    const isTerminal = outgoingRoutes.length === 0;

    if (!isTerminal && requiredItems.length === 0) {
      errors.push(`地点 ${locationId} 的 routePools.requiredRoutes 为空，缺少固定保底路线`);
    }

    [...requiredItems, ...optionalItems].forEach((item) => {
      const route = getRouteById(item.id);
      if (!routeIds.has(item.id)) {
        errors.push(`地点 ${locationId} 的 routePools 路线不存在：${item.id}`);
        return;
      }
      if (route.from !== locationId) {
        errors.push(`地点 ${locationId} 的 routePools 路线不是从本地点出发：${item.id}`);
      }
    });

    const optionalRange = getCountRange(pool.optionalCount, optionalItems.length);
    if (optionalRange.max > optionalItems.length) {
      errors.push(`地点 ${locationId} 的 optionalCount 超过 optionalRoutes 数量`);
    }

    normalizePoolItems(pool.fogPool, "location").forEach((item) => {
      if (item.type === "location" && !locationIds.has(item.id)) {
        errors.push(`地点 ${locationId} 的 fogPool 地点不存在：${item.id}`);
      }
      if (item.type === "location" && item.id === locationId) {
        errors.push(`地点 ${locationId} 的 fogPool 把当前地点作为远影`);
      }
      if (item.type === "route" && !routeIds.has(item.id)) {
        errors.push(`地点 ${locationId} 的 fogPool 路线不存在：${item.id}`);
      }
      if (!["location", "route"].includes(item.type)) {
        errors.push(`地点 ${locationId} 的 fogPool 类型非法：${item.type}`);
      }
    });

    if (locationId === "red_marsh") {
      const requiredIds = requiredItems.map((item) => item.id);
      if (!requiredIds.includes("red_to_stele")) {
        errors.push("赤水外滩 routePools 必须保留 red_to_stele 清醒出口");
      }
      if (requiredIds.length === 1 && requiredIds[0] === "red_to_rift") {
        errors.push("red_to_rift 不能成为赤水外滩唯一保底出口");
      }
    }
  });
}

function validateFogLabels(labels, locationIds, plans, errors, warnings) {
  Object.entries(labels).forEach(([locationId, label]) => {
    if (!locationIds.has(locationId)) {
      errors.push(`fogLabels 引用了不存在的地点 ${locationId}`);
    }
    if (!label?.name || !label?.hint) {
      errors.push(`fogLabels.${locationId} 缺少 name/hint`);
    }
  });

  const plannedFogLocations = new Set();
  Object.values(plans).forEach((plan) => {
    if (!Array.isArray(plan?.fogLocations)) return;
    plan.fogLocations.forEach((locationId) => plannedFogLocations.add(locationId));
  });
  plannedFogLocations.forEach((locationId) => {
    if (locationIds.has(locationId) && !labels[locationId]) {
      warnings.push(`雾中地点 ${locationId} 没有 fogLabels 文案，将使用默认雾中城影`);
    }
  });
}

function validateStageAssets(assets, locationIds, errors, warnings) {
  if (!assets || !isPlainObject(assets)) {
    errors.push("缺少 stageAssets 舞台素材映射");
    return;
  }
  const profiles = isPlainObject(assets.profiles) ? assets.profiles : {};
  if (!profiles.default) {
    errors.push("stageAssets.profiles 缺少 default 舞台 profile");
  }
  Object.entries(profiles).forEach(([profileId, profile]) => {
    if (!isPlainObject(profile)) {
      errors.push(`舞台 profile ${profileId} 不是对象`);
      return;
    }
    ["background", "foreground", "pollution", "caravan"].forEach((key) => {
      if (!profile[key] && !profiles.default?.[key]) {
        errors.push(`舞台 profile ${profileId} 缺少 ${key} 层素材`);
      }
    });
    ["foregroundOpacity", "atmosphereOpacity", "pollutionOpacity", "backgroundOpacity"].forEach((key) => {
      if (profile[key] !== undefined && !Number.isFinite(Number(profile[key]))) {
        errors.push(`舞台 profile ${profileId} 的 ${key} 不是数字`);
      }
    });
  });

  terrainKeys.forEach((terrain) => {
    const profileId = assets.terrainProfiles?.[terrain];
    if (!profileId) {
      errors.push(`地形 ${terrain} 缺少舞台 profile 映射`);
      return;
    }
    if (!profiles[profileId]) {
      errors.push(`地形 ${terrain} 引用了不存在的舞台 profile：${profileId}`);
    }
  });

  const generatedStageBackgrounds = isPlainObject(assets.generatedStageBackgrounds)
    ? assets.generatedStageBackgrounds
    : {};
  terrainKeys.forEach((terrain) => {
    const generatedBackground = generatedStageBackgrounds[terrain];
    if (!generatedBackground) {
      warnings.push(`地形 ${terrain} 未配置 A 组生成长图候选，将只使用旧舞台背景`);
    }
  });
  Object.entries(generatedStageBackgrounds).forEach(([terrain, src]) => {
    if (!terrainKeys.includes(terrain)) {
      errors.push(`generatedStageBackgrounds 引用了未知地形：${terrain}`);
    }
    if (typeof src !== "string" || !src.includes("A组风格锁定/")) {
      errors.push(`generatedStageBackgrounds.${terrain} 未指向 A组风格锁定目录`);
    }
  });
  Object.entries(profiles).forEach(([profileId, profile]) => {
    const key = profile.generatedBackgroundKey;
    if (key !== undefined && !generatedStageBackgrounds[key]) {
      errors.push(`舞台 profile ${profileId} 引用了不存在的生成长图 key：${key}`);
    }
  });

  Object.keys(locations).forEach((locationId) => {
    const profileId = assets.locationProfiles?.[locationId];
    if (!profileId) {
      warnings.push(`地点 ${locationId} 未配置专属舞台 profile，将使用地形兜底`);
      return;
    }
    if (!profiles[profileId]) {
      errors.push(`地点 ${locationId} 引用了不存在的舞台 profile：${profileId}`);
    }
  });

  Object.keys(assets.locationProfiles || {}).forEach((locationId) => {
    if (!locationIds.has(locationId)) {
      errors.push(`stageAssets.locationProfiles 引用了不存在的地点：${locationId}`);
    }
  });
}

function validateSupplies(location, errors) {
  if (location.supplies === undefined) return;
  if (!Array.isArray(location.supplies)) {
    errors.push(`地点 ${location.id} 的 supplies 不是数组`);
    return;
  }
  const supplyIds = new Set();
  location.supplies.forEach((supply) => {
    if (!supply.id || supplyIds.has(supply.id)) {
      errors.push(`地点 ${location.id} 有空缺或重复补给 id：${supply.id || "空"}`);
    }
    supplyIds.add(supply.id);
    if (!supply.label || !supply.hint || !supply.effect || !supply.result) {
      errors.push(`地点 ${location.id} / 补给 ${supply.id || "未知"} 字段不完整`);
    }
    validateDelta(supply.effect, `地点 ${location.id} / 补给 ${supply.id || "未知"}`, errors);
  });
}

function validateAudioAssets(assets, errors, warnings) {
  const requiredKeys = ["musicLoop", "sanityLow"];
  requiredKeys.forEach((key) => {
    if (!assets[key]) errors.push(`缺少首版必需音频槽位：${key}`);
  });
  Object.entries(assets).forEach(([key, asset]) => {
    if (!asset.id || !asset.type) {
      errors.push(`音频 ${key} 缺少 id/type`);
    }
    if (!asset.src && asset.status !== "missing") {
      errors.push(`音频 ${key} 缺少 src，且未标记为 missing`);
    }
    if (asset.loop !== undefined && typeof asset.loop !== "boolean") {
      errors.push(`音频 ${key} 的 loop 不是布尔值`);
    }
    if (asset.volume !== undefined && !Number.isFinite(Number(asset.volume))) {
      errors.push(`音频 ${key} 的 volume 不是数字`);
    }
    if (!["demo-temporary", "review-pending", "cleared", "missing"].includes(asset.status)) {
      warnings.push(`音频 ${key} 状态不是 demo-temporary / review-pending / cleared / missing`);
    }
  });
}

function validatePoetryContent(content, errors, warnings) {
  if (!content || !isPlainObject(content)) {
    warnings.push("古辞内容层未配置 poetryContent");
    return;
  }
  if (!content.apiBaseUrl || !content.randomPath) {
    warnings.push("poetryContent 未配置 apiBaseUrl/randomPath，将只能使用本地兜底");
  }
  if (!isPlainObject(content.fallbackPoems)) {
    errors.push("poetryContent.fallbackPoems 不是对象");
    return;
  }
  Object.entries(content.fallbackPoems).forEach(([terrain, poems]) => {
    if (!terrainKeys.includes(terrain)) {
      warnings.push(`poetryContent.fallbackPoems 使用未知地形 ${terrain}`);
    }
    if (!Array.isArray(poems) || poems.length === 0) {
      errors.push(`poetryContent.fallbackPoems.${terrain} 为空或不是数组`);
      return;
    }
    poems.forEach((poem, index) => {
      if (!poem.title || !poem.author || !Array.isArray(poem.lines) || !poem.lines.length) {
        errors.push(`poetryContent.fallbackPoems.${terrain}[${index}] 字段不完整`);
      }
    });
  });
  Object.keys(content.locationProfiles || {}).forEach((locationId) => {
    if (!locations[locationId]) {
      warnings.push(`poetryContent.locationProfiles 引用了不存在的地点 ${locationId}`);
    }
  });
  validateSceneVerses(content.sceneVerses, errors, warnings);
}

function validateSceneVerseEntry(value, path, errors, warnings) {
  const verse = normalizeSceneVerse(value);
  if (!verse) {
    errors.push(`${path} 缺少可显示的 line`);
    return false;
  }
  if (!verse.title || !verse.author) {
    warnings.push(`${path} 缺少 title/author，仍可显示但来源不完整`);
  }
  return true;
}

function validateSceneVerseBucket(sceneVerses, bucketName, requiredIds, label, errors, warnings) {
  const bucket = sceneVerses[bucketName];
  if (!isPlainObject(bucket)) {
    errors.push(`poetryContent.sceneVerses.${bucketName} 不是对象`);
    return;
  }
  requiredIds.forEach((id) => {
    validateSceneVerseEntry(bucket[id], `poetryContent.sceneVerses.${bucketName}.${id}`, errors, warnings);
  });
  Object.keys(bucket).forEach((id) => {
    if (!requiredIds.includes(id)) {
      warnings.push(`poetryContent.sceneVerses.${bucketName} 引用了未知${label} ${id}`);
    }
  });
}

function validateSceneVerses(sceneVerses, errors, warnings) {
  if (!isPlainObject(sceneVerses)) {
    errors.push("poetryContent.sceneVerses 不是对象，每个场景需要固定诗引");
    return;
  }

  validateSceneVerseBucket(sceneVerses, "locations", Object.keys(locations), "地点", errors, warnings);
  validateSceneVerseBucket(sceneVerses, "events", Object.keys(events), "事件", errors, warnings);
  validateSceneVerseBucket(sceneVerses, "routeEvents", Object.keys(allRouteEvents), "路遇", errors, warnings);
  validateSceneVerseBucket(sceneVerses, "crisisEvents", Object.keys(crisisEvents), "危机", errors, warnings);
  validateSceneVerseBucket(sceneVerses, "endings", ["rift", "return", "stranded"], "结局", errors, warnings);

  if (sceneVerses.routes !== undefined && !isPlainObject(sceneVerses.routes)) {
    errors.push("poetryContent.sceneVerses.routes 不是对象");
  }
  routes.forEach((route) => {
    const routeVerse = normalizeSceneVerse(sceneVerses.routes?.[route.id]);
    const destinationVerse = normalizeSceneVerse(sceneVerses.locations?.[route.to]);
    if (!routeVerse && !destinationVerse) {
      errors.push(`路线 ${route.id} 缺少 route 诗引，目的地 ${route.to} 也没有地点诗引`);
    }
  });
  Object.keys(sceneVerses.routes || {}).forEach((routeId) => {
    if (!routes.some((route) => route.id === routeId)) {
      warnings.push(`poetryContent.sceneVerses.routes 引用了未知路线 ${routeId}`);
    }
  });
}

function validateEvent(event, owner, languageIds, endingIds, errors, warnings) {
  ["clear", "uneasy", "mad"].forEach((band) => {
    if (!event.texts?.[band]) errors.push(`${owner} 缺少 ${band} 文本`);
  });
  if (!Array.isArray(event.choices) || event.choices.length === 0) {
    errors.push(`${owner} 没有选项`);
    return;
  }
  event.choices.forEach((choice) => {
    if (!choice.label || !choice.effect || !choice.result) {
      errors.push(`${owner} 有不完整选项`);
    }
    validateDelta(choice.effect, `${owner} / 选项 ${choice.label}`, errors);
    if (choice.effect?.ending && !endingIds.has(choice.effect.ending)) {
      errors.push(`${owner} / 选项 ${choice.label} 引用了未知结局 ${choice.effect.ending}`);
    }
    if (choice.effect?.language) {
      Object.entries(choice.effect.language).forEach(([key, value]) => {
        if (!languageIds.has(key)) {
          errors.push(`${owner} / 选项 ${choice.label} 引用了未知语言 ${key}`);
        }
        if (!Number.isFinite(Number(value))) {
          errors.push(`${owner} / 选项 ${choice.label} 的语言变化不是数字：${key}`);
        }
      });
    }
    (choice.conditions || []).forEach((condition) => {
      validateCondition(condition, `${owner} / 选项 ${choice.label}`, languageIds, errors, warnings);
    });
  });
}

function validateDelta(delta, owner, errors) {
  if (!delta || typeof delta !== "object") {
    errors.push(`${owner} 缺少 effect/cost`);
    return;
  }
  Object.entries(delta).forEach(([key, value]) => {
    if (resourceKeys.includes(key) || key === "badLuck") {
      if (!Number.isFinite(Number(value))) errors.push(`${owner} 的 ${key} 不是数字`);
      return;
    }
    if (["flag", "ending", "language"].includes(key)) return;
    errors.push(`${owner} 使用未知数值字段 ${key}`);
  });
}

function validateCondition(condition, owner, languageIds, errors, warnings) {
  if (!condition || typeof condition !== "object") {
    errors.push(`${owner} 有非法条件`);
    return;
  }
  Object.keys(condition).forEach((key) => {
    if (!conditionKeys.includes(key)) warnings.push(`${owner} 使用未知条件字段 ${key}`);
  });
  if (condition.flag !== undefined && typeof condition.flag !== "string") {
    errors.push(`${owner} 的 flag 条件不合法`);
  }
  ["sanityMax", "sanityMin"].forEach((key) => {
    if (condition[key] !== undefined && !Number.isFinite(Number(condition[key]))) {
      errors.push(`${owner} 的 ${key} 条件不是数字`);
    }
  });
  if (condition.languageMin) {
    if (!languageIds.has(condition.languageMin.key)) {
      errors.push(`${owner} 引用了未知语言 ${condition.languageMin.key}`);
    }
    if (!Number.isFinite(Number(condition.languageMin.value))) {
      errors.push(`${owner} 的 languageMin.value 不是数字`);
    }
  }
}

function getBalanceInputs() {
  return {
    initialState: clone(initialStateTemplate),
    locations: clone(locations),
    routes: clone(routes),
    revealPlan: clone(revealPlan),
    routePools: clone(routePools),
    fogLabels: clone(fogLabels),
    stageAssets: clone(stageAssets),
    events: clone(events),
    crisisEvents: clone(crisisEvents),
    poetryContent: clone(poetryContent),
    audioAssets: clone(audioAssets),
    audioHooks: clone(audioHooks),
    musicProfileByTerrain: clone(musicProfileByTerrain),
    musicProfileByLocation: clone(musicProfileByLocation),
    resourceKeys: [...resourceKeys],
    failureStatKeys: Object.keys(createFailureStats())
  };
}

function getAudioState() {
  const loopKeys = getLoopKeys();
  const playback = Object.fromEntries(loopKeys.map((key) => {
    const element = audioState.elements[key];
    return [key, element ? {
      paused: element.paused,
      currentTime: Number(element.currentTime.toFixed(2)),
      duration: Number.isFinite(element.duration) ? Number(element.duration.toFixed(2)) : null,
      volume: Number(element.volume.toFixed(2)),
      readyState: element.readyState,
      src: element.currentSrc || element.src || ""
    } : null];
  }));
  return {
    enabled: audioEnabled,
    visible: audioState.visible,
    available: Object.keys(audioState.elements),
    failed: [...audioState.failed],
    blocked: [...audioState.blocked],
    previewMusic: audioAssets[audioPreviewKey]?.id || "",
    previewMusicKey: audioPreviewKey,
    activeMusicKey: getActiveMusicKey(),
    activeTerrain: getCurrentAudioTerrain(),
    activeLocation: getCurrentAudioLocationId(),
    currentMusicScene: getActiveMusicDisplay().scene,
    currentMusic: audioAssets[getActiveMusicKey()]?.id || "",
    currentMusicStatus: audioAssets[getActiveMusicKey()]?.status || "",
    musicProfileByLocation: clone(musicProfileByLocation),
    playback,
    musicLoop: getMusicKeys().some((key) => Boolean(audioState.elements[key])),
    sanityLayer: Boolean(audioState.elements.sanityLow || audioState.elements.sanityLight)
  };
}

function getPoetryState() {
  return clone(poetryState);
}

function getUiState() {
  const textPanel = textPanelState.location
    ? "location"
    : textPanelState.event
      ? "event"
      : "";
  return {
    view: activeView,
    drawer: activeDrawer,
    textPanel,
    drawerOpen: Boolean(activeDrawer),
    storyModalOpen: Boolean(el.storyModal && !el.storyModal.hidden),
    storyModalActions: storyModalActions.length,
    storyResultOpen: Boolean(storyResultOverride),
    bodyDrawer: document.body.dataset.drawer || "",
    bodyView: document.body.dataset.view || "",
    nextAction: document.body.dataset.nextAction || "",
    selectedRoute: selectedRoute?.id || "",
    eventSummary: el.eventText?.textContent || "",
    sanityBand: getSanityBand(),
    eventSanityBand: el.eventText?.dataset.sanityBand || "",
    eventSanityLabel: el.eventCopyCard?.dataset.sanityLabel || "",
    storyModalSanityBand: el.storyModal?.dataset.sanityBand || "",
    eventFullTextLength: eventFullText.length,
    eventSummaryMode: Boolean(el.eventText?.classList.contains("is-summary")),
    runRecapTitle: el.runRecapTitle?.textContent || "",
    runRecapTextLength: getRunRecapText().length,
    fieldNoteReports: getFieldNoteReportCount(),
    currentFieldNoteProfile: getFieldNoteProfile(state.currentLocation),
    audioReviewProgress: getAudioReviewProgress()
  };
}

window.BSI_PROTOTYPE = {
  getState: () => clone(state),
  getAudioState,
  getPoetryState,
  getUiState,
  openTextPanel: (panel) => {
    setTextPanelExpanded(panel, true);
    return getUiState();
  },
  closeTextPanels: () => {
    setTextPanelExpanded("", false);
    return getUiState();
  },
  openDrawer: (drawer) => {
    setActiveDrawer(drawer);
    return getUiState();
  },
  closeDrawer: () => {
    setActiveDrawer("");
    return getUiState();
  },
  getRunRecapText,
  getAudioReviewTemplateText,
  getAudioReviewProgress,
  getCurrentFieldNoteProfile: () => clone(getFieldNoteProfile(state.currentLocation)),
  refreshPoetry: () => refreshPoetryForCurrentLocation({ force: true }),
  getBalanceInputs,
  getVisibleRoutes: () => (
    state.status === "playing"
      ? getVisibleRoutesFromCurrent().map((route) => ({
        id: route.id,
        name: route.name,
        locked: !canUseRoute(route),
        to: route.to
      }))
      : []
  ),
  getVisibleChoices: () => {
    if (state.status === "crisis") {
      return (crisisEvents[state.crisisType]?.choices || []).map((choice, index) => ({
        index,
        label: choice.label
      }));
    }
    if (state.status !== "playing") return [];
    if (state.pendingRoute) {
      const routeEvent = getRouteEventById(state.pendingRoute.eventId);
      return getVisibleChoices(routeEvent).map((choice, index) => ({
        index,
        label: choice.label
      }));
    }
    const eventId = locations[state.currentLocation].event;
    if (state.eventResults[eventId]) {
      return hasPendingFieldNoteAtCurrentLocation()
        ? getFieldNoteChoices(state.currentLocation).map((choice, index) => ({
          index,
          label: choice.label
        }))
        : [];
    }
    const event = events[eventId];
    return getVisibleChoices(event).map((choice, index) => ({
      index,
      label: choice.label
    }));
  },
  previewSanityText: (eventId, sanity = state.resources.sanity) => {
    const event = events[eventId] || getRouteEventById(eventId) || crisisEvents[eventId];
    return getEventTextForBand(event, getSanityBandForValue(sanity));
  },
  getVisibleSupplies: () => (
    state.status === "playing"
      ? getSuppliesForCurrent().map((supply) => ({
        id: supply.id,
        label: supply.label,
        hint: supply.hint,
        used: supply.used,
        blockedThisArrival: supply.blockedThisArrival
      }))
      : []
  ),
  getView: () => activeView,
  getJourneyStepItems,
  setView: (view) => {
    setActiveView(view);
    return activeView;
  },
  getMapSummary: () => ({
    currentLocation: state.currentLocation,
    distanceLabel: getDistanceLabel(),
    progress: {
      currentStep: getLocationStep(state.currentLocation),
      maxStep: getMaxJourneyStep()
    },
    discoveredLocations: [...state.discoveredLocations],
    traveledRoutes: [...state.traveledRoutes],
    revealedRoutes: [...state.revealedRoutes],
    hintedLocations: [...state.hintedLocations],
    hintedRoutes: [...state.hintedRoutes],
    routePoolSelections: clone(state.routePoolSelections),
    routes: getVisibleRoutesFromCurrent().map((route) => ({
      id: route.id,
      to: route.to,
      locked: !canUseRoute(route),
      destinationSupply: getSupplySummary(route.to),
      fixedRouteEvent: route.midEvent || "",
      randomRouteEventPreview: getRandomRouteEventPreview(route)
    })),
    visibleMapRoutes: routes
      .map((route) => ({ id: route.id, visibility: getRouteVisibility(route) }))
      .filter((route) => route.visibility !== "hidden"),
    visibleMapLocations: Object.keys(locations)
      .map((id) => ({ id, visibility: getLocationVisibility(id) }))
      .filter((location) => location.visibility !== "hidden")
  }),
  getStageSummary: () => {
    const loc = locations[state.currentLocation];
    const pending = state.pendingRoute
      ? routes.find((route) => route.id === state.pendingRoute.routeId)
      : null;
    const nextRoute = pending || selectedRoute || getRoutesFromCurrent()[0];
    const nextLoc = nextRoute ? locations[nextRoute.to] : loc;
    const profile = getStageProfile(loc, nextRoute, nextLoc);
    return {
      currentLocation: loc?.id || "",
      targetLocation: nextLoc?.id || "",
      routeId: nextRoute?.id || "",
      profileId: profile.id || "default",
      label: profile.label || "",
      background: profile.background || "",
      foreground: profile.foreground || "",
      pollution: profile.pollution || "",
      caravan: profile.caravan || ""
    };
  },
  getRouteEventPreview: (routeId) => {
    const route = getRouteById(routeId);
    if (!route) return null;
    return {
      routeId: route.id,
      fixedRouteEvent: route.midEvent || "",
      randomRouteEventPreview: getRandomRouteEventPreview(route),
      badges: getRouteOmenBadges(route)
    };
  },
  moveRoute: (routeId) => runDebugAction(() => move(routeId)),
  chooseOption: (index) => runDebugAction(() => choose(index)),
  useSupply: (supplyId) => runDebugAction(() => useSupply(supplyId)),
  validate: validatePrototypeData,
  reset: () => {
    state = createInitialState();
    selectedRoute = null;
    openingHintShown = false;
    poetryFallbackSpin = 0;
    poetryState = createPoetryFallbackState(state.currentLocation, "idle");
    resetAudioWarnings();
    saveState();
    render();
    return clone(state);
  },
  setTestState: (patch) => {
    state = normalizeState({
      ...state,
      ...patch,
      resources: { ...state.resources, ...(patch.resources || {}) },
      languages: { ...state.languages, ...(patch.languages || {}) },
      failureStats: { ...state.failureStats, ...(patch.failureStats || {}) }
    });
    checkResourceFailure();
    poetryFallbackSpin = 0;
    poetryState = createPoetryFallbackState(state.currentLocation, "idle");
    saveState();
    render();
    return clone(state);
  },
  forceCrisis: (type = "axle") => {
    const crisisType = crisisEvents[type] ? type : "axle";
    state.resources[crisisType] = 0;
    updateResourceMinimums();
    checkResourceFailure();
    saveState();
    render();
    return clone(state);
  }
};
window.BSI_DEBUG = window.BSI_PROTOTYPE;

poetryState = poetryState || createPoetryFallbackState(state.currentLocation, "idle");
const visualCaptureStateApplied = applyVisualCaptureStateFromUrl();
setActiveView(getInitialViewFromUrl());
preloadGeneratedStageBackgrounds();
preloadGeneratedIllustrations();
render();
setActiveDrawer(getInitialDrawerFromUrl());
applyInitialRecapFromUrl();
if (!visualCaptureStateApplied) saveState();
