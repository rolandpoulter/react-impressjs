import React, {Component} from 'react';
import {Line}             from 'rc-progress';
import PropTypes          from 'prop-types';

export default class Progress extends Component {
  render() {
    const {progress, progressDivision, stepsData, activeStep} = this.props;
    const color_gold = '#e5b560',
          color_gray = '#3e4852';
    const ua = navigator.userAgent.toLowerCase();
    const progressWidth = (ua.search(/(iphone)|(ipod)|(android)/) === -1)
        ? 0.2
        : 1;
    let {stepsTotal} = this.props;

    if (stepsTotal > 0) {
      stepsTotal = Math.round(stepsTotal / progressDivision);
    }

    let currentStepIndex = (
      Object.keys(stepsData).findIndex((s) => s === activeStep.id)
    );

    if (currentStepIndex > 0) {
      currentStepIndex = Math.round(currentStepIndex / progressDivision);
    }

    let percent = parseInt((currentStepIndex / stepsTotal) * 100, 10);

    return (
        <div style={{
          position: 'fixed',
          bottom: '-3px',
          width: '100%',
          display: progress ? 'block' : 'none',
        }}>
          <p style={{
            fontSize: 20,
            color: color_gray,
            textAlign: 'center',
            opacity: .5,
          }}>
                    <span>
                      {(currentStepIndex + 1)}
                      <span style={{paddingLeft: 1, fontSize: 13}}>
                        {'/' + (stepsTotal + 1)}
                      </span>
                    </span>
          </p>
          <Line percent={percent}
                strokeLinecap='square'
                strokeWidth={progressWidth} strokeColor={color_gold}
                trailWidth={progressWidth} trailColor={color_gray}/>
        </div>
    );
  }
}

Progress.propTypes = {
  /**
   * Progress of presentation
   */
  progress: PropTypes.bool,

  progressDivision: PropTypes.number,

  /**
   * Steps data
   */
  stepsData: PropTypes.object,

  /**
   * Object representing current step
   */
  activeStep: PropTypes.shape({
    id: PropTypes.string,
  }),

  /**
   * Amount of steps
   */
  stepsTotal: PropTypes.number,
};

Progress.defaultProps = {
  progressDivision: 1
};
