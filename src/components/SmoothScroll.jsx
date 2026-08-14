import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SCROLL_REQUEST_EVENT } from '../utils/smoothScroll'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

const resolveTarget = (target) => {
  if (target instanceof Element) return target
  if (typeof target !== 'string') return null

  if (target.startsWith('#')) {
    return document.getElementById(decodeURIComponent(target.slice(1)))
  }

  return document.querySelector(target)
}

function SmoothScroll({ children, paused = false, refreshKey }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      let fontRefreshFrame = 0
      let initialHashFrame = 0
      let disposed = false

      const scrollToTarget = (target, smooth = true, position = 'top top') => {
        const element = resolveTarget(target)
        if (!element) return false

        if (smootherRef.current) {
          smootherRef.current.scrollTo(element, smooth, position)
        } else {
          element.scrollIntoView({
            behavior: smooth && !reducedMotion.matches ? 'smooth' : 'auto',
            block: position.startsWith('center') ? 'center' : 'start',
          })
        }

        return true
      }

      const handleScrollRequest = (event) => {
        const { target, smooth, position } = event.detail ?? {}
        scrollToTarget(target, smooth, position)
      }

      const handleAnchorClick = (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }

        const link = event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null
        const hash = link?.hash
        if (!hash || hash === '#') return

        const target = resolveTarget(hash)
        if (!target) return

        event.preventDefault()
        scrollToTarget(target)

        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash)
        }
      }

      const handleHistoryNavigation = () => {
        if (window.location.hash) scrollToTarget(window.location.hash)
      }

      window.addEventListener(SCROLL_REQUEST_EVENT, handleScrollRequest)
      window.addEventListener('popstate', handleHistoryNavigation)
      document.addEventListener('click', handleAnchorClick)

      const media = gsap.matchMedia()
      media.add(
        '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
        () => {
          const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 0.90,
            smoothTouch: false,
            effects: false,
            normalizeScroll: false,
            ignoreMobileResize: true,
            ease: 'power1.out',
          })

          smootherRef.current = smoother
          smoother.paused(paused)

          return () => {
            if (smootherRef.current === smoother) smootherRef.current = null
            smoother.kill()
          }
        }
      )

      document.fonts?.ready.then(() => {
        if (disposed) return
        fontRefreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
      })

      initialHashFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (window.location.hash) scrollToTarget(window.location.hash, false)
      })

      return () => {
        disposed = true
        if (fontRefreshFrame) window.cancelAnimationFrame(fontRefreshFrame)
        if (initialHashFrame) window.cancelAnimationFrame(initialHashFrame)
        window.removeEventListener(SCROLL_REQUEST_EVENT, handleScrollRequest)
        window.removeEventListener('popstate', handleHistoryNavigation)
        document.removeEventListener('click', handleAnchorClick)
        media.revert()
      }
    },
    { scope: wrapperRef },
  )

  useEffect(() => {
    smootherRef.current?.paused(paused)
  }, [paused])

  useEffect(() => {
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(refreshFrame)
  }, [refreshKey])

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef} className="min-h-svh">
        {children}
      </div>
    </div>
  )
}

export default SmoothScroll
