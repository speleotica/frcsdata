import { Angle, Length, Unit, UnitizedNumber } from '@speleotica/unitized'
import z from 'zod'
import type { DeepMapJson } from './FrcsSurveyFileJson'
import type { SourceLoc } from '../SourceLoc'
import type {
  FrcsShot,
  FrcsSurveyFile,
  FrcsTrip,
  FrcsTripHeader,
  FrcsUnits,
  InvalidFrcsShot,
  InvalidFrcsSurveyFile,
  InvalidFrcsTrip,
  InvalidFrcsTripHeader,
  InvalidFrcsUnits,
} from './FrcsSurveyFile'
import { ParseIssue } from '../ParseIssue'

type DeepMapJsonSchema<T> = z.ZodType<DeepMapJson<T>>

const ZodLengthUnit = z.enum(['m', 'km', 'cm', 'ft', 'in', 'yd', 'mi'])

ZodLengthUnit satisfies DeepMapJsonSchema<Unit<Length>>

const ZodAngleUnit = z.enum(['deg', 'rad', 'grad', 'mil', '%'])

ZodAngleUnit satisfies DeepMapJsonSchema<Unit<Angle>>

const ZodLength = z.tuple([z.number(), ZodLengthUnit])

ZodLength satisfies DeepMapJsonSchema<UnitizedNumber<Length>>

const ZodAngle = z.tuple([z.number(), ZodAngleUnit])

ZodAngle satisfies DeepMapJsonSchema<UnitizedNumber<Angle>>

const ZodSourceLoc = z.strictObject({
  start: z.strictObject({
    index: z.number(),
    line: z.number(),
    column: z.number(),
  }),
  end: z.strictObject({
    index: z.number(),
    line: z.number(),
    column: z.number(),
  }),
})

ZodSourceLoc satisfies DeepMapJsonSchema<SourceLoc>

const ZodFrcsShotBase = z.strictObject({
  from: z.string(),
  to: z.string().optional(),
  specialKind: z.enum(['horizontal', 'diagonal']).optional(),
  distance: ZodLength,
  horizontalDistance: ZodLength.optional(),
  verticalDistance: ZodLength.optional(),
  frontsightAzimuth: ZodAngle.optional(),
  frontsightInclination: ZodAngle.optional(),
  backsightAzimuth: ZodAngle.optional(),
  backsightInclination: ZodAngle.optional(),
  /**
   * LRUDs at from station
   */
  fromLruds: z
    .strictObject({
      left: ZodLength.optional(),
      right: ZodLength.optional(),
      up: ZodLength.optional(),
      down: ZodLength.optional(),
    })
    .optional(),
  /**
   * LRUDs at to station
   */
  toLruds: z
    .strictObject({
      left: ZodLength.optional(),
      right: ZodLength.optional(),
      up: ZodLength.optional(),
      down: ZodLength.optional(),
    })
    .optional(),

  excludeDistance: z
    .boolean()
    .optional()
    .transform((b) => (b === false ? undefined : b)),
  isSplay: z.boolean().optional(),
  comment: z.string().optional(),
  loc: ZodSourceLoc.optional(),
  locs: z
    .strictObject({
      comment: ZodSourceLoc.optional(),
    })
    .optional(),
})

const ZodFrcsUnits = z.strictObject({
  distanceUnit: ZodLengthUnit,
  azimuthUnit: ZodAngleUnit,
  inclinationUnit: ZodAngleUnit,
  backsightAzimuthCorrected: z.boolean().optional(),
  backsightInclinationCorrected: z.boolean().optional(),
  hasBacksightAzimuth: z.boolean().optional(),
  hasBacksightInclination: z.boolean().optional(),
  loc: ZodSourceLoc.optional(),
  locs: z
    .strictObject({
      distanceUnit: ZodSourceLoc.optional(),
      azimuthUnit: ZodSourceLoc.optional(),
      inclinationUnit: ZodSourceLoc.optional(),
      backsightAzimuthCorrected: ZodSourceLoc.optional(),
      backsightInclinationCorrected: ZodSourceLoc.optional(),
      hasBacksightAzimuth: ZodSourceLoc.optional(),
      hasBacksightInclination: ZodSourceLoc.optional(),
    })
    .optional(),
})

ZodFrcsUnits satisfies DeepMapJsonSchema<FrcsUnits>

