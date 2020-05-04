import { GroongaCommand } from './groonga_command'
import { Drilldownable } from './drilldownable'
import { Searchable } from './searchable'
import { Sliceable } from './sliceable'
import { array_value, parse_array_value } from '../utils'

export class Select extends Sliceable(Searchable(Drilldownable(GroongaCommand))) {
  static readonly command_name = 'select'
  static readonly parameter_names = [
    'table', //
    'match_columns',
    'query',
    'filter',
    'scorer',
    'sortby',
    'output_columns',
    'offset',
    'limit',
    'drilldown',
    'drilldown_sortby',
    'drilldown_output_columns',
    'drilldown_offset',
    'drilldown_limit',
    'cache',
    'match_escalation_threshold',
    'query_expansion',
    'query_flags',
    'query_expander',
    'adjuster',
    'drilldown_calc_types',
    'drilldown_calc_target',
    'drilldown_filter',
    'sort_keys',
    'drilldown_sort_keys',
  ]

  get sortby(): string | undefined {
    return this.arguments['sortby']
  }

  get sort_keys() {
    return parse_array_value(this.arguments['sort_keys'] ?? this.arguments['sortby'] ?? '')
  }

  get scorer(): string | undefined {
    return this.arguments['scorer']
  }

  get filter(): string | undefined {
    return this.arguments['filter']
  }

  get query(): string | undefined {
    return this.arguments['query']
  }

  get output_columns() {
    return array_value(this.arguments, 'output_columns')
  }
}

export function isSelect(cmd: GroongaCommand): cmd is Select {
  return cmd.command_name === Select.command_name
}

GroongaCommand.CommandList[Select.command_name] = Select
