export function encode(msg: any): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(msg));
}

export function decode<T>(msg: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(msg));
}

interface Encodig {
  encode: (data: Uint8Array) => string;
  decode: (data: string) => Uint8Array;
}

export const base64: Encodig = {
  encode: (data) => Buffer.from(data).toString('base64'),
  decode: (data) => Buffer.from(data, 'base64'),
};

export const base64url: Encodig = {
  encode: (data) => base64.encode(data)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_'),

  decode: (data) => base64.decode(
    data
      .replace(/-/g, '+')
      .replace(/_/g, '/'),
  ),
};
