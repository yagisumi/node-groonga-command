import { GroongaCommand } from './groonga_command'
import { Drilldownable } from './drilldownable'
import { Searchable } from './searchable'
import { Sliceable } from './sliceable'
import { array_value, parse_array_value, integer_value } from '../utils'

export class LogicalSelect extends Sliceable(Searchable(Drilldownable(GroongaCommand))) {
  static readonly command_name = 'logical_select'
  static readonly parameter_names = [
    'logical_table', //
    'shard_key',
    'min',
    'min_border',
    'max',
    'max_border',
    'filter',
    'sortby',
    'output_columns',
    'offset',
    'limit',
    'drilldown',
    'drilldown_sortby',
    'drilldown_output_columns',
    'drilldown_offset',
    'drilldown_limit',
    'drilldown_calc_types',
    'drilldown_calc_target',
    'sort_keys',
    'drilldown_sort_keys',
    'match_columns',
    'query',
    'drilldown_filter',
    'load_table',
    'load_columns',
    'load_values',
  ]

  get logical_table(): string | undefined {
    return this.arguments['logical_table']
  }

  get shard_key(): string | undefined {
    return this.arguments['shard_key']
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

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get sortby(): string | undefined {
    return this.arguments['sortby']
  }

  get output_columns() {
    return array_value(this.arguments, 'output_columns')
  }

  get offset() {
    return integer_value(this.arguments, 'offset')
  }

  get limit() {
    return integer_value(this.arguments, 'limit')
  }

  get sort_keys() {
    return parse_array_value(this.arguments['sort_keys'] ?? this.arguments['sortby'] ?? '')
  }
}

export function isLogicalSelect(cmd: GroongaCommand): cmd is LogicalSelect {
  return cmd.command_name === LogicalSelect.command_name
}

GroongaCommand.CommandList[LogicalSelect.command_name] = LogicalSelect
