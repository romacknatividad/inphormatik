import { createFileRoute } from '@tanstack/react-router'
import { executiveTeam, teamDepartments } from '../content/site'

export const Route = createFileRoute('/team')({
  component: TeamPage,
})

function TeamPage() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <section className="zen-section island-shell px-6 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 max-w-3xl">
          <p className="island-kicker mb-3">Team</p>
          <h1 className="display-title mb-4 text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            Organizational structure and team leadership.
          </h1>
          <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
            The team is presented by leadership and functional units so the page
            reads like a real organization, not just a collection of profiles.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="island-kicker mb-2">Executive Leadership</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
              Leadership Team
            </h2>
          </div>
          <div className="hidden rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--sea-ink-soft)] sm:block">
            Company direction and operations
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {executiveTeam.map((member, index) => (
            <article
              key={member.name}
              className="feature-card rise-in overflow-hidden rounded-[1.8rem] border border-[var(--line)]"
              style={{ animationDelay: `${index * 80 + 60}ms` }}
            >
              <div className="grid md:grid-cols-[220px_1fr]">
                <div className="h-full min-h-64 overflow-hidden bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(37,99,235,0.22))]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-7 sm:p-8">
                  <p className="island-kicker mb-3">{member.role}</p>
                  <h3 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    {member.name}
                  </h3>
                  <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                    {member.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <p className="island-kicker mb-2">Functional Units</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
            Departments and Team Members
          </h2>
        </div>

        <div className="grid gap-6">
          {teamDepartments.map((department, deptIndex) => (
            <section
              key={department.name}
              className="island-shell rise-in px-6 py-7 sm:px-8"
              style={{ animationDelay: `${deptIndex * 90 + 120}ms` }}
            >
              <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="island-kicker mb-2">{department.lead}</p>
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    {department.name}
                  </h3>
                </div>
                <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {department.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {department.members.map((member) => (
                  <article
                    key={member.name}
                    className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))]"
                  >
                    <div className="grid grid-cols-[112px_1fr]">
                      <div className="h-full min-h-36 overflow-hidden bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(37,99,235,0.18))]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="island-kicker mb-2">{member.role}</p>
                        <h4 className="mb-2 text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                          {member.name}
                        </h4>
                        <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
