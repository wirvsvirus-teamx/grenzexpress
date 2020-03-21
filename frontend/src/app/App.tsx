import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Form } from '../components/form/Form';
import { LoadForm } from '../components/load-form/LoadForm';
import { ShowQR } from '../components/show-qr/ShowQR';
import { WithUser } from '../contexts/User';
import { forms } from '../data/forms';
import { Main } from '../pages/main/Main';

export const App = () => (
  <Router>
    <WithUser>
      <Route exact path="/">

        <Main />

      </Route>
      {forms.map((form) => (
        <Route path={`/form/${form.id}`}>
          <Form form={form} />
        </Route>
      ))}
    </WithUser>
    <Route path="/bp">Seite für die Bundespolizei</Route>
    <Route path="/qr">
      <ShowQR />
    </Route>
    <Route path="/form">
      <LoadForm />
    </Route>
  </Router>
);
