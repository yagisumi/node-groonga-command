import { GroongaCommand } from './groonga_command'

export class ColumnCopy extends GroongaCommand {
  static readonly command_name = 'column_copy'
  static readonly parameter_names = [
    'from_table', //
    'from_name',
    'to_table',
    'to_name',
  ]

  get from_table(): string | undefined {
    return this.arguments['from_table']
  }

  get from_name(): string | undefined {
    return this.arguments['from_name']
  }

  get to_table(): string | undefined {
    return this.arguments['to_table']
  }

  get to_name(): string | undefined {
    return this.arguments['to_name']
  }
}

export function isColumnCopy(cmd: GroongaCommand): cmd is ColumnCopy {
  return cmd.command_name === ColumnCopy.command_name
}

GroongaCommand.CommandList[ColumnCopy.command_name] = ColumnCopy
