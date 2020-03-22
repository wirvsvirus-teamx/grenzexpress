/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Button, Card, CardActions, CardContent, Grid, Typography,
} from '@material-ui/core';
import { FinishedForm } from 'components/finished-form/FinishedForm';
import { useUser } from 'contexts/User';
import React, {
  FunctionComponent, useCallback, useEffect, useMemo,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import classes from '*.module.scss';

import { DateInput, Signature } from '../../components';
import { Layout } from '../../components/layout/Layout';
import { ChoiceInput } from '../../components/question-choice/Choice';
import { FormInput } from '../../components/question-form/FormInput';
import { NumberInput } from '../../components/question-number-input/NumberInput';
import { TextInput } from '../../components/question-text-input/TextInput';
import { YesNo } from '../../components/question-yesno/YesNo';
import { getForm, questions } from '../../data/forms';
import { IAnswer, IForm, IPage } from '../../types';
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
    return <FormSubmit form={form} />;
  }

  const page = form.pages[step];

  if (!page) return <NotFound />;

  return <Page form={form} page={page} step={step} />;
};

export const Page = ({ page, form, step }: { page: IPage; form: IForm; step: number }) => {
  // Memoize answers across page reloads (and navigation)
  const { answers, setAnswer, removeAnswer } = useAnswers(form.id);
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
    history.push(`/form/${form.id}/${index}`);
  };

  const prevPage = () => {
    history.goBack();
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
            setAnswer, removeAnswer, answer, question, key: question.id,
          };

          return (
            <>
              {question.type === 'yes-no' && <YesNo {...props} />}
              {question.type === 'text-input' && <TextInput {...props} />}
              {question.type === 'number-input' && <NumberInput {...props} />}
              {question.type === 'date-input' && <DateInput {...props} />}
              {question.type === 'multiple-choice' && <ChoiceInput {...props} />}
              {question.type === 'upload-form' && <FormInput {...props} />}
              {question.type === 'signature' && <Signature {...props} />}
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

export const FormSubmit = ({ form }: { form: IForm }) => {
  const { answers } = useAnswers(form.id);
  const { addFormAnswer } = useUser();
  const history = useHistory();

  const formAnswer = useMemo(() => ({
    id: form.id,
    key: '?',
    userUid: '?',
    uid: '?',
    answers: Object.values(answers),
  }), [form, answers]);

  function submit() {
    addFormAnswer(formAnswer);
    localStorage.removeItem(`grenzexpress-${form.id}`);
    history.replace('/');
  }

  return (
    <Layout title="Grenzexpress">
      <Grid>
        <FinishedForm formAnswer={formAnswer} />
        <Grid item sm={8} xs={12}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h5">
                Formular absenden
              </Typography>
              <p>
                Wenn du das Formular absendest, kannst du die Daten an der Grenze einfach mit dem Grenzpersonal teilen.
                Deine Daten werden geschützt, und nur wer einen QR Code besitzt kann darauf zugreifen.
              </p>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={submit}>Formular Absenden</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>

  );
};

const useAnswers = (form: string) => {
  const [answers, setAnswers] = useState<{ [id: string]: IAnswer }>(() => {
    let initial = {};

    try {
      initial = JSON.parse(localStorage.getItem(`grenzexpress-${form}`) || '');
    } catch { console.log('page answers initialized'); }

    return initial;
  });

  useEffect(() => {
    localStorage.setItem(`grenzexpress-${form}`, JSON.stringify(answers));
  }, [form, answers]);

  const setAnswer = useCallback((answer: IAnswer) => {
    setAnswers((a) => ({ ...a, [answer.id]: answer }));
  }, [setAnswers]);

  const removeAnswer = useCallback((id: string) => {
    setAnswers((a) => {
      const copy = { ...a };
      delete copy[id];
      return copy;
    });
  }, [setAnswers]);

  return { answers, setAnswer, removeAnswer };
};
