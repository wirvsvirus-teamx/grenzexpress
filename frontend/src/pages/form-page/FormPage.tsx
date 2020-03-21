import {
  Box, Button, TextField, Typography,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Link, useParams } from 'react-router-dom';

import { IForm } from '../../../../shared/types';
import { DateInput, Signature } from '../../components';
import { Layout } from '../../components/layout/Layout';
import { getForm } from '../../data/forms';
import { NotFound } from '../not-found/NotFound';

interface FormPageParams {
  formId: string;
  step: string;
}

export const FormPage: FunctionComponent<{}> = () => {
  const { formId, step } = useParams<FormPageParams>();
  const form = getForm(formId);
  if (!form) {
    return <NotFound />;
  }
  switch (+(step ?? 0)) {
    case 0:
      return <FormPage0 form={form} />;
    case 1:
      return <FormPage1 form={form} />;
    default:
      return <NotFound />;
  }
};

interface FormPageStepProps {
  form: IForm;
}

export const FormPage0: FunctionComponent<FormPageStepProps> = ({ form }) => (
  <Layout title="Grenzexpress">
    <p>
      Hiermit wird bescheinigt, dass die ausgeführte Person zwischen Wohnung
      und Arbeitsstätte über die deutsche Bundesgrenze pendeln muss.
    </p>
    <Box>
      <Typography component="h2" variant="h6">Wohnung</Typography>
      <TextField id="standard-basic" label="Staat" />
      <br />
      <TextField id="standard-basic" label="PLZ, Ort" />
    </Box>
    <br />
    <Box>
      <Typography component="h2" variant="h6">Arbeitsstätte</Typography>
      <TextField id="standard-basic" label="Staat" />
      <br />
      <TextField id="standard-basic" label="PLZ, Ort" />
    </Box>
    <br />
    <Box>
      <Typography component="h2" variant="h6">Angaben zum Pendler</Typography>
      <TextField id="standard-basic" label="Name" />
      <br />
      <TextField id="standard-basic" label="Vorname" />
      <br />
      <TextField id="standard-basic" label="Staatsangehörigkeit" />
      <br />
    </Box>
    <Box>
      <DateInput />
    </Box>
    <Box mt={3}>
      <Link to={`/form/${form.id}/1`}>
        <Button variant="contained">Weiter</Button>
      </Link>
    </Box>
  </Layout>
);
export const FormPage1: FunctionComponent<FormPageStepProps> = () => (
  <Layout title="Grenzexpress">
    <Typography component="h2" variant="h6">Unterschrift</Typography>
    <Signature />
    <Box mt={3}>
      <Button variant="contained">Speichern</Button>
    </Box>
  </Layout>
);
