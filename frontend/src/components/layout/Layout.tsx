import {
  AppBar, Box, Container, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

interface LayoutProps {
  title: string;
}

export const Layout: FunctionComponent<LayoutProps> = ({ title, children }) => {
  const history = useHistory();
  return (
    <>
      <AppBar position="fixed">
        <Container disableGutters>
          <Toolbar>
            <IconButton aria-label="menu" color="inherit" edge="start" onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
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
