import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Calculator from '../containers/Calculator';

import ROUTES from '../constants/routes';
import CALCTYPES from '../constants/CalculatorType';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route
          exact
          path={ROUTES.PRESSURE}
          component={() => <Calculator type={CALCTYPES.PRESSURE} />}
        />
        <Route
          exact
          path={ROUTES.KIDNEY}
          component={() => <Calculator type={CALCTYPES.KIDNEY} />}
        />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
