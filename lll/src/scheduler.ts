export type Position = 'P' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'Bench';

export const ALL_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'Bench'];
export const FIELD_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];
export const HIGH_INTENSITY = new Set<Position>(['P', 'C', '1B', '2B']);

export interface Player {
    name: string;
    here: boolean;
    eligible: Record<Position, boolean>;
}

export type InningAssignment = Record<string, Position>; // playerName -> position
export type Schedule = InningAssignment[];

function shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = result[i] as T;
        result[i] = result[j] as T;
        result[j] = tmp;
    }
    return result;
}

function generateOneSchedule(players: Player[], numInnings: number): Schedule {
    const present = players.filter(p => p.here);
    if (present.length === 0) return [];

    // playCount[playerName][position] = times assigned
    const playCount = new Map<string, Map<Position, number>>();
    for (const p of present) {
        playCount.set(p.name, new Map());
    }

    const getCount = (name: string, pos: Position) => playCount.get(name)!.get(pos) ?? 0;
    const incCount = (name: string, pos: Position) => {
        playCount.get(name)!.set(pos, getCount(name, pos) + 1);
    };

    const schedule: Schedule = [];

    for (let inning = 0; inning < numInnings; inning++) {
        const assignment: InningAssignment = {};
        const assigned = new Set<string>();

        // Shuffle field positions for randomness
        const shuffledFieldPos = shuffle([...FIELD_POSITIONS]);

        for (const pos of shuffledFieldPos) {
            // Find eligible, unassigned, present players for this position
            const eligible = present.filter(p => !assigned.has(p.name) && p.eligible[pos]);
            if (eligible.length === 0) continue;

            // Round-robin: pick from those with minimum play count for this position
            const minCount = Math.min(...eligible.map(p => getCount(p.name, pos)));
            const candidates = eligible.filter(p => getCount(p.name, pos) === minCount);

            const chosen = candidates[Math.floor(Math.random() * candidates.length)]!;
            assignment[chosen.name] = pos;
            assigned.add(chosen.name);
            incCount(chosen.name, pos);
        }

        // Bench all remaining present players
        for (const p of present) {
            if (!assigned.has(p.name)) {
                assignment[p.name] = 'Bench';
                assigned.add(p.name);
                incCount(p.name, 'Bench');
            }
        }

        schedule.push(assignment);
    }

    return schedule;
}

function scoreSoftCriteria(schedule: Schedule, players: Player[]): number {
    // Penalty for consecutive same-intensity assignments
    let score = 0;
    const present = players.filter(p => p.here);

    for (const p of present) {
        let prevHigh: boolean | null = null;
        for (const inning of schedule) {
            const pos = inning[p.name];
            if (pos === undefined) continue;
            const isHigh = HIGH_INTENSITY.has(pos);
            if (prevHigh !== null && prevHigh === isHigh) {
                score++;
            }
            prevHigh = isHigh;
        }
    }

    return score;
}

export function generateBestSchedule(
    players: Player[],
    numInnings: number,
    attempts = 50
): Schedule | null {
    const present = players.filter(p => p.here);
    if (present.length === 0) return null;

    let best: Schedule | null = null;
    let bestScore = Infinity;

    for (let i = 0; i < attempts; i++) {
        const schedule = generateOneSchedule(players, numInnings);
        const score = scoreSoftCriteria(schedule, players);
        if (score < bestScore) {
            bestScore = score;
            best = schedule;
        }
        if (bestScore === 0) break; // Perfect score, no need to try more
    }

    return best;
}
