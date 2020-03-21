import * as React from 'react';

import { Main } from '../pages/main/Main';
import { WithPagination, Page } from '../contexts/Paging';

export const App = () => {
  return (
    <WithPagination>
      <Page name='/'>
        <Main />
      </Page>
      <Page name='/bp'>Seite für die Bundespolizei</Page>
    </WithPagination>
  );
};


