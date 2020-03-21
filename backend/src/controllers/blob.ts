import { IsString } from 'class-validator';
import {
  Body, Delete,
  Get, JsonController, Param, Put,
} from 'routing-controllers';

import { Logger } from '../logger';

export interface GetResponse {
  data: string;
}

export interface PutResponse {

}

export class PutRequestBody {
  @IsString()
  newData!: string;
}

export class DeleteRequestBody {
  @IsString()
  data!: string;
}

export interface DeleteResponse {

}

@JsonController('/blob')
export class PingController {
  @Get('/:publicKey')
  async get(
    @Logger() logger: Logger,
    @Param('publicKey') publicKey: string,
  ): Promise<GetResponse> {
    logger.debug(`Getting data for public key ${publicKey}`);
    throw new Error('Unimplemented');
  }

  @Put('/:publicKey')
  async post(
    @Logger() logger: Logger,
    @Param('publicKey') publicKey: string,
    @Body() { newData, ...other }: PutRequestBody,
  ): Promise<PutResponse> {
    logger.debug(`Putting data for public key ${publicKey}`);
    throw new Error('Unimplemented');
  }

  @Delete('/:publicKey')
  async delete(
    @Logger() logger: Logger,
    @Param('publicKey') publicKey: string,
    @Body() { data, ...other }: DeleteRequestBody,
  ): Promise<DeleteResponse> {
    logger.debug(`Deleting data for public key ${publicKey}`);
    throw new Error('Unimplemented');
  }
}
