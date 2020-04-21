import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Dialog (props) {

    let [isVisible, toggleDialog] = useState('');
    let autoclose = 0;
    let showInitially = true;
    props.autoclose && (autoclose = props.autoclose)

 
    if(showInitially === true) {
        
        setTimeout(() => toggleDialog('animate-in'), 200)
        showInitially = false;
        
        if(autoclose)
            setTimeout(() => toggleDialog(''), autoclose);
        
        return (
            <>
                <div className={'message-container ' + isVisible} aria-hidden="false">
                    <div className={`message ${props.type}`} role="alert" aria-live="assertive">
                        {props.message}
                    </div>
                    {autoclose == 0 && <a href="#" role="button" aria-label="close" className={'close-button '+ (!props.autoclose ? isVisible : '')}>x</a>}
                </div>
                <div onClick={() => {toggleDialog('display-none'); showInitially = false; props.onClose()}} className="modal-overlay"></div>
            </>
        );
    }
    else return null
}

Dialog.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoclose: PropTypes.number, // delay in milliseconds
};

export default Dialog;