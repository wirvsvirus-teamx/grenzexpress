import { parseBody, router } from '../router';

router.get('/ping', (ctx) => {
  ctx.log.debug('Received ping');
  ctx.body = {
    pong: 42,
  };
});

router.post('/ping', parseBody, (ctx) => {
  const { body } = ctx.request;
  ctx.log.debug({ body }, 'Received ping');
  ctx.body = {
    pong: 42,
    body,
  };
});
