import * as React from 'react';

import { IQuestionProps } from '../../types';

export const FormInput = ({ question }: IQuestionProps<'upload-form'>) => (
  <div>
    {question.title}
    {question.description}
    TODO
  </div>
);
