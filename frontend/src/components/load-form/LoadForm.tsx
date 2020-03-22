import {
  Card, CardContent, CircularProgress, Grid, Typography,
} from '@material-ui/core';
import React from 'react';

import { useUser } from '../../contexts/User';
import { questions } from '../../data/forms';
import { IAnswer, IFormAnswer } from '../../types';
import { FinishedForm } from '../finished-form/FinishedForm';
import { Layout } from '../layout/Layout';

export const LoadForm = () => {
  const data = window.atob(window.location.hash.slice(1));
  const [publicKey, secret] = data.split('@');

  // Load some magic from server

  const result: IFormAnswer | undefined = useUser().user.answeredForms[0];

  if (!result) {
    return (
      <Layout title="Grenzexpress">
        <CircularProgress />
      </Layout>
    );
  }

  return (
    <Layout title="Grenzexpress">
      <Grid container spacing={2}>
        <FinishedForm formAnswer={result} headOnly wholeWidth />
        {result.answers.map((answer) => {
          const question = questions.find((q) => q.id === answer.id);

          let content = <></>;

          if (answer.type === 'date-input') {
            content = <>{new Date(+(answer as IAnswer<'date-input'>).value).toLocaleDateString()}</>;
          }

          if (answer.type === 'multiple-choice') {
            content = <>{(answer as IAnswer<'multiple-choice'>).choice}</>;
          }

          if (answer.type === 'number-input') {
            content = <>{(answer as IAnswer<'number-input'>).value}</>;
          }

          if (answer.type === 'text-input') {
            content = <>{(answer as IAnswer<'text-input'>).value}</>;
          }

          if (answer.type === 'signature') {
            content = <><img src={(answer as IAnswer<'signature'>).signature} /></>;
          }

          if (answer.type === 'upload-form') {
            content = <><img src={(answer as IAnswer<'upload-form'>).image} /></>;
          }

          if (answer.type === 'yes-no') {
            content = <>{(answer as IAnswer<'yes-no'>).yes ? 'Ja' : 'Nein'}</>;
          }

          return (
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography component="h2" gutterBottom variant="h5">
                    {(question as any)?.title
                    ?? (question as any)?.name
                    ?? (question as any)?.question
                    ?? 'Signatur'}
                  </Typography>
                  <Typography color="textSecondary" component="p" variant="body2">
                    {content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};
