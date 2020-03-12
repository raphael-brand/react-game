import React from 'react';
import { shallow } from 'enzyme';
import './setupTests';
import PlayfieldGenerator from './../components/PlayfieldGenerator';
import MathSumRenderer from './../actions/renderMathSum'

describe('math sum field generate', () => {
    it('calls the main function', () => {
        let generator = new PlayfieldGenerator();
        generator.init()
        let renderer = new MathSumRenderer({matrix: generator.restart()});
    });
});