/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IAnswer, IForm, IPage } from '../../types';
import { DateInput, Signature } from '../../components';
import { Layout } from '../../components/layout/Layout';
import { ChoiceInput } from '../../components/question-choice/Choice';
import { FormInput } from '../../components/question-form/FormInput';
import { NumberInput } from '../../components/question-number-input/NumberInput';
import { TextInput } from '../../components/question-text-input/TextInput';
import { YesNo } from '../../components/question-yesno/YesNo';
import { getForm, questions } from '../../data/forms';
import { NotFound } from '../not-found/NotFound';

interface FormPageParams {
  formId: string;
  step: string;
}

export const FormPage: FunctionComponent<{}> = () => {
  const { formId, step: _step } = useParams<FormPageParams>();
  const form = getForm(formId);
  if (!form) {
    return <NotFound />;
  }

  const step = +(_step ?? 0);

  if (step >= form.pages.length) {
    return <FormSubmit />;
  }

  const page = form.pages[+(step ?? 0)];

  if (!page) return <NotFound />;

  return <Page form={form} page={page} step={step} />;
};

export const Page = ({ page, form, step }: { page: IPage; form: IForm; step: number }) => {
  // Memoize answers across page reloads (and navigation)
  const { answers, setAnswer } = useAnswers(form.id);
  const history = useHistory();
  const prevEnabled = step > 0;
  const nextEnabled = page && page.questions.every((question) => question in answers);

  const nextPage = () => {
    let index = step;
    do {
      index += 1;
    } while (
      index < form.pages.length
      && form.pages[index].isNeeded
      && !(form.pages[index] as any).isNeeded((answerID: string) => answers[answerID] as any)
    );
    history.push(`./${index}`);
  };

  const prevPage = () => {
    let index = step;
    do {
      index -= 1;
    } while (
      index > 0
      && form.pages[index].isNeeded
      && !(form.pages[index] as any).isNeeded((answerID: string) => answers[answerID] as any)
    );
    history.push(`./${index}`);
  };

  return (
    <Layout title={`Grenzexpress - ${form.title}`}>
      {page.description ?? ''}
      <Box>
        <Typography component="h2" variant="h6">{page.title}</Typography>
        {page.questions.map((id) => {
          const question = questions.find((q) => q.id === id) as any;
          if (!question) throw new Error(`Question ${id} unknown`);
          const answer = answers[id] as any;

          const props = {
            setAnswer, answer, question, key: question.id,
          };

          return (
            <>
              {question.type === 'yes-no' && <YesNo {...props} />}
              {question.type === 'text-input' && <TextInput {...props} />}
              {question.type === 'number-input' && <NumberInput {...props} />}
              {question.type === 'date-input' && <DateInput {...props} />}
              {question.type === 'multiple-choice' && <ChoiceInput {...props} />}
              {question.type === 'upload-form' && <FormInput {...props} />}
              <br />
            </>
          );
        })}
      </Box>

      <Box mt={3}>
        <Button disabled={!prevEnabled} variant="contained" onClick={prevPage}>Zurück</Button>
        <Button disabled={!nextEnabled} variant="contained" onClick={nextPage}>Weiter</Button>
      </Box>
    </Layout>
  );
};

/*
      addFormAnswer({
        answers: Object.values(answers),
        id: form.id,
        key: 'whatever',
        uid: 'test',
        userUid: 'test', // TODO
      });
*/
export const FormSubmit = () => (
  <Layout title="Grenzexpress">
    <Typography component="h2" variant="h6">Unterschrift</Typography>
    <Signature />
    <Box mt={3}>
      <Button variant="contained">Speichern</Button>
    </Box>
  </Layout>
);

const useAnswers = (form: string) => {
  const [answers, setAnswers] = useState<{ [id: string]: IAnswer }>(() => {
    let initial = {};

    try {
      initial = JSON.parse(localStorage.getItem(`grenzexpress-${form}`) || '');
    } catch { console.log('page answers initialized'); }

    return initial;
  });

  const setAnswer = useCallback((answer: IAnswer) => {
    setAnswers((a) => ({ ...a, [answer.id]: answer }));
  }, [setAnswers]);

  return { answers, setAnswer };
};
