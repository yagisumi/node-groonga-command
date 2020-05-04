import { GroongaCommand } from './groonga_command'

export class ObjectExist extends GroongaCommand {
  static readonly command_name = 'object_exist'
  static readonly parameter_names = [
    'name', //
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }
}

export function isObjectExist(cmd: GroongaCommand): cmd is ObjectExist {
  return cmd.command_name === ObjectExist.command_name
}

GroongaCommand.CommandList[ObjectExist.command_name] = ObjectExist
