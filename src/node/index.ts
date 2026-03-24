import fs from 'fs'
import _parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import _parseFrcsPlotFile from '../parseFrcsPlotFile'
import _parseFrcsTripSummaryFile from '../parseFrcsTripSummaryFile'
import { Readable } from 'stream'
import { TextDecoderStream } from 'stream/web'
import { chunksToLines } from '../chunksToLines'

const convertLineBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, ...rest: Rest): Promise<T> =>
    fn(
      file,
      chunksToLines(
        Readable.toWeb(fs.createReadStream(file)).pipeThrough(
          new TextDecoderStream('windows-1252')
        )
      ),
      ...rest
    )

const convertChunkBased =
  <T, Rest extends any[]>(
    fn: (
      file: string,
      lines: AsyncIterable<string>,
      ...rest: Rest
    ) => Promise<T>
  ) =>
  (file: string, ...rest: Rest): Promise<T> =>
    fn(
      file,
      Readable.toWeb(fs.createReadStream(file)).pipeThrough(
        new TextDecoderStream('windows-1252')
      ),
      ...rest
    )

export const parseFrcsSurveyFile = convertChunkBased(_parseFrcsSurveyFile)
export const parseFrcsPlotFile = convertLineBased(_parseFrcsPlotFile)
export const parseFrcsTripSummaryFile = convertLineBased(
  _parseFrcsTripSummaryFile
)
