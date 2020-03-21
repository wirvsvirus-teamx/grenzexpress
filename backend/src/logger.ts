import { createLogger, stdSerializers } from 'bunyan';
import config from 'config';
import { createParamDecorator } from 'routing-controllers';

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

export type Logger = typeof logger;
export function Logger(): (object: any, method: string, index: number) => void {
  return createParamDecorator({
    required: true,
    value: (action) => action.context.log,
  });
}
