import { useEffect, useState } from 'react'
import { navigationLinks } from '../data/storefront'

const actionClass =
  'relative grid size-12 shrink-0 place-items-center rounded-[14px] bg-[#d9d9d9] text-[#2f2217] transition-colors hover:bg-[#c9c9c9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217] xl:size-[clamp(32px,2.5vw,48px)] xl:rounded-[clamp(10px,0.729vw,14px)]'

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

function Header({ cartCount, cartOpen, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, searchOpen])

  const toggleSearch = () => {
    setMenuOpen(false)
    setSearchOpen((isOpen) => !isOpen)
  }

  const toggleMenu = () => {
    setSearchOpen(false)
    setMenuOpen((isOpen) => !isOpen)
  }

  const openCart = () => {
    setMenuOpen(false)
    setSearchOpen(false)
    onCartOpen()
  }

  return (
    <header className="relative z-40 flex-none border-b border-black/30 bg-white px-[var(--page-gutter)] py-5 xl:py-[clamp(20px,1.667vw,32px)]">
      <div className="mx-auto flex w-full max-w-[1792px] items-center gap-4 xl:gap-[clamp(20px,1.667vw,32px)]">
        <a
          href="#home"
          className="shrink-0 py-1 font-[Zodiak] text-[34px] leading-none tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f2217] xl:py-[clamp(16px,1.51vw,29px)] xl:text-[clamp(34px,2.557vw,49.091px)]"
          aria-label="Various, home"
        >
          VARIOUS
        </a>

        <div className="hidden min-w-0 flex-1 xl:block">
          <Navigation />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <HeaderAction
            label={searchOpen ? 'Close search' : 'Open search'}
            onClick={toggleSearch}
            aria-expanded={searchOpen}
            aria-controls="site-search-panel"
          >
            <SearchIcon />
          </HeaderAction>
          <HeaderAction
            label={`Cart with ${cartCount} items`}
            onClick={openCart}
            aria-expanded={cartOpen}
            aria-controls="cart-drawer"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#2f2217] px-1 text-[11px] leading-none text-white">
                {cartCount}
              </span>
            )}
          </HeaderAction>
          <HeaderAction
            className="xl:hidden"
            label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <MenuIcon open={menuOpen} />
          </HeaderAction>
        </div>
      </div>

      {searchOpen && (
        <form
          id="site-search-panel"
          className="absolute inset-x-0 top-full border-b border-black/20 bg-white p-4 shadow-lg"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="mx-auto flex max-w-3xl items-center gap-3" htmlFor="site-search">
            <span className="sr-only">Search products</span>
            <input
              id="site-search"
              className="min-h-12 flex-1 rounded-lg border border-[#2f2217]/30 bg-[#f7f3ef] px-4 text-base outline-none focus:border-[#2f2217]"
              type="search"
              placeholder="Search products"
              autoFocus
            />
            <button
              className="min-h-12 rounded-lg bg-[#2f2217] px-5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217]"
              type="submit"
            >
              Search
            </button>
          </label>
        </form>
      )}

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-black/20 bg-white shadow-lg xl:hidden">
          <Navigation mobile onNavigate={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}

export default Header
