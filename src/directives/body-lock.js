import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

const ACTIVE_POPUPS = []

export function getScrollbarGap() {
  const bodyStyles = window.getComputedStyle(document.body)

  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
  const paddingRight = parseInt(bodyStyles.getPropertyValue('padding-right'), 10);

  return scrollBarGap + paddingRight;
}

export function setScrollbarGap(gap = 0) {
  const root = document.documentElement
  root.style.setProperty(`--scrollbar-gap`, `${gap}px`)
}

// Заблокировать скролл у body
export function toggleBodyLock(name, isShowPopup = false) {
  if (!name) return

  const popup = document.querySelector('#' + name)

  if (!popup.scrollWrapper) {
    console.warn('scrollWrapper required')
    return
  }

  const options = { reserveScrollBarGap: false }

  if (isShowPopup) {
    ACTIVE_POPUPS[name] = name

    const gap = getScrollbarGap()
    if (gap > 0) setScrollbarGap(gap)

    disableBodyScroll(popup.scrollWrapper, options)
  } else {
    delete ACTIVE_POPUPS[name]

    const isRemoveLock = !Object.keys(ACTIVE_POPUPS).length

    if (isRemoveLock) {
      setScrollbarGap(0)
      enableBodyScroll(popup.scrollWrapper)
    }
  }
}
