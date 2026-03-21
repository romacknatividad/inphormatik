import { SignIn } from '@clerk/tanstack-react-start'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

type SignInSearch = {
  redirectUrl?: string
}

export const Route = createFileRoute('/sign-in')({
  validateSearch: (search: Record<string, unknown>): SignInSearch => ({
    redirectUrl: typeof search.redirectUrl === 'string' ? search.redirectUrl : undefined,
  }),
  component: SignInPage,
})

function SignInPage() {
  const { redirectUrl } = Route.useSearch()

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="flex flex-col justify-between rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(23,116,181,0.1),rgba(255,255,255,0.8))] p-6">
            <div className="space-y-4">
              <p className="island-kicker">Protected area</p>
              <h1 className="display-title text-4xl font-semibold tracking-[-0.04em] text-[var(--sea-ink)]">
                Sign in to view the research categories.
              </h1>
              <p className="max-w-md text-sm leading-7 text-[var(--sea-ink-soft)]">
                Category pages are available to authenticated users only. Sign in to access the
                datasets, charts, publications, and analysis pages.
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm text-[var(--sea-ink-soft)]">
              <p className="font-medium text-[var(--sea-ink)]">What you&apos;ll unlock</p>
              <ul className="space-y-2">
                <li>- Economy, society, disaster, and policy category pages</li>
                <li>- D3 charts, data tables, and research publications</li>
                <li>- Curated links to official and open datasets</li>
              </ul>
            </div>

            <Link
              to="/"
              className="soft-pill mt-8 inline-flex w-fit items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to homepage
            </Link>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-3 sm:p-4">
            <SignIn
              routing="path"
              path="/sign-in"
              appearance={{
                elements: {
                  card: 'border-0 bg-transparent shadow-none',
                  rootBox: 'w-full',
                },
              }}
              forceRedirectUrl={redirectUrl}
              fallbackRedirectUrl={redirectUrl ?? '/'}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
