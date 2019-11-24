import { Segment, SegmentParseError } from 'parse-segment'

export enum FrcsParseErrorCode {
  InvalidDistanceUnit = 'invalid-distance-unit',
  InvalidBacksightAzimuthType = 'invalid-bs-azimuth-type',
  InvalidBacksightInclinationType = 'invalid-bs-inclination-type',
  InvalidAzimuthUnit = 'invalid-azimuth-unit',
  InvalidInclinationUnit = 'invalid-inclination-unit',
  InvalidStationName = 'invalid-station-name',
  MissingToStation = 'missing-to-station',
  InvalidDistance = 'invalid-distance',
  MissingDistance = 'missing-distance',
  InvalidVerticalDistance = 'invalid-vertical-distance',
  MissingVerticalDistance = 'missing-vertical-distance',
  InvalidAzimuth = 'invalid-azimuth',
  MissingAzimuth = 'missing-azimuth',
  InvalidInclination = 'invalid-inclination',
  MissingInclination = 'missing-inclination',
  InvalidLrud = 'invalid-lrud',
}

export default class FrcsParseError extends SegmentParseError {
  readonly code: FrcsParseErrorCode

  constructor(
    code: FrcsParseErrorCode,
    messageWithoutContext: string,
    segment: Segment
  ) {
    super(messageWithoutContext, segment)
    this.code = code
  }
}
