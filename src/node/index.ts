import fs from 'fs'
import readline from 'readline'
import _parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'

const convert = <T>(
  fn: (file: string, lines: AsyncIterable<string>) => Promise<T>
) => (file: string): Promise<T> =>
  fn(file, readline.createInterface(fs.createReadStream(file)))

export const parseFrcsSurveyFile = convert(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convert(_parseFrcsPlotFile)
