import { randomBytes, secretbox } from 'tweetnacl';

import {
  base64url, decode, encode,
} from './util';

export class SymmetricKey<T> {
  constructor(private key: Uint8Array) { }

  static generate<T>(): SymmetricKey<T> {
    return new SymmetricKey(randomBytes(secretbox.keyLength));
  }

  static fromBase64url<T>(data: string): SymmetricKey<T> {
    return new SymmetricKey(base64url.decode(data));
  }

  get base64url(): string {
    return base64url.encode(this.key);
  }

  encrypt(msg: T): Uint8Array {
    return this.encryptBytes(encode(msg));
  }

  decrypt(msg: Uint8Array): T {
    return decode(this.decryptBytes(msg));
  }

  encryptBytes(msg: Uint8Array): Uint8Array {
    const nonce = randomBytes(secretbox.nonceLength);

    const data = new Uint8Array(nonce.length + msg.length + secretbox.overheadLength);
    data.set(nonce, 0);

    const box = secretbox(msg, nonce, this.key);
    data.set(box, nonce.length);
    if (nonce.length + box.length !== data.length) {
      throw new Error('unreachable');
    }

    return data;
  }

  decryptBytes(data: Uint8Array) {
    const nonce = data.slice(0, secretbox.nonceLength);
    const box = data.slice(secretbox.nonceLength);
    const msg = secretbox.open(box, nonce, this.key);
    if (!msg) {
      throw new Error('Invalid message, decryption failed');
    }
    return msg;
  }
}
