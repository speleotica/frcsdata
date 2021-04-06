'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _mocha = require('mocha')

var _index = require('./index')

var _unitized = require('@speleotica/unitized')

var _chai = require('chai')

var _FrcsShot = require('../FrcsShot')

var _parseSegment = require('parse-segment')

var data =
  "      Fisher Ridge Cave System, Hart Co., KY\nENTRANCE DROPS, JOE'S \"I LOVE MY WIFE TRAVERSE\", TRICKY TRAVERSE\nPETER QUICK, KEITH ORTIZ   -  2-15-81\nThis File has Crumps test connected.  11/20/12\n *\nFT C  DD    A\n      AE20     0                          1  3  0  2\n*      %FS\n*     AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12\n AE19 AE20   9.3    60.0  60.0-36.0       2 12  0 20\n AE18 AE19  24.5     0.0   0.0-90.0       6 10 25  0\n AE17 AE18   8.0   350.5 350.5 17.0       3  5  0  0\n AE16 AE17   6.7     0.0   0.0-90.0       3  5  6  1\n AE15 AE16  12.6    70.5  71.0-18.0       4  0  2  1\n AE14 AE15  10.0    21.5  20.0  6.0       5  5  0  3\n AE13 AE14  26.8   288.0 286.0-50.0       0  7 20  5\n*\n*SHORT CANYON AT THE BASE OF THE SECOND DROP\n AE12 AE13  20.7   236.0 236.0 34.0       3  5  4  4\n *\nTRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY\nDAN CROWL, KEITH ORTIZ, CHIP HOPPER, PETER QUICK, LARRY BEAN    14 FEB 1981\n *\nFI B  DD\n   A2   A1  48 10  292.0 110.0-42.0       5 10 35  5\n   A3   A2  12  5  333.5 153.5 35.0       3  1 15  5\n   A4   A3   4  2    0.0   0.0 90.0       3  1 10 10\n"
