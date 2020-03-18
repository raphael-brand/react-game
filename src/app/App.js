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

        this.remainingTiles = this.state.playfield.filter(this.isSolved).length;
        

        this.updateTask = this.updateTask.bind(this);
    }

    isSolved(index, value, map) {
        //console.log(map);
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