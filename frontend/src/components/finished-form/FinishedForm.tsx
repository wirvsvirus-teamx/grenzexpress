import {
  Card, CardActions, CardContent, createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';

import { IFormAnswer } from '../../types';
import { forms } from '../../data/forms';

const useStyles = makeStyles(() => createStyles({
  red: {
    color: '#ff0000',
  },
  green: {
    color: '#00ff00',
  },
}));

export const FinishedForm = ({ formAnswer }: { formAnswer: IFormAnswer }) => {
  const form = forms.find((it) => it.id === formAnswer.id);
  const classes = useStyles();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  return (
    <Grid item sm={4} xs={12}>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h5">
            {form.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.red}>
          <FiberManualRecordIcon />
          <p>
            Einreise nicht genehmigt
          </p>
        </CardActions>
      </Card>
    </Grid>
  );
};
