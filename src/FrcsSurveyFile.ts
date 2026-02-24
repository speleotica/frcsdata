import { ParseError } from './ParseError.js'
import { SourceLoc } from './SourceLoc.js'
import { Unit, Length, Angle, UnitizedNumber } from '@speleotica/unitized'

type Invalid<T> = {
  INVALID: T
  /**
   * An array of indexes of errors in {@link InvalidFrcsSurveyFile['errors']} within the
   * `INVALID` node
   */
  errors?: number[]
}

type Replace<T, U> = Omit<T, keyof U> & U

export type FrcsSurveyFile = {
  cave?: string
  columns?: FrcsShotColumnConfig
  location?: string
  comment?: string
  trips: FrcsTrip[]
  locs?: {
    cave?: SourceLoc
    location?: SourceLoc
    comment?: SourceLoc
  }
}

export type FrcsShotColumnConfig = {
  toStation: number
  fromStation: number
  distance: number
  distanceFeet: number
  distanceInches: number
  kind: number
  exclude: number
  frontsightAzimuth: number
  backsightAzimuth: number
  frontsightInclination: number
  backsightInclination: number
  left: number
  right: number
  up: number
  down: number
}

export type InvalidFrcsSurveyFile = {
  INVALID: Replace<
    FrcsSurveyFile,
    {
      trips: (FrcsTrip | InvalidFrcsTrip)[]
    }
  >
  errors: ParseError[]
}

export type FrcsUnits = {
  distanceUnit: Unit<Length>
  azimuthUnit: Unit<Angle>
  inclinationUnit: Unit<Angle>
  backsightAzimuthCorrected?: boolean
  backsightInclinationCorrected?: boolean
  hasBacksightAzimuth?: boolean
  hasBacksightInclination?: boolean
  loc?: SourceLoc
  locs?: {
    distanceUnit?: SourceLoc
    azimuthUnit?: SourceLoc
    inclinationUnit?: SourceLoc
    backsightAzimuthCorrected?: SourceLoc
    backsightInclinationCorrected?: SourceLoc
    hasBacksightAzimuth?: SourceLoc
    hasBacksightInclination?: SourceLoc
  }
}

export type InvalidFrcsUnits = Invalid<Partial<FrcsUnits>>

export type FrcsTripHeader = {
  name: string
  comment?: string
  section?: string
  date?: Date
  team?: string[]
  loc?: SourceLoc
  locs?: {
    name?: SourceLoc
    comment?: SourceLoc
    section?: SourceLoc
    date?: SourceLoc
    team?: SourceLoc
  }
}

export type InvalidFrcsTripHeader = Invalid<Partial<FrcsTripHeader>>

export type FrcsTrip = {
  header: FrcsTripHeader
  units: FrcsUnits
  shots: FrcsShot[]
  loc?: SourceLoc
}

export type InvalidFrcsTrip = Invalid<{
  header: FrcsTripHeader | InvalidFrcsTripHeader
  units: FrcsUnits | InvalidFrcsUnits
  shots: (FrcsShot | InvalidFrcsShot)[]
}>

export type FrcsShotBase = {
  /**
   * Name of from station
   */
  from: string
  /**
   * Name of to station
   */
  to?: string
  specialKind?: 'horizontal' | 'diagonal'
  distance: UnitizedNumber<Length>
  horizontalDistance?: UnitizedNumber<Length>
  verticalDistance?: UnitizedNumber<Length>
  frontsightAzimuth?: UnitizedNumber<Angle>
  frontsightInclination?: UnitizedNumber<Angle>
  backsightAzimuth?: UnitizedNumber<Angle>
  backsightInclination?: UnitizedNumber<Angle>
  /**
   * LRUDs at from station
   */
  fromLruds?: {
    left?: UnitizedNumber<Length>
    right?: UnitizedNumber<Length>
    up?: UnitizedNumber<Length>
    down?: UnitizedNumber<Length>
  }
  /**
   * LRUDs at to station
   */
  toLruds?: {
    left?: UnitizedNumber<Length>
    right?: UnitizedNumber<Length>
    up?: UnitizedNumber<Length>
    down?: UnitizedNumber<Length>
  }
  excludeDistance?: boolean
  isSplay?: boolean
  comment?: string
  loc?: SourceLoc
  locs?: {
    comment?: SourceLoc
  }
}

export type FrcsShot = FrcsShotBase & {
  /**
   * In the edge case that the surveyors changed measurement units or
   * corrected/uncorrected backsights in the middle of a trip, the measurements
   * will be normalized to the initial trip settings, and this field will contain
   * the actual values recorded, verbatim.  The first shot of the group with
   * changed units will include the changed units.
   */
  recorded?: FrcsShotBase & { units?: FrcsUnits }
}

export type InvalidFrcsShot = Invalid<
  Partial<
    Replace<
      FrcsShot,
      {
        recorded?:
          | (FrcsShotBase & { units?: FrcsUnits })
          | Invalid<Partial<FrcsShotBase> & { units?: InvalidFrcsUnits }>
      }
    >
  >
>

export const defaultFrcsShotColumnConfig: FrcsShotColumnConfig = {
  toStation: 5,
  fromStation: 5,
  distance: 6,
  distanceFeet: 4,
  distanceInches: 3,
  kind: 1,
  exclude: 1,
  frontsightAzimuth: 6,
  backsightAzimuth: 6,
  frontsightInclination: 5,
  backsightInclination: 5,
  left: 3,
  right: 3,
  up: 3,
  down: 3,
}
