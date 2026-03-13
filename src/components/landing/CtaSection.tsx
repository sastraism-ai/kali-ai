type CtaSectionProps = {
  onGetStarted: () => void
}

export function CtaSection({ onGetStarted }: CtaSectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-24">
      <div className="rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-[#FACC15] via-[#FEF9C3] to-[#FFFFFF] p-6 text-center shadow-[0_20px_60px_rgba(250,204,21,0.16)] sm:p-8 md:p-12">
        <p className="text-xs font-medium tracking-[0.14em] text-[#737373] uppercase">Get started</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#171717] md:text-5xl">
          Launch KALI Model for your team with a focused pilot
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#404040]">
          Start with one workflow, measure impact quickly, and scale with confidence.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-[#FAFAFA] transition hover:bg-[#262626]"
          >
            Request pilot access
          </button>
          <button className="rounded-full border border-[#D4D4D4] bg-white/80 px-6 py-3 text-sm font-medium text-[#171717] transition hover:border-[#FACC15] hover:bg-[#FEF3C7]">
            Speak with our team
          </button>
        </div>
      </div>
    </section>
  )
}
