'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _mocha = require('mocha')

var _chai = require('chai')

var _index = require('./index')

var _unitized = require('@speleotica/unitized')

;(0, _mocha.describe)('parseFrcsTripSummaryFile', function() {
  ;(0, _mocha.it)(
    'basic test',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var parsed
        return _regenerator.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2
                  return (0, _index.parseFrcsTripSummaryFile)(
                    require.resolve('./STAT_sum.txt')
                  )

                case 2:
                  parsed = _context.sent
                  ;(0, _chai.expect)(parsed).to.deep.equal({
                    errors: [],
                    tripSummaries: [
                      {
                        tripNumber: 1,
                        tripIndex: 0,
                        date: new Date(81, 1, 15),
                        totalLength: _unitized.Length.feet(258.6),
                        numShots: 17,
                        name:
                          'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
                        excludedLength: _unitized.Length.feet(0),
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
                        totalLength: _unitized.Length.feet(1133.75),
                        numShots: 55,
                        name:
                          'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
                        excludedLength: _unitized.Length.feet(0),
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
                        totalLength: _unitized.Length.feet(2371.2),
                        numShots: 61,
                        name:
                          "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
                        excludedLength: _unitized.Length.feet(0),
                        numExcludedShots: 0,
                        team: [
                          'Peter Quick',
                          'Chris Gerace',
                          'Phil Oden',
                          'Chip Hopper',
                        ],
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

                case 4:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee,
          this
        )
      })
    )
  )
  ;(0, _mocha.it)(
    'old format',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var parsed
        return _regenerator.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2
                  return (0, _index.parseFrcsTripSummaryFile)(
                    require.resolve('./STAT_sum_old.txt')
                  )

                case 2:
                  parsed = _context2.sent
                  ;(0, _chai.expect)(parsed).to.deep.equal({
                    errors: [],
                    tripSummaries: [
                      {
                        tripNumber: 1,
                        tripIndex: 0,
                        date: new Date(81, 1, 15),
                        totalLength: _unitized.Length.feet(258.6),
                        numShots: 17,
                        name:
                          'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
                        excludedLength: _unitized.Length.feet(0),
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
                        totalLength: _unitized.Length.feet(2371.2),
                        numShots: 61,
                        name:
                          "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
                        excludedLength: _unitized.Length.feet(0),
                        numExcludedShots: 0,
                        team: [
                          'Peter Quick',
                          'Chris Gerace',
                          'Phil Oden',
                          'Chip Hopper',
                        ],
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

                case 4:
                case 'end':
                  return _context2.stop()
              }
            }
          },
          _callee2,
          this
        )
      })
    )
  )
})
