// import ForvalyInterface from './interfaces/ForvalyInterface'
import Observer from './management/Observer'
import Types from './management/Types'

export default class Forvaly<T> {
  private form: T
  private message: string
  private observers: Array<Observer> = []

  constructor(form: T, message: string = '') {
    this.form = form
    this.message = message
  }

  /**
   * Search property of form
   * @param fieldname Key of form
   */
  field<K extends keyof T>(fieldname: K): Types {
    const observer: Observer = new Observer(this.form[fieldname])
    this.observers.push(observer)
    return new Types(observer)
  }

  run(): boolean {
    return true
  }
}
