import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
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

export async function signInWithGoogle() {
  assertFirebaseReady()
  const result = await signInWithPopup(auth!, provider)
  return mapUser(result.user)
}

export async function signOutUser() {
  assertFirebaseReady()
  await signOut(auth!)
}
