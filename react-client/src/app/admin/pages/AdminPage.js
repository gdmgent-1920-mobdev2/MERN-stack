import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import PostCreatePage from './PostCreatePage';
import PostEditPage from './PostEditPage';
import PostsPage from './PostsPage';
import { } from '../components';

const AdminPage = ({children}) => {

  return (
    <main className={classnames('main')}>
      <Route exact path={Routes.BACKOFFICE_LANDING}>
        <Redirect to={Routes.BACKOFFICE_DASHBOARD} />
      </Route>
      <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS} component={PostsPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS_CREATE} component={PostCreatePage} />
      <Route exact path={Routes.BACKOFFICE_POSTS_EDIT} component={PostEditPage} />     
    </main>
  );
};

export default AdminPage;