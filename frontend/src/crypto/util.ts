export function encode(msg: any): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(msg));
}

export function decode<T>(msg: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(msg));
}
