import React, { useState } from 'react';

import {
  IAnswer, IForm, IFormAnswer, IQuestion,
} from '../../../../shared/types';
import { questions } from '../../data/forms';
import { ChoiceInput } from '../question-choice/Choice';
import { DateInput } from '../question-date/DateInput';
import { FormInput } from '../question-form/FormInput';
import { NumberInput } from '../question-number-input/NumberInput';
import { TextInput } from '../question-text-input/TextInput';
import { YesNo } from '../question-yesno/YesNo';
import { Link } from 'contexts/Paging';

export const Form = ({ form, done }: { form: IForm; done(formAnswer: IFormAnswer): void }) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const questionID = form.questions[current];
  const question = questions.find((it) => it.id === questionID);

  React.useEffect(() => {
    if (question) {
      console.log('question needed?');
      if (question.isNeeded && !question.isNeeded(answers)) {
        console.log('yes!');
        setCurrent((curr) => curr + 1);
      }
    }
  }, [answers, question]);

  React.useEffect(() => {
    if (current >= form.questions.length) {
      done({
        answers,
        id: form.id,
        key: 'whatever',
        uid: 'test',
        userUid: 'test', // TODO
      });
    }
  }, [answers, current, done, form.id, form.questions.length]);

  function answer(an: IAnswer) {
    setAnswers((a) => [...a, an]);
    setCurrent((curr) => curr + 1);
  }

  if (!question) {
    return (
      <div>
        Done!
        <Link to="/">
          <button type="button">Zurück zur Übersicht</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{form.title}</h2>

      <div key={question.id}>
        {question.type === 'yes-no' && <YesNo answer={answer} question={question as IQuestion<'yes-no'>} />}
        {question.type === 'text-input' && <TextInput answer={answer} question={question as IQuestion<'text-input'>} />}
        {question.type === 'number-input' && <NumberInput answer={answer} question={question as IQuestion<'number-input'>} />}
        {question.type === 'date-input' && <DateInput answer={answer} question={question as IQuestion<'date-input'>} />}
        {question.type === 'multiple-choice' && <ChoiceInput answer={answer} question={question as IQuestion<'multiple-choice'>} />}
        {question.type === 'upload-form' && <FormInput answer={answer} question={question as IQuestion<'upload-form'>} />}
      </div>
    </div>
  );
};
