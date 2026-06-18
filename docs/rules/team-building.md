# Team building, star players & inducements

Drafting a roster within budget, the sideline staff you can buy, Team Value, and
the one-off help (inducements and star players) you can hire for a match.

## Drafting a team

- A rookie team in league play starts with **1,000,000 gp**.
- Draft **11–16 players**.
- Players come from your team's roster. Each position lists its characteristics
  (**MA · ST · AG · PA · AV**), cost, a **0–N** count limit, starting skills, and
  the **Primary / Secondary** skill categories it can advance into. Those
  per-team numbers live in the data layer (#9), not here.

## Sideline staff & assets

| Asset             | Cost             | Limit                        |
| ----------------- | ---------------- | ---------------------------- |
| Team Re-roll      | per-team price\* | max 8                        |
| Apothecary        | 50,000 gp        | 1 (if the team may take one) |
| Assistant Coaches | 10,000 gp each   | 6                            |
| Cheerleaders      | 10,000 gp each   | 6                            |
| Dedicated Fans    | 5,000 gp / point | start at 1, max 3 at draft   |

\* A re-roll bought **after** the draft (in league play) costs double.

## Team Value

- **Team Value (TV)** = the current value of every player + sideline staff + team
  re-rolls.
- **Current Team Value (CTV)** = TV minus the value of players who can't play this
  game (league play). The gap between the two teams' values is what inducements
  spend.

## Inducements

Bought before a match to even out a Team Value gap — from petty cash or treasury
in league play, or from the draft budget otherwise. Common inducements:

| Inducement                    | Cost             | Limit |
| ----------------------------- | ---------------- | ----- |
| Prayers to Nuffle             | 10,000 gp        | 0–3   |
| Temp Agency Cheerleaders      | 5,000 gp         | 0–5   |
| Part-time Assistant Coaches   | 20,000 gp        | 0–5   |
| Team Mascot                   | 25,000 gp        | 0–1   |
| Weather Mage                  | 25,000 gp        | 0–1   |
| Bloodweiser / Best Kegs       | 50,000 gp        | 0–2   |
| Bribes                        | 100,000 gp       | 0–3   |
| Extra Team Training (re-roll) | 100,000 gp       | 0–8   |
| Wandering Apothecary          | 100,000 gp       | 0–2   |
| Wizard                        | 150,000 gp       | 0–1   |
| Halfling Master Chef          | 300,000 gp       | 0–1   |
| Mercenary player              | base + 30,000 gp | 0–3   |

_(Some teams get certain inducements at a discount or higher limit; verify the
per-team specifics against the rulebook.)_

## Star players

- Hire **up to two** star players for a single match, each for the fixed fee in
  its profile.
- A star **never earns SPP, MVP, or advancements**, and any **casualty against a
  star is waived** at the end of the game.
- Both coaches may hire the same star player.

## Implementation status

- **schema/data** — rosters, positions, costs, staff, inducements and star
  players become structured data (#7–#10); the resolver (#14) enforces budget and
  count limits.
- **codex/tooltips** — source for the team-building, inducements and star-player
  sections, and the backbone of the team builder.

## Sources

- bloodbowlbase.ru — Third Season Edition, "Drafting a Blood Bowl Team" and
  "Inducements". Per-team rosters and star profiles to be verified against the
  official rulebook.
