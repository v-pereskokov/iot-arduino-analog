import * as React from 'react';
import { Route, Switch } from 'react-router';

import Main from './containers/Main/Main';
import NotFound from './containers/NotFound/NotFound';

export const PATHS = {
  MAIN: '/',
  ERROR: '/404',
};

/* tslint:disable:jsx-no-lambda */
export const routes: JSX.Element = (
  <Switch>
    <Route exact path={ PATHS.MAIN } component={ Main } />
    <Route exact path={ PATHS.ERROR } component={ NotFound } />
    <Route render={ () => <span>404.Не найдено:(</span> } />
  </Switch>
);
