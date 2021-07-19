import React from 'react';
import {create} from 'react-test-renderer'

/* Containers */
import Calculator from '../../containers/Calculator';

/* Constants */
import CALCTYPE from '../../constants/CalculatorType';

jest.mock('../../i18n.js');

describe('<Calculator />', () => {
  test('Calculator snapshot', () => {
    const calculator = create(<Calculator type={CALCTYPE.KIDNEY} />);
    expect(calculator.toJSON()).toMatchSnapshot();
  });
});
