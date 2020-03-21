import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const TextInput = ({ question, answer, setAnswer }: IQuestionProps<'text-input'>) => {
  function setValue(value: string) {
    if (value) setAnswer({ id: question.id, type: 'text-input', value });
  }

  return (
    <div>
      <h2>{question.name}</h2>
      <input type="text" value={answer ? answer.value : ''} onInput={(e) => setValue((e as any).target.value)} />
    </div>
  );
};
