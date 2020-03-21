import React, { useEffect } from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const NumberInput = ({ question, answer, setAnswer }: IQuestionProps<'number-input'>) => {
  function setValue(value: string) {
    setAnswer({ id: question.id, type: 'number-input', value: parseInt(value, 10) });
  }

  return (
    <div>
      <h2>{question.name}</h2>
      <input type="number" value={answer ? answer.value : 0} onInput={(e) => setValue((e as any).target.value)} />
    </div>
  );
};
