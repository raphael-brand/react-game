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
    const startValue = renderer.update();
    let wrapper;

    describe('it can create the app components', () => {

        wrapper = mount(<PlayfieldView matrix={matrix}>
            <Sumfield value={startValue}></Sumfield>
        </PlayfieldView>)

        it('has a task created', () => {
            expect(parseInt(
                wrapper.find('.current-task').text())
            ).toBe(startValue);
        });

        let matchIDs = generator.simpleByValue(startValue);
        
        describe('match found', () => {

            it('has a button which value is equal or less than the task value', () => {
                if(matchIDs.length >= 1) {
                    expect(wrapper.find('div[data-testid="'+matchIDs[0].key+'"]')).toBeLessThanOrEqual(startValue);
                } 
            });
            it('can be clicked', () => {
                if(matchIDs.length >= 1)
                    wrapper.find('div[testid="'+matchIDs[0].key+'"]')
                    .simulate('click');
                else if(matchIDs.length == 0) {
                    console.info('no exact match found')
                }
            });
            

            it('substracts it\'s value from the task', () => {
                
            });
        });

        describe('no match found', () => {

        });

    });

});