import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoadForm } from '../components/load-form/LoadForm';
import { ShowQR } from '../components/show-qr/ShowQR';
import { WithUser } from '../contexts/User';
import { FormPage } from '../pages/form-page/FormPage';
import { Main } from '../pages/main/Main';
import { NotFound } from '../pages/not-found/NotFound';

export const App = () => (
  <Router>
    <WithUser>
      <Switch>
        <Route exact path="/" strict>
          <Main />
        </Route>
        <Route exact path="/form/:formId" strict>
          <FormPage />
        </Route>
        <Route exact path="/form/:formId/:step" strict>
          <FormPage />
        </Route>
        <Route exact path="/qr" strict>
          <ShowQR />
        </Route>
        <Route exact path="/load-form" strict>
          <LoadForm />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </WithUser>
  </Router>
);
