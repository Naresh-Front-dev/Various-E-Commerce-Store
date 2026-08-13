import { useEffect, useRef } from 'react'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const getPrice = (price) => Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function EmptyCartIcon() {
  return (
    <svg className="size-11" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M7 9.5h5l4.2 20h18.2a4 4 0 0 0 3.9-3.1L41 14H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="38" r="2.5" fill="currentColor" />
      <circle cx="34" cy="38" r="2.5" fill="currentColor" />
    </svg>
  )
}

function QuantityControl({ item, onQuantityChange }) {
  return (
    <div className="inline-flex h-10 items-center rounded-full border border-[#2f2217]/20 bg-white" aria-label={`Quantity for ${item.name}`}>
      <button
        className="grid size-10 place-items-center rounded-full text-xl transition-colors hover:bg-[#eee7df] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2f2217]"
        type="button"
        aria-label={`Decrease ${item.name} quantity`}
        onClick={() => onQuantityChange(item.id, -1)}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-medium" aria-live="polite">
        {item.quantity}
      </span>
      <button
        className="grid size-10 place-items-center rounded-full text-xl transition-colors hover:bg-[#eee7df] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2f2217]"
        type="button"
        aria-label={`Increase ${item.name} quantity`}
        onClick={() => onQuantityChange(item.id, 1)}
      >
        +
      </button>
    </div>
  )
}

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <li className="grid grid-cols-[96px_minmax(0,1fr)] gap-5 py-6 sm:grid-cols-[112px_minmax(0,1fr)]">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-white ring-1 ring-[#2f2217]/10 ring-inset">
        <img className="size-full object-cover" src={item.image} alt={item.alt} />
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-medium tracking-[-0.025em] sm:text-lg">{item.name}</h3>
            <p className="mt-1 text-sm text-[#2f2217]/60">Handcrafted piece</p>
          </div>
          <p className="shrink-0 text-sm font-medium sm:text-base">
            {currency.format(getPrice(item.price) * item.quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <QuantityControl item={item} onQuantityChange={onQuantityChange} />
          <button
            className="rounded-sm pb-1 text-xs text-[#2f2217]/55 underline decoration-[#2f2217]/30 underline-offset-4 transition-colors hover:text-[#2f2217] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217]"
            type="button"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}

function CartDrawer({ open, items, onClose, onQuantityChange, onRemove }) {
  const closeButtonRef = useRef(null)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + getPrice(item.price) * item.quantity,
    0,
  )

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <button
        className={`absolute inset-0 bg-[#1d1510]/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        type="button"
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        id="cart-drawer"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[510px] flex-col bg-[#f7f3ef] shadow-[-24px_0_70px_rgba(26,18,12,0.16)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!open}
      >
        <header className="flex items-start justify-between gap-6 border-b border-[#2f2217]/15 bg-white px-5 py-6 sm:px-8 sm:py-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9b744a]">Your Selection</p>
            <h2 id="cart-title" className="mt-2 font-[Zodiak] text-4xl leading-none tracking-[-0.04em] sm:text-[42px]">
              Your Cart
            </h2>
            <p className="mt-3 text-sm text-[#2f2217]/55">
              {itemCount === 0 ? 'No pieces selected' : `${itemCount} ${itemCount === 1 ? 'piece' : 'pieces'} selected`}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-[#2f2217]/20 transition-colors hover:bg-[#f1ebe5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2217]"
            type="button"
            aria-label="Close cart"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-8">
          {items.length > 0 ? (
            <ul className="divide-y divide-[#2f2217]/12">
              {items.map((item) => (
                <CartItem
                  item={item}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                  key={item.id}
                />
              ))}
            </ul>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <span className="grid size-20 place-items-center rounded-full bg-[#ead1a7] text-[#2f2217]">
                <EmptyCartIcon />
              </span>
              <h3 className="mt-7 font-[Zodiak] text-3xl tracking-[-0.04em]">Your cart is empty</h3>
              <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-[#2f2217]/60">
                Explore the collection and choose a piece with character.
              </p>
              <button
                className="mt-7 rounded-full border border-[#2f2217]/30 px-5 py-3 text-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2f2217]"
                type="button"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        <footer className="border-t border-[#2f2217]/15 bg-white px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#2f2217]/50">Subtotal</p>
              <p className="mt-1 text-xs text-[#2f2217]/45">Shipping calculated at checkout</p>
            </div>
            <p className="font-[Zodiak] text-3xl tracking-[-0.04em]">{currency.format(subtotal)}</p>
          </div>
          <button
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-lg bg-[#2f2217] px-6 text-base font-medium text-white transition-colors hover:bg-[#493525] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2f2217] disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default CartDrawer
