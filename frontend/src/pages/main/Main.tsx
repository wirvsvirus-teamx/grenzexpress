import * as React from 'react';
import { Link } from 'react-router-dom';

import { FinishedForm } from '../../components/finished-form/FinishedForm';
import { useUser } from '../../contexts/User';
import { forms } from '../../data/forms';
import css from './Main.module.scss';

export const Main = () => {
  const { user } = useUser();

  return (
    <div className={css.app}>
      <h2>Grenzexpress</h2>
      {user.answeredForms.map((formAnswer) => <FinishedForm formAnswer={formAnswer} />)}
      {forms.map((form) => (
        <Link style={{ all: 'unset' }} to={`/form/${form.id}`}>
          <h2>{form.title}</h2>
          <button type="button">Los gehts!</button>
        </Link>
      ))}
    </div>

  );
};
