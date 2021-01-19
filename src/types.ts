import { is, not } from './conditional'
import { TypesState, TypeValue } from './typing'

export default class Types<T> {
  private state: TypesState = {
    key: this.key,
    type: null,
    error_type: false,
    message: '',
    error_valid: false
  }

  private expect(type: TypeValue, error: boolean = false, message: string | null = null) {
    this.state.type = type
    this.state.error_type = error
    this.state.message = message
    this.callbackfn(this.state)
  }

  private type_was_recognized() {
    return this.state.type !== null
  }

  constructor(
    private readonly key: string,
    private readonly value: T,
    private callbackfn: (state: TypesState) => void
  ) {}

  number(message?: string) {
    if (this.type_was_recognized()) return this
    if (!Number.isInteger(this.value)) {
      this.expect(this.state.type, true, message || `This ${this.key} is not number`)
    } else {
      this.expect('number', false)
    }
    return this
  }

  string(message?: string) {
    if (this.type_was_recognized()) return this
    if (typeof this.value !== 'string') {
      this.expect(this.state.type, true, message || `This ${this.key} is not string`)
    } else {
      this.expect('string', false)
    }
    return this
  }

  bool(message?: string) {
    if (this.type_was_recognized()) return this
    if (typeof this.value !== 'boolean') {
      this.expect(this.state.type, true, message || `This ${this.key} is not boolean`)
    } else {
      this.expect('bool', false)
    }
    return this
  }

  array(message?: string) {
    if (this.type_was_recognized()) return this
    if (!Array.isArray(this.value)) {
      this.expect(this.state.type, true, message || `This ${this.key} is not array`)
    } else {
      this.expect('array', false)
    }
    return this
  }

  object(message?: string) {
    if (this.type_was_recognized()) return this
    function isObject(obj: any) {
      if (Array.isArray(obj)) return false
      return obj === Object(obj)
    }
    if (!isObject(this.value)) {
      this.expect(this.state.type, true, message || `This ${this.key} is not object`)
    } else {
      this.expect('object', false)
    }
    return this
  }

  get is() {
    return is(this.value, (error, message) => {
      if (!this.state.error_valid) {
        this.state.message = message
        this.state.error_valid = true
      }
    })
  }

  get not() {
    return not(this.value, (error, message) => {
      if (!this.state.error_valid) {
        this.state.message = message
        this.state.error_valid = true
      }
    })
  }
}
