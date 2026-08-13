import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function SuccessIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5.5 12.5 4 4 9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AddToCartToast({ toast, onDismiss }) {
  const toastRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const timeline = gsap.timeline({
        onComplete: () => onDismiss(toast.id),
      })

      if (reduceMotion) {
        timeline
          .set(toastRef.current, { autoAlpha: 1 })
          .to({}, { duration: 3 })
          .set(toastRef.current, { autoAlpha: 0 })
        return () => timeline.kill()
      }

      timeline
        .fromTo(
          toastRef.current,
          { autoAlpha: 0, y: 18, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
        )
        .fromTo(
          progressRef.current,
          { scaleX: 1 },
          { scaleX: 0, duration: 2.6, ease: 'none' },
          0.4,
        )
        .to(toastRef.current, {
          autoAlpha: 0,
          y: 10,
          scale: 0.99,
          duration: 0.3,
          ease: 'power2.in',
        })

      return () => timeline.kill()
    },
    {
      dependencies: [toast.id],
      scope: toastRef,
      revertOnUpdate: true,
    },
  )

  return (
    <div
      ref={toastRef}
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] overflow-hidden rounded-xl bg-[#2f2217] text-[#f7f3ef] shadow-[0_18px_55px_rgba(35,24,15,0.28)] sm:inset-x-auto sm:bottom-7 sm:right-7 sm:w-[390px]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-4 p-3.5 sm:p-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#f7f3ef] ring-1 ring-white/15">
          <img
            className="size-full object-cover"
            src={toast.product.image}
            alt=""
            width="64"
            height="64"
          />
          <span className="absolute bottom-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-[#b68550] text-white ring-2 ring-[#f7f3ef]">
            <SuccessIcon />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#d9b886]">
            Added to cart successfully
          </p>
          <p className="mt-1.5 truncate font-[Zodiak] text-xl leading-tight tracking-[-0.025em]">
            {toast.product.name}
          </p>
          <p className="mt-1 text-xs text-white/60">Your cart has been updated.</p>
        </div>
      </div>

      <span className="block h-0.5 bg-white/10" aria-hidden="true">
        <span
          ref={progressRef}
          className="block h-full origin-left bg-[#d9b886] will-change-transform"
        />
      </span>
    </div>
  )
}

export default AddToCartToast
