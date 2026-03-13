const controls = [
  'Private workspace architecture',
  'Role-based team and workspace access',
  'Review checkpoints for sensitive operations',
  'Consistent output formatting for governance',
  'Usage visibility for admins and stakeholders',
]

export function SecuritySection() {
  return (
    <section id="security" className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <div className="grid gap-8 rounded-2xl border border-[#E5E5E5] bg-white p-8 md:grid-cols-[1.15fr_1fr] md:p-10">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-[#737373] uppercase">Security</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] md:text-4xl">
            Enterprise controls without added complexity
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#525252]">
            KALI is designed for organizations that need practical governance,
            trustworthy workflows, and clear operational accountability.
          </p>
        </div>

        <ul className="space-y-3">
          {controls.map((item) => (
            <li key={item} className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 text-sm text-[#404040]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
