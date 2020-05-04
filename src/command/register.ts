import { GroongaCommand } from './groonga_command'

export class Register extends GroongaCommand {
  static readonly command_name = 'register'
  static readonly parameter_names = [
    'path', //
  ]

  get path(): string | undefined {
    return this.arguments['path']
  }
}

export function isRegister(cmd: GroongaCommand): cmd is Register {
  return cmd.command_name === Register.command_name
}

GroongaCommand.CommandList[Register.command_name] = Register
