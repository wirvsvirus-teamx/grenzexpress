import * as React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const FormInput = ({ question }: IQuestionProps<'upload-form'>) => (
  <div>
    {question.title}
    {question.description}
    TODO
  </div>
);
