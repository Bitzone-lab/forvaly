import { ErrorValid } from './typing'

export default function valid<T>(
  value: T,
  reject: (error: ErrorValid, message: string) => void,
  type_condition: 'not' | 'is'
) {
  function empty(message: string) {
    if (type_condition === 'is') {
      if (typeof value === 'string' && value === '') {
        reject('empty', message)
      } else if (value === null) {
        reject('empty', message)
      } else if (Array.isArray(value) && value.length === 0) {
        reject('empty', message)
      } else if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0
      ) {
        reject('empty', message)
      }
    }

    if (type_condition === 'not') {
      if (typeof value === 'string' && value !== '') {
        reject('empty', message)
      } else if (value !== null) {
        reject('empty', message)
      } else if (Array.isArray(value) && value.length !== 0) {
        reject('empty', message)
      } else if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length !== 0
      ) {
        reject('empty', message)
      }
    }

    return valid(value, reject, type_condition)
  }

  function decimal(accuracy: number, message: string) {
    const value_formated = value + ''
    if (type_condition === 'is' && value_formated.includes('.')) {
      reject('decimal', message)
    }
    if (type_condition === 'not' && !value_formated.includes('.')) {
      reject('decimal', message)
    }
  }

  function equal(to: any, message: string) {
    if (type_condition === 'is' && value === to) {
      reject('equal', message)
    }
    if (type_condition === 'not' && value !== to) {
      reject('equal', message)
    }
    return valid(value, reject, type_condition)
  }

  return {
    empty,
    decimal,
    equal
  }
}
