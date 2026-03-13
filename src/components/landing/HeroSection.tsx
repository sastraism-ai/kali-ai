import { useEffect, useMemo, useState } from 'react'
import TextType from '../ui/TextType'
import Iridescence from '../ui/Iridescence'

const promptDemos = [
  'Summarize this weekly operations update and list the top 3 priorities for leadership.',
  'Create a launch-readiness checklist for a new internal product rollout.',
  "Draft a concise update for executives on this week's delivery progress and blockers.",
]

const outputDemos = [
  'Top priorities:\n1. Resolve onboarding delays in 2 regions\n2. Improve support handoff quality with a standard playbook\n3. Finalize Q2 execution milestones with cross-team owners',
  'Launch checklist generated:\n- Stakeholder alignment and sign-off\n- Risk review and mitigation plan\n- Training assets for users and admins\n- Success metrics and 30-day review cadence',
  'Executive update draft:\nDelivery remains on track for core milestones.\nKey blocker: dependency delays in integration testing.\nAction: dedicated fix stream and daily status reporting until cleared.',
]

type HeroSectionProps = {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0)

  const timings = useMemo(() => {
    const promptTypingSpeed = 20
    const outputTypingSpeed = 10
    const promptToOutputDelay = 650
    const endHoldDelay = 1800

    const prompt = promptDemos[activeDemoIndex]
    const output = outputDemos[activeDemoIndex]

    const promptDuration = prompt.length * promptTypingSpeed
    const outputDelay = promptDuration + promptToOutputDelay
    const outputDuration = output.length * outputTypingSpeed
    const cycleDuration = outputDelay + outputDuration + endHoldDelay

    return {
      promptTypingSpeed,
      outputTypingSpeed,
      outputDelay,
      cycleDuration,
    }
  }, [activeDemoIndex])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveDemoIndex((prev) => (prev + 1) % promptDemos.length)
    }, timings.cycleDuration)

    return () => window.clearTimeout(timer)
  }, [timings.cycleDuration])

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0">
        <Iridescence
          color={[0.76, 0.68, 0.58]}
          mouseReact
          amplitude={0.06}
          speed={0.55}
          className="h-full w-full opacity-55"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(254,243,199,0.88),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.8),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.5),rgba(250,250,250,0.7)_42%,rgba(255,255,255,0.64))]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 pt-12 sm:px-5 md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-8 md:pb-24 md:pt-24">
        <div className="relative">
          <p className="inline-flex rounded-full border border-[#E5E5E5] bg-white/75 px-3 py-1 text-[11px] font-medium text-[#404040] sm:text-xs">
            Powered by SARADHI AI (TARA)
          </p>

          <h1 className="mt-5 min-h-[112px] max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-[#171717] sm:min-h-[132px] sm:text-4xl md:min-h-[152px] md:text-6xl">
            Bring{' '}
            <span className="relative inline-block min-w-0 align-baseline sm:min-w-[22ch]">
              <span className="invisible">enterprise intelligence</span>
              <TextType
                as="span"
                text="enterprise intelligence"
                loop={false}
                showCursor={false}
                className="absolute inset-0 bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-transparent"
              />
            </span>{' '}
            into one simple workspace
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#525252] sm:text-lg sm:leading-relaxed">
            KALI Model helps teams draft, analyze, and execute critical work faster with a
            clean, reliable assistant layer built for business operations.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={onGetStarted}
              className="cursor-pointer rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-[#FAFAFA] transition-colors duration-300 ease-in-out hover:bg-[#FACC15] hover:text-[#171717]"
            >
              Start pilot
            </button>
            <button className="cursor-pointer rounded-full border border-[#D4D4D4] bg-white/80 px-6 py-3 text-sm font-medium text-[#404040] transition-all duration-300 hover:border-[#FACC15] hover:bg-[#FEF3C7] hover:text-[#171717]">
              Book a demo
            </button>
          </div>
        </div>

        <aside className="relative rounded-2xl border border-[#E5E5E5] bg-white/90 p-4 shadow-[0_12px_40px_rgba(23,23,23,0.06)] sm:p-6 md:p-8">
          <div className="relative">
            <p className="text-sm font-medium text-[#171717]">Live KALI assistant preview</p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                <p className="text-[11px] font-semibold tracking-wide text-[#737373] uppercase">Prompt</p>
                <TextType
                  key={`prompt-${activeDemoIndex}`}
                  as="p"
                  text={promptDemos[activeDemoIndex]}
                  className="mt-2 min-h-16 text-sm leading-6 text-[#404040]"
                  typingSpeed={timings.promptTypingSpeed}
                  loop={false}
                />
              </div>

              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] font-semibold tracking-wide text-[#737373] uppercase">
                    KALI Output
                  </p>
                  <span className="text-[11px] text-[#A3A3A3]">Auto-generated demo</span>
                </div>
                <TextType
                  key={`output-${activeDemoIndex}`}
                  as="p"
                  text={outputDemos[activeDemoIndex]}
                  className="mt-2 min-h-28 text-sm leading-6 text-[#404040]"
                  typingSpeed={timings.outputTypingSpeed}
                  initialDelay={timings.outputDelay}
                  loop={false}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
