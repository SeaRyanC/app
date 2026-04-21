export type Position = 'P' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'Off';

export const ALL_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'Off'];
export const FIELD_POSITIONS: Position[] = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];
export const INFIELD_POSITIONS = new Set<Position>(['P', 'C', '1B', '2B', '3B', 'SS']);
export const OUTFIELD_POSITIONS = new Set<Position>(['LF', 'CF', 'RF']);

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
    // typeCount tracks high-intensity (infield) and low-intensity (outfield) per player
    const infieldTypeCount = new Map<string, number>();
    const outfieldTypeCount = new Map<string, number>();
    for (const p of present) {
        playCount.set(p.name, new Map());
        infieldTypeCount.set(p.name, 0);
        outfieldTypeCount.set(p.name, 0);
    }

    const getCount = (name: string, pos: Position) => playCount.get(name)!.get(pos) ?? 0;
    const incCount = (name: string, pos: Position) => {
        playCount.get(name)!.set(pos, getCount(name, pos) + 1);
        if (INFIELD_POSITIONS.has(pos)) infieldTypeCount.set(name, (infieldTypeCount.get(name) ?? 0) + 1);
        else if (OUTFIELD_POSITIONS.has(pos)) outfieldTypeCount.set(name, (outfieldTypeCount.get(name) ?? 0) + 1);
    };

    // Precompute the number of eligible field positions per player (used for consecutive-position constraint)
    const eligibleFieldPosCount = new Map<string, number>();
    for (const p of present) {
        eligibleFieldPosCount.set(p.name, FIELD_POSITIONS.filter(fp => p.eligible[fp]).length);
    }

    const schedule: Schedule = [];

    for (let inning = 0; inning < numInnings; inning++) {
        const assignment: InningAssignment = {};
        const assigned = new Set<string>();
        const prevAssignment = schedule.length > 0 ? schedule[schedule.length - 1] : null;
        const wasOffLastInning = (name: string) => prevAssignment?.[name] === 'Off';

        // Shuffle field positions for randomness
        const shuffledFieldPos = shuffle([...FIELD_POSITIONS]);

        for (const pos of shuffledFieldPos) {
            // Find eligible, unassigned, present players for this position.
            // Hard constraint: a player cannot play the same field position in consecutive innings,
            // unless they are only globally eligible for one field position.
            let eligible = present.filter(p =>
                !assigned.has(p.name) &&
                p.eligible[pos] &&
                (prevAssignment?.[p.name] !== pos || (eligibleFieldPosCount.get(p.name) ?? 0) <= 1)
            );
            // Fallback: if the hard constraint eliminates everyone, relax it
            if (eligible.length === 0) {
                eligible = present.filter(p => !assigned.has(p.name) && p.eligible[pos]);
            }
            if (eligible.length === 0) continue;

            // Round-robin: pick from those with minimum play count for this position
            const minCount = Math.min(...eligible.map(p => getCount(p.name, pos)));
            let candidates = eligible.filter(p => getCount(p.name, pos) === minCount);

            // Type-balance tiebreaker: prefer players with fewest high/low-intensity innings
            if (INFIELD_POSITIONS.has(pos)) {
                const minIF = Math.min(...candidates.map(p => infieldTypeCount.get(p.name) ?? 0));
                const balanced = candidates.filter(p => (infieldTypeCount.get(p.name) ?? 0) === minIF);
                if (balanced.length > 0) candidates = balanced;
            } else if (OUTFIELD_POSITIONS.has(pos)) {
                const minOF = Math.min(...candidates.map(p => outfieldTypeCount.get(p.name) ?? 0));
                const balanced = candidates.filter(p => (outfieldTypeCount.get(p.name) ?? 0) === minOF);
                if (balanced.length > 0) candidates = balanced;
            }

            // Prefer players who were Off last inning (avoids consecutive Off)
            const preferred = candidates.filter(p => wasOffLastInning(p.name));
            if (preferred.length > 0) candidates = preferred;

            const chosen = candidates[Math.floor(Math.random() * candidates.length)]!;
            assignment[chosen.name] = pos;
            assigned.add(chosen.name);
            incCount(chosen.name, pos);
        }

        // Assign Off to all remaining present players
        for (const p of present) {
            if (!assigned.has(p.name)) {
                assignment[p.name] = 'Off';
                assigned.add(p.name);
                incCount(p.name, 'Off');
            }
        }

        schedule.push(assignment);
    }

    return schedule;
}

function countSpreadPenalty(counts: number[]): number {
    if (counts.length <= 1) return 0;
    return Math.max(0, Math.max(...counts) - Math.min(...counts) - 1);
}

