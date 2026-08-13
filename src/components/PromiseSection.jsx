import arrowOutward from '../assets/icons/arrow-outward.svg'
import blackDish from '../assets/images/black-ceramic-dish.jpg'
import mineralDish from '../assets/images/mineral-dish.jpg'
import SectionEyebrow from './SectionEyebrow'

function PromiseSection() {
  return (
    <section id="about" className="mt-20 px-[var(--page-gutter)] md:mt-24 xl:mt-[120px]" aria-labelledby="promise-title">
      <div className="mx-auto grid max-w-[1792px] items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:gap-8 xl:min-h-[890px] xl:grid-cols-[minmax(0,966px)_minmax(0,762px)] xl:gap-16">
        <div className="max-w-[966px] md:pr-4">
          <SectionEyebrow>Our Promise</SectionEyebrow>
          <h2
            id="promise-title"
            className="mt-5 max-w-[966px] font-[Zodiak] text-[clamp(42px,10vw,64px)] leading-[0.98] tracking-[-0.04em] xl:text-[clamp(50px,3.333vw,64px)]"
          >
            The Exact Piece You See Is the Piece You Receive
          </h2>
          <p className="mt-9 max-w-[882px] text-base leading-[1.55] tracking-[-0.02em] text-[#2f2217]/75 xl:text-xl">
            Every item is photographed clearly and listed with key details like origin, materials and condition, so you can shop with confidence.
          </p>
          <a
            className="mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-[#2f2217] px-4 py-3 text-base text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] xl:min-h-[51px] xl:px-5 xl:text-lg"
            href="#guidance"
          >
            Learn More
            <img className="size-5" src={arrowOutward} width="20" height="20" alt="" />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px] xl:max-w-[762px]" aria-label="Examples of individually photographed pieces">
          <span className="absolute left-[20%] top-[21%] h-[48%] w-[65%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" aria-hidden="true" />
          <span className="absolute left-[28%] top-[27%] h-[36%] w-[51%] rotate-[52deg] rounded-[50%] border border-[#2f2217]/55" aria-hidden="true" />
          <img
            className="absolute right-0 top-0 aspect-square w-1/2 rounded-xl object-cover"
            src={blackDish}
            alt="Black ceramic dish photographed individually"
          />
          <img
            className="absolute bottom-0 left-0 aspect-square w-1/2 rounded-xl object-cover"
            src={mineralDish}
            alt="Speckled ceramic dish with a green mineral"
          />
        </div>
      </div>
    </section>
  )
}

export default PromiseSection
