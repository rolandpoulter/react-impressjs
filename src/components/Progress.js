import React, {Component} from 'react';
import {Line}             from 'rc-progress';
import PropTypes          from 'prop-types';

export default class Progress extends Component {
  render() {
    const {progress, progressDivision, stepsData, activeStep} = this.props;
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

    if (currentStepIndex > 0) {
      currentStepIndex = Math.round(currentStepIndex / progressDivision);
    }

    let percent = parseInt(((currentStepIndex + 1) / stepsTotal) * 100, 10);

    return (
        <div id="react-impressjs-progress" style={{ display: progress ? 'block' : 'none' }}>
          <p className="ratio" style={{ color: color_gray }}>
                    <span>
                      {(currentStepIndex + 1)}
                      <span style={{paddingLeft: 1, fontSize: 13}}>
                        {'/' + (stepsTotal)}
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
