import React from 'react';
import {shallow} from 'enzyme';
import './setupTests';

import {Playfield} from '../components/Playfield';
import PlayfieldGenerator from '../components/PlayfieldGenerator';

let generator;

describe('Matrix generator', () => {
    it('generates a matrix', () => {
        generator = new PlayfieldGenerator()
        generator.init()
    });
    it('can call restart', () => {
        let game = generator.restart();
        console.log(game);
    });
});

describe('UI Test Suite', () => {
    it('renders without crashing', () => {
        generator = new PlayfieldGenerator()
        generator.init()
        shallow(<Playfield matrix={generator.restart()} />);
    });
});
    