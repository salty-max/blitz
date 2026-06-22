import { z } from 'zod'

/** A single player on a roster — the position it fills, and its identity. */
export const rosterPlayerSchema = z.object({
  /** A position key from the team's roster. */
  position: z.string().min(1),
  /** The coach's name for the player. */
  name: z.string().optional(),
  /** Squad number, 1–16. */
  number: z.number().int().min(1).max(16).optional(),
})
export type RosterPlayer = z.infer<typeof rosterPlayerSchema>

/** A drafted roster: the players hired, plus the re-rolls and sideline staff bought. */
export const rosterSchema = z.object({
  players: z.array(rosterPlayerSchema).readonly(),
  /** Team re-rolls bought. */
  rerolls: z.number().int().min(0),
  /** Whether an Apothecary has been hired. */
  apothecary: z.boolean(),
  assistantCoaches: z.number().int().min(0),
  cheerleaders: z.number().int().min(0),
  /** Total Dedicated Fans (a new team starts with `rules.dedicatedFans.start`). */
  dedicatedFans: z.number().int().min(0),
})
export type Roster = z.infer<typeof rosterSchema>
