import { loggerDev } from '../utils/logger';
import { expressLoader } from '../loaders/express';
import { Application } from 'express';
import { mongooseLoader } from '../loaders/mongoose';
import { UserModel } from '../models/users';
import { RequestModel } from '../models/request';
import { IModelDI } from '../types/dependencyInjectors';
import { dependencyInjector } from './dependencyInjector';
import { Container } from 'typedi';
import './events';

export const loaders = async (app: Application): Promise<void> => {
  loggerDev.info('Loaders running');
  const dbService = await mongooseLoader();
  Container.set('dbService', dbService);
  const userModel: IModelDI = {
    name: 'userModel',
    model: UserModel,
  };

  const requestModel: IModelDI = {
    name: 'requestModel',
    model: RequestModel,
  };

  await dependencyInjector({
    models: [
      userModel, // whateverModel,
      requestModel
    ],
  });
  loggerDev.info('Dependency Injector loaded');
  loggerDev.info('Jobs loaded');

  await expressLoader(app);
};
