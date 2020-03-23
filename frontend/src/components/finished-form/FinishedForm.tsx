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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useHistory } from 'react-router';

import { forms } from '../../data/forms';
import { IFormAnswers } from '../../types/answers';
import { IAnswer } from '../../types/form';

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
  header: {
    margin: 0,
    paddingBottom: 0,
  },
  message: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',
  },
  content: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  dot: {
    padding: '10px',
  },
}));

export const FinishedForm = ({
  formAnswer,
  headOnly,
  wholeWidth,
}: {
  formAnswer: IFormAnswers;
  headOnly?: true;
  wholeWidth?: true;
}) => {
  const form = forms.find((it) => it.id === formAnswer.id);
  const classes = useStyles();

  const history = useHistory();

  if (!form) throw new Error(`Form with id ${formAnswer.id} not found`);

  console.log(formAnswer);
  
  const { state, message } = form?.validate(
    (answerID: string) => formAnswer.answers.find((it) => it.id === answerID) as any,
  );

  const token = `${formAnswer.writer.publicKey.base64url}@${formAnswer.writer.symmetricKey.base64url}`;
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
          className={classes.header}
          subheader={name}
          title={form.title}
        />
        <CardContent className={classes.content}>
          <Box className={classes.message}>
            <FiberManualRecordIcon className={[classes[color], classes.dot].join(' ')} />
            <div>
              <Typography>{message}</Typography>
              {state === 'unknown' && (
                <Typography>
                  Die Entscheidung trifft ein Kollege vor Ort.
                </Typography>
              )}
            </div>
          </Box>
        </CardContent>
        {!headOnly && (
          <CardActions>
            <Button color="primary" variant="contained" onClick={() => history.push(url)}>
              QR-Code Vorzeigen
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};
