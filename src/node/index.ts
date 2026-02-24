import fs from 'fs'
import readline from 'readline'
import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

const convertLineBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, ...rest: Rest): Promise<T> =>
    fn(file, readline.createInterface(fs.createReadStream(file)), ...rest)

const convertChunkBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, ...rest: Rest): Promise<T> =>
    fn(file, fs.createReadStream(file, 'utf8'), ...rest)

export const parseFrcsSurveyFile = convertChunkBased(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convertLineBased(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convertLineBased(
  _parseFrcsTripSummaryFile
)
