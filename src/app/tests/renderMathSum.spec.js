import React from 'react';
import { shallow } from 'enzyme';
import './setupTests';
import PlayfieldGenerator from './../components/PlayfieldGenerator';
import MathSumRenderer from './../actions/renderMathSum'

describe('math sum field generate', () => {
    let generator = new PlayfieldGenerator();
    let renderer = new MathSumRenderer({matrix: generator.restart()});
    it('calls the main function', () => {
        generator.init()
        console.log(renderer)
    });
    it('calls the update function', () => {
        console.log(renderer.init());
        console.log(renderer.update());
    });
});