import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

class LinesTransform extends TransformStream<string> {
  parts: string[] = []

  constructor() {
    super({
      transform: (chunk, controller) => {
        let end = 0
        for (const match of chunk.matchAll(/\r\n?|\n/gm)) {
          this.parts.push(chunk.substring(end, match.index))
          controller.enqueue(this.parts.join(''))
          this.parts.length = 0
          end = match.index + match[0].length
        }
      },
      flush: (controller) => {
        if (this.parts.length) {
          controller.enqueue(this.parts.join(''))
          this.parts.length = 0
        }
      },
    })
  }
}

function linesOf(
  input: Blob | ReadableStream<Uint8Array>
): AsyncIterable<string> {
  // @ts-expect-error missing async iterable type defs
  return (input instanceof ReadableStream ? input : input.stream())
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new LinesTransform())
}

const convert = <T>(
  fn: (file: string, lines: AsyncIterable<string>) => Promise<T>
) => {
  function converted(file: File): Promise<T>
  function converted(
    file: string,
    input: Blob | ReadableStream<Uint8Array>
  ): Promise<T>
  function converted(
    file: string | File,
    input?: Blob | ReadableStream<Uint8Array>
  ): Promise<T> {
    if (file instanceof File) return converted(file.name, file)
    return fn(file, linesOf(input!))
  }
  return converted
}

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile)
