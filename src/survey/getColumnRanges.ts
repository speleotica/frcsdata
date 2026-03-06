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

export function getColumnRanges(config: FrcsShotColumnConfig): {
  decimal: ColumnRanges
  feetAndInches: ColumnRanges
} {
  const decimal: ColumnRanges = {
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
  const feetAndInches: ColumnRanges = {
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
    decimal[key][0] = c
    decimal[key][1] = c + value
    c += value
  }
  c = 0
  for (const [key, value] of Object.entries(config) as [
    keyof FrcsShotColumnConfig,
    FrcsShotColumnConfig[keyof FrcsShotColumnConfig]
  ][]) {
    if (key === 'distance') continue
    const width = key === 'frontsightAzimuth' ? value - 1 : value
    feetAndInches[key][0] = c
    feetAndInches[key][1] = c + width
    c += width
  }
  return { decimal, feetAndInches }
}
