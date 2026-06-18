# Post-game sequence & leagues

What happens after a match in a league: winnings, fan changes, and how players
earn Star Player Points and spend them on advancements.

## Post-game sequence

Resolved in order:

1. Record the outcome and collect winnings
2. Update Dedicated Fans
3. Player advancement
4. Hiring, firing and temporary retirement
5. Expensive mistakes
6. Prepare for the next fixture

## Winnings

Added to the treasury:

> winnings = (Fan Attendance ÷ 2 + touchdowns scored + 1 if you didn't stall) ×
> 10,000 gp

Fan Attendance is both teams' Fan Factors added together.

## Dedicated Fans

- **Win** — roll a D6; if it's ≥ your current Dedicated Fans, +1 (max 7).
- **Loss** — roll a D6; if it's < your current Dedicated Fans, −1 (min 1).
- **Draw** — no change.

## Star Player Points (SPP)

| Action                               | SPP |
| ------------------------------------ | --- |
| Completion (an accurate pass caught) | 1   |
| Throw Team-mate (lands safely)       | 1   |
| Caught after being thrown            | 1   |
| Interception                         | 2   |
| Casualty caused                      | 2   |
| Touchdown                            | 3   |
| MVP                                  | 4   |

Star players earn no SPP; Journeymen do.

## Advancement (SPP cost by level)

| Level (advance #)   | Random 1° | Chosen 1° | Random 2° | Chosen 2° | Characteristic |
| ------------------- | --------- | --------- | --------- | --------- | -------------- |
| Experienced (1st)   | 3         | 6         | 10        | 14        | 14             |
| Veteran (2nd)       | 4         | 8         | 12        | 16        | 16             |
| Emerging Star (3rd) | 6         | 12        | 16        | 20        | 20             |
| Star (4th)          | 8         | 16        | 20        | 24        | 24             |
| Superstar (5th)     | 10        | 20        | 24        | 28        | 28             |
| Legend (6th)        | 15        | 30        | 34        | 38        | 38             |

(1° = a Primary-category skill, 2° = a Secondary-category skill.)

### Characteristic improvement (D8)

| Roll | Improvement     |
| ---- | --------------- |
| 1    | +1 AV           |
| 2    | +1 AV or PA     |
| 3–4  | +1 AV, MA or PA |
| 5    | +1 MA or PA     |
| 6    | +1 AG or MA     |
| 7    | +1 AG or ST     |
| 8    | +1 to any       |

A player may decline the roll and take a skill instead (the SPP are still spent).

## Value increase per advancement

| Advancement     | + Current Value |
| --------------- | --------------- |
| Primary skill   | +20,000 gp      |
| Secondary skill | +40,000 gp      |
| +1 AV           | +10,000 gp      |
| +1 MA           | +20,000 gp      |
| +1 PA           | +20,000 gp      |
| +1 AG           | +30,000 gp      |
| +1 ST           | +60,000 gp      |

## Expensive mistakes

After a league fixture, a treasury of **100,000 gp or more** risks a D6 roll on a
table whose severity scales with the hoard: **Crisis Averted** (nothing),
**Minor Incident** (lose D3 × 10,000 gp), **Major Incident** (lose half), or
**Catastrophe** (keep only 2D6 × 10,000 gp). Spend your gold, don't hoard it.

## Leagues & tournaments

A **league** is a season of fixtures in which teams persist and grow through this
post-game sequence; a **tournament** is usually a one-off format (often fixed
Team Value, "resurrection" — no lasting injuries between games). The app's
league/tournament management (#18–#19) models seasons, fixtures, results,
standings, and this progression.

## Implementation status

- **api/web** — this sequence (SPP, advancement, value, treasury, fans) is the
  core of team progression (#17) and league management (#18–#19).
- **codex/tooltips** — source for the SPP and advancement reference.

## Sources

- bloodbowlbase.ru — Third Season Edition, "League Play". To be verified against
  the official rulebook.
