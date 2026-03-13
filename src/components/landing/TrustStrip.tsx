const logos = ['Atlas Group', 'Northstar', 'Vantage', 'Helios', 'Bridgewell', 'Mosaic']

export function TrustStrip() {
  return (
    <section className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-7 text-xs font-medium tracking-[0.16em] text-[#737373] uppercase md:px-8">
        {logos.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  )
}
