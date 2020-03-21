import { sign, SignKeyPair } from 'tweetnacl';

const { keyPair } = sign;

export class PublicKey {
  constructor(
    private publicKey: Uint8Array,
  ) { }

  verify(msg: Uint8Array, sig: Uint8Array): boolean {
    return sign.detached.verify(msg, sig, this.publicKey);
  }
}

export class SecretKey extends PublicKey {
  private secretKey: Uint8Array

  constructor({ publicKey, secretKey }: SignKeyPair) {
    super(publicKey);
    this.secretKey = secretKey;
  }

  static generate(): SecretKey {
    return new SecretKey(keyPair());
  }

  sign(msg: Uint8Array): Uint8Array {
    return sign.detached(msg, this.secretKey);
  }
}
