/* eslint-disable no-console */
import { parseFrcsSurveyFile } from '../string/index'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { readFile } from './readFile'

export async function parseSurvey(file: string) {
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(file, await readFile(file))
  )
  console.log(JSON.stringify(parsed))
}
