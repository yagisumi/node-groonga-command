import { GroongaCommand } from './groonga_command'
import { Searchable } from './searchable'

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
    return this.integer_value('offset')
  }

  get limit() {
    return this.integer_value('limit')
  }

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get output_columns() {
    return this.array_value('output_columns')
  }
}

export function isRangeFilter(cmd: GroongaCommand): cmd is RangeFilter {
  return cmd.command_name === RangeFilter.command_name
}

GroongaCommand.CommandList[RangeFilter.command_name] = RangeFilter
