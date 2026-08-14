import { benefits } from '../data/storefront'

function BenefitIcon({ index }) {
  const commonProps = {
    className: 'size-6',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  }

  if (index === 0) {
    return (
      <svg {...commonProps}>
        <path d="M12 3.25 19 6v5.3c0 4.35-2.95 7.85-7 9.45-4.05-1.6-7-5.1-7-9.45V6l7-2.75Z" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
        <path d="m8.75 12 2.1 2.1 4.5-4.7" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg {...commonProps}>
        <path d="M7.3 12.35V7.2a1.35 1.35 0 0 1 2.7 0v3.05-4.1a1.35 1.35 0 1 1 2.7 0v4.1-3.1a1.35 1.35 0 1 1 2.7 0v3.1-1.8a1.35 1.35 0 1 1 2.7 0v4.25c0 4.55-2.75 7.05-6.65 7.05-2.8 0-4.4-1.25-5.65-3.15l-1.65-2.5a1.47 1.47 0 0 1 2.25-1.86l.9.11Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m19.3 3.1.35 1.15 1.15.35-1.15.35-.35 1.15-.35-1.15-1.15-.35 1.15-.35.35-1.15Z" fill="currentColor" />
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg {...commonProps}>
        <path d="M6.2 8.1A7 7 0 1 1 5 13.3" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
        <path d="M3.8 5.5v4.2H8" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9.2 13.1 1.75 1.75 3.85-4" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (index === 3) {
    return (
      <svg {...commonProps}>
        <path d="M3 6.25h11.25v10H3v-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14.25 9.25h3.2l3.05 3.1v3.9h-6.25v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7" cy="17.25" r="1.75" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="17.25" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.55" />
      <path d="M8.25 10V7.75a3.75 3.75 0 0 1 7.5 0V10" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
      <path d="m9.4 15 1.65 1.65 3.55-3.5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BenefitsBar() {
  return (
    <section id="benefits" className="bg-[#2f2218] px-[var(--page-gutter)] py-6 text-white xl:py-[clamp(24px,1.667vw,32px)] lg:mt-3" aria-label="Shopping benefits">
      <div className="mx-auto grid w-full max-w-[1792px] grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 xl:grid-cols-5 xl:justify-between xl:gap-4">
        {benefits.map((benefit, index) => (
          <div className="flex min-w-0 items-center gap-[clamp(10px,0.833vw,16px)]" key={benefit}>
            <span
              className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-white text-[#2f2217] xl:size-[clamp(36px,2.5vw,48px)] xl:rounded-[clamp(9px,0.625vw,12px)]"
            >
              <BenefitIcon index={index} />
            </span>
            <p className="text-sm leading-tight tracking-[-0.02em] sm:text-base xl:whitespace-nowrap xl:text-[clamp(16px,1.25vw,24px)]">
              {benefit}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BenefitsBar