const ZodFrcsShot = ZodFrcsShotBase.extend({
  recorded: ZodFrcsShotBase.extend({
    units: ZodFrcsUnits.optional(),
  }).optional(),
})

ZodFrcsShot satisfies DeepMapJsonSchema<FrcsShot>

const ZodFrcsTripHeader = z.strictObject({
  name: z.string(),
  comment: z.string().optional(),
  section: z.string().optional(),
  date: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/, 'must be in yyyy-mm-dd format')
    .optional(),
  team: z.array(z.string()).optional(),
  loc: ZodSourceLoc.optional(),
  locs: z
    .strictObject({
      name: ZodSourceLoc,
      comment: ZodSourceLoc.optional(),
      section: ZodSourceLoc.optional(),
      date: ZodSourceLoc.optional(),
      team: z.array(ZodSourceLoc).optional(),
    })
    .optional(),
})

ZodFrcsTripHeader satisfies DeepMapJsonSchema<FrcsTripHeader>

const ZodFrcsTrip = z.strictObject({
  tripNumber: z.number().int().min(1),
  header: ZodFrcsTripHeader,
  units: ZodFrcsUnits,
  shots: z.array(ZodFrcsShot),
  loc: ZodSourceLoc.optional(),
})

ZodFrcsTrip satisfies DeepMapJsonSchema<FrcsTrip>

export const ZodFrcsSurveyFileJson = z.strictObject({
  cave: z.string().optional(),
  columns: z
    .strictObject({
      toStation: z.number(),
      fromStation: z.number(),
      distance: z.number(),
      distanceFeet: z.number(),
      distanceInches: z.number(),
      kind: z.number(),
      exclude: z.number(),
      frontsightAzimuth: z.number(),
      backsightAzimuth: z.number(),
      frontsightInclination: z.number(),
      backsightInclination: z.number(),
      left: z.number(),
      right: z.number(),
      up: z.number(),
      down: z.number(),
    })
    .optional(),
  location: z.string().optional(),
  comment: z.string().optional(),
  trips: z.array(ZodFrcsTrip),
  locs: z
    .strictObject({
      cave: ZodSourceLoc.optional(),
      location: ZodSourceLoc.optional(),
      comment: ZodSourceLoc.optional(),
    })
    .optional(),
  issues: z.array(ParseIssue).optional(),
})

ZodFrcsSurveyFileJson satisfies DeepMapJsonSchema<FrcsSurveyFile>

function Invalid<T extends z.ZodTypeAny>(schema: T) {
  return z.strictObject({
    INVALID: schema,
    issues: z.array(z.number()).optional(),
  })
}

const ZodInvalidFrcsShot = Invalid(ZodFrcsShot.partial())

ZodInvalidFrcsShot satisfies DeepMapJsonSchema<InvalidFrcsShot>

const ZodInvalidFrcsUnits = Invalid(ZodFrcsUnits.partial())

ZodInvalidFrcsUnits satisfies DeepMapJsonSchema<InvalidFrcsUnits>

const ZodInvalidFrcsTripHeader = Invalid(ZodFrcsTripHeader.partial())

ZodInvalidFrcsTripHeader satisfies DeepMapJsonSchema<InvalidFrcsTripHeader>

const ZodInvalidFrcsTrip = Invalid(
  z.strictObject({
    tripNumber: z.number().int().min(1).optional(),
    header: z.union([ZodInvalidFrcsTripHeader, ZodFrcsTripHeader]),
    units: z.union([ZodInvalidFrcsUnits, ZodFrcsUnits]),
    shots: z.array(z.union([ZodInvalidFrcsShot, ZodFrcsShot])),
  })
)

ZodInvalidFrcsTrip satisfies DeepMapJsonSchema<InvalidFrcsTrip>

export const ZodInvalidFrcsSurveyFileJson = z.strictObject({
  INVALID: ZodFrcsSurveyFileJson.extend({
    trips: z.array(z.union([ZodInvalidFrcsTrip, ZodFrcsTrip])),
  }),
  issues: z.array(ParseIssue),
})

ZodInvalidFrcsSurveyFileJson satisfies DeepMapJsonSchema<InvalidFrcsSurveyFile>

export const ZodValidOrInvalidFrcsSurveyFileJson = z.union([
  ZodInvalidFrcsSurveyFileJson,
  ZodFrcsSurveyFileJson,
])
