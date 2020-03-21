import * as React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const YesNo = ({ question, setAnswer, answer }: IQuestionProps<'yes-no'>) => (
  <div>
    {question.question}
    <button disabled={answer && answer.yes} type="button" onClick={() => setAnswer({ type: 'yes-no', id: question.id, yes: true })}>Ja</button>
    <button disabled={answer && !answer.yes} type="button" onClick={() => setAnswer({ type: 'yes-no', id: question.id, yes: false })}>Nein</button>
  </div>
);
