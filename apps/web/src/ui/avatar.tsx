import { cva, type VariantProps } from 'class-variance-authority'
import { type ReactNode, useState } from 'react'

import { cn } from './cn'

/** Class variants for an {@link Avatar} — chiefly its size. */
export const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-ink font-headline font-semibold uppercase leading-none text-paper',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

/** Props for {@link Avatar}. */
export type AvatarProps = VariantProps<typeof avatarVariants> & {
  /** Image URL; falls back to {@link AvatarProps.fallback} if absent or broken. */
  src?: string
  alt?: string
  /** Shown when there's no image — typically a team's or player's initials. */
  fallback: ReactNode
  className?: string
}

/** A sharp square avatar — a team crest or player portrait, with an initials fallback. */
export function Avatar({ src, alt, fallback, size, className }: AvatarProps) {
  const [broken, setBroken] = useState(false)
  const showImage = src && !broken

  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt ?? ''}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        fallback
      )}
    </span>
  )
}
