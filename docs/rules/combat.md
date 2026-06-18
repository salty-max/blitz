# Blocking & combat

Throwing a block, how Strength and assists decide the dice, and resolving a
knock-down through armour, injury and the casualty table.

## The Block action

A Block pits the blocker's Strength against an adjacent opponent's. Roll the
Block Dice, apply one result, then resolve any knock-down. (A Blitz is a Block
combined with movement, and is limited to once per turn.)

## Strength & number of block dice

Compare the blocker's ST to the target's, **after assists**:

| Strength comparison            | Block dice |
| ------------------------------ | ---------- |
| Equal                          | 1          |
| One player stronger            | 2          |
| One player **at least double** | 3          |

When 2 or 3 dice are rolled, **the coach of the stronger player chooses** which
result applies. So blocking _up_ into a stronger player still rolls 2–3 dice, but
the defender picks — usually against you.

## Assists

Each assist grants **+1 ST**:

- **Offensive assist** — one of your other standing players is also Marking the
  target and is not itself Marked by an opponent → +1 ST to the blocker.
- **Defensive assist** — one of the target's standing team-mates is Marking the
  blocker and is not itself Marked → +1 ST to the target.

## Block dice results

| Result      | Effect                                                             |
| ----------- | ------------------------------------------------------------------ |
| Player Down | the **blocker** is Knocked Down                                    |
| Both Down   | **both** players are Knocked Down                                  |
| Push Back   | the target is Pushed Back one square; the blocker may Follow-up    |
| Stumble     | if the target has **Dodge**, treat as Push Back; otherwise as POW! |
| POW!        | the target is Pushed Back one square, then Knocked Down            |

## Push backs & follow-up

- A Push moves the target one square away; the blocker may **Follow-up** into the
  vacated square (free, no MA) — decided before any Armour roll.
- **Chain push** — if there is no empty square, the pushed player shoves whoever
  occupies the destination, and so on down the chain; the blocking coach chooses
  the directions.
- **Into the crowd** — a player pushed off the edge is removed and risks injury
  (a Throw-in if they carried the ball; a turnover if they were on the active
  team).

## Knock-down → armour → injury

A Knocked Down player checks armour, then possibly injury:

1. **Armour** — roll **2D6**; if the total is **≥ the player's AV**, armour is
   broken and an Injury roll follows.
2. **Injury** — roll **2D6**:
   - **2–7** Stunned (recovers on the pitch)
   - **8–9** Knocked-out (to the Reserves box)
   - **10–12** Casualty (off the pitch — roll on the Casualty table)
   - _Stunty_ players use a harsher table: 2–6 Stunned, 7–8 KO, 9 Badly Hurt,
     10–12 Casualty.

## Casualty table (D16)

| Roll  | Casualty       | Effect                                      |
| ----- | -------------- | ------------------------------------------- |
| 1–8   | Badly Hurt     | no lasting effect                           |
| 9–10  | Seriously Hurt | miss the next game                          |
| 11–12 | Serious Injury | Niggling Injury + miss the next game        |
| 13–14 | Lasting Injury | −1 to a characteristic + miss the next game |
| 15–16 | Dead           | removed from the roster                     |

## Implementation status

- **engine** — the odds helper (#13) can compute block-dice outcome %,
  armour-break %, and the injury distribution from these numbers.
- **codex/tooltips** — source for the blocking and injury sections.
