const InitBus = () => {
  const EventBus = new Comment('event-bus')

  // Обёртка над addEventListener
  EventBus.on = function(eventName, callback) {
    this.addEventListener(eventName, callback)
  }

  // Зарегистрировать событие
  EventBus.trigger = function(eventName, params) {
    this.dispatchEvent(
      new CustomEvent(eventName, { detail: params })
    )
  }

  return EventBus
}

export default class Bus {
  constructor() {
    return InitBus()
  }
}
