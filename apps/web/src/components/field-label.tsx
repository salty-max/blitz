/** A small uppercase muted label that prefixes or tops a field's value. */
export function FieldLabel({ children }: { children: string }) {
  return (
    <span className="font-headline text-xs font-semibold uppercase tracking-wide text-ink/45">
      {children}
    </span>
  )
}
