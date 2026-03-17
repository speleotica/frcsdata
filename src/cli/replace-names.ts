/* eslint-disable no-console */
import parseFrcsSurveyFile from '../survey/parseFrcsSurveyFile'
import { replaceRanges } from '../replaceRanges'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { unwrapInvalid } from '../unwrapInvalid'
import { parseNamesFile } from './parseNamesFile'
import { readFile } from './readFile'
import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { compareNames } from './compareNames'

export async function replaceSurveyNames(
  surveyFile: string,
  replacementsFile: string,
  options?: {
    verbose?: boolean
    write?: boolean
  }
) {
  const source = await readFile(surveyFile)
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(surveyFile, [source], {
      normalizeNames: false,
      includeLocs: true,
    })
  )
  const names = await parseNamesFile(await readFile(replacementsFile))

  const unreplacedNames = new Set<string>(
    [...names.entries()].flatMap(([name, { replacement }]) =>
      replacement ? name : []
    )
  )
  const replacedNames = new Set<string>()
  let replacementCount = 0

  const replacements: { start: number; end: number; value: string }[] = []
  for (const trip of unwrapInvalid(parsed).trips) {
    const { team, locs: { team: teamLocs } = {} } = unwrapInvalid(
      unwrapInvalid(trip).header
    )
    if (!team || !teamLocs) continue
    for (let i = 0; i < team.length; i++) {
      const name = team[i]
      const loc = teamLocs[i]
      const replacement = names.get(name)?.replacement
      if (replacement && loc) {
        unreplacedNames.delete(name)
        replacedNames.add(name)
        replacementCount++
        replacements.push({
          start: loc.start.index,
          end: loc.end.index,
          value: replacement,
        })
      }
    }
  }

  const replaced = replaceRanges(source, replacements)
  if (options?.write) {
    await writeFile(surveyFile, replaced, 'utf8')
  } else {
    process.stdout.write(replaced)
  }
  console.error(
    chalk.yellow(
      `replaced ${replacedNames.size} name${
        replacedNames.size === 1 ? '' : 's'
      } in ${replacementCount} location${replacementCount === 1 ? '' : 's'}`
    )
  )
  console.error(
    unreplacedNames.size
      ? chalk.yellow(
          `${unreplacedNames.size} name replacement${
            unreplacedNames.size === 1 ? ' was' : 's were'
          } unused${options?.verbose ? ':' : ''}`
        )
      : chalk.green('all name replacements were used')
  )
  if (options?.verbose) {
    for (const name of [...unreplacedNames].sort(compareNames)) {
      console.error(
        chalk.yellow(`  ${name} => ${names.get(name)?.replacement}`)
      )
    }
  }
}
