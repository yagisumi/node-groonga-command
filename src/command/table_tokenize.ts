import { GroongaCommand } from './groonga_command'
import { flags_value } from '../utils'

export class TableTokenize extends GroongaCommand {
  static readonly command_name = 'table_tokenize'
  static readonly parameter_names = [
    'table', //
    'string',
    'flags',
    'mode',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }

  get string(): string | undefined {
    return this.arguments['string']
  }

  get flags() {
    return flags_value(this.arguments, 'flags')
  }

  get mode(): string | undefined {
    return this.arguments['mode']
  }
}

export function isTableTokenize(cmd: GroongaCommand): cmd is TableTokenize {
  return cmd.command_name === TableTokenize.command_name
}

GroongaCommand.CommandList[TableTokenize.command_name] = TableTokenize
