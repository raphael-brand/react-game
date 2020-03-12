import React, { Component } from 'react';
import { PlayfieldView } from './components/PlayfieldView'
import MathSumRenderer from './actions/renderMathSum'
import PlayfieldGenerator from './components/PlayfieldGenerator';
import { Sumfield } from './components/Sumfield'


export default class App extends Component {

    
    constructor(props) {
        super(props);
        this.generator = new PlayfieldGenerator()
        this.generator.init()
        let renderer = new MathSumRenderer({matrix: this.generator.restart()});
        console.log('renderer', renderer)
    }

    componentDidMount() {
        console.log('... it worked so far. Sneaking onto the stage now.')
    }

    render() {

        return (
            <div>
                <PlayfieldView onClick={() => /* no click-handler yet */ false} matrix={this.generator.restart()}>
                    <Sumfield></Sumfield>
                </PlayfieldView>
            </div>
        );
    }
}