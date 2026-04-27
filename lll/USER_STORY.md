# LLL - Little League Lineup

## Overview

A browser-based game scheduling tool for Little League baseball coaches. The tool generates fair, randomized position lineups across all innings of a game.

## User Stories

### Roster Management
- As a coach, I can enter my player roster as a list of names delimited by newlines, commas, tabs, spaces, or semicolons
- As a coach, I can check or uncheck each player's "Here" status to mark who is present for the current game
- As a coach, players default to present (Here) when first added

### Position Eligibility
- As a coach, I can see a grid showing every player and every position (P, C, 1B, 2B, 3B, SS, OF, Off)
- As a coach, each cell in the grid defaults to checked (all players eligible for all positions)
- As a coach, I can uncheck specific positions for a player at any time, even if that player is marked as absent
- As a coach, I can uncheck positions for absent players so eligibility changes are preserved regardless of attendance
- As a coach, "OF" is a single outfield position that can hold up to 3 players per inning; coaches decide real-time how to allocate those outfielders
- As a coach, each position column has a paired "X+" column (e.g. "P+", "C+", "1B+"); checking a player's "X+" marks them as a priority player for that position
- As a coach, the "X+" checkbox is disabled (and automatically cleared) when a player is not eligible for that position, since priority is meaningless without eligibility

### Game Configuration
- As a coach, I can specify the number of innings to schedule (default: 7)

### Lineup Generation
- As a coach, I can click "Generate Lineup" to produce a randomized schedule for all innings
- As a coach, the generated lineup satisfies all hard criteria:
  - **The player order is randomized once and serves as the batting order** for the game
  - **All infield slots are always filled** (P, C, 1B, 2B, 3B, SS) — this is the highest-priority constraint and overrides all others. If no eligible unassigned player is available for an infield slot, any remaining unassigned player is used regardless of their listed eligibility.
  - Infield slots are filled before OF, so they always have first pick of available players
  - OF accepts up to 3 players per inning; eligible players fill it round-robin after infield is assigned
  - A player is never assigned a position they are not eligible for (relaxed only as a last resort to fill infield slots, as above)
  - A player does not repeat a position until every other eligible (present) player has played it at least once — round-robin resets naturally when all eligible players reach the same play count
  - Players with Off eligibility only bench when all their eligible field positions (infield + OF) are already filled for that inning — no one sits out unnecessarily
  - Players eligible for constrained roles (P, 1B, etc.) naturally receive fewer Off innings because they are needed on the field more often
  - **Position+ priority**: when filling any position, the round-robin considers all eligible (and unassigned) players; among players tied at the lowest play count for that position, "+" players are preferred as a tiebreaker. This ensures "+" players are always scheduled ahead of non-"+" players at equal counts, but non-"+" eligible players are rotated through before a "+" player repeats. For OF, the same tiebreaker applies across the unified eligible pool.
- As a coach, the generated lineup tries to satisfy soft criteria to pick the best schedule among all candidates, evaluated in priority order:
  1. **Balanced Off innings** — schedules where every player's Off-inning count differs by at most 1 (e.g. everyone has 0 or 1, 1 or 2, 2 or 3 Off innings) beat all schedules where the Off counts are more uneven. This is the highest-priority soft criterion.
  2. **No consecutive Off innings** — among schedules with equally balanced Off innings, prefer schedules where no player sits out two innings in a row (fewest consecutive Off-inning pairs). This is the second-priority soft criterion.
  3. **Minimize consecutive same-intensity innings** — among schedules that also tie on consecutive Off innings, prefer fewer pairs of back-to-back high-intensity (infield) innings or back-to-back low-intensity (OF) innings for any player.
  - When multiple schedules tie on all criteria, one is chosen at random
- As a coach, if no valid schedule can be generated within the time budget, the most common failure reason is shown (e.g. "Failed to find a player for P in inning 3")
- As a coach, the algorithm works left-to-right by inning so that if a game is cut short, all completed innings still satisfy the hard criteria
- As a coach, the app generates as many candidate schedules as possible within 200 ms and returns the best one

### Schedule Display
- As a coach, I can view the generated schedule as a table with players as rows (in batting order) and innings as columns
- As a coach, the row number indicates each player's spot in the batting order
- As a coach, each row includes summary counts: IF (infield innings), OF (outfield innings), and Off innings
- As a coach, a second "By Position" table shows positions as rows and innings as columns, so I can quickly see who plays where each inning; the OF row may list multiple players per inning
- As a coach, I can click "Generate Lineup" again to produce a new random schedule

### Print
- As a coach, I can click the printer icon button next to "Lineup" to generate a two-page US Letter landscape PDF of the current lineup
- The first page shows the player-inning table (with batting order numbers and IF/OF/Off summary columns); the second page shows the by-position table
- The PDF opens in a new browser tab, ready to print or save

### Sharing
- As a coach, I can click "Share Roster" (shown in the Position Eligibility section header) to encode my roster configuration — player names, here/absent status, position eligibility, position+ priorities, and inning count — into a compact URL using a binary bit-packed representation (17 bits per player: 1 here bit + 8 eligibility bits + 8 priority bits). The URL is copied to my clipboard and the browser address bar is updated.
- As a coach, opening a Share Roster URL pre-loads the exact roster configuration that was shared, ready for lineup generation.
- As a coach, I can click the share icon button next to "Lineup" to encode only the output schedule into a compact URL that opens a read-only viewer; the URL uses a space-efficient encoding (player names stored once in batting order, schedule stored as a flat position-code string) so the link stays short even for large rosters and many innings.
- As a coach, opening a Share Lineup URL shows a clean view of both the player-inning table and the by-position table, with no roster or configuration UI. The share-link view also includes Print and Share buttons identical in function to those on the main screen, so the lineup can be printed or re-shared directly from the shared URL.

### Persistence
- As a coach, all roster data, eligibility settings, and inning count are automatically saved to localStorage
- As a coach, my settings are restored automatically when I reload the page (unless a share URL is present)
