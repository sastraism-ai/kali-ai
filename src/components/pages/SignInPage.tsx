import logo from '../../assets/logo.png'
import { isFirebaseConfigured, signInWithGoogle, type AuthUser } from '../../firebase'

type SignInPageProps = {
  onBack: () => void
  onSuccess: (user: AuthUser) => void
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.3 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6 7l6.2 5.2C39.1 36.8 44 31.2 44 24c0-1.3-.1-2.3-.4-3.5Z"
      />
    </svg>
  )
}

export function SignInPage({ onBack, onSuccess }: SignInPageProps) {
  const firebaseReady = isFirebaseConfigured()

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle()
      onSuccess(user)
    } catch (error) {
      console.error(error)
      window.alert(
        firebaseReady
          ? 'Google sign-in failed. Check your Firebase provider setup and authorized domains.'
          : 'Firebase is not configured yet. Add your VITE_FIREBASE_* values first.',
      )
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 py-10 md:px-8">
        <section className="w-full max-w-xl rounded-[2rem] border border-[#E5E5E5] bg-white p-8 md:p-10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="hover:cursor-pointer rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#404040] transition hover:border-[#FACC15] hover:text-[#171717]"
            >
              Back
            </button>
            <div className="flex items-center gap-3 select-none">
              <img src={logo} alt="KALI" className="h-10 w-10 object-contain" />
              <span className="bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-lg font-semibold text-transparent">
                KALI
              </span>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A16207] uppercase">
              Workspace access
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#171717] md:text-5xl">
              Sign in and continue into your <span className='bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-transparent'>KALI workspace</span> 
            </h1>
            <p className="mt-5 text-base leading-7 text-[#525252]">
              Continue with Google to open your chat workspace and reference notes.
            </p>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-[#E5E5E5] bg-white p-5">
            <button
              type="button"
              onClick={() => {
                void handleGoogleSignIn()
              }}
              className="flex hover:cursor-pointer w-full items-center justify-center gap-3 rounded-2xl border border-[#D4D4D4] bg-white px-5 py-4 text-sm font-semibold text-[#171717] transition hover:border-[#FACC15] hover:bg-[#FEF9C3]"
            >
              <GoogleLogo />
              <span>Sign in with Google</span>
            </button>

            <div className="mt-6 rounded-[1.5rem] bg-gradient-to-br from-[#FACC15] via-[#FEF9C3] to-[#FFFFFF] p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#8A7A62] uppercase">
                Product notes
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[#4B5563]">
                <p>Built for drafting, summarizing, and refining internal work in one focused chat flow.</p>
                <p>Reference notes stay visible in the workspace without interrupting normal chats.</p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
