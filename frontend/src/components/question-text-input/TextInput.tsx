import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const TextInput = ({ question, answer }: IQuestionProps<'text-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'text' });

  useEffect(() => {
    if (value) answer({ id: question.id, type: 'text-input', value });
  }, [answer, question.id, value]);

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
    </div>
  );
};
