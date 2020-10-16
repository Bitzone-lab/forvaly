import Types from '../management/Types'

export default interface ForvalyInterface<T> {
  field<K extends keyof T>(fieldname: K): Types
  run(): boolean
}
