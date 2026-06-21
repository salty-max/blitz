# Passing & ball handling

Throwing, catching, handing off, and what a loose ball does.

## The Pass action

The Pass — like the Hand-off, Foul and Throw Team-mate — opens with a **free
Move**, then the throw, with **no movement after**. Throw the ball to a target
square (once per turn). The thrower makes a **Passing test** against their **PA**
characteristic, modified by range and by markers.

### Range & modifiers

Measure the target with the Range Ruler:

| Band       | Modifier |
| ---------- | -------- |
| Quick Pass | 0        |
| Short Pass | −1       |
| Long Pass  | −2       |
| Long Bomb  | −3       |

Plus **−1 for each opposition player Marking the thrower**.

### Outcomes

- **Accurate** (test passes, or a natural 6) — the ball lands in the target
  square, where a team-mate may Catch it.
- **Inaccurate** (test fails) — the ball **scatters** from the target square
  before landing.
- **Fumble** (a modified result of 1, or a natural 1) — the ball is dropped, it
  **bounces** from the thrower's square, and a **turnover** is caused.

## Catching

The receiver makes an **Agility test**, modified by **−1** if the ball had
bounced, **−1** if it was thrown-in, and **−1 per opposition player Marking** the
catcher. Success (or a natural 6) gives possession; failure (or a natural 1)
makes the ball bounce. A Prone, Stunned or Distracted player auto-fails a catch.

## Hand-off

A once-per-turn action: the carrier finishes their move adjacent to a **Standing
team-mate not Marked** by the opposition, and that team-mate makes a Catch.

## Loose balls

- **Bounce** — a loose ball moves one square in a random direction.
- **Scatter** — an inaccurate pass deviates several squares from its target
  before landing.
- **Throw-in** — a ball leaving the pitch is returned: place the Throw-in
  template on the last square it occupied, roll a **D6** for direction (a **D3**
  at a corner), and it travels **2D6** squares.

## Throw Team-mate

Requires the Throw Team-mate trait. The thrower picks up an adjacent team-mate
who has Right Stuff and throws them; the target must sit within the first two
bands of the Range Ruler. Once per turn.

## Implementation status

- **engine** — the odds helper (#13) can compute pass success % (PA + range +
  markers) and catch %.
- **codex/tooltips** — source for the passing and catching sections.
