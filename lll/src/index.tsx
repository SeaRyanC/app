import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ALL_POSITIONS, FIELD_POSITIONS, HIGH_INTENSITY, generateBestSchedule } from './scheduler.js';
import type { Position, Player, Schedule } from './scheduler.js';

const VERSION = '1.0.0';
const COMMIT_HASH = 'dev';
const STORAGE_KEY = 'lll-config';
const NUM_ATTEMPTS = 50;

interface StoredConfig {
    playersText: string;
    here: Record<string, boolean>;
    eligible: Record<string, Partial<Record<Position, boolean>>>;
    numInnings: number;
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

function positionClass(pos: Position): string {
    if (HIGH_INTENSITY.has(pos)) return 'pos-high';
    if (pos === 'Bench') return 'pos-bench';
    return 'pos-low';
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

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const config = JSON.parse(saved) as StoredConfig;
                setPlayersText(config.playersText ?? '');
                setHereMap(config.here ?? {});
                setNumInnings(config.numInnings ?? 7);
                // Rebuild eligibleMap with defaults for any missing positions
                const newEligible: Record<string, Record<Position, boolean>> = {};
                for (const [name, e] of Object.entries(config.eligible ?? {})) {
                    const full = defaultEligible();
                    for (const pos of ALL_POSITIONS) {
                        if (e[pos] !== undefined) {
                            full[pos] = e[pos]!;
                        }
                    }
                    newEligible[name] = full;
                }
                setEligibleMap(newEligible);
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

    // Get or create config for a player
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
                <p class="hint">Enter player names separated by commas, newlines, semicolons, or spaces.</p>
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
                                        <th key={pos} class={`col-pos ${positionClass(pos)}-header`}>{pos}</th>
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
                                                    disabled={!getHere(name)}
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
                    <h2>Lineup</h2>
                    <div class="legend">
                        <span class="legend-item pos-high">High intensity (P, C, 1B, 2B)</span>
                        <span class="legend-item pos-low">Low intensity (3B, SS, LF, CF, RF)</span>
                        <span class="legend-item pos-bench">Bench</span>
                    </div>
                    <ScheduleTable
                        schedule={schedule}
                        players={buildPlayers().filter(p => p.here)}
                        numInnings={numInnings}
                    />
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
                            <th key={i} class="col-inning">Inn {i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.name}>
                            <td class="col-name player-name">{player.name}</td>
                            {innings.map(i => {
                                const inningData = schedule[i];
                                const pos: Position | undefined = inningData?.[player.name];
                                if (pos === undefined) {
                                    return <td key={i} class="col-inning pos-empty">—</td>;
                                }
                                return (
                                    <td key={i} class={`col-inning ${positionClass(pos)}`}>
                                        {pos}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td class="col-name summary-label">Field</td>
                        {innings.map(i => {
                            const inningData = schedule[i];
                            if (!inningData) return <td key={i} class="col-inning">—</td>;
                            const fieldPlayers = Object.entries(inningData)
                                .filter(([, pos]) => FIELD_POSITIONS.includes(pos as typeof FIELD_POSITIONS[number]))
                                .map(([, pos]) => pos);
                            return (
                                <td key={i} class="col-inning summary-cell">
                                    {fieldPlayers.length}/{Math.min(players.length, FIELD_POSITIONS.length)}
                                </td>
                            );
                        })}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

const appElement = document.getElementById('app');
if (appElement) {
    render(<App />, appElement);
}
