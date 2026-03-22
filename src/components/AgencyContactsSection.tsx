import { ArrowUpRight } from 'lucide-react'
import type { AgencyContact } from '../content/categoryAgencies'

export function AgencyContactsSection({
  title = 'Government agencies',
  subtitle = 'The official public institutions most closely tied to this category.',
  agencies,
}: {
  title?: string
  subtitle?: string
  agencies: AgencyContact[]
}) {
  if (!agencies.length) {
    return null
  }

  return (
    <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
      <div className="mb-4">
        <p className="island-kicker mb-2">Government Agencies</p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agencies.map((agency) => (
          <article
            key={agency.name}
            className="feature-card rounded-[1.5rem] border border-[var(--line)] p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(37,99,235,0.13),rgba(14,165,233,0.22))] text-sm font-semibold tracking-[0.12em] text-[var(--sea-ink)]">
                {agency.logoMark}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                  {agency.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {agency.mandate}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
              <InfoLine label="Email" value={agency.email} />
              <InfoLine label="Phone" value={agency.phone} />
              <InfoLine label="Address" value={agency.address} />
            </div>

            <a
              href={agency.website}
              target="_blank"
              rel="noreferrer"
              className="soft-pill mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
            >
              Open website
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-[var(--line)] bg-white/60 px-4 py-3">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
        {label}
      </p>
      <p className="mt-1 m-0 text-sm text-[var(--sea-ink)]">{value}</p>
    </div>
  )
}
