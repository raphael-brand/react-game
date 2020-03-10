import React from 'react';
import {shallow} from 'enzyme';
import './setupTests';
import App from './../App';

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toBe(true);
    });

    it('renders without crashing', () => {
        shallow(<App />);
    });
});