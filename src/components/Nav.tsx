import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

/* Constants */
import ROUTES from '../constants/routes';

/* Styles */
import '../styles/Nav.styl';

/*Icons */
import { Home, Favorite, Healing } from '@material-ui/icons';

/* i18n */
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { t } = useTranslation(['Nav']);
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={pathname === ROUTES.HOME ? 'active' : ''}>
          <Link to={ROUTES.HOME}>
            <Home className="nav-icon" />
            <span>{t('Nav:Home', 'Home')}</span>
          </Link>
        </li>
        <li className={pathname === ROUTES.PRESSURE ? 'active' : ''}>
          <Link to={ROUTES.PRESSURE}>
            <Favorite className="nav-icon" />
            <span>{t('Nav:Blood', 'Blood Pressure')}</span>
          </Link>
        </li>
        <li className={pathname === ROUTES.KIDNEY ? 'active' : ''}>
          <Link to={ROUTES.KIDNEY}>
            <Healing className="nav-icon" />
            <span>{t('Nav:Kidney', 'Kidney Disease')}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
