import React from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const NumberInput = ({ question, answer }: IQuestionProps<'number-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'number' });

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
      <button type="button" onClick={() => answer({ id: question.id, type: 'number-input', value: parseInt(value, 10) })}>
        Next
      </button>
    </div>
  );
};