import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    options: process.env.DB_OPTIONS,
  },
};
