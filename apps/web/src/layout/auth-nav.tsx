import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { authClient } from '@/lib/auth-client'
import { Avatar } from '@/ui'

/** First letters of up to two words, e.g. "Max Blanc" → "MB". */
function initials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] ?? '')
    .slice(0, 2)
    .join('')
  return letters.toUpperCase() || '?'
}

/** Masthead auth control — a sign-in button when signed out, or the signed-in user with sign-out. */
export function AuthNav() {
  const { t } = useTranslation('masthead')
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()

  async function handleSignOut() {
    await authClient.signOut()
    await navigate({ to: '/' })
  }

  if (isPending) return null

  if (!data) {
    return (
      <Link
        to="/login"
        className="border-2 border-gold/70 px-3 py-1.5 font-headline text-xs font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        {t('auth.signIn')}
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2.5">
      <Avatar
        size="sm"
        fallback={initials(data.user.name)}
        className="border-gold bg-gold text-ink"
      />
      <span className="hidden font-headline text-sm font-semibold uppercase tracking-wide text-paper sm:inline">
        {data.user.name}
      </span>
      <button
        type="button"
        onClick={() => void handleSignOut()}
        aria-label={t('auth.signOut')}
        title={t('auth.signOut')}
        className="inline-flex h-8 w-8 items-center justify-center text-paper/60 transition-colors hover:text-gold"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}
