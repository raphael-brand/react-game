import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';

const DataDisplay = (props) => {

    return (
    <div className="data-display-container">
        <div className="current-task">{ props.displayValue }</div>
        <Countdown startValue={props.countdown} onComplete={props.onCountdownFinish} gameIsPaused={props.gameIsPaused}/>
        <div id="setup" className="animate-in"><img src="gear_2699.png" width="47" height="47" onClick={props.openMainMenu} /></div>
    </div>
    );
}

DataDisplay.propTypes = {
    displayValue: PropTypes.number.isRequired,
    countdown: PropTypes.number.isRequired,
    onCountdownFinish: PropTypes.func.isRequired,
    openMainMenu: PropTypes.func,
    gameIsPaused: PropTypes.func
}

export default DataDisplay;
