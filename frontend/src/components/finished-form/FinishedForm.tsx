import {
  Button,
  Card, CardActions, CardContent, CardHeader, createStyles, Grid, makeStyles,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useHistory } from 'react-router';

import { forms } from '../../data/forms';
import { IAnswer, IAnswerType, IFormAnswer } from '../../types';

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
  wholeWidth,
}: {
  formAnswer: IFormAnswer;
  headOnly?: true;
  wholeWidth?: true;
}) => {
  const form = forms.find((it) => it.id === formAnswer.id);
  const classes = useStyles();

  const history = useHistory();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  const { state, message } = form?.validate(
    (answerID: any) => formAnswer.answers.find((it) => it.id === answerID) as any,
  );

  const token = window.btoa(`${formAnswer.uid}@${formAnswer.key}`);
  const innerUrl = `https://grenz.express/load-form#${token}`;
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
    <Grid item sm={wholeWidth ? 12 : 4} xs={12}>
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
