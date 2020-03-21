import * as React from 'react';

import { Form } from '../components/form/Form';
import { Page, WithPagination } from '../contexts/Paging';
import { WithUser } from '../contexts/User';
import { forms } from '../data/forms';
import { Main } from '../pages/main/Main';

export const App = () => (
  <WithPagination>
    <WithUser>
      <Page name="/">

        <Main />

      </Page>
      {forms.map((form) => (
        <Page name={`/form/${form.id}`}>
          <Form form={form} />
        </Page>
      ))}
    </WithUser>
    <Page name="/bp">Seite für die Bundespolizei</Page>
  </WithPagination>
);
