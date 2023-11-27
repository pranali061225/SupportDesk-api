import { Container } from 'typedi';
import { loggerDev } from '../utils/logger';
import { config } from '../config';
import sgMail from '@sendgrid/mail';
import { IModelDI } from '../types/dependencyInjectors';

const dependencyInjector = async ({
  models,
}: {
  models: IModelDI[];
}): Promise<void> => {
  try {
    models.forEach(m => {
      console.log('initialize model...', m.name);
      Container.set(m.name, m.model);
    });

    sgMail.setApiKey(config.emails.apiKey);
    Container.set('logger', loggerDev);
    Container.set('emailClient', sgMail);
  } catch (error) {
    loggerDev.error(`Error on dependency injector loader: ${error}`);
    throw error;
  }
};

export { dependencyInjector };
export default dependencyInjector;
