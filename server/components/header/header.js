import RafThrottle from '@utilities/raf-throttle'

const HEADER_SHADOW_CLASS = 'header--has-shadow'
class Header {
  constructor(element) {
    this.element = element

    if (!this.element) {
      return
    }

    this.height = 0
    this.scrollValue = 0
    this.prevScrollValue = 0
    this.translateValue = 0
    this._initialized = false

    this.bindEvents()
  }

  get fixed() {
    return this.element.hasAttribute('fixed')
  }

  get condenses() {
    return this.element.hasAttribute('condenses')
  }

  get reveals() {
    return this.element.hasAttribute('reveals')
  }

  get shadow() {
    return this.element.hasAttribute('shadow')
  }

  set shadow(val) {
    if (val) {
      this.element.classList.add(HEADER_SHADOW_CLASS)
    } else {
      this.element.classList.remove(HEADER_SHADOW_CLASS)
    }
  }

  get _maxHeaderHeight() {
    return this.fixed ? this.scrollingDistanceHeight : this.height + 5
  }

  /**
   * Gets element with [sticky] attribute
   * Takes the first direct child when [sticky] attribute is not set
   */
  get stickyElement() {
    const elements = this.element.childNodes

    let stickyElement

    for (let i = 0, len = elements.length; i < len; i++) {
      if (elements[i].nodeType === Node.ELEMENT_NODE) {
        const element = elements[i]

        if (element.hasAttribute('sticky')) {
          stickyElement = element
        }

        if (!stickyElement) {
          stickyElement = element
        }
      }
    }

    return stickyElement
  }

  bindEvents() {
    RafThrottle.set([
      {
        element: window,
        event: 'scroll',
        namespace: 'HeaderScroll',
        fn: () => this._scrollHandler(),
      },
    ])

    if (!this._initialized) {
      this._scrollHandler()
    }
  }

  isOnScreen() {
    return this.height !== 0 && this.translateValue < this.height
  }

  _scrollHandler() {
    this.height = this.element.offsetHeight
    this.scrollingDistanceHeight = this.stickyElement
      ? this.height - this.stickyElement.offsetHeight
      : 0
    this.stickyElementTop = this.stickyElement ? this.stickyElement.offsetTop : 0

    this.scrollValue = window.pageYOffset

    this._calculateHeaderTranslateValue()
  }

  /**
   * Calculates the header translate value based on the options that are set
   */

  _calculateHeaderTranslateValue() {
    const scrollDiff = this.scrollValue - this.prevScrollValue

    if (this.condenses || !this.fixed) {
      if (this.reveals) {
        this.translateValue = Math.min(
          this._maxHeaderHeight,
          Math.max(0, this.translateValue + scrollDiff),
        )
      } else {
        this.translateValue = Math.min(this._maxHeaderHeight, Math.max(0, this.scrollValue))
      }
    }

    if (this.scrollValue >= this.scrollingDistanceHeight) {
      this.translateValue =
        this.condenses && !this.fixed
          ? Math.max(this.scrollingDistanceHeight, this.translateValue)
          : this.translateValue
    }

    this.isScrollingDown = this.scrollValue > this.prevScrollValue
    this.prevScrollValue = this.scrollValue

    if (this.scrollValue <= 0) {
      this._transformHeader(0)
    } else {
      this._transformHeader(this.translateValue)
    }

    this._applyShadow()
  }

  _applyShadow() {
    if (this.fixed) {
      this.element.classList.add(HEADER_SHADOW_CLASS)
    }

    if (this.scrollValue <= 0 || !this.isOnScreen()) {
      this.element.classList.remove(HEADER_SHADOW_CLASS)
    }

    if (this.isOnScreen() && this.scrollValue > 0 && !this.isScrollingDown) {
      this.element.classList.add(HEADER_SHADOW_CLASS)
    }
  }

  /**
   * Applies the calculated value from _calculateHeaderTranslateValue to the header
   * and applies it to the sticky element when a sticky element is available
   */

  _transformHeader(value) {
    this.element.style.transform = `translate3d(0, -${value}px, 0)`

    if (this.stickyElement) {
      this.stickyElement.style.transform = `translate3d(0, ${Math.min(
        value,
        this.scrollingDistanceHeight,
      ) - this.stickyElementTop}px, 0)`

      if (this.condenses && value >= this.stickyElementTop) {
        this.stickyElement.style.transform = `translate3d(0 ,${Math.min(
          value,
          this.scrollingDistanceHeight,
        ) - this.stickyElementTop}px, 0)`
      } else {
        this.stickyElement.style.transform = `translate3d(0, 0, 0)`
      }
    }

    this._initialized = true
  }
}

export default Header
