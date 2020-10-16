import Observer from './Observer'
import Valid from './Valid'

export default class Conditions {
  protected observer: Observer
  protected continuous: boolean = true

  constructor(observer: Observer) {
    this.observer = observer
  }

  get is(): Valid {
    return new Valid(this.observer)
  }

  get not(): Valid {
    return new Valid(this.observer)
  }

  condition(logicCondition: (value: any) => boolean, message: string): this {
    const result = logicCondition(this.observer.value)
    if (!result) {
      this.observer.notify(message)
    }
    return this
  }

  continue(logicCondition: (value: any) => boolean): this {
    this.continuous = logicCondition(this.observer.value)
    if (!this.continuous) {
      this.observer.finish()
    }
    return this
  }
}
