import { z } from 'zod'

/** A player characteristic key — Movement, Strength, Agility, Passing, Armour. */
export const characteristicKeySchema = z.enum(['ma', 'st', 'ag', 'pa', 'av'])
export type CharacteristicKey = z.infer<typeof characteristicKeySchema>

/** An advancement a player has earned — a learned skill or an improved characteristic. */
export const advancementSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('skill'),
    /** The skill key gained. */
    skill: z.string().min(1),
    /** True when taken from the Secondary category, which sets the value gained. */
    secondary: z.boolean(),
  }),
  z.object({
    kind: z.literal('characteristic'),
    /** The characteristic raised by one. */
    characteristic: characteristicKeySchema,
  }),
])
export type Advancement = z.infer<typeof advancementSchema>

/** A lasting injury a player carries between games. */
export const playerInjurySchema = z.discriminatedUnion('kind', [
  // A Niggling Injury costs no characteristic but stacks the future injury odds.
  z.object({ kind: z.literal('niggling') }),
  z.object({
    kind: z.literal('characteristic'),
    /** The characteristic reduced by one. */
    characteristic: characteristicKeySchema,
  }),
])
export type PlayerInjury = z.infer<typeof playerInjurySchema>

/** A single player on a roster — its position, identity, and earned progression. */
export const rosterPlayerSchema = z.object({
  /** A position key from the team's roster. */
  position: z.string().min(1),
  /** The coach's name for the player. */
  name: z.string().optional(),
  /** Squad number, 1–16. */
  number: z.number().int().min(1).max(16).optional(),
  /** Star Player Points banked but not yet spent on an advancement. */
  spp: z.number().int().min(0).optional(),
  /** Advancements taken, in order — their count is the player's advance level. */
  advancements: z.array(advancementSchema).optional(),
  /** Lasting injuries the player carries. */
  injuries: z.array(playerInjurySchema).optional(),
  /** Whether the player is a temporary Journeyman — free, and outside Team Value. */
  journeyman: z.boolean().optional(),
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
