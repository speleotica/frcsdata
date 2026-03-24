import { defaultFrcsShotColumnConfig } from './FrcsSurveyFile'
import type {
  ParseFrcsSurveyFileOptions,
  FrcsSurveyFile,
  FrcsTrip,
  FrcsUnits,
  FrcsShot,
  InvalidFrcsSurveyFile,
  InvalidFrcsUnits,
  InvalidFrcsTrip,
  InvalidFrcsShot,
  FrcsTripHeader,
} from './FrcsSurveyFile'
import { Angle, Length, UnitizedNumber, Unitize } from '@speleotica/unitized'
import { ParseIssue, ParseIssueSeverity } from '../ParseIssue'
import { chunksToLines } from '../chunksToLines'
import {
  isValidStation,
  isValidOptFloat,
  isValidOptUFloat,
  isValidUInt,
  isValidUFloat,
  isValidFloat,
} from './validators'
import { getColumnRanges } from './getColumnRanges'
import {
  parseFromStationLruds,
  parseLengthUnit,
  parseAngleUnit,
  parseMonth,
  parseLrud,
  parseSpecialKind,
  parseNumber,
  parseAzimuth,
} from './parsers'
import { normalizeTeamMemberName } from './normalizeTeamMemberName'
import { unwrapInvalid } from '../unwrapInvalid'
import { SourceLoc } from '../SourceLoc'

/**
   * Parses a raw cdata.fr survey file.  These look like so:
   *
  <pre>      Fisher Ridge Cave System, Hart Co., KY
  ENTRANCE DROPS, JOE'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE
  PETER QUICK, KEITH ORTIZ   -  2-15-81
  This File has Crumps test connected.  11/20/12
  *
  FT C  DD    A
        AE20     0                          1  3  0  2
  *      %FS
  *     AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12
  AE19 AE20   9.3    60.0  60.0-36.0       2 12  0 20
  AE18 AE19  24.5     0.0   0.0-90.0       6 10 25  0
  AE17 AE18   8.0   350.5 350.5 17.0       3  5  0  0
  AE16 AE17   6.7     0.0   0.0-90.0       3  5  6  1
  AE15 AE16  12.6    70.5  71.0-18.0       4  0  2  1
  AE14 AE15  10.0    21.5  20.0  6.0       5  5  0  3
  AE13 AE14  26.8   288.0 286.0-50.0       0  7 20  5
  *
  *SHORT CANYON AT THE BASE OF THE SECOND DROP
  AE12 AE13  20.7   236.0 236.0 34.0       3  5  4  4
  AE11 AE12  12.4   210.0 210.0 35.0       7  4  5  1
  AE10 AE13  25.7    40.0  40.0 -9.0       2  2  3  6
  *
  *AE10 AT JOE'S " I LOVE MY WIFE TRAVERSE "
    AE9 AE10  17.8    32.5  31.0 23.0       4  5 20 15
    AE1  AE9  13.7    82.0  82.0-13.0
    A1  AE1  34.3    46.0  48.0-17.5
  *
  *SURVEY TO DOME NEAR THE ENTRANCE DOME (ABOVE THE SECOND DROP)
    AD1 AE15   8.0   200.0 200.0  0.0       3  1  1  1
    AD2  AD1  17.7   161.0 161.0  7.0       1  4 25  1
    AD3  AD2  10.4   180.0 180.0 50.0       4  1 15  5
  *
  TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY
  DAN CROWL, KEITH ORTIZ, CHIP HOPPER, PETER QUICK, LARRY BEAN    14 FEB 1981
  *
  FI B  DD
    A2   A1  48 10  292.0 110.0-42.0       5 10 35  5
    A3   A2  12  5  333.5 153.5 35.0       3  1 15  5
    A4   A3   4  2    0.0   0.0 90.0       3  1 10 10
  ...</pre>
  *
  */
