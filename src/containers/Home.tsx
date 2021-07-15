import React from 'react';

import Box from '../components/Box';

import { BoxSizes } from '../interfaces/Props';

import '../styles/Home.styl';

const Home = () => {
  return (
    <main>
      <Box size={BoxSizes.medium}>
        <div className="home">
          <h1>Welcome to healthCalculator</h1>
          <p>
            Here you can calculate some information regarding your health state
            using Blood Pressure data and eGFR to estimate if you have any
            disease.
          </p>
          <p>
            Please feel free to select any of the options in the navigation
            panel to start calculating your health state at any moment.
          </p>
          <p>This platform is developed using React.Js and other tools.</p>
        </div>
      </Box>
    </main>
  );
};

export default Home;
