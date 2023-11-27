import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/MyDb';
process.env.JWT_SECRET = process.env.JWT_SECRET || '1234567';
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    // Used by winston logger
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  emails: {
    // SENDGRID email credentials
    apiKey: process.env.SENDGRID_API_KEY,
    sender: process.env.SENDGRID_SENDER,
  },
};

export enum MODES {
  TEST = 'test',
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production',
}
