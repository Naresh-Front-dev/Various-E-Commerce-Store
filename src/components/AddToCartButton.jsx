import { useEffect, useRef, useState } from 'react'
import addIcon from '../assets/icons/add.svg'

function CheckIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.25 4.25L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AddToCartButton({ product, onAdd, className = '' }) {
  const [added, setAdded] = useState(false)
  const resetTimer = useRef(null)
  const animationFrame = useRef(null)

  useEffect(() => () => {
    window.clearTimeout(resetTimer.current)
    window.cancelAnimationFrame(animationFrame.current)
  }, [])

  const handleAdd = () => {
    onAdd(product)
    window.clearTimeout(resetTimer.current)
    window.cancelAnimationFrame(animationFrame.current)

    setAdded(false)
    animationFrame.current = window.requestAnimationFrame(() => {
      setAdded(true)
      resetTimer.current = window.setTimeout(() => setAdded(false), 1200)
    })
  }

  return (
    <button
      className={`grid size-10 place-items-center overflow-hidden rounded-full border border-white/40 text-white shadow-[0_0_12px_1px_rgba(255,255,255,0.25)] transition-[transform,background-color] duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
        added ? 'bg-[#9b744a]' : 'bg-[#2f2217]'
      } ${className}`}
      type="button"
      aria-label={added ? `${product.name} added to cart. Add another` : `Add ${product.name.toLowerCase()} to cart`}
      onClick={handleAdd}
    >
      <span
        className={`absolute grid place-items-center transition-all duration-300 ease-out motion-reduce:transition-none ${
          added ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      >
        <img className="size-5" src={addIcon} width="20" height="20" alt="" />
      </span>
      <span
        className={`absolute grid place-items-center transition-all duration-300 ease-out motion-reduce:transition-none ${
          added ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
        aria-hidden="true"
      >
        <CheckIcon />
      </span>
      <span className="sr-only" aria-live="polite">
        {added ? `${product.name} added to cart` : ''}
      </span>
    </button>
  )
}

export default AddToCartButton
