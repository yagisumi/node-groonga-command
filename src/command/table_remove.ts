import { GroongaCommand } from './groonga_command'

export class TableRemove extends GroongaCommand {
  static readonly command_name = 'table_remove'
  static readonly parameter_names = [
    'name', //
    'dependent',
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }

  is_dependent() {
    return this.arguments['dependent'] !== 'no'
  }
}

export function isTableRemove(cmd: GroongaCommand): cmd is TableRemove {
  return cmd.command_name === TableRemove.command_name
}

GroongaCommand.CommandList[TableRemove.command_name] = TableRemove
