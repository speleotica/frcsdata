/* eslint-disable no-console */
import { readFile } from './readFile'
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import chalk from 'chalk'
import { formatIssues } from '../formatIssues.js'

export async function checkSurvey(file: string) {
  const source = await readFile(file)
  const parsed = await parseFrcsSurveyFile(file, [source])

  const issues = parsed.issues || []
  console.log(
    formatIssues({
      file,
      source,
      parsed,
      errorStyle: chalk.red,
      warningStyle: chalk.yellow,
    })
  )

  process.exit(issues.some((i) => i.type === 'error') ? 1 : 0)
}
