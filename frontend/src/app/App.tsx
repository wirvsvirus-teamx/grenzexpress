import * as React from 'react';

import { forms } from '../data/forms';
import { Form } from '../components/form/Form';
import { Page, WithPagination } from '../contexts/Paging';
import { Main } from '../pages/main/Main';

export const App = () => (
  <WithPagination>
    <Page name="/">
      <Main />
    </Page>
    {forms.map((form) => (
      <Page name={`/form/${form.id}`}>
        <Form done={() => {}} form={form} />
      </Page>
    ))}
    <Page name="/bp">Seite für die Bundespolizei</Page>
  </WithPagination>
);
