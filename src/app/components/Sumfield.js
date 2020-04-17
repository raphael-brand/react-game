import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Sumfield extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        let { value } = this.props
        return <div className="current-task">{ value }</div>
    }
}

Sumfield.propTypes = {
    remainingTiles: PropTypes.number,
    sum: PropTypes.func
};


