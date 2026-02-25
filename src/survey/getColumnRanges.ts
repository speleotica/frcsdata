import type { FrcsShotColumnConfig } from './FrcsSurveyFile'

type ColumnRanges = {
  toStation: [number, number]
  fromStation: [number, number]
  distance: [number, number]
  distanceFeet: [number, number]
  distanceInches: [number, number]
  kind: [number, number]
  exclude: [number, number]
  frontsightAzimuth: [number, number]
  backsightAzimuth: [number, number]
  frontsightInclination: [number, number]
  backsightInclination: [number, number]
  left: [number, number]
  right: [number, number]
  up: [number, number]
  down: [number, number]
}
export function getColumnRanges(config: FrcsShotColumnConfig): ColumnRanges {
  const result: ColumnRanges = {
    toStation: [0, 0],
    fromStation: [0, 0],
    distance: [0, 0],
    distanceFeet: [0, 0],
    distanceInches: [0, 0],
    kind: [0, 0],
    exclude: [0, 0],
    frontsightAzimuth: [0, 0],
    backsightAzimuth: [0, 0],
    frontsightInclination: [0, 0],
    backsightInclination: [0, 0],
    left: [0, 0],
    right: [0, 0],
    up: [0, 0],
    down: [0, 0],
  }

  let c = 0
  for (const [key, value] of Object.entries(config) as [
    keyof FrcsShotColumnConfig,
    FrcsShotColumnConfig[keyof FrcsShotColumnConfig]
  ][]) {
    if (key === 'distanceFeet' || key === 'distanceInches') continue
    result[key][0] = c
    result[key][1] = c + value
    c += value
  }
  if (config.distanceFeet) {
    result.distanceFeet[0] = result.distance[0]
    result.distanceFeet[1] = result.distance[0] + config.distanceFeet
    result.distanceInches[0] = result.distanceFeet[1]
    result.distanceInches[1] = result.distanceFeet[1] + config.distanceInches
  }
  return result
}
