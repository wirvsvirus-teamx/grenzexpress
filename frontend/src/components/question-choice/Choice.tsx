import * as React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const ChoiceInput = ({ question, answer }: IQuestionProps<'multiple-choice'>) => (
  <div>
    {question.question}
    {question.choices.map((choice) => <button type="button" onClick={() => answer({ type: 'multiple-choice', id: question.id, choice })}>{choice}</button>)}
  </div>
);
