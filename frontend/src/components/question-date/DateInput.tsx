import React from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const DateInput = ({ question, answer }: IQuestionProps<'date-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'date' });

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
      <button type="button" onClick={() => answer({ id: question.id, type: 'date-input', value })}>
        Next
      </button>
    </div>
  );
};