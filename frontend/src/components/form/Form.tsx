import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../contexts/User';
import { FinishedForm } from '../finished-form/FinishedForm';
import { Page } from '../page/Page';

export const Form = ({ form }: { form: IForm }) => {
  const [answers, setAnswers] = useState<{ [id: string]: IAnswer }>({});
  const [submitted, setSubmitted] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const page = form.pages[pageIndex];

  const prevEnabled = pageIndex > 0;
  const nextEnabled = page && page.questions.every((question) => question in answers);

  const setAnswer = useCallback((answer: IAnswer) => {
    setAnswers((previousAnswers) => {
      const newAnswers = { ...previousAnswers };
      newAnswers[answer.id] = answer;
      return newAnswers;
    });
  }, []);

  const { addFormAnswer } = useUser();

  const nextPage = () => setPageIndex((index) => {
    do {
      index += 1;
    } while (
      index < form.pages.length
      && form.pages[index].isNeeded
      && !(form.pages[index] as any).isNeeded((answerID: string) => answers[answerID] as any)
    );
    return index;
  });

  const prevPage = () => setPageIndex((index) => {
    do {
      index -= 1;
    } while (
      index > 0
      && form.pages[index].isNeeded
      && !(form.pages[index] as any).isNeeded((answerID: string) => answers[answerID] as any)
    );
    return index;
  });

  function submit() {
    if (!submitted) {
      setSubmitted(true);

      addFormAnswer({
        answers: Object.values(answers),
        id: form.id,
        key: 'whatever',
        uid: 'test',
        userUid: 'test', // TODO
      });
    }
  }

  if (submitted) {
    return (
      <div>
        Hochgeladen!
        <Link to="/">
          Zurück zur Übersicht
        </Link>
        <FinishedForm formAnswer={{
          answers: Object.values(answers),
          id: form.id,
          key: 'whatever',
          uid: 'test',
          userUid: 'test', // TODO
        }}
        />
      </div>
    );
  }

  if (pageIndex >= form.pages.length) {
    return (
      <div>
        <button type="button" onClick={submit}>Einreichen</button>

        <FinishedForm formAnswer={{
          answers: Object.values(answers),
          id: form.id,
          key: 'whatever',
          uid: 'test',
          userUid: 'test', // TODO
        }}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>{form.title}</h2>

      <Page answers={answers} page={page} setAnswer={setAnswer} />
      {prevEnabled && <button type="button" onClick={prevPage}>Zurück</button>}
      {nextEnabled && <button type="button" onClick={nextPage}>Weiter</button>}
    </div>
  );
};
