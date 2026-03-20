import { Link, createFileRoute } from '@tanstack/react-router'
import { courses, executiveTeam, products, services, teamDepartments } from '../content/site'

export const Route = createFileRoute('/')({ component: App })

const homeImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
]

function App() {
  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <section className="zen-section island-shell rise-in px-6 py-10 sm:px-10 sm:py-14">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="hero-chip mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]">
              Digital services, software, and education
            </div>
            <h1 className="display-title mb-5 text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-7xl">
              Technology solutions for organizations, institutions, and teams.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
              InPHormatik brings together systems thinking, software delivery,
              web experiences, analytics, AI-enabled solutions, digital
              products, and on-demand education under one polished brand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="rounded-full bg-[linear-gradient(135deg,var(--lagoon),var(--lagoon-deep))] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_18px_38px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5"
              >
                Explore services
              </Link>
              <Link
                to="/products"
                className="soft-pill px-6 py-3 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5"
              >
                View products
              </Link>
            </div>
          </div>

          <div className="relative z-10 grid gap-3">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
                <img
                  src={homeImages[0]}
                  alt="Team working on digital solutions"
                  className="h-52 w-full object-cover"
                />
              </div>
              <div className="grid gap-3">
                {homeImages.slice(1).map((src, index) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-[1.25rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)]"
                  >
                    <img
                      src={src}
                      alt={index === 0 ? 'Software planning session' : 'Collaborative project team'}
                      className="h-[98px] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {[
              'Architecture and design for evolving systems',
              'Web, QA, integration, and development support',
              'Analytics, AI integration, and machine learning engineering',
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,255,255,0.62))] px-5 py-4 text-sm font-medium text-[var(--sea-ink)] shadow-[0_16px_34px_rgba(37,99,235,0.08)] backdrop-blur-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {services.map((item, index) => (
          <article
            key={item.title}
            className="feature-card rise-in rounded-[1.8rem] border border-[var(--line)] p-6"
            style={{ animationDelay: `${index * 80 + 80}ms` }}
          >
            <p className="island-kicker mb-3">Core Offering</p>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
              {item.title}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="zen-section island-shell px-6 py-8 sm:px-8">
          <div className="relative z-10">
            <p className="island-kicker mb-3">Approach</p>
            <h2 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)]">
              Modern, upbeat, and structured for growth.
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
              The experience now aims to feel welcoming and contemporary while
              still giving every part of the company room to feel organized and
              credible.
            </p>
          </div>
        </article>

        <article className="island-shell px-6 py-8 sm:px-8">
          <p className="island-kicker mb-4">Inside the website</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Products', `${products.length} focused areas for digital offerings`],
              ['Courses', `${courses.length} directions for self-paced learning`],
              ['Team', `${executiveTeam.length + teamDepartments.length} leadership and department views`],
              ['About', 'A clear overview of the company and its direction'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
              >
                <h3 className="mb-1 text-base font-semibold text-[var(--sea-ink)]">
                  {title}
                </h3>
                <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">{desc}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
