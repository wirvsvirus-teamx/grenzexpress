import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

export const router = new Router<{}>({
  prefix: '/api',
});

export const parseBody = bodyParser();
