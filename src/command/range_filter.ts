import { GroongaCommand } from './groonga_command'
import { Searchable } from './searchable'
import { integer_value, array_value } from '../utils'

export class RangeFilter extends Searchable(GroongaCommand) {
  static readonly command_name = 'range_filter'
  static readonly parameter_names = [
    'table', //
    'column',
    'min',
    'min_border',
    'max',
    'max_border',
    'offset',
    'limit',
    'filter',
    'output_columns',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  get column(): string | undefined {
    return this.arguments['column']
  }
  get min(): string | undefined {
    return this.arguments['min']
  }

  get min_border(): string | undefined {
    return this.arguments['min_border']
  }

  get max(): string | undefined {
    return this.arguments['max']
  }

  get max_border(): string | undefined {
    return this.arguments['max_border']
  }

  get offset() {
    return integer_value(this.arguments, 'offset')
  }

  get limit() {
    return integer_value(this.arguments, 'limit')
  }

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get output_columns() {
    return array_value(this.arguments, 'output_columns')
  }
}

export function isRangeFilter(cmd: GroongaCommand): cmd is RangeFilter {
  return cmd.command_name === RangeFilter.command_name
}

GroongaCommand.CommandList[RangeFilter.command_name] = RangeFilter
