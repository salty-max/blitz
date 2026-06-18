# Pre-game sequence, journeymen & prayers

What happens between fixtures and a match starts — filling the squad, levelling
the odds, and a plea to the dice god.

## Pre-game sequence (league fixture)

Before the coin toss and kick-off (see
[setup-and-kickoff.md](setup-and-kickoff.md)):

1. **Take on Journeymen** — fill the squad out to 11.
2. **Hire star players & buy inducements** — the coach with the lower Team Value
   spends the gap (see [team-building.md](team-building.md)).
3. **Prayers to Nuffle** — the underdog may pray for a blessing (below).

## Journeymen

If a team has fewer than **11** available players, it takes on **Journeymen** —
free, 0-cost Linemen from its own roster with the **Loner (4+)** trait — enough
to reach 11. They can push the squad over 16 temporarily (counting injured
players), but never more than 11 able to take the field.

## Prayers to Nuffle (D16)

A one-shot blessing (or curse on the opponent) that lasts the game:

| D16 | Prayer                | Effect                                             |
| --- | --------------------- | -------------------------------------------------- |
| 1   | Treacherous Trapdoor  | trapdoors may open under players (D6, 1 = fall)    |
| 2   | Friends with the Ref  | Argue the Call succeeds on 5–6                     |
| 3   | Stiletto              | a random player gains Stab                         |
| 4   | Iron Man              | +1 AV to one player                                |
| 5   | Knuckle Dusters       | one player gains Mighty Blow                       |
| 6   | Bad Habits            | D3 opponents gain Loner (2+)                       |
| 7   | Greasy Cleats         | −1 MA to one opponent                              |
| 8   | Blessing of Nuffle    | one player gains Pro                               |
| 9   | Moles Under the Pitch | −1 to opponents' Rush                              |
| 10  | Perfect Passing       | completions earn 2 SPP                             |
| 11  | Dazzling Catching     | catches earn 1 SPP                                 |
| 12  | Fan Interaction       | crowd-push casualties earn 2 SPP                   |
| 13  | Fouling Frenzy        | foul casualties earn 2 SPP                         |
| 14  | Throw a Rock          | once per game, knock down an opponent (4+)         |
| 15  | Under Scrutiny        | opponents' armour-breaking fouls are auto sent-off |
| 16  | Intensive Training    | one player gains a chosen primary skill            |

## Special play cards

Not part of the core Third Season Edition game covered here; some house/league
formats add their own card decks.

## Implementation status

- **api/web** — the pre-game steps (journeymen, inducements, prayers) feed match
  setup in league management.
- **codex/tooltips** — source for the pre-game and prayers sections.
