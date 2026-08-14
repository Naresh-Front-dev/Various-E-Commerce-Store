import { useCallback, useEffect, useRef, useState } from 'react'
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
import SmoothScroll from '../components/SmoothScroll'
import { searchableProducts } from '../data/storefront'
import { scrollToPageTarget } from '../utils/smoothScroll'

function Home() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartToast, setCartToast] = useState(null)
  const [searchRequest, setSearchRequest] = useState(null)
  const toastId = useRef(0)
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

  useEffect(() => {
    if (!searchRequest) return undefined

    const scrollFrame = window.requestAnimationFrame(() => {
      scrollToPageTarget('#search-results')
    })

    return () => window.cancelAnimationFrame(scrollFrame)
  }, [searchRequest])

  return (
    <div className="min-h-svh min-w-0 bg-[#f7f3ef] text-[#2f2217]">
      <SmoothScroll
        paused={cartOpen}
        refreshKey={searchRequest?.query ?? 'storefront'}
      >
        <Header
          cartCount={cartCount}
          cartOpen={cartOpen}
          onCartOpen={() => setCartOpen(true)}
          onSearch={searchProducts}
          onSearchClose={clearSearch}
        />

        <main className="min-w-0">
          {searchRequest && (
            <SearchResults
              query={searchRequest.query}
              products={searchRequest.products}
              onAdd={addToCart}
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
      </SmoothScroll>
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
