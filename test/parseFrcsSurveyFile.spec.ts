import { describe, it } from 'mocha'
import { Length, Angle, Unitize } from '@speleotica/unitized'
import { expect } from 'chai'
import { FrcsShotKind } from '../src/FrcsShot'
import * as node from '../src/node'
import * as web from '../src/web'
import * as string from '../src/string'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { Readable } from 'node:stream'
import { FrcsSurveyFile } from '../src'

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
        web.parseFrcsSurveyFile(
          'cdata.fr',
          // @ts-expect-error no chunk type
          Readable.toWeb(fs.createReadStream(require.resolve('./cdata.fr')))
        ),
    ],
  ] as [string, () => Promise<FrcsSurveyFile>][]) {
    it(desc, async function () {
      const parsed = await parse()
      // console.log(
      //   JSON.stringify(
      //     parsed,
      //     (key, x) =>
      //       x instanceof Unit || x instanceof UnitizedNumber ? x.toString() : x,
      //     2
      //   )
      // )
      expect(parsed).to.deep.equal({
        cave: 'Fisher Ridge Cave System',
        errors: [],
        location: 'Hart Co., KY',
        trips: [
          {
            header: {
              name: 'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
              comment: 'This File has Crumps test connected.  11/20/12',
              section: undefined,
              date: undefined,
              team: undefined,
              distanceUnit: Length.feet,
              azimuthUnit: Angle.degrees,
              inclinationUnit: Angle.degrees,
              backsightAzimuthCorrected: true,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
            },
            shots: [
              {
                backsightAzimuth: null,
                backsightInclination: null,
                comment: null,
                distance: Unitize.feet(0),
                excludeDistance: true,
                from: 'AE20',
                frontsightAzimuth: null,
                frontsightInclination: null,
                kind: FrcsShotKind.Normal,
                to: null,

                fromLruds: {
                  left: Unitize.feet(1),
                  right: Unitize.feet(3),
                  up: Unitize.feet(0),
                  down: Unitize.feet(2),
                },
              },
              {
                from: 'AE20',
                to: 'AE19',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(9.3),
                frontsightAzimuth: Unitize.degrees(60),
                backsightAzimuth: Unitize.degrees(60),
                frontsightInclination: Unitize.degrees(-36),
                backsightInclination: null,
                excludeDistance: false,
                comment:
                  "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",

                toLruds: {
                  left: Unitize.feet(2),
                  right: Unitize.feet(12),
                  up: Unitize.feet(0),
                  down: Unitize.feet(20),
                },
              },
              {
                from: 'AE19',
                to: 'AE18',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(24.5),
                frontsightAzimuth: Unitize.degrees(0),
                backsightAzimuth: Unitize.degrees(0),
                frontsightInclination: Unitize.degrees(-90),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(6),
                  right: Unitize.feet(10),
                  up: Unitize.feet(25),
                  down: Unitize.feet(0),
                },
              },
              {
                from: 'AE18',
                to: 'AE17',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(8),
                frontsightAzimuth: Unitize.degrees(350.5),
                backsightAzimuth: Unitize.degrees(350.5),
                frontsightInclination: Unitize.degrees(17),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(3),
                  right: Unitize.feet(5),
                  up: Unitize.feet(0),
                  down: Unitize.feet(0),
                },
              },
              {
                from: 'AE17',
                to: 'AE16',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(6.7),
                frontsightAzimuth: Unitize.degrees(0),
                backsightAzimuth: Unitize.degrees(0),
                frontsightInclination: Unitize.degrees(-90),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(3),
                  right: Unitize.feet(5),
                  up: Unitize.feet(6),
                  down: Unitize.feet(1),
                },
              },
              {
                from: 'AE16',
                to: 'AE15',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(12.6),
                frontsightAzimuth: Unitize.degrees(70.5),
                backsightAzimuth: Unitize.degrees(71),
                frontsightInclination: Unitize.degrees(-18),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(4),
                  right: Unitize.feet(0),
                  up: Unitize.feet(2),
                  down: Unitize.feet(1),
                },
              },
              {
                from: 'AE15',
                to: 'AE14',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(10),
                frontsightAzimuth: Unitize.degrees(21.5),
                backsightAzimuth: Unitize.degrees(20),
                frontsightInclination: Unitize.degrees(6),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(5),
                  right: Unitize.feet(5),
                  up: Unitize.feet(0),
                  down: Unitize.feet(3),
                },
              },
              {
                from: 'AE14',
                to: 'AE13',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(26.8),
                frontsightAzimuth: Unitize.degrees(288),
                backsightAzimuth: Unitize.degrees(286),
                frontsightInclination: Unitize.degrees(-50),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(0),
                  right: Unitize.feet(7),
                  up: Unitize.feet(20),
                  down: Unitize.feet(5),
                },
              },
              {
                from: 'AE13',
                to: 'AE12',
                kind: FrcsShotKind.Normal,
                distance: Unitize.feet(20.7),
                frontsightAzimuth: Unitize.degrees(236),
                backsightAzimuth: Unitize.degrees(236),
                frontsightInclination: Unitize.degrees(34),
                backsightInclination: null,
                excludeDistance: false,
                comment: 'SHORT CANYON AT THE BASE OF THE SECOND DROP',

                toLruds: {
                  left: Unitize.feet(3),
                  right: Unitize.feet(5),
                  up: Unitize.feet(4),
                  down: Unitize.feet(4),
                },
              },
            ],
          },
          {
            header: {
              name: 'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
              comment: null,
              section: undefined,
              date: undefined,
              team: undefined,
              distanceUnit: Length.inches,
              azimuthUnit: Angle.degrees,
              inclinationUnit: Angle.degrees,
              backsightAzimuthCorrected: false,
              backsightInclinationCorrected: false,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
            },
            shots: [
              {
                from: 'A1',
                to: 'A2',
                kind: FrcsShotKind.Normal,
                distance: Unitize.inches(48 * 12 + 10),
                frontsightAzimuth: Unitize.degrees(292),
                backsightAzimuth: Unitize.degrees(110),
                frontsightInclination: Unitize.degrees(-42),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,
                fromLruds: {
                  left: Unitize.feet(2),
                  right: Unitize.feet(7),
                  up: Unitize.feet(3),
                  down: Unitize.feet(4.5),
                },
                toLruds: {
                  left: Unitize.feet(5),
                  right: Unitize.feet(10),
                  up: Unitize.feet(35),
                  down: Unitize.feet(5),
                },
              },
              {
                from: 'A2',
                to: 'A3',
                kind: FrcsShotKind.Normal,
                distance: Unitize.inches(12 * 12 + 5),
                frontsightAzimuth: Unitize.degrees(333.5),
                backsightAzimuth: Unitize.degrees(153.5),
                frontsightInclination: Unitize.degrees(35),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(3),
                  right: Unitize.feet(1),
                  up: Unitize.feet(15),
                  down: Unitize.feet(5),
                },
              },
              {
                from: 'A3',
                to: 'A4',
                kind: FrcsShotKind.Normal,
                distance: Unitize.inches(4 * 12 + 2),
                frontsightAzimuth: Unitize.degrees(0),
                backsightAzimuth: Unitize.degrees(0),
                frontsightInclination: Unitize.degrees(90),
                backsightInclination: null,
                excludeDistance: false,
                comment: null,

                toLruds: {
                  left: Unitize.feet(3),
                  right: Unitize.feet(1),
                  up: Unitize.feet(10),
                  down: Unitize.feet(10),
                },
              },
            ],
          },
          {
            header: {
              azimuthUnit: Angle.degrees,
              backsightAzimuthCorrected: true,
              backsightInclinationCorrected: false,
              comment: null,
              date: undefined,
              distanceUnit: Length.feet,
              hasBacksightAzimuth: true,
              hasBacksightInclination: false,
              inclinationUnit: Angle.degrees,
              name: "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
              section: undefined,
              team: undefined,
            },
            shots: [
              {
                backsightAzimuth: Unitize.degrees(0),
                backsightInclination: null,
                comment: null,
                distance: Unitize.feet(13.7),
                excludeDistance: false,
                from: 'B30',
                frontsightAzimuth: Unitize.degrees(0),
                frontsightInclination: Unitize.degrees(40),
                kind: ' ',
                to: 'B31',

                toLruds: {
                  left: Unitize.feet(2),
                  right: Unitize.feet(4),
                  up: Unitize.feet(6),
                  down: null,
                },
              },
              {
                backsightAzimuth: Unitize.degrees(0),
                backsightInclination: null,
                comment: null,
                distance: Unitize.feet(13.7),
                excludeDistance: true,
                isSplay: true,
                from: 'B30',
                frontsightAzimuth: Unitize.degrees(0),
                frontsightInclination: Unitize.degrees(40),
                kind: ' ',
                to: 'B30sp',
                toLruds: {
                  left: Unitize.feet(2),
                  right: Unitize.feet(4),
                  up: Unitize.feet(6),
                  down: null,
                },
              },
            ],
          },
          {
            header: {
              azimuthUnit: Angle.degrees,
              backsightAzimuthCorrected: false,
              backsightInclinationCorrected: false,
              comment: null,
              date: undefined,
              distanceUnit: Length.feet,
              hasBacksightAzimuth: true,
              hasBacksightInclination: true,
              inclinationUnit: Angle.degrees,
              name: `"Skill Issue Complex" and other Nebulous Borehole leads`,
              section: undefined,
              team: undefined,
            },
            shots: [
              {
                backsightAzimuth: Unitize.degrees(326.8),
                backsightInclination: Unitize.degrees(61.7),
                comment: null,
                distance: Unitize.feet(15.4),
                excludeDistance: false,
                from: 'AJA1',
                frontsightAzimuth: Unitize.degrees(146.4),
                frontsightInclination: Unitize.degrees(-61.7),
                kind: ' ',
                to: 'AJA2',
                toLruds: {
                  left: Unitize.feet(4),
                  right: Unitize.feet(4),
                  up: Unitize.feet(36),
                  down: Unitize.feet(2),
                },
              },
              {
                backsightAzimuth: Unitize.degrees(338.5 - 180),
                backsightInclination: Unitize.degrees(-29),
                comment: null,
                distance: Unitize.feet(12.9),
                excludeDistance: false,
                from: 'AJF16',
                frontsightAzimuth: Unitize.degrees(337.7),
                frontsightInclination: Unitize.degrees(29),
                kind: ' ',
                to: 'WEG1',
                toLruds: {
                  left: Unitize.feet(7),
                  right: Unitize.feet(14),
                  up: Unitize.feet(30),
                  down: Unitize.feet(8),
                },
                recorded: {
                  backsightAzimuth: Unitize.degrees(338.5),
                  backsightInclination: Unitize.degrees(29),
                  comment: null,
                  distance: Unitize.feet(12.9),
                  excludeDistance: false,
                  from: 'AJF16',
                  frontsightAzimuth: Unitize.degrees(337.7),
                  frontsightInclination: Unitize.degrees(29),
                  kind: ' ',
                  to: 'WEG1',
                  toLruds: {
                    left: Unitize.feet(7),
                    right: Unitize.feet(14),
                    up: Unitize.feet(30),
                    down: Unitize.feet(8),
                  },
                  units: {
                    distanceUnit: Length.feet,
                    inclinationUnit: Angle.degrees,
                    azimuthUnit: Angle.degrees,
                    backsightAzimuthCorrected: true,
                    backsightInclinationCorrected: true,
                    hasBacksightAzimuth: true,
                    hasBacksightInclination: true,
                  },
                },
              },
              {
                backsightAzimuth: Unitize.degrees(349.4 - 180),
                backsightInclination: Unitize.degrees(-10.8),
                comment: null,
                distance: Unitize.feet(27.1),
                excludeDistance: false,
                from: 'WEG1',
                frontsightAzimuth: Unitize.degrees(349.4),
                frontsightInclination: Unitize.degrees(11.1),
                kind: ' ',
                to: 'WEG2',
                toLruds: {
                  left: Unitize.feet(50),
                  right: Unitize.feet(15),
                  up: Unitize.feet(4),
                  down: Unitize.feet(10),
                },
                recorded: {
                  backsightAzimuth: Unitize.degrees(349.4),
                  backsightInclination: Unitize.degrees(10.8),
                  comment: null,
                  distance: Unitize.feet(27.1),
                  excludeDistance: false,
                  from: 'WEG1',
                  frontsightAzimuth: Unitize.degrees(349.4),
                  frontsightInclination: Unitize.degrees(11.1),
                  kind: ' ',
                  to: 'WEG2',
                  toLruds: {
                    left: Unitize.feet(50),
                    right: Unitize.feet(15),
                    up: Unitize.feet(4),
                    down: Unitize.feet(10),
                  },
                },
              },
            ],
          },
        ],
      })
    })
  }
})
