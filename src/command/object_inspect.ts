import { GroongaCommand } from './groonga_command'

export class ObjectInspect extends GroongaCommand {
  static readonly command_name = 'object_inspect'
  static readonly parameter_names = [
    'name', //
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }
}

export function isObjectInspect(cmd: GroongaCommand): cmd is ObjectInspect {
  return cmd.command_name === ObjectInspect.command_name
}

GroongaCommand.CommandList[ObjectInspect.command_name] = ObjectInspect
