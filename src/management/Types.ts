import { NOT_NUMBER, NOT_STRING, NOT_BOOLEAN, NOT_NULL } from '../constants'
import Conditions from './Condition'
import Observer from './Observer'
import Valid from './Valid'

export default class Types extends Conditions {
  constructor(observer: Observer) {
    super(observer)
  }

  string(message: string = ''): this {
    if (typeof this.observer.value !== 'string') {
      this.observer.notify(message || NOT_STRING)
    }
    return this
  }

  number(message: string = ''): this {
    const value = parseInt(this.observer.value)
    if (Number.isNaN(value)) {
      this.observer.notify(message || NOT_NUMBER)
    }
    return this
  }

  boolean(message: string = ''): this {
    if (typeof this.observer.value !== 'boolean') {
      this.observer.notify(message || NOT_BOOLEAN)
    }
    return this
  }

  null(message: string = ''): this {
    if (typeof this.observer.value !== null) {
      this.observer.notify(message || NOT_NULL)
    }
    return this
  }

  array() {}

  object() {}

  func() {}

  any(): Valid {
    return new Valid(this.observer)
  }
}
