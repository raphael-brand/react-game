import React from 'react';
import { shallow, render, mount } from 'enzyme';
import './setupTests';

import PlayfieldGenerator from './../components/PlayfieldGenerator';
import MathSumRenderer from './../actions/renderMathSum'
import { PlayfieldView } from './../components/PlayfieldView'
import { DataDisplay } from './../components/DataDisplay';

describe('playfield interactions', () => {
    const generator = new PlayfieldGenerator();
    generator.init();
    const matrix = generator.restart();
    const renderer = new MathSumRenderer({matrix: matrix});
    const startValue = renderer.init();
    let wrapper, wrapper2;
    let countdown = 59;
    describe('it can create the app components', () => {

        wrapper = mount(<PlayfieldView matrix={matrix}></PlayfieldView>)
        
        wrapper2 = mount(<DataDisplay displayValue={startValue} countdown={countdown}></DataDisplay>)

         it('has a task created', () => {
            expect(parseInt(
                wrapper2.find('.current-task').text())
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
                    // console.info('no exact match found')
                }
            });
            

            it('substracts it\'s value from the task', () => {
                
            });
        });

        describe('no match found', () => {

        });

    });

});