import mongoose from 'mongoose';
import { config } from '../config/index.js';

const mongoURI = config.mongoURI;

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
