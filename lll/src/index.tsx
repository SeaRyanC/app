import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ALL_POSITIONS, FIELD_POSITIONS, INFIELD_POSITIONS, OUTFIELD_POSITIONS, generateBestSchedule } from './scheduler.js';
import type { Position, Player, Schedule, InningAssignment } from './scheduler.js';
import { printLineupPDF } from './pdf.js';

const VERSION = '5.4.0';
const COMMIT_HASH = 'dev';
const STORAGE_KEY = 'lll-config';

interface StoredConfig {
    playersText: string;
    here: Record<string, boolean>;
    eligible: Record<string, Partial<Record<Position, boolean>>>;
    plus?: Record<string, Partial<Record<Position, boolean>>>;
    numInnings: number;
}

interface ShareData {
    playersText?: string;
    here?: Record<string, boolean>;
    eligible?: Record<string, Partial<Record<Position, boolean>>>;
    plus?: Record<string, Partial<Record<Position, boolean>>>;
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
    'SS': '5', 'OF': '6', 'Off': '7',
};
const CHAR_TO_POS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'OF', 'Off'];

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

// Roster share URL format (?r=...):
// base64( JSON { p: string[], n: number, b: base64(binary bits), v?: number } )
// v1 (no v field): 1 bit here + 8 bits eligibility per player (9 bits/player)
// v2 (v: 2):       1 bit here + 8 bits eligibility + 8 bits plus per player (17 bits/player)
interface RosterShareCompact {
    p: string[];
    n: number;
    b: string; // base64 of bit-packed Uint8Array
    v?: number; // 2 = v2 format with plus bits
}

function encodeRosterBinary(
    playerNames: string[],
    hereMap: Record<string, boolean>,
    eligibleMap: Record<string, Record<Position, boolean>>,
    plusMap: Record<string, Record<Position, boolean>>,
    numInnings: number
): string {
    const bitsPerPlayer = 1 + ALL_POSITIONS.length * 2; // 1 here + 8 eligible + 8 plus = 17
    const totalBits = playerNames.length * bitsPerPlayer;
    const bytes = new Uint8Array(Math.ceil(totalBits / 8));
    let bitIdx = 0;
    for (const name of playerNames) {
        const byteIdx0 = bitIdx >> 3;
        if (hereMap[name] ?? true) bytes[byteIdx0] = (bytes[byteIdx0] ?? 0) | (1 << (7 - (bitIdx & 7)));
        bitIdx++;
        for (const pos of ALL_POSITIONS) {
            const byteIdx = bitIdx >> 3;
            if (eligibleMap[name]?.[pos] ?? true) bytes[byteIdx] = (bytes[byteIdx] ?? 0) | (1 << (7 - (bitIdx & 7)));
            bitIdx++;
        }
        for (const pos of ALL_POSITIONS) {
            const byteIdx = bitIdx >> 3;
            if (plusMap[name]?.[pos] ?? false) bytes[byteIdx] = (bytes[byteIdx] ?? 0) | (1 << (7 - (bitIdx & 7)));
            bitIdx++;
        }
    }
    let binaryStr = '';
    for (let i = 0; i < bytes.length; i++) binaryStr += String.fromCharCode(bytes[i]!);
    const compact: RosterShareCompact = { p: playerNames, n: numInnings, b: btoa(binaryStr), v: 2 };
    return btoa(encodeURIComponent(JSON.stringify(compact)));
}

interface DecodedRoster {
    playersText: string;
    hereMap: Record<string, boolean>;
    eligibleMap: Record<string, Record<Position, boolean>>;
    plusMap: Record<string, Record<Position, boolean>>;
    numInnings: number;
}

