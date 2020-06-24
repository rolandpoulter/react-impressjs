'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcProgress = require('rc-progress');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
  }

  _createClass(Progress, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          progress = _props.progress,
          stepsData = _props.stepsData,
          activeStep = _props.activeStep,
          stepsTotal = _props.stepsTotal;

      var color_gold = '#e5b560',
          color_gray = '#3e4852';
      var ua = navigator.userAgent.toLowerCase();
      var progressWidth = ua.search(/(iphone)|(ipod)|(android)/) === -1 ? 0.2 : 1;
      var currentStepIndex = Object.keys(stepsData).findIndex(function (s) {
        return s === activeStep.id;
      }) + 1;
      var percent = parseInt(currentStepIndex / stepsTotal * 100, 10);

      return _react2.default.createElement(
        'div',
        { style: {
            position: 'fixed',
            bottom: '-3px',
            width: '100%',
            display: progress ? 'block' : 'none'
          } },
        _react2.default.createElement(
          'p',
          { style: {
              fontSize: 20,
              color: color_gray,
              textAlign: 'center',
              opacity: .5
            } },
          _react2.default.createElement(
            'span',
            null,
            currentStepIndex,
            _react2.default.createElement(
              'span',
              { style: { paddingLeft: 1, fontSize: 13 } },
              '/' + stepsTotal
            )
          )
        ),
        _react2.default.createElement(_rcProgress.Line, { percent: percent,
          strokeLinecap: 'square',
          strokeWidth: progressWidth, strokeColor: color_gold,
          trailWidth: progressWidth, trailColor: color_gray })
      );
    }
  }]);

  return Progress;
}(_react.Component);

exports.default = Progress;


Progress.propTypes = {
  /**
   * Progress of presentation
   */
  progress: _propTypes2.default.bool,

  /**
   * Steps data
   */
  stepsData: _propTypes2.default.object,

  /**
   * Object representing current step
   */
  activeStep: _propTypes2.default.shape({
    id: _propTypes2.default.string
  }),

  /**
   * Amount of steps
   */
  stepsTotal: _propTypes2.default.number
};
//# sourceMappingURL=Progress.js.map