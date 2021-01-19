import Types from './types'

export type Valii<T> = { [P in keyof T]: Types<T[keyof T]> } & { __run__: () => T }

export type TypeValue = null | 'number' | 'string' | 'bool' | 'array' | 'object'

export interface TypesState {
  key: string
  type: TypeValue
  error_type: boolean
  error_valid: boolean
  message: string | null
}

export type ErrorValid = 'empty' | 'decimal' | 'equal'
