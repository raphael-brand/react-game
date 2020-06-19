import React, { Component, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import { gearSymbol } from '../assets';

const DataDisplay = (props) => {

    let loadDelay = true;

    let gear = createRef();
    useEffect(cb => {
        gear.current.addEventListener('load', () => {
            loadDelay = false;
        });
    })

    return (
    <div className="data-display-container">
        {<div className="current-task">{ props.displayValue ? props.displayValue : '' }</div>}
        <Countdown startValue={props.countdown} onComplete={props.onCountdownFinish} gameIsPaused={() => loadDelay ? !loadDelay : props.gameIsPaused()}/>
        <div id="setup" className="animate-in"><img src="gear_2699.png" width="47" height="47" onClick={props.openMainMenu} ref={gear} /></div>
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
