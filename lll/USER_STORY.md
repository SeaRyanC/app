# LLL - Little League Lineup

## Overview

A browser-based game scheduling tool for Little League baseball coaches. The tool generates fair, randomized position lineups across all innings of a game.

## User Stories

### Roster Management
- As a coach, I can enter my player roster as a list of names delimited by newlines, commas, tabs, spaces, or semicolons
- As a coach, I can check or uncheck each player's "Here" status to mark who is present for the current game
- As a coach, players default to present (Here) when first added

### Position Eligibility
- As a coach, I can see a grid showing every player and every position (P, C, 1B, 2B, 3B, SS, LF, CF, RF, Off)
- As a coach, each cell in the grid defaults to checked (all players eligible for all positions)
- As a coach, I can uncheck specific positions for a player at any time, even if that player is marked as absent
- As a coach, I can uncheck positions for absent players so eligibility changes are preserved regardless of attendance

### Game Configuration
- As a coach, I can specify the number of innings to schedule (default: 7)

### Lineup Generation
- As a coach, I can click "Generate Lineup" to produce a randomized schedule for all innings
- As a coach, the generated lineup satisfies all hard criteria:
  - **All infield slots are always filled** (P, C, 1B, 2B, 3B, SS), especially Pitcher — this is the highest-priority constraint and overrides all others. If no eligible unassigned player is available for an infield slot after relaxing the consecutive-position constraint, any remaining unassigned player is used regardless of their listed eligibility.
  - Infield slots (and pitcher first among them) are assigned before outfield slots, so they always have first pick of available players
  - A player is never assigned a position they are not eligible for (relaxed only as a last resort to fill infield slots, as above)
  - A player does not repeat a position until every other eligible (present) player has played it at least once, including Off time
  - A player is never assigned the same position in back-to-back innings, unless they are only globally eligible for one field position (relaxed before eligibility as a fallback for infield)
- As a coach, the generated lineup tries to satisfy soft criteria (in priority order, none may override hard criteria):
  - All present players have approximately equal bench (Off) innings — within 1 of each other
  - All present players have approximately the same number of high-intensity (infield) innings — within 1 of each other (subject to eligibility)
  - All present players have approximately the same number of low-intensity (outfield) innings — within 1 of each other (subject to eligibility)
  - Each player's Off innings are spaced as far apart as possible throughout the game
  - Each player's Off innings are adjacent (before or after) a high-intensity (infield) inning when possible
  - Pitchers (P) and catchers (C) should always have an Off inning immediately before or after their high-intensity stint
  - Pitchers should preferentially also receive an Off inning immediately before they pitch
  - Players avoid consecutive "Off" innings when possible
- As a coach, the algorithm works left-to-right by inning so that if a game is cut short, all completed innings still satisfy the hard criteria
- As a coach, the app generates as many candidate schedules as possible within 200 ms and returns the one that best meets the soft criteria

### Schedule Display
- As a coach, I can view the generated schedule as a table with players as rows and innings as columns
- As a coach, each row includes summary counts: IF (infield innings), OF (outfield innings), and Off innings
- As a coach, a second "By Position" table shows positions as rows and innings as columns, so I can quickly see who plays where each inning
- As a coach, I can click "Generate Lineup" again to produce a new random schedule

### Print
- As a coach, I can click the printer icon button next to "Lineup" to generate a two-page US Letter landscape PDF of the current lineup
- The first page shows the player-inning table (with IF/OF/Off summary columns); the second page shows the by-position table
- The PDF opens in a new browser tab, ready to print or save
- All cells in the PDF are formatted uniformly; "Off" cells are not visually distinguished

### Sharing
- As a coach, I can click "Share Roster" (shown in the Position Eligibility section header) to encode my roster configuration — player names, here/absent status, position eligibility, and inning count — into a compact URL using a binary bit-packed representation of position eligibility (11 bits per player: 1 here bit + 10 eligibility bits). The URL is copied to my clipboard and the browser address bar is updated.
- As a coach, opening a Share Roster URL pre-loads the exact roster configuration that was shared, ready for lineup generation.
- As a coach, I can click the share icon button next to "Lineup" to encode only the output schedule into a compact URL that opens a read-only viewer; the URL uses a space-efficient encoding (player names stored once, schedule stored as a flat position-code string) so the link stays short even for large rosters and many innings.
- As a coach, opening a Share Lineup URL shows a clean view of both the player-inning table and the by-position table, with no roster or configuration UI. The share-link view also includes Print and Share buttons identical in function to those on the main screen, so the lineup can be printed or re-shared directly from the shared URL.

### Persistence
- As a coach, all roster data, eligibility settings, and inning count are automatically saved to localStorage
- As a coach, my settings are restored automatically when I reload the page (unless a share URL is present)
