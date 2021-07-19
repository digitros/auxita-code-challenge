import React from 'react';

import '../styles/Header.styl';
import LanguageButton from './LanguageButton';

const Header = () => {
  return (
    <header className="header">
      <span className="header-title">
        health<strong>Calculator</strong>
      </span>
      <LanguageButton />
    </header>
  );
};

export default Header;
