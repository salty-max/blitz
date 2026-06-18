# Core game

How a turn flows, the actions a player can take, and the basic movement tests
(dodging, rushing, picking up the ball, standing up).

## Turn structure & turnovers

A team turn is played by activating players one at a time. Each activated player
declares **one Action**, resolves it, and then the next player may be activated —
until every player who wants to act has acted, or a **turnover** happens.

A **turnover** ends the active team's turn immediately (any not-yet-activated
players lose their go). It is triggered by, among other things:

- failing to pick up a loose ball;
- a fumbled or intercepted pass;
- the ball being caught by, or coming to rest with, the opposition after a pass
  or hand-off;
- an active-team player being pushed into the crowd or sent off.

## Player actions

A player takes exactly one Action per activation. Some actions are capped at
**once per team turn**:

| Action          | Per turn  |
| --------------- | --------- |
| Move            | unlimited |
| Block           | unlimited |
| Blitz           | 1         |
| Pass            | 1         |
| Hand-off        | 1         |
| Foul            | 1         |
| Throw Team-mate | 1         |
| Secure the Ball | 1         |

## Movement

A player may move up to their **Move Allowance (MA)** in squares, one square at a
time, in any direction (diagonals included). Plain movement needs no roll. A
player can't enter an occupied square or voluntarily leave the pitch.

## Rushing

A player may move **beyond their MA**, one square at a time. Each extra square is
a **Rush**: roll a D6, **2+** to make it. A natural **1** means the player falls
over in that square and the activation ends at once. A player may attempt **at
most two Rushes** per activation. If a square needs both a Rush and a Dodge, the
Rush is rolled first.

_(Rush is the Third Season name for what older editions called Go-For-It.)_

## Dodging

Moving **out of a square in which the player is Marked** by an opponent requires
a **Dodge** — an Agility test against the player's AG, with a **−1 modifier for
each opposition player Marking the square being moved into**. Success: the player
moves and stays standing, and may keep moving. Failure: the player falls over in
the target square (a turnover if they had the ball).

## Picking up the ball

- **During a Move** (entering the ball's square): an Agility test, with **−1 per
  opposition player Marking the picker-upper**. Failure causes a **turnover** and
  the ball bounces.
- **Secure the Ball action** (new in Third Season Edition): only available when
  the loose ball is clear of nearby standing, undistracted opponents. The player
  makes a free move to the ball, then rolls **2+ to pick it up automatically**;
  the activation then ends. A natural **1** is a turnover. This gives low-Agility
  teams a reliable way to collect the ball.

## Standing up

Standing up from Prone costs **3 squares of MA** before the player does anything
else. A player with **MA 2 or less** rolls instead: **4+** to stand (spending
their whole move to do so); on **1–3** they stay prone and the activation ends.

## Implementation status

- **engine** — not applicable; these are positional/board-state rules. The odds
  helper (#13) may surface success chances for dodge / rush / pick-up.
- **codex/tooltips** — this file is the source for the core-rules section.

## Sources

- bloodbowlbase.ru — Third Season Edition core rules, "The Game of Blood Bowl".
  To be verified against the official Third Season Edition rulebook (the
  authority).
