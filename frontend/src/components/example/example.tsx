import { Button } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';

import css from './example.module.scss';

interface ExampleProps {
  example: string;
}

export const Example: FunctionComponent<ExampleProps> = ({ example }) => {
  const [counter, setCounter] = useState(0);
  return (
    <ul className={css.example}>
      <li>{example}</li>
      <li>
        {'Counter: '}
        {counter}
      </li>
      <li>
        <Button onClick={(): void => setCounter(counter + 1)}>Count</Button>
      </li>
    </ul>
  );
};
