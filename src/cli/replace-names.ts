/* eslint-disable no-console */
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import { replaceRanges } from '../replaceRanges'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { unwrapInvalid } from '../unwrapInvalid'
import { readFile } from 'fs/promises'

export async function replaceSurveyNames(
  surveyFile: string,
  replacementsFile: string
) {
  const source = await readFile(surveyFile, 'utf8')
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(surveyFile, [source], {
      normalizeNames: false,
      includeLocs: true,
    })
  )
  const nameReplacements = new Map<string, string>()
  for (const line of (await readFile(replacementsFile, 'utf8')).split(
    /\r\n?|\n/gm
  )) {
    const match = /^\s*(.+)\s*=>\s*(.+)\s*$/.exec(line)
    if (match) {
      nameReplacements.set(match[1].trim(), match[2].trim())
    }
  }

  const replacements: { start: number; end: number; value: string }[] = []
  for (const trip of unwrapInvalid(parsed).trips) {
    const { team, locs: { team: teamLocs } = {} } = unwrapInvalid(
      unwrapInvalid(trip).header
    )
    if (!team || !teamLocs) continue
    for (let i = 0; i < team.length; i++) {
      const replacement = nameReplacements.get(team[i])
      if (replacement && teamLocs[i]) {
        replacements.push({
          start: teamLocs[i].start.index,
          end: teamLocs[i].end.index,
          value: replacement,
        })
      }
    }
  }

  process.stdout.write(replaceRanges(source, replacements))
}
