import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import {
  base64, PublicKey, SecretKey, SymmetricKey,
} from '../crypto';
import { blobClasses } from './models';

type BlobClasses = typeof blobClasses;
type Class<T> = { new(...args: any[]): T };

export type BlobType = BlobClasses extends {
  [B in keyof BlobClasses]: Class<{ type: B }>
} ? keyof BlobClasses : never;

export type BlobTypes = {
  [B in BlobType]: BlobClasses[B] extends Class<infer T> ? T : never;
};

type BlobData<B extends BlobType> = Omit<BlobTypes[B], 'type'>;

function checkOk(res: Response) {
  if (!res.ok) {
    throw new Error(`API request failed: ${res.statusText}`);
  }
}

abstract class BlobAPI<B extends BlobType> {
  abstract readonly publicKey: PublicKey;

  constructor(
    protected blobType: B,
    public readonly symmetricKey: SymmetricKey<BlobTypes[B]>,
  ) { }

  protected get url(): string {
    return `/api/blob/${this.publicKey.base64url}`;
  }

  protected async validate(msg: BlobTypes[B]): Promise<BlobTypes[B]> {
    const data = plainToClass(
      blobClasses[this.blobType],
      msg,
    );
    await validateOrReject(data, {
      forbidUnknownValues: true,
      whitelist: true,
    });
    return data;
  }

  async get(): Promise<BlobTypes[B]> {
    const res = await fetch(this.url);
    checkOk(res);
    const { data } = await res.json();
    const msg = await this.validate(
      this.symmetricKey.decrypt(base64.decode(data)),
    );
    return msg;
  }

  isWriter(): this is BlobWriter<B> {
    return this instanceof BlobWriter;
  }
}

export class BlobReader<B extends BlobType> extends BlobAPI<B> {
  constructor(
    blobType: B,
    symmetricKey: SymmetricKey<BlobTypes[B]>,
    readonly publicKey: PublicKey,
  ) {
    super(blobType, symmetricKey);
  }
}

interface BlobWriterJSON {
  symmetricKey: string;
  secretKey: string;
}

export class BlobWriter<B extends BlobType> extends BlobAPI<B> {
  constructor(
    blobType: B,
    symmetricKey: SymmetricKey<BlobTypes[B]>,
    protected secretKey: SecretKey,
  ) {
    super(blobType, symmetricKey);
  }

  static generate<B extends BlobType>(blobType: B): BlobWriter<B> {
    return new BlobWriter(
      blobType,
      SymmetricKey.generate(),
      SecretKey.generate(),
    );
  }

  static fromJSON<B extends BlobType>(blobType: B, data: any): BlobWriter<B> {
    const { symmetricKey, secretKey } = data;
    return new BlobWriter(
      blobType,
      new SymmetricKey(base64.decode(symmetricKey)),
      SecretKey.fromSecretKey(base64.decode(secretKey)),
    );
  }

  toJSON(): object {
    return {
      symmetricKey: base64.encode(this.symmetricKey.key),
      secretKey: base64.encode(this.secretKey.secretKey),
    };
  }

  get publicKey(): PublicKey {
    return this.secretKey;
  }

  set publicKey(newValue: PublicKey) {
    if (newValue) {
      throw new TypeError('Attempted to assign to readonly property.');
    }
  }

  async set(msg: BlobData<B>): Promise<void> {
    const validated = await this.validate({
      ...msg,
      type: this.blobType,
    });
    const data = this.symmetricKey.encrypt(validated);
    const res = await this.fetchSigned(this.url, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newData: base64.encode(data),
      }),
    });
    checkOk(res);
  }

  async delete(): Promise<void> {
    const res = await this.fetchSigned(this.url, new Uint8Array(), {
      method: 'DELETE',
    });
    checkOk(res);
  }

  private fetchSigned(url: string, data: Uint8Array, info: RequestInit): Promise<Response> {
    const signature = base64.encode(this.secretKey.sign(data));
    info.headers = {
      ...info.headers,
      Authorization: `signature ${signature}`,
    };
    return fetch(url, info);
  }
}
