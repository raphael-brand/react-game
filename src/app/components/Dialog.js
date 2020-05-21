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
                <div className={`modal-overlay ${props.type}`}></div>
                <div onClick={(e) => {
                    e.preventDefault();
                    if(props.type != 'game-over') return
                    setTimeout(() => {
                        document.querySelector('.message-container').classList.add('waiting');
                        setTimeout( () => { props.onClose() }, 1000);
                    }, 500)

                }} className={`message-container ${isVisible} ${props.type}`} aria-hidden="false">
                    <div className={`message ${props.type}`} role="alert" aria-live="assertive">
                        <div className="dialog-title">{props.message}</div> 
                    </div>
                    <div className="dialog-content">{props.children}</div>
                    
                    {autoclose == 0 && <a href="#" role="button" aria-label="close"
                    className={'close-button '+ (!props.autoclose ? isVisible : '')}
                    onClick={props.onClose ? props.onClose : () => false}
                    >x</a>}
                </div>
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