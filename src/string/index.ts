import _parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

async function* linesOf(s: string): AsyncIterable<string> {
  yield* s.split(/\r\n?|\n/gm)
}
const convertLineBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, str: string, ...rest: Rest): Promise<T> =>
    fn(file, linesOf(str), ...rest)

const convertChunkBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: Iterable<string> | AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, str: string, ...rest: Rest): Promise<T> =>
    fn(file, [str], ...rest)

export const parseFrcsSurveyFile = convertChunkBased(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convertLineBased(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convertLineBased(
  _parseFrcsTripSummaryFile
)
