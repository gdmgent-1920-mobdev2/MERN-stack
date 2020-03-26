import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import { ContactPage, HomePage,SignInPage, PostDetailPage } from './pages';
import { PageLayout } from './layouts';
import { RouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider } from './services';

import './App.css';

function App() {
  return (
    <div className="app">
      <ApiProvider>
        <Router basename='/'>
          <Switch>
            <RouteWithLayout exact path={Routes.LANDING} component={HomePage} layout={PageLayout} />
            <Redirect from={Routes.HOME} to={Routes.LANDING} />
            <RouteWithLayout exact path={Routes.CONTACT} component={ContactPage} layout={PageLayout} />
            <RouteWithLayout exact path={Routes.POST_DETAIL} component={PostDetailPage} layout={PageLayout} />
            <RouteWithLayout exact path={Routes.AUTH_SIGN_IN} component={SignInPage} />
          </Switch>
        </Router>
      </ApiProvider>
    </div>
  );
}

export default App;
