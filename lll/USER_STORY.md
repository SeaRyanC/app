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
  - A player is never assigned a position they are not eligible for
  - A player does not repeat a position until every other eligible (present) player has played it at least once, including Off time
- As a coach, the generated lineup tries to satisfy soft criteria:
  - Players avoid consecutive "Off" innings when possible
  - All present players have approximately the same number of high-intensity (infield) innings — within 1 of each other (subject to eligibility)
  - All present players have approximately the same number of low-intensity (outfield) innings — within 1 of each other (subject to eligibility)
  - All present players have approximately equal bench (Off) innings — within 1 of each other
- As a coach, the algorithm works left-to-right by inning so that if a game is cut short, all completed innings still satisfy the hard criteria
- As a coach, the app generates multiple candidate schedules and returns the one that best meets the soft criteria

### Schedule Display
- As a coach, I can view the generated schedule as a table with players as rows and innings as columns
- As a coach, each row includes summary counts: IF (infield innings), OF (outfield innings), and Off innings
- As a coach, a second "By Position" table shows positions as rows and innings as columns, so I can quickly see who plays where each inning
- As a coach, I can click "Generate Lineup" again to produce a new random schedule

### Sharing
- As a coach, I can click "Share" to encode the full lineup (roster, eligibility, inning count, and generated schedule) into a URL
- As a coach, the share URL is copied to my clipboard and the browser address bar updates to the share link
- As a coach, opening a share URL pre-loads the exact lineup that was shared, including the generated schedule
- As a coach, I can click "Share Lineup" to encode only the output schedule into a compact URL that opens a read-only viewer
- As a coach, opening a Share Lineup URL shows a clean view of both the player-inning table and the by-position table, with no roster or configuration UI

### Persistence
- As a coach, all roster data, eligibility settings, and inning count are automatically saved to localStorage
- As a coach, my settings are restored automatically when I reload the page (unless a share URL is present)
