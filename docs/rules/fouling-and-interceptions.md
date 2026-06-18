# Fouling & interceptions

Two ways a turn can turn nasty: kicking a downed player, and snatching a pass out
of the air.

## The Foul action

A once-per-turn dirty hit on a **Prone or Stunned** opponent. The fouler may move
first, then fouls, and can't move afterwards. It isn't a block — it's a straight
**Armour roll** against the downed player (and an Injury roll if it breaks).

### Foul assists

The foul's Armour (and Injury) roll is modified by assists:

- **+1** per **offensive assist** — your players marking the target, not
  themselves marked.
- **−1** per **defensive assist** — their players marking your fouler, not
  themselves marked.

### Getting sent off

Roll a **natural double** on the foul's Armour **or** Injury roll and the ref
spots it: the fouler is **sent off** once the foul resolves, and — if it was the
active team — a **turnover** is caused.

- **Argue the Call** (D6): **1** backfires (the coach is ejected and can't argue
  again); **2–5** the send-off stands; **6** the player is reinstated (the
  turnover still stands).
- A **Bribe** (see [team-building.md](team-building.md)) can keep a sent-off
  player on the pitch on a 2+.

## Interception

When a pass is thrown, if the Range Ruler crosses a square holding a **standing
opposition player**, that coach may pick one of them to attempt an
**interception**:

- An **Agility test**, at **−3** against an accurate pass or **−2** against an
  inaccurate one, plus **−1 per opponent Marking** the interceptor.
- Success (or a natural 6): they take the ball and a **turnover** is caused.
  Failure: the pass carries on as normal.

## Implementation status

- **engine** — the odds helper (#13) can compute foul armour-break odds and
  interception %.
- **codex/tooltips** — source for the fouling and interception sections.
