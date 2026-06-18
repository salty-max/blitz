import { convolve, die, type Distribution } from './distribution'

/** A single six-sided die (1..6) — the heart of every Blood Bowl roll. */
export function d6(): Distribution {
  return die(6)
}

/** Two six-sided dice summed (2..12) — armour and injury rolls. */
export function twoD6(): Distribution {
  return convolve(die(6), die(6))
}

/**
 * Probability a single d6 roll succeeds at `target`+. Blood Bowl's natural-roll
 * rule means a 1 always fails and a 6 always succeeds, so the target is clamped
 * to 2+..6+ and the chance to [1/6, 5/6].
 */
export function successOnD6(target: number): number {
  const needed = Math.min(6, Math.max(2, target))
  return (7 - needed) / 6
}

/**
 * Probability of success given one re-roll of a failure — a team re-roll, or a
 * skill like Pro/Dodge. `p` is the unmodified single-attempt chance.
 */
export function withReroll(p: number): number {
  return p + (1 - p) * p
}
