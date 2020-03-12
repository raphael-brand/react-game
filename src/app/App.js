import React, { Component } from 'react';
import { PlayfieldView } from './components/PlayfieldView'
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
                <PlayfieldView onClick={() => /* no click-handler yet */ false} matrix={this.generator.restart()} />
            </div>
        );
    }
}