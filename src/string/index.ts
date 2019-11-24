import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'

async function* linesOf(s: string): AsyncIterable<string> {
  yield* s.split(/\r\n?|\n/gm)
}
const convert = <T>(
  fn: (file: string, lines: AsyncIterable<string>) => Promise<T>
) => (file: string, str: string): Promise<T> => fn(file, linesOf(str))

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
