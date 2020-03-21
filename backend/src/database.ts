import config from 'config';
import path from 'path';
import { Connection, createConnection, Repository } from 'typeorm';

import { Blob } from './entity/Blob';
import { logger } from './logger';

type ConnectionInfo = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export class Database {
  private readonly dbConfig: ConnectionInfo;

  private connection: Connection | null = null;

  private blobRepository: Repository<Blob> | null = null;

  constructor() {
    this.dbConfig = config.get('db') as ConnectionInfo;
  }

  public async connect() {
    this.connection = await createConnection({
      type: 'postgres',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      synchronize: true,
      logging: false,
      entities: [
        path.join(__dirname, '/entity/*.ts'),
      ],
    });

    this.blobRepository = this.connection.getRepository(Blob);
  }

  public async upsertBlob(id: string, data: string) {
    if (!this.blobRepository) {
      throw new NotConnectedError();
    }

    const existingBlob = await this.blobRepository.findOne({ key: id });
    if (!existingBlob) {
      logger.debug(`Blob for key ${id} does not exist yet, creating one`);
      await this.createBlob(id, data);
    } else {
      await this.updateBlob(existingBlob, data);
    }
  }

  public async getBlob(id: string) {
    if (!this.blobRepository) {
      throw new NotConnectedError();
    }

    return this.blobRepository.findOne({ key: id });
  }

  public async deleteBlob(id: string) {
    if (!this.blobRepository) {
      throw new NotConnectedError();
    }

    return this.blobRepository.delete({ key: id });
  }

  private async createBlob(id: string, data: string) {
    if (!this.blobRepository) {
      throw new NotConnectedError();
    }

    const blob = new Blob();
    blob.key = id;
    blob.data = data;

    await this.blobRepository.save(blob);
  }

  private async updateBlob(existingBlob: Blob, data: string) {
    if (!this.blobRepository) {
      throw new NotConnectedError();
    }

    existingBlob.data = data;
    await this.blobRepository.save(existingBlob);
  }
}

export class NotConnectedError extends Error {
  constructor() {
    super('No connection to the database');
  }
}
