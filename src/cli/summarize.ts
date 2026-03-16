/* eslint-disable no-console */
import chalk from 'chalk'
import { formatIssues } from '../formatIssues'
import { parseFrcsSurveyFile } from '../string/index'
import { formatFrcsTripSummaryFile } from '../formatFrcsTripSummaryFile'
import { summarizeSurvey as baseSummarizeSurvey } from '../survey/summarizeSurvey'
import { readFile } from './readFile'

export async function summarizeSurvey(file: string) {
  const source = await readFile(file)
  const parsed = await parseFrcsSurveyFile(file, source)
  if ('INVALID' in parsed) {
    console.log(
      formatIssues({
        file,
        source,
        parsed,
        errorStyle: chalk.red,
        warningStyle: chalk.yellow,
      })
    )
    process.exit(1)
  }

  for (const line of formatFrcsTripSummaryFile(baseSummarizeSurvey(parsed))) {
    console.log(line)
  }
}
