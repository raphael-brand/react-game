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

        const playfield = this.generator.restart();
        this.renderer = new MathSumRenderer({ matrix: playfield });

        this.state = {
            value: this.renderer.init(),
            playfield: playfield
        };

        this.remainingTiles = this.generator.simple().filter(this.isNotSolved);
        

        this.updateTask = this.updateTask.bind(this);
    }

    isNotSolved(field) {
        return field.clicked !== true;
    }

    newTask() {
        this.setState({value: this.renderer.update()});
    }

    updateTask(number, index, obj) {


        console.log('key:', index, 'number:', number)
        if (this.state.value < number || this.remainingTiles[index].clicked) return;

        console.log(
            'remainingTiles amount: ', this.generator.simple().filter(this.isNotSolved).length,
            'sum: ', this.state.value
        )

        if (this.remainingTiles[index].clicked) {
            this.setState({ value: this.state.value + number });
        }
        else
        if (this.state.value - number > 0) {
            this.setState({ value: this.state.value - number });
            
        } else if (this.state.value - number === 0 && this.remainingTiles.length > 1) {
            this.newTask();
        }
        else return;

        this.remainingTiles[index].clicked = (!this.remainingTiles[index].clicked);
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