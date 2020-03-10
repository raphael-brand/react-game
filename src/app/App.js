import React, { Component } from 'react';
import {Playfield} from './components/Playfield'
import PlayfieldGenerator from './components/PlayfieldGenerator'


export default class App extends Component {

    
    constructor(props) {
        super(props);
        this.generator = new PlayfieldGenerator()
        this.generator.init()
    }

    componentDidMount() {
        console.log('... it worked so far. Sneaking onto the stage now.')
    }

    render() {

        return (
            <div>
                <Playfield onClick={() => /* no click-handler yet */ false} matrix={this.generator.restart()} />
            </div>
        );
    }
}