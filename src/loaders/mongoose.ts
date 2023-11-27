import mongoose from 'mongoose';
import { config } from '../config';
import { loggerDev } from '../utils/logger';
export const mongooseLoader = async () => {
  const db = config.dbUrl;
  try {
    const mongoConnection = await mongoose.connect(db, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set('debug', true);
    loggerDev.info('MongoDB has been connected');
    return mongoConnection.connection;
  } catch (err) {
    console.log('mongooes connection error ', err)
    loggerDev.error(err.message);
    process.exit(1);
  }
};
