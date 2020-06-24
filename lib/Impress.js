'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _update = require('react/lib/update');

var _update2 = _interopRequireDefault(_update);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _Hint = require('./Hint');

var _Hint2 = _interopRequireDefault(_Hint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var html = document.documentElement,
    body = document.body;

var _lastHash = '',
    _stepsData = {},
    _activeStep = void 0,
    _idHelper = 1;

var Impress = function (_Component) {
  _inherits(Impress, _Component);

  function Impress(props) {
    _classCallCheck(this, Impress);

    var _this = _possibleConstructorReturn(this, (Impress.__proto__ || Object.getPrototypeOf(Impress)).call(this, props));

    var rootData = props.rootData,
        hint = props.hint,
        hintMessage = props.hintMessage,
        fallbackMessage = props.fallbackMessage,
        progress = props.progress,
        onInit = props.onInit,
        onGoTo = props.onGoTo,
        onBeforeGoTo = props.onBeforeGoTo,
        disableEvents = props.disableEvents;


    _this.callbacks = {
      onInit: onInit,
      onGoTo: onGoTo,
      onBeforeGoTo: onBeforeGoTo
    };

    if (disableEvents) {
      _this.disableEvents = true;
    }

    var rootStyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: 'top left',
      transition: 'all 0s ease-in-out',
      transformStyle: 'preserve-3d'
    };
    var defaultData = {
      x: 0, y: 0, z: 0,
      rotateX: 0, rotateY: 0, rotateZ: 0,
      scale: 1
    };

    // <Impress /> State
    _this.state = {
      /** Impress Config **/
      rootStyles: rootStyles,
      windowScale: null,
      config: null,
      impressSupported: false,

      /** Step Status **/
      activeStep: {
        data: defaultData
      },

      /** Camera Status **/
      cameraStyles: rootStyles,

      /** Public attributes provide to use **/
      rootData: rootData, // (not recommended)
      hint: hint,
      hintMessage: hintMessage,
      fallbackMessage: fallbackMessage,
      progress: progress,

      /** For touch event **/
      startX: 0,
      deltaX: 0
    };
    return _this;
  }

  _createClass(Impress, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Init impress
      this.init();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var impressSupported = this.state.impressSupported;

      // 2017/2/28 暫時想不到好方法

      if (impressSupported) this.goto(_activeStep, 500);

      // Listener for keyboard event
      if (!this.disableEvents) {
        this.onKeyUp = (0, _util.throttle)(function (e) {
          if (e.keyCode === 9 || e.keyCode >= 32 && e.keyCode <= 40) {
            switch (e.keyCode) {
              case 35:
                // End
                _this2.end();
                break;
              case 36:
                // Home
                _this2.home();
                break;
              case 33: // Page up
              case 37: // Left
              case 38:
                // Up
                _this2.prev();
                break;
              case 9: // Tab
              case 32: // Space
              case 34: // Page down
              case 39: // Right
              case 40:
                // Down
                _this2.next();
                break;
              default:
                break;
            }
          }
        }, 250);
        document.addEventListener('keyup', this.onKeyUp, false);
      }

      // Window resize
      this.onResize = (0, _util.throttle)(function () {
        if (impressSupported) _this2.goto(_this2.state.activeStep, 500);
      }, 250);
      window.addEventListener('resize', this.onResize, false);

      // URL hash change
      this.onHashChange = (0, _util.throttle)(function () {
        if (window.location.hash !== _lastHash) _this2.goto((0, _util.getElementFromHash)(_stepsData), 500);
      }, 250);
      window.addEventListener('hashchange', this.onHashChange, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextPorps) {
      this.setState({
        fallbackMessage: nextPorps.fallbackMessage,
        hint: nextPorps.hint,
        hintMessage: nextPorps.hintMessage
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keyup', this.onKeyUp, false);
      window.removeEventListener('resize', this.onResize, false);
      window.removeEventListener('keyup', this.onHashChange, false);
    }

    /**
     * Initialize Impress.
     */

  }, {
    key: 'init',
    value: function init() {
      var rootData = this.state.rootData;


      var defaults = {
        width: 1024,
        height: 768,
        maxScale: 1,
        minScale: 0,
        perspective: 1000,
        transitionDuration: 1000
      };

      // const ua = navigator.userAgent.toLowerCase()

      // Check impress support or not.
      var impressSupported =
      // Browser should support CSS 3D transtorms
      (0, _util.pfx)('perspective') !== null &&
      // Browser should support `classList` and `dataset` APIs
      body.classList && body.dataset; // &&
      // But some mobile devices need to be blacklisted,
      // because their CSS 3D support or hardware is not
      // good enough to run impress.js properly, sorry...
      //( ua.search( /(iphone)|(ipod)|(android)/ ) === -1 );

      // Config
      var config = {
        width: (0, _util.toNumber)(rootData.width, defaults.width),
        height: (0, _util.toNumber)(rootData.height, defaults.height),
        maxScale: (0, _util.toNumber)(rootData.maxScale, defaults.maxScale),
        minScale: (0, _util.toNumber)(rootData.minScale, defaults.minScale),
        perspective: (0, _util.toNumber)(rootData.perspective, defaults.perspective),
        transitionDuration: (0, _util.toNumber)(rootData.transitionDuration, defaults.transitionDuration)
      };
      // Window Scale
      var windowScale = (0, _util.computeWindowScale)(config);
      // HTML height
      (0, _util.css)(html, {
        height: '100vh',
        overflow: 'hidden'
      });
      // Body style
      (0, _util.css)(body, {
        height: '100vh',
        overflow: 'hidden',

        // mobile devise supported
        position: 'relative'
      });

      this.setState((0, _update2.default)(this.state, {
        windowScale: {
          $set: windowScale
        },
        config: {
          $set: config
        },
        impressSupported: {
          $set: impressSupported
        },
        rootStyles: {
          $merge: {
            'transform': (0, _util.perspective)(config.perspective / windowScale) + (0, _util.scale)(windowScale)
          }
        }
      }));

      if (this.callbacks.onInit) {
        this.callback.onInit.call(this, this);
      }
    }

    /**
     * Initialize Steps.
     *
     * @param {Step} step init every Steps in Impress.
     */

  }, {
    key: 'goto',


    /**
     * Navigate to the SPECIFY Step.
     *
     * @param {Step} step you want to navigate to.
     * @param {number} duration 1000 speed of navigation.
     */
    value: function goto(step) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      if (this.callbacks.onBeforeGoTo && this.callbacks.onBeforeGoTo.call(this, this, step, duration)) {
        return;
      }

      var _state = this.state,
          config = _state.config,
          activeStep = _state.activeStep;
      var windowScale = this.state.windowScale;


      window.scrollTo(0, 0);

      var target = {
        x: -step.data.x,
        y: -step.data.y,
        z: -step.data.z,
        rotateX: -step.data.rotateX,
        rotateY: -step.data.rotateY,
        rotateZ: -step.data.rotateZ,
        scale: 1 / step.data.scale
      };

      // Check scale for zoom-in
      var zoomin = target.scale >= 1 / activeStep.data.scale;

      duration = (0, _util.toNumber)(duration, config.transitionDuration);
      var delay = duration / 2;

      if (step.id === activeStep.id) windowScale = (0, _util.computeWindowScale)(config);

      var targetScale = target.scale * windowScale;

      this.setState((0, _update2.default)(this.state, {
        activeStep: {
          $set: step
        },
        rootStyles: {
          transform: {
            $set: (0, _util.perspective)(config.perspective / targetScale) + (0, _util.scale)(targetScale)
          },
          transitionDuration: {
            $set: duration + 'ms'
          },
          transitionDelay: {
            $set: (zoomin ? delay : 0) + 'ms'
          }
        },
        cameraStyles: {
          transform: {
            $set: (0, _util.rotate)(target, true) + (0, _util.translate)(target)
          },
          transitionDuration: {
            $set: duration + 'ms'
          },
          transitionDelay: {
            $set: (zoomin ? 0 : delay) + 'ms'
          }
        }
      }));

      window.location.hash = _lastHash = '#/' + step.id;

      this.callbacks.onGoTo && this.callbacks.onGoTo.call(this, this, step, duration);
    }

    // Navigate to the PREVIOUS Step.

  }, {
    key: 'prev',
    value: function prev() {
      var activeStep = this.state.activeStep;

      /**
       * 2017.04.10
       * Why we don't use Object.entries() or Object.values() any more ?
       * Cause the browser of iOS device (Chrome, Safari...) and some of Android devise
       * DOES'NT supported Object.entries() and Object.values() now...
       */
      // const stepsDataEntries = Object.entries( _stepsData );
      // let prev = stepsDataEntries.findIndex( ([k, v]) => { return k === activeStep.id } ) - 1;
      // prev = prev >= 0 ? stepsDataEntries[ prev ][1] : stepsDataEntries[ stepsDataEntries.length - 1 ][1];

      var stepsDataKeys = Object.keys(_stepsData);
      // get index of previous
      var prev = stepsDataKeys.findIndex(function (k) {
        return k === activeStep.id;
      }) - 1;

      // get id via index from stepsData
      prev = prev >= 0 ? stepsDataKeys[prev] : stepsDataKeys[stepsDataKeys.length - 1];

      // get previous step
      prev = _stepsData[prev];

      this.goto(prev, prev.duration);
    }

    // Navigate to the NEXT Step.

  }, {
    key: 'next',
    value: function next() {
      var activeStep = this.state.activeStep;

      var stepsDataKeys = Object.keys(_stepsData);
      var next = stepsDataKeys.findIndex(function (k) {
        return k === activeStep.id;
      }) + 1;
      next = next < stepsDataKeys.length ? stepsDataKeys[next] : stepsDataKeys[0];
      next = _stepsData[next];

      this.goto(next, next.duration);
    }

    // Navigate to the FIRST Step.

  }, {
    key: 'home',
    value: function home() {
      var stepsDataEntries = Object.entries(_stepsData);
      var firstStep = stepsDataEntries[0][1];

      this.goto(firstStep, firstStep.duration);
    }

    // Navigate to the LAST Step.

  }, {
    key: 'end',
    value: function end() {
      var stepsDataEntries = Object.entries(_stepsData);
      var lastStep = stepsDataEntries[stepsDataEntries.length - 1][1];

      this.goto(lastStep, lastStep.duration);
    }

    // Touch Start( record start position: startX )

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.setState({
        startX: e.touches[0].clientX
      });
    }

    // Touch Move( Calculate touch move path: deltaX )

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      this.setState({
        deltaX: this.state.startX - e.touches[0].clientX
      });
    }

    // Touch End( decide navigate previous or next Step via 'deltaX' )

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      if (this.state.deltaX > 0) // slide left
        this.next();else if (this.state.deltaX < 0) // slide right
        this.prev();

      // reset
      this.setState({
        deltaX: 0
      });
    }

    /**
     * Create <Step />
     *
     * @return {Step} to render children.
     */

  }, {
    key: 'stepComponent',
    value: function stepComponent(step, index) {
      var activeStep = this.state.activeStep;


      return _react2.default.cloneElement(step, {
        key: index,
        idHelper: step.props.id ? '' : _idHelper++,
        activeStep: activeStep,
        initStep: Impress.initStep.bind(this),
        goto: this.goto.bind(this)
      }, step.props.children);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          impressSupported = _state2.impressSupported,
          rootStyles = _state2.rootStyles,
          cameraStyles = _state2.cameraStyles,
          activeStep = _state2.activeStep,
          hint = _state2.hint,
          hintMessage = _state2.hintMessage,
          fallbackMessage = _state2.fallbackMessage,
          progress = _state2.progress;

      var steps = _react2.default.Children.map(this.props.children, this.stepComponent.bind(this));
      var stepsTotal = _react2.default.Children.count(this.props.children);

      return _react2.default.createElement(
        'div',
        { id: 'react-impressjs',
          className: (impressSupported ? 'impress-supported' : 'impress-not-supported') + (activeStep ? ' impress-on-' + activeStep.id : '') + ' impress-enabled',
          onTouchStart: this.handleTouchStart.bind(this),
          onTouchMove: this.handleTouchMove.bind(this),
          onTouchEnd: this.handleTouchEnd.bind(this) },
        _react2.default.createElement(
          'div',
          { id: 'impress', style: rootStyles },
          _react2.default.createElement(
            'div',
            { style: cameraStyles },
            impressSupported ? steps : _react2.default.createElement(
              'div',
              { className: 'fallback-message' },
              fallbackMessage
            )
          )
        ),
        _react2.default.createElement(_Hint2.default, {
          hint: hint,
          stepsData: _stepsData,
          activeStep: activeStep,
          hintMessage: hintMessage }),
        _react2.default.createElement(_Progress2.default, {
          progress: progress,
          stepsData: _stepsData,
          activeStep: activeStep,
          stepsTotal: stepsTotal })
      );
    }
  }], [{
    key: 'initStep',
    value: function initStep(step) {
      // Set first Step as enter Step.
      if (!_activeStep) _activeStep = step;

      _stepsData = (0, _update2.default)(_stepsData, {
        $merge: _defineProperty({}, step.id, {
          id: step.id,
          className: step.className,
          data: step.data,
          duration: step.duration
        })
      });
    }
  }]);

  return Impress;
}(_react.Component);

