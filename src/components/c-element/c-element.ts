import { render, html } from 'lit-html'

export default class CElement extends HTMLElement {
  root: ShadowRoot | CElement
  observer?: IntersectionObserver
  intersectedCallback?: Function
  template?: string
  styles?: string

  constructor() {
    super()

    this.root = this.getRenderRoot()

    this.initIntersection()
  }

  get $app() {
    return window.$app
  }

  // Переопределить в наследнике, если shadowDom не требуется
  getRenderRoot() {
    return this.attachShadow 
      ? this.attachShadow({ mode: 'open' }) 
      : this
  }

  initIntersection() {
    if (typeof this.intersectedCallback !== 'function') return

    const observerOptions = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const observerCallback = (entries) => {
      const element = entries[0]

      if (element.isIntersecting) {
        this.observer.disconnect()
        this.intersectedCallback()
      }
    }

    this.observer = new IntersectionObserver(observerCallback, observerOptions)

    this.observer.observe(this)
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  get _template() {
    return this.template || ''
  }

  get _styles() {
    return this.styles ? html`<style>${this.styles}</style>` : ''
  }

  get _contentToRender() {
    return html`
      ${this._template}
      ${this._styles}
    `
  }

  // Создаёт и возвращает root-элемент для содержимого слота
  // Служит для передачи контента в слот изнутри компонента
  $createSlotRoot(slotName) {
    if (!slotName) {
      console.warn('slotName required')
      return
    }

    const root = document.createElement('div')
    root.setAttribute('slot', slotName)
    this.appendChild(root)

    return root
  }

  $find(query) {
    return this.root.querySelector(query)
  }

  $findAll(query) {
    return this.root.querySelectorAll(query)
  }

  $render() {
    const template = render(this._contentToRender, this.root, { eventContext: this })
  }

  $update() {
    this.$render()
  }

  $on(eventName, callback) {
    this.addEventListener(eventName, callback)
  }

  $get(attributeName, toBoolean) {
    // Для любых аттрибутов
    const attrValue = this.getAttribute(attributeName)
    if (!toBoolean) return attrValue

    // Для boolean-атрибутов
    const falsyValues = [null, undefined, false, 'false']
    return !falsyValues.includes(attrValue)
  }

  $set(attributeName, value, toBoolean) {
    const isSet = !toBoolean || value

    if (isSet) {
      this.setAttribute(attributeName, value)
    } else {
      this.$remove(attributeName)
    }
  }

  $remove(attributeName) {
    this.removeAttribute(attributeName)
  }

  
  $emit(eventName, params) {
    if (!eventName) return

    const event = new CustomEvent(eventName, { detail: params })
    this.dispatchEvent(event)
  }
}
