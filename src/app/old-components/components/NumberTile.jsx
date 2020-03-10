import React, { useState } from 'react';

function NumberTile(props) {
    let [className, setClassName] = useState('f image');

    return <div
        data-key={props.id}
        style={props.style}
        data-value={props.val}
        className={className}
    ></div>
}

export default NumberTile;