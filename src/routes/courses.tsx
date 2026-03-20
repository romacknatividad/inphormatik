import { createFileRoute } from '@tanstack/react-router'
import { courses } from '../content/site'

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
})

const courseImage =
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80'

function CoursesPage() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <section className="zen-section island-shell px-6 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="island-kicker mb-3">Courses</p>
            <h1 className="display-title mb-4 text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
              Courses designed for practical learning, not just passive watching.
            </h1>
            <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
              InPHormatik can offer a modern on-demand learning experience for
              students, professionals, and teams who want useful digital and
              technical skills delivered clearly.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
              <img
                src={courseImage}
                alt="Students and professionals learning online"
                className="h-44 w-full object-cover"
              />
            </div>
            {[
              ['Flexible', 'Self-paced and available when learners need it'],
              ['Practical', 'Built around real tools, systems, and workflows'],
              ['Scalable', 'Structured for individuals, groups, and organizations'],
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

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {courses.map((item, index) => (
          <article
            key={item.title}
            className="feature-card rise-in overflow-hidden rounded-[1.8rem] border border-[var(--line)] p-0"
            style={{ animationDelay: `${index * 90 + 60}ms` }}
          >
            <div className="h-28 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(34,197,94,0.16),rgba(37,99,235,0.18))]" />
            <div className="p-7">
              <div className="mb-4 inline-flex rounded-full bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(34,197,94,0.12))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon-deep)]">
                Learning Experience
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
          <p className="island-kicker mb-3">What the courses page can become</p>
          <h2 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)]">
            A structured home for your course offerings.
          </h2>
          <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
            This page is now set up to grow into a stronger course storefront,
            with room for featured programs, pricing, course tracks, learner
            outcomes, and instructor profiles later on.
          </p>
        </article>

        <article className="island-shell px-6 py-8 sm:px-8">
          <p className="island-kicker mb-4">Possible course themes</p>
          <div className="grid gap-3">
            {[
              'Web and software fundamentals',
              'Systems design and architecture',
              'Data analysis and reporting',
              'AI integration and practical automation',
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
