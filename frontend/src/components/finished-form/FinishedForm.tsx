import {
  Card, CardActions, CardContent, CardHeader, createStyles, Grid, IconButton,
  makeStyles, Typography, Button,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';

import { forms } from '../../data/forms';
import { IFormAnswer } from '../../types';
import { useHistory } from 'react-router';

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

  const history = useHistory();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  const { state, message } = form?.validate((answerID: any) => formAnswer.answers.find((it) => it.id === answerID) as any);

  const token = window.btoa(formAnswer.uid + "@" + formAnswer.key);
  const innerUrl = `http://localhost/load-form#${token}`;
  const url = `/qr#${innerUrl}`;

  const color = ({
    valid: 'green',
    invalid: 'red',
    unknown: 'yellow',
  } as const)[state];

  return (
    <Grid item sm={4} xs={12}>
      <Card>
        <CardHeader
          subheader="September 14, 2016"
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
        <CardActions >
            <Button variant="contained" color="primary" onClick={() => history.push(url)}>
              Vorzeigen
            </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
