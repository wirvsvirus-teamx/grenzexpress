import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, {
  FunctionComponent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { BlobWriter } from '../../api';
import { DateInput, Signature } from '../../components';
import { FinishedForm } from '../../components/finished-form/FinishedForm';
import { Layout } from '../../components/layout/Layout';
import { ChoiceInput } from '../../components/question-choice/Choice';
import { FormInput } from '../../components/question-form/FormInput';
import { NumberInput } from '../../components/question-number-input/NumberInput';
import { TextInput } from '../../components/question-text-input/TextInput';
import { YesNo } from '../../components/question-yesno/YesNo';
import { useUser } from '../../contexts/User';
import { getForm, questions } from '../../data/forms';
import { IFormAnswers } from '../../types/answers';
import { IAnswer, IForm, IPage } from '../../types/form';
import { NotFound } from '../not-found/NotFound';

/* eslint-disable react/jsx-props-no-spreading */
interface FormPageParams {
  formId: string;
  step: string;
}

const useStyles = makeStyles(() => createStyles({
  button: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  content: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  header: {
    margin: 0,
    paddingBottom: 0,
  },
}));

export const FormPage: FunctionComponent<{}> = () => {
  const { formId, step: _step } = useParams<FormPageParams>();
  const form = getForm(formId);
  if (!form) {
    return <NotFound />;
  }

  // if the user reloads the page, restart from zero
  let step = formId in answersByForm ? +(_step ?? 0) : 0;

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
  const classes = useStyles();

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
    <Layout home={false} title={`GrenzExpress - ${form.title}`}>
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
            <div key={id}>
              {question.type === 'yes-no' && <YesNo {...props} />}
              {question.type === 'text-input' && <TextInput {...props} />}
              {question.type === 'number-input' && <NumberInput {...props} />}
              {question.type === 'date-input' && <DateInput {...props} />}
              {question.type === 'multiple-choice' && <ChoiceInput {...props} />}
              {question.type === 'upload-form' && <FormInput {...props} />}
              {question.type === 'signature' && <Signature {...props} />}
              <br />
            </div>
          );
        })}
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button className={classes.button} disabled={!prevEnabled} variant="contained" onClick={prevPage}>Zurück</Button>
        <Button className={classes.button} disabled={!nextEnabled} variant="contained" onClick={nextPage}>Weiter</Button>
      </Box>
    </Layout>
  );
};

export const FormSubmit = ({ form }: { form: IForm }) => {
  const { answers } = useAnswers(form.id);
  const { addFormAnswers } = useUser();
  const history = useHistory();

  const classes = useStyles();

  const formAnswer: IFormAnswers = useMemo(() => ({
    id: form.id,
    answers: Object.values(answers),
    writer: BlobWriter.generate('formAnswer'),
  }), [form, answers]);

  async function submit() {
    await addFormAnswers(formAnswer);
    // localStorage.removeItem(`grenzexpress-${form.id}`);
    delete answersByForm[form.id];
    history.replace('/');
  }

  return (
    <Layout home={false} title="Grenzexpress">
      <Grid container spacing={2}>
        <FinishedForm formAnswer={formAnswer} headOnly />
        <Grid item sm={4} xs={12}>
          <Card>
            <CardHeader
              className={classes.header}
              title="Formular absenden"
            />
            <CardContent className={classes.content}>
              <Typography>
                Wenn du das Formular absendest,
                kannst du die Daten an der Grenze einfach mit dem Grenzpersonal teilen.
                Deine Daten werden geschützt,
                und nur wer einen QR Code besitzt kann darauf zugreifen.
              </Typography>
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

let answersByForm = {} as { [formID: string]: { [id: string]: IAnswer } };
const useAnswers = (form: string) => {
  const [answers, setAnswers] = useState<{ [id: string]: IAnswer }>(() => {
    let initial = {};

    // Disable form caching as it causes problems with larger datasets
    /*try {
      initial = JSON.parse(localStorage.getItem(`grenzexpress-${form}`) || '');
    } catch { console.log('page answers initialized'); }*/

    // instead cache locally
    if(answersByForm[form])
      return answersByForm[form];

    return initial;
  });

  useEffect(() => {
    // localStorage.setItem(`grenzexpress-${form}`, JSON.stringify(answers));
    answersByForm[form] = answers;
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
