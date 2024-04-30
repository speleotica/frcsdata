import { FrcsSurveyFile } from './FrcsSurveyFile'
import { FrcsTrip, FrcsUnits } from './FrcsTrip'
import { Segment, SegmentParseError } from 'parse-segment'
import {
  Angle,
  Length,
  Unit,
  UnitizedNumber,
  UnitType,
  Unitize,
} from '@speleotica/unitized'
import { FrcsShot, FrcsShotKind } from './FrcsShot'

function parseNumber<T extends UnitType<T>>(
  s: string,
  unit: Unit<T>
): UnitizedNumber<T> | null {
  const value = parseFloat(s)
  if (isNaN(value)) return null
  return new UnitizedNumber(value, unit)
}

function parseAzimuth(
  s: string,
  unit: Unit<Angle>
): UnitizedNumber<Angle> | null {
  const parsed = parseNumber(s, unit)
  return parsed?.get(Angle.degrees) === 360 ? Unitize.degrees(0) : parsed
}

function parseKind(kind: string): FrcsShotKind {
  switch (kind) {
    case 'H':
      return FrcsShotKind.Horizontal
    case 'D':
      return FrcsShotKind.Diagonal
    default:
      return FrcsShotKind.Normal
  }
}

function parseLengthUnit(unit: string): Unit<Length> | null {
  switch (unit) {
    case 'FI':
      return Length.inches
    case 'FF':
    case 'FT':
      return Length.feet
    case 'MT':
    case 'M ':
      return Length.meters
  }
  return null
}
function parseAngleUnit(unit: string): Unit<Angle> | null {
  switch (unit) {
    case 'D':
      return Angle.degrees
    case 'G':
      return Angle.gradians
    case 'M':
      return Angle.milsNATO
  }
  return null
}

