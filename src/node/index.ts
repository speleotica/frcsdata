import fs from 'fs'
import readline from 'readline'
import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

const convert =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, ...rest: Rest): Promise<T> =>
    fn(file, readline.createInterface(fs.createReadStream(file)), ...rest)

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile)
