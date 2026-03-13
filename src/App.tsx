import { useEffect, useState } from 'react'
import { CtaSection } from './components/landing/CtaSection'
import { FaqSection } from './components/landing/FaqSection'
import { FeatureSection } from './components/landing/FeatureSection'
import { HeroSection } from './components/landing/HeroSection'
import { MetricsSection } from './components/landing/MetricsSection'
import { Navbar } from './components/landing/Navbar'
import { SecuritySection } from './components/landing/SecuritySection'
import { SiteFooter } from './components/landing/SiteFooter'
import { TrustStrip } from './components/landing/TrustStrip'
import { WorkflowSection } from './components/landing/WorkflowSection'
import { ChatPage } from './components/pages/ChatPage'
import { SignInPage } from './components/pages/SignInPage'
import { finishRedirectSignIn, signOutUser, subscribeToAuth, type AuthUser } from './firebase'

type Route = '/' | '/sign-in' | '/chat'

function isRoute(value: string): value is Route {
  return value === '/' || value === '/sign-in' || value === '/chat'
}

function getRouteFromPath(pathname: string): Route {
  if (isRoute(pathname)) {
    return pathname
  }

  return '/'
}

function getRouteFromHash(hash: string): Route {
  const normalizedHash = hash.startsWith('#') ? hash.slice(1) : hash

  if (isRoute(normalizedHash)) {
    return normalizedHash
  }

  return '/'
}

function getRouteFromLocation() {
  const hashRoute = getRouteFromHash(window.location.hash)

  if (hashRoute !== '/') {
    return hashRoute
  }

  return getRouteFromPath(window.location.pathname)
}

function getRouteUrl(route: Route) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL

  return `${base || ''}/#${route}`
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromLocation())
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authResolved, setAuthResolved] = useState(false)

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getRouteFromLocation())
    }

    window.addEventListener('hashchange', syncRoute)
    window.addEventListener('popstate', syncRoute)

    if (!window.location.hash) {
      window.history.replaceState({}, '', getRouteUrl(getRouteFromPath(window.location.pathname)))
      syncRoute()
    }

    return () => {
      window.removeEventListener('hashchange', syncRoute)
      window.removeEventListener('popstate', syncRoute)
    }
  }, [])

  useEffect(() => {
    let active = true
    let unsubscribe = () => undefined

    const initAuth = async () => {
      try {
        await finishRedirectSignIn()
      } catch (error) {
        console.error(error)
      }

      if (!active) {
        return
      }

      unsubscribe = subscribeToAuth((nextUser) => {
        setUser(nextUser)
        setAuthResolved(true)
      })
    }

    void initAuth()

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const navigateTo = (nextRoute: Route) => {
    window.history.pushState({}, '', getRouteUrl(nextRoute))
    setRoute(nextRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignInSuccess = (nextUser: AuthUser) => {
    setUser(nextUser)
    navigateTo('/chat')
  }

  const handleLogout = async () => {
    try {
      await signOutUser()
    } catch {
      setUser(null)
      navigateTo('/sign-in')
      return
    }

    setUser(null)
    navigateTo('/sign-in')
  }

  useEffect(() => {
    if (!authResolved) {
      return
    }

    if (user && route === '/sign-in') {
      navigateTo('/chat')
      return
    }

    if (!user && route === '/chat') {
      navigateTo('/sign-in')
    }
  }, [authResolved, route, user])

  if (route === '/sign-in') {
    return <SignInPage onBack={() => navigateTo('/')} onSuccess={handleSignInSuccess} />
  }

  if (route === '/chat') {
    return (
      <ChatPage
        onBackHome={() => navigateTo('/')}
        onLogout={() => {
          void handleLogout()
        }}
        userName={user?.displayName ?? 'Name'}
        userPhotoURL={user?.photoURL ?? null}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717]">
      <Navbar onGetStarted={() => navigateTo('/sign-in')} />
      <main>
        <HeroSection onGetStarted={() => navigateTo('/sign-in')} />
        <TrustStrip />
        <FeatureSection />
        <WorkflowSection />
        <SecuritySection />
        <MetricsSection />
        <FaqSection />
        <CtaSection onGetStarted={() => navigateTo('/sign-in')} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
