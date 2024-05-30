import { describe, it } from 'mocha'
import { Unit, UnitizedNumber } from '@speleotica/unitized'
import { expect } from 'chai'
import * as node from '../src/node'
import * as web from '../src/web'
import * as string from '../src/string'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { Readable } from 'node:stream'
import { FrcsSurveyFile } from '../src'
import { ParseFrcsSurveyFileOptions } from '../src/parseFrcsSurveyFile'

const reviver = (key: any, x: any) =>
  x instanceof Unit || x instanceof UnitizedNumber ? x.toString() : x

describe('parseFrcsSurveyFile', () => {
  for (const [desc, parse] of [
    [
      'string',
      async () =>
        string.parseFrcsSurveyFile(
          'cdata.fr',
          await fsPromises.readFile(require.resolve('./cdata.fr'), 'utf8')
        ),
    ],
    [
      'node',
      async () => node.parseFrcsSurveyFile(require.resolve('./cdata.fr')),
    ],
    [
      'web',
      async () =>
        // @ts-expect-error no chunk type
        web.parseFrcsSurveyFile(
          'cdata.fr',
          Readable.toWeb(fs.createReadStream(require.resolve('./cdata.fr')))
        ),
    ],
  ] as [string, () => Promise<FrcsSurveyFile>][]) {
    it(desc, async function () {
      const parsed = await parse()
      // console.log(JSON.stringify(parsed, reviver, 2))
      expect(JSON.parse(JSON.stringify(parsed, reviver, 2))).to.deep.equal({
        cave: 'Fisher Ridge Cave System',
        location: 'Hart Co., KY',
        trips: [
          {
            header: {
              name: 'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
              comment: 'This File has Crumps test connected.  11/20/12',
              distanceUnit: 'ft',
              azimuthUnit: 'deg',
              inclinationUnit: 'deg',
              backsightAzimuthCorrected: true,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
            },
            shots: [
              {
                from: 'AE20',
                to: null,
                kind: ' ',
                distance: '0 ft',
                frontsightAzimuth: null,
                backsightAzimuth: null,
                frontsightInclination: null,
                backsightInclination: null,
                fromLruds: {
                  left: '1 ft',
                  right: '3 ft',
                  up: '0 ft',
                  down: '2 ft',
                },
                excludeDistance: true,
                comment: null,
              },
              {
                from: 'AE20',
                to: 'AE19',
                kind: ' ',
                distance: '9.3 ft',
                frontsightAzimuth: '60 deg',
                backsightAzimuth: '60 deg',
                frontsightInclination: '-36 deg',
                backsightInclination: null,
                toLruds: {
                  left: '2 ft',
                  right: '12 ft',
                  up: '0 ft',
                  down: '20 ft',
                },
                excludeDistance: false,
                comment:
                  "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",
              },
              {
                from: 'AE19',
                to: 'AE18',
                kind: ' ',
                distance: '24.5 ft',
                frontsightAzimuth: '0 deg',
                backsightAzimuth: '0 deg',
                frontsightInclination: '-90 deg',
                backsightInclination: null,
                toLruds: {
                  left: '6 ft',
                  right: '10 ft',
                  up: '25 ft',
                  down: '0 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE18',
                to: 'AE17',
                kind: ' ',
                distance: '8 ft',
                frontsightAzimuth: '350.5 deg',
                backsightAzimuth: '350.5 deg',
                frontsightInclination: '17 deg',
                backsightInclination: null,
                toLruds: {
                  left: '3 ft',
                  right: '5 ft',
                  up: '0 ft',
                  down: '0 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE17',
                to: 'AE16',
                kind: ' ',
                distance: '6.7 ft',
                frontsightAzimuth: '0 deg',
                backsightAzimuth: '0 deg',
                frontsightInclination: '-90 deg',
                backsightInclination: null,
                toLruds: {
                  left: '3 ft',
                  right: '5 ft',
                  up: '6 ft',
                  down: '1 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE16',
                to: 'AE15',
                kind: ' ',
                distance: '12.6 ft',
                frontsightAzimuth: '70.5 deg',
                backsightAzimuth: '71 deg',
                frontsightInclination: '-18 deg',
                backsightInclination: null,
                toLruds: {
                  left: '4 ft',
                  right: '0 ft',
                  up: '2 ft',
                  down: '1 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE15',
                to: 'AE14',
                kind: ' ',
                distance: '10 ft',
                frontsightAzimuth: '21.5 deg',
                backsightAzimuth: '20 deg',
                frontsightInclination: '6 deg',
                backsightInclination: null,
                toLruds: {
                  left: '5 ft',
                  right: '5 ft',
                  up: '0 ft',
                  down: '3 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE14',
                to: 'AE13',
                kind: ' ',
                distance: '26.8 ft',
                frontsightAzimuth: '288 deg',
                backsightAzimuth: '286 deg',
                frontsightInclination: '-50 deg',
                backsightInclination: null,
                toLruds: {
                  left: '0 ft',
                  right: '7 ft',
                  up: '20 ft',
                  down: '5 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AE13',
                to: 'AE12',
                kind: ' ',
                distance: '20.7 ft',
                frontsightAzimuth: '236 deg',
                backsightAzimuth: '236 deg',
                frontsightInclination: '34 deg',
                backsightInclination: null,
                toLruds: {
                  left: '3 ft',
                  right: '5 ft',
                  up: '4 ft',
                  down: '4 ft',
                },
                excludeDistance: false,
                comment: 'SHORT CANYON AT THE BASE OF THE SECOND DROP',
              },
            ],
          },
          {
            header: {
              name: 'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
              comment: null,
              distanceUnit: 'in',
              azimuthUnit: 'deg',
              inclinationUnit: 'deg',
              backsightAzimuthCorrected: false,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
            },
            shots: [
              {
                from: 'A1',
                to: 'A2',
                kind: ' ',
                distance: '586 in',
                frontsightAzimuth: '292 deg',
                backsightAzimuth: '110 deg',
                frontsightInclination: '-42 deg',
                backsightInclination: null,
                toLruds: {
                  left: '5 ft',
                  right: '10 ft',
                  up: '35 ft',
                  down: '5 ft',
                },
                excludeDistance: false,
                comment: null,
                fromLruds: {
                  left: '2 ft',
                  right: '7 ft',
                  up: '3 ft',
                  down: '4.5 ft',
                },
              },
              {
                from: 'A2',
                to: 'A3',
                kind: ' ',
                distance: '149 in',
                frontsightAzimuth: '333.5 deg',
                backsightAzimuth: '153.5 deg',
                frontsightInclination: '35 deg',
                backsightInclination: null,
                toLruds: {
                  left: '3 ft',
                  right: '1 ft',
                  up: '15 ft',
                  down: '5 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'A3',
                to: 'A4',
                kind: ' ',
                distance: '50 in',
                frontsightAzimuth: '0 deg',
                backsightAzimuth: '0 deg',
                frontsightInclination: '90 deg',
                backsightInclination: null,
                toLruds: {
                  left: '3 ft',
                  right: '1 ft',
                  up: '10 ft',
                  down: '10 ft',
                },
                excludeDistance: false,
                comment: null,
              },
            ],
          },
          {
            header: {
              name: "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
              comment: null,
              distanceUnit: 'ft',
              azimuthUnit: 'deg',
              inclinationUnit: 'deg',
              backsightAzimuthCorrected: true,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
            },
            shots: [
              {
                from: 'B30',
                to: 'B31',
                kind: ' ',
                distance: '13.7 ft',
                frontsightAzimuth: '0 deg',
                backsightAzimuth: '0 deg',
                frontsightInclination: '40 deg',
                backsightInclination: null,
                toLruds: {
                  left: '2 ft',
                  right: '4 ft',
                  up: '6 ft',
                  down: null,
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'B30',
                to: 'B30sp',
                kind: ' ',
                distance: '13.7 ft',
                frontsightAzimuth: '0 deg',
                backsightAzimuth: '0 deg',
                frontsightInclination: '40 deg',
                backsightInclination: null,
                toLruds: {
                  left: '2 ft',
                  right: '4 ft',
                  up: '6 ft',
                  down: null,
                },
                excludeDistance: true,
                comment: null,
                isSplay: true,
              },
            ],
          },
          {
            header: {
              name: '"Skill Issue Complex" and other Nebulous Borehole leads',
              comment: null,
              distanceUnit: 'ft',
              azimuthUnit: 'deg',
              inclinationUnit: 'deg',
              backsightAzimuthCorrected: false,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: true,
            },
            shots: [
              {
                from: 'AJA1',
                to: 'AJA2',
                kind: ' ',
                distance: '15.4 ft',
                frontsightAzimuth: '146.4 deg',
                backsightAzimuth: '326.8 deg',
                frontsightInclination: '-61.7 deg',
                backsightInclination: '61.7 deg',
                toLruds: {
                  left: '4 ft',
                  right: '4 ft',
                  up: '36 ft',
                  down: '2 ft',
                },
                excludeDistance: false,
                comment: null,
              },
              {
                from: 'AJF16',
                to: 'WEG1',
                kind: ' ',
                distance: '12.9 ft',
                frontsightAzimuth: '337.7 deg',
                backsightAzimuth: '158.5 deg',
                frontsightInclination: '29 deg',
                backsightInclination: '-29 deg',
                toLruds: {
                  left: '7 ft',
                  right: '14 ft',
                  up: '30 ft',
                  down: '8 ft',
                },
                excludeDistance: false,
                comment: null,
                recorded: {
                  from: 'AJF16',
                  to: 'WEG1',
                  kind: ' ',
                  distance: '12.9 ft',
                  frontsightAzimuth: '337.7 deg',
                  backsightAzimuth: '338.5 deg',
                  frontsightInclination: '29 deg',
                  backsightInclination: '29 deg',
                  toLruds: {
                    left: '7 ft',
                    right: '14 ft',
                    up: '30 ft',
                    down: '8 ft',
                  },
                  excludeDistance: false,
                  comment: null,
                  units: {
                    distanceUnit: 'ft',
                    azimuthUnit: 'deg',
                    inclinationUnit: 'deg',
                    backsightAzimuthCorrected: true,
                    backsightInclinationCorrected: true,
                    hasBacksightAzimuth: true,
                    hasBacksightInclination: true,
                  },
                },
              },
              {
                from: 'WEG1',
                to: 'WEG2',
                kind: ' ',
                distance: '27.1 ft',
                frontsightAzimuth: '349.4 deg',
                backsightAzimuth: '169.39999999999998 deg',
                frontsightInclination: '11.1 deg',
                backsightInclination: '-10.8 deg',
                toLruds: {
                  left: '50 ft',
                  right: '15 ft',
                  up: '4 ft',
                  down: '10 ft',
                },
                excludeDistance: false,
                comment: null,
                recorded: {
                  from: 'WEG1',
                  to: 'WEG2',
                  kind: ' ',
                  distance: '27.1 ft',
                  frontsightAzimuth: '349.4 deg',
                  backsightAzimuth: '349.4 deg',
                  frontsightInclination: '11.1 deg',
                  backsightInclination: '10.8 deg',
                  toLruds: {
                    left: '50 ft',
                    right: '15 ft',
                    up: '4 ft',
                    down: '10 ft',
                  },
                  excludeDistance: false,
                  comment: null,
                },
              },
            ],
          },
        ],
        errors: [],
      })
    })
  }
  it(`custom column config`, async function () {
    const data = `      *
$ID: 12
       *
MM    DD  0.34
           012A0
   012A1   012A0  1.90    78.5 261.0 -31.         .3    .4   0.0  11.6
   012A2   012A1 11.64              -90.0         .3    .4  11.6   0.0
  012A2'   012A2  5.85         276.0+12.5        3.0   1.0  17.0    .1
    `
    const options: ParseFrcsSurveyFileOptions = {
      columns: {
        toStation: 8,
        fromStation: 8,
        distance: 6,
        distanceFeet: 4,
        distanceInches: 3,
        kind: 1,
        exclude: 1,
        frontsightAzimuth: 6,
        backsightAzimuth: 6,
        frontsightInclination: 5,
        backsightInclination: 5,
        left: 6,
        right: 6,
        up: 6,
        down: 6,
      },
    }
    const parsed = await string.parseFrcsSurveyFile('test.txt', data, options)
    // console.log(JSON.stringify(parsed, reviver, 2))
    expect(JSON.parse(JSON.stringify(parsed, reviver, 2))).to.deep.equal({
      cave: '$ID: 12',
      location: null,
      trips: [
        {
          header: {
            name: '',
            comment: null,
            distanceUnit: 'm',
            azimuthUnit: 'deg',
            inclinationUnit: 'deg',
            backsightAzimuthCorrected: false,
            backsightInclinationCorrected: false,
            hasBacksightAzimuth: false,
            hasBacksightInclination: false,
          },
          shots: [
            {
              from: '012A0',
              to: null,
              kind: ' ',
              distance: '0 m',
              frontsightAzimuth: null,
              backsightAzimuth: null,
              frontsightInclination: null,
              backsightInclination: null,
              fromLruds: {
                left: null,
                right: null,
                up: null,
                down: null,
              },
              excludeDistance: true,
              comment: null,
            },
            {
              from: '012A0',
              to: '012A1',
              kind: ' ',
              distance: '1.9 m',
              frontsightAzimuth: '78.5 deg',
              backsightAzimuth: '261 deg',
              frontsightInclination: '-31 deg',
              backsightInclination: null,
              toLruds: {
                left: '0.3 m',
                right: '0.4 m',
                up: '0 m',
                down: '11.6 m',
              },
              excludeDistance: false,
              comment: null,
            },
            {
              from: '012A1',
              to: '012A2',
              kind: ' ',
              distance: '11.64 m',
              frontsightAzimuth: null,
              backsightAzimuth: null,
              frontsightInclination: '-90 deg',
              backsightInclination: null,
              toLruds: {
                left: '0.3 m',
                right: '0.4 m',
                up: '11.6 m',
                down: '0 m',
              },
              excludeDistance: false,
              comment: null,
            },
            {
              from: '012A2',
              to: "012A2'",
              kind: ' ',
              distance: '5.85 m',
              frontsightAzimuth: null,
              backsightAzimuth: '276 deg',
              frontsightInclination: '12.5 deg',
              backsightInclination: null,
              toLruds: {
                left: '3 m',
                right: '1 m',
                up: '17 m',
                down: '0.1 m',
              },
              excludeDistance: false,
              comment: null,
            },
          ],
        },
      ],
      errors: [],
    })
  })
})
