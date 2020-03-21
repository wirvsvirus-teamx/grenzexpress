import 'reflect-metadata';

import cors from '@koa/cors';
import config from 'config';
import { once } from 'events';
import { createServer } from 'http';
import App from 'koa';
import koaBunyanLogger, { requestIdContext, requestLogger } from 'koa-bunyan-logger';
import { useKoaServer } from 'routing-controllers';

import { Database } from './database';
import { logger } from './logger';

async function main(): Promise<void> {
  const db = new Database();
  await db.connect();

  const app = new App();

  app.use(cors());

  app.use(async (ctx, next) => {
    try {
      await next();
    } finally {
      ctx.set('Request-Id', ctx.reqId);
    }
  });

  app.use(koaBunyanLogger(logger));
  app.use(requestIdContext({
    field: 'reqId',
  }));
  app.use(requestLogger());

  useKoaServer(app, {
    cors: false,
    routePrefix: '/api',
    controllers: [`${__dirname}/controllers/*`],
    validation: {
      whitelist: true,
      forbidUnknownValues: true,
    },
    defaults: {
      paramOptions: {
        required: true,
      },
    },
  });

  const server = createServer(app.callback());
  const listening = once(server, 'listening');
  server.listen(config.get('port'));
  await listening;
}

main()
  .then(() => {
    logger.info('Startup done');
  })
  .catch((err) => {
    logger.error({ err }, 'Startup error');
  });
