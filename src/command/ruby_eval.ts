import { GroongaCommand } from './groonga_command'

export class RubyEval extends GroongaCommand {
  static readonly command_name = 'ruby_eval'
  static readonly parameter_names = [
    'script', //
  ]

  get script(): string | undefined {
    return this.arguments['script']
  }
}

export function isRubyEval(cmd: GroongaCommand): cmd is RubyEval {
  return cmd.command_name === RubyEval.command_name
}

GroongaCommand.CommandList[RubyEval.command_name] = RubyEval
