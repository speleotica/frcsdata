import { FrcsPlotShot } from './FrcsPlotShot'
import { FrcsPlotFile } from './FrcsPlotFile'
import linesOf from './util/linesOf'
import { Length, UnitizedNumber } from '@speleotica/unitized'
import { Segment, SegmentParseError } from 'parse-segment'

/**
 * Parses data from a calculated survey file.  These look like so:
<pre>  123.182259
  AE20     1    1       0       0      0   153  -257   -51    85   0  20     1
  AE19     1    2     653     402   -548  1046  -587  -174    97   0 200     1
  AE18     2    3     669     449  -3002   995    94  -597   -56 250   0     1
  AE17     3    4     539    1217  -2770   497    47  -298   -28   0   0     1
  AE16     4    5     544    1230  -3441   411  -284  -246   170  60  10     1
  AE15     5    6    1679    1663  -3833     0     0  -282   283  20  10     1
  AE14     6    7    2026    2617  -3730   446   225  -446  -225   0  30     1
  AE13     7    8     391    3152  -5788  -111   691     0     0 200  50     1
  AE12     8    9   -1019    2175  -4630  -369   336   221  -201  40  40     1
  AE11     9   10   -1516    1289  -3919  -348   195   610  -342  50  10     1</pre>
 */
export default async function parseFrcsPlotFile(
  file: string,
  lines: string | AsyncIterable<string>
): Promise<FrcsPlotFile> {
  if (typeof lines === 'string') {
    return await parseFrcsPlotFile(file, linesOf(lines))
  }
  let totalLength: UnitizedNumber<Length> = Length.feet(NaN)
  const shots: Array<FrcsPlotShot> = []
  const errors: Array<SegmentParseError> = []

  let lineNumber = 0

  const error = (
    message: string,
    line: string,
    startColumn: number,
    endColumn: number
  ): void => {
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

  function parseUint(
    line: string,
    startColumn: number,
    endColumn: number,
    fieldName: string
  ): number | null {
    const str = line.substring(startColumn, endColumn)
    if (!/^\s*\d+\s*$/.test(str)) {
      error(`Invalid ${fieldName}`, line, startColumn, endColumn)
      return null
    }
    const value = parseInt(str)
    if (isNaN(value)) {
      error(`Missing ${fieldName}`, line, startColumn, endColumn)
      return null
    }
    return value
  }

  function parseLength(
    line: string,
    startColumn: number,
    endColumn: number,
    fieldName: string,
    divisor: number
  ): UnitizedNumber<Length> | null {
    const str = line.substring(startColumn, endColumn)
    if (!/^\s*-?\d+\s*$/.test(str)) {
      error(`Invalid ${fieldName}`, line, startColumn, endColumn)
      return null
    }
    const value = parseFloat(str)
    if (isNaN(value)) {
      error(`Missing ${fieldName}`, line, startColumn, endColumn)
      return null
    }
    return Length.feet(value / divisor)
  }

  for await (const line of lines) {
    lineNumber++
    if (lineNumber === 1) {
      totalLength = Length.feet(parseFloat(line))
      continue
    }
    if (!/\S/.test(line)) continue
    const toName = line.substring(0, 6).trim()
    if (!toName) {
      error('Invalid to station name', line, 0, 6)
      continue
    }
    if (/[^ S]/.test(line[6])) {
      error('Invalid flag', line, 6, 7)
      continue
    }
    const isSurface = line[6] === 'S'
    const fromNumber = parseUint(line, 7, 12, 'from station number')
    if (fromNumber == null) continue
    const toNumber = parseUint(line, 12, 17, 'to station number')
    if (toNumber == null) continue
    const easting = parseLength(line, 17, 25, 'easting', 100)
    if (!easting) continue
    const northing = parseLength(line, 25, 33, 'northing', 100)
    if (!northing) continue
    const elevation = parseLength(line, 33, 40, 'elevation', 100)
    if (!elevation) continue
    const leftEasting = parseLength(line, 40, 46, 'left wall easting', 100)
    if (!leftEasting) continue
    const leftNorthing = parseLength(line, 46, 52, 'left wall northing', 100)
    if (!leftNorthing) continue
    const rightEasting = parseLength(line, 52, 58, 'right wall easting', 100)
    if (!rightEasting) continue
    const rightNorthing = parseLength(line, 58, 64, 'right wall northing', 100)
    if (!rightNorthing) continue
    const up = parseLength(line, 64, 68, 'up', 10)
    if (!up) continue
    const down = parseLength(line, 68, 72, 'down', 10)
    if (!down) continue
    const tripNumber = parseUint(line, 72, 78, 'trip number')

    shots.push({
      toName,
      isSurface,
      fromNumber,
      toNumber,
      easting,
      northing,
      elevation,
      leftEasting,
      leftNorthing,
      rightEasting,
      rightNorthing,
      up,
      down,
      tripNumber,
    })
  }

  return {
    totalLength,
    shots,
    errors,
  }
}
