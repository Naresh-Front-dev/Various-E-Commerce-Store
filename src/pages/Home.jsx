import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AddToCartToast from '../components/AddToCartToast'
import BenefitsBar from '../components/BenefitsBar'
import CartDrawer from '../components/CartDrawer'
import CollectionShowcase from '../components/CollectionShowcase'
import Footer from '../components/Footer'
import GuidanceSection from '../components/GuidanceSection'
import Header from '../components/Header'
import HeroIntro from '../components/HeroIntro'
import PromiseSection from '../components/PromiseSection'
import ProductCarousel from '../components/ProductCarousel'
import SearchResults from '../components/SearchResults'
import { searchableProducts } from '../data/storefront'

function Home() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartToast, setCartToast] = useState(null)
  const [searchRequest, setSearchRequest] = useState(null)
  const toastId = useRef(0)
  const searchResultsRef = useRef(null)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const closeCart = useCallback(() => setCartOpen(false), [])
  const clearSearch = useCallback(() => setSearchRequest(null), [])

  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)
      if (existingItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...items, { ...product, quantity: 1 }]
    })
    toastId.current += 1
    setCartToast({ id: toastId.current, product })
  }

  const updateQuantity = (productId, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  const searchProducts = useCallback((keyword) => {
    const query = keyword.trim()
    if (!query) return

    const terms = query.toLocaleLowerCase().split(/\s+/)
    const products = searchableProducts.filter((product) => {
      const searchableText = `${product.name} ${product.alt} ${product.price}`.toLocaleLowerCase()
      return terms.every((term) => searchableText.includes(term))
    })

    setSearchRequest({ query, products })
  }, [])

  useLayoutEffect(() => {
    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()

      if (!searchRequest || !searchResultsRef.current) return

      const header = document.getElementById('site-header')
      const headerHeight = header?.getBoundingClientRect().height || 0
      const sectionTop = searchResultsRef.current.getBoundingClientRect().top + window.scrollY
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      window.scrollTo({
        top: Math.max(0, sectionTop - headerHeight - 16),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(refreshFrame)
  }, [searchRequest])

  return (
    <div id="home" className="min-h-svh min-w-0 bg-[#f7f3ef] text-[#2f2217]">
      <Header
        cartCount={cartCount}
        cartOpen={cartOpen}
        onCartOpen={() => setCartOpen(true)}
        onSearch={searchProducts}
        onSearchClose={clearSearch}
      />

      <main className="min-w-0 pt-[var(--header-height)]">
        {searchRequest && (
          <SearchResults
            query={searchRequest.query}
            products={searchRequest.products}
            onAdd={addToCart}
            resultsRef={searchResultsRef}
          />
        )}
        <section className="flex min-h-[580px] items-center px-[var(--page-gutter)] py-14 md:py-16 lg:min-h-[clamp(620px,40.677vw,781px)] lg:py-0" aria-label="Introduction">
          <div className="mx-auto grid w-full max-w-[1792px] min-w-0 grid-cols-1 items-center gap-16 md:gap-20 lg:-translate-y-3.5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-[clamp(32px,3.333vw,64px)]">
            <HeroIntro />
            <ProductCarousel onAdd={addToCart} />
          </div>
        </section>

        <BenefitsBar />
        <CollectionShowcase onAdd={addToCart} />
        <PromiseSection />
        <GuidanceSection />
      </main>

      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={closeCart}
        onQuantityChange={updateQuantity}
        onRemove={removeFromCart}
      />
      {cartToast && (
        <AddToCartToast
          key={cartToast.id}
          toast={cartToast}
          onDismiss={(id) => {
            setCartToast((currentToast) => (currentToast?.id === id ? null : currentToast))
          }}
        />
      )}
    </div>
  )
}

export default Home
