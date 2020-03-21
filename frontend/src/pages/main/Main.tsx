import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import css from './Main.module.scss';
import { Link } from './../../contexts/Paging';

export const Main = () => (
  <div className={css.app}>
    <Link to='/bp'>
      <button>Click me</button>
    </Link>
    <header className={css.header}>
      <h2>Bescheinigung für Berufspendler</h2>
    </header>
    <main>
      <p>
        Hiermit wird bescheinigt, dass die ausgeführte Person zwischen Wohnung und Arbeitsstätte über die deutsche
        Bundesgrenze pendeln muss.
      </p>
      <h4>Wohnung</h4>
      <TextField id='standard-basic' label='Staat' />
      <br />
      <TextField id='standard-basic' label='PLZ, Ort' />
      <h4>Arbeitsstätte</h4>
      <TextField id='standard-basic' label='Staat' />
      <br />
      <TextField id='standard-basic' label='PLZ, Ort' />
      <h4>Angaben zum Pendler</h4>
      <TextField id='standard-basic' label='Name' />
      <br />
      <TextField id='standard-basic' label='Vorname' />
      <br />
      <TextField id='standard-basic' label='Staatsangehörigkeit' />
      <br />
      <Button variant='contained'>Weiter</Button>
    </main>
  </div>
);
