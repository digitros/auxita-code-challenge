import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Kidney from '../containers/Kidney';
import Pressure from '../containers/Pressure';
import ROUTES from '../constants/routes';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.PRESSURE} component={Pressure} />
        <Route exact path={ROUTES.KIDNEY} component={Kidney} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
