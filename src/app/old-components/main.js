import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { GameUI } from './src/components/GameUI';



class MathGame extends Component {


    constructor(props) {
        super(props);
        const sum_min = this.props.min;
        const sum_max = this.props.max;
        this.state = {
            sum_range: [sum_min, sum_max],
            sum_min: sum_min,
            sum_max: sum_max,
        };

        this.sets = new Array();
        this.newGame = this.newGame.bind(this);
    }


    initNumbers(amount) {
        const arr = [];
        let sum = 0;
        let index = 0;
        let val;
        while (sum < this.state.sum_max && index < amount) {
            for (let i = 0; arr.length < amount; i++ , index++) {
                val = Math.floor((9 * Math.random()) + 1);
                sum += val;

                if (arr.toString().indexOf(val) > -1) {
                    (sum = sum - val);
                    continue;
                }

                arr.push(val);
            }
        }

        return arr;
    }

    initNumberSets(amount) {
        this.sets = [];
        for (let i = 0; i < amount; i++) {
            this.sets.push(this.initNumbers(amount));
        }

        return this.sets;
    }


    newGame() {
        return this.initNumberSets(5);
    }

    render() {
        return (
            <div>
                <GameUI minmax={{ min: this.props.min, max: this.props.max }} init={this.newGame} />
            </div>
        );
    }
}

ReactDOM.render(
    <MathGame min="2" max="27" />,
    document.querySelector('#app')
)

MathGame.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number
}