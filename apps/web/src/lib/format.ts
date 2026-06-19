/** Format a gold-piece cost in coach shorthand, e.g. 90000 → "90k". */
export function gp(cost: number): string {
  return `${cost / 1000}k`
}
