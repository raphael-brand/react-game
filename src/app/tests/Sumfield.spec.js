import React from 'react';
import {shallow} from 'enzyme';
import './setupTests';
import { Sumfield } from './../components/Sumfield'

describe('Number Field', () => {
    it('loads the number field', () => {
        shallow(<Sumfield />)
    })
})