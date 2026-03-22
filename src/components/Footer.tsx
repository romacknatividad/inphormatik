import { useState } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-24 px-4 pb-16 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap grid gap-10">
        <NewsletterSection />

        <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-start sm:justify-between">
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
      </div>
    </footer>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ready'>('idle')

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[rgba(29,78,216,0.16)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(238,246,255,0.92)_48%,rgba(221,235,255,0.88))] px-6 py-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="island-kicker mb-2">Newsletter</p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
            Stay ahead with the latest Philippine data, news, and research
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
            Join readers who want the most useful updates in one place. We send concise notes on
            new datasets, fresh news coverage, and research worth your attention.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-medium text-[var(--sea-ink-soft)]">
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-2">
              Curated, not cluttered
            </span>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-2">
              Built for data learners
            </span>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-2">
              Easy to unsubscribe
            </span>
          </div>
        </div>

        <form
          className="rounded-[1.5rem] bg-[rgba(255,255,255,0.44)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm"
          onSubmit={(event) => {
            event.preventDefault()
            setStatus('ready')
          }}
        >
          <label className="block text-sm font-medium text-[var(--sea-ink)]">
            Get the updates in your inbox
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--sea-ink)] outline-none transition focus:border-[rgba(37,99,235,0.4)]"
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="cta-button inline-flex justify-center px-5 py-3 text-sm font-semibold"
            >
              Subscribe now
            </button>
            <span className="text-xs leading-6 text-[var(--sea-ink-soft)]">
              Practical insights, no noisy inbox filler.
            </span>
          </div>

          {status === 'ready' ? (
            <p className="mt-4 text-xs leading-6 text-[var(--sea-ink-soft)]">
              Thanks for subscribing. Submitted email: {email || 'none'}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
