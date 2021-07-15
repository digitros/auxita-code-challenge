import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ROUTES from '../constants/routes';

import { Home, Favorite, Healing } from '@material-ui/icons';

import '../styles/Nav.styl';

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={pathname === ROUTES.HOME ? 'active' : ''}>
          <Link to={ROUTES.HOME}>
            <Home className="nav-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className={pathname === ROUTES.PRESSURE ? 'active' : ''}>
          <Link to={ROUTES.PRESSURE}>
            <Favorite className="nav-icon" />
            <span>Pressure</span>
          </Link>
        </li>
        <li className={pathname === ROUTES.KIDNEY ? 'active' : ''}>
          <Link to={ROUTES.KIDNEY}>
            <Healing className="nav-icon" />
            <span>Kidney Disease</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
