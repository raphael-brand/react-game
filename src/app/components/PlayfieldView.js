import React, { Component } from "react";
import { style } from '../assets';
export class PlayfieldView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (document.querySelector('.played.clicked'))
            document.querySelectorAll('.played.clicked').forEach(el => {
                el.classList.remove('clicked');
            });
    }

    clickHandler(index, number) {
        return (e) => {
            if (e.target.classList.toString().indexOf('played') > -1) return;
            this.props.onClick(number, index, e.target);
// console.log('key:', index, 'number:', number)
        }
    }


    renderPlayfield(matrix, tileObject) {
        const colors = style;
        const playfield = [];
        let i = 0;
        matrix.forEach((fields, index, array) => {
// console.log(value);
            let numberRow = [];
            fields.forEach((number_value) => {
                // if playfield size shall be 50vw 
                const size = 50 / array.length;
                const style = {
                    backgroundPositionX: (parseInt(number_value) * 11.1) + '%',
                    //width: size + 'vw', height: size + 'vw', lineHeight: size + 'vw',
                    filter: colors.baseFilter + ' ' + colors.colors[colors.numberColors[number_value - 1]]
                }
                const field =
                    <button aria-pressed="false" aria-hidden="false" key={i} data-testid={i} style={style} className="playfield-button f image" onClick={this.clickHandler(i, number_value)}></button>

                numberRow.push(field);
                i++;
            });
            playfield.push(<div key={index} className="playfield-row row" > {numberRow}</div>)
        });

        return playfield;
    }

    render() {
        return (
            <div className="view-container">
                <div className="playfield-container wrap">
                    {this.renderPlayfield(this.props.matrix)}
                </div>
            </div>
        );
    }
}