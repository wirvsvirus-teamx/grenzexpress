import { createLogger, stdSerializers } from 'bunyan';
import config from 'config';

export const logger = createLogger({
  name: 'backend',
  level: config.get('logLevel'),
  serializers: {
    ...stdSerializers,
    req: (req): any => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { headers, ...data } = stdSerializers.req(req);
      return data;
    },
    res: (res): any => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { header, ...data } = stdSerializers.res(res);
      return data;
    },
  },
});
