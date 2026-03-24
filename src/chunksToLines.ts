export function chunksToLines(
  chunks: Iterable<string> | AsyncIterable<string>,
  options: { includeStartIndex: true }
): AsyncIterable<{ line: string; startIndex: number }>
export function chunksToLines(
  chunks: Iterable<string> | AsyncIterable<string>,
  options?: { includeStartIndex?: false }
): AsyncIterable<string>
export async function* chunksToLines(
  chunks: Iterable<string> | AsyncIterable<string>,
  options?: { includeStartIndex?: boolean }
): AsyncIterable<string | { line: string; startIndex: number }> {
  let chunkStartIndex = 0
  let remainder = ''
  let prevChunkEndedWithCarriageReturn = false
  for await (let chunk of chunks) {
    if (!chunk.length) continue
    if (remainder) {
      chunk = remainder + chunk
      remainder = ''
    }
    let end = prevChunkEndedWithCarriageReturn && chunk[0] === '\n' ? 1 : 0
    const rx = /\r\n?|\n/gm
    rx.lastIndex = end
    for (const match of chunk.matchAll(rx)) {
      const line = chunk.substring(end, match.index)
      yield options?.includeStartIndex
        ? { line, startIndex: chunkStartIndex + end }
        : line
      end = match.index + match[0].length
    }
    if (end < chunk.length) remainder = chunk.substring(end)
    chunkStartIndex += end
    prevChunkEndedWithCarriageReturn = chunk[chunk.length - 1] === '\r'
  }
  if (remainder)
    yield options?.includeStartIndex
      ? { line: remainder, startIndex: chunkStartIndex }
      : remainder
}
