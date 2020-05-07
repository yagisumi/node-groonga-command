import { GroongaCommand } from './groonga_command'
import { Constructor, StringPairs } from '../types'

function split_filter_conditions(args: StringPairs) {
  return (args['filter'] || '')
    .split(/(?:&&|&!|\|\|)/)
    .filter((str) => str.length > 0)
    .map((condition) => {
      let cond = condition.trim().replace(/^[\s(]*/g, '')
      if (!cond.match(/\(/)) {
        cond = cond.replace(/[\s)]*$/g, '')
      }
      return cond
    })
}

export function Searchable<TBase extends Constructor<GroongaCommand>>(Base: TBase) {
  return class extends Base {
    get conditions() {
      return split_filter_conditions(this.arguments)
    }
  }
}
