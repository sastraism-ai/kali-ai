const steps = [
  {
    title: 'Connect your business context',
    description:
      'Set up teams, permissions, and operating guidelines so kali aligns with how your org already works.',
  },
  {
    title: 'Run controlled pilot programs',
    description:
      'Launch with high-value workflows first, measure outcomes, and refine process quality with stakeholders.',
  },
  {
    title: 'Scale with repeatable playbooks',
    description:
      'Standardize successful workflows across departments with templates, checkpoints, and governance defaults.',
  },
]

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-y border-[#E5E5E5] bg-gradient-to-br from-[#FACC15] via-[#FEF3C7] to-[#FFF8E1]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#A16207] uppercase">Workflow</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] md:text-5xl">
            A simple rollout path from pilot to enterprise-wide adoption
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-[#E7C74C] bg-white/70 p-6 shadow-[0_14px_36px_rgba(250,204,21,0.12)] backdrop-blur-sm"
            >
              <p className="text-xs font-medium tracking-wide text-[#A16207]">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#171717]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#404040]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
