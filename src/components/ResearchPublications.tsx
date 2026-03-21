import { ArrowUpRight } from 'lucide-react'
import type { ResearchPublication } from '../content/researchPublications'

export function ResearchPublicationsSection({
  title = 'Research Publications',
  subtitle = 'Selected papers that give deeper context for this category.',
  publications,
}: {
  title?: string
  subtitle?: string
  publications: ResearchPublication[]
}) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
      <div className="mb-4">
        <p className="island-kicker mb-2">Research Publications</p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{subtitle}</p>
      </div>

      <div className="grid gap-4">
        {publications.map((publication) => (
          <article
            key={`${publication.title}-${publication.year}`}
            className="feature-card rounded-[1.5rem] border border-[var(--line)] p-5"
          >
            <p className="island-kicker mb-2">Published {publication.year}</p>
            <h3 className="mb-3 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
              {publication.title}
            </h3>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {publication.authors.join(', ')}
            </p>

            <a
              href={publication.href}
              target="_blank"
              rel="noreferrer"
              className="soft-pill mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
            >
              Open publication
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
