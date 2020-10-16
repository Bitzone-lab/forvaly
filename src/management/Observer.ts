export default class Observer {
  value: any
  errors: Array<string> = []
  optional: boolean = false
  constructor(value: any, optional: boolean = false) {
    this.value = value
    this.optional = optional
  }

  hasError(): boolean {
    return false
  }

  notify(message: string) {
    this.errors.push(message)
  }

  // replaceLastMessageError(message: string): boolean {
  //   if (this.errors.length === 0) return false
  //   this.errors[this.errors.length - 1] = message
  //   return true
  // }

  finish() {}
}
