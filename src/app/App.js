import React, { Component } from 'react';
import MathSumRenderer from './actions/renderMathSum'
import PlayfieldGenerator from './components/PlayfieldGenerator';
import { PlayfieldView } from './components/PlayfieldView'
import { Sumfield } from './components/Sumfield'


export default class App extends Component {

    
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.generator = new PlayfieldGenerator()
        this.generator.init()

        this.state = {
            value: 20,
            playfield: this.generator.restart()
        };

        this.remainingTiles = this.state.playfield.map(this.isSolved).length;
        this.renderer = new MathSumRenderer({ matrix: this.state.playfield });
        this.renderer.init();

        this.updateTask = this.updateTask.bind(this);
    }

    isSolved(value, index, map) {
        console.log(map);
        return value > 0;
    }

    newTask() {
        this.setState({value: this.renderer.update()});
    }

    updateTask(number, index, obj) {

        console.log('key:', index, 'number:', number)
        if (this.state.value < number && obj.getAttribute('class').indexOf('clicked') == -1) return;

        console.log('remainingTiles: ', this.remainingTiles, 'sum: ', this.state.value)

        if (obj.getAttribute('class').indexOf('clicked') > -1) {

            this.setState({ value: this.state.value + number });
            this.remainingTiles++;
            obj.classList.remove('clicked');
            return;
        }

        if (this.state.value - number > 0) {
            this.setState({ value: this.state.value - number })
        } else if (this.state.value - number === 0 && this.remainingTiles > 1) {
            //this.createNumber(number);

            
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

    componentDidMount() {
        console.log('... it worked so far. Sneaking onto the stage now.')
    }

    render() {

        return (
            <div>
                <PlayfieldView onClick={this.updateTask} matrix={this.state.playfield}>
                    <Sumfield value={this.state.value}></Sumfield>
                </PlayfieldView>
            </div>
        );
    }
}