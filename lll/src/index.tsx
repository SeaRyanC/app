import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ALL_POSITIONS, FIELD_POSITIONS, INFIELD_POSITIONS, OUTFIELD_POSITIONS, generateBestSchedule } from './scheduler.js';
import type { Position, Player, Schedule, InningAssignment } from './scheduler.js';

const VERSION = '2.3.0';
const COMMIT_HASH = 'dev';
const STORAGE_KEY = 'lll-config';
const NUM_ATTEMPTS = 50;

interface StoredConfig {
    playersText: string;
    here: Record<string, boolean>;
    eligible: Record<string, Partial<Record<Position, boolean>>>;
    numInnings: number;
}

interface ShareData {
    playersText?: string;
    here?: Record<string, boolean>;
    eligible?: Record<string, Partial<Record<Position, boolean>>>;
    numInnings?: number;
    schedule?: Schedule | null;
}

interface LineupViewData {
    players: string[];
    schedule: Schedule;
    numInnings: number;
}

// Compact lineup URL format:
// { p: string[], n: number, s: string }
// s is a flat string of length p.length * n; each char is the ALL_POSITIONS index
// for player[j] in inning[i] at offset i * p.length + j.
interface CompactLineupData {
    p: string[];
    n: number;
    s: string;
}

const POS_TO_CHAR: Record<Position, string> = {
    'P': '0', 'C': '1', '1B': '2', '2B': '3', '3B': '4',
    'SS': '5', 'LF': '6', 'CF': '7', 'RF': '8', 'Off': '9',
};
const CHAR_TO_POS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'Off'];

function encodeLineupCompact(data: LineupViewData): string {
    const chars: string[] = [];
    for (let i = 0; i < data.numInnings; i++) {
        for (const player of data.players) {
            const pos = data.schedule[i]?.[player] ?? 'Off';
            chars.push(POS_TO_CHAR[pos]);
        }
    }
    const compact: CompactLineupData = { p: data.players, n: data.numInnings, s: chars.join('') };
    return btoa(encodeURIComponent(JSON.stringify(compact)));
}

function decodeLineupCompact(encoded: string): LineupViewData {
    const compact = JSON.parse(decodeURIComponent(atob(encoded))) as CompactLineupData;
    const expectedLen = compact.p.length * compact.n;
    if (compact.s.length < expectedLen) {
        throw new Error('Compact lineup data is truncated');
    }
    const schedule: Schedule = [];
    for (let i = 0; i < compact.n; i++) {
        const assignment: InningAssignment = {};
        for (let j = 0; j < compact.p.length; j++) {
            const ch = compact.s[i * compact.p.length + j]!;
            const idx = ch >= '0' && ch <= '9' ? parseInt(ch, 10) : 9;
            const pos = CHAR_TO_POS[idx];
            if (pos !== undefined) {
                assignment[compact.p[j]!] = pos;
            }
        }
        schedule.push(assignment);
    }
    return { players: compact.p, schedule, numInnings: compact.n };
}

