/* eslint-disable no-console */
import fs from 'fs/promises'
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import chalk from 'chalk'
import { formatIssues } from '../formatIssues.js'

export async function checkSurvey(file: string) {
  const source = await fs.readFile(file, 'utf8')
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
