import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import blackDish from '../assets/images/black-ceramic-dish.jpg'
import mineralDish from '../assets/images/mineral-dish.jpg'
import SectionEyebrow from './SectionEyebrow'
import ButtonLink from './ui/ButtonLink'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function PromiseSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const copy = gsap.utils.toArray(
        sectionRef.current?.querySelectorAll('[data-promise-copy] > *'),
      )
      const rings = gsap.utils.toArray(
        sectionRef.current?.querySelectorAll('[data-promise-ring]'),
      )
      const topImage = sectionRef.current?.querySelector('[data-promise-image="top"]')
      const bottomImage = sectionRef.current?.querySelector('[data-promise-image="bottom"]')
      const animatedElements = [...copy, ...rings, topImage, bottomImage].filter(Boolean)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(animatedElements, { clearProps: 'all' })
        return undefined
      }

      gsap.set(copy, {
        autoAlpha: 0,
        y: 18,
        willChange: 'transform,opacity',
      })
      gsap.set(rings, {
        autoAlpha: 0,
        scale: 0.88,
        transformOrigin: '50% 50%',
        willChange: 'transform,opacity',
      })
      gsap.set(topImage, {
        autoAlpha: 0,
        y: -14,
        scale: 0.985,
        transformOrigin: '50% 50%',
        willChange: 'transform,opacity',
      })
      gsap.set(bottomImage, {
        autoAlpha: 0,
        y: 14,
        scale: 0.985,
        transformOrigin: '50% 50%',
        willChange: 'transform,opacity',
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => (window.innerWidth >= 768 ? 'clamp(top 76%)' : 'clamp(top 82%)'),
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
          once: true,
        },
      })

      timeline
        .addLabel('reveal')
        .to(
          copy,
          { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.085 },
          'reveal',
        )
        .to(
          rings,
          { autoAlpha: 1, scale: 1, duration: 0.62, stagger: 0.055 },
          'reveal+=0.08',
        )
        .to(
          topImage,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 },
          'reveal+=0.16',
        )
        .to(
          bottomImage,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 },
          'reveal+=0.27',
        )
        .set(animatedElements, { willChange: 'auto' })

      return undefined
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="about" className="mt-20 px-[var(--page-gutter)] md:mt-24 xl:mt-[120px]" aria-labelledby="promise-title">
      <div className="mx-auto grid max-w-[1792px] items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:gap-8 xl:min-h-[890px] xl:grid-cols-[minmax(0,966px)_minmax(0,762px)] xl:gap-16">
        <div className="max-w-[966px] md:pr-4" data-promise-copy>
          <SectionEyebrow>Our Promise</SectionEyebrow>
          <h2
            id="promise-title"
            className="mt-5 max-w-[966px] font-[Zodiak] text-[clamp(42px,10vw,54px)] leading-[0.98] tracking-[-0.04em] xl:text-[clamp(50px,3.333vw,64px)]"
          >
            The Exact Piece You See Is the Piece You Receive
          </h2>
          <p className="mt-9 max-w-[882px] text-base leading-[1.55] tracking-[-0.02em] text-[#2f2217]/75 xl:text-xl">
            Every item is photographed clearly and listed with key details like origin, materials and condition, so you can shop with confidence.
          </p>
          <ButtonLink
            className="mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-[#2f2217] px-4 py-3 text-base text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] xl:min-h-[51px] xl:px-5 xl:text-lg"
            href="#journal"
            showArrow
          >
            Learn More
          </ButtonLink>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px] xl:max-w-[762px]" aria-label="Examples of individually photographed pieces">
          <span className="absolute left-[20%] top-[21%] h-[48%] w-[65%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" data-promise-ring aria-hidden="true" />
          <span className="absolute left-[28%] top-[27%] h-[36%] w-[51%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" data-promise-ring aria-hidden="true" />
          <span className="absolute left-[35%] top-[32%] h-[25%] w-[37%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" data-promise-ring aria-hidden="true" />
          <span className="absolute left-[42%] top-[36%] h-[17%] w-[23%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" data-promise-ring aria-hidden="true" />
          <img 
            className="absolute right-0 top-0 aspect-square w-1/2 rounded-xl object-cover"
            src={blackDish}
            alt="Black ceramic dish photographed individually"
            loading="eager"
            decoding="async"
            fetchPriority="low"
            data-promise-image="top"
          />
          <img
            className="absolute bottom-0 left-0 aspect-square w-1/2 rounded-xl object-cover"
            src={mineralDish}
            alt="Speckled ceramic dish with a green mineral"
            loading="eager"
            decoding="async"
            fetchPriority="low"
            data-promise-image="bottom"
          />
        </div>
      </div>
    </section>
  )
}

export default PromiseSection
