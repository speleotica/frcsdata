/* eslint-disable no-console */
import { parseFrcsSurveyFile } from '../node/index'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'

export async function parseSurvey(file: string) {
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(file)
  )
  console.log(JSON.stringify(parsed))
}
