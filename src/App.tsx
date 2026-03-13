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
import { signOutUser, subscribeToAuth, type AuthUser } from './firebase'

type Route = '/' | '/sign-in' | '/chat'

function getRouteFromPath(pathname: string): Route {
  if (pathname === '/sign-in') {
    return '/sign-in'
  }

  if (pathname === '/chat') {
    return '/chat'
  }

  return '/'
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromPath(window.location.pathname))
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authResolved, setAuthResolved] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    return subscribeToAuth((nextUser) => {
      setUser(nextUser)
      setAuthResolved(true)
    })
  }, [])

  const navigateTo = (nextRoute: Route) => {
    window.history.pushState({}, '', nextRoute)
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
