import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

async function* linesOf(s: string): AsyncIterable<string> {
  yield* s.split(/\r\n?|\n/gm)
}
const convert =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, str: string, ...rest: Rest): Promise<T> =>
    fn(file, linesOf(str), ...rest)

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile)
