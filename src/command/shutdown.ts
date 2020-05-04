import { GroongaCommand } from './groonga_command'

export class Shutdown extends GroongaCommand {
  static readonly command_name = 'shutdown'
  static readonly parameter_names = [
    'mode', //
  ]

  get mode(): string | undefined {
    return this.arguments['mode']
  }
}

export function isShutdown(cmd: GroongaCommand): cmd is Shutdown {
  return cmd.command_name === Shutdown.command_name
}

GroongaCommand.CommandList[Shutdown.command_name] = Shutdown
