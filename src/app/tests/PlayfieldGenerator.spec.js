import React from 'react';
import { shallow } from 'enzyme';
import './setupTests';

import { PlayfieldView } from '../components/PlayfieldView';
import PlayfieldGenerator from '../components/PlayfieldGenerator';

let generator;

describe('Matrix generator', () => {
    it('generates a matrix', () => {
        generator = new PlayfieldGenerator()
        generator.init()
    });
    it('can call restart', () => {
        let game = generator.restart();
// console.log(game);
    });
});

describe('UI Test Suite', () => {
    it('renders without crashing', () => {
        generator = new PlayfieldGenerator()
        generator.init()
        generator.getFieldByIndex(2);
        shallow(<PlayfieldView matrix={generator.restart()} />);
    });
});
    