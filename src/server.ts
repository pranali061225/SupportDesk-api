import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';
import { config } from '../src/config';
import { loggerDev } from '../src/utils/logger';
import { loaders } from '../src/loaders';

export class Server {
  app = express();
  server;
  public startServer = async () => {
    
    await loaders(this.app);
    loggerDev.debug(`MODE ENV ${process.env.NODE_ENV}`);
    this.server = this.app
      .listen(config.port, () => {
        loggerDev.info(`Server listening on port: ${config.port}`);
      });
    this.server.on('error', err => {
        loggerDev.error(err);
        process.exit(1);
      })    
  };

  public stopServer = async () => {
    this.server.close();
  }
}

