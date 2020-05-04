import { GroongaCommand } from './groonga_command'

type Constructor<T = {}> = new (...args: any[]) => T

export function Searchable<TBase extends Constructor<GroongaCommand>>(Base: TBase) {
  return class extends Base {
    get conditions() {
      return this.split_filter_conditions()
    }

    private split_filter_conditions() {
      return (this.arguments['filter'] || '')
        .split(/(?:&&|&!|\|\|)/)
        .filter((str) => str.length > 0)
        .map((condition) => {
          let cond = condition.trim().replace(/^[\s\(]*/g, '')
          if (!cond.match(/\(/)) {
            cond = cond.replace(/[\s\)]*$/g, '')
          }
          return cond
        })
    }
  }
}
