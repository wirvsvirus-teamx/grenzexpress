import {
  AppBar, Box, Container, createStyles, IconButton, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import logo from './logo.svg';

interface LayoutProps {
  title: string;
  home: boolean;
}

const useStyles = makeStyles(() => createStyles({
  logo: {
    padding: '5px',
  },
}));

export const Layout: FunctionComponent<LayoutProps> = ({ title, children, home }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Container disableGutters>
          <Toolbar>
            {!home
              && (
              <IconButton aria-label="menu" color="inherit" edge="start" onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
              )}
            {
              home
              && <img className={classes.logo} height="32" src={logo} width="32" />
            }
            <Typography variant="h6">
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Container disableGutters>
        <Box p={3}>
          {children}
        </Box>
      </Container>
    </>
  );
};
