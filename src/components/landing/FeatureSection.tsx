type Feature = {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: 'Shared team workspace',
    description:
      'Organize prompts, files, and deliverables in one workspace so teams can ship faster with clear context.',
  },
  {
    title: 'Reliable output quality',
    description:
      'Generate drafts, research summaries, and plans with consistent structure and review-friendly formatting.',
  },
  {
    title: 'Operational controls',
    description:
      'Use policy controls, access boundaries, and approval checkpoints aligned with enterprise workflows.',
  },
  {
    title: 'Role-aware collaboration',
    description:
      'Support product, engineering, operations, and support teams in a single environment without tool sprawl.',
  },
  {
    title: 'Scalable rollout model',
    description:
      'Start with one team and expand gradually while preserving standards, governance, and reporting visibility.',
  },
  {
    title: 'Audit-friendly execution',
    description:
      'Maintain transparent activity history and predictable output patterns for internal governance requirements.',
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.14em] text-[#737373] uppercase">Features</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] md:text-5xl">
          A business-ready AI foundation, built for everyday execution
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`rounded-2xl border p-6 transition-colors duration-500 ${
              index === 1 || index === 4
                ? 'border-[#E7C74C] bg-gradient-to-br from-[#FACC15] via-[#FEF3C7] to-[#FFF8E1] text-[#171717] shadow-[0_12px_32px_rgba(250,204,21,0.12)]'
                : 'border-[#E5E5E5] bg-white'
            }`}
          >
            <h3 className={`text-lg font-semibold ${index === 1 || index === 4 ? 'text-[#171717]' : 'text-[#171717]'}`}>
              {feature.title}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${index === 1 || index === 4 ? 'text-[#404040]' : 'text-[#525252]'}`}>
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
