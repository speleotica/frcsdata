import fs from 'fs'
import readline from 'readline'
import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'

const convert = <T>(
  fn: (file: string, lines: AsyncIterable<string>) => Promise<T>
) => (file: string): Promise<T> =>
  fn(file, readline.createInterface(fs.createReadStream(file)))

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convert(_parseFrcsTripSummaryFile)
