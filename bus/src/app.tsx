import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { FunctionComponent } from 'preact';
import { materialById, materials, recipesForMaterial, type Material } from './data';

const VERSION = '1.0.46';
const COMMIT_HASH = 'dev';
const STORAGE_KEY = 'factorio-bus-planner';
const MAX_HISTORY = 60;

interface Lane {
  id: string;
  material: string;
}

interface Station {
  id: string;
  material: string;
  side: 'left' | 'right';
  busInputs?: string[];
}

interface Plan {
  lanes: Lane[];
  stations: Station[];
}

type DragPayload = { kind: 'material' | 'lane' | 'station'; id: string };

const emptyPlan: Plan = { lanes: [], stations: [] };

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadPlan(): Plan {
  const encoded = new URLSearchParams(window.location.hash.slice(1)).get('plan');
  const stored = encoded ? decodePlan(encoded) : localStorage.getItem(STORAGE_KEY);
  if (!stored) return emptyPlan;
  try {
    const parsed = JSON.parse(stored) as Plan;
    if (Array.isArray(parsed.lanes) && Array.isArray(parsed.stations)) return parsed;
  } catch (error) {
    console.error('Could not load saved bus plan:', error);
  }
  return emptyPlan;
}

function decodePlan(encoded: string): string | null {
  try {
    const binary = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
    return new TextDecoder().decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
  } catch (error) {
    console.error('Could not decode shared bus plan:', error);
    return null;
  }
}

