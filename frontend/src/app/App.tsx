import * as React from 'react';

import { Page, WithPagination } from '../contexts/Paging';
import { Main } from '../pages/main/Main';

export const App = () => (
  <WithPagination>
    <Page name="/">
      <Main />
    </Page>
    <Page name="/bp">Seite für die Bundespolizei</Page>
  </WithPagination>
);
