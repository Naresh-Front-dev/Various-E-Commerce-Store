import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import arrowOutward from '../assets/icons/arrow-outward.svg'

gsap.registerPlugin(useGSAP)

function HeroIntro() {
  const heroRef = useRef(null)

  useGSAP(
    () => {
      const animatedElements = gsap.utils.toArray(
        heroRef.current?.querySelectorAll('[data-hero-reveal]'),
      )

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(animatedElements, { clearProps: 'all' })
        return undefined
      }

      const titleLines = gsap.utils.toArray(
        heroRef.current?.querySelectorAll('[data-hero-title] > *'),
      )
      const paragraph = heroRef.current?.querySelector('[data-hero-copy]')
      const action = heroRef.current?.querySelector('[data-hero-action]')

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

      timeline
        .addLabel('intro')
        .fromTo(
          titleLines,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.09,
            clearProps: 'transform,opacity,visibility',
          },
          'intro',
        )
        .fromTo(
          paragraph,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            clearProps: 'transform,opacity,visibility',
          },
          'intro+=0.18',
        )
        .fromTo(
          action,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.46,
            clearProps: 'transform,opacity,visibility',
          },
          'intro+=0.32',
        )

      return () => timeline.kill()
    },
    { scope: heroRef },
  )

  return (
    <div ref={heroRef} className="flex min-w-0 items-center lg:w-[45vw] lg:max-w-[864px]">
      <div className="w-full max-w-[696px] lg:w-[36.25vw]">
        <h1 className="font-[Zodiak] text-[clamp(44px,12vw,62px)] leading-[0.94] tracking-[-0.04em] text-[#2f2217] sm:text-[64px] lg:text-[clamp(52px,4.167vw,80px)]" data-hero-title data-hero-reveal>
          <span className="block">You Are a</span>
          <em className="block font-normal">Various Creator</em>
        </h1>

        <p className="mt-8 max-w-[696px] text-base leading-[1.5] tracking-[-0.02em] text-[#2f2217]/80 sm:mt-10 lg:mt-[clamp(32px,2.5vw,48px)] lg:text-[clamp(16px,1.042vw,20px)]" data-hero-copy data-hero-reveal>
          Thoughtfully sourced pieces chosen for their character, quality and story. Explore a
          collection built around care and craftsmanship.
        </p>

        <a
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#2f2217] px-4 py-3 text-base leading-[1.5] tracking-[0.01em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] sm:mt-10 lg:mt-[clamp(32px,2.5vw,48px)] lg:text-[clamp(16px,0.938vw,18px)]"
          href="#shop"
          data-hero-action
          data-hero-reveal
        >
          Shop Now
          <img className="size-6" src={arrowOutward} width="24" height="24" alt="" />
        </a>
      </div>
    </div>
  )
}

export default HeroIntro
