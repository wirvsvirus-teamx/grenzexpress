import { ChoiceInput } from 'components/question-choice/Choice';
import { DateInput } from 'components/question-date/DateInput';
import { FormInput } from 'components/question-form/FormInput';
import { NumberInput } from 'components/question-number-input/NumberInput';
import { TextInput } from 'components/question-text-input/TextInput';
import { YesNo } from 'components/question-yesno/YesNo';
import { questions } from 'data/forms';
import React from 'react';

import { IAnswer, IPage, IQuestion } from '../../../../shared/types';

export const Page = ({ page, answer }: { page: IPage; answer(answer: IAnswer): any }) => (
  <div>
    <h2>{page.title}</h2>
    {page.questions.map((id) => {
      const question = questions.find((q) => q.id === id);
      if (!question) throw new Error(`Question ${id} unknown`);

      return (
        <div key={question.id}>
          {question.type === 'yes-no' && <YesNo answer={answer} question={question as IQuestion<'yes-no'>} />}
          {question.type === 'text-input' && <TextInput answer={answer} question={question as IQuestion<'text-input'>} />}
          {question.type === 'number-input' && <NumberInput answer={answer} question={question as IQuestion<'number-input'>} />}
          {question.type === 'date-input' && <DateInput answer={answer} question={question as IQuestion<'date-input'>} />}
          {question.type === 'multiple-choice' && <ChoiceInput answer={answer} question={question as IQuestion<'multiple-choice'>} />}
          {question.type === 'upload-form' && <FormInput answer={answer} question={question as IQuestion<'upload-form'>} />}
        </div>
      );
    })}
  </div>
);
