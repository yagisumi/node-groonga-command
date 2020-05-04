import { GroongaCommand } from './groonga_command'

export class ColumnRemove extends GroongaCommand {
  static readonly command_name = 'column_remove'
  static readonly parameter_names = [
    'table', //
    'name',
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }

  get table(): string | undefined {
    return this.arguments['table']
  }
}

export function isColumnRemove(cmd: GroongaCommand): cmd is ColumnRemove {
  return cmd.command_name === ColumnRemove.command_name
}

GroongaCommand.CommandList[ColumnRemove.command_name] = ColumnRemove
