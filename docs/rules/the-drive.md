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
- The **turn marker** advances at the start of each team turn; the half ends once
  it passes the **eighth** space.
- At **half-time**, both teams' **team re-rolls refresh** and KO'd players roll to
  recover.

## End of a drive

When a touchdown is scored or the half ends, the drive is resolved **in order**:
deal with **Secret Weapons**, apply any **end-of-drive effects** (e.g. Sweltering
Heat sending players to the Reserves), then each coach rolls a **D6** for every
KO'd player in their Reserves — on a **4+** the player recovers and is available
next drive (some inducements and weather modify the roll). Both teams then set up
again for the next kick-off.

## Stalling

A team with the ball and a clear path to score may hold off to run down the
clock. If the referee judges a ball carrier is deliberately **stalling**, the
crowd takes a hand and random interference can disrupt the stalling team.

## Ending the game

After **16 rounds** the team with the most touchdowns wins. A drawn knockout
match goes to **extra time**: the team that received at the start of the second
half now kicks off, **re-rolls are not refreshed**, and it is **sudden death** —
the first team to score a touchdown wins. Still tied, a **penalty shoot-out**
decides it: each team takes **five kicks** (2D6, a **4+** scores), most goals
winning, then single **alternating sudden-death kicks** if still level.

## Implementation status

- **api/web** — the drive / turn / half structure and KO recovery feed live game
  tracking and league results (future).
- **codex/tooltips** — source for player states, tackle zones and scoring.
