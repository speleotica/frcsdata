/* eslint-disable no-console */
import { parseFrcsSurveyFile } from '../node/index'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { unwrapInvalid } from '../unwrapInvalid'

export async function listNames(file: string) {
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(file)
  )
  const names = new Map<string, number>()
  for (const trip of unwrapInvalid(parsed).trips) {
    const { team } = unwrapInvalid(unwrapInvalid(trip).header)
    if (!team) continue
    for (const name of team) {
      names.set(name, (names.get(name) ?? 0) + 1)
    }
  }

  const table = [...names.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  const maxNameCount = table.reduce((max, [, count]) => Math.max(max, count), 0)
  const countLength = maxNameCount.toFixed().length

  for (const [name, count] of table) {
    console.log(count.toFixed().padStart(countLength), name)
  }
}
