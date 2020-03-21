import * as React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const YesNo = ({ question, answer }: IQuestionProps<'yes-no'>) => (
  <div>
    {question.question}
    <button type="button" onClick={() => answer({ type: 'yes-no', id: question.id, yes: true })}>Ja</button>
    <button type="button" onClick={() => answer({ type: 'yes-no', id: question.id, yes: false })}>Nein</button>
  </div>
);
