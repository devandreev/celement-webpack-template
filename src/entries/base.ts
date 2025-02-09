// import Headroom from 'headroom.js'
import App, {AppConfig} from '@/app/App.ts'

const app = new App({
  plugins: {},

  components: {},

  methods: { 
    initScrollBehavior() {
      const html = document.querySelector('html')

      setTimeout(() => {
        html.style.scrollBehavior = 'smooth'
      }, 500)
    },

    initHeadroom() {
      const header = document.querySelector('#header')
      const options = {
        offset: 10
      }

      // this.headroom = new Headroom(header, options)
      // this.headroom.init()

      // requestAnimationFrame(() => {
      //   header.classList.remove('headroom--faded')
      // })
    },
  },

  created() {},

  onresize(oldScreen: string, newScreen: string) {},

  onload() {
    // Плавающая шапка
    this.initHeadroom()

    this.initScrollBehavior()
  },
} as AppConfig)

// Объект приложения
window.$app = app 
