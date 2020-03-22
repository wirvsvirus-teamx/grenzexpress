import { TextField } from '@material-ui/core';
import React from 'react';

import { IQuestionProps } from '../../types';

export const TextInput = ({ question, answer, setAnswer }: IQuestionProps<'text-input'>) => {
  function setValue(value: string) {
    if (value) setAnswer({ id: question.id, type: 'text-input', value });
  }

  return (
    <TextField id="standard-basic" label={question.name} value={answer ? answer.value : ''} onInput={(e) => setValue((e as any).target.value)} />
  );
};
