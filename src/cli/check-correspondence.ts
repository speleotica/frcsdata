/* eslint-disable no-console */
import chalk from 'chalk'
import { parseFrcsSurveyFile } from '../string/index'
import fs from 'fs/promises'
import { summarizeSurvey } from '../survey/summarizeSurvey'
import { parseFrcsTripSummaryFile } from '../node/index.js'
import { formatFrcsTripSummaryFile } from '../formatFrcsTripSummaryFile.js'
import { isDeepStrictEqual } from 'util'

export async function checkSurveyCorrespondence(
  surveyFile: string,
  summaryFile: string
) {
  const source = await fs.readFile(surveyFile, 'utf8')
  const parsedSurvey = await parseFrcsSurveyFile(surveyFile, source)
  const parsedSummaries = (
    await parseFrcsTripSummaryFile(summaryFile, { indexBy: 'occurrence' })
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
