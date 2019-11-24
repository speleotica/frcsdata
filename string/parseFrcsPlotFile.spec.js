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

var data =
  '   123.182259\n AE20     1    1       0       0      0   153  -257   -51    85   0  20     1\n AE19     1    2     653     402   -548  1046  -587  -174    97   0 200     1\n AE18     2    3     669     449  -3002   995    94  -597   -56 250   0     1\n AE17     3    4     539    1217  -2770   497    47  -298   -28   0   0     1\n AE16     4    5     544    1230  -3441   411  -284  -246   170  60  10     1\n AE15     5    6    1679    1663  -3833     0     0  -282   283  20  10     1\n AE14     6    7    2026    2617  -3730   446   225  -446  -225   0  30     1\n AE13     7    8     391    3152  -5788  -111   691     0     0 200  50     1\n AE12     8    9   -1019    2175  -4630  -369   336   221  -201  40  40     1\n AE11     9   10   -1516    1289  -3919  -348   195   610  -342  50  10     1\n'
;(0, _mocha.describe)('parseFrcsPlotFile', function() {
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
                  return (0, _index.parseFrcsPlotFile)('cdata.fr', data)

                case 2:
                  parsed = _context.sent
                  ;(0, _chai.expect)(parsed).to.deep.equal({
                    totalLength: _unitized.Length.feet(123.182259),
                    errors: [],
                    shots: [
                      {
                        toName: 'AE20',
                        isSurface: false,
                        fromNumber: 1,
                        toNumber: 1,
                        easting: _unitized.Length.feet(0),
                        northing: _unitized.Length.feet(0),
                        elevation: _unitized.Length.feet(0),
                        leftEasting: _unitized.Length.feet(1.53),
                        leftNorthing: _unitized.Length.feet(-2.57),
                        rightEasting: _unitized.Length.feet(-0.51),
                        rightNorthing: _unitized.Length.feet(0.85),
                        up: _unitized.Length.feet(0),
                        down: _unitized.Length.feet(2),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE19',
                        isSurface: false,
                        fromNumber: 1,
                        toNumber: 2,
                        easting: _unitized.Length.feet(6.53),
                        northing: _unitized.Length.feet(4.02),
                        elevation: _unitized.Length.feet(-5.48),
                        leftEasting: _unitized.Length.feet(10.46),
                        leftNorthing: _unitized.Length.feet(-5.87),
                        rightEasting: _unitized.Length.feet(-1.74),
                        rightNorthing: _unitized.Length.feet(0.97),
                        up: _unitized.Length.feet(0),
                        down: _unitized.Length.feet(20),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE18',
                        isSurface: false,
                        fromNumber: 2,
                        toNumber: 3,
                        easting: _unitized.Length.feet(6.69),
                        northing: _unitized.Length.feet(4.49),
                        elevation: _unitized.Length.feet(-30.02),
                        leftEasting: _unitized.Length.feet(9.95),
                        leftNorthing: _unitized.Length.feet(0.94),
                        rightEasting: _unitized.Length.feet(-5.97),
                        rightNorthing: _unitized.Length.feet(-0.56),
                        up: _unitized.Length.feet(25),
                        down: _unitized.Length.feet(0),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE17',
                        isSurface: false,
                        fromNumber: 3,
                        toNumber: 4,
                        easting: _unitized.Length.feet(5.39),
                        northing: _unitized.Length.feet(12.17),
                        elevation: _unitized.Length.feet(-27.7),
                        leftEasting: _unitized.Length.feet(4.97),
                        leftNorthing: _unitized.Length.feet(0.47),
                        rightEasting: _unitized.Length.feet(-2.98),
                        rightNorthing: _unitized.Length.feet(-0.28),
                        up: _unitized.Length.feet(0),
                        down: _unitized.Length.feet(0),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE16',
                        isSurface: false,
                        fromNumber: 4,
                        toNumber: 5,
                        easting: _unitized.Length.feet(5.44),
                        northing: _unitized.Length.feet(12.3),
                        elevation: _unitized.Length.feet(-34.41),
                        leftEasting: _unitized.Length.feet(4.11),
                        leftNorthing: _unitized.Length.feet(-2.84),
                        rightEasting: _unitized.Length.feet(-2.46),
                        rightNorthing: _unitized.Length.feet(1.7),
                        up: _unitized.Length.feet(6),
                        down: _unitized.Length.feet(1),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE15',
                        isSurface: false,
                        fromNumber: 5,
                        toNumber: 6,
                        easting: _unitized.Length.feet(16.79),
                        northing: _unitized.Length.feet(16.63),
                        elevation: _unitized.Length.feet(-38.33),
                        leftEasting: _unitized.Length.feet(0),
                        leftNorthing: _unitized.Length.feet(0),
                        rightEasting: _unitized.Length.feet(-2.82),
                        rightNorthing: _unitized.Length.feet(2.83),
                        up: _unitized.Length.feet(2),
                        down: _unitized.Length.feet(1),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE14',
                        isSurface: false,
                        fromNumber: 6,
                        toNumber: 7,
                        easting: _unitized.Length.feet(20.26),
                        northing: _unitized.Length.feet(26.17),
                        elevation: _unitized.Length.feet(-37.3),
                        leftEasting: _unitized.Length.feet(4.46),
                        leftNorthing: _unitized.Length.feet(2.25),
                        rightEasting: _unitized.Length.feet(-4.46),
                        rightNorthing: _unitized.Length.feet(-2.25),
                        up: _unitized.Length.feet(0),
                        down: _unitized.Length.feet(3),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE13',
                        isSurface: false,
                        fromNumber: 7,
                        toNumber: 8,
                        easting: _unitized.Length.feet(3.91),
                        northing: _unitized.Length.feet(31.52),
                        elevation: _unitized.Length.feet(-57.88),
                        leftEasting: _unitized.Length.feet(-1.11),
                        leftNorthing: _unitized.Length.feet(6.91),
                        rightEasting: _unitized.Length.feet(0),
                        rightNorthing: _unitized.Length.feet(0),
                        up: _unitized.Length.feet(20),
                        down: _unitized.Length.feet(5),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE12',
                        isSurface: false,
                        fromNumber: 8,
                        toNumber: 9,
                        easting: _unitized.Length.feet(-10.19),
                        northing: _unitized.Length.feet(21.75),
                        elevation: _unitized.Length.feet(-46.3),
                        leftEasting: _unitized.Length.feet(-3.69),
                        leftNorthing: _unitized.Length.feet(3.36),
                        rightEasting: _unitized.Length.feet(2.21),
                        rightNorthing: _unitized.Length.feet(-2.01),
                        up: _unitized.Length.feet(4),
                        down: _unitized.Length.feet(4),
                        tripNumber: 1,
                      },
                      {
                        toName: 'AE11',
                        isSurface: false,
                        fromNumber: 9,
                        toNumber: 10,
                        easting: _unitized.Length.feet(-15.16),
                        northing: _unitized.Length.feet(12.89),
                        elevation: _unitized.Length.feet(-39.19),
                        leftEasting: _unitized.Length.feet(-3.48),
                        leftNorthing: _unitized.Length.feet(1.95),
                        rightEasting: _unitized.Length.feet(6.1),
                        rightNorthing: _unitized.Length.feet(-3.42),
                        up: _unitized.Length.feet(5),
                        down: _unitized.Length.feet(1),
                        tripNumber: 1,
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
})
