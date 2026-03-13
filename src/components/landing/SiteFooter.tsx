import logo from '../../assets/logo.png'

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#525252] sm:px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="KALI" className="h-8 w-8 object-contain" />
          <p className="font-medium text-[#171717]">
            {new Date().getFullYear()} KALI
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="#" className="transition hover:text-[#171717]">
            Privacy
          </a>
          <a href="#" className="transition hover:text-[#171717]">
            Terms
          </a>
          <a href="#" className="transition hover:text-[#171717]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

