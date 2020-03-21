import React from 'react';

import { IFormAnswer } from '../../../../shared/types';
import { forms, questions } from '../../data/forms';

export const FinishedForm = ({ formAnswer }: { formAnswer: IFormAnswer }) => {
  const form = forms.find((it) => it.id === formAnswer.id);

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  return (
    <div>
      {form.title}
      TODO AMPEL
    </div>
  );
};
