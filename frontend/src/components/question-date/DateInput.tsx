import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';
import { useInput } from '../../hooks/input';

export const DateInput = ({ question, answer, setAnswer }: IQuestionProps<'date-input'>) => {
  function setValue(value: string) {
    if (value) setAnswer({ id: question.id, type: 'date-input', value });
  }

  return (
    <div>
      <h2>{question.name}</h2>
      <input type="date" value={answer ? answer.value : ''} onInput={(e) => setValue((e as any).target.value)} />
    </div>
  );
};
