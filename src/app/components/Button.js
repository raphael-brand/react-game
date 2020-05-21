import React from 'react';
import PropTypes from 'prop-types';
const Button = (props) => {
    return (
        <div className="button-row">
            <button 
                aria-label={props.ariaLabel}
                role="button"
                onClick={props.action ? props.action : () => false}>
                    {props.btnText}
            </button>
        </div>
        )
        
}

Button.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    action: PropTypes.func
}

export default Button;