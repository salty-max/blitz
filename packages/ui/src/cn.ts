import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Compose class names, resolving conflicting Tailwind utilities so the last wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
