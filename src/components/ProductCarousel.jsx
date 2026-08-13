import { useRef, useState } from 'react'
import { productPages } from '../data/storefront'
import ProductCard from './ProductCard'

function ProductCarousel({ onAdd }) {
  const [activePage, setActivePage] = useState(0)
  const [progressCycle, setProgressCycle] = useState(0)
  const pointerStart = useRef(null)

  const showPage = (page) => {
    const pageCount = productPages.length
    setActivePage((page + pageCount) % pageCount)
    setProgressCycle((cycle) => cycle + 1)
  }

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null

    if (Math.abs(distance) < 45) return
    showPage(activePage + (distance < 0 ? 1 : -1))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPage(activePage - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showPage(activePage + 1)
    }
  }

  return (
    <section
      id="shop"
      className="relative min-w-0 scroll-mt-24 xl:w-[45vw] xl:max-w-[864px]"
      aria-label="Featured products"
    >
      <div
        className="cursor-grab overflow-hidden rounded-xl outline-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Product carousel"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onPointerDown={(event) => {
          pointerStart.current = event.clientX
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {productPages.map((products, pageIndex) => (
            <div
              className="grid min-w-full grid-cols-1 gap-[var(--card-gap)] sm:grid-cols-2"
              key={`page-${pageIndex + 1}`}
              aria-hidden={activePage !== pageIndex}
              inert={activePage !== pageIndex}
            >
              {products.map((product, productIndex) => (
                <ProductCard
                  className={productIndex === 1 ? 'hidden sm:flex' : ''}
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  priority={pageIndex === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-end gap-[clamp(12px,0.938vw,18px)] sm:mt-14 xl:absolute xl:right-0 xl:top-full xl:mt-[clamp(52px,3.85vw,74px)]">
        {productPages.map((_, index) => (
          <button
            className="relative h-2 w-[clamp(64px,5vw,96px)] cursor-pointer overflow-hidden rounded-full bg-[#2f2218]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217]"
            type="button"
            aria-label={`Show product slide ${index + 1}`}
            aria-current={index === activePage ? 'true' : undefined}
            key={`indicator-${index + 1}`}
            onClick={() => showPage(index)}
          >
            {index === activePage && (
              <span
                key={`${activePage}-${progressCycle}`}
                className="absolute inset-0 origin-left animate-[carousel-progress_5s_linear_forwards] rounded-full bg-[#2f2218] motion-reduce:animate-none motion-reduce:scale-x-100"
                onAnimationEnd={() => showPage(activePage + 1)}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Product slide {activePage + 1} of {productPages.length}
      </p>
    </section>
  )
}

export default ProductCarousel
