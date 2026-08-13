import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ProductCard from './ProductCard'

gsap.registerPlugin(useGSAP)

function SearchResults({ query, products, onAdd }) {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const cards = gsap.utils.toArray('[data-search-product]')
      const images = gsap.utils.toArray('[data-search-product] [data-product-image]')
      const noResults = section?.querySelector('[data-no-results]')
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.killTweensOf([section, ...cards, ...images, noResults].filter(Boolean))

      if (reduceMotion) {
        gsap.set([section, ...cards, ...images, noResults].filter(Boolean), {
          clearProps: 'all',
        })
        return undefined
      }

      const timeline = gsap.timeline()

      timeline.fromTo(
        section,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      )

      if (cards.length) {
        timeline.fromTo(
          cards,
          { autoAlpha: 0, y: 16, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: 'power2.out',
          },
          0.08,
        )
        timeline.fromTo(
          images,
          { autoAlpha: 0, scale: 0.97 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: 'power2.out',
          },
          0.12,
        )
      } else if (noResults) {
        timeline.fromTo(
          noResults,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.08,
        )
      }

      return () => timeline.kill()
    },
    { dependencies: [query, products], scope: sectionRef, revertOnUpdate: true },
  )

  return (
    <section
      ref={sectionRef}
      id="search-results"
      className="scroll-mt-6 px-[var(--page-gutter)] py-14 md:py-16"
      aria-labelledby="search-results-title"
      aria-live="polite"
    >
      <div className="mx-auto max-w-[1792px]">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#2f2217]/55">
          Search results
        </p>
        <h1
          id="search-results-title"
          className="mt-3 font-[Zodiak] text-[clamp(38px,4vw,64px)] leading-none tracking-[-0.04em]"
        >
          Results for “{query}”
        </h1>

        {products.length ? (
          <div className="mt-10 grid grid-cols-1 gap-x-[var(--card-gap)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} data-search-product>
                <ProductCard product={product} onAdd={onAdd} />
              </div>
            ))}
          </div>
        ) : (
          <p
            className="mt-10 border-t border-[#2f2217]/20 py-10 text-xl text-[#2f2217]/65"
            data-no-results
          >
            No products found
          </p>
        )}
      </div>
    </section>
  )
}

export default SearchResults
