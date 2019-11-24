import { FrcsSurveyFile } from '..'
import parseFrcsSurveyFile from '../parseFrcsSurveyFile'
import readline from 'readline'
import fs from 'fs'

export default async function nodeParseFrcsSurveyFile(
  file: string
): Promise<FrcsSurveyFile> {
  return await parseFrcsSurveyFile(
    file,
    readline.createInterface(fs.createReadStream(file))
  )
}
