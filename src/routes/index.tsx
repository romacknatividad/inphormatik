import { useEffect, useRef, useState } from 'react'

import { Link, createFileRoute } from '@tanstack/react-router'
import { Show, SignInButton, UserButton, useUser } from '@clerk/react'
import { ChevronRight, Quote, Volume2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const FIFTEEN_MINUTES = 15 * 60 * 1000
const FIVE_MINUTES = 5 * 60 * 1000
const MANILA_FALLBACK = {
  latitude: 14.5995,
  longitude: 120.9842,
  label: 'the Philippines',
}
const WELCOME_STORAGE_KEY = 'inphormatik-avatar-welcomed'

const wisdomQuotes = [
  {
    text: 'You have power over your mind, not outside events.',
    source: 'Marcus Aurelius',
    period: 'morning',
  },
  {
    text: 'The journey of a thousand miles begins with a single step.',
    source: 'Chinese proverb',
    period: 'morning',
  },
  {
    text: 'Knowing others is intelligence; knowing yourself is true wisdom.',
    source: 'Confucius',
    period: 'midday',
  },
  {
    text: 'Simplicity is the ultimate sophistication.',
    source: 'Leonardo da Vinci',
    period: 'midday',
  },
  {
    text: 'It is not what happens to you, but how you react to it that matters.',
    source: 'Epictetus',
    period: 'afternoon',
  },
  {
    text: 'The good life is one inspired by love and guided by knowledge.',
    source: 'Bertrand Russell',
    period: 'afternoon',
  },
  {
    text: 'The wise adapt themselves to circumstances, as water takes the shape of the vessel.',
    source: 'Japanese proverb',
    period: 'evening',
  },
  {
    text: 'He who conquers himself is the mightiest warrior.',
    source: 'Confucius',
    period: 'evening',
  },
]

const intentPrompts = [
  'What would you like me to do next?',
  'How can I help you right now?',
  'Would you like a quote, the time, or something else?',
  'What should we focus on next?',
]

type RecognitionInstance = {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: any) => void) | null
  onerror: ((event: any) => void) | null
  onend: (() => void) | null
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function getPeriodForHour(hour: number) {
  if (hour >= 5 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 15) return 'midday'
  if (hour >= 15 && hour < 19) return 'afternoon'
  return 'evening'
}

function describeWeather(code: number | undefined) {
  if (code === undefined) return 'clear'
  if (code === 0) return 'clear'
  if (code === 1 || code === 2) return 'partly cloudy'
  if (code === 3) return 'overcast'
  if (code === 45 || code === 48) return 'misty'
  if (code >= 51 && code <= 57) return 'light drizzle'
  if (code >= 61 && code <= 67) return 'rainy'
  if (code >= 71 && code <= 77) return 'snowy'
  if (code >= 80 && code <= 82) return 'showery'
  if (code >= 95) return 'stormy'
  return 'changeable'
}

