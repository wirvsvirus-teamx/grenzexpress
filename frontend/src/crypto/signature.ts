import { sign, SignKeyPair } from 'tweetnacl';

import { base64url } from './util';

const { keyPair } = sign;

export class PublicKey {
  constructor(
    private publicKey: Uint8Array,
  ) { }

  static fromBase64url(data: string): PublicKey {
    return new PublicKey(base64url.decode(data));
  }

  get base64url(): string {
    return base64url.encode(this.publicKey);
  }

  verify(msg: Uint8Array, sig: Uint8Array): boolean {
    return sign.detached.verify(msg, sig, this.publicKey);
  }
}

export class SecretKey extends PublicKey {
  readonly secretKey: Uint8Array

  constructor({ publicKey, secretKey }: SignKeyPair) {
    super(publicKey);
    this.secretKey = secretKey;
  }

  static generate(): SecretKey {
    return new SecretKey(keyPair());
  }

  static fromSecretKey(secretKey: Uint8Array) {
    return new SecretKey(keyPair.fromSecretKey(secretKey));
  }

  sign(msg: Uint8Array): Uint8Array {
    return sign.detached(msg, this.secretKey);
  }
}
