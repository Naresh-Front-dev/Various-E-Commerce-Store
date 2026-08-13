export const SCROLL_REQUEST_EVENT = 'various:scroll-to'

export function scrollToPageTarget(target, options = {}) {
  window.dispatchEvent(
    new CustomEvent(SCROLL_REQUEST_EVENT, {
      detail: {
        target,
        smooth: options.smooth ?? true,
        position: options.position ?? 'top top',
      },
    }),
  )
}
