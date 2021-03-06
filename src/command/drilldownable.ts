import { GroongaCommand } from './groonga_command'
import { Drilldown, Constructor } from '../types'
import { escapePattern, array_value, parse_array_value, parse_integer_value, integer_value } from '../utils'

export function parse_labeled_drilldowns(args: { [key: string]: string }, prefix = '') {
  const raw_labeled_drilldowns = Object.create(null)
  const re_drilldowns = new RegExp(`^${escapePattern(prefix)}drilldowns?\\[(.+?)\\]\\.(.+?)$`)

  Object.keys(args).forEach((name) => {
    if (name.match(re_drilldowns)) {
      const label = RegExp.$1
      const parameter_name = RegExp.$2
      if (!(label in raw_labeled_drilldowns)) {
        raw_labeled_drilldowns[label] = Object.create(null)
      }
      raw_labeled_drilldowns[label][parameter_name] = args[name]
    }
  })

  return build_labeled_drilldowns(raw_labeled_drilldowns)
}

function build_labeled_drilldowns(raw_labeled_drilldowns: any) {
  const labeled_drilldowns = Object.create(null) as { [key: string]: Drilldown }

  Object.keys(raw_labeled_drilldowns).forEach((label) => {
    const raw_drilldown = raw_labeled_drilldowns[label]
    const keys = parse_array_value(raw_drilldown['keys'] || '')
    const sort_keys = parse_array_value(raw_drilldown['sort_keys'] || raw_drilldown['sortby'] || '')
    const output_columns = parse_array_value(raw_drilldown['output_columns'] || '')
    const offset = parse_integer_value(raw_drilldown['offset'] || '')
    const limit = parse_integer_value(raw_drilldown['limit'] || '')
    const calc_types = parse_array_value(raw_drilldown['calc_types'] || '')
    const calc_target = raw_drilldown['calc_target']
    const filter = raw_drilldown['filter']

    const drilldown: Drilldown = {
      keys,
      sort_keys,
      output_columns,
      calc_types,
      label,
    }

    if (offset !== undefined) {
      drilldown.offset = offset
    }

    if (limit !== undefined) {
      drilldown.limit = limit
    }

    if (calc_target !== undefined) {
      drilldown.calc_target = calc_target
    }

    if (filter !== undefined) {
      drilldown.filter = filter
    }

    labeled_drilldowns[label] = drilldown
  })

  return labeled_drilldowns
}

export function Drilldownable<TBase extends Constructor<GroongaCommand>>(Base: TBase) {
  return class extends Base {
    get drilldown(): string | undefined {
      return this.arguments['drilldown']
    }

    get drilldowns() {
      return array_value(this.arguments, 'drilldown')
    }

    get drilldown_filter(): string | undefined {
      return this.arguments['drilldown_filter']
    }

    get drilldown_sortby(): string | undefined {
      return this.arguments['drilldown_sortby']
    }

    get drilldown_sort_keys() {
      return parse_array_value(this.arguments['drilldown_sort_keys'] ?? this.arguments['drilldown_sortby'] ?? '')
    }

    get drilldown_output_columns() {
      return array_value(this.arguments, 'drilldown_output_columns')
    }

    get drilldown_offset() {
      return integer_value(this.arguments, 'drilldown_offset')
    }

    get drilldown_limit() {
      return integer_value(this.arguments, 'drilldown_limit')
    }

    get drilldown_calc_types(): string | undefined {
      return this.arguments['drilldown_calc_types']
    }

    get drilldown_calc_target(): string | undefined {
      return this.arguments['drilldown_calc_target']
    }

    get labeled_drilldowns() {
      return parse_labeled_drilldowns(this.arguments, '')
    }
  }
}
