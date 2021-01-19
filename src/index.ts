import observer from './observer'
import Types from './types'
import { Valii } from './typing'

export default function valii<T>(model: T): Valii<T> {
  const { on, run } = observer(model)

  const list: any = {}
  for (const [key, value] of Object.entries(model)) {
    list[key] = new Types(key, value, on)
  }

  list.__run__ = run

  return list
}