export default async function parseFrcsSurveyFile(
  file: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  chunks: Iterable<string> | AsyncIterable<string>,
  {
    columns = defaultFrcsShotColumnConfig,
    outputColumns = false,
    normalizeNames = true,
    suppressWarnings,
    includeLocs,
  }: ParseFrcsSurveyFileOptions = {}
): Promise<FrcsSurveyFile | InvalidFrcsSurveyFile> {
  const columnRanges = getColumnRanges(columns)
  const maxRange = Math.max(
    ...Object.values(columnRanges.decimal).map((r) => r[1])
  )

  let cave: string | undefined = undefined
  let location: string | undefined = undefined
  const trips: (FrcsTrip | InvalidFrcsTrip)[] = []
  const rootLocs: FrcsSurveyFile['locs'] = {}
  const issues: ParseIssue[] = []

  let tripName: string | undefined
  let tripNameLoc: SourceLoc | undefined
  let tripTeam: string[] | undefined
  let tripTeamLoc: SourceLoc[] | undefined
  let tripDate: Date | undefined
  let tripDateLoc: SourceLoc | undefined
  let inTripComment = true
  let tripCommentStartLine = 1
  let tripCommentEndLine = -1
  const tripComment: string[] = []
  const commentLines: string[] = []
  let trip: FrcsTrip | InvalidFrcsTrip | undefined = undefined
  let inBlockComment = false
  let section
  let sectionLoc: SourceLoc | undefined
  const commentFromStationLruds = new Map<
    string,
    NonNullable<FrcsShot['fromLruds']>
  >()

  let unitsChanged = false
  let alternateUnits: FrcsUnits | InvalidFrcsUnits | undefined
  let nextShotUnits: FrcsUnits | InvalidFrcsUnits | undefined

  let lineNumber = 0
  let line: string
  let lineStartIndex = 0

  let lineIssues: number[] = []
  let tripIssues: number[] = []

  let began = false

  for await ({ line, startIndex: lineStartIndex } of chunksToLines(chunks, {
    includeStartIndex: true,
  })) {
    if (lineIssues.length) lineIssues = []

    lineNumber++

    if (!began) {
      began = true
      if (/^\s+\*/.test(line)) {
        continue
      }
      const match = /^\s*([^,]+)(,(.*))?/d.exec(line)
      if (match) {
        cave = match[1].trim()
        if (includeLocs && match.indices) {
          rootLocs.cave = makeLineLoc(
            lineNumber,
            lineStartIndex,
            ...match.indices[1]
          )
        }
        if (match[3]) {
          location = match[3].trim()
          if (includeLocs && match.indices) {
            rootLocs.cave = makeLineLoc(
              lineNumber,
              lineStartIndex,
              ...match.indices[3]
            )
          }
        }
      }
    }

    if (unitsChanged) {
      unitsChanged = false
      alternateUnits = parseUnits()
      nextShotUnits = alternateUnits
    } else if (/^\s{1,8}\*(?!\*)/.test(line)) {
      inTripComment = !inTripComment
      alternateUnits = nextShotUnits = undefined
      unitsChanged = false
      if (inTripComment) {
        tripName = undefined
        tripNameLoc = undefined
        section = undefined
        sectionLoc = undefined
        tripTeam = undefined
        tripTeamLoc = undefined
        tripDate = undefined
        tripDateLoc = undefined
        tripComment.length = 0
        tripCommentStartLine = lineNumber
      } else {
        tripCommentEndLine = lineNumber
      }
    } else if (inTripComment) {
      if (lineNumber === tripCommentStartLine + 1) {
        tripName = line.trim()
        const startColumn = /\S/.exec(line)?.index ?? 0
        const endColumn = startColumn + tripName.length
        tripNameLoc = makeLineLoc(
          lineNumber,
          lineStartIndex,
          startColumn,
          endColumn
        )
      } else if (lineNumber === tripCommentStartLine + 2) {
        const dateMatch =
          /(?:[-.]\s*)?((\d+)[-/](\d+)[-/](\d{2,4})|((\d+)[-/ ](january|february|march|april|may|june|july|august|september|october|november|december|(?:jan|feb|mar|apr|jun|jul|aug|sept?|oct|nov|dec)\.?)[-/ ](\d{2,4}))|((january|february|march|april|may|june|july|august|september|october|november|december|(?:jan|feb|mar|apr|jun|jul|aug|sept?|oct|nov|dec)\.?)\s+(\d+)(?:,\s*|,?\s+)(\d{2,4})))/di.exec(
            line
          )
        if (dateMatch) {
          const team = line.substring(0, dateMatch.index).replace(/\.?\s*$/, '')
          tripTeam = []
          tripTeamLoc = []
          for (const match of team.matchAll(
            team.includes(';')
              ? /\s*([^;]+)\s*/dg
              : team.includes(',')
              ? /\s*([^,]+)\s*/dg
              : team.includes('&')
              ? /\s*([^&]+)\s*/dg
              : /\S {2,}\S/.test(team)
              ? /(\S+( \S+)*)/dg
              : /(\S+( \S\.? )? \S{2,})/dg
          )) {
            const name = match[1].trim()
            tripTeam.push(name)
            if (includeLocs && match.indices) {
              const index = match.indices[1][0]
              tripTeamLoc.push(
                makeLineLoc(
                  lineNumber,
                  lineStartIndex,
                  index,
                  index + name.length
                )
              )
            }
          }
          if (!tripTeam.length) {
            addIssue(
              'warning',
              'missingTripTeam',
              'Missing team',
              0,
              dateMatch.index,
              tripIssues
            )
          }
          if (normalizeNames) tripTeam = tripTeam.map(normalizeTeamMemberName)
          let month, day, year
          if (dateMatch[2]) {
            month = parseInt(dateMatch[2])
            day = parseInt(dateMatch[3])
            year = parseInt(dateMatch[4])
          } else if (dateMatch[6]) {
            day = parseInt(dateMatch[6])
            month = parseMonth(dateMatch[7])
            year = parseInt(dateMatch[8])
          } else {
            month = parseMonth(dateMatch[10])
            day = parseInt(dateMatch[11])
            year = parseInt(dateMatch[12])
          }
          tripDate = new Date(year < 60 ? year + 2000 : year, month - 1, day)
          if (includeLocs && dateMatch.indices) {
            tripDateLoc = makeLineLoc(
              lineNumber,
              lineStartIndex,
              ...dateMatch.indices[1]
            )
          }
        } else {
          addIssue(
            'warning',
            'missingTripDate',
            'Missing date',
            line.length,
            line.length,
            tripIssues
          )
        }
      } else if (lineNumber > 1) {
        tripComment.push(line)
      }
      const match = /^\*\*\*([^*]+)\*\*\*/.exec(line)
      if (match) {
        section = match[1].trim()
      }
    } else if (/^(\s{9,}|)\*(?!\*)/.test(line)) {
      if (/^\*\s*%NC(\b|$)/.test(line)) {
        unitsChanged = true
      }
      let match: RegExpMatchArray | null
      if ((match = /^\*\s*%T([ITM])(\b|$)/.exec(line))) {
        const currentUnits = alternateUnits || unwrapInvalid(trip)?.units
        if (currentUnits && !('INVALID' in currentUnits)) {
          alternateUnits = {
            ...currentUnits,
            distanceUnit:
              match[1] === 'I'
                ? Length.inches
                : match[1] === 'M'
                ? Length.meters
                : Length.feet,
          }
          nextShotUnits = alternateUnits
        }
      }
      if (/^\*\s*%/.test(line)) {
        inBlockComment = false
        continue
      }
      if (/[^\s*]/.test(line)) {
        addCommentLine(line.replace(/^\s*\*/, ''))
        inBlockComment = false
      } else {
        inBlockComment = !inBlockComment
        if (inBlockComment) commentLines.length = 0
      }
    } else if (inBlockComment) {
      addCommentLine(line)
    } else if (lineNumber === tripCommentEndLine + 1) {
      if (trip) trips.push(trip)
      const comment = tripComment.join('\n') || undefined
      const headerLocs: FrcsTripHeader['locs'] =
        includeLocs && tripNameLoc
          ? {
              name: tripNameLoc,
              date: tripDateLoc,
              section: sectionLoc,
              team: tripTeamLoc,
            }
          : undefined
      const header = {
        name: tripName || '',
        comment,
        section,
        date: tripDate,
        team: tripTeam,
        ...(headerLocs && { locs: headerLocs }),
      }
      const units = parseUnits()
      if (
        'INVALID' in units ||
        tripIssues.some((i) => issues[i]?.type === 'error')
      ) {
        trip = {
          INVALID: {
            header,
            units,
            shots: [],
          },
          ...(tripIssues.length ? { issues: tripIssues } : {}),
        }
      } else {
        trip = {
          tripNumber: 1,
          header,
          units,
          shots: [],
        }
      }
      tripIssues = []
    } else if (trip) {
      let distanceUnit =
        unwrapInvalid(alternateUnits)?.distanceUnit ||
        unwrapInvalid(unwrapInvalid(trip).units).distanceUnit ||
        Length.feet
      const azimuthUnit =
        unwrapInvalid(alternateUnits)?.azimuthUnit ||
        unwrapInvalid(unwrapInvalid(trip).units).azimuthUnit ||
        Angle.degrees
      const inclinationUnit =
        unwrapInvalid(alternateUnits)?.inclinationUnit ||
        unwrapInvalid(unwrapInvalid(trip).units).inclinationUnit ||
        Angle.degrees

      const inches = distanceUnit === Length.inches
      if (inches) distanceUnit = Length.feet

      const ranges = inches ? columnRanges.feetAndInches : columnRanges.decimal

      // from station name
      if (!/\S/.test(line.substring(...ranges.fromStation))) continue
      const fromStr = validate(
        ...ranges.fromStation,
        'from station',
        isValidStation
      )
      const from = fromStr.trim()

      // Sadly I have found negative LRUD values in Chip's format and apparently
      // his program doesn't fail on them, so I have to accept them here
      // isValidOptFloat instead of isValidOptUFloat
      const lStr = validate(...ranges.left, 'left', isValidOptFloat)
      const rStr = validate(...ranges.right, 'right', isValidOptFloat)
      const uStr = validate(...ranges.up, 'up', isValidOptFloat)
      const dStr = validate(...ranges.down, 'down', isValidOptFloat)

      const up = parseLrud(uStr, distanceUnit)
      const down = parseLrud(dStr, distanceUnit)
      const left = parseLrud(lStr, distanceUnit)
      const right = parseLrud(rStr, distanceUnit)

      // to station name
      const toStr = line.substring(...ranges.toStation)
      if (!toStr.trim()) {
        const shot: FrcsShot = {
          from,
          to: undefined,
          distance: new UnitizedNumber(0, distanceUnit),
          frontsightAzimuth: undefined,
          backsightAzimuth: undefined,
          frontsightInclination: undefined,
          backsightInclination: undefined,
          fromLruds: {
            left,
            right,
            up,
            down,
          },
          comment: getComment(),
        }
        addShot(
          lineIssues.length ? { INVALID: shot, issues: lineIssues } : shot
        )
        continue
      }
      if (!isValidStation(toStr)) {
        addIssue(
          'error',
          'invalidStationName',
          'Invalid station name',
          ...ranges.toStation
        )
      }

      let fromLruds = commentFromStationLruds.get(from)
      if (fromLruds) {
        commentFromStationLruds.delete(from)
      } else {
        const fromLrudMatch = new RegExp(
          `^\\s+${fromStr
            .trim()
            .replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&'
            )}((\\s+(\\d+(\\.\\d*)?|\\.\\d+)){4})`
        ).exec(line.substring(maxRange))
        if (fromLrudMatch) {
          const [left, right, up, down] = fromLrudMatch[1]
            .trim()
            .split(/\s+/g)
            .map((s) => parseLrud(s, distanceUnit))
          fromLruds = { left, right, up, down }
        }
      }

      const comment = getComment()

      // azimuth and inclination
      const azmFsStr = validate(
        ranges.frontsightAzimuth[0],
        ranges.frontsightAzimuth[1],
        'azimuth',
        isValidOptUFloat
      )
      const azmBsStr = validate(
        ...ranges.backsightAzimuth,
        'azimuth',
        isValidOptUFloat
      )
      const incFsStr = line.substring(...ranges.frontsightInclination)
      const incBsStr = line.substring(...ranges.backsightInclination)

      let distance: UnitizedNumber<Length> | undefined
      let horizontalDistance: UnitizedNumber<Length> | undefined
      let verticalDistance: UnitizedNumber<Length> | undefined
      let frontsightInclination: UnitizedNumber<Angle> | undefined
      let backsightInclination: UnitizedNumber<Angle> | undefined

      // parse distance
      if (inches) {
        const feetStr = validate(
          ...ranges.distanceFeet,
          'feet',
          isValidOptUFloat
        )
        const inchesStr = validate(
          ...ranges.distanceInches,
          'inches',
          isValidOptUFloat
        )
        if (!/\S/.test(feetStr) && !/\S/.test(inchesStr)) {
          addIssue(
            'error',
            'missingDistance',
            'Missing distance',
            ranges.distanceFeet[0],
            ranges.distanceInches[1]
          )
        }
        // sometimes inches are omitted, hence the || 0...I'm assuming it's possible
        // for feet to be omitted as well
        else if (
          (isValidUInt(feetStr) && isValidOptUFloat(inchesStr)) ||
          (isValidOptUFloat(feetStr) && isValidUInt(inchesStr))
        ) {
          distance = Unitize.inches(parseFloat(inchesStr) || 0).add(
            Unitize.feet(parseFloat(feetStr) || 0)
          )
        }
        // NOTE there are two columns around here that can contain a *.
        // I think they might represent different values, but thisis confused by
        // the fact that for ft/in shots, if there is a D or H flag it occupies the
        // first column that can contain a * for decimal feet shots
      } else {
        const distStr = validate(...ranges.distance, 'distance', isValidUFloat)
        const distNum = parseFloat(distStr)
        distance = Number.isFinite(distNum)
          ? new UnitizedNumber(distNum, distanceUnit)
          : undefined
      }
      const specialKindStr = line.substring(...ranges.kind).trim()
      const exclude = line.substring(...ranges.exclude).trim()
      const specialKind = parseSpecialKind(specialKindStr)

      if (specialKindStr && !specialKind) {
        addIssue(
          'error',
          'invalidShotType',
          'Invalid shot type',
          ranges.kind[0],
          ranges.kind[1]
        )
      }

      const excludeDistance = exclude === '*' || exclude === 's'
      const isSplay = exclude === 's'

      if (exclude && !excludeDistance) {
        addIssue(
          'error',
          'invalidShotFlag',
          'Invalid shot flag',
          ranges.exclude[0],
          ranges.exclude[1]
        )
      }

      if (specialKind) {
        validate(
          ...ranges.frontsightInclination,
          'vertical-distance',
          isValidFloat
        )
      }

      // convert horizontal and diagonal shots to standard
      // in this case incFs is the vertical offset between stations
      // fortunately it appears we can always count on incFs being specified
      // and incBs not being specified for these types of shots
      if (specialKind === 'horizontal') {
        // distance is horizontal offset and incFsStr is vertical offset
        horizontalDistance = distance
        const h = horizontalDistance?.get(distanceUnit) ?? NaN
        const v = parseFloat(incFsStr)
        verticalDistance = Number.isFinite(v)
          ? new UnitizedNumber(v, distanceUnit)
          : undefined
        distance = new UnitizedNumber(Math.sqrt(h * h + v * v), distanceUnit)
        frontsightInclination =
          verticalDistance && horizontalDistance
            ? Angle.atan2(verticalDistance, horizontalDistance).in(
                inclinationUnit
              )
            : undefined
        backsightInclination = undefined
      } else if (specialKind === 'diagonal') {
        // distance is as usual, but incFsStr is vertical offset
        const d = distance?.get(distanceUnit) ?? NaN
        const v = parseFloat(incFsStr)
        verticalDistance = Number.isFinite(v)
          ? new UnitizedNumber(v, distanceUnit)
          : undefined
        frontsightInclination = Angle.asin(v / d).in(inclinationUnit)
        backsightInclination = undefined
      } else {
        // frontsight inclination
        validate(
          ...ranges.frontsightInclination,
          'inclination',
          isValidOptFloat
        )
        // backsight inclination
        validate(...ranges.backsightInclination, 'inclination', isValidOptFloat)
        frontsightInclination = parseNumber(incFsStr, inclinationUnit)
        backsightInclination = parseNumber(incBsStr, inclinationUnit)

        validateInclinationRange(
          frontsightInclination,
          ...ranges.frontsightInclination
        )
        validateInclinationRange(
          backsightInclination,
          ...ranges.backsightInclination
        )
      }

      const frontsightAzimuth = parseAzimuth(azmFsStr, azimuthUnit)
      const backsightAzimuth = parseAzimuth(azmBsStr, azimuthUnit)

      validateAzimuthRange(frontsightAzimuth, ...ranges.frontsightAzimuth)
      validateAzimuthRange(backsightAzimuth, ...ranges.backsightAzimuth)

      if (!/\S/.test(incFsStr) && !/\S/.test(incBsStr)) {
        frontsightInclination = Unitize.degrees(0)
      }

      if (from && distance && !lineIssues.length) {
        const shot: FrcsShot = {
          from,
          to: toStr.trim(),
          specialKind,
          distance,
          frontsightAzimuth,
          backsightAzimuth,
          frontsightInclination,
          backsightInclination,
          toLruds: {
            left,
            right,
            up,
            down,
          },
          excludeDistance,
          comment,
          ...(includeLocs && {
            loc: makeLineLoc(lineNumber, lineStartIndex, 0, line.length),
          }),
        }
        if (isSplay) shot.isSplay = true
        if (fromLruds) shot.fromLruds = fromLruds
        if (horizontalDistance) shot.horizontalDistance = horizontalDistance
        if (verticalDistance) shot.verticalDistance = verticalDistance
        addShot(shot)
      } else {
        const shot: InvalidFrcsShot['INVALID'] = {
          from,
          to: toStr.trim(),
          specialKind,
          distance,
          frontsightAzimuth,
          backsightAzimuth,
          frontsightInclination,
          backsightInclination,
          toLruds: {
            left,
            right,
            up,
            down,
          },
          excludeDistance,
          comment,
          ...(includeLocs && {
            loc: makeLineLoc(lineNumber, lineStartIndex, 0, line.length),
          }),
        }
        if (isSplay) shot.isSplay = true
        if (fromLruds) shot.fromLruds = fromLruds
        if (horizontalDistance) shot.horizontalDistance = horizontalDistance
        if (verticalDistance) shot.verticalDistance = verticalDistance
        addShot({ INVALID: shot, issues: lineIssues })
      }
    }
  }

  if (trip) trips.push(trip)

  trips.forEach((trip, index) => (unwrapInvalid(trip).tripNumber = index + 1))

  if (
    !issues.some((i) => i.type === 'error') &&
    trips.every((t): t is FrcsTrip => !('INVALID' in t))
  ) {
    return {
      cave,
      columns: outputColumns ? columns : undefined,
      location,
      trips,
      ...(issues.length ? { issues } : undefined),
      ...(includeLocs && { locs: rootLocs }),
    }
  }

  return {
    INVALID: {
      cave,
      columns: outputColumns ? columns : undefined,
      location,
      trips,
      ...(includeLocs && { locs: rootLocs }),
    },
    issues,
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  function getComment(): string | undefined {
    if (!commentLines?.length) return undefined
    const comment = commentLines.join('\n').trim()
    commentLines.length = 0
    return comment || undefined
  }

  function addCommentLine(comment: string): void {
    if (trip) {
      const distanceUnit =
        unwrapInvalid(alternateUnits)?.distanceUnit ||
        unwrapInvalid(unwrapInvalid(trip).units).distanceUnit ||
        Length.feet
      const parsedFromStationLruds = parseFromStationLruds(
        comment,
        distanceUnit
      )
      if (parsedFromStationLruds) {
        commentFromStationLruds.set(
          parsedFromStationLruds[0],
          parsedFromStationLruds[1]
        )
        return
      }
    }
    if (commentLines) {
      commentLines.push(comment)
    }
  }

  function addIssue(
    type: ParseIssueSeverity,
    code: string,
    message: string,
    startColumn: number,
    endColumn: number,
    indicesArray?: number[]
  ) {
    if (
      suppressWarnings &&
      type === 'warning' &&
      (suppressWarnings === true ||
        ('code' in suppressWarnings &&
          suppressWarnings[code as keyof typeof suppressWarnings] === true))
    ) {
      return
    }

    issues.push({
      type,
      code,
      message,
      loc: {
        start: {
          line: lineNumber,
          column: startColumn,
          index: lineStartIndex + startColumn,
        },
        end: {
          line: lineNumber,
          column: endColumn,
          index: lineStartIndex + endColumn,
        },
      },
    })
    if (!lineIssues) lineIssues = []
    lineIssues.push(issues.length - 1)
    indicesArray?.push(issues.length - 1)
  }

  function parseUnits(): FrcsUnits | InvalidFrcsUnits {
    // FT CC DD
    // 01234567
    const distanceUnit = parseLengthUnit(line.slice(0, 2))
    if (!distanceUnit) {
      addIssue('error', 'invalidDistanceUnit', 'Invalid distance unit', 0, 2)
    }
    const azimuthUnit = parseAngleUnit(line[6])
    if (!azimuthUnit) {
      addIssue('error', 'invalidAzimuthUnit', 'Invalid azimuth unit', 6, 7)
    }
    const inclinationUnit = parseAngleUnit(line[7])
    if (!inclinationUnit) {
      addIssue(
        'error',
        'invalidInclinationUnit',
        'Invalid inclination unit',
        7,
        8
      )
    }
    const backsightAzimuthCorrected = line[3] === 'C'
    const backsightInclinationCorrected = line[4] === 'C'
    const hasBacksightAzimuth = line[3] !== ' ' && line[3] !== '-'
    const hasBacksightInclination = line[4] !== ' ' && line[4] !== '-'

    if (!/[-CB ]/.test(line[3])) {
      addIssue(
        'error',
        'invalidBacksightAzimuthType',
        'Invalid backsight azimuth type',
        3,
        4
      )
    }
    if (!/[-CB ]/.test(line[4])) {
      addIssue(
        'error',
        'invalidBacksightInclinationType',
        'Invalid backsight inclination type',
        4,
        5
      )
    }

    if (!distanceUnit || !azimuthUnit || !inclinationUnit) {
      return {
        INVALID: {
          distanceUnit,
          azimuthUnit,
          inclinationUnit,
          backsightAzimuthCorrected,
          backsightInclinationCorrected,
          hasBacksightAzimuth,
          hasBacksightInclination,
        },
        issues: lineIssues,
      }
    }

    return {
      distanceUnit,
      azimuthUnit,
      inclinationUnit,
      backsightAzimuthCorrected,
      backsightInclinationCorrected,
      hasBacksightAzimuth,
      hasBacksightInclination,
    }
  }

  function validate(
    startColumn: number,
    endColumn: number,
    fieldName: string,
    validator: (value: string) => boolean
  ): string {
    const field = line.substring(startColumn, endColumn)
    if (!validator(field)) {
      addIssue(
        'error',
        `${
          field.trim() ? 'invalid' : 'missing'
        }${fieldName[0].toUpperCase()}${fieldName.substring(1)}`,
        (field.trim() ? 'Invalid ' : 'Missing ') + fieldName,
        startColumn,
        endColumn
      )
    }
    return field
  }

  function validateAzimuthRange(
    azimuth: UnitizedNumber<Angle> | undefined,
    startColumn: number,
    endColumn: number
  ) {
    if (!azimuth) return
    const rawValue = azimuth.get(azimuth.unit)
    let max = Infinity
    switch (azimuth.unit) {
      case Angle.degrees:
        max = 360
        break
      case Angle.gradians:
        max = 400
        break
      case Angle.radians:
        max = Math.PI * 2
        break
      case Angle.milsNATO:
        max = 6400
        break
    }
    if (rawValue < 0 || rawValue >= max) {
      addIssue(
        'error',
        'azimuthOutOfRange',
        'Azimuth out of range',
        startColumn,
        endColumn,
        lineIssues
      )
    }
  }

  function validateInclinationRange(
    inclination: UnitizedNumber<Angle> | undefined,
    startColumn: number,
    endColumn: number
  ) {
    if (!inclination) return
    const rawValue = inclination.get(inclination.unit)
    let max = Infinity
    switch (inclination.unit) {
      case Angle.degrees:
        max = 90
        break
      case Angle.gradians:
        max = 100
        break
      case Angle.radians:
        max = Math.PI / 2
        break
      case Angle.milsNATO:
        max = 1600
        break
    }
    if (rawValue < -max || rawValue > max) {
      addIssue(
        'error',
        'inclinationOutOfRange',
        'Inclination out of range',
        startColumn,
        endColumn,
        lineIssues
      )
    }
  }

  function addShot(shot: FrcsShot | InvalidFrcsShot) {
    if (!trip) return
    if (alternateUnits) {
      const recorded:
        | FrcsShot['recorded']
        | InvalidFrcsShot['INVALID']['recorded'] = shot
      if ('INVALID' in shot) {
        shot = {
          INVALID: {
            ...shot.INVALID,
            recorded: shot,
          },
          issues: shot.issues,
        }
      } else {
        shot = { ...shot, recorded: shot }
      }
      if (nextShotUnits) {
        unwrapInvalid(recorded).units = nextShotUnits
        nextShotUnits = undefined
      }
      const {
        backsightAzimuthCorrected,
        backsightInclinationCorrected,
        distanceUnit,
        azimuthUnit,
        inclinationUnit,
      } = unwrapInvalid(unwrapInvalid(trip).units)
      const unwrappedAlternateUnits = unwrapInvalid(alternateUnits)
      const unwrappedShot = unwrapInvalid(shot)
      {
        const alternateUnits = unwrappedAlternateUnits
        const shot = unwrappedShot
        if (
          alternateUnits.backsightAzimuthCorrected !== backsightAzimuthCorrected
        ) {
          shot.backsightAzimuth = shot.backsightAzimuth
            ? Angle.opposite(shot.backsightAzimuth)
            : undefined
        }
        if (
          alternateUnits.backsightInclinationCorrected !==
          backsightInclinationCorrected
        ) {
          shot.backsightInclination = shot.backsightInclination?.negate()
        }
        if (distanceUnit && distanceUnit !== alternateUnits.distanceUnit) {
          shot.distance = shot.distance?.in(distanceUnit)
          if (shot.fromLruds) {
            shot.fromLruds = { ...shot.fromLruds }
            shot.fromLruds.left = shot.fromLruds.left?.in(distanceUnit)
            shot.fromLruds.right = shot.fromLruds.right?.in(distanceUnit)
            shot.fromLruds.up = shot.fromLruds.up?.in(distanceUnit)
            shot.fromLruds.down = shot.fromLruds.down?.in(distanceUnit)
          }
          if (shot.toLruds) {
            shot.toLruds = { ...shot.toLruds }
            shot.toLruds.left = shot.toLruds.left?.in(distanceUnit)
            shot.toLruds.right = shot.toLruds.right?.in(distanceUnit)
            shot.toLruds.up = shot.toLruds.up?.in(distanceUnit)
            shot.toLruds.down = shot.toLruds.down?.in(distanceUnit)
          }
        }
        if (azimuthUnit && azimuthUnit !== alternateUnits.azimuthUnit) {
          shot.frontsightAzimuth = shot.frontsightAzimuth?.in(azimuthUnit)
          shot.backsightAzimuth = shot.backsightAzimuth?.in(azimuthUnit)
        }
        if (
          inclinationUnit &&
          inclinationUnit !== alternateUnits.inclinationUnit
        ) {
          shot.frontsightInclination =
            shot.frontsightInclination?.in(inclinationUnit)
          shot.backsightInclination =
            shot.backsightInclination?.in(inclinationUnit)
        }
      }
    }
    if ('INVALID' in trip) {
      trip.INVALID.shots.push(shot)
    } else if ('INVALID' in shot) {
      trip = { INVALID: trip }
      trip.INVALID.shots.push(shot)
    } else {
      trip.shots.push(shot)
    }
  }
}

function makeLineLoc(
  line: number,
  lineStartIndex: number,
  startColumn: number,
  endColumn: number
): SourceLoc {
  return {
    start: {
      index: lineStartIndex + startColumn,
      line,
      column: startColumn,
    },
    end: {
      index: lineStartIndex + endColumn,
      line,
      column: endColumn,
    },
  }
}
