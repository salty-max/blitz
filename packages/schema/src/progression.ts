import { z } from 'zod'

/** How a player earns Star Player Points — the SPP awarded for a given action. */
export const sppActionSchema = z.object({
  /** Stable slug key, e.g. `touchdown`. */
  key: z.string().min(1),
  /** The action that earns the points. */
  action: z.string().min(1),
  /** Star Player Points awarded. */
  spp: z.number().int().min(1),
})
export type SppAction = z.infer<typeof sppActionSchema>

/**
 * A row of the advancement cost table — the SPP cost of each upgrade type at a
 * given experience level (the cost rises as a player takes more advances).
 */
export const advancementCostSchema = z.object({
  /** Stable slug key, e.g. `veteran`. */
  key: z.string().min(1),
  /** The experience level and its advance number, e.g. `Veteran (2nd)`. */
  level: z.string().min(1),
  /** SPP cost of a randomly-chosen Primary-category skill. */
  randomPrimary: z.number().int().min(1),
  /** SPP cost of a chosen Primary-category skill. */
  chosenPrimary: z.number().int().min(1),
  /** SPP cost of a randomly-chosen Secondary-category skill. */
  randomSecondary: z.number().int().min(1),
  /** SPP cost of a chosen Secondary-category skill. */
  chosenSecondary: z.number().int().min(1),
  /** SPP cost of a characteristic improvement. */
  characteristic: z.number().int().min(1),
})
export type AdvancementCost = z.infer<typeof advancementCostSchema>

/** A result on the characteristic-improvement table (D8) — which characteristic(s) may rise by 1. */
export const characteristicGainSchema = z.object({
  /** Stable slug key, e.g. `d8-3`. */
  key: z.string().min(1),
  /** The inclusive D8 roll range that yields this result, e.g. `[3, 4]`. */
  roll: z.tuple([
    z.number().int().min(1).max(8),
    z.number().int().min(1).max(8),
  ]),
  /** The improvement granted, e.g. `+1 AV, MA or PA`. */
  gain: z.string().min(1),
})
export type CharacteristicGain = z.infer<typeof characteristicGainSchema>

/** How much an advancement adds to a player's current value. */
export const valueIncreaseSchema = z.object({
  /** Stable slug key, e.g. `primary`. */
  key: z.string().min(1),
  /** The advancement taken, e.g. `Primary skill`. */
  advancement: z.string().min(1),
  /** The value added to the player, e.g. `+20,000 gp`. */
  value: z.string().min(1),
  /** The same value as a gold-piece number, for computing a player's worth. */
  gp: z.number().int().min(0),
})
export type ValueIncrease = z.infer<typeof valueIncreaseSchema>

/**
 * The player-progression reference — how Star Player Points are earned, what
 * advancements cost, and how each advancement raises a player's value.
 */
export const progressionSchema = z.object({
  sppActions: z.array(sppActionSchema).min(1),
  advancementCosts: z.array(advancementCostSchema).min(1),
  characteristicGains: z.array(characteristicGainSchema).min(1),
  valueIncreases: z.array(valueIncreaseSchema).min(1),
})
export type Progression = z.infer<typeof progressionSchema>
