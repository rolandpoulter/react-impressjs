'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hint = function (_Component) {
  _inherits(Hint, _Component);

  function Hint() {
    _classCallCheck(this, Hint);

    return _possibleConstructorReturn(this, (Hint.__proto__ || Object.getPrototypeOf(Hint)).apply(this, arguments));
  }

  _createClass(Hint, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          hint = _props.hint,
          stepsData = _props.stepsData,
          activeStep = _props.activeStep,
          hintMessage = _props.hintMessage;

      var ua = navigator.userAgent.toLowerCase();
      var isMobile = ua.search(/(iphone)|(ipod)|(android)/) === -1;

      // Swipe-right from www.flaticon.com
      var swipeRight = 'data:image/png;base64,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';

      // If current Step is first one, let hint show up.
      var isFirstStep = Object.keys(stepsData).findIndex(function (s) {
        return s === activeStep.id;
      }) === 0;

      return _react2.default.createElement(
        'div',
        { className: isFirstStep ? 'show' : '',
          style: { display: hint ? 'block' : 'none' } },
        isMobile ? _react2.default.createElement(
          'div',
          { className: 'hint' },
          hintMessage
        ) : _react2.default.createElement(
          'div',
          { className: 'mobile-hint' },
          _react2.default.createElement('img', { src: swipeRight, role: 'presentation' }),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'b',
              null,
              'Swipe'
            ),
            ' to navigate'
          )
        )
      );
    }
  }]);

  return Hint;
}(_react.Component);

exports.default = Hint;
//# sourceMappingURL=Hint.js.map