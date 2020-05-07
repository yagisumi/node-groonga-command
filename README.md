# @yagisumi/groonga-command

This package is a port of [groonga-command](https://github.com/groonga/groonga-command) and [groonga-command-parser](https://github.com/groonga/groonga-command-parser)

[![NPM version][npm-image]][npm-url] [![install size][packagephobia-image]][packagephobia-url] [![DefinitelyTyped][dts-image]][dts-url]  
[![Build Status][githubactions-image]][githubactions-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Installation

```sh
$ npm i @yagisumi/groonga-command
```

## Usage

- typescript

```ts
import { createCommand, TypeGuards, parseCommand } from '@yagisumi/groonga-command'

const command = createCommand('select', { table: 'Users' })
console.log(command.command_name) // 'select'
if (TypeGuards.isSelect(command)) {
  console.log(command.table) // 'Users'
}

const table_create = parseCommand('table_create Paths TABLE_HASH_KEY|KEY_LARGE ShortText')
if (table_create) {
  console.log(table_create.arguments)
  // {
  //   name: 'Paths',
  //   flags: 'TABLE_HASH_KEY|KEY_LARGE',
  //   key_type: 'ShortText',
  // }
}
```

## API

### createCommand
```ts
function createCommand(
  command_name: string, 
  pair_arguments: { [name: string]: string }, 
  ordered_arguments?: string[]
): GroongaCommand
```

Creates a command object.<br>
Same as `new GroongaCommand(command_name, pair_arguments, ordered_arguments)`

### parseCommand

```ts
function parseCommand(
  command_line: string,
  options?: { [key: string]: string | number } // Overwrite arguments
): GroongaCommand | undefined
```

Returns GroongaCommand if parsing is successful, otherwise returns undefined.<br>


## License

[MIT License](https://opensource.org/licenses/MIT)

[githubactions-image]: https://img.shields.io/github/workflow/status/yagisumi/node-groonga-command/build?logo=github&style=flat-square
[githubactions-url]: https://github.com/yagisumi/node-groonga-command/actions
[npm-image]: https://img.shields.io/npm/v/@yagisumi/groonga-command.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@yagisumi/groonga-command
[packagephobia-image]: https://flat.badgen.net/packagephobia/install/@yagisumi/groonga-command
[packagephobia-url]: https://packagephobia.now.sh/result?p=@yagisumi/groonga-command
[travis-image]: https://img.shields.io/travis/yagisumi/node-groonga-command.svg?style=flat-square
[travis-url]: https://travis-ci.org/yagisumi/node-groonga-command
[appveyor-image]: https://img.shields.io/appveyor/ci/yagisumi/node-groonga-command.svg?logo=appveyor&style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/yagisumi/node-groonga-command
[coveralls-image]: https://img.shields.io/coveralls/yagisumi/node-groonga-command.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/yagisumi/node-groonga-command?branch=master
[dts-image]: https://img.shields.io/badge/DefinitelyTyped-.d.ts-blue.svg?style=flat-square
[dts-url]: http://definitelytyped.org
