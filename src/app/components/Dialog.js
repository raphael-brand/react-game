import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Dialog (props) {

    let [isVisible, toggleDialog] = useState('');
    let autoHideAfterMilliseconds = 2000;
    let showInitially = true;
    props.visibleTime && (autoHideAfterMilliseconds = props.visibleTime) 

    if(props.doShowMessage === true) {
        if(showInitially) {
            setTimeout(() => toggleDialog('animate-in'), 200)
            showInitially = false;
            setTimeout(() => toggleDialog(''), autoHideAfterMilliseconds);
            
        }

        return (
            <>
                <div className={'message-container ' + isVisible}>
                    <div className={`message ${props.type}`}>
                        {props.message}
                    </div>
                </div>
                <div className="modal-overlay"></div>
            </>
        );
    }
    else return null
}

Dialog.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    doShowMessage: PropTypes.bool.isRequired,
    visibleTime: PropTypes.number
};

export default Dialog;