import {
  Button,
  Card, CardActions, CardContent, CardHeader, createStyles, Grid, makeStyles,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useHistory } from 'react-router';

import { forms } from '../../data/forms';
import { IFormAnswers } from '../../types/answers';
import { IAnswer, IAnswerType } from '../../types/form';

const useStyles = makeStyles(() => createStyles({
  red: {
    color: '#ff0000',
  },
  green: {
    color: '#00ff00',
  },
  yellow: {
    color: '#f9b000',
  },
}));

export const FinishedForm = ({
  formAnswer,
  headOnly,
}: {
  formAnswer: IFormAnswers;
  headOnly?: true;
}) => {
  const form = forms.find((it) => it.id === formAnswer.id);
  const classes = useStyles();

  const history = useHistory();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  const { state, message } = form?.validate(
    (answerID: any) => formAnswer.answers.find((it) => it.id === answerID) as any,
  );

  const token = `${formAnswer.writer.publicKey.base64url}@${formAnswer.writer.symmetricKey.base64url}`;
  const innerUrl = `http://localhost/load-form#${token}`;
  const url = `/qr#${innerUrl}`;
  const firstNameAnswer = formAnswer.answers.find((it) => it.id === 'first-name') as IAnswer<'text-input'>;
  const firstName = firstNameAnswer?.value || '';
  const lastNameAnswer = formAnswer.answers.find((it) => it.id === 'last-name') as IAnswer<'text-input'>;
  const lastName = lastNameAnswer?.value || '';
  const name = `${firstName} ${lastName}`;

  const color = ({
    valid: 'green',
    invalid: 'red',
    unknown: 'yellow',
  } as const)[state];

  return (
    <Grid item sm={4} xs={12}>
      <Card>
        <CardHeader
          subheader={name}
          title={form.title}
        />
        <CardContent className={classes[color]}>
          <FiberManualRecordIcon />
          <p>
            {message}
          </p>
          {state === 'unknown' && (
            <p>
              Die Entscheidung trifft ein Kollege vor Ort.
            </p>
          )}
        </CardContent>
        {!headOnly && (
          <CardActions>
            <Button color="primary" variant="contained" onClick={() => history.push(url)}>
              Vorzeigen
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};
