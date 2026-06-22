import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ElementType } from 'react'

import { cn } from './cn'

/**
 * Class variants for {@link Text} — the single source of typographic truth.
 * `variant` sets the role (face, scale, weight and transform together), `tone`
 * the colour; `weight` and `tabular` are orthogonal overrides for the cases a
 * variant's defaults don't cover.
 */
export const textVariants = cva('', {
  variants: {
    variant: {
      // Display — the heavy Anton face, uppercase. The heading scale.
      display: 'font-display text-6xl uppercase leading-[0.9] sm:text-7xl',
      title: 'font-display text-5xl uppercase',
      heading: 'font-display text-3xl uppercase',
      subheading: 'font-display text-2xl uppercase',
      // Headline — condensed Barlow, the label and kicker face.
      eyebrow: 'font-headline text-sm font-bold uppercase tracking-[0.3em]',
      label: 'font-headline text-xs font-semibold uppercase tracking-wide',
      labelLg: 'font-headline text-sm font-semibold uppercase tracking-wide',
      overline:
        'font-headline text-[0.625rem] font-bold uppercase tracking-wider',
      // Body — the clean Geist face.
      lead: 'font-body text-lg',
      body: 'font-body text-sm',
      caption: 'font-body text-xs',
      // Numeric — a big tabular figure for costs, values and roll results.
      stat: 'font-display text-xl leading-none tabular-nums',
      // Inline tabular figures in the headline face — roster stat cells, data.
      figure: 'font-headline tabular-nums',
    },
    tone: {
      default: 'text-ink',
      secondary: 'text-ink/70',
      muted: 'text-ink/45',
      blood: 'text-blood',
      gold: 'text-gold',
      pitch: 'text-pitch',
      paper: 'text-paper',
      paperMuted: 'text-paper/60',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tabular: {
      true: 'tabular-nums',
    },
  },
  defaultVariants: { variant: 'body', tone: 'default' },
})

/** Props for {@link Text}. */
export type TextProps = ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    /** The element to render — pick the semantic tag (`h1`, `span`, `label`…); defaults to `p`. */
    as?: ElementType
    /** Render the single child as the text element, merging styles onto it (e.g. a router Link). */
    asChild?: boolean
  }

/**
 * The app's typographic primitive: every run of styled text flows through here
 * so faces, scale and colour stay consistent. Pick the semantic tag with `as`
 * (or `asChild` to style an existing child) and the look with `variant`/`tone`.
 */
export function Text({
  className,
  variant,
  tone,
  weight,
  tabular,
  as,
  asChild = false,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : (as ?? 'p')
  return (
    <Comp
      className={cn(
        textVariants({ variant, tone, weight, tabular }),
        className
      )}
      {...props}
    />
  )
}
