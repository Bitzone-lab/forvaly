import Observer from './Observer'

export default class Valid {
  observer: Observer
  constructor(observer: Observer) {
    this.observer = observer
  }

  isEmpty(message: string) {
    const val = this.observer.value
    switch (typeof val) {
      case 'string':
        if (val === '') {
          this.observer.notify(message)
        }
        break
      case 'object':
        if (val === null) break

        if (Array.isArray(val) && val.length === 0) {
          this.observer.notify(message)
        } else {
          if (Object.values(val).length === 0) {
            this.observer.notify(message)
          }
        }
        break
      default:
        break
    }
  }
}
