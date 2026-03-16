/* eslint-disable no-console */
import chalk from 'chalk'
import { parseFrcsSurveyFile, parseFrcsTripSummaryFile } from '../string/index'
import { summarizeSurvey } from '../survey/summarizeSurvey'
import { formatFrcsTripSummaryFile } from '../formatFrcsTripSummaryFile.js'
import { isDeepStrictEqual } from 'util'
import { readFile } from './readFile'

export async function checkSurveyCorrespondence(
  surveyFile: string,
  summaryFile: string
) {
  const source = await readFile(surveyFile)
  const parsedSurvey = await parseFrcsSurveyFile(surveyFile, source)
  const parsedSummaries = (
    await parseFrcsTripSummaryFile(summaryFile, await readFile(summaryFile), {
      indexBy: 'occurrence',
    })
  ).tripSummaries.sort((a, b) => (a?.tripNumber ?? 0) - (b?.tripNumber ?? 0))
  const convertedSummaries = summarizeSurvey(parsedSurvey, {
    ignoreVerticalOfHShots: true,
  }).tripSummaries.sort((a, b) => (a?.tripNumber ?? 0) - (b?.tripNumber ?? 0))

  let errored = false

  for (
    let i = 0;
    i < Math.max(parsedSummaries.length, convertedSummaries.length);
    i++
  ) {
    const parsed = parsedSummaries[i]
    const converted = convertedSummaries[i]

    const parsedLines = [
      ...formatFrcsTripSummaryFile({ tripSummaries: [parsed] }),
    ].slice(0, 2)
    const convertedLines = [
      ...formatFrcsTripSummaryFile({ tripSummaries: [converted] }),
    ].slice(0, 2)

    if (!isDeepStrictEqual(parsedLines, convertedLines)) {
      errored = true
      console.log(
        convertedLines.map((line) => chalk.green('+' + line)).join('\n')
      )
      console.log(parsedLines.map((line) => chalk.red('-' + line)).join('\n'))
    }
  }
  process.exit(errored ? 1 : 0)
}
