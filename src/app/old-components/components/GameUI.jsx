import React, { Component } from "react";
import { Playfield } from './Playfield';
import { Sumfield } from './Sumfield';



const baseFilter = 'invert(100%) sepia(100%) ';
const colors = {
    blue: 'saturate(400%) brightness(110%) hue-rotate(162deg)',
    brown: 'saturate(90%) brightness(80%) contrast(200%) hue-rotate(338deg)',
    green: 'saturate(200%) brightness(120%) contrast(100%) hue-rotate(70deg)',
    orange: 'saturate(400%) brightness(120%) hue-rotate(352deg)',
}
const numberColors = ['blue', 'brown', 'green', 'orange', 'blue', 'orange', 'green', 'brown', 'blue']


export class GameUI extends Component {




    constructor(props) {
        super(props);
        this.state = { sum: this.random(), matrix: this.props.init(), countdown: 60 };
        this.remainingTiles = this.state.matrix.length * this.state.matrix.length;
        this.createNumber = this.createNumber.bind(this);
        this.newGame = this.newGame.bind(this);
        this.play = this.play.bind(this);
        this.random = this.random.bind(this);
        //        this.resetCountdown = this.resetCountdown.bind(this);
        this.countdown();
    }

    countdown() {

        this.timeout = setTimeout(() => {
            if (this.state.countdown > 1) {
                this.setState({ countdown: this.state.countdown - 1 })
                this.countdown();
            }
            else {
                clearTimeout(this.timeout);
                this.timeout = 0;
            }
        }
            , 1000);

    }

    random() {
        const rand = Math.floor((this.props.minmax.max - this.props.minmax.min) * Math.random()) + parseFloat(this.props.minmax.min);
        return rand;
    }

    newGame() {
        let matrix = this.state.matrix;
        this.setState({ matrix: this.props.init(), sum: this.random(), countdown: 60 });
        this.remainingTiles = matrix.length * matrix.length;
        document.querySelectorAll('.clicked, .played').forEach((el) => {
            el.classList.remove('clicked');
            el.classList.remove('played');
        });

        clearTimeout(this.timeout);
        this.timeout = 0;
        this.countdown();
        this.createNumber();
    }

    createNumber(number) {
        if (!number)
            number = this.state.sum;
        let newVal = number;
        while (newVal == number)
            newVal = this.random();
        this.setState({ sum: newVal });
        return newVal
    }

    play(number, id, obj) {
        const sum = this.state.sum;

        if (sum < number && obj.getAttribute('class').indexOf('clicked') == -1) return;

        console.log('remainingTiles: ', this.remainingTiles, 'sum: ', sum)

        if (obj.getAttribute('class').indexOf('clicked') > -1) {

            this.setState({ sum: sum + number });
            this.remainingTiles++;
            obj.classList.remove('clicked');
            return;
        }

        if (sum - number > 0) {
            this.setState({ sum: sum - number })
        } else if (sum - number === 0 && this.remainingTiles > 1) {
            this.createNumber(number);
            document.querySelectorAll('.clicked').forEach(el => {
                el.classList.add('played');
            });
            obj.classList.add('played');

            this.remainingTiles--;
            return;
        }
        else return;

        this.remainingTiles--;
        obj.classList.add('clicked');
    }

    render() {
        return (
            <div>
                <Playfield onClick={this.play} matrix={this.state.matrix} colors={{ baseFilter, numberColors, colors }}>
                    <h1>Math Game</h1>
                    <button onClick={this.newGame}>New Game</button>
                    <Sumfield remainingTiles={this.remainingTiles} sum={() => this.createNumber} value={this.state.sum} reset={this.newGame} />
                    <p id="countdown">{this.state.countdown}</p>
                </Playfield>
            </div>
        );
    }
} 