import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const NumberInput = ({ question, answer }: IQuestionProps<'number-input'>) => {
  const [value, answerEl] = useInput({ placeholder: '', type: 'number' });

  useEffect(() => {
    answer({ id: question.id, type: 'number-input', value: parseInt(value, 10) });
  }, [answer, question.id, value]);

  return (
    <div>
      <h2>{question.name}</h2>
      {answerEl}
    </div>
  );
};
