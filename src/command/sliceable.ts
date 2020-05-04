import { GroongaCommand } from './groonga_command'
import { parse_labeled_drilldowns } from './drilldownable'
import { Slice, Constructor, StringPairs } from '../types'
import { array_value, flags_value, integer_value } from '../utils'

function parse_slices(args: StringPairs) {
  const raw_slices = Object.create(null)

  Object.keys(args).forEach((name) => {
    if (name.match(/^slices?\[(.+?)\]\.(.+?)$/)) {
      const label = RegExp.$1
      const parameter_name = RegExp.$2
      if (!(label in raw_slices)) {
        raw_slices[label] = Object.create(null)
      }
      raw_slices[label][parameter_name] = args[name]
    }
  })

  return build_slices(args, raw_slices)
}

function build_slices(args: StringPairs, raw_slices: any) {
  const slices = Object.create(null) as { [key: string]: Slice }

  Object.keys(raw_slices).forEach((label) => {
    const raw_slice = raw_slices[label]

    const match_columns = array_value(raw_slice, 'match_columns')
    const query = raw_slice['query']
    const query_expander = raw_slice['query_expander']
    const query_flags = flags_value(raw_slice, 'query_flags')
    const filter = raw_slice['filter']
    const sort_keys = array_value(raw_slice, 'sort_keys')
    const output_columns = array_value(raw_slice, 'output_columns')
    const offset = integer_value(raw_slice, 'offset')
    const limit = integer_value(raw_slice, 'limit')
    const labeled_drilldowns = parse_labeled_drilldowns(args, `slices[${label}].`)

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

export function Sliceable<TBase extends Constructor<GroongaCommand>>(Base: TBase) {
  return class extends Base {
    get slices() {
      return parse_slices(this.arguments)
    }
  }
}
