import { TextField } from '@material-ui/core';
import React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const NumberInput = ({ question, answer, setAnswer }: IQuestionProps<'number-input'>) => {
  function setValue(value: string) {
    setAnswer({ id: question.id, type: 'number-input', value: parseInt(value, 10) });
  }

  return (
    <TextField id="standard-basic" label={question.name} value={answer ? answer.value : 0} onInput={(e) => setValue((e as any).target.value)} />
  );
};
