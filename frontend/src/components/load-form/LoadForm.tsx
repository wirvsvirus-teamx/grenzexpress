import React from 'react';

import { IFormAnswer } from '../../types';
import { FinishedForm } from '../finished-form/FinishedForm';

export const LoadForm = () => {
  const data = window.atob(window.location.hash.slice(1));
  const [publicKey, secret] = data.split('@');

  // Load some magic from server

  const result: IFormAnswer = {
    id: 'pass-border',
    key: '?',
    uid: '?',
    userUid: '?',
    answers: [
      {
        type: 'text-input',
        id: 'first-name',
        value: 'Max',
      },
      {
        type: 'text-input',
        id: 'last-name',
        value: 'Mustermann',
      },
    ],
  };

  return <FinishedForm formAnswer={result} />;
};
