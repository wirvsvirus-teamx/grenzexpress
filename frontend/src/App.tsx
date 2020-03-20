import React, { FunctionComponent } from 'react';

import css from './App.module.scss';
import { ReactComponent as Logo } from './logo.svg';

export const App: FunctionComponent = () => (
  <div className="App">
    <header className={css.header}>
      <Logo className={css.logo} />
      <p>
        {'Edit '}
        <code>src/App.tsx</code>
        {' and save to reload.'}
      </p>
      <a
        className={css.link}
        href="https://reactjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn React
      </a>
    </header>
  </div>
);
