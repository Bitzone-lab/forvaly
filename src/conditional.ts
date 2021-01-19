import { ErrorValid } from './typing'
import valid from './valid'

export function is<T>(value: T, notify: (error: ErrorValid, message: string) => void) {
  return valid(value, notify, 'is')
}

export function not<T>(value: T, notify: (error: ErrorValid, message: string) => void) {
  return valid(value, notify, 'not')
}
