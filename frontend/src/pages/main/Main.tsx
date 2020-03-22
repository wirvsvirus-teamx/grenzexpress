import {
  Button, Card, CardActions, CardContent, Grid, Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { FinishedForm } from '../../components/finished-form/FinishedForm';
import { Layout } from '../../components/layout/Layout';
import { useUser } from '../../contexts/User';
import { forms } from '../../data/forms';

export const Main = () => {
  const { user } = useUser();

  return (
    <Layout title="Grenzexpress">
      <Grid container spacing={3}>
        {user.answeredForms.map((formAnswer) => <FinishedForm formAnswer={formAnswer} />)}
        {forms.map((form) => (
          <Grid key={form.id} item sm={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {form.title}
                </Typography>
                <p>
                  Erstellen sie ein Formular, um schnell und einfach die Grenze zu passieren!
                </p>
              </CardContent>
              <CardActions>
                <Link to={`/form/${form.id}`}>
                  <Button color="primary" variant="contained">
                    Los gehts!
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
