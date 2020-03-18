import React from 'react';
import { shallow, render, mount } from 'enzyme';
import './setupTests';

import PlayfieldGenerator from './../components/PlayfieldGenerator';
import MathSumRenderer from './../actions/renderMathSum'
import { PlayfieldView } from './../components/PlayfieldView'
import { Sumfield } from './../components/Sumfield';

describe('playfield interactions', () => {
    const generator = new PlayfieldGenerator();
    generator.init();
    const matrix = generator.restart();
    const renderer = new MathSumRenderer({matrix: matrix});
    const startValue = renderer.init()
    let app;

    describe('it can create the app components', () => {

        app = mount(<PlayfieldView matrix={matrix}>
            <Sumfield value={startValue}></Sumfield>
        </PlayfieldView>)

        it('has a task created', () => {
            expect(parseInt(
                app.find('.sumfield').text())
            ).toBe(startValue);
        });

        describe('click number buttons', () => {

            it('has a button which value is lower or equal to the task value', () => {

            });

            it('can be clicked', () => {

            });

            it('substracts it\'s value from the task', () => {
                
            });
        });

    });

});