function parsePlayers(text: string): string[] {
    return text
        .split(/[\n,\t ;]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

function defaultEligible(): Record<Position, boolean> {
    const result = {} as Record<Position, boolean>;
    for (const pos of ALL_POSITIONS) {
        result[pos] = true;
    }
    return result;
}

function buildEligibleMap(raw: Record<string, Partial<Record<Position, boolean>>>): Record<string, Record<Position, boolean>> {
    const result: Record<string, Record<Position, boolean>> = {};
    for (const [name, e] of Object.entries(raw)) {
        const full = defaultEligible();
        for (const pos of ALL_POSITIONS) {
            if (e[pos] !== undefined) {
                full[pos] = e[pos]!;
            }
        }
        result[name] = full;
    }
    return result;
}

function Footer() {
    return (
        <footer class="footer">
            <span>A vibe-coded micro-app via </span>
            <a href="https://searyanc.dev" target="_blank" rel="noopener noreferrer">SeaRyanC</a>
            <a href="https://github.com/SeaRyanC/app/tree/main/lll" class="github-link" target="_blank" rel="noopener noreferrer" title="View source on GitHub">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
            </a>
            <span class="version">v{VERSION}+{COMMIT_HASH}</span>
        </footer>
    );
}

function App() {
    const [playersText, setPlayersText] = useState<string>('');
    const [hereMap, setHereMap] = useState<Record<string, boolean>>({});
    const [eligibleMap, setEligibleMap] = useState<Record<string, Record<Position, boolean>>>({});
    const [numInnings, setNumInnings] = useState<number>(7);
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [shareCopied, setShareCopied] = useState(false);

    // Load from URL or localStorage on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('s');
        if (s) {
            try {
                const data = JSON.parse(decodeURIComponent(atob(s))) as ShareData;
                setPlayersText(data.playersText ?? '');
                setHereMap(data.here ?? {});
                setNumInnings(data.numInnings ?? 7);
                setEligibleMap(buildEligibleMap(data.eligible ?? {}));
                if (data.schedule) setSchedule(data.schedule);
                return;
            } catch {
                // ignore, fall through to localStorage
            }
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const config = JSON.parse(saved) as StoredConfig;
                setPlayersText(config.playersText ?? '');
                setHereMap(config.here ?? {});
                setNumInnings(config.numInnings ?? 7);
                setEligibleMap(buildEligibleMap(config.eligible ?? {}));
            } catch {
                // ignore parse errors
            }
        }
    }, []);

    // Save to localStorage whenever config changes
    useEffect(() => {
        const config: StoredConfig = {
            playersText,
            here: hereMap,
            eligible: eligibleMap,
            numInnings,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }, [playersText, hereMap, eligibleMap, numInnings]);

    const playerNames = parsePlayers(playersText);

    function getHere(name: string): boolean {
        return hereMap[name] ?? true;
    }

    function getEligible(name: string, pos: Position): boolean {
        return eligibleMap[name]?.[pos] ?? true;
    }

    function setHere(name: string, value: boolean) {
        setHereMap(prev => ({ ...prev, [name]: value }));
        setSchedule(null);
    }

    function setEligible(name: string, pos: Position, value: boolean) {
        setEligibleMap(prev => {
            const existing = prev[name] ?? defaultEligible();
            return { ...prev, [name]: { ...existing, [pos]: value } };
        });
        setSchedule(null);
    }

    function buildPlayers(): Player[] {
        return playerNames.map(name => ({
            name,
            here: getHere(name),
            eligible: ALL_POSITIONS.reduce((acc, pos) => {
                acc[pos] = getEligible(name, pos);
                return acc;
            }, {} as Record<Position, boolean>),
        }));
    }

    function handleGenerate() {
        const players = buildPlayers();
        const result = generateBestSchedule(players, numInnings, NUM_ATTEMPTS);
        setSchedule(result);
    }

    function handleShare() {
        const shareData: ShareData = {
            playersText,
            here: hereMap,
            eligible: eligibleMap,
            numInnings,
            schedule,
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
        const url = `${window.location.origin}${window.location.pathname}?s=${encodeURIComponent(encoded)}`;
        window.history.replaceState(null, '', url);
        navigator.clipboard?.writeText(url).catch(() => {});
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
    }

    function handleShareLineup() {
        const presentPlayers = buildPlayers().filter(p => p.here);
        const viewData: LineupViewData = {
            players: presentPlayers.map(p => p.name),
            schedule: schedule!,
            numInnings,
        };
        const encoded = encodeLineupCompact(viewData);
        const url = `${window.location.origin}${window.location.pathname}?lineup=${encodeURIComponent(encoded)}`;
        window.open(url, '_blank');
    }

    function handlePlayersTextChange(text: string) {
        setPlayersText(text);
        setSchedule(null);
    }

    function handleNumInningsChange(val: number) {
        setNumInnings(val);
        setSchedule(null);
    }

    const presentPlayers = playerNames.filter(n => getHere(n));

    return (
        <div class="container">
            <h1>⚾ LLL — Little League Lineup</h1>

            <section class="section">
                <h2>Roster</h2>
                <textarea
                    value={playersText}
                    onInput={(e) => handlePlayersTextChange((e.target as HTMLTextAreaElement).value)}
                    placeholder="Alice, Bob, Charlie&#10;Dana; Eve&#10;Frank"
                    rows={4}
                />
            </section>

            {playerNames.length > 0 && (
                <section class="section">
                    <h2>Position Eligibility</h2>
                    <p class="hint">Check each position a player is eligible to play. Uncheck to exclude a player from a position.</p>
                    <div class="table-scroll">
                        <table class="eligibility-table">
                            <thead>
                                <tr>
                                    <th class="col-here">Here</th>
                                    <th class="col-name">Player</th>
                                    {ALL_POSITIONS.map(pos => (
                                        <th key={pos} class="col-pos">{pos}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {playerNames.map(name => (
                                    <tr key={name} class={getHere(name) ? '' : 'absent'}>
                                        <td class="col-here">
                                            <input
                                                type="checkbox"
                                                checked={getHere(name)}
                                                onChange={(e) => setHere(name, (e.target as HTMLInputElement).checked)}
                                                aria-label={`${name} is here`}
                                            />
                                        </td>
                                        <td class="col-name">{name}</td>
                                        {ALL_POSITIONS.map(pos => (
                                            <td key={pos} class="col-pos">
                                                <input
                                                    type="checkbox"
                                                    checked={getEligible(name, pos)}
                                                    onChange={(e) => setEligible(name, pos, (e.target as HTMLInputElement).checked)}
                                                    aria-label={`${name} eligible for ${pos}`}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {playerNames.length > 0 && (
                <section class="section controls">
                    <label class="innings-label">
                        Innings:
                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={numInnings}
                            onInput={(e) => handleNumInningsChange(Number((e.target as HTMLInputElement).value))}
                            class="innings-input"
                        />
                    </label>
                    <button class="btn-generate" onClick={handleGenerate} disabled={presentPlayers.length === 0}>
                        🎲 Generate Lineup
                    </button>
                    {presentPlayers.length === 0 && (
                        <span class="warning">Mark at least one player as present to generate a lineup.</span>
                    )}
                </section>
            )}

            {schedule !== null && (
                <section class="section">
                    <div class="lineup-header">
                        <h2>Lineup</h2>
                        <button class="btn-share" onClick={handleShare}>
                            {shareCopied ? '✅ Copied!' : '🔗 Share'}
                        </button>
                        <button class="btn-share-lineup" onClick={handleShareLineup}>
                            📋 Share Lineup
                        </button>
                    </div>
                    <ScheduleTable
                        schedule={schedule}
                        players={buildPlayers().filter(p => p.here)}
                        numInnings={numInnings}
                    />
                    <h3 class="transposed-heading">By Position</h3>
                    <TransposedTable schedule={schedule} numInnings={numInnings} />
                </section>
            )}

            <Footer />
        </div>
    );
}

interface ScheduleTableProps {
    schedule: Schedule;
    players: Player[];
    numInnings: number;
}

function ScheduleTable({ schedule, players, numInnings }: ScheduleTableProps) {
    const innings = Array.from({ length: numInnings }, (_, i) => i);

    return (
        <div class="table-scroll">
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th class="col-name">Player</th>
                        {innings.map(i => (
                            <th key={i} class="col-inning">{i + 1}</th>
                        ))}
                        <th class="col-summary">IF</th>
                        <th class="col-summary">OF</th>
                        <th class="col-summary">Off</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => {
                        let ifCount = 0, ofCount = 0, offCount = 0;
                        for (const i of innings) {
                            const pos = schedule[i]?.[player.name];
                            if (pos === undefined) continue;
                            if (INFIELD_POSITIONS.has(pos)) ifCount++;
                            else if (OUTFIELD_POSITIONS.has(pos)) ofCount++;
                            else if (pos === 'Off') offCount++;
                        }
                        return (
                            <tr key={player.name}>
                                <td class="col-name player-name">{player.name}</td>
                                {innings.map(i => {
                                    const inningData = schedule[i];
                                    const pos: Position | undefined = inningData?.[player.name];
                                    if (pos === undefined) {
                                        return <td key={i} class="col-inning pos-empty">—</td>;
                                    }
                                    return (
                                        <td key={i} class={`col-inning${pos === 'Off' ? ' pos-off' : ''}`}>
                                            {pos}
                                        </td>
                                    );
                                })}
                                <td class="col-summary">{ifCount}</td>
                                <td class="col-summary">{ofCount}</td>
                                <td class="col-summary">{offCount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

interface TransposedTableProps {
    schedule: Schedule;
    numInnings: number;
}

function TransposedTable({ schedule, numInnings }: TransposedTableProps) {
    const innings = Array.from({ length: numInnings }, (_, i) => i);

    return (
        <div class="table-scroll">
            <table class="schedule-table transposed-table">
                <thead>
                    <tr>
                        <th class="col-name">Position</th>
                        {innings.map(i => (
                            <th key={i} class="col-inning">{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {FIELD_POSITIONS.map(pos => (
                        <tr key={pos}>
                            <td class="col-name player-name">{pos}</td>
                            {innings.map(i => {
                                const inningData = schedule[i];
                                if (!inningData) return <td key={i} class="col-inning pos-empty">—</td>;
                                const name = Object.entries(inningData).find(([, p]) => p === pos)?.[0];
                                return <td key={i} class="col-inning">{name ?? <span class="pos-empty">—</span>}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface LineupViewerProps {
    data: LineupViewData;
}

function LineupViewer({ data }: LineupViewerProps) {
    const players: Player[] = data.players.map(name => ({
        name,
        here: true,
        eligible: defaultEligible(),
    }));

    return (
        <div class="container">
            <h1>⚾ LLL — Little League Lineup</h1>
            <section class="section">
                <h2>Lineup</h2>
                <ScheduleTable schedule={data.schedule} players={players} numInnings={data.numInnings} />
                <h3 class="transposed-heading">By Position</h3>
                <TransposedTable schedule={data.schedule} numInnings={data.numInnings} />
            </section>
            <Footer />
        </div>
    );
}

const appElement = document.getElementById('app');
if (appElement) {
    const params = new URLSearchParams(window.location.search);
    const lineupParam = params.get('lineup');
    if (lineupParam) {
        try {
            // Try compact format first; fall back to legacy JSON format
            let data: LineupViewData;
            try {
                data = decodeLineupCompact(lineupParam);
            } catch {
                data = JSON.parse(decodeURIComponent(atob(lineupParam))) as LineupViewData;
            }
            render(<LineupViewer data={data} />, appElement);
        } catch {
            render(<App />, appElement);
        }
    } else {
        render(<App />, appElement);
    }
}
