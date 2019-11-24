export default async function* linesOf(s: string): AsyncIterable<string> {
  yield* s.split(/\r\n?|\n/gm)
}
