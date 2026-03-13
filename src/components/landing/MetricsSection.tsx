type Metric = {
  label: string
  value: string
  detail: string
}

const metrics: Metric[] = [
  { label: 'Operations', value: '3.1x', detail: 'faster planning and weekly reporting cycles' },
  { label: 'Product teams', value: '44%', detail: 'less time spent drafting repetitive documentation' },
  { label: 'Support', value: '2.6x', detail: 'increase in assisted response throughput' },
  { label: 'Leadership', value: '1 source', detail: 'shared workspace for decisions and execution' },
]

export function MetricsSection() {
  return (
    <section className="bg-gradient-to-br from-[#FFF8E1] via-[#FEF3C7] to-[#FACC15]">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#A16207] uppercase">Outcomes</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] md:text-5xl">
            Measurable impact across teams and workflows
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-[#E7C74C] bg-white/72 p-6 shadow-[0_14px_36px_rgba(250,204,21,0.12)] backdrop-blur-sm"
            >
              <p className="text-sm text-[#525252]">{metric.label}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-[#A16207]">{metric.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#404040]">{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
