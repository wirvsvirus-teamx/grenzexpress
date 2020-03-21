import React, { useState } from 'react';

import {
  IAnswer, IForm, IQuestion,
} from '../../../../shared/types';
import { Link } from '../../contexts/Paging';
import { useUser } from '../../contexts/User';
import { questions } from '../../data/forms';
import { ChoiceInput } from '../question-choice/Choice';
import { DateInput } from '../question-date/DateInput';
import { FormInput } from '../question-form/FormInput';
import { NumberInput } from '../question-number-input/NumberInput';
import { TextInput } from '../question-text-input/TextInput';
import { YesNo } from '../question-yesno/YesNo';

export const Form = ({ form }: { form: IForm }) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const questionID = form.questions[current];
  const question = questions.find((it) => it.id === questionID);

  const { addFormAnswer } = useUser();
  React.useEffect(() => {
    if (question) {
      console.log('question needed?');
      if (question.isNeeded && !question.isNeeded(answers)) {
        console.log('yes!');
        setCurrent((curr) => curr + 1);
      }
    }
  }, [answers, question]);

  function submit() {
    if (current >= form.questions.length && !submitted) {
      setSubmitted(true);

      addFormAnswer({
        answers,
        id: form.id,
        key: 'whatever',
        uid: 'test',
        userUid: 'test', // TODO
      });
    }
  }

  function answer(an: IAnswer) {
    setAnswers((a) => [...a, an]);
    setCurrent((curr) => curr + 1);
  }

  if (submitted) {
    return (
      <div>
        Done!
        <Link to="/">
          <button type="button">Zurück zur Übersicht</button>
        </Link>
      </div>
    );
  }

  if (!question) {
    return (
      <div>
        <button type="button" onClick={submit}>Absenden</button>
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