async function fetchWeatherSummary(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,apparent_temperature,is_day&timezone=auto`
  )

  if (!response.ok) {
    throw new Error('Weather request failed')
  }

  return response.json()
}

function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [assistantMessage, setAssistantMessage] = useState('Welcome. I am online.')
  const [assistantVisible, setAssistantVisible] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceURI, setVoiceURI] = useState('')
  const [avatarSeed, setAvatarSeed] = useState('inphormatik')
  const recognitionRef = useRef<RecognitionInstance | null>(null)
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const lastQuoteIndexRef = useRef<number>(-1)
  const lastPromptIndexRef = useRef<number>(-1)
  const welcomePlayedRef = useRef(false)
  const bubbleTimerRef = useRef<number | null>(null)
  const listeningLockRef = useRef(false)

  const clearBubbleTimer = () => {
    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current)
      bubbleTimerRef.current = null
    }
  }

  const syncBubble = (text: string) => {
    setAssistantMessage(text)
    setAssistantVisible(true)
    clearBubbleTimer()
    bubbleTimerRef.current = window.setTimeout(() => {
      setAssistantVisible(false)
    }, 4500)
  }

  const startListening = () => {
    if (typeof window === 'undefined') {
      return
    }

    const Recognition =
      (window as Window & {
        SpeechRecognition?: new () => RecognitionInstance
        webkitSpeechRecognition?: new () => RecognitionInstance
      }).SpeechRecognition ??
      (window as Window & {
        SpeechRecognition?: new () => RecognitionInstance
        webkitSpeechRecognition?: new () => RecognitionInstance
      }).webkitSpeechRecognition

    if (!Recognition) {
      syncBubble('Speech-to-text is not supported in this browser.')
      return
    }

    if (listeningLockRef.current) {
      return
    }

    const recognition = new Recognition()
    recognitionRef.current = recognition
    recognition.lang = selectedVoiceRef.current?.lang ?? 'en-US'
    recognition.interimResults = false
    recognition.continuous = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim()
      setIsListening(false)
      listeningLockRef.current = false
      recognitionRef.current = null

      if (!transcript) {
        syncBubble('I listened, but did not catch anything clearly.')
        return
      }

      syncBubble(`I heard: ${transcript}`)
    }

    recognition.onerror = (event: any) => {
      setIsListening(false)
      listeningLockRef.current = false
      recognitionRef.current = null

      if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') {
        syncBubble('Microphone access was blocked.')
        return
      }

      syncBubble('I could not hear that clearly.')
    }

    recognition.onend = () => {
      setIsListening(false)
      listeningLockRef.current = false
      recognitionRef.current = null
    }

    try {
      listeningLockRef.current = true
      setIsListening(true)
      syncBubble('Listening...')
      recognition.start()
    } catch {
      listeningLockRef.current = false
      setIsListening(false)
      syncBubble('Listening could not start.')
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)

      if (!selectedVoiceRef.current && availableVoices.length > 0) {
        const randomVoice = availableVoices[Math.floor(Math.random() * availableVoices.length)]

        selectedVoiceRef.current = randomVoice
        setVoiceURI(randomVoice.voiceURI)
        setAvatarSeed(randomVoice.voiceURI || randomVoice.name || 'inphormatik')
      }
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [isLoaded, isSignedIn, user?.firstName, user?.fullName, user?.username])

  useEffect(() => {
    const nextVoice = voices.find((voice) => voice.voiceURI === voiceURI)
    if (nextVoice) {
      selectedVoiceRef.current = nextVoice
      setAvatarSeed(nextVoice.voiceURI || nextVoice.name || 'inphormatik')
    }
  }, [voiceURI, voices])

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      clearBubbleTimer()
    }
  }, [])

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }

    recognitionRef.current?.abort()
    syncBubble(text)
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = selectedVoiceRef.current?.lang ?? 'en-US'
    utterance.rate = 0.96
    utterance.pitch = 1.05
    utterance.volume = 0.98
    utterance.voice = selectedVoiceRef.current ?? null
    utterance.onend = () => {
      window.setTimeout(() => {
        startListening()
      }, 250)
    }

    window.speechSynthesis.speak(utterance)
  }

  const announce = (text: string) => {
    speakText(text)
  }

  const getSmartQuote = () => {
    const currentPeriod = getPeriodForHour(new Date().getHours())
    const pool = wisdomQuotes.filter((quote) => quote.period === currentPeriod)
    const fallbackPool = pool.length > 0 ? pool : wisdomQuotes

    const nextIndex = (lastQuoteIndexRef.current + 1) % fallbackPool.length
    const quote = fallbackPool[nextIndex]
    lastQuoteIndexRef.current = nextIndex

    return `${quote.text} - ${quote.source}`
  }

  const speakWisdom = () => {
    const line = getSmartQuote()
    announce(line)
  }

  const promptUserIntent = () => {
    const nextIndex = (lastPromptIndexRef.current + 1) % intentPrompts.length
    lastPromptIndexRef.current = nextIndex
    announce(intentPrompts[nextIndex])
  }

  const formatLocationDate = (date: Date, timeZone?: string) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone,
    }).format(date)

  const formatLocationTime = (date: Date, timeZone?: string) =>
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone,
    }).format(date)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (welcomePlayedRef.current) {
      return
    }

    welcomePlayedRef.current = true

    if (typeof window === 'undefined') {
      return
    }

    const greetingKey = window.localStorage.getItem(WELCOME_STORAGE_KEY)
    if (greetingKey) {
      return
    }

    const localDate = new Date()
    const positiveMessages = [
      'It is a strong day to begin with calm focus.',
      'You have a clear moment ahead of you.',
      'The day is open, and your momentum is already here.',
      'A steady start can carry the whole day.',
    ]
    const positiveMessage = positiveMessages[Math.floor(Math.random() * positiveMessages.length)]

    const setWelcomeOnce = () => {
      window.localStorage.setItem(WELCOME_STORAGE_KEY, '1')
    }

    const greetingName = isSignedIn
      ? user?.firstName || user?.fullName || user?.username || ''
      : ''
    const greetingPrefix = greetingName ? `Good day, ${greetingName}.` : 'Good day.'

    const buildWelcomeMessage = (
      weather: {
        current?: {
          temperature_2m?: number
          weather_code?: number
        }
        timezone?: string
      },
      locationLabel: string
    ) => {
      const condition = describeWeather(weather.current?.weather_code)
      const locationDate = formatLocationDate(localDate, weather.timezone)
      const locationTime = formatLocationTime(localDate, weather.timezone)
      const temperature = Math.round(weather.current?.temperature_2m ?? Number.NaN)
      const tempText = Number.isFinite(temperature) ? `${temperature}°C` : 'a comfortable temperature'

      return `${greetingPrefix} From ${locationLabel}, it is ${tempText} and ${condition}. Today is ${locationDate}, and the time is ${locationTime}. ${positiveMessage}`
    }

    const speakWelcome = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation unsupported'))
            return
          }

          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 5 * 60 * 1000,
          })
        })

        const weather = await fetchWeatherSummary(position.coords.latitude, position.coords.longitude)
        announce(buildWelcomeMessage(weather, 'your area'))
        setWelcomeOnce()
      } catch {
        const weather = await fetchWeatherSummary(MANILA_FALLBACK.latitude, MANILA_FALLBACK.longitude)
        announce(buildWelcomeMessage(weather, MANILA_FALLBACK.label))
        setWelcomeOnce()
      }
    }

    void speakWelcome()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const speakTime = () => {
      announce(`Current time is ${formatTime(new Date())}.`)
    }

    const promptIntent = () => {
      promptUserIntent()
    }

    const firstDelay = FIFTEEN_MINUTES - (Date.now() % FIFTEEN_MINUTES)
    const firstPromptDelay = FIVE_MINUTES - (Date.now() % FIVE_MINUTES)
    let intervalId: ReturnType<typeof setInterval> | undefined
    let promptIntervalId: ReturnType<typeof setInterval> | undefined
    const timeoutId = window.setTimeout(() => {
      speakTime()
      intervalId = window.setInterval(speakTime, FIFTEEN_MINUTES)
    }, firstDelay)

    const promptTimeoutId = window.setTimeout(() => {
      promptIntent()
      promptIntervalId = window.setInterval(promptIntent, FIVE_MINUTES)
    }, firstPromptDelay)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearTimeout(promptTimeoutId)
      clearBubbleTimer()
      if (intervalId) {
        window.clearInterval(intervalId)
      }
      if (promptIntervalId) {
        window.clearInterval(promptIntervalId)
      }
    }
  }, [])

  return (
    <div className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="floating-avatar">
        <div className="avatar-shadow" />
        <div className="avatar-sparks" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className={`avatar-spark avatar-spark-${index + 1}`} />
          ))}
        </div>
        <div className="avatar-shell">
          <div className="avatar-ring" />
          <div className="avatar-face">
            <img
              key={avatarSeed}
              className="avatar-image"
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`}
              alt="Avatar character"
            />
            <span className="avatar-reflection" />
          </div>
        </div>
        <p className={`avatar-bubble${assistantVisible ? ' is-visible' : ''}`} aria-live="polite">
          {assistantMessage}
        </p>
      </div>

      <header className="topbar" aria-hidden="true" />

      <main className="blank-main" aria-label="Main content area" />

      <footer className="footer-stage" aria-label="Main menu">
        <div className="dock-shell">
          <nav className="dock-nav" aria-label="Primary">
            <Link className="dock-item dock-brand" to="/">
              <span className="brand-mark">I</span>
              <span className="brand-copy">
                <strong>InPHormatik</strong>
                <span>Digital systems studio</span>
              </span>
            </Link>
            <div className="dock-voice">
              <label className="sr-only" htmlFor="voice-selector">
                Avatar voice
              </label>
              <select
                id="voice-selector"
                className="dock-voice-select"
                value={voiceURI}
                onChange={(event) => setVoiceURI(event.target.value)}
                aria-label="Avatar voice"
              >
                {voices.length === 0 ? (
                  <option value="">Loading voices</option>
                ) : (
                  voices.map((voice) => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} {voice.lang ? `(${voice.lang})` : ''}
                    </option>
                  ))
                )}
              </select>
            </div>
            <button className="dock-speak-button" type="button" onClick={speakWisdom}>
              <Quote size={18} />
              <span>Speak now</span>
              <Volume2 size={16} />
            </button>
            <button className="dock-talk-button" type="button" onClick={startListening}>
              <span className={`talk-dot${isListening ? ' is-active' : ''}`} />
              <span>{isListening ? 'Listening' : 'Talk back'}</span>
            </button>
            <div className="dock-auth">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="dock-auth-button" type="button">
                    <ChevronRight size={18} />
                    <span>Sign in</span>
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className="dock-user">
                  <UserButton />
                </div>
              </Show>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  )
}
