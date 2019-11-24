'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = nodeParseFrcsSurveyFile

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _parseFrcsSurveyFile = _interopRequireDefault(
  require('../parseFrcsSurveyFile')
)

var _readline = _interopRequireDefault(require('readline'))

var _fs = _interopRequireDefault(require('fs'))

function nodeParseFrcsSurveyFile(_x) {
  return _nodeParseFrcsSurveyFile.apply(this, arguments)
}

function _nodeParseFrcsSurveyFile() {
  _nodeParseFrcsSurveyFile = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(file) {
      return _regenerator.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return (0, _parseFrcsSurveyFile.default)(
                  file,
                  _readline.default.createInterface(
                    _fs.default.createReadStream(file)
                  )
                )

              case 2:
                return _context.abrupt('return', _context.sent)

              case 3:
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
  return _nodeParseFrcsSurveyFile.apply(this, arguments)
}
