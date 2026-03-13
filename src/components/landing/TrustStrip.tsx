const logos = ['Atlas Group', 'Northstar', 'Vantage', 'Helios', 'Bridgewell', 'Mosaic']

export function TrustStrip() {
  return (
    <section className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-6 text-[11px] font-medium tracking-[0.16em] text-[#737373] uppercase sm:px-5 sm:gap-x-10 sm:text-xs md:px-8 md:py-7">
        {logos.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  )
}
