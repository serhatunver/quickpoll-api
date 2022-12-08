import mongoose from 'mongoose';
import { config } from '../config/index.js';

const mongoURI = `mongodb+srv://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.options}`;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectMongo;
