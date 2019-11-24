import { FrcsTripSummary } from './FrcsTripSummary'
import { FrcsTripSummaryFile } from './FrcsTripSummaryFile'
import { SegmentParseError } from 'parse-segment'
import { Length } from '@speleotica/unitized'

const tripSummaryRegex = /^\s*(\d+)\s+(\d{1,2})\/(\s\d|\d\d)\/(\d{2,4})\s+(\d+(?:\.\d*)?)\s+(\d+)\s+(\S.*)EXCLUDED:\s+(\d+(?:\.\d*)?)\s+(\d+)/
/**
 * Parses data from a STAT_sum.txt file.  Here is an excerpt of the format:
<pre>  1   2/15/81    258.60   17   ENTRANCE DROPS, JOE'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE                EXCLUDED:   0.00  0
                               Peter Quick  Keith Ortiz
                                 A1           AD1-AD3      AE1          AE1 SIDE
                                 AE9 SIDE     AE10-AE9     AE13 SIDE    AE15 SIDE
                                 AE20-AE11

  3   3/ 6/81   2371.20   61   DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP                       EXCLUDED:   0.00  0
                               Peter Quick  Chris Gerace  Phil Oden  Chip Hopper
                                 A13 SIDE     B1-B5        B2 SIDE      B3 SIDE
                                 B6-B18       B17 SIDE     B19-B38      B32 SIDE
                                 BS1-BS5      C1-C18       </pre>
 */
export default async function parseFrcsTripSummaryFile(
  file: string,
  lines: AsyncIterable<string>
): Promise<FrcsTripSummaryFile> {
  const errors: Array<SegmentParseError> = []
  const tripSummaries: Array<FrcsTripSummary | undefined> = []

  let tripStartLine = -2
  let lineNumber = 0

  let team: Array<string> = []
  let shots: Array<string> = []

  for await (const line of lines) {
    lineNumber++

    const match = tripSummaryRegex.exec(line)
    if (match) {
      tripStartLine = lineNumber
      const tripNumber = parseInt(match[1])
      const tripIndex = tripNumber - 1
      let year = parseInt(match[4])
      if (year < 1000) year += 1900
      const date = new Date(year, parseInt(match[2]) - 1, parseInt(match[3]))
      const totalLength = Length.feet(parseFloat(match[5]))
      const numShots = parseInt(match[6])
      const name = match[7].trim()
      const excludedLength = Length.feet(parseFloat(match[8]))
      const numExcludedShots = parseInt(match[9])
      team = []
      shots = []
      tripSummaries[tripIndex] = {
        tripNumber,
        tripIndex,
        date,
        totalLength,
        numShots,
        name,
        excludedLength,
        numExcludedShots,
        team,
        shots,
      }
      continue
    }
    if (lineNumber === tripStartLine + 1) {
      team.push(...line.trim().split(/\s\s+|\t+/g))
    } else {
      const trimmed = line.trim()
      if (trimmed) shots.push(...trimmed.split(/\s\s+|\t+/))
    }
  }

  return { errors, tripSummaries }
}
