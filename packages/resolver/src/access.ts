import type { Position, SkillCategory } from '@blitz/schema'

/** The skill categories a position can advance into — its Primary and Secondary access combined. */
export function accessibleCategories(position: Position): SkillCategory[] {
  return [...new Set([...position.primary, ...position.secondary])]
}

/** Whether a position may learn a skill of the given category — that is, the category is in its access. */
export function canLearn(position: Position, category: SkillCategory): boolean {
  return (
    position.primary.includes(category) || position.secondary.includes(category)
  )
}
