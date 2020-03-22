import {
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
import React from 'react';
import { Link } from 'react-router-dom';

import { FinishedForm } from '../../components/finished-form/FinishedForm';
import { Layout } from '../../components/layout/Layout';
import { useUser } from '../../contexts/User';
import { forms } from '../../data/forms';

const useStyles = makeStyles(() => createStyles({
  content: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  header: {
    margin: 0,
    paddingBottom: 0,
  },
}));


export const Main = () => {
  const { user } = useUser();
  const classes = useStyles();

  return (
    <Layout title="Grenzexpress" home={true}>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid key={form.id} item sm={4} xs={12}>
            <Card>
              <CardHeader
                className={classes.header}
                title={form.title}
              />
              <CardContent className={classes.content}>
                <Typography>
                  Erstellen sie ein Formular, um schnell und einfach die Grenze zu passieren!
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/form/${form.id}`} style={{ textDecoration: 'none' }}>
                  <Button color="primary" variant="contained">
                    Los gehts!
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {user.answeredForms.map((formAnswer) => <FinishedForm formAnswer={formAnswer} />)}
      </Grid>
    </Layout>
  );
};
