import React from 'react';
import { shallow, render, mount } from 'enzyme';
import './setupTests';
import Countdown from '../components/Countdown';

describe('countdown', () => {

    const testCallback = () => {
        console.log('countdown finished');
    }

    it('can be created', () => {
        const wrapper = mount(<Countdown startValue={2} onComplete={testCallback} />)
        console.log(wrapper.find('div').text())
    });

});