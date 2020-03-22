import {
  Card, CardActions, CardContent, createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';

import { forms } from '../../data/forms';
import { IFormAnswer } from '../../types';

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

export const FinishedForm = ({ formAnswer }: { formAnswer: IFormAnswer }) => {
  const form = forms.find((it) => it.id === formAnswer.id);
  const classes = useStyles();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  const { state, message } = form?.validate((answerID: any) => formAnswer.answers.find((it) => it.id === answerID) as any);

  const color = ({
    valid: 'green',
    invalid: 'red',
    unknown: 'yellow',
  } as const)[state];

  return (
    <Grid item sm={4} xs={12}>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h5">
            {form.title}
          </Typography>
        </CardContent>
        <CardActions className={classes[color]}>
          <FiberManualRecordIcon />
          <p>
            {message}
          </p>
          {state === 'unknown' && (
          <p>
            Die Entscheidung trifft ein Kollege vor Ort.
          </p>
          )}

        </CardActions>
      </Card>
    </Grid>
  );
};
