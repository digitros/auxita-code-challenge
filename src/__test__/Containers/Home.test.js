import React from 'react';
import {create} from 'react-test-renderer'

/* Containers */
import Home from '../../containers/Home';

jest.mock('../../i18n.js');

describe('<Home />', () => {
  test('Home snapshot', () => {
    const home = create(<Home />);
    expect(home.toJSON()).toMatchSnapshot();
  });
});
