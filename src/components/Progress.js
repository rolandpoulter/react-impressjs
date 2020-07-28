import React, {Component} from 'react';
import {Line}             from 'rc-progress';
import PropTypes          from 'prop-types';

export default class Progress extends Component {
  render() {
    const {
      progress,
      progressDivision,
      progressGroups,
      skipSteps,
      stepsData,
      activeStep,
    } = this.props;
    const color_gold = 'rgba(240,240,120, 0.5)',
          color_gray = 'rgba(120,120,140, 0.5)';
    const ua = navigator.userAgent.toLowerCase();
    const progressWidth = 1;
    // const progressWidth = (ua.search(/(iphone)|(ipod)|(android)/) === -1)
    //     ? 0.2
    //     : 1;
    let {stepsTotal} = this.props;

    if (stepsTotal > 0) {
      stepsTotal = Math.round(stepsTotal / progressDivision);
    }

    let currentStepIndex = (
      Object.keys(stepsData).findIndex((s) => s === activeStep.id)
    );

    if (currentStepIndex === -1) {
      // debugger;
      currentStepIndex = 0;
    }

    if (currentStepIndex > 0) {
      // debugger;
      currentStepIndex = Math.round(currentStepIndex / progressDivision);
    }

    // TODO: progressGroups
    let group = progressGroups.length ? 0 : null;
    if (progressGroups.length) {
      // debugger;
      let i = currentStepIndex;
      progressGroups.some((g, index) => {
        if (g < i) {
          i -= g;
          group = index;
          return true;
        }
        currentStepIndex = i;
        stepsTotal = progressGroups[group];
        return false;
      });
    }

    let percent = parseInt(((currentStepIndex + 1) / stepsTotal) * 100, 10);
    const end = (currentStepIndex + 1) === stepsTotal;
    const begin = currentStepIndex === 0;

    const step = Math.floor((currentStepIndex + skipSteps) / skipSteps);
    const final = Math.floor((stepsTotal + skipSteps) / skipSteps);

    return (
        <div
          id="react-impressjs-progress"
          style={{ display: progress ? 'block' : 'none' }}
          className={`num-${currentStepIndex + 1}${end ? ' end' : begin ? ' begin' : ''}`}
        >
          <p className="ratio" style={{ color: color_gray, width: percent + '%' }}>
            <span>
              {step}
              <span>
                <span>/</span>{final}
              </span>
            </span>
          </p>
          <div className="line">
            <div className="progress" style={{ width: percent + '%' }} />
          </div>
          <div className="svg">
            <Line percent={percent}
                  strokeLinecap='square'
                  strokeWidth={progressWidth}
                  strokeColor={color_gold}
                  trailWidth={progressWidth}
                  trailColor={color_gray}
            />
          </div>
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
  progressGroups: PropTypes.array,

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

  skipSteps: PropTypes.number,
};

Progress.defaultProps = {
  progressDivision: 1,
  progressGroups: [],
  skipSteps: 1,
};
