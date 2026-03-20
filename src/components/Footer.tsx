import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-12 pt-8 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="m-0 text-sm font-medium text-[var(--sea-ink)]">InPHormatik</p>
          <p className="mt-1 text-sm">
            &copy; {year} Software, services, and digital learning.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/" className="no-underline">
            Home
          </Link>
          <Link to="/about" className="no-underline">
            About
          </Link>
          <Link to="/team" className="no-underline">
            Team
          </Link>
          <Link to="/services" className="no-underline">
            Services
          </Link>
          <Link to="/courses" className="no-underline">
            Courses
          </Link>
        </div>
      </div>
    </footer>
  )
}
