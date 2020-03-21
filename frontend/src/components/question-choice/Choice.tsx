import * as React from 'react';

import { IQuestionProps } from '../../../../shared/types';

export const ChoiceInput = ({ question, setAnswer, answer }: IQuestionProps<'multiple-choice'>) => (
  <div>
    {question.question}
    {question.choices.map((choice) => <button disabled={answer && answer.choice === choice} type="button" onClick={() => setAnswer({ type: 'multiple-choice', id: question.id, choice })}>{choice}</button>)}
  </div>
);
