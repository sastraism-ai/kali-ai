import logo from "../../assets/logo.png"

type NavbarProps = {
  onGetStarted: () => void
}

export function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#FAFAFA]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8">
        <a href="#" className="group flex min-w-0 items-center gap-2">
          <span className="inline-flex h-10 w-10 shrink-0 items-center text-sm font-semibold text-[#171717] sm:h-12 sm:w-12">
            <img src={logo} alt="KALI" className="h-full w-full object-contain" />
          </span>
          <span className="truncate text-sm font-semibold tracking-wide text-[#171717]">
            <span className="bg-gradient-to-tr">
              KALI <span className="bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-transparent">AI</span>
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-[#525252] md:flex">
          <a className="transition hover:text-[#171717]" href="#features">
            Features
          </a>
          <a className="transition hover:text-[#171717]" href="#workflow">
            Workflow
          </a>
          <a className="transition hover:text-[#171717]" href="#security">
            Security
          </a>
          <a className="transition hover:text-[#171717]" href="#faq">
            FAQ
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="hidden cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-[#525252] transition hover:bg-[#F5F5F5] hover:text-[#171717] md:inline-flex">
            Contact sales
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="cursor-pointer rounded-full bg-[#171717] px-3 py-2 text-xs font-medium text-[#FAFAFA] transition-all duration-300 hover:bg-[#FACC15] hover:text-[#171717] sm:px-4 sm:text-sm"
          >
            Get started
          </button>
        </div>
      </nav>
    </header>
  )
}
