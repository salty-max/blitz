import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Class variants for a navigation link. Active styling keys off the router's
 * `data-status="active"` attribute, so apply the result to a router Link's
 * `className` — no active/inactive props needed.
 */
export const navLinkVariants = cva('transition-colors', {
  variants: {
    tone: {
      masthead: 'text-paper/70 hover:text-gold data-[status=active]:text-gold',
      section: 'text-ink/55 hover:text-blood data-[status=active]:text-blood',
    },
  },
  defaultVariants: { tone: 'section' },
})

/** Variant props for {@link navLinkVariants}. */
export type NavLinkVariants = VariantProps<typeof navLinkVariants>