function scoreSoftCriteria(schedule: Schedule, players: Player[], numInnings: number): number {
    let score = 0;
    const present = players.filter(p => p.here);

    // Penalty for consecutive Off assignments (low weight)
    for (const p of present) {
        let prevOff = false;
        for (const inning of schedule) {
            const pos = inning[p.name];
            if (pos === undefined) continue;
            const isOff = pos === 'Off';
            if (prevOff && isOff) score++;
            prevOff = isOff;
        }
    }

    // Penalty for imbalanced bench (Off) time — all players (high weight)
    const benchCounts = present.map(p =>
        schedule.reduce((n, inning) => n + (inning[p.name] === 'Off' ? 1 : 0), 0)
    );
    score += countSpreadPenalty(benchCounts) * 100;

    // Penalty for imbalanced high-intensity (infield) time — only players eligible for >= 1 infield pos
    const infieldEligible = present.filter(p => [...INFIELD_POSITIONS].some(pos => p.eligible[pos]));
    if (infieldEligible.length > 1) {
        const ifCounts = infieldEligible.map(p =>
            schedule.reduce((n, inning) => n + (INFIELD_POSITIONS.has(inning[p.name]!) ? 1 : 0), 0)
        );
        score += countSpreadPenalty(ifCounts) * 100;
    }

    // Penalty for imbalanced low-intensity (outfield) time — only players eligible for >= 1 outfield pos
    const outfieldEligible = present.filter(p => [...OUTFIELD_POSITIONS].some(pos => p.eligible[pos]));
    if (outfieldEligible.length > 1) {
        const ofCounts = outfieldEligible.map(p =>
            schedule.reduce((n, inning) => n + (OUTFIELD_POSITIONS.has(inning[p.name]!) ? 1 : 0), 0)
        );
        score += countSpreadPenalty(ofCounts) * 100;
    }

    // Penalty for Off innings that are clustered rather than spread out
    for (const p of present) {
        const offInnings: number[] = [];
        for (let i = 0; i < numInnings; i++) {
            if (schedule[i]?.[p.name] === 'Off') offInnings.push(i);
        }
        if (offInnings.length >= 2) {
            const idealGap = (numInnings - 1) / (offInnings.length - 1);
            for (let i = 1; i < offInnings.length; i++) {
                const gap = offInnings[i]! - offInnings[i - 1]!;
                if (gap < idealGap) score += Math.round((idealGap - gap) * 5);
            }
        }
    }

    // Penalty for Off innings not adjacent to a high-intensity (infield) inning
    for (const p of present) {
        for (let i = 0; i < numInnings; i++) {
            if (schedule[i]?.[p.name] !== 'Off') continue;
            const prevPos = i > 0 ? schedule[i - 1]?.[p.name] : undefined;
            const nextPos = i < numInnings - 1 ? schedule[i + 1]?.[p.name] : undefined;
            const prevInfield = prevPos !== undefined && INFIELD_POSITIONS.has(prevPos);
            const nextInfield = nextPos !== undefined && INFIELD_POSITIONS.has(nextPos);
            if (!prevInfield && !nextInfield) score += 5;
        }
    }

    // Triple-weight penalty: Pitchers and catchers should always have an adjacent Off inning
    for (const p of present) {
        for (let i = 0; i < numInnings; i++) {
            const pos = schedule[i]?.[p.name];
            if (pos !== 'P' && pos !== 'C') continue;
            const prevOff = i > 0 && schedule[i - 1]?.[p.name] === 'Off';
            const nextOff = i < numInnings - 1 && schedule[i + 1]?.[p.name] === 'Off';
            if (!prevOff && !nextOff) score += 15;
        }
    }

    // Extra penalty: Pitchers should preferentially have an Off inning BEFORE they pitch
    for (const p of present) {
        for (let i = 1; i < numInnings; i++) {
            if (schedule[i]?.[p.name] !== 'P') continue;
            if (schedule[i - 1]?.[p.name] !== 'Off') score += 10;
        }
    }

    return score;
}

export function generateBestSchedule(
    players: Player[],
    numInnings: number,
    budgetMs = 200
): Schedule | null {
    const present = players.filter(p => p.here);
    if (present.length === 0) return null;

    let best: Schedule | null = null;
    let bestScore = Infinity;
    const deadline = Date.now() + budgetMs;

    do {
        const schedule = generateOneSchedule(players, numInnings);
        const score = scoreSoftCriteria(schedule, players, numInnings);
        if (score < bestScore) {
            bestScore = score;
            best = schedule;
        }
        if (bestScore === 0) break; // Perfect score, no need to try more
    } while (Date.now() < deadline);

    return best;
}
