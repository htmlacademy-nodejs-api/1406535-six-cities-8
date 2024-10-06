import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../const.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) { }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');
    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;
    this.logger.info('Database connection established');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
