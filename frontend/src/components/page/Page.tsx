/* eslint-disable react/jsx-props-no-spreading */
import { ChoiceInput } from 'components/question-choice/Choice';
import { DateInput } from 'components/question-date/DateInput';
import { FormInput } from 'components/question-form/FormInput';
import { NumberInput } from 'components/question-number-input/NumberInput';
import { TextInput } from 'components/question-text-input/TextInput';
import { YesNo } from 'components/question-yesno/YesNo';
import { questions } from 'data/forms';
import React from 'react';

import { IAnswer, IPage } from '../../../../shared/types';

export const Page = (
  {
    page,
    setAnswer,
    answers,
  }: {
    page: IPage;
    setAnswer(answer: IAnswer): any;
    answers: { [id: string]: IAnswer };
  },
) => (
  <div>
    <h2>{page.title}</h2>
    {page.questions.map((id) => {
      const question = questions.find((q) => q.id === id) as any;
      if (!question) throw new Error(`Question ${id} unknown`);
      const answer = answers[id] as any;

      const props = { setAnswer, answer, question };

      return (
        <div key={question.id}>
          {question.type === 'yes-no' && <YesNo {...props} />}
          {question.type === 'text-input' && <TextInput {...props} />}
          {question.type === 'number-input' && <NumberInput {...props} />}
          {question.type === 'date-input' && <DateInput {...props} />}
          {question.type === 'multiple-choice' && <ChoiceInput {...props} />}
          {question.type === 'upload-form' && <FormInput {...props} />}
        </div>
      );
    })}
  </div>
);
