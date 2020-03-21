// FIXME: This is only here until the controller is not a stub anymore
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBase64 } from 'class-validator';
import {
  Body, Delete,
  Get, HeaderParam,
  JsonController, NotFoundError,
  Param, Put, UnauthorizedError,
} from 'routing-controllers';
import nacl from 'tweetnacl';

import { Database, Db } from '../database';
import { Logger } from '../logger';

export interface GetResponse {
  data: string;
}

export class PutRequestBody {
  @IsBase64()
  newData!: string;
}

function extractSignatureFromAuthHeader(authHeader: string): Buffer {
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'signature') {
    throw new Error('Malformed Authorization header');
  }
  return Buffer.from(parts[1], 'base64');
}

function signatureIsValid(message: string, signature: Buffer, publicKey: string): boolean {
  const msg = new TextEncoder().encode(message);
  const sig = Uint8Array.from(signature);
  const key = new TextEncoder().encode(publicKey);
  return nacl.sign.detached.verify(msg, sig, key);
}

@JsonController('/blob')
export class PingController {
  @Get('/:publicKey')
  async get(
    @Logger() logger: Logger,
    @Db() db: Database,
    @Param('publicKey') publicKey: string,
  ): Promise<GetResponse> {
    logger.debug(`Getting data for public key ${publicKey}`);
    const blob = await db.getBlob(publicKey);
    if (!blob) {
      throw new NotFoundError();
    }
    return blob;
  }

  @Put('/:publicKey')
  async put(
    @Logger() logger: Logger,
    @Db() db: Database,
    @Param('publicKey') publicKey: string,
    @Body() { newData }: PutRequestBody,
    @HeaderParam('authorization') authHeader: string,
  ): Promise<{}> {
    logger.debug(`Putting data for public key ${publicKey}`);
    const signature = extractSignatureFromAuthHeader(authHeader);
    if (!signatureIsValid(newData, signature, publicKey)) {
      throw new UnauthorizedError('Signature could not be verified');
    }
    const blob = await db.getBlob(publicKey);
    if (!blob) {
      await db.upsertBlob(publicKey, newData);
    } else {
      await db.upsertBlob(publicKey, newData);
    }
    return {};
  }

  @Delete('/:publicKey')
  async delete(
    @Logger() logger: Logger,
    @Db() db: Database,
    @Param('publicKey') publicKey: string,
    @HeaderParam('authorization') authHeader: string,
  ): Promise<{}> {
    logger.debug(`Deleting data for public key ${publicKey}`);
    const signature = extractSignatureFromAuthHeader(authHeader);
    // When deleting, an empty message has to be signed
    if (!signatureIsValid('', signature, publicKey)) {
      throw new UnauthorizedError('Signature could not be verified');
    }
    const blob = await db.getBlob(publicKey);
    if (!blob) {
      throw new NotFoundError();
    }
    await db.deleteBlob(publicKey);
    return {};
  }
}
