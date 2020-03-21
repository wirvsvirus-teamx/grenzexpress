import { IsString } from 'class-validator';
import {
  Body, Get, JsonController, Post,
} from 'routing-controllers';

import { Logger } from '../logger';

export class PingBody {
  @IsString()
  test!: string;
}

export interface PingResponse {
  pong: number;
  body?: PingBody;
}

@JsonController('/ping')
export class PingController {
  @Get('/')
  get(
    @Logger() logger: Logger,
  ): PingResponse {
    logger.debug('Received ping');
    return {
      pong: 42,
    };
  }

  @Post('/')
  async post(
    @Logger() logger: Logger,
    @Body() { test, ...other }: PingBody,
  ): Promise<PingResponse> {
    logger.debug({ test, other }, 'Received ping');
    return {
      pong: 123,
      body: { test },
    };
  }
}
