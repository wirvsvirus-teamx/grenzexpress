import React from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const TextInput = ({ question, answer }: IQuestionProps<'text-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'text' });

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
      <button type="button" onClick={() => answer({ id: question.id, type: 'text-input', value })}>
        Next
      </button>
    </div>
  );
};
