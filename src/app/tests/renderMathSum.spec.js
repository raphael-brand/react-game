import React from 'react';
import { shallow } from 'enzyme';
import './setupTests';
import PlayfieldGenerator from './../components/PlayfieldGenerator';
import MathSumRenderer from './../actions/renderMathSum'

describe('math sum field generate', () => {

    let generator = new PlayfieldGenerator();
    let renderer = new MathSumRenderer({matrix: generator.restart()});
    let playfield;

    it('calls the generator init function', () => {
        playfield = generator.init()
    });

    describe('math sum renderer', () => {

        it('calls the update function', () => {
            console.log(renderer.init());
        });
        
        it('calls the init function', () => {
            console.log(renderer.update());
        });

    });

    describe('when playfield tile is to be tested', () => {

        it('creates a sorted number list', () => {
            console.log(generator.restart())
            generator.simple();
        })
    
        it('filters the numbers list by desired value', ()=> {
            let filtered = generator.simpleByValue(generator.simple()[0].value);
            filtered.forEach(element => {
                console.log(`key: ${element.key}`, `value: ${element.value}`);
            });
        })

    });    
        
    describe('click tests', () => {
        
    });
});