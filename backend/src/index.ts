import './routes';

import cors from '@koa/cors';
import config from 'config';
import { once } from 'events';
import { createServer } from 'http';
import App from 'koa';
import koaBunyanLogger, { requestIdContext, requestLogger } from 'koa-bunyan-logger';

import { logger } from './logger';
import { router } from './router';

async function main(): Promise<void> {
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

  app.use(router.routes());
  app.use(router.allowedMethods());

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
