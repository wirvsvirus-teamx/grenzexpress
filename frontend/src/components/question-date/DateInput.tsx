import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const DateInput = ({ question, answer }: IQuestionProps<'date-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'date' });

  useEffect(() => {
    if (value) answer({ id: question.id, type: 'date-input', value });
  }, [answer, question.id, value]);

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
    </div>
  );
};