// determines if a cell contains a valid station name.
function isValidStation(s: string): boolean {
  return /^\s*\S+\s*$/.test(s)
}
// determines if a cell contains a valid unsigned integer.
function isValidUInt(s: string): boolean {
  return /^\s*[0-9]+\s*$/.test(s)
}
// determines if a cell contains a valid float.
function isValidFloat(s: string): boolean {
  return /^\s*[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float or whitespace.
function isValidOptFloat(s: string): boolean {
  return /^\s*[-+]?[0-9]*(\.[0-9]*)?\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float or whitespace.
function isValidOptUFloat(s: string): boolean {
  return /^\s*[0-9]*(\.[0-9]*)?\s*$/.test(s)
}
// determines if a cell contains a valid unsigned float.
function isValidUFloat(s: string): boolean {
  return /^\s*([0-9]+(\.[0-9]*)?|\.[0-9]+)\s*$/.test(s)
}
// determines if a cell contains a valid inclination or whitespace.
function isValidOptInclination(s: string): boolean {
  return /^\s*[-+]?[0-9]*(\.[0-9]*)?\s*$/.test(s)
}
function parseLrud<T extends UnitType<T>>(
  s: string,
  unit: Unit<Length>
): UnitizedNumber<Length> | null {
  const value = parseFloat(s)
  return !Number.isFinite(value) || value < 0
    ? null
    : new UnitizedNumber(value, unit)
}

function parseFromStationLruds(
  line: string,
  distanceUnit: Unit<Length>
): [string, NonNullable<FrcsShot['fromLruds']>] | undefined {
  const fromStr = line.substring(0, 5)
  if (!/^\s*\S+$/.test(fromStr)) return undefined
  const gap = line.substring(5, 40)
  if (gap.trim()) return undefined
  const lrudStr = line.substring(40, 52)
  if (!/\d/.test(lrudStr)) return undefined
  const lStr = line.substring(40, 43)
  const rStr = line.substring(43, 46)
  const uStr = line.substring(46, 49)
  const dStr = line.substring(49, 52)
  if (
    !isValidOptFloat(lStr) ||
    !isValidOptFloat(rStr) ||
    !isValidOptFloat(uStr) ||
    !isValidOptFloat(dStr)
  ) {
    return undefined
  }
  const up = parseLrud(uStr, distanceUnit)
  const down = parseLrud(dStr, distanceUnit)
  const left = parseLrud(lStr, distanceUnit)
  const right = parseLrud(rStr, distanceUnit)
  return [fromStr.trim(), { left, right, up, down }]
}

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
  lines: AsyncIterable<string>
): Promise<FrcsSurveyFile> {
  let cave: string | null = null
  let location: string | null = null
  const trips: Array<FrcsTrip> = []
  const errors: Array<SegmentParseError> = []

  let tripName
  let tripTeam
  let tripDate
  let inTripComment = true
  let tripCommentStartLine = 1
  let tripCommentEndLine = -1
  let tripComment: Array<string> = []
  let commentLines: Array<string> | null = null
  let trip: FrcsTrip | null = null
  let inBlockComment = false
  let section
  const commentFromStationLruds: Map<
    string,
    NonNullable<FrcsShot['fromLruds']>
  > = new Map()

  function addCommentLine(comment: string): void {
    if (trip) {
      const distanceUnit = trip.header.distanceUnit
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

  function getComment(): string | null {
    if (!commentLines) return null
    const comment = commentLines.join('\n').trim()
    commentLines = null
    return comment || null
  }

  let unitsChanged = false
  let alternateUnits: FrcsUnits | undefined
  let nextShotUnits: FrcsUnits | undefined

  let lineNumber = 0
  let line: string

  let errored = false

  const error = (
    message: string,
    startColumn: number,
    endColumn: number
  ): void => {
    errored = true
    errors.push(
      new SegmentParseError(
        message,
        new Segment({
          value: line,
          source: file,
          startLine: lineNumber,
          startCol: 0,
        }).substring(startColumn, endColumn)
      )
    )
  }

  const parseUnits = (): FrcsUnits => {
    // FT CC DD
    // 01234567
    let distanceUnit = parseLengthUnit(line.slice(0, 2))
    if (!distanceUnit) {
      distanceUnit = Length.feet
      error('Invalid distance unit', 0, 2)
    }
    let azimuthUnit = parseAngleUnit(line[6])
    if (!azimuthUnit) {
      azimuthUnit = Angle.degrees
      error('Invalid azimuth unit', 6, 7)
    }
    let inclinationUnit = parseAngleUnit(line[7])
    if (!inclinationUnit) {
      inclinationUnit = Angle.degrees
      error('Invalid inclination unit', 7, 8)
    }
    const backsightAzimuthCorrected = line[3] === 'C'
    const backsightInclinationCorrected = line[4] === 'C'
    const hasBacksightAzimuth = line[3] !== ' ' && line[3] !== '-'
    const hasBacksightInclination = line[4] !== ' ' && line[4] !== '-'

    if (!/[-CB ]/.test(line[3])) {
      error('Invalid backsight azimuth type', 3, 4)
    }
    if (!/[-CB ]/.test(line[4])) {
      error('Invalid backsight inclination type', 4, 5)
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

  const validate = (
    startColumn: number,
    endColumn: number,
    fieldName: string,
    validator: (value: string) => boolean
  ): string => {
    const field = line.substring(startColumn, endColumn)
    if (!validator(field)) {
      error(
        (field.trim() ? 'Invalid ' : 'Missing ') + fieldName,
        startColumn,
        endColumn
      )
    }
    return field
  }

  const addShot = (shot: FrcsShot) => {
    if (!trip) return
    if (alternateUnits) {
      const recorded: FrcsShot & { units?: FrcsUnits } = shot
      shot = {
        ...shot,
        recorded,
      }
      if (nextShotUnits) {
        recorded.units = nextShotUnits
        nextShotUnits = undefined
      }
      const {
        backsightAzimuthCorrected,
        backsightInclinationCorrected,
        distanceUnit,
        azimuthUnit,
        inclinationUnit,
      } = trip.header
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
      if (distanceUnit !== alternateUnits.distanceUnit) {
        shot.distance = shot.distance.in(distanceUnit)
        if (shot.fromLruds) {
          shot.fromLruds.left = shot.fromLruds.left?.in(distanceUnit)
          shot.fromLruds.right = shot.fromLruds.right?.in(distanceUnit)
          shot.fromLruds.up = shot.fromLruds.up?.in(distanceUnit)
          shot.fromLruds.down = shot.fromLruds.down?.in(distanceUnit)
        }
        if (shot.toLruds) {
          shot.toLruds.left = shot.toLruds.left?.in(distanceUnit)
          shot.toLruds.right = shot.toLruds.right?.in(distanceUnit)
          shot.toLruds.up = shot.toLruds.up?.in(distanceUnit)
          shot.toLruds.down = shot.toLruds.down?.in(distanceUnit)
        }
      }
      if (azimuthUnit !== alternateUnits.azimuthUnit) {
        shot.frontsightAzimuth = shot.frontsightAzimuth?.in(azimuthUnit)
        shot.backsightAzimuth = shot.backsightAzimuth?.in(azimuthUnit)
      }
      if (inclinationUnit !== alternateUnits.inclinationUnit) {
        shot.frontsightInclination =
          shot.frontsightInclination?.in(inclinationUnit)
        shot.backsightInclination =
          shot.backsightInclination?.in(inclinationUnit)
      }
    }
    trip.shots.push(shot)
  }

  for await (line of lines) {
    errored = false

    lineNumber++

    if (lineNumber === 1) {
      const match = /^\s*([^,]+)(,(.*))?/.exec(line)
      if (match) {
        cave = match[1].trim()
        if (match[3]) {
          location = match[3].trim()
        }
      }
    }

    if (unitsChanged) {
      unitsChanged = false
      alternateUnits = parseUnits()
      nextShotUnits = alternateUnits
    } else if (line.charAt(0) === ' ' && line.charAt(1) === '*') {
      inTripComment = !inTripComment
      alternateUnits = nextShotUnits = undefined
      unitsChanged = false
      if (inTripComment) {
        section = undefined
        tripComment = []
        tripCommentStartLine = lineNumber
      } else {
        tripCommentEndLine = lineNumber
      }
    } else if (inTripComment) {
      if (lineNumber === tripCommentStartLine + 1) {
        tripName = line && line.trim()
      } else if (lineNumber === tripCommentStartLine + 2) {
        const match = /^(.+?)\s*[-.]\s*(\d+)\/(\d+)\/(\d+)$/.exec(
          line && line.trim()
        )
        if (match) {
          let k = 1
          const team = match[k++]
          const month = parseInt(match[k++])
          const day = parseInt(match[k++])
          const year = parseInt(match[k++])
          tripDate = new Date(year < 70 ? year + 2000 : year, month - 1, day)
          tripTeam = team.split(
            team.indexOf(';') >= 0 ? /\s*;\s*/g : /\s*,\s*/g
          )
        }
      } else if (lineNumber > 1) {
        tripComment.push(line)
      }
      const match = /^\*\*\*([^*])\*\*\*/.exec(line)
      if (match) {
        section = match[1].trim()
      }
    } else if (line.charAt(0) === '*') {
      if (/^\*\s*%NC(\b|$)/.test(line)) {
        unitsChanged = true
        continue
      }

      inBlockComment = !inBlockComment
      if (inBlockComment) commentLines = []
      else {
        const part = line.substring(1)
        if (part) addCommentLine(part)
      }
    } else if (inBlockComment) {
      addCommentLine(line)
    } else if (lineNumber === tripCommentEndLine + 1) {
      trip = {
        header: {
          name: tripName || '',
          comment: (tripComment && tripComment.join('\n')) || null,
          section,
          date: tripDate,
          team: tripTeam,
          ...parseUnits(),
        },
        shots: [],
      }
      trips.push(trip)
    } else if (trip) {
      let { distanceUnit } = alternateUnits || trip.header
      const { azimuthUnit, inclinationUnit } = alternateUnits || trip.header

      const inches = distanceUnit === Length.inches
      if (inches) distanceUnit = Length.feet

      // rigorously check the values in all the columns to make sure this
      // is really a survey shot line, just in case any stray comments are
      // not properly delimited.

      // from station name
      if (!/\S/.test(line.substring(5, 10))) continue
      const fromStr = validate(5, 10, 'from station', isValidStation)
      const from = fromStr.trim()

      // Sadly I have found negative LRUD values in Chip's format and apparently
      // his program doesn't fail on them, so I have to accept them here
      // isValidOptFloat instead of isValidOptUFloat
      const lStr = validate(40, 43, 'left', isValidOptFloat)
      const rStr = validate(43, 46, 'right', isValidOptFloat)
      const uStr = validate(46, 49, 'up', isValidOptFloat)
      const dStr = validate(49, 52, 'down', isValidOptFloat)

      if (errored) continue

      const up = parseLrud(uStr, distanceUnit)
      const down = parseLrud(dStr, distanceUnit)
      const left = parseLrud(lStr, distanceUnit)
      const right = parseLrud(rStr, distanceUnit)

      // to station name
      const toStr = line.substring(0, 5)
      if (!toStr.trim()) {
        const shot: FrcsShot = {
          from,
          to: null,
          kind: FrcsShotKind.Normal,
          distance: new UnitizedNumber(0, distanceUnit),
          frontsightAzimuth: null,
          backsightAzimuth: null,
          frontsightInclination: null,
          backsightInclination: null,
          fromLruds: {
            left,
            right,
            up,
            down,
          },
          excludeDistance: true,
          comment: getComment(),
        }
        addShot(shot)
        continue
      }
      if (!isValidStation(toStr)) {
        error('Invalid station name', 0, 5)
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
        ).exec(line.substring(52))
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
      const azmFsStr = validate(19, 25, 'azimuth', isValidOptUFloat)
      const azmBsStr = validate(25, 30, 'azimuth', isValidOptUFloat)
      const incFsStr = line.substring(30, 35)
      const incBsStr = line.substring(35, 40)

      if (errored) continue

      let kind: FrcsShotKind
      let distance: UnitizedNumber<Length>
      let horizontalDistance: UnitizedNumber<Length> | undefined
      let verticalDistance: UnitizedNumber<Length> | undefined
      let frontsightInclination: UnitizedNumber<Angle> | null
      let backsightInclination: UnitizedNumber<Angle> | null
      let excludeDistance: boolean
      let isSplay: boolean

      // parse distance
      if (inches) {
        const feetStr = line.substring(10, 14)
        const inchesStr = line.substring(14, 17)
        // feet and inches are not both optional
        if (!isValidUInt(feetStr) && !isValidUInt(inchesStr)) {
          const invalid = feetStr.trim() || inchesStr.trim()
          error(invalid ? 'Invalid distance' : 'Missing distance', 10, 17)
          continue
        }

        // sometimes inches are omitted, hence the || 0...I'm assuming it's possible
        // for feet to be omitted as well
        distance = Unitize.inches(parseFloat(inchesStr) || 0).add(
          Unitize.feet(parseFloat(feetStr) || 0)
        )

        kind = parseKind(line[17])
        // NOTE there are two columns around here that can contain a *.
        // I think they might represent different values, but thisis confused by
        // the fact that for ft/in shots, if there is a D or H flag it occupies the
        // first column that can contain a * for decimal feet shots
        excludeDistance = line[18] === '*' || line[18] === 's'
        isSplay = line[18] === 's'
      } else {
        // decimal feet are not optional
        const feetStr = validate(10, 16, 'distance', isValidUFloat)
        distance = new UnitizedNumber(parseFloat(feetStr), distanceUnit)
        kind = parseKind(line[16])
        excludeDistance = line[17] === '*' || line[17] === 's'
        isSplay = line[17] === 's'
      }

      if (kind !== FrcsShotKind.Normal) {
        validate(30, 35, 'vertical-distance', isValidFloat)
      }

      // convert horizontal and diagonal shots to standard
      // in this case incFs is the vertical offset between stations
      // fortunately it appears we can always count on incFs being specified
      // and incBs not being specified for these types of shots
      if (kind === FrcsShotKind.Horizontal) {
        // distance is horizontal offset and incFsStr is vertical offset
        horizontalDistance = distance
        const h = horizontalDistance.get(distanceUnit)
        const v = parseFloat(incFsStr)
        verticalDistance = new UnitizedNumber(v, distanceUnit)
        distance = new UnitizedNumber(Math.sqrt(h * h + v * v), distanceUnit)
        frontsightInclination = Angle.atan2(
          verticalDistance,
          horizontalDistance
        )
        backsightInclination = null
      } else if (kind === FrcsShotKind.Diagonal) {
        // distance is as usual, but incFsStr is vertical offset
        const d = distance.get(distanceUnit)
        const v = parseFloat(incFsStr)
        verticalDistance = new UnitizedNumber(v, distanceUnit)
        frontsightInclination = Angle.asin(v / d)
        backsightInclination = null
      } else {
        // frontsight inclination
        validate(30, 35, 'inclination', isValidOptInclination)
        // frontsight inclination
        validate(35, 40, 'inclination', isValidOptInclination)
        frontsightInclination = parseNumber(incFsStr, inclinationUnit)
        backsightInclination = parseNumber(incBsStr, inclinationUnit)
      }
      if (errored) continue

      const frontsightAzimuth = parseAzimuth(azmFsStr, azimuthUnit)
      const backsightAzimuth = parseAzimuth(azmBsStr, azimuthUnit)

      if (!frontsightInclination && !backsightInclination) {
        frontsightInclination = Unitize.degrees(0)
      }

      const shot: FrcsShot = {
        from,
        to: toStr.trim(),
        kind,
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
      }
      if (isSplay) shot.isSplay = true
      if (fromLruds) shot.fromLruds = fromLruds
      if (horizontalDistance) shot.horizontalDistance = horizontalDistance
      if (verticalDistance) shot.verticalDistance = verticalDistance
      addShot(shot)
    }
  }

  return {
    cave,
    location,
    trips,
    errors,
  }
}
