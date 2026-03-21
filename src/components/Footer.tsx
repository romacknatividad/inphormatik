export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--line)] px-4 pb-16 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="m-0 text-sm font-medium text-[var(--sea-ink)]">InPHormatik</p>
          <p className="mt-1 text-sm">
            &copy; {year} Practical digital learning and applied data work.
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
            Information on this website is provided for educational purposes only and should
            not be treated as official advice, research, or a substitute for primary source
            verification.
          </p>
        </div>
      </div>
    </footer>
  )
}
