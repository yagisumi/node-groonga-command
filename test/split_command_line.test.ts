import { splitCommandLine, CommandLineScanner } from '@/split_command_line'

describe('CommandLineScanner', () => {
  test('pos and methods', () => {
    const str = 'aaa   "bbb"\n \nccc'
    const scanner = new CommandLineScanner(str)
    expect(scanner.pos).toBe(0)
    expect(scanner.skip_spaces()).toBeUndefined()
    expect(scanner.scan_nonspaces()).toBe('aaa')
    expect(scanner.skip_spaces()).toBe('   ')
    expect(scanner.scan_quote()).toBe('"')
    expect(scanner.scan_until('"')).toBe('bbb"')
    expect(scanner.pos).toBe(11)
    expect(scanner.skip_spaces()).toBe('\n \n')
    expect(scanner.is_end()).toBe(false)
    scanner.terminate()
    expect(scanner.is_end()).toBe(true)
    expect(scanner.pos).toBe(str.length)
  })
})

describe('splitCommandLine', () => {
  test('name only', () => {
    expect(splitCommandLine('status')).toEqual(['status'])
  })

  test('empty string', () => {
    expect(splitCommandLine('')).toEqual([])
  })

  test('unescape', () => {
    expect(splitCommandLine('"\\b\\f\\n\\r\\t"')).toEqual(['\b\f\n\r\t'])
  })

  test.each([
    [['select', 'Logs'], 'select Logs'],
    [['select', '--table', 'Logs'], 'select --table Logs'],
    [['select', 'テーブル'], 'select テーブル'],
  ])('arguments with no quote', (expected, line) => {
    expect(splitCommandLine(line)).toEqual(expected)
  })

  test.each([
    [['select', 'Logs'], "select 'Logs'"],
    [['select', '--table', 'Logs'], "select '--table' 'Logs'"],
    [['select', 'Logs Table'], "select 'Logs Table'"],
    [['select', "Logs ' Table"], "select 'Logs \\' Table'"],
    [['select', 'Logs \n Table'], "select 'Logs \\n Table'"],
    [['select', "'Logs content"], "select 'Logs content"],
  ])('arguments with single quote', (expected, line) => {
    expect(splitCommandLine(line)).toEqual(expected)
  })

  test.each([
    [['select', 'Logs'], 'select "Logs"'],
    [['select', '--table', 'Logs'], 'select "--table" "Logs"'],
    [['select', 'Logs Table'], 'select "Logs Table"'],
    [['select', 'Logs " Table'], 'select "Logs \\" Table"'],
    [['select', 'Logs \n Table'], 'select "Logs \\n Table"'],
    [['select', '"Logs content'], 'select "Logs content'],
  ])('arguments with double quote', (expected, line) => {
    expect(splitCommandLine(line)).toEqual(expected)
  })
})
