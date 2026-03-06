import { SourceLoc } from './SourceLoc'

export function underlineSource(
  source: string,
  loc: SourceLoc,
  {
    underlineChar = '^',
    underlineStyle = (s) => s,
  }: { underlineChar?: string; underlineStyle?: (s: string) => string } = {}
) {
  let start = source.lastIndexOf('\n', loc.start.index)
  if (start < 0) start = source.lastIndexOf('\r', loc.start.index)
  if (start < 0) start = -1
  start++

  let end = source.indexOf('\r', loc.end.index)
  if (end < 0) end = source.indexOf('\n', loc.end.index)
  if (end < 0) end = source.length

  const sourcelines = source.substring(start, end).split(/\r\n?|\n/gm)
  const underlineLines = (
    ' '.repeat(loc.start.index - start) +
    source
      .substring(loc.start.index, loc.end.index)
      .replace(/[^\r\n]/g, underlineChar) +
    ' '.repeat(end - loc.end.index)
  )
    .split(/\r\n?|\n/gm)
    .map((line) => underlineStyle(line))

  return sourcelines
    .flatMap((line, index) => [line, underlineLines[index]])
    .join('\n')
}
