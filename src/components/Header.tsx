import { UserButton, Show, SignInButton, SignUpButton } from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-3 py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="soft-pill inline-flex items-center gap-3 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,var(--lagoon),var(--lagoon-deep))]" />
            InPHormatik
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium sm:order-2 sm:ml-8 sm:w-auto">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
          <Link
            to="/team"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Team
          </Link>
          <Link
            to="/services"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Services
          </Link>
          <Link
            to="/products"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Products
          </Link>
          <Link
            to="/courses"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Courses
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

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
        </div>
      </nav>
    </header>
  )
}
