import { GroongaCommand } from './groonga_command'

export class PluginRegister extends GroongaCommand {
  static readonly command_name = 'plugin_register'
  static readonly parameter_names = [
    'name', //
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }
}

export function isPluginRegister(cmd: GroongaCommand): cmd is PluginRegister {
  return cmd.command_name === PluginRegister.command_name
}

GroongaCommand.CommandList[PluginRegister.command_name] = PluginRegister
