# The drive

The scaffolding around the action: tackle zones, player states, scoring, the
turn/half structure, and recovering knocked-out players.

## Tackle zones & Marking

A **standing** player projects a **tackle zone** over the eight squares around
it. A standing player standing in an opponent's tackle zone is **Marked** — this
is what forces a Dodge to leave the square, and adds the **−1 per marker**
penalties on pick-ups, passes and catches. Prone and Stunned players have no
tackle zone.

## Player states

| State          | What it can do                                                                           |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Standing**   | acts normally                                                                            |
| **Prone**      | knocked down, face-up; can't act; stands for **3 MA** (or 4+ at MA ≤ 2); no tackle zone  |
| **Stunned**    | face-down; can't be activated; **turned face-up to Prone** at the end of its team's turn |
| **Distracted** | can't catch or give assists; becomes Standing at the end of its team's turn              |

## Scoring a touchdown

A **standing** player carrying the ball who ends a move in the opposing **end
zone** scores. The drive ends immediately, both teams set up again, and the team
that just scored **kicks off** to restart.

## Drives, turns & halves

- A game is **2 halves**.
- Each half is **8 rounds**; a round is **2 turns** (one per coach) → **8 turns
  per team per half** (16 per game).
- A **drive** runs from a kick-off until a touchdown is scored or the half ends.

## Knock-out recovery

At the **end of each drive**, each coach rolls a **D6** for every KO'd player in
their Reserves; on a **4+** the player recovers and is available next drive (some
inducements and weather modify the roll).

## Implementation status

- **api/web** — the drive / turn / half structure and KO recovery feed live game
  tracking and league results (future).
- **codex/tooltips** — source for player states, tackle zones and scoring.