function encodePlan(plan: Plan): string {
  const bytes = new TextEncoder().encode(JSON.stringify(plan));
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function materialName(id: string): string {
  return materialById.get(id)?.name ?? id;
}

// The "standard" recipe for a material is its normal (non-alternate) recipe,
// used only to auto-check the bus inputs a freshly-dropped station is likely
// to want -- the user can freely tick/untick lanes afterward.
function standardRecipe(materialId: string) {
  const recipes = recipesForMaterial(materialId);
  return recipes.find(recipe => !recipe.alternate) ?? recipes[0];
}

function pullsLaneFromBus(station: Station, laneId: string): boolean {
  return station.busInputs?.includes(laneId) ?? false;
}

interface LaneSpan {
  first: number;
  last: number;
}

function laneTapSpan(plan: Plan, lane: Lane): LaneSpan | null {
  let first: number | null = null;
  let last: number | null = null;
  plan.stations.forEach((station, index) => {
    if (station.material !== lane.material && !pullsLaneFromBus(station, lane.id)) return;
    first = first === null ? index : Math.min(first, index);
    last = last === null ? index : Math.max(last, index);
  });
  if (first === null || last === null) return null;
  // Lanes without a producing station visibly enter from the bottom of the
  // planner, so they overlap every other no-origin lane at that boundary.
  return { first, last: laneOrigin(plan, lane.material) === null ? plan.stations.length : last };
}

function spansOverlap(first: LaneSpan | null, second: LaneSpan | null): boolean {
  if (!first || !second) return false;
  return first.first <= second.last && second.first <= first.last;
}

function collapseLaneGroups(plan: Plan): Lane[][] {
  return plan.lanes.reduce<Lane[][]>((groups, lane) => {
    const previousGroup = groups.at(-1);
    const span = laneTapSpan(plan, lane);
    if (previousGroup && previousGroup.every(previousLane => !spansOverlap(span, laneTapSpan(plan, previousLane)))) {
      previousGroup.push(lane);
    } else {
      groups.push([lane]);
    }
    return groups;
  }, []);
}

function MaterialIcon({ material, size = 'medium' }: { material: Material | undefined; size?: 'small' | 'medium' }) {
  if (!material) return <span class={`material-icon missing ${size}`}>?</span>;
  return <img class={`material-icon ${size}`} src={material.icon} alt="" draggable={false} />;
}

function Footer() {
  return (
    <>
      <footer class="app-footer">
        <span>A vibe-coded micro-app via <a href="https://searyanc.dev" target="_blank" rel="noopener noreferrer">SeaRyanC</a></span>
        <a class="github-link" href="https://github.com/SeaRyanC/app/tree/main/bus" target="_blank" rel="noopener noreferrer" title="View source on GitHub" aria-label="View source on GitHub">⌘</a>
        <span class="version">v{VERSION}+{COMMIT_HASH}</span>
      </footer>
      <span class="build-stamp">BUILD v{VERSION}+{COMMIT_HASH}</span>
    </>
  );
}

function ItemCard({ material, onDragStart, disabled }: { material: Material; onDragStart: (payload: DragPayload) => void; disabled: boolean }) {
  return (
    <button
      class="item-card"
      draggable={!disabled}
      disabled={disabled}
      onDragStart={event => {
        if (disabled) return;
        const payload: DragPayload = { kind: 'material', id: material.id };
        onDragStart(payload);
        event.dataTransfer?.setData('application/x-factorio-bus', JSON.stringify(payload));
        event.dataTransfer?.setData('text/plain', material.id);
        if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy';
      }}
      title={`Drag ${material.name} into the bus`}
    >
      <MaterialIcon material={material} />
      <span>{material.name}</span>
      {material.spaceAge && <em>SA</em>}
    </button>
  );
}

export const App: FunctionComponent = () => {
  const [plan, setPlan] = useState<Plan>(loadPlan);
  const [history, setHistory] = useState<Plan[]>([]);
  const [future, setFuture] = useState<Plan[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [collapseView, setCollapseView] = useState(false);
  const [notice, setNotice] = useState('');
  const stageRef = useRef<HTMLDivElement>(null);
  const stationPortRefs = useRef(new Map<string, HTMLSpanElement>());
  const laneSpineRefs = useRef(new Map<string, HTMLSpanElement>());

  const registerStationPort = useCallback((stationId: string, element: HTMLSpanElement | null) => {
    if (element) stationPortRefs.current.set(stationId, element);
    else stationPortRefs.current.delete(stationId);
  }, []);

  const registerLaneSpine = useCallback((laneId: string, element: HTMLSpanElement | null) => {
    if (element) laneSpineRefs.current.set(laneId, element);
    else laneSpineRefs.current.delete(laneId);
  }, []);

  const filteredMaterials = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return materials.filter(material => !needle || material.name.toLowerCase().includes(needle) || material.id.includes(needle));
  }, [search]);
  const laneGroups = useMemo(() => collapseLaneGroups(plan), [plan]);
  const visibleLaneGroups = collapseView ? laneGroups : plan.lanes.map(lane => [lane]);
  const inSituLaneIds = useMemo(
    () => new Set(collapseView ? laneGroups.filter(group => group.length > 1).flatMap(group => group.map(lane => lane.id)) : []),
    [collapseView, laneGroups],
  );

  const selectedStation = plan.stations.find(station => station.id === selectedStationId);
  const selectedStationRecipe = selectedStation ? standardRecipe(selectedStation.material) : undefined;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  const updatePlan = useCallback((next: Plan) => {
    if (collapseView) return;
    setHistory(previous => [...previous.slice(-(MAX_HISTORY - 1)), plan]);
    setFuture([]);
    setPlan(next);
  }, [collapseView, plan]);

  const addLane = useCallback((materialId: string) => {
    updatePlan({ ...plan, lanes: [...plan.lanes, { id: newId('lane'), material: materialId }] });
  }, [plan, updatePlan]);

  const addStation = useCallback((materialId: string, side: Station['side']) => {
    const recipe = standardRecipe(materialId);
    const busInputs = recipe
      ? plan.lanes.filter(lane => recipe.inputs.some(input => input.material === lane.material)).map(lane => lane.id)
      : [];
    const station: Station = { id: newId('station'), material: materialId, side, ...(busInputs.length > 0 ? { busInputs } : {}) };
    updatePlan({ ...plan, stations: [...plan.stations, station] });
    setSelectedStationId(station.id);
  }, [plan, updatePlan]);

  const toggleStationSide = useCallback((stationId: string) => {
    updatePlan({
      ...plan,
      stations: plan.stations.map(station => station.id === stationId ? { ...station, side: station.side === 'left' ? 'right' : 'left' } : station),
    });
  }, [plan, updatePlan]);

  const onDragStart = useCallback((payload: DragPayload) => {
    window.__busPlannerDrag = payload;
  }, []);

  const dropPayload = useCallback((event: DragEvent): DragPayload | null => {
    if (window.__busPlannerDrag) return window.__busPlannerDrag;
    const encoded = event.dataTransfer?.getData('application/x-factorio-bus');
    if (!encoded) return null;
    try {
      return JSON.parse(encoded) as DragPayload;
    } catch (error) {
      console.error('Could not read dragged bus payload:', error);
      return null;
    }
  }, []);

  const reorderLane = useCallback((draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const lanes = [...plan.lanes];
    const from = lanes.findIndex(lane => lane.id === draggedId);
    const to = lanes.findIndex(lane => lane.id === targetId);
    if (from < 0 || to < 0) return;
    const [lane] = lanes.splice(from, 1);
    if (lane) lanes.splice(to, 0, lane);
    updatePlan({ ...plan, lanes });
  }, [plan, updatePlan]);

  const reorderStation = useCallback((draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const stations = [...plan.stations];
    const from = stations.findIndex(station => station.id === draggedId);
    const to = stations.findIndex(station => station.id === targetId);
    if (from < 0 || to < 0) return;
    const [station] = stations.splice(from, 1);
    if (station) stations.splice(to, 0, station);
    updatePlan({ ...plan, stations });
  }, [plan, updatePlan]);

  const removeLane = useCallback((laneId: string) => {
    updatePlan({
      lanes: plan.lanes.filter(lane => lane.id !== laneId),
      stations: plan.stations.map(station => {
        const busInputs = station.busInputs?.filter(inputLaneId => inputLaneId !== laneId) ?? [];
        if (busInputs.length > 0) return { ...station, busInputs };
        const nextStation = { ...station };
        delete nextStation.busInputs;
        return nextStation;
      }),
    });
  }, [plan, updatePlan]);

  const moveStation = useCallback((stationId: string, direction: -1 | 1) => {
    const stations = [...plan.stations];
    const from = stations.findIndex(station => station.id === stationId);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= stations.length) return;
    const [station] = stations.splice(from, 1);
    if (station) stations.splice(to, 0, station);
    updatePlan({ ...plan, stations });
  }, [plan, updatePlan]);

  const handleDrop = useCallback((target: 'lane' | 'station-add' | string, event: DragEvent) => {
    event.preventDefault();
    if (collapseView) return;
    const payload = dropPayload(event);
    if (!payload) return;
    if (target === 'lane') {
      if (payload.kind === 'material') addLane(payload.id);
      else if (payload.kind === 'lane') reorderLane(payload.id, payload.id);
    } else if (target === 'station-add') {
      if (payload.kind === 'material') addStation(payload.id, 'left');
    } else if (payload.kind === 'lane') {
      reorderLane(payload.id, target);
    } else if (payload.kind === 'station') {
      reorderStation(payload.id, target);
    }
    window.__busPlannerDrag = undefined;
  }, [addLane, addStation, collapseView, dropPayload, reorderLane, reorderStation]);

  const setLaneSource = useCallback((laneId: string, useBus: boolean) => {
    if (!selectedStationId) return;
    updatePlan({
      ...plan,
      stations: plan.stations.map(station => {
        if (station.id !== selectedStationId) return station;
        const busInputs = new Set(station.busInputs ?? []);
        if (useBus) busInputs.add(laneId);
        else busInputs.delete(laneId);
        if (busInputs.size > 0) return { ...station, busInputs: [...busInputs] };
        const nextStation = { ...station };
        delete nextStation.busInputs;
        return nextStation;
      }),
    });
  }, [plan, selectedStationId, updatePlan]);

  const removeSelectedStation = useCallback(() => {
    if (!selectedStationId) return;
    updatePlan({ ...plan, stations: plan.stations.filter(station => station.id !== selectedStationId) });
    setSelectedStationId(null);
  }, [plan, selectedStationId, updatePlan]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!selectedStationId || target?.matches('input, select, textarea')) return;
      if (event.key !== 'Delete' && event.key !== 'Backspace') return;
      event.preventDefault();
      removeSelectedStation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [removeSelectedStation, selectedStationId]);

  const undo = useCallback(() => {
    if (collapseView) return;
    const previous = history.at(-1);
    if (!previous) return;
    setFuture(current => [...current, plan]);
    setPlan(previous);
    setHistory(current => current.slice(0, -1));
  }, [collapseView, history, plan]);

  const redo = useCallback(() => {
    if (collapseView) return;
    const next = future.at(-1);
    if (!next) return;
    setHistory(current => [...current, plan]);
    setPlan(next);
    setFuture(current => current.slice(0, -1));
  }, [collapseView, future, plan]);

  const share = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#plan=${encodePlan(plan)}`;
    window.history.replaceState(null, '', url);
    try {
      await navigator.clipboard.writeText(url);
      setNotice('Share link copied');
    } catch {
      setNotice('Share link ready in the address bar');
    }
    window.setTimeout(() => setNotice(''), 2200);
  }, [plan]);

  const reset = useCallback(() => {
    if (plan.lanes.length === 0 && plan.stations.length === 0) return;
    updatePlan(emptyPlan);
    setSelectedStationId(null);
  }, [plan, updatePlan]);

  const toggleCollapseView = useCallback((enabled: boolean) => {
    setCollapseView(enabled);
    if (enabled) setSelectedStationId(null);
  }, []);

  return (
    <div class="app">
      <main class="workspace">
        <aside class="catalog panel">
          <div class="toolbar">
            <button onClick={undo} disabled={collapseView || !history.length} title="Undo (⌘Z)">↶ Undo</button>
            <button onClick={redo} disabled={collapseView || !future.length} title="Redo (⇧⌘Z)">↷ Redo</button>
            <button onClick={() => void share()} class="share-button">↗ Share link</button>
            <button onClick={reset} disabled={collapseView} class="quiet-button">Reset</button>
          </div>
          <div class="panel-heading">
            <div><span class="section-kicker">01 / CATALOG</span><h2>Materials</h2></div>
            <span class="count">{filteredMaterials.length}</span>
          </div>
          <label class="search-box">
            <span>⌕</span>
            <input value={search} onInput={event => setSearch((event.currentTarget as HTMLInputElement).value)} placeholder="Search items and fluids" />
          </label>
          <p class="catalog-help">Drag a material into the bus, or drop it below the stations to add one.</p>
          <div class="item-list">
            {filteredMaterials.map(material => <ItemCard key={material.id} material={material} onDragStart={onDragStart} disabled={collapseView} />)}
          </div>
        </aside>

        <section class="planner panel">
          <div class="planner-heading">
            <div><span class="section-kicker">02 / FIELD</span><h2>Your bus</h2></div>
            <div class="planner-options">
              <label class="collapse-toggle" title="Place adjacent lanes in one column when their visible segments do not overlap">
                <input type="checkbox" checked={collapseView} onChange={event => toggleCollapseView((event.currentTarget as HTMLInputElement).checked)} />
                Collapse view
              </label>
              <span class="field-hint">bottom → top <span class="arrow">↑</span></span>
            </div>
          </div>
          <div class="bus-shell">
            <div class="bus-columns" ref={stageRef}>
            <div class="station-bay left-bay">
              <div class="bay-label">◂ stations</div>
              {plan.stations.map((station, index) => station.side === 'left' ? (
                <StationCard key={station.id} station={station} index={index} isFirst={index === 0} isLast={index === plan.stations.length - 1} selected={selectedStationId === station.id} onSelect={setSelectedStationId} onDragStart={onDragStart} onDrop={handleDrop} onToggleSide={toggleStationSide} onMove={moveStation} portRef={element => registerStationPort(station.id, element)} editingDisabled={collapseView} />
              ) : <div key={station.id} class="station-spacer" />)}
            </div>
            <div
              class="lanes"
              onDragOver={event => event.preventDefault()}
              onDrop={event => handleDrop('lane', event)}
            >
              {plan.lanes.length === 0 ? (
                <div class="empty-field"><div class="empty-icon">＋</div><strong>Drop items here to create lanes</strong><span>Your bus grows upward from each item's lowest producing station.</span></div>
              ) : (
                visibleLaneGroups.map(group => group.length === 1 ? (
                  <LaneColumn key={group[0]!.id} lane={group[0]!} onDragStart={onDragStart} onDrop={handleDrop} onRemove={removeLane} spineRef={element => registerLaneSpine(group[0]!.id, element)} editingDisabled={collapseView} />
                ) : (
                  <div class="lane-column-group" key={group.map(lane => lane.id).join(':')}>
                    {group.map((lane, index) => (
                      <LaneColumn key={lane.id} lane={lane} onDragStart={onDragStart} onDrop={handleDrop} onRemove={removeLane} spineRef={element => registerLaneSpine(lane.id, element)} editingDisabled collapsedIndex={index} />
                    ))}
                  </div>
                ))
              )}
            </div>
            <div class="station-bay right-bay">
              <div class="bay-label">stations ▸</div>
              {plan.stations.map((station, index) => station.side === 'right' ? (
                <StationCard key={station.id} station={station} index={index} isFirst={index === 0} isLast={index === plan.stations.length - 1} selected={selectedStationId === station.id} onSelect={setSelectedStationId} onDragStart={onDragStart} onDrop={handleDrop} onToggleSide={toggleStationSide} onMove={moveStation} portRef={element => registerStationPort(station.id, element)} editingDisabled={collapseView} />
              ) : <div key={station.id} class="station-spacer" />)}
            </div>
            <BeltOverlay plan={plan} stageRef={stageRef} stationPortRefs={stationPortRefs} laneSpineRefs={laneSpineRefs} collapseView={collapseView} inSituLaneIds={inSituLaneIds} />
            </div>
            <div
              class="add-station-row"
              onDragOver={event => event.preventDefault()}
              onDrop={event => handleDrop('station-add', event)}
            >
              {collapseView ? 'Collapse view is read-only · uncheck it to edit the plan' : 'Drop an item here to add a station · use ⇄ on a station to flip which side it taps from'}
            </div>
          </div>
          {plan.lanes.length > 0 && <div class="legend"><span class="legend-line" /> normal flow <span class="legend-line dashed" /> counterflow <span class="legend-note">{collapseView ? 'Read-only collapsed layout' : 'Select a station to edit its bus inputs'}</span></div>}
        </section>
      </main>

      {selectedStation && (
        <div class="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setSelectedStationId(null); }}>
          <section class="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-title">
            <button class="modal-close" onClick={() => setSelectedStationId(null)} aria-label="Close">×</button>
            <div class="modal-material"><MaterialIcon material={materialById.get(selectedStation.material)} /></div>
            <span class="section-kicker">STATION / {selectedStation.side.toUpperCase()}</span>
            <h2 id="recipe-title">{materialName(selectedStation.material)}</h2>
            {selectedStationRecipe && selectedStationRecipe.inputs.length > 0 && (
              <div class="recipe-info">
                <h3>Recipe inputs</h3>
                <div class="recipe-inputs">
                  {selectedStationRecipe.inputs.map(input => (
                    <span class="recipe-input" key={input.material} title={`${input.amount} ${materialName(input.material)}`}>
                      <MaterialIcon material={materialById.get(input.material)} size="small" />
                      <span>{materialName(input.material)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div class="lane-inputs">
              <h3>Bus inputs</h3>
              {plan.lanes.length > 0 ? (
                <div class="lane-input-grid">
                  {plan.lanes.map(lane => {
                    const name = materialName(lane.material);
                    return (
                      <label class="lane-input-cell" key={lane.id} title={`${name}: ${pullsLaneFromBus(selectedStation, lane.id) ? 'pulling from bus' : 'not pulled'}`}>
                        <input
                          type="checkbox"
                          checked={pullsLaneFromBus(selectedStation, lane.id)}
                          onChange={event => setLaneSource(lane.id, (event.currentTarget as HTMLInputElement).checked)}
                          aria-label={`Pull ${name} from this lane`}
                        />
                        <MaterialIcon material={materialById.get(lane.material)} />
                        <span class="lane-input-name">{name}</span>
                      </label>
                    );
                  })}
                </div>
              ) : <p class="modal-help">Add lanes to the bus, then choose which ones this station consumes.</p>}
            </div>
            <button class="remove-button" onClick={removeSelectedStation}>Dismantle station</button>
          </section>
        </div>
      )}
      {notice && <div class="notice">{notice}</div>}
      <Footer />
    </div>
  );
};

type ConnectorKind = 'input' | 'output';

interface LogicalConnector {
  id: string;
  stationId: string;
  laneId: string;
  kind: ConnectorKind;
  counterflow: boolean;
}

interface Point {
  x: number;
  y: number;
}

// A lane spine spans the whole height of the lane track; we only need its x
// position plus the pixel y of its top and bottom edges.
interface LaneMetrics {
  x: number;
  top: number;
  bottom: number;
}

interface MeasuredLayout {
  width: number;
  height: number;
  stationPorts: Map<string, Point>;
  laneSpines: Map<string, LaneMetrics>;
}

interface BeltOverlayProps {
  plan: Plan;
  stageRef: { current: HTMLDivElement | null };
  stationPortRefs: { current: Map<string, HTMLSpanElement> };
  laneSpineRefs: { current: Map<string, HTMLSpanElement> };
  collapseView: boolean;
  inSituLaneIds: ReadonlySet<string>;
}

// One fixed elbow radius everywhere -- never variable, never zero. Every
// connector turns from a horizontal run into the vertical lane with the exact
// same quarter-circle curve, always bending upward (the direction the bus flows).
const QUARTER_TURN_CONTROL = 0.5522848;
const ELBOW_RADIUS = 12;
// Multiple connectors from one station are stacked into distinct rows around
// the station's own center row, closest-lane-first, so their horizontal runs
// don't needlessly cross one another.
const TAP_SPACING = 11;
// Radius of the little "hop" bump drawn where a connector's horizontal run
// crosses over a lane spine it isn't actually connecting to.
const HOP_RADIUS = 6;
const COLLAPSED_LANE_ICON_SIZE = 18;

function stationProducesMaterial(station: Station, materialId: string): boolean {
  return station.material === materialId;
}

// Stations render top-to-bottom in DOM order (index 0 at the top). The bus flows
// bottom-to-top, so the "lowest" (origination) station for a material is the one
// with the LARGEST index among producers -- the one physically closest to the
// bottom of the screen. Picking the smallest index here was a long-standing bug.
function laneOrigin(plan: Plan, materialId: string): number | null {
  let originIndex: number | null = null;
  plan.stations.forEach((station, index) => {
    if (stationProducesMaterial(station, materialId)) originIndex = index;
  });
  return originIndex;
}

function laneOnlyCounterflowsFromOrigin(plan: Plan, lane: Lane, origin: number | null): boolean {
  if (origin === null) return false;
  let hasCounterflowPull = false;
  for (const [stationIndex, station] of plan.stations.entries()) {
    if (stationIndex < origin && (stationProducesMaterial(station, lane.material) || pullsLaneFromBus(station, lane.id))) {
      return false;
    }
    if (stationIndex > origin && pullsLaneFromBus(station, lane.id)) hasCounterflowPull = true;
  }
  return hasCounterflowPull;
}

function buildLogicalConnectors(plan: Plan): LogicalConnector[] {
  const plannedLaneIds = new Set(plan.lanes.map(lane => lane.id));
  const laneOrigins = new Map(plan.lanes.map(lane => [lane.id, laneOrigin(plan, lane.material)]));
  const counterflowOnlyLaneIds = new Set(
    plan.lanes
      .filter(lane => laneOnlyCounterflowsFromOrigin(plan, lane, laneOrigins.get(lane.id) ?? null))
      .map(lane => lane.id),
  );
  const connectors = plan.stations.flatMap((station, stationIndex) => {
    const inputLaneIds = new Set((station.busInputs ?? []).filter(laneId => plannedLaneIds.has(laneId)));
    const outputLaneIds = new Set(
      plan.lanes
        .filter(lane => lane.material === station.material)
        .map(lane => lane.id),
    );
    return plan.lanes.flatMap(lane => {
      const stationConnectors: LogicalConnector[] = [];
      if (inputLaneIds.has(lane.id)) {
        const origin = laneOrigins.get(lane.id) ?? null;
        stationConnectors.push({
          id: `${station.id}:input:${lane.id}`,
          stationId: station.id,
          laneId: lane.id,
          kind: 'input',
          counterflow: origin !== null && stationIndex > origin,
        });
      }
      if (outputLaneIds.has(lane.id)) {
        stationConnectors.push({
          id: `${station.id}:output:${lane.id}`,
          stationId: station.id,
          laneId: lane.id,
          kind: 'output',
          counterflow: counterflowOnlyLaneIds.has(lane.id) && stationIndex === laneOrigins.get(lane.id),
        });
      }
      return stationConnectors;
    });
  });
  return connectors;
}

// Every station connector runs horizontally at a fixed offset from the
// station's own row, then turns a single fixed-radius quarter circle to merge
// into the vertical lane. Regular outputs merge upward and regular inputs bend
// downward. Counterflow-only outputs bend down into the dashed lane, while
// counterflow inputs meet that descending lane above their consuming station.
// Any other lane spine the horizontal run passes over (without connecting to
// it) gets a small circuit-diagram-style "hop" bump so crossings never read
// as a connection.
function connectorVerticalDirection(kind: ConnectorKind, counterflow: boolean): -1 | 1 {
  if (counterflow) return kind === 'output' ? 1 : -1;
  return kind === 'output' ? -1 : 1;
}

function connectorPath(start: Point, rowOffset: number, laneX: number, kind: ConnectorKind, counterflow: boolean, hopXs: number[]): string {
  const rowY = start.y + rowOffset;
  const dx = laneX - start.x;
  const sign = dx >= 0 ? 1 : -1;
  const radius = Math.min(ELBOW_RADIUS, Math.abs(dx));
  const vDir = connectorVerticalDirection(kind, counterflow);
  const entryX = laneX - sign * radius;
  const curveEndY = rowY + vDir * radius;
  const control = QUARTER_TURN_CONTROL * radius;
  const c1x = entryX + sign * control;
  const c2y = curveEndY - vDir * control;

  let d = `M ${start.x} ${start.y}`;
  if (rowOffset !== 0) d += ` V ${rowY}`;

  const sweepFlag = sign > 0 ? 1 : 0;
  const orderedHops = [...hopXs].sort((a, b) => sign > 0 ? a - b : b - a);
  for (const hopX of orderedHops) {
    d += ` H ${hopX - sign * HOP_RADIUS} A ${HOP_RADIUS} ${HOP_RADIUS} 0 0 ${sweepFlag} ${hopX + sign * HOP_RADIUS} ${rowY}`;
  }
  d += ` H ${entryX} C ${c1x} ${rowY} ${laneX} ${c2y} ${laneX} ${curveEndY}`;
  return d;
}

function BeltOverlay({ plan, stageRef, stationPortRefs, laneSpineRefs, collapseView, inSituLaneIds }: BeltOverlayProps) {
  const [layout, setLayout] = useState<MeasuredLayout | null>(null);
  const connectors = useMemo(() => buildLogicalConnectors(plan), [plan]);

  useLayoutEffect(() => {
    let disposed = false;
    let frame = 0;
    const stage = stageRef.current;
    setLayout(null);
    if (!stage || plan.lanes.length === 0) return () => undefined;

    const measure = () => {
      if (disposed) return;
      const stageRect = stage.getBoundingClientRect();
      const stageLeft = stageRect.left + stage.clientLeft;
      const stageTop = stageRect.top + stage.clientTop - stage.scrollTop;
      const width = stage.clientWidth;
      const height = stage.scrollHeight;
      if (width <= 0 || height <= 0) return;

      const stationPorts = new Map<string, Point>();
      for (const station of plan.stations) {
        const anchor = stationPortRefs.current.get(station.id);
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        stationPorts.set(station.id, {
          x: rect.left + rect.width / 2 - stageLeft,
          y: rect.top + rect.height / 2 - stageTop,
        });
      }

      const laneSpines = new Map<string, LaneMetrics>();
      for (const lane of plan.lanes) {
        const anchor = laneSpineRefs.current.get(lane.id);
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        laneSpines.set(lane.id, {
          x: rect.left + rect.width / 2 - stageLeft,
          top: rect.top - stageTop,
          bottom: rect.bottom - stageTop,
        });
      }

      setLayout({ width, height, stationPorts, laneSpines });
    };

    const scheduleMeasure = () => {
      if (disposed) return;
      setLayout(null);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleMeasure);
    observer?.observe(stage);
    stationPortRefs.current.forEach(anchor => observer?.observe(anchor));
    laneSpineRefs.current.forEach(anchor => observer?.observe(anchor));
    scheduleMeasure();

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [collapseView, laneSpineRefs, plan, stageRef, stationPortRefs]);

  if (!layout || plan.lanes.length === 0) return null;

  // Multiple connectors from the same station are stacked into distinct rows
  // around its center, nearest lane first, so their horizontal runs don't
  // cross each other more than necessary.
  const tapOffsets = new Map<string, number>();
  const byStation = new Map<string, LogicalConnector[]>();
  for (const connector of connectors) {
    const list = byStation.get(connector.stationId) ?? [];
    list.push(connector);
    byStation.set(connector.stationId, list);
  }
  for (const [stationId, list] of byStation) {
    const stationPort = layout.stationPorts.get(stationId);
    if (!stationPort) continue;
    const withDistance = list.map(connector => {
      const laneSpine = layout.laneSpines.get(connector.laneId);
      return { connector, dx: laneSpine ? Math.abs(laneSpine.x - stationPort.x) : 0 };
    });
    withDistance.sort((a, b) => {
      const aIsCounterflowOnlyOutput = a.connector.kind === 'output' && a.connector.counterflow;
      const bIsCounterflowOnlyOutput = b.connector.kind === 'output' && b.connector.counterflow;
      if (aIsCounterflowOnlyOutput !== bIsCounterflowOnlyOutput) return aIsCounterflowOnlyOutput ? 1 : -1;
      return a.dx - b.dx;
    });
    const count = withDistance.length;
    withDistance.forEach(({ connector }, i) => {
      tapOffsets.set(connector.id, (i - (count - 1) / 2) * TAP_SPACING);
    });
  }

  // Each lane begins at its lowest producer and ends at its topmost tap,
  // avoiding a misleading line that continues indefinitely above the plan.
  const laneRanges = new Map<string, LaneMetrics>();
  const laneCounterflow = new Set<string>();
  for (const lane of plan.lanes) {
    const metrics = layout.laneSpines.get(lane.id);
    if (!metrics) continue;
    const originIndex = laneOrigin(plan, lane.material);
    const laneConnectors = connectors.filter(connector => connector.laneId === lane.id);
    const tapEndpoints = laneConnectors.flatMap(connector => {
      const port = layout.stationPorts.get(connector.stationId);
      if (!port) return [];
      const offset = tapOffsets.get(connector.id) ?? 0;
      return [port.y + offset + connectorVerticalDirection(connector.kind, connector.counterflow) * ELBOW_RADIUS];
    });
    if (tapEndpoints.length === 0) continue;

    let bottom = metrics.bottom;
    let top = Math.min(...tapEndpoints);
    if (originIndex !== null) {
      const originStation = plan.stations[originIndex];
      const originPort = originStation ? layout.stationPorts.get(originStation.id) : undefined;
      let originY: number | null = null;
      if (originStation && originPort) {
        const offset = tapOffsets.get(`${originStation.id}:output:${lane.id}`) ?? 0;
        const originConnector = laneConnectors.find(connector => connector.id === `${originStation.id}:output:${lane.id}`);
        originY = originPort.y + offset + connectorVerticalDirection('output', originConnector?.counterflow ?? false) * ELBOW_RADIUS;
        bottom = originY;
        top = Math.min(top, originY);
      }
      const counterflowBottom = laneConnectors
        .filter(connector => connector.counterflow)
        .map(connector => {
          const port = layout.stationPorts.get(connector.stationId);
          if (!port) return null;
          const offset = tapOffsets.get(connector.id) ?? 0;
          return port.y + offset + connectorVerticalDirection(connector.kind, connector.counterflow) * ELBOW_RADIUS;
        })
        .filter((endpoint): endpoint is number => endpoint !== null)
        .reduce<number | null>((lowest, endpoint) => lowest === null ? endpoint : Math.max(lowest, endpoint), null);
      if (counterflowBottom !== null && counterflowBottom > bottom) {
        bottom = counterflowBottom;
        laneCounterflow.add(lane.id);
      }
    }
    laneRanges.set(lane.id, { x: metrics.x, top, bottom });
  }

  // Lane spines: solid from the origin station up to the top; if a station
  // below the origin still pulls from this lane (counterflow), extend a
  // dashed segment from the origin down to that station's row so the tap
  // always has something visible to connect into.
  const laneSpineElements = plan.lanes.map(lane => {
    const range = laneRanges.get(lane.id);
    if (!range) return null;
    const originIndex = laneOrigin(plan, lane.material);
    const originStation = originIndex !== null ? plan.stations[originIndex] : undefined;
    const originPort = originStation ? layout.stationPorts.get(originStation.id) : undefined;
    const originOffset = originStation ? (tapOffsets.get(`${originStation.id}:output:${lane.id}`) ?? 0) : 0;
    const originConnector = originStation ? connectors.find(connector => connector.id === `${originStation.id}:output:${lane.id}`) : undefined;
    const originY = originPort
      ? originPort.y + originOffset + connectorVerticalDirection('output', originConnector?.counterflow ?? false) * ELBOW_RADIUS
      : range.bottom;
    const hasUpwardSpine = range.top < originY;

    return (
      <g key={lane.id}>
        {hasUpwardSpine && <line class="lane-spine" x1={range.x} y1={originY} x2={range.x} y2={range.top} />}
        {laneCounterflow.has(lane.id) && (
          <line class="lane-spine counterflow" x1={range.x} y1={originY} x2={range.x} y2={range.bottom} />
        )}
        {hasUpwardSpine && <polygon class="lane-arrowhead" points={`${range.x - 6},${range.top + 11} ${range.x + 6},${range.top + 11} ${range.x},${range.top}`} />}
      </g>
    );
  });
  const collapsedLaneIndicators = plan.lanes.map(lane => {
    if (!inSituLaneIds.has(lane.id)) return null;
    const range = laneRanges.get(lane.id);
    const material = materialById.get(lane.material);
    if (!range || !material) return null;
    return (
      <image
        key={lane.id}
        class="collapsed-lane-indicator"
        href={material.icon}
        x={range.x - COLLAPSED_LANE_ICON_SIZE / 2}
        y={Math.max(0, range.top - COLLAPSED_LANE_ICON_SIZE - 4)}
        width={COLLAPSED_LANE_ICON_SIZE}
        height={COLLAPSED_LANE_ICON_SIZE}
        preserveAspectRatio="xMidYMid meet"
      />
    );
  });

  return (
    <svg
      class="belt-overlay"
      aria-hidden="true"
      width={layout.width}
      height={layout.height}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
    >
      {laneSpineElements}
      {connectors.map(connector => {
        const stationPort = layout.stationPorts.get(connector.stationId);
        const laneSpine = layout.laneSpines.get(connector.laneId);
        if (!stationPort || !laneSpine) return null;

        const rowOffset = tapOffsets.get(connector.id) ?? 0;
        const rowY = stationPort.y + rowOffset;
        const lo = Math.min(stationPort.x, laneSpine.x);
        const hi = Math.max(stationPort.x, laneSpine.x);
        const hopXs: number[] = [];
        for (const [laneId, range] of laneRanges) {
          if (laneId === connector.laneId) continue;
          if (range.x <= lo || range.x >= hi) continue;
          if (rowY < range.top || rowY > range.bottom) continue;
          hopXs.push(range.x);
        }

        const path = connectorPath(stationPort, rowOffset, laneSpine.x, connector.kind, connector.counterflow, hopXs);

        return <path key={connector.id} class={`connector ${connector.kind} ${connector.counterflow ? 'counterflow' : ''}`} d={path} />;
      })}
      {collapsedLaneIndicators}
    </svg>
  );
}


interface StationCardProps {
  station: Station;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onDragStart: (payload: DragPayload) => void;
  onDrop: (target: string, event: DragEvent) => void;
  onToggleSide: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  portRef: (element: HTMLSpanElement | null) => void;
  editingDisabled: boolean;
}

function StationCard({ station, index, isFirst, isLast, selected, onSelect, onDragStart, onDrop, onToggleSide, onMove, portRef, editingDisabled }: StationCardProps) {
  return (
    <div
      class={`station-card ${selected ? 'selected' : ''}`}
      role="button"
      tabIndex={editingDisabled ? -1 : 0}
      draggable={!editingDisabled}
      onClick={() => { if (!editingDisabled) onSelect(station.id); }}
      onKeyDown={event => { if (!editingDisabled && (event.key === 'Enter' || event.key === ' ')) onSelect(station.id); }}
      onDragStart={() => { if (!editingDisabled) onDragStart({ kind: 'station', id: station.id }); }}
      onDragOver={event => { if (!editingDisabled) event.preventDefault(); }}
      onDrop={event => {
        if (editingDisabled) return;
        event.preventDefault();
        event.stopPropagation();
        onDrop(station.id, event);
      }}
      title={`${materialName(station.material)} · station ${index + 1}${editingDisabled ? '' : ' · click to edit bus inputs'}`}
    >
      <span ref={portRef} class={`station-port-anchor ${station.side}`} aria-hidden="true" />
      <MaterialIcon material={materialById.get(station.material)} />
      {!editingDisabled && <span class="station-controls">
        <button
          class="move-button"
          disabled={isFirst}
          title="Move up (toward the top of the bus)"
          onClick={event => { event.stopPropagation(); onMove(station.id, -1); }}
        >▲</button>
        <button
          class="side-toggle"
          title={`Tapping from the ${station.side} side · click to flip`}
          onClick={event => { event.stopPropagation(); onToggleSide(station.id); }}
        >⇄</button>
        <button
          class="move-button"
          disabled={isLast}
          title="Move down (toward the bottom of the bus)"
          onClick={event => { event.stopPropagation(); onMove(station.id, 1); }}
        >▼</button>
      </span>}
    </div>
  );
}

function LaneColumn({ lane, onDragStart, onDrop, onRemove, spineRef, editingDisabled, collapsedIndex }: { lane: Lane; onDragStart: (payload: DragPayload) => void; onDrop: (target: string, event: DragEvent) => void; onRemove: (id: string) => void; spineRef: (element: HTMLSpanElement | null) => void; editingDisabled: boolean; collapsedIndex?: number }) {
  const material = materialById.get(lane.material);
  return (
    <div class={`lane-column ${collapsedIndex === undefined ? '' : 'collapsed'}`} style={collapsedIndex === undefined ? undefined : `--collapse-index: ${collapsedIndex};`} draggable={!editingDisabled} onDragStart={() => { if (!editingDisabled) onDragStart({ kind: 'lane', id: lane.id }); }} onDragOver={event => { if (!editingDisabled) event.preventDefault(); }} onDrop={event => { if (!editingDisabled) onDrop(lane.id, event); }} title={material?.name ?? lane.material}>
      <div class="lane-header">
        <MaterialIcon material={material} />
        {!editingDisabled && <button class="lane-remove" onClick={event => { event.stopPropagation(); onRemove(lane.id); }} aria-label={`Remove ${material?.name ?? lane.material} lane`} title="Remove lane">×</button>}
      </div>
      <div class="lane-track">
        <span ref={spineRef} class="lane-spine-anchor" aria-hidden="true" />
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __busPlannerDrag: DragPayload | undefined;
  }
}
