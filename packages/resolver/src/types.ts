/** A single player slot on a roster — the position it fills. */
export interface RosterPlayer {
  /** A position key from the team's roster. */
  position: string
}

/** A drafted roster: the players hired, plus the re-rolls and sideline staff bought. */
export interface Roster {
  players: readonly RosterPlayer[]
  /** Team re-rolls bought. */
  rerolls: number
  apothecary: boolean
  assistantCoaches: number
  cheerleaders: number
  /** Total Dedicated Fans (a new team starts with `rules.dedicatedFans.start`). */
  dedicatedFans: number
}

/** The kind of a {@link Diagnostic}; the UI formats a message from the code and its values. */
export type DiagnosticCode =
  | 'unknown-position'
  | 'position-limit'
  | 'too-few-players'
  | 'too-many-players'
  | 'reroll-limit'
  | 'apothecary-not-allowed'
  | 'assistant-coach-limit'
  | 'cheerleader-limit'
  | 'dedicated-fans-limit'
  | 'over-budget'

/**
 * A roster-validation finding. `code` identifies it; `actual` and `limit` carry
 * the numbers (count vs cap, cost vs budget) so the UI can format a localized
 * message without re-deriving them.
 */
export interface Diagnostic {
  code: DiagnosticCode
  severity: 'error' | 'warning'
  /** The position key, for `unknown-position` and `position-limit`. */
  position?: string
  /** The offending value — a count, or the total cost. */
  actual?: number
  /** The permitted bound — a limit, max, min, or the budget. */
  limit?: number
}

/** A roster's gold-piece cost, split by line; `total` is the budget spend. */
export interface RosterCost {
  players: number
  rerolls: number
  /** Apothecary, assistant coaches and cheerleaders. */
  staff: number
  /** Dedicated Fans bought beyond the free starting one. */
  dedicatedFans: number
  total: number
}

/** The result of validating a roster. */
export interface RosterValidation {
  /** True when there are no error-severity diagnostics; a `too-few-players` warning still counts as valid. */
  valid: boolean
  diagnostics: Diagnostic[]
  playerCount: number
  cost: RosterCost
  /** Team Value — players, re-rolls and staff (Dedicated Fans and treasury are excluded). */
  teamValue: number
}
