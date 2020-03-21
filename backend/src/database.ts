import { createConnection } from 'typeorm';

type ConnectionInfo = {
  host?: string,
  port?: number,
  username: string,
  password: string,
};

export async function getDatabaseConnection(connectionInfo: ConnectionInfo) {
  return createConnection({
    host: connectionInfo.host ?? 'localhost',
    port: connectionInfo.port ?? 5432,
    type: 'postgres',
    username: connectionInfo.username,
    password: connectionInfo.password,
    database: 'grenzexpress',
    synchronize: true,
    logging: false,
    entities: [
      __dirname + '/entity/*.ts',
    ],
  });
}