exports.default = Impress;


Impress.propTypes = {
  /**
   * Impress basic config
   */
  rootData: _propTypes2.default.object,

  /**
   * Whether to display hint or not
   */
  hint: _propTypes2.default.bool,

  /**
   * Hint for presentation
   */
  hintMessage: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Fallback message is only visible when there is impress-not-supported
   */
  fallbackMessage: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Progress of presentation
   */
  progress: _propTypes2.default.bool
};

Impress.defaultProps = {
  rootData: {},
  hint: true,
  hintMessage: _react2.default.createElement(
    'p',
    null,
    'Use ',
    _react2.default.createElement(
      'b',
      null,
      'Spacebar'
    ),
    ' or ',
    _react2.default.createElement(
      'b',
      null,
      'Arrow keys'
    ),
    ' to navigate'
  ),
  fallbackMessage: _react2.default.createElement(
    'p',
    null,
    'Your browser ',
    _react2.default.createElement(
      'b',
      null,
      'doesn\'t support the features required'
    ),
    ' by React-impressJS, so you are presented with a simplified version of this presentation.'
  ),
  progress: false,
  onInit: function onInit() {},
  onGoTo: function onGoTo() {},
  onBeforeGoTo: function onBeforeGoTo() {
    return true;
  },
  disableEvents: false
};
//# sourceMappingURL=Impress.js.map