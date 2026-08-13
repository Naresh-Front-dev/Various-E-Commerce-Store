import { useState } from 'react'
import arrowOutward from '../assets/icons/arrow-outward.svg'
import { benefits, footerColumns } from '../data/storefront'

function FooterTicker() {
  const tickerItems = [...benefits.slice(0, 4), ...benefits.slice(0, 4)]

  return (
    <div className="h-[68px] overflow-hidden bg-[#201d1b] text-[#c7a980]" aria-label="Shopping benefits">
      <div className="flex h-full w-max animate-[ticker_28s_linear_infinite] items-center [will-change:transform] motion-reduce:animate-none motion-reduce:[will-change:auto]">
        {tickerItems.map((item, index) => (
          <span className="flex items-center gap-8 px-7 text-[10px] uppercase tracking-[0.24em] sm:px-10 sm:text-xs" key={`${item}-${index}`}>
            <span aria-hidden="true">•</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c7a980]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-[#f7f3ef]/65 xl:text-[15px]">
        {links.map((link) => (
          <li key={link}>
            <a className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" href="#shop">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({ label, children }) {
  return (
    <a
      className="grid size-9 place-items-center rounded-full border border-[#c7a980]/40 text-xs text-[#c7a980] transition-colors hover:border-[#c7a980] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7a980]"
      href="#home"
      aria-label={label}
    >
      {children}
    </a>
  )
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (event) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer id="contact" className="mt-20 text-[#f7f3ef] md:mt-24 xl:mt-32">
      <FooterTicker />
      <div className="bg-[#342416]">
        <section className="border-b border-[#c7a980]/15 px-[var(--page-gutter)]" aria-labelledby="footer-heading">
          <div className="mx-auto grid max-w-[1792px] gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:min-h-[423px] xl:grid-cols-[920px_1fr] xl:gap-10 xl:py-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#c7a980]">Various · Curated With Care</p>
              <h2 id="footer-heading" className="mt-6 max-w-[900px] font-[Zodiak] text-[clamp(52px,12vw,86px)] italic leading-[0.92] tracking-[-0.04em] xl:text-[clamp(72px,5.208vw,100px)]">
                <span className="block">Shop</span>
                <span className="block">Various Creators</span>
              </h2>
            </div>
            <div className="lg:pl-8 xl:pl-0">
              <p className="max-w-[790px] text-base leading-[1.55] text-[#f7f3ef]/55 xl:text-lg">
                Various is a curated collection of thoughtfully sourced products, chosen for quality, character and craftsmanship. Each item is clearly photographed and described so you always know exactly what you’re getting.
              </p>
              <a
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#c7a980]/45 px-6 text-xs uppercase tracking-[0.16em] transition-colors hover:border-[#c7a980] hover:bg-[#c7a980] hover:text-[#2f2217] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c7a980]"
                href="#shop"
              >
                Shop Now
                <img className="size-4" src={arrowOutward} width="16" height="16" alt="" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7a980]/15 px-[var(--page-gutter)]" aria-label="Footer navigation and newsletter">
          <div className="mx-auto grid max-w-[1792px] grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(300px,1.55fr)] xl:min-h-[430px] xl:gap-16 xl:py-16">
            {footerColumns.map((column) => (
              <FooterLinkColumn {...column} key={column.title} />
            ))}

            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c7a980]">Stay in Touch</h3>
              <p className="mt-5 max-w-[420px] text-sm leading-relaxed text-[#f7f3ef]/55 xl:text-[15px]">
                New arrivals, behind-the-scenes stories and exclusive offers — delivered straight to your inbox.
              </p>
              <form className="mt-7 flex max-w-[455px] gap-2" onSubmit={subscribe}>
                <label className="min-w-0 flex-1" htmlFor="footer-email">
                  <span className="sr-only">Your email address</span>
                  <input
                    id="footer-email"
                    className="h-11 w-full rounded-lg border border-[#c7a980]/35 bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#f7f3ef]/30 focus:border-[#c7a980]"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </label>
                <button
                  className="h-11 shrink-0 rounded-lg bg-[#c7a980] px-4 text-xs font-medium uppercase tracking-[0.08em] text-[#2f2217] transition-colors hover:bg-[#ddc299] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7a980]"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 min-h-5 text-xs text-[#c7a980]" aria-live="polite">
                {subscribed ? 'Thank you — you’re on the list.' : ''}
              </p>
              <address className="mt-5 space-y-3 text-sm not-italic text-[#f7f3ef]/55">
                <a className="block hover:text-white" href="mailto:hello@various.com">✉&nbsp; hello@various.com</a>
                <p>⌖&nbsp; New Zealand</p>
              </address>
            </div>
          </div>
        </section>

        <div className="px-[var(--page-gutter)]">
          <div className="mx-auto flex max-w-[1792px] flex-col gap-8 py-10 text-xs text-[#f7f3ef]/35 sm:flex-row sm:items-center sm:justify-between xl:min-h-[159px] xl:py-8">
            <p>© 2025 Various. All rights reserved.</p>
            <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Legal">
              <a className="hover:text-white" href="#home">Privacy Policy</a>
              <a className="hover:text-white" href="#home">Terms of Service</a>
              <a className="hover:text-white" href="#home">Refund Policy</a>
            </nav>
            <div className="flex gap-3">
              <SocialIcon label="Instagram">◎</SocialIcon>
              <SocialIcon label="Facebook">f</SocialIcon>
              <SocialIcon label="YouTube">▶</SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
