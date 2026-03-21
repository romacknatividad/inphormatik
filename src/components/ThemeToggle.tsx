import { useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme

    root.classList.remove('light', 'dark')
    root.classList.add(resolved)

    if (theme === 'auto') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }

    root.style.colorScheme = resolved
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => {
        setTheme((current) =>
          current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto',
        )
      }}
      className="soft-pill px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:-translate-y-0.5"
      aria-label="Toggle theme"
    >
      Theme: {theme}
    </button>
  )
}
