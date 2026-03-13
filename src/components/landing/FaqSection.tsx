const faqs = [
  {
    question: 'Can we start with one department first?',
    answer:
      'Yes. Most teams begin with a single high-impact workflow, then expand based on clear outcomes and internal readiness.',
  },
  {
    question: 'Is KALI Model suitable for cross-functional teams?',
    answer:
      'Yes. Product, engineering, operations, and support teams can work in one shared environment with role-based controls.',
  },
  {
    question: 'Do we need complex setup to begin?',
    answer:
      'No. The rollout can begin with a focused pilot, a small team, and predefined usage patterns aligned to your business process.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#737373] uppercase">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] md:text-5xl">
            Common questions from teams getting started
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-2xl border border-[#E5E5E5] bg-white p-6">
              <h3 className="text-base font-semibold text-[#171717]">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#525252]">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
