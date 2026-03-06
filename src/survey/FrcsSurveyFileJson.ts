import {
  FrcsSurveyFile,
  InvalidFrcsSurveyFile,
  ParseFrcsSurveyFileOptions,
} from './FrcsSurveyFile'

import { Unit, Length, Angle, UnitizedNumber } from '@speleotica/unitized'
import { ParseIssue } from '../ParseIssue'
import { SourceLoc } from '../SourceLoc'

export type JsonLengthUnit = 'm' | 'km' | 'cm' | 'ft' | 'mi' | 'yd' | 'in'
export type JsonAngleUnit = 'rad' | 'deg' | 'grad' | 'mil' | '%'

export type JsonLength = [number, JsonLengthUnit]
export type JsonAngle = [number, JsonAngleUnit]

export type DeepMapJson<T> = T extends
  | string
  | number
  | boolean
  | undefined
  | ParseIssue
  | SourceLoc
  ? T
  : T extends Date
  ? string
  : T extends readonly (infer E)[]
  ? DeepMapJson<E>[]
  : T extends Unit<Length>
  ? JsonLengthUnit
  : T extends Unit<Angle>
  ? JsonAngleUnit
  : T extends UnitizedNumber<Length>
  ? JsonLength
  : T extends UnitizedNumber<Angle>
  ? JsonAngle
  : {
      [K in keyof T]: DeepMapJson<T[K]>
    }

export type FrcsSurveyFileJson = DeepMapJson<FrcsSurveyFile>

export type InvalidFrcsSurveyFileJson = DeepMapJson<InvalidFrcsSurveyFile>

export type ParseFrcsSurveyFileOptionsJson =
  DeepMapJson<ParseFrcsSurveyFileOptions>
