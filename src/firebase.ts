import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'

export type AuthUser = {
  displayName: string
  email: string
  photoURL: string | null
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)
const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null
const auth = app ? getAuth(app) : null
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

function mapUser(user: User): AuthUser {
  return {
    displayName: user.displayName ?? 'Name',
    email: user.email ?? '',
    photoURL: user.photoURL,
  }
}

function assertFirebaseReady() {
  if (!auth) {
    throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* env values first.')
  }
}

function shouldPreferRedirect() {
  if (typeof window === 'undefined') {
    return false
  }

  const isTouchDevice = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const isMobileUserAgent =
    /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent)

  return isTouchDevice || isMobileUserAgent
}

function shouldFallbackToRedirect(error: unknown) {
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return false
  }

  const code = String(error.code)
  return code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment'
}

export function isFirebaseConfigured() {
  return hasFirebaseConfig
}

export function subscribeToAuth(callback: (user: AuthUser | null) => void) {
  if (!auth) {
    callback(null)
    return () => undefined
  }

  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapUser(user) : null)
  })
}

export async function finishRedirectSignIn() {
  assertFirebaseReady()
  const result = await getRedirectResult(auth!)
  return result ? mapUser(result.user) : null
}

export async function signInWithGoogle() {
  assertFirebaseReady()

  if (shouldPreferRedirect()) {
    await signInWithRedirect(auth!, provider)
    return null
  }

  try {
    const result = await signInWithPopup(auth!, provider)
    return mapUser(result.user)
  } catch (error) {
    if (shouldFallbackToRedirect(error)) {
      await signInWithRedirect(auth!, provider)
      return null
    }

    throw error
  }
}

export async function signOutUser() {
  assertFirebaseReady()
  await signOut(auth!)
}
