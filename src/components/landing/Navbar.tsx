import logo from "../../assets/logo.png"

type NavbarProps = {
  onGetStarted: () => void
}

export function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#FAFAFA]/95 backdrop-blur">
      <nav className="flex h-16 w-full items-center justify-between px-5 md:px-8">
        <a href="#" className="group flex items-center gap-2">
          <span className="inline-flex h-12 w-12 items-center text-sm font-semibold text-[#171717]">
            <img src={logo}/>
          </span>
          <span className="text-sm font-semibold tracking-wide text-[#171717]">
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

        <div className="flex items-center gap-2">
          <button className="hidden cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-[#525252] transition hover:bg-[#F5F5F5] hover:text-[#171717] md:inline-flex">
            Contact sales
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="cursor-pointer rounded-full bg-[#171717] px-4 py-2 text-sm font-medium text-[#FAFAFA] transition-all duration-300 hover:bg-[#FACC15] hover:text-[#171717]"
          >
            Get started
          </button>
        </div>
      </nav>
    </header>
  )
}