;(0, _mocha.describe)('parseFrcsSurveyFile', function() {
  ;(0, _mocha.it)(
    'basic test',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee() {
        var parsed
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 2:
                parsed = _context.sent
                ;(0, _chai.expect)(parsed).to.deep.equal({
                  cave: 'Fisher Ridge Cave System',
                  errors: [],
                  location: 'Hart Co., KY',
                  trips: [
                    {
                      header: {
                        name:
                          'ENTRANCE DROPS, JOE\'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE',
                        comment:
                          'This File has Crumps test connected.  11/20/12',
                        section: undefined,
                        date: undefined,
                        team: undefined,
                        distanceUnit: _unitized.Length.feet,
                        azimuthUnit: _unitized.Angle.degrees,
                        inclinationUnit: _unitized.Angle.degrees,
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
                          distance: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(2),
                          excludeDistance: true,
                          from: 'AE20',
                          frontsightAzimuth: null,
                          frontsightInclination: null,
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          left: _unitized.Unitize.feet(1),
                          right: _unitized.Unitize.feet(3),
                          to: null,
                          up: _unitized.Unitize.feet(0),
                        },
                        {
                          from: 'AE20',
                          to: 'AE19',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(9.3),
                          frontsightAzimuth: _unitized.Unitize.degrees(60),
                          backsightAzimuth: _unitized.Unitize.degrees(60),
                          frontsightInclination: _unitized.Unitize.degrees(-36),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(2),
                          right: _unitized.Unitize.feet(12),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(20),
                          excludeDistance: false,
                          comment:
                            "AE20     0        0        0        Bug-can't put before so put after-so can't make 2 fixed 10/28/12",
                        },
                        {
                          from: 'AE19',
                          to: 'AE18',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(24.5),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(-90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(6),
                          right: _unitized.Unitize.feet(10),
                          up: _unitized.Unitize.feet(25),
                          down: _unitized.Unitize.feet(0),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE18',
                          to: 'AE17',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(8),
                          frontsightAzimuth: _unitized.Unitize.degrees(350.5),
                          backsightAzimuth: _unitized.Unitize.degrees(350.5),
                          frontsightInclination: _unitized.Unitize.degrees(17),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(0),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE17',
                          to: 'AE16',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(6.7),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(-90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(6),
                          down: _unitized.Unitize.feet(1),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE16',
                          to: 'AE15',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(12.6),
                          frontsightAzimuth: _unitized.Unitize.degrees(70.5),
                          backsightAzimuth: _unitized.Unitize.degrees(71),
                          frontsightInclination: _unitized.Unitize.degrees(-18),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(4),
                          right: _unitized.Unitize.feet(0),
                          up: _unitized.Unitize.feet(2),
                          down: _unitized.Unitize.feet(1),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE15',
                          to: 'AE14',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(10),
                          frontsightAzimuth: _unitized.Unitize.degrees(21.5),
                          backsightAzimuth: _unitized.Unitize.degrees(20),
                          frontsightInclination: _unitized.Unitize.degrees(6),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(5),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(0),
                          down: _unitized.Unitize.feet(3),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE14',
                          to: 'AE13',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(26.8),
                          frontsightAzimuth: _unitized.Unitize.degrees(288),
                          backsightAzimuth: _unitized.Unitize.degrees(286),
                          frontsightInclination: _unitized.Unitize.degrees(-50),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(0),
                          right: _unitized.Unitize.feet(7),
                          up: _unitized.Unitize.feet(20),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'AE13',
                          to: 'AE12',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.feet(20.7),
                          frontsightAzimuth: _unitized.Unitize.degrees(236),
                          backsightAzimuth: _unitized.Unitize.degrees(236),
                          frontsightInclination: _unitized.Unitize.degrees(34),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(5),
                          up: _unitized.Unitize.feet(4),
                          down: _unitized.Unitize.feet(4),
                          excludeDistance: false,
                          comment:
                            'SHORT CANYON AT THE BASE OF THE SECOND DROP',
                        },
                      ],
                    },
                    {
                      header: {
                        name:
                          'TRICKY TRAVERSE AND THEN FIRST SURVEY IN UPPER CROWLWAY',
                        comment: null,
                        section: undefined,
                        date: undefined,
                        team: undefined,
                        distanceUnit: _unitized.Length.inches,
                        azimuthUnit: _unitized.Angle.degrees,
                        inclinationUnit: _unitized.Angle.degrees,
                        backsightAzimuthCorrected: false,
                        backsightInclinationCorrected: false,
                        hasBacksightAzimuth: true,
                        hasBacksightInclination: false,
                      },
                      shots: [
                        {
                          from: 'A1',
                          to: 'A2',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(48 * 12 + 10),
                          frontsightAzimuth: _unitized.Unitize.degrees(292),
                          backsightAzimuth: _unitized.Unitize.degrees(110),
                          frontsightInclination: _unitized.Unitize.degrees(-42),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(5),
                          right: _unitized.Unitize.feet(10),
                          up: _unitized.Unitize.feet(35),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'A2',
                          to: 'A3',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(12 * 12 + 5),
                          frontsightAzimuth: _unitized.Unitize.degrees(333.5),
                          backsightAzimuth: _unitized.Unitize.degrees(153.5),
                          frontsightInclination: _unitized.Unitize.degrees(35),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(1),
                          up: _unitized.Unitize.feet(15),
                          down: _unitized.Unitize.feet(5),
                          excludeDistance: false,
                          comment: null,
                        },
                        {
                          from: 'A3',
                          to: 'A4',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.inches(4 * 12 + 2),
                          frontsightAzimuth: _unitized.Unitize.degrees(0),
                          backsightAzimuth: _unitized.Unitize.degrees(0),
                          frontsightInclination: _unitized.Unitize.degrees(90),
                          backsightInclination: null,
                          left: _unitized.Unitize.feet(3),
                          right: _unitized.Unitize.feet(1),
                          up: _unitized.Unitize.feet(10),
                          down: _unitized.Unitize.feet(10),
                          excludeDistance: false,
                          comment: null,
                        },
                      ],
                    },
                  ],
                })

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })
    )
  )
  ;(0, _mocha.it)(
    'horizontal shots',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee2() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n *\nFT C  DD\n  E22  E21  36.2H  338.5 340.0  1.0      12  2 15 15\n'
                _context2.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context2.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'E21',
                  to: 'E22',
                  kind: _FrcsShot.FrcsShotKind.Horizontal,
                  distance: _unitized.Unitize.feet(Math.sqrt(36.2 * 36.2 + 1)),
                  horizontalDistance: _unitized.Unitize.feet(36.2),
                  verticalDistance: _unitized.Unitize.feet(1),
                  frontsightAzimuth: _unitized.Unitize.degrees(338.5),
                  backsightAzimuth: _unitized.Unitize.degrees(340),
                  frontsightInclination: _unitized.Angle.atan2(1, 36.2),
                  backsightInclination: null,
                  left: _unitized.Unitize.feet(12),
                  right: _unitized.Unitize.feet(2),
                  up: _unitized.Unitize.feet(15),
                  down: _unitized.Unitize.feet(15),
                  excludeDistance: false,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context2.stop()
            }
          }
        }, _callee2)
      })
    )
  )
  ;(0, _mocha.it)(
    'horizontal feet and inches shots',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee3() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n *\nFI C  DD\n  A27  A26  16  9H 345.0 163.0 -1.0       0  3  5  4\n'
                _context3.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context3.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'A26',
                  to: 'A27',
                  kind: _FrcsShot.FrcsShotKind.Horizontal,
                  distance: _unitized.Unitize.feet(
                    Math.sqrt(16.75 * 16.75 + 1)
                  ),
                  horizontalDistance: _unitized.Unitize.inches(16 * 12 + 9),
                  verticalDistance: _unitized.Unitize.feet(-1),
                  frontsightAzimuth: _unitized.Unitize.degrees(345),
                  backsightAzimuth: _unitized.Unitize.degrees(163),
                  frontsightInclination: _unitized.Angle.atan2(-1, 16.75),
                  backsightInclination: null,
                  left: _unitized.Unitize.feet(0),
                  right: _unitized.Unitize.feet(3),
                  up: _unitized.Unitize.feet(5),
                  down: _unitized.Unitize.feet(4),
                  excludeDistance: false,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context3.stop()
            }
          }
        }, _callee3)
      })
    )
  )
  ;(0, _mocha.it)(
    'diagonal shots',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee4() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n *\nFT C  DD\n  E37  E36  31.6D  231.0 232.0  2.0       3 10 20 32\n'
                _context4.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context4.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'E36',
                  to: 'E37',
                  kind: _FrcsShot.FrcsShotKind.Diagonal,
                  distance: _unitized.Unitize.feet(31.6),
                  verticalDistance: _unitized.Unitize.feet(2),
                  frontsightAzimuth: _unitized.Unitize.degrees(231),
                  backsightAzimuth: _unitized.Unitize.degrees(232),
                  frontsightInclination: _unitized.Angle.asin(2 / 31.6),
                  backsightInclination: null,
                  left: _unitized.Unitize.feet(3),
                  right: _unitized.Unitize.feet(10),
                  up: _unitized.Unitize.feet(20),
                  down: _unitized.Unitize.feet(32),
                  excludeDistance: false,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context4.stop()
            }
          }
        }, _callee4)
      })
    )
  )
  ;(0, _mocha.it)(
    'invalid distance unit',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee5() {
        var data
        return _regenerator['default'].wrap(function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                data = 'blah\n *\n *\nTEST\n * \nFJ C  DD\n'
                _context5.t0 = _chai.expect
                _context5.next = 4
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 4:
                _context5.t1 = _context5.sent
                _context5.t2 = {
                  cave: 'blah',
                  errors: [
                    new _parseSegment.SegmentParseError(
                      'Invalid distance unit',
                      new _parseSegment.Segment({
                        value: 'FJ C  DD',
                        source: 'cdata.fr',
                        startLine: 5,
                        startCol: 0,
                      }).substring(0, 2)
                    ),
                  ],
                  location: null,
                  trips: [
                    {
                      header: {
                        azimuthUnit: _unitized.Angle.degrees,
                        backsightAzimuthCorrected: true,
                        backsightInclinationCorrected: false,
                        comment: null,
                        date: undefined,
                        distanceUnit: _unitized.Length.feet,
                        hasBacksightAzimuth: true,
                        hasBacksightInclination: false,
                        inclinationUnit: _unitized.Angle.degrees,
                        name: 'TEST',
                        section: undefined,
                        team: undefined,
                      },
                      shots: [],
                    },
                  ],
                }
                ;(0, _context5.t0)(_context5.t1).to.deep.equal(_context5.t2)

              case 7:
              case 'end':
                return _context5.stop()
            }
          }
        }, _callee5)
      })
    )
  )
  ;(0, _mocha.it)(
    'meters',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee6() {
        var data
        return _regenerator['default'].wrap(function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n * \nM  CC DD\n  E37  E36  31.6   231.0 232.0  2.0  3.0  3 10 20 32\n'
                _context6.t0 = _chai.expect
                _context6.next = 4
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 4:
                _context6.t1 = _context6.sent
                _context6.t2 = {
                  cave: 'blah',
                  errors: [],
                  location: null,
                  trips: [
                    {
                      header: {
                        azimuthUnit: _unitized.Angle.degrees,
                        backsightAzimuthCorrected: true,
                        backsightInclinationCorrected: true,
                        comment: null,
                        date: undefined,
                        distanceUnit: _unitized.Length.meters,
                        hasBacksightAzimuth: true,
                        hasBacksightInclination: true,
                        inclinationUnit: _unitized.Angle.degrees,
                        name: 'TEST',
                        section: undefined,
                        team: undefined,
                      },
                      shots: [
                        {
                          from: 'E36',
                          to: 'E37',
                          kind: _FrcsShot.FrcsShotKind.Normal,
                          distance: _unitized.Unitize.meters(31.6),
                          frontsightAzimuth: _unitized.Unitize.degrees(231),
                          backsightAzimuth: _unitized.Unitize.degrees(232),
                          frontsightInclination: _unitized.Unitize.degrees(2),
                          backsightInclination: _unitized.Unitize.degrees(3),
                          left: _unitized.Unitize.meters(3),
                          right: _unitized.Unitize.meters(10),
                          up: _unitized.Unitize.meters(20),
                          down: _unitized.Unitize.meters(32),
                          excludeDistance: false,
                          comment: null,
                        },
                      ],
                    },
                  ],
                }
                ;(0, _context6.t0)(_context6.t1).to.deep.equal(_context6.t2)

              case 7:
              case 'end':
                return _context6.stop()
            }
          }
        }, _callee6)
      })
    )
  )
  ;(0, _mocha.it)(
    'exclude length',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee7() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n * \nM  CC DD\n  E37  E36  31.6 * 231.0 232.0  2.0  3.0  3 10 20 32\n'
                _context7.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context7.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'E36',
                  to: 'E37',
                  kind: _FrcsShot.FrcsShotKind.Normal,
                  distance: _unitized.Unitize.meters(31.6),
                  frontsightAzimuth: _unitized.Unitize.degrees(231),
                  backsightAzimuth: _unitized.Unitize.degrees(232),
                  frontsightInclination: _unitized.Unitize.degrees(2),
                  backsightInclination: _unitized.Unitize.degrees(3),
                  left: _unitized.Unitize.meters(3),
                  right: _unitized.Unitize.meters(10),
                  up: _unitized.Unitize.meters(20),
                  down: _unitized.Unitize.meters(32),
                  excludeDistance: true,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context7.stop()
            }
          }
        }, _callee7)
      })
    )
  )
  ;(0, _mocha.it)(
    'negative LRUD',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee8() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n * \nM  CC DD\n  E37  E36  31.6   231.0 232.0  2.0  3.0 -3 10 20 32\n'
                _context8.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context8.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'E36',
                  to: 'E37',
                  kind: _FrcsShot.FrcsShotKind.Normal,
                  distance: _unitized.Unitize.meters(31.6),
                  frontsightAzimuth: _unitized.Unitize.degrees(231),
                  backsightAzimuth: _unitized.Unitize.degrees(232),
                  frontsightInclination: _unitized.Unitize.degrees(2),
                  backsightInclination: _unitized.Unitize.degrees(3),
                  left: null,
                  right: _unitized.Unitize.meters(10),
                  up: _unitized.Unitize.meters(20),
                  down: _unitized.Unitize.meters(32),
                  excludeDistance: false,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context8.stop()
            }
          }
        }, _callee8)
      })
    )
  )
  ;(0, _mocha.it)(
    '- for no backsight',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee9() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee9$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                data = 'blah\n *\n *\nTEST\n * \nM  B- DD \n  '
                _context9.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context9.sent
                ;(0, _chai.expect)(parsed.trips[0].header).to.deep.equal({
                  name: 'TEST',
                  comment: null,
                  section: undefined,
                  date: undefined,
                  team: undefined,
                  distanceUnit: _unitized.Length.meters,
                  azimuthUnit: _unitized.Angle.degrees,
                  inclinationUnit: _unitized.Angle.degrees,
                  backsightAzimuthCorrected: false,
                  backsightInclinationCorrected: false,
                  hasBacksightAzimuth: true,
                  hasBacksightInclination: false,
                })

              case 5:
              case 'end':
                return _context9.stop()
            }
          }
        }, _callee9)
      })
    )
  )
  ;(0, _mocha.it)(
    'missing both frontsight and backsight inclination',
    /*#__PURE__*/
    (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee10() {
        var data, parsed
        return _regenerator['default'].wrap(function _callee10$(_context10) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                data =
                  'blah\n *\n *\nTEST\n * \nM  B- DD \n  E37  E36  31.6   231.0 232.0           -3 10 20 32\n  '
                _context10.next = 3
                return (0, _index.parseFrcsSurveyFile)('cdata.fr', data)

              case 3:
                parsed = _context10.sent
                ;(0, _chai.expect)(parsed.trips[0].shots[0]).to.deep.equal({
                  from: 'E36',
                  to: 'E37',
                  kind: _FrcsShot.FrcsShotKind.Normal,
                  distance: _unitized.Unitize.meters(31.6),
                  frontsightAzimuth: _unitized.Unitize.degrees(231),
                  backsightAzimuth: _unitized.Unitize.degrees(232),
                  frontsightInclination: _unitized.Unitize.degrees(0),
                  backsightInclination: null,
                  left: null,
                  right: _unitized.Unitize.meters(10),
                  up: _unitized.Unitize.meters(20),
                  down: _unitized.Unitize.meters(32),
                  excludeDistance: false,
                  comment: null,
                })

              case 5:
              case 'end':
                return _context10.stop()
            }
          }
        }, _callee10)
      })
    )
  )
})
