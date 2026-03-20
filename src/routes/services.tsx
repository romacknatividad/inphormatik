import { createFileRoute } from '@tanstack/react-router'
import { services } from '../content/site'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

const serviceImage =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'

const categories = [
  {
    title: 'Strategy and Architecture',
    items: ['Systems Architecture', 'Systems Design', 'Systems Integration'],
  },
  {
    title: 'Build and Delivery',
    items: ['Web Design and Development', 'Website Maintenance', 'Software QA'],
  },
  {
    title: 'Data and Intelligence',
    items: ['Data Analysis', 'AI Integration', 'Machine Learning Model Engineering'],
  },
]

function ServicesPage() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <section className="zen-section island-shell px-6 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="island-kicker mb-3">Services</p>
            <h1 className="display-title mb-4 text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
              Services for planning, building, and improving digital systems.
            </h1>
            <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
              InPHormatik supports organizations through architecture, design,
              engineering, quality, data, and intelligent systems work with a
              balance of clarity and execution.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
              <img
                src={serviceImage}
                alt="Planning digital services and systems"
                className="h-44 w-full object-cover"
              />
            </div>
            {categories.map((category) => (
              <div
                key={category.title}
                className="rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.7))] px-5 py-4 shadow-[0_16px_34px_rgba(37,99,235,0.08)]"
              >
                <p className="mb-2 text-sm font-semibold text-[var(--sea-ink)]">
                  {category.title}
                </p>
                <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
                  {category.items.join(' | ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item, index) => (
          <article
            key={item.title}
            className="feature-card rise-in overflow-hidden rounded-[1.8rem] border border-[var(--line)] p-0"
            style={{ animationDelay: `${index * 80 + 60}ms` }}
          >
            <div className="h-28 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(37,99,235,0.26))]" />
            <div className="p-6">
              <div className="mb-4 inline-flex rounded-full bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(37,99,235,0.1))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon-deep)]">
                Service Area
              </div>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                {item.title}
              </h2>
              <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
