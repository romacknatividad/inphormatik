import { useEffect, useState, type ReactNode } from 'react'
import { UserButton, Show, SignInButton, SignUpButton } from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--line)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex w-full flex-wrap items-center gap-4 py-5">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="soft-pill inline-flex items-center gap-3 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,var(--lagoon),var(--lagoon-deep))]" />
            InPHormatik
          </Link>
        </h2>

        <Link
          to="/news"
          className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
        >
          News
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <span className="soft-pill inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sea-ink-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--lagoon)]" />
          Alpha
        </span>

        <div className="ml-auto flex items-center gap-3">
          <ClientOnly>
            <ThemeToggle />
          </ClientOnly>

          <ClientOnly>
            <div
              id="clerk-auth-section"
              className="soft-pill flex items-center gap-2 px-2 py-1"
            >
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>
            </div>
          </ClientOnly>
        </div>
      </nav>
    </header>
  )
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <>{children}</>
}
