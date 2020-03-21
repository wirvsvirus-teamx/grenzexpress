import config from 'config';
import path from 'path';
import { createConnection } from 'typeorm';

type ConnectionInfo = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export async function getDatabaseConnection() {
  const dbConfig = config.get('db') as ConnectionInfo;

  return createConnection({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [
      path.join(__dirname, '/entity/*.ts'),
    ],
  });
}
