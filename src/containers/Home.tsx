import React from 'react';

/* i18n */
import { useTranslation } from 'react-i18next';

/* Components */
import Box from '../components/Box';

/* Interfaces */
import { BoxSizes } from '../interfaces/Props';

/* Styles */
import '../styles/Home.styl';

const Home = () => {
  const { t } = useTranslation(['Home']);
  return (
    <main>
      <Box size={BoxSizes.medium}>
        <div className="home">
          <h1>{t('Home:title', 'Welcome to healthCalculator')}</h1>
          <p>
            {t(
              'Home:first',
              'Here you can calculate some information regarding your health state using Blood Pressure data and eGFR to estimate if you have any disease.'
            )}
          </p>
          <p>
            {t(
              'Home:second',
              'Please feel free to select any of the options in the navigation panel to start calculating your health state at any moment.'
            )}
          </p>
          {t(
            'Home:third',
            'This platform is developed using React.Js and other tools.'
          )}
          <p></p>
        </div>
      </Box>
    </main>
  );
};

export default Home;
