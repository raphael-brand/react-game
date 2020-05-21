import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Countdown = props => {


    let [countdown, setCountdown] = new useState(props.startValue);
    let timeout = 0;
    let stop = () => {
        console.log('calling stop ...')
        if(props.onComplete) {
            props.onComplete();
    
        }
    }

    let tick = () => {
        timeout = setTimeout(() => {
            if(props.gameIsPaused && props.gameIsPaused()) return tick();
            if (countdown > 1) {
                setCountdown(countdown - 1);
                tick();
            }
            else {
                stop();
            }
        }
        , 1000);
        return timeout;
    }
    
    useEffect(() => {
        tick();
        return () => clearTimeout(timeout);
    }, [countdown]);
    

    return (
        <div id="countdown">
            {countdown}
        </div>
    )
}


Countdown.propTypes = {
    startValue: PropTypes.number,
    onComplete: PropTypes.func,
    gameIsPaused: PropTypes.func
}

export default Countdown;