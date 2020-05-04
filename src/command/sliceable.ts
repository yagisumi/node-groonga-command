import { GroongaCommand } from './groonga_command'
import { parse_labeled_drilldowns, Drilldown } from './drilldownable'

type Constructor<T = {}> = new (...args: any[]) => T

type Slice = {
  label: string
  match_columns: string[]
  query?: string
  query_expander?: string
  query_flags: string[]
  filter?: string
  sort_keys: string[]
  output_columns: string[]
  offset?: number
  limit?: number
  labeled_drilldowns: { [name: string]: Drilldown }
}

export function Sliceable<TBase extends Constructor<GroongaCommand>>(Base: TBase) {
  return class extends Base {
    get slices() {
      return this.parse_slices()
    }

    private parse_slices() {
      const raw_slices = Object.create(null)

      Object.keys(this.arguments).forEach((name) => {
        if (name.match(/^slices?\[(.+?)\]\.(.+?)$/)) {
          const label = RegExp.$1
          const parameter_name = RegExp.$2
          if (!(label in raw_slices)) {
            raw_slices[label] = Object.create(null)
          }
          raw_slices[label][parameter_name] = this.arguments[name]
        }
      })

      return this.build_slices(raw_slices)
    }

    private build_slices(raw_slices: any) {
      const slices = Object.create(null) as { [key: string]: Slice }

      Object.keys(raw_slices).forEach((label) => {
        const raw_slice = raw_slices[label]

        const match_columns = this.parse_array_value(raw_slice['match_columns'] || '')
        const query = raw_slice['query']
        const query_expander = raw_slice['query_expander']
        const query_flags = this.parse_flags_value(raw_slice['query_flags'] || '')
        const filter = raw_slice['filter']
        const sort_keys = this.parse_array_value(raw_slice['sort_keys'] || '')
        const output_columns = this.parse_array_value(raw_slice['output_columns'] || '')
        const offset = this.parse_integer_value(raw_slice['offset'] || '')
        const limit = this.parse_integer_value(raw_slice['limit'] || '')
        const labeled_drilldowns = parse_labeled_drilldowns(this.arguments, `slices[${label}].`)

        const slice: Slice = {
          label,
          match_columns,
          query_flags,
          sort_keys,
          output_columns,
          labeled_drilldowns,
        }

        if (query !== undefined) {
          slice.query = query
        }

        if (query_expander !== undefined) {
          slice.query_expander = query_expander
        }

        if (filter !== undefined) {
          slice.filter = filter
        }

        if (offset !== undefined) {
          slice.offset = offset
        }

        if (limit !== undefined) {
          slice.limit = limit
        }

        slices[label] = slice
      })

      return slices
    }
  }
}
