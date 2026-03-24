import { describe, it } from 'mocha'
import { expect } from 'chai'
import { chunksToLines } from '../src/chunksToLines'
import { slurp } from './slurp'
import dedent from 'dedent-js'

describe(`chunksToLines`, function () {
  it(`empty string`, async function () {
    expect(
      await slurp(chunksToLines('', { includeStartIndex: true }))
    ).to.deep.equal([])
  })
  it(`single newline`, async function () {
    expect(
      await slurp(chunksToLines('\n', { includeStartIndex: true }))
    ).to.deep.equal([{ line: '', startIndex: 0 }])
  })
  it(`newline space`, async function () {
    expect(
      await slurp(chunksToLines('\n ', { includeStartIndex: true }))
    ).to.deep.equal([
      { line: '', startIndex: 0 },
      { line: ' ', startIndex: 1 },
    ])
  })
  it(`single line without terminator`, async function () {
    expect(
      await slurp(chunksToLines('blah', { includeStartIndex: true }))
    ).to.deep.equal([{ line: 'blah', startIndex: 0 }])
  })
  it(`single line with terminator`, async function () {
    expect(
      await slurp(chunksToLines('blah\n', { includeStartIndex: true }))
    ).to.deep.equal([{ line: 'blah', startIndex: 0 }])
    expect(
      await slurp(chunksToLines('blah\r', { includeStartIndex: true }))
    ).to.deep.equal([{ line: 'blah', startIndex: 0 }])
    expect(
      await slurp(chunksToLines('blah\r\n', { includeStartIndex: true }))
    ).to.deep.equal([{ line: 'blah', startIndex: 0 }])
  })
  it(`single chunk`, async function () {
    expect(
      await slurp(
        chunksToLines(
          [
            dedent`
            foo bar
            baz qux\r
            \r
            glormp
          `,
          ],
          { includeStartIndex: true }
        )
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`split at the beginning of a line`, async function () {
    expect(
      await slurp(
        chunksToLines(['foo bar\n', 'baz qux\r\n', '\r\n', 'glormp'], {
          includeStartIndex: true,
        })
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`split before the line terminators`, async function () {
    expect(
      await slurp(
        chunksToLines(['foo bar', '\nbaz qux', '\r\n\r\n', 'glormp'], {
          includeStartIndex: true,
        })
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`split in the middle of an \\r\\n`, async function () {
    expect(
      await slurp(
        chunksToLines(['foo bar\nbaz qux\r', '\n\r\nglormp'], {
          includeStartIndex: true,
        })
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`empty chunks in the middle of \\r\\n`, async function () {
    expect(
      await slurp(
        chunksToLines(['foo bar\nbaz qux\r', '', '', '\n\r\nglormp'], {
          includeStartIndex: true,
        })
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`more \\r\\n edge cases`, async function () {
    expect(
      await slurp(
        chunksToLines(['foo bar\nbaz qux\r', '', '', '\n\r', '\nglormp'], {
          includeStartIndex: true,
        })
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`split in middle of line`, async function () {
    expect(
      await slurp(
        chunksToLines(
          [
            dedent`
            foo bar
            baz q
          `,
            dedent`
            ux\r
            \r
            glormp
          `,
          ],
          { includeStartIndex: true }
        )
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
  it(`split in middle of line 2`, async function () {
    expect(
      await slurp(
        chunksToLines(
          [
            dedent`
            foo bar
            baz q
          `,
            'u',
            dedent`
            x\r
            \r
            glormp
          `,
          ],
          { includeStartIndex: true }
        )
      )
    ).to.deep.equal([
      { line: 'foo bar', startIndex: 0 },
      { line: 'baz qux', startIndex: 'foo bar\n'.length },
      { line: '', startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length },
      {
        line: 'glormp',
        startIndex: 'foo bar\n'.length + 'baz qux\r\n'.length + '\r\n'.length,
      },
    ])
  })
})
