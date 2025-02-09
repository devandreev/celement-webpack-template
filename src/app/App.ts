import { camelToDash } from '@/utils/convert-case.ts'
import throttle from '@/utils/throttle.ts'

import CElement from '@/components/c-element/c-element.ts'

interface ComponentList {
  [index: string]: CustomElementConstructor
}

interface MethodList {
  [index: string]: Function
}

export interface AppConfig {
  // plugins?: []
  components: ComponentList
  methods?: MethodList
  created?: Function
  onresize?: Function
  onload?: Function
}

export default class App {
  mediaScreen: string
  [index: string]: string | unknown

  constructor(config: AppConfig) {
    const { 
      // plugins,
      components,
      methods,
      created,
      onresize,
      onload
    } = config

    // Инициализируем экстненшены
    // this._initPlugins(plugins) 

    // Инициализация переданных методов
    this._initMethods(methods)

    // Инициализация кастомных элементов
    this._initComponents(components)

    // Событие после инициализации
    created.bind(this)()

    // Событие после загрузки страницы
    document.addEventListener('DOMContentLoaded', onload.bind(this) )

    // Тип экрана девайса
    this.mediaScreen = this._getMediaScreen()

    // Событие после ресайза страницы
    window.addEventListener('resize', throttle((e: Event) => {
      const oldScreen = this.mediaScreen
      const newScreen = this._getMediaScreen()

      this.mediaScreen = newScreen

      onresize.bind(this)(oldScreen, newScreen)
    }, 200))
  }

  isTouchDevice() {
    return 'ontouchstart' in document.documentElement
  }

  isMobileScreen() {
    const screen = this._getMediaScreen()
    return !screen.includes('desktop')
  }

  isDesktopScreen() {
    const screen = this._getMediaScreen()
    return screen.includes('desktop')
  }

  _getMediaScreen() {
    const rootStyles = getComputedStyle(document.documentElement)

    return rootStyles.getPropertyValue('--media-screen').trim()
  }

  // Регистрация экстеншенов
  // _initPlugins(plugins: []) {
  //   if (!plugins) return

  //   const pluginsKeys = Object.keys(plugins)
  //   if (!pluginsKeys) return

  //   pluginsKeys.forEach(key => {
  //     const plugin = plugins[key]
  //     const name = key

  //     this[name] = plugin
  //   })
  // }

  // Регистрация компонентов
  _initComponents(components: ComponentList) {
    if (!components) return

    const componentsKeys = Object.keys(components)
    if (!componentsKeys) return

    componentsKeys.forEach((key: string) => {
      const component = components[key]
      const name = camelToDash(key)

      if (!customElements.get(name)) customElements.define(name, component)
    })
  }

  // Глобальные методы
  _initMethods(methods: MethodList) {
    if (!methods) return

    const methodsKeys = Object.keys(methods)
    if (!methodsKeys) return

    methodsKeys.forEach(key => {
      if (this[key]) {
        console.error(`Method ${key} already exist`)
      }

      this[key] = methods[key]
    })
  }
}
