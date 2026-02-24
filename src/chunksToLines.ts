export async function* chunksToLines(
  chunks: Iterable<string> | AsyncIterable<string>
) {
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
      yield { line, startIndex: chunkStartIndex + end }
      end = match.index + match[0].length
    }
    if (end < chunk.length) remainder = chunk.substring(end)
    chunkStartIndex += end
    prevChunkEndedWithCarriageReturn = chunk[chunk.length - 1] === '\r'
  }
  if (remainder) yield { line: remainder, startIndex: chunkStartIndex }
}