function decodeRosterBinary(encoded: string): DecodedRoster {
    const compact = JSON.parse(decodeURIComponent(atob(encoded))) as RosterShareCompact;
    const binaryStr = atob(compact.b);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
    const hereMap: Record<string, boolean> = {};
    const eligibleMap: Record<string, Record<Position, boolean>> = {};
    const plusMap: Record<string, Record<Position, boolean>> = {};
    const isV2 = compact.v === 2;
    let bitIdx = 0;
    for (const name of compact.p) {
        hereMap[name] = !!(bytes[bitIdx >> 3]! & (1 << (7 - (bitIdx & 7))));
        bitIdx++;
        const elig = defaultEligible();
        for (const pos of ALL_POSITIONS) {
            elig[pos] = !!(bytes[bitIdx >> 3]! & (1 << (7 - (bitIdx & 7))));
            bitIdx++;
        }
        eligibleMap[name] = elig;
        if (isV2) {
            const plus = defaultPlus();
            for (const pos of ALL_POSITIONS) {
                plus[pos] = !!(bytes[bitIdx >> 3]! & (1 << (7 - (bitIdx & 7))));
                bitIdx++;
            }
            plusMap[name] = plus;
        }
    }
    return { playersText: compact.p.join('\n'), hereMap, eligibleMap, plusMap, numInnings: compact.n };
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

function defaultPlus(): Record<Position, boolean> {
    const result = {} as Record<Position, boolean>;
    for (const pos of ALL_POSITIONS) {
        result[pos] = false;
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

function buildPlusMap(raw: Record<string, Partial<Record<Position, boolean>>>): Record<string, Record<Position, boolean>> {
    const result: Record<string, Record<Position, boolean>> = {};
    for (const [name, e] of Object.entries(raw)) {
        const full = defaultPlus();
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
    const [plusMap, setPlusMap] = useState<Record<string, Record<Position, boolean>>>({});
    const [numInnings, setNumInnings] = useState<number>(7);
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [battingOrder, setBattingOrder] = useState<string[]>([]);
    const [failureMessage, setFailureMessage] = useState<string | undefined>(undefined);
    const [rosterShareCopied, setRosterShareCopied] = useState(false);

    // Load from URL or localStorage on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const r = params.get('r');
        if (r) {
            try {
                const data = decodeRosterBinary(r);
                setPlayersText(data.playersText);
                setHereMap(data.hereMap);
                setNumInnings(data.numInnings);
                setEligibleMap(data.eligibleMap);
                setPlusMap(data.plusMap);
                return;
            } catch {
                // ignore, fall through to 's' param or localStorage
            }
        }
        const s = params.get('s');
        if (s) {
            try {
                const data = JSON.parse(decodeURIComponent(atob(s))) as ShareData;
                setPlayersText(data.playersText ?? '');
                setHereMap(data.here ?? {});
                setNumInnings(data.numInnings ?? 7);
                setEligibleMap(buildEligibleMap(data.eligible ?? {}));
                setPlusMap(buildPlusMap(data.plus ?? {}));
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
                setPlusMap(buildPlusMap(config.plus ?? {}));
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
            plus: plusMap,
            numInnings,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }, [playersText, hereMap, eligibleMap, plusMap, numInnings]);

    const playerNames = parsePlayers(playersText);

    function getHere(name: string): boolean {
        return hereMap[name] ?? true;
    }

    function getEligible(name: string, pos: Position): boolean {
        return eligibleMap[name]?.[pos] ?? true;
    }

    function getPlus(name: string, pos: Position): boolean {
        return plusMap[name]?.[pos] ?? false;
    }

    function setHere(name: string, value: boolean) {
        setHereMap(prev => ({ ...prev, [name]: value }));
        setSchedule(null);
        setBattingOrder([]);
        setFailureMessage(undefined);
    }

    function setEligible(name: string, pos: Position, value: boolean) {
        setEligibleMap(prev => {
            const existing = prev[name] ?? defaultEligible();
            return { ...prev, [name]: { ...existing, [pos]: value } };
        });
        if (!value) {
            // Clear "+" when eligibility is removed — "+" has no effect without eligibility
            setPlusMap(prev => {
                const existing = prev[name] ?? defaultPlus();
                return { ...prev, [name]: { ...existing, [pos]: false } };
            });
        }
        setSchedule(null);
        setBattingOrder([]);
        setFailureMessage(undefined);
    }

    function setPlus(name: string, pos: Position, value: boolean) {
        setPlusMap(prev => {
            const existing = prev[name] ?? defaultPlus();
            return { ...prev, [name]: { ...existing, [pos]: value } };
        });
        setSchedule(null);
        setBattingOrder([]);
        setFailureMessage(undefined);
    }

    function buildPlayers(): Player[] {
        return playerNames.map(name => ({
            name,
            here: getHere(name),
            eligible: ALL_POSITIONS.reduce((acc, pos) => {
                acc[pos] = getEligible(name, pos);
                return acc;
            }, {} as Record<Position, boolean>),
            plus: ALL_POSITIONS.reduce((acc, pos) => {
                acc[pos] = getPlus(name, pos);
                return acc;
            }, {} as Record<Position, boolean>),
        }));
    }

    function handleGenerate() {
        const players = buildPlayers();
        const result = generateBestSchedule(players, numInnings);
        if (result === null) {
            setSchedule(null);
            setBattingOrder([]);
            setFailureMessage(undefined);
        } else {
            setSchedule(result.schedule.length > 0 ? result.schedule : null);
            setBattingOrder(result.battingOrder);
            setFailureMessage(result.failureMessage);
        }
    }

    function handleShareRoster() {
        const encoded = encodeRosterBinary(playerNames, hereMap, eligibleMap, plusMap, numInnings);
        const url = `${window.location.origin}${window.location.pathname}?r=${encodeURIComponent(encoded)}`;
        window.history.replaceState(null, '', url);
        navigator.clipboard?.writeText(url).catch(() => {});
        setRosterShareCopied(true);
        setTimeout(() => setRosterShareCopied(false), 2000);
    }

    function handleShareLineup() {
        const viewData: LineupViewData = {
            players: battingOrder,
            schedule: schedule!,
            numInnings,
        };
        const encoded = encodeLineupCompact(viewData);
        const url = `${window.location.origin}${window.location.pathname}?lineup=${encodeURIComponent(encoded)}`;
        window.open(url, '_blank');
    }

    function handlePrint() {
        printLineupPDF({
            players: battingOrder,
            schedule: schedule!,
            numInnings,
        });
    }

    function handlePlayersTextChange(text: string) {
        setPlayersText(text);
        setSchedule(null);
        setBattingOrder([]);
        setFailureMessage(undefined);
    }

    function handleNumInningsChange(val: number) {
        setNumInnings(val);
        setSchedule(null);
        setBattingOrder([]);
        setFailureMessage(undefined);
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
                    <div class="lineup-header">
                        <h2>Position Eligibility</h2>
                        <button class="btn-share" onClick={handleShareRoster}>
                            {rosterShareCopied ? '✅ Copied!' : '🔗 Share Roster'}
                        </button>
                    </div>
                    <p class="hint">Check each position a player is eligible to play. Use the <strong>+</strong> column to give a player priority for that position — they will be chosen before non-+ players when constructing the lineup.</p>
                    <div class="table-scroll">
                        <table class="eligibility-table">
                            <thead>
                                <tr>
                                    <th class="col-here">Here</th>
                                    <th class="col-name">Player</th>
                                    {ALL_POSITIONS.map(pos => (
                                        <>
                                            <th key={pos} class="col-pos">{pos}</th>
                                            <th key={pos + '+'} class="col-pos-plus">{pos}+</th>
                                        </>
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
                                            <>
                                                <td key={pos} class="col-pos">
                                                    <input
                                                        type="checkbox"
                                                        checked={getEligible(name, pos)}
                                                        onChange={(e) => setEligible(name, pos, (e.target as HTMLInputElement).checked)}
                                                        aria-label={`${name} eligible for ${pos}`}
                                                    />
                                                </td>
                                                <td key={pos + '+'} class="col-pos-plus">
                                                    <input
                                                        type="checkbox"
                                                        checked={getPlus(name, pos)}
                                                        disabled={!getEligible(name, pos)}
                                                        onChange={(e) => setPlus(name, pos, (e.target as HTMLInputElement).checked)}
                                                        aria-label={`${name} priority for ${pos}`}
                                                    />
                                                </td>
                                            </>
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

            {(schedule !== null || failureMessage) && (
                <section class="section">
                    <div class="lineup-header">
                        <h2>Lineup</h2>
                        {schedule !== null && <>
                            <button class="btn-icon" onClick={handleShareLineup} title="Share Lineup">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.993 2.993 0 0 0 18 8a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A3 3 0 0 0 6 9a3 3 0 0 0 0 6 2.993 2.993 0 0 0 1.96-.77l7.13 4.15c-.05.21-.09.43-.09.65a3 3 0 1 0 3-2.95z"/></svg>
                            </button>
                            <button class="btn-icon" onClick={handlePrint} title="Print / PDF">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                            </button>
                        </>}
                    </div>
                    {failureMessage && (
                        <p class="warning">⚠️ {failureMessage}</p>
                    )}
                    {schedule !== null && <>
                        <ScheduleTable
                            schedule={schedule}
                            battingOrder={battingOrder}
                            numInnings={numInnings}
                        />
                        <h3 class="transposed-heading">By Position</h3>
                        <TransposedTable schedule={schedule} numInnings={numInnings} />
                    </>}
                </section>
            )}

            <Footer />
        </div>
    );
}

interface ScheduleTableProps {
    schedule: Schedule;
    battingOrder: string[];
    numInnings: number;
}

function ScheduleTable({ schedule, battingOrder, numInnings }: ScheduleTableProps) {
    const innings = Array.from({ length: numInnings }, (_, i) => i);

    return (
        <div class="table-scroll">
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th class="col-bat">#</th>
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
                    {battingOrder.map((name, idx) => {
                        let ifCount = 0, ofCount = 0, offCount = 0;
                        for (const i of innings) {
                            const pos = schedule[i]?.[name];
                            if (pos === undefined) continue;
                            if (INFIELD_POSITIONS.has(pos)) ifCount++;
                            else if (OUTFIELD_POSITIONS.has(pos)) ofCount++;
                            else if (pos === 'Off') offCount++;
                        }
                        return (
                            <tr key={name}>
                                <td class="col-bat">{idx + 1}</td>
                                <td class="col-name player-name">{name}</td>
                                {innings.map(i => {
                                    const inningData = schedule[i];
                                    const pos: Position | undefined = inningData?.[name];
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

// All rows to show in the By Position table: field positions then Off bench
const TRANSPOSED_ROWS: Position[] = [...(FIELD_POSITIONS as Position[]), 'Off'];

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
                    {TRANSPOSED_ROWS.map(pos => (
                        <tr key={pos}>
                            <td class="col-name player-name">{pos}</td>
                            {innings.map(i => {
                                const inningData = schedule[i];
                                if (!inningData) return <td key={i} class="col-inning pos-empty">—</td>;
                                // OF and Off can have multiple players; infield positions have at most one
                                const names = Object.entries(inningData)
                                    .filter(([, p]) => p === pos)
                                    .map(([n]) => n);
                                if (names.length === 0) {
                                    return <td key={i} class="col-inning"><span class="pos-empty">—</span></td>;
                                }
                                return (
                                    <td key={i} class={`col-inning${pos === 'Off' ? ' pos-off' : ''}`}>
                                        {names.join(', ')}
                                    </td>
                                );
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
    const [shareCopied, setShareCopied] = useState(false);

    function handlePrint() {
        printLineupPDF({
            players: data.players,
            schedule: data.schedule,
            numInnings: data.numInnings,
        });
    }

    function handleShare() {
        const url = window.location.href;
        navigator.clipboard?.writeText(url).catch(() => {});
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
    }

    return (
        <div class="container">
            <h1>⚾ LLL — Little League Lineup</h1>
            <section class="section">
                <div class="lineup-header">
                    <h2>Lineup</h2>
                    <button class="btn-icon" onClick={handleShare} title={shareCopied ? 'Copied!' : 'Share Lineup'}>
                        {shareCopied
                            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.993 2.993 0 0 0 18 8a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A3 3 0 0 0 6 9a3 3 0 0 0 0 6 2.993 2.993 0 0 0 1.96-.77l7.13 4.15c-.05.21-.09.43-.09.65a3 3 0 1 0 3-2.95z"/></svg>
                        }
                    </button>
                    <button class="btn-icon" onClick={handlePrint} title="Print / PDF">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                    </button>
                </div>
                <ScheduleTable schedule={data.schedule} battingOrder={data.players} numInnings={data.numInnings} />
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
