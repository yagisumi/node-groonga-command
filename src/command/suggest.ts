import { GroongaCommand } from './groonga_command'

export class Suggest extends GroongaCommand {
  static readonly command_name = 'suggest'
  static readonly parameter_names = [
    'types', //
    'table',
    'column',
    'query',
    'sortby',
    'output_columns',
    'offset',
    'limit',
    'frequency_threshold',
    'conditional_probability_threshold',
    'prefix_search',
    'similar_search',
  ]
}

export function isSuggest(cmd: GroongaCommand): cmd is Suggest {
  return cmd.command_name === Suggest.command_name
}

GroongaCommand.CommandList[Suggest.command_name] = Suggest
