import arrowOutward from '../assets/icons/arrow-outward.svg'

function HeroIntro() {
  return (
    <div className="flex min-w-0 items-center xl:w-[45vw] xl:max-w-[864px]">
      <div className="w-full max-w-[696px] xl:w-[36.25vw]">
        <h1 className="font-[Zodiak] text-[clamp(44px,12vw,62px)] leading-[0.94] tracking-[-0.04em] text-[#2f2217] sm:text-[64px] xl:text-[clamp(52px,4.167vw,80px)]">
          <span className="block">You Are a</span>
          <em className="block font-normal">Various Creator</em>
        </h1>

        <p className="mt-8 max-w-[696px] text-base leading-[1.5] tracking-[-0.02em] text-[#2f2217]/80 sm:mt-10 xl:mt-[clamp(32px,2.5vw,48px)] xl:text-[clamp(16px,1.042vw,20px)]">
          Thoughtfully sourced pieces chosen for their character, quality and story. Explore a
          collection built around care and craftsmanship.
        </p>

        <a
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#2f2217] px-4 py-3 text-base leading-[1.5] tracking-[0.01em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] sm:mt-10 xl:mt-[clamp(32px,2.5vw,48px)] xl:text-[clamp(16px,0.938vw,18px)]"
          href="#shop"
        >
          Shop Now
          <img className="size-6" src={arrowOutward} width="24" height="24" alt="" />
        </a>
      </div>
    </div>
  )
}

export default HeroIntro
