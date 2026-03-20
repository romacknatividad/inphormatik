import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

const aboutImage =
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
const aboutVideo = 'https://www.youtube.com/embed/ScMzIvxBSi4?rel=0'

function About() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <section className="zen-section island-shell px-6 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="island-kicker mb-3">About InPHormatik</p>
            <h1 className="display-title mb-4 text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
              A digital company built to bring services, products, and learning together.
            </h1>
            <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
              InPHormatik is being shaped as a home for services, products,
              and modern learning. The goal is to create one strong brand where
              client work, digital offerings, and accessible education can grow
              together with clarity and purpose.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(37,99,235,0.08)] shadow-[0_16px_34px_rgba(37,99,235,0.08)]">
            <img
              src={aboutImage}
              alt="Modern workspace representing digital collaboration"
              className="h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          [
            'What we are',
            'A company offering web services, software development, data work, AI-enabled solutions, and digital learning.',
          ],
          [
            'What we do',
            'We design, build, support, and improve digital systems while also creating products and educational content.',
          ],
          [
            'Why it exists',
            'To make digital capability more practical, more polished, and more accessible for organizations and learners.',
          ],
        ].map(([title, desc]) => (
          <article
            key={title}
            className="feature-card rounded-[1.8rem] border border-[var(--line)] p-6"
          >
            <h2 className="mb-3 text-xl font-semibold text-[var(--sea-ink)]">{title}</h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">{desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="island-shell overflow-hidden px-0 py-0">
          <div className="aspect-video w-full">
            <iframe
              src={aboutVideo}
              title="About InPHormatik video"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>
        <article className="island-shell px-6 py-8 sm:px-8">
          <p className="island-kicker mb-3">Visual Story</p>
          <h2 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)]">
            A more visual way to present the company.
          </h2>
          <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
            This section can later be replaced with a brand reel, founder
            message, company showcase, or product overview video. For now it
            adds motion and atmosphere to the About page.
          </p>
        </article>
      </section>
    </main>
  )
}
