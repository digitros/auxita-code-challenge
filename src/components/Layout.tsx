import React from 'react';
import PropsWithChildren from '../interfaces/Props';
import Header from './Header';
import Nav from './Nav';

import '../styles/Layout.styl';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div className="main">
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
