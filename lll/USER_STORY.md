# LLL - Little League Lineup

## Overview

A browser-based game scheduling tool for Little League baseball coaches. The tool generates fair, randomized position lineups across all innings of a game.

## User Stories

### Roster Management
- As a coach, I can enter my player roster as a list of names delimited by newlines, commas, tabs, spaces, or semicolons
- As a coach, I can check or uncheck each player's "Here" status to mark who is present for the current game
- As a coach, players default to present (Here) when first added

### Position Eligibility
- As a coach, I can see a grid showing every player and every position (P, C, 1B, 2B, 3B, SS, LF, CF, RF, Bench)
- As a coach, each cell in the grid defaults to checked (all players eligible for all positions)
- As a coach, I can uncheck specific positions for a player to prevent them from being assigned there (e.g., a player not ready to pitch)

### Game Configuration
- As a coach, I can specify the number of innings to schedule (default: 7)

### Lineup Generation
- As a coach, I can click "Generate Lineup" to produce a randomized schedule for all innings
- As a coach, the generated lineup satisfies all hard criteria:
  - A player is never assigned a position they are not eligible for
  - A player does not repeat a position until every other eligible (present) player has played it at least once, including bench time
- As a coach, the generated lineup tries to satisfy soft criteria:
  - Players alternate between high-intensity positions (P, C, 1B, 2B) and low-intensity positions (3B, SS, LF, CF, RF, Bench) across innings when possible
- As a coach, the algorithm works left-to-right by inning so that if a game is cut short, all completed innings still satisfy the hard criteria
- As a coach, the app generates multiple candidate schedules and returns the one that best meets the soft criteria

### Schedule Display
- As a coach, I can view the generated schedule as a table with players as rows and innings as columns
- As a coach, each cell is color-coded: high-intensity positions in warm orange, low-intensity field positions in green, and bench in gray
- As a coach, I can click "Generate Lineup" again to produce a new random schedule

### Persistence
- As a coach, all roster data, eligibility settings, and inning count are automatically saved to localStorage
- As a coach, my settings are restored automatically when I reload the page
