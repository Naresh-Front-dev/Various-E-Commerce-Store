import { useEffect } from 'react'

let activeLocks = 0
let lockedScrollY = 0
let savedStyles = null

const acquireLock = () => {
  activeLocks += 1
  if (activeLocks > 1) return

  const root = document.documentElement
  const body = document.body
  const scrollbarWidth = window.innerWidth - root.clientWidth

  lockedScrollY = window.scrollY
  savedStyles = {
    body: {
      left: body.style.left,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      position: body.style.position,
      right: body.style.right,
      top: body.style.top,
      width: body.style.width,
    },
    root: {
      overflow: root.style.overflow,
      overscrollBehavior: root.style.overscrollBehavior,
      scrollBehavior: root.style.scrollBehavior,
    },
  }

  if (scrollbarWidth > 0) {
    const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
    body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
  }

  root.style.overflow = 'hidden'
  root.style.overscrollBehavior = 'none'
  body.style.position = 'fixed'
  body.style.top = `-${lockedScrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  body.style.overflow = 'hidden'
}

const releaseLock = () => {
  activeLocks = Math.max(0, activeLocks - 1)
  if (activeLocks > 0 || !savedStyles) return

  const root = document.documentElement
  const body = document.body
  const { body: bodyStyles, root: rootStyles } = savedStyles

  Object.assign(body.style, bodyStyles)
  root.style.overflow = rootStyles.overflow
  root.style.overscrollBehavior = rootStyles.overscrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, lockedScrollY)
  root.style.scrollBehavior = rootStyles.scrollBehavior

  savedStyles = null
}

function usePageScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    acquireLock()
    return releaseLock
  }, [locked])
}

export default usePageScrollLock
