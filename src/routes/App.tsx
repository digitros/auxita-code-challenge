import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Kidney from '../containers/Kidney';
import Presure from '../containers/Presure';
import ROUTES from '../constants/routes';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.PRESURE} component={Presure} />
        <Route exact path={ROUTES.KIDNEY} component={Kidney} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
