import { GroongaCommand } from './groonga_command'

export class IOFlush extends GroongaCommand {
  static readonly command_name = 'io_flush'
  static readonly parameter_names = [
    'target_name', //
    'recursive',
  ]

  get target_name(): string | undefined {
    return this.arguments['target_name']
  }

  is_recursive() {
    return this.arguments['recursive'] !== 'no'
  }
}

export function isIOFlush(cmd: GroongaCommand): cmd is IOFlush {
  return cmd.command_name === IOFlush.command_name
}

GroongaCommand.CommandList[IOFlush.command_name] = IOFlush
