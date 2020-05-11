import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
export class DataDisplay extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
        <div className="data-display-container">
            <div className="current-task">{ this.props.displayValue }</div>
            <Countdown startValue={this.props.countdown} onComplete={this.props.onCountdownFinish} />
        </div>
        );
    }
}

DataDisplay.propTypes = {
    displayValue: PropTypes.number.isRequired,
    countdown: PropTypes.number.isRequired,
    onCountdownFinish: PropTypes.func.isRequired
}
