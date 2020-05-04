import { GroongaCommand } from './groonga_command'

export class RequestCancel extends GroongaCommand {
  static readonly command_name = 'request_cancel'
  static readonly parameter_names = [
    'id', //
  ]

  get id(): string | undefined {
    return this.arguments['id']
  }
}

export function isRequestCancel(cmd: GroongaCommand): cmd is RequestCancel {
  return cmd.command_name === RequestCancel.command_name
}

GroongaCommand.CommandList[RequestCancel.command_name] = RequestCancel
