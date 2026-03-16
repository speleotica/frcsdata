/* eslint-disable no-console */
import { parseFrcsSurveyFile } from '../node/index'
import { normalizeNameCapitalization } from '../survey/normalizeTeamMemberName'
import { ZodValidOrInvalidFrcsSurveyFileToJson } from '../survey/ZodFrcsSurveyFileToJson'
import { unwrapInvalid } from '../unwrapInvalid'
import { groupBy } from '@jcoreio/utils/groupBy'
import { compareNames } from './compareNames'

export async function listSurveyNames(
  file: string,
  options?: { includeCounts?: boolean; suggestReplacements?: boolean }
) {
  const parsed = ZodValidOrInvalidFrcsSurveyFileToJson.parse(
    await parseFrcsSurveyFile(file, { normalizeNames: false })
  )
  const nameCounts = new Map<string, number>()
  for (const trip of unwrapInvalid(parsed).trips) {
    const { team } = unwrapInvalid(unwrapInvalid(trip).header)
    if (!team) continue
    for (const name of team) {
      nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1)
    }
  }

  const table = [...nameCounts.entries()].sort((a, b) =>
    compareNames(a[0], b[0])
  )
  const maxNameCount = table.reduce((max, [, count]) => Math.max(max, count), 0)
  const countLength = maxNameCount.toFixed().length

  const includeCounts = options?.includeCounts ?? false

  const names = [...nameCounts.keys()]

  const replacements = new Map<string, string>()
  if (options?.suggestReplacements) {
    for (const group of groupBy(names, (name) => name.toLowerCase()).values()) {
      if (group.length === 1) {
        const [name] = group
        const normalized = normalizeNameCapitalization(name)
        if (normalized !== name) replacements.set(name, normalized)
        continue
      }
      const best = group
        .map((name) => normalizeNameCapitalization(name))
        .reduce((a, b) => (countCaps(a) > countCaps(b) ? a : b))
      for (const name of group) {
        if (name !== best) replacements.set(name, best)
      }
    }

    const firstInitials = groupBy(
      names.filter((name) => /^\S[. ]/.test(name)),
      (name) => name.toLowerCase().replace(/\.\s*/g, ' ')
    )

    for (const name of names) {
      if (/^\S[. ]/.test(name)) continue
      const firstInitial = name
        .toLowerCase()
        .replace(/^\S+/, (m) => m.substring(0, 1))
        .replace(/\.\s*/g, ' ')
      const matches = firstInitials.get(firstInitial)
      if (matches) {
        for (const match of matches) {
          replacements.set(match, replacements.get(name) ?? name)
        }
      }
    }
  }

  for (const [name, count] of table) {
    const replacement = replacements.get(name)
    if (includeCounts)
      console.log(
        count.toFixed().padStart(countLength),
        name,
        ...(replacement ? ['=>', replacement] : [])
      )
    else console.log(name, ...(replacement ? ['=>', replacement] : []))
  }
}

const countCaps = (name: string) => {
  const lower = name.toLowerCase()
  let count = 0
  for (let i = 0; i < name.length; i++) {
    if (name[i] !== lower[i]) count++
  }
  return count
}
