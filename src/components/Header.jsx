import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { navigationLinks } from '../data/storefront'

gsap.registerPlugin(useGSAP)

const actionClass =
  'relative grid size-12 shrink-0 place-items-center rounded-[14px] bg-[#d9d9d9] text-[#2f2217] transition-colors hover:bg-[#c9c9c9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217]'

function HeaderAction({ label, children, onClick, className = '', ...props }) {
  return (
    <button
      className={`${actionClass} ${className}`}
      type="button"
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

function SearchIcon() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.75" cy="10.75" r="6.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6.5 6.5 11 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m17.5 6.5-11 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 4.75h2.1l1.75 8.4a2 2 0 0 0 1.96 1.6h7.86a2 2 0 0 0 1.94-1.52L20.5 7H6.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19" r="1.25" fill="currentColor" />
      <circle cx="17.5" cy="19" r="1.25" fill="currentColor" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <>
          <path d="m6 6 12 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M4.5 7h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4.5 12h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4.5 17h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

function Navigation({ mobile = false, onNavigate }) {
  return (
    <nav aria-label={mobile ? 'Mobile navigation' : 'Primary navigation'}>
      <ul
        className={
          mobile
            ? 'flex flex-col'
            : 'flex items-center justify-center gap-[clamp(24px,2.5vw,48px)] whitespace-nowrap text-[clamp(13px,1.042vw,20px)]'
        }
      >
        {navigationLinks.map((link) => (
          <li key={link.label}>
            <a
              className={
                mobile
                  ? 'block border-b border-black/10 px-5 py-4 text-lg transition-colors hover:bg-[#f7f3ef] focus-visible:bg-[#f7f3ef] focus-visible:outline-none'
                  : 'group relative inline-block rounded-sm py-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217]'
              }
              href={link.href}
              onClick={onNavigate}
            >
              {link.label}
              {!mobile && (
                <span
                  className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-[#2f2217] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                  aria-hidden="true"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MobileMenuSearch({ onSearch, onComplete }) {
  const inputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = inputRef.current?.value.trim()
    if (!query) {
      inputRef.current?.focus()
      return
    }

    onSearch(query)
    onComplete()
  }

  return (
    <form
      className="border-b border-black/10 px-5 py-5 sm:px-8 sm:py-6"
      role="search"
      onSubmit={handleSubmit}
    >
      <label
        className="mb-2.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#2f2217]/60"
        htmlFor="mobile-site-search"
      >
        Search our collection
      </label>
      <div className="flex min-h-14 items-center overflow-hidden rounded-[10px] border border-[#2f2217]/25 bg-[#f7f3ef] transition-colors focus-within:border-[#2f2217]">
        <span className="ml-4 grid shrink-0 place-items-center text-[#2f2217]" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          id="mobile-site-search"
          className="min-w-0 flex-1 bg-transparent px-3 text-base text-[#2f2217] outline-none placeholder:text-[#2f2217]/45"
          type="search"
          placeholder="Search products"
        />
        <button
          className="mr-1.5 grid min-h-11 shrink-0 place-items-center rounded-[8px] bg-[#2f2217] px-4 text-sm font-medium text-white transition-colors hover:bg-[#493627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217] sm:px-5"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  )
}

function Header({ cartCount, cartOpen, onCartOpen, onSearch, onSearchClose }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const headerRef = useRef(null)
  const headerShellRef = useRef(null)
  const desktopRowRef = useRef(null)
  const logoRef = useRef(null)
  const navigationRef = useRef(null)
  const searchAnchorRef = useRef(null)
  const searchContainerRef = useRef(null)
  const searchInputRef = useRef(null)
  const searchContentRef = useRef(null)
  const closeButtonRef = useRef(null)
  const searchTimelineRef = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions
          if (!desktop) return undefined

          const getMetrics = () => {
            const rowHeight = desktopRowRef.current?.offsetHeight ?? 0
            const navigationHeight = navigationRef.current?.offsetHeight ?? 0
            const closedWidth = searchAnchorRef.current?.offsetWidth || 48
            const logoRight = logoRef.current?.getBoundingClientRect().right ?? 0
            const searchRight = searchContainerRef.current?.getBoundingClientRect().right ?? 0
            const horizontalGap = Math.max(20, Math.min(window.innerWidth * 0.01667, 32))
            const rowGap = Math.max(16, Math.min(window.innerWidth * 0.0125, 24))

            return {
              closedWidth,
              expandedWidth: Math.max(closedWidth, searchRight - logoRight - horizontalGap),
              navigationY: (rowHeight + navigationHeight) / 2 + rowGap,
              openHeight: rowHeight + rowGap + navigationHeight,
              rowHeight,
            }
          }

          const initialMetrics = getMetrics()
          const expansionDuration = reduceMotion ? 0 : 0.6
          const navigationDuration = reduceMotion ? 0 : 0.45
          const contentDuration = reduceMotion ? 0 : 0.24

          gsap.set(headerShellRef.current, { clearProps: 'height' })
          gsap.set(searchContainerRef.current, { width: initialMetrics.closedWidth })
          gsap.set(navigationRef.current, { y: 0 })
          gsap.set(searchContentRef.current, {
            autoAlpha: 0,
            x: 14,
            pointerEvents: 'none',
          })
          gsap.set(closeButtonRef.current, {
            autoAlpha: 0,
            x: 8,
            pointerEvents: 'none',
          })

          searchTimelineRef.current = gsap
            .timeline({
              paused: true,
              defaults: { ease: reduceMotion ? 'none' : 'power3.inOut' },
            })
            .addLabel('transform', 0)
            .to(
              headerShellRef.current,
              {
                height: () => getMetrics().openHeight,
                duration: expansionDuration,
              },
              'transform',
            )
            .to(
              searchContainerRef.current,
              {
                width: () => getMetrics().expandedWidth,
                duration: expansionDuration,
              },
              'transform',
            )
            .to(
              navigationRef.current,
              {
                y: () => getMetrics().navigationY,
                duration: navigationDuration,
              },
              reduceMotion ? 'transform' : 'transform+=0.08',
            )
            .to(
              searchContentRef.current,
              {
                autoAlpha: 1,
                x: 0,
                pointerEvents: 'auto',
                duration: contentDuration,
                ease: reduceMotion ? 'none' : 'power2.out',
              },
              reduceMotion ? 'transform' : 'transform+=0.32',
            )
            .to(
              closeButtonRef.current,
              {
                autoAlpha: 1,
                x: 0,
                pointerEvents: 'auto',
                duration: contentDuration,
                ease: reduceMotion ? 'none' : 'power2.out',
              },
              reduceMotion ? 'transform' : 'transform+=0.38',
            )

          return () => {
            searchTimelineRef.current?.kill()
            searchTimelineRef.current = null
          }
        },
      )

      return () => media.revert()
    },
    { scope: headerRef },
  )

  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
    searchTimelineRef.current
      ?.eventCallback('onReverseComplete', null)
      .eventCallback('onComplete', () => searchInputRef.current?.focus())
      .invalidate()
      .play()
  }

  const closeSearch = useCallback((returnFocus = true) => {
    setSearchOpen(false)
    const timeline = searchTimelineRef.current

    if (!timeline) {
      headerShellRef.current?.style.removeProperty('height')
      if (searchInputRef.current) searchInputRef.current.value = ''
      onSearchClose()
      if (returnFocus) searchAnchorRef.current?.querySelector('button')?.focus()
      return
    }

    timeline
      .eventCallback('onComplete', null)
      .eventCallback('onReverseComplete', () => {
        headerShellRef.current?.style.removeProperty('height')
        if (searchInputRef.current) searchInputRef.current.value = ''
        onSearchClose()
        if (returnFocus) searchAnchorRef.current?.querySelector('button')?.focus()
      })
      .reverse()
  }, [onSearchClose])

  const resetDesktopSearch = useCallback(() => {
    setSearchOpen(false)
    searchTimelineRef.current?.pause(0)
    headerShellRef.current?.style.removeProperty('height')
    if (searchInputRef.current) searchInputRef.current.value = ''
    onSearchClose()
  }, [onSearchClose])

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 1024px)')
    let fontFrame = 0
    let disposed = false

    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setMenuOpen(false)
      } else {
        resetDesktopSearch()
      }
    }

    const refreshTimelineLayout = () => {
      const timeline = searchTimelineRef.current
      if (!timeline) return

      const progress = timeline.progress()
      if (progress === 0) {
        headerShellRef.current?.style.removeProperty('height')
        timeline.invalidate()
        return
      }

      timeline.invalidate().progress(progress)
    }

    const resizeObserver = new ResizeObserver(refreshTimelineLayout)
    if (desktopRowRef.current) resizeObserver.observe(desktopRowRef.current)

    document.fonts?.ready.then(() => {
      if (disposed) return
      fontFrame = window.requestAnimationFrame(refreshTimelineLayout)
    })

    desktopMedia.addEventListener('change', handleBreakpointChange)
    window.addEventListener('resize', refreshTimelineLayout)

    return () => {
      disposed = true
      if (fontFrame) window.cancelAnimationFrame(fontFrame)
      resizeObserver.disconnect()
      desktopMedia.removeEventListener('change', handleBreakpointChange)
      window.removeEventListener('resize', refreshTimelineLayout)
    }
  }, [resetDesktopSearch])

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        if (searchOpen) closeSearch()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [closeSearch, menuOpen, searchOpen])

  const toggleSearch = () => {
    if (!searchOpen) openSearch()
  }

  const toggleMenu = () => {
    if (searchOpen) closeSearch(false)
    setMenuOpen((isOpen) => !isOpen)
  }

  const openCart = () => {
    setMenuOpen(false)
    if (searchOpen) closeSearch(false)
    onCartOpen()
  }

  const submitDesktopSearch = (event) => {
    event.preventDefault()
    const query = searchInputRef.current?.value.trim()
    if (!query) {
      searchInputRef.current?.focus()
      return
    }

    onSearch(query)
  }

  const handleNavigate = () => {
    setMenuOpen(false)
    if (searchOpen) {
      resetDesktopSearch()
      return
    }
    onSearchClose()
  }

  return (
    <header
      id="home"
      ref={headerRef}
      className="relative z-40 flex-none border-b border-black/30 bg-white px-[var(--content-inset)] py-5 xl:py-[clamp(20px,1.667vw,32px)]"
    >
      <div ref={headerShellRef} className="mx-auto w-full max-w-[1792px]">
        <div
          ref={desktopRowRef}
          className="flex w-full items-center gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-[clamp(20px,1.667vw,32px)]"
        >
          <a
            ref={logoRef}
            href="#home"
            className="shrink-0 py-1 font-[Zodiak] text-[34px] leading-none tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] lg:justify-self-start xl:py-[clamp(16px,1.51vw,29px)] xl:text-[clamp(34px,2.557vw,49.091px)]"
            aria-label="Various, home"
            onClick={handleNavigate}
          >
            VARIOUS
          </a>

          <div ref={navigationRef} className="relative z-0 hidden min-w-0 flex-1 lg:block">
            <Navigation onNavigate={handleNavigate} />
          </div>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3 lg:ml-0 lg:justify-self-end">
            <div
              ref={searchAnchorRef}
              className="relative hidden shrink-0 lg:block lg:size-12"
            >
              <form
                ref={searchContainerRef}
                id="desktop-site-search"
                className="group absolute right-0 top-0 z-20 flex size-12 min-w-0 items-center overflow-hidden rounded-[14px] bg-[#d9d9d9] text-[#2f2217] focus-within:bg-[#d2d2d2]"
                role="search"
                aria-label="Product search"
                onSubmit={submitDesktopSearch}
              >
                <button
                  className="absolute inset-y-0 left-0 z-10 grid w-12 shrink-0 cursor-pointer place-items-center rounded-[14px] transition-colors hover:bg-[#c9c9c9] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#2f2217]"
                  type={searchOpen ? 'submit' : 'button'}
                  aria-label={searchOpen ? 'Search products' : 'Open search'}
                  aria-expanded={searchOpen}
                  aria-controls="desktop-search-input"
                  onClick={toggleSearch}
                >
                  <SearchIcon />
                </button>

                <label
                  ref={searchContentRef}
                  className="absolute inset-y-0 left-12 right-12 flex items-center"
                  htmlFor="desktop-search-input"
                >
                  <span className="sr-only">Search products</span>
                  <input
                    ref={searchInputRef}
                    id="desktop-search-input"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-base text-[#2f2217] outline-none placeholder:text-[#2f2217]/50 xl:px-4 xl:text-[clamp(14px,0.938vw,18px)]"
                    type="search"
                    placeholder="Search products"
                    autoComplete="off"
                    tabIndex={searchOpen ? 0 : -1}
                  />
                </label>

                <button
                  ref={closeButtonRef}
                  className="absolute inset-y-0 right-0 z-10 grid w-12 cursor-pointer place-items-center rounded-[14px] transition-colors hover:bg-[#c9c9c9] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#2f2217]"
                  type="button"
                  aria-label="Close search"
                  tabIndex={searchOpen ? 0 : -1}
                  onClick={() => closeSearch(true)}
                >
                  <CloseIcon />
                </button>
              </form>
            </div>

            <HeaderAction
              label={`Cart with ${cartCount} items`}
              onClick={openCart}
              aria-expanded={cartOpen}
              aria-controls="cart-drawer"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#2f2217] p-1.5 px-2 text-[11px] leading-none text-white">
                  {cartCount}
                </span>
              )}
            </HeaderAction>
            <HeaderAction
              className="lg:hidden"
              label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <MenuIcon open={menuOpen} />
            </HeaderAction>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-88px)] overflow-y-auto border-b border-black/20 bg-white shadow-lg lg:hidden"
        >
          <MobileMenuSearch onSearch={onSearch} onComplete={() => setMenuOpen(false)} />
          <Navigation mobile onNavigate={handleNavigate} />
        </div>
      )}
    </header>
  )
}

export default Header
