import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import knotImage from '../assets/images/ceramic-knot-sculpture.jpg'
import bowlImage from '../assets/images/lidded-ceramic-bowl.jpg'
import vaseImage from '../assets/images/small-clay-vase.jpg'
import { guidanceSteps } from '../data/storefront'
import ButtonLink from './ui/ButtonLink'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stepImages = {
  knot: knotImage,
  vase: vaseImage,
  bowl: bowlImage,
}

function GuidanceMark() {
  return (
    <span className="relative grid size-[72px] place-items-center rounded-full border-2 border-[#bd9662] text-[#2f2217] md:size-[90px]" data-guidance-mark aria-hidden="true">
      <span className="absolute size-[58%] rotate-12 rounded-[50%] border-2 border-current" data-guidance-ring />
      <span className="absolute h-[38%] w-[62%] -rotate-[28deg] rounded-[50%] border-2 border-current" data-guidance-ring />
      <span className="absolute h-[62%] w-[38%] rotate-[38deg] rounded-[50%] border-2 border-current" data-guidance-ring />
    </span>
  )
}

function GuidanceSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const panel = sectionRef.current?.querySelector('[data-guidance-panel]')
      const mark = sectionRef.current?.querySelector('[data-guidance-mark]')
      const rings = gsap.utils.toArray(sectionRef.current?.querySelectorAll('[data-guidance-ring]'))
      const copy = gsap.utils.toArray(sectionRef.current?.querySelectorAll('[data-guidance-copy] > *'))
      const action = sectionRef.current?.querySelector('[data-guidance-action]')
      const steps = gsap.utils.toArray(sectionRef.current?.querySelectorAll('[data-guidance-step]'))
      const images = gsap.utils.toArray(sectionRef.current?.querySelectorAll('[data-guidance-image]'))
      const animatedElements = [panel, mark, ...rings, ...copy, action, ...steps, ...images].filter(Boolean)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(animatedElements, { clearProps: 'all' })
        return undefined
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'clamp(top 78%)',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
          once: true,
        },
      })

      timeline
        .addLabel('reveal')
        .fromTo(
          panel,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          'reveal',
        )
        .fromTo(
          mark,
          { autoAlpha: 0, scale: 0.86, rotation: -7 },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.55 },
          'reveal+=0.08',
        )
        .fromTo(
          rings,
          { autoAlpha: 0, scale: 0.72 },
          { autoAlpha: 1, scale: 1, duration: 0.42, stagger: 0.06 },
          'reveal+=0.16',
        )
        .fromTo(
          copy,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08 },
          'reveal+=0.16',
        )
        .fromTo(
          action,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.42 },
          'reveal+=0.34',
        )
        .fromTo(
          steps,
          { autoAlpha: 0, y: 20, scale: 0.99 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.1 },
          'reveal+=0.18',
        )
        .fromTo(
          images,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.1 },
          'reveal+=0.28',
        )
        .set(animatedElements, { clearProps: 'transform,opacity,visibility' })

      return undefined
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="journal" className="mt-20 px-[var(--page-gutter)] md:mt-24 xl:mt-[120px]" aria-labelledby="guidance-title">
      <div className="mx-auto grid max-w-[1792px] gap-12 rounded-[28px] bg-white p-7 sm:p-10 lg:grid-cols-[0.9fr_1.35fr] lg:items-center lg:gap-16 xl:min-h-[603px] xl:grid-cols-[minmax(0,569px)_minmax(0,871px)] xl:justify-between xl:gap-[clamp(32px,4.167vw,80px)] xl:p-12" data-guidance-panel>
        <div className="flex h-full flex-col items-start lg:justify-between lg:py-1 xl:pl-6">
          <GuidanceMark />
          <div className="mt-10 lg:mt-8" data-guidance-copy>
            <h2 id="guidance-title" className="max-w-[520px] font-[Zodiak] text-[clamp(42px,9vw,58px)] leading-[0.98] tracking-[-0.04em] xl:text-[64px]">
              Not sure which one fits?
            </h2>
            <p className="mt-6 max-w-[520px] text-base leading-[1.55] text-[#2f2217]/75 xl:text-lg">
              Send us a message with what you’re looking for and we’ll help you find the perfect match.
            </p>
          </div>
          <ButtonLink
            className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-[#2f2217] px-4 py-3 text-base text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] xl:min-h-[51px] xl:px-5 xl:text-lg"
            href="#contact"
            showArrow
            data-guidance-action
          >
            Get in Touch
          </ButtonLink>
        </div>

        <ol className="grid gap-3">
          {guidanceSteps.map((step) => (
            <li className="grid min-h-32 grid-cols-[88px_1fr] items-center gap-4 border border-[#2f2217]/15 p-3 sm:grid-cols-[120px_1fr] sm:gap-7 xl:min-h-36" key={step.number} data-guidance-step>
              <div className="grid aspect-square place-items-center overflow-hidden bg-[#fbfaf8]" data-guidance-image>
                <img
                  className={`size-full object-contain ${step.image === 'knot' ? 'p-4 sm:p-6' : 'p-3 sm:p-5'}`}
                  src={stepImages[step.image]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0 py-3">
                <h3 className="text-base font-medium leading-tight tracking-[-0.02em] sm:text-xl xl:text-2xl">
                  {step.number} {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#2f2217]/65 sm:text-sm xl:text-base">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default GuidanceSection
