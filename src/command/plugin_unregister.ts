import { GroongaCommand } from './groonga_command'

export class PluginUnregister extends GroongaCommand {
  static readonly command_name = 'plugin_unregister'
  static readonly parameter_names = [
    'name', //
  ]

  get name(): string | undefined {
    return this.arguments['name']
  }
}

export function isPluginUnregister(cmd: GroongaCommand): cmd is PluginUnregister {
  return cmd.command_name === PluginUnregister.command_name
}

GroongaCommand.CommandList[PluginUnregister.command_name] = PluginUnregister
