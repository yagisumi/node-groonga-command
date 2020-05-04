import { GroongaCommand } from './groonga_command'

export class ObjectRemove extends GroongaCommand {
  static readonly command_name = 'object_remove'
  static readonly parameter_names = [
    'name', //
    'force',
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }

  is_force() {
    return this.boolean_value('force', false, false)
  }
}

export function isObjectRemove(cmd: GroongaCommand): cmd is ObjectRemove {
  return cmd.command_name === ObjectRemove.command_name
}

GroongaCommand.CommandList[ObjectRemove.command_name] = ObjectRemove
