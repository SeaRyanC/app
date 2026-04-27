export type Position = 'P' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'OF' | 'Off';

export const ALL_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'OF', 'Off'];
export const FIELD_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'OF'];
export const INFIELD_POSITIONS = new Set<Position>(['P', 'C', '1B', '2B', '3B', 'SS']);
export const OUTFIELD_POSITIONS = new Set<Position>(['OF']);

// OF holds up to 3 players per inning; all other field positions hold exactly 1.
const OF_CAPACITY = 3;

export interface Player {
    name: string;
    here: boolean;
    eligible: Record<Position, boolean>;
    plus: Record<Position, boolean>;
}

export type InningAssignment = Record<string, Position>; // playerName -> position
export type Schedule = InningAssignment[];

export interface ScheduleResult {
    schedule: Schedule;
    battingOrder: string[];  // player names in batting/row order
    failureMessage?: string; // set only when all attempts failed
}

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

type OneResult =
    | { ok: true; schedule: Schedule; battingOrder: string[] }
    | { ok: false; failureMessage: string };

function generateOneSchedule(players: Player[], numInnings: number): OneResult {
    const present = players.filter(p => p.here);
    if (present.length === 0) return { ok: false, failureMessage: 'No players present' };

    // Randomize player order once — this is also the batting order
    const battingOrder = shuffle(present);

    // playCount[playerName][position] = times assigned so far
    const playCount = new Map<string, Map<Position, number>>();
    for (const p of battingOrder) {
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
        let ofFilled = 0;

        // Step 1: Fill all infield positions (mandatory hard constraint).
        // Shuffle the infield positions so no single slot always has priority for player choice.
        const infieldOrder = shuffle([...INFIELD_POSITIONS] as Position[]);
        for (const pos of infieldOrder) {
            // Among eligible unassigned players, fall back to any unassigned player as a last resort.
            const eligibleCandidates = battingOrder.filter(p => !assigned.has(p.name) && p.eligible[pos]);
            const candidates = eligibleCandidates.length > 0
                ? eligibleCandidates
                : battingOrder.filter(p => !assigned.has(p.name));
            if (candidates.length === 0) {
                return {
                    ok: false,
                    failureMessage: `Failed to find a player for ${pos} in inning ${inning + 1}`,
                };
            }
            // Round-robin: prefer the player(s) who have played this position least.
            // Among those tied at the minimum, "+" players get priority as a tiebreaker.
            const minCount = Math.min(...candidates.map(p => getCount(p.name, pos)));
            const atMin = candidates.filter(p => getCount(p.name, pos) === minCount);
            const plusAtMin = atMin.filter(p => p.plus[pos]);
            const minCandidates = plusAtMin.length > 0 ? plusAtMin : atMin;
            const chosen = minCandidates[Math.floor(Math.random() * minCandidates.length)]!;
            assignment[chosen.name] = pos;
            assigned.add(chosen.name);
            incCount(chosen.name, pos);
        }

        // Step 2: Fill OF (capacity 3) from unassigned players eligible for OF.
        // Round-robin across all eligible players; among those tied at the minimum play count,
        // "+" players are preferred as a tiebreaker so they get picked before non-"+" players
        // at equal counts, but non-"+" players are picked before a "+" player repeats.
        const ofPool = battingOrder.filter(p => !assigned.has(p.name) && p.eligible['OF']);
        while (ofFilled < OF_CAPACITY && ofPool.length > 0) {
            const minCount = Math.min(...ofPool.map(p => getCount(p.name, 'OF')));
            const atMin = ofPool.filter(p => getCount(p.name, 'OF') === minCount);
            const plusAtMin = atMin.filter(p => p.plus['OF']);
            const ofCandidates = plusAtMin.length > 0 ? plusAtMin : atMin;
            const chosen = ofCandidates[Math.floor(Math.random() * ofCandidates.length)]!;
            assignment[chosen.name] = 'OF';
            assigned.add(chosen.name);
            ofFilled++;
            incCount(chosen.name, 'OF');
            ofPool.splice(ofPool.indexOf(chosen), 1);
        }

        // Step 3: All remaining players sit out (Off).
        // No one reaches this step if they had any eligible field position available
        // (steps 1 and 2 exhaust all field capacity before reaching here).
        for (const player of battingOrder) {
            if (!assigned.has(player.name)) {
                assignment[player.name] = 'Off';
                assigned.add(player.name);
                incCount(player.name, 'Off');
            }
        }

        schedule.push(assignment);
    }

    return { ok: true, schedule, battingOrder: battingOrder.map(p => p.name) };
}

