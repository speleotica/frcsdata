import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Unitize } from '@speleotica/unitized'
import { FrcsTripSummaryFile } from '../src'
import * as node from '../src/node'
import * as web from '../src/web'
import * as string from '../src/string'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { Readable } from 'node:stream'

describe('parseFrcsTripSummaryFile', function () {
  for (const [desc, parse] of [
    [
      'string',
      async () =>
        string.parseFrcsTripSummaryFile(
          'STAT_sum.txt',
          await fsPromises.readFile(require.resolve('./STAT_sum.txt'), 'utf8')
        ),
    ],
    [
      'node',
      async () =>
        node.parseFrcsTripSummaryFile(require.resolve('./STAT_sum.txt')),
    ],
    [
      'web',
      async () =>
        web.parseFrcsTripSummaryFile(
          'STAT_sum.txt',
          // @ts-expect-error no chunk type
          Readable.toWeb(fs.createReadStream(require.resolve('./STAT_sum.txt')))
        ),
    ],
  ] as [string, () => Promise<FrcsTripSummaryFile>][]) {
    it(desc, async function () {
      const parsed = await parse()
      expect(parsed).to.deep.equal({
        errors: [],
        tripSummaries: [
          {
            tripNumber: 1,
            tripIndex: 0,
            date: new Date(81, 1, 15),
            totalLength: Unitize.feet(258.6),
            numShots: 17,
            name: 'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
            excludedLength: Unitize.feet(0),
            numExcludedShots: 0,
            team: ['Peter Quick', 'Keith Ortiz'],
            shots: [
              'A1',
              'AD1-AD3',
              'AE1',
              'AE1 SIDE',
              'AE9 SIDE',
              'AE10-AE9',
              'AE13 SIDE',
              'AE15 SIDE',
              'AE20-AE11',
            ],
          },
          {
            tripNumber: 2,
            tripIndex: 1,
            date: new Date(81, 1, 14),
            totalLength: Unitize.feet(1133.75),
            numShots: 55,
            name: 'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
            excludedLength: Unitize.feet(0),
            numExcludedShots: 0,
            team: [
              'Dan Crowl',
              'Keith Ortiz',
              'Chip Hopper',
              'Peter Quick',
              'Larry Bean',
            ],
            shots: ['A1-A56'],
          },
          {
            tripNumber: 3,
            tripIndex: 2,
            date: new Date(81, 2, 6),
            totalLength: Unitize.feet(2371.2),
            numShots: 61,
            name: "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
            excludedLength: Unitize.feet(0),
            numExcludedShots: 0,
            team: ['Peter Quick', 'Chris Gerace', 'Phil Oden', 'Chip Hopper'],
            shots: [
              'A13 SIDE',
              'B1-B5',
              'B2 SIDE',
              'B3 SIDE',
              'B6-B18',
              'B17 SIDE',
              'B19-B38',
              'B32 SIDE',
              'BS1-BS5',
              'C1-C18',
            ],
          },
          {
            tripNumber: 4,
            tripIndex: 3,
            date: new Date('May 15 2021'),
            totalLength: Unitize.feet(3640.2),
            numShots: 154,
            name: 'Bibbity Bobbity BOOM Room',
            excludedLength: Unitize.feet(3441.57),
            numExcludedShots: 139,
            team: ['Andy Edwards', 'Julia Stuart', 'Eleonore Corvaisier'],
            shots: ['GB26-GB36', 'GB30 SIDE', 'GB31 SIDE'],
          },
        ],
      })
    })
  }
  it('old format', async function () {
    const parsed = await node.parseFrcsTripSummaryFile(
      require.resolve('./STAT_sum_old.txt')
    )
    expect(parsed).to.deep.equal({
      errors: [],
      tripSummaries: [
        {
          tripNumber: 1,
          tripIndex: 0,
          date: new Date(81, 1, 15),
          totalLength: Unitize.feet(258.6),
          numShots: 17,
          name: 'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
          excludedLength: Unitize.feet(0),
          numExcludedShots: 0,
          team: ['Peter Quick', 'Keith Ortiz'],
          shots: [
            'A1',
            'AD1-AD3',
            'AE1',
            'AE1 SIDE',
            'AE9 SIDE',
            'AE10-AE9',
            'AE13 SIDE',
            'AE15 SIDE',
            'AE20-AE11',
          ],
        },
        undefined,
        {
          tripNumber: 3,
          tripIndex: 2,
          date: new Date(81, 2, 6),
          totalLength: Unitize.feet(2371.2),
          numShots: 61,
          name: "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
          excludedLength: Unitize.feet(0),
          numExcludedShots: 0,
          team: ['Peter Quick', 'Chris Gerace', 'Phil Oden', 'Chip Hopper'],
          shots: [
            'A13 SIDE',
            'B1-B5',
            'B2 SIDE',
            'B3 SIDE',
            'B6-B18',
            'B17 SIDE',
            'B19-B38',
            'B32 SIDE',
            'BS1-BS5',
            'C1-C18',
          ],
        },
      ],
    })
  })
})
