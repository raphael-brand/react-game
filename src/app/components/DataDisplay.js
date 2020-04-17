import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class DataDisplay extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
        <div className="data-display-container">
            <div className="current-task">{ this.props.displayValue }</div>
            <div id="countdown">{this.props.countdown}</div>
        </div>
        );
    }
}

DataDisplay.propTypes = {
    displayValue: PropTypes.number.isRequired,
    countdown: PropTypes.number.isRequired
}