// Returns true when all present players' Off-inning counts are within 1 of each other
// (i.e. max - min <= 1), meaning everyone gets "0 or 1", "1 or 2", "2 or 3", etc.
function isOffBalanced(schedule: Schedule, battingOrder: string[]): boolean {
    if (battingOrder.length === 0) return true;
    const offCounts = battingOrder.map(name =>
        schedule.reduce((n, inning) => n + (inning[name] === 'Off' ? 1 : 0), 0)
    );
    return Math.max(...offCounts) - Math.min(...offCounts) <= 1;
}

function scoreAdjacency(schedule: Schedule, battingOrder: string[], numInnings: number): number {
    let score = 0;
    // Penalise adjacent innings of the same intensity for each player:
    //   +1 per pair of consecutive high-intensity (infield) innings
    //   +1 per pair of consecutive low-intensity (OF) innings
    for (const name of battingOrder) {
        for (let i = 1; i < numInnings; i++) {
            const prev = schedule[i - 1]?.[name];
            const curr = schedule[i]?.[name];
            if (prev === undefined || curr === undefined) continue;
            if (INFIELD_POSITIONS.has(prev) && INFIELD_POSITIONS.has(curr)) score++;
            if (OUTFIELD_POSITIONS.has(prev) && OUTFIELD_POSITIONS.has(curr)) score++;
        }
    }
    return score;
}

export function generateBestSchedule(
    players: Player[],
    numInnings: number,
    budgetMs = 200
): ScheduleResult | null {
    const present = players.filter(p => p.here);
    if (present.length === 0) return null;

    // Primary criterion (higher priority): Off-innings are balanced across all players
    //   (max Off count − min Off count ≤ 1).  A balanced schedule beats any unbalanced one.
    // Secondary criterion: fewest consecutive same-intensity innings (adjacency score).
    let bestOffBalanced = false;
    let bestAdjacency = Infinity;
    let tiedCount = 0;
    let best: { schedule: Schedule; battingOrder: string[] } | null = null;
    const failureCounts = new Map<string, number>();
    const deadline = Date.now() + budgetMs;

    do {
        const result = generateOneSchedule(players, numInnings);
        if (!result.ok) {
            failureCounts.set(result.failureMessage, (failureCounts.get(result.failureMessage) ?? 0) + 1);
        } else {
            const offBalanced = isOffBalanced(result.schedule, result.battingOrder);
            const adjacency = scoreAdjacency(result.schedule, result.battingOrder, numInnings);

            // Lexicographic comparison: offBalanced first (true > false), then lower adjacency wins.
            const newIsBetter =
                (!bestOffBalanced && offBalanced) ||
                (offBalanced === bestOffBalanced && adjacency < bestAdjacency);
            const newIsTied = offBalanced === bestOffBalanced && adjacency === bestAdjacency;

            if (newIsBetter) {
                bestOffBalanced = offBalanced;
                bestAdjacency = adjacency;
                best = result;
                tiedCount = 1;
            } else if (newIsTied) {
                tiedCount++;
                // Reservoir sampling: uniformly pick among all tied-best results
                if (Math.random() < 1 / tiedCount) {
                    best = result;
                }
            }
            if (bestOffBalanced && bestAdjacency === 0) break;
        }
    } while (Date.now() < deadline);

    if (best === null) {
        let maxCount = 0;
        let maxMsg = 'Failed to generate a valid schedule';
        for (const [msg, count] of failureCounts) {
            if (count > maxCount) { maxCount = count; maxMsg = msg; }
        }
        return { schedule: [], battingOrder: [], failureMessage: maxMsg };
    }

    return { schedule: best.schedule, battingOrder: best.battingOrder };
}
