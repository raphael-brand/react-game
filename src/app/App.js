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
        this.renderer = new MathSumRenderer({matrix: this.generator.restart()});
        console.log('renderer', this.renderer);
        this.updateTask = this.updateTask.bind(this);
        this.renderer.init();
    }

    updateTask() {
        this.setState({value: this.renderer.update()});
    }

    componentDidMount() {
        console.log('... it worked so far. Sneaking onto the stage now.')
    }

    render() {

        return (
            <div>
                <PlayfieldView onClick={this.updateTask} matrix={this.generator.restart()}>
                    <Sumfield value={this.state.value}></Sumfield>
                </PlayfieldView>
            </div>
        );
    }
}