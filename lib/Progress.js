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
          progressDivision = _props.progressDivision,
          stepsData = _props.stepsData,
          activeStep = _props.activeStep;

      var color_gold = 'rgba(240,240,120, 0.5)',
          color_gray = 'rgba(120,120,140, 0.5)';
      var ua = navigator.userAgent.toLowerCase();
      var progressWidth = 1;
      // const progressWidth = (ua.search(/(iphone)|(ipod)|(android)/) === -1)
      //     ? 0.2
      //     : 1;
      var stepsTotal = this.props.stepsTotal;


      if (stepsTotal > 0) {
        stepsTotal = Math.round(stepsTotal / progressDivision);
      }

      var currentStepIndex = Object.keys(stepsData).findIndex(function (s) {
        return s === activeStep.id;
      });

      if (currentStepIndex > 0) {
        currentStepIndex = Math.round(currentStepIndex / progressDivision);
      }

      var percent = parseInt((currentStepIndex + 1) / stepsTotal * 100, 10);
      var end = currentStepIndex + 1 === stepsTotal;
      var begin = currentStepIndex === 0;

      return _react2.default.createElement(
        'div',
        {
          id: 'react-impressjs-progress',
          style: { display: progress ? 'block' : 'none' },
          className: 'num-' + (currentStepIndex + 1) + (end ? ' end' : begin ? ' begin' : '')
        },
        _react2.default.createElement(
          'p',
          { className: 'ratio', style: { color: color_gray, marginLeft: percent + '%' } },
          _react2.default.createElement(
            'span',
            null,
            currentStepIndex + 1,
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                null,
                '/'
              ),
              stepsTotal
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'line' },
          _react2.default.createElement('div', { className: 'progress', style: { width: percent + '%' } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'svg' },
          _react2.default.createElement(_rcProgress.Line, { percent: percent,
            strokeLinecap: 'square',
            strokeWidth: progressWidth,
            strokeColor: color_gold,
            trailWidth: progressWidth,
            trailColor: color_gray
          })
        )
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

  progressDivision: _propTypes2.default.number,

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

Progress.defaultProps = {
  progressDivision: 1
};
//# sourceMappingURL=Progress.js.map