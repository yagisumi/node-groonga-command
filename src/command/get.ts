import { GroongaCommand } from './groonga_command'

export class Get extends GroongaCommand {
  static readonly command_name = 'get'
  static readonly parameter_names = [
    'table', //
    'key',
    'output_columns',
    'id',
  ]
}

export function isGet(cmd: GroongaCommand): cmd is Get {
  return cmd.command_name === Get.command_name
}

GroongaCommand.CommandList[Get.command_name] = Get
