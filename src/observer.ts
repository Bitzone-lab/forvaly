import { TypesState } from './typing'

export default function observer<T>(model: T) {
  const entries: Record<string, TypesState> = {}

  function on(state: TypesState) {
    entries[state.key] = state
  }

  function run(): T {
    if (Object.values(entries).length > 0) {
      throw entries
    }
    return model
  }

  return {
    on,
    run
  }
}
