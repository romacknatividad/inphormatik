import { createFileRoute } from '@tanstack/react-router'
import { products } from '../content/site'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

const productImage =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'

function ProductsPage() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <section className="zen-section island-shell px-6 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="island-kicker mb-3">Products</p>
            <h1 className="display-title mb-4 text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
              Software products built for real operations and institutions.
            </h1>
            <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
              InPHormatik can offer practical software for organizations,
              schools, universities, workplaces, and local communities that
              need better systems and smoother workflows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)] sm:col-span-3 lg:col-span-1">
              <img
                src={productImage}
                alt="Software dashboards and analytics"
                className="h-44 w-full object-cover"
              />
            </div>
            {[
              ['Business', 'Tools for operations, scheduling, payroll, and HR'],
              ['Education', 'Systems for attendance, records, and university workflows'],
              ['Government', 'Platforms for barangay services and local management'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] px-5 py-4 shadow-[0_16px_34px_rgba(37,99,235,0.08)]"
              >
                <p className="mb-1 text-sm font-semibold text-[var(--sea-ink)]">{title}</p>
                <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((item, index) => (
          <article
            key={item.title}
            className="feature-card rise-in overflow-hidden rounded-[1.8rem] border border-[var(--line)] p-0"
            style={{ animationDelay: `${index * 80 + 60}ms` }}
          >
            <div className="h-32 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(34,197,94,0.14),rgba(37,99,235,0.22))]" />
            <div className="p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(34,197,94,0.12))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon-deep)]">
                  {item.tag}
                </span>
                <span className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(37,99,235,0.2))]" />
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

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="island-shell px-6 py-8 sm:px-8">
          <p className="island-kicker mb-3">Product Direction</p>
          <h2 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)]">
            A focused software product lineup.
          </h2>
          <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
            The products page now presents concrete software solutions that can
            be sold, demonstrated, and expanded over time as part of the
            InPHormatik ecosystem.
          </p>
        </article>

        <article className="island-shell px-6 py-8 sm:px-8">
          <p className="island-kicker mb-4">Software areas</p>
          <div className="grid gap-3">
            {[
              'Scheduling and service operations',
              'Payroll, HR, and workforce systems',
              'Education management and academic records',
              'Public sector and community administration',
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--sea-ink)]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
