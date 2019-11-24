import { UnitizedNumber, Length } from '@speleotica/unitized'
import { FrcsPlotShot } from './FrcsPlotShot'
import { SegmentParseError } from 'parse-segment'

export type FrcsPlotFile = {
  totalLength: UnitizedNumber<Length>
  shots: Array<FrcsPlotShot>
  errors?: Array<SegmentParseError> | null
}
