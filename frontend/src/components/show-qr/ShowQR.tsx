import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import QRCode from 'qrcode.react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../layout/Layout';

export const ToQR = ({ url }: { url: string }) => <Link to={`/qr#${url}`} />;

export const ShowQR = () => (
  <Layout home={false} title="GrenzExpress - QR-Code">
    <Container maxWidth="xs">
      <Card>
        <CardActionArea>
          <CardMedia>
            <QRCode
              size={396}
              style={{
                width: '396px', height: '396px', maxWidth: '100%', maxHeight: '100%',
              }}
              value={window.location.hash.slice(1)}
            />
          </CardMedia>
          <CardContent>
            <Typography component="h2" gutterBottom variant="h5">
              Zeige diesen QR Code vor!
            </Typography>
            <Typography color="textSecondary" component="p" variant="body2">
              Im QR Code ist ein Schlüssel,
              der dem Bundespolizisten Zugriff auf deine persönlichen Daten gewährt.
              Die Daten werden Ende zu Ende verschlüsselt, sind also nicht auf dem Server lesbar.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="primary" size="small" onClick={() => window.history.back()}>
            Zurück
          </Button>
        </CardActions>
      </Card>
    </Container>
  </Layout>
);
