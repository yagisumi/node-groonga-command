import { GroongaCommand } from './groonga_command'

export class Delete extends GroongaCommand {
  static readonly command_name = 'delete'
  static readonly parameter_names = [
    'table', //
    'key',
    'id',
    'filter',
  ]

  get table(): string | undefined {
    return this.arguments['table']
  }
}

export function isDelete(cmd: GroongaCommand): cmd is Delete {
  return cmd.command_name === Delete.command_name
}

GroongaCommand.CommandList[Delete.command_name] = Delete
