/* eslint-disable no-console */
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import { replaceRanges } from '../replaceRanges'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { unwrapInvalid } from '../unwrapInvalid'
import { readFile } from 'fs/promises'
import { parseNamesFile } from './parseNamesFile'

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
  const names = await parseNamesFile(await readFile(replacementsFile, 'utf8'))

  const replacements: { start: number; end: number; value: string }[] = []
  for (const trip of unwrapInvalid(parsed).trips) {
    const { team, locs: { team: teamLocs } = {} } = unwrapInvalid(
      unwrapInvalid(trip).header
    )
    if (!team || !teamLocs) continue
    for (let i = 0; i < team.length; i++) {
      const replacement = names.get(team[i])?.replacement
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
