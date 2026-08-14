import { useRef, useState } from 'react'
import { collectionGroups } from '../data/storefront'
import AddToCartButton from './AddToCartButton'
import SectionEyebrow from './SectionEyebrow'
import ButtonLink from './ui/ButtonLink'
import IconButton from './ui/IconButton'

function ChevronIcon({ direction }) {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'm14.5 6-6 6 6 6' : 'm9.5 6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CollectionCard({ product, onAdd }) {
  return (
    <article className="w-[min(78vw,340px)] shrink-0 sm:w-[320px] xl:w-[clamp(300px,20.833vw,400px)]">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-white ring-1 ring-[#2f2217]/20 ring-inset">
        <img
          className={`size-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none ${product.imageClassName || ''}`}
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
        />
        <AddToCartButton className="absolute bottom-4 right-4" product={product} onAdd={onAdd} />
      </div>

      <h3 className="mt-4 text-xl font-medium leading-[1.2] tracking-[-0.025em] xl:text-[clamp(20px,1.458vw,28px)]">
        {product.name}
      </h3>
      <p className="mt-2 inline-flex rounded-[4px] bg-[#2f2217] px-2.5 py-2 text-sm font-medium leading-none text-[#f7f3ef] xl:text-[clamp(14px,1.042vw,20px)]">
        {product.price}
      </p>
    </article>
  )
}

function CollectionShowcase({ onAdd }) {
  const [activeTab, setActiveTab] = useState(0)
  const trackRef = useRef(null)
  const activeCollection = collectionGroups[activeTab]

  const selectCollection = (index) => {
    setActiveTab(index)
    trackRef.current?.scrollTo({ left: 0 })
  }

  const move = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('article')
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 24
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollBy({
      left: direction * ((card?.offsetWidth || track.clientWidth) + gap),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section id="collections" className="mt-20 overflow-hidden md:mt-24 xl:mt-[120px]" aria-labelledby="collections-title">
      <div className="px-[var(--content-inset)]">
        <div className="mx-auto max-w-[1792px]">
          <SectionEyebrow>Featured Collections</SectionEyebrow>
          <h2 id="collections-title" className="sr-only">
            Featured collections
          </h2>
          <div className="mt-4 flex max-w-full gap-8 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-10 xl:gap-12 [&::-webkit-scrollbar]:hidden">
            {collectionGroups.map((collection, index) => (
              <button
                className={`shrink-0 font-[Zodiak] text-[48px] leading-[1.1] tracking-[-0.04em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] sm:text-[52px] lg:text-[64px] ${
                  index === activeTab ? 'text-[#2f2217]' : 'text-[#2f2217]/35 hover:text-[#2f2217]/60'
                }`}
                type="button"
                aria-pressed={index === activeTab}
                key={collection.label}
                onClick={() => selectCollection(index)}
              >
                {collection.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory scroll-pl-[var(--content-inset)] scroll-pr-[var(--content-inset)] gap-6 overflow-x-auto pl-[var(--content-inset)] pr-[var(--content-inset)] [scrollbar-width:none] md:mt-14 md:gap-8 xl:mt-16 xl:gap-[clamp(32px,2.5vw,48px)] [&::-webkit-scrollbar]:hidden"
        aria-label={`${activeCollection.label} products`}
      >
        {activeCollection.products.map((product) => (
          <div className="snap-start" key={product.id}>
            <CollectionCard product={product} onAdd={onAdd} />
          </div>
        ))}
      </div>

      <div className="mt-10 px-[var(--content-inset)] xl:mt-16">
        <div className="mx-auto flex max-w-[1792px] items-center gap-8">
          <span className="h-px min-w-0 flex-1 bg-[#2f2217]/25" aria-hidden="true" />
          <div className="flex shrink-0 items-center gap-2">
            <IconButton
              className="rounded-md sm:size-12 xl:size-14"
              label="Previous products"
              variant="dark"
              onClick={() => move(-1)}
            >
              <ChevronIcon direction="left" />
            </IconButton>
            <ButtonLink
              className="min-h-11 gap-2 rounded-md px-4 text-xs sm:min-h-12 sm:px-5 sm:text-sm xl:h-[52px] xl:w-[218px] xl:px-6"
              href="#shop"
              iconClassName="size-4"
              showArrow
              size="none"
            >
              View All Products
            </ButtonLink>
            <IconButton
              className="rounded-md sm:size-12 xl:size-14"
              label="Next products"
              variant="dark"
              onClick={() => move(1)}
            >
              <ChevronIcon direction="right" />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionShowcase
